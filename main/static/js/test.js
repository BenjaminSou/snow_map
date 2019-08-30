var mymap = L.map('mapid').setView([46.833, 2.333], 6);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'}).addTo(mymap);


var sunny = '/snow_map/main/static/img/sun.png'
var snowy = '/snow_map/main/static/img/snow.png'

var stateIcon = L.Icon.extend({
    options: {
        iconUrl:      sunny,
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -20], // point from which the popup should open relative to the iconAnchor
    }
});

var sunnyIcon = new stateIcon({iconUrl: sunny}),
    snowyIcon = new stateIcon({iconUrl: snowy});

var layerGroup = L.layerGroup().addTo(mymap);

function test(slider_value){
    layerGroup.clearLayers();
    var mylist = dblist[slider_value];
    console.log(mylist);
    for (i = 0; i < mylist.length; i++){
        var object_time = mylist[i][1];
        var object_location = mylist[i][2];
        var object_weather = mylist[i][3];
        var object_image = "<img width='250px' src='http://localhost:18942/storage/map_snow/" + object_time.substr(0, 10) + "/" +  mylist[i][4] + ".jpg'/>";
        var object_name= mylist[i][0];
        switch(object_weather){
            case 0:
                L.marker(object_location, {icon: snowyIcon}).addTo(layerGroup).bindPopup(object_image +  "<p style='text-align: center;'>" + object_name +
                    "</p><form style='text-align: center;'><select name='name' size='1' ><option>" + object_time + "</select></form>" + "</div>");
                break;
            case 1:
                L.marker(object_location, {icon: sunnyIcon}).addTo(layerGroup).bindPopup(object_image +  "<p style='text-align: center;'>" + object_name + "</p><p style='text-align: center;'>" + object_time + "</p>" + "</div>");
                break;
        }
    }
}
test(0);
