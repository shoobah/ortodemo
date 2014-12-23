$(function() {
    "use strict";
    var pixelProj = new ol.proj.Projection({
            code: 'pixel',
            units: 'pixels',
            extent: [0, 0, 50176, 30208]
        }),

        layer1 = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'salen_1956/{z}/{x}/{-y}.jpg',
                wrapX: false,
                projection: pixelProj
            })
        }),
        layer2 = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'salen_2011/{z}/{x}/{-y}.jpg',
                wrapX: false,
                projection: pixelProj
            })
        }),
        view = new ol.View({
            center: [25088, 15104],
            // extent: pixelProj.getExtent(),
            zoom: 3,
            minZoom: 2,
            maxZoom: 8,
            projection: pixelProj
        }),

        map = new ol.Map({
            layers: [layer1, layer2],
            target: 'map',
            units: 'm',
            view: view
        });
});
