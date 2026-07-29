// verify-bank00.mjs — 三件事：提取 trace 执行流 + 分析场景转换 + 对比 bank-00 翻译
import { readFileSync, writeFileSync } from 'fs';

const LOG = 'D:/studio/games/roms/fc=nes/Captain Tsubasa II - Super Striker (Japan)/Captain Tsubasa II - Super Striker (Japan)-openning2.log';
const BANK00 = 'game-engine/banks/bank-00.ts';

// ═══════════════════════════════════════════════════════════
// PART 0: Extract bank-00 function → address mapping from source
// ═══════════════════════════════════════════════════════════
const src = readFileSync(BANK00, 'utf8');

// Find all CODE block ranges from header comments like: "✅ $8000-$8016 — ..."
const codeBlocks = [];
const blockRe = /\$\s*\$?([89ABC][0-9A-Fa-f]{3})\s*-\s*\$?([89ABC][0-9A-Fa-f]{3})\s*[—\-]\s*(.+)/g;
let bm;
while ((bm = blockRe.exec(src)) !== null) {
  const start = parseInt(bm[1], 16);
  const end = parseInt(bm[2], 16);
  const desc = bm[3].trim();
  // Find the function associated with this block
  let fnName = '(no-function)';
  const blockLines = src.split('\n');
  // Find the line in source where this block comment appears, then find the next function
  let foundBlock = false;
  for (let i = 0; i < blockLines.length; i++) {
    if (foundBlock) {
      const fm2 = blockLines[i].match(/^(export )?function (\w+)/);
      if (fm2) { fnName = fm2[2]; break; }
      // Also check for const/var function names
      const cm2 = blockLines[i].match(/^(const|var)\s+(\w+)\s*=\s*\(sys/);
      if (cm2) { fnName = cm2[2]; break; }
      if (blockLines[i].match(/^\s*(CODE_|$[89A][0-9A-F]{3})/)) break; // next block
    }
    if (blockLines[i].includes(bm[0])) foundBlock = true;
  }
  codeBlocks.push({ start, end, size: end - start + 1, fnName, desc });
}

// If the regex above didn't work, fallback to CODE_$XXXX_$YYYY markers
if (codeBlocks.length === 0) {
  const codeRe = /CODE_\$([0-9A-Fa-f]+)_\$([0-9A-Fa-f]+)/g;
  const lines2 = src.split('\n');
  let cm;
  while ((cm = codeRe.exec(src)) !== null) {
    const start = parseInt(cm[1], 16);
    const end = parseInt(cm[2], 16);
    // Find function nearby
    let fnName = '(no-fn)';
    for (let i = 0; i < lines2.length; i++) {
      if (lines2[i].includes(cm[0])) {
        for (let j = i; j < Math.min(i + 50, lines2.length); j++) {
          const fm2 = lines2[j].match(/^(export )?function (\w+)/);
          if (fm2) { fnName = fm2[2]; break; }
          if (lines2[j].includes('CODE_$')) break;
        }
        break;
      }
    }
    codeBlocks.push({ start, end, size: end - start + 1, fnName: fnName, desc: '' });
  }
}

// Find JMP table entries (sub-state dispatch from header comment)
const jmpTable = []; // {subState, targetAddr, fnName}
const jmpRe = /\$\$?27=(\d)\s*→\s*\$([0-9A-Fa-f]+)/g;
let jm;
while ((jm = jmpRe.exec(src)) !== null) {
  const subState = parseInt(jm[1], 10);
  const targetAddr = parseInt(jm[2], 16);
  // Find which function this address maps to
  let fnName = '???';
  for (const block of codeBlocks) {
    if (targetAddr >= block.start && targetAddr <= block.end) {
      fnName = block.fnName;
      break;
    }
  }
  jmpTable.push({ subState, targetAddr, fnName });
}

console.log('=== Bank-00 Code Block → Function Mapping ===');
console.log(`Total blocks: ${codeBlocks.length}`);
console.log('addr_start  addr_end   size  function');
console.log('----------  --------   ----  --------');
for (const b of codeBlocks) {
  console.log(
    `$${b.start.toString(16).padStart(4,'0').toUpperCase()}  ` +
    `- $${b.end.toString(16).padStart(4,'0').toUpperCase()}  ` +
    `${String(b.size).padStart(4)}  ${b.fnName}`
  );
}

console.log('\n=== JMP Table (Sub-State Dispatch) ===');
for (const j of jmpTable) {
  console.log(`  $27=${j.subState} → $${j.targetAddr.toString(16).padStart(4,'0').toUpperCase()} → ${j.fnName}()`);
}

// ═══════════════════════════════════════════════════════════
// PART 1: Extract bank-00 execution flow from trace
// ═══════════════════════════════════════════════════════════
const trace = readFileSync(LOG, 'utf8');
const traceLines = trace.split('\n');

// Track unique code paths (frame, uniquePC) executed in bank-00 ($00:8xxx-$00:9xxx)
const uniqueAddrs = new Set();
const executionPath = []; // [{line, frame, addr, opcode, instr}]
let prevAddr = -1;

for (let i = 0; i < traceLines.length; i++) {
  const l = traceLines[i];
  // Match: $00:XXXX where XXXX is in $8000-$9FFF
  const m = l.match(/\$00:([89][0-9A-Fa-f]{3})\b/);
  if (!m) continue;
  const addr = parseInt(m[1], 16);
  if (addr < 0x8000 || addr > 0x9FFF) continue;
  
  if (!uniqueAddrs.has(addr)) {
    uniqueAddrs.add(addr);
    const fm = l.match(/^f(\d+)/);
    const frame = fm ? parseInt(fm[1]) : 0;
    // Extract instruction
    const instrMatch = l.match(/\$00:[0-9A-Fa-f]{4}:\s+([0-9A-Fa-f ]{2,8})\s+(.+)/);
    executionPath.push({
      line: i + 1,
      frame,
      addr,
      hex: instrMatch ? instrMatch[1].trim() : '',
      instr: instrMatch ? instrMatch[2].trim() : ''
    });
  }
}

console.log('\n=== Bank-00 Unique Addresses Executed ===');
console.log(`Total unique addresses: ${uniqueAddrs.size}`);
console.log(`Address range: $${Math.min(...uniqueAddrs).toString(16).toUpperCase()} - $${Math.max(...uniqueAddrs).toString(16).toUpperCase()}`);

// Group by code block
console.log('\n=== Code Coverage by Block ===');
const visited = new Set();
for (const b of codeBlocks) {
  const blockAddrs = [];
  for (const addr of uniqueAddrs) {
    if (addr >= b.start && addr <= b.end) {
      blockAddrs.push(addr);
      visited.add(addr);
    }
  }
  const coverage = blockAddrs.length > 0 
    ? ((blockAddrs.length / b.size) * 100).toFixed(1) + '%'
    : '0%';
  const marker = blockAddrs.length > 0 ? '✅' : '❌';
  console.log(`  ${marker} $${b.start.toString(16).padStart(4,'0')} - $${b.end.toString(16).padStart(4,'0')}: ` +
    `${blockAddrs.length}/${b.size} bytes (${coverage}) → ${b.fnName}()`);
}

// Addrs not in any known block
const unvisited = [...uniqueAddrs].filter(a => !visited.has(a));
if (unvisited.length > 0) {
  console.log(`\n  ⚠️ ${unvisited.length} addresses not mapped to any CODE block:`);
  unvisited.forEach(a => console.log(`    $${a.toString(16).padStart(4,'0').toUpperCase()}`));
}

// ═══════════════════════════════════════════════════════════
// PART 2: Scene transition analysis
// ═══════════════════════════════════════════════════════════
console.log('\n========================================');
console.log('=== Scene Transition Analysis ===');
console.log('========================================');

// Find all writes to $27 (scene sub-state)
const stateChanges = [];
for (let i = 0; i < traceLines.length; i++) {
  const l = traceLines[i];
  if (/STA\s+\$0?0?27\b/.test(l)) {
    const fm = l.match(/^f(\d+)/);
    const am = l.match(/A:([0-9A-Fa-f]+)/);
    const bm = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})/);
    if (fm && am && bm) {
      stateChanges.push({
        line: i + 1,
        frame: parseInt(fm[1]),
        val: parseInt(am[1], 16),
        fromBank: bm[1],
        fromAddr: bm[2],
        raw: l.trim()
      });
    }
  }
}
console.log(`Total writes to $27 (sub-state): ${stateChanges.length}`);
if (stateChanges.length > 0) {
  stateChanges.forEach(s => {
    console.log(`  f${s.frame} #${s.line}  $${s.fromBank}:$${s.fromAddr}  STA $27 = ${s.val}`);
  });
}

