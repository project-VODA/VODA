package com.voda.calling.model.service;

import com.voda.calling.exception.NotRegisteredException;
import com.voda.calling.exception.PasswordWrongException;
import com.voda.calling.model.dto.User;
import com.voda.calling.model.dto.UserSetting;
import com.voda.calling.repository.UserRepository;
import com.voda.calling.repository.UserSettingRepository;
import com.voda.calling.util.JwtUtil;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserSettingRepository userSettingRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtil jwtUtil;

    private static final int IS_CANCELED = 1; // 탈퇴 유저
    private static final int IS_NOT_CANCELED = 0; // 탈퇴 안 한 유저

    public User regist(String userEmail, String userPass, String userName, int userHandicap) {
        log.info("회원가입 서비스 호출 - ");
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

        User savedUser = userRepository.save(user);

        //userSetting 테이블에 초기 사용자 설정 저장
        UserSetting userSetting = UserSetting.builder()
                .userEmail(userEmail)
                .usersettingTypeNo(1)
                .usersettingScreenType(userHandicap == 1 ? 0 : 1) //시각장애인이면 심플모드(1), 비장애인이면 디테일모드(0)
                .build();
        userSettingRepository.save(userSetting);

        return savedUser;
    }

    public Map<String, Object> login(String userEmail, String userPass) {
        User user = userRepository.findUserByUserEmailAndUserCancel(userEmail, IS_NOT_CANCELED);
        if (user == null) { // 등록이 안된 유저인 경우
            log.info("{}에 해당하는 유저 없음", userEmail);
            throw new NotRegisteredException();
        } else if(!passwordEncoder.matches(userPass, user.getUserPass())) {// 비밀번호가 틀린 경우
            log.info("{}유저 로그인 실패: 비밀번호 오류", userEmail);
            throw new PasswordWrongException();
        }


        Optional<UserSetting> userSetting = userSettingRepository.findById(userEmail);
        Map<String, Object> tokens = new HashMap<>();
        // accessToken
        tokens.put("accessToken", jwtUtil.createAccessToken(user, userSetting.get()));
        // refreshToken
        String refreshToken = jwtUtil.createRefreshToken();
        tokens.put("refreshToken", refreshToken);
        user.setUserToken(refreshToken);
        userRepository.save(user);

        return tokens;
    }

    public User getUser(String userEmail) {
        User user = userRepository.findUserByUserEmailAndUserCancel(userEmail, IS_NOT_CANCELED); //usercancel을 고려하는 쿼리로 함수 변경
        return user;
    }

    public User getUserByToken(String token){
        String userEmail = jwtUtil.getUserEmailFromToken(token);
        return userRepository.findUserByUserEmailAndUserCancel(userEmail, IS_NOT_CANCELED);
    }

    public User logout(User user){
        user.setUserToken(null);
        return userRepository.save(user);
    }

    public User checkOriginalPass(String userEmail, String originalPass) {
        User user = userRepository.findUserByUserEmailAndUserCancel(userEmail, IS_NOT_CANCELED);
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
        userRepository.save(user);
    }

    public User updateUser(User user) {
        log.info("updateUser : 사용자 정보 수정");
        User find = userRepository.findUserByUserEmailAndUserCancel(user.getUserEmail(), IS_NOT_CANCELED);
        find.setUserName(user.getUserName());
        find.setUserHandicap(user.getUserHandicap());

        userRepository.save(find);
        return find;
    }

    public void canceledUser(String userEmail) {
        log.info("canceledUser : users 테이블에서 해당 사용자 IS_CANCELED 처리");
        User user = userRepository.findUserByUserEmailAndUserCancel(userEmail, IS_NOT_CANCELED);
        user.setUserCancel(IS_CANCELED);
        userRepository.save(user);
    }

    public String getNewAccessToken(String refreshToken){
        User user = userRepository.findUserByUserTokenAndUserCancel(refreshToken, IS_NOT_CANCELED);
        Optional<UserSetting> userSetting = userSettingRepository.findById(user.getUserEmail());
        if(user !=  null){
            return jwtUtil.createAccessToken(user, userSetting.get());
        }

        return null;
    }

    public String getUserName(String userEmail){
        return userRepository.findByUserEmailAndUserCancel(userEmail, IS_NOT_CANCELED);
    }
}
