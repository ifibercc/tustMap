// create a map instance
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
        return ;
    }
    if (!AMap) {
        console.warn('Gaode Map initialization may be has failed!!');
        return ;
    }
    var map = new AMap.Map(mapId, options);
    me.currentMap = map;
};

// draw a marker
tustMap.prototype.setMarker = function(data, options) {
    var me = this;
    if (!data) {
        console.warn('The marker position not set!!');
        return ;
    }
    options = $.extend({
        position: data,
        icon: null,
        title: '',
        extData: null,
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
        extData: null,
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
        extData: null,
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
        extData: null,
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
        extData: null,
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
        extData: null,
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

// edit a polyline
tustMap.prototype.editPolyline = function(id, options) {
    var me = this;
    var polylines = me.currentMap.getAllOverlays('polyline');
    if (polylines.length === 0) {
        console.warn('don\'t have any polyline!!');
        return ;
    }
    var polyline = polylines.filter(function(item) {
        return item.getExtData() === id;
    });
    if (polyline.length === 0) {
        console.warn('can\'t find the polyline!!');
        return ;
    }
    me.polyline = polyline[0];
    var polylineEditor = new AMap.PolyEditor(me.currentMap, polyline[0]);
    me.polyEditor = polylineEditor;
    polylineEditor.open();
    $('.amap-btn').show();
    var elBtnSave = document.getElementsByClassName('amap-btn-save')[0];
    var elBtnRemove = document.getElementsByClassName('amap-btn-remove')[0];
    var elBtnReset = document.getElementsByClassName('amap-btn-reset')[0];
    AMap.event.addDomListener(elBtnSave, 'click', options._save);
    AMap.event.addDomListener(elBtnSave, 'click', amapBtnSave);
    AMap.event.addDomListener(elBtnRemove, 'click', amapBtnRemove);
    AMap.event.addDomListener(elBtnReset, 'click', options._reset);
    // polyline[0].on('change', options._change);
    function amapBtnSave() {
        polylineEditor.close();
        $('.amap-btn').hide();
    }
    function amapBtnRemove() {
        polylineEditor.close();
        me.polyline.setMap();
    }
    return polyline[0];
};

// edit a polygon
tustMap.prototype.editPolygon = function(id, options) {
    var me = this;
    var polygons = me.currentMap.getAllOverlays('polygon');
    if (polygons.length === 0) {
        console.warn('don\'t have any polygon!!');
        return ;
    }
    var polygon = polygons.filter(function(item) {
        return item.getExtData() === id;
    });
    if (polygon.length === 0) {
        console.warn('can\'t find the polygon!!');
        return ;
    }
    me.polygon = polygon[0];
    var polygonEditor = new AMap.PolyEditor(me.currentMap, polygon[0]);
    polygonEditor.open();
    $('.amap-btn').show();
    var elBtnSave = document.getElementsByClassName('amap-btn-save')[0];
    var elBtnRemove = document.getElementsByClassName('amap-btn-remove')[0];
    AMap.event.addDomListener(elBtnSave, 'click', options._save);
    AMap.event.addDomListener(elBtnSave, 'click', amapBtnSave);
    AMap.event.addDomListener(elBtnRemove, 'click', amapBtnRemove);
    function amapBtnSave() {
        polygonEditor.close();
        $('.amap-btn').hide();
    }
    function amapBtnRemove() {
        polygonEditor.close();
        me.polygon.setMap();
    }
    return polygon[0];
};

// find overlays by id
tustMap.prototype.findOverlays = function(id) {
    var me = this;
    var overlayArr = me.currentMap.getAllOverlays();
    var overlays = overlayArr.filter(function(item) {
        return item.getExtData() === id;
    });
    if (overlays.length === 0) {
        console.warn('can\'t find any overlays');
        return [];
    }
    return overlays;
};

// clear overlays from map
tustMap.prototype.clearMap = function() {
    var me = this;
    me.polyEditor.close();
    me.currentMap.clearMap();
    return true;
};

// destory map instance
tustMap.prototype.destroyMap = function() {
    var me = this;
    me.currentMap.destroy();
    $('.amap-btn').hide();
    return true;
}
tustMap.prototype.constructor = tustMap;
