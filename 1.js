const apiKey = "";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (city.trim() === "") {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);

        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            var data = await response.json();
            
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind3").innerHTML = Math.round(data.wind.speed) + " km/h";

            const condition = data.weather[0].main;

            if (condition === "Clouds") {
                weatherIcon.src = "clouds.png";
            } else if (condition === "Clear") {
                weatherIcon.src = "clear.png";
            } else if (condition === "Rain") {
                weatherIcon.src = "rain.png";
            } else if (condition === "Drizzle") {
                weatherIcon.src = "drizzle.png";
            } else if (condition === "Mist") {
                weatherIcon.src = "mist.png";
            } else if (condition === "Snow") {
                weatherIcon.src = "snow.png";
            } else {
                weatherIcon.src = "clouds.png"; 
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchInput.value);
    }
});
