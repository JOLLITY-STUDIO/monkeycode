import * as fs from 'fs';
import * as path from 'path';
// @ts-ignore
import PAPU from '../src/core/papu/index';
import { DataStore } from '../src/game/prg/data/store/DataStore';
import { AudioService } from '../src/game/prg/code/audio/AudioService';
import { AudioRom, SONG_REQUEST_IDS } from '../src/game/prg/data/audio/audio-rom';

const apuWrites: Array<{addr: number, val: number, frame: number}> = [];
const nes: any = {
  opts: {
    sampleRate: 44100,
    onAudioSample: (l: number, r: number) => {},
  },
};
const papu = new PAPU(nes);

const store = new DataStore();
store.reset();
const audio = new AudioService(store);
audio.attachPapu(papu as any);

const songId = SONG_REQUEST_IDS[40];
audio.playBgm(songId);

// 包装 writeReg 记录
const origWriteReg = papu.writeReg.bind(papu);
papu.writeReg = (addr: number, val: number) => {
  apuWrites.push({ addr, val, frame: -1 });
  origWriteReg(addr, val);
};

// 跑 60 帧
for (let f = 0; f < 60; f++) {
  const beforeCount = apuWrites.length;
  audio.update();
  const newWrites = apuWrites.slice(beforeCount);

  // 读通道状态（ch=4 = Pulse1）
  const ch4 = 0x0767;
  const mask = store.readByte(0x0706);
  const durLo = store.readByte(0x0707 + 4 * 4);
  const durHi = store.readByte(0x0708 + 4 * 4);
  const ptr = (store.readByte(ch4 + 1) << 8) | store.readByte(ch4);
  const freqLo = store.readByte(ch4 + 7);
  const freqHi = store.readByte(ch4 + 8);

  process.stdout.write(`帧${f}: mask=${mask.toString(16)} dur=${durLo}/${durHi} ptr=$${ptr.toString(16)} freq=$${freqLo.toString(16)},$${freqHi.toString(16)} APU写=${newWrites.length}\n`);
  if (newWrites.length > 0) {
    process.stdout.write(`  写: ${newWrites.slice(0, 8).map(w => '$' + w.addr.toString(16) + '=' + w.val.toString(16)).join(' ')}\n`);
  }
}
