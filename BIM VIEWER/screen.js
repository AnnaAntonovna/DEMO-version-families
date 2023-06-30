const categoryFilter = document.getElementById("category-filter");

const cards = document.querySelectorAll(".card");
const cardsArray = Array.from(cards);

const templateCard = cards[0];

const categoryElement = (cards[0]).querySelector(".category");
console.log(categoryElement);

console.log(categoryElement.textContent);

console.log(categoryFilter.value);


categoryFilter.addEventListener("change", function () {
  // Your code to filter the cards goes here
  const cards = document.querySelectorAll(".card");
    const selectedCategory = categoryFilter.value;

    console.log(categoryFilter.value)
    //console.log(categoryFilter.textContent)

    cards.forEach(function (card) {
      try{
      card.classList.remove("hidden");
      }
      catch{}
      if (
        selectedCategory === "" ||
        card.querySelector(".category").textContent == selectedCategory
      ) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
});


const params = new URLSearchParams(window.location.search);
  const modelName = params.get('model');
  const modelNameElement = document.getElementById('model-name');
  modelNameElement.textContent = modelName;
