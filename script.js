// ================= STATE =================
let cart = [];
let selectedPrice = 199;

// ================= SCREEN NAV =================
function openCustomize() {
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("customizeScreen").style.display = "flex";
}

function goHome() {
  closePreview();
  document.getElementById("customizeScreen").style.display = "none";
  document.getElementById("orderScreen").style.display = "none";
  document.getElementById("cartScreen").style.display = "none";
  document.getElementById("homeScreen").style.display = "block";
}

// ================= TOY SELECT (MULTI CART) =================
function selectToy(card, toy) {
  const img = card.querySelector("img")?.src || "";

  const index = cart.findIndex(i => i.name === toy);

  if (index !== -1) {
    cart.splice(index, 1);
    card.classList.remove("selected");
  } else {
    cart.push({
      name: toy,
      price: selectedPrice,
      img: img
    });
    card.classList.add("selected");
  }

  updateCartCount();
  updatePreview(toy, img);
}

// ================= PREVIEW =================
function updatePreview(name, img) {
  const panel = document.getElementById("previewPanel");
  const title = document.getElementById("previewTitle");
  const text = document.getElementById("previewText");
  const image = document.getElementById("previewImg");

  if (!panel) return;

  panel.classList.add("active");

  if (title) title.innerText = name;
  if (text) text.innerText = "Selected: " + name;
  if (image) image.src = img;
}

// ================= CLOSE PREVIEW =================
function closePreview() {
  document.getElementById("previewPanel")?.classList.remove("active");
}

// ================= CART COUNT =================
function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (el) el.innerText = cart.length;
}

// ================= ADDITIONAL ADD BUTTON (OPTIONAL) =================
function addToCart() {
  updateCartCount();
  alert("Added to Cart 🛒");
}

// ================= SHOW CART =================
function showCart() {
  closePreview();

  document.getElementById("customizeScreen").style.display = "none";
  document.getElementById("cartScreen").style.display = "block";

  renderCart();
}

// ================= RENDER CART =================
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
        <img src="${item.img}" style="width:60px;height:60px;object-fit:cover;border-radius:10px;">
        <div style="flex:1;">${item.name}</div>
        <div>₹${item.price}</div>
      </div>
    `;
  });

  document.getElementById("cartTotal").innerText = "Total: ₹" + total;
}

// ================= BUY NOW =================
function buyNow() {
  if (cart.length === 0) {
    alert("Select items first!");
    return;
  }

  document.getElementById("customizeScreen").style.display = "none";
  document.getElementById("orderScreen").style.display = "block";

  closePreview();
}

// ================= ORDER TO WHATSAPP =================
function sendOrder() {
  let msg = "🛒 NEW ORDER\n\n";

  let total = 0;

  cart.forEach(item => {
    msg += `${item.name} - ₹${item.price}\n`;
    total += item.price;
  });

  msg += `\nTotal: ₹${total}`;

  let phone = "917869748842";

  window.open(
    "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg),
    "_blank"
  );
}
