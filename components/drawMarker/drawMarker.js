// default options for map
var mapOptions = {
    id: 'allmap',
    center: [117.278097,39.077101],
    zoom: 15
};
// default options for draw
var options = {
    _draw: _Event
};
// create a bmap object
var myMap = new tustMap(mapOptions);
myMap.drawMarker(options);


// click event func for polygon
function _Event(e){
    console.info(e);
}
