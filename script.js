// ================= SCREEN SWITCH =================
function openCustomize() {
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("customizeScreen").style.display = "flex";
}

function goToOrder() {
  document.getElementById("customizeScreen").style.display = "none";
  document.getElementById("orderScreen").style.display = "block";

  document.getElementById("finalToy").innerText =
    "Toys: " + selectedToys.join(", ");

  document.getElementById("finalName").innerText =
    "Name: " + document.getElementById("customName").value;
}

// ================= DATA =================
let selectedToys = [];
let selectedDesigns = [];

const designData = {
  "Flowers": ["Flower Design 1", "Flower Design 2"],
  "Train": ["Engine", "Coach"],
  "Cars": ["Sports Car", "Mini Car"]
};

// ================= TOY SELECT =================
function selectToy(card, toy) {

  if (selectedToys.includes(toy)) {
    selectedToys = selectedToys.filter(t => t !== toy);
    card.classList.remove("selected");
  } else {
    selectedToys.push(toy);
    card.classList.add("selected");
  }

  showDesigns(toy);
  updateBottom();
}

// ================= SHOW DESIGNS =================
function showDesigns(toy) {
  let designView = document.getElementById("designView");
  designView.style.display = "grid";
  designView.innerHTML = "";

  let designs = designData[toy] || [];

  designs.forEach(d => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerText = d;

    div.onclick = () => toggleDesign(div, d);

    designView.appendChild(div);
  });
}

// ================= DESIGN SELECT =================
function toggleDesign(card, design) {
  if (selectedDesigns.includes(design)) {
    selectedDesigns = selectedDesigns.filter(d => d !== design);
    card.classList.remove("selected");
  } else {
    selectedDesigns.push(design);
    card.classList.add("selected");
  }

  updateBottom();
}

// ================= BOTTOM BAR =================
function updateBottom() {
  let text =
    "Selected: " +
    selectedToys.join(", ") +
    " | " +
    selectedDesigns.join(", ");

  document.getElementById("selectedToy").innerText = text;
}
// ================= SECTION SWITCH =================
function showSection(sectionId, element) {

  // hide all sections
  document.getElementById("toys").style.display = "none";
  document.getElementById("nameSection").style.display = "none";
  document.getElementById("designView").style.display = "none";

  // show selected
  document.getElementById(sectionId).style.display = "flex";

  // active highlight
  let items = document.querySelectorAll(".menu-item");
  items.forEach(i => i.classList.remove("active"));
  element.classList.add("active");
}
