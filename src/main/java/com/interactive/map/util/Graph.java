package com.interactive.map.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.interactive.map.entity.Point;
import com.interactive.map.entity.Segment;
import com.interactive.map.repo.PointDAO;
import com.interactive.map.repo.SegmentDAO;

@Component
public class Graph {

	// Węzły pobrane z bazy

	
	//TODO:
	// w tej klasie raczej nie powinienes uzywac DAO, zrob tak aby byly tutaj same gettery i settery. 
	
	
	@Autowired
	private PointDAO pointDAO;

	@Autowired
	private SegmentDAO segmentDAO;

	private static Logger logger = LogManager.getLogger(Graph.class);

	private List<Node> nodes;

	// Mapa, w której zawiera się cały graf ( czyli wierzchołki - klucze i mapa :
	// sąsiedzi(wierzchołki) + łączące je krawędzie)

	private Map<Node, Map<Node, Segment>> adjacencyMap;

	public Graph() {
		this.nodes = new ArrayList<>();
		this.adjacencyMap = new HashMap<Node, Map<Node, Segment>>();
	}

	public Graph(List<Node> nodes) {
		this.nodes = nodes;
		this.adjacencyMap = new HashMap<Node, Map<Node, Segment>>();
	}

	public Graph(List<Node> nodes, Map<Node, Map<Node, Segment>> adjacencyList) {
		this.nodes = nodes;
		this.adjacencyMap = adjacencyList;
	}

	public void addNode(Node node) {
		nodes.add(node);
	}

	public List<Node> getNodes() {
		return nodes;
	}

	public void setNodes(List<Node> nodes) {
		this.nodes = nodes;
	}

	public Map<Node, Map<Node, Segment>> getAdjacencyList() {
		return adjacencyMap;
	}

	public void setAdjacencyList(Map<Node, Map<Node, Segment>> adjacencyList) {
		this.adjacencyMap = adjacencyList;
	}

	
	//TODO:
	//t lepiej wrzucic do graphDAO
	// not finished
	@SuppressWarnings("unchecked")
	public List<JSONObject> createDijkstraRoad(Node startNode) {

		List<Segment> segments;

		segments = segmentDAO.findAllSegments();

		List<Node> nodes = new ArrayList<Node>();

		List<JSONObject> jsonResponseArray = new JSONArray();

		for (Segment segment : segments) {

			Point startPoint = pointDAO.findPointByGivenId(segment.getStartPointID()).get();
			Point endPoint = pointDAO.findPointByGivenId(segment.getEndPointID()).get();
			nodes.add(new Node(startPoint));
			nodes.add(new Node(endPoint));
		}

		nodes = nodes.stream().distinct().collect(Collectors.toList());

		Graph graph = new Graph(nodes, adjacencyMap);

		Point sourcePoint = pointDAO.findPointByGivenId(1).get();

		Node sourceNode = new Node(sourcePoint);

		// Graph resultGraph = calculateShortestPathFromSource(graph, sourceNode);

		// List<JSONObject> dijkstraRoad = new ArrayList<>();

		// logger.info("CreateFinalRoad: ");
		// logger.info(startNode);
		// logger.info(startNode.getPoint());

		// Graph resultGraph = calculateShortestPathFromSource(Graph graph, startNode);

		// logger.info("Pkt początkowy: "+ startNode.getPoint());
		// logger.info(resultGraph.getNodes().get(2).getShortestPath());
		// logger.info("Pkt końcowy: "+ resultGraph.getNodes().get(3));

		// for (Entry<Node, Segment> adjacencyPair :
		// adjacencyMap.get(startNode).entrySet()) {

		// }

		//// for (int i = 0; i < dijkstraRoad.size(); i++) {
		// System.out.println(dijkstraRoad.get(i));
		// }

		// }

		return jsonResponseArray;
	}

	@Override
	public String toString() {
		return "Graph [nodes=" + nodes + "]";
	}

}
