$(function() {
    "use strict";
    var settings_list = [{
            name: 'Sälen',
            extent: [0, 0, 50176, 30208],
            layers: [{
                name: 'Sälen 1956',
                url: 'salen_1956/{z}/{x}/{-y}.jpg'
            }, {
                name: 'Sälen 2011',
                url: 'salen_2011/{z}/{x}/{-y}.jpg'
            }
            // ,{
            //     name: 'Karta',
            //     url: 'tkarta/{z}/{x}/{-y}.jpg'
            // }
            ]
        }],
        settings = settings_list[0],
        pixelProj = new ol.proj.Projection({
            code: 'pixel',
            units: 'pixels',
            extent: settings.extent
        }),

        layers = [];

    for (var i = 0; i < settings.layers.length; i += 1) {
        layers.push(
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: settings.layers[i].url,
                    wrapX: false,
                    projection: pixelProj
                })
            })
        );
    }
    var view = new ol.View({
            center: [25088, -15104],
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
            controls: []
        }),
        swipe = document.getElementById('swipe');

    map.addControl(new ol.control.ZoomSlider());
    map.addControl(new ol.control.ZoomToExtent());

    layer_b.on('precompose', function(event) {
        var ctx = event.context;
        var width = ctx.canvas.width * (swipe.value / 100);

        ctx.save();
        ctx.beginPath();
        ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height);
        ctx.clip();
    });

    layer_b.on('postcompose', function(event) {
        var ctx = event.context;
        ctx.restore();
    });

    swipe.addEventListener('input', function() {
        map.render();
    }, false);
});
