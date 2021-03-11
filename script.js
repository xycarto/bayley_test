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

var settingsPane = {
  tms: true,
  maxZoom: 11,
  continuousWorld: true,
  pane: 'labels',
  attribution:
    '<a href="http://www.linz.govt.nz">Sourced from LINZ. CC-BY 4.0</a>' //Simple attribution for linz
};

//set map and projection
var map = new L.map('map', {
  crs: crs,
  continuousWorld: true,
  worldCopyJump: false,
  zoomControl: false
});


//geoJSON

var territoryBaseStyle = {
    fillColor: "#d28164",
    //stroke: 6.0,
    weight: 0.75,
    //border: "2px dashed black",
    opacity: 1,
    color: '#d28164',
    fillOpacity: 0.4
  }

  var territoryTwoBaseStyle = {
    fillColor: "#e9b676",
    //stroke: 6.0,
    weight: 0.75,
    //border: "2px dashed black",
    opacity: 1,
    color: '#e9b676',
    fillOpacity: 0.4
  }

  var ruralBaseStyle = {
    fillColor: "#845a76",
    //stroke: 6.0,
    weight: 0.75,
    //border: "2px dashed black",
    opacity: 1,
    color: '#d845a76',
    fillOpacity: 0.4
  }

  var openBaseStyle = {
    fillColor: "#306a76",
    //stroke: 6.0,
    weight: 0.75,
    //border: "2px dashed black",
    opacity: 1,
    color: '#306a76',
    fillOpacity: 0.4
  }

  var rolloverPoly = {
    fillColor: "yellow",
    color: 'white',
    fillOpacity: 0.7
  }


var urlCoromandel = 'https://xycarto.github.io/bayley_test/geoJSON/coromandel.geojson';

var urlQueenstown = 'https://xycarto.github.io/bayley_test/geoJSON/queenstown.geojson';

var urlQueenstownRural = 'https://xycarto.github.io/bayley_test/geoJSON/queenstown_rural.geojson';

var urlSouthland = 'https://xycarto.github.io/bayley_test/geoJSON/southland.geojson';

var urlGore = 'https://xycarto.github.io/bayley_test/geoJSON/gore.geojson';

var urlSouthlandOpen = 'https://xycarto.github.io/bayley_test/geoJSON/southland_open.geojson';

//set
var topoMap = new L.TileLayer(topoMap_urlTemplate, settings);

var topoMapLabel = new L.TileLayer(topoMapLabel_urlTemplate, settingsPane);

var basemap = {
    "Base Map": topoMap,
};

var labels = {
    "Topo Label": topoMapLabel,
};

var settingsControl = {
    collapsed: true
};


//build map
map.addLayer(topoMap);
map.createPane('labels');
map.getPane('labels').style.zIndex = 650;

//set opening view
map.setView([-46.4, 168.35], 6);

var overlayControl = L.control.layers(basemap, null, null).addTo(map);
//var overlayControl = L.control.layers(basemap, labels, settingsControl).addTo(map);
//overlayControl.addTo(map);

var foo = '<span><span class="legend-at"></span>Labels</span>'
overlayControl.addOverlay(topoMapLabel, foo, settingsControl); 

