import { readFileSync } from 'fs';
const r = JSON.parse(readFileSync('test_output/opening_jsnes_4500_trace.json', 'utf8'));

console.log('=== REFERENCE: jsNes 4500 frames ===');
console.log(`Frames: ${r.actualFrames} | Instructions: ${r.totalInstructions.toLocaleString()} | Time: ${r.elapsedSec}s`);
console.log();

console.log('--- SCENE transitions ---');
r.sceneChanges.forEach(s => 
  console.log(`  F${String(s.frame).padStart(4)}  scene=${s.scene}  4C=${s.$4C}  PC=${s.firstPC}`)
);

console.log();
console.log('--- 4C changes ---');
r['$4C_changes'].forEach(c => 
  console.log(`  F${String(c.frame).padStart(4)}  4C=${c.$4C}  scene=${c.scene}`)
);

console.log();
console.log('--- First 40 frames ---');
r.frames.slice(0, 40).forEach(f => {
  const sc = f.z4A.toString(16).padStart(2,'0') + f.z4B.toString(16).padStart(2,'0');
  console.log(`  F${String(f.frame).padStart(4)} | PC=$${f.firstPC.toString(16).toUpperCase().padStart(4,'0')} | scene=$${sc} | 4C=$${f.z4C.toString(16).padStart(2,'0')} | 27=$${f.z27.toString(16).padStart(2,'0')} | instr=${f.instrCount.toLocaleString()}`);
});

console.log();
console.log('--- Last 10 frames ---');
r.frames.slice(-10).forEach(f => {
  const sc = f.z4A.toString(16).padStart(2,'0') + f.z4B.toString(16).padStart(2,'0');
  console.log(`  F${String(f.frame).padStart(4)} | PC=$${f.firstPC.toString(16).toUpperCase().padStart(4,'0')} | scene=$${sc} | 4C=$${f.z4C.toString(16).padStart(2,'0')} | 27=$${f.z27.toString(16).padStart(2,'0')}`);
});

// 找关键节点
const valid = r.frames;
const sceneIdFirstNonZero = valid.find(f => f.z4A !== 0 || f.z4B !== 0);
const sceneIdFirst0F0F = valid.find(f => f.z4A === 0x0F && f.z4B === 0x0F);
const last0F0F = valid.filter(f => f.z4A === 0x0F && f.z4B === 0x0F);
const first4c80 = valid.find(f => f.z4C === 0x80);

console.log();
console.log('--- Key milestones ---');
if (sceneIdFirstNonZero) console.log(`  First non-0000 scene: F${sceneIdFirstNonZero.frame} (${(sceneIdFirstNonZero.frame/60).toFixed(1)}s)`);
if (sceneIdFirst0F0F) console.log(`  First 0F0F scene:     F${sceneIdFirst0F0F.frame} (${(sceneIdFirst0F0F.frame/60).toFixed(1)}s)`);
if (last0F0F.length) console.log(`  0F0F scene range:     F${last0F0F[0].frame} ~ F${last0F0F[last0F0F.length-1].frame} (${last0F0F.length} frames, ${(last0F0F.length/60).toFixed(1)}s)`);
if (first4c80) console.log(`  First 4C=80:          F${first4c80.frame} (${(first4c80.frame/60).toFixed(1)}s)`);
