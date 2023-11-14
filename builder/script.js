let totalWeight = 0;
let weights = {};

function addPlate(weight) {
  const barWeight = parseInt(document.getElementById("barWeight").value);
  weights[weight] = weights[weight] ? weights[weight] + 1 : 1;
  const addedWeight = Object.keys(weights)
    .map((key) => {
      return parseInt(key) * weights[key];
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
  const barWeight = parseInt(document.getElementById("barWeight").value);
  totalWeight = barWeight;
  document.getElementById("totalWeight").textContent = totalWeight;
  weights = {};
  updateCurrentPlates();
}

// Update total weight when bar weight is changed
document.getElementById("barWeight").addEventListener("change", () => {
  totalWeight = parseInt(document.getElementById("barWeight").value);
  weights = {};
  document.getElementById("totalWeight").textContent = totalWeight;
  updateCurrentPlates();
});

function updateCurrentPlates() {
  const currentPlates = document.querySelector(".current-plates");
  currentPlates.textContent = Object.keys(weights)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .reduce((acc, key) => {
      return acc + `${key}x${weights[key]} `;
    }, "");
}

initializeCalculator();
