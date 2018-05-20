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

	
	//zmienic na optionala, bo jesli np jakims cudem podamy id punktu,
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
				break;
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
	public List<JSONObject> getShortestPathFromStartNodeToEndNode(int startId, int endId) throws Exception {
		List<JSONObject> responseRoad = new JSONArray();

		List<Node> nodes = findAllNodes();
		Map<Node, Map<Node, Segment>> adjacencyMap = createAdjacencyMap(nodes);

		Graph graph = new Graph(nodes, adjacencyMap);

		Optional<Point> sourcePointOptional = pointDAO.findPointByGivenId(startId);

		if (sourcePointOptional.isPresent()) {
			Point sourcePoint = pointDAO.findPointByGivenId(startId).get();

			Node sourceNode = new Node(sourcePoint);
			Node endNode = getNodeByGivenPointId(nodes, endId);

			Map<Node, Segment> adjacencyNodeForJSON = new HashMap<>();

			calculateShortestPathFromSource(graph, sourceNode);

			List<Node> shortestPath = endNode.getShortestPath();
			shortestPath.add(endNode);

			int j = 0;
			for (int i = 1; i < shortestPath.size(); i++) {

				JSONObject jsonResponse = new JSONObject();
				j = i;
				logger.info("Dla którego node'a szukamy : " + shortestPath.get(i - 1));
				adjacencyNodeForJSON = adjacencyMap.get(shortestPath.get(i - 1));

				Point startPoint = pointDAO
						.findPointByGivenId(adjacencyNodeForJSON.get(shortestPath.get(j)).getStartPointID()).get();
				Point endPoint = pointDAO
						.findPointByGivenId(adjacencyNodeForJSON.get(shortestPath.get(j)).getEndPointID()).get();

				if (segmentDAO.checkSegmentOrder(shortestPath.get(i - 1).getPoint(),
						adjacencyNodeForJSON.get(shortestPath.get(j))) == true) {

					jsonResponse.put("start_point", startPoint);
					jsonResponse.put("end_point", endPoint);
					jsonResponse.put("segment_id", adjacencyNodeForJSON.get(shortestPath.get(j)).getId());
					jsonResponse.put("length", adjacencyNodeForJSON.get(shortestPath.get(j)).getLength());
					jsonResponse.put("points", segmentDAO
							.findAllPointsForSegmentByID(adjacencyNodeForJSON.get(shortestPath.get(j)).getId()));
					responseRoad.add(jsonResponse);

				} else {
					jsonResponse.put("start_point", endPoint);
					jsonResponse.put("end_point", startPoint);
					jsonResponse.put("segment_id", adjacencyNodeForJSON.get(shortestPath.get(j)).getId());
					jsonResponse.put("length", adjacencyNodeForJSON.get(shortestPath.get(j)).getLength());
					List<Point> points = segmentDAO
							.findAllPointsForSegmentByID(adjacencyNodeForJSON.get(shortestPath.get(j)).getId());
					Collections.reverse(points);
					jsonResponse.put("points", points);
					responseRoad.add(jsonResponse);
				}
				j = 0;
			}
		}
		return responseRoad;
	}
	
	

}