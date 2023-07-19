package com.voda.calling.controller;

import com.voda.calling.model.dto.User;
import com.voda.calling.model.service.UserService;
import io.swagger.annotations.*;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags="user")
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    UserService userService;

    @ApiOperation( value = "회원가입", notes = "User 객체를 이용해 회원가입을 하는 API")
    @ApiResponses({
            @ApiResponse(code=200, message="회원가입 성공"),
//            @ApiResponse(code=400, message="회원가입 실패")
    })
    @PostMapping("/regist")
    public ResponseEntity<String> register(@RequestBody User user) {


        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

}
