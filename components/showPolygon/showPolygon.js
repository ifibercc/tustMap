// default options for map
var mapOptions = {
    id: 'allmap',
    center: [117.278097,39.077101],
    zoom: 15
};
// default options for polygon
var polygonOptions = {
    _click: _Event,
    extData: '12345'
};
// default data for polygon
var polygonData = [
    [117.378097,39.177101],
    [117.528097,39.447101],
    [118.998097,39.997101]
];

// create a bmap object
var myMap = new tustMap(mapOptions);
myMap.setPolygon(polygonData, polygonOptions);
myMap.currentMap.setFitView();

// click event func for polygon
function _Event(e){
    console.info(e);
}
