// ================= SCREEN SWITCH =================
function openCustomize() {
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("customizeScreen").style.display = "flex";
}

function goToOrder() {
  document.getElementById("customizeScreen").style.display = "none";
  document.getElementById("orderScreen").style.display = "block";

  document.getElementById("finalToy").innerText =
    "Toy: " + (selectedToys[0] || "None");

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

  // remove old selection
  document.querySelectorAll("#toys .card")
    .forEach(c => c.classList.remove("selected"));

  selectedToys = [toy];
  card.classList.add("selected");

  // reset designs
  selectedDesigns = [];

  showDesigns(toy);
  updateBottom();
  calculatePrice();
}

// ================= SHOW DESIGNS =================
function showDesigns(toy) {
  let designView = document.getElementById("designView");
  let designs = designData[toy] || [];

  selectedDesigns = [];

  if (designs.length === 0) {
    designView.style.display = "none";
    designView.innerHTML = "";
    return;
  }

  designView.style.display = "grid";
  designView.innerHTML = "";

  designs.forEach(d => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerText = d;

    div.onclick = () => {
      document.querySelectorAll("#designView .card")
        .forEach(c => c.classList.remove("selected"));

      selectedDesigns = [d];
      div.classList.add("selected");

      updateBottom();
    };

    designView.appendChild(div);
  });
}

// ================= BOTTOM BAR =================
function updateBottom() {
  let text = "Toy: " + (selectedToys[0] || "None") +
             " | Design: " + (selectedDesigns[0] || "None");

  document.getElementById("selectedToy").innerText = text;
}

// ================= SECTION SWITCH =================
function showSection(sectionId, element) {

  document.getElementById("toys").style.display = "none";
  document.getElementById("nameSection").style.display = "none";
  document.getElementById("designView").style.display = "none";

  if (sectionId === "toys") {
    document.getElementById("toys").style.display = "grid";
  } 
  else if (sectionId === "nameSection") {
    document.getElementById("nameSection").style.display = "flex";
  }

  let items = document.querySelectorAll(".menu-item");
  items.forEach(i => i.classList.remove("active"));
  element.classList.add("active");
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
    else if (count >= 5) price = 169;
  }

  else if (type === "kit") {
    if (count == 1) price = 89;
    else if (count == 2) price = 119;
    else if (count == 3) price = 169;
    else if (count == 4) price = 209;
    else if (count >= 5) price = 269;
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

// ================= WHATSAPP ORDER =================
function sendOrder() {

  let toy = selectedToys[0] || "None";
  let design = selectedDesigns[0] || "None";
  let name = document.getElementById("customName").value || "None";
  let price = document.getElementById("price").innerText;

  let message = 
`🛒 New Order
Toy: ${toy}
Design: ${design}
Name: ${name}
${price}`;

  // ✅ CORRECT FORMAT (no +, no space)
  let phone = "919340489691"; // apna number

  let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  // 🔥 IMPORTANT FIX FOR MOBILE
  window.location.href = url;
}
