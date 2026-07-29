# K-IFRS 제1118호 쟁점 아카이브

회계기준원 공개자료를 근거로 K-IFRS 제1118호(재무제표 표시와 공시)를 쉽게 정리하는 **비영리 학습용 아카이브**. 포트폴리오 겸용.

## 프로젝트 개요
- **범위**: K-IFRS 제1118호만. 다른 주제로 확장하지 않는다.
- **두 축**:
  - `A 개정` (`/amendments`) — 개정 지도 1장(전체 영향도 표) + 실질 개정 소수만 상세 페이지. 40개를 페이지로 쪼개지 않는다.
  - `B 쟁점 해설` (`/issues`) — 실무 쟁점을 갑설·을설·결론으로 해설. **진짜 가치의 핵심 축.**
- **단계**: 초기. 콘텐츠를 하나씩 추가하는 중. 지금은 정적 HTML, 이후 Next.js 이전 예정.
- **대상 독자**: 회계사·감사인·회계 실무자·CPA 수험생.

## 절대 규칙 (어기면 재작업)
1. **저작권** — 기준서 문단 전문을 절대 복제하지 않는다. `문단번호 + 자기 표현 요약 + 회계기준원 링크`만 사용. 기준서/문단의 **내용**은 반드시 업로드된 원문에서 확인하고, 기억으로 추측하지 않는다. 기준서 제목·명칭은 그대로 인용 가능.
2. **출처** — 회계기준원(kasb.or.kr) 공개자료(정착지원 TF 논의·개정·질의회신·교육자료)만 본문 근거로 쓴다. 4대 법인 자료·유튜브·인강은 **링크만**, 본문 재수록 금지.
3. **고지** — 모든 페이지 하단에 출처·저작권·면책 문단을 포함한다.
4. **비영리** — 광고·유료화 요소를 넣지 않는다.

## 디자인 시스템 (그대로 재사용)
톤: 판례해설/케이스노트 에디토리얼. 명조 제목 + 산세리프 본문 + 모노 인용.

폰트 (Google Fonts):
```
https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500;600;700&family=Noto+Sans+KR:wght@350;400;500;700&family=JetBrains+Mono:wght@500;600&display=swap
```
- 제목: `Noto Serif KR` · 본문: `Noto Sans KR` · 문단번호·라벨: `JetBrains Mono`

색 토큰 (`:root`):
```
--ink:#17233A; --ink-soft:#46536A; --muted:#7A8598;
--paper:#F7F8F6; --surface:#FFFFFF; --line:#E4E7EC; --line-soft:#EEF0F2;
--accent:#0F6E56; --accent-ink:#0A4C3B; --accent-tint:#E7F1EC;
--amber-ink:#7A4B12; --amber-tint:#FBF0DC;
--coral-ink:#8A3A1D; --coral-tint:#F7E4DA;
--slate:#54607A; --slate-tint:#EEF0F4;
```

레이아웃·접근성:
- 콘텐츠 페이지 `max-width:760px`, 홈 `820px`.
- 하한선: skip 링크, `:focus-visible` 아웃라인, `prefers-reduced-motion` 대응, 모바일 반응형, 시맨틱 HTML, `lang="ko"`.
- **콘텐츠 페이지(A/B)의 CSS는 `shared.css`에 있다.** 새 페이지는 `<link rel="stylesheet" href="shared.css" />`로 부르고, CSS를 새로 만들지 않는다. 필요한 컴포넌트(.verdict/.views/.impact/.diff 등)는 이미 shared.css에 있으니 클래스만 쓴다.
- 새 페이지는 같은 유형의 기존 페이지를 복제한 뒤 본문 HTML만 교체한다.

## SEO 규칙
- `<title>`: `[핵심 주제] — K-IFRS 제1118호` 패턴.
- `meta description`, Open Graph, `canonical`, `lang="ko"` 필수.
- JSON-LD: 콘텐츠는 `Article`, 경로는 `BreadcrumbList`.
- 슬러그는 영문: `/issues/[slug]`, `/amendments/k[번호]`.

## 파일 규칙
- `shared.css` — 콘텐츠 페이지(A/B) 공용 스타일. 디자인 토큰·컴포넌트가 모두 여기 있다. **A/B 새 페이지는 반드시 이걸 링크한다.**
- 콘텐츠 페이지: `kifrs1118-[slug].html` (본문 HTML만, 인라인 CSS 금지).
- `kifrs1118-home.html` — 홈. 단 하나뿐이라 CSS를 인라인으로 둔다(공유 이득 없음).
- 배포 시 경로: 하위 폴더 구조(`/issues/...`)로 가면 링크를 `href="/shared.css"`(루트 절대경로)로 바꾼다. Next.js 이전 시 전역 import로 교체.

## 페이지 유형 템플릿
- `B 쟁점 페이지` → 스킬 `kifrs-issue-page`. 기준 파일: `kifrs1118-customer-financing-interest.html`
- `A 개정 지도(전체 1장)` → 스킬 `kifrs-amendment-map`. 마스터 소스 하나에서 영향도 표로 요약. `/amendments` 인덱스 겸용.
- `A 개정 상세(실질 소수)` → 스킬 `kifrs-amendment-page`. 실질 개정 기준서만. 기준 파일: `kifrs1118-amendment-1115.html`

## 소스 (sources/)
- `sources/1118-consequential-amendments.txt` — 1118호 제정에 따른 타 기준서 개정 **전체 신구대조본**. **A의 유일한 마스터 소스.** (기준서를 하나씩 뒤지지 않는다)
- `sources/tf-3rd-meeting.txt` — 정착지원 TF 3차 논의(쟁점 재료, B).
- `sources/standards/` — (선택) 실질 개정 기준서 원문 PDF. 깊은 A 페이지 맥락용.
- 원문이 HWP면 텍스트로 변환해 넣는다(Claude Code가 바로 읽게).

## 작업 방식
- **A(개정)**: 기준서를 하나씩 뒤지지 않는다. `sources/1118-consequential-amendments.txt`에서 해당 기준서 섹션을 찾는다. 지도 1장 + 실질 소수만 상세.
- **B(쟁점)**: 해당 TF/질의회신 소스에서 쟁점·갑설/을설·결론을 뽑는다. 마스터만으로 불분명하면 지어내지 말고 '대조본/원문 확인 필요'로 표시.
- 완료 전 자가 점검: ① 문단 전문 복제 없음 ② 근거 문단·출처 링크 포함 ③ 반응형·접근성 ④ 하단 고지 포함.
- 페이지 작성 후 `node check-copyright.js <파일>` 을 실행해 저작권 자가검사(전문 복제 자동 점검)를 통과시킨다. Git 커밋 시 pre-commit 훅으로도 자동 실행된다.
