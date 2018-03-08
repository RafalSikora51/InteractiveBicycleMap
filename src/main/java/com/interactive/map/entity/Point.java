package com.interactive.map.entity;

import java.util.LinkedHashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Point")
public class Point {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "POINT_ID", insertable = false, updatable = false)
	private int id;

	@Column(name = "LATITUDE", nullable = false)
	private double lat;

	@Column(name = "LONGITUDE", nullable = false)
	private double lng;

	@ManyToMany(cascade = { CascadeType.ALL }, mappedBy = "points", fetch = FetchType.EAGER)
	@JsonIgnore
	private Set<Segment> segments = new LinkedHashSet<Segment>();

	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(lat);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(lng);
		result = prime * result + (int) (temp ^ (temp >>> 32));
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
		Point other = (Point) obj;
		if (Double.doubleToLongBits(lat) != Double.doubleToLongBits(other.lat))
			return false;
		if (Double.doubleToLongBits(lng) != Double.doubleToLongBits(other.lng))
			return false;
		return true;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLng() {
		return lng;
	}

	public void setLng(double lng) {
		this.lng = lng;
	}

	public Set<Segment> getSegments() {
		return segments;
	}

	public void setSegments(Set<Segment> segments) {
		this.segments = segments;
	}

	public Point() {

	}

	public Point(int id, double lat, double lng) {
		this.id = id;
		this.lat = lat;
		this.lng = lng;
	}

	public Point(double lat, double lng) {
		this.lat = lat;
		this.lng = lng;
	}

	public Point(int id, double lat, double lng, Set<Segment> segments) {
		this.id = id;
		this.lat = lat;
		this.lng = lng;
		this.segments = segments;
	}

}
