$(document).ready( () => {
    timezone = $("#timezone")
    temperauture = $("#temperature");
    icon = $("#icon");
    description = $("#description");
})

function makeLocationRequest()
{
    return new Promise((resolve, reject) => {
        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(position => resolve(position))

        else
            reject('User\'s location details not found.');
    })
}

function useResponse(response)
{
    let weatherData = response;
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

}

async function doWork() 
{
    const position = await makeLocationRequest()
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let part = ""

    var xhr = new XMLHttpRequest()

    xhr.open('GET', `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
    exclude=${part}&appid=5487c6bb5eba501d1ef876dd39837fcb`, true)


    xhr.onload = function(){
        if(this.status == 200)
        {
            console.log(this)
            let response = (JSON.parse(this.responseText))
            useResponse(response)
        }
            
    }

    xhr.send()

     
}

window.addEventListener('load', () => doWork())




