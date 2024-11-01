// modules/modal.js

// Create modal elements
const modal = document.createElement("div");
modal.id = "recipe-modal";
modal.classList.add("modal");
document.body.appendChild(modal);

export function openModal(meal) {
	modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <p>${meal.strInstructions}</p>
    </div>
  `;

	modal.style.display = "block";

	modal.querySelector(".close-button").addEventListener("click", closeModal);
}

export function closeModal() {
	modal.style.display = "none";
}

// Close modal when clicking outside content
window.addEventListener("click", (e) => {
	if (e.target == modal) {
		closeModal();
	}
});
