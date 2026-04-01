// ================= STATE =================
let cart = [];
let selectedPrice = 199;

// ================= SCREEN CONTROL =================
function showScreen(screenId) {
  const screens = ["homeScreen", "customizeScreen", "cartScreen", "orderScreen"];

  screens.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  document.getElementById(screenId).style.display =
    screenId === "customizeScreen" ? "flex" : "block";

  closePreview();
}

// ================= HOME =================
function openCustomize() {
  showScreen("customizeScreen");
}

function goHome() {
  showScreen("homeScreen");
}

// ================= BACK BUTTON (NEW) =================
function goBack() {
  const order = document.getElementById("orderScreen").style.display === "block";
  const cart = document.getElementById("cartScreen").style.display === "block";
  const customize = document.getElementById("customizeScreen").style.display === "flex";

  // If in order → go cart
  if (order) {
    showScreen("cartScreen");
    return;
  }

  // If in cart → go customize (toys)
  if (cart) {
    showScreen("customizeScreen");
    return;
  }

  // If in customize → always go toys section
  if (customize) {
    document.getElementById("toys").style.display = "grid";
    document.getElementById("nameSection").style.display = "none";
    document.getElementById("designView").style.display = "none";
    return;
  }

  // fallback
  showScreen("homeScreen");
}
// ================= TOY SELECT =================
function selectToy(card, toy) {
  const img = card.querySelector("img")?.src || "";

  const index = cart.findIndex(i => i.name === toy);

  if (index !== -1) {
    cart.splice(index, 1);
    card.classList.remove("selected");
  } else {
    cart.push({ name: toy, price: selectedPrice, img });
    card.classList.add("selected");
  }

  updateCartCount();
  updatePreview(toy, img);
}

// ================= PREVIEW =================
function updatePreview(name, img) {
  const panel = document.getElementById("previewPanel");

  document.getElementById("previewTitle").innerText = name;
  document.getElementById("previewText").innerText = "Selected: " + name;
  document.getElementById("previewImg").src = img;

  panel.classList.add("active");
}

function closePreview() {
  document.getElementById("previewPanel")?.classList.remove("active");
}

// ================= CART =================
function updateCartCount() {
  document.getElementById("cartCount").innerText = cart.length;
}

function addToCart() {
  if (cart.length === 0) {
    alert("Select a toy first!");
    return;
  }
  alert("Added to Cart 🛒");
}

// ================= CART SCREEN =================
function showCart() {
  showScreen("cartScreen");
  renderCart();
}

function renderCart() {
  const box = document.getElementById("cartItems");
  box.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    box.innerHTML = "<p>Your cart is empty 🛒</p>";
    document.getElementById("cartTotal").innerText = "Total: ₹0";
    return;
  }

  cart.forEach(item => {
    total += item.price;

    box.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" style="width:60px;height:60px;border-radius:10px;">
        <div style="flex:1">${item.name}</div>
        <div>₹${item.price}</div>
      </div>
    `;
  });

  document.getElementById("cartTotal").innerText = "Total: ₹" + total;
}

// ================= BUY NOW =================
function buyNow() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  showScreen("orderScreen");
}

// ================= CHECKOUT FIX =================
function goToOrder() {
  if (cart.length === 0) {
    alert("Cart empty!");
    return;
  }
  showScreen("orderScreen");
}

// ================= ORDER =================
function sendOrder() {
  let msg = "🛒 NEW ORDER\n\n";
  let total = 0;

  cart.forEach(item => {
    msg += `${item.name} - ₹${item.price}\n`;
    total += item.price;
  });

  msg += `\nTotal: ₹${total}`;

  window.open(
    "https://wa.me/918109944185?text=" + encodeURIComponent(msg),
    "_blank"
  );
}

// ================= NAME FIX (CLICK ISSUE SOLUTION) =================
// NOTE: name section now works ONLY if you call showSection properly
function showSection(section) {
  const toys = document.getElementById("toys");
  const name = document.getElementById("nameSection");

  if (section === "toys") {
    toys.style.display = "grid";
    name.style.display = "none";
  }

  if (section === "nameSection") {
    toys.style.display = "none";
    name.style.display = "flex";
  }
}

// ================= CONTINUE SHOPPING =================
function continueShopping() {
  showScreen("customizeScreen");
}
