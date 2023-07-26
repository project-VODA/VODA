package com.voda.calling.repository;

import com.voda.calling.model.dto.CallHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CallingHistoryRepository extends JpaRepository<CallHistory, Integer> {

    void deleteCallHistoriesByCallSender(String userEmail);
}
