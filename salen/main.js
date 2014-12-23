$(function () {
    var map,
        map2,
        isok = false,
        inresize1 = false,
        inresize2 = false,
        mapDisplayLayout = true,
        mapBounds = new OpenLayers.Bounds(385000.0, 6775000.0, 410000.0, 6790000.0),
        mapBounds2 = new OpenLayers.Bounds(385000.0, 6775000.0, 410000.0, 6790000.0);

    // avoid pink tiles
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
    OpenLayers.Util.onImageLoadErrorColor = 'transparent';

    function init () {
        var myFunction = function () {
                if (isok && !inresize2) {
                    inresize1 = true;
                    var b = map.getExtent();
                    if (mapDisplayLayout) {
                        map2.zoomToExtent(map.getExtent().add(-b.getWidth(), 0), true);
                    } else {
                        map2.zoomToExtent(map.getExtent(), true);
                    }
                    inresize1 = false;
                }
            },
            myFunction2 = function () {
                if (isok && !inresize1) {
                    inresize2 = true;
                    var b = map2.getExtent();
                    if (mapDisplayLayout) {
                        map.zoomToExtent(map2.getExtent().add(b.getWidth(), 0), true);
                    } else {
                        map.zoomToExtent(map2.getExtent(), true);
                    }
                    inresize2 = false;
                }
            },
            options = {
                controls: [],
                maxExtent: new OpenLayers.Bounds(385000.0, 6775000.0, 410000.0, 6790000.0),
                maxResolution: 128.000000,
                numZoomLevels: 9,
                eventListeners: {
                    "move": myFunction
                }
            },
            options2 = {
                controls: [],
                maxExtent: new OpenLayers.Bounds(385000.0, 6775000.0, 410000.0, 6790000.0),
                maxResolution: 128.000000,
                numZoomLevels: 9,
                eventListeners: {
                    "move": myFunction2
                }
            },
            overlayGetTile1URL = function (bounds) {
                var res = this.map.getResolution(),
                    x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w)),
                    y = Math.round((bounds.bottom - this.maxExtent.bottom) / (res * this.tileSize.h)),
                    z = this.map.getZoom();
                if (x >= 0 && y >= 0) {
                    return this.url + 'salen_1956/' + z + '/' + x + '/' + y + '.' + this.type;
                } else {
                    return 'none.png';
                }
            },
            overlayGetTile2URL = function (bounds) {
                var res = this.map.getResolution(),
                    x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w)),
                    y = Math.round((bounds.bottom - this.maxExtent.bottom) / (res * this.tileSize.h)),
                    z = this.map.getZoom();
                    console.log('bounds.left',bounds.left);
                    console.log('this.maxExtent.left',this.maxExtent.left);
                    console.log('res',res);
                    console.log('this.tileSize.w',this.tileSize.w);
                if (x >= 0 && y >= 0) {
                    var url = this.url + 'salen_2011/' + z + '/' + x + '/' + y + '.' + this.type;
                    console.log('url', url);
                    return url;
                } else {
                    return 'none.png';
                }
            },
            overlayGetTile3URL = function (bounds) {
                var res = this.map.getResolution(),
                    x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w)),
                    y = Math.round((bounds.bottom - this.maxExtent.bottom) / (res * this.tileSize.h)),
                    z = this.map.getZoom();
                if (x >= 0 && y >= 0) {
                    return this.url + 'tkarta/' + z + '/' + x + '/' + y + '.' + this.type;
                } else {
                    return 'none.png';
                }
            },
            layer1 = new OpenLayers.Layer.TMS('Gamla flygbilder', '', {
                url: '',
                serviceVersion: '.',
                layername: '.',
                alpha: false,
                type: 'jpg',
                getURL: overlayGetTile1URL
            }),

            layer2 = new OpenLayers.Layer.TMS('Nya flygbilder', '', {
                url: '',
                serviceVersion: '.',
                layername: '.',
                alpha: false,
                type: 'jpg',
                getURL: overlayGetTile2URL
            }),

            layer3 = new OpenLayers.Layer.TMS('Karta', '', {
                url: '',
                serviceVersion: '.',
                layername: '.',
                alpha: false,
                type: 'jpg',
                getURL: overlayGetTile3URL
            }),
            layer1Clone = layer1.clone(),
            layer2Clone = layer2.clone(),
            layer3Clone = layer3.clone(),
            layerswitch1 = new OpenLayers.Control.LayerSwitcher(),
            layerswitch2 = new OpenLayers.Control.LayerSwitcher();

        $(document).ready(function () {
            $('.lmSelect').select2({
                minimumResultsForSearch: 10
            });
            $('#regionSelect').click(function () {
                document.location.href = '../' + $('#regionSelect').val() + '/index.html';
            });
            if (Modernizr.touch) {
                jQuery('head').append('<link href="../css/touch.css" rel="stylesheet" type="text/css" />');
            }
        });

        map = new OpenLayers.Map('map1', options);
        map2 = new OpenLayers.Map('map2', options2);

        map.addLayers([layer2, layer1Clone, layer3]);
        map.zoomToExtent(mapBounds, true);

        map2.addLayers([layer1, layer2Clone, layer3Clone]);
        map2.zoomToExtent(mapBounds2, true);

        map.addControl(layerswitch1);
        map.addControl(new OpenLayers.Control.Navigation({
            autoActivate: true,
            documentDrag: true
        }));
        layerswitch1.baseLbl.innerHTML = 'Alternativa vyer';

        map2.addControl(layerswitch2);
        map2.addControl(new OpenLayers.Control.Navigation({
            autoActivate: true,
            documentDrag: true
        }));
        layerswitch2.baseLbl.innerHTML = 'Alternativa vyer';
        layerswitch2.showControls(false);

        map2.addControl(new OpenLayers.Control.PanZoomBar());

        isok = true;
        map.setCenter(new OpenLayers.LonLat(402300, 6783000), 5, false, true);
    }

    init();
});
