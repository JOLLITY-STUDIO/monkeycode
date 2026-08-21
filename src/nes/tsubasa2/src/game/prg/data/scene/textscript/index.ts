/**
 * textscript/index.ts — bank03-06 剧情脚本数据汇总出口
 *
 * bank03 已转扁平字节流格式 (SCRIPTS_BANK_03 + SCRIPT_BANK_03_BYTES)。
 * bank04/05/06 仍为旧 JSON 格式 (SCRIPT_BANK_0X + SCRIPT_BANK_0X_BYTES), 待逐步转换。
 *
 * 规则: id < 0x10 → bank3 / < 0x20 → bank4 / < 0x60 → bank5 / else → bank6。
 */
export { SCRIPTS_BANK_03, SCRIPT_BANK_03_BYTES } from './scripts-bank-03';
export { SCRIPT_BANK_04, SCRIPT_BANK_04_BYTES } from './scripts-bank-04';
export { SCRIPT_BANK_05, SCRIPT_BANK_05_BYTES } from './scripts-bank-05';
export { SCRIPT_BANK_06, SCRIPT_BANK_06_BYTES } from './scripts-bank-06';
export type { ScriptDataJson, ScriptInstruction, ScriptsBank } from './script-types';
export { ScriptInstructionType } from './script-types';

import { SCRIPTS_BANK_03 } from './scripts-bank-03';
import { SCRIPT_BANK_04 } from './scripts-bank-04';
import { SCRIPT_BANK_05 } from './scripts-bank-05';
import { SCRIPT_BANK_06 } from './scripts-bank-06';
import type { ScriptDataJson } from './script-types';

/**
 * 按脚本 id 查询脚本 (0x00-0xFE)。
 * bank03 返回扁平字节流 readonly number[]; bank04/05/06 返回旧 JSON ScriptDataJson。
 * 规则: <0x10→bank3 / <0x20→bank4 / <0x60→bank5 / else→bank6。
 */
export function getScriptById(id: number): ScriptDataJson | undefined {
  const sid = id & 0xff;
  if (sid < 0x10) return undefined; // bank3 已转扁平格式, 无 JSON
  if (sid < 0x20) return SCRIPT_BANK_04[sid - 0x10];
  if (sid < 0x60) return SCRIPT_BANK_05[sid - 0x20];
  return SCRIPT_BANK_06[sid - 0x60];
}

/** bank3 扁平字节流查询 (替代 getScriptById 对 bank3 的访问) */
export function getScriptBytes03(id: number): readonly number[] | undefined {
  const sid = id & 0xff;
  if (sid < 0x10) return SCRIPTS_BANK_03[sid];
  return undefined;
}
