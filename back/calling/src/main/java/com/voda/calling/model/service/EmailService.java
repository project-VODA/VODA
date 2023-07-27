package com.voda.calling.model.service;

import com.voda.calling.exception.EmailExistedException;
import com.voda.calling.exception.NotRegisteredException;
import com.voda.calling.model.dto.User;
import com.voda.calling.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@AllArgsConstructor
@Slf4j
public class EmailService {

    private static final int IS_CANCELED = 1; // 탈퇴 유저
    private static final int IS_NOT_CANCELED = 0; // 탈퇴 안 한 유저

    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    UserRepository userRepository;

    public String sendAuthenticationCode(String to) throws Exception{
        // 중복 메일 체크
        User existed = userRepository.findUserByUserEmailAndUserCancel(to, IS_NOT_CANCELED);
        if(existed != null){
            throw new EmailExistedException(to);
        }

        // 인증 코드 생성
        String authenticationCode = createKey();

        // 이메일 내용 작성
        String content = "";
        content += "<div style='margin:100px;'>";
        content += "<h1> VODA 회원가입 인증번호 </h1>";
        content += "<br/>";
        content += "<p> 안녕하세요, VODA입니다.</p><br/>";
        content += "<p> 아래 인증코드를 회원가입 창으로 돌아가 입력해주세요!</p><br/>";
        content += "<div align='center' style='border:1px solid black; font-size: 150%;'>";
        content += "<h3 style='color:#000435;'>회원가입 인증 코드</h3>";
        content += "CODE : <strong>" + authenticationCode + "</strong></div><br/>";
        content += "</div>";

        // 이메일 내용 적재
        MimeMessage message = javaMailSender.createMimeMessage();
        // 수신자
        message.addRecipients(MimeMessage.RecipientType.TO, to);
        // 제목
        message.setSubject("VODA 회원가입 이메일 인증");
        // 내용
        message.setText(content, "utf-8", "html");
        // 발신자
        message.setFrom("voda.a707@gmail.com");

        // 이메일 발신
        javaMailSender.send(message);

        // 인증 코드 리턴
        return authenticationCode;
    }

    public Map<String, Object> sendTemporaryPassword(String to) throws Exception{
        log.info("emailService 호출 - 임시 비밀번호 발급 :" + to);
        to = to.replace("\"","");
        // 중복 메일 체크
        User existed = userRepository.findUserByUserEmail(to);

        if(existed == null){
            throw new NotRegisteredException();
        }
        log.info("서비스단 유저정보: " + existed);

        // 임시 비밀번호 생성
        String temporaryPassword = createKey();
        log.info(temporaryPassword);
        // 이메일 내용 작성
        String content = "";
        content += "<div style='margin:100px;'>";
        content += "<h1> VODA 임시 비밀번호 발급 </h1>";
        content += "<br/>";
        content += "<p> 안녕하세요, VODA입니다.</p><br/>";
        content += "<p> 아래 임시 비밀번호를 통해 로그인 후 비밀번호를 변경해주세요!</p><br/>";
        content += "<div align='center' style='border:1px solid black; font-size: 150%;'>";
        content += "<h3 style='color:#000435;'>임시 비밀번호</h3>";
        content += "CODE : <strong>" + temporaryPassword + "</strong></div><br/>";
        content += "</div>";

        // 이메일 내용 적재
        MimeMessage message = javaMailSender.createMimeMessage();
        // 수신자
        message.addRecipients(MimeMessage.RecipientType.TO, to);
        // 제목
        message.setSubject("VODA 임시 비밀번호 발급");
        // 내용
        message.setText(content, "utf-8", "html");
        // 발신자
        message.setFrom("voda.a707@gmail.com");

        // 이메일 발신
        javaMailSender.send(message);

        // 유저 정보와 인증 코드 발송
        Map<String, Object> returnData = new HashMap<>();
        returnData.put("user", existed);
        returnData.put("temporaryPassword", temporaryPassword);

        // 인증 코드 리턴
        return returnData;
    }

    private static String createKey() {
        StringBuffer key = new StringBuffer();
        Random random = new Random();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(3);

            switch (index) {
                case 0:
                    // a ~ z
                    key.append((char) ((int) (random.nextInt(26)) + 97));
                    break;
                case 1:
                    // A ~ Z
                    key.append((char) ((int) (random.nextInt(26) + 65)));
                    break;
                case 2:
                    // 0 ~ 9
                    key.append((random.nextInt(10)));
                    break;
            }
        }

        return key.toString();
    }


}
