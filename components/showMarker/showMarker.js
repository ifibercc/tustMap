// default options and data
var options = {
    id: 'allmap',
    initLng: 117.278097,
    initLat: 39.077101,
    initZoom: 11
};
var data = [[117.278097,39.077101],[117.288097,39.087101]];
// create a bmap object
var myMap = new dwzMap(options);

var markerOptions = {
    icon: true,
    _click: _markerClick,
    _dragend: _markerDragend
};


myMap.appendOverlays([117.278097,39.077101], 'marker', markerOptions);

function _markerClick(e) {
    myMap.showMarkerTip([e.target.getPosition().lng, e.target.getPosition().lat], getInfoWindowHtml);
}

function _markerDragend(e) {
    console.info('拖动结束坐标为：' + e.target.getPosition().lng + ',' + e.target.getPosition().lat);
}

function getInfoWindowHtml(point) {
    return "<p style='font-size:20px;color:red'>拖动图标来改变经纬度</p><p style='font-size:14px;'>经度坐标：<span style='font-size:14px;color:#cc5522;'>" +
        point[0] + "</span></p><p style='font-size:14px;'>纬度坐标：<span style='font-size:14px;color:#cc5522;'>" +
        point[1] + "</span></p><p style='text-align:center;'></p>";
}
