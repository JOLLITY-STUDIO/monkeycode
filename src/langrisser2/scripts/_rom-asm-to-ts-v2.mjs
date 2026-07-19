/**
 * rom-asm-to-ts-v2.mjs
 * 
 * V2: Fixed-size block approach.
 * - Split 2MB ROM into 64KB blocks (32 blocks total)
 * - Classify each block as 'code' or 'data' based on majority instruction type
 * - Each block gets base64-encoded + TypeScript export
 * - Includes per-block fine-grained segment boundaries
 */
import fs from 'fs';
import readline from 'readline';

const ASM_PATH = 'd:/studio/github/monkeycode/src/langrisser2/20260713/asm/m68k/rom.asm';
const ROM_PATH = 'd:/studio/github/monkeycode/src/langrisser2/20260713/Langrisser II (Japan).md';
const OUT_DIR  = 'd:/studio/github/monkeycode/src/langrisser2/20260713/asm/m68k/output';

const BLOCK_SIZE = 0x10000; // 64KB
const TYPE_CODE = 'code';
const TYPE_DATA = 'data';

// ============================================================
// Phase 1: Parse ASM → per-block statistics + fine segments
// ============================================================

function isDataDirective(line) {
  return /^dc\.[bwl]/.test(line);
}

function isInstructionLine(line) {
  if (!line || line.startsWith(';') || line.startsWith('*') || /^org\b/i.test(line)) return false;
  if (/^dc\.[bwl]/.test(line)) return false;
  return /^\t?[a-z]+\.?[bwl]?\s/i.test(line)
      || /^\t?jmp\b/i.test(line)
      || /^\t?bra\b/i.test(line) || /^\t?bsr\b/i.test(line) || /^\t?jsr\b/i.test(line)
      || /^\t?beq\b/i.test(line) || /^\t?bne\b/i.test(line) || /^\t?bcs\b/i.test(line)
      || /^\t?bcc\b/i.test(line) || /^\t?bmi\b/i.test(line) || /^\t?bpl\b/i.test(line)
      || /^\t?bvs\b/i.test(line) || /^\t?bvc\b/i.test(line) || /^\t?bge\b/i.test(line)
      || /^\t?blt\b/i.test(line) || /^\t?bgt\b/i.test(line) || /^\t?ble\b/i.test(line)
      || /^\t?bhi\b/i.test(line) || /^\t?bls\b/i.test(line)
      || /^\t?dbra\b/i.test(line) || /^\t?dbf\b/i.test(line) || /^\t?nop\b/i.test(line)
      || /^\t?rts\b/i.test(line) || /^\t?rte\b/i.test(line) || /^\t?link\b/i.test(line)
      || /^\t?unlk\b/i.test(line);
}

function classifyLine(t) {
  // Check for label + content
  if (/^\w+:/.test(t)) {
    const after = t.replace(/^\w+:\s*/, '');
    if (!after) return null; // pure label
    if (isDataDirective(after)) return TYPE_DATA;
    if (isInstructionLine(after)) return TYPE_CODE;
  }
  if (isDataDirective(t)) return TYPE_DATA;
  if (isInstructionLine(t)) return TYPE_CODE;
  return null;
}

