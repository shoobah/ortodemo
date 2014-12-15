$(function () {
    var oldLayer = new ol.layer.Tile({
            source: new ol.source.TileJSON({
                url: 'salen1956.jsonp'
            })
        }),
        layer2 = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url:'salen_1956/{z}/{x}/{y}.jpg',
            })
        }),
        oldMap = new ol.Map({
            layers: [layer2],
            target: 'map',
            controls: ol.control.defaults({
                collapsible: false
            }),
            view: new ol.View({
                center: [0,0],
                zoom: 3,
                minZoom: 0,
                maxZoom: 7
            })
        });
    console.log('oldMap: ', oldMap); //DEBUG: Anders Sjöberg 2014-12-15 00:00
    var stuff=layer2.source_;
    console.log('stuff: ', stuff); //DEBUG: Anders Sjöberg 2014-12-15 00:00    
    oldMap.render();
});