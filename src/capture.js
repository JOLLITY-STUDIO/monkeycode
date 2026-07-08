/**
 * 素材捕获引擎 + 实体聚类 + 录制
 */

const SCREEN_W = 256;
const SCREEN_H = 240;
const TILE_SIZE_BYTES = 16;
const PT_TILES_PER_ROW = 16;
const ENTITY_PROXIMITY = 18;

export function decodeTile(vram, offset) {
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const lo = vram[offset + y];
    const hi = vram[offset + y + 8];
    for (let x = 0; x < 8; x++) {
      const bit = 1 << (7 - x);
      pixels[y * 8 + x] = ((lo & bit) ? 1 : 0) | ((hi & bit) ? 2 : 0);
    }
  }
  return pixels;
}

export function renderTileToBuffer(tilePixels, palette, palOffset, buf, bufW, dx, dy) {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const ci = tilePixels[y * 8 + x];
      const idx = (dx + x) + (dy + y) * bufW;
      buf[idx] = ci === 0 ? 0xFF000000 : (0xFF000000 | palette[palOffset + ci]);
    }
  }
}

export function capturePatternTable(vram, baseAddr, palette) {
  const buf = new Uint32Array(128 * 128);
  buf.fill(0xFF000000);
  for (let tileIdx = 0; tileIdx < 256; tileIdx++) {
    const offset = baseAddr + tileIdx * TILE_SIZE_BYTES;
    const pixels = decodeTile(vram, offset);
    const col = tileIdx % PT_TILES_PER_ROW;
    const row = Math.floor(tileIdx / PT_TILES_PER_ROW);
    renderTileToBuffer(pixels, palette, 0, buf, 128, col * 8, row * 8);
  }
  return buf;
}

export function captureNametable(nes, ntIndex) {
  const ppu = nes.ppu;
  const nametable = ppu.nameTable[ntIndex];
  if (!nametable) return null;

  const buf = new Uint32Array(256 * 240);
  buf.fill(0xFF000000);
  const bgPtBase = ppu.f_bgPatternTable ? 0x1000 : 0x0000;
  const palTable = ppu.palTable.curTable;

  for (let tileY = 0; tileY < 30; tileY++) {
    for (let tileX = 0; tileX < 32; tileX++) {
      const tileIdx = nametable.getTileIndex(tileX, tileY);
      const attrVal = nametable.getAttrib(tileX, tileY);
      const palGroup = (attrVal >> 2) & 3;
      const offset = bgPtBase + tileIdx * TILE_SIZE_BYTES;
      const pixels = decodeTile(ppu.vramMem, offset);

      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          const ci = pixels[y * 8 + x];
          const px = tileX * 8 + x;
          const py = tileY * 8 + y;
          if (px < 256 && py < 240) {
            if (ci === 0) {
              buf[px + py * 256] = 0xFF000000 | palTable[ppu.vramMem[0x3F00] & 0x3F];
            } else {
              buf[px + py * 256] = 0xFF000000 | palTable[ppu.vramMem[0x3F00 + palGroup * 4 + ci] & 0x3F];
            }
          }
        }
      }
    }
  }
  return buf;
}

export function captureSprites(nes) {
  const ppu = nes.ppu;
  const sprites = [];
  for (let i = 0; i < 64; i++) {
    const base = i * 4;
    const y = ppu.spriteMem[base];
    const tileIdx = ppu.spriteMem[base + 1];
    const attr = ppu.spriteMem[base + 2];
    const x = ppu.spriteMem[base + 3];
    if (y >= 0xEF) continue;
    sprites.push({
      index: i,
      x, y: y + 1,
      tileIndex: tileIdx,
      palette: attr & 3,
      priority: (attr >> 5) & 1,
      flipH: !!(attr & 0x40),
      flipV: !!(attr & 0x80),
      behindBg: !!(attr & 0x20),
    });
  }
  return sprites;
}

