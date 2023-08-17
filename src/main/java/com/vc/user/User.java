package com.vc.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class User {
	
		
		private String userName;
		private String email;
		private String password;
		private String status;
	
	
}
