package com.voda.calling.repository;

import com.voda.calling.model.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepository{
    private final EntityManager em;

    public void save(User user) {
        em.persist(user);
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
