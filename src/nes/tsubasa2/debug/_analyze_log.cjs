// 一次性分析：274-275 帧新场景 trace
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'docs', 'roms', 'aftertecmo');

function analyze(file, maxFrames) {
  const lines = fs.readFileSync(path.join(DIR, file), 'utf8').split('\n');
  const frames = {};
  for (const line of lines) {
    const m = line.match(/^f(\d+)\s+c(\d+)\s+i(\d+)\s+A:([0-9A-F]{2}) X:([0-9A-F]{2}) Y:([0-9A-F]{2}) S:([0-9A-F]{2}) P:(\w+)\s+\$(\d{2}):([0-9A-F]{4}):\s+(.+)$/);
    if (!m) continue;
    const f = parseInt(m[1]);
    if (maxFrames && f > maxFrames) break;
    if (!frames[f]) frames[f] = [];
    const addr = m[10], op = m[11];
    frames[f].push({ addr, op, line });
  }
  return frames;
}

// 只抓 PPU/关键寄存器写
function ppuOps(frames) {
  const out = {};
  for (const f in frames) {
    const ops = [];
    for (const e of frames[f]) {
      // $2000-$2007, $4014, 关键 RAM
      if (/STA|STX|STY/.test(e.op) && /\$20[0-7]:|\$4014:|\$2007/.test(e.line)) {
        ops.push(e.line.trim());
      }
      if (e.addr === '2000' || e.addr === '2001' || e.addr === '2005' || e.addr === '2006' || e.addr === '2007' || e.addr === '4014') {
        ops.push(e.line.trim());
      }
    }
    out[f] = ops;
  }
  return out;
}

const frames274_275 = analyze('tsubasa-when-show274-275.log', 275);
console.log('274-275 log frames:', Object.keys(frames274_275).join(','));
for (const f of Object.keys(frames274_275)) {
  console.log(`\n===== frame ${f}: ${frames274_275[f].length} instr =====`);
  const ops = ppuOps({ [f]: frames274_275[f] })[f];
  if (ops.length) {
    console.log(ops.slice(0, 80).join('\n'));
    if (ops.length > 80) console.log('... (+' + (ops.length - 80) + ' more)');
  } else {
    console.log('(no PPU reg write matched)');
  }
}
