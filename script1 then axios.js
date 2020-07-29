$(document).ready( () => {
    timezone = $("#timezone")
    temperauture = $("#temperature");
    icon = $("#icon");
    description = $("#description");
})

window.addEventListener('load', () => {

    let getlocation = new Promise((resolve, reject) => {

        if(navigator.geolocation)
            resolve();
        else
            reject('User\'s location details not found.');
    
    }).then(() => {
        navigator.geolocation.getCurrentPosition(position => {

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
    
        let part = ""
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
        exclude=${part}&appid=5487c6bb5eba501d1ef876dd39837fcb`)
            .then(response => {
                console.log(response)
                let weatherData = response.data;
                console.log(weatherData);
                console.log(weatherData.current)

                timezone.html(weatherData.timezone);

                let tempInC = (weatherData.current.temp - 273.15).toPrecision(4)
                let unit = "C"
                temperauture.html(`${tempInC} C`)
                document.querySelector("#temperature").addEventListener("click", () => {4
                    if(unit == "C")
                    {
                        document.querySelector("#temperature").innerHTML = `${((tempInC * 9/5) + 32).toPrecision(4)} F`;
                        unit = "F";
                    }
                    else
                    {
                        document.querySelector("#temperature").innerHTML = `${tempInC} C`;
                        unit = "C";
                    }
                })
                
                let iconID = weatherData.current.weather[0].icon
                icon.html(`<img src="http://openweathermap.org/img/wn/${iconID}@2x.png">`)

                description.html(weatherData.current.weather[0].description)

            })
            .catch((error) => console.error(error))
        })

        
    })
})

