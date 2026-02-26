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
    // 直接タブボタンが押された場合 (evtがある場合)
    if (evt && evt.currentTarget && evt.currentTarget.classList.contains('tab-link')) {
      evt.currentTarget.classList.add("active");
    } else {
      // メニュー経由など、ボタン以外から呼ばれた場合は対応するボタンを探して光らせる
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
  // 初期化時はevtをnullにして呼び出す
  let targetTabId = "";
  if (width > 1200) { targetTabId = "pc-tab1"; } 
  else if (width > 600) { targetTabId = "tablet-tab1"; } 
  else { targetTabId = "sp-tab1"; }

  openTab(null, targetTabId);
}

// 読み込み時とリサイズ時に実行
window.addEventListener('load', initTabs);
window.addEventListener('resize', initTabs);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * メニュー内のリンクをクリックした時の自動処理
 * これにより href="#id" と書くだけでタブ切り替え・強調・メニュー閉じが連動します
 */
document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('.side-menu-list a');
  
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href && href.startsWith('#')) {
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