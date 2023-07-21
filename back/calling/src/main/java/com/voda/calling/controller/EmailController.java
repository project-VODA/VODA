package com.voda.calling.controller;

import com.voda.calling.model.dto.User;
import com.voda.calling.model.service.EmailService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
@Api(tags = "Email")
@Slf4j
//@CrossOrigin("*")
public class EmailController {

    @Autowired
    EmailService emailService;

    @PostMapping("/regist")
    @ApiOperation(value = "회원가입 시 인증코드가 담긴 이메일 보내기")
    public ResponseEntity<?> emailAuthenticationCodeSend(String email) throws Exception {
        // email로 인증 코드 발송 후 authenticationCode에 저장
        String authenticationCode = emailService.sendAuthenticationCode(email);

        // 인증 코드 리턴
        return new ResponseEntity<String>(authenticationCode, HttpStatus.OK);
    }

    @PostMapping("/pass")
    @ApiOperation(value = "비밀번호를 잊은 상황에서 임시 비밀번호가 담긴 이메일 보내기")
    public ResponseEntity<?> sendTemporaryPassword(String email) throws Exception {
        // email로 임시 비밀번호 발송 후 authenticationCode에 저장
        String temporaryPassword = emailService.sendAuthenticationCode(email);

        // 임시 비밀번호를 유저 DB에 업데이트
        //User user =

        // 인증 코드 리턴
        return new ResponseEntity<String>(temporaryPassword, HttpStatus.OK);
    }

}
