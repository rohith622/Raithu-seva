// Mobile Menu Toggle
const menuIcon = document.querySelector('.mobile-menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// 🌤️ Weather Section
const weatherContainer = document.getElementById("weather");
const apiKey = "YOUR_API_KEY_HERE";  // <-- Replace with your OpenWeather API key

function fetchWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherHTML = `
        <h3>🌦️ Current Weather</h3>
        <p><strong>Location:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
      `;
      weatherContainer.innerHTML = weatherHTML;
    })
    .catch(err => {
      weatherContainer.innerHTML = `<p style="color:red;">Error fetching weather data.</p>`;
      console.error(err);
    });
}

// Get user's location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      fetchWeather(latitude, longitude);
    },
    () => {
      weatherContainer.innerHTML = `<p>Unable to fetch location. Please allow location access.</p>`;
    }
  );
} else {
  weatherContainer.innerHTML = `<p>Geolocation is not supported by this browser.</p>`;
}

// Registration Forms (Temporary - Frontend Only)
document.getElementById("workerRegister").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("✅ Worker registered successfully! (Backend connection coming soon)");
  this.reset();
});

document.getElementById("hireRegister").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("✅ Hire request submitted successfully! (Backend connection coming soon)");
  this.reset();
});
