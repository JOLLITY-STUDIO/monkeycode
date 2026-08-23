// 调试 BGM 命令流解析全过程
import { DataStore } from '../src/game/prg/data/store/DataStore';
import { AudioRom, SONG_REQUEST_IDS } from '../src/game/prg/data/audio/audio-rom';

const store = new DataStore();
store.reset();

const songId = SONG_REQUEST_IDS[40]; // 第 41 首 BGM
console.log('BGM ID:', '$' + songId.toString(16));

// 读 BGM 指针
const bgmPtr = AudioRom.readBgmPointer(songId);
console.log('BGM 指针:', '$' + bgmPtr.toString(16));

// 读 BGM 数据（bank7）
console.log('\nBGM 数据前 64 字节:');
for (let i = 0; i < 64; i++) {
  const b = AudioRom.readBgmData(bgmPtr + i);
  let type = '???';
  if (b < 0x80) type = `音符(低4位=${b & 0xF}, 高4位=${b >> 4})`;
  else if (b < 0xB0) type = `时值(AND3F=${b & 0x3F}→tick=${AudioRom.readBank12Byte(0x8725 + (b & 0x3F))})`;
  else if (b < 0xE0) type = `速度`;
  else type = `命令(AND1F=${b & 0x1F}→$${AudioRom.readBank12U16(0x84DA + (b & 0x1F) * 2).toString(16)})`;
  console.log(`  [${i}] 0x${b.toString(16).padStart(2, '0')} ${type}`);
}

// 模拟命令流解析
console.log('\n模拟命令流解析:');
let dataPtr = bgmPtr;
let offset = 0;

// 跳过 $00 头部
for (let i = 0; i < 64; i++) {
  const b = AudioRom.readBgmData(dataPtr + i);
  if (b >= 0x80) { offset = i; break; }
}
console.log('跳过头部，起始偏移:', offset);

let y = 0;
const startAddr = dataPtr + offset;
for (let step = 0; step < 20; step++) {
  const addr = startAddr + y;
  const b = AudioRom.readBgmData(addr);
  console.log(`\n步骤${step}: addr=$${addr.toString(16)} byte=0x${b.toString(16).padStart(2, '0')} y=${y}`);

  if (b < 0x80) {
    // 音名
    const semitone = b & 0x0F;
    const octave = (b >> 4) & 0x0F;
    if (semitone >= 0x0C) {
      console.log(`  → 休止符`);
      y++;
      continue;
    }
    const freq = AudioRom.readBank12U16(0x870D + semitone * 2);
    const hz = freq > 0 ? Math.round(1789773 / (16 * (freq + 1))) : 0;
    console.log(`  → 音名 ${semitone} 八度 ${octave} 频率=$${freq.toString(16)} (${hz}Hz)`);
    // 八度右移
    let fLo = freq & 0xFF, fHi = (freq >> 8) & 0xFF;
    for (let o = 0; o < octave; o++) {
      const carry = fHi & 1;
      fHi = (fHi >> 1) & 0x7F;
      fLo = ((fLo >> 1) | (carry << 7)) & 0xFF;
    }
    const finalHz = (fLo | (fHi << 8)) > 0 ? Math.round(1789773 / (16 * ((fLo | (fHi << 8)) + 1))) : 0;
    console.log(`  → 八度移位后: fLo=$${fLo.toString(16)} fHi=$${fHi.toString(16)} (${finalHz}Hz)`);
    y++;
    // 更新指针后退出
    break;
  } else if (b >= 0xE0) {
    // 命令
    const cmdIdx = b & 0x1F;
    const cmdAddr = AudioRom.readBank12U16(0x84DA + cmdIdx * 2);
    console.log(`  → 命令 0x${(cmdIdx | 0xE0).toString(16)} → $${cmdAddr.toString(16)}`);
    y++;
    // 简单处理：大部分命令读 1-2 个参数
    if (cmdAddr === 0x8544) {
      // 设置音符表指针，读 1 参数
      const param = AudioRom.readBgmData(startAddr + y);
      console.log(`  → 参数: 0x${param.toString(16)}`);
      y++;
    } else if (cmdAddr === 0x8641 || cmdAddr === 0x8670 || cmdAddr === 0x8681) {
      const param = AudioRom.readBgmData(startAddr + y);
      console.log(`  → 参数: 0x${param.toString(16)}`);
      y++;
    } else if (cmdAddr === 0x8585 || cmdAddr === 0x8578) {
      // CALL/JUMP 读 2 参数
      const lo = AudioRom.readBgmData(startAddr + y);
      const hi = AudioRom.readBgmData(startAddr + y + 1);
      console.log(`  → 地址: $${(lo | (hi << 8)).toString(16)}`);
      y += 2;
    }
    continue;
  } else if (b >= 0xB0) {
    // 速度，跳过 1 参数
    console.log(`  → 速度，跳过参数`);
    y++;
    continue;
  } else {
    // 时值 $80-$AF
    const durIdx = b & 0x3F;
    const tick = AudioRom.readBank12Byte(0x8725 + durIdx);
    console.log(`  → 时值 索引=${durIdx} tick=${tick}`);
    y++;
    continue;
  }
}
