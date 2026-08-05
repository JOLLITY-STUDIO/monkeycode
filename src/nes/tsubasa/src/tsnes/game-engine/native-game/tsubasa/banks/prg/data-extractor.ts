/**
 * ═══════════════════════════════════════════════════════════════
 * 数据提取器 v2 — 基于 ASM 代码分析的精确数据提取
 * ═══════════════════════════════════════════════════════════════
 *
 * 关键发现 (来自 ASM $8103-$81DB, $81EB-$8291 分析):
 *   - 球员基础属性(jersey/position/stats)并非静态16字节记录
 *   - 能力值在运行时通过多级指针表 + 查表曲线动态计算
 *     ($8103: 调用 $C50C 获取队伍指针 → ×20 计算球员偏移 →
 *     读取 $A1DC/A6AD/AB65 指针表 → $C527/C536/C539 变换)
 *   - Bank 27 $8448 的 17 个 "队指针" 实际指向 bank 28 的
 *     队伍处理子程序代码(如 $A46A = `A9 FF 8D 28 06`)
 *   - $842A-$8447 是指向 bank 28 内配置数据块的指针表
 *
 * 已确认的静态数据:
 *   1. 球员属性记录 (Bank 28 $9616): playerId + 11 属性字节
 *   2. 球员名称表 (Bank 27 $801C/$8074): FF 终止的 tile 序列
 *   3. 队伍名称表 (Bank 27 $8006/$805E): FF 终止的 tile 序列
 *   4. 动画序列 (Bank 27 $8292): 13 帧序列
 *   5. 阵型数据 (Bank 28 $9460): 站位坐标
 *   6. 值曲线 (Bank 28 $9E4E): 129+63 映射值
 *
 * 待分析/待反向工程:
 *   - 球衣号码映射 (可能通过队伍名表的布局隐式关联)
 *   - 位置映射 (Bank 28 代码动态决定)
 *   - 基础能力值 (通过属性 + 曲线计算得出)
 */

import {
  GameDataIndex,
  PlayerBaseRecord,
  PlayerAttributeRecord,
  PlayerAnimSequence,
  TeamRecord,
  FormationRecord,
  FormationPlayerSlot,
  Position,
  TileName,
  NameString,
  PlayerValueRow,
  FieldPositionData,
} from './data-model-schema';

import {
  DATA_$8000_$8005,
  DATA_$8006_$801B,
  DATA_$801C_$805D,
  DATA_$805E_$8073,
  DATA_$8074_$80E2,
  DATA_$80E3_$8102,
  DATA_$8292_$8429,
  DATA_$8448_$94F0,
} from './bank-27-player-data-data';

import {
  DATA_$9616_$9E4D,
  DATA_$9E4E_$9ECE,
  DATA_$9ECF_$9EFB,
  DATA_$9EFC_$9F0D,
  DATA_$9F0E_$9FB1,
  DATA_$9FB2_$9FCD,
  DATA_$9460_$95A7,
  DATA_$95A8_$95E1,
} from './bank-28-player-attrs-data';

import { PRG_BANK_29_DATA } from './bank-29-player-value-data-only';

// ═════════════════════════════════════════════════
// 辅助函数
// ═════════════════════════════════════════════════

function le16(lo: number, hi: number): number { return (hi << 8) | lo; }
function safe(arr: readonly number[], idx: number): number {
  return (idx >= 0 && idx < arr.length) ? arr[idx] : 0;
}

/** 提取 FF 终止的名称 (tile 索引列表) */
function extractNames(data: readonly number[]): NameString[] {
  const results: NameString[] = [];
  let pos = 0;
  let current: NameString = [];

  while (pos < data.length) {
    const b = data[pos];
    if (b === 0xFF) {
      if (current.length > 0) {
        results.push(current);
        current = [];
      }
    } else if (b === 0x7E || b === 0x7D) {
      // 空格 tile — 可能是名字分隔符 (如名·姓)
      current.push(b);
    } else if (b >= 0x80) {
      // Tile 索引 (>=$80 是 CHR tile)
      current.push(b);
    } else if (b >= 0x20 && b < 0x80) {
      // ASCII 可打印范围中的 tile 部分
      current.push(b);
    }
    pos++;
  }
  if (current.length > 0) results.push(current);
  return results;
}

