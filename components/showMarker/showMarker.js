// default options for map
var mapOptions = {
    id: 'allmap',
    center: [117.278097,39.077101],
    zoom: 15
};
// default options for marker
var markerOptions = {
    title: '这是一个标记',
    _click: _Event
};
// create a amap object
var myMap = new tustMap(mapOptions);
// show a marker on map
myMap.setMarker([117.278097,39.077101], markerOptions);
// click event function
function _Event(e){
    console.info(e);
}

