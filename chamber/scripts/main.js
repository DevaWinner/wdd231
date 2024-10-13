document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("year").textContent = new Date().getFullYear();

	document.getElementById("lastModified").textContent =
		"Last modification: " + document.lastModified;

	var hamburger = document.getElementById("hamburger");
	var navMenu = document.getElementById("nav-menu");

	hamburger.addEventListener("click", function () {
		navMenu.classList.toggle("show");
		if (hamburger.textContent === "✕") {
			hamburger.textContent = "☰";
		} else {
			hamburger.textContent = "✕";
		}
	});

	// Get member container and view buttons
	var membersContainer = document.getElementById("members-container");
	var gridViewIcon = document.querySelector(
		".toggle-buttons .icon:nth-child(1)"
	);
	var listViewIcon = document.querySelector(
		".toggle-buttons .icon:nth-child(2)"
	);

	// Fetch member data and display it
	fetch("data/members.json")
		.then(function (response) {
			return response.json();
		})
		.then(function (members) {
			displayMembers(members, "grid");
		})
		.catch(function (error) {
			console.log("Error fetching member data: ", error);
		});

	// Handle grid view button click
	gridViewIcon.addEventListener("click", function () {
		updateView("grid");
	});

	// Handle list view button click
	listViewIcon.addEventListener("click", function () {
		updateView("list");
	});

	// Function to update the view type
	function updateView(viewType) {
		fetch("data/members.json")
			.then(function (response) {
				return response.json();
			})
			.then(function (members) {
				displayMembers(members, viewType);
			})
			.catch(function (error) {
				console.log("Error fetching member data: ", error);
			});
	}

	// Function to display members on the page
	function displayMembers(members, viewType) {
		membersContainer.innerHTML = "";
		membersContainer.className =
			viewType === "grid" ? "grid-view" : "list-view";

		members.forEach(function (member) {
			var memberCard = document.createElement("div");
			memberCard.className = "member-card";
			memberCard.innerHTML =
				"<img src=" +
				member.image +
				" alt='" +
				member.name +
				"'>" +
				"<h3>" +
				member.name +
				"</h3>" +
				"<p>Address: " +
				"<span>" +
				member.address +
				"</span>" +
				"</p>" +
				"<p>Phone: " +
				"<span>" +
				member.phone +
				"</span>" +
				"</p>" +
				"<p>Website: <a href='" +
				member.website +
				"'>" +
				member.website +
				"</a></p>";

			membersContainer.appendChild(memberCard);
		});
	}
});
