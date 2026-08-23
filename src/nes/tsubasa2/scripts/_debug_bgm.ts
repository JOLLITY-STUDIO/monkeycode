import { DataStore } from '../src/game/prg/data/store/DataStore';
import { AudioRom, SONG_REQUEST_IDS } from '../src/game/prg/data/audio/audio-rom';

const store = new DataStore();
store.reset();

const songId = SONG_REQUEST_IDS[40]; // 第 41 首 = BGM
console.log('曲目 41, 请求 ID:', '$' + songId.toString(16));

// 读 BGM 指针
const bgmPtr = AudioRom.readBgmPointer(songId);
console.log('BGM 指针:', '$' + bgmPtr.toString(16));

// 读 BGM 数据（bank7）
console.log('BGM 数据前 32 字节 (bank7):');
for (let i = 0; i < 32; i++) {
  const b = AudioRom.readBgmData(bgmPtr + i);
  process.stdout.write(b.toString(16).padStart(2, '0') + ' ');
}
console.log();

// 检查 readBgmData 是否正确
console.log('readBgmData($8892):', '0x' + AudioRom.readBgmData(0x8892).toString(16));
console.log('readBank12Byte($8892):', '0x' + AudioRom.readBank12Byte(0x8892).toString(16));
console.log('BANK7_BYTES[0x892]:', '0x' + AudioRom['BANK7_BYTES' as never] as unknown as Uint8Array);

// 直接检查 bank7 数据
const bank7Data = AudioRom.readBgmData(0x8892);
console.log('bank7 $8892 =', '0x' + bank7Data.toString(16));

// 读频率表
console.log('\n频率表 $870D (bank12):');
for (let i = 0; i < 12; i++) {
  const f = AudioRom.readBank12U16(0x870D + i * 2);
  console.log('  音名[' + i + '] = $' + f.toString(16));
}

// 读时值表
console.log('\n时值表 $8725 (bank12) 前 10 条:');
for (let i = 0; i < 10; i++) {
  console.log('  [' + i + '] =', AudioRom.readBank12Byte(0x8725 + i));
}

// 读命令跳转表
console.log('\n命令跳转表 $84DA 前 5 条:');
for (let i = 0; i < 5; i++) {
  const a = AudioRom.readBank12U16(0x84DA + i * 2);
  console.log('  cmd 0x' + (i | 0xE0).toString(16) + ' → $' + a.toString(16));
}
