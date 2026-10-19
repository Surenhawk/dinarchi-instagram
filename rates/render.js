// node render.js out/<date>  -> board.png/.jpg (1080x1350) and story.png/.jpg (1080x1920), with a min-text-size audit
const { chromium } = require('playwright'); const path = require('path');
const dir = path.resolve(process.argv[2]);
(async () => {
  const b = await chromium.launch();
  for (const [n, h] of [['board', 1350], ['story', 1920]]) {
    const p = await b.newPage({ viewport: { width: 1080, height: h } });
    await p.goto(`file://${dir}/${n}.html`, { waitUntil: 'networkidle', timeout: 90000 }); await p.evaluate(() => document.fonts.ready);
    console.log(n, await p.evaluate(() => { let min = 999, w = '', bad = []; const sr = document.querySelector('section').getBoundingClientRect();
      document.querySelectorAll('section *').forEach(e => { const t = [...e.childNodes].filter(x => x.nodeType === 3 && x.textContent.trim()).map(x => x.textContent.trim()).join(' ');
        if (!t || e.closest('svg')) return; const r = e.getBoundingClientRect();
        if (r.left < sr.left + 30 || r.right > sr.right - 30 || r.bottom > sr.bottom - 10) bad.push(t.slice(0, 20));
        if (e.closest('.ft')) return; const fs = parseFloat(getComputedStyle(e).fontSize); if (fs < min) { min = fs; w = t.slice(0, 20); } });
      return `min ${min}px "${w}" ${bad.length ? 'EDGE: ' + bad.join(' | ') : ''}`; }));
    const s = await p.$('section'); await s.screenshot({ path: `${dir}/${n}.png` }); await s.screenshot({ path: `${dir}/${n}.jpg`, type: 'jpeg', quality: 93 });
  }
  await b.close();
})();
