package com.interactive.map.util;

import com.interactive.map.entity.Point;

public class HarvesineFormula {

	private static final int EarthRadius = 6371;

	public static double calculateDistance(Point startPoint, Point endPoint) {

		double distanceLatitude = Math.toRadians((endPoint.getLat() - startPoint.getLat()));
		double distanceLongitude = Math.toRadians((endPoint.getLng() - startPoint.getLng()));

		double a = Math.pow(Math.sin(distanceLatitude / 2), 2) + Math.cos(Math.toRadians(startPoint.getLat()))
				* Math.cos(Math.toRadians(endPoint.getLat())) * Math.pow(Math.sin(distanceLongitude / 2), 2);

		double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return EarthRadius * c;

	}

}
