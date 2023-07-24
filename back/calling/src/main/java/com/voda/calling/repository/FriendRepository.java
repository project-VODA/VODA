package com.voda.calling.repository;

import com.voda.calling.model.dto.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, Integer> {

    void deleteFriendByUserEmail(String userEmail);
}
