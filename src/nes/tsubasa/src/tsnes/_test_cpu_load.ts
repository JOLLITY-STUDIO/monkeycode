/**
 * 快速测试：CPU模拟器路径加载 ROM + 查看 NT/SPR/PT 数据
 */
import * as fs from 'fs';
import * as path from 'path';
import CPUNES from './src/nes';

const romPath = path.resolve(__dirname, 'roms/Captain Tsubasa II - Super Striker (Japan).nes');

console.log('=== CPU 模拟器 ROM 加载测试 ===');
console.log('ROM 路径:', romPath);
console.log('ROM 存在:', fs.existsSync(romPath));

if (!fs.existsSync(romPath)) {
  console.error('ROM 文件不存在!');
  process.exit(1);
}

const romBuf = fs.readFileSync(romPath);
console.log('ROM 大小:', romBuf.length, 'bytes');
console.log('NES header:', Array.from(romBuf.slice(0, 16)).map((b: number) => '0x' + b.toString(16).padStart(2, '0')).join(' '));

try {
  console.log('\n创建 NES 实例...');
  const nes = new CPUNES({
    emulateSound: false,
    sampleRate: 48000,
    onFrame: () => {},
    onAudioSample: () => {},
    onStatusUpdate: (msg: string) => console.log('[status]', msg),
  });
  console.log('NES 实例创建成功');

  console.log('\n加载 ROM...');
  nes.loadROM(romBuf);
  console.log('ROM 加载成功!');

  const cpu = nes.cpu;
  const ppu = nes.ppu;
  const mmap = nes.mmap;

  // ── CPU 状态 ──
  console.log('\n=== CPU 状态 ===');
  console.log('PC:', '0x' + cpu.REG_PC.toString(16).padStart(4, '0'));
  console.log('A/X/Y/SP:', `0x${cpu.REG_ACC.toString(16)} / 0x${cpu.REG_X.toString(16)} / 0x${cpu.REG_Y.toString(16)} / 0x${cpu.REG_SP.toString(16)}`);
  console.log('P:', '0x' + cpu.REG_STATUS.toString(16));

  // ── 向量 ──
  const nmiLo = cpu.load(0xFFFA), nmiHi = cpu.load(0xFFFB);
  const resetLo = cpu.load(0xFFFC), resetHi = cpu.load(0xFFFD);
  const irqLo = cpu.load(0xFFFE), irqHi = cpu.load(0xFFFF);
  console.log('\n=== 中断向量 ===');
  console.log(`NMI: 0x${((nmiHi << 8) | nmiLo).toString(16).padStart(4, '0')}  RESET: 0x${((resetHi << 8) | resetLo).toString(16).padStart(4, '0')}  IRQ: 0x${((irqHi << 8) | irqLo).toString(16).padStart(4, '0')}`);

  // ── Mapper ──
  console.log('\n=== MMC3 Mapper 初始化状态 ===');
  console.log('Mapper:', mmap.constructor.name);
  console.log('PRG bankMap:', JSON.stringify(mmap.prgBankMap));
  console.log('CHR banks:', Array.from(mmap.chrBanks));
  console.log('IRQ counter:', mmap.irqCounter, 'latch:', mmap.irqLatchValue, 'enable:', mmap.irqEnable);

  // ── 运行 60 帧 ──
  console.log('\n=== 运行 60 帧 ===');
  for (let frame = 0; frame < 60; frame++) {
    try {
      nes.frame();
      if (frame < 3 || (frame >= 57 && frame < 60)) {
        console.log(`  帧 ${frame + 1}: PC=0x${cpu.REG_PC.toString(16).padStart(4, '0')}`);
      }
    } catch (e: any) {
      console.error(`  帧 ${frame + 1} 崩溃:`, e.message);
      break;
    }
  }

  // ═══════════════════════════════════════
  // 运行后状态
  // ═══════════════════════════════════════
  console.log('\n=== 60帧后 CPU 状态 ===');
  console.log('PC:', '0x' + cpu.REG_PC.toString(16).padStart(4, '0'));

  console.log('\n=== 60帧后 Mapper 状态 ===');
  console.log('PRG bankMap:', JSON.stringify(mmap.prgBankMap));
  console.log('CHR banks:', Array.from(mmap.chrBanks));

  // ═══════════════════════════════════════
  // PPU Nametable (NT) — NameTable 对象
  // ═══════════════════════════════════════
  console.log('\n=== PPU NameTable (NT) ===');
  for (let ntIdx = 0; ntIdx < 4; ntIdx++) {
    const nt = ppu.nameTable[ntIdx];
    if (!nt) { console.log(`  NT${ntIdx}: null`); continue; }
    const tiles = nt.tile.slice(0, 32);
    let nonZero = 0;
    for (const t of tiles) if (t !== 0) nonZero++;
    const row = Array.from(tiles).map(v => ('0' + v.toString(16)).slice(-2)).join(' ');
    console.log(`  NT${ntIdx} first 32 tiles (nonZero=${nonZero}): ${row}`);
  }

  // ═══════════════════════════════════════
  // PPU OAM (SPR) — spriteMem 原始字节
  // ═══════════════════════════════════════
  console.log('\n=== PPU OAM / SPR (spriteMem 原始) ===');
  const sprMem = ppu.spriteMem;
  if (!sprMem || sprMem.length === 0) {
    console.log('  spriteMem 为空');
  } else {
    for (let i = 0; i < Math.min(64, sprMem.length); i += 4) {
      const py = ('0' + sprMem[i].toString(16)).slice(-2);
      const pt = ('0' + sprMem[i + 1].toString(16)).slice(-2);
      const pa = ('0' + sprMem[i + 2].toString(16)).slice(-2);
      const px = ('0' + sprMem[i + 3].toString(16)).slice(-2);
      console.log(`  SPR${(i / 4).toString().padStart(2, ' ')}: Y=$${py} TILE=$${pt} ATTR=$${pa} X=$${px}`);
    }
  }

  // 前 8 个解码后的 sprite
  console.log('\n=== PPU 解码后的 Sprite (前 8 个) ===');
  for (let i = 0; i < 8; i++) {
    console.log(`  spr=${i}: X=$${ppu.sprX[i].toString(16).padStart(2, '0')} Y=$${ppu.sprY[i].toString(16).padStart(2, '0')} tile=$${ppu.sprTile[i].toString(16).padStart(2, '0')} col=$${ppu.sprCol[i].toString(16).padStart(2, '0')} vflip=${ppu.vertFlip[i]} hflip=${ppu.horiFlip[i]} bg=${ppu.bgPriority[i]}`);
  }

  // ═══════════════════════════════════════
  // PPU Pattern Table — CHR 数据在 VRAM
  // ═══════════════════════════════════════
  console.log('\n=== PPU Pattern Table (PT) — CHR Bank 0 前 4 个 tile ===');
  for (let t = 0; t < 4; t++) {
    const base = t * 16;
    let tile = '';
    for (let row = 0; row < 8; row++) {
      const b0 = ppu.vramMem[base + row];
      const b1 = ppu.vramMem[base + row + 8];
      let line = '';
      for (let bit = 7; bit >= 0; bit--) {
        const p = ((b0 >> bit) & 1) | (((b1 >> bit) & 1) << 1);
        line += p === 0 ? '.' : '#123'[p] || p.toString();
      }
      if (row > 0) tile += '\n    ';
      tile += line;
    }
    console.log(`  Tile ${t}:`);
    console.log(`    ${tile.replace(/\n    /g, '\n    ')}`);
  }

  // ═══════════════════════════════════════
  // PPU 调色板
  // ═══════════════════════════════════════
  console.log('\n=== PPU 调色板 imgPalette ===');
  for (let bg = 0; bg < 4; bg++) {
    const pal: string[] = [];
    for (let i = 0; i < 4; i++) pal.push(('0' + ppu.imgPalette[bg * 4 + i].toString(16)).slice(-2));
    console.log(`  BG${bg}: ${pal.join(' ')}`);
  }
  for (let sp = 0; sp < 4; sp++) {
    const pal: string[] = [];
    for (let i = 0; i < 4; i++) {
      const v = ppu.imgPalette[16 + sp * 4 + i];
      pal.push(v != null ? ('0' + v.toString(16)).slice(-2) : '??');
    }
    console.log(`  SP${sp}: ${pal.join(' ')}`);
  }

  // ═══════════════════════════════════════
  // 关键内存
  // ═══════════════════════════════════════
  console.log('\n=== 关键 RAM 地址 ===');
  const mem = cpu.mem;
  console.log(`  $0628 (scene): 0x${mem[0x0628].toString(16)}`);
  console.log(`  $062A (sub):   0x${mem[0x062A].toString(16)}`);
  console.log(`  $0700 (title): 0x${mem[0x0700].toString(16)}`);
  console.log(`  $001C (pad prev): 0x${mem[0x001C].toString(16)}`);
  console.log(`  $001E (pad cur):  0x${mem[0x001E].toString(16)}`);
  console.log(`  $00F0 (NMI flag): 0x${mem[0x00F0].toString(16)}`);

  // PPU 寄存器
  console.log('\n=== PPU 寄存器 ===');
  console.log(`  f_nmiOnVblank: ${ppu.f_nmiOnVblank}  f_nTblAddress: ${ppu.f_nTblAddress}`);
  console.log(`  f_bgPatternTable: ${ppu.f_bgPatternTable}  f_spPatternTable: ${ppu.f_spPatternTable}`);
  console.log(`  f_bgVisibility: ${ppu.f_bgVisibility}  f_spVisibility: ${ppu.f_spVisibility}`);
  console.log(`  f_spClipping: ${ppu.f_spClipping}  f_bgClipping: ${ppu.f_bgClipping}`);
  console.log(`  f_dispType: ${ppu.f_dispType}  f_color: ${ppu.f_color}`);
  console.log(`  scanline: ${ppu.scanline}  curX: ${ppu.curX}`);

  console.log('\n=== 测试完成 ===');
} catch (e: any) {
  console.error('\n❌ 错误:', e.message);
  console.error('堆栈:\n' + (e.stack || '').split('\n').slice(0, 5).join('\n'));
  process.exit(1);
}
