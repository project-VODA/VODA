package com.voda.calling.controller;

import com.voda.calling.exception.NotRegisteredException;
import com.voda.calling.exception.PasswordWrongException;
import com.voda.calling.model.dto.User;
import com.voda.calling.model.service.UserService;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Api(tags="user")
@RequestMapping("/users")
@CrossOrigin("*")
@Slf4j
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
        userService.regist(user.getUserEmail(), user.getUserPass(), user.getUserName(), user.getUserHandicap());
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @ApiOperation(value = "로그인", notes = "User 객체를 이용해 로그인을 하는 API")
    @ApiResponses({
            @ApiResponse(code=200, message="로그인 성공"),
            @ApiResponse(code=401, message="로그인 실패 - 비밀번호 오류"),
            @ApiResponse(code=404, message="로그인 실패 - 등록 정보 없음"),
            @ApiResponse(code=500, message="로그인 실패 - 서버(DB)오류")
    })
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        log.info("로그인 시도");
        try{
            return ResponseEntity.ok()
                    .body(userService.login(user.getUserEmail(), user.getUserPass()));
        }catch (PasswordWrongException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }catch (NotRegisteredException e){
            return ResponseEntity.notFound().build();
        }catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/mypage/{userEmail}")
    public ResponseEntity<User> getUserInfo(@PathVariable String userEmail){
        User user = userService.getUser(userEmail);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

}
