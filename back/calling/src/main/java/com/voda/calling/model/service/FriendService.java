package com.voda.calling.model.service;

import com.voda.calling.model.dto.Friend;
import com.voda.calling.model.dto.UserSearchResponse;
import com.voda.calling.repository.FriendRepository;
import com.voda.calling.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

    public void registFriend(String userEmail, String friendEmail) {
        Friend friend = Friend.builder()
                .userEmail(userEmail)
                .friendEmail(friendEmail)
                .friendRegtime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .build();
        friendRepository.save(friend);
    }

    public List<UserSearchResponse> searchUser(String keyword, String userEmail) {
        return userRepository.searchUsersByKeyword(keyword, userEmail);
    }


    public Friend searchRelationship(String userEmail, String friendEmail) {

        return friendRepository.findByUserEmailAndFriendEmail(userEmail, friendEmail);
    }

    public List<Friend> searchAllFriend(String userEmail) {
        List<Friend> friendList = friendRepository.findAllByUserEmail(userEmail);

        return friendList;
    }

    public void deleteFriend(String userEmail, String friendEmail) {
        friendRepository.deleteFriendByUserEmailAndFriendEmail(userEmail, friendEmail);

    }

}
