// ================= GLOBAL STATE =================
let selectedToys = [];
let selectedDesigns = [];
let selectedToy = null;
let cart = [];

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
    "Name: " + (document.getElementById("customName")?.value || "");
}

// ================= TOY DATA =================
const designData = {
  Flowers: ["Flower Design 1", "Flower Design 2"],
  Train: ["Engine", "Coach"],
  Cars: ["Sports Car", "Mini Car"]
};

// ================= TOY SELECT (MULTI SELECT) =================
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

// ================= DESIGN SHOW =================
function showDesigns(toy) {
  const designView = document.getElementById("designView");
  const designs = designData[toy] || [];

  if (designs.length === 0) {
    designView.style.display = "none";
    designView.innerHTML = "";
    return;
  }

  designView.style.display = "grid";
  designView.innerHTML = "";

  designs.forEach(d => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = d;

    div.onclick = () => toggleDesign(div, d);

    designView.appendChild(div);
  });
}

// ================= DESIGN TOGGLE =================
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

// ================= BOTTOM STATUS =================
function updateBottom() {
  const text =
    "Selected Toys: " +
    selectedToys.join(", ") +
    " | Designs: " +
    selectedDesigns.join(", ");

  document.getElementById("selectedToy").innerText = text;
}

// ================= SECTION SWITCH =================
function showSection(sectionId, element) {
  document.getElementById("toys").style.display = "none";
  document.getElementById("nameSection").style.display = "none";
  document.getElementById("designView").style.display = "none";

  if (sectionId === "toys") {
    document.getElementById("toys").style.display = "grid";
  } else if (sectionId === "nameSection") {
    document.getElementById("nameSection").style.display = "flex";
  }

  document.querySelectorAll(".menu-item")
    .forEach(i => i.classList.remove("active"));

  element.classList.add("active");
}

// ================= PRICE CALC =================
function calculatePrice() {
  const count = selectedToys.length;
  const type = document.getElementById("orderType").value;

  let price = 0;

  if (type === "shapes") {
    if (count == 1) price = 39;
    else if (count == 2) price = 79;
    else if (count == 3) price = 109;
    else if (count == 4) price = 139;
    else if (count >= 5) price = 169;
  }

  if (type === "kit") {
    if (count == 1) price = 89;
    else if (count == 2) price = 119;
    else if (count == 3) price = 169;
    else if (count == 4) price = 209;
    else if (count >= 5) price = 269;
  }

  if (type === "name") {
    const name = document.getElementById("customName")?.value || "";
    price = name.length * 20 + 259;
  }

  if (type === "magnet") {
    price = 50;
  }

  document.getElementById("price").innerText = "Total: ₹" + price;
}

document.getElementById("orderType")?.addEventListener("change", calculatePrice);

// ================= PREVIEW PANEL =================
function selectToyPreview(el, name) {
  document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
  el.classList.add("selected");

  selectedToy = name;

  document.getElementById("previewPanel")?.classList.add("active");
  document.getElementById("previewTitle").innerText = name;
  document.getElementById("previewText").innerText = "Selected: " + name;

  const img = el.querySelector("img")?.src;
  if (img) document.getElementById("previewImg").src = img;
}

// ================= CART SYSTEM =================
function addToCart() {
  if (!selectedToy) return;

  cart.push({
    name: selectedToy,
    price: 199
  });

  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.innerText = cart.length;

  alert("Added to Cart 🛒");
}

function showCart() {
  document.getElementById("customizeScreen").style.display = "none";
  document.getElementById("cartScreen").style.display = "block";

  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <span>${item.name}</span>
      <span>₹${item.price}</span>
    `;

    cartItems.appendChild(div);
  });

  document.getElementById("cartTotal").innerText = "Total: ₹" + total;
}

// ================= BUY NOW =================
function buyNow() {
  if (!selectedToy) return;

  document.getElementById("orderScreen").style.display = "flex";
}
function selectToyPreview(el, name) {
  selectedToy = name;

  const panel = document.getElementById("previewPanel");
  panel.classList.add("active");

  document.getElementById("previewTitle").innerText = name;
  document.getElementById("previewText").innerText = "Selected: " + name;

  const img = el.querySelector("img")?.src;
  if (img) document.getElementById("previewImg").src = img;
}