/** 获取下一个 FF 终止的名称 */
function nextName(data: readonly number[], startPos: number): { name: NameString; endPos: number } | null {
  let pos = startPos;
  // 跳过开头 FF
  while (pos < data.length && data[pos] === 0xFF) pos++;
  if (pos >= data.length) return null;

  const name: NameString = [];
  while (pos < data.length && data[pos] !== 0xFF) {
    name.push(data[pos]);
    pos++;
  }
  return { name, endPos: pos };
}

// ═════════════════════════════════════════════════
// 1. 球员属性记录解析 (Bank 28: $9616-$9E4D)
// ═════════════════════════════════════════════════

/**
 * 格式 (每记录 12 字节):
 *   [0]:   playerId (球员 ID，同一 playerId 可出现多次，对应不同对手/场景)
 *   [1]:   attrA (rating / 进攻意识)
 *   [2]:   attrStaminaMul (体力系数)
 *   [3]:   attrDefense (防守值)
 *   [4]:   attrCharge (冲锋能力)
 *   [5]:   attrTacklePlus (拦截增强)
 *   [6]:   attrSkillActivate (技能激活)
 *   [7]:   attrMatchup (对位属性)
 *   [8]:   attrSpeedMod (速度修正)
 *   [9]:   attrStaminaMod (体能调节)
 *   [10]:  attrTechParam (技术参数)
 *   [11]:  attrLevel (综合等级)
 *
 * 实测: 2104 字节 / 12 = 175 条记录，但只有 9 个唯一 playerId (0-22)。
 * 同一球员在不同对位/场景下有多条属性记录 (类似 RPG 中角色 vs 怪物的属性变化)。
 * 用记录序号 (0-174) 作为 key，外部通过 playerId 查找时取第一条匹配。
 */
export function parseAttrRecords(): Map<number, PlayerAttributeRecord> {
  const map = new Map<number, PlayerAttributeRecord>();
  const data = DATA_$9616_$9E4D;
  const RECORD_SIZE = 12;

  for (let i = 0; i + RECORD_SIZE <= data.length; i += RECORD_SIZE) {
    const playerId = data[i];
    if (playerId === 0xFF) continue; // 填充字节

    // 检查有效数据
    let hasData = false;
    for (let j = 1; j < RECORD_SIZE; j++) {
      if (data[i + j] !== 0) { hasData = true; break; }
    }
    if (!hasData && playerId === 0) continue;

    // key: recordIndex 而非 playerId (因为同一 playerId 可出现多次)
    const recordIndex = i / RECORD_SIZE;
    map.set(recordIndex, {
      playerId,
      attrA:             safe(data, i + 1),
      attrStaminaMul:    safe(data, i + 2),
      attrDefense:       safe(data, i + 3),
      attrCharge:        safe(data, i + 4),
      attrTacklePlus:    safe(data, i + 5),
      attrSkillActivate: safe(data, i + 6),
      attrMatchup:       safe(data, i + 7),
      attrSpeedMod:      safe(data, i + 8),
      attrStaminaMod:    safe(data, i + 9),
      attrTechParam:     safe(data, i + 10),
      attrLevel:         safe(data, i + 11),
    });
  }

  return map;
}

/** 按 playerId 分组获取属性记录列表 */
export function getAttrRecordsByPlayer(
  attrs: Map<number, PlayerAttributeRecord>,
  playerId: number,
): PlayerAttributeRecord[] {
  const result: PlayerAttributeRecord[] = [];
  for (const [, attr] of attrs) {
    if (attr.playerId === playerId) result.push(attr);
  }
  return result;
}

// ═════════════════════════════════════════════════
// 2. 球员名称解析 (Bank 27)
// ═════════════════════════════════════════════════

/**
 * 球员名称按队伍分组存储:
 *   DATA_$801C_$805D: 队伍 0 球员名 (66 bytes)
 *   DATA_$8074_$80E2: 队伍 1 球员名 (111 bytes)
 *
 * 格式: FF tile1 tile2 ... tileN FF tile1 tile2 ... tileN FF ...
 */
