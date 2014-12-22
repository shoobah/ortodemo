$(function() {
    "use strict";
    proj4.defs('EPSG:3006', '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
    var projection = ol.proj.get('EPSG:3006'),
        mapBounds = [385000.0, 6775000.0, 410000.0, 6790000.0],
        mapBounds2 = [385000.0, 6775000.0, 410000.0, 6790000.0],
        // oldLayer = new ol.layer.Tile({
        //     source: new ol.source.TileJSON({
        //         url: 'salen1956.jsonp'
        //     })
        // }),
        layer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'salen_1956/{z}/{x}/{y}.jpg'
            })
        }),
        view = new ol.View({
            center: [0, 0],
            zoom: 3,
            minZoom: 0,
            maxZoom: 7,
            projection: projection
        }),
        overlayGetTile2URL = function(state) {
            if(!state) {return 'nope'};
            console.log('state.extent',state.extent[0]);
            var res = view.getResolution(),
                left = state.extent[0],
                maxLeft = mapBounds[0],
                bottom = state.extent[1],
                maxBottom = mapBounds[1],
                x = Math.round((left - maxLeft) / (res * 256)),
                y = Math.round((bottom - maxBottom) / (res * 256)),
                z = view.getZoom();
                console.log('X:', x);
                console.log('Y:', y);
                console.log('Z:', z);
            if (x >= 0 && y >= 0) {
                return 'salen_2011/' + z + '/' + x + '/' + y + '.jpg';
            } else {
                return 'none.png';
            }
        },
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
    var loadTile = function(tileCoord,ratio,proj){
        var url ='salen_2011/' + tileCoord[0] + '/' + tileCoord[1] + '/' + tileCoord[2] + '.jpg';
        console.log('url', url);
        console.log('ratio', ratio);
        console.log('proj', proj);
        //WHAT TO DOOOOOO!
    };
    layer.getSource().setTileUrlFunction(loadTile);
    // layer.on('precompose', function(evt) {
    //     console.log('frameState', evt.frameState.extent);
    //     var url=overlayGetTile2URL(evt.frameState);
    //     console.log('overlayGetTile2URL', url);
    //     layer.getSource().setUrl(url);
    // });
    console.log('keys', view.getKeys());
    console.log('projection', view.getProjection());
});
