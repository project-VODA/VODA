package com.voda.calling.controller;

import com.voda.calling.model.dto.*;
import com.voda.calling.model.service.CallHistoryService;
import com.voda.calling.model.service.NotificationService;
import com.voda.calling.model.service.UserCallHistoryService;
import com.voda.calling.util.JwtUtil;
import io.openvidu.java.client.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/meetings")
@Api(tags = "meeting")
@CrossOrigin("*")
@Slf4j
public class MeetingController {

    @Autowired
    CallHistoryService callHistoryService;

    @Autowired
    UserCallHistoryService userCallHistoryService;

    @Autowired
    NotificationService notificationService;

    @Autowired
    JwtUtil jwtUtil;


    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final String ONCALLING = "oncalling";
    private static final String AUTH = "Authorization";

    @PostMapping("/send")
    public ResponseEntity<Object> makeMeeting(@RequestBody CallSendRequest callRequest) {
        log.info("MeetingController - makeMeeting : 통화걸기 (영상통화 미팅룸 생성)");
        String sessionId = "";
        String senderEmail = callRequest.getSenderEmail();
        String receiverEmail = callRequest.getReceiverEmail();
        CallSendResponse callSendResponse;

        // 0. receiver가 전화 중일 경우 에러 처리
        if (!callHistoryService.canCall(senderEmail, receiverEmail)) {
            log.info("통화 불가");
            return new ResponseEntity<>(ONCALLING, HttpStatus.OK); //http 204
        } else {
            log.info("통화가능");
            log.info("receiverEmail : {}", receiverEmail);
            // 1. callhistory에 meeting 기록 (상태는 대기?)
            CallHistory callHistory = callHistoryService.createMainCallHistory(senderEmail, receiverEmail);

            // 2. session 생성
            UUID randomStr = UUID.randomUUID();
            sessionId = randomStr.toString();

            String initSessionId;
            String sessionToken;

            try {
                initSessionId = callHistoryService.initializeSession(sessionId);
                log.info("initSessionId : {}", initSessionId);
                sessionToken = callHistoryService.createConnection(initSessionId);
                log.info("sessionToken : {}", sessionToken);
            } catch (OpenViduJavaClientException e) {
                return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR); //http 500
            } catch (OpenViduHttpException e) {
                return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR); //http 500
            }
            // 3. receiver에게 통화 알림 및 token 전달
            notificationService.send(senderEmail, receiverEmail, sessionId, sessionToken,"일단 그냥 ㄱ");

            // 4. sender에게 token 전달
            int currentCallNo = callHistory.getCallNo();
//            int currentCallNo = 1;
            callSendResponse = new CallSendResponse(sessionToken, currentCallNo);
        }

        return new ResponseEntity<>(callSendResponse, HttpStatus.OK); //http 200
    }

    /*
    통화 받기
     */
    @PostMapping("/receive")
    public ResponseEntity<String> receiveMeeting(@RequestBody CallReceiver receiver)  {
        //이메일과 세션ID를 넘겨주면
        String receiverEmail = receiver.getReceiverEmail();
        String sessionId = receiver.getSessionId();
        int currentCallNo = receiver.getCallNo();
        String receiverSessionToken;

        CallHistory currentCall = callHistoryService.getCallHistory(currentCallNo);

        // 1. sessionId에 맞는 callhistory의 상태를 통화 중으로 변경
        callHistoryService.updateCallStatus(currentCall, 1);
        // 2. 통화 시작 시간 기록?
        callHistoryService.updateCallTime(currentCall, "start");

        try {
            receiverSessionToken = callHistoryService.createConnection(sessionId);
        } catch (OpenViduJavaClientException e) {
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR); //http 500
        } catch (OpenViduHttpException e) {
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR); //http 500
        }

        //수신자는 토큰만 만들어서 전달해주자 -> 어차피 바로 통화방으로 연결할 것이기 때문에
        return new ResponseEntity<>(receiverSessionToken, HttpStatus.OK); //http 200
    }

    @PostMapping("/quit")
    public ResponseEntity<String> closeMeeting(@RequestBody CallOffRequest callOffRequest){
        // 1. sessionId에 맞는 sesison 종료 ->프론트에서 해줌
        // 2. callhistory의 상태를 통화 종료로 변경
        String sessionId = callOffRequest.getSessionId();
        int callNo = callOffRequest.getCallNo();

        CallHistory currnentCallHistory = callHistoryService.getCallHistory(callNo);
        callHistoryService.updateCallStatus(currnentCallHistory,2);
        callHistoryService.updateCallTime(currnentCallHistory, "end");

        // 3. callhistory 및 user 연결 테이블에 기록
        UserCallHistory senderUserCallHistory = new UserCallHistory(callNo,currnentCallHistory.getCallSender());
        UserCallHistory receiverUserCallHistory = new UserCallHistory(callNo, currnentCallHistory.getCallReceiver());

        return new ResponseEntity<>(SUCCESS, HttpStatus.OK); //http 500
}

    @PostMapping("/recentcall")
    public ResponseEntity<Object> searchRecentCall(@ApiParam(hidden = true) @RequestHeader(value = AUTH) String auth){
        String accessToken = jwtUtil.extractTokenFromHeader(auth);
        String userEmail =jwtUtil.getUserEmailFromToken(accessToken);

        List<RecentCall> list = callHistoryService.getRecentCallList(userEmail);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }




    /**
     * @param params The Session properties
     * @return The Session ID
     */
    // session을 만드는 함수
//    @PostMapping("/sessions")
//    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
//            throws OpenViduJavaClientException, OpenViduHttpException {
//        SessionProperties properties = SessionProperties.fromJson(params).build();
//        Session session = openVidu.createSession(properties);
//        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
//    }
//
//    /**
//     * @param sessionId The Session in which to create the Connection
//     * @param params    The Connection properties
//     * @return The Token associated to the Connection
//     */
//    // sessionId에 맞는 session의 토큰을 얻는 함수
//    @PostMapping("/sessions/{sessionId}/connections")
//    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
//                                                   @RequestBody(required = false) Map<String, Object> params)
//            throws OpenViduJavaClientException, OpenViduHttpException {
//        Session session = openVidu.getActiveSession(sessionId);
//        if (session == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
////        log.info(properties.getData());
////        log.info(properties.getRtspUri());
////        log.info(properties.getKurentoOptions().toString());
////        log.info(String.valueOf(properties.getRole()));
////        log.info(properties.getNetworkCache().toString());
//        Connection connection = session.createConnection(properties);
//        log.info(connection.getToken());
//        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
//    }

}
