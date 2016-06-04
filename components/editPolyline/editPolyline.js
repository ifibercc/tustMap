// default options for map
var mapOptions = {
    id: 'allmap',
    center: [117.278097,39.077101],
    zoom: 15
};
// default data for polyline
var polylineData = [
    [117.378097,39.177101],
    [117.478097,39.377101],
    [117.528097,39.447101],
    [117.658097,39.657101]
];

// default options for polyline
var polylineOptions = {
    _click: _Event,
    extData: '12345'
};

// default options for editPolyline
var editPolylineOptions = {
    _save: _Event,
    _reset: _Event
};

// create a bmap object
var myMap = new tustMap(mapOptions);
myMap.setPolyline(polylineData, polylineOptions);
myMap.editPolyline('12345', editPolylineOptions);
myMap.currentMap.setFitView();

// click event func for save button
function _Event(e){
    var marker = myMap.findOverlays('12345');
    console.info(marker);
}
