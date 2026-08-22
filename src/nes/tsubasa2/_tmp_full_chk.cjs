const fs = require('fs');
for (const { bank, file, asmDir, asmFiles } of [
  { bank: 19, file: 'src/game/prg/code/match/MatchSceneService.ts', asmDir: 'asm/bank19', asmFiles: ['code_main'] },
  { bank: 20, file: 'src/game/prg/code/match/MatchAuxService.ts', asmDir: 'asm/bank20', asmFiles: ['code_main', 'code_sub', 'code_data'] },
]) {
  // 收集 asm 所有代码地址 (非 .byte 行的 ; $XXXX)
  const asmCodeLines = [];
  for (const f of asmFiles) {
    const c = fs.readFileSync(`${asmDir}/${f}.s`, 'utf8');
    const lines = c.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('.byte') || trimmed.startsWith(';') || !trimmed) continue;
      const m = trimmed.match(/;\s*\$([0-9A-Fa-f]{4})/);
      if (m) {
        asmCodeLines.push({ addr: m[1].toUpperCase(), file: f, line: trimmed });
      }
    }
  }
  // TS 已提及的地址
  const ts = fs.readFileSync(file, 'utf8');
  const tsAddrs = new Set();
  for (const m of ts.matchAll(/\$([0-9A-Fa-f]{4})/g)) {
    tsAddrs.add(m[1].toUpperCase());
  }
  // 未覆盖的代码行 (按地址段分组)
  const missing = asmCodeLines.filter(l => !tsAddrs.has(l.addr));
  // 按连续地址段分组
  const groups = [];
  let curGroup = null;
  for (const l of missing) {
    const addr = parseInt(l.addr, 16);
    if (curGroup && addr === curGroup.end + 1) {
      curGroup.end = addr;
      curGroup.count++;
    } else {
      curGroup = { start: addr, end: addr, count: 1, file: l.file };
      groups.push(curGroup);
    }
  }
  console.log(`\n=== bank${bank} (${file.split('/').pop()}) ===`);
  console.log(`Total code addresses: ${asmCodeLines.length}, covered: ${asmCodeLines.length - missing.length}, missing: ${missing.length}`);
  console.log(`Missing segments (first 20):`);
  for (const g of groups.slice(0, 20)) {
    console.log(`  $${g.start.toString(16).toUpperCase().padStart(4,'0')}-$${g.end.toString(16).toUpperCase().padStart(4,'0')} (${g.count} addrs, ${g.file})`);
  }
  console.log(`Total missing segments: ${groups.length}`);
}
