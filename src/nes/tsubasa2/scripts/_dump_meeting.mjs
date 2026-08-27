/**
 * _dump_meeting.mjs — 跑 tsnes NES ROM 模拟按键序列 dump meeting 帧 NT/OAM/PALETTE
 *
 * 序列：
 *   frame 0-2700: opening animation 自动跑
 *   frame 2700: buttonDown(1, START) — 跳 opening → title
 *   frame 2701-3600: title stable
 *   frame 3600: buttonDown(1, A) — kickoff
 *   frame 3601+: Scene14-23 chain → meeting
 *   目标：dump frame 4500-5000 的 NT/OAM/PALETTE/CHR 状态
 */
import NES from 'file:///d:/studio/github/monkeycode/src/nes/tsubasa2/dist/src/core/nes.js';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ROM_PATH = join(ROOT, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const OUT_DIR = join(ROOT, 'output', 'meeting-dump');

const BUTTON_A = 0;
const BUTTON_B = 1;
const BUTTON_START = 3;
const BUTTON_UP = 4;
const BUTTON_DOWN = 5;

// dump target frames — 按 log f52421+ 是 meeting kickoff 起点
const TARGETS = [52500, 52700, 53000];

const rom = readFileSync(ROM_PATH);
console.log(`[dump-meeting] ROM: ${ROM_PATH} (${rom.length} bytes)`);

const nes = new NES({ emulateSound: false });
nes.loadROM(rom);

const ppu = nes.ppu;
const mmap = nes.mmap;

console.log(`[dump-meeting] mapper=${nes.rom.mapperType} prg=${nes.rom.romCount}x16KB chr=${nes.rom.vromCount}x8KB`);

// simulate opening → skip to title
let total = 0;

// 跑 2700 帧让 opening 跑完
console.log('[dump-meeting] running 2700 frames (opening auto) ...');
for (; total < 2700; total++) {
  nes.frame();
}

// 2700 帧按 START 跳过 opening
console.log('[dump-meeting] frame 2700: buttonDown(1, START)');
nes.buttonDown(1, BUTTON_START);
// 按 10 帧确保检测
for (let i = 0; i < 10; i++) { nes.frame(); total++; }
nes.buttonUp(1, BUTTON_START);

// title stable 900 帧
console.log('[dump-meeting] running 900 frames (title stable) ...');
for (let i = 0; i < 900; i++) { nes.frame(); total++; }

// 按 A kickoff
console.log('[dump-meeting] frame 3600: buttonDown(1, A)');
nes.buttonDown(1, BUTTON_A);
for (let i = 0; i < 10; i++) { nes.frame(); total++; }
nes.buttonUp(1, BUTTON_A);

// 跑 chain Scene14-23 → meeting
console.log('[dump-meeting] running chain to meeting ...');

let lastDumpFrame = 0;
for (const target of TARGETS) {
  // progress log
  const remaining = target - total;
  if (remaining > 1000) {
    console.log(`[dump-meeting] skipping to ${target} (${remaining} frames)`);
  }
  while (total < target) {
    nes.frame();
    total++;
    if (total % 1000 === 0) {
      console.log(`[dump-meeting]   ...frame ${total}`);
    }
  }
  // dump at this frame
  const frameDir = join(OUT_DIR, `frame-${String(total).padStart(5, '0')}`);
  mkdirSync(frameDir, { recursive: true });

  // render screen
  if (typeof ppu.startFrame === 'function') {
    ppu.startFrame();
    ppu.advanceDots(262 * 341);
    ppu.renderFramePartially(0, 240);
    ppu.endFrame();
  }

  // dump nt (4 nametables)
  const ntJson = [];
  for (let i = 0; i < 4; i++) {
    const t = ppu.nameTable[i];
    ntJson.push({
      idx: i,
      tile: Array.from(t.tile),
      attrib: Array.from(t.attrib),
    });
  }
  writeFileSync(join(frameDir, 'nt.json'), JSON.stringify(ntJson));

  // dump oam
  const oamArr = Array.from(ppu.spriteMem);
  const oamJson = [];
  for (let i = 0; i < 64; i++) {
    oamJson.push({
      idx: i,
      y: oamArr[i * 4 + 0],
      tile: oamArr[i * 4 + 1],
      attr: oamArr[i * 4 + 2],
      x: oamArr[i * 4 + 3],
    });
  }
  writeFileSync(join(frameDir, 'oam.json'), JSON.stringify(oamJson));

  // dump palette
  const palBg = Array.from(ppu.vramMem.slice(16128, 16144));
  const palSp = Array.from(ppu.vramMem.slice(16144, 16160));
  writeFileSync(join(frameDir, 'palette.json'), JSON.stringify({ bg: palBg, sp: palSp }));

  // state.json
  const chrMap = mmap.chrBanks ? Array.from(mmap.chrBanks) : [];
  const prgMap = mmap.prgBankMap || {};
  writeFileSync(join(frameDir, 'state.json'), JSON.stringify({
    frame: total,
    pc: nes.cpu ? (nes.cpu.REG_PC >>> 0 || (nes.cpu.pc & 65535)) : 0,
    nTblAddress: ppu.f_nTblAddress,
    bgTable: ppu.f_bgPatternTable,
    spTable: ppu.f_spPatternTable,
    chrBanks: chrMap,
    prgBankMap: prgMap,
  }, null, 2));

  console.log(`[dump-meeting] dumped frame ${total} → ${frameDir}`);
  lastDumpFrame = total;
}

console.log(`[dump-meeting] done. last dump: frame ${lastDumpFrame}`);
