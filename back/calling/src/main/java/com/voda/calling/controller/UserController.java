package com.voda.calling.controller;

import com.voda.calling.model.dto.User;
import com.voda.calling.model.service.UserService;
import io.swagger.annotations.*;
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
            @ApiResponse(code=500, message="회원가입 실패 - 서버(DB)오류")
    })
    @PostMapping("/regist")
    public ResponseEntity<User> regist(@RequestBody User user) {
        System.out.println("유저 컨트롤러 호출");
        userService.regist(user.getUserEmail(), user.getUserPass(), user.getUserName(), user.getUserHandicap());
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        System.out.println("로그인 시도");

        return ResponseEntity.ok().body(userService.login(user.getUserEmail(), user.getUserPass()));
    }

    @GetMapping("/mypage/{userEmail}")
    public ResponseEntity<User> getUserInfo(@PathVariable String userEmail){
        User user = userService.getUser(userEmail);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

}
