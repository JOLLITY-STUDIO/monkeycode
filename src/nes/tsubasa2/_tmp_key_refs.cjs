// 收集语义键引用分布 + 模板字符串键生成格式
const fs = require('fs');
const path = require('path');

const ROOT = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const PATS = ['bank02_entry', 'ppuBufPtr', 'ppuBuf_', 'scene_pos_', 'ram_tempY', 'match_phase', 'match_timer', 'player_data_', 'tactic_slot_', 'temp_A0_', 'temp_E0_', 'temp_EC_', 'ram_1B', 'ram_role_pos', 'vblankReady', 'ppuctrl', 'ppumask', 'frameFlag'];

function scanFile(fp) {
  if (!fs.existsSync(fp)) return;
  const src = fs.readFileSync(fp, 'utf8');
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const p of PATS) {
      if (line.includes(p)) {
        const rel = path.relative(ROOT, fp);
        console.log(rel + ':' + (i + 1) + '  ' + line.trim().slice(0, 110));
      }
    }
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir)) {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) {
      if (f === 'node_modules') continue;
      walk(fp);
    } else if (f.endsWith('.ts')) {
      scanFile(fp);
    }
  }
}

walk(path.join(ROOT, 'src'));
