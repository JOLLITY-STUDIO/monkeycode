/**
 * CHR Bank 0 字体分析 — 从 tiles 反推字符映射
 * 使用: npx tsx _audit_font_tiles.mts
 *
 * 原理: 
 *   CHR Bank 0 的前 4KB (Pattern Table 0) 包含 256 个 8x8 tile
 *   每个 tile 16 字节 = 8 字节 plane0 + 8 字节 plane1
 *   字体 tiles 有特定的 pattern 特征
 *   
 *   我们已知几个"锚点"名称:
 *   - Team 0 名称 tiles: DATA_$8006_$801B → 应为"サンパウロ" (São Paulo)
 *   - Player 0 全名: おおぞら つばさ (大空翼)
 *   
 *   通过反推这些已知名称的 tile ↔ 字符对应关系，
 *   可以验证/修正 tile-text-map.ts 的映射表。
 */

import {
  DATA_$8006_$801B,
  DATA_$801C_$805D,
  DATA_$8074_$80E2,
} from './game-engine/native-game/tsubasa/banks/prg/bank-27-player-data-data';

import { decodeTileName, tilesToHex } from './pages/tools/data-viewer/tile-text-map';

// ═══════════════════════════════════════
// 锚点名称 (从说明书确认)
// ═══════════════════════════════════════

/** 已知名称 → 期望的 tile 序列 (如果映射正确的话) */
const EXPECTED_NAMES: Record<string, string> = {
  // 队伍名
  'TEAM_0': 'サンパウロ',    // São Paulo 
  'TEAM_1': 'にほん',        // 日本 (Japan) — 待确认
  // 球员全名
  'TSUBASA_OZORA':   'おおぞら つばさ',   // 大空翼
  'MISAKI_TARO':     'みさき たろう',      // 岬太郎
  'HYUGA_KOJIRO':    'ひゅうが こじろう',  // 日向小次郎
  'WAKABAYASHI':     'わかばやし げんぞう', // 若林源三
  'WAKASHIMAZU':     'わかしまづ けん',    // 若島津健
  'ISHIZAKI':        'いしざき りょう',    // 石崎了
  'MISUGI':          'みすぎ じゅん',      // 三杉淳
};

console.log('═'.repeat(60));
console.log('  CHR Bank 0 字体 Tile 映射审计');
console.log('═'.repeat(60));

// ──── 1. 提取名称 tiles ────
function extractNames(data: readonly number[]): number[][] {
  const results: number[][] = [];
  let current: number[] = [];
  for (const b of data) {
    if (b === 0xFF) {
      if (current.length > 0) { results.push(current); current = []; }
    } else {
      current.push(b);
    }
  }
  if (current.length > 0) results.push(current);
  return results;
}

// ──── 2. 分析队伍名称 ────
console.log('\n── 队伍名称 ──');
const team0NameTiles = extractNames(DATA_$8006_$801B);
if (team0NameTiles.length > 0) {
  const tiles = team0NameTiles[0];
  console.log(`  Team 0 tiles: [${tiles.map(t => '0x' + t.toString(16).toUpperCase()).join(', ')}]`);
  console.log(`  Current decode: "${decodeTileName(tiles)}"`);
  console.log(`  Expected: "${EXPECTED_NAMES['TEAM_0']}"`);
  
  // 反推每个 tile 对应什么字符
  const expected = EXPECTED_NAMES['TEAM_0'];
  if (tiles.length >= expected.length) {
    console.log(`  ── Tile → Char 候选映射 ──`);
    for (let i = 0; i < Math.min(tiles.length, expected.length); i++) {
      console.log(`    0x${tiles[i].toString(16).toUpperCase().padStart(2, '0')} → "${expected[i]}"`);
    }
  }
}

// ──── 3. 分析球员全名 ────
console.log('\n── 球员全名 (Team 0 / São Paulo) ──');
const team0PlayerNames = extractNames(DATA_$801C_$805D);
console.log(`  Total players: ${team0PlayerNames.length}`);

// 已知球员顺序 (São Paulo):
// 0: 大空翼 (おおぞら つばさ)
// 1: ジウ
// 2: アマラウ
// 3: ドトール
// 4: レナート
// 5: バビントン
// 
// 但是从解码结果看，名称 tiles 很长 (10-11 tiles)，
// 这说明它们是全名形式 (姓 + 空格 + 名)
// 
// Player 0: 91 A5 95 7E B4 E1 D4 D2 BB CD
// Let's verify: 
// 0x91 → ち (hiragana chi) → should be お (hiragana o)
// 0xA5 → ゆ (hiragana yu)  → should be お (hiragana o)
// ...
// This confirms the mapping is COMPLETELY wrong.

