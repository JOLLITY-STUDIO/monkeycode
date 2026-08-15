/**
 * 脚本数据结构化生成器 — 解析所有脚本并输出 JSON 格式
 *
 * 功能:
 *   1. 解析 bank 3-6 的所有脚本 (ID 0x00-0xFE)
 *   2. 解码文本字节为可读字符串 (使用内联字符映射表)
 *   3. 输出结构化 JSON, 供 tsubasa2-h5-src 项目集成
 *
 * 用法: node scripts/generate_script_data.cjs > scripts_data.json
 */
'use strict';

const fs = require('fs');
const path = require('path');

// ── 加载所有 32 个 ROM bank ──
const BANKS = [];
for (let i = 0; i < 32; i++) {
  const id = i.toString().padStart(2, '0');
  const p = path.resolve(__dirname, `../../rom-data/prg-bank-${id}.ts`);
  const src = fs.readFileSync(p, 'utf-8');
  const m = src.match(/const PRG_BANK_\d+[\s\S]*?=\s*\[([\s\S]*?)\]/);
  if (!m) throw new Error(`无法解析 bank ${id}`);
  BANKS[i] = m[1].split(',').map(s => s.trim()).filter(s => /^0x[0-9A-Fa-f]+$/.test(s)).map(s => parseInt(s, 16));
}

// ── 脚本 ID → bank 映射 ──
function getScriptBank(scriptId) {
  if (scriptId < 0x10) return 3;
  if (scriptId < 0x20) return 4;
  if (scriptId < 0x60) return 5;
  return 6;
}

function getScriptBaseOffset(scriptId) {
  if (scriptId < 0x10) return scriptId * 2;
  if (scriptId < 0x20) return (scriptId - 0x10) * 2;
  if (scriptId < 0x60) return (scriptId - 0x20) * 2;
  return (scriptId - 0x60) * 2;
}

function getScriptEntry(scriptId) {
  const bank = getScriptBank(scriptId);
  const off = getScriptBaseOffset(scriptId);
  const lo = BANKS[bank][off];
  const hi = BANKS[bank][off + 1];
  const addr = (hi << 8) | lo;
  return { bank, addr, bankOffset: addr - 0xA000 };
}

function readByte(bank, offset) {
  if (offset < 0 || offset >= BANKS[bank].length) return -1;
  return BANKS[bank][offset];
}

// ── 长指令参数长度表 ──
const LONG_INSTR_PARAMS = {
  0xE8: 1, 0xE9: 0, 0xEA: 0, 0xEB: 0, 0xEC: 1, 0xED: 1,
  0xEE: 0, 0xEF: 0, 0xF0: 2, 0xF1: 1, 0xF2: 1, 0xF3: -1,
  0xF4: -2, 0xF5: -2, 0xF6: 1, 0xF7: 0, 0xF8: -3, 0xF9: 1,
  0xFA: 1, 0xFB: 0, 0xFC: 0, 0xFD: 0, 0xFE: 2, 0xFF: 0,
};

const LONG_INSTR_MNEMONIC = {
  0xE8: 'LOAD_SCENE_DATA', 0xE9: 'YIELD2_CHECK', 0xEA: 'CLEAR_RESET',
  0xEB: 'YIELD_CALL', 0xEC: 'COND_SET', 0xED: 'QUEUE_OBJ',
  0xEE: 'CLEAR_WINDOW', 0xEF: 'TOGGLE_FLAG', 0xF0: 'SET_POS',
  0xF1: 'LOAD_SPRITE', 0xF2: 'SET_MODE', 0xF3: 'VAR_LEN',
  0xF4: 'SUB_DISPATCH', 0xF5: 'SUB_DISPATCH2', 0xF6: 'CALL_FA8',
  0xF7: 'TOGGLE_BANK', 0xF8: 'VAR_DATA', 0xF9: 'CALL_8AF7',
  0xFA: 'CALL_8AF7B', 0xFB: 'CALL_9085', 0xFC: 'ADVANCE_PTR',
  0xFD: 'YIELD_FA8', 0xFE: 'SET_PTR', 0xFF: 'END',
};

const WAIT_FRAMES = {
  0xD8: 1, 0xD9: 10, 0xDA: 20, 0xDB: 40,
  0xDC: 60, 0xDD: 80, 0xDE: 120, 0xDF: 240,
};

