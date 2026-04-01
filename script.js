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
  calculatePrice();
}

// ================= SHOW DESIGNS =================
function showDesigns(toy) {
  let designView = document.getElementById("designView");
  let designs = designData[toy] || [];

  // 🔥 AGAR DESIGN NAHI HAI → HIDE KAR DO
  if (designs.length === 0) {
    designView.style.display = "none";
    designView.innerHTML = "";
    return;
  }

  // warna show karo
  designView.style.display = "grid";
  designView.innerHTML = "";

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
// ================= SECTION SWITCH FIX =================
function showSection(sectionId, element) {

  // hide all
  document.getElementById("toys").style.display = "none";
  document.getElementById("nameSection").style.display = "none";
  document.getElementById("designView").style.display = "none";

  // show सही तरीके से
  if (sectionId === "toys") {
    document.getElementById("toys").style.display = "grid";
  } 
  else if (sectionId === "nameSection") {
    document.getElementById("nameSection").style.display = "flex";
  }

  // active highlight
  let items = document.querySelectorAll(".menu-item");
  items.forEach(i => i.classList.remove("active"));
  element.classList.add("active");
}
function showToys() {
  showSection('toys', document.querySelector('.menu-item'));
}
// ================= PRICE SYSTEM =================
function calculatePrice() {
  let count = selectedToys.length;
  let type = document.getElementById("orderType").value;

  let price = 0;

  if (type === "shapes") {
    if (count == 1) price = 39;
    else if (count == 2) price = 79;
    else if (count == 3) price = 109;
    else if (count == 4) price = 139;
    else if (count >= 6) price = 169;
  }

  else if (type === "kit") {
    if (count == 1) price = 89;
    else if (count == 2) price = 119;
    else if (count == 3) price = 169;
    else if (count == 4) price = 209;
    else if (count >= 6) price = 269;
  }

  else if (type === "name") {
    let name = document.getElementById("customName").value;
    price = name.length * 20 + 259;
  }

  else if (type === "magnet") {
    price = 50;
  }

  document.getElementById("price").innerText = "Total: ₹" + price;
}
document.getElementById("orderType").addEventListener("change", calculatePrice);
function selectToy(el, name) {
  document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
  el.classList.add("selected");

  selectedToy = name;

  // open preview panel
  document.getElementById("previewPanel").classList.add("active");

  // update preview content
  document.getElementById("previewTitle").innerText = name;
  document.getElementById("previewText").innerText = "Selected: " + name;

  let img = el.querySelector("img").src;
  document.getElementById("previewImg").src = img;
}
function selectToy(el, name) {
  document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
  el.classList.add("selected");

  selectedToy = name;

  // open preview panel
  document.getElementById("previewPanel").classList.add("active");

  // update preview content
  document.getElementById("previewTitle").innerText = name;
  document.getElementById("previewText").innerText = "Selected: " + name;

  let img = el.querySelector("img").src;
  document.getElementById("previewImg").src = img;
}
function addToCart() {
  if (!selectedToy) return;

  cart.push(selectedToy);
  alert("Added to Cart 🛒");
}
function buyNow() {
  if (!selectedToy) return;

  alert("Redirecting to order...");
  document.getElementById("orderScreen").style.display = "flex";
}
