
let map;
let position; 

async function initMap() {

  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const { Geocoder} = await google.maps.importLibrary("geocoding")

  geocoder = new Geocoder(); 

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 17,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Hier ben je!",
  });
}

function getLocation(){
  if (navigator.geolocation){
    navigator.geolocation.watchPosition(showPosition); 
  }
  else{
    position = { lat: 50.0, lng: 4.0 }; 
    initMap();
  }
}

function showPosition(pos){
  position = {lat: pos.coords.latitude, lng: pos.coords.longitude}; 
  initMap();
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
} 

getLocation(); 


function showInputFieldsC(){
    document.getElementById('lat').style.visibility = 'visible';
    document.getElementById('lng').style.visibility = 'visible';
    document.getElementById('searchCoord').style.visibility = 'visible';
  
  }

function showInputFieldsA(){ 
    document.getElementById('address').style.visibility = 'visible';
    document.getElementById('searchAddr').style.visibility = 'visible';
}

async function codeCoords(){
  const apiKey = "AIzaSyBh6VzcqbSiO8ecgtaawzmiIRcFX8iYCPY"; 
  const latitude = parseFloat(document.getElementById("lat").value)
  const longitude = parseFloat(document.getElementById("lng").value)


  var requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`

  try{
    const response = await fetch(requestUrl); 
    
    if(!response.ok){
      throw new Error(`Response Status: ${response.status}`)
    }

    const responseJson = await response.json()
    console.log(responseJson)

    if(responseJson.status == 'OK'){
      const addressFound = responseJson.results[0].formatted_address
      console.log(addressFound)


      position = {lat: latitude, lng:longitude }
      
      initMap()

        const marker = new AdvancedMarkerElement({
          map: map,
          position: position,
          title: "addressFound",
        })

    }
  }
  catch(error){
    console.error(error.message)
  }
}



async function codeAddress() {
  const apiKey = "AIzaSyBh6VzcqbSiO8ecgtaawzmiIRcFX8iYCPY"; 
  const address = document.getElementById("address").value;
  
  var requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
 try{
      const response = await fetch(requestUrl); 
      
      if(!response.ok){
        throw new Error(`Response Status: ${response.status}`)
      }

      const responseJson = await response.json()
      console.log(responseJson)

      if(responseJson.status == 'OK'){
        const location = responseJson.results[0].geometry.location

        const latitude = location.lat
        const longitude = location.lng
        
        console.log(latitude, longitude)

        position = {lat: latitude, lng:longitude }
        initMap()

        const marker = new AdvancedMarkerElement({
          map: map,
          position: position,
          title: document.getElementById("address").value,
        })

      }
 } 
 catch(error){
  console.error(error.message)
 }
 
}


 
