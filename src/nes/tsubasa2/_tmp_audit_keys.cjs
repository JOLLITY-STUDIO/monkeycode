// 审计: 语义化 KV 键 (非 ram_XXXX 地址键) 在 src/game 的使用分布
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'game');
const keys = ['scoreA','scoreB','ballOwner','ballX','ballY','nearCount','roundCount','actionClock','bpmCounter','zoneFlag','animLock','scrollDir','ctrlStatus','pauseFlag','gameState','frameCount','boot_root','boot_shot','boot_title_cursor','boot_result_done','boot_story_to_meeting','boot_match_phase','boot_match_story_done','ram_001C'];
const out = {};
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.ts')) {
      const t = fs.readFileSync(p, 'utf8');
      for (const k of keys) {
        const m = t.split(`'${k}'`).length - 1 + t.split(`"${k}"`).length - 1;
        if (m) { (out[k] = out[k] || []).push({ f: p.replace(__dirname, ''), n: m }); }
      }
    }
  }
}
walk(dir);
for (const k of Object.keys(out).sort()) {
  const files = out[k];
  console.log(`== ${k} (${files.length} files) ==`);
  for (const x of files) console.log(`   ${x.n}x ${x.f}`);
}
