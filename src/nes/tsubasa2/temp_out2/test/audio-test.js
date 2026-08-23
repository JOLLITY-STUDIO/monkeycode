"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * test/audio-test.ts — AudioService 请求队列消费 + APU 寄存器写验证
 *
 * 验证点：
 *   1. playBgm(0x10) → $0700[0] = 0x10，update 后消费，LogApuTarget 收到 $4015 写
 *   2. playSe(0x32) → $0700[1] = 0x32，update 后消费
 *   3. playSe(0x31) → 停止所有 SE（写静音包络到 $07CF-$07DE）
 *   4. stopAll() → 清空队列 + $4015=0
 *   5. playDpcm(0) → $4010/$4012/$4013 写
 */
const DataStore_1 = require("../src/game/prg/data/store/DataStore");
const AudioService_1 = require("../src/game/prg/code/audio/AudioService");
const ApuTarget_1 = require("../src/game/prg/code/audio/ApuTarget");
const audio_rom_1 = require("../src/game/prg/data/audio/audio-rom");
function assert(cond, msg) {
    if (!cond) {
        console.error('FAIL:', msg);
        process.exit(1);
    }
    console.log('PASS:', msg);
}
const store = new DataStore_1.DataStore();
store.reset();
const audio = new AudioService_1.AudioService(store);
const apu = new ApuTarget_1.LogApuTarget();
audio.attachApu(apu);
// === 测试 1: playBgm ===
audio.playBgm(0x10);
assert(store.readByte(0x0700) === 0x10, 'playBgm 写入 $0700[0]');
apu.setFrame(0);
audio.update();
assert(store.readByte(0x0700) === 0, 'update 后 BGM 请求被消费');
assert(store.readByte(0x07FC) === 0x10, 'BGM bank 影子 $07FC 已设置');
assert(store.readByte(0x0706) === 0x07, 'BGM 启用 Pulse1+Pulse2+Triangle ($0706=0x07)');
// 应该有 $4015 写（启用 APU）
const has4015 = apu.logs.some(l => l.addr === 0x4015 && l.value === 0x0F);
assert(has4015, 'BGM 启动写 $4015=0x0F 启用 APU 通道');
apu.clear();
// === 测试 2: playSe ===
audio.playSe(0x32);
assert(store.readByte(0x0701) === 0x32, 'playSe 写入 $0700[1]');
apu.setFrame(1);
audio.update();
assert(store.readByte(0x0701) === 0, 'update 后 SE 请求被消费');
// SE 启动应标记 Noise 通道活跃
assert((store.readByte(0x0706) & 0x08) !== 0, 'SE 启动标记 Noise 通道活跃');
// === 测试 3: stopAll ===
audio.stopAll();
assert(store.readByte(0x0700) === 0, 'stopAll 清空 $0700[0]');
assert(store.readByte(0x0701) === 0, 'stopAll 清空 $0700[1]');
assert(store.readByte(0x0706) === 0, 'stopAll 清空通道活跃位');
// 检查静音包络
assert(store.readByte(0x07D0) === 0x0A, 'stopAll 写 $07D0=0x0A (音量)');
assert(store.readByte(0x07CF) === 0x19, 'stopAll 写 $07CF=0x19 (包络)');
// 应该有 $4015=0 写
const has4015Off = apu.logs.some(l => l.addr === 0x4015 && l.value === 0x00);
assert(has4015Off, 'stopAll 写 $4015=0x00 关闭 APU');
apu.clear();
// === 测试 4: playDpcm ===
audio.playDpcm(0);
const hasDpcm4010 = apu.logs.some(l => l.addr === 0x4010 && l.value === 0x0F);
const hasDpcm4012 = apu.logs.some(l => l.addr === 0x4012 && l.value === 0x00);
const hasDpcm4013 = apu.logs.some(l => l.addr === 0x4013 && l.value === 0x0C);
assert(hasDpcm4010, 'playDpcm(0) 写 $4010=0x0F');
assert(hasDpcm4012, 'playDpcm(0) 写 $4012=0x00');
assert(hasDpcm4013, 'playDpcm(0) 写 $4013=0x0C');
assert(store.readByte(0x07E8) === 0x80, 'playDpcm 设置 DPCM 标志 $07E8=0x80');
// === 测试 5: AudioRom 数据访问 ===
const bgm0 = audio_rom_1.AudioRom.readBgmPointer(0);
assert(bgm0 === 0x8892, 'AudioRom.readBgmPointer(0) = $8892');
const se0 = audio_rom_1.AudioRom.readSePointer(0);
assert(se0 === 0x8E42, 'AudioRom.readSePointer(0) = $8E42');
const dur0 = audio_rom_1.AudioRom.readNoteDuration(0);
assert(dur0 === 0x00, 'AudioRom.readNoteDuration(0) = $00');
const dur1 = audio_rom_1.AudioRom.readNoteDuration(1);
assert(dur1 === 0x01, 'AudioRom.readNoteDuration(1) = $01');
const songId1 = audio_rom_1.AudioRom.readSongRequestId(1);
assert(songId1 === 0x32, 'AudioRom.readSongRequestId(1) = $32 (第一首 SE)');
const songId41 = audio_rom_1.AudioRom.readSongRequestId(41);
assert(songId41 === 0x03, 'AudioRom.readSongRequestId(41) = $03 (第一首 BGM)');
const songId105 = audio_rom_1.AudioRom.readSongRequestId(105);
assert(songId105 === 0x6f, 'AudioRom.readSongRequestId(105) = $6F (最后一首)');
// 验证 BGM 数据在 bank7（不是 bank12）
const bgmDataBank7 = audio_rom_1.AudioRom.readBgmData(0x8892);
const bgmDataBank12 = audio_rom_1.AudioRom.readBank12Byte(0x8892);
assert(bgmDataBank7 !== bgmDataBank12, 'BGM 数据 bank7 ≠ bank12（bankswitch 验证）');
assert(bgmDataBank7 === 0x2c, 'BGM[0] 数据 bank7[0x892] = $2C（真实 BGM 乐谱）');
console.log('\n=== 全部测试通过 ===');
console.log('APU 日志摘要:', apu.summary());
