/**
 * 简化测试: 验证 $4C render exit fix
 */
import { GameContext } from './src/disasm/_context';
import { allBanks } from './src/disasm/banks/index';
import { _cfg } from './src/disasm/banks/bank_00_dispatch';
_cfg.verbose = false;
_cfg.fastSceneLoad = true;

import { ROM as r00 } from './src/disasm/banks/_romdata/bank_00_data';
import { ROM as r01 } from './src/disasm/banks/_romdata/bank_01_data';
import { ROM as r02 } from './src/disasm/banks/_romdata/bank_02_data';
import { ROM as r03 } from './src/disasm/banks/_romdata/bank_03_data';
import { ROM as r04 } from './src/disasm/banks/_romdata/bank_04_data';
import { ROM as r05 } from './src/disasm/banks/_romdata/bank_05_data';
import { ROM as r06 } from './src/disasm/banks/_romdata/bank_06_data';
import { ROM as r07 } from './src/disasm/banks/_romdata/bank_07_data';
import { ROM as r08 } from './src/disasm/banks/_romdata/bank_08_data';
import { ROM as r09 } from './src/disasm/banks/_romdata/bank_09_data';
import { ROM as r10 } from './src/disasm/banks/_romdata/bank_10_data';
import { ROM as r11 } from './src/disasm/banks/_romdata/bank_11_data';
import { ROM as r12 } from './src/disasm/banks/_romdata/bank_12_data';
import { ROM as r13 } from './src/disasm/banks/_romdata/bank_13_data';
import { ROM as r14 } from './src/disasm/banks/_romdata/bank_14_data';
import { ROM as r15 } from './src/disasm/banks/_romdata/bank_15_data';
import { ROM as r16 } from './src/disasm/banks/_romdata/bank_16_data';
import { ROM as r17 } from './src/disasm/banks/_romdata/bank_17_data';
import { ROM as r18 } from './src/disasm/banks/_romdata/bank_18_data';
import { ROM as r19 } from './src/disasm/banks/_romdata/bank_19_data';
import { ROM as r20 } from './src/disasm/banks/_romdata/bank_20_data';
import { ROM as r21 } from './src/disasm/banks/_romdata/bank_21_data';
import { ROM as r22 } from './src/disasm/banks/_romdata/bank_22_data';
import { ROM as r23 } from './src/disasm/banks/_romdata/bank_23_data';
import { ROM as r24 } from './src/disasm/banks/_romdata/bank_24_data';
import { ROM as r25 } from './src/disasm/banks/_romdata/bank_25_data';
import { ROM as r26 } from './src/disasm/banks/_romdata/bank_26_data';
import { ROM as r27 } from './src/disasm/banks/_romdata/bank_27_data';
import { ROM as r28 } from './src/disasm/banks/_romdata/bank_28_data';
import { ROM as r29 } from './src/disasm/banks/_romdata/bank_29_data';
import { ROM as r30 } from './src/disasm/banks/_romdata/bank_30_data';
import { ROM as r31 } from './src/disasm/banks/_romdata/bank_31_data';
import { ROM as r32 } from './src/disasm/banks/_romdata/bank_32_data';
import { ROM as r33 } from './src/disasm/banks/_romdata/bank_33_data';
import { ROM as r34 } from './src/disasm/banks/_romdata/bank_34_data';
import { ROM as r35 } from './src/disasm/banks/_romdata/bank_35_data';
import { ROM as r36 } from './src/disasm/banks/_romdata/bank_36_data';
import { ROM as r37 } from './src/disasm/banks/_romdata/bank_37_data';
import { ROM as r38 } from './src/disasm/banks/_romdata/bank_38_data';
import { ROM as r39 } from './src/disasm/banks/_romdata/bank_39_data';
import { ROM as r40 } from './src/disasm/banks/_romdata/bank_40_data';
import { ROM as r41 } from './src/disasm/banks/_romdata/bank_41_data';
import { ROM as r42 } from './src/disasm/banks/_romdata/bank_42_data';
import { ROM as r43 } from './src/disasm/banks/_romdata/bank_43_data';
import { ROM as r44 } from './src/disasm/banks/_romdata/bank_44_data';
import { ROM as r45 } from './src/disasm/banks/_romdata/bank_45_data';
import { ROM as r46 } from './src/disasm/banks/_romdata/bank_46_data';
import { ROM as r47 } from './src/disasm/banks/_romdata/bank_47_data';

const ROM_DATA = [r00,r01,r02,r03,r04,r05,r06,r07,r08,r09,r10,r11,r12,r13,r14,r15,r16,r17,r18,r19,r20,r21,r22,r23,r24,r25,r26,r27,r28,r29,r30,r31,r32,r33,r34,r35,r36,r37,r38,r39,r40,r41,r42,r43,r44,r45,r46,r47];

