document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('[data-board]');
  if (!board) return;
  const panels = ['list', 'write', 'preview'];
  const form = board.querySelector('form');
  let hasPreview = false;
  function route(focus) {
    let selected = window.location.hash.slice(1);
    if (!panels.includes(selected) || (selected === 'preview' && !hasPreview)) selected = 'list';
    panels.forEach(id => { document.getElementById(id).hidden = id !== selected; });
    if (focus) {
      const target = selected === 'write' ? document.getElementById('post-title') : board.querySelector('h1');
      if (selected !== 'write') target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  }
  window.addEventListener('hashchange', () => route(true));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const title = form.elements.namedItem('title');
    const content = form.elements.namedItem('content');
    for (const field of [title, content]) {
      field.setCustomValidity(field.value.trim() ? '' : '내용을 입력해 주세요.');
      if (!field.reportValidity()) return;
    }
    board.querySelector('[data-preview-title]').textContent = title.value.trim();
    board.querySelector('[data-preview-content]').textContent = content.value.trim();
    const writer = form.elements.namedItem('writer');
    const byline = board.querySelector('[data-preview-writer]');
    byline.textContent = writer?.value.trim() || '';
    byline.hidden = !byline.textContent;
    hasPreview = true;
    window.location.hash = 'preview';
  });
  form.addEventListener('input', event => { if (event.target.setCustomValidity) event.target.setCustomValidity(''); });
  route(false);
});
