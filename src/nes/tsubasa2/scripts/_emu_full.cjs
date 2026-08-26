"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core/debug/pattern-table-viewer.ts
var pattern_table_viewer_exports = {};
__export(pattern_table_viewer_exports, {
  buildChrBankMapByScanline: () => buildChrBankMapByScanline,
  buildFinalChrBankMap: () => buildFinalChrBankMap,
  drainChrSwitchLog: () => drainChrSwitchLog,
  generatePTDataText: () => generatePTDataText,
  getChrSwitchesInRange: () => getChrSwitchesInRange,
  pushChrSwitch: () => pushChrSwitch,
  renderBothPatternTables: () => renderBothPatternTables,
  renderBothPatternTablesAtScanline: () => renderBothPatternTablesAtScanline,
  renderPatternTable: () => renderPatternTable,
  renderPatternTableAtScanline: () => renderPatternTableAtScanline
});
function drawBankBorders(buf, tableIdx) {
  for (let slot = 1; slot < 4; slot++) {
    const y = slot * 32;
    const color = BANK_BORDER_COLORS[(tableIdx * 4 + slot - 1) % BANK_BORDER_COLORS.length];
    for (let x = 0; x < 128; x++) {
      buf[y * 128 + x] = color;
    }
  }
}
function renderPatternTable(nes2, tableIdx, paletteOffset = 0, paletteSrc) {
  const ppu2 = nes2.ppu;
  const baseTile = tableIdx * 256;
  const buf = new Uint32Array(128 * 128);
  const pal = paletteSrc || ppu2.imgPalette;
  const offset = paletteOffset * 4;
  const backdrop = pal[0];
  for (let ty = 0; ty < 16; ty++) {
    for (let tx = 0; tx < 16; tx++) {
      const tileIdx = baseTile + ty * 16 + tx;
      const ptTile = ppu2.ptTile[tileIdx];
      const baseX = tx * 8;
      const baseY = ty * 8;
      if (ptTile && ptTile.pix) {
        const pix = ptTile.pix;
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            const colIdx = pix[py * 8 + px];
            buf[(baseY + py) * 128 + (baseX + px)] = colIdx === 0 ? backdrop : pal[colIdx + offset] ?? backdrop;
          }
        }
      } else {
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            buf[(baseY + py) * 128 + (baseX + px)] = 4282664004;
          }
        }
      }
    }
  }
  drawBankBorders(buf, tableIdx);
  return { data: buf, width: 128, height: 128 };
}
function renderBothPatternTables(nes2, paletteOffset = 0, palT0, palT1) {
  return {
    table0: renderPatternTable(nes2, 0, paletteOffset, palT0),
    table1: renderPatternTable(nes2, 1, paletteOffset, palT1),
    bgTable: nes2.ppu.f_bgPatternTable ? 1 : 0,
    spTable: nes2.ppu.f_spPatternTable ? 1 : 0
  };
}
function pushChrSwitch(rec) {
  chrSwitchLog.push(rec);
}
function drainChrSwitchLog() {
  const out = chrSwitchLog.slice();
  chrSwitchLog.length = 0;
  return out;
}
function getChrSwitchesInRange(scanStart, scanEnd) {
  return chrSwitchLog.filter((r) => r.scanline >= scanStart && r.scanline < scanEnd);
}
function buildFinalChrBankMap(switches, initialBanks) {
  const banks = new Uint8Array(initialBanks);
  for (const r of switches) {
    banks[r.slot] = r.bank1k & 255;
  }
  return banks;
}
function buildChrBankMapByScanline(switches, initialBanks) {
  const out = /* @__PURE__ */ new Map();
  let banks = new Uint8Array(initialBanks);
  let curScan = -1;
  for (const r of switches) {
    if (r.scanline !== curScan) {
      if (curScan >= 0) out.set(curScan, new Uint8Array(banks));
      curScan = r.scanline;
    }
    banks[r.slot] = r.bank1k & 255;
  }
  if (curScan >= 0) out.set(curScan, new Uint8Array(banks));
  return out;
}
function renderPatternTableAtScanline(nes2, tableIdx, slotBanks, paletteOffset = 0) {
  const ppu2 = nes2.ppu;
  const buf = new Uint32Array(128 * 128);
  const pal = ppu2.imgPalette;
  const offset = paletteOffset * 4;
  const backdrop = pal[0];
  const vromTile = nes2.rom && nes2.rom.vromTile;
  const slotBase = tableIdx * 4;
  for (let ty = 0; ty < 16; ty++) {
    for (let tx = 0; tx < 16; tx++) {
      const slot = slotBase + (ty >> 2);
      const tileInSlot = (ty & 3) * 16 + tx;
      const bank1k = slotBanks[slot];
      const baseX = tx * 8, baseY = ty * 8;
      let tile = null;
      if (vromTile && bank1k != null) {
        const bank4k = bank1k / 4 | 0;
        const offIn4k = bank1k % 4 * 64 + tileInSlot;
        tile = vromTile[bank4k] ? vromTile[bank4k][offIn4k] : null;
      }
      if (tile && tile.pix) {
        const pix = tile.pix;
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            const ci = pix[py * 8 + px];
            buf[(baseY + py) * 128 + (baseX + px)] = ci === 0 ? backdrop : pal[ci + offset] ?? backdrop;
          }
        }
      } else {
        for (let py = 0; py < 8; py++) {
          for (let px = 0; px < 8; px++) {
            buf[(baseY + py) * 128 + (baseX + px)] = 4282664004;
          }
        }
      }
    }
  }
  drawBankBorders(buf, tableIdx);
  return { data: buf, width: 128, height: 128 };
}
function renderBothPatternTablesAtScanline(nes2, slotBanks, paletteOffset = 0) {
  return {
    table0: renderPatternTableAtScanline(nes2, 0, slotBanks, paletteOffset),
    table1: renderPatternTableAtScanline(nes2, 1, slotBanks, paletteOffset),
    bgTable: nes2.ppu.f_bgPatternTable ? 1 : 0,
    spTable: nes2.ppu.f_spPatternTable ? 1 : 0
  };
}
function generatePTDataText(nes2, frameCount) {
  const ppu2 = nes2.ppu;
  if (!ppu2) return "";
  const mapper = nes2.mmap;
  const isMmc1 = mapper && typeof mapper.vromSwitchingSize === "number";
  const chrBanks = mapper && mapper.chrBanks ? Array.from(mapper.chrBanks) : null;
  const lines = [];
  const COL_HEADER = "Row ";
  const spTable = ppu2.f_spPatternTable ? 1 : 0;
  const spAddr = spTable === 0 ? "$0000" : "$1000";
  const bgAddr = ppu2.regS === 0 ? "$0000" : "$1000";
  lines.push(`\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550`);
  lines.push(`Frame: #${frameCount ?? "?"}  |  Pattern Tables  (BG PT=${bgAddr}  SP PT=${spAddr})`);
  if (isMmc1) {
    const modeStr = mapper.vromSwitchingSize === 0 ? "8KB" : "4KB";
    lines.push(`MMC1 CHR: ${modeStr} mode  (vromSwitchingSize=${mapper.vromSwitchingSize})`);
    lines.push(`  Table0 ($0000-$0FFF) \u2192 4KB CHR bank #${String(mapper.chrBank4k_0000 ?? "?").padStart(2)}  [Reg 1: $0000]`);
    lines.push(`  Table1 ($1000-$1FFF) \u2192 4KB CHR bank #${String(mapper.chrBank4k_1000 ?? "?").padStart(2)}  [Reg 2: $1000]`);
  } else if (chrBanks) {
    lines.push(`CHR 1KB bank mapping:`);
    lines.push(`  Table0 ($0000): B0=#${String(chrBanks[0]).padStart(2)}  B1=#${String(chrBanks[1]).padStart(2)}  B2=#${String(chrBanks[2]).padStart(2)}  B3=#${String(chrBanks[3]).padStart(2)}`);
    lines.push(`  Table1 ($1000): B4=#${String(chrBanks[4]).padStart(2)}  B5=#${String(chrBanks[5]).padStart(2)}  B6=#${String(chrBanks[6]).padStart(2)}  B7=#${String(chrBanks[7]).padStart(2)}`);
  } else {
    lines.push(`CHR banks: (no mapper info available)`);
  }
  lines.push(`\u56FE\u4F8B: \u2588=\u6709\u5185\u5BB9  \u2591=\u7A00\u758F  \xB7=\u5168\u900F\u660E  !=\u65E0CHR  \u683C\u5F0F: bank:offset  \u8FB9\u754C\u8272: \u7EA2/\u7EFF/\u84DD/\u91D1=4\u4E2A1KB slot\u5206\u754C`);
  lines.push(`\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550`);
  lines.push("");
  const BANK_BORDER_LABELS_DESK = ["\u25B2 B0", "\u25B2 B1", "\u25B2 B2"];
  const BANK_BORDER_LABELS_TBL1 = ["\u25B2 B4", "\u25B2 B5", "\u25B2 B6"];
  const SEP_WIDTH = 81;
  for (let tableIdx = 0; tableIdx < 2; tableIdx++) {
    const addr = tableIdx === 0 ? "$0000" : "$1000";
    const role = tableIdx === spTable ? "SP" : "BG";
    const borderLabels = tableIdx === 0 ? BANK_BORDER_LABELS_DESK : BANK_BORDER_LABELS_TBL1;
    const slotBase = tableIdx * 4;
    const labels = [];
    for (let ty = 0; ty <= 16; ty++) {
      if (ty === 4) labels.push(borderLabels[0]);
      else if (ty === 8) labels.push(borderLabels[1]);
      else if (ty === 12) labels.push(borderLabels[2]);
      else if (ty === 0 || ty === 16) labels.push("\u2500".repeat(SEP_WIDTH));
      else labels.push("");
    }
    lines.push(`\u2500\u2500 Table ${tableIdx} (${addr}, ${role})  slots=${slotBase}~${slotBase + 3} \u2500\u2500`);
    let header = COL_HEADER;
    for (let tx = 0; tx < 16; tx++) {
      header += "  " + tx.toString(16).toUpperCase().padStart(3, " ");
    }
    lines.push(header);
    for (let ty = 0; ty < 16; ty++) {
      if (labels[ty]) lines.push(`     ${labels[ty]}`);
      const slot = Math.floor(ty / 4);
      const bankId = chrBanks ? chrBanks[slotBase + slot] : null;
      const bankStr = bankId != null ? bankId.toString(16).toUpperCase().padStart(2, "0") : "??";
      const row = [];
      for (let tx = 0; tx < 16; tx++) {
        const tileIdx = tableIdx * 256 + ty * 16 + tx;
        const ptTile = ppu2.ptTile[tileIdx];
        const offset = ty % 4 * 16 + tx;
        const offStr = offset.toString(16).toUpperCase().padStart(2, "0");
        let chrStatus;
        if (!ptTile || !ptTile.pix) {
          chrStatus = "!";
        } else {
          let nonZero = 0;
          for (let i = 0; i < 64; i++) {
            if (ptTile.pix[i] !== 0) nonZero++;
          }
          if (nonZero === 0) chrStatus = "\xB7";
          else if (nonZero < 32) chrStatus = "\u2591";
          else chrStatus = "\u2588";
        }
        row.push(bankStr + ":" + offStr + chrStatus);
      }
      lines.push(ty.toString().padStart(3, " ") + " " + row.join(""));
    }
    lines.push("");
    lines.push("");
  }
  return lines.join("\n");
}
var BANK_BORDER_COLORS, chrSwitchLog;
var init_pattern_table_viewer = __esm({
  "src/core/debug/pattern-table-viewer.ts"() {
    "use strict";
    BANK_BORDER_COLORS = [
      4294918208,
      // slot0/4: 红
      4282449728,
      // slot1/5: 绿
      4282401023,
      // slot2/6: 蓝
      4294953984
      // slot3/7: 金
    ];
    chrSwitchLog = [];
  }
});

// scripts/_emu_full.ts
var fs2 = __toESM(require("fs"));
var path = __toESM(require("path"));
var zlib = __toESM(require("zlib"));

// src/core/utils.ts
function copyArrayElements(src, srcPos, dest, destPos, length) {
  for (let i = 0; i < length; ++i) {
    dest[destPos + i] = src[srcPos + i];
  }
}
function fromJSON(obj, state) {
  const props = obj.constructor.JSON_PROPERTIES;
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    const current = obj[prop];
    const value = state[prop];
    if (ArrayBuffer.isView(current) && Array.isArray(value)) {
      current.set(value);
    } else {
      obj[prop] = value;
    }
  }
}
function toJSON(obj) {
  const state = {};
  const props = obj.constructor.JSON_PROPERTIES;
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    const value = obj[prop];
    state[prop] = ArrayBuffer.isView(value) ? Array.from(value) : value;
  }
  return state;
}

// src/core/cpu.ts
var ADDR_ZP = 0;
var ADDR_REL = 1;
var ADDR_IMP = 2;
var ADDR_ABS = 3;
var ADDR_ACC = 4;
var ADDR_IMM = 5;
var ADDR_ZPX = 6;
var ADDR_ZPY = 7;
var ADDR_ABSX = 8;
var ADDR_ABSY = 9;
var ADDR_PREIDXIND = 10;
var ADDR_POSTIDXIND = 11;
var ADDR_INDABS = 12;
var INS_ADC = 0;
var INS_AND = 1;
var INS_ASL = 2;
var INS_BCC = 3;
var INS_BCS = 4;
var INS_BEQ = 5;
var INS_BIT = 6;
var INS_BMI = 7;
var INS_BNE = 8;
var INS_BPL = 9;
var INS_BRK = 10;
var INS_BVC = 11;
var INS_BVS = 12;
var INS_CLC = 13;
var INS_CLD = 14;
var INS_CLI = 15;
var INS_CLV = 16;
var INS_CMP = 17;
var INS_CPX = 18;
var INS_CPY = 19;
var INS_DEC = 20;
var INS_DEX = 21;
var INS_DEY = 22;
var INS_EOR = 23;
var INS_INC = 24;
var INS_INX = 25;
var INS_INY = 26;
var INS_JMP = 27;
var INS_JSR = 28;
var INS_LDA = 29;
var INS_LDX = 30;
var INS_LDY = 31;
var INS_LSR = 32;
var INS_NOP = 33;
var INS_ORA = 34;
var INS_PHA = 35;
var INS_PHP = 36;
var INS_PLA = 37;
var INS_PLP = 38;
var INS_ROL = 39;
var INS_ROR = 40;
var INS_RTI = 41;
var INS_RTS = 42;
var INS_SBC = 43;
var INS_SEC = 44;
var INS_SED = 45;
var INS_SEI = 46;
var INS_STA = 47;
var INS_STX = 48;
var INS_STY = 49;
var INS_TAX = 50;
var INS_TAY = 51;
var INS_TSX = 52;
var INS_TXA = 53;
var INS_TXS = 54;
var INS_TYA = 55;
var INS_ALR = 56;
var INS_ANC = 57;
var INS_ARR = 58;
var INS_AXS = 59;
var INS_LAX = 60;
var INS_SAX = 61;
var INS_DCP = 62;
var INS_ISC = 63;
var INS_RLA = 64;
var INS_RRA = 65;
var INS_SLO = 66;
var INS_SRE = 67;
var INS_SKB = 68;
var INS_IGN = 69;
var INS_SHA = 71;
var INS_SHS = 72;
var INS_SHY = 73;
var INS_SHX = 74;
var INS_LAE = 75;
var INS_ANE = 76;
var INS_LXA = 77;
var INVALID_OPCODE = { ins: -1, mode: 0, size: 1, cycles: 2 };
var OPCODE_TABLE = {
  105: { ins: INS_ADC, mode: ADDR_IMM, size: 2, cycles: 2 },
  101: { ins: INS_ADC, mode: ADDR_ZP, size: 2, cycles: 3 },
  117: { ins: INS_ADC, mode: ADDR_ZPX, size: 2, cycles: 4 },
  109: { ins: INS_ADC, mode: ADDR_ABS, size: 3, cycles: 4 },
  125: { ins: INS_ADC, mode: ADDR_ABSX, size: 3, cycles: 4 },
  121: { ins: INS_ADC, mode: ADDR_ABSY, size: 3, cycles: 4 },
  97: { ins: INS_ADC, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
  113: { ins: INS_ADC, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  41: { ins: INS_AND, mode: ADDR_IMM, size: 2, cycles: 2 },
  37: { ins: INS_AND, mode: ADDR_ZP, size: 2, cycles: 3 },
  53: { ins: INS_AND, mode: ADDR_ZPX, size: 2, cycles: 4 },
  45: { ins: INS_AND, mode: ADDR_ABS, size: 3, cycles: 4 },
  61: { ins: INS_AND, mode: ADDR_ABSX, size: 3, cycles: 4 },
  57: { ins: INS_AND, mode: ADDR_ABSY, size: 3, cycles: 4 },
  33: { ins: INS_AND, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
  49: { ins: INS_AND, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  10: { ins: INS_ASL, mode: ADDR_ACC, size: 1, cycles: 2 },
  6: { ins: INS_ASL, mode: ADDR_ZP, size: 2, cycles: 5 },
  22: { ins: INS_ASL, mode: ADDR_ZPX, size: 2, cycles: 6 },
  14: { ins: INS_ASL, mode: ADDR_ABS, size: 3, cycles: 6 },
  30: { ins: INS_ASL, mode: ADDR_ABSX, size: 3, cycles: 7 },
  144: { ins: INS_BCC, mode: ADDR_REL, size: 2, cycles: 2 },
  176: { ins: INS_BCS, mode: ADDR_REL, size: 2, cycles: 2 },
  240: { ins: INS_BEQ, mode: ADDR_REL, size: 2, cycles: 2 },
  48: { ins: INS_BMI, mode: ADDR_REL, size: 2, cycles: 2 },
  208: { ins: INS_BNE, mode: ADDR_REL, size: 2, cycles: 2 },
  16: { ins: INS_BPL, mode: ADDR_REL, size: 2, cycles: 2 },
  80: { ins: INS_BVC, mode: ADDR_REL, size: 2, cycles: 2 },
  112: { ins: INS_BVS, mode: ADDR_REL, size: 2, cycles: 2 },
  36: { ins: INS_BIT, mode: ADDR_ZP, size: 2, cycles: 3 },
  44: { ins: INS_BIT, mode: ADDR_ABS, size: 3, cycles: 4 },
  0: { ins: INS_BRK, mode: ADDR_IMP, size: 1, cycles: 7 },
  24: { ins: INS_CLC, mode: ADDR_IMP, size: 1, cycles: 2 },
  216: { ins: INS_CLD, mode: ADDR_IMP, size: 1, cycles: 2 },
  88: { ins: INS_CLI, mode: ADDR_IMP, size: 1, cycles: 2 },
  184: { ins: INS_CLV, mode: ADDR_IMP, size: 1, cycles: 2 },
  201: { ins: INS_CMP, mode: ADDR_IMM, size: 2, cycles: 2 },
  197: { ins: INS_CMP, mode: ADDR_ZP, size: 2, cycles: 3 },
  213: { ins: INS_CMP, mode: ADDR_ZPX, size: 2, cycles: 4 },
  205: { ins: INS_CMP, mode: ADDR_ABS, size: 3, cycles: 4 },
  221: { ins: INS_CMP, mode: ADDR_ABSX, size: 3, cycles: 4 },
  217: { ins: INS_CMP, mode: ADDR_ABSY, size: 3, cycles: 4 },
  193: { ins: INS_CMP, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
  209: { ins: INS_CMP, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  224: { ins: INS_CPX, mode: ADDR_IMM, size: 2, cycles: 2 },
  228: { ins: INS_CPX, mode: ADDR_ZP, size: 2, cycles: 3 },
  236: { ins: INS_CPX, mode: ADDR_ABS, size: 3, cycles: 4 },
  192: { ins: INS_CPY, mode: ADDR_IMM, size: 2, cycles: 2 },
  196: { ins: INS_CPY, mode: ADDR_ZP, size: 2, cycles: 3 },
  204: { ins: INS_CPY, mode: ADDR_ABS, size: 3, cycles: 4 },
  198: { ins: INS_DEC, mode: ADDR_ZP, size: 2, cycles: 5 },
  214: { ins: INS_DEC, mode: ADDR_ZPX, size: 2, cycles: 6 },
  206: { ins: INS_DEC, mode: ADDR_ABS, size: 3, cycles: 6 },
  222: { ins: INS_DEC, mode: ADDR_ABSX, size: 3, cycles: 7 },
  202: { ins: INS_DEX, mode: ADDR_IMP, size: 1, cycles: 2 },
  136: { ins: INS_DEY, mode: ADDR_IMP, size: 1, cycles: 2 },
  73: { ins: INS_EOR, mode: ADDR_IMM, size: 2, cycles: 2 },
  69: { ins: INS_EOR, mode: ADDR_ZP, size: 2, cycles: 3 },
  85: { ins: INS_EOR, mode: ADDR_ZPX, size: 2, cycles: 4 },
  77: { ins: INS_EOR, mode: ADDR_ABS, size: 3, cycles: 4 },
  93: { ins: INS_EOR, mode: ADDR_ABSX, size: 3, cycles: 4 },
  89: { ins: INS_EOR, mode: ADDR_ABSY, size: 3, cycles: 4 },
  65: { ins: INS_EOR, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
  81: { ins: INS_EOR, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  230: { ins: INS_INC, mode: ADDR_ZP, size: 2, cycles: 5 },
  246: { ins: INS_INC, mode: ADDR_ZPX, size: 2, cycles: 6 },
  238: { ins: INS_INC, mode: ADDR_ABS, size: 3, cycles: 6 },
  254: { ins: INS_INC, mode: ADDR_ABSX, size: 3, cycles: 7 },
  232: { ins: INS_INX, mode: ADDR_IMP, size: 1, cycles: 2 },
  200: { ins: INS_INY, mode: ADDR_IMP, size: 1, cycles: 2 },
  76: { ins: INS_JMP, mode: ADDR_ABS, size: 3, cycles: 3 },
  108: { ins: INS_JMP, mode: ADDR_INDABS, size: 3, cycles: 5 },
  32: { ins: INS_JSR, mode: ADDR_ABS, size: 3, cycles: 6 },
  169: { ins: INS_LDA, mode: ADDR_IMM, size: 2, cycles: 2 },
  165: { ins: INS_LDA, mode: ADDR_ZP, size: 2, cycles: 3 },
  181: { ins: INS_LDA, mode: ADDR_ZPX, size: 2, cycles: 4 },
  173: { ins: INS_LDA, mode: ADDR_ABS, size: 3, cycles: 4 },
  189: { ins: INS_LDA, mode: ADDR_ABSX, size: 3, cycles: 4 },
  185: { ins: INS_LDA, mode: ADDR_ABSY, size: 3, cycles: 4 },
  161: { ins: INS_LDA, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
  177: { ins: INS_LDA, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  162: { ins: INS_LDX, mode: ADDR_IMM, size: 2, cycles: 2 },
  166: { ins: INS_LDX, mode: ADDR_ZP, size: 2, cycles: 3 },
  182: { ins: INS_LDX, mode: ADDR_ZPY, size: 2, cycles: 4 },
  174: { ins: INS_LDX, mode: ADDR_ABS, size: 3, cycles: 4 },
  190: { ins: INS_LDX, mode: ADDR_ABSY, size: 3, cycles: 4 },
  160: { ins: INS_LDY, mode: ADDR_IMM, size: 2, cycles: 2 },
  164: { ins: INS_LDY, mode: ADDR_ZP, size: 2, cycles: 3 },
  180: { ins: INS_LDY, mode: ADDR_ZPX, size: 2, cycles: 4 },
  172: { ins: INS_LDY, mode: ADDR_ABS, size: 3, cycles: 4 },
  188: { ins: INS_LDY, mode: ADDR_ABSX, size: 3, cycles: 4 },
  74: { ins: INS_LSR, mode: ADDR_ACC, size: 1, cycles: 2 },
  70: { ins: INS_LSR, mode: ADDR_ZP, size: 2, cycles: 5 },
  86: { ins: INS_LSR, mode: ADDR_ZPX, size: 2, cycles: 6 },
  78: { ins: INS_LSR, mode: ADDR_ABS, size: 3, cycles: 6 },
  94: { ins: INS_LSR, mode: ADDR_ABSX, size: 3, cycles: 7 },
  26: { ins: INS_NOP, mode: ADDR_IMP, size: 1, cycles: 2 },
  58: { ins: INS_NOP, mode: ADDR_IMP, size: 1, cycles: 2 },
  90: { ins: INS_NOP, mode: ADDR_IMP, size: 1, cycles: 2 },
  122: { ins: INS_NOP, mode: ADDR_IMP, size: 1, cycles: 2 },
  218: { ins: INS_NOP, mode: ADDR_IMP, size: 1, cycles: 2 },
  234: { ins: INS_NOP, mode: ADDR_IMP, size: 1, cycles: 2 },
  250: { ins: INS_NOP, mode: ADDR_IMP, size: 1, cycles: 2 },
  9: { ins: INS_ORA, mode: ADDR_IMM, size: 2, cycles: 2 },
  5: { ins: INS_ORA, mode: ADDR_ZP, size: 2, cycles: 3 },
  21: { ins: INS_ORA, mode: ADDR_ZPX, size: 2, cycles: 4 },
  13: { ins: INS_ORA, mode: ADDR_ABS, size: 3, cycles: 4 },
  29: { ins: INS_ORA, mode: ADDR_ABSX, size: 3, cycles: 4 },
  25: { ins: INS_ORA, mode: ADDR_ABSY, size: 3, cycles: 4 },
  1: { ins: INS_ORA, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
  17: { ins: INS_ORA, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  72: { ins: INS_PHA, mode: ADDR_IMP, size: 1, cycles: 3 },
  8: { ins: INS_PHP, mode: ADDR_IMP, size: 1, cycles: 3 },
  104: { ins: INS_PLA, mode: ADDR_IMP, size: 1, cycles: 4 },
  40: { ins: INS_PLP, mode: ADDR_IMP, size: 1, cycles: 4 },
  42: { ins: INS_ROL, mode: ADDR_ACC, size: 1, cycles: 2 },
  38: { ins: INS_ROL, mode: ADDR_ZP, size: 2, cycles: 5 },
  54: { ins: INS_ROL, mode: ADDR_ZPX, size: 2, cycles: 6 },
  46: { ins: INS_ROL, mode: ADDR_ABS, size: 3, cycles: 6 },
  62: { ins: INS_ROL, mode: ADDR_ABSX, size: 3, cycles: 7 },
  106: { ins: INS_ROR, mode: ADDR_ACC, size: 1, cycles: 2 },
  102: { ins: INS_ROR, mode: ADDR_ZP, size: 2, cycles: 5 },
  118: { ins: INS_ROR, mode: ADDR_ZPX, size: 2, cycles: 6 },
  110: { ins: INS_ROR, mode: ADDR_ABS, size: 3, cycles: 6 },
  126: { ins: INS_ROR, mode: ADDR_ABSX, size: 3, cycles: 7 },
  64: { ins: INS_RTI, mode: ADDR_IMP, size: 1, cycles: 6 },
  96: { ins: INS_RTS, mode: ADDR_IMP, size: 1, cycles: 6 },
  233: { ins: INS_SBC, mode: ADDR_IMM, size: 2, cycles: 2 },
  235: { ins: INS_SBC, mode: ADDR_IMM, size: 2, cycles: 2 },
  229: { ins: INS_SBC, mode: ADDR_ZP, size: 2, cycles: 3 },
  245: { ins: INS_SBC, mode: ADDR_ZPX, size: 2, cycles: 4 },
  237: { ins: INS_SBC, mode: ADDR_ABS, size: 3, cycles: 4 },
  253: { ins: INS_SBC, mode: ADDR_ABSX, size: 3, cycles: 4 },
  249: { ins: INS_SBC, mode: ADDR_ABSY, size: 3, cycles: 4 },
  225: { ins: INS_SBC, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
  241: { ins: INS_SBC, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  56: { ins: INS_SEC, mode: ADDR_IMP, size: 1, cycles: 2 },
  248: { ins: INS_SED, mode: ADDR_IMP, size: 1, cycles: 2 },
  120: { ins: INS_SEI, mode: ADDR_IMP, size: 1, cycles: 2 },
  133: { ins: INS_STA, mode: ADDR_ZP, size: 2, cycles: 3 },
  149: { ins: INS_STA, mode: ADDR_ZPX, size: 2, cycles: 4 },
  141: { ins: INS_STA, mode: ADDR_ABS, size: 3, cycles: 4 },
  157: { ins: INS_STA, mode: ADDR_ABSX, size: 3, cycles: 5 },
  153: { ins: INS_STA, mode: ADDR_ABSY, size: 3, cycles: 5 },
  129: { ins: INS_STA, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
  145: { ins: INS_STA, mode: ADDR_POSTIDXIND, size: 2, cycles: 6 },
  134: { ins: INS_STX, mode: ADDR_ZP, size: 2, cycles: 3 },
  150: { ins: INS_STX, mode: ADDR_ZPY, size: 2, cycles: 4 },
  142: { ins: INS_STX, mode: ADDR_ABS, size: 3, cycles: 4 },
  132: { ins: INS_STY, mode: ADDR_ZP, size: 2, cycles: 3 },
  148: { ins: INS_STY, mode: ADDR_ZPX, size: 2, cycles: 4 },
  140: { ins: INS_STY, mode: ADDR_ABS, size: 3, cycles: 4 },
  170: { ins: INS_TAX, mode: ADDR_IMP, size: 1, cycles: 2 },
  168: { ins: INS_TAY, mode: ADDR_IMP, size: 1, cycles: 2 },
  186: { ins: INS_TSX, mode: ADDR_IMP, size: 1, cycles: 2 },
  138: { ins: INS_TXA, mode: ADDR_IMP, size: 1, cycles: 2 },
  154: { ins: INS_TXS, mode: ADDR_IMP, size: 1, cycles: 2 },
  152: { ins: INS_TYA, mode: ADDR_IMP, size: 1, cycles: 2 },
  75: { ins: INS_ALR, mode: ADDR_IMM, size: 2, cycles: 2 },
  11: { ins: INS_ANC, mode: ADDR_IMM, size: 2, cycles: 2 },
  43: { ins: INS_ANC, mode: ADDR_IMM, size: 2, cycles: 2 },
  107: { ins: INS_ARR, mode: ADDR_IMM, size: 2, cycles: 2 },
  203: { ins: INS_AXS, mode: ADDR_IMM, size: 2, cycles: 2 },
  163: { ins: INS_LAX, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
  167: { ins: INS_LAX, mode: ADDR_ZP, size: 2, cycles: 3 },
  175: { ins: INS_LAX, mode: ADDR_ABS, size: 3, cycles: 4 },
  179: { ins: INS_LAX, mode: ADDR_POSTIDXIND, size: 2, cycles: 5 },
  183: { ins: INS_LAX, mode: ADDR_ZPY, size: 2, cycles: 4 },
  191: { ins: INS_LAX, mode: ADDR_ABSY, size: 3, cycles: 4 },
  131: { ins: INS_SAX, mode: ADDR_PREIDXIND, size: 2, cycles: 6 },
  135: { ins: INS_SAX, mode: ADDR_ZP, size: 2, cycles: 3 },
  143: { ins: INS_SAX, mode: ADDR_ABS, size: 3, cycles: 4 },
  151: { ins: INS_SAX, mode: ADDR_ZPY, size: 2, cycles: 4 },
  195: { ins: INS_DCP, mode: ADDR_PREIDXIND, size: 2, cycles: 8 },
  199: { ins: INS_DCP, mode: ADDR_ZP, size: 2, cycles: 5 },
  207: { ins: INS_DCP, mode: ADDR_ABS, size: 3, cycles: 6 },
  211: { ins: INS_DCP, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
  215: { ins: INS_DCP, mode: ADDR_ZPX, size: 2, cycles: 6 },
  219: { ins: INS_DCP, mode: ADDR_ABSY, size: 3, cycles: 7 },
  223: { ins: INS_DCP, mode: ADDR_ABSX, size: 3, cycles: 7 },
  227: { ins: INS_ISC, mode: ADDR_PREIDXIND, size: 2, cycles: 8 },
  231: { ins: INS_ISC, mode: ADDR_ZP, size: 2, cycles: 5 },
  239: { ins: INS_ISC, mode: ADDR_ABS, size: 3, cycles: 6 },
  243: { ins: INS_ISC, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
  247: { ins: INS_ISC, mode: ADDR_ZPX, size: 2, cycles: 6 },
  251: { ins: INS_ISC, mode: ADDR_ABSY, size: 3, cycles: 7 },
  255: { ins: INS_ISC, mode: ADDR_ABSX, size: 3, cycles: 7 },
  35: { ins: INS_RLA, mode: ADDR_PREIDXIND, size: 2, cycles: 8 },
  39: { ins: INS_RLA, mode: ADDR_ZP, size: 2, cycles: 5 },
  47: { ins: INS_RLA, mode: ADDR_ABS, size: 3, cycles: 6 },
  51: { ins: INS_RLA, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
  55: { ins: INS_RLA, mode: ADDR_ZPX, size: 2, cycles: 6 },
  59: { ins: INS_RLA, mode: ADDR_ABSY, size: 3, cycles: 7 },
  63: { ins: INS_RLA, mode: ADDR_ABSX, size: 3, cycles: 7 },
  99: { ins: INS_RRA, mode: ADDR_PREIDXIND, size: 2, cycles: 8 },
  103: { ins: INS_RRA, mode: ADDR_ZP, size: 2, cycles: 5 },
  111: { ins: INS_RRA, mode: ADDR_ABS, size: 3, cycles: 6 },
  115: { ins: INS_RRA, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
  119: { ins: INS_RRA, mode: ADDR_ZPX, size: 2, cycles: 6 },
  123: { ins: INS_RRA, mode: ADDR_ABSY, size: 3, cycles: 7 },
  127: { ins: INS_RRA, mode: ADDR_ABSX, size: 3, cycles: 7 },
  3: { ins: INS_SLO, mode: ADDR_PREIDXIND, size: 2, cycles: 8 },
  7: { ins: INS_SLO, mode: ADDR_ZP, size: 2, cycles: 5 },
  15: { ins: INS_SLO, mode: ADDR_ABS, size: 3, cycles: 6 },
  19: { ins: INS_SLO, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
  23: { ins: INS_SLO, mode: ADDR_ZPX, size: 2, cycles: 6 },
  27: { ins: INS_SLO, mode: ADDR_ABSY, size: 3, cycles: 7 },
  31: { ins: INS_SLO, mode: ADDR_ABSX, size: 3, cycles: 7 },
  67: { ins: INS_SRE, mode: ADDR_PREIDXIND, size: 2, cycles: 8 },
  71: { ins: INS_SRE, mode: ADDR_ZP, size: 2, cycles: 5 },
  79: { ins: INS_SRE, mode: ADDR_ABS, size: 3, cycles: 6 },
  83: { ins: INS_SRE, mode: ADDR_POSTIDXIND, size: 2, cycles: 8 },
  87: { ins: INS_SRE, mode: ADDR_ZPX, size: 2, cycles: 6 },
  91: { ins: INS_SRE, mode: ADDR_ABSY, size: 3, cycles: 7 },
  95: { ins: INS_SRE, mode: ADDR_ABSX, size: 3, cycles: 7 },
  128: { ins: INS_SKB, mode: ADDR_IMM, size: 2, cycles: 2 },
  130: { ins: INS_SKB, mode: ADDR_IMM, size: 2, cycles: 2 },
  137: { ins: INS_SKB, mode: ADDR_IMM, size: 2, cycles: 2 },
  194: { ins: INS_SKB, mode: ADDR_IMM, size: 2, cycles: 2 },
  226: { ins: INS_SKB, mode: ADDR_IMM, size: 2, cycles: 2 },
  12: { ins: INS_IGN, mode: ADDR_ABS, size: 3, cycles: 4 },
  28: { ins: INS_IGN, mode: ADDR_ABSX, size: 3, cycles: 4 },
  60: { ins: INS_IGN, mode: ADDR_ABSX, size: 3, cycles: 4 },
  92: { ins: INS_IGN, mode: ADDR_ABSX, size: 3, cycles: 4 },
  124: { ins: INS_IGN, mode: ADDR_ABSX, size: 3, cycles: 4 },
  220: { ins: INS_IGN, mode: ADDR_ABSX, size: 3, cycles: 4 },
  252: { ins: INS_IGN, mode: ADDR_ABSX, size: 3, cycles: 4 },
  4: { ins: INS_IGN, mode: ADDR_ZP, size: 2, cycles: 3 },
  68: { ins: INS_IGN, mode: ADDR_ZP, size: 2, cycles: 3 },
  100: { ins: INS_IGN, mode: ADDR_ZP, size: 2, cycles: 3 },
  20: { ins: INS_IGN, mode: ADDR_ZPX, size: 2, cycles: 4 },
  52: { ins: INS_IGN, mode: ADDR_ZPX, size: 2, cycles: 4 },
  84: { ins: INS_IGN, mode: ADDR_ZPX, size: 2, cycles: 4 },
  116: { ins: INS_IGN, mode: ADDR_ZPX, size: 2, cycles: 4 },
  212: { ins: INS_IGN, mode: ADDR_ZPX, size: 2, cycles: 4 },
  244: { ins: INS_IGN, mode: ADDR_ZPX, size: 2, cycles: 4 },
  147: { ins: INS_SHA, mode: ADDR_POSTIDXIND, size: 2, cycles: 6 },
  159: { ins: INS_SHA, mode: ADDR_ABSY, size: 3, cycles: 5 },
  155: { ins: INS_SHS, mode: ADDR_ABSY, size: 3, cycles: 5 },
  156: { ins: INS_SHY, mode: ADDR_ABSX, size: 3, cycles: 5 },
  158: { ins: INS_SHX, mode: ADDR_ABSY, size: 3, cycles: 5 },
  187: { ins: INS_LAE, mode: ADDR_ABSY, size: 3, cycles: 4 },
  139: { ins: INS_ANE, mode: ADDR_IMM, size: 2, cycles: 2 },
  171: { ins: INS_LXA, mode: ADDR_IMM, size: 2, cycles: 2 }
};
var CPU = class _CPU {
  constructor(nes2) {
    this.IRQ_NORMAL = 0;
    this.IRQ_NMI = 1;
    this.IRQ_RESET = 2;
    /** trace callback: (pc, opcode, cycles, frameCount) */
    this._traceCb = null;
    /** Enable debug logging for PC entering non-ROM areas */
    this.debugNonROM = true;
    this.nes = nes2;
    this.mem = new Uint8Array(65536);
    this.mem.fill(255, 0, 8192);
    for (let p = 0; p < 4; p++) {
      let j = p * 2048;
      this.mem[j + 8] = 247;
      this.mem[j + 9] = 239;
      this.mem[j + 10] = 223;
      this.mem[j + 15] = 191;
    }
    this.REG_ACC = 0;
    this.REG_X = 0;
    this.REG_Y = 0;
    this.REG_SP = 511;
    this.REG_PC = 32768 - 1;
    this.REG_PC_NEW = 32768 - 1;
    this.REG_STATUS = 40;
    this.setStatus(40);
    this.F_CARRY = 0;
    this.F_DECIMAL = 0;
    this.F_INTERRUPT = 1;
    this.F_INTERRUPT_NEW = 1;
    this.F_OVERFLOW = 0;
    this.F_SIGN = 0;
    this.F_ZERO = 1;
    this.F_NOTUSED = 1;
    this.F_NOTUSED_NEW = 1;
    this.F_BRK = 1;
    this.F_BRK_NEW = 1;
    this.cyclesToHalt = 0;
    this.crash = false;
    this.irqRequested = false;
    this.irqType = null;
    this.nmiRaised = false;
    this.nmiPending = false;
    this.nmiImmediate = false;
    this.dataBus = 0;
    this.instrBusCycles = 0;
    this.apuCatchupCycles = 0;
    this._cpuCycleBase = 0;
    this.nmiRaisedAtCycle = 0;
    this.nmiDotsRemainingInStep = 0;
  }
  static {
    this.JSON_PROPERTIES = [
      "mem",
      "cyclesToHalt",
      "dataBus",
      "irqRequested",
      "irqType",
      "nmiRaised",
      "nmiPending",
      "nmiImmediate",
      "REG_ACC",
      "REG_X",
      "REG_Y",
      "REG_SP",
      "REG_PC",
      "REG_PC_NEW",
      "REG_STATUS",
      "F_CARRY",
      "F_DECIMAL",
      "F_INTERRUPT",
      "F_INTERRUPT_NEW",
      "F_OVERFLOW",
      "F_SIGN",
      "F_ZERO",
      "F_NOTUSED",
      "F_NOTUSED_NEW",
      "F_BRK",
      "F_BRK_NEW",
      "_cpuCycleBase"
    ];
  }
  emulate() {
    if (this.nmiImmediate) {
      this.nmiImmediate = false;
      this.nmiPending = false;
      this.nmiRaised = false;
      this.instrBusCycles = 0;
      this.REG_PC_NEW = this.REG_PC;
      this.F_INTERRUPT_NEW = this.F_INTERRUPT;
      this.doNonMaskableInterrupt(this.getStatus() & 239);
      this.REG_PC = this.REG_PC_NEW;
      this.F_INTERRUPT = this.F_INTERRUPT_NEW;
      this.F_BRK = this.F_BRK_NEW;
      this._cpuCycleBase += 7;
      return 7;
    }
    let temp;
    let add;
    let baseHigh = 0;
    let interruptCycles = 0;
    if (this.nmiRaised) {
      this.nmiPending = true;
      this.nmiRaised = false;
    }
    if (this.irqRequested) {
      temp = this.getStatus();
      this.REG_PC_NEW = this.REG_PC;
      this.F_INTERRUPT_NEW = this.F_INTERRUPT;
      switch (this.irqType) {
        case 0: {
          if (this.F_INTERRUPT !== 0) {
            break;
          }
          this.doIrq(temp & 239);
          interruptCycles = 7;
          break;
        }
        case 2: {
          this.doResetInterrupt();
          interruptCycles = 7;
          break;
        }
      }
      this.REG_PC = this.REG_PC_NEW;
      this.F_INTERRUPT = this.F_INTERRUPT_NEW;
      this.F_BRK = this.F_BRK_NEW;
      this.irqRequested = false;
    }
    if (this.nes.mmap === null) return 32;
    this.instrBusCycles = 0;
    this.apuCatchupCycles = 0;
    this.nmiDotsRemainingInStep = 0;
    this._dmcFetchCycles = this._cyclesToNextDmcFetch();
    this._instrPC = this.REG_PC;
    let fetchAddr = this.REG_PC + 1;
    if ((fetchAddr & 65528) === 504) {
      console.log(`[tsnes] fetch from stack area: $${fetchAddr.toString(16)} (REG_PC=$${this.REG_PC.toString(16)})`);
    }
    let opcode = this.loadFromCartridge(fetchAddr);
    this.dataBus = opcode;
    this.instrBusCycles = 1;
    this.nes.ppu.advanceDots(3);
    let opinfo = OPCODE_TABLE[opcode] ?? INVALID_OPCODE;
    let cycleCount = opinfo.cycles;
    let cycleAdd = 0;
    let addrMode = opinfo.mode;
    if (this.nes.tracer && this.nes.tracer.active) {
      const opbytes = [opcode];
      for (let bi = 1; bi < opinfo.size; bi++) {
        opbytes.push(this.loadFromCartridge(this._instrPC + bi));
      }
      this.nes.tracer.trace(this._instrPC, opcode, opinfo, opbytes);
    }
    let opaddr = this.REG_PC;
    this.REG_PC = this.REG_PC + opinfo.size & 65535;
    let addr = 0;
    switch (addrMode) {
      case 0: {
        addr = this.loadDirect(opaddr + 2);
        break;
      }
      case 1: {
        addr = this.loadDirect(opaddr + 2);
        if (addr < 128) {
          addr += this.REG_PC;
        } else {
          addr += this.REG_PC - 256;
        }
        break;
      }
      case 2: {
        this.loadDirect(opaddr + 2);
        break;
      }
      case 3: {
        addr = this.load16bit(opaddr + 2);
        break;
      }
      case 4: {
        this.loadDirect(opaddr + 2);
        addr = this.REG_ACC;
        break;
      }
      case 5: {
        addr = this.REG_PC;
        break;
      }
      case 6: {
        let zpBase6 = this.loadDirect(opaddr + 2);
        this.loadDirect(zpBase6);
        addr = zpBase6 + this.REG_X & 255;
        break;
      }
      case 7: {
        let zpBase7 = this.loadDirect(opaddr + 2);
        this.loadDirect(zpBase7);
        addr = zpBase7 + this.REG_Y & 255;
        break;
      }
      case 8: {
        addr = this.load16bit(opaddr + 2);
        baseHigh = addr >> 8 & 255;
        if ((addr & 65280) !== (addr + this.REG_X & 65280)) {
          this.load(addr & 65280 | addr + this.REG_X & 255);
          cycleAdd = 1;
        }
        addr += this.REG_X;
        break;
      }
      case 9: {
        addr = this.load16bit(opaddr + 2);
        baseHigh = addr >> 8 & 255;
        if ((addr & 65280) !== (addr + this.REG_Y & 65280)) {
          this.load(addr & 65280 | addr + this.REG_Y & 255);
          cycleAdd = 1;
        }
        addr += this.REG_Y;
        break;
      }
      case 10: {
        let zpPtr10 = this.loadDirect(opaddr + 2);
        this.loadDirect(zpPtr10);
        let zpAddr10 = zpPtr10 + this.REG_X & 255;
        addr = this.loadDirect(zpAddr10) | this.loadDirect(zpAddr10 + 1 & 255) << 8;
        break;
      }
      case 11: {
        let zpAddr = this.loadDirect(opaddr + 2);
        addr = this.loadDirect(zpAddr) | this.loadDirect(zpAddr + 1 & 255) << 8;
        baseHigh = addr >> 8 & 255;
        if ((addr & 65280) !== (addr + this.REG_Y & 65280)) {
          this.load(addr & 65280 | addr + this.REG_Y & 255);
          cycleAdd = 1;
        }
        addr += this.REG_Y;
        break;
      }
      case 12: {
        addr = this.load16bit(opaddr + 2);
        var hiAddr = addr & 65280 | (addr & 255) + 1 & 255;
        addr = this.load(addr) | this.load(hiAddr) << 8;
        break;
      }
    }
    addr &= 65535;
    switch (opinfo.ins) {
      case 0: {
        add = this.load(addr);
        temp = this.REG_ACC + add + this.F_CARRY;
        if (((this.REG_ACC ^ add) & 128) === 0 && ((this.REG_ACC ^ temp) & 128) !== 0) {
          this.F_OVERFLOW = 1;
        } else {
          this.F_OVERFLOW = 0;
        }
        this.F_CARRY = temp > 255 ? 1 : 0;
        this.F_SIGN = temp >> 7 & 1;
        this.F_ZERO = temp & 255;
        this.REG_ACC = temp & 255;
        cycleCount += cycleAdd;
        break;
      }
      case 1: {
        this.REG_ACC = this.REG_ACC & this.load(addr);
        this.F_SIGN = this.REG_ACC >> 7 & 1;
        this.F_ZERO = this.REG_ACC;
        cycleCount += cycleAdd;
        break;
      }
      case 2: {
        if (addrMode === ADDR_ACC) {
          this.F_CARRY = this.REG_ACC >> 7 & 1;
          this.REG_ACC = this.REG_ACC << 1 & 255;
          this.F_SIGN = this.REG_ACC >> 7 & 1;
          this.F_ZERO = this.REG_ACC;
        } else {
          if (cycleAdd === 0 && (addrMode === ADDR_ABSX || addrMode === ADDR_ABSY || addrMode === ADDR_POSTIDXIND)) {
            this.load(addr);
          }
          temp = this.load(addr);
          this.write(addr, temp);
          this.F_CARRY = temp >> 7 & 1;
          temp = temp << 1 & 255;
          this.F_SIGN = temp >> 7 & 1;
          this.F_ZERO = temp;
          this.write(addr, temp);
        }
        break;
      }
      case 3: {
        if (this.F_CARRY === 0) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 4: {
        if (this.F_CARRY === 1) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 5: {
        if (this.F_ZERO === 0) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 6: {
        temp = this.load(addr);
        this.F_SIGN = temp >> 7 & 1;
        this.F_OVERFLOW = temp >> 6 & 1;
        temp &= this.REG_ACC;
        this.F_ZERO = temp;
        break;
      }
      case 7: {
        if (this.F_SIGN === 1) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 8: {
        if (this.F_ZERO !== 0) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 9: {
        if (this.F_SIGN === 0) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 10: {
        this.REG_PC = this.REG_PC + 2 & 65535;
        this.push(this.REG_PC >> 8 & 255);
        this.push(this.REG_PC & 255);
        this.F_BRK = 1;
        this.push(this.getStatus());
        this.F_INTERRUPT = 1;
        this.REG_PC = this.load16bit(65534);
        this.REG_PC--;
        break;
      }
      case 11: {
        if (this.F_OVERFLOW === 0) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 12: {
        if (this.F_OVERFLOW === 1) {
          cycleCount += this._takeBranch(opaddr, addr);
        }
        break;
      }
      case 13: {
        this.F_CARRY = 0;
        break;
      }
      case 14: {
        this.F_DECIMAL = 0;
        break;
      }
      case 15: {
        this.F_INTERRUPT = 0;
        break;
      }
      case 16: {
        this.F_OVERFLOW = 0;
        break;
      }
      case 17: {
        temp = this.REG_ACC - this.load(addr);
        this.F_CARRY = temp >= 0 ? 1 : 0;
        this.F_SIGN = temp >> 7 & 1;
        this.F_ZERO = temp & 255;
        cycleCount += cycleAdd;
        break;
      }
      case 18: {
        temp = this.REG_X - this.load(addr);
        this.F_CARRY = temp >= 0 ? 1 : 0;
        this.F_SIGN = temp >> 7 & 1;
        this.F_ZERO = temp & 255;
        break;
      }
      case 19: {
        temp = this.REG_Y - this.load(addr);
        this.F_CARRY = temp >= 0 ? 1 : 0;
        this.F_SIGN = temp >> 7 & 1;
        this.F_ZERO = temp & 255;
        break;
      }
      case 20: {
        if (cycleAdd === 0 && (addrMode === ADDR_ABSX || addrMode === ADDR_ABSY || addrMode === ADDR_POSTIDXIND)) {
          this.load(addr);
        }
        temp = this.load(addr);
        this.write(addr, temp);
        temp = temp - 1 & 255;
        this.F_SIGN = temp >> 7 & 1;
        this.F_ZERO = temp;
        this.write(addr, temp);
        break;
      }
      case 21: {
        this.REG_X = this.REG_X - 1 & 255;
        this.F_SIGN = this.REG_X >> 7 & 1;
        this.F_ZERO = this.REG_X;
        break;
      }
      case 22: {
        this.REG_Y = this.REG_Y - 1 & 255;
        this.F_SIGN = this.REG_Y >> 7 & 1;
        this.F_ZERO = this.REG_Y;
        break;
      }
      case 23: {
        this.REG_ACC = (this.load(addr) ^ this.REG_ACC) & 255;
        this.F_SIGN = this.REG_ACC >> 7 & 1;
        this.F_ZERO = this.REG_ACC;
        cycleCount += cycleAdd;
        break;
      }
      case 24: {
        if (cycleAdd === 0 && (addrMode === ADDR_ABSX || addrMode === ADDR_ABSY || addrMode === ADDR_POSTIDXIND)) {
          this.load(addr);
        }
        temp = this.load(addr);
        this.write(addr, temp);
        temp = temp + 1 & 255;
        this.F_SIGN = temp >> 7 & 1;
        this.F_ZERO = temp;
        this.write(addr, temp);
        break;
      }
      case 25: {
        this.REG_X = this.REG_X + 1 & 255;
        this.F_SIGN = this.REG_X >> 7 & 1;
        this.F_ZERO = this.REG_X;
        break;
      }
      case 26: {
        this.REG_Y++;
        this.REG_Y &= 255;
        this.F_SIGN = this.REG_Y >> 7 & 1;
        this.F_ZERO = this.REG_Y;
        break;
      }
      case 27: {
        this.REG_PC = addr - 1 & 65535;
        break;
      }
      case 28: {
        this.push(this.REG_PC >> 8 & 255);
        this.push(this.REG_PC & 255);
        this.loadDirect(opaddr + 3);
        this.REG_PC = addr - 1 & 65535;
        break;
      }
      case 29: {
        this.REG_ACC = this.load(addr);
        this.F_SIGN = this.REG_ACC >> 7 & 1;
        this.F_ZERO = this.REG_ACC;
        cycleCount += cycleAdd;
        break;
      }
      case 30: {
        this.REG_X = this.load(addr);
        this.F_SIGN = this.REG_X >> 7 & 1;
        this.F_ZERO = this.REG_X;
        cycleCount += cycleAdd;
        break;
      }
      case 31: {
        this.REG_Y = this.load(addr);
        this.F_SIGN = this.REG_Y >> 7 & 1;
        this.F_ZERO = this.REG_Y;
        cycleCount += cycleAdd;
        break;
      }
      case 32: {
        if (addrMode === ADDR_ACC) {
          temp = this.REG_ACC & 255;
          this.F_CARRY = temp & 1;
          temp >>= 1;
          this.REG_ACC = temp;
        } else {
          if (cycleAdd === 0 && (addrMode === ADDR_ABSX || addrMode === ADDR_ABSY || addrMode === ADDR_POSTIDXIND)) {
            this.load(addr);
          }
          temp = this.load(addr) & 255;
          this.write(addr, temp);
          this.F_CARRY = temp & 1;
          temp >>= 1;
          this.write(addr, temp);
        }
        this.F_SIGN = 0;
        this.F_ZERO = temp;
        break;
      }
      case 33: {
        break;
      }
      case 34: {
        temp = (this.load(addr) | this.REG_ACC) & 255;
        this.F_SIGN = temp >> 7 & 1;
        this.F_ZERO = temp;
        this.REG_ACC = temp;
        cycleCount += cycleAdd;
        break;
      }
      case 35: {
        this.push(this.REG_ACC);
        break;
      }
      case 36: {
        this.F_BRK = 1;
        this.push(this.getStatus());
        break;
      }
      case 37: {
        this.REG_ACC = this.pull();
        this.F_SIGN = this.REG_ACC >> 7 & 1;
        this.F_ZERO = this.REG_ACC;
        break;
      }
      case 38: {
        this.setStatusFromStack(this.pull());
        break;
      }
      case 39: {
        if (addrMode === ADDR_ACC) {
          temp = this.REG_ACC;
          add = this.F_CARRY;
          this.F_CARRY = temp >> 7 & 1;
          temp = (temp << 1 & 255) + add;
          this.REG_ACC = temp;
        } else {
          if (cycleAdd === 0 && (addrMode === ADDR_ABSX || addrMode === ADDR_ABSY || addrMode === ADDR_POSTIDXIND)) {
            this.load(addr);
          }
          temp = this.load(addr);
          this.write(addr, temp);
          add = this.F_CARRY;
          this.F_CARRY = temp >> 7 & 1;
          temp = (temp << 1 & 255) + add;
          this.write(addr, temp);
        }
        this.F_SIGN = temp >> 7 & 1;
        this.F_ZERO = temp;
        break;
      }
      case 40: {
        if (addrMode === ADDR_ACC) {
          add = this.F_CARRY << 7;
          this.F_CARRY = this.REG_ACC & 1;
          temp = (this.REG_ACC >> 1) + add;
          this.REG_ACC = temp;
        } else {
          if (cycleAdd === 0 && (addrMode === ADDR_ABSX || addrMode === ADDR_ABSY || addrMode === ADDR_POSTIDXIND)) {
            this.load(addr);
          }
          temp = this.load(addr);
          this.write(addr, temp);
          add = this.F_CARRY << 7;
          this.F_CARRY = temp & 1;
          temp = (temp >> 1) + add;
          this.write(addr, temp);
        }
        this.F_SIGN = temp >> 7 & 1;
        this.F_ZERO = temp;
        break;
      }
      case 41: {
        this.setStatusFromStack(this.pull());
        this.REG_PC = (this.pull() | this.pull() << 8) & 65535;
        if (this.REG_PC === 65535) {
          return cycleCount;
        }
        this.REG_PC = this.REG_PC - 1 & 65535;
        break;
      }
      case 42: {
        this.REG_PC = (this.pull() | this.pull() << 8) & 65535;
        if (this.REG_PC === 65535) {
          return cycleCount;
        }
        break;
      }
      case 43: {
        add = this.load(addr);
        temp = this.REG_ACC - add - (1 - this.F_CARRY);
        this.F_SIGN = temp >> 7 & 1;
        this.F_ZERO = temp & 255;
        if (((this.REG_ACC ^ temp) & 128) !== 0 && ((this.REG_ACC ^ add) & 128) !== 0) {
          this.F_OVERFLOW = 1;
        } else {
          this.F_OVERFLOW = 0;
        }
        this.F_CARRY = temp < 0 ? 0 : 1;
        this.REG_ACC = temp & 255;
        cycleCount += cycleAdd;
        break;
      }
      case 44: {
        this.F_CARRY = 1;
        break;
      }
      case 45: {
        this.F_DECIMAL = 1;
        break;
      }
      case 46: {
        this.F_INTERRUPT = 1;
        break;
      }
      case 47: {
        if (cycleAdd === 0 && (addrMode === ADDR_ABSX || addrMode === ADDR_ABSY || addrMode === ADDR_POSTIDXIND)) {
          this.load(addr);
        }
        this.write(addr, this.REG_ACC);
        break;
      }
      case 48: {
        this.write(addr, this.REG_X);
        break;
      }
      case 49: {
        this.write(addr, this.REG_Y);
        break;
      }
      case 50: {
        this.REG_X = this.REG_ACC;
        this.F_SIGN = this.REG_ACC >> 7 & 1;
        this.F_ZERO = this.REG_ACC;
        break;
      }
      case 51: {
        this.REG_Y = this.REG_ACC;
        this.F_SIGN = this.REG_ACC >> 7 & 1;
        this.F_ZERO = this.REG_ACC;
        break;
      }
      case 52: {
        this.REG_X = this.REG_SP & 255;
        this.F_SIGN = this.REG_SP >> 7 & 1;
        this.F_ZERO = this.REG_X;
        break;
      }
      case 53: {
        this.REG_ACC = this.REG_X;
        this.F_SIGN = this.REG_X >> 7 & 1;
        this.F_ZERO = this.REG_X;
        break;
      }
      case 54: {
        this.REG_SP = this.REG_X & 255;
        break;
      }
      case 55: {
        this.REG_ACC = this.REG_Y;
        this.F_SIGN = this.REG_Y >> 7 & 1;
        this.F_ZERO = this.REG_Y;
        break;
      }
      case 56: {
        temp = this.REG_ACC & this.load(addr);
        this.F_CARRY = temp & 1;
        this.REG_ACC = this.F_ZERO = temp >> 1;
        this.F_SIGN = 0;
        break;
      }
      case 57: {
        this.REG_ACC = this.F_ZERO = this.REG_ACC & this.load(addr);
        this.F_CARRY = this.F_SIGN = this.REG_ACC >> 7 & 1;
        break;
      }
      case 58: {
        temp = this.REG_ACC & this.load(addr);
        this.REG_ACC = this.F_ZERO = (temp >> 1) + (this.F_CARRY << 7);
        this.F_SIGN = this.F_CARRY;
        this.F_CARRY = temp >> 7 & 1;
        this.F_OVERFLOW = (temp >> 7 ^ temp >> 6) & 1;
        break;
      }
      case 59: {
        temp = (this.REG_X & this.REG_ACC) - this.load(addr);
        this.F_SIGN = temp >> 7 & 1;
        this.F_ZERO = temp & 255;
        this.F_CARRY = temp < 0 ? 0 : 1;
        this.REG_X = temp & 255;
        break;
      }
      case 60: {
        this.REG_ACC = this.REG_X = this.F_ZERO = this.load(addr);
        this.F_SIGN = this.REG_ACC >> 7 & 1;
        cycleCount += cycleAdd;
        break;
      }
      case 61: {
        this.write(addr, this.REG_ACC & this.REG_X);
        break;
      }
      case 62: {
        if (cycleAdd === 0 && (addrMode === ADDR_ABSX || addrMode === ADDR_ABSY || addrMode === ADDR_POSTIDXIND)) {
          this.load(addr);
        }
        temp = this.load(addr);
        this.write(addr, temp);
        temp = temp - 1 & 255;
        this.write(addr, temp);
        temp = this.REG_ACC - temp;
        this.F_CARRY = temp >= 0 ? 1 : 0;
        this.F_SIGN = temp >> 7 & 1;
        this.F_ZERO = temp & 255;
        break;
      }
      case 63: {
        if (cycleAdd === 0 && (addrMode === ADDR_ABSX || addrMode === ADDR_ABSY || addrMode === ADDR_POSTIDXIND)) {
          this.load(addr);
        }
        temp = this.load(addr);
        this.write(addr, temp);
        temp = temp + 1 & 255;
        this.write(addr, temp);
        let isb_val = temp;
        temp = this.REG_ACC - isb_val - (1 - this.F_CARRY);
        this.F_SIGN = temp >> 7 & 1;
        this.F_ZERO = temp & 255;
        if (((this.REG_ACC ^ temp) & 128) !== 0 && ((this.REG_ACC ^ isb_val) & 128) !== 0) {
          this.F_OVERFLOW = 1;
        } else {
          this.F_OVERFLOW = 0;
        }
        this.F_CARRY = temp < 0 ? 0 : 1;
        this.REG_ACC = temp & 255;
        break;
      }
      case 64: {
        if (cycleAdd === 0 && (addrMode === ADDR_ABSX || addrMode === ADDR_ABSY || addrMode === ADDR_POSTIDXIND)) {
          this.load(addr);
        }
        temp = this.load(addr);
        this.write(addr, temp);
        add = this.F_CARRY;
        this.F_CARRY = temp >> 7 & 1;
        temp = (temp << 1 & 255) + add;
        this.write(addr, temp);
        this.REG_ACC = this.REG_ACC & temp;
        this.F_SIGN = this.REG_ACC >> 7 & 1;
        this.F_ZERO = this.REG_ACC;
        break;
      }
      case 65: {
        if (cycleAdd === 0 && (addrMode === ADDR_ABSX || addrMode === ADDR_ABSY || addrMode === ADDR_POSTIDXIND)) {
          this.load(addr);
        }
        temp = this.load(addr);
        this.write(addr, temp);
        add = this.F_CARRY << 7;
        this.F_CARRY = temp & 1;
        temp = (temp >> 1) + add;
        this.write(addr, temp);
        let rra_val = temp;
        temp = this.REG_ACC + rra_val + this.F_CARRY;
        if (((this.REG_ACC ^ rra_val) & 128) === 0 && ((this.REG_ACC ^ temp) & 128) !== 0) {
          this.F_OVERFLOW = 1;
        } else {
          this.F_OVERFLOW = 0;
        }
        this.F_CARRY = temp > 255 ? 1 : 0;
        this.F_SIGN = temp >> 7 & 1;
        this.F_ZERO = temp & 255;
        this.REG_ACC = temp & 255;
        break;
      }
      case 66: {
        if (cycleAdd === 0 && (addrMode === ADDR_ABSX || addrMode === ADDR_ABSY || addrMode === ADDR_POSTIDXIND)) {
          this.load(addr);
        }
        temp = this.load(addr);
        this.write(addr, temp);
        this.F_CARRY = temp >> 7 & 1;
        temp = temp << 1 & 255;
        this.write(addr, temp);
        this.REG_ACC = this.REG_ACC | temp;
        this.F_SIGN = this.REG_ACC >> 7 & 1;
        this.F_ZERO = this.REG_ACC;
        break;
      }
      case 67: {
        if (cycleAdd === 0 && (addrMode === ADDR_ABSX || addrMode === ADDR_ABSY || addrMode === ADDR_POSTIDXIND)) {
          this.load(addr);
        }
        temp = this.load(addr) & 255;
        this.write(addr, temp);
        this.F_CARRY = temp & 1;
        temp >>= 1;
        this.write(addr, temp);
        this.REG_ACC = this.REG_ACC ^ temp;
        this.F_SIGN = this.REG_ACC >> 7 & 1;
        this.F_ZERO = this.REG_ACC;
        break;
      }
      case 68: {
        break;
      }
      case 69: {
        this.load(addr);
        cycleCount += cycleAdd;
        break;
      }
      case 71: {
        if (cycleAdd === 0) {
          this.load(addr);
        }
        let dmaDuringInstr = this._dmcFetchCycles > 0 && this._dmcFetchCycles <= this.instrBusCycles;
        let shaVal = dmaDuringInstr ? this.REG_ACC & this.REG_X : this.REG_ACC & this.REG_X & (baseHigh + 1 & 255 | 0);
        if (cycleAdd === 1) {
          addr = shaVal << 8 | addr & 255;
        }
        this.write(addr, shaVal);
        break;
      }
      case 72: {
        if (cycleAdd === 0) {
          this.load(addr);
        }
        let dmaDuringInstr2 = this._dmcFetchCycles > 0 && this._dmcFetchCycles <= this.instrBusCycles;
        this.REG_SP = 256 | this.REG_ACC & this.REG_X;
        let shsVal = dmaDuringInstr2 ? this.REG_SP & 255 : this.REG_SP & 255 & (baseHigh + 1 & 255);
        if (cycleAdd === 1) {
          addr = shsVal << 8 | addr & 255;
        }
        this.write(addr, shsVal);
        break;
      }
      case 73: {
        if (cycleAdd === 0) {
          this.load(addr);
        }
        let dmaDuringInstr3 = this._dmcFetchCycles > 0 && this._dmcFetchCycles <= this.instrBusCycles;
        let shyVal = dmaDuringInstr3 ? this.REG_Y : this.REG_Y & (baseHigh + 1 & 255);
        if (cycleAdd === 1) {
          addr = shyVal << 8 | addr & 255;
        }
        this.write(addr, shyVal);
        break;
      }
      case 74: {
        if (cycleAdd === 0) {
          this.load(addr);
        }
        let dmaDuringInstr4 = this._dmcFetchCycles > 0 && this._dmcFetchCycles <= this.instrBusCycles;
        let shxVal = dmaDuringInstr4 ? this.REG_X : this.REG_X & (baseHigh + 1 & 255);
        if (cycleAdd === 1) {
          addr = shxVal << 8 | addr & 255;
        }
        this.write(addr, shxVal);
        break;
      }
      case 75: {
        temp = this.load(addr) & (this.REG_SP & 255);
        this.REG_ACC = this.REG_X = this.F_ZERO = temp;
        this.REG_SP = 256 | temp;
        this.F_SIGN = temp >> 7 & 1;
        cycleCount += cycleAdd;
        break;
      }
      case 76: {
        this.REG_ACC = this.F_ZERO = (this.REG_ACC | 255) & this.REG_X & this.load(addr);
        this.F_SIGN = this.REG_ACC >> 7 & 1;
        break;
      }
      case 77: {
        this.REG_ACC = this.REG_X = this.F_ZERO = (this.REG_ACC | 255) & this.load(addr);
        this.F_SIGN = this.REG_ACC >> 7 & 1;
        break;
      }
      default: {
        let ctx = `addr=$${opaddr.toString(16)}, opcode=0x${opcode.toString(16)}, ins=${opinfo.ins}, mode=${opinfo.mode}, size=${opinfo.size}, REG_PC=$${this.REG_PC.toString(16)}, SP=$${(this.REG_SP & 255).toString(16)}, A=$${this.REG_ACC.toString(16)}, X=$${this.REG_X.toString(16)}, Y=$${this.REG_Y.toString(16)}`;
        let memDump = "";
        try {
          for (let i = -4; i <= 8; i++) {
            let a = opaddr + i + 1 & 65535;
            let v = this.nes.mmap ? this.nes.mmap.load(a) : this.mem[a & 65535];
            memDump += ` $${a.toString(16)}=0x${v.toString(16)}`;
          }
        } catch (e) {
          memDump = " (mem read failed)";
        }
        console.error(`[tsnes] CRASH context: ${ctx}`);
        console.error(`[tsnes] CRASH memory:${memDump}`);
        throw new Error(
          `Game crashed, invalid opcode at address $${opaddr.toString(16)}, opcode=0x${opcode.toString(16)}, ins=${opinfo.ins}`
        );
      }
    }
    if (this.instrBusCycles < cycleCount) {
      let missingDots = (cycleCount - this.instrBusCycles) * 3;
      this.instrBusCycles = cycleCount;
      this.nes.ppu.advanceDots(missingDots);
    }
    if (this.nmiRaised) {
      let remainingDots = (this.instrBusCycles - this.nmiRaisedAtCycle) * 3 + this.nmiDotsRemainingInStep;
      if (remainingDots >= 5) {
        this.nmiImmediate = true;
        this.nmiRaised = false;
      }
    }
    if (this.nmiPending) {
      this.REG_PC_NEW = this.REG_PC;
      this.F_INTERRUPT_NEW = this.F_INTERRUPT;
      this.doNonMaskableInterrupt(this.getStatus() & 239);
      this.REG_PC = this.REG_PC_NEW;
      this.F_INTERRUPT = this.F_INTERRUPT_NEW;
      this.F_BRK = this.F_BRK_NEW;
      this.nmiPending = false;
      interruptCycles = 7;
    }
    this._cpuCycleBase += cycleCount + interruptCycles;
    if (this._traceCb) {
      this._traceCb(this._instrPC, opcode, cycleCount + interruptCycles, this.nes.fpsFrameCount);
    }
    if (this.debugNonROM) {
      let nextFetch = this.REG_PC + 1 & 65535;
      if (nextFetch < 32768) {
        console.log(`[tsnes] PC->non-ROM: next=$${nextFetch.toString(16)}, prev=$${this._instrPC.toString(16)}, opcode=0x${opcode.toString(16)}, SP=$${(this.REG_SP & 255).toString(16)}, frame=${this.nes.fpsFrameCount}`);
      }
    }
    return cycleCount + interruptCycles;
  }
  loadFromCartridge(addr) {
    return this.nes.mmap.load(addr);
  }
  _loadFromCartridgePlain(addr) {
    return this.nes.mmap.load(addr);
  }
  _loadFromCartridgeWithGameGenie(addr) {
    let value = this.nes.mmap.load(addr);
    return this.nes.gameGenie.applyCodes(addr, value);
  }
  _updateCartridgeLoader() {
    if (this.nes.gameGenie.enabled && this.nes.gameGenie.patches.length > 0) {
      this.loadFromCartridge = this._loadFromCartridgeWithGameGenie;
    } else {
      Object.setPrototypeOf(this, _CPU.prototype);
    }
  }
  load(addr) {
    if (addr < 8192) {
      this.dataBus = this.mem[addr & 2047];
      this.instrBusCycles++;
      this.nes.ppu.advanceDots(3);
    } else if (addr >= 16384) {
      if (addr === 16405) {
        this.nes.papu.advanceFrameCounter(
          this.instrBusCycles - this.apuCatchupCycles
        );
        this.apuCatchupCycles = this.instrBusCycles;
        let apuStatus = this.loadFromCartridge(addr);
        this.instrBusCycles++;
        this.nes.ppu.advanceDots(3);
        return apuStatus;
      }
      this.dataBus = this.loadFromCartridge(addr);
      this.instrBusCycles++;
      this.nes.ppu.advanceDots(3);
    } else {
      this.instrBusCycles++;
      this.dataBus = this.loadFromCartridge(addr);
      this.nes.ppu.advanceDots(3);
    }
    return this.dataBus;
  }
  loadDirect(addr) {
    if (addr < 8192) {
      this.dataBus = this.mem[addr & 2047];
    } else {
      this.dataBus = this.loadFromCartridge(addr);
    }
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    return this.dataBus;
  }
  load16bit(addr) {
    let lo;
    if (addr < 8191) {
      this.dataBus = this.mem[addr & 2047];
      lo = this.dataBus;
      this.instrBusCycles++;
      this.nes.ppu.advanceDots(3);
      this.dataBus = this.mem[addr + 1 & 2047];
      this.instrBusCycles++;
      this.nes.ppu.advanceDots(3);
      return lo | this.dataBus << 8;
    } else {
      this.dataBus = this.loadFromCartridge(addr);
      lo = this.dataBus;
      this.instrBusCycles++;
      this.nes.ppu.advanceDots(3);
      this.dataBus = this.loadFromCartridge(addr + 1);
      this.instrBusCycles++;
      this.nes.ppu.advanceDots(3);
      return lo | this.dataBus << 8;
    }
  }
  write(addr, val) {
    if (this.nes.tracer && this.nes.tracer.active) {
      this.nes.tracer.traceWrite(addr, val);
    }
    if (addr >= 8192 && addr < 16384) {
      this.instrBusCycles++;
      this.dataBus = val;
      this.nes.mmap.write(addr, val);
      this.nes.ppu.advanceDots(3);
    } else {
      this.dataBus = val;
      if (addr < 8192) {
        this.mem[addr & 2047] = val;
      } else {
        this.nes.mmap.write(addr, val);
      }
      this.instrBusCycles++;
      this.nes.ppu.advanceDots(3);
    }
  }
  requestIrq(type) {
    if (this.irqRequested) {
      if (type === this.IRQ_NORMAL) {
        return;
      }
    }
    this.irqRequested = true;
    this.irqType = type;
  }
  push(value) {
    this.dataBus = value;
    this.mem[this.REG_SP | 256] = value;
    this.REG_SP--;
    this.REG_SP = this.REG_SP & 255;
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
  }
  pull() {
    this.REG_SP++;
    this.REG_SP = this.REG_SP & 255;
    this.dataBus = this.mem[256 | this.REG_SP];
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    return this.dataBus;
  }
  _cyclesToNextDmcFetch() {
    if (!this.nes.papu) {
      return 2147483647;
    }
    let dmc = this.nes.papu.dmc;
    if (!dmc || !dmc.isEnabled || dmc.dmaFrequency <= 0) {
      return 2147483647;
    }
    if (!dmc.hasSample) {
      return 2147483647;
    }
    let cyclesPerClock = dmc.dmaFrequency >> 3;
    let cyclesToFirstClock = dmc.shiftCounter + 7 >> 3;
    if (cyclesToFirstClock <= 0) cyclesToFirstClock = cyclesPerClock;
    return cyclesToFirstClock + (dmc.dmaCounter - 1) * cyclesPerClock;
  }
  _takeBranch(opaddr, addr) {
    let nextPC = opaddr + 3 & 65535;
    let target = addr + 1 & 65535;
    this.load(nextPC);
    if ((nextPC & 65280) !== (target & 65280)) {
      let wrongAddr = nextPC & 65280 | target & 255;
      this.load(wrongAddr);
      this.REG_PC = addr & 65535;
      return 2;
    }
    this.REG_PC = addr & 65535;
    return 1;
  }
  pageCrossed(addr1, addr2) {
    return (addr1 & 65280) !== (addr2 & 65280);
  }
  haltCycles(cycles) {
    this.cyclesToHalt += cycles;
  }
  doNonMaskableInterrupt(status) {
    if (this.nes.mmap === null) return;
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    this.REG_PC_NEW = this.REG_PC_NEW + 1 & 65535;
    this.push(this.REG_PC_NEW >> 8 & 255);
    this.push(this.REG_PC_NEW & 255);
    this.F_INTERRUPT_NEW = 1;
    this.push(status);
    this.dataBus = this.loadFromCartridge(65530);
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    let lo = this.dataBus;
    this.dataBus = this.loadFromCartridge(65531);
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    this.REG_PC_NEW = lo | this.dataBus << 8;
    this.REG_PC_NEW = this.REG_PC_NEW - 1 & 65535;
  }
  doResetInterrupt() {
    this.dataBus = this.loadFromCartridge(65532);
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    let lo = this.dataBus;
    this.dataBus = this.loadFromCartridge(65533);
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    this.REG_PC_NEW = lo | this.dataBus << 8;
    this.REG_PC_NEW = this.REG_PC_NEW - 1 & 65535;
  }
  doIrq(status) {
    this.REG_PC_NEW = this.REG_PC_NEW + 1 & 65535;
    this.push(this.REG_PC_NEW >> 8 & 255);
    this.push(this.REG_PC_NEW & 255);
    this.push(status);
    this.F_INTERRUPT_NEW = 1;
    this.F_BRK_NEW = 0;
    this.dataBus = this.loadFromCartridge(65534);
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    let lo = this.dataBus;
    this.dataBus = this.loadFromCartridge(65535);
    this.instrBusCycles++;
    this.nes.ppu.advanceDots(3);
    this.REG_PC_NEW = lo | this.dataBus << 8;
    this.REG_PC_NEW = this.REG_PC_NEW - 1 & 65535;
  }
  getStatus() {
    return this.F_CARRY | (this.F_ZERO === 0 ? 1 : 0) << 1 | this.F_INTERRUPT << 2 | this.F_DECIMAL << 3 | this.F_BRK << 4 | this.F_NOTUSED << 5 | this.F_OVERFLOW << 6 | this.F_SIGN << 7;
  }
  setStatus(st) {
    this.F_CARRY = st & 1;
    this.F_ZERO = (st >> 1 & 1) === 1 ? 0 : 1;
    this.F_INTERRUPT = st >> 2 & 1;
    this.F_DECIMAL = st >> 3 & 1;
    this.F_BRK = st >> 4 & 1;
    this.F_NOTUSED = st >> 5 & 1;
    this.F_OVERFLOW = st >> 6 & 1;
    this.F_SIGN = st >> 7 & 1;
  }
  setStatusFromStack(st) {
    this.F_CARRY = st & 1;
    this.F_ZERO = (st >> 1 & 1) === 1 ? 0 : 1;
    this.F_INTERRUPT = st >> 2 & 1;
    this.F_DECIMAL = st >> 3 & 1;
    this.F_OVERFLOW = st >> 6 & 1;
    this.F_SIGN = st >> 7 & 1;
  }
  toJSON() {
    return toJSON(this);
  }
  fromJSON(s) {
    fromJSON(this, s);
  }
};
var cpu_default = CPU;

// src/core/controller.ts
var Controller = class _Controller {
  static {
    this.BUTTON_A = 0;
  }
  static {
    this.BUTTON_B = 1;
  }
  static {
    this.BUTTON_SELECT = 2;
  }
  static {
    this.BUTTON_START = 3;
  }
  static {
    this.BUTTON_UP = 4;
  }
  static {
    this.BUTTON_DOWN = 5;
  }
  static {
    this.BUTTON_LEFT = 6;
  }
  static {
    this.BUTTON_RIGHT = 7;
  }
  static {
    // Turbo buttons rapidly toggle A/B each frame while held, simulating the
    // extra buttons on the NES Advantage and dogbone controllers.
    this.BUTTON_TURBO_A = 8;
  }
  static {
    this.BUTTON_TURBO_B = 9;
  }
  static {
    this.JSON_PROPERTIES = [
      "state",
      "baseA",
      "baseB",
      "turboA",
      "turboB",
      "turboToggle"
    ];
  }
  constructor() {
    this.state = new Array(8);
    for (let i = 0; i < this.state.length; i++) {
      this.state[i] = 64;
    }
    this.baseA = 64;
    this.baseB = 64;
    this.turboA = false;
    this.turboB = false;
    this.turboToggle = false;
  }
  buttonDown(key) {
    if (key === _Controller.BUTTON_TURBO_A) {
      this.turboA = true;
    } else if (key === _Controller.BUTTON_TURBO_B) {
      this.turboB = true;
    } else {
      this.state[key] = 65;
      if (key === _Controller.BUTTON_A) this.baseA = 65;
      if (key === _Controller.BUTTON_B) this.baseB = 65;
    }
  }
  buttonUp(key) {
    if (key === _Controller.BUTTON_TURBO_A) {
      this.turboA = false;
      this.state[_Controller.BUTTON_A] = this.baseA;
    } else if (key === _Controller.BUTTON_TURBO_B) {
      this.turboB = false;
      this.state[_Controller.BUTTON_B] = this.baseB;
    } else {
      this.state[key] = 64;
      if (key === _Controller.BUTTON_A) this.baseA = 64;
      if (key === _Controller.BUTTON_B) this.baseB = 64;
    }
  }
  // Called once per frame to toggle turbo button states. Produces a ~30 Hz
  // press rate at 60 FPS, matching the fast end of the NES Advantage's
  // adjustable turbo range.
  clock() {
    if (!this.turboA && !this.turboB) return;
    this.turboToggle = !this.turboToggle;
    if (this.turboA) {
      this.state[_Controller.BUTTON_A] = this.turboToggle ? 65 : 64;
    }
    if (this.turboB) {
      this.state[_Controller.BUTTON_B] = this.turboToggle ? 65 : 64;
    }
  }
  toJSON() {
    return toJSON(this);
  }
  fromJSON(s) {
    fromJSON(this, s);
  }
};
var controller_default = Controller;

// src/core/tile.ts
var Tile = class {
  constructor() {
    this.pix = new Uint8Array(64);
    this.initialized = false;
    this.opaque = new Uint8Array(8);
  }
  setBuffer(scanline) {
    for (let y = 0; y < 8; y++) {
      this.setScanline(y, scanline[y], scanline[y + 8]);
    }
  }
  setScanline(sline, b1, b2) {
    this.initialized = true;
    let tIndex = sline << 3;
    for (let x = 0; x < 8; x++) {
      this.pix[tIndex + x] = (b1 >> 7 - x & 1) + ((b2 >> 7 - x & 1) << 1);
      if (this.pix[tIndex + x] === 0) {
        this.opaque[sline] = false;
      }
    }
  }
  render(buffer, srcx1, srcy1, srcx2, srcy2, dx, dy, palAdd, palette, flipHorizontal, flipVertical, pri, priTable) {
    if (dx < -7 || dx >= 256 || dy < -7 || dy >= 240) {
      return;
    }
    if (dx < 0) {
      srcx1 -= dx;
    }
    if (dx + srcx2 >= 256) {
      srcx2 = 256 - dx;
    }
    if (dy < 0) {
      srcy1 -= dy;
    }
    if (dy + srcy2 >= 240) {
      srcy2 = 240 - dy;
    }
    let fbIndex, tIndex, palIndex, tpri;
    if (!flipHorizontal && !flipVertical) {
      fbIndex = (dy << 8) + dx;
      tIndex = 0;
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (x >= srcx1 && x < srcx2 && y >= srcy1 && y < srcy2) {
            palIndex = this.pix[tIndex];
            tpri = priTable[fbIndex];
            if (palIndex !== 0 && pri <= (tpri & 255)) {
              buffer[fbIndex] = palette[palIndex + palAdd];
              tpri = tpri & 3840 | pri;
              priTable[fbIndex] = tpri;
            }
          }
          fbIndex++;
          tIndex++;
        }
        fbIndex -= 8;
        fbIndex += 256;
      }
    } else if (flipHorizontal && !flipVertical) {
      fbIndex = (dy << 8) + dx;
      tIndex = 7;
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (x >= srcx1 && x < srcx2 && y >= srcy1 && y < srcy2) {
            palIndex = this.pix[tIndex];
            tpri = priTable[fbIndex];
            if (palIndex !== 0 && pri <= (tpri & 255)) {
              buffer[fbIndex] = palette[palIndex + palAdd];
              tpri = tpri & 3840 | pri;
              priTable[fbIndex] = tpri;
            }
          }
          fbIndex++;
          tIndex--;
        }
        fbIndex -= 8;
        fbIndex += 256;
        tIndex += 16;
      }
    } else if (flipVertical && !flipHorizontal) {
      fbIndex = (dy << 8) + dx;
      tIndex = 56;
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (x >= srcx1 && x < srcx2 && y >= srcy1 && y < srcy2) {
            palIndex = this.pix[tIndex];
            tpri = priTable[fbIndex];
            if (palIndex !== 0 && pri <= (tpri & 255)) {
              buffer[fbIndex] = palette[palIndex + palAdd];
              tpri = tpri & 3840 | pri;
              priTable[fbIndex] = tpri;
            }
          }
          fbIndex++;
          tIndex++;
        }
        fbIndex -= 8;
        fbIndex += 256;
        tIndex -= 16;
      }
    } else {
      fbIndex = (dy << 8) + dx;
      tIndex = 63;
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          if (x >= srcx1 && x < srcx2 && y >= srcy1 && y < srcy2) {
            palIndex = this.pix[tIndex];
            tpri = priTable[fbIndex];
            if (palIndex !== 0 && pri <= (tpri & 255)) {
              buffer[fbIndex] = palette[palIndex + palAdd];
              tpri = tpri & 3840 | pri;
              priTable[fbIndex] = tpri;
            }
          }
          fbIndex++;
          tIndex--;
        }
        fbIndex -= 8;
        fbIndex += 256;
      }
    }
  }
  isTransparent(x, y) {
    return this.pix[(y << 3) + x] === 0;
  }
  toJSON() {
    return {
      opaque: Array.from(this.opaque),
      pix: Array.from(this.pix)
    };
  }
  fromJSON(s) {
    this.opaque.set(s.opaque);
    this.pix.set(s.pix);
  }
};
var tile_default = Tile;

// src/core/ppu/nametable.ts
var NameTable = class {
  constructor(width, height, name) {
    this.width = width;
    this.height = height;
    this.name = name;
    this.tile = new Uint8Array(width * height);
    this.attrib = new Uint8Array(width * height);
  }
  getTileIndex(x, y) {
    return this.tile[y * this.width + x];
  }
  getAttrib(x, y) {
    return this.attrib[y * this.width + x];
  }
  writeAttrib(index, value) {
    let basex = index % 8 * 4;
    let basey = Math.floor(index / 8) * 4;
    let add;
    let tx, ty;
    let attindex;
    for (let sqy = 0; sqy < 2; sqy++) {
      for (let sqx = 0; sqx < 2; sqx++) {
        add = value >> 2 * (sqy * 2 + sqx) & 3;
        for (let y = 0; y < 2; y++) {
          for (let x = 0; x < 2; x++) {
            tx = basex + sqx * 2 + x;
            ty = basey + sqy * 2 + y;
            attindex = ty * this.width + tx;
            this.attrib[attindex] = add << 2 & 12;
          }
        }
      }
    }
  }
  toJSON() {
    return {
      tile: Array.from(this.tile),
      attrib: Array.from(this.attrib)
    };
  }
  fromJSON(s) {
    this.tile.set(s.tile);
    this.attrib.set(s.attrib);
  }
};
var nametable_default = NameTable;

// src/core/ppu/palette-table.ts
var PaletteTable = class {
  constructor() {
    this.curTable = new Uint32Array(64);
    this.emphTable = new Array(8);
    this.currentEmph = -1;
  }
  loadNTSCPalette() {
    this.curTable = new Uint32Array([5395026, 11796480, 10485760, 11599933, 7602281, 91, 95, 6208, 12048, 543240, 26368, 1196544, 7153664, 0, 0, 0, 12899815, 16728064, 14421538, 16729963, 14090399, 6818519, 6588, 21681, 27227, 35843, 43776, 2918400, 10777088, 0, 0, 0, 16316664, 16755516, 16742785, 16735173, 16730354, 14633471, 4681215, 46327, 57599, 58229, 259115, 7911470, 15065624, 7895160, 0, 0, 16777215, 16773822, 16300216, 16300248, 16758527, 16761855, 13095423, 10148607, 8973816, 8650717, 12122296, 16119980, 16777136, 16308472, 0, 0]);
    this.makeTables();
    this.setEmphasis(0);
  }
  loadPALPalette() {
    this.curTable = new Uint32Array([5395026, 11796480, 10485760, 11599933, 7602281, 91, 95, 6208, 12048, 543240, 26368, 1196544, 7153664, 0, 0, 0, 12899815, 16728064, 14421538, 16729963, 14090399, 6818519, 6588, 21681, 27227, 35843, 43776, 2918400, 10777088, 0, 0, 0, 16316664, 16755516, 16742785, 16735173, 16730354, 14633471, 4681215, 46327, 57599, 58229, 259115, 7911470, 15065624, 7895160, 0, 0, 16777215, 16773822, 16300216, 16300248, 16758527, 16761855, 13095423, 10148607, 8973816, 8650717, 12122296, 16119980, 16777136, 16308472, 0, 0]);
    this.makeTables();
    this.setEmphasis(0);
  }
  makeTables() {
    let r, g, b, col, i, rFactor, gFactor, bFactor;
    for (let emph = 0; emph < 8; emph++) {
      rFactor = 1;
      gFactor = 1;
      bFactor = 1;
      if ((emph & 1) !== 0) {
        gFactor = 0.75;
        bFactor = 0.75;
      }
      if ((emph & 2) !== 0) {
        rFactor = 0.75;
        bFactor = 0.75;
      }
      if ((emph & 4) !== 0) {
        rFactor = 0.75;
        gFactor = 0.75;
      }
      this.emphTable[emph] = new Uint32Array(64);
      for (i = 0; i < 64; i++) {
        col = this.curTable[i];
        r = Math.floor(this.getRed(col) * rFactor);
        g = Math.floor(this.getGreen(col) * gFactor);
        b = Math.floor(this.getBlue(col) * bFactor);
        this.emphTable[emph][i] = this.getRgb(r, g, b);
      }
    }
  }
  setEmphasis(emph) {
    if (emph !== this.currentEmph) {
      this.currentEmph = emph;
      for (let i = 0; i < 64; i++) {
        this.curTable[i] = this.emphTable[emph][i];
      }
    }
  }
  getEntry(yiq) {
    return this.curTable[yiq];
  }
  getRed(rgb) {
    return rgb >> 16 & 255;
  }
  getGreen(rgb) {
    return rgb >> 8 & 255;
  }
  getBlue(rgb) {
    return rgb & 255;
  }
  getRgb(r, g, b) {
    return r << 16 | g << 8 | b;
  }
  loadDefaultPalette() {
    this.curTable[0] = this.getRgb(117, 117, 117);
    this.curTable[1] = this.getRgb(39, 27, 143);
    this.curTable[2] = this.getRgb(0, 0, 171);
    this.curTable[3] = this.getRgb(71, 0, 159);
    this.curTable[4] = this.getRgb(143, 0, 119);
    this.curTable[5] = this.getRgb(171, 0, 19);
    this.curTable[6] = this.getRgb(167, 0, 0);
    this.curTable[7] = this.getRgb(127, 11, 0);
    this.curTable[8] = this.getRgb(67, 47, 0);
    this.curTable[9] = this.getRgb(0, 71, 0);
    this.curTable[10] = this.getRgb(0, 81, 0);
    this.curTable[11] = this.getRgb(0, 63, 23);
    this.curTable[12] = this.getRgb(27, 63, 95);
    this.curTable[13] = this.getRgb(0, 0, 0);
    this.curTable[14] = this.getRgb(0, 0, 0);
    this.curTable[15] = this.getRgb(0, 0, 0);
    this.curTable[16] = this.getRgb(188, 188, 188);
    this.curTable[17] = this.getRgb(0, 115, 239);
    this.curTable[18] = this.getRgb(35, 59, 239);
    this.curTable[19] = this.getRgb(131, 0, 243);
    this.curTable[20] = this.getRgb(191, 0, 191);
    this.curTable[21] = this.getRgb(231, 0, 91);
    this.curTable[22] = this.getRgb(219, 43, 0);
    this.curTable[23] = this.getRgb(203, 79, 15);
    this.curTable[24] = this.getRgb(139, 115, 0);
    this.curTable[25] = this.getRgb(0, 151, 0);
    this.curTable[26] = this.getRgb(0, 171, 0);
    this.curTable[27] = this.getRgb(0, 147, 59);
    this.curTable[28] = this.getRgb(0, 131, 139);
    this.curTable[29] = this.getRgb(0, 0, 0);
    this.curTable[30] = this.getRgb(0, 0, 0);
    this.curTable[31] = this.getRgb(0, 0, 0);
    this.curTable[32] = this.getRgb(255, 255, 255);
    this.curTable[33] = this.getRgb(63, 191, 255);
    this.curTable[34] = this.getRgb(95, 151, 255);
    this.curTable[35] = this.getRgb(167, 139, 253);
    this.curTable[36] = this.getRgb(247, 123, 255);
    this.curTable[37] = this.getRgb(255, 119, 183);
    this.curTable[38] = this.getRgb(255, 119, 99);
    this.curTable[39] = this.getRgb(255, 155, 59);
    this.curTable[40] = this.getRgb(243, 191, 63);
    this.curTable[41] = this.getRgb(131, 211, 19);
    this.curTable[42] = this.getRgb(79, 223, 75);
    this.curTable[43] = this.getRgb(88, 248, 152);
    this.curTable[44] = this.getRgb(0, 235, 219);
    this.curTable[45] = this.getRgb(0, 0, 0);
    this.curTable[46] = this.getRgb(0, 0, 0);
    this.curTable[47] = this.getRgb(0, 0, 0);
    this.curTable[48] = this.getRgb(255, 255, 255);
    this.curTable[49] = this.getRgb(171, 231, 255);
    this.curTable[50] = this.getRgb(199, 215, 255);
    this.curTable[51] = this.getRgb(215, 203, 255);
    this.curTable[52] = this.getRgb(255, 199, 255);
    this.curTable[53] = this.getRgb(255, 199, 219);
    this.curTable[54] = this.getRgb(255, 191, 179);
    this.curTable[55] = this.getRgb(255, 219, 171);
    this.curTable[56] = this.getRgb(255, 231, 163);
    this.curTable[57] = this.getRgb(227, 255, 163);
    this.curTable[58] = this.getRgb(171, 243, 191);
    this.curTable[59] = this.getRgb(179, 255, 207);
    this.curTable[60] = this.getRgb(159, 255, 243);
    this.curTable[61] = this.getRgb(0, 0, 0);
    this.curTable[62] = this.getRgb(0, 0, 0);
    this.curTable[63] = this.getRgb(0, 0, 0);
    this.makeTables();
    this.setEmphasis(0);
  }
};
var palette_table_default = PaletteTable;

// src/core/ppu/index.ts
var PPU = class {
  constructor(nes2) {
    // Status flags:
    this.STATUS_VRAMWRITE = 4;
    this.STATUS_SLSPRITECOUNT = 5;
    this.STATUS_SPRITE0HIT = 6;
    this.STATUS_VBLANK = 7;
    this.nes = nes2;
    this.showSpr0Hit = false;
    this.clipToTvSize = true;
    let i;
    this.vramMem = new Uint8Array(32768);
    this.spriteMem = new Uint8Array(256);
    this.vramAddress = null;
    this.vramTmpAddress = null;
    this.vramBufferedReadValue = 0;
    this.firstWrite = true;
    this.openBusLatch = 0;
    this.openBusDecayFrames = 0;
    this.sramAddress = 0;
    this.currentMirroring = -1;
    this.nmiOutput = false;
    this.nmiSuppressed = false;
    this.vblankPending = false;
    this.frameEnded = false;
    this.dummyCycleToggle = false;
    this.validTileData = false;
    this.scanlineAlreadyRendered = null;
    this.f_nmiOnVblank = 0;
    this.f_spriteSize = 0;
    this.f_bgPatternTable = 0;
    this.f_spPatternTable = 0;
    this.f_addrInc = 0;
    this.f_nTblAddress = 0;
    this.f_color = 0;
    this.f_spVisibility = 0;
    this.f_bgVisibility = 0;
    this.f_spClipping = 0;
    this.f_bgClipping = 0;
    this.f_dispType = 0;
    this.cntFV = 0;
    this.cntV = 0;
    this.cntH = 0;
    this.cntVT = 0;
    this.cntHT = 0;
    this.regFV = 0;
    this.regV = 0;
    this.regH = 0;
    this.regVT = 0;
    this.regHT = 0;
    this.regFH = 0;
    this.regS = 0;
    this.curNt = null;
    this.attrib = new Uint8Array(32);
    this.buffer = new Uint32Array(256 * 240);
    this.bgbuffer = new Uint32Array(256 * 240);
    this.pixrendered = new Uint32Array(256 * 240);
    this.validTileData = null;
    this.scantile = new Array(32);
    this.scanline = 0;
    this.lastRenderedScanline = -1;
    this.curX = 0;
    this.sprX = new Uint8Array(64);
    this.sprY = new Uint8Array(64);
    this.sprTile = new Uint8Array(64);
    this.sprCol = new Uint8Array(64);
    this.vertFlip = new Uint8Array(64);
    this.horiFlip = new Uint8Array(64);
    this.bgPriority = new Uint8Array(64);
    this.spr0HitX = 0;
    this.spr0HitY = 0;
    this.hitSpr0 = false;
    this.secondaryOAM = new Uint8Array(32);
    this.secondaryOAM.fill(255);
    this.spritesFound = 0;
    this.sprite0InSecondary = false;
    this.scanlineSpriteCount = new Uint8Array(241);
    this.scanlineSecondaryOAM = new Uint8Array(241 * 32);
    this.scanlineSprite0 = new Uint8Array(241);
    this.sprPalette = new Uint32Array(16);
    this.imgPalette = new Uint32Array(16);
    this.ptTile = new Array(512);
    for (i = 0; i < 512; i++) {
      this.ptTile[i] = new tile_default();
    }
    this.ntable1 = new Array(4);
    this.currentMirroring = -1;
    this.nameTable = new Array(4);
    for (i = 0; i < 4; i++) {
      this.nameTable[i] = new nametable_default(32, 32, `Nt${i}`);
    }
    this.vramMirrorTable = new Uint16Array(32768);
    for (i = 0; i < 32768; i++) {
      this.vramMirrorTable[i] = i;
    }
    this.palTable = new palette_table_default();
    this.palTable.loadNTSCPalette();
    this.updateControlReg1(0);
    this.updateControlReg2(0);
  }
  // Sets Nametable mirroring.
  setMirroring(mirroring) {
    if (mirroring === this.currentMirroring) {
      return;
    }
    this.currentMirroring = mirroring;
    this.triggerRendering();
    if (this.vramMirrorTable === null) {
      this.vramMirrorTable = new Uint16Array(32768);
    }
    for (let i = 0; i < 32768; i++) {
      this.vramMirrorTable[i] = i;
    }
    this.defineMirrorRegion(16160, 16128, 32);
    this.defineMirrorRegion(16192, 16128, 32);
    this.defineMirrorRegion(16256, 16128, 32);
    this.defineMirrorRegion(16320, 16128, 32);
    this.defineMirrorRegion(12288, 8192, 3840);
    this.defineMirrorRegion(16384, 0, 16384);
    if (mirroring === this.nes.rom.HORIZONTAL_MIRRORING) {
      this.ntable1[0] = 0;
      this.ntable1[1] = 0;
      this.ntable1[2] = 1;
      this.ntable1[3] = 1;
      this.defineMirrorRegion(9216, 8192, 1024);
      this.defineMirrorRegion(11264, 10240, 1024);
    } else if (mirroring === this.nes.rom.VERTICAL_MIRRORING) {
      this.ntable1[0] = 0;
      this.ntable1[1] = 1;
      this.ntable1[2] = 0;
      this.ntable1[3] = 1;
      this.defineMirrorRegion(10240, 8192, 1024);
      this.defineMirrorRegion(11264, 9216, 1024);
    } else if (mirroring === this.nes.rom.SINGLESCREEN_MIRRORING) {
      this.ntable1[0] = 0;
      this.ntable1[1] = 0;
      this.ntable1[2] = 0;
      this.ntable1[3] = 0;
      this.defineMirrorRegion(9216, 8192, 1024);
      this.defineMirrorRegion(10240, 8192, 1024);
      this.defineMirrorRegion(11264, 8192, 1024);
    } else if (mirroring === this.nes.rom.SINGLESCREEN_MIRRORING2) {
      this.ntable1[0] = 1;
      this.ntable1[1] = 1;
      this.ntable1[2] = 1;
      this.ntable1[3] = 1;
      this.defineMirrorRegion(9216, 9216, 1024);
      this.defineMirrorRegion(10240, 9216, 1024);
      this.defineMirrorRegion(11264, 9216, 1024);
    } else {
      this.ntable1[0] = 0;
      this.ntable1[1] = 1;
      this.ntable1[2] = 2;
      this.ntable1[3] = 3;
    }
  }
  // Define a mirrored area in the address lookup table.
  // Assumes the regions don't overlap.
  // The 'to' region is the region that is physically in memory.
  defineMirrorRegion(fromStart, toStart, size) {
    for (let i = 0; i < size; i++) {
      this.vramMirrorTable[fromStart + i] = toStart + i;
    }
  }
  startVBlank() {
    if (this.openBusDecayFrames > 0) {
      this.openBusDecayFrames--;
      if (this.openBusDecayFrames === 0) {
        this.openBusLatch = 0;
      }
    }
    if (this.lastRenderedScanline < 239) {
      this.renderFramePartially(
        this.lastRenderedScanline + 1,
        240 - this.lastRenderedScanline
      );
    }
    this.endFrame();
    this.lastRenderedScanline = -1;
  }
  // Fire the VBlank set event at dot 1 of scanline 0 (NES scanline 241).
  // dotsRemaining is the number of dots left in the current advanceDots()
  // call (including the VBlank dot), used for NMI delay calculation.
  // 0 means VBlank fires at the boundary between steps.
  _fireVblankSet(cpu2, dotsRemaining) {
    this.vblankPending = false;
    if (!this.nmiSuppressed) {
      this.setStatusFlag(this.STATUS_VBLANK, true);
      this._updateNmiOutput();
      if (cpu2.nmiRaised) {
        cpu2.nmiDotsRemainingInStep = dotsRemaining;
      }
    }
    this.nmiSuppressed = false;
    this.startVBlank();
    this.frameEnded = true;
  }
  // Fire the VBlank clear event at dot 1 of scanline 20 (NES scanline 261,
  // pre-render). isLastDot indicates whether this is the last dot of the
  // current advanceDots() call. The 6502's NMI edge detector samples at φ2
  // (~2/3 through the bus cycle), so we only promote nmiRaised to nmiPending
  // when φ2 has had time to sample the rising edge — i.e., on the last dot.
  // See https://www.nesdev.org/wiki/NMI
  _fireVblankClear(cpu2, isLastDot) {
    if (cpu2.nmiRaised && isLastDot) {
      cpu2.nmiPending = true;
      cpu2.nmiRaised = false;
    }
    this.setStatusFlag(this.STATUS_VBLANK, false);
    this.setStatusFlag(this.STATUS_SPRITE0HIT, false);
    this.setStatusFlag(this.STATUS_SLSPRITECOUNT, false);
    this.hitSpr0 = false;
    this.spr0HitX = -1;
    this.spr0HitY = -1;
    this._updateNmiOutput();
  }
  // Advance the PPU by the given number of dots. Called after every CPU bus
  // cycle with dots=3 (PPU runs at 3x CPU clock). Handles all per-dot events:
  // VBlank set/clear, sprite 0 hit, and scanline boundaries.
  //
  // Sets this.frameEnded = true when VBlank fires (scanline 0, dot 1),
  // signaling the frame loop to break after the current instruction.
  advanceDots(dots) {
    let finalCurX = this.curX + dots;
    if (finalCurX < 341 && !(this.scanline === 0 && this.vblankPending && this.curX <= 1 && finalCurX >= 1) && !(this.scanline === 20 && this.curX <= 1 && finalCurX >= 1) && (this.spr0HitX < this.curX || this.spr0HitX >= finalCurX)) {
      this.curX = finalCurX;
      return;
    }
    let cpu2 = this.nes.cpu;
    for (let i = 0; i < dots; i++) {
      if (this.scanline === 0 && this.curX === 1 && this.vblankPending) {
        this._fireVblankSet(cpu2, dots - i);
        this.curX++;
        continue;
      }
      if (this.scanline === 20 && this.curX === 1) {
        this._fireVblankClear(cpu2, i === dots - 1);
      }
      if (this.curX === this.spr0HitX && this.f_bgVisibility === 1 && this.f_spVisibility === 1 && this.scanline - 21 === this.spr0HitY) {
        this.setStatusFlag(this.STATUS_SPRITE0HIT, true);
      }
      this.curX++;
      if (this.curX === 341) {
        this.curX = 0;
        this.endScanline();
      }
    }
    if (this.scanline === 0 && this.curX === 1 && this.vblankPending) {
      this._fireVblankSet(cpu2, 0);
    }
    if (this.scanline === 20 && this.curX === 1) {
      this._fireVblankClear(cpu2, true);
    }
  }
  endScanline() {
    switch (this.scanline) {
      case 19:
        if (this.dummyCycleToggle) {
          this.curX = 1;
          this.dummyCycleToggle = !this.dummyCycleToggle;
        }
        break;
      case 20:
        this.performOAMCorruption();
        if (this.f_bgVisibility === 1 || this.f_spVisibility === 1) {
          this.cntFV = this.regFV;
          this.cntV = this.regV;
          this.cntH = this.regH;
          this.cntVT = this.regVT;
          this.cntHT = this.regHT;
          if (this.f_bgVisibility === 1 || this.f_spVisibility === 1) {
            this.renderBgScanline(false, 0);
          }
          this.scanlineSpriteCount[0] = 0;
          this.scanlineSprite0[0] = 0;
          for (let i = 0; i < 32; i++) {
            this.scanlineSecondaryOAM[i] = 255;
          }
          let scanline0Base = 1 * 32;
          for (let i = 0; i < 32; i++) {
            this.scanlineSecondaryOAM[scanline0Base + i] = this.secondaryOAM[i];
          }
          this.scanlineSpriteCount[1] = this.spritesFound;
          this.scanlineSprite0[1] = this.sprite0InSecondary ? 1 : 0;
          this.sramAddress = 0;
        }
        if (this.f_bgVisibility === 1 && this.f_spVisibility === 1) {
          this.checkSprite0(0);
        }
        if (!this.hitSpr0 && this.f_bgVisibility === 1 && this.f_spVisibility === 1) {
          if (this._precomputeSprite0Hit(1)) {
            this.hitSpr0 = true;
          }
        }
        if (this.f_bgVisibility === 1 || this.f_spVisibility === 1) {
          this.nes.mmap.clockIrqCounter();
        }
        break;
      case 261:
        this.vblankPending = true;
        this.scanline = -1;
        break;
      default:
        if (this.scanline >= 21 && this.scanline <= 260) {
          let bufferScan = this.scanline + 1 - 21;
          this.performOAMCorruption();
          if (this.f_bgVisibility === 1 || this.f_spVisibility === 1) {
            if (!this.scanlineAlreadyRendered) {
              this.cntHT = this.regHT;
              this.cntH = this.regH;
              this.renderBgScanline(true, bufferScan);
            }
            this.scanlineAlreadyRendered = false;
            if (!this.hitSpr0 && this.f_bgVisibility === 1 && this.f_spVisibility === 1 && this.scanlineSprite0[bufferScan]) {
              if (this.checkSprite0(bufferScan)) {
                this.hitSpr0 = true;
              }
            }
          }
          if (bufferScan < 240) {
            this.evaluateSprites(bufferScan + 1);
          }
          if (!this.hitSpr0 && this.f_bgVisibility === 1 && this.f_spVisibility === 1) {
            this._precomputeSprite0Hit(bufferScan + 1);
            if (this.spr0HitX !== -1) {
              this.hitSpr0 = true;
            }
          }
          if (this.f_bgVisibility === 1 || this.f_spVisibility === 1) {
            this.nes.mmap.clockIrqCounter();
          }
        }
    }
    this.scanline++;
    this.regsToAddress();
    this.cntsToAddress();
  }
  startFrame() {
    this.scanlineSpriteCount.fill(0);
    this.scanlineSprite0.fill(0);
    let bgColor;
    if (this.f_dispType === 0) {
      bgColor = this.imgPalette[0];
    } else {
      switch (this.f_color) {
        case 0:
          bgColor = 0;
          break;
        case 1:
          bgColor = 65280;
          break;
        case 2:
          bgColor = 255;
          break;
        case 3:
          bgColor = 0;
          break;
        case 4:
          bgColor = 16711680;
          break;
        default:
          bgColor = 0;
      }
    }
    this.buffer.fill(bgColor);
    this.pixrendered.fill(65);
  }
  endFrame() {
    let i, y;
    let buffer = this.buffer;
    if (this.showSpr0Hit) {
      if (this.sprX[0] >= 0 && this.sprX[0] < 256 && this.sprY[0] >= 0 && this.sprY[0] < 240) {
        for (i = 0; i < 256; i++) {
          buffer[(this.sprY[0] << 8) + i] = 16733525;
        }
        for (i = 0; i < 240; i++) {
          buffer[(i << 8) + this.sprX[0]] = 16733525;
        }
      }
      if (this.spr0HitX >= 0 && this.spr0HitX < 256 && this.spr0HitY >= 0 && this.spr0HitY < 240) {
        for (i = 0; i < 256; i++) {
          buffer[(this.spr0HitY << 8) + i] = 5635925;
        }
        for (i = 0; i < 240; i++) {
          buffer[(i << 8) + this.spr0HitX] = 5635925;
        }
      }
    }
    if (this.clipToTvSize || this.f_bgClipping === 0 || this.f_spClipping === 0) {
      for (y = 0; y < 240; y++) {
        buffer.fill(0, y << 8, (y << 8) + 8);
      }
    }
    if (this.clipToTvSize) {
      for (y = 0; y < 240; y++) {
        buffer.fill(0, (y << 8) + 248, (y << 8) + 256);
      }
      buffer.fill(0, 0, 8 << 8);
      buffer.fill(0, 232 << 8, 240 << 8);
    }
    this.nes.ui.writeFrame(buffer);
  }
  updateControlReg1(value) {
    this.triggerRendering();
    this.f_nmiOnVblank = value >> 7 & 1;
    this.f_spriteSize = value >> 5 & 1;
    this.f_bgPatternTable = value >> 4 & 1;
    this.f_spPatternTable = value >> 3 & 1;
    this.f_addrInc = value >> 2 & 1;
    this.f_nTblAddress = value & 3;
    this.regV = value >> 1 & 1;
    this.regH = value & 1;
    this.regS = value >> 4 & 1;
    this._updateNmiOutput();
  }
  // Recomputes the NMI output level from (vblankFlag AND nmiEnabled).
  // On a false→true transition (rising edge), sets nmiRaised on the CPU.
  // On a true→false transition (falling edge), may cancel a not-yet-latched
  // NMI edge.
  //
  // On real 6502 hardware, the NMI edge detector samples the /NMI line at
  // φ2 of each CPU cycle. Once a falling edge is detected (line goes low),
  // the internal NMI signal is latched and held until the NMI handler
  // begins executing — even if /NMI goes back high on the very next cycle.
  //
  // The edge detector needs the NMI output to be stably asserted before φ2
  // to latch. Two cases where the edge is NOT latched:
  //
  // 1. Same bus cycle: NMI output went high→low within one bus cycle.
  //    The edge detector never saw a stable assertion at φ2.
  //
  // 2. Post-loop boundary: NMI output went high at the very end of a
  //    step() call (post-loop check, nmiDotsRemainingInStep=0), right at
  //    the φ2 boundary. If the NEXT bus cycle immediately causes a falling
  //    edge (e.g., $2002 read clearing VBL) BEFORE its step() runs, the
  //    edge detector at the next φ2 sees the line deasserted. This models
  //    the PPU→CPU propagation delay for NMI output changes right at φ2.
  //
  // nmiPending (promoted from a previous instruction) is never cleared.
  // See https://www.nesdev.org/wiki/NMI
  _updateNmiOutput() {
    let vblank = (this.nes.cpu.mem[8194] & 128) !== 0;
    let newOutput = this.f_nmiOnVblank !== 0 && vblank;
    if (newOutput && !this.nmiOutput) {
      this.nes.cpu.nmiRaised = true;
      this.nes.cpu.nmiRaisedAtCycle = this.nes.cpu.instrBusCycles;
    } else if (!newOutput && this.nmiOutput) {
      if (this.nes.cpu.nmiRaised) {
        let busCycleDiff = this.nes.cpu.instrBusCycles - this.nes.cpu.nmiRaisedAtCycle;
        if (busCycleDiff === 0 || busCycleDiff === 1 && this.nes.cpu.nmiDotsRemainingInStep === 0) {
          this.nes.cpu.nmiRaised = false;
        }
      }
    }
    this.nmiOutput = newOutput;
  }
  updateControlReg2(value) {
    this.triggerRendering();
    this.f_color = value >> 5 & 7;
    this.f_spVisibility = value >> 4 & 1;
    this.f_bgVisibility = value >> 3 & 1;
    this.f_spClipping = value >> 2 & 1;
    this.f_bgClipping = value >> 1 & 1;
    this.f_dispType = value & 1;
    if (!this.hitSpr0 && this.f_bgVisibility === 1 && this.f_spVisibility === 1 && this.scanline >= 21 && this.scanline <= 260) {
      let bufferScan = this.scanline + 1 - 21;
      if (this.scanlineSprite0[bufferScan]) {
        if (this.checkSprite0(bufferScan)) {
          this.hitSpr0 = true;
        }
      }
    }
    if (this.f_dispType === 0) {
      this.palTable.setEmphasis(this.f_color);
    }
    this.updatePalettes();
  }
  setStatusFlag(flag, value) {
    let n = 1 << flag;
    this.nes.cpu.mem[8194] = this.nes.cpu.mem[8194] & 255 - n | (value ? n : 0);
  }
  // CPU Register $2002:
  // Read the Status Register.
  readStatusRegister() {
    let tmp = this.nes.cpu.mem[8194];
    this.firstWrite = true;
    if (this.scanline === 0 && this.curX === 0) {
      this.nmiSuppressed = true;
    }
    this.setStatusFlag(this.STATUS_VBLANK, false);
    this._updateNmiOutput();
    tmp = tmp & 224 | this.openBusLatch & 31;
    this.openBusLatch = tmp;
    this.openBusDecayFrames = 36;
    return tmp;
  }
  // CPU Register $2003:
  // Write the SPR-RAM address that is used for sramWrite (Register 0x2004 in CPU memory map)
  writeSRAMAddress(address) {
    this.sramAddress = address;
  }
  // CPU Register $2004 (R):
  // Read from SPR-RAM (Sprite RAM / OAM).
  // During rendering, returns phase-dependent values instead of normal OAM:
  //  - Cycles 1-64 (secondary OAM clear): returns $FF
  //  - Cycles 65-256 (sprite evaluation): returns the byte being read
  //  - Cycles 257-320 (sprite tile loading): returns secondary OAM data
  // During VBlank or when rendering is disabled, returns OAM[OAMADDR] normally.
  // Bits 2-4 of byte 2 (attributes) always read as 0 (unimplemented bits).
  // See https://www.nesdev.org/wiki/PPU_registers#OAMDATA
  sramLoad() {
    let renderingEnabled = this.f_spVisibility === 1 || this.f_bgVisibility === 1;
    if (renderingEnabled && this.scanline >= 20 && this.scanline <= 260) {
      let dot = this.curX;
      if (dot <= 64) {
        return 255;
      } else if (dot <= 256) {
        let val = this.spriteMem[this.sramAddress];
        if ((this.sramAddress & 3) === 2) {
          val &= 227;
        }
        return val;
      } else {
        return 255;
      }
    }
    let value = this.spriteMem[this.sramAddress];
    if ((this.sramAddress & 3) === 2) {
      value &= 227;
    }
    return value;
  }
  // CPU Register $2004 (W):
  // Write to SPR-RAM (Sprite RAM).
  // The address should be set first.
  sramWrite(value) {
    let renderingEnabled = this.f_spVisibility === 1 || this.f_bgVisibility === 1;
    if (renderingEnabled && this.scanline >= 20 && this.scanline <= 260) {
      this.sramAddress = this.sramAddress + 4 & 252;
    } else {
      this.spriteMem[this.sramAddress] = value;
      this.spriteRamWriteUpdate(this.sramAddress, value);
      this.sramAddress++;
      this.sramAddress %= 256;
    }
  }
  // CPU Register $2005:
  // Write to scroll registers.
  // The first write is the vertical offset, the second is the
  // horizontal offset:
  scrollWrite(value) {
    this.triggerRendering();
    if (this.firstWrite) {
      this.regHT = value >> 3 & 31;
      this.regFH = value & 7;
    } else {
      this.regFV = value & 7;
      this.regVT = value >> 3 & 31;
    }
    this.firstWrite = !this.firstWrite;
  }
  // CPU Register $2006:
  // Sets the adress used when reading/writing from/to VRAM.
  // The first write sets the high byte, the second the low byte.
  writeVRAMAddress(address) {
    if (this.firstWrite) {
      this.regFV = address >> 4 & 3;
      this.regV = address >> 3 & 1;
      this.regH = address >> 2 & 1;
      this.regVT = this.regVT & 7 | (address & 3) << 3;
    } else {
      this.triggerRendering();
      this.regVT = this.regVT & 24 | address >> 5 & 7;
      this.regHT = address & 31;
      this.cntFV = this.regFV;
      this.cntV = this.regV;
      this.cntH = this.regH;
      this.cntVT = this.regVT;
      this.cntHT = this.regHT;
      this.checkSprite0(this.scanline + 1 - 21);
    }
    this.firstWrite = !this.firstWrite;
    this.cntsToAddress();
    if (this.vramAddress < 8192) {
      this.nes.mmap.latchAccess(this.vramAddress);
    }
  }
  // CPU Register $2007(R):
  // Read from PPU memory. The address should be set first.
  vramLoad() {
    let tmp;
    this.cntsToAddress();
    this.regsToAddress();
    if (this.vramAddress <= 16127) {
      tmp = this.vramBufferedReadValue;
      if (this.vramAddress < 8192) {
        this.vramBufferedReadValue = this.vramMem[this.vramAddress];
      } else {
        this.vramBufferedReadValue = this.mirroredLoad(this.vramAddress);
      }
      if (this.vramAddress < 8192) {
        this.nes.mmap.latchAccess(this.vramAddress);
      }
      this._incrementVramAddress();
      this.cntsFromAddress();
      this.regsFromAddress();
      return tmp;
    }
    let palIdx = this.vramAddress & 31;
    if ((palIdx & 19) === 16) {
      palIdx &= 15;
    }
    tmp = this.vramMem[16128 + palIdx] & 63 | this.openBusLatch & 192;
    this.vramBufferedReadValue = this.mirroredLoad(this.vramAddress & 12287);
    this._incrementVramAddress();
    this.cntsFromAddress();
    this.regsFromAddress();
    return tmp;
  }
  // CPU Register $2007(W):
  // Write to PPU memory. The address should be set first.
  vramWrite(value) {
    this.triggerRendering();
    this.cntsToAddress();
    this.regsToAddress();
    if (this.vramAddress >= 8192) {
      this.mirroredWrite(this.vramAddress, value);
    } else {
      if (this.nes.mmap.canWriteChr(this.vramAddress)) {
        this.writeMem(this.vramAddress, value);
      }
      this.nes.mmap.latchAccess(this.vramAddress);
    }
    this._incrementVramAddress();
    this.regsFromAddress();
    this.cntsFromAddress();
  }
  // CPU Register $4014:
  // Write 256 bytes of main memory into Sprite RAM (OAM).
  // DMA always copies exactly 256 bytes from CPU page $XX00-$XXFF.
  // The destination starts at the current OAMADDR and wraps within OAM.
  // See https://www.nesdev.org/wiki/PPU_registers#OAMDMA
  sramDMA(value) {
    let baseAddress = value * 256;
    let data;
    for (let i = 0; i < 256; i++) {
      data = this.nes.cpu.mem[baseAddress + i];
      let oamAddr = this.sramAddress + i & 255;
      this.spriteMem[oamAddr] = data;
      this.spriteRamWriteUpdate(oamAddr, data);
    }
    let cpu2 = this.nes.cpu;
    let currentCycle = cpu2._cpuCycleBase + cpu2.instrBusCycles;
    let cycles = currentCycle % 2 === 0 ? 514 : 513;
    cpu2.haltCycles(cycles);
  }
  // Updates the scroll registers from a new VRAM address.
  regsFromAddress() {
    let address = this.vramTmpAddress >> 8 & 255;
    this.regFV = address >> 4 & 7;
    this.regV = address >> 3 & 1;
    this.regH = address >> 2 & 1;
    this.regVT = this.regVT & 7 | (address & 3) << 3;
    address = this.vramTmpAddress & 255;
    this.regVT = this.regVT & 24 | address >> 5 & 7;
    this.regHT = address & 31;
  }
  // Increments the VRAM address after a $2007 read or write. During active
  // rendering (either BG or sprites enabled on a visible/pre-render scanline),
  // the increment behaves differently: instead of the normal +1 or +32 linear
  // increment, the PPU performs simultaneous coarse X and Y increments with
  // proper wrapping. This is because the v register is being used as part of
  // the rendering address logic, not as a simple pointer.
  // See https://www.nesdev.org/wiki/PPU_scrolling#$2007_reads_and_writes
  // See https://www.nesdev.org/wiki/PPU_registers#PPUDATA
  _incrementVramAddress() {
    let renderingEnabled = this.f_spVisibility === 1 || this.f_bgVisibility === 1;
    let onRenderingScanline = this.scanline >= 20 && this.scanline <= 260;
    if (renderingEnabled && onRenderingScanline) {
      if ((this.vramAddress & 31) === 31) {
        this.vramAddress &= ~31;
        this.vramAddress ^= 1024;
      } else {
        this.vramAddress += 1;
      }
      if ((this.vramAddress & 28672) !== 28672) {
        this.vramAddress += 4096;
      } else {
        this.vramAddress &= ~28672;
        let coarseY = this.vramAddress >> 5 & 31;
        if (coarseY === 29) {
          coarseY = 0;
          this.vramAddress ^= 2048;
        } else if (coarseY === 31) {
          coarseY = 0;
        } else {
          coarseY += 1;
        }
        this.vramAddress = this.vramAddress & ~992 | coarseY << 5;
      }
    } else {
      this.vramAddress += this.f_addrInc === 1 ? 32 : 1;
    }
  }
  // Updates the scroll registers from a new VRAM address.
  cntsFromAddress() {
    let address = this.vramAddress >> 8 & 255;
    this.cntFV = address >> 4 & 3;
    this.cntV = address >> 3 & 1;
    this.cntH = address >> 2 & 1;
    this.cntVT = this.cntVT & 7 | (address & 3) << 3;
    address = this.vramAddress & 255;
    this.cntVT = this.cntVT & 24 | address >> 5 & 7;
    this.cntHT = address & 31;
  }
  regsToAddress() {
    let b1 = (this.regFV & 7) << 4;
    b1 |= (this.regV & 1) << 3;
    b1 |= (this.regH & 1) << 2;
    b1 |= this.regVT >> 3 & 3;
    let b2 = (this.regVT & 7) << 5;
    b2 |= this.regHT & 31;
    this.vramTmpAddress = (b1 << 8 | b2) & 32767;
  }
  cntsToAddress() {
    let b1 = (this.cntFV & 7) << 4;
    b1 |= (this.cntV & 1) << 3;
    b1 |= (this.cntH & 1) << 2;
    b1 |= this.cntVT >> 3 & 3;
    let b2 = (this.cntVT & 7) << 5;
    b2 |= this.cntHT & 31;
    this.vramAddress = (b1 << 8 | b2) & 32767;
  }
  incTileCounter(count) {
    for (let i = count; i !== 0; i--) {
      this.cntHT++;
      if (this.cntHT === 32) {
        this.cntHT = 0;
        this.cntVT++;
        if (this.cntVT >= 30) {
          this.cntH++;
          if (this.cntH === 2) {
            this.cntH = 0;
            this.cntV++;
            if (this.cntV === 2) {
              this.cntV = 0;
              this.cntFV++;
              this.cntFV &= 7;
            }
          }
        }
      }
    }
  }
  // Reads from memory, taking into account
  // mirroring/mapping of address ranges.
  mirroredLoad(address) {
    return this.vramMem[this.vramMirrorTable[address]];
  }
  // Writes to memory, taking into account
  // mirroring/mapping of address ranges.
  mirroredWrite(address, value) {
    if (address >= 16128 && address < 16160) {
      if (address === 16128 || address === 16144) {
        this.writeMem(16128, value);
        this.writeMem(16144, value);
      } else if (address === 16132 || address === 16148) {
        this.writeMem(16132, value);
        this.writeMem(16148, value);
      } else if (address === 16136 || address === 16152) {
        this.writeMem(16136, value);
        this.writeMem(16152, value);
      } else if (address === 16140 || address === 16156) {
        this.writeMem(16140, value);
        this.writeMem(16156, value);
      } else {
        this.writeMem(address, value);
      }
    } else {
      if (address < this.vramMirrorTable.length) {
        this.writeMem(this.vramMirrorTable[address], value);
      } else {
        throw new Error(`Invalid VRAM address: ${address.toString(16)}`);
      }
    }
  }
  triggerRendering() {
    if (this._inRendering) return;
    if (this.scanline >= 21 && this.scanline <= 260) {
      this.renderFramePartially(
        this.lastRenderedScanline + 1,
        this.scanline - 21 - this.lastRenderedScanline
      );
      this.lastRenderedScanline = this.scanline - 21;
    }
  }
  renderFramePartially(startScan, scanCount) {
    this._inRendering = true;
    this.nes.mmap.onSpriteRender();
    if (this.f_spVisibility === 1) {
      this.renderSpritesPartially(startScan, scanCount, 1);
    }
    if (this.f_bgVisibility === 1) {
      let si = startScan << 8;
      let ei = startScan + scanCount << 8;
      if (ei > 61440) {
        ei = 61440;
      }
      let buffer = this.buffer;
      let bgbuffer = this.bgbuffer;
      let pixrendered = this.pixrendered;
      for (let destIndex = si; destIndex < ei; destIndex++) {
        if (pixrendered[destIndex] > 255) {
          buffer[destIndex] = bgbuffer[destIndex];
        }
      }
    }
    if (this.f_spVisibility === 1) {
      this.renderSpritesPartially(startScan, scanCount, 0);
    }
    this.nes.mmap.onBgRender();
    this._inRendering = false;
    this.validTileData = false;
  }
  renderBgScanline(bgbuffer, scan) {
    let baseTile = this.regS === 0 ? 0 : 256;
    let baseAddr = this.regS === 0 ? 0 : 4096;
    let destIndex = (scan << 8) - this.regFH;
    this.curNt = this.ntable1[this.cntV + this.cntV + this.cntH];
    this.cntHT = this.regHT;
    this.cntH = this.regH;
    this.curNt = this.ntable1[this.cntV + this.cntV + this.cntH];
    if (scan < 240 && scan - this.cntFV >= 0) {
      let tscanoffset = this.cntFV << 3;
      let scantile = this.scantile;
      let attrib = this.attrib;
      let ptTile = this.ptTile;
      let nameTable = this.nameTable;
      let imgPalette = this.imgPalette;
      let pixrendered = this.pixrendered;
      let targetBuffer = bgbuffer ? this.bgbuffer : this.buffer;
      let mmap2 = this.nes.mmap;
      let t, tpix, att, col;
      this._inRendering = true;
      this.nes.mmap.onBgRender();
      if (this.f_spriteSize === 1) {
        mmap2.latchAccess(8168);
      }
      for (let tile = 0; tile < 32; tile++) {
        if (scan >= 0) {
          let tileIndex = nameTable[this.curNt].getTileIndex(
            this.cntHT,
            this.cntVT
          );
          if (this.validTileData) {
            t = scantile[tile];
            if (typeof t === "undefined") {
              continue;
            }
            tpix = t.pix;
            att = attrib[tile];
          } else {
            t = ptTile[baseTile + tileIndex];
            if (typeof t === "undefined") {
              continue;
            }
            tpix = t.pix;
            att = nameTable[this.curNt].getAttrib(this.cntHT, this.cntVT);
            if (mmap2.bgTileOverride) {
              let override = mmap2.getBgTileData(
                baseTile,
                tileIndex,
                this.cntHT,
                this.cntVT
              );
              if (override) {
                t = override.tile;
                tpix = t.pix;
                att = override.attrib;
              }
            }
            scantile[tile] = t;
            attrib[tile] = att;
          }
          let sx = 0;
          let x = (tile << 3) - this.regFH;
          if (x > -8) {
            if (x < 0) {
              destIndex -= x;
              sx = -x;
            }
            if (t.opaque[this.cntFV]) {
              for (; sx < 8; sx++) {
                targetBuffer[destIndex] = imgPalette[tpix[tscanoffset + sx] + att];
                pixrendered[destIndex] |= 256;
                destIndex++;
              }
            } else {
              for (; sx < 8; sx++) {
                col = tpix[tscanoffset + sx];
                if (col !== 0) {
                  targetBuffer[destIndex] = imgPalette[col + att];
                  pixrendered[destIndex] |= 256;
                }
                destIndex++;
              }
            }
          }
          mmap2.latchAccess(baseAddr + tileIndex * 16 + this.cntFV + 8);
        }
        if (++this.cntHT === 32) {
          this.cntHT = 0;
          this.cntH++;
          this.cntH %= 2;
          this.curNt = this.ntable1[(this.cntV << 1) + this.cntH];
        }
      }
      this._inRendering = false;
      this.validTileData = true;
    }
    this.cntFV++;
    if (this.cntFV === 8) {
      this.cntFV = 0;
      this.cntVT++;
      if (this.cntVT === 30) {
        this.cntVT = 0;
        this.cntV++;
        this.cntV %= 2;
        this.curNt = this.ntable1[(this.cntV << 1) + this.cntH];
      } else if (this.cntVT === 32) {
        this.cntVT = 0;
      }
      this.validTileData = false;
    }
  }
  // OAM corruption (2C02G/H hardware bug): if OAMADDR is not zero at the
  // beginning of the pre-render or any visible scanline (when rendering is
  // enabled), the 8 bytes at (OAMADDR & $F8) are copied over the first 8
  // bytes of OAM. This is a DRAM refresh glitch, separate from evaluation.
  // See https://www.nesdev.org/wiki/PPU_OAM#Sprite_0_corruption
  performOAMCorruption() {
    let renderingEnabled = this.f_spVisibility === 1 || this.f_bgVisibility === 1;
    if (!renderingEnabled) return;
    if (this.sramAddress === 0) return;
    let srcBase = this.sramAddress & 248;
    for (let i = 0; i < 8; i++) {
      this.spriteMem[i] = this.spriteMem[srcBase + i & 255];
    }
    for (let i = 0; i < 8; i++) {
      this.spriteRamWriteUpdate(i, this.spriteMem[i]);
    }
  }
  // Evaluate sprites for the given scanline, populating secondary OAM and
  // storing results in per-scanline arrays for later batch rendering.
  //
  // On real hardware this runs during cycles 65-256 of each visible scanline,
  // finding up to 8 sprites that are in range for the NEXT scanline. The
  // algorithm is a state machine with counters n (sprite index, 0-63) and
  // m (byte within sprite, 0-3). It includes the hardware sprite overflow
  // bug where both n AND m are incremented when checking for a 9th sprite.
  //
  // targetScanline: the NES scanline (0-239) whose sprites we're evaluating.
  //   Evaluation on visible scanline N finds sprites for scanline N+1.
  //   Results are stored in scanlineSecondaryOAM[targetScanline].
  //
  // See https://www.nesdev.org/wiki/PPU_sprite_evaluation
  evaluateSprites(targetScanline) {
    let renderingEnabled = this.f_spVisibility === 1 || this.f_bgVisibility === 1;
    if (!renderingEnabled) return;
    let oamBase = targetScanline * 32;
    for (let i = 0; i < 32; i++) {
      this.scanlineSecondaryOAM[oamBase + i] = 255;
    }
    this.scanlineSpriteCount[targetScanline] = 0;
    this.scanlineSprite0[targetScanline] = 0;
    let spriteHeight = this.f_spriteSize === 0 ? 8 : 16;
    let spritesFound = 0;
    let secondaryIndex = 0;
    let startN = this.sramAddress >> 2 & 63;
    let startM = this.sramAddress & 3;
    let overflowM = 0;
    let n = startN;
    let firstSprite = true;
    let evaluated = 0;
    do {
      let m;
      if (spritesFound >= 8) {
        m = overflowM;
      } else if (firstSprite) {
        m = startM;
      } else {
        m = 0;
      }
      firstSprite = false;
      let yByte = this.spriteMem[n * 4 + m & 255];
      if (targetScanline > yByte && targetScanline <= yByte + spriteHeight) {
        if (spritesFound < 8) {
          for (let b = 0; b < 4; b++) {
            this.scanlineSecondaryOAM[oamBase + secondaryIndex + b] = this.spriteMem[n * 4 + m + b & 255];
          }
          if (evaluated === 0) {
            this.scanlineSprite0[targetScanline] = 1;
          }
          spritesFound++;
          secondaryIndex += 4;
        } else {
          this.setStatusFlag(this.STATUS_SLSPRITECOUNT, true);
          break;
        }
      } else if (spritesFound >= 8) {
        overflowM = overflowM + 1 & 3;
      }
      n = n + 1 & 63;
      evaluated++;
    } while (n !== 0);
    this.scanlineSpriteCount[targetScanline] = spritesFound;
    for (let i = 0; i < 32; i++) {
      this.secondaryOAM[i] = this.scanlineSecondaryOAM[oamBase + i];
    }
    this.spritesFound = spritesFound;
    this.sprite0InSecondary = this.scanlineSprite0[targetScanline] === 1;
    this.sramAddress = 0;
  }
  // Render sprites for a range of scanlines using per-scanline secondary OAM
  // data from sprite evaluation. Only the 8 (or fewer) sprites selected by
  // evaluation are rendered, enforcing the hardware's per-scanline sprite limit.
  //
  // bgPri: 0 = render sprites with bg priority 0 (in front of background),
  //         1 = render sprites with bg priority 1 (behind background).
  //
  // Each scanline's sprites come from scanlineSecondaryOAM[], populated by
  // evaluateSprites() during endScanline(). Sprite data is read from secondary
  // OAM format: [Y, tile, attributes, X] × 8 sprites.
  renderSpritesPartially(startscan, scancount, bgPri) {
    if (this.f_spVisibility !== 1) return;
    let mmap2 = this.nes.mmap;
    let ptTile = this.ptTile;
    let buffer = this.buffer;
    let sprPalette = this.sprPalette;
    let pixrendered = this.pixrendered;
    for (let scan = startscan; scan < startscan + scancount; scan++) {
      if (scan < 0 || scan >= 240) continue;
      let count = this.scanlineSpriteCount[scan];
      let oamBase = scan * 32;
      for (let i = 0; i < count; i++) {
        let sprY = this.scanlineSecondaryOAM[oamBase + i * 4 + 0];
        let sprTile = this.scanlineSecondaryOAM[oamBase + i * 4 + 1];
        let sprAttr = this.scanlineSecondaryOAM[oamBase + i * 4 + 2];
        let sprX = this.scanlineSecondaryOAM[oamBase + i * 4 + 3];
        let vertFlip = sprAttr >> 7 & 1;
        let horiFlip = sprAttr >> 6 & 1;
        let priority = sprAttr >> 5 & 1;
        let palAdd = (sprAttr & 3) << 2;
        if (priority !== bgPri) continue;
        if (this.f_spriteSize === 0) {
          let tileIndex = this.f_spPatternTable === 0 ? sprTile : sprTile + 256;
          let sprBaseAddr = this.f_spPatternTable === 0 ? 0 : 4096;
          let dy = sprY + 1;
          let fineY = scan - dy;
          if (fineY < 0 || fineY >= 8) continue;
          ptTile[tileIndex].render(
            buffer,
            0,
            fineY,
            8,
            fineY + 1,
            sprX,
            dy,
            palAdd,
            sprPalette,
            horiFlip,
            vertFlip,
            i,
            // priority: lower index in secondary OAM = higher priority
            pixrendered
          );
          mmap2.latchAccess(sprBaseAddr + sprTile * 16 + 8);
        } else {
          let sprBaseAddr = (sprTile & 1) !== 0 ? 4096 : 0;
          let topTileNum = sprTile & 254;
          let top = (sprTile & 1) !== 0 ? topTileNum - 1 + 256 : topTileNum;
          let dy = sprY + 1;
          let fineY = scan - dy;
          if (fineY < 0 || fineY >= 16) continue;
          let tileOffset, tileFineY;
          if (fineY < 8) {
            tileOffset = vertFlip ? 1 : 0;
            tileFineY = fineY;
          } else {
            tileOffset = vertFlip ? 0 : 1;
            tileFineY = fineY - 8;
          }
          ptTile[top + tileOffset].render(
            buffer,
            0,
            tileFineY,
            8,
            tileFineY + 1,
            sprX,
            dy + (fineY < 8 ? 0 : 8),
            palAdd,
            sprPalette,
            horiFlip,
            vertFlip,
            i,
            pixrendered
          );
          mmap2.latchAccess(sprBaseAddr + topTileNum * 16 + 8);
          mmap2.latchAccess(sprBaseAddr + (topTileNum + 1) * 16 + 8);
        }
      }
    }
  }
  // Check if sprite 0 overlaps with a background tile pixel on this scanline.
  // "Sprite 0" is the first sprite in evaluation order — normally OAM entry 0,
  // but a non-zero OAMADDR can make a different entry act as sprite 0.
  //
  // On real hardware, sprite 0 hit only fires when a non-transparent sprite
  // pixel overlaps with a non-transparent background tile pixel. We check
  // pixrendered[bufferIndex] > 0xff because bit 8 (256) is set by
  // renderBgScanline when an actual background tile pixel is rendered.
  // See https://www.nesdev.org/wiki/PPU_OAM#Sprite_zero_hits
  checkSprite0(scan) {
    this.spr0HitX = -1;
    this.spr0HitY = -1;
    if (scan < 0 || scan >= 240) return false;
    if (!this.scanlineSprite0[scan]) return false;
    if (this.scanlineSpriteCount[scan] === 0) return false;
    let oamBase = scan * 32;
    let sprY = this.scanlineSecondaryOAM[oamBase + 0];
    let sprTile = this.scanlineSecondaryOAM[oamBase + 1];
    let sprAttr = this.scanlineSecondaryOAM[oamBase + 2];
    let x = this.scanlineSecondaryOAM[oamBase + 3];
    let y = sprY + 1;
    let vertFlip = sprAttr >> 7 & 1;
    let horiFlip = sprAttr >> 6 & 1;
    let leftClip = this.f_spClipping === 0 || this.f_bgClipping === 0;
    let toffset;
    let t;
    let mmap2 = this.nes.mmap;
    if (this.f_spriteSize === 0) {
      let tIndexAdd = this.f_spPatternTable === 0 ? 0 : 256;
      if (y <= scan && y + 8 > scan && x < 256) {
        t = mmap2.getSpritePatternTile(sprTile + tIndexAdd);
        toffset = vertFlip ? 7 - (scan - y) : scan - y;
        toffset *= 8;
        return this._checkSpr0Pixels(t, toffset, x, horiFlip, scan, leftClip);
      }
    } else {
      if (y <= scan && y + 16 > scan && x < 256) {
        toffset = vertFlip ? 15 - (scan - y) : scan - y;
        if (toffset < 8) {
          t = mmap2.getSpritePatternTile(
            sprTile + (vertFlip ? 1 : 0) + ((sprTile & 1) !== 0 ? 255 : 0)
          );
        } else {
          t = mmap2.getSpritePatternTile(
            sprTile + (vertFlip ? 0 : 1) + ((sprTile & 1) !== 0 ? 255 : 0)
          );
          toffset = vertFlip ? 15 - toffset : toffset - 8;
        }
        toffset *= 8;
        return this._checkSpr0Pixels(t, toffset, x, horiFlip, scan, leftClip);
      }
    }
    return false;
  }
  // Helper: scan 8 pixels of sprite 0's tile row for overlap with background.
  // Checks for non-transparent sprite pixel overlapping non-transparent BG pixel,
  // excluding x=255 and left-clipped pixels (x=0..7 when leftClip is true).
  _checkSpr0Pixels(tile, toffset, startX, horiFlip, scan, leftClip) {
    if (!tile || !tile.pix) return false;
    let bufferIndex = scan * 256 + startX;
    for (let px = 0; px < 8; px++) {
      let tileIdx = horiFlip ? 7 - px : px;
      let pixelX = startX + px;
      if (pixelX >= 0 && pixelX < 255) {
        if (leftClip && pixelX < 8) {
          bufferIndex++;
          continue;
        }
        if (bufferIndex >= 0 && bufferIndex < 61440 && this.pixrendered[bufferIndex] > 255 && tile.pix[toffset + tileIdx] !== 0) {
          this.spr0HitX = pixelX;
          this.spr0HitY = scan;
          return true;
        }
      }
      bufferIndex++;
    }
    return false;
  }
  // Pre-computes sprite 0 hit for the NEXT scanline by checking BG tile data
  // directly, without requiring a full BG render. This is called after
  // renderBgScanline advances the scroll counters (cntFV/cntVT/cntV) to the
  // next row's position. By detecting the hit one scanline early, the dot-by-
  // dot loop in step() can set STATUS_SPRITE0HIT at the correct PPU cycle
  // instead of one full scanline late.
  //
  // The approach: for each of sprite 0's 8 pixels, compute which BG tile
  // occupies that screen position using the scroll registers, then check if
  // both the sprite pixel and BG pixel are non-transparent.
  //
  // See https://www.nesdev.org/wiki/PPU_OAM#Sprite_zero_hits
  _precomputeSprite0Hit(nextBufferScan) {
    if (nextBufferScan < 1 || nextBufferScan > 239) return false;
    if (!this.scanlineSprite0[nextBufferScan]) return false;
    if (this.scanlineSpriteCount[nextBufferScan] === 0) return false;
    let oamBase = nextBufferScan * 32;
    let sprY = this.scanlineSecondaryOAM[oamBase + 0];
    let sprTile = this.scanlineSecondaryOAM[oamBase + 1];
    let sprAttr = this.scanlineSecondaryOAM[oamBase + 2];
    let sprX = this.scanlineSecondaryOAM[oamBase + 3];
    let y = sprY + 1;
    let vertFlip = sprAttr >> 7 & 1;
    let horiFlip = sprAttr >> 6 & 1;
    let leftClip = this.f_spClipping === 0 || this.f_bgClipping === 0;
    let spriteHeight = this.f_spriteSize === 0 ? 8 : 16;
    if (!(y <= nextBufferScan && y + spriteHeight > nextBufferScan))
      return false;
    if (sprX >= 256) return false;
    let sprRow = vertFlip ? spriteHeight - 1 - (nextBufferScan - y) : nextBufferScan - y;
    let sprTileObj, toffset;
    if (this.f_spriteSize === 0) {
      let tIndexAdd = this.f_spPatternTable === 0 ? 0 : 256;
      sprTileObj = this.ptTile[sprTile + tIndexAdd];
      toffset = sprRow * 8;
    } else {
      let patternBase = (sprTile & 1) !== 0 ? 256 : 0;
      let baseTileIdx = sprTile & ~1;
      if (sprRow < 8) {
        sprTileObj = this.ptTile[baseTileIdx + patternBase + (vertFlip ? 1 : 0)];
        toffset = sprRow * 8;
      } else {
        sprTileObj = this.ptTile[baseTileIdx + patternBase + (vertFlip ? 0 : 1)];
        toffset = (sprRow - 8) * 8;
      }
    }
    if (!sprTileObj) return false;
    let bgFineY = this.cntFV;
    let bgCoarseY = this.cntVT;
    let bgNtV = this.cntV;
    let baseBgTile = this.regS === 0 ? 0 : 256;
    for (let px = 0; px < 8; px++) {
      let screenX = sprX + px;
      if (screenX >= 255) continue;
      if (leftClip && screenX < 8) continue;
      let tileIdx = horiFlip ? 7 - px : px;
      if (sprTileObj.pix[toffset + tileIdx] === 0) continue;
      let tileOffset = screenX + this.regFH >> 3;
      let absCol = this.regHT + tileOffset;
      let bgNtH = this.regH;
      if (absCol >= 32) {
        absCol -= 32;
        bgNtH ^= 1;
      }
      let ntIdx = this.ntable1[(bgNtV << 1) + bgNtH];
      let bgTileIndex = this.nameTable[ntIdx].getTileIndex(absCol, bgCoarseY);
      let bgTile = this.ptTile[baseBgTile + bgTileIndex];
      if (!bgTile) continue;
      let bgPixelX = screenX + this.regFH & 7;
      if (bgTile.pix[bgFineY * 8 + bgPixelX] !== 0) {
        this.spr0HitX = screenX;
        this.spr0HitY = nextBufferScan - 1;
        return true;
      }
    }
    return false;
  }
  // This will write to PPU memory, and
  // update internally buffered data
  // appropriately.
  writeMem(address, value) {
    this.vramMem[address] = value;
    if (address < 8192) {
      this.vramMem[address] = value;
      this.patternWrite(address, value);
    } else if (address >= 8192 && address < 9152) {
      this.nameTableWrite(this.ntable1[0], address - 8192, value);
    } else if (address >= 9152 && address < 9216) {
      this.attribTableWrite(this.ntable1[0], address - 9152, value);
    } else if (address >= 9216 && address < 10176) {
      this.nameTableWrite(this.ntable1[1], address - 9216, value);
    } else if (address >= 10176 && address < 10240) {
      this.attribTableWrite(this.ntable1[1], address - 10176, value);
    } else if (address >= 10240 && address < 11200) {
      this.nameTableWrite(this.ntable1[2], address - 10240, value);
    } else if (address >= 11200 && address < 11264) {
      this.attribTableWrite(this.ntable1[2], address - 11200, value);
    } else if (address >= 11264 && address < 12224) {
      this.nameTableWrite(this.ntable1[3], address - 11264, value);
    } else if (address >= 12224 && address < 12288) {
      this.attribTableWrite(this.ntable1[3], address - 12224, value);
    } else if (address >= 16128 && address < 16160) {
      this.updatePalettes();
    }
  }
  // Reads data from $3f00 to $f20
  // into the two buffered palettes.
  updatePalettes() {
    let i;
    for (i = 0; i < 16; i++) {
      if (this.f_dispType === 0) {
        this.imgPalette[i] = this.palTable.getEntry(
          this.vramMem[16128 + i] & 63
        );
      } else {
        this.imgPalette[i] = this.palTable.getEntry(
          this.vramMem[16128 + i] & 48
        );
      }
    }
    for (i = 0; i < 16; i++) {
      if (this.f_dispType === 0) {
        this.sprPalette[i] = this.palTable.getEntry(
          this.vramMem[16144 + i] & 63
        );
      } else {
        this.sprPalette[i] = this.palTable.getEntry(
          this.vramMem[16144 + i] & 48
        );
      }
    }
  }
  // Updates the internal pattern
  // table buffers with this new byte.
  // In vNES, there is a version of this with 4 arguments which isn't used.
  patternWrite(address, value) {
    let tileIndex = address >> 4;
    let leftOver = address & 15;
    if (leftOver < 8) {
      this.ptTile[tileIndex].setScanline(
        leftOver,
        value,
        this.vramMem[address + 8]
      );
    } else {
      this.ptTile[tileIndex].setScanline(
        leftOver - 8,
        this.vramMem[address - 8],
        value
      );
    }
  }
  // Updates the internal name table buffers
  // with this new byte.
  nameTableWrite(index, address, value) {
    this.nameTable[index].tile[address] = value;
    let bufferScan = this.scanline + 1 - 21;
    this.checkSprite0(bufferScan);
  }
  // Updates the internal pattern
  // table buffers with this new attribute
  // table byte.
  attribTableWrite(index, address, value) {
    this.nameTable[index].writeAttrib(address, value);
    this.nameTable[index].tile[960 + address] = value;
  }
  // Updates the internally buffered sprite
  // data with this new byte of info.
  spriteRamWriteUpdate(address, value) {
    let tIndex = address >> 2;
    if (tIndex === 0) {
      let bufferScan = this.scanline + 1 - 21;
      this.checkSprite0(bufferScan);
    }
    switch (address & 3) {
      case 0:
        this.sprY[tIndex] = value;
        break;
      case 1:
        this.sprTile[tIndex] = value;
        break;
      case 2:
        this.vertFlip[tIndex] = value >> 7 & 1;
        this.horiFlip[tIndex] = value >> 6 & 1;
        this.bgPriority[tIndex] = value >> 5 & 1;
        this.sprCol[tIndex] = (value & 3) << 2;
        break;
      case 3:
        this.sprX[tIndex] = value;
        break;
    }
  }
  isPixelWhite(x, y) {
    this.triggerRendering();
    return this.nes.ppu.buffer[(y << 8) + x] === 16777215;
  }
  toJSON() {
    let i;
    let state = toJSON(this);
    state.nameTable = [];
    for (i = 0; i < this.nameTable.length; i++) {
      state.nameTable[i] = this.nameTable[i].toJSON();
    }
    state.ptTile = [];
    for (i = 0; i < this.ptTile.length; i++) {
      state.ptTile[i] = this.ptTile[i].toJSON();
    }
    return state;
  }
  fromJSON(state) {
    let i;
    fromJSON(this, state);
    for (i = 0; i < this.nameTable.length; i++) {
      this.nameTable[i].fromJSON(state.nameTable[i]);
    }
    for (i = 0; i < this.ptTile.length; i++) {
      this.ptTile[i].fromJSON(state.ptTile[i]);
    }
    for (i = 0; i < this.spriteMem.length; i++) {
      this.spriteRamWriteUpdate(i, this.spriteMem[i]);
    }
  }
  static {
    this.JSON_PROPERTIES = [
      // Memory
      "vramMem",
      "spriteMem",
      // Counters
      "cntFV",
      "cntV",
      "cntH",
      "cntVT",
      "cntHT",
      // Registers
      "regFV",
      "regV",
      "regH",
      "regVT",
      "regHT",
      "regFH",
      "regS",
      // VRAM addr
      "vramAddress",
      "vramTmpAddress",
      // Control/Status registers
      "f_nmiOnVblank",
      "f_spriteSize",
      "f_bgPatternTable",
      "f_spPatternTable",
      "f_addrInc",
      "f_nTblAddress",
      "f_color",
      "f_spVisibility",
      "f_bgVisibility",
      "f_spClipping",
      "f_bgClipping",
      "f_dispType",
      // VRAM I/O
      "vramBufferedReadValue",
      "firstWrite",
      "openBusLatch",
      "openBusDecayFrames",
      // Mirroring
      "currentMirroring",
      "vramMirrorTable",
      "ntable1",
      // SPR-RAM I/O
      "sramAddress",
      // Sprites. Most sprite data is rebuilt from spriteMem
      "hitSpr0",
      // Secondary OAM: persistent hardware state (not cleared on pre-render)
      "secondaryOAM",
      "spritesFound",
      "sprite0InSecondary",
      // Palettes
      "sprPalette",
      "imgPalette",
      // Rendering progression
      "curX",
      "scanline",
      "lastRenderedScanline",
      "curNt",
      "scantile",
      // Used during rendering
      "attrib",
      "buffer",
      "bgbuffer",
      "pixrendered",
      // Misc
      "nmiOutput",
      "nmiSuppressed",
      "vblankPending",
      "dummyCycleToggle",
      "validTileData",
      "scanlineAlreadyRendered"
    ];
  }
};
var ppu_default = PPU;

// src/core/papu/channel-dm.ts
var ChannelDM = class _ChannelDM {
  static {
    this.MODE_NORMAL = 0;
  }
  static {
    this.MODE_LOOP = 1;
  }
  static {
    this.MODE_IRQ = 2;
  }
  static {
    this.JSON_PROPERTIES = [
      "isEnabled",
      "hasSample",
      "irqGenerated",
      "playMode",
      "dmaFrequency",
      "dmaCounter",
      "deltaCounter",
      "playStartAddress",
      "playAddress",
      "playLength",
      "playLengthCounter",
      "shiftCounter",
      "reg4012",
      "reg4013",
      "sample",
      "dacLsb",
      "data",
      "lastFetchedByte"
    ];
  }
  constructor(papu) {
    this.papu = papu;
    this.isEnabled = false;
    this.hasSample = false;
    this.irqGenerated = false;
    this.playMode = _ChannelDM.MODE_NORMAL;
    this.dmaFrequency = 0;
    this.dmaCounter = 0;
    this.deltaCounter = 0;
    this.playStartAddress = 0;
    this.playAddress = 0;
    this.playLength = 0;
    this.playLengthCounter = 0;
    this.sample = 0;
    this.dacLsb = 0;
    this.shiftCounter = 0;
    this.reg4012 = 0;
    this.reg4013 = 0;
    this.data = 0;
    this.lastFetchedByte = 0;
  }
  clockDmc() {
    if (this.hasSample) {
      if ((this.data & 1) === 0) {
        if (this.deltaCounter > 0) {
          this.deltaCounter--;
        }
      } else {
        if (this.deltaCounter < 63) {
          this.deltaCounter++;
        }
      }
      this.sample = this.isEnabled ? (this.deltaCounter << 1) + this.dacLsb : 0;
      this.data >>= 1;
    }
    this.dmaCounter--;
    if (this.dmaCounter <= 0) {
      this.hasSample = false;
      this.endOfSample();
      this.dmaCounter = 8;
    }
    if (this.irqGenerated) {
      this.papu.nes.cpu.requestIrq(this.papu.nes.cpu.IRQ_NORMAL);
    }
  }
  endOfSample() {
    if (this.playLengthCounter === 0 && this.playMode === _ChannelDM.MODE_LOOP) {
      this.playAddress = this.playStartAddress;
      this.playLengthCounter = this.playLength;
    }
    if (this.playLengthCounter > 0) {
      this.nextSample();
      if (this.playLengthCounter === 0) {
        if (this.playMode === _ChannelDM.MODE_IRQ) {
          this.irqGenerated = true;
        }
      }
    }
  }
  nextSample() {
    this.data = this.papu.nes.mmap.load(this.playAddress);
    this.lastFetchedByte = this.data;
    this.papu.nes.cpu.haltCycles(4);
    this.playLengthCounter--;
    this.playAddress++;
    if (this.playAddress > 65535) {
      this.playAddress = 32768;
    }
    this.hasSample = true;
  }
  writeReg(address, value) {
    if (address === 16400) {
      if (value >> 6 === 0) {
        this.playMode = _ChannelDM.MODE_NORMAL;
      } else if ((value >> 6 & 1) === 1) {
        this.playMode = _ChannelDM.MODE_LOOP;
      } else if (value >> 6 === 2) {
        this.playMode = _ChannelDM.MODE_IRQ;
      }
      if ((value & 128) === 0) {
        this.irqGenerated = false;
      }
      this.dmaFrequency = this.papu.getDmcFrequency(value & 15);
    } else if (address === 16401) {
      this.deltaCounter = value >> 1 & 63;
      this.dacLsb = value & 1;
      this.sample = (this.deltaCounter << 1) + this.dacLsb;
    } else if (address === 16402) {
      this.playStartAddress = value << 6 | 49152;
      this.reg4012 = value;
    } else if (address === 16403) {
      this.playLength = (value << 4) + 1;
      this.reg4013 = value;
    } else if (address === 16405) {
      this.irqGenerated = false;
      if ((value >> 4 & 1) === 0) {
        this.playLengthCounter = 0;
      } else {
        if (this.playLengthCounter === 0) {
          this.playAddress = this.playStartAddress;
          this.playLengthCounter = this.playLength;
          if (!this.hasSample && this.playLengthCounter > 0) {
            this.nextSample();
            this.dmaCounter = 8;
            this.shiftCounter = this.dmaFrequency;
            if (this.playLengthCounter === 0 && this.playMode === _ChannelDM.MODE_IRQ) {
              this.irqGenerated = true;
            }
          }
        }
      }
    }
  }
  setEnabled(value) {
    this.isEnabled = value;
  }
  getLengthStatus() {
    return this.playLengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }
  getIrqStatus() {
    return this.irqGenerated ? 1 : 0;
  }
  toJSON() {
    return toJSON(this);
  }
  fromJSON(s) {
    fromJSON(this, s);
  }
};
var channel_dm_default = ChannelDM;

// src/core/papu/channel-noise.ts
var ChannelNoise = class {
  constructor(papu) {
    this.papu = papu;
    this.progTimerCount = 0;
    this.progTimerMax = 0;
    this.isEnabled = false;
    this.lengthCounter = 0;
    this.lengthCounterEnable = false;
    this.envDecayDisable = false;
    this.envDecayLoopEnable = false;
    this.envReset = false;
    this.shiftNow = false;
    this.envDecayRate = 0;
    this.envDecayCounter = 0;
    this.envVolume = 0;
    this.masterVolume = 0;
    this.shiftReg = 1;
    this.randomBit = 0;
    this.randomMode = 0;
    this.sampleValue = 0;
    this.tmp = 0;
    this.accValue = 0;
    this.accCount = 1;
  }
  clockLengthCounter() {
    if (this.lengthCounterEnable && this.lengthCounter > 0) {
      this.lengthCounter--;
      if (this.lengthCounter === 0) {
        this.updateSampleValue();
      }
    }
  }
  clockEnvDecay() {
    if (this.envReset) {
      this.envReset = false;
      this.envDecayCounter = this.envDecayRate + 1;
      this.envVolume = 15;
    } else if (--this.envDecayCounter <= 0) {
      this.envDecayCounter = this.envDecayRate + 1;
      if (this.envVolume > 0) {
        this.envVolume--;
      } else {
        this.envVolume = this.envDecayLoopEnable ? 15 : 0;
      }
    }
    if (this.envDecayDisable) {
      this.masterVolume = this.envDecayRate;
    } else {
      this.masterVolume = this.envVolume;
    }
    this.updateSampleValue();
  }
  updateSampleValue() {
    if (this.isEnabled && this.lengthCounter > 0) {
      this.sampleValue = this.randomBit * this.masterVolume;
    }
  }
  writeReg(address, value) {
    if (address === 16396) {
      this.envDecayDisable = (value & 16) !== 0;
      this.envDecayRate = value & 15;
      this.envDecayLoopEnable = (value & 32) !== 0;
      this.lengthCounterEnable = (value & 32) === 0;
      if (this.envDecayDisable) {
        this.masterVolume = this.envDecayRate;
      } else {
        this.masterVolume = this.envVolume;
      }
    } else if (address === 16398) {
      this.progTimerMax = this.papu.getNoiseWaveLength(value & 15);
      this.randomMode = value >> 7;
    } else if (address === 16399) {
      if (this.isEnabled) {
        this.lengthCounter = this.papu.getLengthMax(value & 248);
      }
      this.envReset = true;
    }
  }
  setEnabled(value) {
    this.isEnabled = value;
    if (!value) {
      this.lengthCounter = 0;
    }
    this.updateSampleValue();
  }
  getLengthStatus() {
    return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }
  toJSON() {
    return toJSON(this);
  }
  fromJSON(s) {
    fromJSON(this, s);
  }
  static {
    this.JSON_PROPERTIES = [
      "isEnabled",
      "envDecayDisable",
      "envDecayLoopEnable",
      "lengthCounterEnable",
      "envReset",
      "shiftNow",
      "lengthCounter",
      "progTimerCount",
      "progTimerMax",
      "envDecayRate",
      "envDecayCounter",
      "envVolume",
      "masterVolume",
      "shiftReg",
      "randomBit",
      "randomMode",
      "sampleValue",
      "accValue",
      "accCount",
      "tmp"
    ];
  }
};
var channel_noise_default = ChannelNoise;

// src/core/papu/channel-square.ts
var ChannelSquare = class {
  constructor(papu, square1) {
    this.papu = papu;
    this.dutyLookup = [
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      1,
      1
    ];
    this.impLookup = [
      1,
      -1,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      -1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      -1,
      0,
      0,
      0,
      -1,
      0,
      1,
      0,
      0,
      0,
      0,
      0
    ];
    this.sqr1 = square1;
    this.progTimerCount = 0;
    this.progTimerMax = 0;
    this.lengthCounter = 0;
    this.squareCounter = 0;
    this.sweepCounter = 0;
    this.sweepCounterMax = 0;
    this.sweepMode = 0;
    this.sweepShiftAmount = 0;
    this.envDecayRate = 0;
    this.envDecayCounter = 0;
    this.envVolume = 0;
    this.masterVolume = 0;
    this.dutyMode = 0;
    this.vol = 0;
    this.isEnabled = false;
    this.lengthCounterEnable = false;
    this.sweepActive = false;
    this.sweepCarry = false;
    this.envDecayDisable = false;
    this.envDecayLoopEnable = false;
    this.envReset = false;
    this.updateSweepPeriod = false;
    this.sweepResult = 0;
    this.sampleValue = 0;
  }
  clockLengthCounter() {
    if (this.lengthCounterEnable && this.lengthCounter > 0) {
      this.lengthCounter--;
      if (this.lengthCounter === 0) {
        this.updateSampleValue();
      }
    }
  }
  clockEnvDecay() {
    if (this.envReset) {
      this.envReset = false;
      this.envDecayCounter = this.envDecayRate + 1;
      this.envVolume = 15;
    } else if (--this.envDecayCounter <= 0) {
      this.envDecayCounter = this.envDecayRate + 1;
      if (this.envVolume > 0) {
        this.envVolume--;
      } else {
        this.envVolume = this.envDecayLoopEnable ? 15 : 0;
      }
    }
    if (this.envDecayDisable) {
      this.masterVolume = this.envDecayRate;
    } else {
      this.masterVolume = this.envVolume;
    }
    this.updateSampleValue();
  }
  clockSweep() {
    if (--this.sweepCounter <= 0) {
      this.sweepCounter = this.sweepCounterMax + 1;
      if (this.sweepActive && this.sweepShiftAmount > 0 && this.progTimerMax > 7) {
        this.sweepCarry = false;
        if (this.sweepMode === 0) {
          this.progTimerMax += this.progTimerMax >> this.sweepShiftAmount;
          if (this.progTimerMax > 2047) {
            this.progTimerMax = 4095;
            this.sweepCarry = true;
          }
        } else {
          this.progTimerMax = this.progTimerMax - ((this.progTimerMax >> this.sweepShiftAmount) + (this.sqr1 ? 1 : 0));
        }
      }
    }
    if (this.updateSweepPeriod) {
      this.updateSweepPeriod = false;
      this.sweepCounter = this.sweepCounterMax + 1;
    }
  }
  updateSampleValue() {
    if (this.isEnabled && this.lengthCounter > 0 && this.progTimerMax > 7) {
      if (this.sweepMode === 0 && this.progTimerMax + (this.progTimerMax >> this.sweepShiftAmount) > 2047) {
        this.sampleValue = 0;
      } else {
        this.sampleValue = this.masterVolume * this.dutyLookup[(this.dutyMode << 3) + this.squareCounter];
      }
    } else {
      this.sampleValue = 0;
    }
  }
  writeReg(address, value) {
    let addrAdd = this.sqr1 ? 0 : 4;
    if (address === 16384 + addrAdd) {
      this.envDecayDisable = (value & 16) !== 0;
      this.envDecayRate = value & 15;
      this.envDecayLoopEnable = (value & 32) !== 0;
      this.dutyMode = value >> 6 & 3;
      this.lengthCounterEnable = (value & 32) === 0;
      if (this.envDecayDisable) {
        this.masterVolume = this.envDecayRate;
      } else {
        this.masterVolume = this.envVolume;
      }
      this.updateSampleValue();
    } else if (address === 16385 + addrAdd) {
      this.sweepActive = (value & 128) !== 0;
      this.sweepCounterMax = value >> 4 & 7;
      this.sweepMode = value >> 3 & 1;
      this.sweepShiftAmount = value & 7;
      this.updateSweepPeriod = true;
    } else if (address === 16386 + addrAdd) {
      this.progTimerMax &= 1792;
      this.progTimerMax |= value;
    } else if (address === 16387 + addrAdd) {
      this.progTimerMax &= 255;
      this.progTimerMax |= (value & 7) << 8;
      if (this.isEnabled) {
        this.lengthCounter = this.papu.getLengthMax(value & 248);
      }
      this.envReset = true;
    }
  }
  setEnabled(value) {
    this.isEnabled = value;
    if (!value) {
      this.lengthCounter = 0;
    }
    this.updateSampleValue();
  }
  getLengthStatus() {
    return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }
  toJSON() {
    return toJSON(this);
  }
  fromJSON(s) {
    fromJSON(this, s);
  }
  static {
    this.JSON_PROPERTIES = [
      "isEnabled",
      "lengthCounterEnable",
      "sweepActive",
      "envDecayDisable",
      "envDecayLoopEnable",
      "envReset",
      "sweepCarry",
      "updateSweepPeriod",
      "progTimerCount",
      "progTimerMax",
      "lengthCounter",
      "squareCounter",
      "sweepCounter",
      "sweepCounterMax",
      "sweepMode",
      "sweepShiftAmount",
      "envDecayRate",
      "envDecayCounter",
      "envVolume",
      "masterVolume",
      "dutyMode",
      "sweepResult",
      "sampleValue",
      "vol"
    ];
  }
};
var channel_square_default = ChannelSquare;

// src/core/papu/channel-triangle.ts
var ChannelTriangle = class {
  constructor(papu) {
    this.papu = papu;
    this.progTimerCount = 0;
    this.progTimerMax = 0;
    this.triangleCounter = 0;
    this.isEnabled = false;
    this.sampleCondition = false;
    this.lengthCounter = 0;
    this.lengthCounterEnable = false;
    this.linearCounter = 0;
    this.lcLoadValue = 0;
    this.lcHalt = true;
    this.lcControl = false;
    this.tmp = 0;
    this.sampleValue = 15;
  }
  clockLengthCounter() {
    if (this.lengthCounterEnable && this.lengthCounter > 0) {
      this.lengthCounter--;
      if (this.lengthCounter === 0) {
        this.updateSampleCondition();
      }
    }
  }
  clockLinearCounter() {
    if (this.lcHalt) {
      this.linearCounter = this.lcLoadValue;
      this.updateSampleCondition();
    } else if (this.linearCounter > 0) {
      this.linearCounter--;
      this.updateSampleCondition();
    }
    if (!this.lcControl) {
      this.lcHalt = false;
    }
  }
  getLengthStatus() {
    return this.lengthCounter === 0 || !this.isEnabled ? 0 : 1;
  }
  // eslint-disable-next-line no-unused-vars
  readReg(address) {
    return 0;
  }
  writeReg(address, value) {
    if (address === 16392) {
      this.lcControl = (value & 128) !== 0;
      this.lcLoadValue = value & 127;
      this.lengthCounterEnable = !this.lcControl;
    } else if (address === 16394) {
      this.progTimerMax &= 1792;
      this.progTimerMax |= value;
    } else if (address === 16395) {
      this.progTimerMax &= 255;
      this.progTimerMax |= (value & 7) << 8;
      if (this.isEnabled) {
        this.lengthCounter = this.papu.getLengthMax(value & 248);
      }
      this.lcHalt = true;
    }
    this.updateSampleCondition();
  }
  clockProgrammableTimer(nCycles) {
    if (this.progTimerMax > 0) {
      this.progTimerCount += nCycles;
      while (this.progTimerMax > 0 && this.progTimerCount >= this.progTimerMax) {
        this.progTimerCount -= this.progTimerMax;
        if (this.isEnabled && this.lengthCounter > 0 && this.linearCounter > 0) {
          this.clockTriangleGenerator();
        }
      }
    }
  }
  clockTriangleGenerator() {
    this.triangleCounter++;
    this.triangleCounter &= 31;
  }
  setEnabled(value) {
    this.isEnabled = value;
    if (!value) {
      this.lengthCounter = 0;
    }
    this.updateSampleCondition();
  }
  updateSampleCondition() {
    this.sampleCondition = this.isEnabled && this.progTimerMax > 7 && this.linearCounter > 0 && this.lengthCounter > 0;
  }
  toJSON() {
    return toJSON(this);
  }
  fromJSON(s) {
    fromJSON(this, s);
  }
  static {
    this.JSON_PROPERTIES = [
      "isEnabled",
      "sampleCondition",
      "lengthCounterEnable",
      "lcHalt",
      "lcControl",
      "progTimerCount",
      "progTimerMax",
      "triangleCounter",
      "lengthCounter",
      "linearCounter",
      "lcLoadValue",
      "sampleValue",
      "tmp"
    ];
  }
};
var channel_triangle_default = ChannelTriangle;

// src/core/papu/index.ts
var CPU_FREQ_NTSC = 17897725e-1;
var FRAME_STEPS_4 = [7457, 14913, 22371, 29828, 29829];
var FRAME_STEPS_5 = [7457, 14913, 22371, 29829, 37281];
var FRAME_PERIOD_4 = 29830;
var FRAME_PERIOD_5 = 37282;
var PAPU = class {
  constructor(nes2) {
    this.nes = nes2;
    this.square1 = new channel_square_default(this, true);
    this.square2 = new channel_square_default(this, false);
    this.triangle = new channel_triangle_default(this);
    this.noise = new channel_noise_default(this);
    this.dmc = new channel_dm_default(this);
    this.startedPlaying = false;
    this.recordOutput = false;
    this.triValue = 0;
    this.prevSampleL = 0;
    this.prevSampleR = 0;
    this.smpAccumL = 0;
    this.smpAccumR = 0;
    this.dacRange = 0;
    this.dcValue = 0;
    this.masterVolume = 256;
    this.panning = [80, 170, 100, 150, 128];
    this.setPanning(this.panning);
    this.initLengthLookup();
    this.initDmcFrequencyLookup();
    this.initNoiseWavelengthLookup();
    this.initDACtables();
    for (let i = 0; i < 20; i++) {
      if (i === 16) {
        this.writeReg(16400, 16);
      } else {
        this.writeReg(16384 + i, 0);
      }
    }
    this.sampleRate = this.nes.opts.sampleRate;
    this.sampleTimerMax = Math.floor(
      1024 * CPU_FREQ_NTSC / this.sampleRate
    );
    this.sampleTimer = 0;
    this.updateChannelEnable(0);
    this.frameCycleCounter = 0;
    this.frameStep = 0;
    this.countSequence = 0;
    this.sampleCount = 0;
    this.frameIrqEnabled = false;
    this.frameIrqActive = false;
    this.frameIrqClearPending = false;
    this.apuCycleParity = 0;
    this.accCount = 0;
    this.smpSquare1 = 0;
    this.smpSquare2 = 0;
    this.smpTriangle = 0;
    this.smpDmc = 0;
    this.channelEnableValue = 255;
    this.extraCycles = 0;
    this.maxSample = -5e5;
    this.minSample = 5e5;
  }
  // eslint-disable-next-line no-unused-vars
  readReg(address) {
    let tmp = 0;
    tmp |= this.square1.getLengthStatus();
    tmp |= this.square2.getLengthStatus() << 1;
    tmp |= this.triangle.getLengthStatus() << 2;
    tmp |= this.noise.getLengthStatus() << 3;
    tmp |= this.dmc.getLengthStatus() << 4;
    tmp |= this.nes.cpu.dataBus & 32;
    tmp |= (this.frameIrqActive ? 1 : 0) << 6;
    tmp |= this.dmc.getIrqStatus() << 7;
    if (this.frameIrqActive) {
      this.frameIrqClearPending = true;
    }
    return tmp & 255;
  }
  writeReg(address, value) {
    if (address >= 16384 && address < 16388) {
      this.square1.writeReg(address, value);
    } else if (address >= 16388 && address < 16392) {
      this.square2.writeReg(address, value);
    } else if (address >= 16392 && address < 16396) {
      this.triangle.writeReg(address, value);
    } else if (address >= 16396 && address <= 16399) {
      this.noise.writeReg(address, value);
    } else if (address === 16400) {
      this.dmc.writeReg(address, value);
    } else if (address === 16401) {
      this.dmc.writeReg(address, value);
    } else if (address === 16402) {
      this.dmc.writeReg(address, value);
    } else if (address === 16403) {
      this.dmc.writeReg(address, value);
    } else if (address === 16405) {
      this.updateChannelEnable(value);
      this.dmc.writeReg(address, value);
    } else if (address === 16407) {
      this.countSequence = value >> 7 & 1;
      let cpu2 = this.nes.cpu;
      let pendingCycles = cpu2.instrBusCycles + 1 - cpu2.apuCatchupCycles;
      let writeParity = this.apuCycleParity + pendingCycles & 1;
      this.frameCycleCounter = -7 + writeParity;
      this.frameStep = 0;
      if (value & 64) {
        this.frameIrqEnabled = false;
        this.frameIrqActive = false;
        this.frameIrqClearPending = false;
      } else {
        this.frameIrqEnabled = true;
      }
      if (this.countSequence === 1) {
        this.clockQuarterFrame();
        this.clockHalfFrame();
      }
    }
  }
  // Updates channel enable status.
  // This is done on writes to the
  // channel enable register (0x4015),
  // and when the user enables/disables channels
  // in the GUI.
  updateChannelEnable(value) {
    this.channelEnableValue = value & 65535;
    this.square1.setEnabled((value & 1) !== 0);
    this.square2.setEnabled((value & 2) !== 0);
    this.triangle.setEnabled((value & 4) !== 0);
    this.noise.setEnabled((value & 8) !== 0);
    this.dmc.setEnabled((value & 16) !== 0);
  }
  // Clocks all APU channel timers and the frame counter by nCycles CPU cycles.
  // Called once per instruction from the frame loop with the total cycle count.
  // frameCounterAlreadyAdvanced is the number of frame counter cycles already
  // advanced mid-instruction by APU catch-up (advanceFrameCounter). This is
  // subtracted from the frame counter portion only, not from channel timers.
  clockFrameCounter(nCycles, frameCounterAlreadyAdvanced) {
    let frameCounterCycles = nCycles - (frameCounterAlreadyAdvanced || 0);
    this.processFrameIrqClear(frameCounterCycles);
    this.apuCycleParity = this.apuCycleParity + frameCounterCycles & 1;
    nCycles += this.extraCycles;
    let maxCycles = this.sampleTimerMax - this.sampleTimer;
    if (nCycles << 10 > maxCycles) {
      this.extraCycles = (nCycles << 10) - maxCycles >> 10;
      nCycles -= this.extraCycles;
    } else {
      this.extraCycles = 0;
    }
    let dmc = this.dmc;
    let triangle = this.triangle;
    let square1 = this.square1;
    let square2 = this.square2;
    let noise = this.noise;
    if (dmc.isEnabled) {
      dmc.shiftCounter -= nCycles << 3;
      while (dmc.shiftCounter <= 0 && dmc.dmaFrequency > 0) {
        dmc.shiftCounter += dmc.dmaFrequency;
        dmc.clockDmc();
      }
    }
    if (triangle.progTimerMax > 0) {
      triangle.progTimerCount -= nCycles;
      while (triangle.progTimerCount <= 0) {
        triangle.progTimerCount += triangle.progTimerMax + 1;
        if (triangle.linearCounter > 0 && triangle.lengthCounter > 0) {
          triangle.triangleCounter++;
          triangle.triangleCounter &= 31;
          if (triangle.isEnabled) {
            if (triangle.triangleCounter >= 16) {
              triangle.sampleValue = triangle.triangleCounter & 15;
            } else {
              triangle.sampleValue = 15 - (triangle.triangleCounter & 15);
            }
            triangle.sampleValue <<= 4;
          }
        }
      }
    }
    square1.progTimerCount -= nCycles;
    if (square1.progTimerCount <= 0) {
      square1.progTimerCount += square1.progTimerMax + 1 << 1;
      square1.squareCounter++;
      square1.squareCounter &= 7;
      square1.updateSampleValue();
    }
    square2.progTimerCount -= nCycles;
    if (square2.progTimerCount <= 0) {
      square2.progTimerCount += square2.progTimerMax + 1 << 1;
      square2.squareCounter++;
      square2.squareCounter &= 7;
      square2.updateSampleValue();
    }
    let acc_c = nCycles;
    if (noise.progTimerCount - acc_c > 0) {
      noise.progTimerCount -= acc_c;
      noise.accCount += acc_c;
      noise.accValue += acc_c * noise.sampleValue;
    } else {
      while (acc_c-- > 0) {
        if (--noise.progTimerCount <= 0 && noise.progTimerMax > 0) {
          noise.shiftReg <<= 1;
          noise.tmp = (noise.shiftReg << (noise.randomMode === 0 ? 1 : 6) ^ noise.shiftReg) & 32768;
          if (noise.tmp !== 0) {
            noise.shiftReg |= 1;
            noise.randomBit = 0;
            noise.sampleValue = 0;
          } else {
            noise.randomBit = 1;
            if (noise.isEnabled && noise.lengthCounter > 0) {
              noise.sampleValue = noise.masterVolume;
            } else {
              noise.sampleValue = 0;
            }
          }
          noise.progTimerCount += noise.progTimerMax;
        }
        noise.accValue += noise.sampleValue;
        noise.accCount++;
      }
    }
    if (this.frameIrqEnabled && this.frameIrqActive) {
      this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL);
    }
    this._advanceFrameSteps(frameCounterCycles);
    this.accSample(nCycles);
    this.sampleTimer += nCycles << 10;
    if (this.sampleTimer >= this.sampleTimerMax) {
      this.sample();
      this.sampleTimer -= this.sampleTimerMax;
    }
  }
  // Process the deferred frame IRQ flag clear. On real hardware, reading
  // $4015 schedules the clear for the next APU "get" cycle (which happens
  // every 2 CPU cycles). If the current APU phase is "put" (parity 0),
  // the next "get" is 1 cycle away. If "get" (parity 1), it's 2 cycles
  // away. This must be called BEFORE updating apuCycleParity for the
  // current advance, so it sees the parity at the start of the period.
  // See https://www.nesdev.org/wiki/APU_Frame_Counter
  processFrameIrqClear(nCycles) {
    if (!this.frameIrqClearPending || nCycles <= 0) return;
    let cyclesToNextGet = (this.apuCycleParity & 1) === 0 ? 1 : 2;
    if (nCycles >= cyclesToNextGet) {
      this.frameIrqActive = false;
      this.frameIrqClearPending = false;
    }
  }
  // Advance only the frame counter steps without clocking channel timers,
  // DMC, or audio sampling. Used by CPU APU catch-up to update frame counter
  // state (length counters, envelopes) before $4015 reads, without disturbing
  // DMC DMA timing or audio generation.
  advanceFrameCounter(nCycles) {
    this.processFrameIrqClear(nCycles);
    this.apuCycleParity = this.apuCycleParity + nCycles & 1;
    this._advanceFrameSteps(nCycles);
  }
  // Advance frame counter steps and handle period wrap. Shared by both
  // clockFrameCounter (full APU tick) and advanceFrameCounter (catch-up only).
  // The step loop and period wrap are separated: steps fire when the counter
  // reaches each step's cycle position, and the period wrap only occurs when
  // the counter reaches the full period length (not immediately after the
  // last step). This matters because in 4-step mode, the last step fires at
  // 29829 but the period wrap (and 3rd IRQ assertion) occurs at 29830.
  // See https://www.nesdev.org/wiki/APU_Frame_Counter
  _advanceFrameSteps(frameCounterCycles) {
    this.frameCycleCounter += frameCounterCycles;
    let steps = this.countSequence === 0 ? FRAME_STEPS_4 : FRAME_STEPS_5;
    let period = this.countSequence === 0 ? FRAME_PERIOD_4 : FRAME_PERIOD_5;
    for (; ; ) {
      if (this.frameStep < steps.length && this.frameCycleCounter >= steps[this.frameStep]) {
        this.fireFrameStep(this.frameStep);
        this.frameStep++;
      } else if (this.frameStep >= steps.length && this.frameCycleCounter >= period) {
        this.frameStep = 0;
        this.frameCycleCounter -= period;
        if (this.countSequence === 0) {
          this.frameIrqActive = this.frameIrqEnabled;
          this.frameIrqClearPending = false;
        }
      } else {
        break;
      }
    }
  }
  accSample(cycles) {
    if (this.triangle.sampleCondition) {
      this.triValue = Math.floor(
        (this.triangle.progTimerCount << 4) / (this.triangle.progTimerMax + 1)
      );
      if (this.triValue > 16) {
        this.triValue = 16;
      }
      if (this.triangle.triangleCounter >= 16) {
        this.triValue = 16 - this.triValue;
      }
      this.triValue += this.triangle.sampleValue;
    }
    if (cycles === 2) {
      this.smpTriangle += this.triValue << 1;
      this.smpDmc += this.dmc.sample << 1;
      this.smpSquare1 += this.square1.sampleValue << 1;
      this.smpSquare2 += this.square2.sampleValue << 1;
      this.accCount += 2;
    } else if (cycles === 4) {
      this.smpTriangle += this.triValue << 2;
      this.smpDmc += this.dmc.sample << 2;
      this.smpSquare1 += this.square1.sampleValue << 2;
      this.smpSquare2 += this.square2.sampleValue << 2;
      this.accCount += 4;
    } else {
      this.smpTriangle += cycles * this.triValue;
      this.smpDmc += cycles * this.dmc.sample;
      this.smpSquare1 += cycles * this.square1.sampleValue;
      this.smpSquare2 += cycles * this.square2.sampleValue;
      this.accCount += cycles;
    }
  }
  // Fire a frame counter step. Each step clocks different APU units depending
  // on the mode and step number.
  // See https://www.nesdev.org/wiki/APU_Frame_Counter
  fireFrameStep(step) {
    if (this.countSequence === 0) {
      switch (step) {
        case 0:
          this.clockQuarterFrame();
          break;
        case 1:
          this.clockQuarterFrame();
          this.clockHalfFrame();
          break;
        case 2:
          this.clockQuarterFrame();
          break;
        case 3:
          this.frameIrqActive = true;
          this.frameIrqClearPending = false;
          break;
        case 4:
          this.clockQuarterFrame();
          this.clockHalfFrame();
          this.frameIrqActive = true;
          this.frameIrqClearPending = false;
          break;
      }
    } else {
      switch (step) {
        case 0:
          this.clockQuarterFrame();
          break;
        case 1:
          this.clockQuarterFrame();
          this.clockHalfFrame();
          break;
        case 2:
          this.clockQuarterFrame();
          break;
        case 3:
          break;
        case 4:
          this.clockQuarterFrame();
          this.clockHalfFrame();
          break;
      }
    }
  }
  // Quarter frame: clock envelopes and triangle linear counter (~240Hz)
  clockQuarterFrame() {
    this.square1.clockEnvDecay();
    this.square2.clockEnvDecay();
    this.noise.clockEnvDecay();
    this.triangle.clockLinearCounter();
  }
  // Half frame: clock length counters and sweep units (~120Hz)
  clockHalfFrame() {
    this.triangle.clockLengthCounter();
    this.square1.clockLengthCounter();
    this.square2.clockLengthCounter();
    this.noise.clockLengthCounter();
    this.square1.clockSweep();
    this.square2.clockSweep();
  }
  // Samples the channels, mixes the output together, then writes to buffer.
  sample() {
    let sq_index, tnd_index;
    if (this.accCount > 0) {
      this.smpSquare1 <<= 4;
      this.smpSquare1 = Math.floor(this.smpSquare1 / this.accCount);
      this.smpSquare2 <<= 4;
      this.smpSquare2 = Math.floor(this.smpSquare2 / this.accCount);
      this.smpTriangle = Math.floor(this.smpTriangle / this.accCount);
      this.smpDmc <<= 4;
      this.smpDmc = Math.floor(this.smpDmc / this.accCount);
      this.accCount = 0;
    } else {
      this.smpSquare1 = this.square1.sampleValue << 4;
      this.smpSquare2 = this.square2.sampleValue << 4;
      this.smpTriangle = this.triangle.sampleValue;
      this.smpDmc = this.dmc.sample << 4;
    }
    let smpNoise = Math.floor((this.noise.accValue << 4) / this.noise.accCount);
    this.noise.accValue = smpNoise >> 4;
    this.noise.accCount = 1;
    sq_index = this.smpSquare1 * this.stereoPosLSquare1 + this.smpSquare2 * this.stereoPosLSquare2 >> 8;
    tnd_index = 3 * this.smpTriangle * this.stereoPosLTriangle + (smpNoise << 1) * this.stereoPosLNoise + this.smpDmc * this.stereoPosLDMC >> 8;
    if (sq_index >= this.square_table.length) {
      sq_index = this.square_table.length - 1;
    }
    if (tnd_index >= this.tnd_table.length) {
      tnd_index = this.tnd_table.length - 1;
    }
    let sampleValueL = this.square_table[sq_index] + this.tnd_table[tnd_index] - this.dcValue;
    sq_index = this.smpSquare1 * this.stereoPosRSquare1 + this.smpSquare2 * this.stereoPosRSquare2 >> 8;
    tnd_index = 3 * this.smpTriangle * this.stereoPosRTriangle + (smpNoise << 1) * this.stereoPosRNoise + this.smpDmc * this.stereoPosRDMC >> 8;
    if (sq_index >= this.square_table.length) {
      sq_index = this.square_table.length - 1;
    }
    if (tnd_index >= this.tnd_table.length) {
      tnd_index = this.tnd_table.length - 1;
    }
    let sampleValueR = this.square_table[sq_index] + this.tnd_table[tnd_index] - this.dcValue;
    let smpDiffL = sampleValueL - this.prevSampleL;
    this.prevSampleL += smpDiffL;
    this.smpAccumL += smpDiffL - (this.smpAccumL >> 10);
    sampleValueL = this.smpAccumL;
    let smpDiffR = sampleValueR - this.prevSampleR;
    this.prevSampleR += smpDiffR;
    this.smpAccumR += smpDiffR - (this.smpAccumR >> 10);
    sampleValueR = this.smpAccumR;
    if (sampleValueL > this.maxSample) {
      this.maxSample = sampleValueL;
    }
    if (sampleValueL < this.minSample) {
      this.minSample = sampleValueL;
    }
    if (this.nes.opts.onAudioSample) {
      this.nes.opts.onAudioSample(sampleValueL / 32768, sampleValueR / 32768);
    }
    this.smpSquare1 = 0;
    this.smpSquare2 = 0;
    this.smpTriangle = 0;
    this.smpDmc = 0;
  }
  getLengthMax(value) {
    return this.lengthLookup[value >> 3];
  }
  getDmcFrequency(value) {
    if (value >= 0 && value < 16) {
      return this.dmcFreqLookup[value];
    }
    return 0;
  }
  getNoiseWaveLength(value) {
    if (value >= 0 && value < 16) {
      return this.noiseWavelengthLookup[value];
    }
    return 0;
  }
  // Recalculate the sample timer for a non-standard host frame rate.
  // At 60fps the timer fires once per (CPU_FREQ / sampleRate) cycles. If the
  // host calls frame() at a different rate, scale proportionally so the total
  // audio output per second stays constant.
  setFrameRate(rate) {
    this.sampleTimerMax = Math.floor(
      1024 * CPU_FREQ_NTSC * rate / (this.sampleRate * 60)
    );
  }
  setPanning(pos) {
    for (let i = 0; i < 5; i++) {
      this.panning[i] = pos[i];
    }
    this.updateStereoPos();
  }
  setMasterVolume(value) {
    if (value < 0) {
      value = 0;
    }
    if (value > 256) {
      value = 256;
    }
    this.masterVolume = value;
    this.updateStereoPos();
  }
  updateStereoPos() {
    this.stereoPosLSquare1 = this.panning[0] * this.masterVolume >> 8;
    this.stereoPosLSquare2 = this.panning[1] * this.masterVolume >> 8;
    this.stereoPosLTriangle = this.panning[2] * this.masterVolume >> 8;
    this.stereoPosLNoise = this.panning[3] * this.masterVolume >> 8;
    this.stereoPosLDMC = this.panning[4] * this.masterVolume >> 8;
    this.stereoPosRSquare1 = this.masterVolume - this.stereoPosLSquare1;
    this.stereoPosRSquare2 = this.masterVolume - this.stereoPosLSquare2;
    this.stereoPosRTriangle = this.masterVolume - this.stereoPosLTriangle;
    this.stereoPosRNoise = this.masterVolume - this.stereoPosLNoise;
    this.stereoPosRDMC = this.masterVolume - this.stereoPosLDMC;
  }
  initLengthLookup() {
    this.lengthLookup = [
      10,
      254,
      20,
      2,
      40,
      4,
      80,
      6,
      160,
      8,
      60,
      10,
      14,
      12,
      26,
      14,
      12,
      16,
      24,
      18,
      48,
      20,
      96,
      22,
      192,
      24,
      72,
      26,
      16,
      28,
      32,
      30
    ];
  }
  initDmcFrequencyLookup() {
    this.dmcFreqLookup = new Array(16);
    this.dmcFreqLookup[0] = 3424;
    this.dmcFreqLookup[1] = 3040;
    this.dmcFreqLookup[2] = 2720;
    this.dmcFreqLookup[3] = 2560;
    this.dmcFreqLookup[4] = 2288;
    this.dmcFreqLookup[5] = 2032;
    this.dmcFreqLookup[6] = 1808;
    this.dmcFreqLookup[7] = 1712;
    this.dmcFreqLookup[8] = 1520;
    this.dmcFreqLookup[9] = 1280;
    this.dmcFreqLookup[10] = 1136;
    this.dmcFreqLookup[11] = 1024;
    this.dmcFreqLookup[12] = 848;
    this.dmcFreqLookup[13] = 672;
    this.dmcFreqLookup[14] = 576;
    this.dmcFreqLookup[15] = 432;
  }
  initNoiseWavelengthLookup() {
    this.noiseWavelengthLookup = new Array(16);
    this.noiseWavelengthLookup[0] = 4;
    this.noiseWavelengthLookup[1] = 8;
    this.noiseWavelengthLookup[2] = 16;
    this.noiseWavelengthLookup[3] = 32;
    this.noiseWavelengthLookup[4] = 64;
    this.noiseWavelengthLookup[5] = 96;
    this.noiseWavelengthLookup[6] = 128;
    this.noiseWavelengthLookup[7] = 160;
    this.noiseWavelengthLookup[8] = 202;
    this.noiseWavelengthLookup[9] = 254;
    this.noiseWavelengthLookup[10] = 380;
    this.noiseWavelengthLookup[11] = 508;
    this.noiseWavelengthLookup[12] = 762;
    this.noiseWavelengthLookup[13] = 1016;
    this.noiseWavelengthLookup[14] = 2034;
    this.noiseWavelengthLookup[15] = 4068;
  }
  initDACtables() {
    let value, ival, i;
    let max_sqr = 0;
    let max_tnd = 0;
    this.square_table = new Array(32 * 16);
    this.tnd_table = new Array(204 * 16);
    for (i = 0; i < 32 * 16; i++) {
      value = 95.52 / (8128 / (i / 16) + 100);
      value *= 0.98411;
      value *= 5e4;
      ival = Math.floor(value);
      this.square_table[i] = ival;
      if (ival > max_sqr) {
        max_sqr = ival;
      }
    }
    for (i = 0; i < 204 * 16; i++) {
      value = 163.67 / (24329 / (i / 16) + 100);
      value *= 0.98411;
      value *= 5e4;
      ival = Math.floor(value);
      this.tnd_table[i] = ival;
      if (ival > max_tnd) {
        max_tnd = ival;
      }
    }
    this.dacRange = max_sqr + max_tnd;
    this.dcValue = this.dacRange / 2;
  }
  toJSON() {
    let obj = toJSON(this);
    obj.dmc = this.dmc.toJSON();
    obj.noise = this.noise.toJSON();
    obj.square1 = this.square1.toJSON();
    obj.square2 = this.square2.toJSON();
    obj.triangle = this.triangle.toJSON();
    return obj;
  }
  fromJSON(s) {
    fromJSON(this, s);
    this.dmc.fromJSON(s.dmc);
    this.noise.fromJSON(s.noise);
    this.square1.fromJSON(s.square1);
    this.square2.fromJSON(s.square2);
    this.triangle.fromJSON(s.triangle);
  }
  static {
    this.JSON_PROPERTIES = [
      "channelEnableValue",
      "sampleRate",
      "frameIrqEnabled",
      "frameIrqActive",
      "frameIrqClearPending",
      "apuCycleParity",
      "startedPlaying",
      "recordOutput",
      "frameCycleCounter",
      "frameStep",
      "countSequence",
      "sampleTimer",
      "sampleTimerMax",
      "sampleCount",
      "triValue",
      "smpSquare1",
      "smpSquare2",
      "smpTriangle",
      "smpDmc",
      "accCount",
      "prevSampleL",
      "prevSampleR",
      "smpAccumL",
      "smpAccumR",
      "masterVolume",
      "stereoPosLSquare1",
      "stereoPosLSquare2",
      "stereoPosLTriangle",
      "stereoPosLNoise",
      "stereoPosLDMC",
      "stereoPosRSquare1",
      "stereoPosRSquare2",
      "stereoPosRTriangle",
      "stereoPosRNoise",
      "stereoPosRDMC",
      "extraCycles",
      "maxSample",
      "minSample",
      "panning"
    ];
  }
};
var papu_default = PAPU;

// src/core/gamegenie.ts
var LETTER_VALUES = "APZLGITYEOXUKSVN";
function toDigit(letter) {
  return LETTER_VALUES.indexOf(letter);
}
function toLetter(digit) {
  return LETTER_VALUES[digit];
}
function toHex(n, width) {
  const s = n.toString(16);
  return "0000".substring(0, width - s.length) + s;
}
var GameGenie = class {
  constructor() {
    this.patches = [];
    this.enabled = true;
    this.onChange = null;
  }
  setEnabled(enabled) {
    this.enabled = enabled;
    if (this.onChange) this.onChange();
  }
  addCode(code) {
    const patch = this.decode(code);
    if (!patch) {
      throw new Error(`Invalid Game Genie code: ${code}`);
    }
    this.patches.push(patch);
    if (this.onChange) this.onChange();
  }
  addPatch(addr, value, key) {
    this.patches.push({ addr, value, wantskey: key !== void 0, key });
    if (this.onChange) this.onChange();
  }
  removeAllCodes() {
    this.patches = [];
    if (this.onChange) this.onChange();
  }
  // Apply Game Genie patches to a value being read from the given address.
  // Game Genie works by intercepting ROM reads and substituting values.
  // The address is masked to 15 bits because Game Genie ignores the
  // highest bit (ROM is mirrored in $8000-$FFFF).
  applyCodes(addr, value) {
    if (!this.enabled) return value;
    for (let i = 0; i < this.patches.length; ++i) {
      if (this.patches[i].addr === (addr & 32767)) {
        if (this.patches[i].key === void 0 || this.patches[i].key === value) {
          return this.patches[i].value;
        }
      }
    }
    return value;
  }
  decode(code) {
    if (code.includes(":")) return this.decodeHex(code);
    const digits = code.toUpperCase().split("").map(toDigit);
    let value = ((digits[0] & 8) << 4) + ((digits[1] & 7) << 4) + (digits[0] & 7);
    const addr = ((digits[3] & 7) << 12) + ((digits[4] & 8) << 8) + ((digits[5] & 7) << 8) + ((digits[1] & 8) << 4) + ((digits[2] & 7) << 4) + (digits[3] & 8) + (digits[4] & 7);
    let key;
    if (digits.length === 8) {
      value += digits[7] & 8;
      key = ((digits[6] & 8) << 4) + ((digits[7] & 7) << 4) + (digits[5] & 8) + (digits[6] & 7);
    } else {
      value += digits[5] & 8;
    }
    const wantskey = !!(digits[2] >> 3);
    return { value, addr, wantskey, key };
  }
  encodeHex(addr, value, key, wantskey) {
    let s = toHex(addr, 4) + ":" + toHex(value, 2);
    if (key !== void 0 || wantskey) {
      s += "?";
    }
    if (key !== void 0) {
      s += toHex(key, 2);
    }
    return s;
  }
  decodeHex(s) {
    const match = s.match(/([0-9a-fA-F]+):([0-9a-fA-F]+)(\?[0-9a-fA-F]*)?/);
    if (!match) return null;
    const addr = parseInt(match[1], 16);
    const value = parseInt(match[2], 16);
    const wantskey = match[3] !== void 0;
    const key = match[3] !== void 0 && match[3].length > 1 ? parseInt(match[3].substring(1), 16) : void 0;
    return { value, addr, wantskey, key };
  }
  encode(addr, value, key, wantskey) {
    const digits = Array(6);
    digits[0] = (value & 7) + (value >> 4 & 8);
    digits[1] = (value >> 4 & 7) + (addr >> 4 & 8);
    digits[2] = addr >> 4 & 7;
    digits[3] = (addr >> 12) + (addr & 8);
    digits[4] = (addr & 7) + (addr >> 8 & 8);
    digits[5] = addr >> 8 & 7;
    if (key === void 0) {
      digits[5] += value & 8;
      if (wantskey) digits[2] += 8;
    } else {
      digits[2] += 8;
      digits[5] += key & 8;
      digits[6] = (key & 7) + (key >> 4 & 8);
      digits[7] = (key >> 4 & 7) + (value & 8);
    }
    const code = digits.map(toLetter).join("");
    return code;
  }
};
var gamegenie_default = GameGenie;

// src/core/mappers/mapper0.ts
var Mapper0 = class {
  static {
    this.mapperName = "NROM";
  }
  constructor(nes2) {
    this.nes = nes2;
    this.joy1StrobeState = 0;
    this.joy2StrobeState = 0;
    this.joypadLastWrite = 0;
    this.joypadOutputBit0 = 0;
    this.joypadLastWriteCycle = -2;
    this.zapperFired = false;
    this.zapperX = null;
    this.zapperY = null;
    this.bgTileOverride = false;
  }
  write(address, value) {
    if (address < 8192) {
      this.nes.cpu.mem[address & 2047] = value;
    } else if (address >= 32768) {
    } else if (address >= 24576) {
      this.nes.cpu.mem[address] = value;
      this.nes.opts.onBatteryRamWrite(address, value);
    } else if (address > 16407) {
      this.nes.cpu.mem[address] = value;
    } else if (address > 8199 && address < 16384) {
      this.regWrite(8192 + (address & 7), value);
    } else {
      this.regWrite(address, value);
    }
  }
  writelow(address, value) {
    if (address < 8192) {
      this.nes.cpu.mem[address & 2047] = value;
    } else if (address >= 32768) {
    } else if (address > 16407) {
      this.nes.cpu.mem[address] = value;
    } else if (address > 8199 && address < 16384) {
      this.regWrite(8192 + (address & 7), value);
    } else {
      this.regWrite(address, value);
    }
  }
  load(address) {
    address &= 65535;
    if (address > 16407) {
      if (address < 24576) {
        return this.nes.cpu.dataBus;
      }
      return this.nes.cpu.mem[address];
    } else if (address >= 8192) {
      return this.regLoad(address);
    } else {
      return this.nes.cpu.mem[address & 2047];
    }
  }
  regLoad(address) {
    switch (address >> 12) {
      case 0:
        break;
      case 1:
        break;
      case 2:
      case 3:
        switch (address & 7) {
          case 0:
            return this.nes.ppu.openBusLatch;
          case 1:
            return this.nes.ppu.openBusLatch;
          case 2:
            return this.nes.ppu.readStatusRegister();
          case 3:
            return this.nes.ppu.openBusLatch;
          case 4:
            return this.nes.ppu.sramLoad();
          case 5:
            return this.nes.ppu.openBusLatch;
          case 6:
            return this.nes.ppu.openBusLatch;
          case 7:
            return this.nes.ppu.vramLoad();
        }
        break;
      case 4:
        switch (address - 16405) {
          case 0:
            return this.nes.papu.readReg(address);
          case 1:
            return this.joy1Read() & 31 | this.nes.cpu.dataBus & 224;
          case 2: {
            let w = 0;
            if (this.zapperX !== null && this.zapperY !== null) {
              if (!this.nes.ppu.isPixelWhite(this.zapperX, this.zapperY)) {
                w = 1 << 3;
              }
            }
            if (this.zapperFired) {
              w |= 1 << 4;
            }
            return (this.joy2Read() | w) & 31 | this.nes.cpu.dataBus & 224;
          }
        }
        break;
    }
    let cpu2 = this.nes.cpu;
    if (cpu2._dmcFetchCycles > 0 && cpu2._dmcFetchCycles === cpu2.instrBusCycles + 1) {
      let dmc = this.nes.papu.dmc;
      if (dmc && dmc.isEnabled) {
        return dmc.lastFetchedByte;
      }
    }
    return cpu2.dataBus;
  }
  regWrite(address, value) {
    if (address >= 8192 && address <= 16383) {
      this.nes.ppu.openBusLatch = value;
      this.nes.ppu.openBusDecayFrames = 36;
    }
    switch (address) {
      case 8192:
        this.nes.cpu.mem[address] = value;
        this.nes.ppu.updateControlReg1(value);
        break;
      case 8193:
        this.nes.cpu.mem[address] = value;
        this.nes.ppu.updateControlReg2(value);
        break;
      case 8195:
        this.nes.ppu.writeSRAMAddress(value);
        break;
      case 8196:
        this.nes.ppu.sramWrite(value);
        break;
      case 8197:
        this.nes.ppu.scrollWrite(value);
        break;
      case 8198:
        this.nes.ppu.writeVRAMAddress(value);
        break;
      case 8199:
        this.nes.ppu.vramWrite(value);
        break;
      case 16404:
        this.nes.ppu.sramDMA(value);
        break;
      case 16405:
        this.nes.papu.writeReg(address, value);
        break;
      case 16406: {
        let cpu2 = this.nes.cpu;
        let currentCycle = cpu2._cpuCycleBase + cpu2.instrBusCycles;
        if (currentCycle - this.joypadLastWriteCycle > 1) {
          let prevBit = this.joypadLastWrite & 1;
          if (prevBit !== this.joypadOutputBit0) {
            if (this.joypadOutputBit0 === 1 && prevBit === 0) {
              this.joy1StrobeState = 0;
              this.joy2StrobeState = 0;
            }
            this.joypadOutputBit0 = prevBit;
          }
        }
        this.joypadLastWrite = value;
        this.joypadLastWriteCycle = currentCycle;
        if (currentCycle % 2 === 1) {
          let newBit = value & 1;
          if (this.joypadOutputBit0 === 1 && newBit === 0) {
            this.joy1StrobeState = 0;
            this.joy2StrobeState = 0;
          }
          this.joypadOutputBit0 = newBit;
        }
        break;
      }
      case 16407:
        this.nes.papu.writeReg(address, value);
        break;
      default:
        if (address >= 16384 && address <= 16407) {
          this.nes.papu.writeReg(address, value);
        }
    }
  }
  _syncJoypadOutput() {
    let newBit = this.joypadLastWrite & 1;
    if (newBit !== this.joypadOutputBit0) {
      if (this.joypadOutputBit0 === 1 && newBit === 0) {
        this.joy1StrobeState = 0;
        this.joy2StrobeState = 0;
      }
      this.joypadOutputBit0 = newBit;
    }
  }
  joy1Read() {
    this._syncJoypadOutput();
    if (this.joypadOutputBit0) {
      return this.nes.controllers[1].state[0];
    }
    let ret;
    if (this.joy1StrobeState < 8) {
      ret = this.nes.controllers[1].state[this.joy1StrobeState];
    } else {
      ret = 1;
    }
    this.joy1StrobeState++;
    if (this.joy1StrobeState === 24) {
      this.joy1StrobeState = 0;
    }
    return ret;
  }
  joy2Read() {
    this._syncJoypadOutput();
    if (this.joypadOutputBit0) {
      return this.nes.controllers[2].state[0];
    }
    let ret;
    if (this.joy2StrobeState < 8) {
      ret = this.nes.controllers[2].state[this.joy2StrobeState];
    } else {
      ret = 1;
    }
    this.joy2StrobeState++;
    if (this.joy2StrobeState === 24) {
      this.joy2StrobeState = 0;
    }
    return ret;
  }
  loadROM() {
    if (!this.nes.rom.valid || this.nes.rom.romCount < 1) {
      throw new Error("NoMapper: Invalid ROM! Unable to load.");
    }
    this.loadPRGROM();
    this.loadCHRROM();
    this.loadBatteryRam();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
  loadPRGROM() {
    if (this.nes.rom.romCount > 1) {
      this.loadRomBank(0, 32768);
      this.loadRomBank(1, 49152);
    } else {
      this.loadRomBank(0, 32768);
      this.loadRomBank(0, 49152);
    }
  }
  loadCHRROM() {
    if (this.nes.rom.vromCount > 0) {
      if (this.nes.rom.vromCount === 1) {
        this.loadVromBank(0, 0);
        this.loadVromBank(0, 4096);
      } else {
        this.loadVromBank(0, 0);
        this.loadVromBank(1, 4096);
      }
    }
  }
  loadBatteryRam() {
    if (this.nes.rom.batteryRam) {
      let ram = this.nes.rom.batteryRam;
      if (ram !== null && ram.length === 8192) {
        copyArrayElements(ram, 0, this.nes.cpu.mem, 24576, 8192);
      }
    }
  }
  loadRomBank(bank, address) {
    bank %= this.nes.rom.romCount;
    copyArrayElements(
      this.nes.rom.rom[bank],
      0,
      this.nes.cpu.mem,
      address,
      16384
    );
  }
  loadVromBank(bank, address) {
    if (this.nes.rom.vromCount === 0) {
      return;
    }
    this.nes.ppu.triggerRendering();
    copyArrayElements(
      this.nes.rom.vrom[bank % this.nes.rom.vromCount],
      0,
      this.nes.ppu.vramMem,
      address,
      4096
    );
    let vromTile = this.nes.rom.vromTile[bank % this.nes.rom.vromCount];
    copyArrayElements(vromTile, 0, this.nes.ppu.ptTile, address >> 4, 256);
  }
  load32kRomBank(bank, address) {
    this.loadRomBank(bank * 2 % this.nes.rom.romCount, address);
    this.loadRomBank((bank * 2 + 1) % this.nes.rom.romCount, address + 16384);
  }
  load8kVromBank(bank4kStart, address) {
    if (this.nes.rom.vromCount === 0) {
      return;
    }
    this.nes.ppu.triggerRendering();
    this.loadVromBank(bank4kStart % this.nes.rom.vromCount, address);
    this.loadVromBank(
      (bank4kStart + 1) % this.nes.rom.vromCount,
      address + 4096
    );
  }
  load1kVromBank(bank1k, address) {
    if (this.nes.rom.vromCount === 0) {
      return;
    }
    this.nes.ppu.triggerRendering();
    try {
      const { pushChrSwitch: pushChrSwitch2 } = (init_pattern_table_viewer(), __toCommonJS(pattern_table_viewer_exports));
      const slot = address >> 10 & 7;
      pushChrSwitch2({ scanline: this.nes.ppu.scanline, slot, bank1k: bank1k & 255 });
    } catch (_) {
    }
    let bank4k = Math.floor(bank1k / 4) % this.nes.rom.vromCount;
    let bankoffset = bank1k % 4 * 1024;
    copyArrayElements(
      this.nes.rom.vrom[bank4k],
      bankoffset,
      this.nes.ppu.vramMem,
      address,
      1024
    );
    let vromTile = this.nes.rom.vromTile[bank4k];
    let baseIndex = address >> 4;
    for (let i = 0; i < 64; i++) {
      this.nes.ppu.ptTile[baseIndex + i] = vromTile[(bank1k % 4 << 6) + i];
    }
  }
  load2kVromBank(bank2k, address) {
    if (this.nes.rom.vromCount === 0) {
      return;
    }
    this.nes.ppu.triggerRendering();
    let bank4k = Math.floor(bank2k / 2) % this.nes.rom.vromCount;
    let bankoffset = bank2k % 2 * 2048;
    copyArrayElements(
      this.nes.rom.vrom[bank4k],
      bankoffset,
      this.nes.ppu.vramMem,
      address,
      2048
    );
    let vromTile = this.nes.rom.vromTile[bank4k];
    let baseIndex = address >> 4;
    for (let i = 0; i < 128; i++) {
      this.nes.ppu.ptTile[baseIndex + i] = vromTile[(bank2k % 2 << 7) + i];
    }
  }
  load8kRomBank(bank8k, address) {
    const rom2 = this.nes.rom.rom;
    const count = this.nes.rom.romCount;
    if (rom2[0] && rom2[0].length === 8192) {
      const idx = bank8k % count;
      copyArrayElements(rom2[idx], 0, this.nes.cpu.mem, address, 8192);
    } else {
      const bank16k = Math.floor(bank8k / 2) % count;
      const offset = bank8k % 2 * 8192;
      copyArrayElements(rom2[bank16k], offset, this.nes.cpu.mem, address, 8192);
    }
  }
  canWriteChr(_address) {
    return this.nes.rom.vromCount === 0;
  }
  clockIrqCounter() {
  }
  latchAccess(_address) {
  }
  onBgRender() {
  }
  onSpriteRender() {
  }
  getBgTileData(_baseTile, _tileIndex, _ht, _vt) {
    return null;
  }
  getSpritePatternTile(index) {
    return this.nes.ppu.ptTile[index];
  }
  /** 返回 8 個 PPU 1KB 槽位到 CHR 1KB bank 的映射，null 表示無動態 CHR */
  getChrBankMap() {
    return null;
  }
  toJSON() {
    return {
      joy1StrobeState: this.joy1StrobeState,
      joy2StrobeState: this.joy2StrobeState,
      joypadLastWrite: this.joypadLastWrite,
      joypadOutputBit0: this.joypadOutputBit0,
      joypadLastWriteCycle: this.joypadLastWriteCycle
    };
  }
  fromJSON(s) {
    this.joy1StrobeState = s.joy1StrobeState;
    this.joy2StrobeState = s.joy2StrobeState;
    this.joypadLastWrite = s.joypadLastWrite;
    this.joypadOutputBit0 = s.joypadOutputBit0 || 0;
    this.joypadLastWriteCycle = s.joypadLastWriteCycle ?? -2;
  }
};
var mapper0_default = Mapper0;

// src/core/mappers/mapper1.ts
var Mapper1 = class extends mapper0_default {
  constructor(nes2) {
    super(nes2);
    /** 當前映射到 PPU $0000-$0FFF 的 4KB CHR bank 編號 */
    this.chrBank4k_0000 = 0;
    /** 當前映射到 PPU $1000-$1FFF 的 4KB CHR bank 編號 */
    this.chrBank4k_1000 = 1;
    this.regBuffer = 0;
    this.regBufferCounter = 0;
    this.mirroring = 0;
    this.oneScreenMirroring = 0;
    this.prgSwitchingArea = 1;
    this.prgSwitchingSize = 1;
    this.vromSwitchingSize = 0;
    this.romSelectionReg0 = 0;
    this.romSelectionReg1 = 0;
    this.romBankSelect = 0;
  }
  static {
    this.mapperName = "MMC1";
  }
  write(address, value) {
    if (address < 32768) {
      super.write(address, value);
      return;
    }
    if ((value & 128) !== 0) {
      this.regBufferCounter = 0;
      this.regBuffer = 0;
      if (this.getRegNumber(address) === 0) {
        this.prgSwitchingArea = 1;
        this.prgSwitchingSize = 1;
      }
    } else {
      this.regBuffer = this.regBuffer & 255 - (1 << this.regBufferCounter) | (value & 1) << this.regBufferCounter;
      this.regBufferCounter++;
      if (this.regBufferCounter === 5) {
        this.setReg(this.getRegNumber(address), this.regBuffer);
        this.regBuffer = 0;
        this.regBufferCounter = 0;
      }
    }
  }
  setReg(reg, value) {
    let tmp;
    switch (reg) {
      case 0:
        tmp = value & 3;
        if (tmp !== this.mirroring) {
          this.mirroring = tmp;
          if ((this.mirroring & 2) === 0) {
            this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING);
          } else if ((this.mirroring & 1) !== 0) {
            this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING);
          } else {
            this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING);
          }
        }
        this.prgSwitchingArea = value >> 2 & 1;
        this.prgSwitchingSize = value >> 3 & 1;
        this.vromSwitchingSize = value >> 4 & 1;
        break;
      case 1:
        this.romSelectionReg0 = value >> 4 & 1;
        if (this.nes.rom.vromCount > 0) {
          const vromCount = this.nes.rom.vromCount;
          const baseBank = this.romSelectionReg0 === 0 ? 0 : Math.floor(vromCount / 2);
          const bank = baseBank + (value & 15);
          if (this.vromSwitchingSize === 0) {
            this.load8kVromBank(bank, 0);
            this.chrBank4k_0000 = bank % vromCount;
            this.chrBank4k_1000 = (bank + 1) % vromCount;
          } else {
            this.loadVromBank(bank, 0);
            this.chrBank4k_0000 = bank % vromCount;
          }
        }
        break;
      case 2:
        this.romSelectionReg1 = value >> 4 & 1;
        if (this.nes.rom.vromCount > 0) {
          if (this.vromSwitchingSize === 1) {
            const vromCount = this.nes.rom.vromCount;
            const baseBank = this.romSelectionReg1 === 0 ? 0 : Math.floor(vromCount / 2);
            const bank = baseBank + (value & 15);
            this.loadVromBank(bank, 4096);
            this.chrBank4k_1000 = bank % vromCount;
          }
        }
        break;
      default: {
        let bank;
        let baseBank = 0;
        if (this.nes.rom.romCount >= 32) {
          if (this.vromSwitchingSize === 0) {
            if (this.romSelectionReg0 === 1) {
              baseBank = 16;
            }
          } else {
            baseBank = (this.romSelectionReg0 | this.romSelectionReg1 << 1) << 3;
          }
        } else if (this.nes.rom.romCount >= 16) {
          if (this.romSelectionReg0 === 1) {
            baseBank = 8;
          }
        }
        if (this.prgSwitchingSize === 0) {
          bank = baseBank + (value & 15);
          this.load32kRomBank(bank, 32768);
        } else {
          bank = baseBank * 2 + (value & 15);
          if (this.prgSwitchingArea === 0) {
            this.loadRomBank(bank, 49152);
          } else {
            this.loadRomBank(bank, 32768);
          }
        }
      }
    }
  }
  getRegNumber(address) {
    if (address >= 32768 && address <= 40959) {
      return 0;
    } else if (address >= 40960 && address <= 49151) {
      return 1;
    } else if (address >= 49152 && address <= 57343) {
      return 2;
    } else {
      return 3;
    }
  }
  loadROM() {
    if (!this.nes.rom.valid) {
      throw new Error("MMC1: Invalid ROM! Unable to load.");
    }
    this.loadRomBank(0, 32768);
    this.loadRomBank(this.nes.rom.romCount - 1, 49152);
    this.loadCHRROM();
    this.loadBatteryRam();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
  switchLowHighPrgRom(_oldSetting) {
  }
  switch16to32() {
  }
  switch32to16() {
  }
  toJSON() {
    let s = super.toJSON();
    s.mirroring = this.mirroring;
    s.oneScreenMirroring = this.oneScreenMirroring;
    s.prgSwitchingArea = this.prgSwitchingArea;
    s.prgSwitchingSize = this.prgSwitchingSize;
    s.vromSwitchingSize = this.vromSwitchingSize;
    s.romSelectionReg0 = this.romSelectionReg0;
    s.romSelectionReg1 = this.romSelectionReg1;
    s.romBankSelect = this.romBankSelect;
    s.regBuffer = this.regBuffer;
    s.regBufferCounter = this.regBufferCounter;
    s.chrBank4k_0000 = this.chrBank4k_0000;
    s.chrBank4k_1000 = this.chrBank4k_1000;
    return s;
  }
  fromJSON(s) {
    super.fromJSON(s);
    this.mirroring = s.mirroring;
    this.oneScreenMirroring = s.oneScreenMirroring;
    this.prgSwitchingArea = s.prgSwitchingArea;
    this.prgSwitchingSize = s.prgSwitchingSize;
    this.vromSwitchingSize = s.vromSwitchingSize;
    this.romSelectionReg0 = s.romSelectionReg0;
    this.romSelectionReg1 = s.romSelectionReg1;
    this.romBankSelect = s.romBankSelect;
    this.regBuffer = s.regBuffer;
    this.regBufferCounter = s.regBufferCounter;
    this.chrBank4k_0000 = s.chrBank4k_0000 ?? 0;
    this.chrBank4k_1000 = s.chrBank4k_1000 ?? 1;
  }
};
var mapper1_default = Mapper1;

// src/core/mappers/mapper2.ts
var Mapper2 = class extends mapper0_default {
  static {
    this.mapperName = "UxROM";
  }
  constructor(nes2) {
    super(nes2);
  }
  write(address, value) {
    if (address < 32768) {
      super.write(address, value);
      return;
    } else {
      this.loadRomBank(value, 32768);
    }
  }
  loadROM() {
    if (!this.nes.rom.valid) {
      throw new Error("UNROM: Invalid ROM! Unable to load.");
    }
    this.loadRomBank(0, 32768);
    this.loadRomBank(this.nes.rom.romCount - 1, 49152);
    this.loadCHRROM();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
};
var mapper2_default = Mapper2;

// src/core/mappers/mapper3.ts
var Mapper3 = class extends mapper0_default {
  static {
    this.mapperName = "CNROM";
  }
  constructor(nes2) {
    super(nes2);
  }
  write(address, value) {
    if (address < 32768) {
      super.write(address, value);
      return;
    } else {
      this.load8kVromBank(value * 2, 0);
    }
  }
};
var mapper3_default = Mapper3;

// src/core/mappers/mapper4.ts
var Mapper4 = class _Mapper4 extends mapper0_default {
  static {
    this.mapperName = "MMC3";
  }
  static {
    this.CMD_SEL_2_1K_VROM_0000 = 0;
  }
  static {
    this.CMD_SEL_2_1K_VROM_0800 = 1;
  }
  static {
    this.CMD_SEL_1K_VROM_1000 = 2;
  }
  static {
    this.CMD_SEL_1K_VROM_1400 = 3;
  }
  static {
    this.CMD_SEL_1K_VROM_1800 = 4;
  }
  static {
    this.CMD_SEL_1K_VROM_1C00 = 5;
  }
  static {
    this.CMD_SEL_ROM_PAGE1 = 6;
  }
  static {
    this.CMD_SEL_ROM_PAGE2 = 7;
  }
  static {
    /** bank 的索引對應 PPU 地址:
     *  [0]=$0000 [1]=$0400 [2]=$0800 [3]=$0C00
     *  [4]=$1000 [5]=$1400 [6]=$1800 [7]=$1C00 */
    this.PPU_ADDR_TO_SLOT = [0, 1, 2, 3, 4, 5, 6, 7];
  }
  constructor(nes2) {
    super(nes2);
    this.command = 0;
    this.prgAddressSelect = 0;
    this.chrAddressSelect = 0;
    this.pageNumber = 0;
    this.irqCounter = 0;
    this.irqLatchValue = 0;
    this.irqEnable = 0;
    this.prgAddressChanged = false;
    this.chrBanks = new Uint8Array(8);
    this.prgBankMap = { 32768: 0, 40960: 1, 49152: 30, 57344: 31 };
  }
  write(address, value) {
    if (address < 32768) {
      super.write(address, value);
      return;
    }
    switch (address & 57345) {
      case 32768: {
        this.command = value & 7;
        const tmp = value >> 6 & 1;
        if (tmp !== this.prgAddressSelect) {
          this.prgAddressChanged = true;
        }
        this.prgAddressSelect = tmp;
        this.chrAddressSelect = value >> 7 & 1;
        break;
      }
      case 32769:
        this.executeCommand(this.command, value);
        break;
      case 40960:
        if ((value & 1) !== 0) {
          this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING);
        } else {
          this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING);
        }
        break;
      case 40961:
        break;
      case 49152:
        this.irqCounter = value;
        break;
      case 49153:
        this.irqLatchValue = value;
        break;
      case 57344:
        this.irqEnable = 0;
        break;
      case 57345:
        this.irqEnable = 1;
        break;
    }
  }
  executeCommand(cmd, arg) {
    switch (cmd) {
      case _Mapper4.CMD_SEL_2_1K_VROM_0000:
        if (this.chrAddressSelect === 0) {
          this.chrBanks[0] = arg;
          this.chrBanks[1] = arg + 1;
          this.load1kVromBank(arg, 0);
          this.load1kVromBank(arg + 1, 1024);
        } else {
          this.chrBanks[4] = arg;
          this.chrBanks[5] = arg + 1;
          this.load1kVromBank(arg, 4096);
          this.load1kVromBank(arg + 1, 5120);
        }
        break;
      case _Mapper4.CMD_SEL_2_1K_VROM_0800:
        if (this.chrAddressSelect === 0) {
          this.chrBanks[2] = arg;
          this.chrBanks[3] = arg + 1;
          this.load1kVromBank(arg, 2048);
          this.load1kVromBank(arg + 1, 3072);
        } else {
          this.chrBanks[6] = arg;
          this.chrBanks[7] = arg + 1;
          this.load1kVromBank(arg, 6144);
          this.load1kVromBank(arg + 1, 7168);
        }
        break;
      case _Mapper4.CMD_SEL_1K_VROM_1000:
        if (this.chrAddressSelect === 0) {
          this.chrBanks[4] = arg;
          this.load1kVromBank(arg, 4096);
        } else {
          this.chrBanks[0] = arg;
          this.load1kVromBank(arg, 0);
        }
        break;
      case _Mapper4.CMD_SEL_1K_VROM_1400:
        if (this.chrAddressSelect === 0) {
          this.chrBanks[5] = arg;
          this.load1kVromBank(arg, 5120);
        } else {
          this.chrBanks[1] = arg;
          this.load1kVromBank(arg, 1024);
        }
        break;
      case _Mapper4.CMD_SEL_1K_VROM_1800:
        if (this.chrAddressSelect === 0) {
          this.chrBanks[6] = arg;
          this.load1kVromBank(arg, 6144);
        } else {
          this.chrBanks[2] = arg;
          this.load1kVromBank(arg, 2048);
        }
        break;
      case _Mapper4.CMD_SEL_1K_VROM_1C00:
        if (this.chrAddressSelect === 0) {
          this.chrBanks[7] = arg;
          this.load1kVromBank(arg, 7168);
        } else {
          this.chrBanks[3] = arg;
          this.load1kVromBank(arg, 3072);
        }
        break;
      case _Mapper4.CMD_SEL_ROM_PAGE1:
        if (this.prgAddressChanged) {
          const fixedBank = (this.nes.rom.romCount - 1) * 2;
          if (this.prgAddressSelect === 0) {
            this.load8kRomBank(fixedBank, 49152);
            this.prgBankMap[49152] = fixedBank;
          } else {
            this.load8kRomBank(fixedBank, 32768);
            this.prgBankMap[32768] = fixedBank;
          }
          this.prgAddressChanged = false;
        }
        if (this.prgAddressSelect === 0) {
          this.load8kRomBank(arg, 32768);
          this.prgBankMap[32768] = arg;
        } else {
          this.load8kRomBank(arg, 49152);
          this.prgBankMap[49152] = arg;
        }
        break;
      case _Mapper4.CMD_SEL_ROM_PAGE2:
        this.load8kRomBank(arg, 40960);
        this.prgBankMap[40960] = arg;
        if (this.prgAddressChanged) {
          const fixedBank = (this.nes.rom.romCount - 1) * 2;
          if (this.prgAddressSelect === 0) {
            this.load8kRomBank(fixedBank, 49152);
            this.prgBankMap[49152] = fixedBank;
          } else {
            this.load8kRomBank(fixedBank, 32768);
            this.prgBankMap[32768] = fixedBank;
          }
          this.prgAddressChanged = false;
        }
    }
  }
  loadROM() {
    if (!this.nes.rom.valid) {
      throw new Error("MMC3: Invalid ROM! Unable to load.");
    }
    const lastBank = (this.nes.rom.romCount - 1) * 2;
    this.load8kRomBank(lastBank, 49152);
    this.prgBankMap[49152] = lastBank;
    this.load8kRomBank(lastBank + 1, 57344);
    this.prgBankMap[57344] = lastBank + 1;
    this.load8kRomBank(0, 32768);
    this.prgBankMap[32768] = 0;
    this.load8kRomBank(1, 40960);
    this.prgBankMap[40960] = 1;
    this.loadCHRROM();
    this.loadBatteryRam();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
  clockIrqCounter() {
    if (this.irqEnable === 1) {
      this.irqCounter--;
      if (this.irqCounter < 0) {
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL);
        this.irqCounter = this.irqLatchValue;
      }
    }
  }
  toJSON() {
    let s = super.toJSON();
    s.command = this.command;
    s.prgAddressSelect = this.prgAddressSelect;
    s.chrAddressSelect = this.chrAddressSelect;
    s.pageNumber = this.pageNumber;
    s.irqCounter = this.irqCounter;
    s.irqLatchValue = this.irqLatchValue;
    s.irqEnable = this.irqEnable;
    s.prgAddressChanged = this.prgAddressChanged;
    s.chrBanks = Array.from(this.chrBanks);
    s.prgBankMap = { ...this.prgBankMap };
    return s;
  }
  fromJSON(s) {
    super.fromJSON(s);
    this.command = s.command;
    this.prgAddressSelect = s.prgAddressSelect;
    this.chrAddressSelect = s.chrAddressSelect;
    this.pageNumber = s.pageNumber;
    this.irqCounter = s.irqCounter;
    this.irqLatchValue = s.irqLatchValue;
    this.irqEnable = s.irqEnable;
    this.prgAddressChanged = s.prgAddressChanged;
    if (s.chrBanks) this.chrBanks.set(s.chrBanks);
    if (s.prgBankMap) this.prgBankMap = { ...s.prgBankMap };
  }
  getChrBankMap() {
    return this.chrBanks;
  }
  /** 返回当前 PRG 8KB bank 映射 (window base → bank index) */
  getPrgBankMap() {
    return this.prgBankMap;
  }
};
var mapper4_default = Mapper4;

// src/core/mappers/mapper5.ts
var Mapper5 = class extends mapper0_default {
  static {
    this.mapperName = "MMC5";
  }
  constructor(nes2) {
    super(nes2);
    this.prgMode = 3;
    this.prgBankReg = new Uint8Array(5);
    this.prgBankReg[4] = 255;
    this.prgRam = new Uint8Array(65536);
    this.prgRamProtectA = 3;
    this.prgRamProtectB = 3;
    this.chrMode = 3;
    this.chrBankA = new Uint16Array(8);
    this.chrBankB = new Uint16Array(4);
    this.chrUpperBits = 0;
    this.lastChrWrite = 0;
    this.ntMapping = new Uint8Array(4);
    this.exramMode = 0;
    this.exram = new Uint8Array(1024);
    this.fillTile = 0;
    this.fillAttr = 0;
    this.irqTarget = 0;
    this.irqEnabled = false;
    this.irqPending = false;
    this.inFrame = false;
    this.irqCounter = 0;
    this.multA = 0;
    this.multB = 0;
    this.splitEnabled = false;
    this.splitRight = false;
    this.splitTile = 0;
    this.splitScroll = 0;
    this.splitPage = 0;
    this.pulse1 = this._initPulse();
    this.pulse2 = this._initPulse();
    this.pcmValue = 0;
    this.pcmReadMode = false;
    this.pcmIrqEnabled = false;
    this.audioEnabled = 0;
    this._chrBankTarget = -1;
  }
  _initPulse() {
    return {
      enabled: false,
      dutyCycle: 0,
      lengthHalt: false,
      constantVolume: false,
      volume: 0,
      timer: 0,
      timerCounter: 0,
      lengthCounter: 0,
      envelopeCounter: 0,
      envelopeDecay: 15,
      envelopeStart: false,
      sequencePos: 0
    };
  }
  load(address) {
    address &= 65535;
    if (address < 20480) {
      return super.load(address);
    }
    if (address === 20501) {
      let val = 0;
      if (this.pulse1.lengthCounter > 0) val |= 1;
      if (this.pulse2.lengthCounter > 0) val |= 2;
      return val;
    }
    if (address === 20496) {
      return 0;
    }
    if (address >= 20736 && address <= 20740) {
      return this.nes.cpu.dataBus;
    }
    if (address === 20741) {
      return this.nes.cpu.dataBus;
    }
    if (address === 20996) {
      let ppu2 = this.nes.ppu;
      let rendering = ppu2.scanline >= 20 && ppu2.scanline <= 260 && (ppu2.f_bgVisibility === 1 || ppu2.f_spVisibility === 1);
      if (!rendering) {
        this.inFrame = false;
      }
      let val = 0;
      if (this.irqPending) val |= 128;
      if (this.inFrame) val |= 64;
      this.irqPending = false;
      return val;
    }
    if (address === 20997) {
      return this.multA * this.multB & 255;
    }
    if (address === 20998) {
      return this.multA * this.multB >> 8 & 255;
    }
    if (address >= 23552 && address <= 24575) {
      if (this.exramMode >= 2) {
        return this.exram[address - 23552];
      }
      return this.nes.cpu.dataBus;
    }
    if (address < 24576) {
      return this.nes.cpu.dataBus;
    }
    if (address < 32768) {
      let bank = this.prgBankReg[0] & 7;
      let offset = bank * 8192 + (address - 24576);
      return this.prgRam[offset & 65535];
    }
    return this._readPrg(address);
  }
  _readPrg(address) {
    let slot, reg, isRam, bank, base;
    switch (this.prgMode) {
      case 0:
        reg = this.prgBankReg[4];
        bank = (reg & 124) >> 2;
        return this._readPrgRom32k(bank, address - 32768);
      case 1:
        if (address < 49152) {
          reg = this.prgBankReg[2];
          isRam = (reg & 128) === 0;
          if (isRam) {
            bank = (reg & 6) >> 1;
            return this.prgRam[bank * 16384 + (address - 32768)];
          }
          bank = (reg & 126) >> 1;
          return this._readPrgRom16k(bank, address - 32768);
        } else {
          reg = this.prgBankReg[4];
          bank = (reg & 126) >> 1;
          return this._readPrgRom16k(bank, address - 49152);
        }
      case 2:
        if (address < 49152) {
          reg = this.prgBankReg[2];
          isRam = (reg & 128) === 0;
          if (isRam) {
            bank = (reg & 6) >> 1;
            return this.prgRam[bank * 16384 + (address - 32768)];
          }
          bank = (reg & 126) >> 1;
          return this._readPrgRom16k(bank, address - 32768);
        } else if (address < 57344) {
          reg = this.prgBankReg[3];
          isRam = (reg & 128) === 0;
          if (isRam) {
            bank = reg & 7;
            return this.prgRam[bank * 8192 + (address - 49152)];
          }
          bank = reg & 127;
          return this._readPrgRom8k(bank, address - 49152);
        } else {
          reg = this.prgBankReg[4];
          bank = reg & 127;
          return this._readPrgRom8k(bank, address - 57344);
        }
      case 3:
      default:
        if (address < 40960) {
          slot = 1;
        } else if (address < 49152) {
          slot = 2;
        } else if (address < 57344) {
          slot = 3;
        } else {
          slot = 4;
        }
        reg = this.prgBankReg[slot];
        base = slot === 1 ? 32768 : slot === 2 ? 40960 : slot === 3 ? 49152 : 57344;
        if (slot < 4 && (reg & 128) === 0) {
          bank = reg & 7;
          return this.prgRam[bank * 8192 + (address - base)];
        }
        bank = reg & 127;
        return this._readPrgRom8k(bank, address - base);
    }
  }
  _readPrgRom32k(bank32k, offset) {
    let bank16k = (bank32k * 2 + Math.floor(offset / 16384)) % this.nes.rom.romCount;
    let innerOffset = offset % 16384;
    return this.nes.rom.rom[bank16k][innerOffset];
  }
  _readPrgRom16k(bank16k, offset) {
    bank16k %= this.nes.rom.romCount;
    return this.nes.rom.rom[bank16k][offset];
  }
  _readPrgRom8k(bank8k, offset) {
    let bank16k = Math.floor(bank8k / 2) % this.nes.rom.romCount;
    let innerOffset = bank8k % 2 * 8192 + offset;
    if (bank16k < this.nes.rom.romCount) {
      return this.nes.rom.rom[bank16k][innerOffset];
    }
    return 0;
  }
  write(address, value) {
    if (address < 20480) {
      super.write(address, value);
      return;
    }
    if (address >= 20480 && address <= 20483) {
      this._writePulse(this.pulse1, address - 20480, value);
      return;
    }
    if (address >= 20484 && address <= 20487) {
      this._writePulse(this.pulse2, address - 20484, value);
      return;
    }
    if (address === 20496) {
      this.pcmReadMode = (value & 1) !== 0;
      this.pcmIrqEnabled = (value & 128) !== 0;
      return;
    }
    if (address === 20497) {
      if (!this.pcmReadMode && value !== 0) {
        this.pcmValue = value;
      }
      return;
    }
    if (address === 20501) {
      this.audioEnabled = value & 3;
      this.pulse1.enabled = (value & 1) !== 0;
      this.pulse2.enabled = (value & 2) !== 0;
      if (!this.pulse1.enabled) this.pulse1.lengthCounter = 0;
      if (!this.pulse2.enabled) this.pulse2.lengthCounter = 0;
      return;
    }
    if (address === 20736) {
      this.prgMode = value & 3;
      this._syncPrg();
      return;
    }
    if (address === 20737) {
      this.chrMode = value & 3;
      this._syncChr();
      return;
    }
    if (address === 20738) {
      this.prgRamProtectA = value & 3;
      return;
    }
    if (address === 20739) {
      this.prgRamProtectB = value & 3;
      return;
    }
    if (address === 20740) {
      this.exramMode = value & 3;
      this.bgTileOverride = this.exramMode === 1;
      this._syncNametables();
      return;
    }
    if (address === 20741) {
      let v = value;
      this.ntMapping[0] = v & 3;
      v >>= 2;
      this.ntMapping[1] = v & 3;
      v >>= 2;
      this.ntMapping[2] = v & 3;
      v >>= 2;
      this.ntMapping[3] = v & 3;
      this._syncNametables();
      return;
    }
    if (address === 20742) {
      this.fillTile = value;
      this._syncNametables();
      return;
    }
    if (address === 20743) {
      this.fillAttr = value & 3;
      this._syncNametables();
      return;
    }
    if (address === 20755) {
      this.prgBankReg[0] = value & 7;
      return;
    }
    if (address >= 20756 && address <= 20759) {
      let idx = address - 20755;
      this.prgBankReg[idx] = value;
      this._syncPrg();
      return;
    }
    if (address >= 20768 && address <= 20775) {
      let reg = address - 20768;
      this.chrBankA[reg] = this.chrUpperBits << 8 | value;
      this.lastChrWrite = 0;
      this._syncChr();
      return;
    }
    if (address >= 20776 && address <= 20779) {
      let reg = address - 20776;
      this.chrBankB[reg] = this.chrUpperBits << 8 | value;
      this.lastChrWrite = 1;
      this._syncChr();
      return;
    }
    if (address === 20784) {
      this.chrUpperBits = value & 3;
      return;
    }
    if (address === 20992) {
      this.splitEnabled = (value & 128) !== 0;
      this.splitRight = (value & 64) !== 0;
      this.splitTile = value & 31;
      return;
    }
    if (address === 20993) {
      this.splitScroll = value;
      return;
    }
    if (address === 20994) {
      this.splitPage = value & 63;
      return;
    }
    if (address === 20995) {
      this.irqTarget = value;
      return;
    }
    if (address === 20996) {
      this.irqEnabled = (value & 128) !== 0;
      if (this.irqEnabled && this.irqPending) {
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL);
      }
      return;
    }
    if (address === 20997) {
      this.multA = value;
      return;
    }
    if (address === 20998) {
      this.multB = value;
      return;
    }
    if (address >= 23552 && address <= 24575) {
      let exAddr = address - 23552;
      if (this.exramMode === 0 || this.exramMode === 1) {
        this.exram[exAddr] = this.inFrame ? value : 0;
        this._syncExramToVram(exAddr);
      } else if (this.exramMode === 2) {
        this.exram[exAddr] = value;
      }
      return;
    }
    if (address >= 24576 && address <= 32767) {
      if (this.prgRamProtectA === 2 && this.prgRamProtectB === 1) {
        let bank = this.prgBankReg[0] & 7;
        let offset = bank * 8192 + (address - 24576);
        this.prgRam[offset & 65535] = value;
        this.nes.cpu.mem[address] = value;
        this.nes.opts.onBatteryRamWrite(address, value);
      }
      return;
    }
    if (address >= 32768) {
      this._writePrg(address, value);
      return;
    }
  }
  _writePrg(address, value) {
    let slot, reg, isRam, bank, base;
    switch (this.prgMode) {
      case 0:
        return;
      case 1:
        if (address < 49152) {
          reg = this.prgBankReg[2];
          isRam = (reg & 128) === 0;
          if (isRam && this._isPrgRamWritable()) {
            bank = (reg & 6) >> 1;
            this.prgRam[bank * 16384 + (address - 32768)] = value;
          }
        }
        return;
      case 2:
        if (address < 49152) {
          reg = this.prgBankReg[2];
          isRam = (reg & 128) === 0;
          if (isRam && this._isPrgRamWritable()) {
            bank = (reg & 6) >> 1;
            this.prgRam[bank * 16384 + (address - 32768)] = value;
          }
        } else if (address < 57344) {
          reg = this.prgBankReg[3];
          isRam = (reg & 128) === 0;
          if (isRam && this._isPrgRamWritable()) {
            bank = reg & 7;
            this.prgRam[bank * 8192 + (address - 49152)] = value;
          }
        }
        return;
      case 3:
      default:
        if (address < 40960) {
          slot = 1;
          base = 32768;
        } else if (address < 49152) {
          slot = 2;
          base = 40960;
        } else if (address < 57344) {
          slot = 3;
          base = 49152;
        } else {
          return;
        }
        reg = this.prgBankReg[slot];
        isRam = (reg & 128) === 0;
        if (isRam && this._isPrgRamWritable()) {
          bank = reg & 7;
          this.prgRam[bank * 8192 + (address - base)] = value;
        }
        return;
    }
  }
  _isPrgRamWritable() {
    return this.prgRamProtectA === 2 && this.prgRamProtectB === 1;
  }
  _syncPrg() {
    switch (this.prgMode) {
      case 0: {
        let reg = this.prgBankReg[4];
        let bank = (reg & 124) >> 2;
        this.load32kRomBank(bank, 32768);
        break;
      }
      case 1: {
        let regLo = this.prgBankReg[2];
        if (regLo & 128) {
          let bank16k = (regLo & 126) >> 1;
          this.loadRomBank(bank16k % this.nes.rom.romCount, 32768);
        }
        let regHi = this.prgBankReg[4];
        let bank16kHi = (regHi & 126) >> 1;
        this.loadRomBank(bank16kHi % this.nes.rom.romCount, 49152);
        break;
      }
      case 2: {
        let regA = this.prgBankReg[2];
        if (regA & 128) {
          let bank16k = (regA & 126) >> 1;
          this.loadRomBank(bank16k % this.nes.rom.romCount, 32768);
        }
        let regB = this.prgBankReg[3];
        if (regB & 128) {
          this.load8kRomBank(regB & 127, 49152);
        }
        let regC = this.prgBankReg[4];
        this.load8kRomBank(regC & 127, 57344);
        break;
      }
      case 3:
      default: {
        for (let i = 1; i <= 4; i++) {
          let reg = this.prgBankReg[i];
          let addr = 24576 + i * 8192;
          if (i === 4 || reg & 128) {
            this.load8kRomBank(reg & 127, addr);
          }
        }
        break;
      }
    }
  }
  _syncChr() {
    this.nes.ppu.triggerRendering();
    this._chrBankTarget = -1;
    if (this.nes.ppu.f_spriteSize === 0) {
      this._applyChrSetA();
      this._chrBankTarget = 0;
    }
  }
  _applyChrSetA() {
    if (this.nes.rom.vromCount === 0) return;
    switch (this.chrMode) {
      case 0:
        this.load8kVromBank((this.chrBankA[7] & 255) * 2, 0);
        break;
      case 1:
        this.loadVromBank(this.chrBankA[3] & 255, 0);
        this.loadVromBank(this.chrBankA[7] & 255, 4096);
        break;
      case 2:
        this.load2kVromBank(this.chrBankA[1] & 511, 0);
        this.load2kVromBank(this.chrBankA[3] & 511, 2048);
        this.load2kVromBank(this.chrBankA[5] & 511, 4096);
        this.load2kVromBank(this.chrBankA[7] & 511, 6144);
        break;
      case 3:
      default:
        for (let i = 0; i < 8; i++) {
          this.load1kVromBank(this.chrBankA[i] & 1023, i * 1024);
        }
        break;
    }
  }
  _applyChrSetB() {
    if (this.nes.rom.vromCount === 0) return;
    switch (this.chrMode) {
      case 0:
        this.load8kVromBank((this.chrBankB[3] & 255) * 2, 0);
        break;
      case 1:
        this.loadVromBank(this.chrBankB[3] & 255, 0);
        this.loadVromBank(this.chrBankB[3] & 255, 4096);
        break;
      case 2:
        this.load2kVromBank(this.chrBankB[1] & 511, 0);
        this.load2kVromBank(this.chrBankB[3] & 511, 2048);
        this.load2kVromBank(this.chrBankB[1] & 511, 4096);
        this.load2kVromBank(this.chrBankB[3] & 511, 6144);
        break;
      case 3:
      default:
        for (let i = 0; i < 4; i++) {
          this.load1kVromBank(this.chrBankB[i] & 1023, i * 1024);
          this.load1kVromBank(this.chrBankB[i] & 1023, (i + 4) * 1024);
        }
        break;
    }
  }
  _syncNametables() {
    let ppu2 = this.nes.ppu;
    let fillAttrByte = this.fillAttr | this.fillAttr << 2 | this.fillAttr << 4 | this.fillAttr << 6;
    for (let i = 0; i < 960; i++) {
      ppu2.vramMem[11264 + i] = this.fillTile;
    }
    for (let i = 960; i < 1024; i++) {
      ppu2.vramMem[11264 + i] = fillAttrByte;
    }
    if (this.exramMode >= 2) {
      for (let i = 0; i < 1024; i++) {
        ppu2.vramMem[10240 + i] = 0;
      }
    } else {
      copyArrayElements(this.exram, 0, ppu2.vramMem, 10240, 1024);
    }
    const sourceBase = [8192, 9216, 10240, 11264];
    for (let nt = 0; nt < 4; nt++) {
      let logicalBase = 8192 + nt * 1024;
      let physBase = sourceBase[this.ntMapping[nt]];
      ppu2.defineMirrorRegion(logicalBase, physBase, 1024);
    }
    ppu2.defineMirrorRegion(12288, 8192, 3840);
    for (let nt = 0; nt < 4; nt++) {
      ppu2.ntable1[nt] = this.ntMapping[nt];
    }
    this._populateNameTable(2, 10240);
    this._populateNameTable(3, 11264);
  }
  _populateNameTable(ntIndex, vramBase) {
    let ppu2 = this.nes.ppu;
    let nt = ppu2.nameTable[ntIndex];
    for (let i = 0; i < 960; i++) {
      nt.tile[i] = ppu2.vramMem[vramBase + i];
    }
    for (let i = 0; i < 64; i++) {
      nt.writeAttrib(i, ppu2.vramMem[vramBase + 960 + i]);
    }
  }
  _syncExramToVram(exAddr) {
    if (this.exramMode < 2) {
      let ppu2 = this.nes.ppu;
      ppu2.vramMem[10240 + exAddr] = this.exram[exAddr];
      if (exAddr < 960) {
        ppu2.nameTable[2].tile[exAddr] = this.exram[exAddr];
      } else if (exAddr < 1024) {
        ppu2.nameTable[2].writeAttrib(exAddr - 960, this.exram[exAddr]);
      }
    }
  }
  _writePulse(pulse, reg, value) {
    switch (reg) {
      case 0:
        pulse.dutyCycle = value >> 6 & 3;
        pulse.lengthHalt = (value & 32) !== 0;
        pulse.constantVolume = (value & 16) !== 0;
        pulse.volume = value & 15;
        break;
      case 1:
        break;
      case 2:
        pulse.timer = pulse.timer & 1792 | value;
        break;
      case 3:
        pulse.timer = pulse.timer & 255 | (value & 7) << 8;
        if (pulse.enabled) {
          pulse.lengthCounter = this.nes.papu.getLengthMax(value);
        }
        pulse.envelopeStart = true;
        pulse.sequencePos = 0;
        break;
    }
  }
  clockIrqCounter() {
    let scanline = this.nes.ppu.scanline;
    if (scanline === 20) {
      this.inFrame = true;
      this.irqCounter = 0;
      return;
    }
    this.irqCounter++;
    if (this.irqTarget !== 0 && this.irqCounter === this.irqTarget) {
      this.irqPending = true;
      if (this.irqEnabled) {
        this.nes.cpu.requestIrq(this.nes.cpu.IRQ_NORMAL);
      }
    }
    if ((this.irqCounter & 3) === 0) {
      this._clockPulseLengthCounter(this.pulse1);
      this._clockPulseLengthCounter(this.pulse2);
    }
  }
  _clockPulseLengthCounter(pulse) {
    if (pulse.enabled && !pulse.lengthHalt && pulse.lengthCounter > 0) {
      pulse.lengthCounter--;
    }
  }
  onBgRender() {
    if (this.nes.ppu.f_spriteSize === 1 && this._chrBankTarget !== 1) {
      this._applyChrSetB();
      this._chrBankTarget = 1;
      this.nes.ppu.validTileData = false;
    }
  }
  onSpriteRender() {
    if (this.nes.ppu.f_spriteSize === 1 && this._chrBankTarget !== 0) {
      this._applyChrSetA();
      this._chrBankTarget = 0;
    }
  }
  getSpritePatternTile(index) {
    if (this.nes.ppu.f_spriteSize !== 1 || this.nes.rom.vromCount === 0) {
      return this.nes.ppu.ptTile[index];
    }
    let vromCount = this.nes.rom.vromCount;
    let vromTile = this.nes.rom.vromTile;
    switch (this.chrMode) {
      case 0: {
        let bank4kStart = (this.chrBankA[7] & 255) * 2;
        let half = index >= 256 ? 1 : 0;
        let bank4k = (bank4kStart + half) % vromCount;
        return vromTile[bank4k][index - half * 256];
      }
      case 1: {
        let bank4k;
        if (index < 256) {
          bank4k = (this.chrBankA[3] & 255) % vromCount;
        } else {
          bank4k = (this.chrBankA[7] & 255) % vromCount;
        }
        return vromTile[bank4k][index % 256];
      }
      case 2: {
        let regIndex = [1, 3, 5, 7];
        let slot = index >> 7;
        let tileInSlot = index & 127;
        let bank2k = this.chrBankA[regIndex[slot]] & 511;
        let bank4k = Math.floor(bank2k / 2) % vromCount;
        return vromTile[bank4k][(bank2k % 2 << 7) + tileInSlot];
      }
      case 3:
      default: {
        let slot = index >> 6;
        let tileInSlot = index & 63;
        let bank1k = this.chrBankA[slot] & 1023;
        let bank4k = Math.floor(bank1k / 4) % vromCount;
        return vromTile[bank4k][(bank1k % 4 << 6) + tileInSlot];
      }
    }
  }
  getBgTileData(baseTile, tileIndex, ht, vt) {
    if (this.exramMode !== 1 || this.nes.rom.vromCount === 0) return null;
    let exAddr = vt * 32 + ht;
    let exByte = this.exram[exAddr];
    let chrBank4k = exByte & 63 | this.chrUpperBits << 6;
    let bank4k = chrBank4k % this.nes.rom.vromCount;
    let tile = this.nes.rom.vromTile[bank4k][tileIndex];
    if (!tile) return null;
    let attrib = (exByte >> 6 & 3) << 2;
    return { tile, attrib };
  }
  loadROM() {
    if (!this.nes.rom.valid) {
      throw new Error("MMC5: Invalid ROM! Unable to load.");
    }
    this.prgBankReg[4] = 255;
    this._syncPrg();
    this.loadCHRROM();
    this.loadBatteryRam();
    this._syncNametables();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
  toJSON() {
    let s = super.toJSON();
    s.prgMode = this.prgMode;
    s.prgBankReg = Array.from(this.prgBankReg);
    s.prgRam = Array.from(this.prgRam);
    s.prgRamProtectA = this.prgRamProtectA;
    s.prgRamProtectB = this.prgRamProtectB;
    s.chrMode = this.chrMode;
    s.chrBankA = Array.from(this.chrBankA);
    s.chrBankB = Array.from(this.chrBankB);
    s.chrUpperBits = this.chrUpperBits;
    s.lastChrWrite = this.lastChrWrite;
    s.ntMapping = Array.from(this.ntMapping);
    s.exramMode = this.exramMode;
    s.exram = Array.from(this.exram);
    s.fillTile = this.fillTile;
    s.fillAttr = this.fillAttr;
    s.irqTarget = this.irqTarget;
    s.irqEnabled = this.irqEnabled;
    s.irqPending = this.irqPending;
    s.inFrame = this.inFrame;
    s.irqCounter = this.irqCounter;
    s.multA = this.multA;
    s.multB = this.multB;
    s.splitEnabled = this.splitEnabled;
    s.splitRight = this.splitRight;
    s.splitTile = this.splitTile;
    s.splitScroll = this.splitScroll;
    s.splitPage = this.splitPage;
    s.pcmValue = this.pcmValue;
    s.pcmReadMode = this.pcmReadMode;
    s.pcmIrqEnabled = this.pcmIrqEnabled;
    s.audioEnabled = this.audioEnabled;
    s.pulse1 = Object.assign({}, this.pulse1);
    s.pulse2 = Object.assign({}, this.pulse2);
    return s;
  }
  fromJSON(s) {
    super.fromJSON(s);
    this.prgMode = s.prgMode;
    this.prgBankReg = new Uint8Array(s.prgBankReg);
    this.prgRam = new Uint8Array(s.prgRam);
    this.prgRamProtectA = s.prgRamProtectA;
    this.prgRamProtectB = s.prgRamProtectB;
    this.chrMode = s.chrMode;
    this.chrBankA = new Uint16Array(s.chrBankA);
    this.chrBankB = new Uint16Array(s.chrBankB);
    this.chrUpperBits = s.chrUpperBits;
    this.lastChrWrite = s.lastChrWrite;
    this.ntMapping = new Uint8Array(s.ntMapping);
    this.exramMode = s.exramMode;
    this.exram = new Uint8Array(s.exram);
    this.fillTile = s.fillTile;
    this.fillAttr = s.fillAttr;
    this.irqTarget = s.irqTarget;
    this.irqEnabled = s.irqEnabled;
    this.irqPending = s.irqPending;
    this.inFrame = s.inFrame;
    this.irqCounter = s.irqCounter;
    this.multA = s.multA;
    this.multB = s.multB;
    this.splitEnabled = s.splitEnabled;
    this.splitRight = s.splitRight;
    this.splitTile = s.splitTile;
    this.splitScroll = s.splitScroll;
    this.splitPage = s.splitPage;
    this.pcmValue = s.pcmValue;
    this.pcmReadMode = s.pcmReadMode;
    this.pcmIrqEnabled = s.pcmIrqEnabled;
    this.audioEnabled = s.audioEnabled;
    if (s.pulse1) this.pulse1 = Object.assign(this._initPulse(), s.pulse1);
    if (s.pulse2) this.pulse2 = Object.assign(this._initPulse(), s.pulse2);
    this._syncPrg();
    this._syncChr();
    this._syncNametables();
  }
};
var mapper5_default = Mapper5;

// src/core/mappers/mapper7.ts
var Mapper7 = class extends mapper0_default {
  static {
    this.mapperName = "AxROM";
  }
  constructor(nes2) {
    super(nes2);
  }
  write(address, value) {
    if (address < 32768) {
      super.write(address, value);
    } else {
      this.load32kRomBank(value & 7, 32768);
      if (value & 16) {
        this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING2);
      } else {
        this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING);
      }
    }
  }
  loadROM() {
    if (!this.nes.rom.valid) {
      throw new Error("AOROM: Invalid ROM! Unable to load.");
    }
    this.loadPRGROM();
    this.loadCHRROM();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
};
var mapper7_default = Mapper7;

// src/core/mappers/mapper9.ts
var Mapper9 = class extends mapper0_default {
  static {
    this.mapperName = "MMC2";
  }
  constructor(nes2) {
    super(nes2);
    this.prgBank = 0;
    this.chrBankFD0 = 0;
    this.chrBankFE0 = 0;
    this.chrBankFD1 = 0;
    this.chrBankFE1 = 0;
    this.latch0 = 254;
    this.latch1 = 254;
  }
  write(address, value) {
    if (address < 32768) {
      super.write(address, value);
      return;
    }
    switch (address & 61440) {
      case 40960:
        this.prgBank = value & 15;
        this.load8kRomBank(this.prgBank, 32768);
        break;
      case 45056:
        this.chrBankFD0 = value & 31;
        this._updateChr0();
        break;
      case 49152:
        this.chrBankFE0 = value & 31;
        this._updateChr0();
        break;
      case 53248:
        this.chrBankFD1 = value & 31;
        this._updateChr1();
        break;
      case 57344:
        this.chrBankFE1 = value & 31;
        this._updateChr1();
        break;
      case 61440:
        if (value & 1) {
          this.nes.ppu.setMirroring(this.nes.rom.HORIZONTAL_MIRRORING);
        } else {
          this.nes.ppu.setMirroring(this.nes.rom.VERTICAL_MIRRORING);
        }
        break;
    }
  }
  _updateChr0() {
    let bank = this.latch0 === 253 ? this.chrBankFD0 : this.chrBankFE0;
    this.loadVromBank(bank, 0);
  }
  _updateChr1() {
    let bank = this.latch1 === 253 ? this.chrBankFD1 : this.chrBankFE1;
    this.loadVromBank(bank, 4096);
  }
  latchAccess(address) {
    if (address === 4056) {
      if (this.latch0 !== 253) {
        this.latch0 = 253;
        this._updateChr0();
      }
    } else if (address === 4072) {
      if (this.latch0 !== 254) {
        this.latch0 = 254;
        this._updateChr0();
      }
    } else if (address >= 8152 && address <= 8159) {
      if (this.latch1 !== 253) {
        this.latch1 = 253;
        this._updateChr1();
      }
    } else if (address >= 8168 && address <= 8175) {
      if (this.latch1 !== 254) {
        this.latch1 = 254;
        this._updateChr1();
      }
    }
  }
  loadROM() {
    if (!this.nes.rom.valid) {
      throw new Error("MMC2: Invalid ROM! Unable to load.");
    }
    this.load8kRomBank(0, 32768);
    let lastBank8k = (this.nes.rom.romCount - 1) * 2 + 1;
    this.load8kRomBank(lastBank8k - 2, 40960);
    this.load8kRomBank(lastBank8k - 1, 49152);
    this.load8kRomBank(lastBank8k, 57344);
    this.loadCHRROM();
    this.loadBatteryRam();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
  toJSON() {
    let s = super.toJSON();
    s.prgBank = this.prgBank;
    s.chrBankFD0 = this.chrBankFD0;
    s.chrBankFE0 = this.chrBankFE0;
    s.chrBankFD1 = this.chrBankFD1;
    s.chrBankFE1 = this.chrBankFE1;
    s.latch0 = this.latch0;
    s.latch1 = this.latch1;
    return s;
  }
  fromJSON(s) {
    super.fromJSON(s);
    this.prgBank = s.prgBank;
    this.chrBankFD0 = s.chrBankFD0;
    this.chrBankFE0 = s.chrBankFE0;
    this.chrBankFD1 = s.chrBankFD1;
    this.chrBankFE1 = s.chrBankFE1;
    this.latch0 = s.latch0;
    this.latch1 = s.latch1;
  }
};
var mapper9_default = Mapper9;

// src/core/mappers/mapper11.ts
var Mapper11 = class extends mapper0_default {
  static {
    this.mapperName = "Color Dreams";
  }
  constructor(nes2) {
    super(nes2);
  }
  write(address, value) {
    if (address < 32768) {
      super.write(address, value);
      return;
    } else {
      let prgbank1 = (value & 15) * 2 % this.nes.rom.romCount;
      let prgbank2 = ((value & 15) * 2 + 1) % this.nes.rom.romCount;
      this.loadRomBank(prgbank1, 32768);
      this.loadRomBank(prgbank2, 49152);
      if (this.nes.rom.vromCount > 0) {
        let bank = (value >> 4) * 2 % this.nes.rom.vromCount;
        this.loadVromBank(bank, 0);
        this.loadVromBank(bank + 1, 4096);
      }
    }
  }
};
var mapper11_default = Mapper11;

// src/core/mappers/mapper34.ts
var Mapper34 = class extends mapper0_default {
  static {
    this.mapperName = "BNROM";
  }
  constructor(nes2) {
    super(nes2);
  }
  write(address, value) {
    if (address < 32768) {
      super.write(address, value);
      return;
    } else {
      this.load32kRomBank(value, 32768);
    }
  }
};
var mapper34_default = Mapper34;

// src/core/mappers/mapper38.ts
var Mapper38 = class extends mapper0_default {
  static {
    this.mapperName = "PCI556";
  }
  constructor(nes2) {
    super(nes2);
  }
  write(address, value) {
    if (address < 28672 || address > 32767) {
      super.write(address, value);
      return;
    } else {
      this.load32kRomBank(value & 3, 32768);
      this.load8kVromBank((value >> 2 & 3) * 2, 0);
    }
  }
};
var mapper38_default = Mapper38;

// src/core/mappers/mapper66.ts
var Mapper66 = class extends mapper0_default {
  static {
    this.mapperName = "GxROM";
  }
  constructor(nes2) {
    super(nes2);
  }
  write(address, value) {
    if (address < 32768) {
      super.write(address, value);
      return;
    } else {
      this.load32kRomBank(value >> 4 & 3, 32768);
      this.load8kVromBank((value & 3) * 2, 0);
    }
  }
};
var mapper66_default = Mapper66;

// src/core/mappers/mapper71.ts
var Mapper71 = class extends mapper0_default {
  static {
    this.mapperName = "Camerica";
  }
  constructor(nes2) {
    super(nes2);
  }
  write(address, value) {
    if (address < 32768) {
      super.write(address, value);
      return;
    }
    if (address >= 36864 && address < 40960) {
      if (value & 16) {
        this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING2);
      } else {
        this.nes.ppu.setMirroring(this.nes.rom.SINGLESCREEN_MIRRORING);
      }
    } else if (address >= 49152) {
      this.loadRomBank(value & 15, 32768);
    }
  }
  loadROM() {
    if (!this.nes.rom.valid) {
      throw new Error("Mapper 71: Invalid ROM! Unable to load.");
    }
    this.loadRomBank(0, 32768);
    this.loadRomBank(this.nes.rom.romCount - 1, 49152);
    this.loadCHRROM();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
};
var mapper71_default = Mapper71;

// src/core/mappers/mapper79.ts
var Mapper79 = class extends mapper0_default {
  static {
    this.mapperName = "NINA-03/NINA-06";
  }
  constructor(nes2) {
    super(nes2);
  }
  write(address, value) {
    if ((address & 57600) === 16640) {
      this.load32kRomBank(value >> 3 & 1, 32768);
      this.load8kVromBank((value & 7) * 2, 0);
    }
    super.write(address, value);
  }
};
var mapper79_default = Mapper79;

// src/core/mappers/mapper94.ts
var Mapper94 = class extends mapper0_default {
  static {
    this.mapperName = "UN1ROM";
  }
  constructor(nes2) {
    super(nes2);
  }
  write(address, value) {
    if (address < 32768) {
      super.write(address, value);
      return;
    } else {
      this.loadRomBank(value >> 2, 32768);
    }
  }
  loadROM() {
    if (!this.nes.rom.valid) {
      throw new Error("UN1ROM: Invalid ROM! Unable to load.");
    }
    this.loadRomBank(0, 32768);
    this.loadRomBank(this.nes.rom.romCount - 1, 49152);
    this.loadCHRROM();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
};
var mapper94_default = Mapper94;

// src/core/mappers/mapper118.ts
var Mapper118 = class extends mapper4_default {
  static {
    this.mapperName = "TxSROM";
  }
  constructor(nes2) {
    super(nes2);
    this.chrRegs = [0, 0, 0, 0, 0, 0];
  }
  write(address, value) {
    if (address === 40960) {
      return;
    }
    super.write(address, value);
    if (address === 32768) {
      this.updateNametableMirroring();
    }
  }
  executeCommand(cmd, arg) {
    if (cmd <= 5) {
      this.chrRegs[cmd] = arg;
      super.executeCommand(cmd, arg & 127);
      this.updateNametableMirroring();
    } else {
      super.executeCommand(cmd, arg);
    }
  }
  updateNametableMirroring() {
    let ppu2 = this.nes.ppu;
    if (this.chrAddressSelect === 0) {
      let nt01 = this.chrRegs[0] >> 7 & 1;
      let nt23 = this.chrRegs[1] >> 7 & 1;
      ppu2.ntable1[0] = nt01;
      ppu2.ntable1[1] = nt01;
      ppu2.ntable1[2] = nt23;
      ppu2.ntable1[3] = nt23;
    } else {
      ppu2.ntable1[0] = this.chrRegs[2] >> 7 & 1;
      ppu2.ntable1[1] = this.chrRegs[3] >> 7 & 1;
      ppu2.ntable1[2] = this.chrRegs[4] >> 7 & 1;
      ppu2.ntable1[3] = this.chrRegs[5] >> 7 & 1;
    }
    for (let i = 0; i < 4; i++) {
      let source = 8192 + i * 1024;
      let target = 8192 + ppu2.ntable1[i] * 1024;
      ppu2.defineMirrorRegion(source, target, 1024);
    }
    ppu2.currentMirroring = -1;
  }
  loadROM() {
    super.loadROM();
    this.updateNametableMirroring();
  }
  toJSON() {
    let s = super.toJSON();
    s.chrRegs = this.chrRegs.slice();
    return s;
  }
  fromJSON(s) {
    super.fromJSON(s);
    this.chrRegs = s.chrRegs;
    this.updateNametableMirroring();
  }
};
var mapper118_default = Mapper118;

// src/core/mappers/mapper119.ts
var Mapper119 = class extends mapper4_default {
  static {
    this.mapperName = "TQROM";
  }
  constructor(nes2) {
    super(nes2);
    this.chrRam = new Uint8Array(8192);
    this.chrRamTiles = new Array(8);
    for (let i = 0; i < 8; i++) {
      this.chrRamTiles[i] = new Array(64);
      for (let j = 0; j < 64; j++) {
        this.chrRamTiles[i][j] = new tile_default();
      }
    }
    this.chrRamSlots = [-1, -1, -1, -1, -1, -1, -1, -1];
  }
  executeCommand(cmd, arg) {
    switch (cmd) {
      case mapper4_default.CMD_SEL_2_1K_VROM_0000: {
        let base = this.chrAddressSelect === 0 ? 0 : 4096;
        if (arg & 64) {
          let bank = arg & 6;
          this.load1kChrRamBank(bank, base);
          this.load1kChrRamBank(bank + 1, base + 1024);
        } else {
          let bank = arg & 63;
          this.saveChrRamSlot(base);
          this.saveChrRamSlot(base + 1024);
          this.chrRamSlots[base >> 10] = -1;
          this.chrRamSlots[(base >> 10) + 1] = -1;
          this.load1kVromBank(bank, base);
          this.load1kVromBank(bank + 1, base + 1024);
        }
        break;
      }
      case mapper4_default.CMD_SEL_2_1K_VROM_0800: {
        let base = this.chrAddressSelect === 0 ? 2048 : 6144;
        if (arg & 64) {
          let bank = arg & 6;
          this.load1kChrRamBank(bank, base);
          this.load1kChrRamBank(bank + 1, base + 1024);
        } else {
          let bank = arg & 63;
          this.saveChrRamSlot(base);
          this.saveChrRamSlot(base + 1024);
          this.chrRamSlots[base >> 10] = -1;
          this.chrRamSlots[(base >> 10) + 1] = -1;
          this.load1kVromBank(bank, base);
          this.load1kVromBank(bank + 1, base + 1024);
        }
        break;
      }
      case mapper4_default.CMD_SEL_1K_VROM_1000: {
        let base = this.chrAddressSelect === 0 ? 4096 : 0;
        if (arg & 64) {
          this.load1kChrRamBank(arg & 7, base);
        } else {
          this.saveChrRamSlot(base);
          this.chrRamSlots[base >> 10] = -1;
          this.load1kVromBank(arg & 63, base);
        }
        break;
      }
      case mapper4_default.CMD_SEL_1K_VROM_1400: {
        let base = this.chrAddressSelect === 0 ? 5120 : 1024;
        if (arg & 64) {
          this.load1kChrRamBank(arg & 7, base);
        } else {
          this.saveChrRamSlot(base);
          this.chrRamSlots[base >> 10] = -1;
          this.load1kVromBank(arg & 63, base);
        }
        break;
      }
      case mapper4_default.CMD_SEL_1K_VROM_1800: {
        let base = this.chrAddressSelect === 0 ? 6144 : 2048;
        if (arg & 64) {
          this.load1kChrRamBank(arg & 7, base);
        } else {
          this.saveChrRamSlot(base);
          this.chrRamSlots[base >> 10] = -1;
          this.load1kVromBank(arg & 63, base);
        }
        break;
      }
      case mapper4_default.CMD_SEL_1K_VROM_1C00: {
        let base = this.chrAddressSelect === 0 ? 7168 : 3072;
        if (arg & 64) {
          this.load1kChrRamBank(arg & 7, base);
        } else {
          this.saveChrRamSlot(base);
          this.chrRamSlots[base >> 10] = -1;
          this.load1kVromBank(arg & 63, base);
        }
        break;
      }
      default:
        super.executeCommand(cmd, arg);
    }
  }
  saveChrRamSlot(address) {
    let slot = address >> 10;
    let bank = this.chrRamSlots[slot];
    if (bank === -1) return;
    copyArrayElements(
      this.nes.ppu.vramMem,
      slot << 10,
      this.chrRam,
      bank * 1024,
      1024
    );
  }
  load1kChrRamBank(bank, address) {
    this.nes.ppu.triggerRendering();
    bank &= 7;
    this.saveChrRamSlot(address);
    let slot = address >> 10;
    this.chrRamSlots[slot] = bank;
    let srcOffset = bank * 1024;
    copyArrayElements(
      this.chrRam,
      srcOffset,
      this.nes.ppu.vramMem,
      address,
      1024
    );
    this.rebuildChrRamTiles(bank);
    let baseIndex = address >> 4;
    for (let i = 0; i < 64; i++) {
      this.nes.ppu.ptTile[baseIndex + i] = this.chrRamTiles[bank][i];
    }
  }
  rebuildChrRamTiles(bank) {
    let base = bank * 1024;
    for (let i = 0; i < 1024; i++) {
      let tileIndex = i >> 4;
      let leftOver = i % 16;
      if (leftOver < 8) {
        this.chrRamTiles[bank][tileIndex].setScanline(
          leftOver,
          this.chrRam[base + i],
          this.chrRam[base + i + 8]
        );
      } else {
        this.chrRamTiles[bank][tileIndex].setScanline(
          leftOver - 8,
          this.chrRam[base + i - 8],
          this.chrRam[base + i]
        );
      }
    }
  }
  canWriteChr(address) {
    if (address >= 8192) return false;
    return this.chrRamSlots[address >> 10] !== -1;
  }
  toJSON() {
    for (let slot = 0; slot < 8; slot++) {
      this.saveChrRamSlot(slot << 10);
    }
    let s = super.toJSON();
    s.chrRam = Array.from(this.chrRam);
    s.chrRamSlots = this.chrRamSlots.slice();
    return s;
  }
  fromJSON(s) {
    super.fromJSON(s);
    this.chrRam = new Uint8Array(s.chrRam);
    this.chrRamSlots = s.chrRamSlots;
    for (let bank = 0; bank < 8; bank++) {
      this.rebuildChrRamTiles(bank);
    }
    for (let slot = 0; slot < 8; slot++) {
      let bank = this.chrRamSlots[slot];
      if (bank !== -1) {
        let baseIndex = slot << 10 >> 4;
        for (let i = 0; i < 64; i++) {
          this.nes.ppu.ptTile[baseIndex + i] = this.chrRamTiles[bank][i];
        }
      }
    }
  }
};
var mapper119_default = Mapper119;

// src/core/mappers/mapper140.ts
var Mapper140 = class extends mapper0_default {
  static {
    this.mapperName = "Jaleco JF-11/JF-14";
  }
  constructor(nes2) {
    super(nes2);
  }
  write(address, value) {
    if (address < 24576 || address > 32767) {
      super.write(address, value);
      return;
    } else {
      this.load32kRomBank(value >> 4 & 3, 32768);
      this.load8kVromBank((value & 15) * 2, 0);
    }
  }
};
var mapper140_default = Mapper140;

// src/core/mappers/mapper180.ts
var Mapper180 = class extends mapper0_default {
  static {
    this.mapperName = "UNROM (Crazy Climber)";
  }
  constructor(nes2) {
    super(nes2);
  }
  write(address, value) {
    if (address < 32768) {
      super.write(address, value);
      return;
    } else {
      this.loadRomBank(value, 49152);
    }
  }
  loadROM() {
    if (!this.nes.rom.valid) {
      throw new Error("Mapper 180: Invalid ROM! Unable to load.");
    }
    this.loadRomBank(0, 32768);
    this.loadRomBank(0, 49152);
    this.loadCHRROM();
    this.nes.cpu.requestIrq(this.nes.cpu.IRQ_RESET);
  }
};
var mapper180_default = Mapper180;

// src/core/mappers/mapper240.ts
var Mapper240 = class extends mapper0_default {
  static {
    this.mapperName = "Mapper 240";
  }
  constructor(nes2) {
    super(nes2);
  }
  write(address, value) {
    if (address < 16416 || address > 24575) {
      super.write(address, value);
      return;
    } else {
      this.load32kRomBank(value >> 4 & 3, 32768);
      this.load8kVromBank((value & 15) * 2, 0);
    }
  }
};
var mapper240_default = Mapper240;

// src/core/mappers/mapper241.ts
var Mapper241 = class extends mapper0_default {
  static {
    this.mapperName = "BxROM (Mapper 241)";
  }
  constructor(nes2) {
    super(nes2);
  }
  write(address, value) {
    if (address < 32768) {
      super.write(address, value);
      return;
    } else {
      this.load32kRomBank(value, 32768);
    }
  }
};
var mapper241_default = Mapper241;

// src/core/mappers/index.ts
var Mappers = {
  0: mapper0_default,
  1: mapper1_default,
  2: mapper2_default,
  3: mapper3_default,
  4: mapper4_default,
  5: mapper5_default,
  7: mapper7_default,
  9: mapper9_default,
  11: mapper11_default,
  34: mapper34_default,
  38: mapper38_default,
  66: mapper66_default,
  71: mapper71_default,
  79: mapper79_default,
  94: mapper94_default,
  118: mapper118_default,
  119: mapper119_default,
  140: mapper140_default,
  180: mapper180_default,
  240: mapper240_default,
  241: mapper241_default
};
var mappers_default = Mappers;

// src/core/rom.ts
var ROM = class _ROM {
  constructor(nes2) {
    // Mirroring types (instance properties so they're accessible via
    // this.nes.rom.HORIZONTAL_MIRRORING etc. in PPU and mappers):
    this.VERTICAL_MIRRORING = 0;
    this.HORIZONTAL_MIRRORING = 1;
    this.FOURSCREEN_MIRRORING = 2;
    this.SINGLESCREEN_MIRRORING = 3;
    this.SINGLESCREEN_MIRRORING2 = 4;
    this.SINGLESCREEN_MIRRORING3 = 5;
    this.SINGLESCREEN_MIRRORING4 = 6;
    this.CHRROM_MIRRORING = 7;
    this.nes = nes2;
    this.valid = false;
  }
  load(data) {
    let i, j, v;
    if (data instanceof ArrayBuffer) {
      data = new Uint8Array(data);
    }
    const isTypedArray = ArrayBuffer.isView(data);
    if (isTypedArray) {
      const arr = data;
      if (arr.length < 4 || arr[0] !== 78 || arr[1] !== 69 || arr[2] !== 83 || arr[3] !== 26) {
        throw new Error("Not a valid NES ROM.");
      }
    } else {
      const str = data;
      if (!str.startsWith("NES")) {
        throw new Error("Not a valid NES ROM.");
      }
    }
    this.header = new Uint8Array(16);
    for (i = 0; i < 16; i++) {
      this.header[i] = isTypedArray ? data[i] : data.charCodeAt(i) & 255;
    }
    this.mirroring = (this.header[6] & 1) !== 0 ? 1 : 0;
    this.batteryRam = (this.header[6] & 2) !== 0;
    this.trainer = (this.header[6] & 4) !== 0;
    this.fourScreen = (this.header[6] & 8) !== 0;
    this.isNES2 = (this.header[7] & 12) === 8;
    if (this.isNES2) {
      this._loadNES2Header();
    } else {
      this._loadINES1Header();
    }
    this.rom = new Array(this.romCount);
    let offset = 16 + (this.trainer ? 512 : 0);
    const dataLen = isTypedArray ? data.length : data.length;
    for (i = 0; i < this.romCount; i++) {
      this.rom[i] = new Uint8Array(16384);
      for (j = 0; j < 16384; j++) {
        if (offset + j >= dataLen) {
          break;
        }
        this.rom[i][j] = isTypedArray ? data[offset + j] : data.charCodeAt(offset + j) & 255;
      }
      offset += 16384;
    }
    this.vrom = new Array(this.vromCount);
    for (i = 0; i < this.vromCount; i++) {
      this.vrom[i] = new Uint8Array(4096);
      for (j = 0; j < 4096; j++) {
        if (offset + j >= dataLen) {
          break;
        }
        this.vrom[i][j] = isTypedArray ? data[offset + j] : data.charCodeAt(offset + j) & 255;
      }
      offset += 4096;
    }
    this.vromTile = new Array(this.vromCount);
    for (i = 0; i < this.vromCount; i++) {
      this.vromTile[i] = new Array(256);
      for (j = 0; j < 256; j++) {
        this.vromTile[i][j] = new tile_default();
      }
    }
    let tileIndex;
    let leftOver;
    for (v = 0; v < this.vromCount; v++) {
      for (i = 0; i < 4096; i++) {
        tileIndex = i >> 4;
        leftOver = i % 16;
        if (leftOver < 8) {
          this.vromTile[v][tileIndex].setScanline(
            leftOver,
            this.vrom[v][i],
            this.vrom[v][i + 8]
          );
        } else {
          this.vromTile[v][tileIndex].setScanline(
            leftOver - 8,
            this.vrom[v][i - 8],
            this.vrom[v][i]
          );
        }
      }
    }
    this.valid = true;
  }
  // Parse iNES 1.0 header fields (bytes 4-15).
  _loadINES1Header() {
    this.romCount = this.header[4];
    this.vromCount = this.header[5] * 2;
    this.mapperType = this.header[6] >> 4 | this.header[7] & 240;
    let foundError = false;
    for (let i = 8; i < 16; i++) {
      if (this.header[i] !== 0) {
        foundError = true;
        break;
      }
    }
    if (foundError) {
      this.mapperType &= 15;
    }
    this.subMapper = 0;
    this.prgRamSize = 0;
    this.prgNvRamSize = 0;
    this.chrRamSize = 0;
    this.chrNvRamSize = 0;
    this.timingMode = 0;
    this.consoleType = 0;
  }
  // Parse NES 2.0 header fields (bytes 4-15).
  // https://www.nesdev.org/wiki/NES_2.0
  _loadNES2Header() {
    this.mapperType = this.header[6] >> 4 | this.header[7] & 240 | (this.header[8] & 15) << 8;
    this.subMapper = this.header[8] >> 4 & 15;
    const prgMsb = this.header[9] & 15;
    if (prgMsb === 15) {
      const e = this.header[4] >> 2 & 63;
      const m = this.header[4] & 3;
      this.romCount = Math.ceil(Math.pow(2, e) * (m * 2 + 1) / 16384);
    } else {
      this.romCount = prgMsb << 8 | this.header[4];
    }
    const chrMsb = this.header[9] >> 4 & 15;
    if (chrMsb === 15) {
      const e = this.header[5] >> 2 & 63;
      const m = this.header[5] & 3;
      this.vromCount = Math.ceil(Math.pow(2, e) * (m * 2 + 1) / 4096);
    } else {
      this.vromCount = (chrMsb << 8 | this.header[5]) * 2;
    }
    this.prgRamSize = _ROM._decodeRamSize(this.header[10] & 15);
    this.prgNvRamSize = _ROM._decodeRamSize(this.header[10] >> 4 & 15);
    this.chrRamSize = _ROM._decodeRamSize(this.header[11] & 15);
    this.chrNvRamSize = _ROM._decodeRamSize(this.header[11] >> 4 & 15);
    this.timingMode = this.header[12] & 3;
    this.consoleType = this.header[7] & 3;
  }
  // Decode NES 2.0 RAM shift-count encoding.
  // Value 0 means no RAM; otherwise size = 64 << value (in bytes).
  // https://www.nesdev.org/wiki/NES_2.0#PRG-(NV)RAM/EEPROM
  static _decodeRamSize(value) {
    if (value === 0) return 0;
    return 64 << value;
  }
  getMirroringType() {
    if (this.fourScreen) {
      return this.FOURSCREEN_MIRRORING;
    }
    if (this.mirroring === 0) {
      return this.HORIZONTAL_MIRRORING;
    }
    return this.VERTICAL_MIRRORING;
  }
  mapperSupported() {
    return typeof mappers_default[this.mapperType] !== "undefined";
  }
  createMapper() {
    if (this.mapperSupported()) {
      return new mappers_default[this.mapperType](this.nes);
    } else {
      throw new Error(`Unsupported mapper: ${this.mapperType}`);
    }
  }
};
var rom_default = ROM;

// src/core/debug/tracer.ts
var fs = __toESM(require("fs"));
var INS_NAMES = [
  "ADC",
  "AND",
  "ASL",
  "BCC",
  "BCS",
  "BEQ",
  "BIT",
  "BMI",
  "BNE",
  "BPL",
  "BRK",
  "BVC",
  "BVS",
  "CLC",
  "CLD",
  "CLI",
  "CLV",
  "CMP",
  "CPX",
  "CPY",
  "DEC",
  "DEX",
  "DEY",
  "EOR",
  "INC",
  "INX",
  "INY",
  "JMP",
  "JSR",
  "LDA",
  "LDX",
  "LDY",
  "LSR",
  "NOP",
  "ORA",
  "PHA",
  "PHP",
  "PLA",
  "PLP",
  "ROL",
  "ROR",
  "RTI",
  "RTS",
  "SBC",
  "SEC",
  "SED",
  "SEI",
  "STA",
  "STX",
  "STY",
  "TAX",
  "TAY",
  "TSX",
  "TXA",
  "TXS",
  "TYA",
  "ALR",
  "ANC",
  "ARR",
  "AXS",
  "LAX",
  "SAX",
  "DCP",
  "ISC",
  "RLA",
  "RRA",
  "SLO",
  "SRE",
  "SKB",
  "IGN",
  "??",
  "SHA",
  "SHS",
  "SHY",
  "SHX",
  "LAE",
  "ANE",
  "LXA"
];
function formatFlags(status) {
  const n = status >> 7 & 1 ? "N" : "n";
  const v = status >> 6 & 1 ? "V" : "v";
  const u = status >> 5 & 1 ? "U" : "u";
  const b = status >> 4 & 1 ? "B" : "b";
  const d = status >> 3 & 1 ? "D" : "d";
  const i = status >> 2 & 1 ? "I" : "i";
  const z = status >> 1 & 1 ? "Z" : "z";
  const c = status & 1 ? "C" : "c";
  return n + v + u + b + d + i + z + c;
}
function getMesenBank(cpu2, nes2, addr) {
  if (addr < 32768) return 0;
  const mmap2 = nes2.mmap;
  if (!mmap2 || !mmap2.prgBankMap) return 0;
  let block8k;
  if (addr < 40960) {
    block8k = mmap2.prgBankMap["8000"] ?? 0;
  } else if (addr < 49152) {
    block8k = mmap2.prgBankMap["A000"] ?? 0;
  } else if (addr < 57344) {
    block8k = mmap2.prgBankMap["C000"] ?? 30;
  } else {
    block8k = mmap2.prgBankMap["E000"] ?? 31;
  }
  return Math.floor(block8k / 2);
}
function formatInstruction(ctx, instrPC, opcode, opinfo, opbytes) {
  const cpu2 = ctx.cpu;
  const a = cpu2.REG_ACC & 255;
  const x = cpu2.REG_X & 255;
  const y = cpu2.REG_Y & 255;
  const s = cpu2.REG_SP & 255;
  const status = cpu2.getStatus();
  const mesenBank = getMesenBank(cpu2, ctx.nes, instrPC);
  const bytesStr = opbytes.map((b) => b.toString(16).toUpperCase().padStart(2, "0")).join(" ");
  const insName = INS_NAMES[opinfo.ins] ?? "???";
  let operandStr = "";
  if (opinfo.size > 1) {
    const operandBytes = opbytes.slice(1);
    if (operandBytes.length === 1) {
      operandStr = "#$" + operandBytes[0].toString(16).toUpperCase().padStart(2, "0");
    } else if (operandBytes.length === 2) {
      const val = operandBytes[0] | operandBytes[1] << 8;
      operandStr = "$" + val.toString(16).toUpperCase().padStart(4, "0");
    }
  }
  if (ctx.opts.format === "fceux") {
    const frame = (cpu2.nes && cpu2.nes.fpsFrameCount) | 0;
    const cycle = (cpu2._cpuCycleBase ?? 0) + (opinfo.cycles ?? 0) >>> 0;
    return `f${frame}`.padEnd(8) + `c${cycle}`.padEnd(13) + `i${ctx.count}`.padEnd(12) + " A:" + a.toString(16).toUpperCase().padStart(2, "0") + " X:" + x.toString(16).toUpperCase().padStart(2, "0") + " Y:" + y.toString(16).toUpperCase().padStart(2, "0") + " S:" + s.toString(16).toUpperCase().padStart(2, "0") + " P:" + formatFlags(status) + `  $${mesenBank.toString(16).toUpperCase().padStart(2, "0")}:` + instrPC.toString(16).toUpperCase().padStart(4, "0") + ": " + bytesStr.padEnd(8, " ") + " " + insName + " " + operandStr;
  }
  return `i${ctx.count}  $${mesenBank.toString(16).toUpperCase().padStart(2, "0")}:` + instrPC.toString(16).toUpperCase().padStart(4, "0") + ": " + bytesStr.padEnd(8, " ") + " " + insName + " " + operandStr + " A:" + a.toString(16).toUpperCase().padStart(2, "0") + " X:" + x.toString(16).toUpperCase().padStart(2, "0") + " Y:" + y.toString(16).toUpperCase().padStart(2, "0") + " S:" + s.toString(16).toUpperCase().padStart(2, "0") + " P:" + formatFlags(status);
}
function formatHwWrite(ctx, category, addr, val, extra) {
  const cpu2 = ctx.cpu;
  const instrPC = cpu2._instrPC ?? 0;
  const mesenBank = getMesenBank(cpu2, ctx.nes, instrPC);
  const pcStr = `$${mesenBank.toString(16).toUpperCase().padStart(2, "0")}:` + instrPC.toString(16).toUpperCase().padStart(4, "0");
  const addrStr = "$" + addr.toString(16).toUpperCase().padStart(4, "0");
  const valStr = "#$" + (val & 255).toString(16).toUpperCase().padStart(2, "0");
  let line = `[${category}] i${ctx.count} ${pcStr} STA ${addrStr} = ${valStr}`;
  if (extra) line += " " + extra;
  return line;
}
function ntMirrorInfo(addr) {
  const vramAddr = addr & 12287;
  const ntIdx = vramAddr >> 10 & 3;
  const row = vramAddr >> 5 & 31;
  const col = vramAddr & 31;
  const isAttr = (vramAddr & 960) === 960;
  if (isAttr) {
    const attrRow = vramAddr >> 7 & 7;
    const attrIdx = vramAddr & 63;
    return `NT${ntIdx} attr[${attrIdx}]`;
  }
  return `NT${ntIdx} [${row},${col}]`;
}
var Tracer = class {
  constructor() {
    this.ctx = null;
    /** 跨 start/stop 累计的指令计数 (fceux 全量 trace 续接用) */
    this._persistentCount = 0;
  }
  /** 当前已记录的指令总数 (跨帧累计) */
  get instructionCount() {
    return this.ctx ? this.ctx.count : this._persistentCount;
  }
  /** 启动 trace */
  start(nes2, opts = {}) {
    const cpu2 = nes2.cpu;
    let stream = null;
    if (opts.outputFile) {
      stream = fs.createWriteStream(opts.outputFile, { flags: "w" });
    }
    const initialCount = opts.initialCount ?? 0;
    this._persistentCount = initialCount;
    this.ctx = {
      cpu: cpu2,
      nes: nes2,
      count: initialCount,
      lines: 0,
      stream,
      opts: {
        trackCPU: true,
        detailOperand: true,
        ...opts
      },
      stopped: false,
      ppuAddrLatch: 0,
      ppuAddr: 0,
      _mmc3Reg: 0
    };
  }
  /** 停止 trace, 关闭文件流 */
  stop() {
    if (this.ctx) {
      this._persistentCount = this.ctx.count;
      if (this.ctx.stream) {
        this.ctx.stream.end();
      }
      this.ctx.stopped = true;
      this.ctx = null;
    }
  }
  /** 是否正在 trace */
  get active() {
    return this.ctx !== null && !this.ctx.stopped;
  }
  /** 输出一行 */
  emit(line) {
    const ctx = this.ctx;
    if (ctx.stream) {
      ctx.stream.write(line + "\n");
    } else if (ctx.opts.callback) {
      ctx.opts.callback(line);
    }
  }
  /** 检查行数限制 */
  checkMaxLines() {
    const ctx = this.ctx;
    if (ctx.opts.maxLines !== void 0 && ctx.lines >= ctx.opts.maxLines) {
      this.stop();
      return true;
    }
    return false;
  }
  /**
   * 记录一条 CPU 指令 (由 CPU.emulate() 调用)
   */
  trace(instrPC, opcode, opinfo, opbytes) {
    const ctx = this.ctx;
    if (!ctx || ctx.stopped || !ctx.opts.trackCPU) return;
    if (ctx.opts.addressRange) {
      const [start, end] = ctx.opts.addressRange;
      if (instrPC < start || instrPC >= end) return;
    }
    if (ctx.opts.bankFilter !== void 0) {
      const bank = getMesenBank(ctx.cpu, ctx.nes, instrPC);
      if (bank !== ctx.opts.bankFilter) return;
    }
    if (this.checkMaxLines()) return;
    ctx.count++;
    ctx.lines++;
    this.emit(formatInstruction(ctx, instrPC, opcode, opinfo, opbytes));
  }
  /**
   * 记录硬件寄存器写入 (由 CPU.write() 调用)
   * @param addr 写入地址 (CPU 地址总线)
   * @param val 写入值
   */
  traceWrite(addr, val) {
    const ctx = this.ctx;
    if (!ctx || ctx.stopped) return;
    if (ctx.opts.trackPPURegs && addr >= 8192 && addr <= 8194) {
      if (this.checkMaxLines()) return;
      ctx.count++;
      ctx.lines++;
      const names = { 8192: "PPUCTRL", 8193: "PPUMASK", 8194: "PPUSTATUS" };
      this.emit(formatHwWrite(ctx, "PPU_REG", addr, val, names[addr]));
      return;
    }
    if (ctx.opts.trackOAM && (addr === 8195 || addr === 8196 || addr === 16404)) {
      if (this.checkMaxLines()) return;
      ctx.count++;
      ctx.lines++;
      const names = { 8195: "OAMADDR", 8196: "OAMDATA", 16404: "OAMDMA" };
      let extra = names[addr] ?? "";
      if (addr === 8196) {
        const ppu2 = ctx.nes.ppu;
        const oamAddr = ppu2?.sramAddress ?? 0;
        const spriteIdx = oamAddr >> 2 & 63;
        const byteIdx = oamAddr & 3;
        const byteNames = ["Y", "Tile", "Attr", "X"];
        extra += ` oamAddr=$${oamAddr.toString(16).toUpperCase()} spr#${spriteIdx}.${byteNames[byteIdx]}`;
      } else if (addr === 16404) {
        extra += ` DMA page=$${val.toString(16).toUpperCase().padStart(2, "0")} (src=$${(val << 8).toString(16).toUpperCase().padStart(4, "0")})`;
      }
      this.emit(formatHwWrite(ctx, "OAM", addr, val, extra));
      return;
    }
    if (addr === 8198) {
      if (ctx.ppuAddrLatch === 0) {
        ctx.ppuAddrLatch = 1;
        ctx.ppuAddr = ctx.ppuAddr & 255 | (val & 63) << 8;
      } else {
        ctx.ppuAddr = ctx.ppuAddr & 65280 | val;
        ctx.ppuAddrLatch = 0;
        const ppuAddr = ctx.ppuAddr;
        const trackThis = ctx.opts.trackNT && ppuAddr >= 8192 && ppuAddr < 12288 || ctx.opts.trackPalette && ppuAddr >= 16128 && ppuAddr < 16384 || ctx.opts.trackPT && ppuAddr < 8192;
        if (trackThis) {
          if (this.checkMaxLines()) return;
          ctx.count++;
          ctx.lines++;
          let cat = "PPU_ADDR";
          if (ppuAddr >= 16128) cat = "PAL_ADDR";
          else if (ppuAddr >= 8192) cat = "NT_ADDR";
          else cat = "PT_ADDR";
          const extra = `\u2192 $${ppuAddr.toString(16).toUpperCase().padStart(4, "0")}` + (ppuAddr >= 8192 && ppuAddr < 12288 ? ` (${ntMirrorInfo(ppuAddr)})` : "");
          this.emit(formatHwWrite(ctx, cat, 8198, val, extra));
        }
      }
      return;
    }
    if (addr === 8199) {
      const ppuAddr = ctx.ppuAddr;
      const ppu2 = ctx.nes.ppu;
      const increment = ppu2?.f_vramIncrement === 1 ? 32 : 1;
      if (ctx.opts.trackNT && ppuAddr >= 8192 && ppuAddr < 12288) {
        if (this.checkMaxLines()) return;
        ctx.count++;
        ctx.lines++;
        this.emit(formatHwWrite(
          ctx,
          "NT_WRITE",
          8199,
          val,
          `@ $${ppuAddr.toString(16).toUpperCase().padStart(4, "0")} (${ntMirrorInfo(ppuAddr)}) tile=#$${(val & 255).toString(16).toUpperCase().padStart(2, "0")}`
        ));
      } else if (ctx.opts.trackPalette && ppuAddr >= 16128 && ppuAddr < 16384) {
        if (this.checkMaxLines()) return;
        ctx.count++;
        ctx.lines++;
        const palIdx = ppuAddr & 31;
        const palType = palIdx < 16 ? "BG" : "SPR";
        const colorIdx = palIdx & 15;
        const isMirror = palIdx >= 16 && (palIdx & 15) === 0;
        this.emit(formatHwWrite(
          ctx,
          "PAL_WRITE",
          8199,
          val,
          `@ $${ppuAddr.toString(16).toUpperCase().padStart(4, "0")} ${palType}[${colorIdx}]${isMirror ? " (mirror)" : ""} color=#$${(val & 63).toString(16).toUpperCase().padStart(2, "0")}`
        ));
      } else if (ctx.opts.trackPT && ppuAddr < 8192) {
        if (this.checkMaxLines()) return;
        ctx.count++;
        ctx.lines++;
        const ptBank = ppuAddr >> 12;
        const tileIdx = ppuAddr >> 3 & 255;
        const rowIdx = ppuAddr & 7;
        this.emit(formatHwWrite(
          ctx,
          "PT_WRITE",
          8199,
          val,
          `@ $${ppuAddr.toString(16).toUpperCase().padStart(4, "0")} ${ptBank === 0 ? "BG" : "SPR"} tile#${tileIdx} row${rowIdx}`
        ));
      }
      ctx.ppuAddr = ctx.ppuAddr + increment & 16383;
      return;
    }
    if (ctx.opts.trackAudio && addr >= 16384 && addr <= 16407) {
      if (this.checkMaxLines()) return;
      ctx.count++;
      ctx.lines++;
      const names = {
        16384: "SQ1_VOL",
        16385: "SQ1_SWEEP",
        16386: "SQ1_LO",
        16387: "SQ1_HI",
        16388: "SQ2_VOL",
        16389: "SQ2_SWEEP",
        16390: "SQ2_LO",
        16391: "SQ2_HI",
        16392: "TRI_LINEAR",
        16393: "TRI_UNUSED",
        16394: "TRI_LO",
        16395: "TRI_HI",
        16396: "NOISE_VOL",
        16397: "NOISE_UNUSED",
        16398: "NOISE_LO",
        16399: "NOISE_HI",
        16400: "DMC_FREQ",
        16401: "DMC_RAW",
        16402: "DMC_ADDR",
        16403: "DMC_LEN",
        16404: "OAMDMA",
        16405: "APU_STATUS",
        16406: "JOY1",
        16407: "APU_FRAME"
      };
      const name = names[addr] ?? "UNKNOWN";
      this.emit(formatHwWrite(ctx, "AUDIO", addr, val, name));
      return;
    }
    if (ctx.opts.trackMMC3 && (addr === 32768 || addr === 32769 || addr === 40960 || addr === 40961)) {
      if (this.checkMaxLines()) return;
      ctx.count++;
      ctx.lines++;
      const cpu2 = ctx.cpu;
      const instrPC = cpu2._instrPC ?? 0;
      const mesenBank = getMesenBank(cpu2, ctx.nes, instrPC);
      const pcStr = "$" + mesenBank.toString(16).toUpperCase().padStart(2, "0") + ":" + instrPC.toString(16).toUpperCase().padStart(4, "0");
      if (addr === 32768) {
        const reg = val & 7;
        const chrMode = val >> 7 & 1;
        const prgMode = val >> 6 & 1;
        const regNames = [
          "R0:CHR_A0",
          "R1:CHR_A1",
          "R2:CHR_A2",
          "R3:CHR_A3",
          "R4:CHR_B0",
          "R5:CHR_B1",
          "R6:PRG_8000",
          "R7:PRG_A000"
        ];
        const extra = `select ${regNames[reg] ?? "R" + reg} chrMode=${chrMode} prgMode=${prgMode}`;
        this.emit(`[MMC3] i${ctx.count} ${pcStr} STA $8000 = #$${val.toString(16).toUpperCase().padStart(2, "0")} ${extra}`);
        ctx._mmc3Reg = reg;
      } else if (addr === 32769) {
        const reg = ctx._mmc3Reg ?? 0;
        const regNames = ["CHR_A0", "CHR_A1", "CHR_A2", "CHR_A3", "CHR_B0", "CHR_B1", "PRG_8000", "PRG_A000"];
        const regName = regNames[reg] ?? "R" + reg;
        let extra = `${regName}=#$${val.toString(16).toUpperCase().padStart(2, "0")}`;
        if (reg === 6) {
          const block8k = val & 63;
          extra += ` \u2192 $8000\u7A97\u53E3=8KB\u5757${block8k} (16KB bank ${Math.floor(block8k / 2)})`;
        } else if (reg === 7) {
          const block8k = val & 63;
          extra += ` \u2192 $A000\u7A97\u53E3=8KB\u5757${block8k} (16KB bank ${Math.floor(block8k / 2)})`;
        } else {
          extra += ` \u2192 CHR bank ${val & 63}`;
        }
        this.emit(`[MMC3] i${ctx.count} ${pcStr} STA $8001 = #$${val.toString(16).toUpperCase().padStart(2, "0")} ${extra}`);
      } else if (addr === 40960) {
        const mirror = (val & 1) === 0 ? "vertical" : "horizontal";
        this.emit(`[MMC3] i${ctx.count} ${pcStr} STA $A000 = #$${val.toString(16).toUpperCase().padStart(2, "0")} NT mirror=${mirror}`);
      } else if (addr === 40961) {
        const ramEnable = (val & 128) !== 0;
        const ramProtect = (val & 64) !== 0;
        this.emit(`[MMC3] i${ctx.count} ${pcStr} STA $A001 = #$${val.toString(16).toUpperCase().padStart(2, "0")} PRG-RAM enable=${ramEnable} protect=${ramProtect}`);
      }
      return;
    }
  }
};

// src/core/nes.ts
var NES = class {
  constructor(opts) {
    // The frame loop. PPU is advanced inline after every CPU bus operation
    // (in cpu.load/write/push/pull). APU is clocked in bulk after each
    // instruction for compatibility with its sample timing logic.
    this.frame = () => {
      if (this.crashed) {
        throw new Error(
          "Game has crashed. Call reset() or loadROM() to restart."
        );
      }
      this.controllers[1].clock();
      this.controllers[2].clock();
      this.ppu.startFrame();
      let cycles;
      const cpu2 = this.cpu;
      const ppu2 = this.ppu;
      const papu = this.papu;
      try {
        for (; ; ) {
          if (cpu2.cyclesToHalt === 0) {
            cycles = cpu2.emulate();
            if (this.opts.emulateSound) {
              papu.clockFrameCounter(cycles, cpu2.apuCatchupCycles);
            }
            cpu2.apuCatchupCycles = 0;
            if (ppu2.frameEnded) {
              ppu2.frameEnded = false;
              break;
            }
          } else {
            let chunk = Math.min(cpu2.cyclesToHalt, 8);
            for (let i = 0; i < chunk; i++) {
              ppu2.advanceDots(3);
            }
            if (this.opts.emulateSound) {
              papu.clockFrameCounter(chunk);
            }
            cpu2.cyclesToHalt -= chunk;
            cpu2._cpuCycleBase += chunk;
            if (ppu2.frameEnded) {
              ppu2.frameEnded = false;
              break;
            }
          }
        }
      } catch (e) {
        this.crashed = true;
        throw e;
      }
      this.fpsFrameCount++;
    };
    this.buttonDown = (controller, button) => {
      this.controllers[controller].buttonDown(button);
    };
    this.buttonUp = (controller, button) => {
      this.controllers[controller].buttonUp(button);
    };
    this.zapperMove = (x, y) => {
      if (!this.mmap) return;
      this.mmap.zapperX = x;
      this.mmap.zapperY = y;
    };
    this.zapperFireDown = () => {
      if (!this.mmap) return;
      this.mmap.zapperFired = true;
    };
    this.zapperFireUp = () => {
      if (!this.mmap) return;
      this.mmap.zapperFired = false;
    };
    this.opts = {
      onFrame: function() {
      },
      onAudioSample: null,
      onStatusUpdate: function() {
      },
      onBatteryRamWrite: function() {
      },
      emulateSound: true,
      sampleRate: 48e3,
      // Sound sample rate in hz
      ...opts
    };
    this.ui = {
      writeFrame: this.opts.onFrame,
      updateStatus: this.opts.onStatusUpdate
    };
    this.cpu = this.opts.cpuFactory ? this.opts.cpuFactory(this) : new cpu_default(this);
    this.cpu.debugNonROM = this.opts.debugNonROM ?? false;
    this.ppu = new ppu_default(this);
    this.papu = new papu_default(this);
    this.gameGenie = new gamegenie_default();
    this.gameGenie.onChange = () => this.cpu._updateCartridgeLoader();
    this.mmap = null;
    this.controllers = {
      1: new controller_default(),
      2: new controller_default()
    };
    this.fpsFrameCount = 0;
    this.romData = null;
    this.lastFpsTime = null;
    this.crashed = false;
    this.tracer = new Tracer();
    this.ui.updateStatus("Ready to load a ROM.");
  }
  // Resets the system
  reset() {
    this.cpu = this.opts.cpuFactory ? this.opts.cpuFactory(this) : new cpu_default(this);
    this.cpu.debugNonROM = this.opts.debugNonROM ?? false;
    this.ppu = new ppu_default(this);
    this.papu = new papu_default(this);
    if (this.mmap !== null) {
      this.mmap = this.rom.createMapper();
    }
    this.lastFpsTime = null;
    this.fpsFrameCount = 0;
    this.crashed = false;
  }
  getFPS() {
    const now = Date.now();
    let fps = null;
    if (this.lastFpsTime) {
      fps = this.fpsFrameCount / ((now - this.lastFpsTime) / 1e3);
    }
    this.fpsFrameCount = 0;
    this.lastFpsTime = now;
    return fps;
  }
  /**
   * 启用 CPU 指令级 trace (类似 Mesen trace 功能)
   *
   * 用法:
   *   nes.enableTrace({ outputFile: 'trace.log', maxLines: 10000 });
   *   nes.frame();  // 执行的指令会被记录
   *   nes.disableTrace();
   *
   * 过滤选项:
   *   - addressRange: 只记录 [start, end) 范围内的 PC
   *   - bankFilter: 只记录指定 16KB bank (Mesen 编号, 0-15)
   *   - maxLines: 最多记录多少行
   *   - callback: 每行回调 (不写文件)
   */
  enableTrace(opts = {}) {
    this.tracer.start(this, opts);
    return this.tracer;
  }
  /** 停止 trace, 关闭文件流 */
  disableTrace() {
    this.tracer.stop();
  }
  reloadROM() {
    if (this.romData !== null) {
      this.loadROM(this.romData);
    }
  }
  // Loads a ROM file into the CPU and PPU.
  // The ROM file is validated first.
  loadROM(data) {
    this.rom = new rom_default(this);
    this.rom.load(data);
    this.reset();
    this.mmap = this.rom.createMapper();
    this.mmap.loadROM();
    this.ppu.setMirroring(this.rom.getMirroringType());
    this.romData = data;
  }
  // Adjust audio sample timing for a non-standard host frame rate. At the
  // default 60fps each frame() produces ~800 samples at 48kHz. If the host
  // calls frame() less often (e.g. 30fps), the sample timer must fire more
  // frequently per CPU cycle so each frame still fills the audio buffer.
  setFramerate(rate) {
    this.papu.setFrameRate(rate);
  }
  toJSON() {
    return {
      // romData: this.romData,
      cpu: this.cpu.toJSON(),
      mmap: this.mmap.toJSON(),
      ppu: this.ppu.toJSON(),
      papu: this.papu.toJSON(),
      controllers: {
        1: this.controllers[1].toJSON(),
        2: this.controllers[2].toJSON()
      }
    };
  }
  fromJSON(s) {
    this.reset();
    this.cpu.fromJSON(s.cpu);
    this.mmap.fromJSON(s.mmap);
    this.ppu.fromJSON(s.ppu);
    this.papu.fromJSON(s.papu);
    if (s.controllers) {
      if (s.controllers[1]) this.controllers[1].fromJSON(s.controllers[1]);
      if (s.controllers[2]) this.controllers[2].fromJSON(s.controllers[2]);
    }
  }
};
var nes_default = NES;

// src/core/browser/frame-timer.ts
var debugEnabled = false;
try {
  debugEnabled = !!localStorage.getItem("jsnes_debug");
} catch {
}

// src/core/browser/keyboard.ts
var KEYS = {
  88: [1, controller_default.BUTTON_A, "X"],
  // X
  89: [1, controller_default.BUTTON_B, "Y"],
  // Y (Central European keyboard)
  90: [1, controller_default.BUTTON_B, "Z"],
  // Z
  17: [1, controller_default.BUTTON_SELECT, "Right Ctrl"],
  // Right Ctrl
  13: [1, controller_default.BUTTON_START, "Enter"],
  // Enter
  38: [1, controller_default.BUTTON_UP, "Up"],
  // Up
  40: [1, controller_default.BUTTON_DOWN, "Down"],
  // Down
  37: [1, controller_default.BUTTON_LEFT, "Left"],
  // Left
  39: [1, controller_default.BUTTON_RIGHT, "Right"],
  // Right
  83: [1, controller_default.BUTTON_TURBO_A, "S"],
  // S
  65: [1, controller_default.BUTTON_TURBO_B, "A"],
  // A
  103: [2, controller_default.BUTTON_A, "Num-7"],
  // Num-7
  105: [2, controller_default.BUTTON_B, "Num-9"],
  // Num-9
  99: [2, controller_default.BUTTON_SELECT, "Num-3"],
  // Num-3
  97: [2, controller_default.BUTTON_START, "Num-1"],
  // Num-1
  104: [2, controller_default.BUTTON_UP, "Num-8"],
  // Num-8
  98: [2, controller_default.BUTTON_DOWN, "Num-2"],
  // Num-2
  100: [2, controller_default.BUTTON_LEFT, "Num-4"],
  // Num-4
  102: [2, controller_default.BUTTON_RIGHT, "Num-6"]
  // Num-6
};

// src/core/browser/index.ts
var debugEnabled2 = false;
try {
  debugEnabled2 = !!localStorage.getItem("jsnes_debug");
} catch {
}

// scripts/_emu_full.ts
init_pattern_table_viewer();
var ROM_PATH = path.join(__dirname, "..", "docs", "roms", "Captain Tsubasa II - Super Striker (Japan).nes");
var OUT_DIR = path.join(__dirname, "..", "output", "emu-full");
var TOTAL_FRAMES = (() => {
  const v = Number(process.env.EMU_FULL_FRAMES);
  return Number.isFinite(v) && v > 0 ? v : 4332;
})();
var SAMPLE_RATE = 44100;
var TRACE_ENABLED = process.env.EMU_FULL_TRACE !== "0";
var CRC_TABLE = (() => {
  const t = new Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(d) {
  let c = 4294967295;
  for (let i = 0; i < d.length; i++) c = CRC_TABLE[(c ^ d[i]) & 255] ^ c >>> 8;
  return (c ^ 4294967295) >>> 0;
}
function makeChunk(t, d) {
  const lb = Buffer.alloc(4);
  lb.writeUInt32BE(d.length, 0);
  const tb = Buffer.from(t, "ascii");
  const cb = Buffer.alloc(4);
  cb.writeUInt32BE(crc32(Buffer.concat([tb, d])), 0);
  return Buffer.concat([lb, tb, d, cb]);
}
function encodePng(w, h, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr.writeUInt8(8, 8);
  ihdr.writeUInt8(6, 9);
  const row = w * 4;
  const raw = Buffer.alloc((row + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (row + 1)] = 0;
    rgba.copy(raw, y * (row + 1) + 1, y * row, (y + 1) * row);
  }
  return Buffer.concat([sig, makeChunk("IHDR", ihdr), makeChunk("IDAT", zlib.deflateSync(raw, { level: 1 })), makeChunk("IEND", Buffer.alloc(0))]);
}
function bufToRgba(buf) {
  const w = 256, h = 240;
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const v = buf[i];
    rgba[i * 4] = v >>> 16 & 255;
    rgba[i * 4 + 1] = v >>> 8 & 255;
    rgba[i * 4 + 2] = v & 255;
    rgba[i * 4 + 3] = 255;
  }
  return rgba;
}
function rgbaFromData(data, w, h) {
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const v = data[i];
    rgba[i * 4] = v >>> 16 & 255;
    rgba[i * 4 + 1] = v >>> 8 & 255;
    rgba[i * 4 + 2] = v & 255;
    rgba[i * 4 + 3] = 255;
  }
  return rgba;
}
function writeWav(filePath, samples, rate, channels) {
  const numSamples = samples.length / channels;
  const dataLen = numSamples * channels * 2;
  const buf = Buffer.alloc(44 + dataLen);
  let off = 0;
  buf.write("RIFF", off);
  off += 4;
  buf.writeUInt32LE(36 + dataLen, off);
  off += 4;
  buf.write("WAVE", off);
  off += 4;
  buf.write("fmt ", off);
  off += 4;
  buf.writeUInt32LE(16, off);
  off += 4;
  buf.writeUInt16LE(1, off);
  off += 2;
  buf.writeUInt16LE(channels, off);
  off += 2;
  buf.writeUInt32LE(rate, off);
  off += 4;
  buf.writeUInt32LE(rate * channels * 2, off);
  off += 4;
  buf.writeUInt16LE(channels * 2, off);
  off += 2;
  buf.writeUInt16LE(16, off);
  off += 2;
  buf.write("data", off);
  off += 4;
  buf.writeUInt32LE(dataLen, off);
  off += 4;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const v = s < 0 ? s * 32768 : s * 32767;
    buf.writeInt16LE(v | 0, off);
    off += 2;
  }
  fs2.writeFileSync(filePath, buf);
}
var apuWrites = [];
var audioSamplesL = [];
var audioSamplesR = [];
var samplesPerFrame = [];
var apuWritesPerFrame = [];
var frameTraceLines = null;
var frameTracePath = "";
var instrCountThisFrame = 0;
var totalInstrCount = 0;
var tracedFrames = 0;
function beginFrameTrace() {
  frameTraceLines = [];
  instrCountThisFrame = 0;
}
function setFrameTracePath(p) {
  frameTracePath = p;
}
function flushFrameTrace() {
  if (frameTraceLines && frameTraceLines.length > 0) {
    fs2.writeFileSync(frameTracePath, frameTraceLines.join("\n") + "\n");
  }
  frameTraceLines = null;
}
function startTrace() {
  nes.enableTrace({
    format: "fceux",
    callback: (line) => {
      instrCountThisFrame++;
      if (frameTraceLines) frameTraceLines.push(line);
    }
  });
}
function stopTrace() {
  flushFrameTrace();
  nes.disableTrace();
  console.log(`[emu-full] cpu trace done: frames=${tracedFrames} instructions=${totalInstrCount}`);
}
var romBytes = fs2.readFileSync(ROM_PATH);
var nes = new nes_default({
  emulateSound: true,
  sampleRate: SAMPLE_RATE,
  onAudioSample: (l, _n, r) => {
    if (samplesPerFrame.length > 0) samplesPerFrame[samplesPerFrame.length - 1]++;
    audioSamplesL.push(l);
    audioSamplesR.push(r);
  }
});
nes.loadROM(romBytes);
var ppu = nes.ppu;
var mmap = nes.mmap;
var cpu = nes.cpu;
var rom = nes.rom;
console.log(`[emu-full] mapper=${rom.mapperType} PRG=${rom.romCount} CHR=${rom.vromCount} frames=${TOTAL_FRAMES}`);
var currentFrameForHook = 0;
var proto = papu_default.prototype;
var origWriteReg = proto.writeReg;
proto.writeReg = function(addr, value) {
  if (addr >= 16384 && addr <= 16407) {
    if (apuWritesPerFrame.length > 0) apuWritesPerFrame[apuWritesPerFrame.length - 1]++;
    apuWrites.push({ frame: currentFrameForHook, reg: addr, value });
  }
  return origWriteReg.call(this, addr, value);
};
fs2.mkdirSync(OUT_DIR, { recursive: true });
var t0 = Date.now();
if (TRACE_ENABLED) startTrace();
console.log(`[emu-full] cpu trace=${TRACE_ENABLED ? "ON" : "OFF"} (emu-full.log + frame-NNNN/trace.log)`);
for (let f = 1; f <= TOTAL_FRAMES; f++) {
  currentFrameForHook = f;
  samplesPerFrame.push(0);
  apuWritesPerFrame.push(0);
  if (TRACE_ENABLED) beginFrameTrace();
  nes.frame();
  if (mmap && Array.isArray(mmap.chrBanks) && typeof mmap.load1kVromBank === "function") {
    for (let slot = 0; slot < 8; slot++) mmap.load1kVromBank(mmap.chrBanks[slot], slot * 1024);
  }
  const switches = drainChrSwitchLog();
  const chrMapByScan = buildChrBankMapByScanline(switches, mmap.chrBanks);
  const frameDir = path.join(OUT_DIR, "frame-" + String(f).padStart(4, "0"));
  fs2.mkdirSync(frameDir, { recursive: true });
  if (TRACE_ENABLED) setFrameTracePath(path.join(frameDir, "trace.log"));
  fs2.writeFileSync(
    path.join(frameDir, "chr-switches.json"),
    JSON.stringify({
      frame: f,
      bankMapByScanline: Array.from(chrMapByScan.entries()).map(([scan, banks]) => ({
        scanline: scan,
        banks: Array.from(banks)
      })),
      rawLog: switches
    })
  );
  for (const [scan, slotBanks] of chrMapByScan) {
    const pt2 = renderBothPatternTablesAtScanline(nes, slotBanks, 0);
    const ptRgba2 = rgbaFromData(
      new Uint32Array([...pt2.table0.data, ...pt2.table1.data]),
      pt2.table0.width * 2,
      pt2.table0.height
    );
    fs2.writeFileSync(
      path.join(frameDir, `pt-sheet-scan${String(scan).padStart(3, "0")}.png`),
      encodePng(pt2.table0.width * 2, pt2.table0.height, ptRgba2)
    );
  }
  fs2.writeFileSync(path.join(frameDir, "screen.png"), encodePng(256, 240, bufToRgba(ppu.buffer)));
  const pt = renderBothPatternTables(nes, 0);
  const ptW = pt.table0.width;
  const ptH = pt.table0.height;
  const ptRgba = rgbaFromData(new Uint32Array([...pt.table0.data, ...pt.table1.data]), ptW * 2, ptH);
  fs2.writeFileSync(path.join(frameDir, "pt-sheet.png"), encodePng(ptW * 2, ptH, ptRgba));
  const ptJson = [];
  for (let i = 0; i < 512; i++) {
    const t = ppu.ptTile[i];
    const pix = t && t.pix ? Array.from(t.pix) : new Array(64).fill(0);
    const plane0 = new Array(8).fill(0);
    const plane1 = new Array(8).fill(0);
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const idx = pix[row * 8 + col];
        if (idx & 1) plane0[row] |= 1 << 7 - col;
        if (idx & 2) plane1[row] |= 1 << 7 - col;
      }
    }
    ptJson.push({ idx: i, plane0, plane1 });
  }
  fs2.writeFileSync(path.join(frameDir, "pt.json"), JSON.stringify(ptJson));
  const ntRgba = renderAllNameTablesNoBg(ppu, rom, switches);
  for (let i = 0; i < 4; i++) {
    fs2.writeFileSync(path.join(frameDir, `nt${i}.png`), encodePng(256, 240, rgbaFromData(ntRgba[i], 256, 240)));
  }
  const ntJson = [];
  for (let i = 0; i < 4; i++) {
    const t = ppu.nameTable[i];
    ntJson.push({ idx: i, tile: Array.from(t.tile), attrib: Array.from(t.attrib) });
  }
  fs2.writeFileSync(path.join(frameDir, "nt.json"), JSON.stringify(ntJson));
  const oamArr = Array.from(ppu.spriteMem);
  const oamJson = [];
  for (let i = 0; i < 64; i++) {
    oamJson.push({ idx: i, y: oamArr[i * 4], tile: oamArr[i * 4 + 1], attr: oamArr[i * 4 + 2], x: oamArr[i * 4 + 3] });
  }
  fs2.writeFileSync(path.join(frameDir, "oam.json"), JSON.stringify(oamJson));
  const oamImg = renderOamSheet(oamJson, ppu);
  fs2.writeFileSync(path.join(frameDir, "oam.png"), encodePng(oamImg.w, oamImg.h, oamImg.rgba));
  const oamComp = renderOamComposite(oamJson, ppu);
  fs2.writeFileSync(path.join(frameDir, "oam-composite.png"), encodePng(256, 240, oamComp));
  const oamStripped = renderOamStripped(oamJson, ppu);
  if (oamStripped) {
    fs2.writeFileSync(path.join(frameDir, "oam-stripped.png"), encodePng(oamStripped.w, oamStripped.h, oamStripped.rgba));
  }
  const palBg = Array.from(ppu.vramMem.slice(16128, 16144));
  const palSp = Array.from(ppu.vramMem.slice(16144, 16160));
  fs2.writeFileSync(path.join(frameDir, "palette.json"), JSON.stringify({ bg: palBg, spr: palSp }));
  const palImg = renderPaletteSheet(palBg, palSp, ppu);
  fs2.writeFileSync(path.join(frameDir, "palette.png"), encodePng(palImg.w, palImg.h, palImg.rgba));
  const chrMap = mmap.chrBanks ? Array.from(mmap.chrBanks) : [];
  const prgMap = mmap.prgBankMap || {};
  fs2.writeFileSync(path.join(frameDir, "state.json"), JSON.stringify({
    frame: f,
    pc: cpu.REG_PC >>> 0,
    nTblAddress: ppu.f_nTblAddress,
    bgTable: ppu.f_bgPatternTable,
    spTable: ppu.f_spPatternTable,
    chrBanks: chrMap,
    prgBankMap: prgMap,
    apuWritesThisFrame: apuWritesPerFrame[f - 1],
    audioSamplesThisFrame: samplesPerFrame[f - 1],
    instrCountThisFrame,
    cycleBaseAfterFrame: cpu._cpuCycleBase ?? 0
  }, null, 2));
  if (TRACE_ENABLED) {
    flushFrameTrace();
    totalInstrCount += instrCountThisFrame;
    tracedFrames++;
  }
  if (f % 200 === 0 || f === 1 || f === TOTAL_FRAMES) {
    const elapsed2 = (Date.now() - t0) / 1e3;
    const fps = f / elapsed2;
    const eta = (TOTAL_FRAMES - f) / fps;
    console.log(`  f${f}/${TOTAL_FRAMES}  fps=${fps.toFixed(1)}  eta=${eta.toFixed(0)}s  audio=${audioSamplesL.length}  apuWrites=${apuWrites.length}  instr=${totalInstrCount}`);
  }
}
if (TRACE_ENABLED) stopTrace();
if (TRACE_ENABLED) {
  const ALL_PATH = path.join(OUT_DIR, "emu-full-all.log");
  const frameDirs = fs2.readdirSync(OUT_DIR).filter((d) => /^frame-\d+$/.test(d)).sort();
  const ws = fs2.createWriteStream(ALL_PATH, { flags: "w" });
  let allBytes = 0;
  let allLines = 0;
  (async () => {
    let copied = 0;
    for (const d of frameDirs) {
      const p = path.join(OUT_DIR, d, "trace.log");
      if (!fs2.existsSync(p)) continue;
      await new Promise((resolve, reject) => {
        const rs = fs2.createReadStream(p);
        rs.on("data", (c) => {
          allBytes += c.length;
          for (let i = 0; i < c.length; i++) if (c[i] === 10) allLines++;
        });
        rs.pipe(ws, { end: false });
        rs.on("end", resolve);
        rs.on("error", reject);
      });
      copied++;
    }
    ws.end();
    ws.on("finish", () => {
      console.log(`[emu-full] merged ${copied} frame trace logs -> ${ALL_PATH} (${(allBytes / 1048576).toFixed(1)} MB, ${allLines} lines, per-frame logs kept)`);
    });
  })().catch((e) => console.error("[emu-full] merge failed:", e));
}
var apuDir = path.join(OUT_DIR, "apu");
fs2.mkdirSync(apuDir, { recursive: true });
var stereo = new Float32Array(audioSamplesL.length * 2);
for (let i = 0; i < audioSamplesL.length; i++) {
  stereo[i * 2] = audioSamplesL[i];
  stereo[i * 2 + 1] = audioSamplesR[i];
}
writeWav(path.join(apuDir, "audio.wav"), stereo, SAMPLE_RATE, 2);
var regTraceLog = apuWrites.map(
  (w, idx) => `f${String(w.frame).padStart(4, "0")} #${String(idx + 1).padStart(5, "0")} $${w.reg.toString(16).padStart(4, "0").toUpperCase()} = #$${w.value.toString(16).padStart(2, "0").toUpperCase()}`
).join("\n");
fs2.writeFileSync(path.join(apuDir, "register-writes.log"), regTraceLog);
var apuSummaryMap = /* @__PURE__ */ new Map();
for (const w of apuWrites) {
  if (!apuSummaryMap.has(w.frame)) apuSummaryMap.set(w.frame, { frame: w.frame, sq1: 0, sq2: 0, tri: 0, noise: 0, dmc: 0, ctrl: 0, total: 0 });
  const s = apuSummaryMap.get(w.frame);
  s.total++;
  if (w.reg >= 16384 && w.reg < 16388) s.sq1++;
  else if (w.reg >= 16388 && w.reg < 16392) s.sq2++;
  else if (w.reg >= 16392 && w.reg < 16396) s.tri++;
  else if (w.reg >= 16396 && w.reg <= 16399) s.noise++;
  else if (w.reg >= 16400 && w.reg <= 16403) s.dmc++;
  else if (w.reg === 16405 || w.reg === 16407) s.ctrl++;
}
var apuSummary = Array.from(apuSummaryMap.values()).sort((a, b) => a.frame - b.frame);
fs2.writeFileSync(path.join(apuDir, "summary.json"), JSON.stringify(apuSummary));
var samplesPerFrameOut = samplesPerFrame.map((c, i) => ({ frame: i + 1, samples: c }));
fs2.writeFileSync(path.join(apuDir, "samples-per-frame.json"), JSON.stringify(samplesPerFrameOut));
var elapsed = (Date.now() - t0) / 1e3;
console.log(`[emu-full] done in ${elapsed.toFixed(1)}s`);
console.log(`  audio samples=${audioSamplesL.length} (${(audioSamplesL.length / SAMPLE_RATE).toFixed(2)}s)`);
console.log(`  apu writes=${apuWrites.length} (${apuSummary.length} frames with writes)`);
function renderAllNameTablesNoBg(ppu2, rom2, switches) {
  const W = 256, H = 240, COLS = 32, ROWS = 30;
  const pal = ppu2.imgPalette;
  const vromTile = rom2 && rom2.vromTile;
  const initialBanks = new Uint8Array(8);
  if (rom2 && rom2.chrBanks) for (let i = 0; i < 8; i++) initialBanks[i] = rom2.chrBanks[i] | 0;
  const mapByScan = buildChrBankMapByScanline(switches, initialBanks);
  const scanBankCache = new Array(240);
  for (let y = 0; y < 240; y++) {
    let best = initialBanks;
    for (const [sc, banks] of mapByScan) {
      if (sc <= y) best = banks;
      else break;
    }
    scanBankCache[y] = best;
  }
  const bgTableBase = ppu2.regS === 0 ? 0 : 256;
  const fetchTile = (tileIdx, yScan) => {
    const slot = bgTableBase === 0 ? tileIdx >> 6 : 4 + (tileIdx >> 6);
    const localIdx = tileIdx & 63;
    const slotBanks = scanBankCache[yScan] || initialBanks;
    const bank1k = slotBanks[slot];
    if (bank1k == null) return null;
    const bank4k = bank1k / 4 | 0;
    const off = bank1k % 4 * 64 + localIdx;
    if (!vromTile || !vromTile[bank4k]) return null;
    const t = vromTile[bank4k][off];
    return t && t.pix ? t.pix : null;
  };
  const out = [];
  for (let ntIdx = 0; ntIdx < 4; ntIdx++) {
    const buf = new Uint32Array(W * H);
    const nt = ppu2.nameTable[ntIdx];
    if (!nt) {
      out.push(buf);
      continue;
    }
    for (let ty = 0; ty < ROWS; ty++) {
      for (let tx = 0; tx < COLS; tx++) {
        const tileIdx = nt.tile[ty * COLS + tx] | 0;
        const attrVal = nt.attrib[ty * COLS + tx] | 0;
        const yScan = ty * 8;
        const pix = fetchTile(tileIdx, yScan);
        const baseX = tx * 8, baseY = ty * 8;
        if (pix) {
          for (let py = 0; py < 8; py++) {
            for (let px = 0; px < 8; px++) {
              const ci = pix[py * 8 + px];
              buf[(baseY + py) * W + baseX + px] = ci === 0 ? pal[0] : pal[ci + attrVal] ?? pal[0];
            }
          }
        } else {
          for (let py = 0; py < 8; py++) for (let px = 0; px < 8; px++) buf[(baseY + py) * W + baseX + px] = pal[0];
        }
      }
    }
    out.push(buf);
  }
  return out;
}
function renderOamSheet(oamJson, ppu2) {
  const cellW = 9, cellH = 9;
  const cols = 8, rows = 8;
  const w = cols * cellW, h = rows * cellH;
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < oamJson.length; i++) {
    const o = oamJson[i];
    const tile = o.tile;
    const attr = o.attr;
    const flipH = attr & 64 ? 1 : 0;
    const flipV = attr & 128 ? 1 : 0;
    const palHi = (attr & 3) << 2;
    const baseIdx = ppu2.f_spPatternTable ? 256 : 0;
    const ptT = ppu2.ptTile[baseIdx + tile];
    const pix = ptT && ptT.pix ? ptT.pix : null;
    const cx = i % cols * cellW;
    const cy = Math.floor(i / cols) * cellH;
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const sx = flipH ? 7 - px : px;
        const sy = flipV ? 7 - py : py;
        const idx = pix ? pix[sy * 8 + sx] : 0;
        const color = idx === 0 ? 4280295456 : ppu2.imgPalette[palHi + idx] ?? 4280295456;
        const r = color >>> 16 & 255, g = color >>> 8 & 255, b = color & 255;
        const off = ((cy + py) * w + cx + px) * 4;
        rgba[off] = r;
        rgba[off + 1] = g;
        rgba[off + 2] = b;
        rgba[off + 3] = 255;
      }
      const sepOff = ((cy + py) * w + cx + 8) * 4;
      rgba[sepOff] = 4278190080;
      rgba[sepOff + 1] = 0;
      rgba[sepOff + 2] = 0;
      rgba[sepOff + 3] = 255;
    }
    const hSepY = cy + 8;
    if (hSepY < h) {
      for (let px = 0; px < cellW; px++) {
        const off = (hSepY * w + cx + px) * 4;
        rgba[off] = 0;
        rgba[off + 1] = 0;
        rgba[off + 2] = 0;
        rgba[off + 3] = 255;
      }
    }
  }
  return { w, h, rgba };
}
function renderOamComposite(oamJson, ppu2) {
  const W = 256, H = 240;
  const rgba = Buffer.alloc(W * H * 4);
  const fillBg = (x, y) => {
    const off = (y * W + x) * 4;
    const isM = (y >> 1) + (x >> 1) & 1;
    const v = isM ? 4281335856 : 4278190080;
    rgba[off] = v >>> 16 & 255;
    rgba[off + 1] = v >>> 8 & 255;
    rgba[off + 2] = v & 255;
    rgba[off + 3] = 255;
  };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) fillBg(x, y);
  const baseIdx = ppu2.f_spPatternTable ? 256 : 0;
  for (let i = 0; i < oamJson.length; i++) {
    const o = oamJson[i];
    if (o.y >= 239) continue;
    const attr = o.attr;
    const flipH = attr & 64 ? 1 : 0;
    const flipV = attr & 128 ? 1 : 0;
    const palHi = (attr & 3) << 2;
    const ptT = ppu2.ptTile[baseIdx + o.tile];
    const pix = ptT && ptT.pix ? ptT.pix : null;
    if (!pix) continue;
    const sy0 = o.y + 1;
    for (let py = 0; py < 8; py++) {
      const dy = sy0 + py;
      if (dy < 0 || dy >= H) continue;
      for (let px = 0; px < 8; px++) {
        const dx = o.x + px;
        if (dx < 0 || dx >= W) continue;
        const sx = flipH ? 7 - px : px;
        const sy = flipV ? 7 - py : py;
        const idx = pix[sy * 8 + sx];
        if (idx === 0) continue;
        const color = ppu2.sprPalette ? ppu2.sprPalette[palHi + idx] ?? 4278190080 : 4278190080;
        const r = color >>> 16 & 255, g = color >>> 8 & 255, b = color & 255;
        const off = (dy * W + dx) * 4;
        rgba[off] = r;
        rgba[off + 1] = g;
        rgba[off + 2] = b;
        rgba[off + 3] = 255;
      }
    }
  }
  return rgba;
}
function renderOamStripped(oamJson, ppu2) {
  const baseIdx = ppu2.f_spPatternTable ? 256 : 0;
  let minX = 256, maxX = -1, minY = 240, maxY = -1;
  const refs = [];
  for (let i = 0; i < oamJson.length; i++) {
    const o = oamJson[i];
    if (!o || o.y >= 239) continue;
    const sx0 = o.x;
    const sy0 = o.y + 1;
    refs.push({ o, sx0, sy0 });
    if (sx0 < minX) minX = sx0;
    if (sx0 + 8 > maxX) maxX = sx0 + 8;
    if (sy0 < minY) minY = sy0;
    if (sy0 + 8 > maxY) maxY = sy0 + 8;
  }
  if (refs.length === 0) return null;
  const ox = -minX;
  const oy = -minY;
  const W = maxX - minX;
  const H = maxY - minY;
  const rgba = Buffer.alloc(W * H * 4);
  for (const r of refs) {
    const o = r.o;
    const attr = o.attr;
    const flipH = attr & 64 ? 1 : 0;
    const flipV = attr & 128 ? 1 : 0;
    const palHi = (attr & 3) << 2;
    const ptT = ppu2.ptTile[baseIdx + o.tile];
    const pix = ptT && ptT.pix ? ptT.pix : null;
    if (!pix) continue;
    const dx0 = r.sx0 + ox;
    const dy0 = r.sy0 + oy;
    for (let py = 0; py < 8; py++) {
      const dy = dy0 + py;
      if (dy < 0 || dy >= H) continue;
      for (let px = 0; px < 8; px++) {
        const dx = dx0 + px;
        if (dx < 0 || dx >= W) continue;
        const sx = flipH ? 7 - px : px;
        const sy = flipV ? 7 - py : py;
        const idx = pix[sy * 8 + sx];
        if (idx === 0) continue;
        const color = ppu2.sprPalette ? ppu2.sprPalette[palHi + idx] ?? 4278190080 : 4278190080;
        const r2 = color >>> 16 & 255, g = color >>> 8 & 255, b = color & 255;
        const off = (dy * W + dx) * 4;
        rgba[off] = r2;
        rgba[off + 1] = g;
        rgba[off + 2] = b;
        rgba[off + 3] = 255;
      }
    }
  }
  return { w: W, h: H, rgba, minX, minY };
}
function renderPaletteSheet(palBg, palSp, ppu2) {
  const pal = ppu2.palTable;
  const cellW = 16, cellH = 16;
  const cols = 8, rows = 4;
  const w = cols * cellW, h = rows * cellH;
  const rgba = Buffer.alloc(w * h * 4);
  const all = [...palBg, ...palSp];
  for (let i = 0; i < 32; i++) {
    const idx = all[i] & 63;
    const entry = pal.getEntry ? pal.getEntry(idx) : 4278190080;
    const r = entry >>> 16 & 255, g = entry >>> 8 & 255, b = entry & 255;
    const cx = i % cols * cellW;
    const cy = Math.floor(i / cols) * cellH;
    for (let py = 0; py < cellH; py++) {
      for (let px = 0; px < cellW; px++) {
        const off = ((cy + py) * w + cx + px) * 4;
        rgba[off] = r;
        rgba[off + 1] = g;
        rgba[off + 2] = b;
        rgba[off + 3] = 255;
      }
    }
  }
  return { w, h, rgba };
}
