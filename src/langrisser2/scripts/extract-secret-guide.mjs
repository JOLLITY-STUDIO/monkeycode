/**
 * extract-secret-guide.mjs (v1)
 * 第一版隐藏攻略提取 — 从 ROM unit 部署数据中提取道具/特殊标志
 * 直接从 unit struct (+0x17 flag, +0x21 itemId) 提取，未做坐标验证
 *
 * 重要发现: 道具 ID 不在 ROM 的 unit 部署数据中 (deploy struct ≠ RAM unit struct)
 * ROM deploy struct 只有 classId/cmdId/坐标/faction，道具在运行时初始化时赋值
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

console.log('=== Unit Deploy Struct Extraction (v1 — raw) ===\n');
console.log('Note: Deploy struct (ROM) is NOT the same as RAM unit struct.');
console.log('Item/flag fields (+0x17, +0x21) are in RAM struct and may not appear here.\n');

for (let level = 0; level < 31; level++) {
  const sid = level + 1;
  const name = STAGE_NAMES[sid] || `Scenario ${sid}`;
  
  const cfgPtr = readU32(0x18005E + level * 4) & 0xFFFFFF;
  const ulPtr = cfgPtr ? readU32(cfgPtr + 0x0C) & 0xFFFFFF : 0;
  
  if (!ulPtr || ulPtr >= rom.length) continue;
  
  const units = [];
  let off = 0;
  while (ulPtr + off + 0x1E <= rom.length) {
    const a = ulPtr + off;
    const cls = rom[a + 0x1B], cmd = rom[a + 0x1A];
    if (cls === 0xFF && cmd === 0xFF) break;
    
    const x = rom[a + 0x18], y = rom[a + 0x19];
    const attr2 = readU32(a + 0x08);
    const hp = readU16(a + 0x02);
    const faction = (attr2 & 1) ? 'player' : (attr2 & 2) ? 'npc' : 'enemy';
    
    // These field offsets are from RAM unit struct, NOT deploy struct
    const flag17 = rom[a + 0x17] || 0;
    const item21 = rom[a + 0x21] || 0;
    
    if (flag17 !== 0 || item21 !== 0) {
      units.push({ cls, cmd, x, y, faction, hp, flag17, item21 });
    }
    off += 0x1E;
  }
  
  if (units.length > 0) {
    console.log(`Stage ${sid} — ${name}`);
    for (const u of units) {
      console.log(`  [${u.faction}] cls=0x${u.cls.toString(16).padStart(2,'0')} cmd=0x${u.cmd.toString(16).padStart(2,'0')}` +
        ` (${u.x},${u.y}) HP=${u.hp} flag17=0x${u.flag17.toString(16)} item21=0x${u.item21.toString(16)}`);
    }
  }
}

console.log('\n=== Conclusion ===');
console.log('The deploy struct at ROM config → unitList does NOT carry item/flag data.');
console.log('Item data is populated at runtime during stage initialization.');
