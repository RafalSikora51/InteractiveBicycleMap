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
import { NodeAddress } from '../Model/NodeAddress';
import { Observable, of, config } from 'rxjs';
import { HttpResponse } from 'selenium-webdriver/http';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParamArray } from '../Model/ParamArray';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

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
  nodesArray: any[];
  polyLines: any[] = [];
  pressedNodes: any[] = [];
  markersToRemove: any[] = [0, 0];
  dragOperation = false;
  addressArray: NodeAddress[] = [];
  addressArrayForStepper: NodeAddress[] = [];
  recycledMarkers: NodeAddress[] = [];
  recycledMarkersWithoutAdress: Array<number> = [];
  pressedMarkersWithoutAddress: Array<number> = [];
  paramArray: ParamArray = { pressedNodes: [], recycledNodes: [] };
  length: any = 0;
  infowindows: any = [];
  isMarkerClickable = true;
  locationString: String = ' ';
  constructor(private segmentService: SegmentService,
    private segmentComponent: SegmentComponent,
    private dialogComponent: DialogComponent,
    public snackBarComponent: MatSnackBar

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
  geocoder = new google.maps.Geocoder;

  returnValue: string;

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
    this.geocoder = new google.maps.Geocoder();

    //  google.maps.event.addListener(this.googleMap, 'click', (event) => {
    //   this.placeMarker(event);

    //  });

    this.markersArray.pop();
    this.markersArray.pop();
    this.dijkstraArray.pop();
    this.dijkstraArray.pop();
    this.markersToRemove.pop();
    this.markersToRemove.pop();
    this.pressedNodes.push();
    this.recycledMarkers.push();

  }



  getSegments(): void {
    this.segmentService.getAllSegmentsWithPoints().subscribe(
      segments => {
        this.segmentPointsSet = segments;
        this.addAllMarkersFromAPI();
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
        // console.log('Jestem w getNodes');
        // console.table(this.nodesArray);

        this.nodesArray.forEach(node => {

          let point;
          let marker;

          point = node['point'];
          const markerTemp: Marker = { lat: 0, lng: 0 };
          markerTemp.lat = point.lat;
          markerTemp.lng = point.lng;

          marker = new google.maps.Marker({
            icon: environment.apiUrl +'/assets/blackpin.png',
            position: markerTemp,
            map: this.googleMap,
            title: 'id: ' + point.id + ', latlng: ' + ' ' + point.lat + '    ' + point.lng,
          });

          //    const contentInfo = '<p><app-dialog></app-dialog></p>';

          //   const info2 = new google.maps.InfoWindow({
          //     content: contentInfo

          //   });

          marker.addListener('click', function () {
            console.log('klikam na end ' + point.id);
            // info2.open(this.googleMap, marker);
            marker.setIcon(environment.apiUrl +'/assets/pin.png');
            that.pressedNodes.push(point.id);
            that.markersToRemove.push(marker);

            marker.setClickable(false);
            // that.DialogComponent.openDialog();

            // that.dialogComponent.openDialog();

            that.geocodeLatLng(that.geocoder, that.googleMap, point.lat, point.lng, point.id, marker);

          });
        });


      },
      error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:no-shadowed-variable
  geocodeLatLng(geocoder, map, latt: any, lngg: any, idd: number, marker) {
    const that = this;
    const latlng = new google.maps.LatLng(latt, lngg);
    geocoder.geocode({ 'location': latlng }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          const place: NodeAddress = { id: idd, address: results[0].formatted_address };
          that.addressArray.push(place);
          that.addressArrayForStepper.push(place);
          let splittedResult = results[0].formatted_address;
          splittedResult = splittedResult.split(',', 1);
          const contentInfo = '<html>' +
            '<head>' +
            '<style>' +
            'p {' +
            'color: black;' +
            'font-size:15px;' +
            'font-weight: normal;' +
            '}' +
            '.gm-style-iw {' +
            'top: 0 !important;' +
            'left: 10 !important;' +
            'color:black' +
            'width:500px !important;' +
            'height:50px !important;' +
            'padding-left: 10px;' +
            'margin:3px 6px 0px 0px;' +
            '}' +
            '</style>' +
            '</head>' +
            '<body>' +
            '<div class="gm-style-iw">' +
            '<p>' + 'Adres: ' + splittedResult + '</p>' +
            '</div>' +

            '</body>' +
            '</html>';


          const info2 = new google.maps.InfoWindow({
            content: contentInfo
          });
          that.infowindows.push(info2);
          if (info2) {
            info2.close();
          }
          info2.open(this.googleMap, marker);

        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  getShortestPath(finalRoad: any): boolean {

    if (finalRoad === null) {
      this.snackBarComponent.open('Ścieżka nie istnieje / nie można wyznaczyć', 'OK', {
        duration: 3000,
        panelClass: ['success-snackbar']

      });
    } else {


      let points = [];

      let start_point;
      let end_point;
      this.length = 0;
      finalRoad.forEach(element => {
        this.length += element.length;
        console.log(element.length);
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
      this.polyLines.push(Path2);
      this.dijkstraArray = [];

      return true;
    }

  }






  placeMarker(event) {

    const marker = new google.maps.Marker({
      position: event.latLng,
      map: this.googleMap
    });
    console.log('' + event.latLng.lat() + ', ' + event.latLng.lng());

    const tempInfo = '' + event.latLng.lat() + ', ' + event.latLng.lng();
    const latlng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
    this.geocoder = new google.maps.Geocoder();

    const info = new google.maps.InfoWindow({
      content: this.locationString.toString()

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
      // tslint:disable-next-line:prefer-const
      let markerStart;
      // tslint:disable-next-line:prefer-const
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
      });

      this.markersArray.push(end_markerTemp);
      this.drawPath();
      this.markersArray = [];
    });

    this.getNodes();

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


  showArrayMarkers() {

    this.pressedNodes.forEach(

      element => {
        console.log(element);
      }
    );

  }


  showrecycled() {
    console.log('Recycled Markers:');
    console.table(this.recycledMarkers);
    console.log(' recycledMarkersWithoutAdress:');
    console.log(this.recycledMarkersWithoutAdress);
  }

  createListsWithNodeIDs() {
    this.addressArray.forEach(element => {
      console.log(element.id);
      this.pressedMarkersWithoutAddress.push(element.id);
    });
    this.recycledMarkers.forEach(element => {
      console.log(element.id);
      this.recycledMarkersWithoutAdress.push(element.id);
    });


  }

  trackBy(addressArrayForStepper: NodeAddress): NodeAddress { return addressArrayForStepper; }




  doDijkstraOnList() {
    this.addressArrayForStepper = this.addressArray;
    this.createListsWithNodeIDs();
    console.table('recycled:' + this.recycledMarkers);

    console.table('recycledwithoutaddress' + this.recycledMarkersWithoutAdress);
    console.table('pressedwithoutaddess' + this.pressedMarkersWithoutAddress);

    this.pressedMarkersWithoutAddress.forEach(element => {
      this.paramArray.pressedNodes.push(element);
    });
    this.recycledMarkersWithoutAdress.forEach(element => {
      this.paramArray.recycledNodes.push(element);
    });


    console.log(this.paramArray.pressedNodes);
    console.log(this.paramArray.recycledNodes);

    console.log('pressedNodes na poczatku dijkstry: ' + this.pressedNodes);

    if (this.pressedNodes.length <= 1) {
      this.snackBarComponent.open('Za mało podanych punktów', 'OK', {
        duration: 3000,
      });
    } else {
      this.showArrayMarkers();
      this.dialogComponent.openDialog();
      this.segmentService.dijkstraOnList(this.paramArray)
        .subscribe(markers => {
          this.markers = markers;
          console.table(this.markers);
          this.getShortestPath(this.markers);
          this.dialogComponent.closeDialog();

          this.markersToRemove[0].setIcon(environment.apiUrl +'/assets/greenpin.png');
          for (let i = 1; i < this.markersToRemove.length - 1; i++) {
            this.markersToRemove[i].setIcon(environment.apiUrl +'/assets/redpin.png');
          }
          this.markersToRemove[this.markersToRemove.length - 1].setIcon(environment.apiUrl +'/assets/placeholder.png');
        });

      this.markers = [];
      this.pressedNodes = [];
      this.addressArray = [];
      this.paramArray.pressedNodes = [];
      console.log('klikniete punkty to (pressedNodes): ');
      this.recycledMarkers = [];
      console.table(this.pressedNodes);
      this.showArrayMarkers();
    }
  }

  doBellmanOnList() {
    this.addressArrayForStepper = this.addressArray;
    this.createListsWithNodeIDs();
    console.table('recycled:' + this.recycledMarkers);

    console.table('recycledwithoutaddress' + this.recycledMarkersWithoutAdress);
    console.table('pressedwithoutaddess' + this.pressedMarkersWithoutAddress);

    this.pressedMarkersWithoutAddress.forEach(element => {
      this.paramArray.pressedNodes.push(element);
    });
    this.recycledMarkersWithoutAdress.forEach(element => {
      this.paramArray.recycledNodes.push(element);
    });


    console.log(this.paramArray.pressedNodes);
    console.log(this.paramArray.recycledNodes);

    if (this.pressedNodes.length <= 1) {
      this.snackBarComponent.open('Za mało podanych punktów', 'OK', {
        duration: 3000,

      });
    } else {
      this.showArrayMarkers();
      this.dialogComponent.openDialog();
      console.log(this.pressedNodes);

      this.segmentService.BellmanOnList(this.paramArray)
        .subscribe(markers => {
          this.markers = markers;
          console.table(this.markers);
          this.getShortestPath(this.markers);
          this.dialogComponent.closeDialog();
          this.markersToRemove[0].setIcon(environment.apiUrl +'/assets/greenpin.png');
          for (let i = 1; i < this.markersToRemove.length - 1; i++) {
            this.markersToRemove[i].setIcon(environment.apiUrl +'/assets/redpin.png');
          }
          this.markersToRemove[this.markersToRemove.length - 1].setIcon(environment.apiUrl +'/assets/placeholder.png');
        });

      this.markers = [];
      this.addressArray = [];
      this.pressedNodes = [];
      // this.pressedMarkersWithoutAddress = [];
      this.paramArray.pressedNodes = [];
      console.log('klikniete punkty to (pressedNodes): ');
      //   this.mapReset();
      this.recycledMarkers = [];
      console.table(this.pressedNodes);
      this.showArrayMarkers();
    }
  }

  removePolylines() {
    for (let i = 0; i < this.polyLines.length; i++) {
      this.polyLines[i].setMap(null);
    }
  }

  removeMarkers() {
    for (let i = 0; i < this.markersToRemove.length; i++) {
      this.markersToRemove[i].setIcon(environment.apiUrl +'/assets/blackpin.png');
      this.markersToRemove[i].setClickable(true);
    }
  }

  mapReset(): void {
    this.removePolylines();
    this.removeMarkers();
    this.addressArray = [];
    this.pressedNodes = [];
    this.markers = [];
    this.markersToRemove = [];
    this.pressedNodes = [];
    this.recycledMarkers = [];
    this.pressedMarkersWithoutAddress = [];
    this.recycledMarkersWithoutAdress = [];
    this.paramArray.pressedNodes = [];
    this.paramArray.pressedNodes = [];
    this.isMarkerClickable = true;
    this.length = 0;
    this.closeAllInfoWindows();
  }
  closeAllInfoWindows() {
    for (let i = 0; i < this.infowindows.length; i++) {
      this.infowindows[i].close();
    }
  }
  dialogTest(): void {
    this.dialogComponent.openDialog();
  }

  showMarkersToRemove() {
    console.table(this.markersArray);
  }


  showAddresses() {
    console.table(this.addressArray);
  }

}




