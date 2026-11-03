(() => {
  'use strict';
  const key = 'sandPageZoom';
  let percent = 100;
  try {
    const saved = Number(localStorage.getItem(key));
    if ([100, 125, 150, 175, 200].includes(saved)) percent = saved;
  } catch (_) { /* The controls also work when storage is unavailable. */ }

  document.addEventListener('DOMContentLoaded', () => {
    const content = document.createElement('div');
    content.id = 'site-content';
    // Keep existing nodes and their event listeners, including photo dialogs.
    while (document.body.firstChild) content.append(document.body.firstChild);
    document.body.append(content);

    const controls = document.createElement('section');
    controls.className = 'quick-actions';
    controls.setAttribute('aria-label', '빠른 메뉴');
    controls.innerHTML = '<button type="button" class="quick-action" data-quick="cart" aria-haspopup="dialog"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M3 5h4l4 16h14l4-12H9M12 14h14M16 9v12M22 9v12"/><circle cx="13" cy="27" r="1.5"/><circle cx="24" cy="27" r="1.5"/></svg><span>장바구니</span></button><a class="quick-action" href="chatbot.html"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M6 5h20a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H14l-8 5v-5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z"/><path d="M9 12h14M9 17h9"/></svg><span>상담하기</span></a><button type="button" class="quick-action" id="page-size-toggle" data-quick="size" aria-expanded="false" aria-controls="page-size-panel"><span class="quick-size-mark" aria-hidden="true">가<span>+</span></span><span>크게보기</span></button><section class="page-size-controls" id="page-size-panel" aria-label="홈페이지 전체 크기 조절" hidden><button type="button" data-size="down" aria-label="홈페이지 전체 크기 25퍼센트 줄이기" title="화면 작게"><span class="page-size-glyph" aria-hidden="true">가<span>−</span></span></button><button type="button" data-size="reset" aria-label="홈페이지 전체 크기 100퍼센트로 되돌리기" title="눌러서 기본 크기로"><output aria-live="polite" aria-atomic="true"></output><span class="page-size-reset" aria-hidden="true">↺</span></button><button type="button" data-size="up" aria-label="홈페이지 전체 크기 25퍼센트 키우기" title="화면 크게"><span class="page-size-glyph" aria-hidden="true">가<span>+</span></span></button></section>';
    document.body.append(controls);
    const down = controls.querySelector('[data-size="down"]');
    const up = controls.querySelector('[data-size="up"]');
    const panel = controls.querySelector('#page-size-panel');
    const sizeToggle = controls.querySelector('#page-size-toggle');
    function closeSizePanel(focus) {
      panel.hidden = true;
      sizeToggle.setAttribute('aria-expanded', 'false');
      if (focus) sizeToggle.focus();
    }
    function apply() {
      content.style.zoom = String(percent / 100);
      content.style.setProperty('--page-scale', String(percent / 100));
      controls.querySelector('output').textContent = percent + '%';
      down.setAttribute('aria-disabled', String(percent === 100));
      up.setAttribute('aria-disabled', String(percent === 200));
      try { localStorage.setItem(key, String(percent)); } catch (_) {}
    }
    controls.addEventListener('click', (event) => {
      const action = event.target.closest('[data-quick]');
      if (action?.dataset.quick === 'cart') {
        closeSizePanel(false);
        document.dispatchEvent(new CustomEvent('sand:cart-open'));
        return;
      }
      if (action?.dataset.quick === 'size') {
        panel.hidden = !panel.hidden;
        sizeToggle.setAttribute('aria-expanded', String(!panel.hidden));
        if (!panel.hidden) up.focus();
        return;
      }
      const button = event.target.closest('button[data-size]');
      if (!button) return;
      percent = button.dataset.size === 'reset' ? 100 : Math.max(100, Math.min(200, percent + (button.dataset.size === 'up' ? 25 : -25)));
      apply();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !panel.hidden) closeSizePanel(true);
    });
    document.addEventListener('click', event => {
      if (!controls.contains(event.target)) closeSizePanel(false);
    });
    apply();
    // Keep anchor destinations below the header at any saved magnification.
    if (typeof window !== 'undefined') {
      const header = document.querySelector('.site-header');
      const updateOffset = () => {
        const sticky = header && window.getComputedStyle(header).position === 'sticky';
        document.documentElement.style.scrollPaddingTop = (sticky ? Math.ceil(header.getBoundingClientRect().height) + 16 : 16) + 'px';
      };
      updateOffset();
      if (header && typeof ResizeObserver !== 'undefined') new ResizeObserver(updateOffset).observe(header);
      window.addEventListener('resize', updateOffset);
      if (['#shop', '#reviews'].includes(window.location.hash)) {
        window.requestAnimationFrame(() => {
          updateOffset();
          document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
      }
    }
  });
})();
