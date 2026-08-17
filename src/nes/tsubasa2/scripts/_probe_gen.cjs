// 反推解析器: 从现有 scripts-bank-XX.ts 提取 VAR_DATA/SUB_DISPATCH/VAR_LEN 样本,
// 结合 rom-data 原始字节, 确定每个长指令消耗的参数字节数
const fs = require('fs');
const path = require('path');
const OUT = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/scripts/_probe_gen_out.txt';
const log = [];
const say = s => log.push(s);

const textscriptDir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa2-h5-src/src/game/data/scene/textscript';
const romDir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data';

function readBank(bank) {
  const txt = fs.readFileSync(path.join(romDir, `prg-bank-0${bank}.ts`), 'utf8');
  const start = txt.indexOf('= [');
  const body = txt.slice(start + 3);
  const end = body.indexOf('];');
  return body.slice(0, end).split(',').map(x => parseInt(x.trim(), 16));
}
function loadScripts(bank) {
  const lines = fs.readFileSync(path.join(textscriptDir, `scripts-bank-0${bank}.ts`), 'utf8').split('\n');
  const out = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t.startsWith('{')) continue;
    try { out.push(JSON.parse(t.slice(0, -1))); } catch (e) { /* ignore */ }
  }
  return out;
}

for (const bank of [3, 5, 6]) {
  const bankData = readBank(bank);
  const scripts = loadScripts(bank);
  const samples = {};
  for (const s of scripts) {
    for (const b of s.blocks) {
      for (let i = 0; i < b.instructions.length; i++) {
        const ins = b.instructions[i];
        if (ins.type !== 'LONG_INSTR') continue;
        const m = ins.mnemonic;
        if (['VAR_DATA', 'SUB_DISPATCH', 'SUB_DISPATCH2', 'VAR_LEN'].includes(m)) {
          const key = `${bank}_${m}`;
          if (!samples[key]) {
            // 下一指令的 offset 即本指令结束位置
            const next = b.instructions[i + 1];
            const nextOffset = next ? next.offset : bankData.length;
            const raw = bankData.slice(ins.offset, nextOffset);
            samples[key] = JSON.stringify({
              mnemonic: m, offset: ins.offset, addr: ins.addr,
              params: ins.params, nextOffset,
              consumedBytes: raw.length, raw: raw.map(x => x.toString(16).padStart(2, '0')).join(' '),
            });
          }
        }
      }
    }
  }
  say(`=== bank${bank} ===`);
  for (const k of Object.keys(samples)) say(samples[k]);
}

// 检查 WAIT 的 text 格式 & 是否有 params 字段; 抽样所有指令类型字段
const s3 = loadScripts(3);
const fieldSets = {};
for (const s of s3) for (const b of s.blocks) for (const ins of b.instructions) {
  fieldSets[ins.type] = Object.keys(ins).join(',');
}
say('--- bank3 各类型字段集 ---');
for (const k of Object.keys(fieldSets)) say(`${k}: ${fieldSets[k]}`);

fs.writeFileSync(OUT, log.join('\n'), 'utf8');
console.log('WROTE bytes=' + Buffer.byteLength(log.join('\n'), 'utf8'));
