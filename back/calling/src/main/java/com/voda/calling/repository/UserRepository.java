package com.voda.calling.repository;

import com.voda.calling.model.dto.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> { //JpaRepository<Entity클래스, PK타입>

    //user insert :  persist 함수 사용

    User findUserByUserEmailAndUserCancel(String userEmail, int userCancel);

    User findUserByUserEmail(String userEmail);

    List<User> findAllByUserCancel(int userCancel); //탈퇴한 회원확인하는 메소드

    User findUserByUserNameAndUserCancel(String userName, int userCancel);

    List<User> findAllByUserNameAndUserCancel(String userName, int userCancel);






}
