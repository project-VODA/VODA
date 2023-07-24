package com.voda.calling.repository;

import com.voda.calling.model.dto.UserSetting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSettingRepository extends JpaRepository<UserSetting, String> {

    void deleteUserSettingByUserEmail(String userEmail);
}
