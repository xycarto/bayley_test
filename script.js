//set projection, resolution, and origin
var crs = new L.Proj.CRS(
  "EPSG:2193",
  "+proj=tmerc +lat_0=0 +lon_0=173 +k=0.9996 +x_0=1600000 +y_0=10000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
  {
    origin: [-1000000, 10000000],
    resolutions: [
      8960,
      4480,
      2240,
      1120,
      560,
      280,
      140,
      70,
      28,
      14,
      7,
      2.8,
      1.4,
      0.7,
      0.28,
      0.14,
      0.07
    ]
  }
);

//set basemap url
//var aerialElev_urlTemplate =
  //"https://s3-ap-southeast-2.amazonaws.com/basemaps.temp///nz_colour_basemap/NZTM/{z}/{x}/{y}.png";

var topoMap_urlTemplate =
  "https://tiles.maps.linz.io/nz_topo_basemap/NZTM/{z}/{x}/{y}.png";

var topoMapLabel_urlTemplate =
  "https://tiles.maps.linz.io/nz_topo_basemap_labels/NZTM/{z}/{x}/{y}.png";

//set additonal perimeters
var settings = {
  tms: true,
  maxZoom: 11,
  continuousWorld: true,
  attribution:
    '<a href="http://www.linz.govt.nz">Sourced from LINZ. CC-BY 4.0</a>' //Simple attribution for linz
};

//set map and projection
var map = new L.Map("map", {
  crs: crs,
  continuousWorld: true,
  worldCopyJump: false,
  zoomControl: false
});


//geoJSON
var coromandelBaseStyle = {
    fillColor: "#cc3366",
    weight: 0.5,
    opacity: 1,
    color: '#dddddd',
    fillOpacity: 0.7
  }

var urlCoromandel = 'https://xycarto.github.io/bayley_test/geoJSON/coromandel.geojson';

function createOverlayCoro(data, layerName, coromandelBaseStyle) {
    var overlayA = L.geoJson(data, coromandelBaseStyle,{
      onEachFeature: function (feature, layer) {
        return _layers._leaflet_id; 
      }
    });// Add the data to the map
    overlayControl.addOverlay(overlayA, layerName, settingsControl); // Add the layer to the Layer Control.

    var legenditemA = '<span><span class="legend-at"></span>Coromandel</span>'
    //Load Available Now JSON into map
    $.getJSON(urlCoromandel, function (data) { 
        createOverlayCoro(data, legenditemA, coromandelBaseStyle)
        })
  };

  var legenditemA = '<span><span class="legend-at"></span>Coromandel</span>'
  $.getJSON(urlCoromandel, function (data) { 
    createOverlayCoro(data, legenditemA, coromandelBaseStyle)
    });



//set
var topoMap = new L.TileLayer(topoMap_urlTemplate, settings);

var topoMapLabel = new L.TileLayer(topoMapLabel_urlTemplate, settings);

var basemap = {
    "Base Map": topoMap,
};

var labels = {
    "Topo Label": topoMapLabel,
};

var settingsControl = {
    collapsed: true
};

var overlayControl = L.control.layers(basemap, null, settingsControl).addTo(map)
overlayControl.addTo(map);

//build map
map.addLayer(topoMap);

//set opening view
map.setView([-41.29, 175.4], 6);

