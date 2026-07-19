/**
 * ============================================================
 * Cross-Bank Dispatch Registry
 *
 * 提供跨 bank 函数调用机制。由于 bank 之间存在循环引用，
 * 使用延迟注册模式：各 bank 模块在加载后注册自身。
 *
 * 调用流程：
 *   1. xcall(ctx, rom, cpuAddr) → 查找 cpuAddr 对应 bank
 *   2. 从该 bank.fns[cpuAddr] 取出函数并执行
 *   3. 如果 bank 未加载, 记录警告
 * ============================================================
 */
import type { GameContext } from '../_context';
import type { BankModule, BankFn, RomReader } from './_bank_types';

/** 所有 bank 模块注册表 — 在 index.ts 初始化时填充 */
const registry: Map<number, BankModule> = new Map();

/**
 * 注册 bank 模块
 */
export function registerBank(bankNum: number, mod: BankModule): void {
  registry.set(bankNum, mod);
}

/**
 * 获取已注册的 bank 模块
 */
export function getBank(bankNum: number): BankModule | undefined {
  return registry.get(bankNum);
}

/**
 * 地址 → bank 编号映射
 * NES MMC3 内存布局:
 *   $8000-$9FFF → MMC3 可切换 bank (0-31)
 *   $A000-$BFFF → MMC3 可切换 bank (1-31)
 *   $C000-$DFFF → 固定 bank 30
 *   $E000-$FFFF → 固定 bank 31
 */
const STATIC_BANK_MAP: Record<string, number> = {
  // $Cxxx → bank_30 (fixed)
  '$C': 30,
  // $Dxxx → bank_30 (fixed)
  '$D': 30,
  // $Exxx → bank_31 (fixed)
  '$E': 31,
  // $Fxxx → bank_31 (fixed)
  '$F': 31,
};

/**
 * 根据 CPU 地址解析 MMC3 逻辑 bank 编号
 * @param cpuAddr CPU 内存地址 ($8000-$FFFF)
 * @param bank8000 当前 MMC3 $8000-$9FFF 映射的 bank 编号
 * @param bankA000 当前 MMC3 $A000-$BFFF 映射的 bank 编号
 */
export function resolveBank(
  cpuAddr: number,
  bank8000: number,
  bankA000: number
): number {
  if (cpuAddr >= 0xC000 && cpuAddr <= 0xFFFF) {
    const prefix = '$' + cpuAddr.toString(16)[0].toUpperCase();
    return STATIC_BANK_MAP[prefix] ?? 31;
  }
  if (cpuAddr >= 0xA000 && cpuAddr <= 0xBFFF) {
    return bankA000;
  }
  if (cpuAddr >= 0x8000 && cpuAddr <= 0x9FFF) {
    return bank8000;
  }
  return -1;
}

/**
 * 跨 bank 调用：根据 CPU 地址查找对应 bank 的函数并执行
 *
 * @param ctx 游戏上下文
 * @param addr CPU 地址字符串，如 '$C4B9'
 * @param bank8000 当前 $8000-$9FFF 映射的 bank (从 ctx 读取)
 * @param bankA000 当前 $A000-$BFFF 映射的 bank (从 ctx 读取)
 */
/** 把 $Axxx/$Bxxx 地址归一化到 $8xxx/$9xxx (同一个 8KB bank 不同映射窗口) */
function normalizeAddrKey(addr: string): string | null {
  const cpuAddr = parseInt(addr.substring(1), 16);
  if (cpuAddr >= 0xA000 && cpuAddr < 0xC000) {
    return '$8' + addr.substring(2);
  }
  return null;
}

export function crossBankCall(
  ctx: GameContext,
  addr: string,
  bank8000?: number,
  bankA000?: number,
  ...extraArgs: any[]
): void {
  const cpuAddr = parseInt(addr.substring(1), 16);
  const b8 = bank8000 ?? (ctx as any)._bank8000 ?? 0;
  const bA = bankA000 ?? (ctx as any)._bankA000 ?? 1;
  const bankNum = resolveBank(cpuAddr, b8, bA);

  if (bankNum < 0) {
    console.warn(`[crossbank] Cannot resolve bank for ${addr}`);
    return;
  }

  const mod = registry.get(bankNum);
  if (!mod) {
    console.warn(`[crossbank] Bank ${bankNum} not registered for ${addr}`);
    return;
  }

  // 精确匹配 + 地址归一化 fallback ($Axxx → $8xxx)
  let fn = mod.fns[addr];
  if (!fn) {
    const normKey = normalizeAddrKey(addr);
    if (normKey) fn = mod.fns[normKey];
  }

  if (fn) {
    try {
      const fallbackRom = { u8: () => 0, u16le: () => 0, data: new Uint8Array(0), romBase: 0 };
      fn(ctx, mod.rom ?? fallbackRom, ...extraArgs);
    } catch (e) {
      console.warn(`[crossbank] Error calling ${addr} in bank_${bankNum}:`, e);
    }
  } else {
    console.warn(`[crossbank] No handler for ${addr} in bank_${bankNum}`);
  }
}
