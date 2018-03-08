package com.interactive.map;

import java.sql.SQLException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {
	private static final Logger logger = LogManager.getLogger(ServerApplication.class);

	public static void main(String[] args) throws SQLException {
		SpringApplication.run(ServerApplication.class);
		logger.info("Server started");
	}
}
