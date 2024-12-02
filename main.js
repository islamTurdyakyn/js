const apiKey = "";
const defaultCity = "Tashkent";

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  const searchButton = document.getElementById("searchButton");
  const cityInput = document.getElementById("cityInput");
  const errorMessage = document.getElementById("errorMessage");

  const todaySummary = document.getElementById("summary");
  const todayDetails = document.getElementById("details");
  const popularCities = document.getElementById("cities");
  const forecastList = document.getElementById("forecastList");
  const forecastDetails = document.getElementById("forecastDetails");

  
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tabContents.forEach(content => content.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  
  async function fetchWeather(city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      displayTodayWeather(data);
      errorMessage.textContent = "";
    } catch (error) {
      errorMessage.textContent = "City not found. Please try again.";
    }
  }

  
  function displayTodayWeather(data) {
    const { main, weather, sys, name } = data;
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();
    const dayLength = ((sys.sunset - sys.sunrise) / 3600).toFixed(2);

    todaySummary.innerHTML = `
      <h3>${name}</h3>
      <p>${new Date().toLocaleDateString()}</p>
      <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
      <p>${weather[0].description}</p>
      <p>Temperature: ${main.temp}°C (Feels like: ${main.feels_like}°C)</p>
      <p>Sunrise: ${sunrise}, Sunset: ${sunset}, Day Length: ${dayLength} hours</p>
    `;

    todayDetails.innerHTML = `
      <p>Humidity: ${main.humidity}%</p>
      <p>Pressure: ${main.pressure} hPa</p>
    `;
  }

  
  searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
  });

  
  fetchWeather(defaultCity);
});