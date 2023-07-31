package com.voda.calling.controller;

import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@Api("Sse")
@CrossOrigin("*")
@Slf4j
public class NotificationController {

    @GetMapping(value = "/subscribe/{userEmail}", produces = "text/event-stream")
    public SseEmitter makeSseConnection(
            @PathVariable String userEmail,
            @RequestHeader(value = "Last-Event-Id", required = false, defaultValue = "") String lastEventId){
        return null;
    }
}
