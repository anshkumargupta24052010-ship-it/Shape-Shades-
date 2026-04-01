// ================= STATE =================
let cart = [];

// ================= PRICING SYSTEM =================
function calculatePrice() {
  const count = cart.length;

  // SHAPES pricing
  if (count === 1) return 39;
  if (count === 2) return 79;
  if (count === 3) return 109;
  if (count === 4) return 139;
  if (count >= 5) return 169;

  return 0;
}

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

// ================= BACK BUTTON =================
function goBack() {
  const order = document.getElementById("orderScreen").style.display === "block";
  const cartScreen = document.getElementById("cartScreen").style.display === "block";
  const customize = document.getElementById("customizeScreen").style.display === "flex";

  if (order) {
    showScreen("cartScreen");
    return;
  }

  if (cartScreen) {
    showScreen("customizeScreen");
    return;
  }

  if (customize) {
    showScreen("homeScreen");
    return;
  }
}

// ================= TOY SELECT =================
function selectToy(card, toy) {
  const img = card.querySelector("img")?.src || "";

  const index = cart.findIndex(i => i.name === toy);

  if (index !== -1) {
    cart.splice(index, 1);
    card.classList.remove("selected");
  } else {
    cart.push({ name: toy, img });
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

  let total = calculatePrice();

  if (cart.length === 0) {
    box.innerHTML = "<p>Your cart is empty 🛒</p>";
    document.getElementById("cartTotal").innerText = "Total: ₹0";
    return;
  }

  cart.forEach(item => {
    box.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" style="width:60px;height:60px;border-radius:10px;">
        <div style="flex:1">${item.name}</div>
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

  goToOrder();
}

// ================= CHECKOUT =================
function goToOrder() {
  if (cart.length === 0) {
    alert("Cart empty!");
    return;
  }

  showScreen("orderScreen");

  // update order screen
  document.getElementById("finalToy").innerText =
    "Items: " + cart.map(i => i.name).join(", ");

  const name = document.getElementById("customName")?.value || "";
  document.getElementById("finalName").innerText =
    name ? "Name: " + name : "";

  document.getElementById("price").innerText =
    "Total: ₹" + calculatePrice();
}

// ================= ORDER =================
function sendOrder() {
  let msg = "🛒 NEW ORDER\n\n";

  cart.forEach(item => {
    msg += `${item.name}\n`;
  });

  const name = document.getElementById("customName")?.value;
  if (name) msg += `\nName: ${name}`;

  msg += `\n\nTotal: ₹${calculatePrice()}`;

  window.open(
    "https://wa.me/919340489691?text=" + encodeURIComponent(msg),
    "_blank"
  );
}

// ================= NAME SECTION =================
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
