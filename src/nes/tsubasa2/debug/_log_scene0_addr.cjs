// _log_scene0_addr.cjs — 按 log 地址 ($01:A4xx) 统计 Scene0 序列执行窗口
const fs = require('fs');
const l = fs.readFileSync('docs/roms/opening-all/opening-all.log', 'utf8').split('\n');

const targets = [
  'A4C1', // JSR $9A0D BG fade
  'A4C6', // JSR $9FA8 wait 0x10
  'A4C9', // LDY #$30 drift init
  'A4CB', // drift loop: LDA #$01
  'A4D2', // JSR $890C drift
  'A4D5', // DEY
  'A4D6', // BNE
  'A4D8', // LDA #$00
  'A4E0', // JSR $8AF7 loadChr
  'A4E5', // STA $0044 scrollY
  'A4E9', // JSR $8920 scene3
  'A4F6', // JSR $9FA8 wait 4
  'A4F9', // JSR $9A35 fullbright
  'A4FC', // JSR $88FB attr flip
  'A4FF', // scroll loop: LDA #$01
  'A504', // INC $0079
  'A50A', // LDA $0044
  'A513', // BCS scroll loop
  'A517', // JSR $8920 scene0
  'A51A', // LDA $001B
  'A522', // JSR $9FA8 wait 240
  'A527', // JSR $9FA8 wait 60
  'A530', // LDA #$00
  'A538', // JSR $99F0 fade all
  'A53B', // JSR $9B7F hideOam
  'A53E', // JSR $98A0 clear NT
  'A554', // JSR $8920 scene1
  'A557', // LDA #$02
  'A559', // RTS
];

const first = {}, last = {}, count = {};
let curFrame = null;
for (let i = 0; i < l.length; i++) {
  const m = /^f(\d+)/.exec(l[i]);
  if (m) curFrame = +m[1];
  const am = /\$01:([0-9A-F]{4}):/.exec(l[i]);
  if (am && targets.includes(am[1])) {
    const a = am[1];
    if (first[a] === undefined) first[a] = curFrame;
    last[a] = curFrame;
    count[a] = (count[a] ?? 0) + 1;
  }
}

console.log('--- Scene0 地址执行窗口 (log bank $01) ---');
for (const t of targets) {
  console.log(`${t}: first=${String(first[t] ?? '-').padStart(5)} last=${String(last[t] ?? '-').padStart(5)} count=${count[t] ?? 0}`);
}
