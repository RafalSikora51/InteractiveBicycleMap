package com.interactive.map.entity;

import java.util.LinkedHashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OrderBy;
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
	private double latitude;

	@Column(name = "LONGITUDE", nullable = false)
	private double longitude;

	@ManyToMany(mappedBy = "points")
	@OrderBy("id")
	@JsonIgnore
	private Set<Segment> segments = new LinkedHashSet<Segment>();


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(latitude);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(longitude);
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
		if (Double.doubleToLongBits(latitude) != Double.doubleToLongBits(other.latitude))
			return false;
		if (Double.doubleToLongBits(longitude) != Double.doubleToLongBits(other.longitude))
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
		return latitude;
	}

	public void setLat(double lat) {
		this.latitude = lat;
	}

	public double getLng() {
		return longitude;
	}

	public void setLng(double lng) {
		this.longitude = lng;
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
		this.latitude = lat;
		this.longitude = lng;
	}

	public Point(double lat, double lng) {
		this.latitude = lat;
		this.longitude = lng;
	}

	public Point(int id, double lat, double lng, Set<Segment> segments) {
		this.id = id;
		this.latitude = lat;
		this.longitude = lng;
		this.segments = segments;
	}


}
