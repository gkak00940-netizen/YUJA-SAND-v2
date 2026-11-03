document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.createElement('dialog');
  dialog.className = 'shared-cart-dialog';
  dialog.setAttribute('aria-labelledby', 'shared-cart-title');
  dialog.innerHTML = '<button type="button" class="shared-cart-close" aria-label="장바구니 닫기">×</button><h2 id="shared-cart-title">장바구니</h2><p>고흥 유자 샌드 · 20개입 <strong data-cart-quantity></strong></p><p>상품 합계 <strong data-cart-total></strong></p><p class="shared-cart-note">실제 주문과 결제는 결제 수단 연결 후 이용할 수 있습니다.</p><a class="shared-cart-link" href="index.html#shop">상품 보러 가기</a>';
  const parent = document.querySelector('#site-content') || document.body;
  parent.append(dialog);
  function refresh() {
    let quantity = 0;
    try { quantity = Number(localStorage.getItem('sandCart') || 0); } catch (_) {}
    if (!Number.isFinite(quantity) || quantity < 0) quantity = 0;
    quantity = Math.floor(quantity);
    dialog.querySelector('[data-cart-quantity]').textContent = quantity + '박스';
    dialog.querySelector('[data-cart-total]').textContent = (quantity * 12000).toLocaleString('ko-KR') + '원';
  }
  document.addEventListener('sand:cart-open', () => {
    refresh();
    document.querySelector('#menu')?.classList.remove('open');
    const toggle = document.querySelector('.toggle');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', '메뉴 열기');
    dialog.showModal();
  });
  dialog.querySelector('.shared-cart-close').onclick = () => dialog.close();
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  window.addEventListener('pageshow', refresh);
  window.addEventListener('storage', refresh);
  refresh();
});
