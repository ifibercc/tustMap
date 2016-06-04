// default options and data
var mapOptions = {
    id: 'allmap',
    center: [117.278097,39.077101],
    zoom: 15
};
var markerOptions = {
    _click: _Event
};
var polylineOptions = {
    _click: _Event,
    extData: '12345'
};
var polylineData = [
    [117.378097,39.177101],
    [117.478097,39.377101],
    [117.528097,39.447101],
    [117.658097,39.657101]
];
var polygonData = [
    [117.378097,39.177101],
    [117.998097,39.997101],
    [117.528097,39.447101],
    [117.658097,39.657101]
];
var drawMarkerOptions = {
    _draw: _Event
};
var editPolylineOptions = {
    _save: _Event,
    _reset: _Reset
};
// create a bmap object
var myMap = new tustMap(mapOptions);
myMap.setMarker([117.278097,39.077101], markerOptions);
myMap.setPolyline(polylineData, polylineOptions);
myMap.setPolygon(polygonData, markerOptions);
// myMap.drawMarker(drawMarkerOptions);
myMap.editPolyline('12345', editPolylineOptions);
myMap.currentMap.setFitView();
//myMap.drawPolyline(drawMarkerOptions);
// myMap.drawPolygon(drawMarkerOptions);


function _Event(e){
    var tempData = myMap.findOverlays('12345');
    console.info(tempData);
}

function _Reset(e){
    myMap.clearMap();
    // myMap.destroyMap();
    // myMap = new tustMap(mapOptions);
    // myMap.setMarker([117.278097,39.077101], markerOptions);
    myMap.setPolyline(polylineData, polylineOptions);
    // myMap.setPolygon(polygonData, markerOptions);
    // // myMap.drawMarker(drawMarkerOptions);
    // myMap.editPolyline('12345', editPolylineOptions);
    // myMap.currentMap.setFitView();
}
