#!/usr/bin/env node
/**
 * Build an HTML gallery of all visual-audit screenshots.
 * Output: visual-audit-results/index.html
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'visual-audit-results');
if (!fs.existsSync(DIR)) {
  console.error('No screenshots yet. Run: npx playwright test tests/visual-audit.spec.ts');
  process.exit(1);
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.png'));
const groups = {};
for (const file of files) {
  // Filename: {viewport}-{pageName}.png  (viewport may contain hyphens, e.g. mobile-android)
  const match = file.match(/^(desktop|mobile|mobile-android)-(.+)\.png$/);
  if (!match) continue;
  const [, viewport, pageName] = match;
  (groups[viewport] = groups[viewport] || []).push({ file, pageName });
}

const keys = Object.keys(groups).sort();

const html = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<title>sureedgetax.com — Visual Audit</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 20px; background: #faf9f6; color: #1a2e4a; }
  h1 { border-bottom: 3px solid #b8962e; padding-bottom: 10px; }
  .meta { color: #666; font-size: 14px; margin-bottom: 20px; }
  .tabs { display: flex; gap: 8px; margin-bottom: 20px; position: sticky; top: 0; background: #faf9f6; padding: 10px 0; z-index: 10; }
  .tab { padding: 8px 16px; background: #fff; border: 1px solid #f0ede6; border-radius: 6px; cursor: pointer; font-weight: 500; }
  .tab.active { background: #1a2e4a; color: #fff; }
  .section { display: none; }
  .section.active { display: block; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 20px; }
  .card { background: #fff; border: 1px solid #f0ede6; border-radius: 8px; overflow: hidden; }
  .card .title { padding: 10px 14px; font-weight: 600; background: #1a2e4a; color: #fff; font-size: 14px; }
  .card img { width: 100%; max-height: 500px; object-fit: contain; object-position: top; background: #f5f5f5; cursor: zoom-in; }
  .mobile img { max-width: 320px; margin: 0 auto; }
  .lightbox { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 100; padding: 20px; overflow-y: auto; cursor: zoom-out; }
  .lightbox.open { display: flex; justify-content: center; align-items: flex-start; }
  .lightbox img { max-width: 100%; height: auto; }
</style></head>
<body>
  <h1>sureedgetax.com — Visual Audit</h1>
  <div class="meta">Generated ${new Date().toLocaleString()} · ${files.length} screenshots</div>
  <div class="tabs">
${keys.map((k, i) => `    <div class="tab${i === 0 ? ' active' : ''}" data-key="${k}">${k}</div>`).join('\n')}
  </div>
${keys
  .map((k, i) => {
    const items = groups[k].sort((a, b) => a.pageName.localeCompare(b.pageName));
    const isMobile = k.startsWith('mobile');
    return `  <div class="section${i === 0 ? ' active' : ''}${isMobile ? ' mobile' : ''}" data-key="${k}">
    <div class="grid">
${items
  .map(
    (it) => `      <div class="card"><div class="title">${it.pageName}</div><img src="${it.file}" alt="${it.pageName}" loading="lazy"></div>`
  )
  .join('\n')}
    </div>
  </div>`;
  })
  .join('\n\n')}
  <div class="lightbox" id="lb"><img id="lbi"></div>
  <script>
    document.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((x) => x.classList.remove('active'));
      document.querySelectorAll('.section').forEach((x) => x.classList.remove('active'));
      t.classList.add('active');
      document.querySelector('.section[data-key="' + t.dataset.key + '"]').classList.add('active');
      window.scrollTo(0, 0);
    }));
    const lb = document.getElementById('lb');
    const lbi = document.getElementById('lbi');
    document.querySelectorAll('.card img').forEach((img) => img.addEventListener('click', () => {
      lbi.src = img.src; lb.classList.add('open');
    }));
    lb.addEventListener('click', () => lb.classList.remove('open'));
  </script>
</body></html>`;

fs.writeFileSync(path.join(DIR, 'index.html'), html);
console.log(`✓ ${files.length} screenshots → ${path.join(DIR, 'index.html')}`);