// Find writes to $0628 (scene activity flag)
const sceneFlags = [];
for (let i = 0; i < traceLines.length; i++) {
  const l = traceLines[i];
  if (/STA\s+\$0628\b/.test(l)) {
    const fm = l.match(/^f(\d+)/);
    const am = l.match(/A:([0-9A-Fa-f]+)/);
    const bm = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})/);
    if (fm && am && bm) {
      sceneFlags.push({ line: i + 1, frame: parseInt(fm[1]), val: parseInt(am[1], 16), from: `${bm[1]}:${bm[2]}` });
    }
  }
}
console.log(`\nTotal writes to $0628 (scene flag): ${sceneFlags.length}`);
sceneFlags.slice(0, 30).forEach(s => console.log(`  f${s.frame} #${s.line}  $${s.from}  STA $0628 = ${s.val}`));
if (sceneFlags.length > 30) console.log(`  ... and ${sceneFlags.length - 30} more`);

// Frame reset points (where frame counter jumps backwards significantly)
console.log('\n=== Frame Reset / Scene Transition Points ===');
let lastFrame = -1;
const resets = [];
for (let i = 0; i < traceLines.length; i++) {
  const l = traceLines[i];
  const fm = l.match(/^f(\d+)/);
  if (!fm) continue;
  const frame = parseInt(fm[1]);
  if (lastFrame >= 0 && frame < lastFrame && (lastFrame - frame) > 50) {
    const bm = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})/);
    resets.push({ line: i + 1, fromFrame: lastFrame, toFrame: frame, bank: bm ? bm[1] : '?', addr: bm ? bm[2] : '?' });
  }
  lastFrame = frame;
}
console.log(`Found ${resets.length} frame resets (scene transitions):`);
resets.forEach(r => {
  console.log(`  #${r.line}  f${r.fromFrame} → f${r.toFrame}  at $${r.bank}:$${r.addr}`);
});

