package com.interactive.map.repo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.interactive.map.entity.Point;
import com.interactive.map.entity.Segment;
import com.interactive.map.util.Graph;
import com.interactive.map.util.Node;

@Component
public class GraphDAO {

	@Autowired
	private SegmentDAO segmentDAO;

	@Autowired
	private PointDAO pointDAO;

	private static Logger logger = LogManager.getLogger(SegmentDAO.class);

	public List<Node> findAllNodes() {
		List<Node> nodes = new ArrayList<Node>();
		List<Segment> segments = segmentDAO.findAllSegments();

		segments.forEach(segment -> {
			Point startPoint = pointDAO.findPointByGivenId(segment.getStartPointID()).get();
			Point endPoint = pointDAO.findPointByGivenId(segment.getEndPointID()).get();

			nodes.add(new Node(startPoint));
			nodes.add(new Node(endPoint));
		});

		List<Node> resultNodes = nodes.stream().distinct().collect(Collectors.toList());

		logger.info("All nodes listed ");
		return resultNodes;
	}

	public Node getNodeByGivenPoint(List<Node> nodes, Point point) {
		Node node = null;
		for (Node nodee : nodes) {
			if (nodee.getPoint().equals(point)) {
				node = nodee;
				break;
			}
		}
		return node;
	}

	// zmienic na optionala, bo jesli np jakims cudem podamy id punktu,
	// dla ktoego nie bedzie stworzonego nodea, to wywali null
	// wtedy w metodach w ktorych to bedzie uzywane, trzeba sprawdzic czy ten
	// Optional.isPresent()
	public Node getNodeByGivenPointId(List<Node> nodes, int pointId) {
		Node node = null;
		for (Node nodee : nodes) {
			if (nodee.getPoint().getId() == pointId) {
				node = nodee;
				break;
			}
		}
		return node;
	}
	/*
	 * dla konkretnego Node'a, pobieramy segmenty z bazy danych i sprawdzamy
	 * 
	 * jeżeli
	 */

	public static List<Segment> findSegmentsForNode(Node node, List<Segment> segments) {
		List<Segment> resultList = segments.stream().filter(seg -> (seg.getStartPointID() == node.getPoint().getId()
				|| seg.getEndPointID() == node.getPoint().getId())).collect(Collectors.toList());
		return resultList;
	}