export function captureSpriteVisualization(nes) {
  const ppu = nes.ppu;
  const buf = new Uint32Array(256 * 240);
  buf.fill(0xFF000000);
  const spPtBase = ppu.f_spPatternTable ? 0x1000 : 0x0000;
  const palTable = ppu.palTable.curTable;

  for (let i = 63; i >= 0; i--) {
    const base = i * 4;
    const y = ppu.spriteMem[base];
    const tileIdx = ppu.spriteMem[base + 1];
    const attr = ppu.spriteMem[base + 2];
    const x = ppu.spriteMem[base + 3];
    if (y >= 0xEF) continue;
    const palGroup = (attr & 3) + 4;
    const flipH = !!(attr & 0x40);
    const flipV = !!(attr & 0x80);
    const offset = spPtBase + tileIdx * TILE_SIZE_BYTES;
    const pixels = decodeTile(ppu.vramMem, offset);
    for (let ty = 0; ty < 8; ty++) {
      for (let tx = 0; tx < 8; tx++) {
        const sx = flipH ? (7 - tx) : tx;
        const sy = flipV ? (7 - ty) : ty;
        const ci = pixels[sy * 8 + tx];
        const px = x + sx;
        const py = y + 1 + ty;
        if (px >= 0 && px < 256 && py >= 0 && py < 240 && ci !== 0) {
          buf[px + py * 256] = 0xFF000000 | palTable[ppu.vramMem[0x3F00 + palGroup * 4 + ci] & 0x3F];
        }
      }
    }
  }
  return buf;
}

export function capturePalettes(nes) {
  const ppu = nes.ppu;
  const palTable = ppu.palTable.curTable;
  const bgPalettes = [];
  for (let g = 0; g < 4; g++) {
    const colors = [];
    for (let c = 0; c < 4; c++) {
      colors.push(palTable[ppu.vramMem[0x3F00 + g * 4 + c] & 0x3F]);
    }
    bgPalettes.push(colors);
  }
  const sprPalettes = [];
  for (let g = 0; g < 4; g++) {
    const colors = [];
    for (let c = 0; c < 4; c++) {
      colors.push(palTable[ppu.vramMem[0x3F10 + g * 4 + c] & 0x3F]);
    }
    sprPalettes.push(colors);
  }
  const fullPalette = [];
  for (let i = 0; i < 64; i++) {
    fullPalette.push(palTable[i]);
  }
  return { bgPalettes, sprPalettes, fullPalette };
}

export function captureAudioState(nes) {
  const papu = nes.papu;
  const ch = (c) => ({
    enabled: c.isEnabled !== false,
    lengthCounter: c.lengthCounter ?? 0,
    progTimerMax: c.progTimerMax ?? 0,
    progTimerCount: c.progTimerCount ?? 0,
    sampleValue: c.sampleValue ?? 0,
    masterVolume: c.masterVolume ?? 0,
  });
  return {
    channelEnable: papu.channelEnableValue,
    frameStep: papu.frameStep,
    sampleCount: papu.sampleCount,
    square1: {
      ...ch(papu.square1), dutyMode: papu.square1.dutyMode ?? 0,
      sweepActive: papu.square1.sweepActive ?? false,
      envVolume: papu.square1.envVolume ?? 0,
      envDecayRate: papu.square1.envDecayRate ?? 0,
    },
    square2: {
      ...ch(papu.square2), dutyMode: papu.square2.dutyMode ?? 0,
      sweepActive: papu.square2.sweepActive ?? false,
      envVolume: papu.square2.envVolume ?? 0,
      envDecayRate: papu.square2.envDecayRate ?? 0,
    },
    triangle: {
      ...ch(papu.triangle),
      linearCounter: papu.triangle.linearCounter ?? 0,
      linearCounterReload: papu.triangle.linearCounterReload ?? false,
    },
    noise: {
      ...ch(papu.noise),
      envVolume: papu.noise.envVolume ?? 0,
      envDecayRate: papu.noise.envDecayRate ?? 0,
      shiftReg: papu.noise.shiftReg ?? 0,
    },
    dmc: {
      ...ch(papu.dmc),
      irqGenerated: papu.dmc.irqGenerated ?? false,
      curSample: papu.dmc.curSample ?? 0,
      dmaLength: papu.dmc.dmaLength ?? 0,
      dmaAddress: papu.dmc.dmaAddress ?? 0,
    },
    masterVolume: papu.masterVolume,
  };
}

