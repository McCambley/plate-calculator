// @ts-check
// --- Page Navigation ---
const pageButtons = document.querySelectorAll(".page-button");
const pages = document.querySelectorAll(".page");
const calculatorPageButton = document.querySelector("#calculator-page-button");
const builderPagebutton = document.querySelector("#builder-page-button");
const calculatorPage = document.querySelector("#calculator-page");
const builderPage = document.querySelector("#builder-page");

pageButtons.forEach((button) => {
  button.addEventListener("click", togglePage);
});

function togglePage() {
  const calculatorIsActivePage = calculatorPage.classList.contains("active");
  if (calculatorIsActivePage) {
    calculatorPage.classList.remove("active");
    builderPage.classList.add("active");
    calculatorPageButton.classList.remove("active");
    builderPagebutton.classList.add("active");
  } else {
    calculatorPage.classList.add("active");
    builderPage.classList.remove("active");
    calculatorPageButton.classList.add("active");
    builderPagebutton.classList.remove("active");
  }
}

// --- Plate Calculator ---
const calculatorForm = document.querySelector(".form");
const barInputs = document.querySelectorAll("input[name='options']");
const allInputs = document.querySelectorAll("input");
const weightInput = document.getElementById("weight");
const plate = document.querySelector(".plates");
const calculateButton = document.querySelector("#calculate-button");
const platesContainer = document.querySelector(".plates");
const platesVisualContainer = document.querySelector(".plates-visual");
let barWeight = 45;

barInputs.forEach((item) => {
  item.addEventListener("change", adjustBarWeight);
  item.addEventListener("change", calculate);
});

weightInput?.addEventListener("input", calculate);

calculatorForm.addEventListener("submit", handleSubmit);

function adjustBarWeight(event) {
  if (event.target.checked) {
    barWeight = event.target.value;
  }
}

function blurForm() {
  allInputs.forEach((input) => {
    input.blur();
  });
}

function handleSubmit(event) {
  event.preventDefault();
  blurForm();
  calculate();
}

const plateOptions = [45, 35, 25, 10, 5, 2.5];

function calculate(event) {
  event.preventDefault();
  if (weightInput.value < 5) {
    return (platesContainer.innerHTML = "");
    return (platesVisualContainer.innerHTML = "");
  }
  console.log(weightInput?.value, barWeight);

  const plateTotals = {};
  const targetWeight = weightInput.value;
  let remainingWeight = (targetWeight - barWeight) / 2;
  plateOptions.forEach((weight, index) => {
    const count = Math.floor(remainingWeight / weight);
    if (count) {
      remainingWeight = remainingWeight - count * weight;
      plateTotals[weight] = { weight, count, size: plateOptions.length - index };
    }
  });

  platesContainer.innerHTML = "";
  platesVisualContainer.innerHTML = "";

  plateOptions.forEach((weight) => {
    if (plateTotals[weight]) {
      // display plate totals
      const el = document.createElement("p");
      el.textContent = `${plateTotals[weight].count} x ${plateTotals[weight].weight}lbs.`;
      platesContainer?.append(el);

      // display plate visual
      let plateToCreate = plateTotals[weight].count;
      while (plateToCreate > 0) {
        const plateEl = document.createElement("p");
        plateEl.classList.add(`plate-${plateTotals[weight].size}`);
        plateEl.textContent = plateTotals[weight].weight;
        platesVisualContainer?.append(plateEl);
        plateToCreate--;
      }
    }
  });
}

// --- Bar Builder ---

let totalWeight = 0;
let weights = {};

function addPlate(weight) {
  const barWeight = parseFloat(document.getElementById("barWeight").value);
  weights[weight] = weights[weight] ? weights[weight] + 1 : 1;
  const addedWeight = Object.keys(weights)
    .map((key) => {
      return parseFloat(key) * weights[key];
    })
    .reduce((a, b) => a + b * 2, 0);

  console.log(addedWeight, weights);

  totalWeight = barWeight + addedWeight;
  document.getElementById("totalWeight").textContent = totalWeight;
  updateCurrentPlates();
}

function clearPlates() {
  initializeCalculator();
}

function initializeCalculator() {
  const barWeight = parseFloat(document.getElementById("barWeight").value);
  totalWeight = barWeight;
  document.getElementById("totalWeight").textContent = totalWeight;
  weights = {};
  updateCurrentPlates();
}

// Update total weight when bar weight is changed
document.getElementById("barWeight").addEventListener("change", () => {
  totalWeight = parseFloat(document.getElementById("barWeight").value);
  weights = {};
  document.getElementById("totalWeight").textContent = totalWeight;
  updateCurrentPlates();
});

function updateCurrentPlates() {
  const currentPlates = document.querySelector(".current-plates");
  if (Object.keys(weights).length === 0) {
    currentPlates.textContent = "---";
    return;
  }
  currentPlates.textContent = Object.keys(weights)
    .sort((a, b) => parseFloat(b) - parseFloat(a))
    .reduce((acc, key) => {
      return acc + `${key}x${weights[key]} `;
    }, "");
}

initializeCalculator();
