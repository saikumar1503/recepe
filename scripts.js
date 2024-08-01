const app_id = "94f2c50a";
const app_key = "bb1ecb7f48fc57f7d1d2b9f46c867bf0";

const mealContainer = document.querySelector(".meal-type-container");
const specificMeals = document.querySelector(".specific-meals-container");
const query = document.querySelector(".query");
const search = document.querySelector(".search-button");
const suggestions = document.querySelector(".suggestions");
const showMoreButton = document.querySelector(".showmore");

let from = 0;
let to = 10;
let currentMealType = "lunch";

const mealData = async (mealType, from, to) => {
  const data = await fetch(
    `https://api.edamam.com/search?q=*&app_id=${app_id}&app_key=${app_key}&mealType=${mealType}&from=${from}&to=${to}`
  );

  const jsondata = await data.json();
  console.log(jsondata);
  console.log(jsondata.hits);
  let mealHtml = "";
  jsondata.hits.forEach((curr) => {
    mealHtml += `<a href=recipe.html?uri=${encodeURIComponent(
      curr.recipe.uri
    )}><div>
      <img src=${curr.recipe.image} />
      <p>${curr.recipe.label}</p>
      </div></a>`;
  });
  specificMeals.innerHTML += mealHtml;
};

mealContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("meal-type")) {
    currentMealType = e.target.classList[1].toLowerCase();
    console.log(currentMealType);

    from = 0;
    to = 10;
    specificMeals.innerHTML = "";
    mealData(currentMealType, from, to);
  }
});

showMoreButton.addEventListener("click", function (e) {
  from = to;
  to = to + 10;
  mealData(currentMealType, from, to);
});

mealData(currentMealType, from, to);

query.addEventListener("input", function (e) {
  const searchTerm = e.target.value;
  if (searchTerm) {
    fetch(
      `https://api.edamam.com/search?q=${searchTerm}&app_id=${app_id}&app_key=${app_key}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let suggestionsHtml = "";
        data.hits.forEach((curr) => {
          suggestionsHtml += `<p class="recipe-suggestion">${curr.recipe.label}</p>`;
        });
        suggestions.innerHTML = suggestionsHtml;
        document.querySelectorAll(".recipe-suggestion").forEach((cur) => {
          cur.addEventListener("click", function (e) {
            query.value = e.target.textContent;
            suggestions.innerHTML = "";
          });
        });
      });
  } else {
    suggestions.innerHTML = "";
  }
});

search.addEventListener("click", function (e) {
  search.setAttribute(
    "href",
    `search.html?query=${encodeURIComponent(query.value)}`
  );
});
