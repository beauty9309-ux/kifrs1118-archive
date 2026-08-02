# 내일 이어서 — 착수 카드

WEEK1-PLAN의 남은 항목 ②③을 바로 시작할 수 있게 정리한 문서. **먼저 A를 5분 안에 끝내고 B로 넘어간다.**

현재 상태: 배포 라이브, 페이지 24개, QA 결함 0건, 미커밋 없음.

---

## A. 색인 요청 (5분, 매일 반복)

Search Console → 왼쪽 맨 위 **URL 검사** → 주소 붙여넣고 Enter → **「색인 생성 요청」**

우선순위대로. 하루 10~12건 한도이며 한국시간 오후 4~5시경 초기화된다.

```
https://kifrs1118-archive.vercel.app/about
https://kifrs1118-archive.vercel.app/issues/faultlines
https://kifrs1118-archive.vercel.app/issues
https://kifrs1118-archive.vercel.app/amendments
https://kifrs1118-archive.vercel.app/
```

- [ ] `/about` — 저자 정보가 처음 붙은 페이지. 22개 페이지의 `author`가 이 페이지의 `Person`을 `@id`로 참조하므로 **여기가 먼저 크롤링돼야** 연결이 읽힌다.
- [ ] `/issues/faultlines` — 쟁점 13건 전부로 링크가 나가는 허브
- [ ] `/issues` · `/amendments` · `/` — 여력 되면

**"URL이 Google에 등록되어 있지 않음"이 떠도 정상이다.** 그 화면에서 요청 버튼을 누르면 된다.
**사이트맵 상태가 「가져올 수 없음」인 것도 무시한다.** 판단 기준은 「페이지」 리포트의 색인된 페이지 수다.

---

## B. 본인 검증 (핵심 · 20페이지)

WEEK1-PLAN §6 마지막 줄과 §8("내가 검증하지 못한 페이지는 올리지 않는다")에 해당하는 항목.
**실명과 사진이 붙은 지금은 무게가 다르다.**

### 검증 방법

에디터 좌우 분할로 **페이지 HTML ↔ 소스 txt**를 나란히 놓고 본다. 소스 파일의 시작 줄을 아래 표에 적어 뒀다.

각 페이지에서 볼 것은 셋뿐이다.

1. **결론 방향** — 다수/소수가 뒤바뀌지 않았는가
2. **문단 번호** — 근거 문단 섹션의 번호가 소스와 일치하는가
3. **⚠ 표시 지점** — 아래 표의 '특히 볼 곳'. 여기는 소스에 그대로 없고 **AI가 해석·종합한 부분**이다

### B축 쟁점 14건

| # | 페이지 | 소스 (줄) | 특히 볼 곳 |
|---|---|---|---|
| 1 | `issues/consolidated-investment-category` | `tf-kickoff-meeting.txt` 17~ | 갑설=대안1, 을설=대안2 대응이 맞는지 |
| 2 | `issues/disposal-receivable-impairment` | `tf-1st-meeting.txt` 37~ | ⚠ "갑설과 소수의견은 유형자산 미수금에서 결론이 같다"는 지적은 **소스에 없는 종합** |
| 3 | `issues/fx-payable-translation-category` | `tf-1st-meeting.txt` 235~ | 유보 표기가 과하지 않은지. ⚠ "본문이 열려 있어 BC가 여백을 설명한다"는 해석 |
| 4 | `issues/early-adoption-interim-statements` | `tf-1st-meeting.txt` 444~ | ⚠ **문단 1 → 28 정정**(논의자료 오기로 판단해 바로잡음) · ⚠ "1034호가 이미 을설의 경로를 깔아 뒀다"는 해석 |
| 5 | `issues/lease-deposit-interest` | `tf-1st-meeting.txt` 650~ | 잠정 표기. ⚠ "선급리스료 성격" 강조의 비중 |
| 6 | `issues/k1001-operating-profit-mpm` | `tf-1st-meeting.txt` 784~ | ⚠ **한132.4 표기**(논의자료의 "한 문단 132.4"를 안건5 현황부로 확인해 정정) · 2030년 이후 MPM 가능 서술 |
| 7 | `issues/rental-deposit-interest-expense` | `tf-2nd-meeting.txt` 34~ | ⚠ "고객금융이 본업이라 방향이 뒤집힌다"는 65⑴㈎ 설명 |
| 8 | `issues/developer-loan-category` | `tf-2nd-meeting.txt` 198~ | ⚠ **"대체 가능성"을 구분 기준으로 읽은 부분** — TF 공식 기준이 아니라고 본문에 명시했으나 표현 수위 확인 |
| 9 | `issues/equipment-rental-income` | `tf-2nd-meeting.txt` 369~ | 사례 3건 결론. EY 매뉴얼 **내용 재수록 없이 인용 사실만** 적었는지 |
| 10 | `issues/subsidiary-derivative-category` | `tf-2nd-meeting.txt` 653~ | ⚠ "갑설을 따라도 결론이 같아질 수 있다"는 종합 |
| 11 | `issues/customer-financing-interest` | `tf-3rd-meeting.txt` 39~ | (이번 세션 이전 작성) 전반 |
| 12 | `issues/insurance-lending-activity` | `tf-3rd-meeting.txt` 155~ | (이번 세션 이전 작성) 병설 결론 표기 |
| 13 | `issues/fx-borrowing-hedge-interest` | `tf-3rd-meeting.txt` 316~ | (이번 세션 이전 작성) 잠정 표기 |
| 14 | `issues/faultlines` | — (13건 종합) | ⚠ **문서 전체가 AI의 종합**이다. 단층선 4분류, "금융자산 사안만 흔들린다"는 관찰, 상태표(확정 8·잠정 4·유보 1) 전부 검증 대상 |