// ═══════════════════════════════════════════════════════════
// PART 3: Key function call graph from trace
// ═══════════════════════════════════════════════════════════
console.log('\n=== JSR → RTS Call Chain (bank-00 only) ===');
// Track JSR targets and return points
const calls = [];
for (let i = 0; i < traceLines.length; i++) {
  const l = traceLines[i];
  if (!l.includes('JSR')) continue;
  const m = l.match(/\$00:([89][0-9A-Fa-f]{3})/);
  if (!m) continue;
  const fromAddr = parseInt(m[1], 16);
  const jam = l.match(/JSR\s+\$([0-9A-Fa-f]+)/);
  if (!jam) continue;
  const toAddr = parseInt(jam[1], 16);
  
  // Only track JSR from bank-00 code area
  calls.push({ line: i + 1, from: fromAddr, to: toAddr, full: l.trim().substring(0, 140) });
}

// Group unique JSR targets
const uniqueCalls = new Map(); // toAddr → {count, fromSet, examples}
for (const c of calls) {
  if (!uniqueCalls.has(c.to)) {
    uniqueCalls.set(c.to, { count: 0, fromSet: new Set(), examples: [] });
  }
  const entry = uniqueCalls.get(c.to);
  entry.count++;
  entry.fromSet.add(c.from);
  if (entry.examples.length < 3) entry.examples.push(c);
}