export function parsePlayerNamesByTeam(): Map<number, NameString[]> {
  const teamNames = new Map<number, NameString[]>();

  // 队伍 0 名称 (66 bytes)
  teamNames.set(0, extractNames(DATA_$801C_$805D));
  // 队伍 1 名称 (111 bytes)
  teamNames.set(1, extractNames(DATA_$8074_$80E2));

  return teamNames;
}

/** 创建全局 playerId → NameString 映射 */
export function parsePlayerNames(teamNames: Map<number, NameString[]>): Map<number, NameString> {
  const map = new Map<number, NameString>();
  let globalId = 0;

  for (const [, names] of teamNames) {
    for (const name of names) {
      map.set(globalId, name);
      globalId++;
    }
  }

  return map;
}

// ═════════════════════════════════════════════════
// 3. 队伍记录解析 (Bank 27)
// ═════════════════════════════════════════════════

/**
 * 队伍名称表:
 *   DATA_$8006_$801B: 队伍 0 (FF 终止)
 *   DATA_$805E_$8073: 队伍 1 (FF 终止)
 *
 * 队伍指针表: DATA_$8000_$8005 (3 × LE16 指针)
 */
export function parseTeamRecords(teamPlayerNames: Map<number, NameString[]>): Map<number, TeamRecord> {
  const map = new Map<number, TeamRecord>();

  const teamNameBlocks = [DATA_$8006_$801B, DATA_$805E_$8073];

  for (let teamId = 0; teamId < teamNameBlocks.length; teamId++) {
    const names = extractNames(teamNameBlocks[teamId]);
    const name = names.length > 0 ? names[0] : [];

    const playerIds: number[] = [];
    const playerNames = teamPlayerNames.get(teamId);
    if (playerNames) {
      // 稍后关联 playerId
    }

    map.set(teamId, {
      teamId,
      name,
      shortNameTile: 0x7E,
      playerIds,
    });
  }

  return map;
}

// ═════════════════════════════════════════════════
// 4. 动画序列解析 (Bank 27: $8292-$8429)
// ═════════════════════════════════════════════════

/**
 * DATA_$8292_$8429 (408 bytes):
 *   [0-25]:   13 个 LE16 指针指向序列数据
 *   [26+]:    序列数据: [duration, tileId]* 终止于 FF
 */
export function parseAnimSequences(): Map<number, PlayerAnimSequence> {
  const map = new Map<number, PlayerAnimSequence>();
  const data = DATA_$8292_$8429;
  const NUM_SEQS = 13;

  if (data.length < NUM_SEQS * 2) return map;

  for (let seqIdx = 0; seqIdx < NUM_SEQS; seqIdx++) {
    const ptrLo = data[seqIdx * 2];
    const ptrHi = data[seqIdx * 2 + 1];
    const cpuAddr = le16(ptrLo, ptrHi);

    // 转换为 DATA_$8292_$8429 数组内偏移
    // 指针指向 $A2xx → offset = ($A2xx - $A292) within data block
    const dataStart = cpuAddr - 0xA292;
    let offset = dataStart;
    if (offset < 0) offset = 0;
    if (offset >= data.length) continue;

    const frames: Array<{ duration: number; tileId: number }> = [];
    let pos = offset;

    while (pos + 1 < data.length) {
      const duration = data[pos];
      const tileId = data[pos + 1];
      if (duration === 0xFF) break;
      if (duration === 0x00 && tileId === 0x00) break;
      frames.push({ duration, tileId });
      pos += 2;
    }

    if (frames.length > 0) {
      map.set(seqIdx, { seqId: seqIdx, frames });
    }
  }

  return map;
}

// ═════════════════════════════════════════════════
// 5. 场景球员配置解析 (Bank 28: $9460-$95A7 + $95A8-$95E1)
// ═════════════════════════════════════════════════

/**
 * DATA_$9460_$95A7 (328 bytes) + DATA_$95A8_$95E1 (58 bytes)
 *
 * 格式: [指针表: N×2 字节 LE] + [站位数据: 4 字节/站位]
 * 每站位 4 字节: [slotIndex, 能力偏移, 属性, flags]
 *   slotIndex 可为 0 (GK, 守门员)
 *   终止符: slotIndex = 0xFF 或超过最大槽位数
 *
 * ram_043B 索引 → 不同场景使用不同配置入口
 */
