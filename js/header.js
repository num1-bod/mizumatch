/* =========================
   要素取得
========================= */
const hamburger = document.getElementById("hamburger");
const navSp = document.getElementById("navSp");
const overlay = document.getElementById("overlay");
const colorPicker = document.getElementById("colorPicker");
const colorBtnIds = ["colorBtn", "colorBtnSpHeader", "colorBtnSpMenu"];

/* =========================
   メニュー開閉
========================= */
function openMenu() {
  hamburger.classList.add("active");
  navSp.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  hamburger.classList.remove("active");
  navSp.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

/* =========================
   ハンバーガー
========================= */
hamburger.addEventListener("click", () => {
  navSp.classList.contains("active") ? closeMenu() : openMenu();
});

overlay.addEventListener("click", closeMenu);

/* =========================
   背景色変更
========================= */
colorBtnIds.forEach(id => {
  const btn = document.getElementById(id);
  btn?.addEventListener("click", () => colorPicker.click());
});

colorPicker.addEventListener("input", () => {
  document.documentElement.style.setProperty("--bg-color", colorPicker.value);
});

/* =========================
   スマホメニュー内リンク
========================= */
document.querySelectorAll(".nav-sp-list a").forEach(link => {
  link.addEventListener("click", closeMenu);
});
