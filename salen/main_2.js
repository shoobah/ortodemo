$(function() {
    "use strict";
    proj4.defs('EPSG:3006', '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
    var pixelProj = new ol.proj.Projection({
            code: 'pixel',
            units: 'pixels',
            extent: [0, 0, 50432, 30208]
        }),
        // projection = ol.proj.get('EPSG:3006'),
        // mapBounds = [385000.0, 6775000.0, 410000.0, 6790000.0],
        // mapBounds2 = [385000.0, 6775000.0, 410000.0, 6790000.0],
        // resolutions = [128, 64, 32, 16, 8, 4, 2, 1, 0.5],
        // oldLayer = new ol.layer.Tile({
        //     source: new ol.source.TileJSON({
        //         url: 'salen1956.jsonp'
        //     })
        // }),
        layer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'salen_1956/{z}/{x}/{y}.jpg',
                wrapX: false,
                projection: pixelProj
            })
        }),
        // debugLayer = new ol.layer.Tile({
        //     source: new ol.source.TileDebug({
        //         wrapX: false,
        //         projection: pixelProj,
        //         tileGrid: new ol.tilegrid.XYZ()
        //     })
        // }),
        view = new ol.View({
            center: [24960, 14976],
            extent: pixelProj.getExtent(),
            zoom: 3,
            minZoom: 0,
            maxZoom: 7,
            projection: pixelProj
        }),
        // overlayGetTile2URL = function(tileCoord) {
        //     if (!tileCoord) {
        //         return '';
        //     }
        //     var res = resolutions[view.getZoom()],
        //         left = tileCoord[0],
        //         maxLeft = mapBounds[0],
        //         bottom = tileCoord[1],
        //         maxBottom = mapBounds[1],
        //         x = Math.round((left - maxLeft) / (res * 256)),
        //         y = Math.round((bottom - maxBottom) / (res * 256)),
        //         z = view.getZoom();
        //     console.log('left:', left);
        //     console.log('maxLeft:', maxLeft);
        //     console.log('res:', res);
        //     if (x >= 0 && y >= 0) {
        //         return 'salen_1956/' + z + '/' + x + '/' + y + '.jpg';
        //     } else {
        //         return 'none.png';
        //     }
        // },
        oldMap = new ol.Map({
            layers: [layer],
            target: 'map',
            units: 'm',
            view: view
        });
    // view.on('change:center', function() {
    //     console.log('Center:', view.getCenter());
    //     console.log('Resolution:', view.getResolution());
    //     console.log('overlayGetTile2URL',overlayGetTile2URL(view,)
    // });
    // var loadTile = function(tileCoord, pixRatio, proj) {
    //     if (!tileCoord) {
    //         return '';
    //     }
    //     var calculatedUrl = overlayGetTile2URL(view.getCenter());
    //     console.log('pixRatio', pixRatio);
    //     console.log('calculatedUrl', calculatedUrl);
    //     console.log('calculatedUrl', calculatedUrl);
    //     return calculatedUrl;
    //     console.log('proj', proj);
    // };
    // layer.getSource().setTileUrlFunction(loadTile);
    // layer.on('precompose', function(evt) {
    //     console.log('frameState', evt.frameState.extent);
    //     var url=overlayGetTile2URL(evt.frameState);
    //     console.log('overlayGetTile2URL', url);
    //     layer.getSource().setUrl(url);
    // });
    console.log('keys', view.getKeys());
    console.log('projection', view.getProjection());

    var el = document.getElementById('s1');
    var s = new goog.ui.Slider();
    s.decorate(el);
    s.addEventListener(goog.ui.Component.EventType.CHANGE, function() {
        document.getElementById('out1').value = s.getValue();
    });
});
