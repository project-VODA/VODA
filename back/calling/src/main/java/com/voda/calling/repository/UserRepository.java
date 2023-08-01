package com.voda.calling.repository;

import com.voda.calling.model.dto.User;
import com.voda.calling.model.dto.UserSearchResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> { //JpaRepository<Entity클래스, PK타입>

    //user insert :  persist 함수 사용

    User findUserByUserEmailAndUserCancel(String userEmail, int userCancel);

    User findUserByUserEmail(String userEmail);

    List<User> findAllByUserCancel(int userCancel); //탈퇴한 회원확인하는 메소드

    User findUserByUserNameAndUserCancel(String userName, int userCancel);

    List<User> findAllByUserNameAndUserCancel(String userName, int userCancel);

    User findUserByUserTokenAndUserCancel(String userToken, int userCancel);


    //탈퇴하지 않은 유저 중 검색어에 해당하는 유저 이메일, 유저 이름, 친구 여부 찾는 쿼리
    @Query("SELECT NEW com.voda.calling.model.dto.UserSearchResponse(u.userEmail, u.userName, CASE WHEN f.friendEmail IS NOT NULL THEN true ELSE false END) " +
            "FROM User u " +
            "LEFT JOIN Friend f ON u.userEmail = f.friendEmail AND f.userEmail = :userEmail " +
            "WHERE (u.userName LIKE %:keyword% OR u.userEmail LIKE %:keyword%) " +
            "AND u.userCancel = 0 " +
            "AND u.userEmail != :userEmail")
    List<UserSearchResponse> searchUsersByKeyword(String keyword, String userEmail);

    // 탈퇴하지 않은 유저 중 사용자 이메일에 해당하는 친구 목록을 찾는 쿼리
    @Query("SELECT NEW com.voda.calling.model.dto.UserSearchResponse(u.userEmail, u.userName, CASE WHEN f.friendEmail IS NOT NULL THEN true ELSE false END) " +
            "FROM User u " +
            "LEFT JOIN Friend f ON u.userEmail = f.friendEmail AND f.userEmail = :userEmail " +
            "WHERE u.userCancel = 0 " +
            "AND u.userEmail != :userEmail ")
    List<UserSearchResponse> searchFriendsByUserEmail(String userEmail);



}