### A축 개정 6건

소스는 전부 `sources/1118-consequential-amendments.txt`의 해당 기준서 섹션.

| # | 페이지 | 특히 볼 곳 |
|---|---|---|
| 15 | `amendments/k1007` | 실질 판정 · 바뀐 문단 목록 |
| 16 | `amendments/k1008` | 실질 판정 · 바뀐 문단 목록 |
| 17 | `amendments/k1033` | 실질 판정 · 바뀐 문단 목록 |
| 18 | `amendments/k1034` | 실질 판정 · 바뀐 문단 목록 |
| 19 | `amendments/k1101` | 실질 판정 · 바뀐 문단 목록 |
| 20 | `amendments/k1115` | 경미 판정이 맞는지 |
| — | `amendments/index` | 영향도 표 38행 · 실질 5건 분류 |

### 검증 결과 처리

- **맞음** → 아래 체크박스에 표시
- **틀림/애매** → 그 자리에서 고치거나, 확신이 없으면 페이지에 `확인 필요`로 남긴다(추측으로 채우지 않는다 — CLAUDE.md 원칙)
- 고친 뒤에는 `node check-copyright.js <파일>` 재실행

```
[ ] 1  [ ] 2  [ ] 3  [ ] 4  [ ] 5  [ ] 6  [ ] 7  [ ] 8  [ ] 9  [ ] 10
[ ] 11 [ ] 12 [ ] 13 [ ] 14 [ ] 15 [ ] 16 [ ] 17 [ ] 18 [ ] 19 [ ] 20
```

> 한 번에 다 하지 않아도 된다. **⚠ 표시가 있는 7건(2·3·4·5·6·7·8·10·14)을 먼저** 보는 편이 효율적이다.

---

## C. 선택 산출물

### C-1. 1118호 개요 페이지 (WEEK1-PLAN Day 5)

아직 소스를 정하지 않았다. `sources/`에 개요용 자료가 없으므로 **회계기준원 공개 개요자료를 먼저 받아야 한다.** 없이 쓰면 추측이 되어 원칙 위반이다.

착수 프롬프트:

```
1118호 개요 페이지(overview.html)를 만들어줘.
소스는 sources/[받아온 개요자료].
'왜 개정됐나 / 무엇이 바뀌나(개괄) / 시행일·전환'을 정리하되 기준서 전문 복제 없이 요지+링크로.
두 축(/amendments, /issues)으로 가는 안내를 넣고, shared.css 링크.
끝나면 check-copyright.js + 홈 피드 + sitemap.
```

### C-2. 회고 메모 (WEEK1-PLAN Day 7 · 면접용)

**지원서 Digital Skills의 `AI Interaction` 항목과 직결된다.** 아래가 그대로 답변 재료다.

- `CLAUDE.md` — AI 작업 규칙을 문서로 정의(저작권·디자인 토큰·파일 구조·SEO)
- 커스텀 스킬 3종 — 반복 작업을 절차로 표준화
- `check-copyright.js` + pre-commit 훅 — **AI 산출물을 기계적으로 검증하는 장치**. 실제로 여러 번 걸렸고 우회(`--no-verify`) 없이 문장을 고쳐 통과시켰다
- 출력 검증 루프 — AI 결론을 그대로 받지 않고 원문 대조로 잡아낸 사례: `문단 1 → 28`, `132.4 → 한132.4`
- 정직성 판단 — 자격 미취득 상태에서 '공인회계사' 표기를 쓰지 않기로 한 결정

핵심 문장: **"AI를 썼다"가 아니라 "AI 산출물을 신뢰할 수 없다는 전제로 검증 체계를 설계했다".**

---

## 참고 — 알아두면 좋은 것

- **소스 파일 헤더 오기**: `tf-3rd-meeting.txt` 3행 주석은 "쟁점 2건"이라고 되어 있으나 실제로는 **3건**이다(외화차입금 건이 316행부터 있다). 내용에는 영향 없음.
- **`sources/`는 git 미추적**이다. 다른 PC에서 작업하면 txt·PDF·사진 원본이 없다.
- **페이지 추가 시 `sitemap.xml` 수동 갱신**을 잊지 않는다(자동 생성 아님).
- **색인된 URL 경로를 바꾸지 않는다.** 바꿔야 하면 `vercel.json`에 301을 함께 넣는다.
- 홈의 `google-site-verification` meta를 지우면 Search Console 소유권이 해제된다.
