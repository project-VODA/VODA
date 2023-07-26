package com.voda.calling.repository;

import com.voda.calling.model.dto.UserCallHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCallHistoryRepository extends JpaRepository<UserCallHistory, Integer> {

    void deleteUserCallHistoriesByUserEmail(String userEmail);
}