export function parseFormationRecords(): Map<number, FormationRecord> {
  const map = new Map<number, FormationRecord>();
  const data = DATA_$9460_$95A7;
  const MAX_FORMATIONS = 16;

  // 第一遍: 收集所有有效指针及其偏移，用于计算每个场景的边界
  const ptrList: Array<{ formIdx: number; baseOff: number }> = [];
  for (let formIdx = 0; formIdx < MAX_FORMATIONS; formIdx++) {
    const ptrOff = formIdx * 2;
    if (ptrOff + 1 >= data.length) break;
    const ptrLo = data[ptrOff];
    const ptrHi = data[ptrOff + 1];
    if (ptrLo === 0 && ptrHi === 0) continue;
    const ptr = le16(ptrLo, ptrHi);
    const baseOff = ptr - 0x9460;
    if (baseOff >= 0 && baseOff < data.length) {
      ptrList.push({ formIdx, baseOff });
    }
  }

  // 按偏移排序，每个场景的数据到下一个指针起始为止
  ptrList.sort((a, b) => a.baseOff - b.baseOff);

  for (let i = 0; i < ptrList.length; i++) {
    const { formIdx, baseOff } = ptrList[i];
    // 边界: 下一个指针的起始或数据末尾
    const endOff = i + 1 < ptrList.length ? ptrList[i + 1].baseOff : data.length;

    const positions: FormationPlayerSlot[] = [];
    let pos = baseOff;
    let slotCount = 0;

    while (pos + 3 < endOff && slotCount < 11) {
      const slotIdx = data[pos];
      if (slotIdx === 0xFF) break; // 真正终止符

      positions.push({
        slotIndex: slotIdx,
        xCoord:   safe(data, pos + 1),
        yCoord:   safe(data, pos + 2),
        flags:    safe(data, pos + 3),
      });
      pos += 4;
      slotCount++;
    }

    if (positions.length > 0) {
      map.set(formIdx, {
        formationId: formIdx,
        nameTile: 0x74,
        positions,
      });
    }
  }

  return map;
}

// ═════════════════════════════════════════════════
// 6. 值曲线解析 (Bank 28)
// ═════════════════════════════════════════════════

export function parseValueCurves(): {
  base: number[];     // 129 entries (index 0-128)
  high: number[];     // 63 entries (index 129-191)
  combined: number[]; // 全部合并
} {
  const base = [...DATA_$9E4E_$9ECE];
  const high = [...DATA_$9ECF_$9EFB, ...DATA_$9EFC_$9F0D];
  const combined = [...base, ...high];
  return { base, high, combined };
}

/** 解析 16-bit 值对 (LE) */
export function parseValuePairs16(): number[] {
  const result: number[] = [];
  const blocks = [DATA_$9F0E_$9FB1, DATA_$9FB2_$9FCD];
  for (const block of blocks) {
    for (let i = 0; i + 1 < block.length; i += 2) {
      result.push(le16(block[i], block[i + 1]));
    }
  }
  return result;
}

// ═════════════════════════════════════════════════
// 7. 球员数值矩阵解析 (Bank 29)
// ═════════════════════════════════════════════════

/**
 * 解析 Bank 29 中的球员数值矩阵行
 *
 * 数据格式 (实测 136 行):
 *   每个数据包以 0x00 字节分隔。
 *   包内结构:
 *     [0]:    marker (行/队标识, 0x01-0x76)
 *     [1-N]:  player slot data (20-23 字节)
 *     [last]: 0x00 (终止符，不包含在 rawData 中)
 *
 * 镜像重复模式:
 *   许多行有 8 字节后缀在数据前部完全重复。
 *   例: [marker][unique][shared8][shared8_repeat] — shared8 出现两次
 *   这表示该行的两个 slot 共享最后 8 个属性值。
 *   游戏引擎代码需要在运行时识别并折叠此重复。
 *
 * @returns rowId → PlayerValueRow 的映射
 */