async function parseASM() {
  console.log('Phase 1: Parsing ASM...');
  const t0 = Date.now();

  // Total ROM is 0x200000 bytes → 32 blocks of 64KB
  const totalBlocks = Math.ceil(0x200000 / BLOCK_SIZE); // 32
  
  // Per-block: { codeBytes: N, dataBytes: N, entries: [...] }
  const blocks = [];
  for (let i = 0; i < totalBlocks; i++) {
    blocks.push({
      index: i,
      addrStart: i * BLOCK_SIZE,
      addrEnd: (i + 1) * BLOCK_SIZE,
      codeBytes: 0,
      dataBytes: 0,
      unknownBytes: 0,
    });
  }

  const rl = readline.createInterface({
    input: fs.createReadStream(ASM_PATH),
    crlfDelay: Infinity,
  });

  let currentAddr = null;
  let prevAddr = null;
  let prevType = null;
  let lineNum = 0;

  for await (const line of rl) {
    lineNum++;
    const t = line.trim();
    if (!t) continue;

    // Address comment
    const am = t.match(/^;\s*\$([0-9A-Fa-f]+)/);
    if (am) {
      currentAddr = parseInt(am[1], 16);
      continue;
    }
    if (t.startsWith(';') || /^org\b/i.test(t)) continue;

    const type = classifyLine(t);
    if (type === null || currentAddr === null) continue;

    // Count bytes: difference between this addr and next
    // For now, use prevAddr diff if available
    if (prevAddr !== null && prevType !== null) {
      const size = currentAddr - prevAddr;
      if (size > 0 && size <= 16) {
        const blockIdx = Math.floor(prevAddr / BLOCK_SIZE);
        if (blockIdx >= 0 && blockIdx < blocks.length) {
          if (prevType === TYPE_CODE) blocks[blockIdx].codeBytes += size;
          else if (prevType === TYPE_DATA) blocks[blockIdx].dataBytes += size;
        }
      }
    }

    prevAddr = currentAddr;
    prevType = type;
  }

  // Handle last entry
  if (prevAddr !== null && prevType !== null) {
    const lastSize = 0x200000 - prevAddr;
    if (lastSize > 0) {
      const blockIdx = Math.floor(prevAddr / BLOCK_SIZE);
      if (blockIdx >= 0 && blockIdx < blocks.length) {
        if (prevType === TYPE_CODE) blocks[blockIdx].codeBytes += Math.min(lastSize, BLOCK_SIZE - (prevAddr % BLOCK_SIZE));
        else blocks[blockIdx].dataBytes += Math.min(lastSize, BLOCK_SIZE - (prevAddr % BLOCK_SIZE));
      }
    }
  }

  console.log(`  Parsed ${lineNum} lines in ${Date.now()-t0}ms`);

  // Classify each block
  for (const b of blocks) {
    const total = b.codeBytes + b.dataBytes;
    b.totalClassified = total;
    b.type = b.codeBytes >= b.dataBytes ? TYPE_CODE : TYPE_DATA;
    b.ratio = total > 0 ? (b.codeBytes / total * 100) : 0;
  }

  return blocks;
}

// ============================================================
// Phase 2: Read ROM, extract per-block bytes
// ============================================================

function extractBlocks(romBuffer, blocks) {
  for (const b of blocks) {
    const start = b.addrStart;
    const end = Math.min(b.addrEnd, romBuffer.length);
    b.bytes = romBuffer.slice(start, end);
    b.b64 = Buffer.from(b.bytes).toString('base64');
    b.actualSize = end - start;
  }
  return blocks;
}

// ============================================================
// Phase 3: Output TypeScript
// ============================================================

