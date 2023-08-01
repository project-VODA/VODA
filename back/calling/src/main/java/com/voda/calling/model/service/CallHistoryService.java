package com.voda.calling.model.service;

import com.voda.calling.model.dto.CallHistory;
import com.voda.calling.repository.CallHistoryRepository;
import io.openvidu.java.client.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class CallHistoryService {

    @Value("${openvidu.url}")
    private String openViduUrl;

    @Value("${openvidu.secret}")
    private String openViduSecret;

    private OpenVidu openVidu;

    @Autowired
    CallHistoryRepository callHistoryRepository;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    public boolean canCall(String senderEmail, String receiverEmail){
        // 통화상태 0(대기중) : 먼저 전화를 건 사람이 있는 상태
        // 통화상태 1(통화중) : 통화 진행 중
        CallHistory currentSender = callHistoryRepository.findCallHistoryBySenderEmail(senderEmail);
        CallHistory currentReceiver = callHistoryRepository.findCallHistoryByReceiverEmail(receiverEmail);

        if(currentSender==null && currentReceiver==null){
            return true;
        }
        return false;
    }

    public CallHistory createMainCallHistory (String senderEmail, String receiverEmail) {
        CallHistory newCallHistory = CallHistory.builder()
                .callSender(senderEmail)
                .callReceiver(receiverEmail)
                .callCancel(0)
                .callStatus(0)
                .build();
        return callHistoryRepository.save(newCallHistory);
    }

    public void updateCallStatus(int currentStatus){

    }

    public void updateCallTime(String msg){
        if(msg.equals("start")){

        }else if(msg.equals("end")){

        }
    }


    public String initializeSession(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        Map<String,String> params = new HashMap<>();
        params.put("customSessionId",sessionId);
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openVidu.createSession(properties);
        return session.getSessionId();
    }

    public String createConnection(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openVidu.getActiveSession(sessionId);
        if (session == null) {
            return FAIL;
        }
        Map<String,String> params = new HashMap<>();
        params.put("","");
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return connection.getToken();
    }





}
