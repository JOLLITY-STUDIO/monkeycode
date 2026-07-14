/**
 * extract-secret-guide-v2.mjs
 * 第二版隐藏攻略提取 — 增加了坐标验证，试图过滤掉 (255,255)/(0,0) 等死数据
 * 进一步确认: ROM deploy struct 不包含道具数据，道具在运行时分配
 *
 * 输出了 per-stage 单位详细表，标注了 extra flags (byte 0x1C)
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rom = readFileSync(join(__dirname, '..', '20260713', 'Langrisser II (Japan)_68K-gens-rom-dump.bin'));
const readU32 = (addr) => ((rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]) >>> 0;
const readU16 = (addr) => ((rom[addr] << 8) | rom[addr + 1]);

const STAGE_NAMES = {
  1: '序章', 2: '旅立ち', 3: 'ゾルムの戦い', 4: '光の神殿', 5: '狼の群れ',
  6: '古城の戦い', 7: '死霊の森', 8: '橋上の決戦', 9: 'カミカゼ特攻',
  10: '雷竜の谷', 11: '炎の中で', 12: '圣剣の守護者', 13: '港の攻防',
  14: '激流', 15: '魔窟', 16: '復活の呪文', 17: '悲しみの追跡者',
  18: '魔族の森', 19: '帝国の逆襲', 20: '紅海の攻防',
  21: 'アルテミュラの砦', 22: '決戦の地', 23: '封印を解くもの',
  24: '光と闇', 25: '大陸最强の敌', 26: '伝説の始まり', 27: '最终决戦',
  28: '?1 筋肉の神殿', 29: '?2 闇の力', 30: '?3 真·邪神', 31: '?4 神々の戦い',
};

console.log('=== Unit Analysis v2 (with coordinate validation) ===\n');

for (let level = 0; level < 31; level++) {
  const sid = level + 1;
  const name = STAGE_NAMES[sid] || `Scenario ${sid}`;
  
  // Map size for coordinate validation
  const mapPtr = readU32(0x61CB0 + level * 4);
  const mapW = mapPtr ? readU16(mapPtr) : 0;
  const mapH = mapPtr ? readU16(mapPtr + 2) : 0;
  
  const cfgPtr = readU32(0x18005E + level * 4) & 0xFFFFFF;
  const ulPtr = cfgPtr ? readU32(cfgPtr + 0x0C) & 0xFFFFFF : 0;
  
  if (!ulPtr || ulPtr >= rom.length) continue;
  
  const allUnits = [];
  let off = 0;
  while (ulPtr + off + 0x1E <= rom.length) {
    const a = ulPtr + off;
    const cls = rom[a + 0x1B], cmd = rom[a + 0x1A];
    if (cls === 0xFF && cmd === 0xFF) break;
    
    const x = rom[a + 0x18], y = rom[a + 0x19];
    const attr2 = readU32(a + 0x08);
    const hp = readU16(a + 0x02);
    const lv = rom[a + 0x0D] || rom[a + 0x0F] || rom[a + 0x03] || 1;
    const extraFlags = rom[a + 0x1C];
    
    const isPlayer = (attr2 & 1) !== 0, isNPC = (attr2 & 2) !== 0;
    const faction = isPlayer ? 'P' : isNPC ? 'N' : 'E';
    
    // Validate coordinates against map size
    const coordValid = mapW > 0 ? (x > 0 && x < mapW && y > 0 && y < mapH) : true;
    const isDeadCoord = (x === 0 && y === 0) || (x === 0xFF && y === 0xFF) || (x === 255 && y === 255);
    
    allUnits.push({ cls, cmd, x, y, hp, lv, faction, extraFlags, coordValid, isDeadCoord });
    off += 0x1E;
  }
  
  const valid = allUnits.filter(u => !u.isDeadCoord);
  const dead = allUnits.filter(u => u.isDeadCoord);
  const players = valid.filter(u => u.faction === 'P');
  const npcs = valid.filter(u => u.faction === 'N');
  const enemies = valid.filter(u => u.faction === 'E');
  
  console.log(`Stage ${sid} — ${name} | Map: ${mapW}x${mapH}`);
  console.log(`  Valid units: P:${players.length} N:${npcs.length} E:${enemies.length} | Dead coords: ${dead.length}`);
  
  // Show enemy with non-zero extraFlags (potential item/flag carriers)
  const special = allUnits.filter(u => u.extraFlags !== 0);
  if (special.length > 0) {
    console.log(`  Units with extraFlags != 0:`);
    for (const u of special) {
      const flag = u.extraFlags;
      const bits = [];
      for (let b = 0; b < 8; b++) if (flag & (1 << b)) bits.push(b);
      console.log(`    [${u.faction}] cls=0x${u.cls.toString(16).padStart(2,'0')} cmd=0x${u.cmd.toString(16).padStart(2,'0')}` +
        ` (${u.x},${u.y}) Lv${u.lv} HP=${u.hp} flags=0x${flag.toString(16).padStart(2,'0')} bits=[${bits.join(',')}]` +
        ` ${u.isDeadCoord ? '⚠DEAD' : ''}`);
    }
  }
  console.log('');
}

console.log('=== Observations ===');
console.log('1. Many (0,0) and (255,255) coordinates are placeholder/dead entries');
console.log('2. extraFlags byte at deploy struct offset 0x1C is not the same as RAM unit+0x17');
console.log('3. Conclusion: Item data lives in RAM unit struct, assigned at runtime');
console.log('4. To extract actual items: need to trace stage init functions or use RAM dump');
