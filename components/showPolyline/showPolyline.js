// default options and data
var options = {
    id: 'allmap',
    initLng: 117.278097,
    initLat: 39.077101,
    initZoom: 11
};
var lineData = [[117.278097,39.077101], [117.388097,39.187101], [117.488097,39.687101]];
// create a bmap object
var myMap = new dwzMap(options);

var polylineOptions = {
    strokeColor: 'red',
    strokeWeight: 3,
    strokeOpacity: 0.8,
    _dblclick: _polylineDblclick
};


myMap.appendOverlays(lineData, 'polyline', polylineOptions);

function _polylineClick(e) {
    // console.info(e);
}

function _polylineDblclick(e) {
    var me = this;
    // console.info(e);
    e.target.enableEditing();
    myMap.appendDIYControl(_saveEvent, _RemoveEvent);
    function _saveEvent() {
        me.disableEditing();
        var child = document.getElementsByClassName('dwzMapBtnSave')[0].parentNode;
        child.parentNode.removeChild(child);
        child = document.getElementsByClassName('dwzMapBtnSave')[0].parentNode;
        child.parentNode.removeChild(child);
        // child.parentNode.removeChild(child);
    }
    function _RemoveEvent() {
        me.getMap().clearOverlays(me);
    }
}