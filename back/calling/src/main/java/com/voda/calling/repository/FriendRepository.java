package com.voda.calling.repository;

import com.voda.calling.model.dto.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Integer> {

    List<Friend> findAllByUserEmail(String UserEmail);

    Friend findByUserEmailAndFriendEmail(String userEmail, String friendEmail);

    void deleteFriendByUserEmailAndFriendEmail(String userEmail, String friendEmail);

}
