package com.voda.calling.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.voda.calling.exception.AlarmFailedException;
import com.voda.calling.model.service.NotificationService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@Api("Sse")
@CrossOrigin("*")
@Slf4j
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @GetMapping(value = "/subscribe/{userEmail}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> makeSseConnection(
            @PathVariable String userEmail,
            @RequestHeader(value = "Last-Event-Id", required = false, defaultValue = "") String lastEventId){
        try{
            SseEmitter sseEmitter = notificationService.subscribe(userEmail, lastEventId);
            return ResponseEntity.ok().header("Content-Type", MediaType.TEXT_EVENT_STREAM_VALUE)
                    .body(sseEmitter);
        } catch (AlarmFailedException e){
            return ResponseEntity.internalServerError().build();
        }
    }
}
