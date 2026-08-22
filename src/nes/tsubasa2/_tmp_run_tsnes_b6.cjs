// 用 tsnes 直接跑 ROM，验证 bank6/bank12 代码归属
// 统计：每 bank 执行的 PC 区间 + 写寄存器分布
const fs = require('fs');
const NES = require('D:/studio/github/monkeycode/src/nes/tsnes/_build/nes.js').default;

const romPath = 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes';
const rom = fs.readFileSync(romPath);

const nes = new NES({ emulateSound: false, debugNonROM: false });
nes.loadROM(rom);

const cpu = nes.cpu;
const mmap = nes.mmap;

// 统计结构
const bankInfo = {}; // bank -> {min,max,count, pages:Set, apu:{}, ppu:{}, ram:0, mmc3:0, other:0}
function getBank(bank) {
  if (!bankInfo[bank]) bankInfo[bank] = { min: 0xFFFF, max: 0, count: 0, pages: new Set(), apu: {}, ppu: {}, ram: 0, mmc3: 0, other: 0 };
  return bankInfo[bank];
}

function pcToBank(pc) {
  if (pc < 0x8000) return -1;
  const map = mmap.getPrgBankMap();
  for (const key of Object.keys(map)) {
    const base = Number(key);
    if (pc >= base && pc < base + 0x2000) return map[key];
  }
  return -2;
}

const origWrite = cpu.write.bind(cpu);
cpu.write = (addr, val) => {
  const pc = cpu._instrPC;
  const bank = pcToBank(pc);
  if (bank >= 0) {
    const b = getBank(bank);
    b.count++;
    if (pc < b.min) b.min = pc;
    if (pc > b.max) b.max = pc;
    b.pages.add(pc >> 8);
    if (addr >= 0x2000 && addr < 0x4000) {
      const reg = '$' + (addr & 0x07).toString(16);
      b.ppu[reg] = (b.ppu[reg] || 0) + 1;
    } else if (addr >= 0x4000 && addr <= 0x4017) {
      const reg = '$' + addr.toString(16);
      b.apu[reg] = (b.apu[reg] || 0) + 1;
    } else if (addr < 0x2000) {
      b.ram++;
    } else if (addr >= 0x8000) {
      b.mmc3++;
    } else {
      b.other++;
    }
  }
  return origWrite(addr, val);
};

const FRAMES = 600;
const t0 = Date.now();
for (let f = 0; f < FRAMES; f++) {
  nes.frame();
}
const dt = Date.now() - t0;

// 汇总输出
const banks = Object.keys(bankInfo).map(Number).sort((a, b) => a - b);
console.log(`=== tsnes ran ${FRAMES} frames in ${dt}ms ===`);
console.log(`=== banks that WRITE via bus (excluding RAM) ===`);
for (const bk of banks) {
  const b = bankInfo[bk];
  const apuRegs = Object.keys(b.apu).sort();
  const ppuRegs = Object.keys(b.ppu).sort();
  const apuStr = apuRegs.length ? apuRegs.map(r => `${r}:${b.apu[r]}`).join(' ') : '-';
  const ppuStr = ppuRegs.length ? ppuRegs.map(r => `${r}:${b.ppu[r]}`).join(' ') : '-';
  console.log(
    `bank ${bk.toString(16).padStart(2, '0')}: PC $${b.min.toString(16)}-$${b.max.toString(16)} ` +
    `instr_writes=${b.count} pages=${b.pages.size}\n` +
    `   APU: ${apuStr}\n   PPU: ${ppuStr}\n   RAM:${b.ram} MMC3:${b.mmc3} OTHER:${b.other}`
  );
}

// 特别输出 bank6 / bank12 的覆盖页面明细
for (const bk of [6, 12]) {
  if (!bankInfo[bk]) { console.log(`bank ${bk}: NOT EXECUTED`); continue; }
  const pages = Array.from(bankInfo[bk].pages).sort((a, b) => a - b);
  console.log(`\n=== bank ${bk} executed pages (256B): ` + pages.map(p => p.toString(16).padStart(2, '0')).join(' ') + ' ===');
}

// bank6 内部 $0100-$0200 ROM 原始字节 dump（判断 $0131 是否 $AD 代码）
const prgOffset = 16; // iNES header
const bankSize = 0x2000;
const romBuf = rom;
for (const bk of [6]) {
  const off = prgOffset + bk * bankSize;
  const bytes = [];
  for (let i = 0x0100; i < 0x0200; i++) {
    bytes.push('$' + romBuf[off + i].toString(16).padStart(2, '0').toUpperCase());
  }
  // 每16字节一行
  const rows = [];
  for (let i = 0; i < bytes.length; i += 16) {
    const addr = (0x8100 + i).toString(16).toUpperCase();
    rows.push(`$${addr}: ` + bytes.slice(i, i + 16).join(' '));
  }
  console.log(`\n=== bank ${bk} ROM bytes $8100-$81FF ===`);
  console.log(rows.join('\n'));
}