export function captureCpuState(nes) {
  const cpu = nes.cpu;
  const ppu = nes.ppu;
  if (!cpu || !ppu) return null;
  const status =
    (cpu.F_SIGN ? 0x80 : 0) |
    (cpu.F_OVERFLOW ? 0x40 : 0) |
    0x20 |
    (cpu.F_BREAK ? 0x10 : 0) |
    (cpu.F_DECIMAL ? 0x08 : 0) |
    (cpu.F_INTERRUPT ? 0x04 : 0) |
    (cpu.F_ZERO === 0 ? 0x02 : 0) |
    (cpu.F_CARRY ? 0x01 : 0);
  return {
    pc: cpu.REG_PC,
    a: cpu.REG_ACC,
    x: cpu.REG_X,
    y: cpu.REG_Y,
    sp: cpu.REG_SP,
    p: status,
    ppu: {
      scanline: ppu.scanline,
      nmiOnVblank: ppu.f_nmiOnVblank,
      spriteSize: ppu.f_spriteSize,
      bgPatternTable: ppu.f_bgPatternTable,
      spPatternTable: ppu.f_spPatternTable,
      bgVisible: ppu.f_bgVisibility,
      spVisible: ppu.f_spVisibility,
      vblank: !!(ppu.regS & 0x80),
    },
  };
}

// ---- 6502 反汇编 ----

const INS_NAMES = [
  'ADC','AND','ASL','BCC','BCS','BEQ','BIT','BMI','BNE','BPL',
  'BRK','BVC','BVS','CLC','CLD','CLI','CLV','CMP','CPX','CPY',
  'DEC','DEX','DEY','EOR','INC','INX','INY','JMP','JSR','LDA',
  'LDX','LDY','LSR','NOP','ORA','PHA','PHP','PLA','PLP','ROL',
  'ROR','RTI','RTS','SBC','SEC','SED','SEI','STA','STX','STY',
  'TAX','TAY','TSX','TXA','TXS','TYA',
];

