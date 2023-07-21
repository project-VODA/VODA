package com.voda.calling.model.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
@AllArgsConstructor
public class EmailService {

    @Autowired
    JavaMailSender javaMailSender;

    public String sendAuthenticationCode(String to) throws Exception{
        // 인증 코드 생성
        String authenticationCode = createKey();

        // 이메일 내용 작성
        String content = "";
        content += "<div style='margin:100px;'>";
        content += "<h1> VODA 회원가입 인증번호 </h1>";
        content += "<br/>";
        content += "<p> 안녕하세요, VODA입니다.</p><br/>";
        content += "<p> 아래 인증코드를 회원가입 창으로 돌아가 입력해주세요!</p><br/>";
        content += "<div align='center' style='border:1px solid black;'>";
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

    public String sendTemporaryPassword(String to) throws Exception{
        // 임시 비밀번호 생성
        String temporaryPassword = createKey();

        // 이메일 내용 작성
        String content = "";
        content += "<div style='margin:100px;'>";
        content += "<h1> VODA 임시 비밀번호 발급 </h1>";
        content += "<br/>";
        content += "<p> 안녕하세요, VODA입니다.</p><br/>";
        content += "<p> 아래 임시 비밀번호를 통해 로그인 후 비밀번호를 변경해주세요!</p><br/>";
        content += "<div align='center' style='border:1px solid black;'>";
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

        // 인증 코드 리턴
        return temporaryPassword;
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
