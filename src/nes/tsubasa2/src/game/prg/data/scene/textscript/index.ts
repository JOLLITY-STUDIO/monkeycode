/**
 * textscript/index.ts — bank03-06 剧情脚本数据汇总出口
 *
 * 统一导出 4 个 SCRIPT_BANK 常量 (每个脚本一条 JSON: instructions + text)
 * 与按 id 查询函数 getScriptById。
 *
 * 规则: id < 0x10 → bank3 / < 0x20 → bank4 / < 0x60 → bank5 / else → bank6。
 */
export { SCRIPT_BANK_03, SCRIPT_BANK_03_BYTES } from './scripts-bank-03';
export { SCRIPT_BANK_04, SCRIPT_BANK_04_BYTES } from './scripts-bank-04';
export { SCRIPT_BANK_05, SCRIPT_BANK_05_BYTES } from './scripts-bank-05';
export { SCRIPT_BANK_06, SCRIPT_BANK_06_BYTES } from './scripts-bank-06';
export type { ScriptDataJson, ScriptInstruction, ScriptsBank } from './script-types';
export { ScriptInstructionType } from './script-types';

import { SCRIPT_BANK_03 } from './scripts-bank-03';
import { SCRIPT_BANK_04 } from './scripts-bank-04';
import { SCRIPT_BANK_05 } from './scripts-bank-05';
import { SCRIPT_BANK_06 } from './scripts-bank-06';
import type { ScriptDataJson } from './script-types';

/**
 * 按脚本 id 查询脚本 JSON (0x00-0xFE)。
 * 规则: <0x10→bank3 / <0x20→bank4 / <0x60→bank5 / else→bank6。
 */
export function getScriptById(id: number): ScriptDataJson | undefined {
  const sid = id & 0xff;
  if (sid < 0x10) return SCRIPT_BANK_03[sid];
  if (sid < 0x20) return SCRIPT_BANK_04[sid - 0x10];
  if (sid < 0x60) return SCRIPT_BANK_05[sid - 0x20];
  return SCRIPT_BANK_06[sid - 0x60];
}