// opcode -> [instruction index, bytes]
// prettier-ignore
const OPCODE_INFO = new Uint8Array(512);
function setOp(op, ins, bytes) { OPCODE_INFO[op*2]=ins; OPCODE_INFO[op*2+1]=bytes; }
// ADC
setOp(0x69,0,2);setOp(0x65,0,2);setOp(0x75,0,2);setOp(0x6d,0,3);setOp(0x7d,0,3);setOp(0x79,0,3);setOp(0x61,0,2);setOp(0x71,0,2);
// AND
setOp(0x29,1,2);setOp(0x25,1,2);setOp(0x35,1,2);setOp(0x2d,1,3);setOp(0x3d,1,3);setOp(0x39,1,3);setOp(0x21,1,2);setOp(0x31,1,2);
// ASL
setOp(0x0a,2,1);setOp(0x06,2,2);setOp(0x16,2,2);setOp(0x0e,2,3);setOp(0x1e,2,3);
// BCC BCS BEQ BIT BMI BNE BPL
setOp(0x90,3,2);setOp(0xb0,4,2);setOp(0xf0,5,2);setOp(0x24,6,2);setOp(0x2c,6,3);
setOp(0x30,7,2);setOp(0xd0,8,2);setOp(0x10,9,2);
// BRK BVC BVS
setOp(0x00,10,1);setOp(0x50,11,2);setOp(0x70,12,2);
// CLC CLD CLI CLV
setOp(0x18,13,1);setOp(0xd8,14,1);setOp(0x58,15,1);setOp(0xb8,16,1);
// CMP
setOp(0xc9,17,2);setOp(0xc5,17,2);setOp(0xd5,17,2);setOp(0xcd,17,3);setOp(0xdd,17,3);setOp(0xd9,17,3);setOp(0xc1,17,2);setOp(0xd1,17,2);
// CPX CPY
setOp(0xe0,18,2);setOp(0xe4,18,2);setOp(0xec,18,3);
setOp(0xc0,19,2);setOp(0xc4,19,2);setOp(0xcc,19,3);
// DEC DEX DEY
setOp(0xc6,20,2);setOp(0xd6,20,2);setOp(0xce,20,3);setOp(0xde,20,3);
setOp(0xca,21,1);setOp(0x88,22,1);
// EOR
setOp(0x49,23,2);setOp(0x45,23,2);setOp(0x55,23,2);setOp(0x4d,23,3);setOp(0x5d,23,3);setOp(0x59,23,3);setOp(0x41,23,2);setOp(0x51,23,2);
// INC INX INY
setOp(0xe6,24,2);setOp(0xf6,24,2);setOp(0xee,24,3);setOp(0xfe,24,3);
setOp(0xe8,25,1);setOp(0xc8,26,1);
// JMP JSR
setOp(0x4c,27,3);setOp(0x6c,27,3);setOp(0x20,28,3);
// LDA
setOp(0xa9,29,2);setOp(0xa5,29,2);setOp(0xb5,29,2);setOp(0xad,29,3);setOp(0xbd,29,3);setOp(0xb9,29,3);setOp(0xa1,29,2);setOp(0xb1,29,2);
// LDX LDY
setOp(0xa2,30,2);setOp(0xa6,30,2);setOp(0xb6,30,2);setOp(0xae,30,3);setOp(0xbe,30,3);
setOp(0xa0,31,2);setOp(0xa4,31,2);setOp(0xb4,31,2);setOp(0xac,31,3);setOp(0xbc,31,3);
// LSR
setOp(0x4a,32,1);setOp(0x46,32,2);setOp(0x56,32,2);setOp(0x4e,32,3);setOp(0x5e,32,3);
// NOP
setOp(0xea,33,1);
// ORA
setOp(0x09,34,2);setOp(0x05,34,2);setOp(0x15,34,2);setOp(0x0d,34,3);setOp(0x1d,34,3);setOp(0x19,34,3);setOp(0x01,34,2);setOp(0x11,34,2);
// PHA PHP PLA PLP
setOp(0x48,35,1);setOp(0x08,36,1);setOp(0x68,37,1);setOp(0x28,38,1);
// ROL
setOp(0x2a,39,1);setOp(0x26,39,2);setOp(0x36,39,2);setOp(0x2e,39,3);setOp(0x3e,39,3);
// ROR
setOp(0x6a,40,1);setOp(0x66,40,2);setOp(0x76,40,2);setOp(0x6e,40,3);setOp(0x7e,40,3);
// RTI RTS
setOp(0x40,41,1);setOp(0x60,42,1);
// SBC
setOp(0xe9,43,2);setOp(0xeb,43,2);setOp(0xe5,43,2);setOp(0xf5,43,2);setOp(0xed,43,3);setOp(0xfd,43,3);setOp(0xf9,43,3);setOp(0xe1,43,2);setOp(0xf1,43,2);
// SEC SED SEI
setOp(0x38,44,1);setOp(0xf8,45,1);setOp(0x78,46,1);
// STA
setOp(0x85,47,2);setOp(0x95,47,2);setOp(0x8d,47,3);setOp(0x9d,47,3);setOp(0x99,47,3);setOp(0x81,47,2);setOp(0x91,47,2);
// STX STY
setOp(0x86,48,2);setOp(0x96,48,2);setOp(0x8e,48,3);
setOp(0x84,49,2);setOp(0x94,49,2);setOp(0x8c,49,3);
// TAX TAY TSX TXA TXS TYA
setOp(0xaa,50,1);setOp(0xa8,51,1);setOp(0xba,52,1);setOp(0x8a,53,1);setOp(0x9a,54,1);setOp(0x98,55,1);

