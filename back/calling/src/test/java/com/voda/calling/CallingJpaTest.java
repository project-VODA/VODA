package com.voda.calling;

import com.voda.calling.model.dto.User;
import com.voda.calling.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class CallingJpaTest {

    private Logger logger = LoggerFactory.getLogger(CallingJpaTest.class);

    @Autowired
    UserRepository userRepository;

    @Test
    public void beanTypeTest() {
        logger.debug("repo 구현체 : ", userRepository.getClass().getName());
    }

    @Test
    public void selectByUserEmailTest() {
        Optional<User> selected = userRepository.findById("ssafy@gmail.com");
        Assertions.assertNotNull(selected);
        Assertions.assertEquals("김싸피", selected.get().getUserName());
    }

    @Test
    public void insertTest() {
//        LocalDate today = LocalDate.now();
        User user = User.builder().userEmail("vodaa707@gmail.com").userPass("1234").userName("보다").userHandicap(0).userCancel(0).userRegTime("2023-07-20").build();
        userRepository.save(user);
        Optional<User> selected = userRepository.findById("vodaa707@gmail.com");
        Assertions.assertEquals("보다", selected.get().getUserName());
    }

    @Test
    public void selectUserByUserNameTest() {
        String uname = "김싸피";
        User user = userRepository.findUserByUserName(uname);
        Assertions.assertNotNull(user);
        Assertions.assertEquals("1234", user.getUserPass());
    }

    @Test
    public void selectListUserByUserNameTest() {
        String uname = "김싸피";
        List<User> selectedList = userRepository.findAllByUserName(uname);
        Assertions.assertNotNull(selectedList);
        Assertions.assertEquals(2, selectedList.size());

    }

    @Test
    public void updateUserTest() {
        User user = User.builder().userEmail("vodaa707@gmail.com").userPass("1234").userName("보다").userHandicap(0).userCancel(0).userRegTime("2023-07-20").build();
        user.setUserCancel(1);
        userRepository.save(user);
        Assertions.assertEquals(1,user.getUserCancel());
    }


}
