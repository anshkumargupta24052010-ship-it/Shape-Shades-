// ================= CONFIG & STATE =================
let cart = [];
let toysData = []; 

// ⚠️ APNI GOOGLE SHEET KI PUBLISHED CSV LINK YAHA PASTE KARNA KAL
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTFdylNEN0S_Xqc66-e1xiuHYPMT4C01N-bsTQ4k5VshHp6SEsYiOKQ03bik3wEh5pYcLNlIL3dzHTw/pub?output=csv'; 

// ================= FETCH DATA FROM GOOGLE SHEET =================
window.addEventListener('DOMContentLoaded', () => {
    fetchProductsFromSheet();
});

function fetchProductsFromSheet() {
    const toysGrid = document.getElementById('toys');
    
    if(!sheetURL || sheetURL.includes("YOUR_PUBLISHED_GOOGLE_SHEET")) {
        console.log("Using backup local data.");
        toysData = [
          { name: "Flowers", img: "images/flower.jpeg", price: 39 },
          { name: "Train", img: "images/trainengine.jpeg", price: 39 },
          { name: "Dinosaur", img: "images/dino.jpeg", price: 39 }
        ];
        renderToys();
        return;
    }

    Papa.parse(sheetURL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            toysData = results.data.filter(item => item.Name && item.Category === 'toys').map(item => {
                return { 
                    name: item.Name, 
                    img: item.Image.trim(), 
                    price: parseFloat(item.Price) || 39 
                };
            });
            renderToys();
        },
        error: function(err) {
            console.error("Sheet Loading Error:", err);
            if(toysGrid) toysGrid.innerHTML = "<p>Stock refresh karne mein dikkat aa rahi hai... 🧸</p>";
        }
    });
}

function renderToys() {
    const toysGrid = document.getElementById('toys');
    if(!toysGrid) return;
    toysGrid.innerHTML = ""; 
    
    if(toysData.length === 0) {
        toysGrid.innerHTML = "<p>No toys available right now ✨</p>";
        return;
    }

    toysData.forEach(product => {
        const cardHTML = `
            <div class="card" onclick="selectToy(this, '${product.name.replace(/'/g, "\\'")}', ${product.price})">
                <img src="${product.img}" alt="${product.name}">
                <p>${product.name}</p>
                <span style="font-size:0.8rem; font-weight:700; color:#e05275;">₹${product.price}</span>
            </div>
        `;
        toysGrid.innerHTML += cardHTML;
    });
}

// ================= SECRET ADMIN ACCESSIBILITY =================
let headingClicks = 0;
function triggerAdminCheck() {
    headingClicks++;
    if(headingClicks >= 5) {
        headingClicks = 0; 
        const password = prompt("Enter Secret Admin Password to Manage Products:");
        if(password === "SHAPESHADE2026") {
            alert("Access Granted! Opening Google Sheet Database...");
            window.open("https://docs.google.com/spreadsheets/", "_blank");
        } else if (password !== null) {
            alert("Wrong Password! Access Denied ❌");
        }
    }
}

// ================= DYNAMIC PRICING SYSTEM =================
function calculatePrice() {
  let totalToysPrice = 0;
  cart.forEach(item => { totalToysPrice += item.price; });
  const nameInput = document.getElementById("customName")?.value.trim() || "";
  if(nameInput.length > 0) { totalToysPrice += (nameInput.length * 30); }
  return totalToysPrice;
}

function updateNamePrice() {
    const name = document.getElementById("customName").value.trim();
    const feedback = document.getElementById("nameFeedback");
    if(name.length > 0) {
        feedback.innerText = `Custom blocks cost: ₹${name.length * 30} (${name.length} letters)`;
    } else {
        feedback.innerText = "";
    }
    updateFinalPrice();
}

function updateFinalPrice() {
    const totalPrice = calculatePrice();
    const priceEl = document.getElementById("price");
    if(priceEl) priceEl.innerText = "Total: ₹" + totalPrice;
}

// ================= SCREEN CONTROL & ANIMATIONS =================
function showScreen(screenId) {
  const screens = ["homeScreen", "customizeScreen", "cartScreen", "orderScreen"];
  screens.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  const target = document.getElementById(screenId);
  if(screenId === "customizeScreen") {
      target.style.display = "flex";
  } else {
      target.style.display = "block";
  }
  closePreview();
}

function openCustomize() {
  const home = document.getElementById("homeScreen");
  const customize = document.getElementById("customizeScreen");

  if (home && customize) {
    home.style.display = "none";
    customize.style.display = "flex"; 
    closePreview();
  }
}

