package com.voda.calling.repository;

import com.voda.calling.model.dto.CallHistory;
import com.voda.calling.repository.custom.CallingHistoryRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CallHistoryRepository extends JpaRepository<CallHistory, Integer> , CallingHistoryRepositoryCustom {

    void deleteCallHistoriesByCallSender(String userEmail);


}
