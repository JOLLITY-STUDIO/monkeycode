/**
 * 测试 SID 0x3B (opening BGM) 修复后能正确激活通道
 */
const { SidPlayer } = require('./pages/mini-audio-page/sid-player');

function testSid(id, label) {
  const player = new SidPlayer(48000);
  const loaded = player.load(id);
  const mask = player.activeMask;
  console.log(`${label} (0x${id.toString(16)}) loaded=${loaded} activeMask=${mask.toString(2).padStart(8,'0')}`);
  if (!loaded) return;

  player.start();
  const pcm = player.renderAll(600);
  const nonZero = pcm.filter(v => v !== 0).length;
  const maxVal = pcm.length > 0 ? Math.max(...pcm.map(Math.abs)) : 0;
  console.log(`  frames=600 samples=${pcm.length} nonZero=${nonZero} maxAbs=${maxVal.toFixed(4)}`);
  console.log();
}

// 测试三个 SID
testSid(0x3B, '0x3B opening BGM');
testSid(0x38, '0x38');
testSid(0x3A, '0x3A');
