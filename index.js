// default options and data
var mapOptions = {
    id: 'allmap',
    center: [117.278097,39.077101],
    zoom: 15
};
var markerOptions = {
    _click: _Event
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
// create a bmap object
var myMap = new tustMap(mapOptions);
myMap.setMarker([117.278097,39.077101], markerOptions);
myMap.setPolyline(polylineData, markerOptions);
myMap.setPolygon(polygonData, markerOptions);
myMap.drawMarker(drawMarkerOptions);
//myMap.drawPolyline(drawMarkerOptions);
// myMap.drawPolygon(drawMarkerOptions);

function _Event(e){
    console.info(e);
}
