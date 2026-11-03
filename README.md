# SAND 고흥 유자 샌드 — 기존 홈페이지 원본

이 ZIP은 아래 **기존 SAND 홈페이지**의 소스 코드입니다.

https://sand-goheung-yuzu.itsa-9283.chatgpt.site/

두 번째 사이트(sand-yuja-gift)의 코드와 다릅니다. 이 파일에는 기존 사이트의 모든 메뉴별 HTML 페이지, 로고·상품 사진·패키지 이미지 전체, 디자인 규칙과 원래 배포 설정을 포함했습니다.
원본 소스 버전: `1a126a1dacf42acb5a5b9d3a43a2661a615b4922`

## 파일 구성

```text
.github/workflows/deploy-pages.yml  GitHub Pages 자동 배포 설정
.openai/hosting.json               원래 사이트 설정 (보관용)
DESIGN.md                         디자인 규칙
README.md                         배포 안내
.gitignore                        비공개 설정 파일 등의 업로드 제외 규칙
dist/
  index.html                      기존 SAND 홈 화면
  about.html                      회사 소개
  services.html                   상품·서비스
  news.html                       공지·소식
  location.html                   오시는 길
  contact.html                    문의하기
  주문하기.html                   주문하기
  style.css                       공통 화면 모양
  script.js                       공통 메뉴 동작
  .nojekyll                       정적 파일 표시 설정
  assets/                         모든 로고·제품·패키지 이미지
```

홈 화면에 원래 들어 있던 자체 디자인과 동작 코드도 `index.html` 안에 그대로 보관했습니다. 기존 디자인과 기능을 바꾸지 않았습니다.

## 내 컴퓨터에서 확인하기

압축을 푼 다음 `dist/index.html`을 더블클릭하세요. 이미지와 메뉴가 함께 작동하려면 폴더와 파일의 위치를 그대로 유지해야 합니다.

## GitHub에 올려 배포하기

1. ZIP을 먼저 압축 해제합니다. ZIP 파일 자체를 올리는 방식은 홈페이지를 배포하지 않습니다.
2. GitHub에서 새 저장소를 만듭니다. 무료 계정은 공개 저장소를 사용하세요.
3. 압축 안 `SAND-Goheung-Yuzu-GitHub-Pages` 폴더의 **내용 전체**를 저장소 최상위에 올립니다. `.github`, `.openai`, `dist`, `DESIGN.md`, `README.md`가 저장소에서 바로 보여야 합니다. 바깥 폴더를 한 겹 더 올리지 마세요.
4. 숨김 폴더인 `.github`도 꼭 올려야 합니다. 파일 선택 화면에서 보이지 않으면 GitHub Desktop으로 전체 폴더를 올릴 수 있습니다.
5. 저장소에서 **Settings(설정) → Pages → Build and deployment(제작·배포) → Source(배포 방식)**를 **GitHub Actions**로 선택합니다.
6. **Actions(자동 작업) → GitHub Pages 배포 → Run workflow(직접 실행)**를 누릅니다.
7. 작업이 초록색 완료 표시가 되면 **Settings → Pages**에 표시된 주소를 엽니다.

이후 `main` 또는 `master`에 수정 파일을 올리면 자동 배포됩니다. 별도 설치, 제작 도구, 비밀번호나 인증 키 입력은 필요하지 않습니다. 주소가 `https://계정.github.io/저장소이름/` 형태여도 이미지와 메뉴가 연결되도록 상대 경로를 유지했습니다.

## 설정 파일 설명

- GitHub Pages는 `.github/workflows/deploy-pages.yml`을 읽고 `dist` 폴더만 공개합니다.
- `.openai/hosting.json`은 기존 사이트의 원래 설정을 보관한 파일입니다. GitHub Pages에서는 사용하지 않습니다.
- 별도 서버나 설치 과정 없이 HTML·CSS·JavaScript로 작동합니다.

## 원래 상태 그대로인 기능

- 선택한 유자 단면 로고, 기존 홈 화면과 브랜드 이야기
- 20개입 12,000원 상품 정보와 실제 상품 사진
- GOHEUNG YUJA 소포장·선물 패키지 이미지와 크게 보기
- 장바구니 담기, 수량 선택, 합계 계산, 브라우저 내 장바구니 저장
- 휴대폰 메뉴와 각 메뉴별 페이지 이동

기존 사이트의 일부 메뉴 페이지는 제목과 ‘준비 중입니다’만 있는 상태이며, 그대로 포함했습니다. 실제 주문 접수와 결제는 연결되어 있지 않습니다. GitHub Pages 배포 후에도 이 상태는 유지됩니다.

공식 배포 안내: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