// ── 字符映射表 (内联, 与 char-map.ts 保持一致) ──
const CHAR_MAP_SINGLE = {
  0x00: ' ', 0x01: '·',
  0x02: '0', 0x03: '1', 0x04: '2', 0x05: '3', 0x06: '4', 0x07: '5',
  0x08: '6', 0x09: '7', 0x0A: '8', 0x0B: '9',
  0x0C: 'ア', 0x0D: 'イ', 0x0E: 'ウ', 0x0F: 'エ', 0x10: 'オ',
  0x11: 'カ', 0x12: 'キ', 0x13: 'ク', 0x14: 'ケ', 0x15: 'コ',
  0x16: 'サ', 0x17: 'シ', 0x18: 'ス', 0x19: 'セ', 0x1A: 'ソ',
  0x1B: 'タ', 0x1C: 'チ', 0x1D: 'ツ', 0x1E: 'テ', 0x1F: 'ト',
  0x20: ' ', 0x21: '!', 0x22: '"', 0x23: '#', 0x24: '$', 0x25: '%',
  0x26: '&', 0x27: "'", 0x28: '(', 0x29: ')', 0x2A: '*', 0x2B: '+',
  0x2C: ',', 0x2D: '-', 0x2E: '.', 0x2F: '/',
  0x41: 'A', 0x42: 'B', 0x43: 'C', 0x44: 'D', 0x45: 'E', 0x46: 'F',
  0x47: 'G', 0x48: 'H', 0x49: 'I', 0x4A: 'J', 0x4B: 'K', 0x4C: 'L',
  0x4D: 'M', 0x4E: 'N', 0x4F: 'O', 0x50: 'P', 0x51: 'Q', 0x52: 'R',
  0x53: 'S', 0x54: 'T', 0x55: 'U', 0x56: 'V', 0x57: 'W', 0x58: 'X',
  0x59: 'Y', 0x5A: 'Z',
};

function decodeText(bytes) {
  let result = '';
  for (const b of bytes) {
    if (b < 0xA0) {
      result += CHAR_MAP_SINGLE[b] ?? `[${b.toString(16).padStart(2, '0').toUpperCase()}]`;
    } else if (b <= 0xD7) {
      result += `「${b.toString(16).padStart(2, '0').toUpperCase()}」`;
    } else {
      result += `[${b.toString(16).padStart(2, '0').toUpperCase()}]`;
    }
  }
  return result;
}

