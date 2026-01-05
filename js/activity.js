(() => {
  const track = document.querySelector('.ar-track');
  const indicator = document.querySelector('.ar-progress-indicator');
  const progressBar = document.querySelector('.ar-progress-bar');
  const cards = Array.from(track.querySelectorAll('.ar-card'));
  const arPrev = document.querySelector('.ar-prev');
  const arNext = document.querySelector('.ar-next');

  let currentTranslate = 0;
  let cardWidth = 0;
  const gap = 16;

  function updateSizes() {
    const sliderWidth = track.parentElement.offsetWidth;
    const visibleCards = window.innerWidth <= 768 ? 1.5 : 3.5;
    cardWidth = (sliderWidth - gap * (visibleCards - 1)) / visibleCards;

    cards.forEach(card => {
      card.style.width = `${cardWidth}px`;
      const img = card.querySelector('.ar-image');
      if(img) img.style.height = `${cardWidth}px`;
    });

    clampTranslate();
    setPosition();
    updateButtons();
  }

  function clampTranslate() {
    const min = track.parentElement.offsetWidth - track.scrollWidth;
    if(currentTranslate < min) currentTranslate = min;
    if(currentTranslate > 0) currentTranslate = 0;
  }

  function setPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
    const progressPercent = -currentTranslate / (track.scrollWidth - track.parentElement.offsetWidth);
    const maxLeft = progressBar.offsetWidth - indicator.offsetWidth;
    smoothMoveIndicator(progressPercent * maxLeft);
    updateButtons();
  }

  let targetLeft = 0;
  let rafId;
  function smoothMoveIndicator(left){
    targetLeft = left;
    if(!rafId) animateIndicator();
  }

  function animateIndicator(){
    const currentLeft = parseFloat(indicator.style.left) || 0;
    const diff = targetLeft - currentLeft;
    if(Math.abs(diff) < 0.1){
      indicator.style.left = `${targetLeft}px`;
      rafId = null;
      return;
    }
    indicator.style.left = `${currentLeft + diff * 0.2}px`;
    rafId = requestAnimationFrame(animateIndicator);
  }

  function updateButtons() {
    if(window.innerWidth <= 768){
      arPrev.style.display = 'none';
      arNext.style.display = 'none';
      return;
    }
    const minTranslate = track.parentElement.offsetWidth - track.scrollWidth;
    arPrev.style.display = currentTranslate >= 0 ? 'none' : 'flex';
    arNext.style.display = currentTranslate <= minTranslate ? 'none' : 'flex';
  }

  // ドラッグ
  let startX = 0, isDragging = false;
  function dragStart(x) { isDragging = true; startX = x; track.style.transition = 'none'; }
  function dragMove(x){
    if(!isDragging) return;
    const delta = x - startX;
    currentTranslate += delta;
    clampTranslate();
    startX = x;
    setPosition();
  }
  function dragEnd(){ isDragging = false; track.style.transition = 'transform 0.3s ease-out'; }

  track.addEventListener('mousedown', e=>dragStart(e.clientX));
  track.addEventListener('mousemove', e=>dragMove(e.clientX));
  track.addEventListener('mouseup', dragEnd);
  track.addEventListener('mouseleave', dragEnd);
  track.addEventListener('touchstart', e=>dragStart(e.touches[0].clientX));
  track.addEventListener('touchmove', e=>dragMove(e.touches[0].clientX));
  track.addEventListener('touchend', dragEnd);

  arPrev.addEventListener('click', ()=>{
    currentTranslate += cardWidth + gap;
    clampTranslate();
    track.style.transition='transform 0.3s ease-out';
    setPosition();
  });

  arNext.addEventListener('click', ()=>{
    currentTranslate -= cardWidth + gap;
    clampTranslate();
    track.style.transition='transform 0.3s ease-out';
    setPosition();
  });

  // プログレスバー
  let progressDragging = false;
  let dragOffsetX = 0;

  function progressDragStart(e){
    progressDragging = true;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const rect = indicator.getBoundingClientRect();
    dragOffsetX = clientX - rect.left;
    track.style.transition = 'none';
  }

  function progressDragMove(e){
    if(!progressDragging) return;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const barRect = progressBar.getBoundingClientRect();
    let newLeft = clientX - barRect.left - dragOffsetX;
    const maxLeft = barRect.width - indicator.offsetWidth;
    if(newLeft < 0) newLeft = 0;
    if(newLeft > maxLeft) newLeft = maxLeft;

    const percent = newLeft / maxLeft;
    currentTranslate = -percent * (track.scrollWidth - track.parentElement.offsetWidth);
    setPosition();
  }

  function progressDragEnd(){
    progressDragging = false;
    track.style.transition = 'transform 0.3s ease-out';
  }

  indicator.addEventListener('mousedown', progressDragStart);
  window.addEventListener('mousemove', progressDragMove);
  window.addEventListener('mouseup', progressDragEnd);
  indicator.addEventListener('touchstart', progressDragStart);
  window.addEventListener('touchmove', progressDragMove);
  window.addEventListener('touchend', progressDragEnd);

  window.addEventListener('resize', updateSizes);

  updateSizes();
})();
