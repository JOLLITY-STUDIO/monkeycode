// ═══════════════════════════════════════════════
// Converter: raw ROM data → structured TypeScript objects
// Protocol B parser — pre-parses bytecode streams into typed structures
// 
// Usage: node _convert_protocol_b.mjs
// Output: game-engine/native-game/tsubasa/banks/prg/bank-01-protocol-b-data.ts
// ═══════════════════════════════════════════════

import fs from 'fs';

// ── Read ASM files and extract raw bytes ──
function extractBytesFromAsm(asmPath, startRomOffset, endRomOffset) {
  const content = fs.readFileSync(asmPath, 'utf8');
  const bytes = [];
  // Each data line: - D 1 - - - 0xNNNNNN 00:NNNN: XX .byte $XX
  // or similar formats
  const lines = content.split('\n');
  let inRange = false;
  for (const line of lines) {
    const m = line.match(/0x([0-9A-Fa-f]{6})\s+[0-9A-Fa-f]{2}:([0-9A-Fa-f]{4}):\s+([0-9A-Fa-f]{2})/);
    if (m) {
      const fileOff = parseInt(m[1], 16);
      const byteVal = parseInt(m[3], 16);
      if (fileOff >= startRomOffset && fileOff < endRomOffset) {
        bytes.push(byteVal);
        inRange = true;
      } else if (inRange) {
        break;
      }
    }
  }
  return bytes;
}

// Convert ASM-relative offset to file offset
function toFileOff(bankOff) {
  // bank_01 starts at file offset 0x2000 (bank 01 = second 8KB PRG bank in file)
  // Actual: bank 1 offset in the 16KB chunk
  return 0x2000 + bankOff;
}

// ── Protocol B parser ──
// Format:
//   $00: stream end
//   $E0-$FF: control codes (varying param counts based on code)
//   $01-$DF: upload packet — [count][addr_lo][addr_hi][tile × count]

const CTRL_THRESHOLD = 0xE0;

function parseProtocolB(raw) {
  const commands = [];
  let i = 0;
  
  while (i < raw.length) {
    const b = raw[i];
    
    if (b === 0x00) {
      // Terminator
      commands.push({ type: 'end' });
      i++;
      break;
    }
    
    if (b >= CTRL_THRESHOLD) {
      // Control code — read 1 param byte
      i++;
      let params = [];
      if (i < raw.length) {
        params.push(raw[i]);
        i++;
      }
      // Some controls may read more params:
      // E2 reads 2 params (X, Y position)
      // E4 reads string until terminator
      // But for immediate param count, default to 1
      // Actually looking at bank19 code:
      // E0: 1 param (state)
      // E1: 1 param (rel jump delta)
      // E2: 2 params (X, Y)
      // E3: 0 params (terminate)
      // E4: string (read until $FC/$00/$E0-FF)
      // E5: 1 param (routine)
      // E6: 1 param
      if (b === 0xE2 && i < raw.length) {
        params.push(raw[i]);
        i++;
      }
      if (b === 0xE3) {
        // terminate, no params
        params = [];
      }
      commands.push({ type: 'control', code: b, params });
      continue;
    }
    
    // Upload packet: b = count
    const count = b;
    i++;
    
    if (i + 1 >= raw.length) break;
    const addrLo = raw[i++];
    const addrHi = raw[i++];
    const addr = (addrHi << 8) | addrLo;
    
    const tiles = [];
    for (let t = 0; t < count && i < raw.length; t++) {
      tiles.push(raw[i++]);
    }
    
    commands.push({ type: 'upload', addr, tiles });
  }
  
  return commands;
}

// ── Generate TypeScript output ──
function generateTS(commands, name, comment) {
  let out = `/** ${comment} — Protocol B structured */\n`;
  out += `export const ${name}: readonly ProtocolBCommand[] = [\n`;
  
  for (const cmd of commands) {
    if (cmd.type === 'end') {
      out += `  { type: 'end' },\n`;
    } else if (cmd.type === 'upload') {
      const hexAddr = '0x' + cmd.addr.toString(16).toUpperCase().padStart(4, '0');
      const tileStr = cmd.tiles.map(t => '0x' + t.toString(16).toUpperCase().padStart(2, '0')).join(', ');
      out += `  { type: 'upload', addr: ${hexAddr}, tiles: [${tileStr}] },\n`;
    } else if (cmd.type === 'control') {
      const paramStr = cmd.params.map(p => '0x' + p.toString(16).toUpperCase().padStart(2, '0')).join(', ');
      out += `  { type: 'control', code: 0x${cmd.code.toString(16).toUpperCase().padStart(2, '0')}, params: [${paramStr}] },\n`;
    }
  }
  
  out += `];\n`;
  return out;
}

// ── Type definition header ──
const TYPE_DEF = `
// ═══════════════════════════════════════════════
// Protocol B structured data types & exports
// Auto-generated from bank_01.asm by _convert_protocol_b.mjs
// ═══════════════════════════════════════════════

export type ProtocolBPpuPacket = {
  readonly type: 'upload';
  readonly addr: number;     // PPU address (hi << 8 | lo)
  readonly tiles: readonly number[];  // tile data
};

export type ProtocolBControl = {
  readonly type: 'control';
  readonly code: number;     // $E0-$FF control opcode
  readonly params: readonly number[];  // control parameters
};

export type ProtocolBEnd = {
  readonly type: 'end';
};

export type ProtocolBCommand = ProtocolBPpuPacket | ProtocolBControl | ProtocolBEnd;

`;

// ── Main ──
const ASM_PATH = '_tmp_bzk_out/bank_01.asm';

// Define data ranges to extract
const TABLES = [
  {
    name: 'SCENE_DATA_1',
    comment: '$943D-$96DA — Scene PPU upload bytecode stream (670 bytes)',
    bankOff: 0x143D,
    size: 670,
  },
  {
    name: 'SCENE_DATA_2',
    comment: '$96DB-$99E1 — Scene PPU upload bytecode stream (775 bytes)',
    bankOff: 0x16DB,
    size: 775,
  },
  {
    name: 'TEXT_STRING_DATA',
    comment: '$9DF2-$9F14 — Text/string data with $FF terminators (291 bytes)',
    bankOff: 0x1DF2,
    size: 291,
  },
  {
    name: 'PPU_UPLOAD_DATA',
    comment: '$9F15-$9FFF — PPU upload data with $FD/$FF terminators (235 bytes)',
    bankOff: 0x1F15,
    size: 235,
  },
];

let output = TYPE_DEF;

for (const table of TABLES) {
  const fileOff = toFileOff(table.bankOff);
  const rawBytes = extractBytesFromAsm(ASM_PATH, fileOff, fileOff + table.size);
  console.log(`${table.name}: extracted ${rawBytes.length} bytes (expected ${table.size})`);
  
  if (rawBytes.length === 0) {
    console.warn(`  WARNING: No bytes extracted for ${table.name}!`);
    continue;
  }
  
  const commands = parseProtocolB(rawBytes);
  console.log(`  → ${commands.length} commands (${commands.filter(c => c.type === 'upload').length} uploads, ${commands.filter(c => c.type === 'control').length} controls)`);
  
  output += '\n';
  output += generateTS(commands, table.name, table.comment);
}

// Write output
const outPath = 'game-engine/native-game/tsubasa/banks/prg/bank-01-protocol-b-data.ts';
fs.writeFileSync(outPath, output, 'utf8');
console.log(`\n✅ Written to ${outPath}`);
