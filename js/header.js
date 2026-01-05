const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const header = document.querySelector('.header');

function toggleMenu(){
  menuToggle.classList.toggle('active');
  mobileNav.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
}

menuToggle.addEventListener('click', toggleMenu);
mobileOverlay.addEventListener('click', toggleMenu);

window.addEventListener('scroll', ()=>{
  if(window.scrollY>50){ header.classList.add('shrink'); }
  else{ header.classList.remove('shrink'); }
});
