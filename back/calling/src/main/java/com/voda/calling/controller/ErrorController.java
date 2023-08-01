package com.voda.calling.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/errors")
@Slf4j
@ApiIgnore
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
