package com.voda.calling.model.service;

import com.querydsl.core.Tuple;
import com.voda.calling.mapper.CallHistoryMapper;
import com.voda.calling.model.dto.CallHistory;
import com.voda.calling.model.dto.RecentCall;
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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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

    @Autowired
    CallHistoryMapper callHistoryMapper;

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @PostConstruct
    public void init() { this.openVidu = new OpenVidu(openViduUrl, openViduSecret);}

    public boolean senderCanCall(String senderEmail, String receiverEmail){
        // 통화상태 0(대기중) : 먼저 전화를 건 사람이 있는 상태
        // 통화상태 1(통화중) : 통화 진행 중
        CallHistory currentSender = callHistoryRepository.findCallHistoryBySenderEmail(senderEmail);

        if(currentSender==null){
            return true;
        }
        return false;
    }

    public boolean receiverCanCall(String senderEmail, String receiverEmail){
        // 통화상태 0(대기중) : 먼저 전화를 건 사람이 있는 상태
        // 통화상태 1(통화중) : 통화 진행 중
        CallHistory currentReceiver = callHistoryRepository.findCallHistoryByReceiverEmail(receiverEmail);

        if(currentReceiver==null){
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
//        Timestamp nowTime = new Timestamp(System.currentTimeMillis());
//        SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
//        nowTime = Timestamp.valueOf(sdf.format(nowTime));
//        log.info(nowTime.toString());

        LocalDateTime nowTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        Timestamp formattedNowTime = Timestamp.valueOf(nowTime.format(formatter));
        log.info(String.valueOf(formattedNowTime));

        if(msg.equals("start")){
            currentcallHistory.setCallStarttime(formattedNowTime);
        }else if(msg.equals("end")){
            currentcallHistory.setCallEndtime(formattedNowTime);
        }
        callHistoryRepository.save(currentcallHistory);
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
        List<Map<String, Object>> list = callHistoryMapper.findRecentCall(email);
        List<RecentCall> recentCallList = new ArrayList<>();
        String startTime = "2023-07-24 08:10:30";
        String EndTime = "2023-07-24 08:10:30";
        for (Map<String, Object> item : list){
            log.info("start :{} , end:{}", item.get("call_starttime"), item.get("call_endtime"));

            if(item.get("call_starttime")!=null){
                startTime = item.get("call_starttime").toString();
            }
//            else{
//                startTime = item.get("call_endtime").toString();
//            }

            if(item.get("call_endtime")!=null){
                EndTime = item.get("call_endtime").toString();
            }
//            else{
//                EndTime = item.get("call_starttime").toString();
//            }

            log.info(item.get("senderEmail").toString());

            RecentCall r = RecentCall.builder()
                    .senderEmail(item.get("senderEmail").toString())
                    .senderName(item.get("senderName").toString())
                    .receiverEmail(item.get("receiverEmail").toString())
                    .receiverName(item.get("receiverName").toString())
                    .startTime(startTime)
                    .endTime(EndTime)
                    .build();
            recentCallList.add(r);
        }
        return recentCallList;
    }





}
