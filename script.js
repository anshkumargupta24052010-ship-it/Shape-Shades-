/* ================= CONFIGS & RESETS ================= */
:root {
  --primary: #e05275;
  --primary-light: #f48fb1;
  --accent: #fcdad7;
  --bg-creamy: #fffafb;
  --text-dark: #4a4a4a;
  --shadow-soft: 0 8px 25px rgba(244, 143, 177, 0.12);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
  background: var(--bg-creamy);
  color: var(--text-dark);
  overflow-x: hidden;
}

/* ================= 🏠 HOME SCREEN ================= */
#homeScreen {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: url('images/homepageimage.jpeg') no-repeat center center;
  background-size: cover;
  z-index: 10;
}

.overlay {
  width: 100%;
  height: 100%;
  background: rgba(255, 245, 247, 0.78);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  text-align: center;
}

.main-heading {
  font-size: clamp(2.5rem, 6vw, 4.2rem);
  font-weight: 700;
  margin-bottom: 15px;
  color: var(--primary);
  letter-spacing: -1px;
  cursor: pointer;
}

.tagline {
  font-size: clamp(1rem, 3vw, 1.3rem);
  font-weight: 600;
  margin-bottom: 30px;
  color: #5c444a;
  line-height: 1.5;
}

.cta-btn {
  padding: 15px 45px;
  background: var(--primary);
  border-radius: 50px;
  border: none;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(224, 82, 117, 0.3);
  transition: all 0.3s ease;
}
.cta-btn:hover {
  transform: scale(1.04);
  background: var(--primary-light);
}

/* SCREEN TRANSITIONS */
.screen-fade-out {
  opacity: 0 !important;
  transform: scale(0.95) !important;
  transition: all 0.4s ease-in-out;
  pointer-events: none;
}
.screen-fade-in {
  animation: smoothScreenEntry 0.5s ease-out forwards;
}
@keyframes smoothScreenEntry {
  from { opacity: 0; transform: scale(1.05); }
  to { opacity: 1; transform: scale(1); }
}

/* ================= 🛠️ CUSTOMIZE SCREEN LAYER ================= */
#customizeScreen {
  display: flex; /* Flexbox implementation */
  width: 100vw;
  height: 100vh;
  background: var(--bg-creamy);
  position: relative;
  z-index: 5;
}

.sidebar {
  width: 130px;
  height: 100vh;
  background: #fff0f3;
  box-shadow: 3px 0 20px rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  gap: 15px;
}

.menu-item {
  width: 85%;
  text-align: center;
  padding: 12px 5px;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #7d5c64;
}
.menu-item.active {
  background: var(--primary);
  color: white;
  box-shadow: 0 6px 12px rgba(224, 82, 117, 0.2);
}

.content {
  flex: 1;
  height: 100vh;
  padding: 30px;
  overflow-y: auto;
  position: relative;
  padding-bottom: 120px;
}

/* TOYS GRID */
#toys {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  border-radius: 20px;
  padding: 12px;
  text-align: center;
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}
.card:hover { transform: translateY(-4px); }
.card.selected { border-color: var(--primary); background: #fff5f7; }
.card img { width: 100%; height: 115px; object-fit: cover; border-radius: 14px; }
.card p { margin: 8px 0 4px 0; font-weight: 700; font-size: 0.9rem; }

/* 🛒 BOTTOM ACTION BAR */
.bottom-bar {
  position: fixed;
  bottom: 20px;
  left: 160px;
  right: 30px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  border-radius: 20px;
  z-index: 99;
}
.bottom-bar button {
  padding: 12px 28px; border-radius: 50px;
  background: var(--primary); color: white; border: none; font-weight: 700; cursor: pointer;
}

/* 📱 PREVIEW PANEL (Fixes Image Explosion) */
.preview-panel {
  position: fixed;
  right: -380px;
  top: 0;
  width: 350px;
  height: 100vh;
  background: white;
  box-shadow: -5px 0 30px rgba(0,0,0,0.05);
  transition: right 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 100;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.preview-panel.active { right: 0; }
.preview-content img { width: 80%; max-height: 200px; object-fit: cover; border-radius: 20px; margin-bottom: 20px; box-shadow: var(--shadow-soft); }
.preview-content h3 { margin-bottom: 10px; color: var(--text-dark); }
.preview-content p { font-size: 0.9rem; color: #888; margin-bottom: 25px; }
.preview-content button { width: 100%; padding: 12px; margin-bottom: 10px; border-radius: 50px; border: none; font-weight: 700; cursor: pointer; background: var(--primary); color: white; }
.close-preview { position: absolute; top: 20px; left: 20px; font-size: 2rem; cursor: pointer; color: #aaa; }

/* UTILITIES */
.back-global-btn { position: absolute; top: 25px; right: 30px; padding: 8px 16px; border-radius: 12px; border: none; background: var(--accent); color: var(--primary); font-weight: 700; cursor: pointer; }
#nameSection { height: 60vh; display: none; align-items: center; justify-content: center; width: 100%; }
.name-box { background: white; padding: 35px; border-radius: 24px; box-shadow: var(--shadow-soft); text-align: center; width: 100%; max-width: 380px; }
.name-box input { padding: 12px; width: 100%; border-radius: 12px; border: 2px solid var(--accent); font-size: 1rem; text-align: center; font-weight: 700; outline: none; margin: 15px 0; }

/* CART & ORDER PAGES */
#cartScreen, #orderScreen { display: none; width: 100vw; min-height: 100vh; background: var(--bg-creamy); padding: 40px 20px; position: absolute; top: 0; left: 0; z-index: 20; }
.cart-container, .order-container { max-width: 480px; margin: 0 auto; padding: 30px; background: white; border-radius: 24px; box-shadow: var(--shadow-soft); position: relative; }
.cart-item { display: flex; align-items: center; justify-content: space-between; padding: 10px; border-bottom: 1px solid #ffeef2; margin-bottom: 10px; }
.action-btn { width: 100%; padding: 15px; border-radius: 50px; background: var(--primary); color: white; font-weight: 700; border: none; margin-top: 20px; cursor: pointer; }
.back-link { width: 100%; background: none; border: none; color: #888; font-weight: 600; margin-top: 15px; cursor: pointer; }
.form-group { margin: 15px 0; display: flex; flex-direction: column; text-align: left; }
.form-group select { padding: 10px; border-radius: 10px; border: 2px solid var(--accent); font-weight: 600; outline: none; }

/* ================= 📱 MOBILE UI ================= */
@media (max-width: 768px) {
  #customizeScreen { flex-direction: column-reverse; }
  .sidebar { width: 100%; height: 65px; flex-direction: row; justify-content: space-around; padding-top: 0; position: fixed; bottom: 0; left: 0; border-radius: 20px 20px 0 0; background: #fff; box-shadow: 0 -4px 20px rgba(0,0,0,0.05); z-index: 99; }
  .menu-item { width: auto; padding: 8px 16px; }
  .content { padding: 15px; padding-bottom: 160px; height: calc(100vh - 65px); }
  #toys { grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 12px; }
  .bottom-bar { left: 15px; right: 15px; bottom: 85px; padding: 10px 15px; }
  .preview-panel { right: -100%; width: 100%; height: 50vh; top: auto; bottom: -50vh; border-radius: 30px 30px 0 0; transition: bottom 0.4s ease; }
  .preview-panel.active { right: 0; bottom: 0; }
}
