/**
 * タブ切り替えロジック
 */
function openTab(evt, tabName) {
  // 全コンテンツを非表示
  const contents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }

  // 全タブからactiveクラスを削除
  const links = document.getElementsByClassName("tab-link");
  for (let i = 0; i < links.length; i++) {
    links[i].classList.remove("active");
  }

  // 指定されたタブを表示
  const target = document.getElementById(tabName);
  if (target) {
    target.style.display = "block";
    evt.currentTarget.classList.add("active");
    
    // タブ切り替え時にページ上部へ戻る
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * トップに戻るボタン & スクロール監視
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const backToTopBtn = document.getElementById('back-to-top');
  
  // 300pxスクロールで表示
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});