// www.themealdb.com/api/json/v1/1/search.php?s=  // meal api
const inputDiv = document.querySelector(".inputDiv input");
const searchBtn = document.querySelector(".searchBtn");
const cardImg = document.querySelector(".cardImg img");
const imgContent = document.querySelector(".imgContent p");
const imgSpan = document.querySelector(".imgContent span");
const recipeContainer = document.querySelector(".recipeContainer ");
const recipeMeasure = document.querySelector(".recipeContainer ");
const content = document.querySelector(".content");
const ins = document.querySelector(".instructions");
const recipeBtn = document.querySelector(".recipe-btn");
const closeBtn = document.querySelector(".fa-times");

content.style.display = "none";
ins.style.display = "none";

async function recipe() {
	const api = await fetch(
		`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputDiv.value}`
	);
	if (!api.ok) {
		swal(`No response from api${api.status}`);
	}
	const response = await api.json();
	if (!response.meals) {
		content.innerHTML = "";
		inputDiv.value = "";
		swal("Not found", "the requested food name could not be found");
	} else if (inputDiv.value === "") {
		content.innerHTML = "";
		swal("Please enter a food name !");
	} else {
		imgContent.innerHTML = response.meals[0].strArea;
		imgSpan.innerHTML = response.meals[0].strMeal;
		cardImg.src = response.meals[0].strMealThumb;

		content.style.display = "block";
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
}

searchBtn.addEventListener("click", recipe);
// recipeContainer.innerHTML = "";
// recipeMeasure.innerHTML = "";

function viewRecipe() {
	ins.style.display = "block";
}

recipeBtn.addEventListener("click", viewRecipe);
closeBtn.addEventListener("click",()=>{
	ins.style.display = "none"
})