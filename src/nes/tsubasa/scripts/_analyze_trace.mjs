import { readFileSync } from 'fs';

const t = JSON.parse(readFileSync('test_output/opening_trace.json', 'utf8'));
const g = t.trace;

// Summary by frame
let frames = {};
for (let e of g) {
  if (!frames[e.f]) frames[e.f] = { first: e.pc, last: e.pc, count: 0, uniq: new Set() };
  frames[e.f].last = e.pc;
  frames[e.f].count++;
  frames[e.f].uniq.add(e.pc);
}
let fns = Object.keys(frames);
console.log(`Total frames traced: ${fns.length}`);
console.log(`Total entries: ${g.length}`);
for (let f = 0; f < Math.min(10, fns.length); f++) {
  const fr = frames[f];
  console.log(`Frame ${f}: first=${fr.first} last=${fr.last} count=${fr.count} unique=${fr.uniq.size}`);
}

// First 100 instructions
console.log('\n--- First 100 instructions ---');
let lastPC = null;
for (let i = 0; i < Math.min(100, g.length); i++) {
  const e = g[i];
  const loop = e.pc === lastPC ? ' (LOOP)' : '';
  console.log(`  [${i}] f${e.f} ${e.pc} op=${e.op} cy=${e.cy}${loop}`);
  lastPC = e.pc;
}

// Find jump patterns (PC changes > instruction size)
console.log('\n--- Jumps/branches in first 200 ---');
let prevPC = null;
for (let i = 0; i < Math.min(200, g.length); i++) {
  const e = g[i];
  if (prevPC !== null) {
    const diff = parseInt(e.pc.slice(1), 16) - parseInt(prevPC.slice(1), 16);
    if (diff !== 2 && diff !== 3 && diff !== 1 && diff !== 4) {
      console.log(`  [${i}] JUMP: ${prevPC} -> ${e.pc} (diff=${diff})`);
    }
  }
  prevPC = e.pc;
}
