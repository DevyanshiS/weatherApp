"use strict"

const infoContainer = document.querySelector(".container-front");
const resContainer = document.querySelector(".container-back");
const search = document.querySelector(".search-city");
const inpCity = document.querySelector("#input-city");
const goBack = document.querySelector("#change-city");
const weatherIcon = document.querySelector(".weather-icon");

const apiKey = "a7007475a7f04444440410718929407b";


function formatCoordinates(value, type) {
    const degree = Math.abs(value);
    const direction = type === 'lat' ? (value >= 0 ? 'N' : 'S') : (value >= 0 ? 'E' : 'W');
    return `${degree.toFixed(2)}° ${direction}`;
}


search.addEventListener("click",function(e){

    const city = inpCity.value.trim();

    if(city===""){
        e.preventDefault();
        alert("Enter name of the city");
    }
    else{

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response=>response.json())
            .then(data=>{
                if(data.cod===200){
                    infoContainer.classList.add("flipped");
                    resContainer.classList.add("flipped");
                    document.querySelector(".display-city").innerHTML = data.name;
                    document.querySelector(".temp").innerHTML = Math.ceil(data.main.temp);
                    document.querySelector(".feels-like").innerHTML = Math.round(data.main.feels_like);
                    document.querySelector(".humidity").innerHTML = `${Math.round(data.main.humidity)} %`;
                    document.querySelector(".wind-speed").innerHTML = `${Math.round(data.wind.speed)} km/h`;
                    document.querySelector(".latitude").innerHTML = formatCoordinates(data.coord.lat, 'lat');
                    document.querySelector(".longitude").innerHTML = formatCoordinates(data.coord.lon, 'lon');
                    
                    if(data.weather[0].main == "Clouds"){
                        weatherIcon.src = "weatherAppicons/clouds.png";
                    }
                    else if(data.weather[0].main == "Clear"){
                        weatherIcon.src = "weatherAppicons/clouds.png";
                    }
                    else if(data.weather[0].main == "Rain"){
                        weatherIcon.src = "weatherAppicons/rain.png";
                    }
                    else if(data.weather[0].main == "Mist"){
                        weatherIcon.src = "weatherAppicons/mist.png";
                    }
                    else if(data.weather[0].main == "Drizzle"){
                        weatherIcon.src = "weatherAppicons/clouds.png";
                    }
                    else if(data.weather[0].main == "Snow"){
                        weatherIcon.src = "weatherAppicons/snow.png";
                    }
                    
                }
                else{
                    e.preventDefault();
                    alert("City not found");
                    inpCity.value = "";
                }
            })
            .catch(error => console.error("Error fetching the weather data:", error));
    }
});

goBack.addEventListener("click",function(){
    infoContainer.classList.remove("flipped");
    resContainer.classList.remove("flipped");
    inpCity.value = "";
});




// use geolocation and then select city from location if input field left blank
// if geolocation is not supported then input field should be compulsory and cant be blank