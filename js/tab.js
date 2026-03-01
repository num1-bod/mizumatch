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
    
    // 4. 強調表示（activeクラス）の付与
    if (evt && evt.currentTarget && evt.currentTarget.classList.contains('tab-link')) {
      evt.currentTarget.classList.add("active");
    } else {
      // ID指定で直接呼ばれた場合（初期表示など）にボタンを光らせる
      const targetButton = document.querySelector(`.tab-link[onclick*="${tabName}"]`);
      if (targetButton) {
        targetButton.classList.add("active");
      }
    }
    // 【バグ修正済み】勝手にトップへ戻る scrollTo は削除したままにします
  }
}

/**
 * 初期表示の制御（ここを修正しました）
 */
function initTabs() {
  const width = window.innerWidth;
  let targetTabId = "";
  
  // デバイスサイズに合わせて最初に開くタブIDを決定
  if (width > 1200) { targetTabId = "pc-tab1"; } 
  else if (width > 600) { targetTabId = "tablet-tab1"; } 
  else { targetTabId = "sp-tab1"; }

  // ページ読み込み時に、強制的に初期タブを表示する
  openTab(null, targetTabId);
}

// ページ読み込み完了時に実行
window.addEventListener('load', initTabs);

// スライド中のリセットを防ぐため、resize イベントはオフのままにします
// window.addEventListener('resize', initTabs);

/**
 * メニュー内のリンクをクリックした時の自動処理
 */
document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('.side-menu-list a');
  
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.classList.contains('accordion-trigger')) {
        return;
      }

      const href = link.getAttribute('href');
      if (!href || href === '#' || href === 'javascript:void(0);') {
        return;
      }

      if (href.startsWith('#')) {
        e.preventDefault(); 
        const targetId = href.substring(1);
        openTab(e, targetId);
        
        if (typeof toggleMenu === 'function') {
          toggleMenu();
        }
      }
    });
  });
});