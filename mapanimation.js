// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];

var busLocations = new Array()
var markerLocations = new Array()

async function fetchBusLocations(){
    var location;
    const locations = await getBusLocations();
    console.log(new Date());

    for (let i=0; i < locations.length; i++){
      location = locations[i].attributes;
      if (busLocations[i] == null) 
        busLocations.push([location.longitude, location.latitude]);
      else 
        busLocations[i] = [location.longitude, location.latitude];
      if (markerLocations[i] == null) {
        var marker = new mapboxgl.Marker();
        markerLocations.push(marker);
        marker.setLngLat(busLocations[i])
          .addTo(map);
      }
      else {
        markerLocations[i].setLngLat(busLocations[i]);
      }
    }

    setTimeout(fetchBusLocations, 2000);
}

async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

mapboxgl.accessToken = 'pk.eyJ1Ijoibm1jMTMxMyIsImEiOiJjbDFtb2Q1amYwbWY1M2VyejR2eTNtdWNhIn0.FqrlAbiWjZKsopOXnfsU2Q';

// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
});

// add a marker to the map at the first coordinates in the array busStops. The marker variable should be named "marker"
// var marker = new mapboxgl.Marker()
//   .setLngLat([-71.093729, 42.359244])
//   .addTo(map);

// counter here represents the index of the current bus stop
// let counter = 0;
// function move() {
//   // move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
//   // Use counter to access bus stops in the array busStops
//   // Make sure you call move() after you increment the counter.
//   setTimeout(()=>{
//       if (counter >= busStops.length) return;
//       marker.setLngLat(busStops[counter]);
//       counter ++; 
//       move();
//     }, 1000)
// }

fetchBusLocations();
