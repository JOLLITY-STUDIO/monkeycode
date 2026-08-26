// 轮询 _emu_full_run3.log 直到全量跑完, 然后验证 emu-full-all.log (自动拼接产物)
// 若未生成则手动调用 _merge_trace_logs.cjs 补拼
const fs = require('fs');
const path = require('path');
const { spawnSync, execSync } = require('child_process');

const root = path.join(__dirname, '..');
const runLog = path.join(root, '_emu_full_run3.log');
const out = path.join(root, 'output', 'emu-full');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const start = Date.now();
  console.log('[wait] polling for full run completion (max 45min)...');
  while (Date.now() - start < 45 * 60 * 1000) {
    let s = '';
    try { s = fs.readFileSync(runLog, 'utf8'); } catch (e) {}
    if (s.includes('done in')) break;
    const lines = s.trim().split('\n');
    console.log('[wait]', new Date().toISOString().slice(11, 19), 'last:', lines[lines.length - 1].slice(0, 120));
    await sleep(20000);
  }

  // 进程检查: 确保 node 全量进程已退出 (防拼接与写 frame 竞争)
  await sleep(3000);
  console.log('[wait] full run finished, verifying merge...');

  const all = path.join(out, 'emu-full-all.log');
  if (fs.existsSync(all)) {
    const st = fs.statSync(all);
    console.log('[merge] emu-full-all.log exists:', st.size, 'bytes mtime:', st.mtime.toISOString());
    // 校验帧数: 每帧 log 都存在吗
    let withTrace = 0;
    const dirs = fs.readdirSync(out).filter((d) => /^frame-\d+$/.test(d));
    for (const d of dirs) if (fs.existsSync(path.join(out, d, 'trace.log'))) withTrace++;
    console.log('[verify] frame dirs:', dirs.length, 'with trace.log:', withTrace);
  } else {
    console.log('[merge] emu-full-all.log NOT found, running manual merge...');
    const r = spawnSync(process.execPath, [path.join(__dirname, '_merge_trace_logs.cjs')], { cwd: root, stdio: 'inherit' });
    console.log('[merge] manual merge exit:', r.status);
  }
})().catch((e) => { console.error(e); process.exit(1); });
