package com.voda.calling.model.service;

import com.voda.calling.exception.NotRegisteredException;
import com.voda.calling.model.dto.UserSetting;
import com.voda.calling.repository.UserSettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserSettingService {

    @Autowired
    UserSettingRepository userSettingRepository;

    public Optional<UserSetting> getUserSetting(String userEmail) {
        Optional<UserSetting> userSetting = userSettingRepository.findById(userEmail);
        if(!userSetting.isPresent()){
            throw new NotRegisteredException();
        }
        return userSetting;
    }

    public UserSetting updateUserSetting(UserSetting userSetting) {
        return userSettingRepository.save(userSetting);
    }

}
