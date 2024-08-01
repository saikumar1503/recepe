const query = window.location.search;
const urlParams = new URLSearchParams(query);
const uri = urlParams.get("uri");

const app_id = "94f2c50a";
const app_key = "bb1ecb7f48fc57f7d1d2b9f46c867bf0";

const recipeContainer = document.querySelector(".recipe-container");

fetch(
  `https://api.edamam.com/search?r=${encodeURIComponent(
    uri
  )}&app_id=${app_id}&app_key=${app_key}`
)
  .then((res) => res.json())
  .then((data) => {
    const recipe = data[0];
    const recipeHtml = `
      <div>
        <img src="${recipe.image}" alt="${recipe.label}" />
        <p class="title">${recipe.label}</p>
        <p class="subtitle">Cuisine Type: <span>${recipe.cuisineType}</span></p>
        <p>Diet Labels: <span>${recipe.dietLabels.join(", ")}</span></p>
        <p>Dish Type: <span>${recipe.dishType}</span></p>
        <p>Meal Type: <span>${recipe.mealType}</span></p>
        <p>Ingredients: <span>${recipe.ingredientLines.join(", ")}</span></p>
        <p>Total Weight: <span>${recipe.totalWeight.toFixed(2)} g</span></p>
        <button class="save-recipe">Save Recipe</button>
      </div>
    `;
    recipeContainer.innerHTML = recipeHtml;
    let saveRecipe = document.querySelector(".save-recipe");
    saveRecipe.addEventListener("click", function () {
      let storedRecipes = JSON.parse(localStorage.getItem("recipe")) || [];
      console.log(storedRecipes);
      storedRecipes.push(recipe);
      localStorage.setItem("recipe", JSON.stringify(storedRecipes));
      alert("Recipe saved");
    });
  })
  .catch((error) => {
    recipeContainer.textContent = "Failed to load recipe. Please try again.";
    console.error("Error fetching recipe:", error);
  });

document.querySelector(".back-btn").addEventListener("click", function () {
  history.back();
});
