$(function() {
    "use strict";
    var sälen = {
            title: 'Sälen',
                extent: [0, 0, 50176, 30208],
                layer1: {
                    path: 'salen/salen_1956/{z}/{x}/{-y}.jpg',
                    namne: 'Sälen 1956'
                },
                layer2: {
                    path: 'salen/salen_2011/{z}/{x}/{-y}.jpg',
                    namne: 'Sälen 2011'
                },
                layer3: {
                    path: 'salen/tkarta/{z}/{x}/{-y}.jpg',
                    namne: 'Sälen karta'
                }
        },
        åre = {
            title: 'Åre',
                extent: [0, 0, 39936, 39936],
                layer1: {
                    path: 'are/1965/{z}/{x}/{-y}.png',
                    namne: 'Åre 1965'
                },
                layer2: {
                    path: 'are/2013/{z}/{x}/{-y}.png',
                    namne: 'Åre 2013'
                },
                layer3: {
                    path: 'are/tkarta/{z}/{x}/{-y}.png',
                    namne: 'Åre karta'
                }
        },

        mapInfo=sälen,
        settings_list = [{
            name: mapInfo.title,
            extent: mapInfo.extent,
            layers: [{
                    name: mapInfo.layer1.name,
                    url: mapInfo.layer1.path
                }, {
                    name: mapInfo.layer2.name,
                    url: mapInfo.layer2.path
                }
                // ,{
                //     name: layer3.name,
                //     url: layer3.path
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
