// 临时脚本：提取 NES 某帧的完整 GT 数据（palette / NT / attr / CHR / scroll / OAM）
const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const idx = s.indexOf('const OPENING_FRAMES:');
const arrStart = s.indexOf('[', idx);
let depth = 0, arrEnd = -1;
for (let i = arrStart; i < s.length; i++) {
  if (s[i] === '[') depth++;
  else if (s[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
}
const arrStr = s.slice(arrStart, arrEnd + 1);

let out = [];
let d = 0, cur = '';
for (let i = 0; i < arrStr.length; i++) {
  const c = arrStr[i];
  if (c === '{') { d++; cur += c; }
  else if (c === '}') { d--; cur += c; if (d === 0) { out.push(cur); cur = ''; } }
  else if (d > 0) cur += c;
}

function gobj(blk, k) {
  const re = new RegExp(k + ":\\s*\\{");
  const m = re.exec(blk);
  if (!m) return '{}';
  let p = m.index + m[0].length - 1;
  let d2 = 0;
  for (let i = p; i < blk.length; i++) {
    if (blk[i] === '{') d2++;
    else if (blk[i] === '}') { d2--; if (d2 === 0) return blk.slice(p, i + 1); }
  }
  return '{}';
}
function garr(blk, k) {
  const re = new RegExp(k + ":\\s*\\[");
  const m = re.exec(blk);
  if (!m) return '[]';
  let p = m.index + m[0].length - 1;
  let d2 = 0;
  for (let i = p; i < blk.length; i++) {
    if (blk[i] === '[') d2++;
    else if (blk[i] === ']') { d2--; if (d2 === 0) return blk.slice(p, i + 1); }
  }
  return '[]';
}

const nesFrame = parseInt(process.argv[2] || '1960', 10);
const START = parseInt(process.argv[3] || nesFrame, 10);
const END = parseInt(process.argv[4] || nesFrame, 10);
for (const blk of out) {
  const f = parseInt(blk.match(/f:(\d+)/)?.[1] || '0');
  if (f === nesFrame) {
    console.log('=== NES FRAME', f, '===');
    const palObj = gobj(blk, 'p');
    if (palObj === '{}') console.log('palette: null');
    else console.log('palette:', palObj);
    console.log('scroll:', gobj(blk, 's'));
    console.log('CHR plan:', garr(blk, 'c'));
    const nt = garr(blk, 'n');
    const rows = [];
    let d2 = 0, cur2 = '', inObj = false;
    for (let i = 1; i < nt.length - 1; i++) {
      const c = nt[i];
      if (c === '{') { d2++; inObj = true; }
      else if (c === '}') { d2--; if (d2 === 0) { rows.push(cur2); cur2 = ''; inObj = false; } }
      else if (inObj) cur2 += c;
    }
    console.log('NT rows:', rows.length);
    rows.forEach(r => {
      const ni = r.match(/ni:(\d+)/)?.[1];
      const row = r.match(/r:(\d+)/)?.[1];
      const dd = r.match(/d:\[([^\]]+)\]/)?.[1] || '';
      const vals = dd.split(',').map(v => parseInt(v.trim()));
      const nz = vals.filter(v => v !== 0).length;
      if (nz > 0) {
        const tiles = vals.map(v => v.toString(16).padStart(2, '0')).join(' ');
        console.log(`NT ni=${ni} r=${row} nz=${nz} tiles: ${tiles}`);
      }
    });
    const attr = garr(blk, 'a');
    const attrRows = [];
    d2 = 0; cur2 = ''; inObj = false;
    for (let i = 1; i < attr.length - 1; i++) {
      const c = attr[i];
      if (c === '{') { d2++; inObj = true; }
      else if (c === '}') { d2--; if (d2 === 0) { attrRows.push(cur2); cur2 = ''; inObj = false; } }
      else if (inObj) cur2 += c;
    }
    console.log('ATTR rows:', attrRows.length);
    attrRows.forEach(r => {
      const ni = r.match(/ni:(\d+)/)?.[1];
      const row = r.match(/r:(\d+)/)?.[1];
      const dd = r.match(/d:\[([^\]]+)\]/)?.[1] || '';
      const vals = dd.split(',').map(v => parseInt(v.trim()));
    