function goBack() {
  const order = document.getElementById("orderScreen").style.display === "block";
  const cartScreen = document.getElementById("cartScreen").style.display === "block";
  const customize = document.getElementById("customizeScreen").style.display === "flex";

  if (order) { showScreen("cartScreen"); return; }
  if (cartScreen) { showScreen("customizeScreen"); return; }
  if (customize) { 
      showScreen("homeScreen"); 
  }
}

// ================= TOY SELECT & CART =================
function selectToy(card, toyName, toyPrice) {
  const img = card.querySelector("img")?.src || "";
  const index = cart.findIndex(i => i.name === toyName);

  if (index !== -1) {
    cart.splice(index, 1);
    card.classList.remove("selected");
    document.getElementById("selectedToy").innerText = "No Toy Selected";
    closePreview();
  } else {
    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
    cart = [{ name: toyName, img, price: toyPrice }];
    card.classList.add("selected");
    document.getElementById("selectedToy").innerText = "Selected: " + toyName;
    updatePreview(toyName, img, toyPrice);
  }
  updateCartCount();
}

function updatePreview(name, img, price) {
  const panel = document.getElementById("previewPanel");
  document.getElementById("previewTitle").innerText = name;
  document.getElementById("previewText").innerText = `Rate: ₹${price} | Added to sequence layout.`;
  document.getElementById("previewImg").src = img;
  panel.classList.add("active");
}

// UTILS
function closePreview() { document.getElementById("previewPanel")?.classList.remove("active"); }
function updateCartCount() { document.getElementById("cartCount").innerText = cart.length; }
function addToCart() { alert("Added to Design Cart 🛒"); closePreview(); }
function buyNow() { goToOrder(); }
function showCart() { showScreen("cartScreen"); renderCart(); }

function renderCart() {
  const box = document.getElementById("cartItems");
  box.innerHTML = "";
  let total = calculatePrice();

  if (cart.length === 0) {
    box.innerHTML = "<p style='text-align:center; color:#888;'>Your cart is empty 🛒</p>";
    document.getElementById("cartTotal").innerText = "Total: ₹0";
    return;
  }

  cart.forEach((item, idx) => {
    box.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" style="width:50px;height:50px;border-radius:8px;object-fit:cover;">
        <div style="flex:1; font-weight:600; color:#444; margin-left:10px;">${item.name} (₹${item.price})</div>
        <button onclick="removeItem(${idx})" style="background:none; border:none; color:#ff6a9e; cursor:pointer; font-size:18px;">×</button>
      </div>
    `;
  });
  document.getElementById("cartTotal").innerText = "Total: ₹" + total;
}

function removeItem(idx) {
    cart.splice(idx, 1);
    document.querySelectorAll('.card').forEach(card => card.classList.remove('selected'));
    updateCartCount();
    renderCart();
}

function goToOrder() {
  const name = document.getElementById("customName")?.value.trim() || "";
  if (cart.length === 0 && name.length === 0) { alert("Cart empty! Please select a toy or enter a custom name."); return; }

  showScreen("orderScreen");
  document.getElementById("finalToy").innerText = cart.length > 0 ? "Toys Selected: " + cart.map(i => `${i.name} (₹${i.price})`).join(", ") : "No Toys Selected";
  document.getElementById("finalName").innerText = name ? "Custom Name Requested: " + name : "No Custom Name Package";
  updateFinalPrice();
}

// WHATSAPP OUTFLOW
function sendOrder() {
  const name = document.getElementById("customName")?.value.trim();
  let msg = "✨ 🛒 NEW ORDER FROM WEBSITE 🎨 ✨\n\n";
  
  if(cart.length > 0) {
      msg += `*Selected Toys:* \n`;
      cart.forEach((item, index) => { msg += `${index + 1}. ${item.name} - ₹${item.price}\n`; });
  }
  if (name) msg += `\n*Custom Name Blocks:* ${name} (₹${name.length * 30})\n`;
  const type = document.getElementById("orderType").value;
  msg += `*Kit Pack Option:* ${type.toUpperCase()}\n`;
  msg += `\n*Estimated Bill Total:* ₹${calculatePrice()}`;

  window.open("https://wa.me/918109944185?text=" + encodeURIComponent(msg), "_blank");
}

function showSection(section, btn) {
  const toys = document.getElementById("toys");
  const name = document.getElementById("nameSection");
  document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
  btn.classList.add('active');
  if (section === "toys") { toys.style.display = "grid"; name.style.display = "none"; }
  if (section === "nameSection") { toys.style.display = "none"; name.style.display = "flex"; }
}
