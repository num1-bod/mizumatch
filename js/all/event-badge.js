document.addEventListener('DOMContentLoaded', () => {
  const badge = document.querySelector('.floating-event-badge');
  if (!badge) return;

  // 読み込み後に少しだけ演出
  requestAnimationFrame(() => {
    badge.classList.add('is-visible');
  });
});
