package com.voda.calling;

import com.voda.calling.model.dto.User;
import com.voda.calling.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

@DataJdbcTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class CallingJPATest {

    @Autowired
    UserRepository userRepo;

    public void getUserByEmail() {
        String userEmail = "ssafy@gmail.com";
        User selectedUser = userRepo.findByEmail(userEmail);

    }
}
