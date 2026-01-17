console.log("Weather app is running");

const apiKey = "";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={}";

const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function weatherApp(city) {
    if (city.trim() === "") {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        if (!response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const data = await response.json();
        console.log(data);

        document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";
        document.querySelector(".wind").innerHTML =
            Math.round(data.wind.speed * 3.6) + " km/h";

        const condition = data.weather[0].main;

        if (condition === "Clouds") weatherIcon.src = "clouds.png";
        else if (condition === "Clear") weatherIcon.src = "clear.png";
        else if (condition === "Rain") weatherIcon.src = "rain.png";
        else if (condition === "Mist") weatherIcon.src = "mist.png";
        else if (condition === "Snow") weatherIcon.src = "snow.png";
        else weatherIcon.src = "default.png";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        console.error("Network error:", error);
    }
}

searchBtn.addEventListener("click", () => {
    weatherApp(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        weatherApp(searchInput.value);
    }
});

