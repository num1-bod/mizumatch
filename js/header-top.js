/**
 * ハンバーガーメニューの開閉制御
 */
function toggleMenu() {
  const menu = document.getElementById('side-menu');
  const overlay = document.getElementById('menu-overlay');
  const trigger = document.getElementById('menu-trigger');

  if (!menu || !overlay || !trigger) return;

  // activeクラスを切り替えてCSSアニメーションを発動
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
  trigger.classList.toggle('active');

  // メニューが開いているときは背面のスクロールを禁止
  if (menu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}