export function parsePlayerValueRows(): Map<number, PlayerValueRow> {
  const map = new Map<number, PlayerValueRow>();
  const data = PRG_BANK_29_DATA;

  let pos = 0;
  let rowId = 0;

  while (pos < data.length && rowId < 200) {
    // 跳过 0x00 分界符
    while (pos < data.length && data[pos] === 0x00) pos++;
    if (pos >= data.length) break;

    // 找到下一个 0x00 分界符
    let endPos = pos;
    while (endPos < data.length && data[endPos] !== 0x00) endPos++;
    if (endPos >= data.length) break;

    const rowLen = endPos - pos;
    // 只接受 20-24 字节范围的行 (21-24 字节数据 + 0x00 在末尾)
    if (rowLen >= 20 && rowLen <= 24) {
      const marker = data[pos];
      if (marker !== 0xFF && marker < 0x80) {
        const rawData = data.slice(pos, endPos);

        // 检测镜像重复 (找最大重复后缀)
        let mirrorLen = 0;
        for (let suffixLen = Math.min(10, Math.floor(rawData.length / 2)); suffixLen >= 3; suffixLen--) {
          const suffix = rawData.slice(rawData.length - suffixLen);
          // 在 rawData 的前部 (不含最后 suffixLen 字节) 查找匹配
          let found = false;
          for (let j = 0; j <= rawData.length - suffixLen * 2; j++) {
            let match = true;
            for (let k = 0; k < suffixLen; k++) {
              if (rawData[j + k] !== suffix[k]) { match = false; break; }
            }
            if (match) { found = true; break; }
          }
          if (found) { mirrorLen = suffixLen; break; }
        }

        map.set(rowId, {
          rowId,
          romOffset: pos,
          teamMarker: marker,
          rawData,
          mirrorLen,
        });
        rowId++;
      }
    }

    pos = endPos + 1;
  }

  return map;
}

/**
 * 解析 Bank 29 中的场地位置数据 (field metatile attrs)
 *
 * 数据区域: PRG_BANK_29_DATA[~0xBF0-~0xD00]
 * 格式: 混合 tile 索引 + 属性字节，带 0x01/0x23 定界符
 */
export function parseFieldPositionData(): FieldPositionData | null {
  const data = PRG_BANK_29_DATA;

  // 先跳过球员数值矩阵行区域 (查找 0x00 定界符序列结束处)
  let metaStart = 0;
  let zeroStreak = 0;
  for (let i = 0xB00; i < data.length && i < 0xE00; i++) {
    // 正常数据不应有连续的 5 个 0x00 (除非是区域边界)
    // 找一个不是 0xFF 的起始位置
    if (data[i] !== 0xFF && data[i] !== 0x00 && metaStart === 0) {
      metaStart = i;
      break;
    }
  }
  if (metaStart === 0) return null;

  const tiles: number[] = [];
  const attrs: number[] = [];

  let pos = metaStart;
  while (pos < data.length - 1) {
    const b = data[pos];

    // 遇到 FF 填充，结束
    if (b === 0xFF && data[pos + 1] === 0xFF) break;

    // tile 索引 (0x76-0xC7 范围)
    if (b >= 0x20 && b < 0xC8) {
      tiles.push(b);
      // 下一个字节可能是属性
      if (pos + 1 < data.length) {
        const next = data[pos + 1];
        if (next >= 0x1A && next <= 0x2D) {
          attrs.push(next);
          pos++;
        } else if (next === 0x00) {
          // 0x00 分界，跳过
          pos++;
        }
      }
    } else if (b === 0x00) {
      // 分界符
      pos++;
      continue;
    }

    pos++;
    if (tiles.length > 500) break; // 安全限制
  }

  if (tiles.length === 0) return null;
  return { tiles, attrs };
}

/**
 * 检测 rawData 中的镜像重复偏移量
 * 返回重复段在原始数据中的起始位置
 */
export function findMirrorOffset(rawData: number[]): number {
  for (let suffixLen = Math.min(10, Math.floor(rawData.length / 2)); suffixLen >= 3; suffixLen--) {
    const suffix = rawData.slice(rawData.length - suffixLen);
    for (let j = 0; j <= rawData.length - suffixLen * 2; j++) {
      let match = true;
      for (let k = 0; k < suffixLen; k++) {
        if (rawData[j + k] !== suffix[k]) { match = false; break; }
      }
      if (match) return j;
    }
  }
  return -1; // 无重复
}

