package com.interactive.map.repo;

import java.util.LinkedHashSet;
import java.util.List;
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
			double start_lat = points.stream().findFirst().get().getLat();
			double start_lng = points.stream().findFirst().get().getLng();
			Point newPoint = pointDAO.createPoint(start_lat, start_lng);
			segment.setStartPointID(newPoint.getId());
			newPoint.getSegments().add(segment);
			double end_lat = points.stream().skip(points.size() - 1).findFirst().get().getLat();
			double end_lng = points.stream().skip(points.size() - 1).findFirst().get().getLng();
			Point newPoint2 = pointDAO.createPoint(end_lat, end_lng);
			for (Point point : points) {
				point.getSegments().add(segment);
			}
			segment.setEndPointID(newPoint2.getId());
			newPoint2.getSegments().add(segment);
			session.save(segment);
			points.remove(newPoint);
			points.remove(newPoint2);

			segment.setPoints(points);
			session.getTransaction().commit();

			SessionConnection.shutdown(session);

			logger.info("Segment created correctly");

			return true;

		} catch (Exception e) {

			e.getStackTrace();
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
