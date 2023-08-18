package com.vc;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.vc.service.UserService;
import com.vc.user.User;

@SpringBootApplication
public class VideoCallAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(VideoCallAppApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner runner(UserService service) {
		return args->{
			service.register(
					User.builder()
					.userName("john")
					.email("john@gmail.com")
					.password("123")
					.build()
					);
			service.register(
					User.builder()
					.userName("ali")
					.email("ali@gmail.com")
					.password("123")
					.build()
					);
			service.register(
					User.builder()
					.userName("afk")
					.email("afk@gmail.com")
					.password("123")
					.build()
					);
	
			
			
			
		};
	}

}
