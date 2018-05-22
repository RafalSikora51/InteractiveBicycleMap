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

	@Override
	public String toString() {
		return "Graph [nodes=" + nodes + "]";
	}

}
