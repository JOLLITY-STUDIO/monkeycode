/**
 * test/audio-test.ts — AudioService 请求队列消费 + APU 寄存器写验证
 *
 * 验证点（v2：核心 a/b/c/d + 新增 Song/Command/Duration 查表）：
 *   1. playBgm(0x10) → $0700[0] = 0x10，update 后消费，LogApuTarget 收到 $4015 写
 *   2. playSe(0x32) → $0700[1] = 0x32，update 后消费
 *   3. playSe(0x31) → 停止所有 SE（写静音包络到 $07CF-$07DE）
 *   4. stopAll() → 清空队列 + $4015=0
 *   5. playDpcm(0) → $4010/$4012/$4013 写
 *   6. AudioRom 查表（frequency/duration/command 替代旧的 readBank12Byte 路径）
 *   7. SongCatalog SONGS 查表入口
 */
import { DataStore } from '../src/game/prg/data/store/DataStore';
import { AudioService } from '../src/game/prg/code/audio/AudioService';
import { LogApuTarget } from '../src/game/prg/code/audio/ApuTarget';
import { AudioRom, SONG_REQUEST_IDS } from '../src/game/prg/data/audio/audio-rom';
import { lookupSong } from '../src/game/prg/data/audio/SongCatalog';
function assert(cond, msg) {
    if (!cond) {
        console.error('FAIL:', msg);
        process.exit(1);
    }
    console.log('PASS:', msg);
}
const store = new DataStore();
store.reset();
const audio = new AudioService(store);
const apu = new LogApuTarget();
// LogApuTarget 是 ApuTarget（writeRegister）；AudioService 对接 Papu（writeReg）
// 用适配器桥接，保持测试只验证寄存器写日志
audio.attachPapu({
    writeReg: (addr, v) => apu.writeRegister(addr, v),
    clockFrameCounter: () => { },
    sampleTimer: 0,
    sampleTimerMax: 0,
    nes: { opts: {} },
});
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
// === 测试 5: AudioRom 查表（v2 替代旧的 readBank12Byte） ===
const freq0 = AudioRom.frequency(0);
assert(freq0 === 0x07F1, 'AudioRom.frequency(0) = 0x07F1（C5 频率）');
const dur0 = AudioRom.duration(0);
assert(dur0 === 0x00, 'AudioRom.duration(0) = 0x00');
const dur8 = AudioRom.duration(8);
assert(dur8 === 0x01, 'AudioRom.duration(8) = 0x01');
const cmd0 = AudioRom.command(0);
assert(cmd0 === 0x8544, 'AudioRom.command(0) = 0x8544');
// === 测试 6: SONG_REQUEST_IDS 与 SongCatalog 入口 ===
assert(SONG_REQUEST_IDS.SE_LOW === 0x32, 'SONG_REQUEST_IDS.SE_LOW = 0x32');
assert(SONG_REQUEST_IDS.BGM_LOW === 0x03, 'SONG_REQUEST_IDS.BGM_LOW = 0x03');
assert(SONG_REQUEST_IDS.SE_EXT_HIGH === 0x6F, 'SONG_REQUEST_IDS.SE_EXT_HIGH = 0x6F');
// SONGS map 当前为空（完整 105 首填充留给后续提取），lookupSong 应返回 null
assert(lookupSong(0x10) === null, 'lookupSong(0x10) 当前未注册（SONGS 等待提取脚本填充）');
assert(lookupSong(0x99) === null, 'lookupSong(0x99) 当前未注册');
console.log('\n=== 全部测试通过 ===');
console.log('APU 日志摘要:', apu.summary());
