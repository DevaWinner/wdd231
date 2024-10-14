document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("year").textContent = new Date().getFullYear();

	document.getElementById("lastModified").textContent =
		"Last modification: " + document.lastModified;

	// Hamburger menu toggle
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
});
