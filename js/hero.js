const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const heroSlider = document.querySelector('.hero-slider');

const barContainer = document.querySelector('.slide-bar-container');
const bars = Array.from(barContainer.querySelectorAll('.slide-bar'));

const slideIntervalTime = 3000; // 自動スライド間隔
let currentIndex = 1;
let startX = 0, moveX = 0;
let autoSlideInterval;
let progressInterval;

const totalSlides = slides.length - 2; // cloneを除く本物スライド数

// --- バー更新 ---
function updateBars(progress = 0){
  bars.forEach((bar, idx) => {
    const fill = bar.querySelector('::after') || bar;
    if(idx === currentIndex - 1){
      // 現在スライドのみ進行度を反映
      bar.querySelector('::after')?.remove();
      const barFill = document.createElement('div');
      barFill.style.position = 'absolute';
      barFill.style.left = '0';
      barFill.style.top = '0';
      barFill.style.height = '100%';
      barFill.style.width = `${progress}%`;
      barFill.style.backgroundColor = 'var(--primary-color)';
      barFill.className = 'bar-fill';
      barFill.style.transition = 'width 0.1s linear';
      bar.innerHTML = '';
      bar.appendChild(barFill);
    } else {
      // 他スライドは灰色バーのみ
      bar.innerHTML = '';
      bar.style.backgroundColor = 'rgba(255,255,255,0.3)';
    }
  });
}

// --- スライド幅＋gap取得 ---
function getSlideWidth() {
  const style = window.getComputedStyle(slidesContainer);
  const gap = parseFloat(style.gap) || 0;
  return slides[0].offsetWidth + gap;
}

// --- 中央表示更新 ---
function updateSlider(animate = true) {
  slidesContainer.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
  const slideWidth = slides[0].offsetWidth;
  const containerWidth = heroSlider.offsetWidth;
  const gap = parseFloat(window.getComputedStyle(slidesContainer).gap) || 0;
  const offset = (containerWidth - slideWidth) / 2;

  slidesContainer.style.transform = `translateX(-${currentIndex * (slideWidth + gap) - offset}px)`;
  updateBars();
}

// --- 無限ループ補正 ---
function loopCheck() {
  if(currentIndex <= 0) currentIndex = slides.length - 2;
  if(currentIndex >= slides.length - 1) currentIndex = 1;
  updateSlider(false);
}

// --- 次/前スライド ---
function nextSlide() {
  currentIndex++;
  updateSlider();
  loopCheck();
  resetProgressBar();
}

function prevSlide() {
  currentIndex--;
  updateSlider();
  loopCheck();
  resetProgressBar();
}

// --- ボタン ---
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// --- スマホスワイプ ---
slidesContainer.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  stopAutoSlide();
});

slidesContainer.addEventListener('touchend', e => {
  moveX = e.changedTouches[0].clientX;
  const slideWidth = getSlideWidth();
  const threshold = slideWidth / 3;

  if(startX - moveX > threshold) nextSlide();
  else if(moveX - startX > threshold) prevSlide();

  startX = 0; moveX = 0;
  startAutoSlide();
});

// --- 自動スライド ---
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, slideIntervalTime);
  startProgressBar();
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
  stopProgressBar();
}

// --- 進行バーアニメーション ---
function startProgressBar() {
  let progress = 0;
  const intervalStep = 50;
  const increment = (intervalStep / slideIntervalTime) * 100;

  clearInterval(progressInterval);
  progressInterval = setInterval(() => {
    progress += increment;
    if(progress >= 100) progress = 100;
    updateBars(progress);
  }, intervalStep);
}

function resetProgressBar() {
  updateBars(0);
  startProgressBar();
}

function stopProgressBar() {
  clearInterval(progressInterval);
}

// --- 初期表示 + リサイズ ---
window.addEventListener('load', () => {
  updateSlider(false);
  startAutoSlide();
});

window.addEventListener('resize', () => updateSlider(false));
