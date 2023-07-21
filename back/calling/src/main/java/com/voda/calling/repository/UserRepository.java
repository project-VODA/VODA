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

    User findUserByUserEmail(String userEmail);

    List<User> findAll();

    User findUserByUserName(String userName);

    List<User> findAllByUserName(String userName);

    /*
    private final EntityManager em;

    public User save(User user) {
        em.persist(user);
        return user;
    }

    public User findByEmail(String userEmail) {
        return em.find(User.class, userEmail);
    }

    public List<User> findAll() {
        return em.createQuery("select m from users m", User.class)
                .getResultList();
    }

    public List<User> findByName(String userName) {
        return em.createQuery("select m from users m where m.user_name = :userName", User.class)
                .setParameter("userName", userName)
                .getResultList();
    }

     */

}
