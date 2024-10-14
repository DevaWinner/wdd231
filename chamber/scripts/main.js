// OpenWeatherMap API configuration
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
const city = "Abuja";
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

// Fetch Weather Data
fetch(weatherUrl)
	.then((response) => response.json())
	.then((data) => {
		const currentWeather = data.list[0];
		const temp = Math.round(currentWeather.main.temp);
		const weatherDescription = currentWeather.weather
			.map((w) => capitalizeWords(w.description))
			.join(", ");

		// Update weather info
		document.querySelector(".weather-info").innerHTML = `
      <p>City: ${city}</p>
      <p>Temperature: ${temp}&deg;C</p>
      <p>Description: ${weatherDescription}</p>
    `;

		// Update weather icon
		document.getElementById(
			"weather-icon"
		).src = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

		// 3-day forecast
		const forecastContainer = document.querySelector(".forecast-container");
		for (let i = 1; i <= 3; i++) {
			const forecast = data.list[i * 8];
			forecastContainer.innerHTML += `
        <div class="forecast">
          <div class="day">${new Date(forecast.dt_txt).toLocaleDateString(
						"en-US",
						{ weekday: "long" }
					)}</div>
          <div class="temperature">${Math.round(forecast.main.temp)}&deg;C</div>
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
