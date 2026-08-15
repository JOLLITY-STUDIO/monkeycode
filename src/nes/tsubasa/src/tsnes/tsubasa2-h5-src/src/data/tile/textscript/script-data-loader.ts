/**
 * 脚本数据加载器 — 按 ID 加载解析后的剧情脚本
 *
 * 数据按 bank 分割存储:
 *   - scripts-bank-03.ts: ID 0x00-0x0F (16 个, 标题/KICK OFF 剧情)
 *   - scripts-bank-04.ts: ID 0x10-0x1F (16 个, 中段剧情)
 *   - scripts-bank-05.ts: ID 0x20-0x5F (64 个, 比赛相关)
 *   - scripts-bank-06.ts: ID 0x60-0xFE (159 个, 大量剧情/对话)
 *
 * 数据由 scripts/generate_script_data.cjs 自动生成, 禁止手改。
 */

import { SCRIPTS_BANK_03 } from './scripts-bank-03';
import { SCRIPTS_BANK_04 } from './scripts-bank-04';
import { SCRIPTS_BANK_05 } from './scripts-bank-05';
import { SCRIPTS_BANK_06 } from './scripts-bank-06';
import { getScriptBank } from './script-opcodes';

// ── 脚本数据类型 ──
export interface ScriptInstruction {
  type: 'TEXT' | 'TEXT_CTRL' | 'WAIT' | 'LONG_INSTR' | 'UNKNOWN';
  offset: number;
  addr: string;
  opcode?: number;
  mnemonic?: string;
  params?: number[];
  bytes?: number[];
  text: string;
  frames?: number;
}

export interface ScriptBlock {
  label: string;
  bank: number;
  startOffset: number;
  startAddr: string;
  instructions: ScriptInstruction[];
}

export interface ScriptData {
  id: number;
  idHex: string;
  bank: number;
  entryAddr: string;
  blocks: ScriptBlock[];
  error?: string;
}

// ── 所有脚本数据 (按 bank 分组) ──
const ALL_SCRIPTS: Record<number, readonly ScriptData[]> = {
  3: SCRIPTS_BANK_03 as readonly ScriptData[],
  4: SCRIPTS_BANK_04 as readonly ScriptData[],
  5: SCRIPTS_BANK_05 as readonly ScriptData[],
  6: SCRIPTS_BANK_06 as readonly ScriptData[],
};

// ── 脚本缓存 (按 ID 索引) ──
const scriptCache = new Map<number, ScriptData | undefined>();

/**
 * 按脚本 ID 加载脚本数据
 * @param scriptId 脚本 ID (0x00-0xFE)
 * @returns 脚本数据, 如果不存在返回 undefined
 */
export function getScriptData(scriptId: number): ScriptData | undefined {
  if (scriptId < 0 || scriptId >= 0xFF) return undefined;

  if (scriptCache.has(scriptId)) {
    return scriptCache.get(scriptId);
  }

  const bank = getScriptBank(scriptId);
  const scripts = ALL_SCRIPTS[bank];
  if (!scripts) {
    scriptCache.set(scriptId, undefined);
    return undefined;
  }

  const script = scripts.find(s => s.id === scriptId);
  scriptCache.set(scriptId, script);
  return script;
}

/**
 * 获取指定 bank 的所有脚本
 * @param bank bank 编号 (3-6)
 */
export function getScriptsByBank(bank: number): readonly ScriptData[] {
  return ALL_SCRIPTS[bank] ?? [];
}

/**
 * 获取脚本总数
 */
export function getScriptCount(): number {
  return Object.values(ALL_SCRIPTS).reduce((sum, scripts) => sum + scripts.length, 0);
}

/**
 * 获取脚本分类信息
 * @returns 每个 bank 的脚本范围和分类
 */
export function getScriptCategories(): { bank: number; range: string; count: number; category: string }[] {
  return [
    { bank: 3, range: '0x00-0x0F', count: SCRIPTS_BANK_03.length, category: '标题/KICK OFF 剧情' },
    { bank: 4, range: '0x10-0x1F', count: SCRIPTS_BANK_04.length, category: '中段剧情' },
    { bank: 5, range: '0x20-0x5F', count: SCRIPTS_BANK_05.length, category: '比赛相关' },
    { bank: 6, range: '0x60-0xFE', count: SCRIPTS_BANK_06.length, category: '大量剧情/对话' },
  ];
}
