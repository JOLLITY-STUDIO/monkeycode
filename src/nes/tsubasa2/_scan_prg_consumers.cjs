const fs = require('fs');
const path = require('path');

const SERVICES = ['Bank00Service','Bank02Service','Bank30Service','DataQueryService','Bank12AudioService','OpeningSceneController','ResultController','PasswordController','MatchEngineService','Bank24HudService','Bank28MatchService','InterruptService','Bank11Service','Bank16Service','Bank19Service','Bank18Service','Bank20Service','Bank22Service','Bank27Service','Bank29RosterService','DispatchService'];

function walk(d, out) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.git', 'asm', 'dist', 'output', '_tmp_bzk_out'].includes(e.name)) continue;
      walk(p, out);
    } else if (e.name.endsWith('.ts') || e.name.endsWith('.tsx')) {
      out.push(p);
    }
  }
}

const files = [];
walk('src', files);
walk('pages', files);
walk('test', files);

const svcRe = new RegExp('\\b(' + SERVICES.join('|') + ')\\b', 'g');
const svcHits = {};
const prgImportHits = [];

for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const L = c.split(/\r?\n/);
  // prg/index import
  L.forEach((l, i) => {
    if (/from\s+['"][^'"]*(game\/prg|game\/index|game\/rom|prg\/index)['"]/.test(l)) {
      prgImportHits.push(f.replace(/\\/g, '/') + ':' + (i + 1) + ': ' + l.trim().slice(0, 120));
    }
  });
  // 排除声明文件本身, 找 new X( 实例化点
  L.forEach((l, i) => {
    const m = l.match(/new\s+(Bank\w+Service|DataQueryService|OpeningSceneController|ResultController|PasswordController|DispatchService|InterruptService|MatchEngineService)\s*\(/);
    if (m) {
      (svcHits[m[1]] = svcHits[m[1]] || []).push(f.replace(/\\/g, '/') + ':' + (i + 1) + ': ' + l.trim().slice(0, 120));
    }
  });
}

console.log('=== prg/index importers ===');
prgImportHits.length ? prgImportHits.forEach(h => console.log(h)) : console.log('NONE');
console.log('=== instantiation points ===');
Object.keys(svcHits).length ? Object.keys(svcHits).forEach(k => { console.log('-- ' + k); svcHits[k].forEach(h => console.log('  ' + h)); }) : console.log('NONE');
