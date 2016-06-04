// default options for map
var mapOptions = {
    id: 'allmap',
    center: [117.278097,39.077101],
    zoom: 15
};
// default data for polygon
var polygonData = [
    [117.378097,39.177101],
    [117.528097,39.447101],
    [118.998097,39.997101]
];
// default options for polygon
var polygonOptions = {
    _click: _Event,
    extData: '12345'
};

// default options for editPolygon
var editPolygonOptions = {
    _save: _Event,
    _reset: _Event
};

// create a bmap object
var myMap = new tustMap(mapOptions);
myMap.setPolygon(polygonData, polygonOptions);
myMap.editPolygon('12345', editPolygonOptions);
myMap.currentMap.setFitView();

// click event func for save button
function _Event(e){
    var marker = myMap.findOverlays('12345');
    console.info(marker);
}
