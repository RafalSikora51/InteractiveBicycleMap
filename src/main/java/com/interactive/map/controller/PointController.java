package com.interactive.map.controller;

import java.util.List;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
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
import com.interactive.map.entity.Segment;
import com.interactive.map.repo.PointDAO;

@RestController
@CrossOrigin
@RequestMapping("/points")
public class PointController {

	private static Logger logger = LogManager.getLogger(PointController.class);

	private final PointDAO pointDAO;

	@Autowired
	public PointController(PointDAO pointDAO) {
		this.pointDAO = pointDAO;
	}

	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean createPoint(@RequestBody Point point) {

		logger.debug("createPoint");
		pointDAO.createPoint(point);
		return true;
	}

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<Point>> findAllPoints() {
		List<Point> points = pointDAO.findAllPoints();
		if (points.isEmpty()) {
			return new ResponseEntity<List<Point>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Point>>(points, HttpStatus.OK);
	}

	@RequestMapping(value = "/{pointId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<Segment>> findAllSegmentsForPoint(@PathVariable int pointId) throws Exception {
		List<Segment> segments = pointDAO.findAllSegmentsForPoint(pointId);
		if (segments.isEmpty()) {
			return new ResponseEntity<List<Segment>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Segment>>(segments, HttpStatus.OK);
	}

}
