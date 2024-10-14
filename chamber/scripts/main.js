// OpenWeatherMap API configuration
const apiKey = "5cf8df03982c16cd9dcb2aae8c15d2ce";
const city = "Abuja";
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

// Fetch Weather Data
fetch(weatherUrl)
	.then((response) => response.json())
	.then((data) => {
		const currentWeather = data.list[0];
		const tempC = Math.round(currentWeather.main.temp);
		const tempF = Math.round((tempC * 9) / 5 + 32);
		const weatherDescription = currentWeather.weather
			.map((w) => capitalizeWords(w.description))
			.join(", ");
		const highTempC = Math.round(currentWeather.main.temp_max);
		const highTempF = Math.round((highTempC * 9) / 5 + 32);
		const lowTempC = Math.round(currentWeather.main.temp_min);
		const lowTempF = Math.round((lowTempC * 9) / 5 + 32);
		const humidity = currentWeather.main.humidity;
		const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
		const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});

		// Update weather info
		document.querySelector(".weather-info").innerHTML = `
            <p class="temp">${tempF}&deg;F</p>
            <p class="weather">${weatherDescription}</p>
            <p>High: <span>${highTempF}&deg;F</span></p>
            <p>Low: <span>${lowTempF}&deg;F</span></p>
            <p>Humidity: <span>${humidity}%</span></p>
            <p>Sunrise: <span>${sunrise}</span></p>
            <p>Sunset: <span>${sunset}</span></p>
        `;

		// 3-day forecast
		const forecastContainer = document.querySelector(".forecast-container");
		for (let i = 1; i <= 3; i++) {
			const forecast = data.list[i * 8];
			forecastContainer.innerHTML += `
                <div class="forecast">
                    <div class="day">${new Date(
											forecast.dt_txt
										).toLocaleDateString("en-US", { weekday: "long" })}</div>
                    <div class="temperature">${Math.round(
											(forecast.main.temp * 9) / 5 + 32
										)}&deg;F</div>
                </div>
            `;
		}
	})
	.catch((error) => console.error("Error fetching weather data:", error));

// Function to capitalize each word
function capitalizeWords(str) {
	return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Fetch member data and display spotlight members
fetch("data/members.json")
	.then((response) => response.json())
	.then((members) => {
		const goldSilverMembers = members.filter(
			(member) => member.membership === 2 || member.membership === 3
		);
		const spotlightMembers = getRandomMembers(goldSilverMembers, 3); // Display 2 or 3 members

		const spotlightContainer = document.getElementById("featured-members");
		spotlightMembers.forEach((member) => {
			spotlightContainer.innerHTML += `
        <div class="card spotlight-card">
          <img src="${member.image}" alt="${member.name}" class="member-logo">
          <div class="card-content">
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p>Phone: ${member.phone}</p>
            <p>Address: ${member.address}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p>Membership Level: ${
							member.membership === 2 ? "Silver" : "Gold"
						}</p>
          </div>
        </div>
      `;
		});
	})
	.catch((error) => console.error("Error fetching member data:", error));

function getRandomMembers(members, count) {
	const shuffled = members.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}
