# 유자샌드 홈페이지 버전3

현재 버전은 **3.0.0**입니다. 버전2 홈페이지에 상담봇 전용 페이지와 오른쪽 ‘상담하기’ 메뉴를 추가했습니다.

- [홈페이지](https://gkak00940-netizen.github.io/YUJA-SAND-v2/)
- [유자샌드 상담봇](https://gkak00940-netizen.github.io/YUJA-SAND-v2/chatbot.html)
- [버전3 변경 내용](VERSION3.md)
- [상담봇 안내](CHATBOT.md)

## 확인과 수정

`dist/index.html`이 홈 화면이며, `dist/chatbot.html`이 상담봇입니다. HTML·CSS·JavaScript로 구성되어 별도 설치나 빌드 없이 확인할 수 있습니다. 이미지와 메뉴가 연결되도록 폴더 구조와 상대 경로를 유지해 주세요.

GitHub Pages는 `.github/workflows/deploy-pages.yml`에 따라 `main` 또는 `master` 변경 시 `dist`를 공개합니다. 저장소 이름을 유지하므로 기존 홈페이지 주소로 접속할 수 있습니다. `codex/version3` 브랜치는 이번 버전의 전체 소스를 보관합니다.

## 운영 상태

상담봇은 정해진 질문에 답하는 자동 안내이며 AI 자유 대화, 상담원 연결, 주문 조회와 상담 접수는 연결되어 있지 않습니다. 실제 결제도 연결되어 있지 않습니다. 공지·문의·리뷰 작성은 연습용 미리보기이고 연락처와 영업시간은 예시입니다. 실제 상품과 정책 자료를 확인한 후 운영 정보를 보완해야 합니다.

최초 원본과 버전2 관련 이력은 이전 커밋과 `VERSION2.md`에서 확인할 수 있습니다.
