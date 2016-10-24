// create a map instance
var tustMap = function (options) {
    var me = this;
    var mapId = options.id;
    options = $.extend({
        center: [116.39, 39.9],
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

 

    // map.addControl(new AMap.Scale());
    map.addControl(new AMap.ToolBar());
    map.addControl(new AMap.OverView());
    me.currentMap = map;
  

};

tustMap.prototype.SetSataliteVisible = function (isvisible) {
    var me = this;
    var titleLayers = me.currentMap.getLayers();
    if (isvisible) {
        if (titleLayers.length = 3) {
            var satLayer = new AMap.TileLayer.Satellite();
            titleLayers.push(satLayer);
            me.currentMap.setLayers(titleLayers);
        }
        else {
            titleLayers[3].show();
        }
        //me.currentMap.TileLayer.Satellite.show();
    }
    else {
        titleLayers[3].hide();
    }
   
    return true;
}
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
    if (options._dblclick) {
        marker.on('dblclick', options._dblclick);
    }
    if (options._dragend) {
        marker.on('dragend', options._dragend);
        marker.setDraggable(true);

    }
    marker.setMap(me.currentMap);
    return marker;
};

// draw a polyline
tustMap.prototype.setPolyline = function(data, options) {
    var me = this;
    if (data === null || data.length === 0) {
        return;
    }
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
    if (options._dblclick) {
        polyline.on('dblclick', options._dblclick);
    }
    polyline.setMap(me.currentMap);
    return polyline;
};

// draw a polygon
tustMap.prototype.setPolygon = function (data, options) {
    var me = this;
    if (data === null || data.length === 0) {
        return;
    }
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
    if (options._dblclick) {
        polygon.on('dblclick', options._dblclick);
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
    AMap.event.addListener(mouseTool, 'draw', function(){
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

// edit a marker
tustMap.prototype.editMarker = function(id, options) {
    var me = this;
    var markers = me.currentMap.getAllOverlays('marker');
    if (markers.length === 0) {
        console.warn('don\'t have any marker!!');
        return ;
    }
    var marker = markers.filter(function(item) {
        return item.getExtData() === id;
    });
    if (marker.length === 0) {
        console.warn('can\'t find the marker!!');
        return ;
    }
    me.marker = marker[0];
    marker[0].setDraggable(true);
    $('.amap-btn').show();
    var elBtnSave = document.getElementsByClassName('amap-btn-save')[0];
    var elBtnRemove = document.getElementsByClassName('amap-btn-remove')[0];
    var elBtnReset = document.getElementsByClassName('amap-btn-reset')[0];
    AMap.event.addDomListener(elBtnSave, 'click', options._save);
    AMap.event.addDomListener(elBtnSave, 'click', amapBtnSave);
    AMap.event.addDomListener(elBtnRemove, 'click', options._remove);
    AMap.event.addDomListener(elBtnRemove, 'click', amapBtnRemove);
    AMap.event.addDomListener(elBtnReset, 'click', options._reset);
    function amapBtnSave() {
        marker[0].setDraggable(false);
        $('.amap-btn').hide();
    }
    function amapBtnRemove() {
        marker[0].setDraggable(false);
        me.marker.setMap();
        $('.amap-btn').hide();
    }
    return marker[0];
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
    AMap.event.addDomListener(elBtnRemove, 'click', options._remove);
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
        $('.amap-btn').hide();
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
    AMap.event.addDomListener(elBtnRemove, 'click', options._remove);
    AMap.event.addDomListener(elBtnRemove, 'click', amapBtnRemove);
    function amapBtnSave() {
        polygonEditor.close();
        $('.amap-btn').hide();
    }
    function amapBtnRemove() {
        polygonEditor.close();
        me.polygon.setMap();
        $('.amap-btn').hide();
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
tustMap.prototype.destroyMap = function () {
    var me = this;
    me.currentMap.destroy();
    $('.amap-btn').hide();
    return true;
};

tustMap.prototype.OpenInfoWindow = function (info, Lng, Lat) {
    var me = this;
    infoWindow = new AMap.InfoWindow({
        //content: info.join("<br/>")
       // isCustom: true,  //使用自定义窗体
        content: info.join("<br/>"),
        offset: new AMap.Pixel(10, -25)
        //content: createInfoWindow(title, content.join("<br/>")),
    });
    infoWindow.open(me.currentMap, new AMap.LngLat(Lng, Lat));
    return true;
};
tustMap.prototype.constructor = tustMap;

tustMap.testLnglat = function (arr, type) {
    if (type === 'path') {
        return arr.every(function (item) {
            return tester(item)
        });
    } else {
        return tester(arr);
    }
    function tester(arr) {
        if (arr.length !== 2) {
            return false;
        }
        if (typeof arr[0] !== 'number' && typeof arr[0] !== 'string') {
            return false;
        }
        if (typeof arr[1] !== 'number' && typeof arr[1] !== 'string') {
            return false;
        }
        if (!/^[\-\+]?(0?\d{1,2}\.\d{1,5}|1[0-7]?\d{1}\.\d{1,8}|180\.0{1,8})$/.test(String(arr[0]))) {
            return false;
        }
        if (!/^[\-\+]?([0-8]?\d{1}\.\d{1,8}|90\.0{1,8})$/.test(String(arr[1]))) {
            return false;
        }
        return true;
    }
};

tustMap.filterLnglat = function (arr) {
    var newArr = [];
    arr.forEach(function (item) {
        if (tustMap.testLnglat(item)) {
            newArr.push(item);
        }
    });
    return newArr;
}