export function disassembleAt(nes, addr, count = 20) {
  const mmap = nes.mmap;
  if (!mmap) return [];
  const lines = [];
  for (let i = 0; i < count && addr < 0x10000; i++) {
    const opcode = mmap.load(addr);
    const insIdx = OPCODE_INFO[opcode * 2];
    const size = OPCODE_INFO[opcode * 2 + 1] || 1;
    const name = insIdx != null ? INS_NAMES[insIdx] : '???';

    let bytes = '';
    for (let b = 0; b < size; b++) {
      bytes += mmap.load(addr + b).toString(16).padStart(2,'0') + ' ';
    }
    bytes = bytes.trim().padEnd(9);
    const marker = addr === nes.cpu.REG_PC ? '>' : ' ';
    const operand = formatOperand(mmap, addr, opcode, size);
    lines.push({ addr, marker, bytes, name, operand, isCurrent: addr === nes.cpu.REG_PC });
    addr += size;
  }
  return lines;
}

function formatOperand(mmap, addr, opcode, size) {
  if (size < 2) return '';
  const lo = mmap.load(addr + 1);
  if (size < 3) return `$${lo.toString(16).padStart(2,'0').toUpperCase()}`;
  const hi = mmap.load(addr + 2);
  const val = lo | (hi << 8);
  return `$${val.toString(16).padStart(4,'0').toUpperCase()}`;
}

// ---- 实体聚类 ----

let entityIdCounter = 0;
const trackedEntities = new Map();
const entityHistory = [];

export function clusterSpritesIntoTiles(sprites, ppu) {
  if (sprites.length === 0) return [];

  const spPtBase = ppu.f_spPatternTable ? 0x1000 : 0x0000;
  const palTable = ppu.palTable.curTable;

  // 按邻近度聚类
  const visited = new Set();
  const clusters = [];

  for (const s of sprites) {
    if (visited.has(s.index)) continue;
    visited.add(s.index);
    const cluster = [s];
    // BFS 扩展
    let changed = true;
    while (changed) {
      changed = false;
      for (const s2 of sprites) {
        if (visited.has(s2.index)) continue;
        for (const c of cluster) {
          const dx = Math.abs(c.x - s2.x);
          const dy = Math.abs(c.y - s2.y);
          if (dx <= ENTITY_PROXIMITY && dy <= ENTITY_PROXIMITY && c.palette === s2.palette) {
            cluster.push(s2);
            visited.add(s2.index);
            changed = true;
            break;
          }
        }
      }
    }
    if (cluster.length >= 1) {
      clusters.push(cluster);
    }
  }

  return clusters.map((cluster) => {
    let minX = 256, minY = 240, maxX = 0, maxY = 0;
    for (const s of cluster) {
      minX = Math.min(minX, s.x);
      minY = Math.min(minY, s.y);
      maxX = Math.max(maxX, s.x + 8);
      maxY = Math.max(maxY, s.y + 8);
    }
    const w = maxX - minX;
    const h = maxY - minY;
    const buf = new Uint32Array(w * h);
    buf.fill(0);

    for (const s of cluster) {
      const offset = spPtBase + s.tileIndex * TILE_SIZE_BYTES;
      const pixels = decodeTile(ppu.vramMem, offset);
      const palGroup = (s.palette & 3) + 4;
      for (let ty = 0; ty < 8; ty++) {
        for (let tx = 0; tx < 8; tx++) {
          const sx = s.flipH ? (7 - tx) : tx;
          const sy = s.flipV ? (7 - ty) : ty;
          const ci = pixels[sy * 8 + tx];
          if (ci === 0) continue;
          const px = (s.x - minX) + sx;
          const py = (s.y - minY) + sy;
          if (px >= 0 && px < w && py >= 0 && py < h) {
            buf[px + py * w] = 0xFF000000 | palTable[ppu.vramMem[0x3F00 + palGroup * 4 + ci] & 0x3F];
          }
        }
      }
    }

    const fingerprint = cluster.map(s => `${s.tileIndex}:${s.x}:${s.y}:${s.flipH}:${s.flipV}:${s.palette}`).sort().join('|');

    return {
      id: getEntityId(cluster, fingerprint),
      spriteCount: cluster.length,
      sprites: cluster,
      x: minX, y: minY, w, h,
      width: w, height: h,
      centerX: Math.round((minX + maxX) / 2),
      centerY: Math.round((minY + maxY) / 2),
      palette: cluster[0].palette,
      buffer: buf,
      fingerprint,
    };
  });
}

