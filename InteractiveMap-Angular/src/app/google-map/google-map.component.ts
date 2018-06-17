import { Component, OnInit } from '@angular/core';
import { } from '@types/googlemaps';
import { Marker } from '../Model/marker';
import { SegmentService } from '../segment/segment.service';
import { SegmentPointSet } from '../Model/SegmentPointSet';
import { NodeAddress } from '../Model/NodeAddress';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material';
import { ParamArray } from '../Model/ParamArray';
import { FinalMarker } from '../Model/finalMarker';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  addBicycleLayerEnable: boolean;
  bikeLayer: any;
  tempMarker: Marker = { lat: 0, lng: 0 };
  markersArray: any[] = [0, 0];
  segmentPointsSet: SegmentPointSet[];
  dijkstraArray: any[] = [0, 0];
  nodesArray: any[];
  polyLines: any[] = [];
  markersToRemove: any[] = [0, 0];
  addressArrayForStepper: NodeAddress[] = [];
  finalMarkers: Array<FinalMarker> = [];
  incorrectMarkers: Array<FinalMarker> = [];
  paramArray: ParamArray = { pressedNodes: [], recycledNodes: [] };
  length: any = 0;
  infowindows: any = [];
  isMarkerClickable = true;
  // locationString: String = ' ';
  helpMarker: google.maps.Marker;
  constructor(private segmentService: SegmentService,
    private dialogComponent: DialogComponent,
    public snackBarComponent: MatSnackBar

  ) {
    this.addBicycleLayerEnable = false;
    this.bikeLayer = new google.maps.BicyclingLayer();
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

    this.markersArray.pop();
    this.markersArray.pop();
    this.dijkstraArray.pop();
    this.dijkstraArray.pop();
    this.markersToRemove.pop();
    this.markersToRemove.pop();

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
        this.nodesArray.forEach(node => {

          let point;
          let marker;

          point = node['point'];
          const markerTemp: Marker = { lat: 0, lng: 0 };
          markerTemp.lat = point.lat;
          markerTemp.lng = point.lng;

          marker = new google.maps.Marker({
            icon: '/assets/blackpin.png',
            position: markerTemp,
            map: this.googleMap,
            title: 'id: ' + point.id + ', latlng: ' + ' ' + point.lat + '    ' + point.lng,
          });

          marker.addListener('click', function () {
            marker.setIcon('/assets/pin.png');

            that.markersToRemove.push(marker);
            marker.setClickable(false);
            that.helpMarker = marker;
            that.geocodeLatLng(that.geocoder, that.googleMap, point.lat, point.lng, point.id, that.helpMarker);

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

          // that.addressArrayForStepper.push(place);
          let splittedResult = results[0].formatted_address;
          // tslint:disable-next-line:prefer-const
          let result = splittedResult;
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
          that.finalMarkers.push({ id: idd, address: result, marker: marker });
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

  doDijkstraOnList() {
    this.addressArrayForStepper = [];
    for (let i = 0; i < this.finalMarkers.length; i++) {
      this.addressArrayForStepper.push(this.finalMarkers[i]);
    }


    this.incorrectMarkers.push(this.finalMarkers[0]);
    this.incorrectMarkers.pop();
    // tslint:disable-next-line:no-shadowed-variable
    this.finalMarkers.forEach(element => {
      this.paramArray.pressedNodes.push(element.id);
    });

    // tslint:disable-next-line:no-shadowed-variable
    this.incorrectMarkers.forEach(element => {
      this.paramArray.recycledNodes.push(element.id);
    });

    if (this.finalMarkers.length <= 1) {
      this.snackBarComponent.open('Za mało podanych punktów', 'OK', {
        duration: 3000,
      });
    } else {
      this.showArrayMarkers();
      this.dialogComponent.openDialog();
      this.segmentService.dijkstraOnList(this.paramArray)
        .subscribe(markers => {
          this.markers = markers;
         // console.table(this.markers);
          this.getShortestPath(this.markers);
          this.dialogComponent.closeDialog();

          this.finalMarkers[0].marker.setIcon('/assets/greenpin.png');
          this.finalMarkers.forEach(element => {
            if (element !== this.finalMarkers[0]) {
              element.marker.setIcon('/assets/redpin.png');
            }

          });
          this.finalMarkers[this.finalMarkers.length - 1].marker.setIcon('/assets/placeholder.png');

        });

      this.markers = [];

      this.paramArray.pressedNodes = [];
      this.paramArray.recycledNodes = [];
      this.incorrectMarkers = [];
      this.showArrayMarkers();
    }
  }

  doBellmanOnList() {
    this.addressArrayForStepper = [];
    for (let i = 0; i < this.finalMarkers.length; i++) {
      this.addressArrayForStepper.push(this.finalMarkers[i]);
    }

    this.incorrectMarkers.push(this.finalMarkers[0]);
    this.incorrectMarkers.pop();
    // tslint:disable-next-line:no-shadowed-variable
    this.finalMarkers.forEach(element => {
      this.paramArray.pressedNodes.push(element.id);
    });

    // tslint:disable-next-line:no-shadowed-variable
    this.incorrectMarkers.forEach(element => {
      this.paramArray.recycledNodes.push(element.id);
    });

    if (this.finalMarkers.length <= 1) {
      this.snackBarComponent.open('Za mało podanych punktów', 'OK', {
        duration: 3000,
      });
    } else {
      this.showArrayMarkers();
      this.dialogComponent.openDialog();
      this.segmentService.BellmanOnList(this.paramArray)
        .subscribe(markers => {
          this.markers = markers;
          // console.table(this.markers);
          this.getShortestPath(this.markers);
          this.dialogComponent.closeDialog();

          this.finalMarkers[0].marker.setIcon('/assets/greenpin.png');
          this.finalMarkers.forEach(element => {
            if (element !== this.finalMarkers[0]) {
              element.marker.setIcon('/assets/redpin.png');
            }

          });
          this.finalMarkers[this.finalMarkers.length - 1].marker.setIcon('/assets/placeholder.png');
        });

      this.markers = [];
      this.paramArray.pressedNodes = [];
      this.paramArray.recycledNodes = [];
      this.incorrectMarkers = [];
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
      this.markersToRemove[i].setIcon('assets/blackpin.png');
      this.markersToRemove[i].setClickable(true);
    }
  }

  mapReset(): void {
    this.removePolylines();
    this.removeMarkers();
    this.markers = [];
    this.markersToRemove = [];
    this.addressArrayForStepper = [];
    this.paramArray.pressedNodes = [];
    this.paramArray.pressedNodes = [];
    this.isMarkerClickable = true;
    this.length = 0;
    this.finalMarkers = [];
    this.incorrectMarkers = [];
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
    console.table(this.finalMarkers);

  }



}




