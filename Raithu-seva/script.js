// Mobile Menu Toggle
const menuIcon = document.querySelector('.mobile-menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// 🌤️ Weather Section
// 🌦️ Weather Report (City-based)
async function getWeatherByCity() {
  const apiKey = "b28f6e92c5ff0b6c78fabeabff12db4e"; // ✅ your key
  const cityInput = document.getElementById("cityInput").value.trim();
  const weatherBox = document.getElementById("weather");

  if (!cityInput) {
    weatherBox.innerHTML = "<p>⚠️ Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found or network error");
    const data = await response.json();

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const city = data.name;
    const condition = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherBox.innerHTML = `
      <h3>🌦️ Weather in ${city}</h3>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${condition}">
      <p>Temperature: ${temp}°C</p>
      <p>Condition: ${condition}</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${wind} m/s</p>
    `;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    weatherBox.innerHTML = `<p>⚠️ Error fetching weather data. Please try again later.</p>`;
  }
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

// 👷‍♂️ Worker Booking Quantity Logic
const workers = [
  { price: 500 }, // harvesting worker
  { price: 800 }, // tractor driver
  { price: 400 }  // cleaner
];

function increaseQty(index) {
  const qtyEl = document.getElementById(`qty-${index}`);
  const totalEl = document.getElementById(`total-${index}`);
  let qty = parseInt(qtyEl.textContent);
  qty++;
  qtyEl.textContent = qty;
  totalEl.textContent = qty * workers[index].price;
}

function decreaseQty(index) {
  const qtyEl = document.getElementById(`qty-${index}`);
  const totalEl = document.getElementById(`total-${index}`);
  let qty = parseInt(qtyEl.textContent);
  if (qty > 1) {
    qty--;
    qtyEl.textContent = qty;
    totalEl.textContent = qty * workers[index].price;
  }
}

document.getElementById("getLocationBtn").addEventListener("click", getLocation);

function getLocation() {
  const output = document.getElementById("output");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    output.innerHTML = "❌ Geolocation is not supported by this browser.";
  }

  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    output.innerHTML = `
      ✅ Your Location Detected:<br>
      <b>Latitude:</b> ${lat}<br>
      <b>Longitude:</b> ${lon}<br>
      <iframe width="90%" height="300"
        src="https://www.google.com/maps?q=${lat},${lon}&output=embed">
      </iframe>`;
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        output.innerHTML = "User denied the location request ❌.";
        break;
      case error.POSITION_UNAVAILABLE:
        output.innerHTML = "Location information is unavailable ⚠️.";
        break;
      case error.TIMEOUT:
        output.innerHTML = "The request to get user location timed out ⏳.";
        break;
      default:
        output.innerHTML = "An unknown error occurred.";
    }
  }
}
