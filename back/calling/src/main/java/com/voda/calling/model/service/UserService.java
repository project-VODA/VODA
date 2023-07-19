package com.voda.calling.model.service;

import com.voda.calling.model.dto.User;
import com.voda.calling.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    UserRepository userRepository;

    PasswordEncoder passwordEncoder;

    public User regist(String email, String name, String password) {
        Optional<User> existed = userRepository.findByEmail(email);
        if(existed.isPresent()){
            throw new EmailExistedException(email);
        }
        // **** 해싱하는 부분 ****
        String encodedPassword = passwordEncoder.encode(password);
        User user = User.builder()
                .email(email)
                .name(name)
                .password(encodedPassword)
                .level(1L)
                .build();
        return userRepository.save(user);
    }
}
