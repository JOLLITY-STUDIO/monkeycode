/**
 * h5-trace.cjs — H5 TS 版 trace, 跑 300 帧, 记录关键写入
 * 对比 tsnes trace 找渲染差异
 */
const fs = require('fs');
const path = require('path');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const tsnes = require(path.resolve(__dirname, '../../tsnes/_build/index.js'));

const NES = tsnes.NES;
const nes = new NES();
const romData = fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes'));
nes.loadROM(romData);

const game = new ts.default(nes);
game.boot();

// trace 收集
const log = {
  frames: 0,
  ppuCtrl: [],   // ram_0020 变化
  ppuMask: [],   // ram_0021 变化
  edChanges: [], // ram_00ED 变化
  e8Fills: [],   // $05E8-$05FF buffer 填充 (非零)
  ntDirect: [],  // writeVramByte 写 NT 区 ($2000-$2FFF)
  palDirect: [], // writeVramByte 写调色板 ($3F00-$3FFF)
  oamDma: [],    // OAM DMA 次数
  nmiRenderCalls: 0,
  updateCalls: 0,
  scheduleReady: [], // 协程就绪 (计数器到0)
};

// Hook DataStore.write
const origWrite = game.store.write.bind(game.store);
let prevEd = game.store.read('ram_00ED');
let prev20 = game.store.read('ram_0020');
let prev21 = game.store.read('ram_0021');
game.store.write = function(key, val) {
  origWrite(key, val);
  const m = key.match(/^ram_([0-9A-F]{4})$/i);
  if (!m) return;
  const addr = parseInt(m[1], 16);

  if (addr === 0x00ED && val !== prevEd) {
    log.edChanges.push({ f: log.frames, val });
    prevEd = val;
  }
  if (addr === 0x0020 && val !== prev20) {
    log.ppuCtrl.push({ f: log.frames, val });
    prev20 = val;
  }
  if (addr === 0x0021 && val !== prev21) {
    log.ppuMask.push({ f: log.frames, val });
    prev21 = val;
  }
  // $05E8-$05FF buffer 非零写入
  if (addr >= 0x05E8 && addr <= 0x05FF && val !== 0) {
    log.e8Fills.push({ f: log.frames, addr, val });
  }
};

// 跑 300 帧
for (let i = 0; i < 300; i++) {
  log.frames = i;
  try {
    game.frame(nes);
  } catch(e) {
    console.log('Frame ' + i + ' error: ' + e.message);
    break;
  }
}

// 输出 trace 结果
const out = [];
out.push('=== H5 TS 版 300帧 trace ===');
out.push('实际执行帧数: ' + log.frames);
out.push('');

out.push('--- ram_00ED (场景索引) 变化 ---');
out.push('trace 真实值: 2 → 0 → 7 → B8 → BF');
out.push('H5 变化: ' + JSON.stringify(log.edChanges.slice(0, 20)));
out.push('');

out.push('--- ram_0020 (PPU CTRL) 变化 ---');
out.push('trace 真实值: $08 → $88 → $80/$88 交替');
out.push('H5 变化: ' + JSON.stringify(log.ppuCtrl.slice(0, 20)));
out.push('');

out.push('--- ram_0021 (PPU MASK) 变化 ---');
out.push('trace 真实值: $06 → $1E → $00/$1E 交替');
out.push('H5 变化: ' + JSON.stringify(log.ppuMask.slice(0, 20)));
out.push('');

out.push('--- $05E8 buffer 填充 (非零写入) ---');
out.push('trace 真实值: 25 个 NT tile + 调色板数据由协程填充');
out.push('H5 填充数: ' + log.e8Fills.length);
if (log.e8Fills.length > 0) {
  out.push('前10: ' + JSON.stringify(log.e8Fills.slice(0, 10)));
}
out.push('');

// dump NT0 非零 tile
let nzNt = 0;
const nzTiles = [];
for (let y = 0; y < 30; y++) {
  for (let x = 0; x < 32; x++) {
    const e = game.store.readNT(0, x, y);
    if (e && e.tile !== 0) {
      nzNt++;
      nzTiles.push('[' + y + ',' + x + ']=#$' + e.tile.toString(16).toUpperCase().padStart(2, '0'));
    }
  }
}
out.push('--- NT0 非零 tile ---');
out.push('trace 真实值: 25 个 (TECMO 文字)');
out.push('H5: ' + nzNt + ' 个');
if (nzNt <= 30) for (const t of nzTiles) out.push('  ' + t);
out.push('');

// dump 调色板
const ppu = nes.ppu;
const pal = [];
for (let i = 0; i < 32; i++) pal.push(ppu.vramMem[0x3f00 + i] || 0);
out.push('--- 调色板 (vramMem $3F00) ---');
out.push('trace BG:  [#0F,#16,#00,#30,#0F,#0F,#0F,#0F,#0F,#11,#00,#30,#0F,#0F,#16,#26]');
out.push('H5 BG:     [' + pal.slice(0,16).map(v=>'#'+v.toString(16).toUpperCase().padStart(2,'0')).join(',') + ']');
out.push('trace SPR: [#0F,#05,#16,#15,#0F,#30,#27,#37,#0F,#10,#0F,#0F,#0F,#0F,#00,#30]');
out.push('H5 SPR:    [' + pal.slice(16,32).map(v=>'#'+v.toString(16).toUpperCase().padStart(2,'0')).join(',') + ']');
out.push('');

// PPU 渲染缓冲
const buf = ppu.buffer;
let nzBuf = 0;
for (let i = 0; i < buf.length; i++) if (buf[i] !== 0) nzBuf++;
out.push('--- PPU 渲染缓冲 ---');
out.push('非零像素: ' + nzBuf + '/' + buf.length + ' (trace: 应有 TECMO 文字)');
out.push('');

// OAM
let sprCount = 0;
for (let i = 0; i < 64; i++) {
  const y = ppu.spriteMem[i*4];
  if (y > 0 && y < 240) sprCount++;
}
out.push('--- OAM 可见精灵 ---');
out.push('H5: ' + sprCount);
out.push('');

console.log(out.join('\n'));
