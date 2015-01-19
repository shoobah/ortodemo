window.CLOSURE_NO_DEPS = true;
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.TileJSON');
goog.require('ol.source.XYZ');

var maps = (function() {
    var showMap = function(mapInfo) {
        var pixelProj = new ol.proj.Projection({
                code: 'pixel',
                units: 'pixels',
                extent: mapInfo.extent
            }),
            layers = [];

        for (var i = 0; i < 2; i += 1) {
            layers.push(
                new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        url: mapInfo.layers[i].url,
                        wrapX: false,
                        projection: pixelProj
                    }),
                    preload: 6,
                    title: mapInfo.layers[i].name
                })
            );
        };
        var debugLayer = new ol.layer.Tile({
            source: new ol.source.TileDebug({
                projection: pixelProj,
                wrapX: false
            })
        });
        console.log('layers', layers);
        var view = new ol.View({
                center: [mapInfo.extent[0] / 2, -mapInfo.extent[1] / 2],
                //extent: [-30000, -10000, 60000, 30000],
                zoom: 4,
                minZoom: 1,
                maxZoom: 8,
                projection: pixelProj
            }),
            layer_b = layers[1],

            map = new ol.Map({
                layers: layers,
                target: 'map',
                units: 'm',
                view: view,
                renderer: 'canvas',
                controls: [
                    new ol.control.Zoom()
                ]
            }),
            swipe = document.getElementById('swipe');

        map.addControl(new ol.control.ZoomToExtent());
        //map.addLayer(debugLayer);

        layer_b.on('precompose', function(event) {
            var context = event.context;
            var width = context.canvas.width * (swipe.value / 100);

            context.save();
            context.beginPath();
            context.rect(width, 0, context.canvas.width - width, context.canvas.height);
            context.clip();
        });

        layer_b.on('postcompose', function(event) {
            var context = event.context;
            context.restore();
        });

        swipe.addEventListener('input', function() {
            map.render();
        }, false);
    };

    var mapChanged = function(event) {
        console.log('event.data.key', event.data.key);
        event.preventDefault();
        $('#map').html('');
        $("#selLayer1").html('');
        $("#selLayer2").html('');
        var theMapInfo = event.data.info[event.data.key];
        showMap(theMapInfo);
        _.forEach(theMapInfo.layers, function(layerInfo) {
            $("#selLayer1").append($("<option/>").attr("value", layerInfo.name).html(layerInfo.name))
        });
        _.forEach(theMapInfo.layers, function(layerInfo) {
            $("#selLayer2").append($("<option/>").attr("value", layerInfo.name).html(layerInfo.name))
        });
    };

    var init = function(data) {
        _.forOwn(data, function(num, key) {
            var mapSelectItem = $("#selMap").append($("<option/>").attr("value", key).html(key));
            mapSelectItem.on('change', {
                info: data,
                key: key
            }, mapChanged);
        });
    };

    return {
        show: showMap,
        init: init
    }
}());

$(function() {
    "use strict";
    $.getJSON('settings.js', function(data) {
            maps.show(data.sälen);
            maps.init(data);
        })
        .fail(function(err) {
            console.log('FAIL!', err);
        })
        // $('#map').change();
});
