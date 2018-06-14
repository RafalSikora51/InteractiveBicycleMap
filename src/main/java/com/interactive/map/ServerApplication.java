package com.interactive.map;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Arrays;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class ServerApplication extends SpringBootServletInitializer implements CommandLineRunner {
	private static final Logger logger = LogManager.getLogger(ServerApplication.class);

	@Autowired
	private ApplicationContext appContext;

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		System.out.println("Server started_0");
		return application.sources(ServerApplication.class);
	}

	public static void main(String[] args) throws SQLException, IOException {
		SpringApplication.run(ServerApplication.class);
		System.out.println("Server started");
		logger.info("Server started");

	}

	@Override
	public void run(String... args) throws Exception {

		String[] beans = appContext.getBeanDefinitionNames();
		Arrays.sort(beans);
		for (String bean : beans) {
			System.out.println(bean);
		}

	}
}
