const fs = require('fs');
const path = require('path');
const { NES } = require(path.resolve('../tsnes/_build/index.js'));

try {
  const nes = new NES({});
  const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
  nes.loadROM(rom);

  // 启用 trace, 只记录前 100 行, 输出到文件
  nes.enableTrace({
    outputFile: '_tmp_trace_test.log',
    maxLines: 100,
  });

  // 跑 1 帧
  nes.frame();

  nes.disableTrace();

  // 验证输出
  const out = fs.readFileSync('_tmp_trace_test.log', 'utf8');
  const lines = out.split('\n').filter(l => l.length > 0);
  console.log('Trace 输出 ' + lines.length + ' 行:');
  console.log('前 5 行:');
  lines.slice(0, 5).forEach(l => console.log('  ' + l));
  console.log('后 3 行:');
  lines.slice(-3).forEach(l => console.log('  ' + l));

  // 清理
  fs.unlinkSync('_tmp_trace_test.log');
  console.log('\n✅ Tracer 功能正常');
} catch (e) {
  console.error('ERROR:', e.message);
  console.error(e.stack);
}
