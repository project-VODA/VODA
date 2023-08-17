package com.voda.calling.controller;

import com.voda.calling.model.dto.*;
import com.voda.calling.model.service.CallHistoryService;
import com.voda.calling.model.service.NotificationService;
import com.voda.calling.model.service.UserCallHistoryService;
import com.voda.calling.model.service.UserService;
import com.voda.calling.util.JwtUtil;
import io.openvidu.java.client.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    UserService userService;

    @Autowired
    JwtUtil jwtUtil;


    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final String SENDERON = "senderOn";
    private static final String RECEIVERON = "receiverOn";
    private static final String REJECT = "reject";
    private static final String AUTH = "Authorization";

    @PostMapping("/send")
    public ResponseEntity<Object> makeMeeting(@RequestBody CallSendRequest callRequest) {
        log.info("MeetingController - makeMeeting : 통화걸기 (영상통화 미팅룸 생성)");
        String sessionId = "";
        String senderEmail = callRequest.getSenderEmail();
        String receiverEmail = callRequest.getReceiverEmail();
        String senderName = userService.getUserName(senderEmail);

        CallSendResponse callSendResponse; //전화 요청 성공 후 response 할 객체

        // 0. receiver가 전화 중일 경우 에러 처리
        if (!callHistoryService.senderCanCall(senderEmail, receiverEmail)) {
            log.info("통화 불가 - sender(송신자)에게 온 통화가 있음");
            return new ResponseEntity<>(SENDERON, HttpStatus.OK); //http 200
        } else if(!callHistoryService.receiverCanCall(senderEmail, receiverEmail)) {
            log.info("통화 불가 - receiver(수신자)에게 온 통화가 있음");
            return new ResponseEntity<>(RECEIVERON, HttpStatus.OK); //http 200
        } else {
            log.info("통화가능");
            // 1. session 생성
            UUID randomStr = UUID.randomUUID();
            sessionId = randomStr.toString();

            String initSessionId;
            String senderToken;
            String receiverToken;

            try {
                initSessionId = callHistoryService.initializeSession(sessionId);
                log.info("initSessionId : {}", initSessionId);
                senderToken = callHistoryService.createConnection(initSessionId);
                receiverToken = callHistoryService.createConnection(initSessionId);
                log.info("senderToken : {}", senderToken);
                log.info("receiverToken : {}", receiverToken);
            } catch (OpenViduJavaClientException e) {
                return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR); //http 500
            } catch (OpenViduHttpException e) {
                return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR); //http 500
            }

            // 2. callhistory에 meeting 기록 (상태는 대기?)
            CallHistory callHistory = callHistoryService.createMainCallHistory(senderEmail, receiverEmail);
            // 3. callNo 가져오기
            int currentCallNo = callHistory.getCallNo();
            // 4. receiver에게 통화 알림 및 token 전달
            notificationService.send("call", senderEmail, receiverEmail, sessionId, receiverToken, currentCallNo,
                    senderName+"님에게 영상통화 요청이 왔습니다.");
            // 5. sender에게 token 전달
            callSendResponse = new CallSendResponse(senderToken, sessionId, currentCallNo);
        }

        return new ResponseEntity<>(callSendResponse, HttpStatus.OK); //http 200
    }

    /*
    통화 받기
     */
    @GetMapping("/receive/{callNo}")
    public ResponseEntity<String> receiveMeeting(@PathVariable int callNo)  {
        //이메일과 세션ID를 넘겨주면
        int currentCallNo = callNo;

        CallHistory currentCall = callHistoryService.getCallHistory(currentCallNo);

        // 1. sessionId에 맞는 callhistory의 상태를 통화 중으로 변경
        callHistoryService.updateCallStatus(currentCall, 1);
        // 2. 통화 시작 시간 기록?
        callHistoryService.updateCallTime(currentCall, "start");

        //수신자는 토큰만 만들어서 전달해주자 -> 어차피 바로 통화방으로 연결할 것이기 때문에
        return new ResponseEntity<>(SUCCESS, HttpStatus.OK); //http 200
    }

    @GetMapping("/quit/{callNo}")
    public ResponseEntity<String> closeMeeting(@PathVariable int callNo){
        // 1. sessionId에 맞는 sesison 종료 ->프론트에서 해줌
        // 2. callhistory의 상태를 통화 종료로 변경
        log.info("meeting controller - closeMeeting : callNo = {}", callNo);
        CallHistory currnentCallHistory = callHistoryService.getCallHistory(callNo);
        callHistoryService.updateCallStatus(currnentCallHistory,2);
        callHistoryService.updateCallTime(currnentCallHistory, "end");

        // 3. 통화 종료시 수신자의 SSE event 삭제
        notificationService.deleteEventWhenQuitCall(currnentCallHistory.getCallReceiver());

        return new ResponseEntity<>(SUCCESS, HttpStatus.OK); //http 500
}

    @PostMapping("/recentcall")
    public ResponseEntity<Object> searchRecentCall(@ApiParam(hidden = true) @RequestHeader(value = AUTH) String auth){
        String userEmail =jwtUtil.getUserEmailFromToken(auth);
        List<RecentCall> mapList = callHistoryService.getRecentCallList(userEmail);
        log.info("mapList 크기 : {}",mapList.size());

        LocalDateTime now = LocalDateTime.now();
        for (RecentCall recent : mapList) {
            log.info(recent.getStartTime() + "-" +recent.getEndTime());
            if(recent.getStartTime()!=null){
                log.info("recent.getStartTime() : {}", recent.getStartTime());
                LocalDateTime d = LocalDateTime.parse(recent.getStartTime(),
                        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                if (d.getYear()==now.getYear() && d.getMonth()==now.getMonth() && d.getDayOfMonth()==now.getDayOfMonth()) {
                    recent.setStartTime(d.format(DateTimeFormatter.ofPattern("HH시 mm분")));
                }else {
                    recent.setStartTime(d.format(DateTimeFormatter.ofPattern("YY.MM.dd")));
                }
            }
        }

        return new ResponseEntity<>(mapList, HttpStatus.OK);
    }

    @GetMapping("/reject/{callNo}")
    public ResponseEntity<String> rejectCall(@PathVariable int callNo){
        CallHistory currnentCallHistory = callHistoryService.getCallHistory(callNo);
        callHistoryService.updateCallStatus(currnentCallHistory,2);
        callHistoryService.updateCallTime(currnentCallHistory, "end");
        log.info("수신자 : {}, 송신자: {}", currnentCallHistory.getCallReceiver(), currnentCallHistory.getCallSender());
        notificationService.send("reject",
                                    currnentCallHistory.getCallReceiver(),
                                    currnentCallHistory.getCallSender(),
                 null, null, callNo,
                "통화가 거절되었습니다.");

        return new ResponseEntity<>(REJECT, HttpStatus.OK);
    }


}
