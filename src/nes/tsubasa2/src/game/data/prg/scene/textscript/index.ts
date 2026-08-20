/**
 * 剧情脚本数据聚合导出
 *
 * 脚本按 bank 分割 (03-06 同属一套脚本系统, 见 $8AEC 映射表):
 *   - scripts-bank-03.ts: ID 0x00-0x0F (16 个, 标题/KICK OFF 剧情)
 *   - scripts-bank-04.ts: ID 0x10-0x1F (16 个, 中段剧情)
 *   - scripts-bank-05.ts: ID 0x20-0x5F (64 个, 比赛相关)
 *   - scripts-bank-06.ts: ID 0x60-0x65 (6 个入口块)
 *
 * 数据由 generate_script_data.cjs 自动生成, 禁止手改。
 */

import { SCRIPTS_BANK_03 } from './scripts-bank-03';
import { SCRIPTS_BANK_04 } from './scripts-bank-04';
import { SCRIPTS_BANK_05 } from './scripts-bank-05';
import { SCRIPTS_BANK_06 } from './scripts-bank-06';

export { SCRIPTS_BANK_03, SCRIPTS_BANK_04, SCRIPTS_BANK_05, SCRIPTS_BANK_06 };

export interface ScriptIdEntry {
  id: number;
  idHex: string;
  bank: number;
  entryAddr: string;
  blocks: unknown[];
}

/** 脚本 ID → 所在 bank 的映射表 (ID 0x00-0x5F 属于 bank03-05, 0x60-0x65 属于 bank06) */
export const SCRIPT_ID_BANK: Record<number, number> = (() => {
  const m: Record<number, number> = {};
  for (const bank of [3, 4, 5, 6]) {
    const list = getScriptsForBank(bank);
    for (const s of list) {
      if (typeof (s as ScriptIdEntry).id === 'number') {
        m[(s as ScriptIdEntry).id] = bank;
      }
    }
  }
  return m;
})();

function getScriptsForBank(bank: number): readonly unknown[] {
  switch (bank) {
    case 3: return SCRIPTS_BANK_03;
    case 4: return SCRIPTS_BANK_04;
    case 5: return SCRIPTS_BANK_05;
    case 6: return SCRIPTS_BANK_06;
    default: return [];
  }
}

/** 所有脚本 (按 bank 分组, 3-6) */
export const ALL_SCRIPTS: Record<number, readonly unknown[]> = {
  3: SCRIPTS_BANK_03,
  4: SCRIPTS_BANK_04,
  5: SCRIPTS_BANK_05,
  6: SCRIPTS_BANK_06,
};

/**
 * 按脚本 ID 查找脚本数据。
 * @param id 脚本 ID (0x00-0xFE)
 * @returns 脚本条目或 undefined
 */
export function getScriptById(id: number): ScriptIdEntry | undefined {
  const bank = SCRIPT_ID_BANK[id];
  if (bank === undefined) return undefined;
  const list = ALL_SCRIPTS[bank] as readonly ScriptIdEntry[];
  return list.find((s) => s.id === id);
}

/**
 * 获取指定 bank 的所有脚本。
 * @param bank bank 编号 (3-6)
 */
export function getScriptsByBank(bank: number): readonly unknown[] {
  return ALL_SCRIPTS[bank] ?? [];
}
