/**
 * _verify_opening2.mjs — H5 片头 vs emu-full 定量对比 v2（ts-node/esm 运行）
 * 覆盖 f0-f4250 全片头，采样点加密：
 *   - NT tile / attrib 匹配率
 *   - palette 匹配
 *   - OAM 匹配
 *   - scroll 对比（emu state.json scroll vs H5 currentScroll）
 * 运行: node --loader ts-node/esm scripts/_verify_opening2.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime.ts';
import { Tsubasa2 } from '../src/game/index.ts';
import { OPENING_FADE_TABLE } from '../src/game/prg/data/scene/opening-data.ts';

const EMU = path.join(__dirname, '..', 'output', 'emu-full');

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
function fadeLookup(pal, fade) {
  if ((fade & 0xff) === 0) return 0x0f;
  const idx = ((pal & 0x30) + ((fade - 1) & 0x0f)) & 0x3f;
  return (OPENING_FADE_TABLE[idx] | (pal & 0x0f)) & 0x3f;
}

function loadJson(p) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; } }
const pct = (a, b) => (b ? ((a / b) * 100).toFixed(1) + '%' : '-');

const samples = new Set();
for (let f = 0; f <= 4250; f += 300) samples.add(f);
for (let f = 3720; f <= 3800; f += 5) samples.add(f);
for (let f = 2700; f <= 3000; f += 25) samples.add(f); // 双人射门附近
samples.add(3649);

const rows = [];
let lastSample = -1;
for (let f = 0; f <= 4250; f++) {
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
  const emuState = loadJson(path.join(emuDir, 'state.json'));

  let tileTotal = 0, tileOk = 0, attrTotal = 0, attrOk = 0, actTotal = 0, actOk = 0;
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
      if ((e.y & 0xff) < 0xf0) { oamActTotal++; if (all) oamActOk++; }
    }
  }

  let sc = '';
  if (emuState && emuState.scroll) {
    const es = emuState.scroll;
    const hs = game.openingScene ? game.openingScene.currentScroll : null;
    if (hs) {
      const okCv = (es.cntV ?? es.regV ?? 0) === hs.cv;
      const okCvt = ((es.cntVT ?? es.regVT ?? 0) & 0x1f) === (hs.cvt & 0x1f);
      const okFv = ((es.cntFV ?? es.regFV ?? 0) & 7) === (hs.fv & 7);
      sc = `cntV=${es.cntV ?? '-'}/${hs.cv}${okCv ? '' : 'X'} cvt=${es.cntVT ?? '-'}/${hs.cvt}${okCvt ? '' : 'X'} fv=${es.cntFV ?? '-'}/${hs.fv}${okFv ? '' : 'X'}`;
    }
  }

  rows.push({ f, nesF, tile: pct(tileOk, tileTotal), tileActive: pct(actOk, actTotal), attr: pct(attrOk, attrTotal), pal: pct(palOk, palTotal), oam: pct(oamOk, oamTotal), oamActive: pct(oamActOk, oamActTotal), scroll: sc });
  console.log(
    `f${String(f).padStart(4)} nes${String(nesF).padStart(4)}` +
      ` tile=${pct(tileOk, tileTotal)} actT=${pct(actOk, actTotal)}` +
      ` attr=${pct(attrOk, attrTotal)} pal=${pct(palOk, palTotal)}` +
      ` oam=${pct(oamOk, oamTotal)} actO=${pct(oamActOk, oamActTotal)}` +
      (sc ? ' | ' + sc : ''),
  );
}

fs.writeFileSync(path.join(__dirname, '..', '_verify_opening2.json'), JSON.stringify(rows, null, 2));
console.log('verify2 done -> _verify_opening2.json (last sample f=' + lastSample + ')');
