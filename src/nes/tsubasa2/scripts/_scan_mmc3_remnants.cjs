// 扫描功能性 MMC3 残留: bankSwitch(/readMem(/mmc3Map/setPrgBank (整库)
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..', '..');
const walk = (d) => {
  let out = [];
  if (!fs.existsSync(d)) return out;
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    let s;
    try { s = fs.statSync(p); } catch (e) { continue; }
    if (s.isDirectory()) {
      if (['node_modules', '.codebuddy', 'pages', 'docs', 'trace', 'screenshots', 'roms', 'typings', '_tmp_bzk_out', 'mini-audio', 'sid-data'].includes(f)) continue;
      out = out.concat(walk(p));
    } else if (/\.(ts|tsx|js)$/.test(f)) {
      const t = fs.readFileSync(p, 'utf8');
      t.split('\n').forEach((l, i) => {
        if (/\.bankSwitch\(|readMem\(|mmc3Map|setPrgBank/.test(l)) {
          out.push(path.relative(root, p) + ':' + (i + 1) + ': ' + l.trim().slice(0, 140));
        }
      });
    }
  }
  return out;
};
const r = walk(root);
console.log(r.length ? r.join('\n') : '(clean: 无功能性 MMC3 残留)');
