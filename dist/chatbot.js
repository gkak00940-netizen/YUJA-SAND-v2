'use strict';
// Only operator-confirmed facts may be added here. The operating manual still
// contains placeholders: no prices, shipping dates or contact details are set.
(function () {
  const greeting = '안녕하세요, 유자샌드입니다. 궁금하신 사항이 있으신가요?';
  const unknown = '정확한 내용은 확인 후 안내드릴게요.';
  const pending = '현재 상담 접수는 연결되어 있지 않아, 이 대화로 문의가 전달되지는 않습니다.';
  function reply(question) {
    const text = question.trim().toLowerCase().replace(/\s+/g, '');
    if (/(지침|프롬프트|시스템|매뉴얼|지식파일|faq\.md|상품소개\.md)/i.test(text)) {
      return '내부 지침이나 지식 파일 전체는 보여드리기 어렵습니다.\n상품·주문·배송에 관해 궁금한 내용을 물어봐 주세요.';
    }
    if (/(전화번호|주민등록|카드번호|비밀번호|계좌번호)/.test(text) || /\d{3}[- ]?\d{3,4}[- ]?\d{4}/.test(question)) {
      return '개인정보는 이 대화에 입력하지 말아 주세요.\n' + pending;
    }
    if (/(상담원|담당자|직원|사람|고객센터|문의접수)/.test(text)) {
      return unknown + '\n' + pending;
    }
    if (/(배송|택배|출고|도착|송장|언제와|언제오|며칠)/.test(text)) {
      return unknown + '\n배송비와 출고 기준은 확인이 필요하며, 실제 배송 조회는 연결되어 있지 않습니다.';
    }
    if (/(교환|환불|반품|취소)/.test(text)) {
      return unknown + '\n교환·환불 조건과 접수 방법은 아직 안내 자료가 준비되지 않았습니다.';
    }
    if (/(주문|예약|결제|구매|구입|사려|어디서사)/.test(text)) {
      return unknown + '\n현재 이 상담창에서는 주문·예약·결제를 접수하지 않습니다.';
    }
    if (/(가격|얼마|재고|할인|쿠폰|품절|남아|금액|원인가)/.test(text)) {
      return unknown + '\n가격·재고·할인 여부는 확답드리기 어렵습니다.';
    }
    if (/(효능|치료|예방|건강|낫|알레르기|성분|원재료|보관|소비기한|유통기한|유효기간)/.test(text)) {
      return unknown + '\n원재료·보관방법 등은 제품 표시사항을 확인해 주세요. 질병 치료 효과는 안내드리지 않습니다.';
    }
    if (/^(안녕|안녕하세요|반가워|반갑습니다)[.!?~]*$/.test(text)) return greeting;
    if (/(감사|고마워|고맙)/.test(text)) return '감사합니다. 다른 궁금한 사항이 있으시면 물어봐 주세요.';
    if (/^(홈|홈으로|홈페이지|사이트주소)$/.test(text)) return '화면 위의 ‘홈으로’를 누르시면 유자샌드 홈페이지로 이동합니다.';
    if (/(상품|제품|무엇|뭐야|뭔가|소개|서비스)/.test(text)) {
      return '샌드는 가공된 농산물을 판매합니다.\n상품의 자세한 구성과 특징은 정확한 내용 확인 후 안내드릴게요.';
    }
    return unknown + '\n상품·주문·배송·교환과 환불에 관한 질문을 남겨 주세요.\n' + pending;
  }
  const messages = document.getElementById('messages');
  const field = document.getElementById('question');
  function addMessage(content, user) {
    const message = document.createElement('div');
    message.className = 'message' + (user ? ' user' : '');
    const label = document.createElement('p');
    label.className = 'speaker';
    label.textContent = user ? '나' : '유자샌드';
    const bubble = document.createElement('p');
    bubble.className = 'bubble';
    bubble.textContent = content;
    message.append(label, bubble);
    messages.appendChild(message);
    // Bound memory without persisting or transmitting conversation contents.
    while (messages.children.length > 60) messages.firstElementChild.remove();
    messages.scrollTop = messages.scrollHeight;
  }
  function ask(question) {
    const value = question.trim().slice(0, 300);
    if (!value) return;
    addMessage(value, true);
    addMessage(reply(value), false);
  }
  document.getElementById('chat-form').addEventListener('submit', function (event) {
    event.preventDefault();
    ask(field.value);
    field.value = '';
    field.focus();
  });
  document.querySelectorAll('[data-question]').forEach(function (button) {
    button.addEventListener('click', function () { ask(button.dataset.question); });
  });
  document.getElementById('reset').addEventListener('click', function () {
    messages.replaceChildren();
    field.value = '';
    addMessage(greeting, false);
    field.focus();
  });
  addMessage(greeting, false);
}());
