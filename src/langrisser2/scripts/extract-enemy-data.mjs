import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ROM_PATH = path.join(ROOT, '20260713/Langrisser II (Japan).md');

const rom = fs.readFileSync(ROM_PATH);

const BOSS_TABLE_ADDR = 0x060600;
const SCENARIO_CONFIG_PTR = 0x18005E;
const CLASS_DATA_ADDR = 0x05EDDC;
const CLASS_ENTRY_SIZE = 0x1C;
const MAX_SCENARIOS = 31;

function readWord(addr) {
  return (rom[addr + 1] << 8) | rom[addr];
}

function readLong(addr) {
  return (rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3];
}

console.log('=== 1. Boss配置表 (ROM 0x060600) ===');
console.log('关数 | Boss1(class,lv) | Boss2(class,lv) | Boss3(class,lv) | Boss4(class,lv)');
console.log('-----|-----------------|-----------------|-----------------|-----------------');

for (let i = 0; i < MAX_SCENARIOS; i++) {
  const addr = BOSS_TABLE_ADDR + i * 8;
  const boss1Class = rom[addr];
  const boss1Lv = rom[addr + 1];
  const boss2Class = rom[addr + 2];
  const boss2Lv = rom[addr + 3];
  const boss3Class = rom[addr + 4];
  const boss3Lv = rom[addr + 5];
  const boss4Class = rom[addr + 6];
  const boss4Lv = rom[addr + 7];
  
  const boss1 = boss1Class !== 0xFF ? `(${boss1Class},${boss1Lv})` : '--';
  const boss2 = boss2Class !== 0xFF ? `(${boss2Class},${boss2Lv})` : '--';
  const boss3 = boss3Class !== 0xFF ? `(${boss3Class},${boss3Lv})` : '--';
  const boss4 = boss4Class !== 0xFF ? `(${boss4Class},${boss4Lv})` : '--';
  
  console.log(`${(i + 1).toString().padStart(4)} | ${boss1.padStart(15)} | ${boss2.padStart(15)} | ${boss3.padStart(15)} | ${boss4.padStart(15)}`);
}

console.log('\n\n=== 2. 职业数据表 (ROM 0x05EDDC) ===');
console.log('classId | nameOffset | HP | MP | AT | DF | MV | SK | Type | Range');
console.log('--------|-----------|----|----|----|----|----|----|------|------');

const classNames = [];
for (let i = 0; i < 128; i++) {
  const addr = CLASS_DATA_ADDR + i * CLASS_ENTRY_SIZE;
  if (addr + CLASS_ENTRY_SIZE > rom.length) break;
  
  const nameOffset = readWord(addr);
  const hp = rom[addr + 2];
  const mp = rom[addr + 3];
  const at = rom[addr + 4];
  const df = rom[addr + 5];
  const mv = rom[addr + 6];
  const sk = rom[addr + 7];
  const troopType = rom[addr + 8];
  const range = rom[addr + 9];
  
  if (hp === 0 && mp === 0 && at === 0 && df === 0) continue;
  
  classNames.push({ id: i, nameOffset });
  
  console.log(`${i.toString().padStart(8)} | 0x${nameOffset.toString(16).padStart(6)} | ${hp.toString().padStart(4)} | ${mp.toString().padStart(4)} | ${at.toString().padStart(4)} | ${df.toString().padStart(4)} | ${mv.toString().padStart(4)} | ${sk.toString().padStart(4)} | ${troopType.toString().padStart(6)} | ${range.toString().padStart(6)}`);
}

console.log('\n\n=== 3. 场景配置指针表 (ROM 0x18005E) ===');
console.log('关数 | 配置地址 | 类型');
console.log('-----|---------|------');

for (let i = 0; i < 40; i++) {
  const addr = SCENARIO_CONFIG_PTR + i * 4;
  if (addr + 4 > rom.length) break;
  
  const configAddr = readLong(addr);
  if (configAddr === 0) continue;
  
  console.log(`${(i + 1).toString().padStart(4)} | 0x${configAddr.toString(16).padStart(8)} | ?`);
}

console.log('\n\n=== 4. 解析第一关配置数据 ===');
const firstConfigAddr = readLong(SCENARIO_CONFIG_PTR);
console.log(`第一关配置地址: 0x${firstConfigAddr.toString(16)}`);

let offset = 0;
while (firstConfigAddr + offset < rom.length) {
  const byte = rom[firstConfigAddr + offset];
  if (byte === 0xFF) {
    console.log(`[0x${offset.toString(16)}] 0xFF -> END`);
    break;
  }
  
  const classId = rom[firstConfigAddr + offset];
  const cmdId = rom[firstConfigAddr + offset + 1];
  const x = rom[firstConfigAddr + offset + 2];
  const y = rom[firstConfigAddr + offset + 3];
  const faction = rom[firstConfigAddr + offset + 4];
  const attr0 = readWord(firstConfigAddr + offset + 5);
  const attr1 = readWord(firstConfigAddr + offset + 7);
  
  console.log(`[0x${offset.toString(16)}] class=${classId}, cmd=${cmdId}, pos=(${x},${y}), faction=${faction}, attr=0x${attr0.toString(16)} 0x${attr1.toString(16)}`);
  
  offset += 0x1E;
}
