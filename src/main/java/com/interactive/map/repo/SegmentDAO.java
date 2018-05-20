package com.interactive.map.repo;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
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
import com.interactive.map.util.Graph;
import com.interactive.map.util.HarvesineFormula;
import com.interactive.map.util.SessionConnection;

@Component
public class SegmentDAO {

	@Autowired
	private PointDAO pointDAO;

	@Autowired
	private SegmentDAO segmentDAO;

	Graph graph = new Graph();

	private static Logger logger = LogManager.getLogger(SegmentDAO.class);

	Segment segment = null;

	Predicate<Point> pointWithSameLatLng(Point point) {
		return p -> p.getLat() == point.getLat() && p.getLng() == point.getLng();
	}

	public Segment createSegmentTransaction(List<Point> points) {

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
				points.removeIf(pointWithSameLatLng(startPoint.get()));

			} else {
				Point point = points.stream().findFirst().get();
				Point newPoint = pointDAO.createPoint(point.getLat(), point.getLng());
				segment.setStartPointID(newPoint.getId());
				points.removeIf(pointWithSameLatLng(newPoint));

			}
			if (endPoint.isPresent()) {
				Point pointEnd = endPoint.get();
				segment.setEndPointID(pointEnd.getId());
				points.removeIf(pointWithSameLatLng(endPoint.get()));

			} else {
				Point endPointNotFound = points.stream().skip(points.size() - 1).findFirst().get();
				Point newPoint = pointDAO.createPoint(endPointNotFound.getLat(), endPointNotFound.getLng());
				segment.setEndPointID(newPoint.getId());
				points.removeIf(pointWithSameLatLng(newPoint));

			}

			segment.setPoints(points);
			session.saveOrUpdate(segment);

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

	public boolean createSegment(List<Point> points) {
		Segment segment = createSegmentTransaction(points);
		boolean result = false;
		if (segment != null) {
			result = true;
		}
		return result;
	}

	public Segment createSegmentFromFileTransaction(List<Point> points) {

		// Wyszukuje punkt początkowy z listy points podanej w argumencie
		Optional<Point> startPoint = pointDAO.findPointByLatLng(points.get(0).getLat(), points.get(0).getLng());

		// Wyszukuje punkt końcowy z listy points podanej w argumencie (
		// skip(points.size()-1 <- przechodzi do ostatniego elementu) )
		Optional<Point> endPoint = pointDAO.findPointByLatLng(points.get(points.size() - 1).getLat(),
				points.get(points.size() - 1).getLng());

		Segment segment = null;
		double length = -1;

		Session session = SessionConnection.getSessionFactory().openSession();

		length = calculateDistanceBetweenPoints(points);

		try {
			session.beginTransaction();
			segment = new Segment();

			// Jeżeli Optional startPoint znajduje się w liście points

			if (startPoint.isPresent()) {

				// tworzy nowy punkt o takich samych parametrach
				Point pointStart = startPoint.get();
				segment.setStartPointID(pointStart.getId());

				points.removeIf(pointWithSameLatLng(startPoint.get()));

			} else {
				Point point = points.stream().findFirst().get();
				Point newPoint = pointDAO.createPoint(point.getLat(), point.getLng());
				segment.setStartPointID(newPoint.getId());
				points.removeIf(pointWithSameLatLng(newPoint));

			}
			if (endPoint.isPresent()) {
				Point pointEnd = endPoint.get();
				segment.setEndPointID(pointEnd.getId());
				points.removeIf(pointWithSameLatLng(endPoint.get()));

			} else {
				Point endPointNotFound = points.stream().skip(points.size() - 1).findFirst().get();
				Point newPoint = pointDAO.createPoint(endPointNotFound.getLat(), endPointNotFound.getLng());
				segment.setEndPointID(newPoint.getId());

				points.removeIf(pointWithSameLatLng(newPoint));

			}

			segment.setPoints(points);
			segment.setLength(length);
			session.saveOrUpdate(segment);
			session.getTransaction().commit();

			logger.info("Segment created correctly");
			logger.info("Length of segment in km: " + segment.getLength());
		} catch (Exception exception) {
			exception.getStackTrace();
			logger.error(exception.getMessage());
			session.getTransaction().rollback();
		} finally {
			SessionConnection.shutdown(session);
		}

		return segment;
	}

	// TODO: zobacz adnotacja w segmentController
	public void createSegmentsFromFile() throws NumberFormatException, IOException {

		List<Point> points = new ArrayList<Point>();
		double latitude, longitude;

		// BufferedReader bufferedReader = new BufferedReader(new
		// FileReader("src/main/resources/routes.txt"));
		BufferedReader bufferedReader = new BufferedReader(new FileReader("src/main/resources/routes.txt"));
		String fileLine;

		while ((fileLine = bufferedReader.readLine()) != null) {

			if (fileLine.startsWith("next")) {
				for (Point point : points) {
					System.out.println(point.getLat() + " " + point.getLng());
				}
				createSegmentFromFileTransaction(points);
				points.clear();
			} else {
				String[] coords = fileLine.split(",");
				latitude = Double.parseDouble(coords[0]);
				longitude = Double.parseDouble(coords[1]);
				points.add(new Point(latitude, longitude));
			}
		}
		bufferedReader.close();
	}

	double calculateDistanceBetweenPoints(List<Point> points) {
		double length = 0;
		for (int i = 1; i < points.size(); i++) {

			length += HarvesineFormula.calculateDistance(points.get(i - 1), points.get(i));
		}
		return length;
	}

	public boolean checkSegmentOrder(Point point, Segment segment) {
		if (point.getId() == segment.getStartPointID()) {
			return true;
		} else {
			return false;
		}
	}

	@SuppressWarnings("unchecked")
	public List<JSONObject> findAllSegmentsWithContainingPoints() throws Exception {

		List<Segment> segments = segmentDAO.findAllSegments();
		List<JSONObject> jsonResponseArray = new JSONArray();

		for (Segment segment : segments) {
			JSONObject jsonResponse = new JSONObject();

			Point startPoint = pointDAO.findPointByGivenId(segment.getStartPointID()).get();
			Point endPoint = pointDAO.findPointByGivenId(segment.getEndPointID()).get();

			jsonResponse.put("start_point", startPoint);
			jsonResponse.put("end_point", endPoint);
			jsonResponse.put("segment_id", segment.getId());
			jsonResponse.put("length", segment.getLength());
			jsonResponse.put("points", findAllPointsForSegmentByID(segment.getId()));
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
		return points;
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

}