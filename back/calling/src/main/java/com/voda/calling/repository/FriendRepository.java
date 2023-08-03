package com.voda.calling.repository;

import com.voda.calling.model.dto.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Integer> {

    Friend findByFriendNo(int FriendNo);

    Friend findByUserEmailAndFriendEmail(String userEmail, String friendEmail);

    void deleteByFriendNo(int friendNo);

    void delete(Friend friend);

    void deleteFriendByUserEmail(String userEmail);

}
