/**
 * bank06/scripts/index.ts — 6 段脚本聚合
 *
 * 每段对应 bank06 header 6 项指针（$A00C/$A01B/$A028/$A0E0/$A1A8/$A2F2）。
 */
import { BANK6_SCRIPT_00 } from './script-00';
import { BANK6_SCRIPT_01 } from './script-01';
import { BANK6_SCRIPT_02 } from './script-02';
import { BANK6_SCRIPT_03 } from './script-03';
import { BANK6_SCRIPT_04 } from './script-04';
import { BANK6_SCRIPT_05 } from './script-05';
export const BANK6_SCRIPTS = [
    BANK6_SCRIPT_00,
    BANK6_SCRIPT_01,
    BANK6_SCRIPT_02,
    BANK6_SCRIPT_03,
    BANK6_SCRIPT_04,
    BANK6_SCRIPT_05,
];
