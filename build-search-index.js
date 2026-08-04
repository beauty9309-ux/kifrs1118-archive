#!/usr/bin/env node
/**
 * build-search-index.js — 검색 색인 생성
 *
 * issues/ 와 amendments/ 의 콘텐츠 페이지에서 제목·요약·근거 문단번호·본문을 뽑아
 * search-index.json 을 만든다. 브라우저가 이 파일 하나만 받아 클라이언트에서 검색한다.
 *
 * 페이지를 추가하거나 제목을 고치면 다시 실행할 것:
 *   node build-search-index.js
 */

const fs = require("fs");
const path = require("path");

// 본문은 자르지 않는다 — 잘라두면 뒤쪽 문단의 낱말이 검색에서 누락된다.
// 20개 페이지 전부 담아도 90,000자 수준이고, 색인은 첫 입력 때만 내려받는다.
// 대신 모든 페이지에 반복되는 고지·출처 줄은 제외해 잡음을 줄인다.
const DROP = [
  /<p class="notice">[\s\S]*?<\/p>/gi,
  /<div class="source">[\s\S]*?<\/div>/gi,
];

function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function pick(re, html) {
  const m = html.match(re);
  return m ? textOf(m[1]) : "";
}

function collect(dir, cat) {
  const out = [];
  for (const f of fs.readdirSync(dir).sort()) {
    if (!f.endsWith(".html") || f === "index.html") continue;
    const html = fs.readFileSync(path.join(dir, f), "utf8");
    const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || [, ""])[1];

    // 근거 문단번호 — .ground .num, span.ref, code.para 에서 모은다
    const paras = new Set();
    const grab = (re) => {
      let m;
      while ((m = re.exec(main))) {
        textOf(m[1])
          .split(/[·,\s]+/)
          .filter(Boolean)
          .forEach((p) => paras.add(p));
      }
    };
    grab(/<div class="num">([\s\S]*?)<\/div>/g);
    grab(/<span class="ref">([\s\S]*?)<\/span>/g);
    grab(/<code class="para">([\s\S]*?)<\/code>/g);

    const slug = f.replace(/\.html$/, "");
    out.push({
      u: `/${path.basename(dir)}/${slug}`,
      t: pick(/<h1[^>]*>([\s\S]*?)<\/h1>/i, html),
      d: pick(/<p class="dek">([\s\S]*?)<\/p>/i, html),
      c: cat === "쟁점" && slug === "faultlines" ? "정리" : cat,
      w: pick(/"datePublished":\s*"([^"]+)"/i, html),
      p: [...paras].join(" "),
      b: textOf(DROP.reduce((s, re) => s.replace(re, " "), main)),
    });
  }
  return out;
}

const docs = [...collect("issues", "쟁점"), ...collect("amendments", "개정")];

fs.writeFileSync(
  "search-index.json",
  JSON.stringify({ built: new Date().toISOString().slice(0, 10), docs }),
  "utf8"
);

const kb = (fs.statSync("search-index.json").size / 1024).toFixed(1);
console.log(`✓ search-index.json — ${docs.length}개 문서, ${kb} KB`);
for (const d of docs) {
  if (!d.t) console.log(`  ⚠ 제목 없음: ${d.u}`);
}
