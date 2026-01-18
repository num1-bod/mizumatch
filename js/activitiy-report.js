/* ===============================
   要素取得
================================ */
const slider = document.getElementById("activitySlider");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

/* ===============================
   スクロール量を計算
   → カード1枚＋余白分スクロール
================================ */
function getScrollAmount() {
  const card = slider.querySelector(".activity-card");
  const gap = 24; // CSSのgapと同じ値
  return card.offsetWidth + gap;
}

/* ===============================
   ボタンの表示・非表示制御
================================ */
function updateButtons() {
  const maxScroll =
    slider.scrollWidth - slider.clientWidth - 1;

  // 左端なら「前へ」を隠す
  if (slider.scrollLeft <= 0) {
    prevBtn.classList.add("is-hidden");
  } else {
    prevBtn.classList.remove("is-hidden");
  }

  // 右端なら「次へ」を隠す
  if (slider.scrollLeft >= maxScroll) {
    nextBtn.classList.add("is-hidden");
  } else {
    nextBtn.classList.remove("is-hidden");
  }
}

/* ===============================
   ボタン操作
================================ */
prevBtn.addEventListener("click", () => {
  slider.scrollBy({
    left: -getScrollAmount(),
    behavior: "smooth"
  });
});

nextBtn.addEventListener("click", () => {
  slider.scrollBy({
    left: getScrollAmount(),
    behavior: "smooth"
  });
});

/* ===============================
   イベント監視
================================ */
slider.addEventListener("scroll", updateButtons);
window.addEventListener("resize", updateButtons);

/* 初期状態を反映 */
updateButtons();
