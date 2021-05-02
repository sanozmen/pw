//basemaps are being defined below
const CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
});
const Esri_WorldImagery = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

//adding the basemaps to baselayers so that they can be shown in the layer control
let baseLayers = {
    "Dark": CartoDB_DarkMatter,
    "Satellite": Esri_WorldImagery
};

//initiating the map variable
const map = L.map('map', {

    layers: [CartoDB_DarkMatter]

});

//onEachFeature function to add popups
function onEachFeature(feature, layer) {

    let popupContent = "<h4> Area Code</h4>" + feature.properties.area;

    layer.bindPopup(popupContent);
}


//geojson data added to the layer below
let final_map_output = L.geoJson(finalOutput, {
    style: CustomStyle,
    onEachFeature: onEachFeature

}).addTo(map);
//getting the boundaries of the data to easily center the map
map.fitBounds(final_map_output.getBounds());


// Setting up a custom style for polygons
function CustomStyle(feature) {
    var colorToUse;
    var code = feature.properties.area;

    code === "AMS" ? colorToUse = "#ffff33" :
        code === "ROT" ? colorToUse = "#e41a1c" :
        colorToUse = "#fff";

    return {
        fillColor: colorToUse,
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
//adding the geojson layer to overlayelements so that it can be shown in the layer control
let overlayElements = {
    "Final GeoJSON": final_map_output
};

//the legend's position
let legend = L.control({
    position: 'bottomleft'
});
//creating the legend
legend.onAdd = function (map) {

    let div = L.DomUtil.create('div', 'info legend');

    div.innerHTML += "<h4>Legend</h4>";
    div.innerHTML += '<i style="background: #ffff33"></i>'+"AMS"+'<br>';
    div.innerHTML += '<i style="background: #e41a1c"></i>'+"ROT";
    return div;
};
//adding the legend to the map
legend.addTo(map);
//adding baselayers and overlayelements to the layer control and then to the map
L.control.layers(baseLayers, overlayElements).addTo(map);