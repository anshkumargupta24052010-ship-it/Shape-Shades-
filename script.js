// ================= STATE =================
let selectedToys = [];
let selectedDesigns = [];
let selectedToy = null;
let selectedPrice = 199;
let cart = [];
let selectedImage = "";

// ================= SCREEN NAV =================
function openCustomize() {
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("customizeScreen").style.display = "flex";
}

function goHome() {
  document.getElementById("customizeScreen").style.display = "none";
  document.getElementById("orderScreen").style.display = "none";
  document.getElementById("cartScreen").style.display = "none";
  document.getElementById("homeScreen").style.display = "block";
}

// ================= PREVIEW FIX =================
function selectToy(card, toy) {
  selectedToy = toy;

  document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
  if (card) card.classList.add("selected");

  const imgEl = card ? card.querySelector("img") : null;
  selectedImage = card?.querySelector("img")?.getAttribute("src") || ""; "";

  const panel = document.getElementById("previewPanel");
  const title = document.getElementById("previewTitle");
  const text = document.getElementById("previewText");
  const img = document.getElementById("previewImg");

  if (title) title.innerText = toy;
  if (text) text.innerText = "Selected: " + toy;
  if (img && imgEl) img.src = imgEl.src;

  if (panel) panel.classList.add("active");
  function closePreview() {
  document.getElementById("previewPanel").classList.remove("active");
}
}

// ================= ADD TO CART =================
function addToCart() {
  if (!selectedToy) {
    alert("Please select a toy first!");
    return;
  }

  cart.push({
    name: selectedToy,
    price: selectedPrice,
    img: selectedImage || "images/placeholder.png"
  });

  updateCartCount();
  alert("Added to Cart 🛒");
}
// ================= CART COUNT =================
function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (el) el.innerText = cart.length;
}

// ================= SHOW CART =================
function showCart() {
  document.getElementById("customizeScreen").style.display = "none";
  document.getElementById("cartScreen").style.display = "block";

  const box = document.getElementById("cartItems");
  box.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    box.innerHTML = "<p>Your cart is empty 🛒</p>";
    document.getElementById("cartTotal").innerText = "Total: ₹0";
    return;
  }

  cart.forEach((item) => {
    total += item.price;

    box.innerHTML += `
      <div class="cart-item" style="display:flex;align-items:center;gap:10px;margin:10px 0;">
        <img src="${item.img}" 
             style="width:60px;height:60px;border-radius:10px;object-fit:cover;">
        
        <div style="flex:1;">
          <div>${item.name}</div>
        </div>

        <div style="font-weight:bold;">
          ₹${item.price}
        </div>
      </div>
    `;
  });

  document.getElementById("cartTotal").innerText = "Total: ₹" + total;
}
// ================= BUY NOW =================
function buyNow() {
  if (!selectedToy) {
    alert("Select a toy first!");
    return;
  }

  document.getElementById("orderScreen").style.display = "block";
  document.getElementById("customizeScreen").style.display = "none";
}

// ================= ORDER SCREEN =================
function goToOrder() {
  document.getElementById("cartScreen").style.display = "none";
  document.getElementById("orderScreen").style.display = "block";

  document.getElementById("finalToy").innerText =
    "Toy: " + (selectedToy || "Multiple Items");
}

// ================= PRICE UPDATE =================
function calculatePrice() {
  let type = document.getElementById("orderType").value;
  let count = selectedToys.length || 1;
  let price = 199;

  if (type === "kit") price = 249;
  if (type === "name") price = 299;
  if (type === "magnet") price = 149;

  selectedPrice = price;

  document.getElementById("price").innerText = "Total: ₹" + price;
}

document.addEventListener("change", function (e) {
  if (e.target.id === "orderType") {
    calculatePrice();
  }
});

// ================= ORDER PLACE =================
function sendOrder() {
  let name = selectedToy || "Cart Order";
  let type = document.getElementById("orderType").value;

  let msg = `
🛒 NEW ORDER

Toy: ${name}
Type: ${type}
Total: ₹${selectedPrice}
`;

  let phone = "917869748842"; // change this

  window.open(
    "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg),
    "_blank"
  );
}

// ================= DESIGN (safe fallback) =================
function toggleDesign(card, design) {
  if (selectedDesigns.includes(design)) {
    selectedDesigns = selectedDesigns.filter(d => d !== design);
    card.classList.remove("selected");
  } else {
    selectedDesigns.push(design);
    card.classList.add("selected");
  }
}
