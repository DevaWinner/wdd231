// modules/recipes.js

import { openModal } from "./modal.js";

// Fetch recipes from TheMealDB API
export async function fetchRecipes(query) {
	try {
		const response = await fetch(
			`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
		);
		return await response.json();
	} catch (error) {
		console.error("Error fetching recipes:", error);
	}
}

// Display recipes in the grid
export function displayRecipes(meals, container) {
	container.innerHTML = "";
	if (meals) {
		meals.forEach((meal) => {
			const card = document.createElement("div");
			card.classList.add("recipe-card");

			card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <button class="button" data-id="${meal.idMeal}">View Recipe</button>
      `;

			card.querySelector("button").addEventListener("click", () => {
				openModal(meal);
			});

			container.appendChild(card);
		});
	} else {
		container.innerHTML = "<p>No recipes found.</p>";
	}
}