	private Map<Node, Map<Node, Segment>> createAdjacencyMap(List<Node> nodes, List<Segment> segmentsFromDataBase) {
		Map<Node, Map<Node, Segment>> adjacencyMap = new HashMap<Node, Map<Node, Segment>>();

		for (Node node : nodes) {
			List<Segment> segmentsForNode = findSegmentsForNode(node, segmentsFromDataBase);
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

	public Map<Node, Map<Node, Segment>> createAdjacencyMap() {
		Map<Node, Map<Node, Segment>> adjacencyMap = createAdjacencyMap(findAllNodes(), segmentDAO.findAllSegments());
		return adjacencyMap;
	}

	private Map<Node, Map<Node, Segment>> createAdjacencyMap(List<Node> nodes) {
		Map<Node, Map<Node, Segment>> adjacencyMap = createAdjacencyMap(nodes, segmentDAO.findAllSegments());
		return adjacencyMap;
	}

	// pobiera Node'a z najmniejszą odległością z unsettledNodes.
	private Node getLowestDistanceNode(List<Node> unsettledNodes) {
		Node lowestDistanceNode = null;
		double lowestDistance = Double.MAX_VALUE;
		for (Node node : unsettledNodes) {
			double nodeDistance = node.getDistance();
			if (nodeDistance < lowestDistance) {
				lowestDistance = nodeDistance;
				lowestDistanceNode = node;
			}
		}
		return lowestDistanceNode;
	}

	private void calculateMinimumDistance(Node evaluationNode, Segment segment, Node sourceNode) {
		Double sourceDistance = sourceNode.getDistance();
		if (sourceDistance + segment.getLength() < evaluationNode.getDistance()) {
			evaluationNode.setDistance(sourceDistance + segment.getLength());
			LinkedList<Node> shortestPath = new LinkedList<>(sourceNode.getShortestPath());
			shortestPath.add(sourceNode);
			evaluationNode.setShortestPath(shortestPath);
		}
	}

	public Graph calculateShortestPathFromSourceBellmanFord(Graph graph, Node source) {

		Map<Node, Map<Node, Segment>> adjacencyMap = graph.getAdjacencyList();

		source.setDistance(0.0);

		for (Entry<Node, Segment> adjacencyPair : adjacencyMap.get(source).entrySet()) {

			Node currentNode = source;

			Node adjacentNode = adjacencyPair.getKey();
			Segment segment = adjacencyPair.getValue();
			calculateMinimumDistance(adjacentNode, segment, currentNode);
		}

		for (int i = 0; i < adjacencyMap.keySet().size() - 1; i++) {

			for (Node keyNode : adjacencyMap.keySet()) {

				if (keyNode.getDistance() != Double.MAX_VALUE) {

					for (Entry<Node, Segment> adjacencyPair : adjacencyMap.get(keyNode).entrySet()) {

						Node currentNode = keyNode;

						Node adjacentNode = adjacencyPair.getKey();
						Segment segment = adjacencyPair.getValue();
						calculateMinimumDistance(adjacentNode, segment, currentNode);
					}
				}
			}
		}
		return graph;
	}

	@SuppressWarnings("unchecked")
	public List<JSONObject> getShortestPathFromStartNodeToEndNodeBELLMAN(int startId, int endId) throws Exception {
		List<JSONObject> responseRoad = new JSONArray();

		List<Node> nodes = findAllNodes();
		Map<Node, Map<Node, Segment>> adjacencyMap = createAdjacencyMap(nodes);
		Graph graph = new Graph(nodes, adjacencyMap);
		
		calculateShortestPathFromSourceBellmanFord(graph, getNodeByGivenPointId(nodes, startId));

		Optional<Point> sourcePointOptional = pointDAO.findPointByGivenId(startId);
		Optional<Point> endPointOptional = pointDAO.findPointByGivenId(endId);

		if (sourcePointOptional.isPresent() && endPointOptional.isPresent()) {
			Node endNode = getNodeByGivenPointId(nodes, endId);

			List<Node> shortestPath = endNode.getShortestPath();
			List<Node> pathWithEndNode = new ArrayList<>(shortestPath);
			pathWithEndNode.add(endNode);

			logger.info("sciezka: " + pathWithEndNode);

			int startIndex = getIndexWhenToStart(pathWithEndNode, startId);
			if (startIndex != -1) {
				for (int i = startIndex + 1; i < pathWithEndNode.size(); i++) {

					JSONObject jsonResponse = new JSONObject();
					Node actualNode = getNodeByGivenPointId(nodes, pathWithEndNode.get(i).getPoint().getId()); // koniec
					Node beforeNode = getNodeByGivenPointId(nodes, pathWithEndNode.get(i - 1).getPoint().getId()); // poczatek

					Map<Node, Segment> adjacencyNodeForJSON = graph.getAdjacencyList().get(beforeNode);
					Segment segmentBetweenBeforeAndActual = adjacencyNodeForJSON.get(actualNode);

					logger.info("before " + beforeNode);
					logger.info("actual " + actualNode);
					logger.info("segment " + segmentBetweenBeforeAndActual);

					if (!segmentDAO.checkSegmentOrder(beforeNode.getPoint(), segmentBetweenBeforeAndActual)) {
						jsonResponse.put("start_point", beforeNode.getPoint());
						jsonResponse.put("end_point", actualNode.getPoint());
						jsonResponse.put("segment_id", segmentBetweenBeforeAndActual.getId());
						jsonResponse.put("length", segmentBetweenBeforeAndActual.getLength());
						List<Point> points = segmentDAO
								.findAllPointsForSegmentByID(segmentBetweenBeforeAndActual.getId());
						Collections.reverse(points);
						jsonResponse.put("points", points);
						responseRoad.add(jsonResponse);
					} else {

						jsonResponse.put("start_point", beforeNode.getPoint());
						jsonResponse.put("end_point", actualNode.getPoint());
						jsonResponse.put("segment_id", segmentBetweenBeforeAndActual.getId());
						jsonResponse.put("length", segmentBetweenBeforeAndActual.getLength());
						jsonResponse.put("points",
								segmentDAO.findAllPointsForSegmentByID(segmentBetweenBeforeAndActual.getId()));
						responseRoad.add(jsonResponse);
					}
				}
			}
		}
		return responseRoad;
	}

	// dijkstra method
	public Graph calculateShortestPathFromSource(Graph graph, Node source) {
		source.setDistance(0.0);

		// sąsiedzi do których można dotrzeć, zawierający informację o dystansie ze
		// zródła
		List<Node> settledNodes = new ArrayList<Node>();

		// sąsiedzi, do których można dotrzeć, ale trzeba wyznaczyć dystans ze zródła
		List<Node> unsettledNodes = new ArrayList<Node>();

		// dodajemy zródło do unsettledNodes
		unsettledNodes.add(source);

		// Mapa (lista) sąsiedztw
		Map<Node, Map<Node, Segment>> adjacencyMap = graph.getAdjacencyList();

		while (unsettledNodes.size() != 0) {

			// wybieramy Node'a ( węzeł ) z najkrótszym dystansem
			Node currentNode = getLowestDistanceNode(unsettledNodes);

			// usuwamy tego node'a -> bo zaraz znajdzie się on w settledNodes
			unsettledNodes.remove(currentNode);

			/*
			 * dla głównego węzła z mapy (currentNode) pobieramy jego sąsiadów - możliwe
			 * dojścia
			 * 
			 * czyli dla np. v1 (klucz): v2, segment ( potrzebna jest dlugość ) v3, segment
			 * v2 i v3 to adjacencyPair. v1 to klucz z
			 * adjacencyMap.get(currentNode).entrySet()
			 * 
			 */
			for (Entry<Node, Segment> adjacencyPair : adjacencyMap.get(currentNode).entrySet()) {

				/*
				 * bierzemy podKlucz z adjacencyPair ( czyli np. v2 )
				 * 
				 */
				Node adjacentNode = adjacencyPair.getKey();

				/*
				 * pobieramy segment węzła ( klucza ) v2 - aby uzyskać odległość między węzłami
				 */
				Segment segment = adjacencyPair.getValue();

				if (!settledNodes.contains(adjacentNode)) {

					calculateMinimumDistance(adjacentNode, segment, currentNode);
					unsettledNodes.add(adjacentNode);
				}
			}
			settledNodes.add(currentNode);
		}
		return graph;
	}

	@SuppressWarnings("unchecked")
	public List<JSONObject> getShortestPathFromList(List<Integer> chosenPointsID) throws Exception {

		List<JSONObject> jsonArrayResponse = new JSONArray();
		for (int i = 1; i < chosenPointsID.size(); i++) {

			int sourceId = chosenPointsID.get(i - 1);
			int endId = chosenPointsID.get(i);

			List<JSONObject> shortestPathFromStartNodeToEndNode = getShortestPathFromStartNodeToEndNode(sourceId,
					endId);
			jsonArrayResponse.addAll(shortestPathFromStartNodeToEndNode);
		}
		return jsonArrayResponse;
	}
	
	@SuppressWarnings("unchecked")
	public List<JSONObject> getShortestPathFromListBELLMAN(List<Integer> chosenPointsID) throws Exception {

		List<JSONObject> jsonArrayResponse = new JSONArray();
		for (int i = 1; i < chosenPointsID.size(); i++) {

			int sourceId = chosenPointsID.get(i - 1);
			int endId = chosenPointsID.get(i);

			List<JSONObject> shortestPathFromStartNodeToEndNode = getShortestPathFromStartNodeToEndNodeBELLMAN(sourceId,
					endId);
			jsonArrayResponse.addAll(shortestPathFromStartNodeToEndNode);
		}
		return jsonArrayResponse;
	}
	
	

	private int getIndexWhenToStart(List<Node> pathWithEndNode, int startId) {
		int startIndex = 0;
		for (int i = 0; i < pathWithEndNode.size(); i++) {
			if (pathWithEndNode.get(i).getPoint().getId() != startId) {
				startIndex = -1;
			} else {
				startIndex = i;
				break;
			}
		}
		return startIndex;
	}

	@SuppressWarnings("unchecked")
	public List<JSONObject> getShortestPathFromStartNodeToEndNode(int startId, int endId) throws Exception {
		List<JSONObject> responseRoad = new JSONArray();

		List<Node> nodes = findAllNodes();
		Map<Node, Map<Node, Segment>> adjacencyMap = createAdjacencyMap(nodes);
		Graph graph = new Graph(nodes, adjacencyMap);
		calculateShortestPathFromSource(graph, getNodeByGivenPointId(nodes, startId));

		Optional<Point> sourcePointOptional = pointDAO.findPointByGivenId(startId);
		Optional<Point> endPointOptional = pointDAO.findPointByGivenId(endId);

		if (sourcePointOptional.isPresent() && endPointOptional.isPresent()) {
			Node endNode = getNodeByGivenPointId(nodes, endId);

			List<Node> shortestPath = endNode.getShortestPath();
			List<Node> pathWithEndNode = new ArrayList<>(shortestPath);
			pathWithEndNode.add(endNode);

			logger.info("sciezka: " + pathWithEndNode);

			int startIndex = getIndexWhenToStart(pathWithEndNode, startId);
			if (startIndex != -1) {
				for (int i = startIndex + 1; i < pathWithEndNode.size(); i++) {

					JSONObject jsonResponse = new JSONObject();
					Node actualNode = getNodeByGivenPointId(nodes, pathWithEndNode.get(i).getPoint().getId()); // koniec
					Node beforeNode = getNodeByGivenPointId(nodes, pathWithEndNode.get(i - 1).getPoint().getId()); // poczatek

					Map<Node, Segment> adjacencyNodeForJSON = graph.getAdjacencyList().get(beforeNode);
					Segment segmentBetweenBeforeAndActual = adjacencyNodeForJSON.get(actualNode);

					logger.info("before " + beforeNode);
					logger.info("actual " + actualNode);
					logger.info("segment " + segmentBetweenBeforeAndActual);

					if (!segmentDAO.checkSegmentOrder(beforeNode.getPoint(), segmentBetweenBeforeAndActual)) {
						jsonResponse.put("start_point", beforeNode.getPoint());
						jsonResponse.put("end_point", actualNode.getPoint());
						jsonResponse.put("segment_id", segmentBetweenBeforeAndActual.getId());
						jsonResponse.put("length", segmentBetweenBeforeAndActual.getLength());
						List<Point> points = segmentDAO
								.findAllPointsForSegmentByID(segmentBetweenBeforeAndActual.getId());
						Collections.reverse(points);
						jsonResponse.put("points", points);
						responseRoad.add(jsonResponse);
					} else {

						jsonResponse.put("start_point", beforeNode.getPoint());
						jsonResponse.put("end_point", actualNode.getPoint());
						jsonResponse.put("segment_id", segmentBetweenBeforeAndActual.getId());
						jsonResponse.put("length", segmentBetweenBeforeAndActual.getLength());
						jsonResponse.put("points",
								segmentDAO.findAllPointsForSegmentByID(segmentBetweenBeforeAndActual.getId()));
						responseRoad.add(jsonResponse);
					}
				}
			}
		}
		return responseRoad;
	}
}