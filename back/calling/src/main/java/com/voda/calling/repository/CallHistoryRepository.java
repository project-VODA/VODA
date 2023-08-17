package com.voda.calling.repository;

import com.voda.calling.model.dto.CallHistory;
import com.voda.calling.model.dto.RecentCall;
import com.voda.calling.repository.custom.CallingHistoryRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface CallHistoryRepository extends JpaRepository<CallHistory, Integer> , CallingHistoryRepositoryCustom {

    void deleteCallHistoriesByCallSender(String userEmail);

}