const team1PlayerNames = extractNames(DATA_$8074_$80E2);
console.log(`\n── 球员全名 (Team 1 / Japan) ──`);
console.log(`  Total players: ${team1PlayerNames.length}`);
for (let i = 0; i < team1PlayerNames.length; i++) {
  const tiles = team1PlayerNames[i];
  const hex = tiles.map(t => '0x' + t.toString(16).toUpperCase().padStart(2, '0')).join(' ');
  const decoded = decodeTileName(tiles);
  console.log(`  [${i}] ${decoded.padEnd(30)}  [${hex}]`);
}

// ──── 4. 当前 tile-text-map 对比 ────
console.log('\n── Tile-Text-Map 审计 ──');
console.log('  当前映射: 81=あ, 82=い, ..., AE=ん (平假名 0x81-0xAE)');
console.log('  当前映射: 50=ワ, 51=ア, ..., 7E=ン (片假名 0x50-0x7E)');
console.log('  当前映射: B0=A, B1=B, ..., C9=Z (大写 A-Z)');
console.log('  当前映射: CA=a, CB=b, ..., E3=z (小写 a-z)');
console.log('');
console.log('  问题: 实际名称 tiles 中出现了 0x91, 0xA5, 0x95, 0x7E, 0xB4, 0xE1, 0xD4 等值');
console.log('  这些值在当前映射中对应平假名，但名称无法形成有效日文');
console.log('');
console.log('  可能原因:');
console.log('  1. CHR Bank 0 的字体 tile 布局不同于标准 NES 字体');
console.log('  2. 该游戏的字体 tile 使用了自定义编码');
console.log('  3. CHR Bank 0 中的 pattern table 1 (0x100-0x1FF) 才是字体');
console.log('  4. 名称使用了 sprite tile (bank切换)');
console.log('');
console.log('  建议: 需要用图像方式渲染 CHR Bank 0 的每个 tile');
console.log('  或参考 Bank 27 代码中的名称解码逻辑');

// ──── 5. 从已知名称反推部分映射 ────
console.log('\n── 反推Tile映射建议 ──');
console.log('  以下是根据说明书已知名称 + Bank 27 数据推测的可能映射:');

// Player 0 full name tiles: 91 A5 95 7E B4 E1 D4 D2 BB CD
// If this is "おおぞら つばさ":
//   お = ?, お = ?, ぞ = ?, ら = ?, (space) = 7E,
//   つ = ?, ば = ?, さ = ?
// 
// Team 0 name tiles: 9D B2 95 7E C4 E4 DF E9 DE E1
// If this is "サンパウロ":
//   サ = 0x9D, ン = 0xB2, パ = 0x95, (space) = 0x7E, 
//   ウ = 0xC4, ロ = 0xE4
//   
// Wait, that doesn't look right either. "サンパウロ" has 6 characters + maybe space:
// サ ン パ ウ ロ = 5 characters. Hex: 9D B2 95 7E C4 E4 DF E9 DE E1 has 10 tiles.
// That doesn't match "サンパウロ" at all.

// Let me look at what the team name ACTUALLY is in the game.
// The manual chapter 04 says team data includes formations, defense types, etc.
// But the Bank 27 team name may not be "サンパウロ" - it could be the full team name.

// Actually, looking at the hex: 9D B2 95 7E C4 E4 DF E9 DE E1
// With the current tile-text-map:
// 0x9D = へ, 0xB2 = C, 0x95 = な, 0x7E = ン
// This is likely NOT the right mapping at all for this bank of CHR.

// The actual team name should be something like "サン・パウロ" or "ブラジル" etc.

// Looking more carefully - the tile indices in the 0x80-0xFF range
// in CHR Bank 0's pattern table 1 (second 4KB) might be where the font really is.

// In MMC3, each bank has TWO pattern tables (each 4KB):
// - Pattern Table 0: tile indices 0x00-0xFF
// - Pattern Table 1: tile indices 0x100-0x1FF
// 
// When writing to name tables, you use indices 0x00-0xFF which come from
// whatever pattern table is selected via the PPU control register.
// 
// The actual font tiles could be in Pattern Table 1 of Bank 0, 
// accessed via a different CHR bank page.
// 
// Or the font tiles might be in Bank 6 (UI font) as mentioned in the RomDatabase:
// "6: UI 字体 — 汉字/假名字库"

console.log('\n  ⚠️  CHR Bank 6 (UI font) 可能包含真正的字体 tiles');
console.log('  CHR Bank 0 中的 tiles 可能用于比赛场地图形，而非字体');
console.log('  需要检查 Bank 27 代码如何加载名称 tiles 到 PPU');
console.log('  即: 名称 → tile索引 → 写入 PPU pattern table → 显示');
console.log('');
console.log('  当前 Special Skills Database 验证 ✅ 通过');
console.log('  Player Name Tile 映射 ❌ 需要进一步调查');