// ── 解析单个脚本 ──
function parseScript(scriptId) {
  const { bank, addr, bankOffset } = getScriptEntry(scriptId);
  const result = {
    id: scriptId,
    idHex: '0x' + scriptId.toString(16).padStart(2, '0').toUpperCase(),
    bank,
    entryAddr: '$' + addr.toString(16).padStart(4, '0').toUpperCase(),
    blocks: [],
  };

  const visited = new Set();
  const queue = [{ bank, offset: bankOffset, label: 'entry' }];
  let maxIterations = 100;

  while (queue.length > 0 && maxIterations-- > 0) {
    const { bank: bk, offset, label } = queue.shift();
    const key = `${bk}:${offset}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const block = parseBlock(bk, offset, label, queue);
    result.blocks.push(block);
  }

  return result;
}

function parseBlock(bank, startOffset, label, queue) {
  const block = {
    label,
    bank,
    startOffset,
    startAddr: '$' + (0xA000 + startOffset).toString(16).padStart(4, '0').toUpperCase(),
    instructions: [],
  };

  let pos = startOffset;
  let maxBytes = 0x2000;
  let textBuffer = [];
  let textStartOffset = -1;

  function flushText() {
    if (textBuffer.length > 0) {
      block.instructions.push({
        type: 'TEXT',
        offset: textStartOffset,
        addr: '$' + (0xA000 + textStartOffset).toString(16).padStart(4, '0').toUpperCase(),
        bytes: [...textBuffer],
        text: decodeText(textBuffer),
      });
      textBuffer = [];
      textStartOffset = -1;
    }
  }

  while (pos < startOffset + maxBytes && pos < BANKS[bank].length) {
    const op = readByte(bank, pos);
    if (op < 0) break;

    // 文本字符 ($00-$D7)
    if (op < 0xD8) {
      if (textBuffer.length === 0) textStartOffset = pos;
      textBuffer.push(op);
      pos++;
      continue;
    }

    flushText();

    // 等待帧 ($D8-$DF)
    if (op < 0xE0) {
      block.instructions.push({
        type: 'WAIT',
        offset: pos,
        addr: '$' + (0xA000 + pos).toString(16).padStart(4, '0').toUpperCase(),
        opcode: op,
        frames: WAIT_FRAMES[op] || 0,
        text: `WAIT ${WAIT_FRAMES[op] || 0}帧`,
      });
      pos++;
      continue;
    }

    // 文本格式控制 ($E0-$E7)
    if (op < 0xE8) {
      block.instructions.push({
        type: 'TEXT_CTRL',
        offset: pos,
        addr: '$' + (0xA000 + pos).toString(16).padStart(4, '0').toUpperCase(),
        opcode: op,
        text: `CTRL_E${(op - 0xE0).toString(16).toUpperCase()}`,
      });
      pos++;
      continue;
    }

    // 长指令 ($E8-$FF)
    const paramLen = LONG_INSTR_PARAMS[op];
    const mnemonic = LONG_INSTR_MNEMONIC[op] || `UNK_${op.toString(16).toUpperCase()}`;

    if (paramLen === undefined) {
      block.instructions.push({
        type: 'UNKNOWN',
        offset: pos,
        addr: '$' + (0xA000 + pos).toString(16).padStart(4, '0').toUpperCase(),
        opcode: op,
        text: `UNKNOWN $${op.toString(16).toUpperCase()}`,
      });
      break;
    }

    const instr = {
      type: 'LONG_INSTR',
      offset: pos,
      addr: '$' + (0xA000 + pos).toString(16).padStart(4, '0').toUpperCase(),
      opcode: op,
      mnemonic,
      params: [],
      text: '',
    };

    // 变长指令处理
    if (paramLen === -1) {
      const p1 = readByte(bank, pos + 1);
      if (p1 === 0xFF) {
        instr.params = [p1, readByte(bank, pos + 2), readByte(bank, pos + 3)];
        instr.text = `${mnemonic} $FF $${instr.params[1].toString(16).padStart(2,'0').toUpperCase()} $${instr.params[2].toString(16).padStart(2,'0').toUpperCase()}`;
        pos += 4;
      } else {
        instr.params = [p1];
        instr.text = `${mnemonic} $${p1.toString(16).padStart(2,'0').toUpperCase()}`;
        pos += 2;
      }
      block.instructions.push(instr);
      continue;
    }

    if (paramLen === -2 || paramLen === -3) {
      const p1 = readByte(bank, pos + 1);
      instr.params = [p1];
      if (paramLen === -3 && p1 === 0x01) {
        const p2 = readByte(bank, pos + 2);
        instr.params.push(p2);
        instr.text = `${mnemonic} sub=$01 $${p2.toString(16).padStart(2,'0').toUpperCase()}`;
        pos += 3;
      } else if (paramLen === -3 && (p1 === 0x10 || p1 === 0x11)) {
        instr.text = `${mnemonic} sub=$${p1.toString(16).padStart(2,'0').toUpperCase()} (循环)`;
        block.instructions.push(instr);
        break;
      } else {
        instr.text = `${mnemonic} $${p1.toString(16).padStart(2,'0').toUpperCase()}`;
        pos += 2;
      }
      block.instructions.push(instr);
      continue;
    }

    // 固定长度参数
    for (let i = 0; i < paramLen; i++) {
      instr.params.push(readByte(bank, pos + 1 + i));
    }

    if (op === 0xFE && paramLen === 2) {
      const targetAddr = (instr.params[1] << 8) | instr.params[0];
      instr.text = `${mnemonic} $${targetAddr.toString(16).padStart(4,'0').toUpperCase()} (跳转)`;
      if (targetAddr >= 0xA000 && targetAddr < 0xC000) {
        queue.push({ bank, offset: targetAddr - 0xA000, label: `setptr_$${targetAddr.toString(16).toUpperCase()}` });
      }
    } else if (op === 0xF0 && paramLen === 2) {
      instr.text = `${mnemonic} x=$${instr.params[0].toString(16).padStart(2,'0').toUpperCase()} y=$${instr.params[1].toString(16).padStart(2,'0').toUpperCase()}`;
    } else if (paramLen > 0) {
      instr.text = `${mnemonic} ${instr.params.map(p => '$' + p.toString(16).padStart(2,'0').toUpperCase()).join(' ')}`;
    } else {
      instr.text = mnemonic;
    }

    block.instructions.push(instr);
    pos += 1 + paramLen;

    if (op === 0xFF || op === 0xFE) break;
  }

  flushText();
  return block;
}

// ── 主程序: 按 bank 分割输出 TypeScript 模块 ──
const scriptsByBank = { 3: [], 4: [], 5: [], 6: [] };
for (let id = 0; id < 0xFF; id++) {
  try {
    const script = parseScript(id);
    const bank = getScriptBank(id);
    scriptsByBank[bank].push(script);
  } catch (e) {
    const bank = getScriptBank(id);
    scriptsByBank[bank].push({ id, idHex: '0x' + id.toString(16).padStart(2,'0').toUpperCase(), error: e.message });
  }
}

// 输出到 4 个 TS 文件 (bank 3-6) — 紧凑格式: 每个脚本单行 JSON, 控制行数 < 1000
const outDir = path.resolve(__dirname, '../src/data/tile/textscript');
const bankRanges = {
  3: '0x00-0x0F',
  4: '0x10-0x1F',
  5: '0x20-0x5F',
  6: '0x60-0xFE',
};

for (const bank of [3, 4, 5, 6]) {
  const scripts = scriptsByBank[bank];
  const bankId = bank.toString().padStart(2, '0');
  const range = bankRanges[bank];
  // 每个脚本输出为单行 JSON, 避免文件行数爆炸 (符合 1000 行代码规范)
  const lines = scripts.map(s => '  ' + JSON.stringify(s));
  const content =
    `/** PRG Bank ${bank} 脚本数据 (ID ${range}) — 由 generate_script_data.cjs 自动生成, 禁止手改 */\n` +
    `export const SCRIPTS_BANK_${bankId}: readonly any[] = [\n` +
    lines.join(',\n') + '\n];\n';
  const outPath = path.join(outDir, `scripts-bank-${bankId}.ts`);
  fs.writeFileSync(outPath, content, 'utf-8');
  const lineCount = content.split('\n').length;
  console.error(`写入 ${outPath} (${scripts.length} 个脚本, ${lineCount} 行)`);
}
console.error('完成');
