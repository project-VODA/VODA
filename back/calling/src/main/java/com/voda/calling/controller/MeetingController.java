package com.voda.calling.controller;

import io.openvidu.java.client.*;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.Map;

@RestController
@RequestMapping("/meetings")
@Api(tags = "meeting")
@CrossOrigin("*")
@Slf4j
public class MeetingController {

    @Value("${openvidu.url}")
    private String openViduUrl;

    @Value("${openvidu.secret}")
    private String openViduSecret;

    private OpenVidu openVidu;

    @PostConstruct
    public void init() { this.openVidu = new OpenVidu(openViduUrl, openViduSecret);}

    public ResponseEntity<String> makeMeeting(@RequestBody String senderEmail, @RequestBody String receiverEmail){
        // 0. receiver가 전화 중일 경우 에러 처리

        // 1. session 생성

        // 2. session에 맞는 token 2개 생성

        // 3. callhistory에 meeting 기록 (상태는 대기?)

        // 4. receiver에게 통화 알림 및 token 전달

        // 5. sender에게 token 전달
        return null;
    }

    public ResponseEntity startMeeting(){
        // 1. sessionId에 맞는 callhistory의 상태를 통화 중으로 변경

        // 2. 통화 시작 시간 기록?

        return null;
    }

    public ResponseEntity closeMeeting(){
        // 1. sessionId에 맞는 sesison 종료

        // 2. callhistory의 상태를 통화 종료로 변경

        // 3. callhistory 및 user 연결 테이블에 기록

        return null;
    }

    /**
     * @param params The Session properties
     * @return The Session ID
     */
    // session을 만드는 함수
    @PostMapping("/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openVidu.createSession(properties);
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }

    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    // sessionId에 맞는 session의 토큰을 얻는 함수
    @PostMapping("/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openVidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

}
