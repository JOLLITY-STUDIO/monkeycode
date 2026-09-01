/**
 * @file known.ts — V0.4 known names only (28 entries)
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
 * Known V0.4 named function @ 0x02020d0c
 * @cpu arm9
 * @category bx_lr
 */
export const memcpy_32 = 0x02020d0c as const;
/**
 * Known V0.4 named function @ 0x02027ff4
 * @cpu arm9
 * @category bx_lr
 */
export const mem_set_32 = 0x02027ff4 as const;
/**
 * Known V0.4 named function @ 0x02028434
 * @cpu arm9
 * @category near
 */
export const vec2_set_inline = 0x02028434 as const;
/**
 * Known V0.4 named function @ 0x02029a58
 * @cpu arm9
 * @category bx_lr
 */
export const simple_set_var_4byte = 0x02029a58 as const;
/**
 * Known V0.4 named function @ 0x02029ab8
 * @cpu arm9
 * @category bx_lr
 */
export const state_dispatch_8way = 0x02029ab8 as const;
/**
 * Known V0.4 named function @ 0x02029bb0
 * @cpu arm9
 * @category prologue
 */
export const state_switch_8way_packed = 0x02029bb0 as const;
/**
 * Known V0.4 named function @ 0x020395bc
 * @cpu arm9
 * @category bx_lr
 */
export const vec3_neg = 0x020395bc as const;
/**
 * Known V0.4 named function @ 0x02039f38
 * @cpu arm9
 * @category bx_lr
 */
export const vec3_normalize = 0x02039f38 as const;
/**
 * Known V0.4 named function @ 0x02039f4c
 * @cpu arm9
 * @category bx_lr
 */
export const vec3_dot_product = 0x02039f4c as const;
/**
 * Known V0.4 named function @ 0x0203a1e4
 * @cpu arm9
 * @category bx_lr
 */
export const vec3_add_scaled = 0x0203a1e4 as const;
/**
 * Known V0.4 named function @ 0x0203a73c
 * @cpu arm9
 * @category bx_lr
 */
export const vec3_scale = 0x0203a73c as const;
/**
 * Known V0.4 named function @ 0x0203a7ec
 * @cpu arm9
 * @category bx_lr
 */
export const vec3_length = 0x0203a7ec as const;
/**
 * Known V0.4 named function @ 0x0203a880
 * @cpu arm9
 * @category bx_lr
 */
export const vec3_sub = 0x0203a880 as const;
/**
 * Known V0.4 named function @ 0x0204c86c
 * @cpu arm9
 * @category bx_lr
 */
export const __aeabi_fdiv = 0x0204c86c as const;
/**
 * Known V0.4 named function @ 0x0204d430
 * @cpu arm9
 * @category bx_lr
 */
export const __aeabi_fsub = 0x0204d430 as const;
/**
 * Known V0.4 named function @ 0x0204d86c
 * @cpu arm9
 * @category bx_lr
 */
export const __aeabi_fcmp = 0x0204d86c as const;
/**
 * Known V0.4 named function @ 0x0204d8e8
 * @cpu arm9
 * @category bx_lr
 */
export const __aeabi_fabs = 0x0204d8e8 as const;
/**
 * Known V0.4 named function @ 0x0204d930
 * @cpu arm9
 * @category bx_lr
 */
export const __aeabi_fclassify = 0x0204d930 as const;
/**
 * Known V0.4 named function @ 0x0204db1c
 * @cpu arm9
 * @category bx_lr
 */
export const __aeabi_fadd = 0x0204db1c as const;
/**
 * Known V0.4 named function @ 0x02106940
 * @cpu arm9
 * @category bx_lr
 */
export const pool_alloc_32 = 0x02106940 as const;
/**
 * Known V0.4 named function @ 0x02106954
 * @cpu arm9
 * @category bx_lr
 */
export const pool_alloc_64 = 0x02106954 as const;
/**
 * Known V0.4 named function @ 0x02384350
 * @cpu arm7
 * @category prologue
 */
export const touch_sample_xy = 0x02384350 as const;
/**
 * Known V0.4 named function @ 0x0238863c
 * @cpu arm7
 * @category bx_lr
 */
export const key_sample = 0x0238863c as const;
/**
 * Known V0.4 named function @ 0x02391398
 * @cpu arm7
 * @category bx_lr
 */
export const ipc_fifo_peek_byte = 0x02391398 as const;
/**
 * Known V0.4 named function @ 0x023913b8
 * @cpu arm7
 * @category near
 */
export const ipc_fifo_recv_handler = 0x023913b8 as const;
/**
 * Known V0.4 named function @ 0x02391ce4
 * @cpu arm7
 * @category near
 */
export const mic_sample = 0x02391ce4 as const;
/**
 * Known V0.4 named function @ 0x023920b0
 * @cpu arm7
 * @category bx_lr
 */
export const lid_close_handler = 0x023920b0 as const;
/**
 * Known V0.4 named function @ 0x023942a4
 * @cpu arm7
 * @category near
 */
export const rtc_read = 0x023942a4 as const;
