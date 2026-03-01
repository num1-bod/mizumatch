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
      // ID指定で直接呼ばれた場合（初期表示やメニュー経由など）
      const targetButton = document.querySelector(`.tab-link[onclick*="${tabName}"]`);
      if (targetButton) {
        targetButton.classList.add("active");
      }
    }

    // 【修正ポイント】画面を一番上へ戻す処理をコメントアウトしました。
    // これにより、タブを切り替えても現在のスクロール位置が維持されます。
    // window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // 【修正ポイント】既にアクティブなタブ（activeクラス）がある場合は、初期化をスキップします。
  // これにより、スライド中にホームへ戻される現象を防ぎます。
  const activeTab = document.querySelector(".tab-link.active");
  if (!activeTab) {
    openTab(null, targetTabId);
  }
}

// ページ読み込み時に初期タブを設定
window.addEventListener('load', initTabs);

// 【修正ポイント】resizeイベントを無効化しました。
// スマホでスライド中にアドレスバーが消えたり出たりする際、ブラウザが「リサイズ」と判定して
// initTabsが走り、ホームに戻ってしまうバグを防ぐためです。
// window.addEventListener('resize', initTabs);

/**
 * メニュー内のリンクをクリックした時の自動処理
 */
document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('.side-menu-list a');
  
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // アコーディオンの見出しの場合はメニューを閉じない
      if (link.classList.contains('accordion-trigger')) {
        return;
      }

      const href = link.getAttribute('href');
      
      // hrefが空、もしくは「#」のみの場合は処理しない
      if (!href || href === '#') {
        return;
      }

      if (href.startsWith('#')) {
        e.preventDefault(); // デフォルトのページ内ジャンプを防止
        const targetId = href.substring(1);
        
        // タブ切り替え関数を実行
        openTab(e, targetId);
        
        // サイドメニューを閉じる（header-top.jsに依存）
        if (typeof toggleMenu === 'function') {
          toggleMenu();
        }
      }
    });
  });
});