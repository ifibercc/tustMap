// default options for map
var mapOptions = {
    id: 'allmap',
    center: [117.278097,39.077101],
    zoom: 15
};
// default options for marker
var markerOptions = {
    extData: '1314'
};

var editMarkerOptions = {
    _save: _Event,
    _reset: _Event
};
// create a bmap object
var myMap = new tustMap(mapOptions);
myMap.setMarker([117.278097,39.077101], markerOptions);
myMap.editMarker('1314', editMarkerOptions);


// click event func for save button
function _Event(e){
    var marker = myMap.findOverlays('1314');
    console.info(marker);
}
