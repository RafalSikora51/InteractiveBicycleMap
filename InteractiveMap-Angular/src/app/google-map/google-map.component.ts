import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { map } from 'rxjs/operator/map';
import { Input, Output, EventEmitter } from '@angular/core';
import { Marker } from '../Model/marker';
import { SegmentService } from '../segment/segment.service';
import { SegmentComponent } from '../segment/segment.component';
import { SegmentPointSet } from '../Model/SegmentPointSet';
import { GoogleMapService } from './google-map.service';
import { Point } from '../Model/point';
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  addBicycleLayerEnable: boolean;
  bikeLayer: any;
  showArray: boolean;
  tempMarker: Marker = { lat: 0, lng: 0 };
  markersArray: any[] = [0, 0];
  segmentPointsSet: SegmentPointSet[];

  constructor(private segmentService: SegmentService,
    private segmentComponent: SegmentComponent,

  ) {
    this.addBicycleLayerEnable = false;
    this.bikeLayer = new google.maps.BicyclingLayer();
    this.showArray = false;

  }

  showFiller = false;
  markers: any[];

  myLatLng = { lat: 53.131083, lng: 23.154742 };
  latitude: 53.131083;
  longitute: 23.154742;
  googleMap: google.maps.Map;

  ngOnInit() {

    this.getSegments();

    const mapCanvas = document.getElementById('map');
    const myCenter = new google.maps.LatLng(53.131083, 23.154742);
    const mapOptions = {
      center: myCenter,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.googleMap = new google.maps.Map(mapCanvas, mapOptions);
    google.maps.event.addListener(this.googleMap, 'click', (event) => {
      this.placeMarker(event);
    });
    this.markersArray.pop();
    this.markersArray.pop();

  }

  getSegments(): void {
    this.segmentService.getAllSegmentsWithPoints().subscribe(
      segments => {
        this.segmentPointsSet = segments;
        console.table(this.segmentPointsSet);
      },
      error => {
        console.log(error);
      }
    );
  }
  placeMarker(event) {

    const marker = new google.maps.Marker({
      position: event.latLng,
      map: this.googleMap
    });
    console.log('{"lat":' + event.latLng.lat() + ', "lng":' + event.latLng.lng() + '},');

    this.tempMarker.lat = event.latLng.lat();
    this.tempMarker.lng = event.latLng.lng();
    this.markersArray.push(this.tempMarker);
    this.tempMarker = { lat: 0, lng: 0 };

  }

  drawPath() {
    console.log(this.markersArray);
    const Path = new google.maps.Polyline({
      path: this.markersArray,
      geodesic: true,
      editable: false,
      strokeColor: '#0065ff',
      strokeOpacity: 0.5,
      strokeWeight: 6,
    });
    Path.setMap(this.googleMap);
  }



  addAllMarkersFromAPI() {

    

    let points = [];
    let marker;
    let start_point;
    let end_point;

    this.segmentPointsSet.forEach(element => {

      start_point = element['start_point'];
      end_point = element['end_point'];
      const start_markerTemp: Marker = { lat: 0, lng: 0 };
      const end_markerTemp: Marker = { lat: 0, lng: 0 };
      start_markerTemp.lat = start_point.lat;
      start_markerTemp.lng = start_point.lng;
      end_markerTemp.lat = end_point.lat;
      end_markerTemp.lng = end_point.lng;
      points = element['points'];

      marker = new google.maps.Marker({
        position: start_markerTemp,
        map: this.googleMap
      });

      marker = new google.maps.Marker({
        position: end_markerTemp,
        map: this.googleMap
      });

      this.markersArray.push(start_markerTemp);

      points.forEach(point => {
        const markerTemp: Marker = { lat: 0, lng: 0 };
        markerTemp.lat = point.lat;
        markerTemp.lng = point.lng;
        this.markersArray.push(markerTemp);

        marker = new google.maps.Marker({
          position: markerTemp,
          map: this.googleMap,
          icon: 'http://maps.google.com/mapfiles/kml/pal4/icon49.png'
        });
      });

      this.markersArray.push(end_markerTemp);
    });



    console.log(this.markersArray);
  }

  showArrayMarkers() {
    if (this.showArray === false) {
      this.showArray = true;
    }
    if (this.showArray === true) {
      console.log(this.markersArray);
    }
  }


  addBicycleLayer() {

    this.bikeLayer.setMap(this.googleMap);
  }
  removeBicycleLayer() {
    this.bikeLayer.setMap(null);
  }

  setMapType(mapTypeId: string) {
    this.googleMap.setMapTypeId(mapTypeId);
  }


  setCenter(e: any) {
    e.preventDefault();
    this.googleMap.setCenter(new google.maps.LatLng(this.latitude, this.longitute));
  }
}


// addAllMarkersFromAPI() {
//   let marker;
//   this.addBicycleLayer();
//   let points = [];
//   this.segmentPointsSet.forEach(element => {
//     points = element['points'];
//     points.forEach(point => {
//
//       this.markersArray.push(markerTemp);
//       marker = new google.maps.Marker({
//         position: markerTemp,
//         map: this.googleMap
//       });
//     });
//   });
//   console.log(this.markersArray);
// }
