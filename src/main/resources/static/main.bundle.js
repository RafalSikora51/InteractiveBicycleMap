webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_map_google_map_component__ = __webpack_require__("../../../../../src/app/google-map/google-map.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__segment_segment_component__ = __webpack_require__("../../../../../src/app/segment/segment.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__google_map_google_map_component__["a" /* GoogleMapComponent */] },
    { path: 'segments/alljson', component: __WEBPACK_IMPORTED_MODULE_3__segment_segment_component__["a" /* SegmentComponent */] },
    { path: 'segments', component: __WEBPACK_IMPORTED_MODULE_3__segment_segment_component__["a" /* SegmentComponent */] },
    { path: 'localhost:4200/segments/:id', component: __WEBPACK_IMPORTED_MODULE_3__segment_segment_component__["a" /* SegmentComponent */] },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_ui_switch__ = __webpack_require__("../../../../angular2-ui-switch/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_ui_switch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_ui_switch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__google_map_google_map_component__ = __webpack_require__("../../../../../src/app/google-map/google-map.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__google_map_google_map_service__ = __webpack_require__("../../../../../src/app/google-map/google-map.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__segment_segment_component__ = __webpack_require__("../../../../../src/app/segment/segment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__segment_segment_service__ = __webpack_require__("../../../../../src/app/segment/segment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__point_point_component__ = __webpack_require__("../../../../../src/app/point/point.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__point_point_service__ = __webpack_require__("../../../../../src/app/point/point.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__google_map_google_map_component__["a" /* GoogleMapComponent */],
                __WEBPACK_IMPORTED_MODULE_11__segment_segment_component__["a" /* SegmentComponent */],
                __WEBPACK_IMPORTED_MODULE_13__point_point_component__["a" /* PointComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_15__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["v" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["D" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["b" /* NoopAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["C" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["n" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["D" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["k" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["d" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_2_angular2_ui_switch__["UiSwitchModule"],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["a" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["c" /* MatButtonToggleModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["d" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["e" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["f" /* MatChipsModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["g" /* MatDatepickerModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["h" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["i" /* MatExpansionModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["j" /* MatGridListModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["k" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["l" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["m" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["n" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["o" /* MatNativeDateModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["p" /* MatPaginatorModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["q" /* MatProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["r" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["s" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["t" /* MatRippleModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["u" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["v" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["x" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["w" /* MatSlideToggleModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["y" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["z" /* MatSortModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["B" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["C" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["D" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["E" /* MatTooltipModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["A" /* MatStepperModule */],
                __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap__["a" /* AlertModule */].forRoot()
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_9__google_map_google_map_service__["a" /* GoogleMapService */], __WEBPACK_IMPORTED_MODULE_12__segment_segment_service__["a" /* SegmentService */], __WEBPACK_IMPORTED_MODULE_14__point_point_service__["a" /* PointService */], __WEBPACK_IMPORTED_MODULE_11__segment_segment_component__["a" /* SegmentComponent */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/google-map/google-map.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "body {\r\n  margin: 0;\r\n}\r\n.not-active {\r\n  pointer-events: none;\r\n  cursor: default;\r\n}\r\n\r\nmat-toolbar-row {\r\n  -webkit-box-pack: justify;\r\n      -ms-flex-pack: justify;\r\n          justify-content: space-between;\r\n}\r\n\r\n\r\nmat-sidenav {\r\n  padding: 10px;\r\n  min-width: 400px;\r\n}\r\n\r\n.gm-style .gm-style-iw {\r\n  background-color: #252525 !important;\r\n  top: 0 !important;\r\n  left: 0 !important;\r\n  width: 100% !important;\r\n  height: 100% !important;\r\n  min-height: 120px !important;\r\n  padding-top: 10px;\r\n  display: block !important;\r\n}    ", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/google-map/google-map.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <mat-toolbar color=\"primary\">\r\n    <mat-toolbar-row>\r\n      <mat-icon>directions_bike</mat-icon>\r\n      <span class=\"example-spacer\"></span>\r\n      <span>Interaktywna mapa ścieżek rowerowych</span>\r\n\r\n\r\n      <a mat-raised-button color=\"primary\" href=\"https://github.com/RafalSikora51/InteractiveMap\">GitHub</a>\r\n      <button mat-icon-button [mat-menu-trigger-for]=\"menu\">\r\n        <mat-icon>menu</mat-icon>\r\n      </button>\r\n    </mat-toolbar-row>\r\n\r\n  </mat-toolbar>\r\n  <mat-menu x-position=\"before\" #menu=\"matMenu\">\r\n    <button mat-menu-item>Opcja 1</button>\r\n    <button mat-menu-item>Opcja 2</button>\r\n  </mat-menu>\r\n  <div>\r\n    <mat-sidenav-container class=\"example-container\">\r\n      <mat-sidenav mode=\"side\" opened=\"true\" position=\"end\">\r\n        <mat-nav-list>\r\n          <a mat-list-item class=\"not-active\">Menu</a>\r\n          <mat-divider></mat-divider>\r\n          <mat-divider></mat-divider>\r\n          <mat-divider></mat-divider>\r\n          <mat-divider></mat-divider>\r\n          <mat-divider></mat-divider>\r\n          <mat-divider></mat-divider>\r\n          <a mat-list-item (click)=\"addAllMarkersFromAPI()\">Wyświetl ścieżki</a>\r\n          <!-- <a mat-list-item (click)=\"getNodes()\">Dodaj ścieżki do mapy</a> -->\r\n          <mat-divider></mat-divider>\r\n          <a mat-list-item (click)=\" addBicycleLayer()\">Wyświetl ścieżki Google</a>\r\n          <mat-divider></mat-divider>\r\n          <a mat-list-item (click)=\"removeBicycleLayer()\">Usuń ścieżki z mapy</a>\r\n          <mat-divider></mat-divider>\r\n          <a mat-list-item (click)=\"doDijkstraOnList()\">Wyznacz ścieżkę - Dijkstra</a>\r\n          <mat-divider></mat-divider>\r\n          <a mat-list-item (click)=\"doBellmanOnList()\">Wyznacz ścieżkę - Bellman-Ford</a>\r\n\r\n        </mat-nav-list>\r\n\r\n      </mat-sidenav>\r\n      <mat-sidenav-content>\r\n\r\n        <div id=\"map\" style=\"width:100%;height:700px\">\r\n        </div>\r\n\r\n\r\n      </mat-sidenav-content>\r\n    </mat-sidenav-container>\r\n  </div>\r\n  <!--<div id=\"map\" style=\"width:100%;height:600px\">\r\n</div>\r\n-->"

/***/ }),

/***/ "../../../../../src/app/google-map/google-map.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__segment_segment_service__ = __webpack_require__("../../../../../src/app/segment/segment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__segment_segment_component__ = __webpack_require__("../../../../../src/app/segment/segment.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GoogleMapComponent = (function () {
    function GoogleMapComponent(segmentService, segmentComponent) {
        this.segmentService = segmentService;
        this.segmentComponent = segmentComponent;
        this.tempMarker = { lat: 0, lng: 0 };
        this.markersArray = [0, 0];
        this.dijkstraSet = [];
        this.dijkstraArray = [0, 0];
        this.markersListenerArray = [0];
        this.pressedNodes = [];
        this.showFiller = false;
        this.myLatLng = { lat: 53.131083, lng: 23.154742 };
        this.addBicycleLayerEnable = false;
        this.bikeLayer = new google.maps.BicyclingLayer();
        this.showArray = false;
    }
    GoogleMapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getSegments();
        var mapCanvas = document.getElementById('map');
        var myCenter = new google.maps.LatLng(53.11503, 23.16347);
        var mapOptions = {
            center: myCenter,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.googleMap = new google.maps.Map(mapCanvas, mapOptions);
        google.maps.event.addListener(this.googleMap, 'click', function (event) {
            _this.placeMarker(event);
        });
        this.markersArray.pop();
        this.markersArray.pop();
        this.dijkstraArray.pop();
        this.dijkstraArray.pop();
        this.pressedNodes.push();
    };
    GoogleMapComponent.prototype.getSegments = function () {
        var _this = this;
        this.segmentService.getAllSegmentsWithPoints().subscribe(function (segments) {
            _this.segmentPointsSet = segments;
            // console.table(this.segmentPointsSet);
        }, function (error) {
            console.log(error);
        });
    };
    GoogleMapComponent.prototype.getNodes = function () {
        var _this = this;
        var that = this;
        this.segmentService.getAllNodes().subscribe(function (nodes) {
            _this.nodesArray = nodes;
            console.table(nodes);
            _this.nodesArray.forEach(function (node) {
                var point;
                var marker;
                point = node['point'];
                var markerTemp = { lat: 0, lng: 0 };
                markerTemp.lat = point.lat;
                markerTemp.lng = point.lng;
                marker = new google.maps.Marker({
                    position: markerTemp,
                    map: _this.googleMap,
                    title: 'id: ' + point.id + ', latlng: ' + ' ' + point.lat + '    ' + point.lng,
                });
                var info2 = new google.maps.InfoWindow({
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
                _this.markersListenerArray.push(marker);
            });
        }, function (error) {
            console.log(error);
        });
    };
    GoogleMapComponent.prototype.getShortestPath = function (finalRoad) {
        var _this = this;
        var points = [];
        var start_point;
        var end_point;
        finalRoad.forEach(function (element) {
            start_point = element['start_point'];
            end_point = element['end_point'];
            var start_markerTemp = { lat: 0, lng: 0 };
            var end_markerTemp = { lat: 0, lng: 0 };
            start_markerTemp.lat = start_point.lat;
            start_markerTemp.lng = start_point.lng;
            end_markerTemp.lat = end_point.lat;
            end_markerTemp.lng = end_point.lng;
            points = element['points'];
            _this.dijkstraArray.push(start_markerTemp);
            points.forEach(function (point) {
                var markerTemp = { lat: 0, lng: 0 };
                markerTemp.lat = point.lat;
                markerTemp.lng = point.lng;
                _this.dijkstraArray.push(markerTemp);
            });
            _this.dijkstraArray.push(end_markerTemp);
        });
        var Path2 = new google.maps.Polyline({
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
    };
    GoogleMapComponent.prototype.placeMarker = function (event) {
        var marker = new google.maps.Marker({
            position: event.latLng,
            map: this.googleMap
        });
        console.log('' + event.latLng.lat() + ', ' + event.latLng.lng());
        var tempInfo = '' + event.latLng.lat() + ', ' + event.latLng.lng();
        var contentInfo = '<html>' +
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
        var info = new google.maps.InfoWindow({
            content: contentInfo
        });
        marker.addListener('click', function () {
            info.open(this.googleMap, marker);
        });
        this.tempMarker.lat = event.latLng.lat();
        this.tempMarker.lng = event.latLng.lng();
        this.markersArray.push(this.tempMarker);
        this.tempMarker = { lat: 0, lng: 0 };
    };
    GoogleMapComponent.prototype.drawPath = function () {
        //console.log(this.markersArray);
        var Path = new google.maps.Polyline({
            path: this.markersArray,
            geodesic: true,
            editable: false,
            strokeColor: '#7d8987',
            strokeOpacity: 0.5,
            strokeWeight: 6,
        });
        Path.setMap(this.googleMap);
    };
    GoogleMapComponent.prototype.addAllMarkersFromAPI = function () {
        var _this = this;
        var points = [];
        var start_point;
        var end_point;
        this.segmentPointsSet.forEach(function (element) {
            var markerStart;
            var markerEnd;
            start_point = element['start_point'];
            end_point = element['end_point'];
            var start_markerTemp = { lat: 0, lng: 0 };
            var end_markerTemp = { lat: 0, lng: 0 };
            start_markerTemp.lat = start_point.lat;
            start_markerTemp.lng = start_point.lng;
            end_markerTemp.lat = end_point.lat;
            end_markerTemp.lng = end_point.lng;
            points = element['points'];
            _this.markersArray.push(start_markerTemp);
            points.forEach(function (point) {
                var markerTemp = { lat: 0, lng: 0 };
                markerTemp.lat = point.lat;
                markerTemp.lng = point.lng;
                _this.markersArray.push(markerTemp);
                // marker = new google.maps.Marker({
                // position: markerTemp,
                //    map: this.googleMap,
                // icon: 'http://maps.google.com/mapfiles/kml/pal4/icon49.png'
                // });
            });
            _this.markersArray.push(end_markerTemp);
            _this.drawPath();
            _this.markersArray = [];
        });
        this.getNodes();
    };
    // showArrayMarkers() {
    //   if (this.showArray === false) {
    //     this.showArray = true;
    //   }
    //   if (this.showArray === true) {
    //     console.log(this.markersArray);
    //   }
    // }
    GoogleMapComponent.prototype.addBicycleLayer = function () {
        this.bikeLayer.setMap(this.googleMap);
    };
    GoogleMapComponent.prototype.removeBicycleLayer = function () {
        this.bikeLayer.setMap(null);
    };
    GoogleMapComponent.prototype.setMapType = function (mapTypeId) {
        this.googleMap.setMapTypeId(mapTypeId);
    };
    GoogleMapComponent.prototype.setCenter = function (e) {
        e.preventDefault();
        this.googleMap.setCenter(new google.maps.LatLng(this.latitude, this.longitute));
    };
    GoogleMapComponent.prototype.showArrayMarkers = function () {
        this.pressedNodes.forEach(function (element) {
            console.log(element);
        });
    };
    GoogleMapComponent.prototype.doDijkstraOnList = function () {
        var _this = this;
        this.showArrayMarkers();
        console.log(this.pressedNodes);
        this.segmentService.dijkstraOnList(this.pressedNodes)
            .subscribe(function (markers) {
            _this.markers = markers;
            console.table(_this.markers);
            _this.getShortestPath(_this.markers);
        });
        console.log('tutaj wywolujemy request z naszymi klikenitymi id');
        console.log('teraz czyscimy tablice aby nie bylo juz zapamietanych kliknietych ' +
            'skoro dijkstra ywkonana (robimy miejsce na nowe)');
        this.markers = [];
        this.pressedNodes = [];
        console.log('klikniete punkty to: ');
        this.showArrayMarkers();
    };
    GoogleMapComponent.prototype.doBellmanOnList = function () {
        var _this = this;
        this.showArrayMarkers();
        console.log(this.pressedNodes);
        this.segmentService.BellmanOnList(this.pressedNodes)
            .subscribe(function (markers) {
            _this.markers = markers;
            console.table(_this.markers);
            _this.getShortestPath(_this.markers);
        });
        console.log('tutaj wywolujemy request z naszymi klikenitymi id');
        console.log('teraz czyscimy tablice aby nie bylo juz zapamietanych kliknietych ' +
            'skoro dijkstra ywkonana (robimy miejsce na nowe)');
        this.markers = [];
        this.pressedNodes = [];
        console.log('klikniete punkty to: ');
        this.showArrayMarkers();
    };
    GoogleMapComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-google-map',
            template: __webpack_require__("../../../../../src/app/google-map/google-map.component.html"),
            styles: [__webpack_require__("../../../../../src/app/google-map/google-map.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__segment_segment_service__["a" /* SegmentService */],
            __WEBPACK_IMPORTED_MODULE_2__segment_segment_component__["a" /* SegmentComponent */]])
    ], GoogleMapComponent);
    return GoogleMapComponent;
}());



/***/ }),

/***/ "../../../../../src/app/google-map/google-map.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var GoogleMapService = (function () {
    function GoogleMapService(http) {
        this.http = http;
    }
    GoogleMapService.prototype.log = function (message) {
        console.log(message);
    };
    GoogleMapService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.error(error);
            _this.log(operation + " failed: " + error.message);
            return Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["a" /* of */])(result);
        };
    };
    GoogleMapService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], GoogleMapService);
    return GoogleMapService;
}());



