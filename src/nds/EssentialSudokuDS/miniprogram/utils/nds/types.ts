/**
 * @file types.ts — TypeScript 类型定义 (CPU / 函数 confidence / category / heuristic 枚举)
 *
 * ⚠️ AUTO-GENERATED FILE. DO NOT EDIT.
 * Run `python scripts/generate_ts_functions.py` to regenerate.
 * Source: rom-data/function-table.json (V0.8.1 capstone + 8-tier 启发式).
 *
 * V0.10 — TypeScript bridge from V0.8 函数表 (升级 helper naming).
 * 每行表示 NDS ROM 中一个 unique BL/BLX callee, 命名 规则 (ADR-010):
 *   - V0.4 known name (28 个): human-readable
 *   - SOFTFLOAT region (0x0204C000..0x0204DFFF, ~50 个): sfloat_<8-hex>
 *   - callers ≥ 20 (~13 个): util_<8-hex>
 *   - callers ≥ 10 (~28 个): helper_<8-hex>
 *   - 其他: sub_<8-hex>
 *
 * 每个常量含 16 进制地址 + confidence + category 注释, 便于 TS service 代码 trace.
 */

/**
 * V0.10 — 共享类型 (新增 is_heuristic + heuristic_kind)
 */

export type Cpu = 'arm9' | 'arm7';

/**
 * 函数检测 confidence level
 *  - high:    有 push prologue 或 ±0x40 push 邻接
 *  - medium:  有 bx lr / pop pc / mov pc lr / ldm pc nearby
 *  - low:     单 caller 且非 skipdata (init / trampoline)
 *  - excluded: 落在 V0.3 skipdata 区域 (capstone 误识别, 不应被翻译)
 */
export type Confidence = 'high' | 'medium' | 'low' | 'excluded';

/**
 * 函数分类 (V0.8.1 8-tier)
 *  - real:              callee == push site
 *  - near:              callee within ±0x40 of push
 *  - bx_lr:             callee within +0x800 of bx lr
 *  - pop_pc:            callee within +0x400 of pop {..pc..}
 *  - mov_pc:            callee within +0x400 of mov pc, lr
 *  - ldm_pc:            callee within +0x400 of ldm {..pc..}
 *  - b_target:          callee is b imm target
 *  - multi_caller:      naked + called >=2 times
 *  - single_caller_real: naked + called 1 time + NOT in skipdata
 *  - data_target:       naked + called 1 time + IN skipdata (V0.3 false positive)
 */
export type FuncCategory =
  | 'real' | 'near' | 'bx_lr' | 'pop_pc' | 'mov_pc' | 'ldm_pc' | 'b_target'
  | 'multi_caller' | 'single_caller_real' | 'data_target';

/**
 * 函数 record type — 每个 NDS 函数均映射到该结构
 */
export interface FunctionRecord {
  /** 16 进制 RAM 地址, e.g. 0x02039f4c */
  readonly addr: number;
  /** TS 友好名称 (V0.4 known / curated / pattern / sfloat_/util_/helper_/sub_) */
  readonly name: string;
  /** 所属 CPU */
  readonly cpu: Cpu;
  /** disasm disasm mode (arm / thumb) */
  readonly mode: 'arm' | 'thumb';
  /** V0.4 已知名 (true if known from V0.4 ADR-005 partial naming) */
  readonly is_known: boolean;
  /** V0.12: 是否 curated 手工命名 (manual disasm reading) */
  readonly is_curated: boolean;
  /** V0.13: 是否 pattern auto-detected (regex match disasm) */
  readonly is_pattern: boolean;
  /** V0.10: 是否 heuristic 推测命名 (true: sfloat_/util_/helper_) */
  readonly is_heuristic: boolean;
  /** V0.10: heuristic 命名 category (仅 is_heuristic=true) */
  readonly heuristic_kind?: 'sfloat' | 'util' | 'helper';
  /** Function category (V0.8.1 8-tier) */
  readonly category: FuncCategory;
  /** Confidence level */
  readonly confidence: Confidence;
  /** Pushed register set if known (ARM mode only) */
  readonly regs_pushed?: readonly string[];
  /** Caller count (from V0.3 call graph) — undefined = not in graph */
  readonly callers_n?: number;
}

/**
 * NDS ROM address type — 32-bit literal
 */
export type NdsAddr = number;

/**
 * Helper: lookup function record by addr (consumed at runtime if needed)
 */
export type FunctionTable = readonly FunctionRecord[];
