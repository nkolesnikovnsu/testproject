package com.mightyjava;

import com.mightyjava.domain.Banner;
import com.mightyjava.domain.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.mightyjava.domain.Role;
import com.mightyjava.domain.User;
import com.mightyjava.service.IRoleService;
import com.mightyjava.service.IService;
import com.mightyjava.utils.ConstantUtils;

@SpringBootApplication
public class Application implements CommandLineRunner {
	@Autowired
	private IService<User> userService;

	@Autowired
	private IRoleService<Role> roleService;

	@Autowired
	private IService<Banner> bannerIService;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if (roleService.findAll().isEmpty()) {
			roleService.saveOrUpdate(new Role(ConstantUtils.ADMIN.toString()));
			roleService.saveOrUpdate(new Role(ConstantUtils.USER.toString()));
		}

		if (userService.findAll().isEmpty()) {
			User user1 = new User();
			user1.setEmail("test@user.com");
			user1.setName("Test User");
			user1.setMobile("9787456545");
			user1.setRole(roleService.findByName(ConstantUtils.USER.toString()));
			user1.setPassword(new BCryptPasswordEncoder().encode("testuser"));
			userService.saveOrUpdate(user1);

			User user2 = new User();
			user2.setEmail("test@admin.com");
			user2.setName("Test Admin");
			user2.setMobile("9787456545");
			user2.setRole(roleService.findByName(ConstantUtils.ADMIN.toString()));
			user2.setPassword(new BCryptPasswordEncoder().encode("testadmin"));
			userService.saveOrUpdate(user2);
		}

		if (bannerIService.findAll().isEmpty()) {
			for (int i = 1; i <= 1000; i++) {
//				Banner banner = new Banner();
//				banner.setName("Огурец зеленый" + i);
//				banner.setPrice(2776.00);
//				banner.setContent("10.04.2023");
//				banner.setDeleted(false);
//				//banner.setCategory(new Category());
//				bannerIService.saveOrUpdate(banner);
			}
		}
	}

}
