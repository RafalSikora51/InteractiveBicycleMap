package com.interactive.map.repo;

import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.interactive.map.entity.Point;
import com.interactive.map.entity.Segment;
import com.interactive.map.util.SessionConnection;

@Component
public class SegmentDAO {

	@Autowired
	PointDAO pointDAO;

	@Autowired
	SegmentDAO segmentDAO;
	


	private static Logger logger = LogManager.getLogger(SegmentDAO.class);
	Segment segment = null;

	public Segment createSegmentTransaction(LinkedHashSet<Point> points) {

		Optional<Point> startPoint = pointDAO.findPointByLatLng(points.stream().findFirst().get().getLat(),
				points.stream().findFirst().get().getLng());
		Optional<Point> endPoint = pointDAO.findPointByLatLng(
				points.stream().skip(points.size() - 1).findFirst().get().getLat(),
				points.stream().skip(points.size() - 1).findFirst().get().getLng());

		Segment segment = null;

		Session session = SessionConnection.getSessionFactory().openSession();
		try {
			session.beginTransaction();
			segment = new Segment();

			if (startPoint.isPresent()) {
				Point pointStart = startPoint.get();
				segment.setStartPointID(pointStart.getId());
				// pointStart.getSegments().add(segment);
				points.remove(pointStart);
			} else {
				Point point = points.stream().findFirst().get();
				Point newPoint = pointDAO.createPoint(point.getLat(), point.getLng());
				segment.setStartPointID(newPoint.getId());
				// newPoint.getSegments().add(segment);
				points.remove(newPoint);
				logger.info("Start_point NOT found, creating new Point");
			}

			if (endPoint.isPresent()) {
				Point pointEnd = endPoint.get();
				segment.setEndPointID(pointEnd.getId());
				// pointEnd.getSegments().add(segment);
				logger.info("End_point found with ID : " + endPoint.get().getId());
				points.remove(pointEnd);
			} else {
				Point endPointNotFound = points.stream().skip(points.size() - 1).findFirst().get();
				Point newPoint = pointDAO.createPoint(endPointNotFound.getLat(), endPointNotFound.getLng());
				segment.setEndPointID(newPoint.getId());
				// newPoint.getSegments().add(segment);
				logger.info("End point not found");
				points.remove(newPoint);
			}

			segment.setPoints(points);
			session.save(segment);
			session.getTransaction().commit();
			logger.info("Segment created correctly");
		} catch (Exception exception) {
			exception.getStackTrace();
			logger.error(exception.getMessage());
			session.getTransaction().rollback();
		} finally {
			SessionConnection.shutdown(session);
		}

		return segment;

	}

	public boolean createSegment(LinkedHashSet<Point> points) {
		Segment segment = createSegmentTransaction(points);
		boolean result = false;
		if (segment != null) {

			Optional<Point> startPointOptional = pointDAO.findPointByGivenId(segment.getStartPointID());
			Optional<Point> endPointOptional = pointDAO.findPointByGivenId(segment.getEndPointID());

			if (startPointOptional.isPresent() && endPointOptional.isPresent()) {
				assignSegmentToPoint(startPointOptional.get(), segment);
				assignSegmentToPoint(endPointOptional.get(), segment);
				result = true;
			}

		}
		return result;
	}

	void assignSegmentToPoint(Point point, Segment segment) {
		Session session = SessionConnection.getSessionFactory().openSession();
		session.beginTransaction();
		segment.getPoints().add(point);
		session.update(segment);
		session.getTransaction().commit();
		SessionConnection.shutdown(session);
	}

	public Optional<Segment> findSegmentByGivenID(int segment_id) {
		logger.debug("findSegmentByGivenID");
		Session session = SessionConnection.getSessionFactory().openSession();

		if (session.get(Segment.class, segment_id) != null) {
			Segment segment = session.load(Segment.class, segment_id);
			SessionConnection.shutdown(session);
			logger.info("Segment found by ID");
			return Optional.ofNullable(segment);
		} else {
			SessionConnection.shutdown(session);
			logger.info("There is no Segment with this ID");
			return Optional.empty();

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

	public LinkedHashMap<Segment, List<Point>> findAllSegmentsWithContainingPoints() throws Exception {

		LinkedHashMap<Segment, List<Point>> segment_points_map = new LinkedHashMap<>();

		List<Segment> segments;
		segments = segmentDAO.findAllSegments();

		for (Segment segment : segments) {
			segment_points_map.put(segment, findAllPointsForSegmentByID(segment.getId()));
		}
		logger.info("All Segments with their points listed");
		return segment_points_map;

	}

	@SuppressWarnings("unchecked")
	public List<JSONObject> findAllSegmentsWithContainingPointsJSON() throws Exception {

		// public LinkedHashMap<Segment, List<Point>> <- typ metody
		LinkedHashMap<Segment, List<Point>> segment_points_map = new LinkedHashMap<>();

		List<Segment> segments;
		
		segments = segmentDAO.findAllSegments();
		
		List<JSONObject> jsonResponseArray = new JSONArray();
		
		for (Segment segment : segments) {
			JSONObject jsonResponse = new JSONObject();
			
			segment_points_map.put(segment, findAllPointsForSegmentByID(segment.getId()));
			jsonResponse.put("start_pointID", segment.getStartPointID());
			jsonResponse.put("end_pointID", segment.getEndPointID());
			jsonResponse.put("segment_id", segment.getId());
			jsonResponse.put("points", segment_points_map.get(segment));
			jsonResponseArray.add(jsonResponse);	
		}
		logger.info("All Segments with their points listed");
		return jsonResponseArray;
	}

	public List<Point> findAllPointsForSegmentByID(int segment_id) throws Exception {

		logger.debug("findAllPointsForSegmentByID");

		Optional<Segment> segmentOptional = segmentDAO.findSegmentByGivenID(segment_id);

		if (segmentOptional.isPresent()) {
			return findAllPointsForSegment(segmentOptional.get());
		} else
			throw new Exception("Segment not found");
	}

	public List<Point> findAllPointsForSegment(Segment segment) {
		logger.debug("findAllPointsForSegment");
		List<Point> points = segment.getPoints().stream().collect(Collectors.toList());
		logger.info("All points for given Segment listed");
		logger.info(segment.getPoints().stream().findFirst().get().getLat());
		return points;
	}

	/*
	 * Set<Point> removeAvailablePoints(Set<Point> points) { Set<Point> resultPoints
	 * = new LinkedHashSet<>(); for (Point point : points) { Optional<Point>
	 * pointOptional = pointDAO.findPointByLatLng(point.getLat(), point.getLng());
	 * if (!pointOptional.isPresent()) { resultPoints.add(point); } } return
	 * resultPoints; }
	 */

}