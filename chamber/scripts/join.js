document.getElementById("timestamp").value = new Date().toISOString();

document.querySelectorAll(".more-info").forEach(function (element) {
	element.addEventListener("click", function (event) {
		event.preventDefault();
		var modalId = this.getAttribute("data-modal");
		document.getElementById(modalId).style.display = "block";
	});
});

document.querySelectorAll(".close").forEach(function (element) {
	element.addEventListener("click", function () {
		var modalId = this.getAttribute("data-modal");
		document.getElementById(modalId).style.display = "none";
	});
});

window.addEventListener("click", function (event) {
	document.querySelectorAll(".modal").forEach(function (modal) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	});
});

window.addEventListener("load", function () {
	var cards = document.querySelectorAll("#membershipCards .card");
	cards.forEach(function (card, index) {
		card.style.animationDelay = index * 0.3 + "s";
		card.classList.add("animate-card");
	});
});
