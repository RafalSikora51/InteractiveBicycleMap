package com.interactive.map.repo;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.interactive.map.entity.Point;
import com.interactive.map.entity.Segment;
import com.interactive.map.util.SessionConnection;

@Component
public class SegmentDAO {

	@Autowired
	PointDAO pointDAO = new PointDAO();

	private static Logger logger = LogManager.getLogger(SegmentDAO.class);

	public boolean createSegment(LinkedHashSet<Point> points) {

		Session session = SessionConnection.getSessionFactory().openSession();

		try {

			session.beginTransaction();
			Segment segment = new Segment();

			Optional<Point> startPoint = pointDAO.findPointByLatLng(points.stream().findFirst().get().getLat(),
					points.stream().findFirst().get().getLng(), 0);

			if (startPoint.isPresent()) {

				segment.setStartPointID(startPoint.get().getId());
				startPoint.get().getSegments().add(segment);
				logger.info("Found start_point has ID : " + startPoint.get().getId());

			} else {

				Point point = points.stream().findFirst().get();
				Point newPoint = pointDAO.createPoint(point.getLat(), point.getLng());
				segment.setStartPointID(newPoint.getId());
				newPoint.getSegments().add(segment);
				points.remove(newPoint);
				logger.info("Start_point NOT found, creating new Point");
			}

			Optional<Point> endPoint = pointDAO.findPointByLatLng(
					points.stream().skip(points.size() - 1).findFirst().get().getLat(),
					points.stream().skip(points.size() - 1).findFirst().get().getLng(), 0);

			if (endPoint.isPresent()) {
				segment.setEndPointID(endPoint.get().getId());
				endPoint.get().getSegments().add(segment);
				logger.info("End_point found with ID : " + endPoint.get().getId());

				for (Point point : points) {
					point.getSegments().add(segment);
				}
				segment.setPoints(points);

			} else {
				Point endPointNotFound = points.stream().skip(points.size() - 1).findFirst().get();
				Point newPoint = pointDAO.createPoint(endPointNotFound.getLat(), endPointNotFound.getLng());
				segment.setEndPointID(newPoint.getId());
				newPoint.getSegments().add(segment);
				logger.info("End point not found");
				points.remove(newPoint);

				for (Point point : points) {
					point.getSegments().add(segment);
				}
				segment.setPoints(points);
			}

			// for (Point point : points) {
			// point.getSegments().add(segment);
			// }
			// segment.setPoints(points);
			session.save(segment);
			session.getTransaction().commit();

			SessionConnection.shutdown(session);

			logger.info("Segment created correctly");

			return true;

		} catch (Exception exception) {

			exception.getStackTrace();
			logger.error(exception.getMessage());
			session.getTransaction().rollback();
			SessionConnection.shutdown(session);
			return false;
		}

	}

	@SuppressWarnings("unchecked")
	public List<Segment> findAllSegments() {

		logger.debug("findAllSegments");
		List<Segment> segments;

		Session session = SessionConnection.getSessionFactory().openSession();

		segments = session.createQuery("from Segment").list();
		SessionConnection.shutdown(session);
		logger.info("All segments listed ");

		return segments;

	}

}
