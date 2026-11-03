document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('footer');
  const footerText = footer?.textContent || '';
  const match = footerText.match(/(?:전화|연락처)\s*:\s*(0[\d -]{7,18}\d)/);
  if (!match) return;
  const phone = match[1].trim();
  const hours = Array.from(footer.querySelectorAll('p')).find(p => p.textContent.trim().startsWith('영업시간:'));
  const example = footerText.includes(phone + ' (예시)');
  const dialog = document.createElement('dialog');
  dialog.className = 'phone-order-dialog';
  dialog.setAttribute('aria-labelledby', 'phone-order-title');
  dialog.innerHTML = '<button type="button" class="phone-order-close" aria-label="전화주문 창 닫기">×</button><p class="phone-order-kicker">SAND · 전화주문</p><h2 id="phone-order-title">전화로 주문하세요</h2><p>원하시는 상품과 수량을 말씀해 주세요.</p><p class="phone-order-number"></p><p class="phone-order-hours"></p><p class="phone-order-example" hidden>푸터에 안내된 예시 연락처입니다.</p><a class="phone-order-call">전화 걸기 <span aria-hidden="true">↗</span></a><p class="phone-order-help">전화 연결 기능이 있는 기기에서 이용할 수 있습니다.</p>';
  dialog.querySelector('.phone-order-number').textContent = phone;
  const hoursText = dialog.querySelector('.phone-order-hours');
  hoursText.textContent = hours?.textContent.trim() || '';
  hoursText.hidden = !hours;
  dialog.querySelector('.phone-order-example').hidden = !example;
  const call = dialog.querySelector('.phone-order-call');
  call.href = 'tel:' + phone.replace(/[^\d+]/g, '');
  call.setAttribute('aria-label', phone + '로 전화 걸기');
  (document.querySelector('#site-content') || document.body).append(dialog);
  document.addEventListener('sand:phone-open', () => dialog.showModal());
  dialog.querySelector('.phone-order-close').onclick = () => dialog.close();
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
});
