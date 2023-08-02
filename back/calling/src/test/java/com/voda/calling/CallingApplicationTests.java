package com.voda.calling;

import com.voda.calling.model.dto.RecentCall;
import com.voda.calling.model.dto.User;
import com.voda.calling.model.service.UserService;
import com.voda.calling.repository.CallHistoryRepository;
import com.voda.calling.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
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
import java.util.List;

@SpringBootTest
@Transactional
@Slf4j
class CallingApplicationTests {

	@Autowired
	private EntityManagerFactory emFactory;
	private EntityManager em;
	private EntityTransaction etx;

	@Autowired
	UserService userService;

	@Autowired
	UserRepository userRepository;

	@Autowired
	CallHistoryRepository callHistoryRepository;

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
		log.info("updateUserServiceTest");
		User user = userService.getUser("ssafy@gmail.com");
		user.setUserName("박싸피");
		userService.updateUser(user);
		Assertions.assertEquals("1234", user.getUserPass());
	}

	@Test
	public void updateUserInfoControlTest() {
		log.info("updateUserInfoControlTest");
		User user = userService.getUser("ssafy@gmail.com");
		user.setUserName("박싸피");
		userService.updateUser(user);
		Assertions.assertEquals("박싸피", user.getUserName());
	}

	@Test
	public void joinUserTest() {
		log.info("joinUserTest");
		User user = userService.regist("kyuh2002@gmail.com", "1234", "최키키", 0);
		Assertions.assertEquals("최키키", user.getUserName());
	}

	@Test
	public void canceledUserTest() {
		log.info("Userservice - canceledUserTest");
		String uEmail = "voda@voda.com";
		userService.canceledUser(uEmail);
		User user = userRepository.findUserByUserEmail(uEmail);
		Assertions.assertEquals(1, user.getUserCancel());
	}

	@Test
	public void getRecentCallListTest() {
		String email = "voda@voda.com";
		List<RecentCall> list = callHistoryRepository.findAllByUserEmail(email);
		Assertions.assertEquals(2, list.size());
	}
}
