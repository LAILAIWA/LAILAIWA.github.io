/* global NexT, CONFIG, Pjax */

const pjax = new Pjax({
  selectors: [
    'head title',
    'script[type="application/json"]',
    '.main-inner',
    '.post-toc-wrap',
    '.languages',
    '.pjax'
  ],
  analytics: false,
  cacheBust: false,
  scrollTo : !CONFIG.bookmark.enable
});

document.addEventListener('pjax:success', () => {
  pjax.executeScripts(document.querySelectorAll('script[data-pjax]'));
  NexT.boot.refresh();
  // Define Motion Sequence & Bootstrap Motion.
  if (CONFIG.motion.enable) {
    NexT.motion.integrator
      .init()
      .add(NexT.motion.middleWares.subMenu)
      .add(NexT.motion.middleWares.postList)
      .bootstrap();
  }
  const hasTOC = document.querySelector('.post-toc');
  document.querySelector('.sidebar-inner').classList.toggle('sidebar-nav-active', hasTOC);
  document.querySelector(hasTOC ? '.sidebar-nav-toc' : '.sidebar-nav-overview').click();
  NexT.utils.updateSidebarPosition();
});

$(document).on('pjax:start', function () {
  if (window.aplayers) {
      for (let i = 0; i < window.aplayers.length; i++) {
          window.aplayers[i].destroy();
      }
      window.aplayers = [];
  }
});