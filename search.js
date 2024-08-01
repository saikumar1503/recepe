const app_id = "94f2c50a";
const app_key = "bb1ecb7f48fc57f7d1d2b9f46c867bf0";
let cuisinesArr = [];
let mealsArr = [];
let dishesArr = [];
let healthArr = [];
let from = 0;
let to = 10;

let arr2;
const searchedContainer = document.querySelector(".searched-recipie-container");
const cuisinesContainer = document.querySelector(".cuisines-container");
const mealsContainer = document.querySelector(".meals-container");
const dishesContainer = document.querySelector(".dishes-container");
const healthContainer = document.querySelector(".health-container");
const filterContainer = document.querySelector(".filter-container");
const showmore = document.querySelector(".show");
const applyBtn = document.querySelector(".apply-btn");

const query = window.location.search;
const urlParams = new URLSearchParams(query);
const recipies = urlParams.get("query");

const mealData = async (
  recipies,
  from,
  to,
  cuisines = [],
  meals = [],
  dishes = [],
  health = []
) => {
  let url = `https://api.edamam.com/search?q=${recipies}&app_id=${app_id}&app_key=${app_key}&from=${from}&to=${to}`;

  if (cuisines.length)
    url += `&cuisineType=${cuisines
      .map(encodeURIComponent)
      .join("&cuisineType=")}`;
  if (meals.length)
    url += `&mealType=${meals.map(encodeURIComponent).join("&mealType=")}`;
  if (dishes.length)
    url += `&dishType=${dishes.map(encodeURIComponent).join("&dishType=")}`;
  if (health.length)
    url += `&diet=${health.map(encodeURIComponent).join("&diet=")}`;

  const response = await fetch(url);
  const data = await response.json();
  arr2 = data.hits;

  let mealHtml = "";
  data.hits.forEach((curr) => {
    mealHtml += `<a href="recipe.html?uri=${encodeURIComponent(
      curr.recipe.uri
    )}">
            <div>
                <img src="${curr.recipe.image}" alt="${curr.recipe.label}" />
                <p>${curr.recipe.label}</p>
            </div>
        </a>`;
  });

  searchedContainer.innerHTML += mealHtml;
};

mealData(recipies, 0, 10);

showmore.addEventListener("click", function (e) {
  from = to;
  to = to + 10;
  mealData(recipies, from, to, cuisinesArr, mealsArr, dishesArr, healthArr);
});

const toggleFilterSelection = (e, array, className) => {
  if (!e.target.classList.contains(className)) {
    array.push(e.target.textContent);
    e.target.classList.add(className);
    e.target.style.color = "red";
  } else {
    array.splice(array.indexOf(e.target.textContent), 1);
    e.target.classList.remove(className);
    e.target.style.color = "";
  }
};

cuisinesContainer.addEventListener("click", (e) => {
  toggleFilterSelection(e, cuisinesArr, "cuisne");
});

mealsContainer.addEventListener("click", (e) => {
  toggleFilterSelection(e, mealsArr, "meal");
});

dishesContainer.addEventListener("click", (e) => {
  toggleFilterSelection(e, dishesArr, "dish");
});

healthContainer.addEventListener("click", (e) => {
  toggleFilterSelection(e, healthArr, "health");
});

filterContainer.addEventListener("click", function (e) {
  if (e.target.className == "cuisines") {
    if (
      !document
        .querySelector(".cuisines-container")
        .classList.contains("cuisines-toggle")
    ) {
      document.querySelector(".cuisines-container").style.display = "block";
      document
        .querySelector(".cuisines-container")
        .classList.add("cuisines-toggle");
    } else {
      document.querySelector(".cuisines-container").style.display = "none";
      document
        .querySelector(".cuisines-container")
        .classList.remove("cuisines-toggle");
    }
  } else if (e.target.className == "dish") {
    console.log("hi");
    if (
      !document
        .querySelector(".dishes-container")
        .classList.contains("cuisines-toggle")
    ) {
      document.querySelector(".dishes-container").style.display = "block";
      document
        .querySelector(".dishes-container")
        .classList.add("cuisines-toggle");
    } else {
      document.querySelector(".dishes-container").style.display = "none";
      document
        .querySelector(".dishes-container")
        .classList.remove("cuisines-toggle");
    }
  } else if (e.target.className == "meal") {
    console.log("hi");
    if (
      !document
        .querySelector(".meals-container")
        .classList.contains("cuisines-toggle")
    ) {
      document.querySelector(".meals-container").style.display = "block";
      document
        .querySelector(".meals-container")
        .classList.add("cuisines-toggle");
    } else {
      document.querySelector(".meals-container").style.display = "none";
      document
        .querySelector(".meals-container")
        .classList.remove("cuisines-toggle");
    }
  } else if (e.target.className == "health") {
    console.log("hi");
    if (
      !document
        .querySelector(".health-container")
        .classList.contains("cuisines-toggle")
    ) {
      document.querySelector(".health-container").style.display = "block";
      document
        .querySelector(".health-container")
        .classList.add("cuisines-toggle");
    } else {
      document.querySelector(".health-container").style.display = "none";
      document
        .querySelector(".health-container")
        .classList.remove("cuisines-toggle");
    }
  }
});

applyBtn.addEventListener("click", () => {
  from = 0;
  to = 10;
  searchedContainer.innerHTML = "";
  mealData(recipies, from, to, cuisinesArr, mealsArr, dishesArr, healthArr);
});
