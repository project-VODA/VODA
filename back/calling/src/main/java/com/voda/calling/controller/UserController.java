package com.voda.calling.controller;

import com.voda.calling.exception.NotRegisteredException;
import com.voda.calling.exception.PasswordWrongException;
import com.voda.calling.model.dto.User;
import com.voda.calling.model.dto.UserChangePasswordRequest;
import com.voda.calling.model.service.NotificationService;
import com.voda.calling.model.service.UserService;
import com.voda.calling.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Api(tags="User")
@RequestMapping("/users")
@CrossOrigin("*")
@Slf4j
public class UserController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final String AUTH = "Authorization";

    @Autowired
    UserService userService;

    @Autowired
    NotificationService notificationService;

    @Autowired
    JwtUtil jwtUtil;

    @ApiOperation( value = "회원가입", notes = "User 객체를 이용해 회원가입을 하는 API")
    @ApiResponses({
            @ApiResponse(code=200, message="회원가입 성공"),
            @ApiResponse(code=500, message="회원가입 실패 - 서버(DB)오류")
    })
    @PostMapping("/regist")
    public ResponseEntity<?> regist(@RequestBody User user) {   
        try{
            userService.regist(user.getUserEmail(), user.getUserPass(), user.getUserName(), user.getUserHandicap());
            log.info("회원가입 성공");
            return new ResponseEntity<User>(user, HttpStatus.OK);    
        }catch (Exception e) {
            log.info("회원가입 실패 - 서버(DB) 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    @ApiOperation(value = "로그인", notes = "User 객체를 이용해 로그인을 하는 API")
    @ApiResponses({
            @ApiResponse(code=200, message="로그인 성공"),
            @ApiResponse(code=401, message="로그인 실패 - 비밀번호 오류"),
            @ApiResponse(code=500, message="로그인 실패 - 서버(DB)오류")
    })
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        log.info("로그인 시도");
        try{
            return ResponseEntity.ok()
                    .body(userService.login(user.getUserEmail(), user.getUserPass()));
        } catch (PasswordWrongException | NotRegisteredException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }

    @ApiOperation(value = "마이페이지 개인 회원정보조회", notes = "마이페이지에서 로그인된 회원(User) 1명을 조회하는 API")
    @ApiResponses({
            @ApiResponse(code=200, message="조회 성공"),
            @ApiResponse(code=401, message="인증 실패"),
            @ApiResponse(code=500, message="조회 실패 - 서버(DB)오류")
    })
    @GetMapping("/mypage")
    public ResponseEntity<?> getUserInfo(@ApiParam(hidden = true) @RequestHeader(value = AUTH) String auth){
        try{
            String userEmail = jwtUtil.getUserEmailFromToken(auth);
            User user = userService.getUser(userEmail);
            User returned = User.builder()
                    .userEmail(user.getUserEmail())
                    .userName(user.getUserName())
                    .userHandicap(user.getUserHandicap())
                    .build();
            return new ResponseEntity<User>(returned, HttpStatus.OK);
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }catch (Exception e) {
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    @ApiOperation( value = "로그아웃", notes = "userToken을 null로 바꾸고 로그아웃하는 API")
    @ApiResponses({
            @ApiResponse(code=200, message="로그아웃 성공"),
            @ApiResponse(code=500, message="로그아웃 실패 - 서버(DB)오류")
    })
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody String userEmail){
        log.info("로그아웃 시도");
        //1. 유저이메일로 유저 정보 가져오기
        String replacedEmail = userEmail.replace("\"", "");
        try{
            User logoutUser = userService.getUser(replacedEmail);
            if(logoutUser == null) return ResponseEntity.internalServerError().build();
            notificationService.deleteSseEmitter(userEmail);
            //2. 해당 유저로 로그아웃
            userService.logout(logoutUser);
            log.info("로그아웃 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (Exception e){
            log.info("로그아웃 실패: {}", e.getStackTrace());
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation( value = "비밀번호 재설정", notes = "이메일, 현재 비밀번호, 변경할 비밀번호 입력받아서 비밀번호 재설정하고 로그아웃하는 API")
    @ApiResponses({
            @ApiResponse(code=200, message="비밀번호 재설정 성공"),
            @ApiResponse(code=401, message="비밀번호 재설정 실패 - 인증실패(현재 비밀번호 틀림)"),
            @ApiResponse(code=500, message="비밀번호 재설정 실패 - 서버(DB)오류")
    })
    @PostMapping("/pass")
    public ResponseEntity<String> changePassword(@ApiParam(hidden = true) @RequestHeader(value = AUTH) String auth, @RequestBody UserChangePasswordRequest userChangePassword) {
        log.info("비밀번호 재설정");
        try{
            //1. 현재 비밀번호 일치하는지 확인
            User user = userService.checkOriginalPass(jwtUtil.getUserEmailFromToken(auth), userChangePassword.getOriginalPass());
            //2. 현재 비밀번호 일치하면 비밀번호 재설정
            userService.updatePassword(user, userChangePassword.getNewPass());
            log.info("비밀번호 재설정 성공");
            //3. 재설정되면 로그아웃
            userService.logout(user);
            log.info("비밀번호 재설정 후 로그아웃 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        }catch (PasswordWrongException e){
            return new ResponseEntity<String>(FAIL, HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @ApiOperation(value = "마이페이지 개인 회원정보수정", notes = "마이페이지에서 로그인된 회원(User) 1명의 정보를 수정하는 API")
    @ApiResponses({
            @ApiResponse(code=200, message="수정 성공"),
            @ApiResponse(code=500, message="수정 실패 - 서버(DB)오류")
    })
    @PutMapping("/mypage")
    public ResponseEntity<?> updateUserInfo(@ApiParam(hidden = true) @RequestHeader(value = AUTH) String auth, @RequestBody User user){
        log.info("마이페이지 수정");
        try{
            user.setUserEmail(jwtUtil.getUserEmailFromToken(auth));
            User updateUser = userService.updateUser(user);
            log.info("마이페이지 수정 성공");
            User returned = User.builder()
                    .userName(updateUser.getUserName())
                    .userHandicap(updateUser.getUserHandicap())
                    .build();
            return new ResponseEntity<User>(returned, HttpStatus.OK);
        }catch (ExpiredJwtException e) {
            log.info("마이페이지 수정 실패 - 비 인증 토큰");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            log.info("마이페이지 수정 실패");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    @ApiOperation(value = "회원 탈퇴", notes = "로그인된 회원(User)이 회원 탈퇴를 진행하는 API")
    @ApiResponses({
            @ApiResponse(code=200, message="탈퇴 성공"),
            @ApiResponse(code=500, message="탈퇴 실패 - 서버(DB)오류")
    })
    @DeleteMapping("")
    public ResponseEntity<String> canceledUser(@ApiParam(hidden = true) @RequestHeader(value = AUTH) String auth){
        log.info("UserController - canceledUser : 회원탈퇴");
        try {
            userService.canceledUser(jwtUtil.getUserEmailFromToken(auth));
            log.info("회원탈퇴 성공");
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);    
        }catch (ExpiredJwtException e) {
            log.info("회원탈퇴 실패 - 비 인증 토큰");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }catch (Exception e) {
            log.info("회원탈퇴 실패 - 서버(DB) 오류");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    
    @ApiOperation(value = "새로운 accessToken 발급", notes = "accessToken이 만료되었을 경우 refreshToken을 통해 재발급 받는 API")
    @ApiResponses({
            @ApiResponse(code=200, message = "발급 성공 - 새로운 accessToken 발급 성공"),
            @ApiResponse(code=401, message = "발급 실패 - 유효하지 않은 refreshToken"),
            @ApiResponse(code=500, message = "발급 실패 - 서버 오류")
    })
    @GetMapping("/token")
    public ResponseEntity<Map<String, Object>> getNewAccessToken(@ApiParam(hidden = true) @RequestHeader(value = AUTH) String auth){
        String refreshToken = jwtUtil.extractTokenFromHeader(auth);
        log.info(refreshToken);
        String accessToken = userService.getNewAccessToken(refreshToken);
        if(accessToken != null){
            return ResponseEntity.ok()
                    .body(Map.of("accessToken", accessToken));
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
