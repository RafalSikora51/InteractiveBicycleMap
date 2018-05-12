package com.interactive.map.repo;

import static org.junit.Assert.assertNotEquals;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
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

import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;
import com.interactive.map.entity.Point;
import com.interactive.map.entity.Segment;
import com.interactive.map.util.Graph;
import com.interactive.map.util.HarvesineFormula;
import com.interactive.map.util.Node;
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

	public void createSegmentsFromFile() throws NumberFormatException, IOException {

		List<Point> points = new ArrayList<Point>();
		double latitude, longitude;

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

	public Node getNodeByGivenPoint(List<Node> nodes, Point point) {
		Node node = null;
		for (Node nodee : nodes) {
			if (nodee.getPoint().equals(point)) {
				node = nodee;
			}
		}
		return node;
	}

	public Map<Node, Map<Node, Segment>> createAdjacencyMap(List<Node> nodes, List<Segment> segmentsFromDataBase) {

		Map<Node, Map<Node, Segment>> adjacencyMap = new HashMap<Node, Map<Node, Segment>>();

		for (Node node : nodes) {
			List<Segment> segmentsForNode = Graph.findSegmentsForNode(node, segmentsFromDataBase);

			Map<Node, Segment> vertexEdgeMap = new HashMap<Node, Segment>();

			for (Segment seg : segmentsForNode) {
				Point start = pointDAO.findPointByGivenId(seg.getStartPointID()).get();
				Point end = pointDAO.findPointByGivenId(seg.getEndPointID()).get();

				// A nie może być sąsiadem A.
				if (!start.equals(node.getPoint())) {
					vertexEdgeMap.put(getNodeByGivenPoint(nodes, start), seg);
				} else {
					vertexEdgeMap.put(getNodeByGivenPoint(nodes, end), seg);
				}
			}
			adjacencyMap.put(node, vertexEdgeMap);
		}
		return adjacencyMap;
	}

	@SuppressWarnings("unchecked")
	public List<JSONObject> findAllSegmentsWithContainingPoints() throws Exception {

		List<Segment> segments;

		segments = segmentDAO.findAllSegments();
		List<Node> nodes = new ArrayList<Node>();
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

			nodes.add(new Node(startPoint));
			nodes.add(new Node(endPoint));
		}
		logger.info("All Segments with their points listed");

		nodes = nodes.stream().distinct().collect(Collectors.toList());

		Map<Node, Map<Node, Segment>> adjacencyMap = createAdjacencyMap(nodes, segments);

		Graph graph = new Graph(nodes, adjacencyMap);

		// PUNKT STARTOWY ( PO ID)
		Point sourcePoint = pointDAO.findPointByGivenId(120).get();
		Node sourceNode = new Node(sourcePoint);

		Graph resultGraph = Graph.calculateShortestPathFromSource(graph, sourceNode);
		Map<Node, Segment> adjacencyNodeForJSON = new HashMap<>();
		List<JSONObject> responseRoad = new JSONArray();
		logger.info(adjacencyMap);
		logger.info(graph);
		logger.info("Result graph nodes: " + resultGraph.getNodes());
		//logger.info("Pkt początkowy: " + sourcePoint);
	//	logger.info(resultGraph.getNodes().get(20).getShortestPath());

		// PUNKT KOŃCOWY, TRZEBA WZIĄĆ PO ID Z GETNODES()
		List<Node> shortestPath = resultGraph.getNodes().get(1).getShortestPath();

		logger.info("Pkt końcowy: " + resultGraph.getNodes().get(1));
		int j = 0;
		for (int i = 1; i < shortestPath.size(); i++) {

			JSONObject jsonResponse = new JSONObject();
			j = i;
			logger.info("Dla którego node'a szukamy : " + shortestPath.get(i - 1));
			adjacencyNodeForJSON = adjacencyMap.get(shortestPath.get(i - 1));

			logger.info("Co uzyskalem: ");
			logger.info(adjacencyNodeForJSON.get(shortestPath.get(j)));
			logger.info(adjacencyNodeForJSON.get(shortestPath.get(j)).points);

			Point startPoint = pointDAO
					.findPointByGivenId(adjacencyNodeForJSON.get(shortestPath.get(j)).getStartPointID()).get();
			Point endPoint = pointDAO.findPointByGivenId(adjacencyNodeForJSON.get(shortestPath.get(j)).getEndPointID())
					.get();

			if (checkSegmentOrder(shortestPath.get(i - 1).getPoint(),
					adjacencyNodeForJSON.get(shortestPath.get(j))) == true) {
				
				jsonResponse.put("start_point", startPoint);
				jsonResponse.put("end_point", endPoint);
				jsonResponse.put("segment_id", adjacencyNodeForJSON.get(shortestPath.get(j)).getId());
				jsonResponse.put("length", adjacencyNodeForJSON.get(shortestPath.get(j)).getLength());
				jsonResponse.put("points", findAllPointsForSegmentByID(adjacencyNodeForJSON.get(shortestPath.get(j)).getId()));
				responseRoad.add(jsonResponse);
				
			}else {
				jsonResponse.put("start_point", endPoint);
				jsonResponse.put("end_point", startPoint);
				jsonResponse.put("segment_id",adjacencyNodeForJSON.get(shortestPath.get(j)).getId());
				jsonResponse.put("length", adjacencyNodeForJSON.get(shortestPath.get(j)).getLength());
				List<Point> points = findAllPointsForSegmentByID(adjacencyNodeForJSON.get(shortestPath.get(j)).getId());
				Collections.reverse(points);
				jsonResponse.put("points", points);
				responseRoad.add(jsonResponse);
			}

			

			j = 0;
		}

		logger.info("FINALLY: ");
		logger.info(responseRoad);
		
		//	JEŻELI WYŚWIETLIĆ CAŁĄ BAZĘ TO - return jsonResponseArray
		return responseRoad;
	}

	boolean checkSegmentOrder(Point point, Segment segment) {

		if (point.getId() == segment.getStartPointID()) {
			return true;
		} else {
			return false;
		}

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