package com.voda.calling.controller;

import com.voda.calling.model.dto.User;
import com.voda.calling.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    UserService userService;

    @PostMapping("/regist")
    public ResponseEntity<String> register(@RequestBody User user) {


        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

}
