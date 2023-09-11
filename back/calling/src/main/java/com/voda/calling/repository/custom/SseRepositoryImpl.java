package com.voda.calling.repository.custom;

import com.voda.calling.model.dto.CallNotification;
import com.voda.calling.repository.SseRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
@Slf4j
public class SseRepositoryImpl implements SseRepository {
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final Map<String, CallNotification> eventCache = new ConcurrentHashMap<>();

    /**
     * emitterId-sseEmitter 쌍을 저장
     * @param id
     * @param sseEmitter
     * @return sseEmitter
     */
    @Override
    public SseEmitter save(String id, SseEmitter sseEmitter) {
        emitters.put(id, sseEmitter);
        return sseEmitter;
    }

    /**
     * event cache에 event 저장
     * @param eventCacheId
     * @param event
     */
    @Override
    public void saveEventCache(String eventCacheId, CallNotification event) {
        eventCache.put(eventCacheId, event);
    }

    /**
     * userEmail에 맞는 모든 sseEmitter 반환
     * @param userEmail
     * @return sseEmitter들
     */
    @Override
    public Map<String, SseEmitter> findAllEmitterStartWithByEmail(String userEmail) {
        return emitters.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(userEmail))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    @Override
    public Map<String, SseEmitter> findAllEmitterStartWithByEmailInList(List emails) {
        return null;
    }

    @Override
    public Map<String, CallNotification> findAllEventCacheStartWithByEmail(String userEmail) {
        return eventCache.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(userEmail))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    /**
     * id에 해당하는 emitter 삭제
     * @param id
     */
    @Override
    public void deleteById(String id) {
        emitters.remove(id);
    }

    /**
     * userEmail에 할당된 모든 sseEmitter 삭제
     * @param userEmail
     */
    @Override
    public void deleteAllEmitterStartWithEmail(String userEmail) {
        emitters.forEach((key, emitter) -> {
            if(key.startsWith(userEmail)){
                emitters.remove(key);
            }
        });
    }

    @Override
    public void deleteAllEventCacheStartWithId(String userEmail) {
        eventCache.forEach((key, event) -> {
            if(key.startsWith(userEmail)){
                eventCache.remove(key);
            }
        });
    }
}
