import _ from 'lodash';
import { fromLatLon } from 'utm';

import UTMLatLng from 'utm-latlng';

const utm = new UTMLatLng(); // Default Ellipsoid is 'WGS 84'
let easting= ""
let northing = ""
let zoneNumber = ""
let zoneLetter = ""

/*

import proj4 from 'proj4';

proj4.defs("EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs");
proj4.defs("EPSG:32632", "+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs");
*/

  window.addEventListener('hashchange', handleRoute);

// Function to handle the route
function handleRoute() {
  // Get the current route from the URL hash
  const route = window.location.hash.substr(2);
  
  // use the route here
  console.log("route->", route);

    let splitlat = route.split("/")[0];
    let splitlon = route.split("/")[1];

  console.log("splitlat, splitlon ->", splitlat, splitlon )

  //first try utm function

  /*
    function latLonToUTM(lat, lon) {
    var utmCoordinates = fromLatLon(lat, lon);
    return {
        easting: utmCoordinates.easting,
        northing: utmCoordinates.northing,
        zone: utmCoordinates.zoneNum,
        hemisphere: utmCoordinates.hemisphere
    }
}

console.log(latLonToUTM(splitlat, splitlon))
let easting= latLonToUTM(splitlat, splitlon).easting
let northing=latLonToUTM(splitlat, splitlon).northing

console.log("easting ->", easting, "northing ->", northing )
/*
//second try utm function with proj4 library
/*

const utm = '+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs';

function latLonToUTM(lat, lon) {
    if (isFinite(lat) && isFinite(lon)) {
        var utmCoordinates = proj4("EPSG:4326", "EPSG:32632", [lon, lat]);
        return {
            easting: utmCoordinates[0],
            northing: utmCoordinates[1]
        }
    } else {
        console.log("Please provide valid latitude and longitude values");
    }
}
console.log(latLonToUTMp4(splitlat, splitlon))
*/


//THIRD TRY: utm latling
console.log(utm.convertLatLngToUtm(splitlat, splitlon, 13));
easting = utm.convertLatLngToUtm(splitlat, splitlon, 13).Easting
northing = utm.convertLatLngToUtm(splitlat, splitlon, 13).Northing
zoneNumber = utm.convertLatLngToUtm(splitlat, splitlon, 13).ZoneNumber
zoneLetter = utm.convertLatLngToUtm(splitlat, splitlon, 13).ZoneLetter
console.log("easting from var->", easting, "northing from var->", northing, "zonenumber from var >", zoneNumber, "zoneletter from var ->", zoneLetter )


function component() {
    const element = document.createElement('div');
  
    // Lodash, now imported by this script
    element.innerHTML = `Easting: ${easting} <br> Northing: ${northing} <br> Zone Letter: ${zoneLetter} <br> Zone Number: ${zoneNumber} <br>`
    return element;
  }
  
  document.body.appendChild(component());

}
// Call the handleRoute function initially to handle the initial route on page load

Promise.resolve(handleRoute()).then(() => {
    window.location.replace(`https://skraafoto.dataforsyningen.dk/viewer.html?center=${easting}%2C${northing}%2C37.9&orientation=map`);
  });



/*
handleRoute();

 window.location.replace(`https://skraafoto.dataforsyningen.dk/viewer.html?center=${easting}%2C${northing}%2C37.9&orientation=map`)
*/