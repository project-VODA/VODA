package com.voda.calling.model.service;

import com.voda.calling.model.dto.Friend;
import com.voda.calling.model.dto.FriendResponse;
import com.voda.calling.model.dto.UserSearchResponse;
import com.voda.calling.repository.FriendRepository;
import com.voda.calling.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Slf4j
public class FriendService {

    @Autowired
    FriendRepository friendRepository;

    @Autowired
    UserRepository userRepository;

    public Friend searchFriend(int friendNo) {
        return friendRepository.findByFriendNo(friendNo);
    }

    public void registFriend(String userEmail, String friendEmail) {
        Friend friend = Friend.builder()
                .userEmail(userEmail)
                .friendEmail(friendEmail)
                .friendRegtime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .build();
        friendRepository.save(friend);
    }

    public List<FriendResponse> searchUser(String keyword, String userEmail) {
        return userRepository.searchUsersByKeyword(keyword, userEmail);
    }

    public Page<FriendResponse> searchAllFriend(String userEmail, Pageable pageable) {
        Page<FriendResponse> friendList = userRepository.searchFriendsByUserEmail(userEmail, pageable);
        log.info(String.valueOf(friendList.getTotalPages()));
        return friendList;
    }

    public void deleteFriend(Friend friend) {
        log.info("친구 삭제 서비스 호출");
        friendRepository.delete(friend);

    }

}
