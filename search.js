/* 검색 — search-index.json 을 받아 브라우저에서 찾는다.
   페이지에 #q(입력) 과 #results(결과)가 있으면 자동으로 붙는다.
   data-hide 속성에 선택자를 주면 검색 중 그 영역을 감춘다. */
(function () {
  var q = document.getElementById("q");
  var out = document.getElementById("results");
  if (!q || !out) return;

  var hideSel = out.getAttribute("data-hide");
  var hideEls = hideSel ? [].slice.call(document.querySelectorAll(hideSel)) : [];
  var docs = null;
  var loading = false;
  var timer;

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function mark(text, terms) {
    var html = esc(text);
    terms.forEach(function (t) {
      if (!t) return;
      var re = new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
      html = html.replace(re, "<mark>$1</mark>");
    });
    return html;
  }

  function snippet(body, terms) {
    var low = body.toLowerCase();
    var at = -1;
    for (var i = 0; i < terms.length && at < 0; i++) at = low.indexOf(terms[i]);
    if (at < 0) return body.slice(0, 120) + "…";
    var s = Math.max(0, at - 45);
    return (s > 0 ? "…" : "") + body.slice(s, s + 150) + "…";
  }

  function score(d, terms) {
    var t = d.t.toLowerCase(), dek = d.d.toLowerCase();
    var p = d.p.toLowerCase(), b = d.b.toLowerCase();
    var sum = 0;
    for (var i = 0; i < terms.length; i++) {
      var w = terms[i], s = 0;
      if (t.indexOf(w) > -1) s += 10;
      if (p.indexOf(w) > -1) s += 8;
      if (dek.indexOf(w) > -1) s += 5;
      if (b.indexOf(w) > -1) s += 1;
      if (!s) return 0; // 한 단어라도 없으면 제외(AND)
      sum += s;
    }
    return sum;
  }

  function render(terms) {
    var hits = docs
      .map(function (d) { return { d: d, s: score(d, terms) }; })
      .filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s || (a.d.t < b.d.t ? -1 : 1); });

    if (!hits.length) {
      out.innerHTML =
        '<p class="s-none">‘' + esc(terms.join(" ")) +
        "’에 해당하는 글이 없습니다. 문단번호(B40, 53⑶)나 다른 낱말로 찾아보세요.</p>";
      return;
    }

    out.innerHTML =
      '<p class="s-count">' + hits.length + "건</p>" +
      hits.map(function (x) {
        var d = x.d;
        return '<div class="item">' +
          '<span class="cat ' + (d.c === "개정" ? "amend" : "issue") + '">' + d.c + "</span>" +
          '<a class="t" href="' + d.u + '">' + mark(d.t, terms) + "</a>" +
          '<span class="meta">' + d.w.replace(/-/g, ".") + "</span>" +
          '<p class="s-snip">' + mark(snippet(d.b, terms), terms) + "</p>" +
          "</div>";
      }).join("");
  }

  function run() {
    var raw = q.value.trim();
    var terms = raw.toLowerCase().split(/\s+/).filter(Boolean);

    if (!terms.length) {
      out.innerHTML = "";
      out.hidden = true;
      hideEls.forEach(function (el) { el.hidden = false; });
      return;
    }

    out.hidden = false;
    hideEls.forEach(function (el) { el.hidden = true; });

    if (docs) return render(terms);

    if (!loading) {
      loading = true;
      out.innerHTML = '<p class="s-count">불러오는 중…</p>';
      fetch("/search-index.json")
        .then(function (r) { return r.json(); })
        .then(function (j) { docs = j.docs; run(); })
        .catch(function () {
          out.innerHTML = '<p class="s-none">검색 자료를 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.</p>';
        });
    }
  }

  q.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(run, 120);
  });
  q.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { q.value = ""; run(); }
  });
})();
