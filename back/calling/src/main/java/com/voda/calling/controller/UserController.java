package com.voda.calling.controller;

import com.voda.calling.model.dto.User;
import com.voda.calling.model.service.UserService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@Api(tags="User")
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

    @ApiOperation( value = "로그아웃", notes = "userToken을 null로 바꾸고 세션을 초기화해서 로그아웃하는 API")
    @ApiResponses({
            @ApiResponse(code=200, message="로그아웃 성공"),
            @ApiResponse(code=500, message="로그아웃 실패 - 서버(DB)오류")
    })
    @GetMapping("/logout")
    public ResponseEntity<String> logout(String token, HttpSession session){
        System.out.println("로그아웃 시도");

        User logoutUser = userService.logout(token);
        if(logoutUser.getUserToken()==null){
            session.invalidate();
            System.out.println("로그아웃 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }else{
            System.out.println("로그아웃 실패");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/pass")
    public ResponseEntity<String> changePassword(@RequestBody User user) {
        System.out.println("비밀번호 변경");

        userService.updatePassword(user.getUserEmail(), user.getUserPass());
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

//    @PostMapping("/mypage")
//    public ResponseEntity<User> updateUserInfo(@RequestBody User user){
//
//    }

}
