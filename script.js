var map = L.map('map').setView([37.7, -122.4], 10);

var Stamen_Terrain = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
}).addTo(map);

$.getJSON("https://raw.githubusercontent.com/gbrunner/adv-python-for-gis-and-rs/master/Week%201/sf_crime.geojson",function(data){
    var crime_icon = L.icon({
      iconUrl: 'https://effect.org/wp-content/uploads/2016/01/crime-icon.png',
      iconSize: [60,50]
    });
    var crime = L.geoJson(data,{
      pointToLayer: function(feature,latlng){
        var marker = L.marker(latlng,{icon: crime_icon});
        marker.bindPopup(feature.properties.Location + '<br/>' + feature.properties.OPEN_DT);
        return marker;
      }
    });
    var clusters = L.markerClusterGroup();
    clusters.addLayer(crime);
    map.addLayer(clusters);
});
