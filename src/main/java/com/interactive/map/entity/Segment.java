package com.interactive.map.entity;

import java.util.LinkedList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OrderBy;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Segment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SEGMENT_ID", insertable = false, updatable = false)
	private int id;

	@Column(name = "START_POINT_ID", nullable = false)
	private int startPointID;

	@Column(name = "END_POINT_ID", nullable = false)
	private int endPointID;

	@Override
	public String toString() {
		return " Segment [id=" + id + ", startPointID=" + startPointID + ", endPointID=" + endPointID + ", length="
				+ length + "]";
	}

	@Column(name = "LENGTH", nullable = false, unique = false)
	private double length;

	@ManyToMany(cascade = { CascadeType.ALL },  fetch = FetchType.EAGER)
	@JoinTable(name = "SEGMENT_POINT", joinColumns = {
			@JoinColumn(name = "SEGMENT_ID", nullable = false) }, inverseJoinColumns = {
					@JoinColumn(name = "POINT_ID", nullable = false) })
	@OrderBy("id")
	@JsonIgnore
	public List<Point> points;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getLength() {
		return length;
	}

	public void setLength(double length) {
		this.length = length;
	}

	public List<Point> getPoints() {
		return points;
	}

	public void setPoints(List<Point> points2) {
		this.points = points2;
	}

	public int getStartPointID() {
		return startPointID;
	}

	public void setStartPointID(int startPointID) {
		this.startPointID = startPointID;
	}

	public int getEndPointID() {
		return endPointID;
	}

	public void setEndPointID(int endPointID) {
		this.endPointID = endPointID;
	}

	public Segment() {

	}

	public Segment(int id, double length) {
		this.id = id;
		this.length = length;
	}

	public Segment(int id, double length, LinkedList<Point> points) {
		this.id = id;
		this.length = length;
		this.points = points;
}

}
