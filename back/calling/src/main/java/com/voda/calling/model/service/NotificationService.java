package com.voda.calling.model.service;

import com.voda.calling.exception.AlarmFailedException;
import com.voda.calling.model.dto.CallNotification;
import com.voda.calling.repository.SseRepository;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;

@Service
@Slf4j
public class NotificationService {
    private static final Long DEFAULT_TIMEOUT = 120L * 1000 * 60;

    @Autowired
    SseRepository sseRepository;

    /**
     * 로그인 할 때 sse connection 생성
     *
     * @param userEmail
     * @param lastEventId
     * @return SseEmitter 객체
     */
    public SseEmitter subscribe(String userEmail, String lastEventId){
        // id 생성
        String id = getIdWithTime(userEmail);

        // 할당된 sseEmitter가 있을 경우 모두 삭제
        if(sseRepository.findAllEmitterStartWithByEmail(userEmail) != null){
            sseRepository.deleteAllEmitterStartWithEmail(userEmail);
        }

        // sseEmitter 생성 및 저장
        SseEmitter sseEmitter = sseRepository.save(id, new SseEmitter(DEFAULT_TIMEOUT));

        // 문제가 생길경우 취소
        sseEmitter.onCompletion(() -> sseRepository.deleteById(id));
        sseEmitter.onTimeout(() -> sseRepository.deleteById(id));
        sseEmitter.onError((e) -> sseRepository.deleteById(id));

        // 에러 방지 위해 더미 데이터 보내기
        sendToClient(sseEmitter, id, "SSE Connection Success");

        // 본인에게 미수신된 이벤트 수신
        if(!lastEventId.isEmpty()){
            Map<String, Object> events = sseRepository.findAllEventCacheStartWithByEmail(userEmail);
            events.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> sendToClient(sseEmitter, entry.getKey(), entry.getValue()));
        }

        return null;
    }

    /**
     * 이 함수를 통해 메시지 전달
     * @param senderEmail
     * @param receiverEmail
     * @param content
     */
    public void send(String senderEmail, String receiverEmail, String content){
        // 전달할 내용 생성
        CallNotification callNotification = makeNotification(senderEmail, receiverEmail, content);
        // receiver에게 해당되어 있는 sseEmitter 가져오기
        Map<String, SseEmitter> sseEmitters = sseRepository.findAllEmitterStartWithByEmail(receiverEmail);
        // receiver id 생성
        String receiverId = getIdWithTime(receiverEmail);
        // eventcache에 저장
        sseRepository.saveEventCache(receiverId, callNotification);
        // 각각의 sseEmitter에게 메시지 전달
        sseEmitters.forEach((key, emitter) -> {
            sendToClient(emitter, receiverId, callNotification);
        });
    }

    /**
     * emitter를 통해 id를 송신자로 data를 보냄
     * @param emitter
     * @param id
     * @param data
     */
    private void sendToClient(SseEmitter emitter, String id, Object data){
        try{
            emitter.send(SseEmitter.event().id(id).name("sse").data(data));
        }catch (IOException e){
            sseRepository.deleteById(id);
            throw new AlarmFailedException();
        }
    }

    /**
     * userEmail에 현재 시간을나타내는 값을 조합한 ID
     * @param userEmail
     * @return {userEmail}_{time}
     */
    private String getIdWithTime(String userEmail){
        return userEmail + "_" + System.currentTimeMillis();
    }

    /**
     * 송,수신자 이메일 및 content를 내용으로 하는 callNotification 생성
     * @param senderEmail
     * @param receiverEmail
     * @param content
     * @return callNotification
     */
    private CallNotification makeNotification(String senderEmail, String receiverEmail, String content){
        return CallNotification.builder()
                .senderEmail(senderEmail)
                .receiverEmail(receiverEmail)
                .content(content)
                .build();
    }
}
