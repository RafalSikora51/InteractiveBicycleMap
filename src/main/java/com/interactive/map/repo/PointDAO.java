package com.interactive.map.repo;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.interactive.map.entity.Point;
import com.interactive.map.entity.Segment;
import com.interactive.map.util.SessionConnection;
import org.hibernate.Query;

@Component
public class PointDAO {

	@Autowired
	PointDAO pointDAO;

	private static Logger logger = LogManager.getLogger(PointDAO.class);

	public boolean createPoint(Point point) {
		Session session = SessionConnection.getSessionFactory().openSession();
		try {
			session.beginTransaction();
			session.save(point);
			session.getTransaction().commit();
			SessionConnection.shutdown(session);
			logger.info("Point added correctly");
			return true;
		} catch (Exception e) {
			e.getStackTrace();
			SessionConnection.shutdown(session);
			return false;
		}
	}

	public Point createPoint(double latitude, double longitude) {
		Session session = SessionConnection.getSessionFactory().openSession();
		session.beginTransaction();
		Point point = new Point(latitude, longitude);
		session.save(point);
		session.getTransaction().commit();
		SessionConnection.shutdown(session);
		logger.info("Point from LAT LNG added correctly");
		return point;

	}

	@SuppressWarnings("unchecked")
	public List<Point> findAllPoints() {
		logger.debug("findAllPoints");
		List<Point> points;
		Session session = SessionConnection.getSessionFactory().openSession();
		points = session.createQuery("from Point").list();
		SessionConnection.shutdown(session);
		logger.info("All points listed.");
		return points;
	}

	public Optional<Point> findPointByGivenId(int pointId) {
		logger.debug("findPointByGivenId");
		Session session = SessionConnection.getSessionFactory().openSession();
		if (session.get(Point.class, pointId) != null) {
			Point point = session.load(Point.class, pointId);
			SessionConnection.shutdown(session);
			logger.info("Point found by ID");
			return Optional.ofNullable(point);
		} else {
			SessionConnection.shutdown(session);
			logger.info("There is no point with this ID");
			return Optional.empty();
		}
	}

	@SuppressWarnings("unchecked")
	public Optional<Point> findPointByLatLng(double latitude, double longitude) {
		logger.debug("findPointByGivenLatLng");

		Session session = SessionConnection.getSessionFactory().openSession();

		List<Point> points;
		String hql = "from Point where LATITUDE LIKE :lat and LONGITUDE LIKE :lng";
		Query query = session.createQuery(hql);
		query.setParameter("lat", latitude);
		query.setParameter("lng", longitude);

		points = query.list();
		SessionConnection.shutdown(session);

		if (!points.isEmpty()) {
			logger.info("Points from findPointByLatLng: \n");
			for (Point point : points) {
				logger.info(point.getId() + "\n" + point.getLat() + "\n" + point.getLng());
			}

			return Optional.ofNullable(points.get(0));
		} else {
			return Optional.empty();
		}
	}

	public List<Segment> findAllSegmentsForPoint(Point point) {

		logger.debug("findAllSegmentsForPoint");
		List<Segment> segments = point.getSegments().stream().collect(Collectors.toList());
		logger.info("All segments for point listed.");
		return segments;

	}

	public List<Segment> findAllSegmentsForPoint(int pointId) throws Exception {
		logger.debug("findAllSegmentsForPoint");

		Optional<Point> pointOptional = pointDAO.findPointByGivenId(pointId);
		if (pointOptional.isPresent()) {
			return findAllSegmentsForPoint(pointOptional.get());
		} else
			throw new Exception("Point not found");
	}

}
