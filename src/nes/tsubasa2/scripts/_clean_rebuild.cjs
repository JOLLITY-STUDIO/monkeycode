// 临时: 删除 output/emu-full 旧产物 + 重新 esbuild 打包 _emu_full.cjs (用完删除)
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const out = path.join(root, 'output', 'emu-full');

// 1. 删旧产物
if (fs.existsSync(out)) {
  fs.rmSync(out, { recursive: true, force: true });
  console.log('[clean] removed', out);
} else {
  console.log('[clean] already gone');
}

// 2. 重新打包
const r = spawnSync('npx', ['--yes', 'esbuild', 'scripts/_emu_full.ts', '--bundle', '--platform=node', '--format=cjs', '--outfile=scripts/_emu_full.cjs'], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
});
console.log('[build] esbuild exit:', r.status);

// 3. 验证
const cjs = path.join(root, 'scripts', '_emu_full.cjs');
const s = fs.readFileSync(cjs, 'utf8');
console.log('[verify] _emu_full.cjs mtime:', fs.statSync(cjs).mtime.toISOString());
console.log('[verify] has fullTraceStream:', s.includes('fullTraceStream'));
console.log('[verify] has emu-full-all:', s.includes('emu-full-all.log'));
console.log('[verify] emu-full exists:', fs.existsSync(out));
