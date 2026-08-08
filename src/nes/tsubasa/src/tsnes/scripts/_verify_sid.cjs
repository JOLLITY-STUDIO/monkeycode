// 直接验证 SidPlayer 的 node 脚本
const path = require('path');
require('esbuild-register/dist/node').register({
  extensions: ['.ts'],
  tsconfigRaw: JSON.stringify({
    compilerOptions: {
      target: 'ES2020',
      module: 'commonjs',
      moduleResolution: 'node',
      esModuleInterop: true,
      skipLibCheck: true,
    }
  })
});

async function main() {
  const { SidPlayer } = require('../pages/mini-audio-page/sid-player');
  
  console.log('[test] SidPlayer 加载成功');
  const player = new SidPlayer(48000);
  
  const loaded = player.load(0x3A);
  console.log('[test] 加载 SID 0x3A:', loaded);
  
  const started = player.start();
  console.log('[test] 启动:', started);
  
  // 收集前 120 帧的样本
  const samples = [];
  player.onSample = (l, r) => { samples.push((l + r) * 0.5); };
  
  const t0 = Date.now();
  for (let f = 0; f < 120; f++) {
    player.tick();
  }
  const elapsed = Date.now() - t0;
  
  console.log(`[test] 120帧: ${samples.length} samples, ${elapsed}ms`);
  console.log(`[test] 预期: ~${Math.floor(120 * 48000 / 60)} samples`);
  
  // 检查是否有非零数据
  let nonZero = 0;
  for (const s of samples) if (Math.abs(s) > 0.001) nonZero++;
  console.log(`[test] 非零样本: ${nonZero}/${samples.length}`);
}
main().catch(e => { console.error(e); process.exit(1); });
