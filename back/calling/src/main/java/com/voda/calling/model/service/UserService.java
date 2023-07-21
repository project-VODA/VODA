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
        User user = userRepository.findUserByUserEmail(userEmail);
        return user;
    }

    public User getUserByToken(String token){
        String userEmail = jwtUtil.getUserEmailFromToken(token);
        return userRepository.findUserByUserEmail(userEmail);
    }

    public User logout(User user){
        user.setUserToken(null);
        return user;
    }

    public User checkOriginalPass(String userEmail, String originalPass) {
        User user = userRepository.findUserByUserEmail(userEmail);
        if(!passwordEncoder.matches(originalPass, user.getUserPass())){
            //비밀번호 일치하지 않으면 PasswordWrongException 발생
            log.info("{}비밀번호 변경 실패: 비밀번호 오류", userEmail);
            System.out.println(user.getUserPass());
            System.out.println(passwordEncoder.encode(originalPass));
            throw new PasswordWrongException();
        }
        return user;
    }

    public void updatePassword(User user, String newPass) {
        String encodedPassword = passwordEncoder.encode(newPass);
        user.setUserPass(encodedPassword);
    }

    public void updateUser(User user) {
        log.info("updateUser : 사용자 정보 수정");
        User originUser = getUser("ssafy@gmail.com");
        //set 변경사항 추가하기
        userRepository.save(user);
    }
}