// loading GeoJSON file
function getLoadJSON () {
  /*$.getJSON(urlCoromandel, function(data){
  var overLay = L.Proj.geoJson(data,
    {
      style: territoryBaseStyle,
      onEachFeature: function (feature, layer) {
        layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'center'});
        var center = layer.getBounds().getCenter();
        //var marker = new L.marker(center, { opacity: 0.01 }); //opacity may be set to zero
        //marker.bindTooltip("My Label", {permanent: true, className: "my-label", offset: [0, 0] });
      }
    });
    overlayControl.addOverlay(overLay, "Coromandel", settingsControl)
  });*/

  /*$.getJSON(urlQueenstown, function(data){
    var overLay = L.Proj.geoJson(data,
      {
        style: territoryBaseStyle,
        onEachFeature: function (feature, layer) {
          layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'center'});
          var center = layer.getBounds().getCenter();
          //var marker = new L.marker(center, { opacity: 0.01 }); //opacity may be set to zero
          //marker.bindTooltip("My Label", {permanent: true, className: "my-label", offset: [0, 0] });
        }
      });
      overlayControl.addOverlay(overLay, "Queenstown", settingsControl)
    });*/

    /*$.getJSON(urlQueenstownRural, function(data){
      var overLay = L.Proj.geoJson(data,
        {
          style: ruralBaseStyle,
          onEachFeature: function (feature, layer) {
            layer.bindTooltip(feature.properties.name + " Rural", {permanent: true, direction: 'center'});
            var center = layer.getBounds().getCenter();
            //var marker = new L.marker(center, { opacity: 0.01 }); //opacity may be set to zero
            //marker.bindTooltip("My Label", {permanent: true, className: "my-label", offset: [0, 0] });
          }
        });
        overlayControl.addOverlay(overLay, "Queenstown Rural", settingsControl)
      });*/

      $.getJSON(urlSouthland, function(data){
        var overLay = L.Proj.geoJson(data,
          {
            style: territoryBaseStyle,
            onEachFeature: function (feature, layer) {
              layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'center'});
              var center = layer.getBounds().getCenter();
              //var marker = new L.marker(center, { opacity: 0.01 }); //opacity may be set to zero
              //marker.bindTooltip("My Label", {permanent: true, className: "my-label", offset: [0, 0] });
            }
          });
          overlayControl.addOverlay(overLay, "Southland", settingsControl)

          overLay.on('click', function(e){
          var name = '<div class="popUpText">Name: ' + e.layer.feature.properties.name + '</div>';
          var territoryAdmin = '<div class="popUpText">Territory Admin: ' + e.layer.feature.properties.territoryAdmin + '</div>';
          var details = '<div class="popUpText">Details: ' + e.layer.feature.properties.details + '</div>';
          var area = '<div class="popUpText">Area: ' + e.layer.feature.properties.area + '</div>';
          L.popup()
            .setContent('<div class="popupWrapper">'+name + territoryAdmin + details + area +'</div>')
            .setLatLng(e.latlng)
            .openOn(map);
          });
          


          overLay.on('mouseover', function(e){
            e.layer.setStyle(rolloverPoly)
          })
          overLay.on('mouseout', function(e){
            e.layer.setStyle(territoryBaseStyle)
          })
        });

        /*$.getJSON(urlGore, function(data){
          var overLay = L.Proj.geoJson(data,
            {
              style: territoryTwoBaseStyle,
              onEachFeature: function (feature, layer) {
                layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'center'});
                var center = layer.getBounds().getCenter();
                //var marker = new L.marker(center, { opacity: 0.01 }); //opacity may be set to zero
                //marker.bindTooltip("My Label", {permanent: true, className: "my-label", offset: [0, 0] });
              }
            });
            overlayControl.addOverlay(overLay, "Gore", settingsControl)
          });*/

          $.getJSON(urlSouthlandOpen, function(data){
            var overLay = L.Proj.geoJson(data,
              {
                style: openBaseStyle,
                onEachFeature: function (feature, layer) {
                  layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'center'});
                  var center = layer.getBounds().getCenter();
                  //var marker = new L.marker(center, { opacity: 0.01 }); //opacity may be set to zero
                  //marker.bindTooltip("My Label", {permanent: true, className: "my-label", offset: [0, 0] });
                }
              });
              overlayControl.addOverlay(overLay, "Open Territory", settingsControl)

              overLay.on('click', function(e){
                var name = '<div class="popUpText">Name: ' + e.layer.feature.properties.name + '</div>';
                var territoryAdmin = '<div class="popUpText">Territory Admin: ' + e.layer.feature.properties.territoryAdmin + '</div>';
                var details = '<div class="popUpText">Details: ' + e.layer.feature.properties.details + '</div>';
                var area = '<div class="popUpText">Area: ' + e.layer.feature.properties.area + '</div>';
                L.popup()
                  .setContent('<div class="popupWrapper">'+ name + territoryAdmin + details + area +'</div>')
                  .setLatLng(e.latlng)
                  .openOn(map);
                });
                
      
      
                overLay.on('mouseover', function(e){
                  e.layer.setStyle(rolloverPoly)
                })
                overLay.on('mouseout', function(e){
                  e.layer.setStyle(openBaseStyle)
                })
            });


            
}

getLoadJSON();

