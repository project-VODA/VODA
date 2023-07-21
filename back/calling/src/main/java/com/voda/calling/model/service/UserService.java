package com.voda.calling.model.service;

import com.voda.calling.exception.EmailExistedException;
import com.voda.calling.exception.NotRegisteredException;
import com.voda.calling.exception.PasswordWrongException;
import com.voda.calling.model.dto.User;
import com.voda.calling.repository.UserRepository;
import com.voda.calling.util.JwtUtil;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtil jwtUtil;

    private static final int IS_CANCELED = 1; // 탈퇴 유저

    public User regist(String userEmail, String userPass, String userName, int userHandicap) {
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



    public Map<String, Object> login(String userEmail, String userPass) {
        User user = userRepository.findUserByUserEmail(userEmail);
        if (user == null || user.getUserCancel() == IS_CANCELED) { // 등록이 안된 유저인 경우
            log.info("{}에 해당하는 유저 없음", userEmail);
            throw new NotRegisteredException();
        } else if(!passwordEncoder.matches(userPass, user.getUserPass())) {// 비밀번호가 틀린 경우
            log.info("{}유저 로그인 실패: 비밀번호 오류", userEmail);
            throw new PasswordWrongException();
        }

        //!!!!!!!!!!!!! repository 수정 필요!!!!!!!!
        User userInfo = User.builder()
                .userEmail(user.getUserEmail())
                .userName(user.getUserName())
                .userHandicap(user.getUserHandicap())
                .build();
        Map<String, Object> loginInfo = new HashMap<>();
        loginInfo.put("accessToken", jwtUtil.createAccessToken(userEmail));
        loginInfo.put("user", userInfo);
        // !!!!!!!!!! refresh token 주입 필요 !!!!!!!!!!!!!!
        String refreshToken = jwtUtil.createRefreshToken();
        loginInfo.put("refreshToken", refreshToken);

        // 정상적 로그인이 이루어진 경우 accessToken, refreshToken, userInfo 반환
        return loginInfo;
    }

    public User getUser(String userEmail) {
        User user = userRepository.findUserByUserEmailAndUserCancel(userEmail, 0); //usercancel을 고려하는 쿼리로 함수 변경
        return user;
    }

    public User logout(String token) {
        String userEmail = jwtUtil.getUserEmailFromToken(token);
        User user = userRepository.findUserByUserEmail(userEmail);
        user.setUserToken(null);
        return userRepository.save(user);
    }

    public User updatePassword(String userEmail, String userPass) {
        User user = userRepository.findUserByUserEmail(userEmail);
        String encodedPassword = passwordEncoder.encode(userPass);
        user.setUserPass(encodedPassword);
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        log.info("updateUser : 사용자 정보 수정");
        userRepository.save(user);
        return userRepository.findUserByUserEmailAndUserCancel(user.getUserEmail(),0);
    }
}