/***/ }),

/***/ "../../../../../src/app/point/point.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/point/point.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  point works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/point/point.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PointComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PointComponent = (function () {
    function PointComponent() {
    }
    PointComponent.prototype.ngOnInit = function () {
    };
    PointComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-point',
            template: __webpack_require__("../../../../../src/app/point/point.component.html"),
            styles: [__webpack_require__("../../../../../src/app/point/point.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PointComponent);
    return PointComponent;
}());



/***/ }),

/***/ "../../../../../src/app/point/point.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PointService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PointService = (function () {
    function PointService() {
    }
    PointService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], PointService);
    return PointService;
}());



/***/ }),

/***/ "../../../../../src/app/segment/segment.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/segment/segment.component.html":
/***/ (function(module, exports) {

module.exports = "\n<button mat-raised-button color=\"primary\" (click)=\"showTest()\">Pokaz sciezki</button>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/segment/segment.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SegmentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__segment_service__ = __webpack_require__("../../../../../src/app/segment/segment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SegmentComponent = (function () {
    function SegmentComponent(segmentService, route) {
        this.segmentService = segmentService;
        this.route = route;
    }
    SegmentComponent.prototype.ngOnInit = function () {
        this.segmentsWithPoints = this.getAllSegmentsWithPoints();
    };
    SegmentComponent.prototype.getSegments = function () {
        var _this = this;
        this.segmentService.getAllSegments()
            .subscribe(function (segments) {
            _this.segments = segments;
            console.log('przed tabela');
            console.table(_this.segments);
            console.log('po tabeli');
        }, function (error) {
            console.log(error);
        });
    };
    SegmentComponent.prototype.getAllSegmentsWithPoints = function () {
        var _this = this;
        this.segmentService.getAllSegmentsWithPoints()
            .subscribe(function (segmentsWithPoints) {
            _this.segmentsWithPoints = segmentsWithPoints;
            console.log('getAllSegmentsWithPoints(segementsComponent) works!');
            console.table(_this.segmentsWithPoints);
        }, function (error) {
            console.log(error);
        });
        return this.segmentsWithPoints;
    };
    SegmentComponent.prototype.getShortestPath = function () {
        var _this = this;
        var startId = +this.route.snapshot.paramMap.get('startID');
        var endID = +this.route.snapshot.paramMap.get('endID');
        this.segmentService.shortestDijkstraPath(startId, endID)
            .subscribe(function (segmentsWithPoints) {
            _this.segmentsWithPoints = segmentsWithPoints;
            console.log('getAllSegmentsWithPoints(segementsComponent) works!');
            console.table(_this.segmentsWithPoints);
        }, function (error) {
            console.log(error);
        });
        return this.segmentsWithPoints;
    };
    SegmentComponent.prototype.showTest = function () {
        console.log(this.segmentsWithPoints);
    };
    SegmentComponent.prototype.getAllPointsForSegment = function () {
        var _this = this;
        this.segmentService.getAllPointsForSegment(this.segmentId)
            .subscribe(function (segments) {
            _this.segments = segments;
            console.log('przed tabela');
            console.table(_this.segments);
            console.log('po tabeli');
        }, function (error) {
            console.log(error);
        });
    };
    SegmentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-segment',
            template: __webpack_require__("../../../../../src/app/segment/segment.component.html"),
            styles: [__webpack_require__("../../../../../src/app/segment/segment.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__segment_service__["a" /* SegmentService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]])
    ], SegmentComponent);
    return SegmentComponent;
}());



/***/ }),