// ═════════════════════════════════════════════════
// 8. 综合构建函数
// ═════════════════════════════════════════════════

/**
 * 构建完整 GameDataIndex
 *
 * 架构说明:
 *   球员核心记录(playerId→jersey/position/stats)不在此静态构建中。
 *   这些值在运行时由银行 28 代码通过属性表 + 值曲线动态计算。
 *   参考 ASM $8103: 调用 $C50C 获取队伍指针 → ×20 球员偏移 →
 *   读取 $A1DC/$A6AD/$AB65 指针表 → $C527/$C536/$C539 变换。
 *
 *   本提取器负责构建所有可静态确定的 ROM 数据索引。
 */
export function buildGameDataIndex(): GameDataIndex {
  console.log('[data-extractor] Building GameDataIndex from ROM data...');

  // 1. 球员属性表
  const playerAttrs = parseAttrRecords();

  // 2. 球员名称 (按队伍分组)
  const teamPlayerNames = parsePlayerNamesByTeam();

  // 3. 全局 playerId → 名称 映射
  const playerNames = parsePlayerNames(teamPlayerNames);

  // 4. 队伍记录
  const teams = parseTeamRecords(teamPlayerNames);

  // 5. 队伍名称映射
  const teamNames = new Map<number, NameString>();
  for (const [teamId, team] of teams) {
    teamNames.set(teamId, team.name);
  }

  // 6. 动画序列
  const animSeqs = parseAnimSequences();

  // 7. 阵型
  const formations = parseFormationRecords();

  // 8. 值曲线
  const { combined: valueCurve } = parseValueCurves();

  // 9. 16-bit 值对
  const valuePairs16 = parseValuePairs16();

  // 10. Bank 29: 球员数值矩阵
  const valueRows = parsePlayerValueRows();
  const fieldData = parseFieldPositionData();

  // 11. 球员基础记录 (占位 — 运行时由 bank 28/30 代码动态注入)
  const players = new Map<number, PlayerBaseRecord>();
  // TEMP: 为每个有名字的 playerId 创建占位记录
  {
    let globalId = 0;
    for (const [, names] of teamPlayerNames) {
      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const tileName: TileName = [name[0] || 0x7E, name[1] || 0x7E, name[2] || 0x7E, name[3] || 0x7E];
        // 根据队伍内位置推断位置 (1 GK, 3 DF, 4 MF, 3 FW → 11 人标准)
        let pos: Position;
        if (i === 0) pos = Position.GK;
        else if (i <= 4) pos = Position.DF;
        else if (i <= 8) pos = Position.MF;
        else pos = Position.FW;

        players.set(globalId, {
          playerId: globalId,
          jerseyNumber: i + 1,
          name: tileName,
          position: pos,
          shot: 0, speed: 0, technique: 0, stamina: 0,
          pass: 0, tackle: 0, header: 0, goalkeep: 0,
          specialFlags: 0,
        });
        globalId++;
      }
    }
  }

  // 12. 为队伍填充 playerIds
  for (const [teamId, team] of teams) {
    const names = teamPlayerNames.get(teamId) || [];
    const startId = [...teamPlayerNames.entries()]
      .filter(([tid]) => tid < teamId)
      .reduce((sum, [, ns]) => sum + ns.length, 0);
    team.playerIds = names.map((_, i) => startId + i);
  }

  const gdi: GameDataIndex = {
    players,
    playerAttrs,
    teams,
    formations,
    playerNames,
    teamNames,
    valueCurve,
    valuePairs16,
    valueRows,
    fieldData,
  };

  console.log(`[data-extractor] Done:
    Players: ${players.size}
    Attrs: ${playerAttrs.size}
    Teams: ${teams.size}
    Formations: ${formations.size}
    Names: ${playerNames.size}
    Curve: ${valueCurve.length}
    Pairs16: ${valuePairs16.length}
    ValueRows: ${valueRows.size}
    FieldData: ${fieldData ? fieldData.tiles.length + ' tiles/' + fieldData.attrs.length + ' attrs' : 'null'}`);

  return gdi;
}
