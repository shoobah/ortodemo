$(function() {
    proj4.defs('EPSG:3006', '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
    //var projection = proj4('EPSG:3006'); 
    var projection = ol.proj.get('EPSG:3006');
    //projection.setExtent([6775000, 385000, 6790000, 410000]);
    var oldLayer = new ol.layer.Tile({
            source: new ol.source.TileJSON({
                url: 'salen1956.jsonp'
            })
        }),
        layer2 = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'salen_1956/{z}/{x}/{y}.jpg',
            })
        }),
        oldMap = new ol.Map({
            layers: [layer2],
            target: 'map',
            units: 'm',
            view: new ol.View({
                // center: ol.proj.transform([0, 0], 'EPSG:4326', 'EPSG:3006'),
                center: [0, 0],
                zoom: 3,
                minZoom: 0,
                maxZoom: 7,
                projection: projection
            })
        });
    console.log('projection', projection);

    // console.log('oldMap: ', oldMap); //DEBUG: Anders Sjöberg 2014-12-15 00:00
    // var stuff=layer2.source_;
    // console.log('stuff: ', stuff); //DEBUG: Anders Sjöberg 2014-12-15 00:00    
    // oldMap.render();
});
