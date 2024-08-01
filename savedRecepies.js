const savedRecipes = document.querySelector(".specific-meals-container");
let recipes = JSON.parse(localStorage.getItem("recipe")) || [];
let filteredArr;
console.log(recipes);

function fn(recipes) {
  let recipe = "";
  recipes.forEach((curr, i) => {
    recipe += `
            <div class="recipe-card">
              <a href="recipe.html?uri=${encodeURIComponent(curr.uri)}">
                <div>
                  <img src="${curr.image}" alt="${curr.label}" />
                  <p>${curr.label}</p>
                </div>
              </a>
              <button class="delete-btn" data-id="${curr.uri}">Delete</button>
            </div>`;
  });
  savedRecipes.innerHTML = recipe;
  document.querySelectorAll(".delete-btn").forEach((curr) => {
    curr.addEventListener("click", function (e) {
      const { id } = e.target.dataset;
      filteredArr = recipes.filter((curr) => curr.uri !== id);
      localStorage.setItem("recipe", JSON.stringify(filteredArr));
      let updatedStorage = JSON.parse(localStorage.getItem("recipe"));
      console.log(updatedStorage);
      fn(updatedStorage);
    });
  });
}
fn(recipes);

document.querySelector(".back-btn").addEventListener("click", function () {
  history.back();
});
