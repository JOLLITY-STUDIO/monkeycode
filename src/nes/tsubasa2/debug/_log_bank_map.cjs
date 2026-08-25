// 分析 trace log 的 bank 编号是否等于真实 PRG bank 序号
// log 格式: f<frame> c<cycle> i<instr> ... $XX:YYYY: opcode bytes mnemonic
const fs = require('fs');
const path = require('path');

const logPath = 'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).log';
const debugDir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/debug';
const romPath = 'd:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';

// 2. 读取 log，统计 bank 分布 + 收集 (bank, addr, bytes) 样本
const lines = fs.readFileSync(logPath, 'utf8').split(/\r?\n/).filter(l => l.trim());
const banks = {};
const samples = []; // {bank, addr, bytes}
for (const l of lines) {
  const m = l.match(/\$([0-9A-Fa-f]{1,2}):([0-9A-Fa-f]{4}): ([0-9A-Fa-f]{2})(?: ([0-9A-Fa-f]{2}))?(?: ([0-9A-Fa-f]{2}))?/);
  if (m) {
    const b = parseInt(m[1], 16);
    const a = parseInt(m[2], 16);
    banks[b] = (banks[b] || 0) + 1;
    if (samples.length < 40) {
      const bytes = [m[3], m[4], m[5]].filter(Boolean).map(x => parseInt(x, 16));
      samples.push({ bank: b, addr: a, bytes });
    }
  }
}
const sorted = Object.entries(banks).sort((x, y) => y[1] - x[1]);
const out = [];
out.push('total lines: ' + lines.length);
out.push('distinct banks: ' + sorted.length);
out.push('bank distribution (top 32):');
for (const [b, c] of sorted.slice(0, 32)) {
  out.push('  $' + Number(b).toString(16).padStart(2, '0') + ' (' + b + '): ' + c);
}

// 3. 验证 bank 解释
if (fs.existsSync(romPath)) {
  const rom = fs.readFileSync(romPath);
  const prgStart = rom[0] === 0x4e && rom[1] === 0x45 ? 16 : 0;
  const prgSize = 0x2000 * 32; // 32 个 8KB PRG bank
  out.push('');
  out.push('ROM size: ' + rom.length + ' bytes, prgStart=' + prgStart);

  // 候选解释函数: 都返回 [8KB bank 序号, 窗口内地址]
  const interps = {
    direct8k: (b, a) => [b, a],                 // log bank = 真实 8KB bank
    shift1_16k: (b, a) => [b * 2, a],           // log bank = 16KB bank (真实 8KB = b*2)
    shift1_16k_plus1: (b, a) => [b * 2 + 1, a], // log bank = 16KB bank 的高半
    nibble_swap: (b, a) => [((b >> 4) | ((b & 0xF) << 4)) & 0x1F, a], // 高低 nibble 交换
    minus4: (b, a) => [b - 4, a],               // 偏置 -4
    plus4: (b, a) => [b + 4, a],                // 偏置 +4
  };
  for (const [name, fn] of Object.entries(interps)) {
    let okCnt = 0, tot = 0;
    const fails = [];
    for (const s of samples) {
      const [bn, a] = fn(s.bank, s.addr);
      const off = prgStart + bn * 0x2000 + (a - 0x8000);
      if (bn < 0 || off + s.bytes.length > prgStart + prgSize) { fails.push('bank=$' + s.bank.toString(16) + ' addr=$' + s.addr.toString(16) + ' => 8k#' + bn + ' OOR'); continue; }
      const romBytes = Array.from(rom.subarray(off, off + s.bytes.length));
      const ok = romBytes.every((v, i) => v === s.bytes[i]);
      tot++;
      if (ok) okCnt++;
      else if (fails.length < 4) fails.push('bank=$' + s.bank.toString(16) + ' addr=$' + s.addr.toString(16) + ' => 8k#' + bn + ' log[' + s.bytes.map(x => x.toString(16)).join(',') + '] prg[' + romBytes.map(x => x.toString(16)).join(',') + ']');
    }
    out.push('');
    out.push('interp "' + name + '": match ' + okCnt + '/' + tot);
    for (const f of fails.slice(0, 3)) out.push('  ' + f);
  }

  // 4. STA $8001 写入值 -> 下一个指令显示的 bank
  out.push('');
  out.push('STA $8001 value -> next displayed bank:');
  const pairs = {};
  for (let i = 0; i < lines.length - 1; i++) {
    const w = lines[i].match(/STA \$8001 = #\$([0-9A-Fa-f]{2})/);
    if (w) {
      const reg = parseInt(w[1], 16);
      const nb = lines[i + 1].match(/\$([0-9A-Fa-f]{1,2}):([0-9A-Fa-f]{4}): /);
      if (nb) {
        const nbv = parseInt(nb[1], 16);
        const key = reg + '->' + nbv;
        pairs[key] = (pairs[key] || 0) + 1;
      }
    }
  }
  for (const [k, c] of Object.entries(pairs).sort((x, y) => y[1] - x[1]).slice(0, 30)) {
    out.push('  $8001=#' + Number(k.split('->')[0]).toString(16).padStart(2, '0') + ' -> bank $' + Number(k.split('->')[1]).toString(16).padStart(2, '0') + ' x' + c);
  }
} else {
  out.push('');
  out.push('ROM not found, skipped byte verification.');
}

fs.writeFileSync(path.join(debugDir, '_log_bank_map.txt'), out.join('\n'), 'utf8');
console.log('written: ' + path.join(debugDir, '_log_bank_map.txt'));
