package com.interactive.map.util;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class SessionConnection {

	static Logger logger = LogManager.getLogger(SessionConnection.class);

	private static final SessionFactory sessionFactory = buildSessionFactory();

	private static SessionFactory buildSessionFactory() {
		logger.debug("buildSessionFactory");
		try {
			return new Configuration().configure().buildSessionFactory();
		} catch (Throwable exception) {
			logger.error("Initial SessionFactory creation failed.", exception);
			throw new ExceptionInInitializerError(exception);
		}
	}

	public static SessionFactory getSessionFactory() {
		logger.debug("getSessionFactory");
		return sessionFactory;
	}

	public static void shutdown(Session session) {
		logger.debug("shutdown");
		session.close();
	}

}