function getEntityId(cluster, fingerprint) {
  for (const [id, data] of trackedEntities) {
    if (data.fingerprint === fingerprint) return id;
    // 位置邻近匹配
    const cx = cluster.reduce((a, s) => a + s.x, 0) / cluster.length;
    const cy = cluster.reduce((a, s) => a + s.y, 0) / cluster.length;
    const dx = Math.abs(cx - data.centerX);
    const dy = Math.abs(cy - data.centerY);
    if (dx < 24 && dy < 24 && cluster.length === data.spriteCount) {
      data.centerX = cx;
      data.centerY = cy;
      data.fingerprint = fingerprint;
      return id;
    }
  }
  const newId = ++entityIdCounter;
  const cx = cluster.reduce((a, s) => a + s.x, 0) / cluster.length;
  const cy = cluster.reduce((a, s) => a + s.y, 0) / cluster.length;
  trackedEntities.set(newId, {
    fingerprint,
    centerX: cx,
    centerY: cy,
    spriteCount: cluster.length,
    firstSeen: Date.now(),
  });
  if (trackedEntities.size > 128) {
    const first = trackedEntities.keys().next().value;
    trackedEntities.delete(first);
  }
  return newId;
}

export function resetEntityTracking() {
  entityIdCounter = 0;
  trackedEntities.clear();
  entityHistory.length = 0;
}

// ---- 动画录制 ----

const animationFrames = new Map();
let recordingEnabled = false;

export function startRecording() {
  recordingEnabled = true;
  animationFrames.clear();
}

export function stopRecording() {
  recordingEnabled = false;
}

export function recordFrame(entities) {
  if (!recordingEnabled) return;
  for (const e of entities) {
    if (!animationFrames.has(e.id)) {
      animationFrames.set(e.id, {
        id: e.id,
        frames: [],
        seenHashes: new Set(),
      });
    }
    const data = animationFrames.get(e.id);
    const hash = e.fingerprint;
    if (!data.seenHashes.has(hash)) {
      data.seenHashes.add(hash);
      data.frames.push({
        index: data.frames.length,
        width: e.width,
        height: e.height,
        buffer: new Uint32Array(e.buffer),
        fingerprint: hash,
      });
    }
  }
}

export function getRecordingSummary() {
  const result = [];
  for (const [, data] of animationFrames) {
    if (data.frames.length > 0) {
      result.push({
        entityId: data.id,
        frameCount: data.frames.length,
        frames: data.frames,
      });
    }
  }
  return result;
}

export function exportSpriteSheet(entities, cols = 8) {
  const allFrames = [];
  for (const [, data] of animationFrames) {
    allFrames.push(...data.frames);
  }
  if (allFrames.length === 0) return null;

  const maxW = Math.max(...allFrames.map(f => f.width));
  const maxH = Math.max(...allFrames.map(f => f.height));
  const rows = Math.ceil(allFrames.length / cols);
  const sheetW = cols * maxW;
  const sheetH = rows * maxH;
  const sheet = new Uint32Array(sheetW * sheetH);
  sheet.fill(0);

  allFrames.forEach((f, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const dx = col * maxW;
    const dy = row * maxH;
    for (let y = 0; y < f.height; y++) {
      for (let x = 0; x < f.width; x++) {
        sheet[(dx + x) + (dy + y) * sheetW] = f.buffer[x + y * f.width];
      }
    }
  });

  return { buffer: sheet, width: sheetW, height: sheetH, frameCount: allFrames.length, frameW: maxW, frameH: maxH, cols, rows };
}
