var maps = (function() {
    var showMap = function(mapInfo) {
        var pixelProj = new ol.proj.Projection({
                code: 'pixel',
                units: 'pixels',
                extent: mapInfo.extent
            }),
            layers = [];

        for (var i = 0; i < mapInfo.layers.length; i += 1) {
            layers.push(
                new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        url: mapInfo.layers[i].url,
                        wrapX: false,
                        projection: pixelProj
                    })
                })
            );
        };
        console.log('layers', layers);
        var view = new ol.View({
                center: [mapInfo.extent[0] / 2, -mapInfo.extent[1] / 2],
                //extent: [-30000, -10000, 60000, 30000],
                zoom: 4,
                minZoom: 1,
                maxZoom: 8,
                projection: pixelProj
            }),
            layer_b = layers[2],

            map = new ol.Map({
                layers: layers,
                target: 'map',
                units: 'm',
                view: view,
                controls: ol.control.defaults({
                    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                        collapsible: false
                    })
                })
            }),
            swipe = document.getElementById('swipe');

        map.addControl(new ol.control.ZoomSlider());
        // map.addControl(new ol.control.ZoomToExtent());
        // map.addControl(new ol.control.ZoomSlider());

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
        $('#map').html('');
        showMap(event.data.info[event.data.key]);
    };

    return {
        show: showMap,
        init: function(data) {
            _.forOwn(data, function(num, key) {
                $("#selMap").append($("<option/>").attr("value", key).html(key)).on('change', {
                    info: data,
                    key: key
                }, mapChanged);
            });
        }
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
});
