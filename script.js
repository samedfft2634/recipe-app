// www.themealdb.com/api/json/v1/1/search.php?s=  // meal api
const inputDiv = document.querySelector(".inputDiv input");
const searchBtn = document.querySelector(".searchBtn");
const cardImg = document.querySelector(".cardImg img");
const imgContent = document.querySelector(".imgContent p");
const imgSpan = document.querySelector(".imgContent span");
const recipeContainer = document.querySelector(".recipeContainer ");
const recipeMeasure = document.querySelector(".recipeContainer ");

async function recipe() {
	const api = await fetch(
		`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputDiv.value}`
	);
	const response = await api.json();
	console.log(response);
	imgContent.innerHTML = response.meals[0].strArea;
	imgSpan.innerHTML = response.meals[0].strMeal;
	cardImg.src = response.meals[0].strMealThumb;


	// Clear previous content in recipeContainer and recipeMeasure
	recipeContainer.innerHTML = "";

	// Loop through ingredients and measures
	for (let i = 1; i <= 20; i++) {
		// Assuming you have up to 20 ingredients
		const ingredient = response.meals[0][`strIngredient${i}`];
		const measure = response.meals[0][`strMeasure${i}`];

		if (ingredient) {
			const ingredientItem = document.createElement("li");
			ingredientItem.innerHTML = `${measure} ${ingredient}`;
			recipeContainer.appendChild(ingredientItem);
            
		}
	}
}

searchBtn.addEventListener("click", recipe);
// recipeContainer.innerHTML = "";
// recipeMeasure.innerHTML = "";