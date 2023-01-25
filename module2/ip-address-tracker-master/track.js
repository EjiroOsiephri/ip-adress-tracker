
const map = L.map('map')
map.fitWorld()

//const marker = L.marker([0, 0]).addTo(map);

const mapDiv = document.getElementById('map')

const fullScreenIcon = document.getElementById("compress-icon")
const paragraph = document.querySelector('.par')

const paragraphOne = document.querySelector('.par1');

const inputSearch = document.getElementById('input-search');

const inputSearchValue = inputSearch.value.trim();

const inputBtn = document.getElementById('btn');




var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


map.locate({setView: true, maxZoom: 18});
  
  

navigator.geolocation.watchPosition(getIP);

 
 async function getIP(pos) {
    
   const res = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_uQydIoc3L0cMBfMEtgGA3hb4NB6fT&ipAddress=${inputSearch.value}`)
     
    const data = await res.json()

    

    .catch(setErrorFor() , 'invalid ip adress')
    .catch(setErrorsFor())
     console.log(data)

        let {ip , isp , location, timezone , latitude , longitude} = data;
       
      
      
       // marker.setLatLng([location.lat,location.lng])
        //navigator.geolocation.getCurrentPosition((position) => {
     
             
       // })
        document.getElementById('ip').textContent = ip;
        document.getElementById('isp').textContent = isp;
        document.getElementById('location-region').textContent = `${location.country} ,${location.city}, ${location.region}`;
        //document.getElementById('location-country').textContent = location.country;
        document.getElementById('timezone').textContent = location.timezone;

         document.getElementById('latitude').textContent = location.lat;
         document.getElementById('longitude').textContent = location.lng;

    
         

         const lat = pos.coords.latitude
         
          const lng = pos.coords.longitude

          const radius = pos.coords.accuracy
          
          

       var marker = L.marker([lat, lng] ,{ radius}).addTo(map);
       //var marker;

        //marker.setLatLng([lat,lng])

        let circle =   L.circle([lat, lng], { radius}).addTo(map)
      
        map.fitBounds(circle.getBounds())

        map.fitBounds(marker.getBounds())
}
function error(params) {
    paragraph.style.display = 'none'
    
}



function setErrorFor() {
    if (inputSearch.value.trim() === '') {
        
        console.log('err')
   }else if (isEmailValid(inputSearch.value)) {
    paragraph.style.display = 'none'
} 
   else{
    
    paragraph.style.display = 'block'
    setTimeout(error, 5000);
    
}

}




function errors(params) {
    paragraphOne.style.display = 'none'
    
}

function setErrorsFor() {
    if (inputSearch.value === '') {
        console.log('err')
        //paragraphOne.style.display = 'block'
   } 
    
else if (inputSearch.value.length > 1) {
    paragraphOne.style.display = 'none'
}

else{
   
    paragraphOne.style.display = 'block'
    setTimeout(errors, 2000);
    
}

}

function isEmailValid(email){
    const reg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    return reg.test(email);
 }
 


inputBtn.addEventListener('click', getIP)

//setInterval(getIP, 10000);

getIP()




