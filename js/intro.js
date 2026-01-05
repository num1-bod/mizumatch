const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.js-animate').forEach((el, i) => {
        setTimeout(() => el.classList.add('is-visible'), i * 150);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

observer.observe(document.querySelector('.js-observe'));

function syncHeightPC() {
  const left = document.querySelector('.intro-image');
  const right = document.querySelector('.intro-text-area');

  if (window.innerWidth > 768) {
    right.style.height = left.offsetHeight + 'px';
  } else {
    right.style.height = 'auto';
  }
}

window.addEventListener('load', syncHeightPC);
window.addEventListener('resize', syncHeightPC);
