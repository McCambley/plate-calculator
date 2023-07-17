const calculatorForm = document.querySelector(".form");
const barInputs = document.querySelectorAll("input[name='options']");
const allInputs = document.querySelectorAll("input");
const weightInput = document.getElementById("weight");
const plate = document.querySelector(".plates");
const calculateButton = document.querySelector("#calculate-button");
const platesContainer = document.querySelector(".plates");
let barWeight = 0;

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

function handleSubmit() {
  blurForm();
  calculate();
}

const plateOptions = [45, 35, 25, 10, 5, 2.5];

function calculate(event) {
  event.preventDefault();
  if (weightInput.value < 5) {
    return (platesContainer.innerHTML = "");
  }
  console.log(weightInput?.value, barWeight);

  const plateTotals = {};
  const targetWeight = weightInput.value;
  let remainingWeight = (targetWeight - barWeight) / 2;
  plateOptions.forEach((weight) => {
    const count = Math.floor(remainingWeight / weight);
    if (count) {
      remainingWeight = remainingWeight - count * weight;
      plateTotals[weight] = { weight, count };
    }
  });

  platesContainer.innerHTML = "";

  plateOptions.forEach((weight) => {
    if (plateTotals[weight]) {
      const el = document.createElement("p");
      el.textContent = `${plateTotals[weight].count} x ${plateTotals[weight].weight}lbs.`;
      platesContainer?.append(el);
    }
  });
}
