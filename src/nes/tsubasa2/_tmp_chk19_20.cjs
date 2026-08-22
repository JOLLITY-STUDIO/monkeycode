const fs = require('fs');
// bank19 asm 地址数 vs TS 提及地址数
for (const { bank, file, asmFiles } of [
  { bank: 19, file: 'src/game/prg/code/match/MatchSceneService.ts', asmFiles: ['code_main'] },
  { bank: 20, file: 'src/game/prg/code/match/MatchAuxService.ts', asmFiles: ['code_main', 'code_sub', 'code_data'] },
]) {
  // asm 地址
  const asmAddrs = new Set();
  for (const f of asmFiles) {
    const c = fs.readFileSync(`asm/bank${bank.toString().padStart(2,'0')}/${f}.s`, 'utf8');
    for (const line of c.split('\n')) {
      const m = line.match(/;\s*\$([0-9A-Fa-f]{4})/);
      if (m) asmAddrs.add(m[1].toUpperCase());
    }
  }
  // TS 提及的地址 ($XXXX)
  const ts = fs.readFileSync(file, 'utf8');
  const tsAddrs = new Set();
  for (const m of ts.matchAll(/\$([0-9A-Fa-f]{4})/g)) {
    tsAddrs.add(m[1].toUpperCase());
  }
  // 统计 TS 里的 TODO/stub
  const todoCount = (ts.match(/TODO|\/\*.*?\*\//g) || []).length;
  const stubLines = ts.split('\n').filter(l => l.includes('/* TODO') || l.includes('stub')).length;
  console.log(`bank${bank} (${file.split('/').pop()}):`);
  console.log(`  asm 地址: ${asmAddrs.size}, TS 提及: ${tsAddrs.size}, 覆盖率: ${(tsAddrs.size/asmAddrs.size*100).toFixed(1)}%`);
  console.log(`  TS 总行数: ${ts.split('\n').length}, TODO/stub 行: ${stubLines}`);
  // 找 asm 里没在 TS 里出现的地址 (前20个)
  const missing = [...asmAddrs].filter(a => !tsAddrs.has(a)).slice(0, 20);
  console.log(`  未覆盖地址 (前20): ${missing.join(', ')}`);
  console.log();
}
