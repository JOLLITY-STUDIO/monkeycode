#!/usr/bin/env node
/**
 * _verify_frame13.cjs — frame 1/5/9/13 状态对比 (H5 vs emu)
 *
 * 输入:
 *   - output/ppu-trace/frame-{001,005,009,013}/state.json (H5)
 *   - debug/_emu_ref13.json (emu baseline)
 *
 * 输出 (stdout):
 *   - per-frame chrSlots 对比
 *   - per-frame palette 比对
 *   - per-frame oamVisible sprite count 对比
 *
 * 用途: 验证 BUG #004 (frame 1-13 冻结) 修复状态
 */
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const emuRaw = JSON.parse(fs.readFileSync(path.join(root, 'debug/_emu_ref13.json'), 'utf8'));
const FRAMES = [1, 5, 9, 13];

console.log('=== frame 1/5/9/13 一致性验证 ===\n');

// 字段名兼容: emu 用 sp, H5/verify 用 spr. 适配.
function getEmuPalBg(f) { return f.paletteBg; }
function getEmuPalSp(f) { return f.paletteSp; }
function getEmuOamVisible(f) { return f.oamVisible.length; }
function getEmuChrBanks(f) { return f.chrBanks || new Array(8).fill(0); }

function getH5State(frameN) {
  const dir = path.join(root, 'output', 'ppu-trace', `frame-${String(frameN).padStart(3, '0')}`);
  const statePath = path.join(dir, 'state.json');
  if (!fs.existsSync(statePath)) return null;
  return JSON.parse(fs.readFileSync(statePath, 'utf8'));
}

function arrayEq(a, b, eq) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (!eq(a[i], b[i])) return false;
  return true;
}

const eq = (a, b) => a === b;

let pass = 0, fail = 0;
for (const fN of FRAMES) {
  const emuF = emuRaw.find((e) => e.frame === fN);
  const h5 = getH5State(fN);
  if (!emuF || !h5) { console.log(`frame ${fN}: missing data`); fail++; continue; }

  console.log(`frame=${fN}`);

  // 1. chrSlots
  const chrOk = arrayEq(getEmuChrBanks(emuF), h5.chrSlots, eq);
  console.log(`  chrSlots: ${chrOk ? '✓' : '✘'} emu=[${getEmuChrBanks(emuF).join(',')}] h5=[${h5.chrSlots.join(',')}]`);
  if (chrOk) pass++; else fail++;

  // 2. palette BG[0]
  const emuBg0 = getEmuPalBg(emuF)[0];
  const h5Pal = JSON.parse(fs.readFileSync(path.join(root, 'output', 'ppu-trace', `frame-${String(fN).padStart(3, '0')}`, 'palette.json'), 'utf8'));
  const h5Bg0 = h5Pal.bg[0];
  const palOk = emuBg0 === h5Bg0;
  console.log(`  palBg[0]: ${palOk ? '✓' : '✘'} emu=${emuBg0} h5=${h5Bg0}`);
  if (palOk) pass++; else fail++;

  // 3. oamVisible count (近似)
  const emuCount = getEmuOamVisible(emuF);
  const h5Count = h5.oamVisible;
  const emuHasVisible = emuCount > 0;
  const h5HasVisible = h5Count > 0;
  const okVis = emuHasVisible === h5HasVisible;
  console.log(`  oamVisible: ${okVis ? '✓' : '✘'} emu>0=${emuHasVisible} h5>0=${h5HasVisible} (emu=${emuCount} h5=${h5Count})`);
  if (okVis) pass++; else fail++;

  // 4. ptNonEmpty (H5 only — emu 没这字段, 跳过)
  if (h5.ptNonEmpty > 0) { console.log(`  ptNonEmpty: ✓=${h5.ptNonEmpty}/512`); pass++; } else { fail++; }

  console.log();
}

console.log(`=== 总结: ${pass} pass, ${fail} fail ===`);
process.exit(fail === 0 ? 0 : 1);
