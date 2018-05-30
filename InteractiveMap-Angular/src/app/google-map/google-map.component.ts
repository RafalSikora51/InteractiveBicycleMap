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
import { empty } from 'rxjs/Observer';
import { HttpResponse } from 'selenium-webdriver/http';
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
  dijkstraSet: SegmentPointSet[] = [];
  dijkstraArray: any[] = [0, 0];
  markersListenerArray: any[] = [0];
  nodesArray: any[];

  pressedNodes: any[] = [];

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
    const myCenter = new google.maps.LatLng(53.11503, 23.16347);
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
    this.dijkstraArray.pop();
    this.dijkstraArray.pop();

    this.pressedNodes.push();

  }

  getSegments(): void {
    this.segmentService.getAllSegmentsWithPoints().subscribe(
      segments => {
        this.segmentPointsSet = segments;
        // console.table(this.segmentPointsSet);
      },
      error => {
        console.log(error);
      }
    );
  }


  getNodes(): void {
    const that = this;
    this.segmentService.getAllNodes().subscribe(
      nodes => {
        this.nodesArray = nodes;
        console.table(nodes);

        this.nodesArray.forEach(node => {

          let point;
          let marker;

          point = node['point'];
          const markerTemp: Marker = { lat: 0, lng: 0 };
          markerTemp.lat = point.lat;
          markerTemp.lng = point.lng;

          marker = new google.maps.Marker({
            position: markerTemp,
            map: this.googleMap,
            title: 'id: ' + point.id + ', latlng: ' + ' ' + point.lat + '    ' + point.lng,
          });


          const info2 = new google.maps.InfoWindow({
            content: '<html>' +
              '<head>' +
              '<style>' +
              'p {' +
              'color: blue;' +
              'font-size:15px' +
              '}' +
              '.gm-style-iw {' +
              'top: 0 !important;' +
              'left: 10 !important;' +
              'color:blue' +
              'width:500px !important;' +
              'height:50px !important;' +
              'padding-left: 10px;' +
              'margin:3px 6px 0px 0px;' +
              '}' +
              '</style>' +
              '</head>' +
              '<body>' +
              '<div class="gm-style-iw">' +
              '<p>' + 'ID: ' + point.id + ' LatLng: ' + point.lat + ', ' + point.lng + '</p>' +
              '</div>' +
              '</body>' +
              '</html>',

          });

          marker.addListener('click', function () {
            console.log('klikam na end ' + point.id);

            info2.open(this.googleMap, marker);
            marker.setIcon('/assets/pin.png');
            that.pressedNodes.push(point.id);
          });
          this.markersListenerArray.push(marker);



        });


      },
      error => {
        console.log(error);
      }
    );
  }


  getShortestPath(finalRoad: any): boolean {

    let points = [];

    let start_point;
    let end_point;

    finalRoad.forEach(element => {

      start_point = element['start_point'];
      end_point = element['end_point'];
      const start_markerTemp: Marker = { lat: 0, lng: 0 };
      const end_markerTemp: Marker = { lat: 0, lng: 0 };
      start_markerTemp.lat = start_point.lat;
      start_markerTemp.lng = start_point.lng;
      end_markerTemp.lat = end_point.lat;
      end_markerTemp.lng = end_point.lng;
      points = element['points'];
      this.dijkstraArray.push(start_markerTemp);

      points.forEach(point => {
        const markerTemp: Marker = { lat: 0, lng: 0 };
        markerTemp.lat = point.lat;
        markerTemp.lng = point.lng;
        this.dijkstraArray.push(markerTemp);
      });

      this.dijkstraArray.push(end_markerTemp);

    });


    const Path2 = new google.maps.Polyline({
      path: this.dijkstraArray,
      geodesic: true,
      editable: false,
      strokeColor: '#043596',
      strokeOpacity: 1,
      strokeWeight: 7,
    });
    Path2.setMap(this.googleMap);

     this.dijkstraArray = [];
    return true;
  }


  placeMarker(event) {

    const marker = new google.maps.Marker({
      position: event.latLng,
      map: this.googleMap
    });
    console.log('' + event.latLng.lat() + ', ' + event.latLng.lng());

    const tempInfo = '' + event.latLng.lat() + ', ' + event.latLng.lng();


    const contentInfo = '<html>' +
      '<head>' +
      '<style>' +
      'p {' +
      'color: blue;' +
      'font-size:15px' +
      '}' +
      '.gm-style-iw {' +
      'top: 0 !important;' +
      'left: 10 !important;' +
      'color:blue' +
      'width:500px !important;' +
      'height:50px !important;' +
      'padding-left: 10px;' +
      'margin:3px 6px 0px 0px;' +
      '}' +
      '</style>' +
      '</head>' +
      '<body>' +
      '<div class="gm-style-iw">' +
      '<p>' + event.latLng.lat() + ', ' + event.latLng.lng() + '</p>' +
      '</div>' +
      '</body>' +
      '</html>';

    const info = new google.maps.InfoWindow({
      content: contentInfo

    });

    marker.addListener('click', function () {
      info.open(this.googleMap, marker);
    });


    this.tempMarker.lat = event.latLng.lat();
    this.tempMarker.lng = event.latLng.lng();
    this.markersArray.push(this.tempMarker);
    this.tempMarker = { lat: 0, lng: 0 };

  }

  drawPath() {
    //console.log(this.markersArray);
    const Path = new google.maps.Polyline({
      path: this.markersArray,
      geodesic: true,
      editable: false,
      strokeColor: '#7d8987',
      strokeOpacity: 0.5,
      strokeWeight: 6,
    });
    Path.setMap(this.googleMap);
  }

  addAllMarkersFromAPI() {

    let points = [];
    let start_point;
    let end_point;

    this.segmentPointsSet.forEach(element => {
      let markerStart;
      let markerEnd;
      start_point = element['start_point'];
      end_point = element['end_point'];
      const start_markerTemp: Marker = { lat: 0, lng: 0 };
      const end_markerTemp: Marker = { lat: 0, lng: 0 };
      start_markerTemp.lat = start_point.lat;
      start_markerTemp.lng = start_point.lng;
      end_markerTemp.lat = end_point.lat;
      end_markerTemp.lng = end_point.lng;
      points = element['points'];

      this.markersArray.push(start_markerTemp);

      points.forEach(point => {
        const markerTemp: Marker = { lat: 0, lng: 0 };
        markerTemp.lat = point.lat;
        markerTemp.lng = point.lng;
        this.markersArray.push(markerTemp);

        // marker = new google.maps.Marker({
        // position: markerTemp,
        //    map: this.googleMap,
        // icon: 'http://maps.google.com/mapfiles/kml/pal4/icon49.png'
        // });
      });

      this.markersArray.push(end_markerTemp);
      this.drawPath();
      this.markersArray = [];




    });

    this.getNodes();

  }






  // showArrayMarkers() {
  //   if (this.showArray === false) {
  //     this.showArray = true;
  //   }
  //   if (this.showArray === true) {
  //     console.log(this.markersArray);
  //   }
  // }


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


  showArrayMarkers() {

    this.pressedNodes.forEach(
      element => {
        console.log(element);
      }
    );

  }

  doDijkstraOnList() {
    this.showArrayMarkers();

    console.log(this.pressedNodes);

    this.segmentService.dijkstraOnList(this.pressedNodes)
      .subscribe(markers => {
        this.markers = markers;
        console.table(this.markers);
        this.getShortestPath(this.markers);
      });


    console.log('tutaj wywolujemy request z naszymi klikenitymi id');
    console.log('teraz czyscimy tablice aby nie bylo juz zapamietanych kliknietych ' +
      'skoro dijkstra ywkonana (robimy miejsce na nowe)');
      this.markers = [];
    this.pressedNodes = [];
    console.log('klikniete punkty to: ');
    this.showArrayMarkers();

  }

  doBellmanOnList() {
    this.showArrayMarkers();

    console.log(this.pressedNodes);

    this.segmentService.BellmanOnList(this.pressedNodes)
      .subscribe(markers => {
        this.markers = markers;
        console.table(this.markers);
        this.getShortestPath(this.markers);
      });


    console.log('tutaj wywolujemy request z naszymi klikenitymi id');
    console.log('teraz czyscimy tablice aby nie bylo juz zapamietanych kliknietych ' +
      'skoro dijkstra ywkonana (robimy miejsce na nowe)');
    this.markers = [];
    this.pressedNodes = [];
    console.log('klikniete punkty to: ');
    this.showArrayMarkers();

  }





}




