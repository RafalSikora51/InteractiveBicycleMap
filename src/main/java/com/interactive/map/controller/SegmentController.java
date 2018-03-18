package com.interactive.map.controller;

import java.util.LinkedHashMap;
import java.util.LinkedHashSet;

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

import com.interactive.map.entity.Point;
import com.interactive.map.repo.PointDAO;
import com.interactive.map.repo.SegmentDAO;
import com.interactive.map.entity.Segment;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/segments")
public class SegmentController {

	private final SegmentDAO segmentDAO;

	@Autowired
	public SegmentController(SegmentDAO segmentDAO) {
		this.segmentDAO = segmentDAO;
	}

	@Autowired
	public PointDAO pointDAO;

	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean createSegment(@RequestBody LinkedHashSet<Point> points) {
		return segmentDAO.createSegment(points);
	}

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<Segment>> findAllSegments() {
		List<Segment> segments = segmentDAO.findAllSegments();
		if (segments.isEmpty()) {
			return new ResponseEntity<List<Segment>>(HttpStatus.NO_CONTENT);
		} else
			return new ResponseEntity<List<Segment>>(segments, HttpStatus.OK);
	}

	@RequestMapping(value = "/{segment_id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<Point>> findAllPointsForSegment(@PathVariable int segment_id) throws Exception {
		List<Point> points = segmentDAO.findAllPointsForSegmentByID(segment_id);
		if (points.isEmpty()) {
			return new ResponseEntity<List<Point>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Point>>(points, HttpStatus.OK);
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<LinkedHashMap<Segment, List<Point>>> findAllSegmentsWithContainingPoints() throws Exception {

		LinkedHashMap<Segment, List<Point>> segment_points_map = segmentDAO.findAllSegmentsWithContainingPoints();

		if (segment_points_map.isEmpty()) {
			return new ResponseEntity<LinkedHashMap<Segment, List<Point>>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<LinkedHashMap<Segment, List<Point>>>(segment_points_map, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/alljson", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<JSONObject>> findAllSegmentsWithContainingPointsJSON() throws Exception {

		List<JSONObject> segment_points_map = segmentDAO.findAllSegmentsWithContainingPointsJSON();

		if (segment_points_map.isEmpty()) {
			return new ResponseEntity<List<JSONObject>>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<JSONObject>>(segment_points_map, HttpStatus.OK);
		}
	}

}
