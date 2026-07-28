#!/usr/bin/env node
/**
 * check-copyright.js — K-IFRS 제1118호 아카이브 저작권 자가검사
 *
 * 목적: 기준서 문단 "전문"이 통째로 복붙됐을 가능성을 잡아낸다.
 *  - 우리 원칙: 문단은 번호 + 자기표현 요약만. 전문 복제 금지.
 *  - 핵심 신호(문체): 기준서 전문은 한다체(…한다/…하여야 한다) 규범문,
 *    우리 해설은 합니다체(…합니다/…됩니다). 긴 블록이 한다체로 몰려 있으면 전문 복제 의심.
 *  - 결과는 참고용. 최종 판단은 사람이 한다. (오탐이면 git commit --no-verify 로 우회 가능)
 *
 * 사용법:
 *   node check-copyright.js                # 저장소 내 모든 *.html 검사
 *   node check-copyright.js path/a.html    # 특정 파일만
 * 종료코드: 의심 1건 이상이면 1(커밋 차단용), 없으면 0.
 */
const fs = require("fs");
const path = require("path");

const CFG = {
  NORMATIVE_BLOCK_CHARS: 130, // 이 길이 이상 + 한다체 2회 이상이면 전문 의심
  NORMATIVE_HITS: 2,
  HUGE_BLOCK_CHARS: 350,      // 문체와 무관하게 이만큼 길면 사람이 한 번 볼 것
};

// HTML → 요소별 텍스트 블록
function blocks(html) {
  html = html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ");
  return html
    .split(/<\/(?:p|li|div|h1|h2|h3|td|section|blockquote)>/i)
    .map((p) => p.replace(/<[^>]+>/g, " "))
    .map((t) => t.replace(/&[a-z]+;|&#\d+;/gi, " "))
    .map((t) => t.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

// 한다체 종결(규범문) 카운트: '…다.' 중 앞 글자가 '니'(합/습/입니다)가 아닌 것
function normativeCount(text) {
  const re = /([가-힣])다[.\uFF0E]/g;
  let n = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m[1] !== "니") n++;
  }
  return n;
}

function checkFile(file) {
  const warnings = [];
  for (const b of blocks(fs.readFileSync(file, "utf-8"))) {
    const nc = normativeCount(b);
    if (b.length >= CFG.NORMATIVE_BLOCK_CHARS && nc >= CFG.NORMATIVE_HITS) {
      warnings.push({
        rule: "한다체 긴 문단",
        detail: `${b.length}자 · 규범문 종결 ${nc}회 — 기준서 전문 복제 의심`,
        sample: b.slice(0, 76) + "…",
      });
    } else if (b.length >= CFG.HUGE_BLOCK_CHARS) {
      warnings.push({
        rule: "매우 긴 블록",
        detail: `${b.length}자 — 사람이 한 번 확인`,
        sample: b.slice(0, 76) + "…",
      });
    }
  }
  return warnings;
}

function findHtml(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || e.name === "node_modules") continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...findHtml(full));
    else if (e.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const args = process.argv.slice(2);
const files = args.length ? args : findHtml(process.cwd());
let total = 0;
for (const f of files) {
  const w = checkFile(f);
  if (!w.length) { console.log(`\u2713 ${f}`); continue; }
  total += w.length;
  console.log(`\u26A0 ${f} — 의심 ${w.length}건`);
  for (const x of w) {
    console.log(`    · [${x.rule}] ${x.detail}`);
    console.log(`        ${x.sample}`);
  }
}
console.log("");
if (!total) {
  console.log("저작권 자가검사 통과 — 전문 복제 의심 없음.");
  process.exit(0);
} else {
  console.log(`저작권 자가검사: ${total}건 확인 필요.`);
  console.log("→ 기준서 전문 복제면 '번호 + 자기표현 요약'으로 교체하세요.");
  console.log("→ 본인이 쓴 긴 해설(합니다체)이면 정상입니다. 오탐 시 git commit --no-verify 로 우회.");
  process.exit(1);
}
