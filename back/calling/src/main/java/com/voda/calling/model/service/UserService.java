package com.voda.calling.model.service;

import com.voda.calling.exception.EmailExistedException;
import com.voda.calling.model.dto.User;
import com.voda.calling.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    UserRepository userRepository;

    PasswordEncoder passwordEncoder;

    public void regist(String userEmail, String userPass, String userName, int userHandicap) {
        User existed = userRepository.findByEmail(userEmail);
        if(existed != null){
            throw new EmailExistedException(userEmail);
        }

        // 가입일 설정
        

        // **** 해싱하는 부분 ****
        String encodedPassword = passwordEncoder.encode(userPass);
        User user = User.builder()
                .userEmail(userEmail)
                .userName(userName)
                .userPass(encodedPassword)
                .userHandicap(userHandicap)
                .build();

        userRepository.save(user);
    }
}
