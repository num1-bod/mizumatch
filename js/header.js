/* =========================
   要素取得
========================= */
const hamburger = document.getElementById("hamburger");
const navSp = document.getElementById("navSp");
const overlay = document.getElementById("overlay");
const colorPicker = document.getElementById("colorPicker");
const colorBtnIds = ["colorBtn", "colorBtnSpHeader", "colorBtnSpMenu"];

/* =========================
   メニュー開閉関数
========================= */
function openMenu() {
    hamburger.classList.add("active");
    navSp.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // 背景スクロール禁止
}

function closeMenu() {
    hamburger.classList.remove("active");
    navSp.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = ""; // 背景スクロール解除
}

/* =========================
   ハンバーガークリック
========================= */
hamburger.addEventListener("click", () => {
    if (navSp.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
});

/* =========================
   メニュー外タップで閉じる
========================= */
overlay.addEventListener("click", closeMenu);

/* =========================
   背景色変更ボタンクリック → カラーピッカー開く
========================= */
colorBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener("click", () => {
            colorPicker.click();
        });
    }
});

/* =========================
   カラーピッカー変更時
========================= */
colorPicker.addEventListener("input", () => {
    document.documentElement.style.setProperty("--bg-color", colorPicker.value);
});

/* =========================
   スマホメニュー内リンククリックで閉じる
========================= */
const navSpLinks = document.querySelectorAll(".nav-sp-list a");
navSpLinks.forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});
