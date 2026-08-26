// 将 output/emu-full/frame-*/trace.log 按帧序拼接为 emu-full-all.log
// 每帧 log 保留不删除。流式处理, 支持 3GB+ 全量。
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'output', 'emu-full');
const ALL = path.join(OUT, 'emu-full-all.log');

const frames = fs.readdirSync(OUT).filter((d) => /^frame-\d+$/.test(d)).sort();
if (frames.length === 0) {
  console.error('no frame dirs in ' + OUT);
  process.exit(1);
}

const ws = fs.createWriteStream(ALL, { flags: 'w' });
let bytes = 0;
let lines = 0;

(async () => {
  let copied = 0;
  for (const d of frames) {
    const p = path.join(OUT, d, 'trace.log');
    if (!fs.existsSync(p)) { console.warn('skip missing: ' + p); continue; }
    await new Promise((resolve, reject) => {
      const rs = fs.createReadStream(p);
      rs.on('data', (c) => {
        bytes += c.length;
        for (let i = 0; i < c.length; i++) if (c[i] === 10) lines++;
      });
      rs.pipe(ws, { end: false });
      rs.on('end', resolve);
      rs.on('error', reject);
    });
    copied++;
    if (copied % 500 === 0) console.log(`  merged ${copied}/${frames.length} frames...`);
  }
  ws.end();
  ws.on('finish', () => {
    const mb = (bytes / 1048576).toFixed(1);
    console.log(`merged ${copied} frames -> ${ALL}`);
    console.log(`  lines=${lines}  bytes=${bytes} (${mb} MB)`);
    const live = path.join(OUT, 'emu-full.log');
    if (fs.existsSync(live)) {
      const l = fs.statSync(live).size;
      console.log(`  emu-full.log (live) = ${(l / 1048576).toFixed(1)} MB  diff=${l - bytes} B`);
    }
  });
  ws.on('error', (e) => { console.error(e); process.exit(1); });
})().catch((e) => { console.error(e); process.exit(1); });
