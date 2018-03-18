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
    // this.segmentPointsSet = this.segmentComponent.getAllSegmentsWithPoints();
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
    this.segmentPointsSet = this.segmentComponent.getAllSegmentsWithPoints();

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

  showTest() {
    console.log('test1');
    console.log(this.segmentPointsSet);
    console.log('test2');
  }

  placeMarker(event) {

    const marker = new google.maps.Marker({
      position: event.latLng,
      map: this.googleMap
    });
    console.log(event.latLng.lat() + ' ' + event.latLng.lng());

    this.tempMarker.lat = event.latLng.lat();
    this.tempMarker.lng = event.latLng.lng();
    this.markersArray.push(this.tempMarker);
    this.tempMarker = { lat: 0, lng: 0 };

  }



  addAllMarkersFromAPI() {
    let marker;

    this.segmentPointsSet.forEach(element => {
      this.tempMarker.lat = element.points.values().next().value.lat;
      this.tempMarker.lng = element.points.values().next().value.lng;
      this.markersArray.push(this.tempMarker);

      marker = new google.maps.Marker({
        position: this.tempMarker,
        map: this.googleMap
      });
      console.log(this.markersArray);
    });
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