console.log(`Total JSR instructions from bank-00: ${calls.length}`);
console.log(`Unique JSR targets: ${uniqueCalls.size}`);
console.log('');
console.log('Target    Count  Called from    First example');
console.log('------    -----  ------------   ------------');
const sortedCalls = [...uniqueCalls.entries()].sort((a,b) => b[1].count - a[1].count);
sortedCalls.slice(0, 40).forEach(([to, info]) => {
  const fromList = [...info.fromSet].sort((a,b)=>a-b).map(a=>'$'+a.toString(16).padStart(4,'0')).join(',');
  const eg = info.examples[0];
  console.log(`$${to.toString(16).padStart(4,'0')}    ${String(info.count).padStart(4)}  ${fromList.padEnd(40)}  #${eg.line} ${eg.full.substring(0,60)}`);
});

// ═══════════════════════════════════════════════════════════
// PART 4: Verification - which exported functions are NOT called?
// ═══════════════════════════════════════════════════════════
console.log('\n========================================');
console.log('=== Verification: Function Call Status ===');
console.log('========================================');

// Build set of addresses covered by trace
const addrSet = uniqueAddrs;

// Check each CODE block
const unreachedBlocks = [];
const partialBlocks = [];
const fullBlocks = [];

for (const b of codeBlocks) {
  const hitCount = [...addrSet].filter(a => a >= b.start && a <= b.end).length;
  if (hitCount === 0) unreachedBlocks.push(b);
  else if (hitCount < b.size) partialBlocks.push({...b, hitCount});
  else fullBlocks.push(b);
}

console.log(`\n✅ Fully reached blocks (${fullBlocks.length}):`);
fullBlocks.forEach(b => {
  console.log(`  $${b.start.toString(16).padStart(4,'0')}-$${b.end.toString(16).padStart(4,'0')} ${b.fnName}()`);
});

console.log(`\n⚠️ Partially reached blocks (${partialBlocks.length}):`);
partialBlocks.sort((a,b)=> (a.hitCount/a.size) - (b.hitCount/b.size));
partialBlocks.forEach(b => {
  const pct = ((b.hitCount / b.size) * 100).toFixed(0) + '%';
  console.log(`  $${b.start.toString(16).padStart(4,'0')}-$${b.end.toString(16).padStart(4,'0')} ${b.hitCount}/${b.size} (${pct}) ${b.fnName}()`);
});

console.log(`\n❌ NOT reached blocks (${unreachedBlocks.length}):`);
unreachedBlocks.forEach(b => {
  console.log(`  $${b.start.toString(16).padStart(4,'0')}-$${b.end.toString(16).padStart(4,'0')} ${b.fnName}()`);
});

// Summary
const totalBytes = codeBlocks.reduce((s,b) => s + b.size, 0);
const coveredBytes = codeBlocks.reduce((s,b) => {
  const hitCount = [...addrSet].filter(a => a >= b.start && a <= b.end).length;
  return s + Math.min(hitCount, b.size);
}, 0);
const uniqueAddrCount = uniqueAddrs.size;

console.log(`\n=== Overall Coverage ===`);
console.log(`Unique addresses executed: ${uniqueAddrCount}`);
console.log(`Byte coverage: ${coveredBytes}/${totalBytes} (${((coveredBytes/totalBytes)*100).toFixed(1)}%)`);
console.log(`Code blocks: ${fullBlocks.length} full / ${partialBlocks.length} partial / ${unreachedBlocks.length} unreached`);
console.log(`\nReminder: This trace covers ONLY the opening match animation,`);
console.log(`NOT the TECMO logo, title screen, or full gameplay.`);
