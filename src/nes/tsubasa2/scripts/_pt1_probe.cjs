// PT1 探查脚本 — 分析 BANK19_TILE_DATA 的字节结构
// 目的: 找出所有 $E0 终止符 + E1/E2/E3/E4/E5 cmd 的位置, 设计 frame parser
const path = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/data/tables/sprite-frame-table.ts';
const fs = require('fs');
const text = fs.readFileSync(path, 'utf8');

// 截取 BANK19_TILE_DATA 数组
const m = text.match(/BANK19_TILE_DATA:\s*ReadonlyArray<number>\s*=\s*\[([\s\S]*?)\];/);
if (!m) { console.error('BANK19_TILE_DATA not found'); process.exit(1); }
const body = m[1];
const arr = [];
const re = /0x([0-9A-Fa-f]{2})/g;
let mm;
while ((mm = re.exec(body)) !== null) arr.push(parseInt(mm[1], 16));

console.log(`BANK19_TILE_DATA length: ${arr.length} bytes`);
console.log(`first 64:`, arr.slice(0, 64).map(b => b.toString(16).padStart(2,'0')).join(' '));
console.log(`last 64:`, arr.slice(-64).map(b => b.toString(16).padStart(2,'0')).join(' '));

// 统计 $E0..$E5 出现位置
const cmds = { 0xE0:0, 0xE1:0, 0xE2:0, 0xE3:0, 0xE4:0, 0xE5:0, 0xFC:0, 0xFD:0, 0xFE:0, 0xFF:0 };
const positions = { 0xE0:[], 0xE1:[], 0xE2:[], 0xE3:[], 0xE4:[], 0xE5:[], 0xFC:[], 0xFD:[], 0xFE:[], 0xFF:[] };
for (let i = 0; i < arr.length; i++) {
  const b = arr[i];
  if (cmds[b] !== undefined) { cmds[b]++; positions[b].push(i); }
}
console.log('\ncontrol byte counts:');
for (const k of Object.keys(cmds)) console.log(`  0x${k}: ${cmds[k]}`);
console.log('\nfirst 10 E0 positions:', positions[0xE0].slice(0,10));
console.log('first 10 E1 positions:', positions[0xE1].slice(0,10));
console.log('first 10 E2 positions:', positions[0xE2].slice(0,10));
console.log('first 10 E3 positions:', positions[0xE3].slice(0,10));
console.log('first 10 E4 positions:', positions[0xE4].slice(0,10));
console.log('first 10 E5 positions:', positions[0xE5].slice(0,10));
console.log('first 10 FC positions:', positions[0xFC].slice(0,10));
console.log('first 10 FF positions:', positions[0xFF].slice(0,10));

// 试着按 E0 终止符 + 1 字节类型切帧
// asm 经验: $E0 = end-of-frame, 帧后可能有 cmd bytes
console.log('\n=== 试按 E0 切帧, 看每个 frame 的 byte 序列 ===');
const frames = [];
let start = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 0xE0) {
    const f = arr.slice(start, i+1);
    frames.push({ start, end: i+1, bytes: f });
    start = i+1;
  }
}
console.log(`total frames (按 E0 切): ${frames.length}`);
console.log('前 10 帧长度:', frames.slice(0, 10).map(f => f.bytes.length));
console.log('前 3 帧内容:');
for (let i = 0; i < Math.min(3, frames.length); i++) {
  console.log(`  frame[${i}] [${frames[i].start}..${frames[i].end}] = ${frames[i].bytes.map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);
}

// 找 E0 后的下一个 E0 之间是不是 frame 头
// 测试: 第一个 frame 后第二字节是什么
console.log('\n--- 关键检查: 帧间字节 (E0 后到下个 E0 之前) ---');
for (let i = 0; i < Math.min(5, frames.length-1); i++) {
  const gap = arr.slice(frames[i].end, frames[i+1].start);
  console.log(`  frame[${i}]->[${i+1}] 间隙字节(${gap.length}):`, gap.map(b=>b.toString(16).padStart(2,'0')).join(' '));
}