const PRG_BANK_SIZE = 0x2000;
const TOTAL_BANKS = ROM_DATA.length;

const BTN = { A:0x01, B:0x02, SELECT:0x04, START:0x08, UP:0x10, DOWN:0x20, LEFT:0x40, RIGHT:0x80 };

let bank8000 = 0, bankA000 = 1;
const ctx = new GameContext();
const origSet = ctx.ram.setU8.bind(ctx.ram);
ctx.ram.setU8 = (a: number, v: number) => {
  origSet(a, v);
  if (a === 0x8001) {
    const sel = ctx.ram.u8(0x8000) & 0x07;
    if (sel === 6) bank8000 = v;
    if (sel === 7) bankA000 = v;
  }
};
ctx.ram.setU8(0x24, 0);
ctx.ram.setU8(0x25, 1);

const rom = {
  bank(a: number) {
    const ca = a & 0xFFFF;
    let bn: number;
    if (ca >= 0xE000) bn = TOTAL_BANKS - 1;
    else if (ca >= 0xC000) bn = TOTAL_BANKS - 2;
    else if (ca >= 0xA000) bn = bankA000;
    else bn = bank8000;
    const d = new Uint8Array(PRG_BANK_SIZE);
    for (let i = 0; i < PRG_BANK_SIZE; i++) d[i] = ROM_DATA[bn]?.[i] ?? 0;
    return {
      u8(o: number) { return d[o] ?? 0; },
      u16le(o: number) { return (this.u8(o)) | (this.u8(o + 1) << 8); },
      data: d, romBase: bn * PRG_BANK_SIZE,
    };
  },
  u8(a: number) { return this.bank(a).u8(a & 0x1FFF); },
  u16le(a: number) { return this.bank(a).u16le(a & 0x1FFF); },
};

const H8 = (v: number) => (v & 0xFF).toString(16).toUpperCase().padStart(2, '0');

// Boot: only RESET, no extra dispatch
allBanks[31]?.fns?.['$FFF0']?.(ctx, rom);
console.log('Boot done. scene=' + H8(ctx.ram.u8(0x26)) + ' jmp=' + H8(ctx.ram.u8(0x27)) + ' sStat=' + H8(ctx.ram.u8(0x4C)));

let prevScene = ctx.ram.u8(0x26);
let prevJmp = ctx.ram.u8(0x27);
let sameJmpFrames = 0;
const maxFrame = 200;

for (let f = 1; f <= maxFrame; f++) {
  const mask = (f > 5 && f % 20 < 5) ? BTN.START : 0;
  const prevjo = ctx.ram.u8(0x1B);
  ctx.ram.setU8(0x1B, mask);
  ctx.ram.setU8(0x1C, mask & ~prevjo);
  ctx.ram.setU8(0x1D, prevjo);

  try {
    if (bank8000 === 0) allBanks[0]?.dispatch(ctx, rom);
  } catch(e: any) {
    console.log(`F${f} CRASH: ${e.message}`);
    break;
  }

  const scene = ctx.ram.u8(0x26);
  const jmp = ctx.ram.u8(0x27);
  const sStat = ctx.ram.u8(0x4C);
  const s28 = ctx.ram.u8(0x28);

  // Trace first few frames
  if (f <= 5 || f > maxFrame - 5) {
    console.log(`F${f} scene=$${H8(scene)} jmp=$${H8(jmp)} sStat=$${H8(sStat)} s28=$${H8(s28)} bank8=$${H8(bank8000)}`);
  }

  if (jmp === prevJmp) {
    sameJmpFrames++;
  } else {
    sameJmpFrames = 0;
    prevJmp = jmp;
  }

  if (scene !== prevScene) {
    console.log(`F${f} scene=$${H8(prevScene)} → $${H8(scene)} jmp=${H8(jmp)} sStat=${H8(sStat)} s28=${H8(s28)}`);
    prevScene = scene;
  }

  if (f % 50 === 0) {
    process.stdout.write(`\rF${f} scene=$${H8(scene)} jmp=${H8(jmp)} sStat=${H8(sStat)} s28=${H8(s28)} sameJmp=${sameJmpFrames}`);
  }

  if (sameJmpFrames > 200) {
    console.log(`\n⚠ F${f} jmp stuck at $${H8(jmp)} for ${sameJmpFrames} frames, sStat=$${H8(sStat)}`);
    break;
  }
}

console.log(`\n=== End at F${maxFrame} scene=$${H8(ctx.ram.u8(0x26))} sStat=$${H8(ctx.ram.u8(0x4C))} jmp=$${H8(ctx.ram.u8(0x27))} ===`);
