package com.voda.calling;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CallingApplication {

	public static void main(String[] args) {

		SpringApplication.run(CallingApplication.class, args);
	}

}
