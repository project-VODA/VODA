package com.voda.calling.controller;

import com.voda.calling.exception.EmailExistedException;
import com.voda.calling.exception.NotRegisteredException;
import com.voda.calling.model.dto.User;
import com.voda.calling.model.service.EmailService;
import com.voda.calling.model.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
@Api(tags = "Email")
@Slf4j
@CrossOrigin("*")
public class EmailController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    EmailService emailService;

    @Autowired
    UserService userService;

    @PostMapping("/regist")
    @ApiOperation(value = "인증코드 이메일 전송", notes = "회원가입 시 인증을 위해 인증코드가 담긴 이메일을 보내준다.")
    @ApiResponses({
            @ApiResponse(code=200, message="메일 전송 성공"),
            @ApiResponse(code=500, message="메일 전송 실패 - 호스트 연결 실패")
    })
    public ResponseEntity<?> emailAuthenticationCodeSend(@RequestBody String email) throws Exception {

        try {
            // email로 인증 코드 발송 후 authenticationCode에 저장
            String authenticationCode = emailService.sendAuthenticationCode(email);
            log.info("인증 코드 생성/발송 성공: " + authenticationCode);
            // 인증 코드 리턴
            return new ResponseEntity<String>(authenticationCode, HttpStatus.OK);
        }catch (Exception e) {
            log.info("인증 코드 생성/발송 실패");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/pass")
    @ApiOperation(value = "임시 비밀번호 이메일 전송", notes = "비밀번호를 잊은 상황에서 임시 비밀번호가 담긴 이메일 보내기")
    public ResponseEntity<?> sendTemporaryPassword(@RequestBody String email) throws Exception {
        // 해당 email로 된 유저 정보가 존재하는지 검사
        User user = userService.getUser(email);
        if (user == null) {
            log.info("비밀번호 찾기 - 일치되는 이메일 존재하지 않음");
            throw new NotRegisteredException();
        }

        try{
            // email로 임시 비밀번호 발송 후 temporaryPassword에 저장
            String temporaryPassword = emailService.sendTemporaryPassword(email);
            log.info("임시 비밀번호 생성/발송 성공");
            
            // 임시 비밀번호를 유저 DB에 업데이트
            userService.updatePassword(user, temporaryPassword);
            log.info("임시 비밀번호 DB 업데이트 성공");
            // 인증 코드 리턴
            return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            log.info("임시 비밀번호 생성/발송 실패");
            return new ResponseEntity<String>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
