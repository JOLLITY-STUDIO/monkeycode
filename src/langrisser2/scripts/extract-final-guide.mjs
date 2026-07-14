/**
 * extract-final-guide.mjs
 * 生成最终攻略文档：地图 + 单位 + Boss（可靠数据）
 * 标注已确认和未确认的隐藏要素位置
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rom = readFileSync(join(__dirname, '..', '20260713', 'Langrisser II (Japan)_68K-gens-rom-dump.bin'));
const readU32 = (addr) => ((rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]) >>> 0;
const readU16 = (addr) => ((rom[addr] << 8) | rom[addr + 1]);

const STAGE_NAMES = {
  1:'序章', 2:'旅立ち', 3:'ゾルムの戦い', 4:'光の神殿', 5:'狼の群れ',
  6:'古城の戦い', 7:'死霊の森', 8:'橋上の決戦', 9:'カミカゼ特攻',
  10:'雷竜の谷', 11:'炎の中で', 12:'圣剣の守護者', 13:'港の攻防',
  14:'激流', 15:'魔窟', 16:'復活の呪文', 17:'悲しみの追跡者',
  18:'魔族の森', 19:'帝国の逆襲', 20:'紅海の攻防',
  21:'アルテミュラの砦', 22:'決戦の地', 23:'封印を解くもの',
  24:'光と闇', 25:'大陸最强の敌', 26:'伝説の始まり', 27:'最终决戦',
  28:'?1 筋肉の神殿', 29:'?2 闇の力', 30:'?3 真·邪神', 31:'?4 神々の戦い',
};

// Unique SCENARIO_CONFIG template analysis
const templateNames = {
  [0x8223A]: '默认模板A (主线通用)',
  [0x822BA]: '模板B (Stage4/12)',
  [0x8233A]: '模板C (Stage11)',
  [0x823BA]: '模板D (Stage22)',
  [0x8243A]: '模板E (Stage25/27/29/31)',
  [0x824BA]: '模板F (隐藏关卡)',
};

let md = `# Langrisser II 完整关卡攻略
> ROM 提取 | ${new Date().toISOString().split('T')[0]}
> 
> **数据来源**: Langrisser II (Japan) — 原始 ROM (无版本号)
> 
> ## 提取说明
> - ✅ **地图 tiles & 属性**: ROM 0x61CB0 / 0x061D2C / 0x061E24 — 完全可靠
> - ✅ **单位配置**: ROM 0x18005E → unit list (classId / commanderId / 坐标 / 阵营) — 完全可靠
> - ✅ **Boss 配置**: ROM 0x060600 (每关最多 4 个 boss — classId + level) — 完全可靠
> - ⚠️ **道具掉落**: 道具 ID 嵌入在 RAM unit struct (+0x17 bit2 / +0x21)，不在 ROM 部署数据中。需从 RAM dump 提取或解析 unit 初始化流程
> - ⚠️ **隐藏宝物/宝箱坐标**: 未在已解码的 ROM 表中发现独立坐标表。可能编码在地图 tile 数据或事件脚本中
> - ⚠️ **特殊对话触发条件**: 由战斗派遣函数 FUN_00894164 运行时匹配角色 ID。触发条件存储方式待确认
> - ℹ️ **SCENARIO_CONFIG (0x0821BE)**: 经 C 代码分析确认为 **faction 分屏 sprite 图形事件表**，共 6 套模板被 31 关复用，非游戏逻辑事件

---

## 数据表地址参考

| 地址 | 描述 | 结构 |
|------|------|------|
| 0x061CB0 | 地图指针表 | 31x4 bytes (map ptr) |
| 0x061E24/0x061E28 | Tile remap 表 | 31x8 bytes (2 ptrs) |
| 0x061D2C/0x061D30 | 地形属性表 | 31x8 bytes |
| 0x18005E | 场景配置指针表 | 40x4 bytes (config ptr) |
| 0x060600 | Boss 配置表 | 31x8 bytes |
| 0x0821BE | Sprite 事件数据表 | 31x4 bytes (6套模板) |
| 0x082142 | 场景标志表 | 31x8 bytes |
| 0x05E5D8 | 角色数据指针表 | 角色 struct 指针 |

## RAM 结构 (战斗中)

| 地址 | 描述 |
|------|------|
| 0xFFFF9F62 | 128B 事件数据工作区 |
| 0xFFFF9FF6 | 4B 事件活跃标志 |
| 0xFFFFA49C | 当前场景号 (word) |
| 0xFF4000 | 0x800 words 移动网格 |
| 0xFF3000 | 0x800 words 地形数据 |
| 0xFF603C | 角色 struct 数组 (20x0x60 bytes) |
| unit+0x17 | 状态标志 (bit2=持道具, bit4=隐藏, bit5=特殊, bit6=回复, bit7=无奖励) |
| unit+0x21 | 道具 ID (当 bit2 set) |

---

`;

for (let level = 0; level < 31; level++) {
  const sid = level + 1;
  const name = STAGE_NAMES[sid] || `Scenario ${sid}`;
  
  // Map
  const mapPtr = readU32(0x61CB0 + level * 4);
  const mapW = mapPtr ? readU16(mapPtr) : 0;
  const mapH = mapPtr ? readU16(mapPtr + 2) : 0;
  
  // Units
  const cfgPtr = readU32(0x18005E + level * 4) & 0xFFFFFF;
  const ulPtr = cfgPtr ? readU32(cfgPtr + 0x0C) & 0xFFFFFF : 0;
  
  const units = [];
  if (ulPtr && ulPtr < rom.length) {
    let off = 0;
    while (ulPtr + off + 0x1E <= rom.length) {
      const a = ulPtr + off;
      const cls = rom[a + 0x1B], cmd = rom[a + 0x1A];
      if (cls === 0xFF && cmd === 0xFF) break;
      const x = rom[a + 0x18], y = rom[a + 0x19];
      const attr2 = readU32(a + 0x08);
      const hp = readU16(a + 0x02);
      const lv = rom[a + 0x0D] || rom[a + 0x0F] || rom[a + 0x03] || 1;
      const isPlayer = (attr2 & 1) !== 0, isNPC = (attr2 & 2) !== 0;
      const faction = isPlayer ? 0 : isNPC ? 1 : 2;
      const isValidCoord = mapW > 0 ? (x > 0 && x < mapW && y > 0 && y < mapH) : true;
      const extraFlags = rom[a + 0x1C];
      units.push({ cls, cmd, x, y, faction, hp, lv, extraFlags, valid: isValidCoord });
      off += 0x1E;
    }
  }
  
  // Bosses
  const bossAddr = 0x060600 + level * 8;
  const bosses = [];
  for (let i = 0; i < 4; i++) {
    const bc = rom[bossAddr + i * 2];
    const bl = rom[bossAddr + i * 2 + 1];
    if (bc !== 0xFF || bl !== 0xFF) bosses.push({ classId: bc, level: bl });
  }
  
  // Event template
  const sPtr = readU32(0x0821BE + level * 4);
  const tplName = templateNames[sPtr] || `自定义 @0x${sPtr?.toString(16)}`;
  
  const playerU = units.filter(u => u.faction === 0);
  const npcU = units.filter(u => u.faction === 1);
  const enemyU = units.filter(u => u.faction === 2);
  
  md += `## ${sid}. ${name}\n`;
  md += `- 地图: **${mapW}×${mapH}** | 🎨 Sprite模板: ${tplName}\n`;
  md += `- 单位: 🔵玩家${playerU.length} 🟢NPC${npcU.length} 🔴敌军${enemyU.length} | 总计 ${units.length}\n`;
  if (bosses.length > 0) {
    const bossStrs = bosses.map(b => 'cls=0x' + b.classId.toString(16).padStart(2,'0') + ' Lv' + b.level);
    md += '- 👑 Boss: ' + bossStrs.join(' | ') + '\n';
  }
  
  // Enemy table
  if (enemyU.length > 0) {
    md += `\n### 🔴 敌军 (${enemyU.length}单位)\n`;
    md += `| # | classId | cmdId | 坐标 | Lv | HP | Extra | Boss |\n`;
    md += `|---|---|---|---|---|---|---|\n`;
    for (let i = 0; i < enemyU.length; i++) {
      const u = enemyU[i];
      const isBoss = bosses.some(b => b.classId === u.cls);
      const coord = u.valid ? `(${u.x},${u.y})` : `(${u.x},${u.y})⚠`;
      md += `| ${i+1} | 0x${u.cls.toString(16).padStart(2,'0')} | 0x${u.cmd.toString(16).padStart(2,'0')} | ${coord} | ${u.lv} | ${u.hp} | 0x${u.extraFlags.toString(16).padStart(2,'0')} | ${isBoss ? '👑' : ''} |\n`;
    }
    md += '\n';
  }
  
  // NPC table
  if (npcU.length > 0) {
    md += `### 🟢 NPC (${npcU.length}单位)\n`;
    md += `| # | classId | cmdId | 坐标 | Lv | HP | Extra |\n`;
    md += `|---|---|---|---|---|---|---|\n`;
    for (let i = 0; i < npcU.length; i++) {
      const u = npcU[i];
      const coord = u.valid ? `(${u.x},${u.y})` : `(${u.x},${u.y})⚠`;
      md += `| ${i+1} | 0x${u.cls.toString(16).padStart(2,'0')} | 0x${u.cmd.toString(16).padStart(2,'0')} | ${coord} | ${u.lv} | ${u.hp} | 0x${u.extraFlags.toString(16).padStart(2,'0')} |\n`;
    }
    md += '\n';
  }
  
  // Player table
  if (playerU.length > 0) {
    md += `### 🔵 玩家 (${playerU.length}单位)\n`;
    md += `| # | classId | cmdId | 坐标 | Lv | HP | Extra |\n`;
    md += `|---|---|---|---|---|---|---|\n`;
    for (let i = 0; i < playerU.length; i++) {
      const u = playerU[i];
      const coord = u.valid ? `(${u.x},${u.y})` : `(${u.x},${u.y})⚠`;
      md += `| ${i+1} | 0x${u.cls.toString(16).padStart(2,'0')} | 0x${u.cmd.toString(16).padStart(2,'0')} | ${coord} | ${u.lv} | ${u.hp} | 0x${u.extraFlags.toString(16).padStart(2,'0')} |\n`;
    }
    md += '\n';
  }
  
  md += '---\n\n';
}

// Hidden stages section
md += `## 隐藏关卡\n\n`;
md += `| 关卡 | 名称 | 地图 | 单位 | Boss |\n`;
md += `|------|------|------|------|------|\n`;
for (let level = 27; level < 31; level++) {
  const sid = level + 1;
  const name = STAGE_NAMES[sid] || '';
  const mapPtr = readU32(0x61CB0 + level * 4);
  const mapW = mapPtr ? readU16(mapPtr) : 0;
  const mapH = mapPtr ? readU16(mapPtr + 2) : 0;
  
  const cfgPtr = readU32(0x18005E + level * 4) & 0xFFFFFF;
  const ulPtr = cfgPtr ? readU32(cfgPtr + 0x0C) & 0xFFFFFF : 0;
  let uCount = 0;
  if (ulPtr && ulPtr < rom.length) {
    let off = 0;
    while (ulPtr + off + 0x1E <= rom.length) {
      const a = ulPtr + off;
      const cls = rom[a + 0x1B], cmd = rom[a + 0x1A];
      if (cls === 0xFF && cmd === 0xFF) break;
      uCount++;
      off += 0x1E;
    }
  }
  
  const bossAddr = 0x060600 + level * 8;
  const bossStr = [0,1,2,3].map(i => {
    const bc = rom[bossAddr + i*2], bl = rom[bossAddr + i*2 + 1];
    return (bc !== 0xFF) ? 'cls=0x' + bc.toString(16) + ' Lv' + bl : '';
  }).filter(Boolean).join(', ');
  
  md += `| ${sid} | ${name} | ${mapW}×${mapH} | ${uCount} | ${bossStr || '无'} |\n`;
}

// Post-battle item flow section
md += `
## 战斗后道具授予流程

从反编译 C 代码还原的完整链路:

\`\`\`
FUN_00893a04 (Post-battle rewards)
  ├─ 角色移动动画到敌人位置
  ├─ FUN_00013d1c (经验/金钱处理)
  ├─ FUN_008946f4 (清空候选数组 DAT_ffffa984)
  ├─ FUN_00894164 (扫描地图找出最佳攻击目标)
  │   └─ 检查角色 +0x17 bit2 flag → 是否持有道具
  └─ FUN_0089470e (授予道具/武器)
      └─ 将道具 ID 写入 DAT_ffffa6ea / DAT_ffffa630
\`\`\`

关键 RAM 结构:
- \`unit+0x17\`: 状态标志 (bit2=持道具, bit4=隐藏, bit5=特殊, bit6=回复, bit7=无EXP)
- \`unit+0x21\`: 道具 ID (0x01-0xFF)
- \`DAT_ffffa984\`: 战斗候选数组 (20×24B), 存储事件类型/伤害/坐标/攻击者/防御者指针

## 待进一步逆向的项目

1. **道具/武器名称表**: 需从 kana 表或 item id → name 映射表提取
2. **人物配对对话触发**: 由 \`FUN_00894164\` 运行时匹配，触发数据可能在 ROM 对话脚本中
3. **宝箱坐标**: 可能编码在地图 tile 中（特殊 terrain type = 宝箱），或存在独立坐标表
4. **隐藏商店/隐藏道具**: 可能与场景标志表 \`0x082142\` 相关
5. **路线分支条件**: Config 表 0x18005E 有 40 条（>31 关），多余条目为路线变体
`;

const outPath = join(__dirname, '..', 'docs', 'stage-guide.md');
writeFileSync(outPath, md, 'utf-8');
console.log(`Guide: ${outPath}`);
console.log('Done.');