function writeTS(blocks) {
  console.log('Phase 3: Writing TypeScript output...');
  const t0 = Date.now();
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  // === rom-blocks.ts: All blocks in one file ===
  const lines = [];
  lines.push(`/**`);
  lines.push(` * ROM Blocks - 64KB chunks with code/data classification`);
  lines.push(` * Total ROM: 2MB, ${blocks.length} blocks × 64KB`);
  lines.push(` * Decode bytes: Uint8Array.from(atob(block.b64), c => c.charCodeAt(0))`);
  lines.push(` */`);
  lines.push(``);
  lines.push(`export interface RomBlock {`);
  lines.push(`  /** ROM start address */`);
  lines.push(`  start: number;`);
  lines.push(`  /** Block index 0-${blocks.length-1} */`);
  lines.push(`  index: number;`);
  lines.push(`  /** 'code' or 'data' (based on majority of classified bytes) */`);
  lines.push(`  type: 'code' | 'data';`);
  lines.push(`  /** Percentage of code instructions in this block */`);
  lines.push(`  codeRatio: number;`);
  lines.push(`  /** Size in bytes */`);
  lines.push(`  size: number;`);
  lines.push(`  /** Base64-encoded raw bytes */`);
  lines.push(`  b64: string;`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export const ROM_BLOCKS: RomBlock[] = [`);

  for (const b of blocks) {
    const addr = b.addrStart.toString(16).toUpperCase().padStart(6, '0');
    const pctCode = b.ratio.toFixed(1);
    lines.push(`  { // Block ${b.index}: $${addr} - ${(b.codeBytes/1024).toFixed(0)}KB code / ${(b.dataBytes/1024).toFixed(0)}KB data (${pctCode}% code)`);
    lines.push(`    start: 0x${addr},`);
    lines.push(`    index: ${b.index},`);
    lines.push(`    type: '${b.type}',`);
    lines.push(`    codeRatio: ${b.ratio.toFixed(1)},`);
    lines.push(`    size: ${b.actualSize},`);

    // Split long B64 strings
    if (b.b64.length > 765) {
      const b64Chunks = b.b64.match(/.{1,255}/g);
      lines.push(`    b64: '${b64Chunks[0]}' +`);
      for (let i = 1; i < b64Chunks.length - 1; i++) {
        lines.push(`      '${b64Chunks[i]}' +`);
      }
      lines.push(`      '${b64Chunks[b64Chunks.length - 1]}',`);
    } else {
      lines.push(`    b64: '${b.b64}',`);
    }
    lines.push(`  },`);
  }
  lines.push(`];`);
  lines.push(``);

  // Helper function to decode a specific block
  lines.push(`/** Decode a ROM block to Uint8Array */`);
  lines.push(`export function decodeBlock(block: RomBlock): Uint8Array {`);
  lines.push(`  return new Uint8Array([...atob(block.b64)].map(c => c.charCodeAt(0)));`);
  lines.push(`}`);
  lines.push(``);

  // Lookup helper
  lines.push(`/** Find the block containing a given ROM address */`);
  lines.push(`export function findBlock(addr: number): RomBlock | undefined {`);
  lines.push(`  const idx = Math.floor(addr / 0x10000);`);
  lines.push(`  return ROM_BLOCKS[idx];`);
  lines.push(`}`);
  lines.push(``);

  // Read byte helper
  lines.push(`/** Read a single byte from ROM blocks */`);
  lines.push(`export function readRomByte(addr: number): number {`);
  lines.push(`  const block = findBlock(addr);`);
  lines.push(`  if (!block) return 0;`);
  lines.push(`  const offset = addr - block.start;`);
  lines.push(`  // Cache decoded blocks`);
  lines.push(`  if (!_blockCache[block.index]) _blockCache[block.index] = decodeBlock(block);`);
  lines.push(`  return _blockCache[block.index][offset];`);
  lines.push(`}`);
  lines.push(`const _blockCache: Record<number, Uint8Array> = {};`);

  fs.writeFileSync(`${OUT_DIR}/rom-blocks.ts`, lines.join('\n'), 'utf8');

  // === Summary ===
  const codeBlocks = blocks.filter(b => b.type === TYPE_CODE);
  const dataBlocks = blocks.filter(b => b.type === TYPE_DATA);
  
  const summary = [];
  summary.push(`/**`);
  summary.push(` * ROM Summary`);
  summary.push(` * Code blocks: ${codeBlocks.length} | Data blocks: ${dataBlocks.length}`);
  summary.push(` */`);
  summary.push(`export const ROM_SUMMARY = {`);
  summary.push(`  totalSize: 0x200000,`);
  summary.push(`  blockSize: 0x10000,`);
  summary.push(`  totalBlocks: ${blocks.length},`);
  summary.push(`  codeBlocks: ${codeBlocks.length},`);
  summary.push(`  dataBlocks: ${dataBlocks.length},`);
  summary.push(`  codeBlockIndices: [${codeBlocks.map(b => b.index).join(', ')}],`);
  summary.push(`  dataBlockIndices: [${dataBlocks.map(b => b.index).join(', ')}],`);
  summary.push(`};`);
  summary.push(``);

  // Also emit the classification table
  summary.push(`/** Per-block classification */`);
  summary.push(`export const BLOCK_CLASSIFICATION = {`);
  for (const b of blocks) {
    const addr = b.addrStart.toString(16).toUpperCase().padStart(6, '0');
    summary.push(`  '${addr}': { index: ${b.index}, type: '${b.type}', codePct: ${b.ratio.toFixed(1)} },`);
  }
  summary.push(`};`);

  fs.writeFileSync(`${OUT_DIR}/rom-summary.ts`, summary.join('\n'), 'utf8');

  console.log(`  Wrote rom-blocks.ts (${blocks.length} blocks)`);
  console.log(`  Wrote rom-summary.ts`);
  console.log(`  Done in ${Date.now()-t0}ms`);
}

// ============================================================
// Phase 4: Also output original fine-grained boundaries
// ============================================================

async function writeFineBoundaries() {
  console.log('Phase 4: Writing fine-grained boundaries...');
  const t0 = Date.now();

  const rl = readline.createInterface({
    input: fs.createReadStream(ASM_PATH),
    crlfDelay: Infinity,
  });

  let currentAddr = null;
  let prevAddr = null;
  let prevType = null;
  const segments = [];

  for await (const line of rl) {
    const t = line.trim();
    if (!t) continue;
    const am = t.match(/^;\s*\$([0-9A-Fa-f]+)/);
    if (am) {
      currentAddr = parseInt(am[1], 16);
      continue;
    }
    if (t.startsWith(';') || /^org\b/i.test(t)) continue;

    const type = classifyLine(t);
    if (type === null || currentAddr === null) continue;

    if (prevAddr !== null && prevType !== null && currentAddr > prevAddr) {
      segments.push({ start: prevAddr, end: currentAddr, size: currentAddr - prevAddr, type: prevType });
    }
    prevAddr = currentAddr;
    prevType = type;
  }

  // Last
  if (prevAddr !== null && prevType !== null) {
    segments.push({ start: prevAddr, end: 0x200000, size: 0x200000 - prevAddr, type: prevType });
  }

  // Merge adjacent same-type
  const merged = [];
  for (const s of segments) {
    const last = merged[merged.length - 1];
    if (last && last.type === s.type && last.end === s.start) {
      last.end = s.end;
      last.size += s.size;
    } else {
      merged.push({ ...s });
    }
  }

  // Output as boundary array
  const lines = [];
  lines.push(`/**`);
  lines.push(` * Fine-grained ROM segment boundaries (instruction-level)`);
  lines.push(` * Use for detailed address → type lookup`);
  lines.push(` */`);
  lines.push(``);
  lines.push(`export interface RomBoundary {`);
  lines.push(`  start: number;`);
  lines.push(`  end: number;`);
  lines.push(`  type: 'code' | 'data';`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export const ROM_BOUNDARIES: RomBoundary[] = [`);

  for (const s of merged) {
    lines.push(`  { start: 0x${s.start.toString(16).toUpperCase().padStart(6,'0')}, end: 0x${s.end.toString(16).toUpperCase().padStart(6,'0')}, type: '${s.type}' },`);
  }

  lines.push(`];`);
  lines.push(``);
  lines.push(`export function getTypeAt(addr: number): 'code' | 'data' {`);
  lines.push(`  // Binary search`);
  lines.push(`  let lo = 0, hi = ROM_BOUNDARIES.length - 1;`);
  lines.push(`  while (lo <= hi) {`);
  lines.push(`    const mid = (lo + hi) >>> 1;`);
  lines.push(`    const b = ROM_BOUNDARIES[mid];`);
  lines.push(`    if (addr >= b.start && addr < b.end) return b.type;`);
  lines.push(`    if (addr < b.start) hi = mid - 1;`);
  lines.push(`    else lo = mid + 1;`);
  lines.push(`  }`);
  lines.push(`  return 'data'; // default`);
  lines.push(`}`);

  fs.writeFileSync(`${OUT_DIR}/rom-boundaries.ts`, lines.join('\n'), 'utf8');
  console.log(`  Wrote rom-boundaries.ts (${merged.length} segments) in ${Date.now()-t0}ms`);
}

// ============================================================
// Main
// ============================================================

async function main() {
  console.log('=== ROM ASM → TypeScript Converter V2 (Block-based) ===\n');

  // Phase 1: Parse & classify
  const blocks = await parseASM();

  // Phase 2: Extract from ROM
  console.log('Phase 2: Reading ROM binary...');
  const romBuffer = fs.readFileSync(ROM_PATH);
  console.log(`  Read ${romBuffer.length} bytes`);
  extractBlocks(romBuffer, blocks);

  // Phase 3: Write block-based TS
  writeTS(blocks);

  // Phase 4: Write fine boundaries
  await writeFineBoundaries();

  // Final stats
  console.log('\n=== Block Classification ===');
  for (const b of blocks) {
    const addr = b.addrStart.toString(16).toUpperCase().padStart(6, '0');
    const bar = '█'.repeat(Math.round(b.ratio / 5)) + '░'.repeat(20 - Math.round(b.ratio / 5));
    console.log(`  Block ${String(b.index).padStart(2)} [$${addr}]: ${bar} ${b.type.padEnd(4)} (${b.ratio.toFixed(0)}% code, ${Math.round(b.codeBytes/1024)}KB/${Math.round(b.dataBytes/1024)}KB)`);
  }

  console.log(`\n=== Done ===`);
}

main().catch(e => { console.error(e); process.exit(1); });
