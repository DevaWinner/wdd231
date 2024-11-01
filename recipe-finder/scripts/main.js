// main.js

// Fetch and display featured recipes on the home page
import { fetchRecipes, displayRecipes } from "./modules/recipes.js";
import { openModal, closeModal } from "./modules/modal.js";

// DOM Elements
const recipeGrid = document.getElementById("recipe-grid");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const randomButton = document.getElementById("random-button");

// Fetch and display recipes
async function loadFeaturedRecipes() {
	const data = await fetchRecipes("");
	displayRecipes(data.meals, recipeGrid);
}

// Search recipes
searchButton.addEventListener("click", async () => {
	const query = searchInput.value.trim();
	if (query !== "") {
		const data = await fetchRecipes(query);
		displayRecipes(data.meals, recipeGrid);
	}
});

// Random recipe
randomButton.addEventListener("click", async () => {
	const response = await fetch(
		"https://www.themealdb.com/api/json/v1/1/random.php"
	);
	const data = await response.json();
	openModal(data.meals[0]);
});

// Load featured recipes on page load
document.addEventListener("DOMContentLoaded", loadFeaturedRecipes);
