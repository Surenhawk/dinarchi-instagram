// node shoot.js daily/<date> -> post-1.jpg .. post-3.jpg (1080x1350) + story.jpg (1080x1920) from posters.html, with a min-text-size and edge audit
const { chromium } = require('playwright'); const path = require('path');
const dir = path.resolve(process.argv[2]);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto(`file://${dir}/posters.html`, { waitUntil: 'networkidle', timeout: 90000 }); await p.evaluate(() => document.fonts.ready);
  if (!(await p.evaluate(() => document.fonts.check("800 40px 'Noto Kufi Arabic'")))) { console.error('brand font did not load'); process.exit(2); }
  const posts = await p.$$('.post'); let bad = 0, n = 0;
  for (let i = 0; i < posts.length; i++) {
    await posts[i].evaluate(e => e.scrollIntoView({ block: 'start' })); await p.waitForTimeout(300);
    const audit = await posts[i].evaluate(sec => { let min = 999, edge = []; const sr = sec.getBoundingClientRect();
      sec.querySelectorAll('*').forEach(e => { const t = [...e.childNodes].filter(x => x.nodeType === 3 && x.textContent.trim()).map(x => x.textContent.trim()).join(' ');
        if (!t || e.closest('svg')) return; const rg = document.createRange(); rg.selectNodeContents(e); const r = rg.getBoundingClientRect();
        if (r.left < sr.left + 20 || r.right > sr.right - 20 || r.bottom > sr.bottom - 10) edge.push(t.slice(0, 20));
        min = Math.min(min, parseFloat(getComputedStyle(e).fontSize)); });
      return { min, edge }; });
    const name = (await posts[i].evaluate(e => e.classList.contains('story'))) ? 'story' : `post-${++n}`;
    console.log(name, JSON.stringify(audit)); if (audit.edge.length || audit.min < 30) bad = 1;
    await posts[i].screenshot({ path: `${dir}/${name}.jpg`, type: 'jpeg', quality: 92 });
  }
  await b.close(); process.exit(bad ? 2 : 0);
})();
