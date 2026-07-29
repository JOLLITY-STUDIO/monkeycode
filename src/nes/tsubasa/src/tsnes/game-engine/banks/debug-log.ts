/**
 * Debug logging utility — 出口入口日志
 *
 * 使用: 在每个 export function 开头/结尾调用 track / exit
 *
 *   import { track, exit } from './debug-log';
 *   track('bank00_paletteFlush', { '4A': sys.mem[0x4A] });
 *   // ... function body ...
 *   exit('bank00_paletteFlush', { '0628': sys.mem[0x628] });
 */

const ENABLED = true;
const INDENT: string[] = [];

function pad(indent: number): string {
  return '  '.repeat(indent);
}

/**
 * 函数入口日志
 * @param fnName  函数名
 * @param params  关键参数 (可选)
 */
export function track(fnName: string, params?: Record<string, any>): void {
  if (!ENABLED) return;
  const prefix = pad(INDENT.length);
  let extra = '';
  if (params) {
    const parts: string[] = [];
    for (const key of Object.keys(params)) {
      const v = params[key];
      if (typeof v === 'number') parts.push(`${key}=0x${v.toString(16)}`);
      else parts.push(`${key}=${String(v)}`);
    }
    extra = ' ' + parts.join(' ');
  }
  console.log(`${prefix}▶ ${fnName}${extra}`);
  INDENT.push(fnName);
}

/**
 * 函数出口日志
 * @param fnName  函数名 (必须与 entry 匹配)
 * @param params  返回值/关键参数 (可选)
 */
export function exit(fnName: string, params?: Record<string, any>): void {
  if (!ENABLED) return;
  // 从栈中弹出匹配的 fn
  for (let i = INDENT.length - 1; i >= 0; i--) {
    if (INDENT[i] === fnName) {
      INDENT.splice(i, 1);
      break;
    }
  }
  const prefix = pad(INDENT.length);
  let extra = '';
  if (params) {
    const parts: string[] = [];
    for (const key of Object.keys(params)) {
      const v = params[key];
      if (typeof v === 'number') {
        if (v > 0xFFFF) parts.push(`${key}=${v}`);
        else parts.push(`${key}=0x${v.toString(16)}`);
      } else parts.push(`${key}=${String(v)}`);
    }
    extra = ' ' + parts.join(' ');
  }
  console.log(`${prefix}◀ ${fnName}${extra}`);
}

/**
 * 辅助: 关闭日志
 */
export function logDisable(): void { (track as any)._disabled = true; }
export function logEnable(): void { (track as any)._disabled = false; }
