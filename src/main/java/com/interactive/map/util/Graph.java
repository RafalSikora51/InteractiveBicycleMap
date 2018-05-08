package com.interactive.map.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import com.interactive.map.entity.Point;
import com.interactive.map.entity.Segment;

import com.interactive.map.util.Node;

public class Graph {

	// Węzły pobrane z bazy

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

	// pobiera Node'a z najmniejszą odległością z unsettledNodes.
	private static Node getLowestDistanceNode(List<Node> unsettledNodes) {

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

	// Node - sourceNode to poprzednik dla adjacentNode
	private static void calculateMinimumDistance(Node evaluationNode, Segment segment, Node sourceNode) {

		Double sourceDistance = sourceNode.getDistance();

		if (sourceDistance + segment.getLength() < evaluationNode.getDistance()) {
			evaluationNode.setDistance(sourceDistance + segment.getLength());
			LinkedList<Node> shortestPath = new LinkedList<>(sourceNode.getShortestPath());
			shortestPath.add(sourceNode);
			evaluationNode.setShortestPath(shortestPath);
		}
	}

	public static Graph calculateShortestPathFromSource(Graph graph, Node source) {
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

	
	//	 not finished
	public List<Segment> createFinalRoad(Node startNode, Node endNode) {

		List<Segment> dijkstraRoad = new ArrayList<>();

		//for (Entry<Node, Segment> adjacencyPair : adjacencyMap.get(startNode).entrySet()) {

		//	if(startNode.getPoint().getId() == adjacencyPair.getKey().getPoint().getId())
			
		//}

		for (int i = 0; i < dijkstraRoad.size(); i++) {
			System.out.println(dijkstraRoad.get(i));
		}

		return dijkstraRoad;

	}

	@Override
	public String toString() {
		return "Graph [nodes=" + nodes + "]";
	}

}
