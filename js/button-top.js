/**
 * トップへ戻るボタンの表示制御
 */
window.addEventListener('scroll', function() {
  const backToTopBtn = document.getElementById('backToTop');
  
  // 300px以上スクロールしたら 'is-show' クラスを追加、それ以外は削除
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('is-show');
  } else {
    backToTopBtn.classList.remove('is-show');
  }
});