package com.voda.calling.model.service;

import com.voda.calling.model.dto.User;
import com.voda.calling.repository.FriendRepository;
import com.voda.calling.repository.UserCallHistoryRepository;
import com.voda.calling.repository.UserRepository;
import com.voda.calling.repository.UserSettingRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
public class CronService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    FriendRepository friendRepository;

    @Autowired
    UserSettingRepository userSettingRepository;

    @Autowired
    UserCallHistoryRepository userCallHistoryRepository;

    private static final int IS_CANCELED = 1; // 탈퇴 유저

    @Scheduled(cron = "0 0 17 ? * FRI")
    @Transactional
    public void deleteCanceledUsersData() { //매주 금요일 17시에 탈퇴한 회원의 데이터 delete
        log.info("CronService - deleteCanceledUsersData : 매주 금요일 17시에 탈퇴한 회원의 데이터 delete");
        List<User> canceledUserList = userRepository.findAllByUserCancel(IS_CANCELED);
        for (User user : canceledUserList){
            String currentEmail = user.getUserEmail();
            //1. 친구목록 삭제
            friendRepository.deleteFriendByUserEmail(currentEmail);
            //2. 사용자 환경설정 정보 삭제
            userSettingRepository.deleteUserSettingByUserEmail(currentEmail);
            //3. 통화목록 삭제
            // 맵핑테이블에서 삭제하면 callhistory에 송수신자 기록은 남아있으므로
            // 송신자가 탈퇴해도 수신자는 "알수없는 사용자" 등의 이름으로 통화기록은 볼 수 있다.
            userCallHistoryRepository.deleteUserCallHistoriesByUserEmail(currentEmail);
        }

    }

}
