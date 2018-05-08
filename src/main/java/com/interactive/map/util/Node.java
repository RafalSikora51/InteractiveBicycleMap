package com.interactive.map.util;

import java.util.LinkedList;
import java.util.List;

import com.interactive.map.entity.Point;

public class Node {

	private Point point;

	//kolekcja : najkrótsza ścieżka począwszy od node'a startowego
	private List<Node> shortestPath = new LinkedList<>();
	
	// Nieskończoność -> tutaj Double.Maxvalue
	private double distance;

	public Point getPoint() {
		return point;
	}

	public void setPoint(Point point) {
		this.point = point;
	}

	public List<Node> getShortestPath() {
		return shortestPath;
	}

	public void setShortestPath(List<Node> shortestPath) {
		this.shortestPath = shortestPath;
	}

	public Double getDistance() {
		return distance;
	}

	public void setDistance(Double distance) {
		this.distance = distance;
	}

	public Node(Point point) {
		this.point = point;
		this.distance = Double.MAX_VALUE;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((point == null) ? 0 : point.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Node other = (Node) obj;
		if (point == null) {
			if (other.point != null)
				return false;
		} else if (!point.equals(other.point))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Node [point=" + point + ", distance=" + distance + "]";
	}

	
	
}
