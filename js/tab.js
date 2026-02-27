/**
 * タブ切り替えと強調表示の制御
 */
function openTab(evt, tabName) {
  // 1. 全てのコンテンツを非表示にする
  const contents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }

  // 2. 全てのタブボタンから active クラスを解除
  const allLinks = document.querySelectorAll(".tab-link");
  allLinks.forEach(link => link.classList.remove("active"));

  // 3. 指定されたコンテンツを表示
  const target = document.getElementById(tabName);
  if (target) {
    target.style.display = "block";
    
    // 4. 強調表示の連動
    if (evt && evt.currentTarget && evt.currentTarget.classList.contains('tab-link')) {
      evt.currentTarget.classList.add("active");
    } else {
      const targetButton = document.querySelector(`.tab-link[onclick*="${tabName}"]`);
      if (targetButton) {
        targetButton.classList.add("active");
      }
    }

    // 画面を一番上へ戻す
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * 初期表示の制御
 */
function initTabs() {
  const width = window.innerWidth;
  let targetTabId = "";
  if (width > 1200) { targetTabId = "pc-tab1"; } 
  else if (width > 600) { targetTabId = "tablet-tab1"; } 
  else { targetTabId = "sp-tab1"; }

  openTab(null, targetTabId);
}

window.addEventListener('load', initTabs);
window.addEventListener('resize', initTabs);

/**
 * メニュー内のリンクをクリックした時の自動処理
 * 修正ポイント：アコーディオン見出しの場合はメニューを閉じないように変更
 */
document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('.side-menu-list a');
  
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // クリックされた要素が「アコーディオンの見出し」なら何もしない
      if (link.classList.contains('accordion-trigger')) {
        return;
      }

      const href = link.getAttribute('href');
      
      // hrefが空、もしくは単なる「#」だけの場合は処理しない
      if (!href || href === '#') {
        return;
      }

      if (href.startsWith('#')) {
        e.preventDefault(); // デフォルトのジャンプを防止
        const targetId = href.substring(1);
        
        // タブ切り替え関数を実行
        openTab(e, targetId);
        
        // サイドメニューを閉じる（header-top.jsの関数）
        if (typeof toggleMenu === 'function') {
          toggleMenu();
        }
      }
    });
  });
});