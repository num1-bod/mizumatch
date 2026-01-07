const hero = document.getElementById("hero");
const heroSize = document.getElementById("heroSize");

function updateHeroSize() {
    const width = Math.round(hero.clientWidth);
    const height = Math.round(hero.clientHeight);
    heroSize.textContent = `${width}px × ${height}px`;
}

// 初回表示
updateHeroSize();

// 画面サイズ変更時にも更新
window.addEventListener("resize", updateHeroSize);
