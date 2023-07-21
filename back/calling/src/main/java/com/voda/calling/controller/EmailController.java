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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
@Api(tags = "Email")
@Slf4j
//@CrossOrigin("*")
public class EmailController {

    private static final String SUCCESS = "success";

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
    public ResponseEntity<?> emailAuthenticationCodeSend(String email) throws Exception {
        // email로 인증 코드 발송 후 authenticationCode에 저장
        String authenticationCode = emailService.sendAuthenticationCode(email);

        // 인증 코드 리턴
        return new ResponseEntity<String>(authenticationCode, HttpStatus.OK);
    }

    @PostMapping("/pass")
    @ApiOperation(value = "임시 비밀번호 이메일 전송", notes = "비밀번호를 잊은 상황에서 임시 비밀번호가 담긴 이메일 보내기")
    public ResponseEntity<?> sendTemporaryPassword(String email) throws Exception {
        // 해당 email로 된 유저 정보가 존재하는지 검사
        User user = userService.getUser(email);
        if (user == null) {
            throw new NotRegisteredException();
        }

        // email로 임시 비밀번호 발송 후 temporaryPassword에 저장
        String temporaryPassword = emailService.sendTemporaryPassword(email);

        // 임시 비밀번호를 유저 DB에 업데이트
        userService.updatePassword(user, temporaryPassword);

        // 인증 코드 리턴
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

}
