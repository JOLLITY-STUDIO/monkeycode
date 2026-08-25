// _find_log_scene0.cjs — 直接按字节序列找 Scene0 指令在 log 中的位置
const fs = require('fs');
const log = fs.readFileSync('docs/roms/opening-all/opening-all.log', 'utf8').split('\n');

// Scene0 关键指令字节:
// $84C1 JSR $9A0D   = 20 0D 9A
// $84C4 LDA #$10    = A9 10
// $84C9 LDY #$30    = A0 30
// $84D5 DEY         = 88
// $84D6 BNE $84CB   = D0 F3
// $84D8 LDA #$00    = A9 00
// $84DE LDA #$17    = A9 17
// $84E9 JSR $8920   = 20 20 89
// $84F9 JSR $9A35   = 20 35 9A
// $84FC JSR $88FB   = 20 FB 88
// $8501 JSR $9FA8   = 20 A8 9F
// $8517 JSR $8920   = 20 20 89
// $8538 JSR $99F0   = 20 F0 99
// $853B JSR $9B7F   = 20 7F 9B
// $853E JSR $98A0   = 20 A0 98
// $8554 JSR $8920   = 20 20 89

const patterns = [
  { name: 'JSR $9A0D (Scene0入口)', bytes: '20 0D 9A' },
  { name: 'LDY #$30 (drift init)', bytes: 'A0 30' },
  { name: 'JSR $9A35 (FullBright)', bytes: '20 35 9A' },
  { name: 'JSR $88FB (attr flip)', bytes: '20 FB 88' },
  { name: 'JSR $99F0 (fade all)', bytes: '20 F0 99' },
  { name: 'JSR $9B7F (hideOam)', bytes: '20 7F 9B' },
  { name: 'JSR $98A0 (clear NT)', bytes: '20 A0 98' },
];

const lines = [];
for (let i = 0; i < log.length; i++) lines.push(log[i]);

function findOpcodeByte(byteHex) {
  // 找 "XX       MNEMONIC" 行（第6行）
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    const m = /^([0-9A-F]{2})\s{2,}(.+)$/.exec(lines[i]);
    if (m && m[1] === byteHex) {
      // 向上回溯 5 行取 f 行
      let frame = null, addr = null;
      for (let k = i; k >= 0 && k > i - 6; k--) {
        const fm = /^f(\d+)/.exec(lines[k]);
        if (fm) { frame = +fm[1]; break; }
      }
      for (let k = i - 1; k >= 0 && k > i - 6; k--) {
        const am = /\$0([0-9]):([0-9A-F]{4}):/.exec(lines[k]);
        if (am) { addr = '$0' + am[1] + ':' + am[2]; break; }
      }
      res.push({ line: i, frame, addr });
      if (res.length >= 6) break;
    }
  }
  return res;
}

for (const p of patterns) {
  console.log('=== ' + p.name + ' (' + p.bytes + ') ===');
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(p.bytes)) {
      let frame = null;
      for (let k = i; k >= 0 && k > i - 6; k--) {
        const fm = /^f(\d+)/.exec(lines[k]);
        if (fm) { frame = +fm[1]; break; }
      }
      hits.push({ line: i, frame });
      if (hits.length >= 5) break;
    }
  }
  for (const h of hits) console.log(`  line=${h.line} frame=${h.frame}`);
}
