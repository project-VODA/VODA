package com.voda.calling.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/errors")
@Slf4j
public class ErrorController {

    @RequestMapping("/unauthorized")
    public ResponseEntity sendUnauthorized(){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @RequestMapping("/notfound")
    public ResponseEntity sendNotFound() {
        return ResponseEntity.notFound().build();
    }

}