/***/ "../../../../../src/app/segment/segment.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SegmentService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SegmentService = (function () {
    function SegmentService(http) {
        this.http = http;
        this.SEGMENTS_API_URL = 'http://10.18.3.164:9090/segments';
        this.SEGMENTSALL_API_URL = 'http://10.18.3.164:9090/segments/all';
        this.DIJKSTRA = 'http://10.18.3.164:9090/graph/dijkstra/';
        this.NODES_API_URL = 'http://10.18.3.164:9090/graph/nodes';
        this.DIJKSTRALIST_API_URL = 'http://10.18.3.164:9090/graph/dijkstra';
        this.BELLMAN_API_URL = 'http://10.18.3.164:9090/graph/bellman';
    }
    SegmentService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.error(error);
            _this.log(operation + " failed: " + error);
            return Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["a" /* of */])(result);
        };
    };
    SegmentService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    SegmentService.prototype.log = function (message) {
        console.log(message);
    };
    SegmentService.prototype.shortestDijkstraPath = function (startID, endID) {
        var _this = this;
        return this.http.get(this.DIJKSTRA + ("/" + startID + "/" + endID))
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["b" /* tap */])(function (segments) { return _this.log("fetched shortest Dijkstra Path"); }), Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["a" /* catchError */])(this.handleError('SegmentPointSet', [])));
    };
    SegmentService.prototype.getAllSegments = function () {
        var _this = this;
        return this.http.get(this.SEGMENTS_API_URL)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["b" /* tap */])(function (segments) { return _this.log("fetched segments"); }), Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["a" /* catchError */])(this.handleError('getAllSegments', [])));
    };
    SegmentService.prototype.getAllPointsForSegment = function (id) {
        var _this = this;
        return this.http.get(this.SEGMENTS_API_URL + ("/" + id))
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["b" /* tap */])(function (segments) { return _this.log("fetched points for current segment"); }), Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["a" /* catchError */])(this.handleError('getAllPointsForSegment', [])));
    };
    SegmentService.prototype.getAllSegmentsWithPoints = function () {
        var _this = this;
        return this.http.get(this.SEGMENTSALL_API_URL)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["b" /* tap */])(function (segments) { return _this.log("fetched all segments with all points"); }), Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["a" /* catchError */])(this.handleError('getallSegmentsWithPoints', [])));
    };
    SegmentService.prototype.getAllNodes = function () {
        var _this = this;
        return this.http.get(this.NODES_API_URL)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["b" /* tap */])(function (segments) { return _this.log("fetched nodes"); }), Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["a" /* catchError */])(this.handleError('getAllNodes', [])));
    };
    SegmentService.prototype.dijkstraOnList = function (markers) {
        return this.http.post(this.DIJKSTRALIST_API_URL, markers)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["a" /* catchError */])(this.handleError('addHero', markers)));
    };
    SegmentService.prototype.BellmanOnList = function (markers) {
        return this.http.post(this.BELLMAN_API_URL, markers)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_operators__["a" /* catchError */])(this.handleError('addHero', markers)));
    };
    SegmentService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], SegmentService);
    return SegmentService;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");





if (__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map