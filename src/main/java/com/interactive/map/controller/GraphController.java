package com.interactive.map.controller;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.interactive.map.entity.Segment;
import com.interactive.map.repo.GraphDAO;
import com.interactive.map.util.Node;

@RestController
@CrossOrigin
@RequestMapping("/graph")
public class GraphController {

	private final GraphDAO graphDao;

	@Autowired
	public GraphController(GraphDAO graphDao) {
		this.graphDao = graphDao;
	}

	@RequestMapping(value = "/nodes", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<Node>> findAllNodes() {
		List<Node> nodes = graphDao.findAllNodes();
		if (nodes.isEmpty()) {
			return new ResponseEntity<List<Node>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Node>>(nodes, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/map", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<Map<Node, Map<Node, Segment>>> createAdjacencyMap() {
		Map<Node, Map<Node, Segment>> adjacencyMap = graphDao.createAdjacencyMap();
		if (adjacencyMap.isEmpty()) {
			return new ResponseEntity<Map<Node, Map<Node, Segment>>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<Map<Node, Map<Node, Segment>>>(adjacencyMap, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/dijkstra", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<JSONObject>> getShortestPathFromStartNodeToEndNode(
			@RequestBody List<Integer> chosenNodes) throws Exception {
		List<JSONObject> shortestPath = graphDao.getShortestPathFromList(chosenNodes);
		if (shortestPath.isEmpty()) {
			return new ResponseEntity<List<JSONObject>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<JSONObject>>(shortestPath, HttpStatus.OK);
		}
	}
	
	@RequestMapping(value = "/bellman", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<JSONObject>> getShortestPathFromStartNodeToEndNodeBELLMAN(
			@RequestBody List<Integer> chosenNodes) throws Exception {
		List<JSONObject> shortestPath = graphDao.getShortestPathFromListBELLMAN(chosenNodes);
		if (shortestPath.isEmpty()) {
			return new ResponseEntity<List<JSONObject>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<JSONObject>>(shortestPath, HttpStatus.OK);
		}
	}
	


//	@RequestMapping(value = "/dijkstra/{startId}/{endId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//	@ResponseBody
//	public ResponseEntity<List<JSONObject>> getShortestPathFromStartNodeToEndNode(@PathVariable int startId,
//			@PathVariable int endId) throws Exception {
//		List<JSONObject> shortestPath = graphDao.getShortestPathFromStartNodeToEndNode(startId, endId);
//		if (shortestPath.isEmpty()) {
//			return new ResponseEntity<List<JSONObject>>(HttpStatus.NO_CONTENT);
//		} else {
//			return new ResponseEntity<List<JSONObject>>(shortestPath, HttpStatus.OK);
//		}
//	}
	
//	@RequestMapping(value = "/bellman/{startId}/{endId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//	@ResponseBody
//	public ResponseEntity<List<JSONObject>> getShortestPathFromStartNodeToEndNodeBELLMAN(@PathVariable int startId,
//			@PathVariable int endId) throws Exception {
//		List<JSONObject> shortestPath = graphDao.getShortestPathFromStartNodeToEndNodeBELLMAN(startId, endId);
//		if (shortestPath.isEmpty()) {
//			return new ResponseEntity<List<JSONObject>>(HttpStatus.NO_CONTENT);
//		} else {
//			return new ResponseEntity<List<JSONObject>>(shortestPath, HttpStatus.OK);
//		}
//	}
	

}