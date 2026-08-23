// 调试 AudioService 执行
import { DataStore } from '../src/game/prg/data/store/DataStore';
import { AudioService } from '../src/game/prg/code/audio/AudioService';
import { AudioRom, SONG_REQUEST_IDS } from '../src/game/prg/data/audio/audio-rom';
import { ApuPcmRendererImpl } from '../src/game/prg/code/audio/ApuPcmRenderer';
import { LogApuTarget } from '../src/game/prg/code/audio/ApuTarget';

const store = new DataStore();
store.reset();
const audio = new AudioService(store);
const renderer = new ApuPcmRendererImpl();
const logger = new LogApuTarget();

// 同时写 renderer 和 logger
audio.attachApu({
  writeRegister(addr: number, value: number): void {
    renderer.writeRegister(addr, value);
    logger.writeRegister(addr, value);
  }
});

const songId = SONG_REQUEST_IDS[40]; // 第 41 首
console.log('曲目 41, ID $' + songId.toString(16));
audio.playBgm(songId);

// 跑 10 帧，打印每帧状态
for (let f = 0; f < 10; f++) {
  logger.clear();
  logger.setFrame(f);
  audio.update();
  const samples = renderer.renderFrame();
  let maxSample = 0;
  for (let i = 0; i < samples.length; i++) {
    const a = Math.abs(samples[i]);
    if (a > maxSample) maxSample = a;
  }
  process.stdout.write(`帧${f}: $0706=${store.readByte(0x0706)} $0707=${store.readByte(0x0707)} $0709=${store.readByte(0x0709)} $070A=${store.readByte(0x070A)} 采样max=${maxSample.toFixed(3)} APU写=${logger.logs.length}\n`);
  if (logger.logs.length > 0) {
    process.stdout.write('  APU写: ' + logger.logs.slice(0, 5).map(l => '$' + l.addr.toString(16) + '=' + l.value.toString(16)).join(' ') + '\n');
  }
  // 打印通道状态块
  const p = 0x0727;
  process.stdout.write(`  通道0: ptr=$${(store.readByte(p+1)<<8|store.readByte(p)).toString(16)} vol=${store.readByte(p+5)} ctrl=${store.readByte(p+6)} freqLo=${store.readByte(p+7)} freqHi=${store.readByte(p+8)}\n`);
}
