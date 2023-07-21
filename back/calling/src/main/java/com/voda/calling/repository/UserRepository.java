package com.voda.calling.repository;

import com.voda.calling.model.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, String> { //JpaRepository<Entity클래스, PK타입>

    //user insert :  persist 함수 사용

    User findUserByUserEmailAndUserCancel(String userEmail, int userCancel);

    List<User> findAll();

    User findUserByUserName(String userName);

    List<User> findAllByUserName(String userName);



}
