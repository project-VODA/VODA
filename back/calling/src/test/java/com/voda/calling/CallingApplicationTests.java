package com.voda.calling;

import com.voda.calling.model.dto.User;
import com.voda.calling.model.service.UserService;
import com.voda.calling.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.transaction.Transactional;

@SpringBootTest
@Transactional
class CallingApplicationTests {
	private Logger logger = LoggerFactory.getLogger(CallingJpaTest.class);

	@Autowired
	private EntityManagerFactory emFactory;
	private EntityManager em;
	private EntityTransaction etx;

	@Autowired
	UserService userService;

	@Test
	void contextLoads() {
	}

	@BeforeEach
	public void setUp() {
		em = emFactory.createEntityManager();
		etx = em.getTransaction();
		etx.begin();
	}

	@AfterEach
	public void cleanup() {
		etx.rollback();
		em.close();
	}

	@Test
	public void updateUserTest() {
		logger.info("updateUserTest");
		User user = userService.getUser("ssafy@gmail.com");
		user.setUserPass("123");
		userService.updateUser(user);
		Assertions.assertEquals("1234", user.getUserPass());

	}

	@Test
	public void joinUserTest() {
		logger.info("joinUserTest");
		User user = userService.regist("kyuh2002@gmail.com", "1234", "최키키", 0);
		Assertions.assertEquals("최키키", user.getUserName());
	}
}
