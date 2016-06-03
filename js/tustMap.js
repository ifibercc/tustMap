// create a map module
var tustMap = function (options) {
    var me = this;
    var mapId = options.id;
    options = $.extend({
        center: [116.39,39.9],
        zoom: 10
    }, options);
    me.options = options;
    if (!mapId) {
        console.warn('The map id not set!!');
        return;
    }
    if (!AMap) {
        console.warn('Gaode Map initialization may be has failed!!');
        return;
    }
    var map = new AMap.Map(mapId, options);
    me.currentMap = map;
};

// draw a marker
tustMap.prototype.setMarker = function(data, options) {
    var me = this;
    if (!data) {
        console.warn('The marker position not set!!');
        return;
    }
    options = $.extend({
        position: data,
        icon: null,
        title: '',
        exData: null,
        _click: null
    }, options);
    var marker = new AMap.Marker(options);
    if (options._click) {
        marker.on('click', options._click);
    }
    marker.setMap(me.currentMap);
    return marker;
};

// draw a polyline
tustMap.prototype.setPolyline = function(data, options) {
    var me = this;
    options = $.extend({
        path: data,
        strokeColor: '#3366FF',
        strokeOpacity: 1,
        strokeWeight: 5,
        strokeStyle: 'solid',
        strokeDasharray: [10, 5],
        exData: null,
        _click: null
    }, options);
    var polyline = new AMap.Polyline(options);
    if (options._click) {
        polyline.on('click', options._click);
    }
    polyline.setMap(me.currentMap);
    return polyline;
};

// draw a polygon
tustMap.prototype.setPolygon = function(data, options) {
    var me = this;
    options = $.extend({
        path: data,
        strokeColor: "#FF33FF",
        strokeOpacity: 0.2,
        strokeWeight: 3,
        fillColor: "#1791fc",
        fillOpacity: 0.35,
        exData: null,
        _click: null
    }, options);
    var polygon = new AMap.Polygon(options);
    if (options._click) {
        polygon.on('click', options._click);
    }
    polygon.setMap(me.currentMap);
    return polygon;
};

// draw a marker
tustMap.prototype.drawMarker = function(options) {
    var me = this;
    options = $.extend({
        icon: null,
        title: '',
        exData: null,
        _draw: null
    }, options);
    var mouseTool = new AMap.MouseTool(me.currentMap);
    mouseTool.marker(options);
    options._draw && AMap.event.addListener(mouseTool, 'draw', options._draw);
    options._draw && AMap.event.addListener(mouseTool, 'draw', function(){
        mouseTool.close(false);
        me.currentMap.setDefaultCursor();
    });
    me.currentMap.setDefaultCursor("crosshair");
};

// draw a polyline
tustMap.prototype.drawPolyline = function(options) {
    var me = this;
    options = $.extend({
        strokeColor: '#3366FF',
        strokeOpacity: 1,
        strokeWeight: 5,
        strokeStyle: 'solid',
        strokeDasharray: [10, 5],
        exData: null,
        _draw: null
    }, options);
    var mouseTool = new AMap.MouseTool(me.currentMap);
    mouseTool.polyline(options);
    options._draw && AMap.event.addListener(mouseTool, 'draw', options._draw);
    options._draw && AMap.event.addListener(mouseTool, 'draw', function(){
        mouseTool.close(false);
        me.currentMap.setDefaultCursor();
    });
    me.currentMap.setDefaultCursor("crosshair");
};

// draw a polygon
tustMap.prototype.drawPolygon = function(options) {
    var me = this;
    options = $.extend({
        strokeColor: "#FF33FF",
        strokeOpacity: 0.2,
        strokeWeight: 3,
        fillColor: "#1791fc",
        fillOpacity: 0.35,
        exData: null,
        _draw: null
    }, options);
    var mouseTool = new AMap.MouseTool(me.currentMap);
    mouseTool.polygon(options);
    options._draw && AMap.event.addListener(mouseTool, 'draw', options._draw);
    options._draw && AMap.event.addListener(mouseTool, 'draw', function(){
        mouseTool.close(false);
        me.currentMap.setDefaultCursor();
    });
    me.currentMap.setDefaultCursor("crosshair");
};

tustMap.prototype.constructor = tustMap;
