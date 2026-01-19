document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll(
    '.nav-link, .sp-nav-link, .nav-sp-link'
  );
  const sections = document.querySelectorAll('.main-section');

  const changePage = (targetId, pushState = true) => {
    // ナビの active
    navLinks.forEach(link => {
      link.classList.toggle(
        'is-active',
        link.getAttribute('href') === `#${targetId}`
      );
    });

    // メイン表示
    sections.forEach(section => {
      section.classList.toggle('is-active', section.id === targetId);
    });

    if (pushState) {
      history.pushState(null, '', `#${targetId}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 初期表示
  const init = () => {
    const hash = location.hash || '#page-home';
    changePage(hash.replace('#', ''), false);
  };

  init();

  // ナビクリック
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href.startsWith('#page-')) return;

      e.preventDefault();
      changePage(href.replace('#', ''));
    });
  });

  // 戻る・進む
  window.addEventListener('popstate', init);
});
