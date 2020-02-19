window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        '.temperature-description');
    let temperatureDegree = document.querySelector(
        '.temperature-degree');
    let locationTimezone = document.querySelector(
            '.location-timezone');
    let windSpeedNow = document.querySelector('.wind-speed')


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            lat = position.coords.longitude;
            long = position.coords.latitude;
            const key="73e71174d36efc315b79be6fc7494381";

            const apiUrl = "https://api.darksky.net/forecast/";
            const proxy="https://cors-anywhere.herokuapp.com/";

            const api =`${proxy}${apiUrl}${key}/${long},${lat}`;

            fetch(api).then(response => {
                return response.json();
            }).then(data =>{
                console.log(data);
                const {temperature, summary, windSpeed}= data.currently;

                temperatureDegree.textContent = (
                    (temperature- 32) * 5/9).toFixed(1)+'°C';
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                windSpeedNow.textContent=(windSpeed)+' m/s';
            });
        });
    }

});