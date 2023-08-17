package com.voda.calling.model.service;

import com.voda.calling.model.dto.UserCallHistory;
import com.voda.calling.repository.UserCallHistoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserCallHistoryService {

    @Autowired
    UserCallHistoryRepository userCallHistoryRepository;

    public UserCallHistory createUserCallhistory (UserCallHistory userCallHistory){
        return userCallHistoryRepository.save(userCallHistory);
    }

}
