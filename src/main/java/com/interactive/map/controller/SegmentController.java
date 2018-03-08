package com.interactive.map.controller;

import java.util.LinkedHashSet;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.interactive.map.entity.Point;
import com.interactive.map.repo.SegmentDAO;
import com.interactive.map.entity.Segment;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/segments")
public class SegmentController {

	private static Logger logger = LogManager.getLogger(SegmentController.class);

	private final SegmentDAO segmentDAO;

	@Autowired
	public SegmentController(SegmentDAO segmentDAO) {
		this.segmentDAO = segmentDAO;
	}

	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean createSegment(@RequestBody LinkedHashSet<Point> points) {
		try {
			segmentDAO.createSegment(points);
			logger.debug("createSegment");
			return true;
		} catch (Exception e) {

			return false;
		}
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

}
