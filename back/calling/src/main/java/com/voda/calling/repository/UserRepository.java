package com.voda.calling.repository;

import com.voda.calling.model.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Transactional
public class UserRepository{
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

}
