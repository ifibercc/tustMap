// default options for map
var mapOptions = {
    id: 'allmap',
    center: [117.278097,39.077101],
    zoom: 15
};
// default options for marker
var markerOptions = {
    title: '这是一个标记',
    _click: _Event,
    _dragend: _Event,
    extData: '001'
};
// create a amap object
var myMap = new tustMap(mapOptions);
// show a marker on map
var marker = myMap.setMarker([117.278097,39.077101], markerOptions);

marker.setDraggable(true);
// click event function
function _Event(e){
    console.info(e);
    console.info(marker.getExtData());
}
