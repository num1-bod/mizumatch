document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navSp = document.getElementById("navSp");
  const overlay = document.getElementById("overlay");
  const colorPicker = document.getElementById("colorPicker");
  const colorBtnIds = ["colorBtn", "colorBtnSpHeader", "colorBtnSpMenu"];

  function openMenu() {
    hamburger.classList.add("active");
    navSp.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    navSp.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (hamburger && navSp && overlay) {
    hamburger.addEventListener("click", () => {
      navSp.classList.contains("active") ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    // スマホメニューリンククリックで即閉じ
    document.querySelectorAll("#navSp .nav-sp-list a").forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();
        closeMenu();
        const targetId = link.getAttribute("href");
        if (targetId && targetId.startsWith("#")) {
          const targetElement = document.querySelector(targetId);
          targetElement?.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  // 背景色変更
  colorBtnIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn && colorPicker) btn.addEventListener("click", () => colorPicker.click());
  });

  if (colorPicker) {
    colorPicker.addEventListener("input", () => {
      document.documentElement.style.setProperty("--bg-color", colorPicker.value);
    });
  }
});
