import _ from 'lodash';

import UTMLatLng from 'utm-latlng';

const utm = new UTMLatLng(); // Default Ellipsoid is 'WGS 84'
let easting= ""
let northing = ""



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

 

//utm latlon library conversion
console.log(utm.convertLatLngToUtm(splitlat, splitlon, 13));
easting = utm.convertLatLngToUtm(splitlat, splitlon, 13).Easting
northing = utm.convertLatLngToUtm(splitlat, splitlon, 13).Northing


function component() {
    const element = document.createElement('div');
  
    // Lodash, now imported by this script
    element.innerHTML = 'redirecting...'
    return element;
  }
  
  document.body.appendChild(component());

}
// Call the handleRoute and subsequently redirect to

Promise.resolve(handleRoute()).then(() => {
    window.location.replace(`https://skraafoto.dataforsyningen.dk/viewer.html?center=${easting}%2C${northing}%2C37.9&orientation=map`);
  });



/*
handleRoute();

 window.location.replace(`https://skraafoto.dataforsyningen.dk/viewer.html?center=${easting}%2C${northing}%2C37.9&orientation=map`)
*/