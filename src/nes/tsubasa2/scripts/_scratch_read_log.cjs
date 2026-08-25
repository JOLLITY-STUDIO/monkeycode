// 把 main bundle 跑 300 帧, 但只 print key lines
global.window = global;
global.self = global;
global.document = { getElementById: () => null };
const child = require('child_process');
try {
  const out = require('fs').readFileSync('./scripts/_verify_300frame_bundle.cjs', 'utf8');
  // 直接 require main bundle (在另一个文件里 register 了 game)
  require('./scripts/_verify_300frame_bundle.cjs');
  // 然后从 globalThis 抓结果
  const lines = globalThis.__verify_log || [];
  const filtered = lines.filter(l => /scene=|frame=|score|error/i.test(l));
  console.log(filtered.slice(0, 30).join('\n'));
} catch (e) {
  console.error('error:', e.message);
}
