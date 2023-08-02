package com.voda.calling.model.service;

import com.voda.calling.model.dto.CallHistory;
import com.voda.calling.model.dto.CallReceiver;
import com.voda.calling.model.dto.RecentCall;
import com.voda.calling.model.dto.UserCallHistory;
import com.voda.calling.repository.CallHistoryRepository;
import io.openvidu.java.client.*;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
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

    @PostConstruct
    public void init() { this.openVidu = new OpenVidu(openViduUrl, openViduSecret);}

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

    public CallHistory getCallHistory (int callNo){
        return callHistoryRepository.findCallHistoryByCallNo(callNo);
    }

    public void updateCallStatus(CallHistory currentcallHistory, int currentStatus){
        currentcallHistory.setCallStatus(currentStatus);
        callHistoryRepository.save(currentcallHistory);
    }

    public void updateCallTime(CallHistory currentcallHistory, String msg){
        Timestamp nowTime = new Timestamp(System.currentTimeMillis());
        SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
        nowTime = Timestamp.valueOf(sdf.format(nowTime));

        if(msg.equals("start")){
            currentcallHistory.setCallStarttime(nowTime);
        }else if(msg.equals("end")){
            currentcallHistory.setCallEndtime(nowTime);
        }
    }


    public String initializeSession(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        Map<String,Object> params = new HashMap<>();
        params.put("customSessionId",sessionId);
        // Map -> JSON
        JSONObject jsonParam = new JSONObject(params);
        SessionProperties properties = SessionProperties.fromJson(jsonParam).build();
        Session session = openVidu.createSession(properties);
        return session.getSessionId();
    }

    public String createConnection(String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openVidu.getActiveSession(sessionId);
        if (session == null) {
            return FAIL;
        }
        Map<String,Object> params = new HashMap<>();
        // Map -> JSON
        JSONObject jsonParam = new JSONObject(params);
        ConnectionProperties properties = ConnectionProperties.fromJson(jsonParam).build();
        Connection connection = session.createConnection(properties);
        return connection.getToken();
    }

    public List<RecentCall> getRecentCallList(String email) {
        List<RecentCall> list = callHistoryRepository.findAllByUserEmail(email);
        return list;
    }





}
