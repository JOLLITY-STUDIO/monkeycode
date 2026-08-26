/**
 * _verify_opening.cjs — H5 片头 vs emu-full 定量对比
 * 一次性跑 H5 f0-f3650，在采样帧比较：
 *   - NT tile 匹配率（emu nt.json，4 张表）
 *   - NT attrib 匹配率
 *   - palette 匹配（emu palette.json = PPU $3F00 内容；H5 侧用 fadeLookup 同语义）
 *   - OAM 匹配（emu oam.json vs store.shadowOam）
 */
const fs = require('fs');
const path = require('path');
const { HeadlessRuntime } = require('../src/game/runtime/HeadlessRuntime');
const { Tsubasa2 } = require('../src/game/index');

const EMU = path.join(__dirname, '..', 'output', 'emu-full');

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);

/** 与 InterruptService.fadeLookup 一致 */
let OPENING_FADE_TABLE = null;
try {
  ({ OPENING_FADE_TABLE } = require('../src/game/prg/data/scene/opening-data'));
} catch { /* 忽略 */ }
function fadeLookup(pal, fade) {
  if ((fade & 0xff) === 0) return 0x0f;
  const idx = ((pal & 0x30) + ((fade - 1) & 0x0f)) & 0x3f;
  return (OPENING_FADE_TABLE[idx] | (pal & 0x0f)) & 0x3f;
}

function loadJson(p) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; } }

const pct = (a, b) => (b ? ((a / b) * 100).toFixed(1) + '%' : '-');

const samples = new Set();
for (let f = 0; f <= 3600; f += 150) samples.add(f);
samples.add(3649);

const rows = [];
let lastSample = -1;
for (let f = 0; f <= 3650; f++) {
  runtime.frame(game);
  if (!samples.has(f)) continue;
  const nesF = f + 10;
  const store = game.store;
  const ppu = runtime.ppu;
  lastSample = f;

  const emuDir = path.join(EMU, 'frame-' + String(nesF).padStart(4, '0'));
  const emuNt = loadJson(path.join(emuDir, 'nt.json'));
  const emuPal = loadJson(path.join(emuDir, 'palette.json'));
  const emuOam = loadJson(path.join(emuDir, 'oam.json'));

  // NT
  let tileTotal = 0, tileOk = 0, attrTotal = 0, attrOk = 0;
  let actTotal = 0, actOk = 0;
  if (emuNt) {
    for (const e of emuNt) {
      const nt = ppu.nameTable[e.idx];
      if (!nt) continue;
      for (let i = 0; i < 1024; i++) {
        const ev = e.tile[i] & 0xff;
        const hv = nt.tile[i] & 0xff;
        tileTotal++;
        if (ev === hv) tileOk++;
        if (ev !== 0) { actTotal++; if (hv === ev) actOk++; }
        const ea = e.attrib[i] & 0xff;
        const ha = nt.attrib[i] & 0xff;
        attrTotal++;
        if (ea === ha) attrOk++;
      }
    }
  }

  // palette
  let palTotal = 0, palOk = 0;
  if (emuPal) {
    const fadeA = store.fade.bg & 0xff;
    const fadeB = store.fade.spr & 0xff;
    for (let i = 0; i < 16; i++) {
      palTotal++;
      if (fadeLookup(store.palette.bg[i], fadeA) === (emuPal.bg[i] & 0xff)) palOk++;
    }
    for (let i = 0; i < 16; i++) {
      palTotal++;
      if (fadeLookup(store.palette.spr[i], fadeB) === (emuPal.spr[i] & 0xff)) palOk++;
    }
  }

  // OAM
  let oamTotal = 0, oamOk = 0, oamActTotal = 0, oamActOk = 0;
  if (emuOam) {
    const shadow = store.oam.shadowOam;
    for (const e of emuOam) {
      const base = e.idx * 4;
      const ev = [e.y, e.tile, e.attr, e.x];
      let all = true;
      for (let k = 0; k < 4; k++) {
        oamTotal++;
        if ((shadow[base + k] & 0xff) === (ev[k] & 0xff)) oamOk++;
        else all = false;
      }
      if ((e.y & 0xff) < 0xf0) {
        oamActTotal++;
        if (all) oamActOk++;
      }
    }
  }

  rows.push({
    f, nesF,
    tile: pct(tileOk, tileTotal),
    tileActive: pct(actOk, actTotal),
    attr: pct(attrOk, attrTotal),
    pal: pct(palOk, palTotal),
    oam: pct(oamOk, oamTotal),
    oamActive: pct(oamActOk, oamActTotal),
  });
  console.log(
    `f${String(f).padStart(4)} nes${String(nesF).padStart(4)} scene=${store.readByte(0x00ed)}` +
      ` tile=${pct(tileOk, tileTotal)} actT=${pct(actOk, actTotal)}` +
      ` attr=${pct(attrOk, attrTotal)} pal=${pct(palOk, palTotal)}` +
      ` oam=${pct(oamOk, oamTotal)} actO=${pct(oamActOk, oamActTotal)}`,
  );
}

fs.writeFileSync(path.join(__dirname, '..', '_verify_opening.json'), JSON.stringify(rows, null, 2));
console.log('verify done -> _verify_opening.json (last sample f=' + lastSample + ')');
