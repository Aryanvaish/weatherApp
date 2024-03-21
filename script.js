const key = "3bc673086eb50810f1f0817f41b64883"; 
var defLocation;

const card = document.querySelector('.card');
const defCard = document.querySelector('.defCard');


const searchBar = document.querySelector('.searchBar');
const searchbtn = document.querySelector('.searchbtn');

const CurWlogo = document.querySelector('.CurWeather_logo');


function windowLoad() {
    const successCallback = (position) => {
        const cordsApi = "https://api.opencagedata.com/geocode/v1/json";
        const cordsApikey = "191fa887d4694885b80ba152d0a13f69";
        const longLatitide = `${position.coords.latitude},${position.coords.longitude}`;

        const apiUrl = `${cordsApi}?key=${cordsApikey}&q=${longLatitide}&pretty=1`; 

        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {

            const userLocation = data.results[0].components.city;
            defLocation = userLocation;
            
            console.log(data.results[0]);
            console.log(defLocation, "   ",userLocation);

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${defLocation}&appid=${key}`)
            .then(response => response.json())
            .then(weatherdata => {

                const DayArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
                const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                const currDay = document.querySelector('.dateMonth .day');
                const currDate = document.querySelector('.dateMonth .date');
                const currMonth = document.querySelector('.dateMonth .month');

                const tempDeg = document.querySelector('.tempDeg');
                const weatherStatus = document.querySelector('.weatherStatus p');
                const humidityTemp = document.querySelector('.humidityTemp p');
                const windSpeedTemp = document.querySelector('.windSpeedTemp p');
                const windDirTemp = document.querySelector('.windDirTemp p');


                const date = new Date();

                currDate.innerHTML = date.getDate();

                for (let i = 0; i < DayArr.length; i++) {
                    currDay.innerHTML = DayArr[date.getDay()];
                }

                for (let j = 0; j < monthsArr.length; j++) {
                    currMonth.innerHTML = monthsArr[date.getMonth()];
                }

                tempDeg.textContent = (weatherdata.main.temp - 273.15).toString().substring(0, 2);
                weatherStatus.innerHTML = weatherdata.weather[0].main;
                humidityTemp.textContent = weatherdata.main.humidity;
                windSpeedTemp.textContent = weatherdata.wind.speed;
                windDirTemp.textContent = weatherdata.wind.deg;

                if(tempDeg.textContent <= 20){
                     CurWlogo.setAttribute('src', "images/rain.svg");
                  }else if(tempDeg.textContent > 20){ 
                     CurWlogo.setAttribute('src', "images/day.svg");
                }
                
            });
        });
       
        setTimeout(() => {
            defCard.classList.add('hidedefCard');
        }, 500);
        
        setTimeout(() => {
            card.classList.add('showCard');
        }, 1000);
        
    };

    const errorCallback = (error) => {
     alert("To Continue using live location, You have to accept the location 🫡 !!!");
        console.log("location Denied");
        card.style.display = "none";
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    searchbtn.addEventListener('click', (e) => {
        e.preventDefault();

        setTimeout(() => {
            defCard.classList.remove('hidedefCard');
        }, 0);
        
        setTimeout(() => {
            card.classList.remove('showCard');
        }, 500);

        console.log(searchBar.value);
        defLocation = searchBar.value;
    });


}windowLoad();





