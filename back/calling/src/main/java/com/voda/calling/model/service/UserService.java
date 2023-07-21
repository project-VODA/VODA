package com.voda.calling.model.service;

import com.voda.calling.exception.EmailExistedException;
import com.voda.calling.model.dto.User;
import com.voda.calling.repository.UserRepository;
import com.voda.calling.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class UserService {

    private Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtil jwtUtil;

    @Value("${jwt.secret}")
    private String secretKey;
    private Long expiredMs = 1000 * 60 * 60L;// 토큰 유효기간: 1시간

    public User regist(String userEmail, String userPass, String userName, int userHandicap) {
        //User existed = userRepository.findByEmail(userEmail);
        User existed = userRepository.findUserByUserEmail(userEmail);
        if(existed != null){
            throw new EmailExistedException(userEmail);
        }
        // 가입일 설정
        String userRegTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // **** 해싱하는 부분 ****
        String encodedPassword = passwordEncoder.encode(userPass);
        User user = User.builder()
                .userEmail(userEmail)
                .userName(userName)
                .userPass(encodedPassword)
                .userHandicap(userHandicap)
                .userRegTime(userRegTime)
                .build();

        return userRepository.save(user);
    }


    public String login(String userEmail, String userPass) {
        //User user = userRepository.findByEmail(userEmail);
        User user = userRepository.findUserByUserEmail(userEmail);
        if (user == null) { // 이메일이 틀린 경우
            System.out.println("유저 없음");
        } else if (passwordEncoder.matches(user.getUserPass(), userPass)) {// 비밀번호가 맞은 경우
            System.out.println("유저 맞음");
        } else {// 비밀번호가 틀린 경우
            System.out.println("비밀번호 틀림");
        }
        return jwtUtil.createToken(userEmail, secretKey, expiredMs);
    }

    public User getUser(String userEmail) {
        //User user = userRepository.findByEmail(userEmail);
        User user = userRepository.findUserByUserEmail(userEmail);
        return user;

    }

    public void updateUser(User user) {
        logger.info("updateUser : 사용자 정보 수정");
        User originUser = getUser("ssafy@gmail.com");
        //set 변경사항 추가하기
        userRepository.save(user);
    }
}
