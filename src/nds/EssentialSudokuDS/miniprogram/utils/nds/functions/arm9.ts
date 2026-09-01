/**
 * @file arm9.ts — ARM9 subset (2033 entries)
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
 * ARM9 函数 @ 0x020082cc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 33
 */
export const array_field_0x54_get_idx = 0x020082cc as const;
/**
 * ARM9 函数 @ 0x020082e8
 * @category prologue
 * @confidence high
 */
export const sub_020082e8 = 0x020082e8 as const;
/**
 * ARM9 函数 @ 0x020084b0
 * @category prologue
 * @confidence high
 */
export const sub_020084b0 = 0x020084b0 as const;
/**
 * ARM9 函数 @ 0x02008630
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const globals_reset_and_call_twice = 0x02008630 as const;
/**
 * ARM9 函数 @ 0x02008684
 * @category prologue
 * @confidence high
 */
export const sub_02008684 = 0x02008684 as const;
/**
 * ARM9 函数 @ 0x020087e8
 * @category prologue
 * @confidence high
 */
export const sub_020087e8 = 0x020087e8 as const;
/**
 * ARM9 函数 @ 0x020088e8
 * @category prologue
 * @confidence high
 */
export const sub_020088e8 = 0x020088e8 as const;
/**
 * ARM9 函数 @ 0x02008ad4
 * @category prologue
 * @confidence high
 */
export const sub_02008ad4 = 0x02008ad4 as const;
/**
 * ARM9 函数 @ 0x02008b8c
 * @category prologue
 * @confidence high
 */
export const sub_02008b8c = 0x02008b8c as const;
/**
 * ARM9 函数 @ 0x02008c48
 * @category prologue
 * @confidence high
 */
export const sub_02008c48 = 0x02008c48 as const;
/**
 * ARM9 函数 @ 0x02008d04
 * @category prologue
 * @confidence high
 */
export const sub_02008d04 = 0x02008d04 as const;
/**
 * ARM9 函数 @ 0x02008dc0
 * @category prologue
 * @confidence high
 */
export const sub_02008dc0 = 0x02008dc0 as const;
/**
 * ARM9 函数 @ 0x02008e84
 * @category prologue
 * @confidence high
 */
export const sub_02008e84 = 0x02008e84 as const;
/**
 * ARM9 函数 @ 0x02008f48
 * @category prologue
 * @confidence high
 */
export const sub_02008f48 = 0x02008f48 as const;
/**
 * ARM9 函数 @ 0x0200900c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const init_sequence_memclear_2x = 0x0200900c as const;
/**
 * ARM9 函数 @ 0x02009070
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const init_check_global_pair = 0x02009070 as const;
/**
 * ARM9 函数 @ 0x0200912c
 * @category prologue
 * @confidence high
 */
export const sub_0200912c = 0x0200912c as const;
/**
 * ARM9 函数 @ 0x02009214
 * @category prologue
 * @confidence high
 */
export const sub_02009214 = 0x02009214 as const;
/**
 * ARM9 函数 @ 0x02009240
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const global_ptr_store_arg0_020fcc6c = 0x02009240 as const;
/**
 * ARM9 函数 @ 0x0200925c
 * @category prologue
 * @confidence high
 */
export const sub_0200925c = 0x0200925c as const;
/**
 * ARM9 函数 @ 0x02009294
 * @category prologue
 * @confidence high
 */
export const sub_02009294 = 0x02009294 as const;
/**
 * ARM9 函数 @ 0x02009378
 * @category prologue
 * @confidence high
 */
export const sub_02009378 = 0x02009378 as const;
/**
 * ARM9 函数 @ 0x02009458
 * @category prologue
 * @confidence high
 */
export const sub_02009458 = 0x02009458 as const;
/**
 * ARM9 函数 @ 0x02009538
 * @category prologue
 * @confidence high
 */
export const sub_02009538 = 0x02009538 as const;
/**
 * ARM9 函数 @ 0x02009618
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const init_sequence_service_2calls = 0x02009618 as const;
/**
 * ARM9 函数 @ 0x020096a8
 * @category prologue
 * @confidence high
 */
export const sub_020096a8 = 0x020096a8 as const;
/**
 * ARM9 函数 @ 0x02009758
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x020fcc6c = 0x02009758 as const;
/**
 * ARM9 函数 @ 0x020097f4
 * @category prologue
 * @confidence high
 */
export const sub_020097f4 = 0x020097f4 as const;
/**
 * ARM9 函数 @ 0x02009a18
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_1way_02009a18 = 0x02009a18 as const;
/**
 * ARM9 函数 @ 0x02009af0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_1way_02009af0 = 0x02009af0 as const;
/**
 * ARM9 函数 @ 0x02009bd8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_1way_02009bd8 = 0x02009bd8 as const;
/**
 * ARM9 函数 @ 0x02009cc4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_1way_02009cc4 = 0x02009cc4 as const;
/**
 * ARM9 函数 @ 0x02009e54
 * @category prologue
 * @confidence high
 */
export const sub_02009e54 = 0x02009e54 as const;
/**
 * ARM9 函数 @ 0x0200a06c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 8
 */
export const global_ptr_field4_get = 0x0200a06c as const;
/**
 * ARM9 函数 @ 0x0200a07c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 12
 */
export const dual_state_setter = 0x0200a07c as const;
/**
 * ARM9 函数 @ 0x0200a098
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 48
 */
export const state_setter_a = 0x0200a098 as const;
/**
 * ARM9 函数 @ 0x0200a0a8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 6
 */
export const struct_zero_init_2field = 0x0200a0a8 as const;
/**
 * ARM9 函数 @ 0x0200a0bc
 * @category prologue
 * @confidence high
 */
export const sub_0200a0bc = 0x0200a0bc as const;
/**
 * ARM9 函数 @ 0x0200a1fc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_1bl_0x2039308 = 0x0200a1fc as const;
/**
 * ARM9 函数 @ 0x0200a234
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x020fe914 = 0x0200a234 as const;
/**
 * ARM9 函数 @ 0x0200a2b8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x020efda0_4000 = 0x0200a2b8 as const;
/**
 * ARM9 函数 @ 0x0200a40c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const init_flag_byte_store = 0x0200a40c as const;
/**
 * ARM9 函数 @ 0x0200a4fc
 * @category prologue
 * @confidence high
 */
export const sub_0200a4fc = 0x0200a4fc as const;
/**
 * ARM9 函数 @ 0x0200a63c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_array_mix_access_0x020fe82c_idx = 0x0200a63c as const;
/**
 * ARM9 函数 @ 0x0200a680
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const stub_noop_a = 0x0200a680 as const;
/**
 * ARM9 函数 @ 0x0200a684
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_indirect_thunk_0x02036694_n4 = 0x0200a684 as const;
/**
 * ARM9 函数 @ 0x0200a6a8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0210ab84_1 = 0x0200a6a8 as const;
/**
 * ARM9 函数 @ 0x0200a7f0
 * @category prologue
 * @confidence high
 */
export const sub_0200a7f0 = 0x0200a7f0 as const;
/**
 * ARM9 函数 @ 0x0200a910
 * @category prologue
 * @confidence high
 */
export const sub_0200a910 = 0x0200a910 as const;
/**
 * ARM9 函数 @ 0x0200ac38
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_array_mix_access_0x02101c04_idx = 0x0200ac38 as const;
/**
 * ARM9 函数 @ 0x0200ad6c
 * @category prologue
 * @confidence high
 */
export const sub_0200ad6c = 0x0200ad6c as const;
/**
 * ARM9 函数 @ 0x0200ae58
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const init_double_check_guard = 0x0200ae58 as const;
/**
 * ARM9 函数 @ 0x0200aee4
 * @category prologue
 * @confidence high
 */
export const sub_0200aee4 = 0x0200aee4 as const;
/**
 * ARM9 函数 @ 0x0200b030
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const io_flags_bic_orr_pair = 0x0200b030 as const;
/**
 * ARM9 函数 @ 0x0200b0a8
 * @category prologue
 * @confidence high
 */
export const sub_0200b0a8 = 0x0200b0a8 as const;
/**
 * ARM9 函数 @ 0x0200b28c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_array_w_access_0x02102ec0_idx = 0x0200b28c as const;
/**
 * ARM9 函数 @ 0x0200b2e8
 * @category prologue
 * @confidence high
 */
export const sub_0200b2e8 = 0x0200b2e8 as const;
/**
 * ARM9 函数 @ 0x0200b3f8
 * @category prologue
 * @confidence high
 */
export const sub_0200b3f8 = 0x0200b3f8 as const;
/**
 * ARM9 函数 @ 0x0200b854
 * @category prologue
 * @confidence high
 */
export const sub_0200b854 = 0x0200b854 as const;
/**
 * ARM9 函数 @ 0x0200babc
 * @category prologue
 * @confidence high
 */
export const sub_0200babc = 0x0200babc as const;
/**
 * ARM9 函数 @ 0x0200bb94
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x02101be8 = 0x0200bb94 as const;
/**
 * ARM9 函数 @ 0x0200bc96
 * @category prologue
 * @confidence high
 */
export const sub_0200bc96 = 0x0200bc96 as const;
/**
 * ARM9 函数 @ 0x0200bc9a
 * @category prologue
 * @confidence high
 */
export const sub_0200bc9a = 0x0200bc9a as const;
/**
 * ARM9 函数 @ 0x0200bca2
 * @category prologue
 * @confidence high
 */
export const sub_0200bca2 = 0x0200bca2 as const;
/**
 * ARM9 函数 @ 0x0200bcd8
 * @category prologue
 * @confidence high
 */
export const sub_0200bcd8 = 0x0200bcd8 as const;
/**
 * ARM9 函数 @ 0x0200bef0
 * @category prologue
 * @confidence high
 */
export const sub_0200bef0 = 0x0200bef0 as const;
/**
 * ARM9 函数 @ 0x0200bf9c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const main_ram_field_onesetter = 0x0200bf9c as const;
/**
 * ARM9 函数 @ 0x0200bfac
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x02101be8 = 0x0200bfac as const;
/**
 * ARM9 函数 @ 0x0200c05c
 * @category prologue
 * @confidence high
 */
export const sub_0200c05c = 0x0200c05c as const;
/**
 * ARM9 函数 @ 0x0200c448
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_1way_0200c448 = 0x0200c448 as const;
/**
 * ARM9 函数 @ 0x0200c754
 * @category prologue
 * @confidence high
 */
export const sub_0200c754 = 0x0200c754 as const;
/**
 * ARM9 函数 @ 0x0200c96a
 * @category prologue
 * @confidence high
 */
export const sub_0200c96a = 0x0200c96a as const;
/**
 * ARM9 函数 @ 0x0200cc24
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 3
 */
export const init_sequence_4calls = 0x0200cc24 as const;
/**
 * ARM9 函数 @ 0x0200cc54
 * @category prologue
 * @confidence high
 */
export const sub_0200cc54 = 0x0200cc54 as const;
/**
 * ARM9 函数 @ 0x0200cff0
 * @category prologue
 * @confidence high
 */
export const sub_0200cff0 = 0x0200cff0 as const;
/**
 * ARM9 函数 @ 0x0200d0c0
 * @category prologue
 * @confidence high
 */
export const sub_0200d0c0 = 0x0200d0c0 as const;
/**
 * ARM9 函数 @ 0x0200d60c
 * @category prologue
 * @confidence high
 */
export const sub_0200d60c = 0x0200d60c as const;
/**
 * ARM9 函数 @ 0x0200d954
 * @category prologue
 * @confidence high
 */
export const sub_0200d954 = 0x0200d954 as const;
/**
 * ARM9 函数 @ 0x0200dd70
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_dispatch_5way = 0x0200dd70 as const;
/**
 * ARM9 函数 @ 0x0200e414
 * @category prologue
 * @confidence high
 */
export const sub_0200e414 = 0x0200e414 as const;
/**
 * ARM9 函数 @ 0x0200e550
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const service_call_5args_0x46 = 0x0200e550 as const;
/**
 * ARM9 函数 @ 0x0200e588
 * @category prologue
 * @confidence high
 */
export const sub_0200e588 = 0x0200e588 as const;
/**
 * ARM9 函数 @ 0x0200ec64
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x020f05d4 = 0x0200ec64 as const;
/**
 * ARM9 函数 @ 0x0200ece4
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_0200ece4 = 0x0200ece4 as const;
/**
 * ARM9 函数 @ 0x0200ed64
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_0200ed64 = 0x0200ed64 as const;
/**
 * ARM9 函数 @ 0x0200ede4
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_0200ede4 = 0x0200ede4 as const;
/**
 * ARM9 函数 @ 0x0200ee64
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0210218c_50 = 0x0200ee64 as const;
/**
 * ARM9 函数 @ 0x0200f100
 * @category prologue
 * @confidence high
 */
export const sub_0200f100 = 0x0200f100 as const;
/**
 * ARM9 函数 @ 0x0200f450
 * @category prologue
 * @confidence high
 */
export const sub_0200f450 = 0x0200f450 as const;
/**
 * ARM9 函数 @ 0x0200f708
 * @category prologue
 * @confidence high
 */
export const sub_0200f708 = 0x0200f708 as const;
/**
 * ARM9 函数 @ 0x0200f818
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const stub_noop_b = 0x0200f818 as const;
/**
 * ARM9 函数 @ 0x0200f81c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const init_double_check_guard_b = 0x0200f81c as const;
/**
 * ARM9 函数 @ 0x0200f8e8
 * @category prologue
 * @confidence high
 */
export const sub_0200f8e8 = 0x0200f8e8 as const;
/**
 * ARM9 函数 @ 0x0200f9dc
 * @category prologue
 * @confidence high
 */
export const sub_0200f9dc = 0x0200f9dc as const;
/**
 * ARM9 函数 @ 0x0200fbec
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x020fcc6c_1 = 0x0200fbec as const;
/**
 * ARM9 函数 @ 0x0200fd48
 * @category prologue
 * @confidence high
 */
export const sub_0200fd48 = 0x0200fd48 as const;
/**
 * ARM9 函数 @ 0x0200fe30
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_0200fe30 = 0x0200fe30 as const;
/**
 * ARM9 函数 @ 0x02010108
 * @category prologue
 * @confidence high
 */
export const sub_02010108 = 0x02010108 as const;
/**
 * ARM9 函数 @ 0x02010200
 * @category prologue
 * @confidence high
 */
export const sub_02010200 = 0x02010200 as const;
/**
 * ARM9 函数 @ 0x0201040c
 * @category prologue
 * @confidence high
 */
export const sub_0201040c = 0x0201040c as const;
/**
 * ARM9 函数 @ 0x020104ba
 * @category prologue
 * @confidence high
 */
export const sub_020104ba = 0x020104ba as const;
/**
 * ARM9 函数 @ 0x020104f4
 * @category prologue
 * @confidence high
 */
export const sub_020104f4 = 0x020104f4 as const;
/**
 * ARM9 函数 @ 0x02010694
 * @category prologue
 * @confidence high
 */
export const sub_02010694 = 0x02010694 as const;
/**
 * ARM9 函数 @ 0x02010854
 * @category prologue
 * @confidence high
 */
export const sub_02010854 = 0x02010854 as const;
/**
 * ARM9 函数 @ 0x02010964
 * @category prologue
 * @confidence high
 */
export const sub_02010964 = 0x02010964 as const;
/**
 * ARM9 函数 @ 0x02010cac
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_2way_02010cac = 0x02010cac as const;
/**
 * ARM9 函数 @ 0x02010e1c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x02104420 = 0x02010e1c as const;
/**
 * ARM9 函数 @ 0x02010e7e
 * @category prologue
 * @confidence high
 */
export const sub_02010e7e = 0x02010e7e as const;
/**
 * ARM9 函数 @ 0x02010eec
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x02104458 = 0x02010eec as const;
/**
 * ARM9 函数 @ 0x02010f3e
 * @category prologue
 * @confidence high
 */
export const sub_02010f3e = 0x02010f3e as const;
/**
 * ARM9 函数 @ 0x02010f84
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_02010f84 = 0x02010f84 as const;
/**
 * ARM9 函数 @ 0x020111dc
 * @category prologue
 * @confidence high
 */
export const sub_020111dc = 0x020111dc as const;
/**
 * ARM9 函数 @ 0x02011230
 * @category prologue
 * @confidence high
 */
export const sub_02011230 = 0x02011230 as const;
/**
 * ARM9 函数 @ 0x02011384
 * @category prologue
 * @confidence high
 */
export const sub_02011384 = 0x02011384 as const;
/**
 * ARM9 函数 @ 0x020113e0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_field_0xc_get = 0x020113e0 as const;
/**
 * ARM9 函数 @ 0x020113f0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const global_counter_dec_then_call_011230 = 0x020113f0 as const;
/**
 * ARM9 函数 @ 0x02011424
 * @category prologue
 * @confidence high
 */
export const sub_02011424 = 0x02011424 as const;
/**
 * ARM9 函数 @ 0x020120ec
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const init_sequence_3calls_write = 0x020120ec as const;
/**
 * ARM9 函数 @ 0x02012140
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_02012140 = 0x02012140 as const;
/**
 * ARM9 函数 @ 0x02012800
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x02104580_9 = 0x02012800 as const;
/**
 * ARM9 函数 @ 0x02012b50
 * @category prologue
 * @confidence high
 */
export const sub_02012b50 = 0x02012b50 as const;
/**
 * ARM9 函数 @ 0x02012c2c
 * @category prologue
 * @confidence high
 */
export const sub_02012c2c = 0x02012c2c as const;
/**
 * ARM9 函数 @ 0x02013390
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_dispatch_5way_2 = 0x02013390 as const;
/**
 * ARM9 函数 @ 0x02013aa8
 * @category prologue
 * @confidence high
 */
export const sub_02013aa8 = 0x02013aa8 as const;
/**
 * ARM9 函数 @ 0x02014350
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x02106564 = 0x02014350 as const;
/**
 * ARM9 函数 @ 0x02014474
 * @category prologue
 * @confidence high
 */
export const sub_02014474 = 0x02014474 as const;
/**
 * ARM9 函数 @ 0x02014618
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const dual_state_check_eq = 0x02014618 as const;
/**
 * ARM9 函数 @ 0x020147d8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const main_ram_field_dx656c_getter = 0x020147d8 as const;
/**
 * ARM9 函数 @ 0x020147e8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const init_3_state_check = 0x020147e8 as const;
/**
 * ARM9 函数 @ 0x020148ca
 * @category prologue
 * @confidence high
 */
export const sub_020148ca = 0x020148ca as const;
/**
 * ARM9 函数 @ 0x020149c2
 * @category prologue
 * @confidence high
 */
export const sub_020149c2 = 0x020149c2 as const;
/**
 * ARM9 函数 @ 0x02014a10
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const init_3_state_check_b = 0x02014a10 as const;
/**
 * ARM9 函数 @ 0x02014cdc
 * @category prologue
 * @confidence high
 */
export const sub_02014cdc = 0x02014cdc as const;
/**
 * ARM9 函数 @ 0x0201515c
 * @category prologue
 * @confidence high
 */
export const sub_0201515c = 0x0201515c as const;
/**
 * ARM9 函数 @ 0x02015568
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const global_dword_get_d = 0x02015568 as const;
/**
 * ARM9 函数 @ 0x02015578
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const halfword_mode_bits_set = 0x02015578 as const;
/**
 * ARM9 函数 @ 0x0201557c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0400100c = 0x0201557c as const;
/**
 * ARM9 函数 @ 0x020155c0
 * @category prologue
 * @confidence high
 */
export const sub_020155c0 = 0x020155c0 as const;
/**
 * ARM9 函数 @ 0x02015b1c
 * @category prologue
 * @confidence high
 */
export const sub_02015b1c = 0x02015b1c as const;
/**
 * ARM9 函数 @ 0x02015e28
 * @category prologue
 * @confidence high
 */
export const sub_02015e28 = 0x02015e28 as const;
/**
 * ARM9 函数 @ 0x02016004
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x02106f18 = 0x02016004 as const;
/**
 * ARM9 函数 @ 0x02016080
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x02106f18 = 0x02016080 as const;
/**
 * ARM9 函数 @ 0x0201622c
 * @category prologue
 * @confidence high
 */
export const sub_0201622c = 0x0201622c as const;
/**
 * ARM9 函数 @ 0x020167dc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x02106574 = 0x020167dc as const;
/**
 * ARM9 函数 @ 0x02016a40
 * @category prologue
 * @confidence high
 */
export const sub_02016a40 = 0x02016a40 as const;
/**
 * ARM9 函数 @ 0x02017050
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x0210656c = 0x02017050 as const;
/**
 * ARM9 函数 @ 0x020170a0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x021065ac_1 = 0x020170a0 as const;
/**
 * ARM9 函数 @ 0x02017128
 * @category prologue
 * @confidence high
 */
export const sub_02017128 = 0x02017128 as const;
/**
 * ARM9 函数 @ 0x02017720
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const state_dispatch_0_8_0x10 = 0x02017720 as const;
/**
 * ARM9 函数 @ 0x0201794c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const stub_noop_d = 0x0201794c as const;
/**
 * ARM9 函数 @ 0x02017950
 * @category prologue
 * @confidence high
 */
export const sub_02017950 = 0x02017950 as const;
/**
 * ARM9 函数 @ 0x02017986
 * @category prologue
 * @confidence high
 */
export const sub_02017986 = 0x02017986 as const;
/**
 * ARM9 函数 @ 0x02018350
 * @category prologue
 * @confidence high
 */
export const sub_02018350 = 0x02018350 as const;
/**
 * ARM9 函数 @ 0x02018386
 * @category prologue
 * @confidence high
 */
export const sub_02018386 = 0x02018386 as const;
/**
 * ARM9 函数 @ 0x02018fe4
 * @category prologue
 * @confidence high
 */
export const sub_02018fe4 = 0x02018fe4 as const;
/**
 * ARM9 函数 @ 0x0201905e
 * @category prologue
 * @confidence high
 */
export const sub_0201905e = 0x0201905e as const;
/**
 * ARM9 函数 @ 0x02019106
 * @category prologue
 * @confidence high
 */
export const sub_02019106 = 0x02019106 as const;
/**
 * ARM9 函数 @ 0x02019192
 * @category prologue
 * @confidence high
 */
export const sub_02019192 = 0x02019192 as const;
/**
 * ARM9 函数 @ 0x0201939a
 * @category prologue
 * @confidence high
 */
export const sub_0201939a = 0x0201939a as const;
/**
 * ARM9 函数 @ 0x020193e0
 * @category prologue
 * @confidence high
 */
export const sub_020193e0 = 0x020193e0 as const;
/**
 * ARM9 函数 @ 0x0201970c
 * @category prologue
 * @confidence high
 */
export const sub_0201970c = 0x0201970c as const;
/**
 * ARM9 函数 @ 0x02019742
 * @category prologue
 * @confidence high
 */
export const sub_02019742 = 0x02019742 as const;
/**
 * ARM9 函数 @ 0x0201978c
 * @category prologue
 * @confidence high
 */
export const sub_0201978c = 0x0201978c as const;
/**
 * ARM9 函数 @ 0x02019798
 * @category prologue
 * @confidence high
 */
export const sub_02019798 = 0x02019798 as const;
/**
 * ARM9 函数 @ 0x02019830
 * @category prologue
 * @confidence high
 */
export const sub_02019830 = 0x02019830 as const;
/**
 * ARM9 函数 @ 0x0201983c
 * @category prologue
 * @confidence high
 */
export const sub_0201983c = 0x0201983c as const;
/**
 * ARM9 函数 @ 0x02019a1c
 * @category prologue
 * @confidence high
 */
export const sub_02019a1c = 0x02019a1c as const;
/**
 * ARM9 函数 @ 0x02019a38
 * @category prologue
 * @confidence high
 */
export const sub_02019a38 = 0x02019a38 as const;
/**
 * ARM9 函数 @ 0x02019a44
 * @category prologue
 * @confidence high
 */
export const sub_02019a44 = 0x02019a44 as const;
/**
 * ARM9 函数 @ 0x02019a6c
 * @category prologue
 * @confidence high
 */
export const sub_02019a6c = 0x02019a6c as const;
/**
 * ARM9 函数 @ 0x02019a78
 * @category prologue
 * @confidence high
 */
export const sub_02019a78 = 0x02019a78 as const;
/**
 * ARM9 函数 @ 0x02019bcc
 * @category prologue
 * @confidence high
 */
export const sub_02019bcc = 0x02019bcc as const;
/**
 * ARM9 函数 @ 0x02019d70
 * @category prologue
 * @confidence high
 */
export const sub_02019d70 = 0x02019d70 as const;
/**
 * ARM9 函数 @ 0x02019f28
 * @category prologue
 * @confidence high
 */
export const sub_02019f28 = 0x02019f28 as const;
/**
 * ARM9 函数 @ 0x02019f38
 * @category prologue
 * @confidence high
 */
export const sub_02019f38 = 0x02019f38 as const;
/**
 * ARM9 函数 @ 0x02019f5c
 * @category prologue
 * @confidence high
 */
export const sub_02019f5c = 0x02019f5c as const;
/**
 * ARM9 函数 @ 0x02019f84
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_3way_02019f84 = 0x02019f84 as const;
/**
 * ARM9 函数 @ 0x0201a0b0
 * @category prologue
 * @confidence high
 */
export const sub_0201a0b0 = 0x0201a0b0 as const;
/**
 * ARM9 函数 @ 0x0201a0e6
 * @category prologue
 * @confidence high
 */
export const sub_0201a0e6 = 0x0201a0e6 as const;
/**
 * ARM9 函数 @ 0x0201a964
 * @category prologue
 * @confidence high
 */
export const sub_0201a964 = 0x0201a964 as const;
/**
 * ARM9 函数 @ 0x0201a99a
 * @category prologue
 * @confidence high
 */
export const sub_0201a99a = 0x0201a99a as const;
/**
 * ARM9 函数 @ 0x0201acc0
 * @category prologue
 * @confidence high
 */
export const sub_0201acc0 = 0x0201acc0 as const;
/**
 * ARM9 函数 @ 0x0201acfc
 * @category prologue
 * @confidence high
 */
export const sub_0201acfc = 0x0201acfc as const;
/**
 * ARM9 函数 @ 0x0201af90
 * @category prologue
 * @confidence high
 */
export const sub_0201af90 = 0x0201af90 as const;
/**
 * ARM9 函数 @ 0x0201bea4
 * @category prologue
 * @confidence high
 */
export const sub_0201bea4 = 0x0201bea4 as const;
/**
 * ARM9 函数 @ 0x0201c71c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const global_dword_get_e = 0x0201c71c as const;
/**
 * ARM9 函数 @ 0x0201c72c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_1way_0201c72c = 0x0201c72c as const;
/**
 * ARM9 函数 @ 0x0201c768
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_1way_0201c768 = 0x0201c768 as const;
/**
 * ARM9 函数 @ 0x0201c8c4
 * @category prologue
 * @confidence high
 */
export const sub_0201c8c4 = 0x0201c8c4 as const;
/**
 * ARM9 函数 @ 0x0201c9f4
 * @category prologue
 * @confidence high
 */
export const sub_0201c9f4 = 0x0201c9f4 as const;
/**
 * ARM9 函数 @ 0x0201cbdc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x02106794 = 0x0201cbdc as const;
/**
 * ARM9 函数 @ 0x0201cc60
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const global_halfword_set_b = 0x0201cc60 as const;
/**
 * ARM9 函数 @ 0x0201cc70
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_state_setter_201ccb4 = 0x0201cc70 as const;
/**
 * ARM9 函数 @ 0x0201cca8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 11
 */
export const state_setter_b = 0x0201cca8 as const;
/**
 * ARM9 函数 @ 0x0201ccb8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 8
 */
export const state_getter_b = 0x0201ccb8 as const;
/**
 * ARM9 函数 @ 0x0201ccc8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const array_11slot_clear = 0x0201ccc8 as const;
/**
 * ARM9 函数 @ 0x0201ccf0
 * @category prologue
 * @confidence high
 */
export const sub_0201ccf0 = 0x0201ccf0 as const;
/**
 * ARM9 函数 @ 0x0201cdc8
 * @category prologue
 * @confidence high
 */
export const sub_0201cdc8 = 0x0201cdc8 as const;
/**
 * ARM9 函数 @ 0x0201d3ac
 * @category prologue
 * @confidence high
 */
export const sub_0201d3ac = 0x0201d3ac as const;
/**
 * ARM9 函数 @ 0x0201d548
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 6
 */
export const global_dword_get_f = 0x0201d548 as const;
/**
 * ARM9 函数 @ 0x0201d558
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0210ab84_1_2 = 0x0201d558 as const;
/**
 * ARM9 函数 @ 0x0201d5a6
 * @category prologue
 * @confidence high
 */
export const sub_0201d5a6 = 0x0201d5a6 as const;
/**
 * ARM9 函数 @ 0x0201d768
 * @category prologue
 * @confidence high
 */
export const sub_0201d768 = 0x0201d768 as const;
/**
 * ARM9 函数 @ 0x0201da30
 * @category prologue
 * @confidence high
 */
export const sub_0201da30 = 0x0201da30 as const;
/**
 * ARM9 函数 @ 0x0201daf8
 * @category prologue
 * @confidence high
 */
export const sub_0201daf8 = 0x0201daf8 as const;
/**
 * ARM9 函数 @ 0x0201db34
 * @category prologue
 * @confidence high
 */
export const sub_0201db34 = 0x0201db34 as const;
/**
 * ARM9 函数 @ 0x0201dc1c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 9
 */
export const state_init_with_lift = 0x0201dc1c as const;
/**
 * ARM9 函数 @ 0x0201dc20
 * @category prologue
 * @confidence high
 */
export const sub_0201dc20 = 0x0201dc20 as const;
/**
 * ARM9 函数 @ 0x0201dcc8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 4
 */
export const is_state_valid_flag = 0x0201dcc8 as const;
/**
 * ARM9 函数 @ 0x0201dcf4
 * @category prologue
 * @confidence high
 */
export const sub_0201dcf4 = 0x0201dcf4 as const;
/**
 * ARM9 函数 @ 0x0201ddd0
 * @category prologue
 * @confidence high
 */
export const sub_0201ddd0 = 0x0201ddd0 as const;
/**
 * ARM9 函数 @ 0x0201deb8
 * @category prologue
 * @confidence high
 */
export const sub_0201deb8 = 0x0201deb8 as const;
/**
 * ARM9 函数 @ 0x0201df8c
 * @category prologue
 * @confidence high
 */
export const sub_0201df8c = 0x0201df8c as const;
/**
 * ARM9 函数 @ 0x0201e018
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const main_ram_field_init_setter = 0x0201e018 as const;
/**
 * ARM9 函数 @ 0x0201e574
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const halfword_pairs_copy_12 = 0x0201e574 as const;
/**
 * ARM9 函数 @ 0x0201e5ac
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_201e5b4 = 0x0201e5ac as const;
/**
 * ARM9 函数 @ 0x0201e76c
 * @category prologue
 * @confidence high
 */
export const sub_0201e76c = 0x0201e76c as const;
/**
 * ARM9 函数 @ 0x0201e8a0
 * @category prologue
 * @confidence high
 */
export const sub_0201e8a0 = 0x0201e8a0 as const;
/**
 * ARM9 函数 @ 0x0201e9cc
 * @category prologue
 * @confidence high
 */
export const sub_0201e9cc = 0x0201e9cc as const;
/**
 * ARM9 函数 @ 0x0201eb08
 * @category prologue
 * @confidence high
 */
export const sub_0201eb08 = 0x0201eb08 as const;
/**
 * ARM9 函数 @ 0x0201ed8c
 * @category prologue
 * @confidence high
 */
export const sub_0201ed8c = 0x0201ed8c as const;
/**
 * ARM9 函数 @ 0x0201eeb0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const global_dword_get_b = 0x0201eeb0 as const;
/**
 * ARM9 函数 @ 0x0201eec0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_triple_clear_guarded = 0x0201eec0 as const;
/**
 * ARM9 函数 @ 0x0201eef8
 * @category prologue
 * @confidence high
 */
export const sub_0201eef8 = 0x0201eef8 as const;
/**
 * ARM9 函数 @ 0x0201efa0
 * @category prologue
 * @confidence high
 */
export const sub_0201efa0 = 0x0201efa0 as const;
/**
 * ARM9 函数 @ 0x0201f1ec
 * @category prologue
 * @confidence high
 */
export const sub_0201f1ec = 0x0201f1ec as const;
/**
 * ARM9 函数 @ 0x0201f48c
 * @category prologue
 * @confidence high
 */
export const sub_0201f48c = 0x0201f48c as const;
/**
 * ARM9 函数 @ 0x0201f550
 * @category prologue
 * @confidence high
 */
export const sub_0201f550 = 0x0201f550 as const;
/**
 * ARM9 函数 @ 0x0201f5d8
 * @category prologue
 * @confidence high
 */
export const sub_0201f5d8 = 0x0201f5d8 as const;
/**
 * ARM9 函数 @ 0x0201f654
 * @category prologue
 * @confidence high
 */
export const sub_0201f654 = 0x0201f654 as const;
/**
 * ARM9 函数 @ 0x0201f6d0
 * @category prologue
 * @confidence high
 */
export const sub_0201f6d0 = 0x0201f6d0 as const;
/**
 * ARM9 函数 @ 0x0201fdac
 * @category prologue
 * @confidence high
 */
export const sub_0201fdac = 0x0201fdac as const;
/**
 * ARM9 函数 @ 0x0201fe40
 * @category prologue
 * @confidence high
 */
export const sub_0201fe40 = 0x0201fe40 as const;
/**
 * ARM9 函数 @ 0x02020170
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_indirect_global_ptr = 0x02020170 as const;
/**
 * ARM9 函数 @ 0x02020188
 * @category prologue
 * @confidence high
 */
export const sub_02020188 = 0x02020188 as const;
/**
 * ARM9 函数 @ 0x02020274
 * @category prologue
 * @confidence high
 */
export const sub_02020274 = 0x02020274 as const;
/**
 * ARM9 函数 @ 0x02020374
 * @category prologue
 * @confidence high
 */
export const sub_02020374 = 0x02020374 as const;
/**
 * ARM9 函数 @ 0x02020474
 * @category prologue
 * @confidence high
 */
export const sub_02020474 = 0x02020474 as const;
/**
 * ARM9 函数 @ 0x020206fc
 * @category prologue
 * @confidence high
 */
export const sub_020206fc = 0x020206fc as const;
/**
 * ARM9 函数 @ 0x020207f0
 * @category prologue
 * @confidence high
 */
export const sub_020207f0 = 0x020207f0 as const;
/**
 * ARM9 函数 @ 0x020208fc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 8
 */
export const list_scan_50_for_nonzero = 0x020208fc as const;
/**
 * ARM9 函数 @ 0x02020930
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const main_ram_field_dx6df8_getter = 0x02020930 as const;
/**
 * ARM9 函数 @ 0x02020940
 * @category prologue
 * @confidence high
 */
export const sub_02020940 = 0x02020940 as const;
/**
 * ARM9 函数 @ 0x020209cc
 * @category prologue
 * @confidence high
 */
export const sub_020209cc = 0x020209cc as const;
/**
 * ARM9 函数 @ 0x02020cb4
 * @category prologue
 * @confidence high
 */
export const sub_02020cb4 = 0x02020cb4 as const;
/**
 * ARM9 函数 @ 0x02020cc0
 * @category prologue
 * @confidence high
 */
export const sub_02020cc0 = 0x02020cc0 as const;
/**
 * ARM9 函数 @ 0x02020cc4
 * @category prologue
 * @confidence high
 */
export const sub_02020cc4 = 0x02020cc4 as const;
/**
 * ARM9 函数 @ 0x02020cc8
 * @category prologue
 * @confidence high
 */
export const sub_02020cc8 = 0x02020cc8 as const;
/**
 * ARM9 函数 @ 0x02020ccc
 * @category prologue
 * @confidence high
 */
export const sub_02020ccc = 0x02020ccc as const;
/**
 * ARM9 函数 @ 0x02020cd0
 * @category prologue
 * @confidence high
 */
export const sub_02020cd0 = 0x02020cd0 as const;
/**
 * ARM9 函数 @ 0x02020d0c
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 39
 */
export const memcpy_32 = 0x02020d0c as const;
/**
 * ARM9 函数 @ 0x02020d1c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const main_ram_field_dx6ea4_getter = 0x02020d1c as const;
/**
 * ARM9 函数 @ 0x02020d2c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const global_set_true = 0x02020d2c as const;
/**
 * ARM9 函数 @ 0x02020d40
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const struct_clear_3field = 0x02020d40 as const;
/**
 * ARM9 函数 @ 0x02020d54
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const flag_set_from_stack_byte = 0x02020d54 as const;
/**
 * ARM9 函数 @ 0x02020d80
 * @category prologue
 * @confidence high
 */
export const sub_02020d80 = 0x02020d80 as const;
/**
 * ARM9 函数 @ 0x02020eb4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 8
 */
export const state_reset_a_dispatcher = 0x02020eb4 as const;
/**
 * ARM9 函数 @ 0x02020f08
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const main_ram_field_dx6e58_halfword_getter = 0x02020f08 as const;
/**
 * ARM9 函数 @ 0x02020f18
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 6
 */
export const global_halfword_set_c = 0x02020f18 as const;
/**
 * ARM9 函数 @ 0x02020f3c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const global_state_set_d = 0x02020f3c as const;
/**
 * ARM9 函数 @ 0x02020f4c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 12
 */
export const global_dword_get = 0x02020f4c as const;
/**
 * ARM9 函数 @ 0x02020f5c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 20
 */
export const state_word_eq2_check = 0x02020f5c as const;
/**
 * ARM9 函数 @ 0x02020f78
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 4
 */
export const global_dword_get_g = 0x02020f78 as const;
/**
 * ARM9 函数 @ 0x02020f88
 * @category prologue
 * @confidence high
 */
export const sub_02020f88 = 0x02020f88 as const;
/**
 * ARM9 函数 @ 0x020213c4
 * @category prologue
 * @confidence high
 */
export const sub_020213c4 = 0x020213c4 as const;
/**
 * ARM9 函数 @ 0x02021450
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const two_global_state_check = 0x02021450 as const;
/**
 * ARM9 函数 @ 0x020214f8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_2021500 = 0x020214f8 as const;
/**
 * ARM9 函数 @ 0x02021504
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_202151c = 0x02021504 as const;
/**
 * ARM9 函数 @ 0x02021568
 * @category prologue
 * @confidence high
 */
export const sub_02021568 = 0x02021568 as const;
/**
 * ARM9 函数 @ 0x02021634
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const global_dword64_store = 0x02021634 as const;
/**
 * ARM9 函数 @ 0x02021658
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const init_sequence_calls = 0x02021658 as const;
/**
 * ARM9 函数 @ 0x020216b4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const main_ram_field_dx6e50_byte_getter = 0x020216b4 as const;
/**
 * ARM9 函数 @ 0x020216c0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 25
 */
export const global_byte_load = 0x020216c0 as const;
/**
 * ARM9 函数 @ 0x020216d0
 * @category prologue
 * @confidence high
 */
export const sub_020216d0 = 0x020216d0 as const;
/**
 * ARM9 函数 @ 0x02021bb4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const main_ram_field_dx7c_setter = 0x02021bb4 as const;
/**
 * ARM9 函数 @ 0x02021bc4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 5
 */
export const conditional_dual_global_store = 0x02021bc4 as const;
/**
 * ARM9 函数 @ 0x02021be8
 * @category prologue
 * @confidence high
 */
export const sub_02021be8 = 0x02021be8 as const;
/**
 * ARM9 函数 @ 0x02021e6c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const main_ram_field_dx78_setter = 0x02021e6c as const;
/**
 * ARM9 函数 @ 0x02021e7c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const global_byte_set_a = 0x02021e7c as const;
/**
 * ARM9 函数 @ 0x02021e8c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x02106e7c = 0x02021e8c as const;
/**
 * ARM9 函数 @ 0x02021ec4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const dual_global_clear = 0x02021ec4 as const;
/**
 * ARM9 函数 @ 0x02021ee4
 * @category prologue
 * @confidence high
 */
export const sub_02021ee4 = 0x02021ee4 as const;
/**
 * ARM9 函数 @ 0x02021fc0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_2way_02021fc0 = 0x02021fc0 as const;
/**
 * ARM9 函数 @ 0x02021fc4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const stub_noop_c = 0x02021fc4 as const;
/**
 * ARM9 函数 @ 0x02021fc8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_2way_02021fc8 = 0x02021fc8 as const;
/**
 * ARM9 函数 @ 0x02022028
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x020f5558 = 0x02022028 as const;
/**
 * ARM9 函数 @ 0x0202209c
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_0202209c = 0x0202209c as const;
/**
 * ARM9 函数 @ 0x020220a0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x02107354 = 0x020220a0 as const;
/**
 * ARM9 函数 @ 0x02022290
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0210b358 = 0x02022290 as const;
/**
 * ARM9 函数 @ 0x020223a4
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_3way_020223a4 = 0x020223a4 as const;
/**
 * ARM9 函数 @ 0x0202251c
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_0202251c = 0x0202251c as const;
/**
 * ARM9 函数 @ 0x02022520
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04001008 = 0x02022520 as const;
/**
 * ARM9 函数 @ 0x02022840
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_3way_02022840 = 0x02022840 as const;
/**
 * ARM9 函数 @ 0x02022844
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_3way_02022844 = 0x02022844 as const;
/**
 * ARM9 函数 @ 0x02022848
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_3way_02022848 = 0x02022848 as const;
/**
 * ARM9 函数 @ 0x02022a50
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const stub_noop_e = 0x02022a50 as const;
/**
 * ARM9 函数 @ 0x02022a54
 * @category prologue
 * @confidence high
 */
export const sub_02022a54 = 0x02022a54 as const;
/**
 * ARM9 函数 @ 0x02022c90
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_array_mix_getter_0x02106e78_idx = 0x02022c90 as const;
/**
 * ARM9 函数 @ 0x02022d04
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const table_lookup_8b_sub_offsets = 0x02022d04 as const;
/**
 * ARM9 函数 @ 0x02022d68
 * @category prologue
 * @confidence high
 */
export const sub_02022d68 = 0x02022d68 as const;
/**
 * ARM9 函数 @ 0x02022ebc
 * @category prologue
 * @confidence high
 */
export const sub_02022ebc = 0x02022ebc as const;
/**
 * ARM9 函数 @ 0x0202300c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const stub_noop_f = 0x0202300c as const;
/**
 * ARM9 函数 @ 0x02023010
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const stub_noop_g = 0x02023010 as const;
/**
 * ARM9 函数 @ 0x02023014
 * @category prologue
 * @confidence high
 */
export const sub_02023014 = 0x02023014 as const;
/**
 * ARM9 函数 @ 0x02023098
 * @category prologue
 * @confidence high
 */
export const sub_02023098 = 0x02023098 as const;
/**
 * ARM9 函数 @ 0x020231b8
 * @category prologue
 * @confidence high
 */
export const sub_020231b8 = 0x020231b8 as const;
/**
 * ARM9 函数 @ 0x020233a0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x02107368 = 0x020233a0 as const;
/**
 * ARM9 函数 @ 0x02023424
 * @category prologue
 * @confidence high
 */
export const sub_02023424 = 0x02023424 as const;
/**
 * ARM9 函数 @ 0x02023510
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0210736c_1 = 0x02023510 as const;
/**
 * ARM9 函数 @ 0x02023534
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_array_w_access_0x02107390_idx = 0x02023534 as const;
/**
 * ARM9 函数 @ 0x0202371c
 * @category prologue
 * @confidence high
 */
export const sub_0202371c = 0x0202371c as const;
/**
 * ARM9 函数 @ 0x020239c4
 * @category prologue
 * @confidence high
 */
export const sub_020239c4 = 0x020239c4 as const;
/**
 * ARM9 函数 @ 0x02023cd0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0210ab88 = 0x02023cd0 as const;
/**
 * ARM9 函数 @ 0x02023d1c
 * @category prologue
 * @confidence high
 */
export const sub_02023d1c = 0x02023d1c as const;
/**
 * ARM9 函数 @ 0x02024614
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0212f238 = 0x02024614 as const;
/**
 * ARM9 函数 @ 0x02024660
 * @category prologue
 * @confidence high
 */
export const sub_02024660 = 0x02024660 as const;
/**
 * ARM9 函数 @ 0x02024c50
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x021078cc = 0x02024c50 as const;
/**
 * ARM9 函数 @ 0x02024c80
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const halfword_flag_bits_check = 0x02024c80 as const;
/**
 * ARM9 函数 @ 0x02024c84
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x0210b358 = 0x02024c84 as const;
/**
 * ARM9 函数 @ 0x02024d38
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_memcpy_word_lr = 0x02024d38 as const;
/**
 * ARM9 函数 @ 0x02024ec0
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02024ec0 = 0x02024ec0 as const;
/**
 * ARM9 函数 @ 0x02024ec4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x021078c0 = 0x02024ec4 as const;
/**
 * ARM9 函数 @ 0x02024f58
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_1way_02024f58 = 0x02024f58 as const;
/**
 * ARM9 函数 @ 0x02025a80
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_1way_02025a80 = 0x02025a80 as const;
/**
 * ARM9 函数 @ 0x02026474
 * @category prologue
 * @confidence high
 */
export const sub_02026474 = 0x02026474 as const;
/**
 * ARM9 函数 @ 0x0202650c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const const3_thunk_bx_0398e8 = 0x0202650c as const;
/**
 * ARM9 函数 @ 0x0202651c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const global_counter_mul5_add1 = 0x0202651c as const;
/**
 * ARM9 函数 @ 0x0202653c
 * @category prologue
 * @confidence high
 */
export const sub_0202653c = 0x0202653c as const;
/**
 * ARM9 函数 @ 0x02026628
 * @category prologue
 * @confidence high
 */
export const sub_02026628 = 0x02026628 as const;
/**
 * ARM9 函数 @ 0x02026660
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const guarded_init_3stage = 0x02026660 as const;
/**
 * ARM9 函数 @ 0x0202669c
 * @category prologue
 * @confidence high
 */
export const sub_0202669c = 0x0202669c as const;
/**
 * ARM9 函数 @ 0x0202683e
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_0202683e = 0x0202683e as const;
/**
 * ARM9 函数 @ 0x020268e8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04000304 = 0x020268e8 as const;
/**
 * ARM9 函数 @ 0x020269d8
 * @category prologue
 * @confidence high
 */
export const sub_020269d8 = 0x020269d8 as const;
/**
 * ARM9 函数 @ 0x02026a50
 * @category prologue
 * @confidence high
 */
export const sub_02026a50 = 0x02026a50 as const;
/**
 * ARM9 函数 @ 0x02026c00
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_indirect_thunk_0x02036784_n3 = 0x02026c00 as const;
/**
 * ARM9 函数 @ 0x02026c1c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_3bl_0x20373c8_0x2037a2c_0x2026c00 = 0x02026c1c as const;
/**
 * ARM9 函数 @ 0x02026c5c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_bl2_wrap_0x2030ca4_0x2030e20 = 0x02026c5c as const;
/**
 * ARM9 函数 @ 0x02026c78
 * @category prologue
 * @confidence high
 */
export const sub_02026c78 = 0x02026c78 as const;
/**
 * ARM9 函数 @ 0x02026ee4
 * @category prologue
 * @confidence high
 */
export const sub_02026ee4 = 0x02026ee4 as const;
/**
 * ARM9 函数 @ 0x02027010
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const halfword_table_fill_neg1_200x1c = 0x02027010 as const;
/**
 * ARM9 函数 @ 0x02027034
 * @category prologue
 * @confidence high
 */
export const sub_02027034 = 0x02027034 as const;
/**
 * ARM9 函数 @ 0x02027364
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const byte_table_fill_neg1_50x10 = 0x02027364 as const;
/**
 * ARM9 函数 @ 0x02027398
 * @category prologue
 * @confidence high
 */
export const sub_02027398 = 0x02027398 as const;
/**
 * ARM9 函数 @ 0x02027410
 * @category prologue
 * @confidence high
 */
export const sub_02027410 = 0x02027410 as const;
/**
 * ARM9 函数 @ 0x020274f0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const triple_gate_check_to_0x202f3fc = 0x020274f0 as const;
/**
 * ARM9 函数 @ 0x02027548
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_1way_02027548 = 0x02027548 as const;
/**
 * ARM9 函数 @ 0x020276e4
 * @category prologue
 * @confidence high
 */
export const sub_020276e4 = 0x020276e4 as const;
/**
 * ARM9 函数 @ 0x020277ac
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_20277c8_a = 0x020277ac as const;
/**
 * ARM9 函数 @ 0x020277bc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_20277c8_b = 0x020277bc as const;
/**
 * ARM9 函数 @ 0x020278d8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const global_halfword_move_36_call_02928c = 0x020278d8 as const;
/**
 * ARM9 函数 @ 0x02027900
 * @category prologue
 * @confidence high
 */
export const sub_02027900 = 0x02027900 as const;
/**
 * ARM9 函数 @ 0x020279cc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_20279d4 = 0x020279cc as const;
/**
 * ARM9 函数 @ 0x020279d8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0210a860 = 0x020279d8 as const;
/**
 * ARM9 函数 @ 0x020279f4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const table_stride12_get_0210a8e0 = 0x020279f4 as const;
/**
 * ARM9 函数 @ 0x02027a1c
 * @category prologue
 * @confidence high
 */
export const sub_02027a1c = 0x02027a1c as const;
/**
 * ARM9 函数 @ 0x02027a7e
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02027a7e = 0x02027a7e as const;
/**
 * ARM9 函数 @ 0x02027ba0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0210a9e0 = 0x02027ba0 as const;
/**
 * ARM9 函数 @ 0x02027bf8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const sbyte_array_compare = 0x02027bf8 as const;
/**
 * ARM9 函数 @ 0x02027c44
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 7
 */
export const mem_byte_copy_signed = 0x02027c44 as const;
/**
 * ARM9 函数 @ 0x02027c68
 * @category prologue
 * @confidence high
 */
export const sub_02027c68 = 0x02027c68 as const;
/**
 * ARM9 函数 @ 0x02027da0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0210aaf0_1 = 0x02027da0 as const;
/**
 * ARM9 函数 @ 0x02027e88
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_cond_set_2_to_1 = 0x02027e88 as const;
/**
 * ARM9 函数 @ 0x02027ea4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const main_ram_field_dxaaf0_getter = 0x02027ea4 as const;
/**
 * ARM9 函数 @ 0x02027eb8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const global_dword_get_h = 0x02027eb8 as const;
/**
 * ARM9 函数 @ 0x02027ec8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0210ab20 = 0x02027ec8 as const;
/**
 * ARM9 函数 @ 0x02027ee8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 6
 */
export const const_true_getter = 0x02027ee8 as const;
/**
 * ARM9 函数 @ 0x02027ef0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0210ab00 = 0x02027ef0 as const;
/**
 * ARM9 函数 @ 0x02027f30
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0210ab44 = 0x02027f30 as const;
/**
 * ARM9 函数 @ 0x02027f70
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x0210ab4c = 0x02027f70 as const;
/**
 * ARM9 函数 @ 0x02027fa4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 10
 */
export const early_return_if_global_eq_arg0 = 0x02027fa4 as const;
/**
 * ARM9 函数 @ 0x02027ff4
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 26
 */
export const mem_set_32 = 0x02027ff4 as const;
/**
 * ARM9 函数 @ 0x0202802c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_indirect_thunk_0x0202fb7c_n4 = 0x0202802c as const;
/**
 * ARM9 函数 @ 0x0202804c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_indirect_2args_global = 0x0202804c as const;
/**
 * ARM9 函数 @ 0x0202807c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_indirect_global_ptr_b = 0x0202807c as const;
/**
 * ARM9 函数 @ 0x02028094
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x0210ab3c = 0x02028094 as const;
/**
 * ARM9 函数 @ 0x020280ac
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x0210ab3c_2 = 0x020280ac as const;
/**
 * ARM9 函数 @ 0x0202811c
 * @category prologue
 * @confidence high
 */
export const sub_0202811c = 0x0202811c as const;
/**
 * ARM9 函数 @ 0x02028240
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const list_stride44_walk = 0x02028240 as const;
/**
 * ARM9 函数 @ 0x02028244
 * @category prologue
 * @confidence high
 */
export const sub_02028244 = 0x02028244 as const;
/**
 * ARM9 函数 @ 0x02028354
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const guard_null_ret_minus1 = 0x02028354 as const;
/**
 * ARM9 函数 @ 0x02028358
 * @category prologue
 * @confidence high
 */
export const sub_02028358 = 0x02028358 as const;
/**
 * ARM9 函数 @ 0x020283f0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 11
 */
export const vec2_compare_2x4byte = 0x020283f0 as const;
/**
 * ARM9 函数 @ 0x02028434
 * @category near
 * @confidence high
 * @known V0.4 named
 * @callers 221
 */
export const vec2_set_inline = 0x02028434 as const;
/**
 * ARM9 函数 @ 0x02028450
 * @category prologue
 * @confidence high
 */
export const sub_02028450 = 0x02028450 as const;
/**
 * ARM9 函数 @ 0x02028488
 * @category prologue
 * @confidence high
 */
export const sub_02028488 = 0x02028488 as const;
/**
 * ARM9 函数 @ 0x020284f0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const struct_3field_compare = 0x020284f0 as const;
/**
 * ARM9 函数 @ 0x0202854c
 * @category prologue
 * @confidence high
 */
export const sub_0202854c = 0x0202854c as const;
/**
 * ARM9 函数 @ 0x020285f4
 * @category prologue
 * @confidence high
 */
export const sub_020285f4 = 0x020285f4 as const;
/**
 * ARM9 函数 @ 0x0202863c
 * @category prologue
 * @confidence high
 */
export const sub_0202863c = 0x0202863c as const;
/**
 * ARM9 函数 @ 0x02028688
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 6
 */
export const array_setter_4b_chain = 0x02028688 as const;
/**
 * ARM9 函数 @ 0x020286ec
 * @category prologue
 * @confidence high
 */
export const sub_020286ec = 0x020286ec as const;
/**
 * ARM9 函数 @ 0x02028790
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const main_ram_field_dx54b_getter = 0x02028790 as const;
/**
 * ARM9 函数 @ 0x020287a0
 * @category prologue
 * @confidence high
 */
export const sub_020287a0 = 0x020287a0 as const;
/**
 * ARM9 函数 @ 0x020287f0
 * @category prologue
 * @confidence high
 */
export const sub_020287f0 = 0x020287f0 as const;
/**
 * ARM9 函数 @ 0x02028840
 * @category prologue
 * @confidence high
 */
export const sub_02028840 = 0x02028840 as const;
/**
 * ARM9 函数 @ 0x0202887c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const ubyte_array_compare = 0x0202887c as const;
/**
 * ARM9 函数 @ 0x020288c8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const is_no_key_pressed = 0x020288c8 as const;
/**
 * ARM9 函数 @ 0x020288e0
 * @category prologue
 * @confidence high
 */
export const sub_020288e0 = 0x020288e0 as const;
/**
 * ARM9 函数 @ 0x02028918
 * @category prologue
 * @confidence high
 */
export const sub_02028918 = 0x02028918 as const;
/**
 * ARM9 函数 @ 0x02028a78
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021078dc = 0x02028a78 as const;
/**
 * ARM9 函数 @ 0x02028a7a
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02028a7a = 0x02028a7a as const;
/**
 * ARM9 函数 @ 0x02028af0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04000130 = 0x02028af0 as const;
/**
 * ARM9 函数 @ 0x02028b34
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 9
 */
export const array_init_zero_0x18_stride = 0x02028b34 as const;
/**
 * ARM9 函数 @ 0x02028b58
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_sp_fields_copy_n6 = 0x02028b58 as const;
/**
 * ARM9 函数 @ 0x02028b80
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0210fb78 = 0x02028b80 as const;
/**
 * ARM9 函数 @ 0x02028bd4
 * @category prologue
 * @confidence high
 */
export const sub_02028bd4 = 0x02028bd4 as const;
/**
 * ARM9 函数 @ 0x02028c48
 * @category prologue
 * @confidence high
 */
export const sub_02028c48 = 0x02028c48 as const;
/**
 * ARM9 函数 @ 0x02028ca8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x02113d18 = 0x02028ca8 as const;
/**
 * ARM9 函数 @ 0x02028dc4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x02113d18_1 = 0x02028dc4 as const;
/**
 * ARM9 函数 @ 0x02028dec
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 9
 */
export const array_init_zero_0xc_stride_offset_8 = 0x02028dec as const;
/**
 * ARM9 函数 @ 0x02028e20
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_struct_copy_n16 = 0x02028e20 as const;
/**
 * ARM9 函数 @ 0x02028eac
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 14
 */
export const struct_pop_field_writer = 0x02028eac as const;
/**
 * ARM9 函数 @ 0x02028f2c
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_02028f2c = 0x02028f2c as const;
/**
 * ARM9 函数 @ 0x0202920c
 * @category prologue
 * @confidence high
 */
export const sub_0202920c = 0x0202920c as const;
/**
 * ARM9 函数 @ 0x02029250
 * @category prologue
 * @confidence high
 */
export const sub_02029250 = 0x02029250 as const;
/**
 * ARM9 函数 @ 0x020292d4
 * @category prologue
 * @confidence high
 */
export const sub_020292d4 = 0x020292d4 as const;
/**
 * ARM9 函数 @ 0x0202935c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 9
 */
export const wrapper_call_2_funcs = 0x0202935c as const;
/**
 * ARM9 函数 @ 0x02029378
 * @category prologue
 * @confidence high
 */
export const sub_02029378 = 0x02029378 as const;
/**
 * ARM9 函数 @ 0x02029698
 * @category prologue
 * @confidence high
 */
export const sub_02029698 = 0x02029698 as const;
/**
 * ARM9 函数 @ 0x020296ec
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_1way_020296ec = 0x020296ec as const;
/**
 * ARM9 函数 @ 0x02029772
 * @category prologue
 * @confidence high
 */
export const sub_02029772 = 0x02029772 as const;
/**
 * ARM9 函数 @ 0x020297be
 * @category prologue
 * @confidence high
 */
export const sub_020297be = 0x020297be as const;
/**
 * ARM9 函数 @ 0x02029820
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const main_ram_field_dxb60_setter = 0x02029820 as const;
/**
 * ARM9 函数 @ 0x02029830
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 12
 */
export const state_set_c = 0x02029830 as const;
/**
 * ARM9 函数 @ 0x02029840
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 11
 */
export const state_set_struct_v2 = 0x02029840 as const;
/**
 * ARM9 函数 @ 0x02029860
 * @category prologue
 * @confidence high
 */
export const sub_02029860 = 0x02029860 as const;
/**
 * ARM9 函数 @ 0x020298f4
 * @category prologue
 * @confidence high
 */
export const sub_020298f4 = 0x020298f4 as const;
/**
 * ARM9 函数 @ 0x02029990
 * @category prologue
 * @confidence high
 */
export const sub_02029990 = 0x02029990 as const;
/**
 * ARM9 函数 @ 0x02029a08
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_state_setter_2029a38 = 0x02029a08 as const;
/**
 * ARM9 函数 @ 0x02029a2c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const main_ram_field_dxab38_setter = 0x02029a2c as const;
/**
 * ARM9 函数 @ 0x02029a3c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_state_setter_2029a64 = 0x02029a3c as const;
/**
 * ARM9 函数 @ 0x02029a58
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 67
 */
export const simple_set_var_4byte = 0x02029a58 as const;
/**
 * ARM9 函数 @ 0x02029a68
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_cond_pick = 0x02029a68 as const;
/**
 * ARM9 函数 @ 0x02029a8c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const main_ram_field_dxab64_setter = 0x02029a8c as const;
/**
 * ARM9 函数 @ 0x02029a9c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_1way_02029a9c = 0x02029a9c as const;
/**
 * ARM9 函数 @ 0x02029ab8
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 60
 */
export const state_dispatch_8way = 0x02029ab8 as const;
/**
 * ARM9 函数 @ 0x02029bb0
 * @category prologue
 * @confidence high
 * @known V0.4 named
 */
export const state_switch_8way_packed = 0x02029bb0 as const;
/**
 * ARM9 函数 @ 0x02029d78
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x02108e08 = 0x02029d78 as const;
/**
 * ARM9 函数 @ 0x02029de4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_2bl_0x20395f4_0x2037830 = 0x02029de4 as const;
/**
 * ARM9 函数 @ 0x02029e18
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_2bl_0x20395f4_0x2037898 = 0x02029e18 as const;
/**
 * ARM9 函数 @ 0x02029e4c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_multi_bl_init_8bl_0x20395f4_0x2037708_0x20395f4_0x2037638_0x20395f4_0x2037568_0x20395f4_0x2037498 = 0x02029e4c as const;
/**
 * ARM9 函数 @ 0x02029ee0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x0210d378 = 0x02029ee0 as const;
/**
 * ARM9 函数 @ 0x02029fa4
 * @category prologue
 * @confidence high
 */
export const sub_02029fa4 = 0x02029fa4 as const;
/**
 * ARM9 函数 @ 0x02029fd4
 * @category prologue
 * @confidence high
 */
export const sub_02029fd4 = 0x02029fd4 as const;
/**
 * ARM9 函数 @ 0x0202a28c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const global_4word_copy_0210ab9c = 0x0202a28c as const;
/**
 * ARM9 函数 @ 0x0202a2b8
 * @category prologue
 * @confidence high
 */
export const sub_0202a2b8 = 0x0202a2b8 as const;
/**
 * ARM9 函数 @ 0x0202a39a
 * @category prologue
 * @confidence high
 */
export const sub_0202a39a = 0x0202a39a as const;
/**
 * ARM9 函数 @ 0x0202a39e
 * @category prologue
 * @confidence high
 */
export const sub_0202a39e = 0x0202a39e as const;
/**
 * ARM9 函数 @ 0x0202a3aa
 * @category prologue
 * @confidence high
 */
export const sub_0202a3aa = 0x0202a3aa as const;
/**
 * ARM9 函数 @ 0x0202a45e
 * @category prologue
 * @confidence high
 */
export const sub_0202a45e = 0x0202a45e as const;
/**
 * ARM9 函数 @ 0x0202a4d2
 * @category prologue
 * @confidence high
 */
export const sub_0202a4d2 = 0x0202a4d2 as const;
/**
 * ARM9 函数 @ 0x0202a4d6
 * @category prologue
 * @confidence high
 */
export const sub_0202a4d6 = 0x0202a4d6 as const;
/**
 * ARM9 函数 @ 0x0202a4e2
 * @category prologue
 * @confidence high
 */
export const sub_0202a4e2 = 0x0202a4e2 as const;
/**
 * ARM9 函数 @ 0x0202a596
 * @category prologue
 * @confidence high
 */
export const sub_0202a596 = 0x0202a596 as const;
/**
 * ARM9 函数 @ 0x0202a5c4
 * @category prologue
 * @confidence high
 */
export const sub_0202a5c4 = 0x0202a5c4 as const;
/**
 * ARM9 函数 @ 0x0202a7d8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0210ab78 = 0x0202a7d8 as const;
/**
 * ARM9 函数 @ 0x0202a830
 * @category prologue
 * @confidence high
 */
export const sub_0202a830 = 0x0202a830 as const;
/**
 * ARM9 函数 @ 0x0202a888
 * @category prologue
 * @confidence high
 */
export const sub_0202a888 = 0x0202a888 as const;
/**
 * ARM9 函数 @ 0x0202a9f4
 * @category prologue
 * @confidence high
 */
export const sub_0202a9f4 = 0x0202a9f4 as const;
/**
 * ARM9 函数 @ 0x0202ad30
 * @category prologue
 * @confidence high
 */
export const sub_0202ad30 = 0x0202ad30 as const;
/**
 * ARM9 函数 @ 0x0202ad74
 * @category prologue
 * @confidence high
 */
export const sub_0202ad74 = 0x0202ad74 as const;
/**
 * ARM9 函数 @ 0x0202ae18
 * @category prologue
 * @confidence high
 */
export const sub_0202ae18 = 0x0202ae18 as const;
/**
 * ARM9 函数 @ 0x0202aebc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const cstring_max_run_len_store = 0x0202aebc as const;
/**
 * ARM9 函数 @ 0x0202aefc
 * @category prologue
 * @confidence high
 */
export const sub_0202aefc = 0x0202aefc as const;
/**
 * ARM9 函数 @ 0x0202afb4
 * @category prologue
 * @confidence high
 */
export const sub_0202afb4 = 0x0202afb4 as const;
/**
 * ARM9 函数 @ 0x0202b0c0
 * @category prologue
 * @confidence high
 */
export const sub_0202b0c0 = 0x0202b0c0 as const;
/**
 * ARM9 函数 @ 0x0202b1cc
 * @category prologue
 * @confidence high
 */
export const sub_0202b1cc = 0x0202b1cc as const;
/**
 * ARM9 函数 @ 0x0202b644
 * @category prologue
 * @confidence high
 */
export const sub_0202b644 = 0x0202b644 as const;
/**
 * ARM9 函数 @ 0x0202ba40
 * @category prologue
 * @confidence high
 */
export const sub_0202ba40 = 0x0202ba40 as const;
/**
 * ARM9 函数 @ 0x0202bb4c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 8
 */
export const tail_call_02027a40 = 0x0202bb4c as const;
/**
 * ARM9 函数 @ 0x0202bb60
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const const_args_call_027bfc = 0x0202bb60 as const;
/**
 * ARM9 函数 @ 0x0202bb78
 * @category prologue
 * @confidence high
 */
export const sub_0202bb78 = 0x0202bb78 as const;
/**
 * ARM9 函数 @ 0x0202bbc4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 22
 */
export const slot_array_set_8b = 0x0202bbc4 as const;
/**
 * ARM9 函数 @ 0x0202bbe4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 3
 */
export const call_indirect_const_0_to_02036784 = 0x0202bbe4 as const;
/**
 * ARM9 函数 @ 0x0202bbfc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 21
 */
export const tail_call_set_arg1_r2_set_arg0_0 = 0x0202bbfc as const;
/**
 * ARM9 函数 @ 0x0202bc10
 * @category prologue
 * @confidence high
 */
export const sub_0202bc10 = 0x0202bc10 as const;
/**
 * ARM9 函数 @ 0x0202bd04
 * @category prologue
 * @confidence high
 */
export const sub_0202bd04 = 0x0202bd04 as const;
/**
 * ARM9 函数 @ 0x0202bd34
 * @category prologue
 * @confidence high
 */
export const sub_0202bd34 = 0x0202bd34 as const;
/**
 * ARM9 函数 @ 0x0202bd64
 * @category prologue
 * @confidence high
 */
export const sub_0202bd64 = 0x0202bd64 as const;
/**
 * ARM9 函数 @ 0x0202c038
 * @category prologue
 * @confidence high
 */
export const sub_0202c038 = 0x0202c038 as const;
/**
 * ARM9 函数 @ 0x0202c04c
 * @category prologue
 * @confidence high
 */
export const sub_0202c04c = 0x0202c04c as const;
/**
 * ARM9 函数 @ 0x0202c320
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 7
 */
export const switch_dispatch_5way = 0x0202c320 as const;
/**
 * ARM9 函数 @ 0x0202c51c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 8
 */
export const call_indirect_const_to_020367ec = 0x0202c51c as const;
/**
 * ARM9 函数 @ 0x0202c538
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 9
 */
export const array_8slot_clear = 0x0202c538 as const;
/**
 * ARM9 函数 @ 0x0202c5bc
 * @category prologue
 * @confidence high
 */
export const sub_0202c5bc = 0x0202c5bc as const;
/**
 * ARM9 函数 @ 0x0202c60c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const init_trampoline_calls = 0x0202c60c as const;
/**
 * ARM9 函数 @ 0x0202c664
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const init_sequence_5calls = 0x0202c664 as const;
/**
 * ARM9 函数 @ 0x0202c69c
 * @category prologue
 * @confidence high
 */
export const sub_0202c69c = 0x0202c69c as const;
/**
 * ARM9 函数 @ 0x0202ca76
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_0202ca76 = 0x0202ca76 as const;
/**
 * ARM9 函数 @ 0x0202cca4
 * @category prologue
 * @confidence high
 */
export const sub_0202cca4 = 0x0202cca4 as const;
/**
 * ARM9 函数 @ 0x0202cef8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const main_ram_field_dxb24c_halfword_getter = 0x0202cef8 as const;
/**
 * ARM9 函数 @ 0x0202cf08
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const scene_state_check_op_branch = 0x0202cf08 as const;
/**
 * ARM9 函数 @ 0x0202cf68
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const guarded_dual_state_check = 0x0202cf68 as const;
/**
 * ARM9 函数 @ 0x0202d0d4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 15
 */
export const state_validate_early_return = 0x0202d0d4 as const;
/**
 * ARM9 函数 @ 0x0202d104
 * @category prologue
 * @confidence high
 */
export const sub_0202d104 = 0x0202d104 as const;
/**
 * ARM9 函数 @ 0x0202d184
 * @category prologue
 * @confidence high
 */
export const sub_0202d184 = 0x0202d184 as const;
/**
 * ARM9 函数 @ 0x0202d190
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_indirect_3args_global = 0x0202d190 as const;
/**
 * ARM9 函数 @ 0x0202d1ac
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_0202d1ac = 0x0202d1ac as const;
/**
 * ARM9 函数 @ 0x0202d1b0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const global_state6_dispatch_callback_021bb258 = 0x0202d1b0 as const;
/**
 * ARM9 函数 @ 0x0202d28c
 * @category prologue
 * @confidence high
 */
export const sub_0202d28c = 0x0202d28c as const;
/**
 * ARM9 函数 @ 0x0202d3cc
 * @category prologue
 * @confidence high
 */
export const sub_0202d3cc = 0x0202d3cc as const;
/**
 * ARM9 函数 @ 0x0202d580
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x021bc760 = 0x0202d580 as const;
/**
 * ARM9 函数 @ 0x0202d60c
 * @category prologue
 * @confidence high
 */
export const sub_0202d60c = 0x0202d60c as const;
/**
 * ARM9 函数 @ 0x0202d69c
 * @category prologue
 * @confidence high
 */
export const sub_0202d69c = 0x0202d69c as const;
/**
 * ARM9 函数 @ 0x0202d784
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const state_7_flow_call = 0x0202d784 as const;
/**
 * ARM9 函数 @ 0x0202d800
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const call_2045ed0_const5args = 0x0202d800 as const;
/**
 * ARM9 函数 @ 0x0202d82c
 * @category prologue
 * @confidence high
 */
export const sub_0202d82c = 0x0202d82c as const;
/**
 * ARM9 函数 @ 0x0202d91c
 * @category prologue
 * @confidence high
 */
export const sub_0202d91c = 0x0202d91c as const;
/**
 * ARM9 函数 @ 0x0202d9d0
 * @category prologue
 * @confidence high
 */
export const sub_0202d9d0 = 0x0202d9d0 as const;
/**
 * ARM9 函数 @ 0x0202dab0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const main_ram_field_dxb25c_getter = 0x0202dab0 as const;
/**
 * ARM9 函数 @ 0x0202dac4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 18
 */
export const global_dword_load_chain = 0x0202dac4 as const;
/**
 * ARM9 函数 @ 0x0202dad4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const global_halfword_get_a = 0x0202dad4 as const;
/**
 * ARM9 函数 @ 0x0202dae4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_field_setter_202db04_off8_a = 0x0202dae4 as const;
/**
 * ARM9 函数 @ 0x0202daf8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_field_setter_202db04_off8_b = 0x0202daf8 as const;
/**
 * ARM9 函数 @ 0x0202db44
 * @category prologue
 * @confidence high
 */
export const sub_0202db44 = 0x0202db44 as const;
/**
 * ARM9 函数 @ 0x0202db80
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x02029b44 = 0x0202db80 as const;
/**
 * ARM9 函数 @ 0x0202dbfc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x02029bc4 = 0x0202dbfc as const;
/**
 * ARM9 函数 @ 0x0202dc98
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const state_3_flow_2_check = 0x0202dc98 as const;
/**
 * ARM9 函数 @ 0x0202dcdc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x021bb258 = 0x0202dcdc as const;
/**
 * ARM9 函数 @ 0x0202dd50
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_dispatch_4way = 0x0202dd50 as const;
/**
 * ARM9 函数 @ 0x0202df80
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x021bb274 = 0x0202df80 as const;
/**
 * ARM9 函数 @ 0x0202e000
 * @category prologue
 * @confidence high
 */
export const sub_0202e000 = 0x0202e000 as const;
/**
 * ARM9 函数 @ 0x0202e198
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const global_state_range_check = 0x0202e198 as const;
/**
 * ARM9 函数 @ 0x0202e2cc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const state_3_flow_indirect = 0x0202e2cc as const;
/**
 * ARM9 函数 @ 0x0202e40c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const flow_2_check_call = 0x0202e40c as const;
/**
 * ARM9 函数 @ 0x0202e488
 * @category prologue
 * @confidence high
 */
export const sub_0202e488 = 0x0202e488 as const;
/**
 * ARM9 函数 @ 0x0202e6d8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const flow_2_check_0x8000 = 0x0202e6d8 as const;
/**
 * ARM9 函数 @ 0x0202e7e0
 * @category prologue
 * @confidence high
 */
export const sub_0202e7e0 = 0x0202e7e0 as const;
/**
 * ARM9 函数 @ 0x0202e8bc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x0202a884 = 0x0202e8bc as const;
/**
 * ARM9 函数 @ 0x0202e964
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const state_3_flow_2_check_b = 0x0202e964 as const;
/**
 * ARM9 函数 @ 0x0202e9a8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x021bb720 = 0x0202e9a8 as const;
/**
 * ARM9 函数 @ 0x0202ea28
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_dispatch_4way_2 = 0x0202ea28 as const;
/**
 * ARM9 函数 @ 0x0202ebe8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x021bb258 = 0x0202ebe8 as const;
/**
 * ARM9 函数 @ 0x0202ec94
 * @category prologue
 * @confidence high
 */
export const sub_0202ec94 = 0x0202ec94 as const;
/**
 * ARM9 函数 @ 0x0202ee98
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_range_4_2_check = 0x0202ee98 as const;
/**
 * ARM9 函数 @ 0x0202ef6c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x021bb264 = 0x0202ef6c as const;
/**
 * ARM9 函数 @ 0x0202f070
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_4bl_0x202f0e8_0x204498c_0x202f0c4_0x202f0e8 = 0x0202f070 as const;
/**
 * ARM9 函数 @ 0x0202f0c4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 49
 */
export const state_set_gated_on_global_910 = 0x0202f0c4 as const;
/**
 * ARM9 函数 @ 0x0202f0e8
 * @category prologue
 * @confidence high
 */
export const sub_0202f0e8 = 0x0202f0e8 as const;
/**
 * ARM9 函数 @ 0x0202f160
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const word_table_bounded_get_27 = 0x0202f160 as const;
/**
 * ARM9 函数 @ 0x0202f178
 * @category prologue
 * @confidence high
 */
export const sub_0202f178 = 0x0202f178 as const;
/**
 * ARM9 函数 @ 0x0202f17c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const flag_bit_test_struct_ptr_1e = 0x0202f17c as const;
/**
 * ARM9 函数 @ 0x0202f1b8
 * @category prologue
 * @confidence high
 */
export const sub_0202f1b8 = 0x0202f1b8 as const;
/**
 * ARM9 函数 @ 0x0202f2e8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const bit_test_mla_index = 0x0202f2e8 as const;
/**
 * ARM9 函数 @ 0x0202f31c
 * @category prologue
 * @confidence high
 */
export const sub_0202f31c = 0x0202f31c as const;
/**
 * ARM9 函数 @ 0x0202f3fc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 3
 */
export const main_ram_field_dx8_halfword_getter = 0x0202f3fc as const;
/**
 * ARM9 函数 @ 0x0202f410
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 5
 */
export const global_halfword_get_b = 0x0202f410 as const;
/**
 * ARM9 函数 @ 0x0202f420
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 11
 */
export const global_halfword_set = 0x0202f420 as const;
/**
 * ARM9 函数 @ 0x0202f430
 * @category prologue
 * @confidence high
 */
export const sub_0202f430 = 0x0202f430 as const;
/**
 * ARM9 函数 @ 0x0202f7d8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const call_seq_2f420_491ec_arg6 = 0x0202f7d8 as const;
/**
 * ARM9 函数 @ 0x0202f7f8
 * @category prologue
 * @confidence high
 */
export const sub_0202f7f8 = 0x0202f7f8 as const;
/**
 * ARM9 函数 @ 0x0202f8e0
 * @category prologue
 * @confidence high
 */
export const sub_0202f8e0 = 0x0202f8e0 as const;
/**
 * ARM9 函数 @ 0x0202f950
 * @category prologue
 * @confidence high
 */
export const sub_0202f950 = 0x0202f950 as const;
/**
 * ARM9 函数 @ 0x0202fa1c
 * @category prologue
 * @confidence high
 */
export const sub_0202fa1c = 0x0202fa1c as const;
/**
 * ARM9 函数 @ 0x0202fae8
 * @category prologue
 * @confidence high
 */
export const sub_0202fae8 = 0x0202fae8 as const;
/**
 * ARM9 函数 @ 0x0202fbb4
 * @category prologue
 * @confidence high
 */
export const sub_0202fbb4 = 0x0202fbb4 as const;
/**
 * ARM9 函数 @ 0x0202fc50
 * @category prologue
 * @confidence high
 */
export const sub_0202fc50 = 0x0202fc50 as const;
/**
 * ARM9 函数 @ 0x0202fd40
 * @category prologue
 * @confidence high
 */
export const sub_0202fd40 = 0x0202fd40 as const;
/**
 * ARM9 函数 @ 0x0202fda4
 * @category prologue
 * @confidence high
 */
export const sub_0202fda4 = 0x0202fda4 as const;
/**
 * ARM9 函数 @ 0x0202fec0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const cond_field_read = 0x0202fec0 as const;
/**
 * ARM9 函数 @ 0x0202fed4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 15
 */
export const state_field_get_branch_on_arg1 = 0x0202fed4 as const;
/**
 * ARM9 函数 @ 0x0202feec
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 12
 */
export const array_lookup_by_field_0xa_offset = 0x0202feec as const;
/**
 * ARM9 函数 @ 0x0202ff58
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const cond_dispatch_r1 = 0x0202ff58 as const;
/**
 * ARM9 函数 @ 0x0202ffd8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const intrusive_list_push_front = 0x0202ffd8 as const;
/**
 * ARM9 函数 @ 0x0203003c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 10
 */
export const intrusive_list_append = 0x0203003c as const;
/**
 * ARM9 函数 @ 0x020300a4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const intrusive_list_init_first_node = 0x020300a4 as const;
/**
 * ARM9 函数 @ 0x020300d0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 10
 */
export const intrusive_list_init = 0x020300d0 as const;
/**
 * ARM9 函数 @ 0x020300e8
 * @category prologue
 * @confidence high
 */
export const sub_020300e8 = 0x020300e8 as const;
/**
 * ARM9 函数 @ 0x02030104
 * @category prologue
 * @confidence high
 */
export const sub_02030104 = 0x02030104 as const;
/**
 * ARM9 函数 @ 0x02030194
 * @category prologue
 * @confidence high
 */
export const sub_02030194 = 0x02030194 as const;
/**
 * ARM9 函数 @ 0x020301c0
 * @category prologue
 * @confidence high
 */
export const sub_020301c0 = 0x020301c0 as const;
/**
 * ARM9 函数 @ 0x02030230
 * @category prologue
 * @confidence high
 */
export const sub_02030230 = 0x02030230 as const;
/**
 * ARM9 函数 @ 0x02030270
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 10
 */
export const mem_alloc_aligned_4 = 0x02030270 as const;
/**
 * ARM9 函数 @ 0x020302b4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const span_alloc_check_0x4c = 0x020302b4 as const;
/**
 * ARM9 函数 @ 0x02030300
 * @category prologue
 * @confidence high
 */
export const sub_02030300 = 0x02030300 as const;
/**
 * ARM9 函数 @ 0x020303f8
 * @category prologue
 * @confidence high
 */
export const sub_020303f8 = 0x020303f8 as const;
/**
 * ARM9 函数 @ 0x020304bc
 * @category prologue
 * @confidence high
 */
export const sub_020304bc = 0x020304bc as const;
/**
 * ARM9 函数 @ 0x02030584
 * @category prologue
 * @confidence high
 */
export const sub_02030584 = 0x02030584 as const;
/**
 * ARM9 函数 @ 0x02030710
 * @category prologue
 * @confidence high
 */
export const sub_02030710 = 0x02030710 as const;
/**
 * ARM9 函数 @ 0x02030794
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const node_init_with_size = 0x02030794 as const;
/**
 * ARM9 函数 @ 0x020307c4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const dllist_insert = 0x020307c4 as const;
/**
 * ARM9 函数 @ 0x020307f4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const dllist_remove = 0x020307f4 as const;
/**
 * ARM9 函数 @ 0x0203081c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const header_ptr_pair_unpack = 0x0203081c as const;
/**
 * ARM9 函数 @ 0x02030848
 * @category prologue
 * @confidence high
 */
export const sub_02030848 = 0x02030848 as const;
/**
 * ARM9 函数 @ 0x02030888
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const span_align_signed_dispatch = 0x02030888 as const;
/**
 * ARM9 函数 @ 0x020308d0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_indirect_to_0202c0e8 = 0x020308d0 as const;
/**
 * ARM9 函数 @ 0x020308dc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const aligned_size_gated_call_0x2030a50 = 0x020308dc as const;
/**
 * ARM9 函数 @ 0x02030928
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const intrusive_list_update_all_backref = 0x02030928 as const;
/**
 * ARM9 函数 @ 0x02030958
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const intrusive_list_rewind_head = 0x02030958 as const;
/**
 * ARM9 函数 @ 0x02030970
 * @category prologue
 * @confidence high
 */
export const sub_02030970 = 0x02030970 as const;
/**
 * ARM9 函数 @ 0x020309e4
 * @category prologue
 * @confidence high
 */
export const sub_020309e4 = 0x020309e4 as const;
/**
 * ARM9 函数 @ 0x02030a50
 * @category prologue
 * @confidence high
 */
export const sub_02030a50 = 0x02030a50 as const;
/**
 * ARM9 函数 @ 0x02030a72
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02030a72 = 0x02030a72 as const;
/**
 * ARM9 函数 @ 0x02030aa0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_2030acc = 0x02030aa0 as const;
/**
 * ARM9 函数 @ 0x02030b10
 * @category prologue
 * @confidence high
 */
export const sub_02030b10 = 0x02030b10 as const;
/**
 * ARM9 函数 @ 0x02030ca4
 * @category prologue
 * @confidence high
 */
export const sub_02030ca4 = 0x02030ca4 as const;
/**
 * ARM9 函数 @ 0x02030ce2
 * @category prologue
 * @confidence high
 */
export const sub_02030ce2 = 0x02030ce2 as const;
/**
 * ARM9 函数 @ 0x02030d24
 * @category prologue
 * @confidence high
 */
export const sub_02030d24 = 0x02030d24 as const;
/**
 * ARM9 函数 @ 0x02030dcc
 * @category prologue
 * @confidence high
 */
export const sub_02030dcc = 0x02030dcc as const;
/**
 * ARM9 函数 @ 0x02030e20
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 3
 */
export const cache_invalidate_struct_2field = 0x02030e20 as const;
/**
 * ARM9 函数 @ 0x02030e44
 * @category prologue
 * @confidence high
 */
export const sub_02030e44 = 0x02030e44 as const;
/**
 * ARM9 函数 @ 0x02030f84
 * @category prologue
 * @confidence high
 */
export const sub_02030f84 = 0x02030f84 as const;
/**
 * ARM9 函数 @ 0x02030fd8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_2030fe8 = 0x02030fd8 as const;
/**
 * ARM9 函数 @ 0x02030fec
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_state_setter_2031018 = 0x02030fec as const;
/**
 * ARM9 函数 @ 0x02030ff8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 8
 */
export const main_frame_state_setter_a = 0x02030ff8 as const;
/**
 * ARM9 函数 @ 0x0203100c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const main_frame_state_setter_b = 0x0203100c as const;
/**
 * ARM9 函数 @ 0x0203101c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0xbfff0000 = 0x0203101c as const;
/**
 * ARM9 函数 @ 0x02031098
 * @category prologue
 * @confidence high
 */
export const sub_02031098 = 0x02031098 as const;
/**
 * ARM9 函数 @ 0x0203142c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const global_word_pack_store_9c_021bd8a0 = 0x0203142c as const;
/**
 * ARM9 函数 @ 0x02031458
 * @category prologue
 * @confidence high
 */
export const sub_02031458 = 0x02031458 as const;
/**
 * ARM9 函数 @ 0x020315c4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const io_04000600_flag_set_call_seq = 0x020315c4 as const;
/**
 * ARM9 函数 @ 0x02031604
 * @category prologue
 * @confidence high
 */
export const sub_02031604 = 0x02031604 as const;
/**
 * ARM9 函数 @ 0x02031640
 * @category prologue
 * @confidence high
 */
export const sub_02031640 = 0x02031640 as const;
/**
 * ARM9 函数 @ 0x02031674
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021bdb0c = 0x02031674 as const;
/**
 * ARM9 函数 @ 0x0203171c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x021bdb30 = 0x0203171c as const;
/**
 * ARM9 函数 @ 0x02031748
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_bit_clear_021bdb2c = 0x02031748 as const;
/**
 * ARM9 函数 @ 0x02031768
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const global_bits_clear_021bdb28 = 0x02031768 as const;
/**
 * ARM9 函数 @ 0x02031784
 * @category prologue
 * @confidence high
 */
export const sub_02031784 = 0x02031784 as const;
/**
 * ARM9 函数 @ 0x020317bc
 * @category prologue
 * @confidence high
 */
export const sub_020317bc = 0x020317bc as const;
/**
 * ARM9 函数 @ 0x02031820
 * @category prologue
 * @confidence high
 */
export const sub_02031820 = 0x02031820 as const;
/**
 * ARM9 函数 @ 0x0203187c
 * @category prologue
 * @confidence high
 */
export const sub_0203187c = 0x0203187c as const;
/**
 * ARM9 函数 @ 0x0203190c
 * @category prologue
 * @confidence high
 */
export const sub_0203190c = 0x0203190c as const;
/**
 * ARM9 函数 @ 0x02031988
 * @category prologue
 * @confidence high
 */
export const sub_02031988 = 0x02031988 as const;
/**
 * ARM9 函数 @ 0x020319c4
 * @category prologue
 * @confidence high
 */
export const sub_020319c4 = 0x020319c4 as const;
/**
 * ARM9 函数 @ 0x02031a24
 * @category prologue
 * @confidence high
 */
export const sub_02031a24 = 0x02031a24 as const;
/**
 * ARM9 函数 @ 0x02031a80
 * @category prologue
 * @confidence high
 */
export const sub_02031a80 = 0x02031a80 as const;
/**
 * ARM9 函数 @ 0x02031acc
 * @category prologue
 * @confidence high
 */
export const sub_02031acc = 0x02031acc as const;
/**
 * ARM9 函数 @ 0x02031b28
 * @category prologue
 * @confidence high
 */
export const sub_02031b28 = 0x02031b28 as const;
/**
 * ARM9 函数 @ 0x02031b88
 * @category prologue
 * @confidence high
 */
export const sub_02031b88 = 0x02031b88 as const;
/**
 * ARM9 函数 @ 0x02031be4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 3
 */
export const tail_call_0202d87c = 0x02031be4 as const;
/**
 * ARM9 函数 @ 0x02031bf0
 * @category prologue
 * @confidence high
 */
export const sub_02031bf0 = 0x02031bf0 as const;
/**
 * ARM9 函数 @ 0x02031cac
 * @category prologue
 * @confidence high
 */
export const sub_02031cac = 0x02031cac as const;
/**
 * ARM9 函数 @ 0x02031e20
 * @category prologue
 * @confidence high
 */
export const sub_02031e20 = 0x02031e20 as const;
/**
 * ARM9 函数 @ 0x02031ed8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const guarded_field_triple_halfword_write = 0x02031ed8 as const;
/**
 * ARM9 函数 @ 0x02031f00
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const guarded_field_pair_halfword_write = 0x02031f00 as const;
/**
 * ARM9 函数 @ 0x02031f1c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const ptr_field_0x3c_byte_call = 0x02031f1c as const;
/**
 * ARM9 函数 @ 0x02031f4c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const ptr_field_0x40_byte_set = 0x02031f4c as const;
/**
 * ARM9 函数 @ 0x02031f5c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const cond_byte_field_0x41_write = 0x02031f5c as const;
/**
 * ARM9 函数 @ 0x02031f6c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const ptr_pair_reset_if_set = 0x02031f6c as const;
/**
 * ARM9 函数 @ 0x02031f84
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const struct_field_clear = 0x02031f84 as const;
/**
 * ARM9 函数 @ 0x02031fa0
 * @category prologue
 * @confidence high
 */
export const sub_02031fa0 = 0x02031fa0 as const;
/**
 * ARM9 函数 @ 0x02032040
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const global_array_set_0x24_stride = 0x02032040 as const;
/**
 * ARM9 函数 @ 0x02032058
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const array_stride24_halfword_store_021bdfa4 = 0x02032058 as const;
/**
 * ARM9 函数 @ 0x02032078
 * @category prologue
 * @confidence high
 */
export const sub_02032078 = 0x02032078 as const;
/**
 * ARM9 函数 @ 0x020320f0
 * @category prologue
 * @confidence high
 */
export const sub_020320f0 = 0x020320f0 as const;
/**
 * ARM9 函数 @ 0x02032144
 * @category prologue
 * @confidence high
 */
export const sub_02032144 = 0x02032144 as const;
/**
 * ARM9 函数 @ 0x020321fc
 * @category prologue
 * @confidence high
 */
export const sub_020321fc = 0x020321fc as const;
/**
 * ARM9 函数 @ 0x02032230
 * @category prologue
 * @confidence high
 */
export const sub_02032230 = 0x02032230 as const;
/**
 * ARM9 函数 @ 0x020322b0
 * @category prologue
 * @confidence high
 */
export const sub_020322b0 = 0x020322b0 as const;
/**
 * ARM9 函数 @ 0x02032324
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const struct_bit31_call_2032230 = 0x02032324 as const;
/**
 * ARM9 函数 @ 0x02032354
 * @category prologue
 * @confidence high
 */
export const sub_02032354 = 0x02032354 as const;
/**
 * ARM9 函数 @ 0x020323b0
 * @category prologue
 * @confidence high
 */
export const sub_020323b0 = 0x020323b0 as const;
/**
 * ARM9 函数 @ 0x020323e0
 * @category prologue
 * @confidence high
 */
export const sub_020323e0 = 0x020323e0 as const;
/**
 * ARM9 函数 @ 0x02032464
 * @category prologue
 * @confidence high
 */
export const sub_02032464 = 0x02032464 as const;
/**
 * ARM9 函数 @ 0x020324e8
 * @category prologue
 * @confidence high
 */
export const sub_020324e8 = 0x020324e8 as const;
/**
 * ARM9 函数 @ 0x02032548
 * @category prologue
 * @confidence high
 */
export const sub_02032548 = 0x02032548 as const;
/**
 * ARM9 函数 @ 0x02032644
 * @category prologue
 * @confidence high
 */
export const sub_02032644 = 0x02032644 as const;
/**
 * ARM9 函数 @ 0x020326f4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const dual_global_clear_v2 = 0x020326f4 as const;
/**
 * ARM9 函数 @ 0x02032714
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 6
 */
export const slot_array_0x84_field_0x14_set = 0x02032714 as const;
/**
 * ARM9 函数 @ 0x02032730
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 13
 */
export const clamp_idx_to_global_count = 0x02032730 as const;
/**
 * ARM9 函数 @ 0x02032758
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const global_pair_get_7c_80_021be554 = 0x02032758 as const;
/**
 * ARM9 函数 @ 0x02032778
 * @category prologue
 * @confidence high
 */
export const sub_02032778 = 0x02032778 as const;
/**
 * ARM9 函数 @ 0x020327fc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x021be554 = 0x020327fc as const;
/**
 * ARM9 函数 @ 0x02032824
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x021be554_2 = 0x02032824 as const;
/**
 * ARM9 函数 @ 0x0203284c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x021be554_3 = 0x0203284c as const;
/**
 * ARM9 函数 @ 0x020328b0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x021be554_4 = 0x020328b0 as const;
/**
 * ARM9 函数 @ 0x02032914
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x021be554_5 = 0x02032914 as const;
/**
 * ARM9 函数 @ 0x02032978
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const list_bounds_check_field_0x14 = 0x02032978 as const;
/**
 * ARM9 函数 @ 0x020329dc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x021be554_6 = 0x020329dc as const;
/**
 * ARM9 函数 @ 0x02032a40
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const list_bounds_check_field_0xc = 0x02032a40 as const;
/**
 * ARM9 函数 @ 0x02032aa4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const list_bounds_check_field_0x8 = 0x02032aa4 as const;
/**
 * ARM9 函数 @ 0x02032b08
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 6
 */
export const global_dword_get_i = 0x02032b08 as const;
/**
 * ARM9 函数 @ 0x02032b18
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_swap_021be554 = 0x02032b18 as const;
/**
 * ARM9 函数 @ 0x02032b30
 * @category prologue
 * @confidence high
 */
export const sub_02032b30 = 0x02032b30 as const;
/**
 * ARM9 函数 @ 0x02032bfc
 * @category prologue
 * @confidence high
 */
export const sub_02032bfc = 0x02032bfc as const;
/**
 * ARM9 函数 @ 0x02032c20
 * @category prologue
 * @confidence high
 */
export const sub_02032c20 = 0x02032c20 as const;
/**
 * ARM9 函数 @ 0x02032c70
 * @category prologue
 * @confidence high
 */
export const sub_02032c70 = 0x02032c70 as const;
/**
 * ARM9 函数 @ 0x02032cb0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const const_r1_0_call_02c0d0 = 0x02032cb0 as const;
/**
 * ARM9 函数 @ 0x02032cc0
 * @category prologue
 * @confidence high
 */
export const sub_02032cc0 = 0x02032cc0 as const;
/**
 * ARM9 函数 @ 0x02032d30
 * @category prologue
 * @confidence high
 */
export const sub_02032d30 = 0x02032d30 as const;
/**
 * ARM9 函数 @ 0x02032df0
 * @category prologue
 * @confidence high
 */
export const sub_02032df0 = 0x02032df0 as const;
/**
 * ARM9 函数 @ 0x02032e0c
 * @category prologue
 * @confidence high
 */
export const sub_02032e0c = 0x02032e0c as const;
/**
 * ARM9 函数 @ 0x02032ea8
 * @category prologue
 * @confidence high
 */
export const sub_02032ea8 = 0x02032ea8 as const;
/**
 * ARM9 函数 @ 0x02032f78
 * @category prologue
 * @confidence high
 */
export const sub_02032f78 = 0x02032f78 as const;
/**
 * ARM9 函数 @ 0x0203306c
 * @category prologue
 * @confidence high
 */
export const sub_0203306c = 0x0203306c as const;
/**
 * ARM9 函数 @ 0x020330c0
 * @category prologue
 * @confidence high
 */
export const sub_020330c0 = 0x020330c0 as const;
/**
 * ARM9 函数 @ 0x020330e4
 * @category prologue
 * @confidence high
 */
export const sub_020330e4 = 0x020330e4 as const;
/**
 * ARM9 函数 @ 0x02033120
 * @category prologue
 * @confidence high
 */
export const sub_02033120 = 0x02033120 as const;
/**
 * ARM9 函数 @ 0x0203315c
 * @category prologue
 * @confidence high
 */
export const sub_0203315c = 0x0203315c as const;
/**
 * ARM9 函数 @ 0x02033190
 * @category prologue
 * @confidence high
 */
export const sub_02033190 = 0x02033190 as const;
/**
 * ARM9 函数 @ 0x020331fc
 * @category prologue
 * @confidence high
 */
export const sub_020331fc = 0x020331fc as const;
/**
 * ARM9 函数 @ 0x02033330
 * @category prologue
 * @confidence high
 */
export const sub_02033330 = 0x02033330 as const;
/**
 * ARM9 函数 @ 0x020333ac
 * @category prologue
 * @confidence high
 */
export const sub_020333ac = 0x020333ac as const;
/**
 * ARM9 函数 @ 0x02033428
 * @category prologue
 * @confidence high
 */
export const sub_02033428 = 0x02033428 as const;
/**
 * ARM9 函数 @ 0x020334a4
 * @category prologue
 * @confidence high
 */
export const sub_020334a4 = 0x020334a4 as const;
/**
 * ARM9 函数 @ 0x02033520
 * @category prologue
 * @confidence high
 */
export const sub_02033520 = 0x02033520 as const;
/**
 * ARM9 函数 @ 0x020335d4
 * @category prologue
 * @confidence high
 */
export const sub_020335d4 = 0x020335d4 as const;
/**
 * ARM9 函数 @ 0x0203367c
 * @category prologue
 * @confidence high
 */
export const sub_0203367c = 0x0203367c as const;
/**
 * ARM9 函数 @ 0x02033768
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02033768 = 0x02033768 as const;
/**
 * ARM9 函数 @ 0x020337dc
 * @category prologue
 * @confidence high
 */
export const sub_020337dc = 0x020337dc as const;
/**
 * ARM9 函数 @ 0x0203384c
 * @category prologue
 * @confidence high
 */
export const sub_0203384c = 0x0203384c as const;
/**
 * ARM9 函数 @ 0x020339a0
 * @category prologue
 * @confidence high
 */
export const sub_020339a0 = 0x020339a0 as const;
/**
 * ARM9 函数 @ 0x02033a70
 * @category prologue
 * @confidence high
 */
export const sub_02033a70 = 0x02033a70 as const;
/**
 * ARM9 函数 @ 0x02033b7c
 * @category prologue
 * @confidence high
 */
export const sub_02033b7c = 0x02033b7c as const;
/**
 * ARM9 函数 @ 0x02033c14
 * @category prologue
 * @confidence high
 */
export const sub_02033c14 = 0x02033c14 as const;
/**
 * ARM9 函数 @ 0x02033c68
 * @category prologue
 * @confidence high
 */
export const sub_02033c68 = 0x02033c68 as const;
/**
 * ARM9 函数 @ 0x02033d10
 * @category prologue
 * @confidence high
 */
export const sub_02033d10 = 0x02033d10 as const;
/**
 * ARM9 函数 @ 0x02033d74
 * @category prologue
 * @confidence high
 */
export const sub_02033d74 = 0x02033d74 as const;
/**
 * ARM9 函数 @ 0x02033d98
 * @category prologue
 * @confidence high
 */
export const sub_02033d98 = 0x02033d98 as const;
/**
 * ARM9 函数 @ 0x02033dd8
 * @category prologue
 * @confidence high
 */
export const sub_02033dd8 = 0x02033dd8 as const;
/**
 * ARM9 函数 @ 0x02033e24
 * @category prologue
 * @confidence high
 */
export const sub_02033e24 = 0x02033e24 as const;
/**
 * ARM9 函数 @ 0x02033ea4
 * @category prologue
 * @confidence high
 */
export const sub_02033ea4 = 0x02033ea4 as const;
/**
 * ARM9 函数 @ 0x02033f2c
 * @category prologue
 * @confidence high
 */
export const sub_02033f2c = 0x02033f2c as const;
/**
 * ARM9 函数 @ 0x020347bc
 * @category prologue
 * @confidence high
 */
export const sub_020347bc = 0x020347bc as const;
/**
 * ARM9 函数 @ 0x02034920
 * @category prologue
 * @confidence high
 */
export const sub_02034920 = 0x02034920 as const;
/**
 * ARM9 函数 @ 0x020349cc
 * @category prologue
 * @confidence high
 */
export const sub_020349cc = 0x020349cc as const;
/**
 * ARM9 函数 @ 0x02034a04
 * @category prologue
 * @confidence high
 */
export const sub_02034a04 = 0x02034a04 as const;
/**
 * ARM9 函数 @ 0x02034a58
 * @category prologue
 * @confidence high
 */
export const sub_02034a58 = 0x02034a58 as const;
/**
 * ARM9 函数 @ 0x02034acc
 * @category prologue
 * @confidence high
 */
export const sub_02034acc = 0x02034acc as const;
/**
 * ARM9 函数 @ 0x02034b38
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_1bl_0x20323b0 = 0x02034b38 as const;
/**
 * ARM9 函数 @ 0x02034b80
 * @category prologue
 * @confidence high
 */
export const sub_02034b80 = 0x02034b80 as const;
/**
 * ARM9 函数 @ 0x02034bec
 * @category prologue
 * @confidence high
 */
export const sub_02034bec = 0x02034bec as const;
/**
 * ARM9 函数 @ 0x02034c90
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const struct_clear_ptr_14c_bits_110 = 0x02034c90 as const;
/**
 * ARM9 函数 @ 0x02034ccc
 * @category prologue
 * @confidence high
 */
export const sub_02034ccc = 0x02034ccc as const;
/**
 * ARM9 函数 @ 0x02034de4
 * @category prologue
 * @confidence high
 */
export const sub_02034de4 = 0x02034de4 as const;
/**
 * ARM9 函数 @ 0x02034ec0
 * @category prologue
 * @confidence high
 */
export const sub_02034ec0 = 0x02034ec0 as const;
/**
 * ARM9 函数 @ 0x02034fc4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const bounded_array_slot_get = 0x02034fc4 as const;
/**
 * ARM9 函数 @ 0x02035004
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 3
 */
export const struct_field_8_0xc_compare = 0x02035004 as const;
/**
 * ARM9 函数 @ 0x0203501c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 3
 */
export const struct_field_8_increment_capped = 0x0203501c as const;
/**
 * ARM9 函数 @ 0x0203502e
 * @category prologue
 * @confidence high
 */
export const sub_0203502e = 0x0203502e as const;
/**
 * ARM9 函数 @ 0x02035034
 * @category prologue
 * @confidence high
 */
export const sub_02035034 = 0x02035034 as const;
/**
 * ARM9 函数 @ 0x02035070
 * @category prologue
 * @confidence high
 */
export const sub_02035070 = 0x02035070 as const;
/**
 * ARM9 函数 @ 0x020350a0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_zero_init_n4 = 0x020350a0 as const;
/**
 * ARM9 函数 @ 0x020350c0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const alternating_word_fill_0x1000 = 0x020350c0 as const;
/**
 * ARM9 函数 @ 0x020350e4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_stm_fill_n6_c0x1000 = 0x020350e4 as const;
/**
 * ARM9 函数 @ 0x0203510c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_stm_fill_n7_c0x1000 = 0x0203510c as const;
/**
 * ARM9 函数 @ 0x02035138
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04000280 = 0x02035138 as const;
/**
 * ARM9 函数 @ 0x02035170
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x040002b0_200 = 0x02035170 as const;
/**
 * ARM9 函数 @ 0x0203519c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04000280_2 = 0x0203519c as const;
/**
 * ARM9 函数 @ 0x020351d8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x04000280 = 0x020351d8 as const;
/**
 * ARM9 函数 @ 0x02035214
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const spin_wait_flag_0x8000_read_pair = 0x02035214 as const;
/**
 * ARM9 函数 @ 0x0203523c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_seq_start_0x40002b0 = 0x0203523c as const;
/**
 * ARM9 函数 @ 0x0203528c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 5
 */
export const wrapper_call_2_funcs_b = 0x0203528c as const;
/**
 * ARM9 函数 @ 0x020352a8
 * @category prologue
 * @confidence high
 */
export const sub_020352a8 = 0x020352a8 as const;
/**
 * ARM9 函数 @ 0x0203547c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const signed_halfword_store_signbit = 0x0203547c as const;
/**
 * ARM9 函数 @ 0x02035480
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const signed_halfword_fixed_convert = 0x02035480 as const;
/**
 * ARM9 函数 @ 0x020354ac
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x04001000 = 0x020354ac as const;
/**
 * ARM9 函数 @ 0x020354c8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const io_read_cond_write = 0x020354c8 as const;
/**
 * ARM9 函数 @ 0x0203553c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const disp_layer_mode_set = 0x0203553c as const;
/**
 * ARM9 函数 @ 0x02035588
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x020fbe94 = 0x02035588 as const;
/**
 * ARM9 函数 @ 0x020355d0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const io_04000004_halfword_bit3_set_clear = 0x020355d0 as const;
/**
 * ARM9 函数 @ 0x02035600
 * @category prologue
 * @confidence high
 */
export const sub_02035600 = 0x02035600 as const;
/**
 * ARM9 函数 @ 0x02035784
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021bf414 = 0x02035784 as const;
/**
 * ARM9 函数 @ 0x02035804
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_indirect_const_0x021bf414_to_02031818 = 0x02035804 as const;
/**
 * ARM9 函数 @ 0x02035818
 * @category prologue
 * @confidence high
 */
export const sub_02035818 = 0x02035818 as const;
/**
 * ARM9 函数 @ 0x020358aa
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_020358aa = 0x020358aa as const;
/**
 * ARM9 函数 @ 0x020358fc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_2035930 = 0x020358fc as const;
/**
 * ARM9 函数 @ 0x02035924
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const tail_call_0203194c_arg_global = 0x02035924 as const;
/**
 * ARM9 函数 @ 0x02035938
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const tail_call_0203194c_arg_global_b = 0x02035938 as const;
/**
 * ARM9 函数 @ 0x0203594c
 * @category prologue
 * @confidence high
 */
export const sub_0203594c = 0x0203594c as const;
/**
 * ARM9 函数 @ 0x02035984
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const state_field_0x16_mask_update = 0x02035984 as const;
/**
 * ARM9 函数 @ 0x02035a10
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021bf414_2 = 0x02035a10 as const;
/**
 * ARM9 函数 @ 0x02035a8c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021bf414_3 = 0x02035a8c as const;
/**
 * ARM9 函数 @ 0x02035b38
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const state_bitset_tail_call_02032274 = 0x02035b38 as const;
/**
 * ARM9 函数 @ 0x02035b58
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const state_field_0xa_mask_cases = 0x02035b58 as const;
/**
 * ARM9 函数 @ 0x02035c4c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const state_field_0x8_mask_update = 0x02035c4c as const;
/**
 * ARM9 函数 @ 0x02035e50
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const state_field_0x4_mask_cases = 0x02035e50 as const;
/**
 * ARM9 函数 @ 0x02035fbc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_1way_02035fbc = 0x02035fbc as const;
/**
 * ARM9 函数 @ 0x02036274
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 8
 */
export const io_bitmask_byte_set = 0x02036274 as const;
/**
 * ARM9 函数 @ 0x0203632c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const bg_tile_addr_mode_range = 0x0203632c as const;
/**
 * ARM9 函数 @ 0x0203637c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x0400000e_6000000 = 0x0203637c as const;
/**
 * ARM9 函数 @ 0x020363dc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const bg_tile_addr_mode_5_guard = 0x020363dc as const;
/**
 * ARM9 函数 @ 0x02036424
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const bg_tile_addr_disp_mode = 0x02036424 as const;
/**
 * ARM9 函数 @ 0x0203647c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const bg_tile_addr_io_0x4000100a = 0x0203647c as const;
/**
 * ARM9 函数 @ 0x0203649c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const bg_tile_addr_disp_mode_field = 0x0203649c as const;
/**
 * ARM9 函数 @ 0x020364d0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const bg_tile_addr_io_0x40001008 = 0x020364d0 as const;
/**
 * ARM9 函数 @ 0x020364f0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const bg_attr_addr_switch_6way = 0x020364f0 as const;
/**
 * ARM9 函数 @ 0x02036570
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x0400000e_6000000_2 = 0x02036570 as const;
/**
 * ARM9 函数 @ 0x020365fc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const bg_attr_addr_switch_6way_b = 0x020365fc as const;
/**
 * ARM9 函数 @ 0x0203667c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const bg_attr_addr_disp_mode_6way = 0x0203667c as const;
/**
 * ARM9 函数 @ 0x02036708
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const bg_pal_addr_io_0x4000100a = 0x02036708 as const;
/**
 * ARM9 函数 @ 0x02036728
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const bg_pal_addr_disp_mode_field = 0x02036728 as const;
/**
 * ARM9 函数 @ 0x0203675c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const bg_pal_addr_io_0x40001008 = 0x0203675c as const;
/**
 * ARM9 函数 @ 0x0203677c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const signed_halfword_pack_store = 0x0203677c as const;
/**
 * ARM9 函数 @ 0x020367a0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const byte4_pack_word_flag_0x40 = 0x020367a0 as const;
/**
 * ARM9 函数 @ 0x020367bc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const multiword_zero_clear_16 = 0x020367bc as const;
/**
 * ARM9 函数 @ 0x02036850
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_0x40000600_flag_check = 0x02036850 as const;
/**
 * ARM9 函数 @ 0x0203687c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_0x40000600_field_check = 0x0203687c as const;
/**
 * ARM9 函数 @ 0x020368a8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x020fbe98_1 = 0x020368a8 as const;
/**
 * ARM9 函数 @ 0x02036950
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_203695c = 0x02036950 as const;
/**
 * ARM9 函数 @ 0x02036964
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0400035c = 0x02036964 as const;
/**
 * ARM9 函数 @ 0x020369b8
 * @category prologue
 * @confidence high
 */
export const sub_020369b8 = 0x020369b8 as const;
/**
 * ARM9 函数 @ 0x02036a64
 * @category prologue
 * @confidence high
 */
export const sub_02036a64 = 0x02036a64 as const;
/**
 * ARM9 函数 @ 0x02036b14
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x04000400 = 0x02036b14 as const;
/**
 * ARM9 函数 @ 0x02036b48
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04000600 = 0x02036b48 as const;
/**
 * ARM9 函数 @ 0x02036bd0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04000504 = 0x02036bd0 as const;
/**
 * ARM9 函数 @ 0x02036d2c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x04000468 = 0x02036d2c as const;
/**
 * ARM9 函数 @ 0x02036d68
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x04000468_2 = 0x02036d68 as const;
/**
 * ARM9 函数 @ 0x02036da4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const io_04000468_write_seq9 = 0x02036da4 as const;
/**
 * ARM9 函数 @ 0x02036de0
 * @category prologue
 * @confidence high
 */
export const sub_02036de0 = 0x02036de0 as const;
/**
 * ARM9 函数 @ 0x020370dc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x020fbe98 = 0x020370dc as const;
/**
 * ARM9 函数 @ 0x02037128
 * @category prologue
 * @confidence high
 */
export const sub_02037128 = 0x02037128 as const;
/**
 * ARM9 函数 @ 0x0203719c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const call_0358fc_store_global = 0x0203719c as const;
/**
 * ARM9 函数 @ 0x020371c0
 * @category prologue
 * @confidence high
 */
export const sub_020371c0 = 0x020371c0 as const;
/**
 * ARM9 函数 @ 0x02037228
 * @category prologue
 * @confidence high
 */
export const sub_02037228 = 0x02037228 as const;
/**
 * ARM9 函数 @ 0x02037290
 * @category prologue
 * @confidence high
 */
export const sub_02037290 = 0x02037290 as const;
/**
 * ARM9 函数 @ 0x020372f8
 * @category prologue
 * @confidence high
 */
export const sub_020372f8 = 0x020372f8 as const;
/**
 * ARM9 函数 @ 0x02037360
 * @category prologue
 * @confidence high
 */
export const sub_02037360 = 0x02037360 as const;
/**
 * ARM9 函数 @ 0x020373c8
 * @category prologue
 * @confidence high
 */
export const sub_020373c8 = 0x020373c8 as const;
/**
 * ARM9 函数 @ 0x02037430
 * @category prologue
 * @confidence high
 */
export const sub_02037430 = 0x02037430 as const;
/**
 * ARM9 函数 @ 0x02037498
 * @category prologue
 * @confidence high
 */
export const sub_02037498 = 0x02037498 as const;
/**
 * ARM9 函数 @ 0x02037500
 * @category prologue
 * @confidence high
 */
export const sub_02037500 = 0x02037500 as const;
/**
 * ARM9 函数 @ 0x02037568
 * @category prologue
 * @confidence high
 */
export const sub_02037568 = 0x02037568 as const;
/**
 * ARM9 函数 @ 0x020375d0
 * @category prologue
 * @confidence high
 */
export const sub_020375d0 = 0x020375d0 as const;
/**
 * ARM9 函数 @ 0x02037638
 * @category prologue
 * @confidence high
 */
export const sub_02037638 = 0x02037638 as const;
/**
 * ARM9 函数 @ 0x02037666
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02037666 = 0x02037666 as const;
/**
 * ARM9 函数 @ 0x020376a0
 * @category prologue
 * @confidence high
 */
export const sub_020376a0 = 0x020376a0 as const;
/**
 * ARM9 函数 @ 0x02037708
 * @category prologue
 * @confidence high
 */
export const sub_02037708 = 0x02037708 as const;
/**
 * ARM9 函数 @ 0x02037770
 * @category prologue
 * @confidence high
 */
export const sub_02037770 = 0x02037770 as const;
/**
 * ARM9 函数 @ 0x020377d0
 * @category prologue
 * @confidence high
 */
export const sub_020377d0 = 0x020377d0 as const;
/**
 * ARM9 函数 @ 0x02037830
 * @category prologue
 * @confidence high
 */
export const sub_02037830 = 0x02037830 as const;
/**
 * ARM9 函数 @ 0x02037898
 * @category prologue
 * @confidence high
 */
export const sub_02037898 = 0x02037898 as const;
/**
 * ARM9 函数 @ 0x020378f4
 * @category prologue
 * @confidence high
 */
export const sub_020378f4 = 0x020378f4 as const;
/**
 * ARM9 函数 @ 0x0203795c
 * @category prologue
 * @confidence high
 */
export const sub_0203795c = 0x0203795c as const;
/**
 * ARM9 函数 @ 0x020379c4
 * @category prologue
 * @confidence high
 */
export const sub_020379c4 = 0x020379c4 as const;
/**
 * ARM9 函数 @ 0x02037a2c
 * @category prologue
 * @confidence high
 */
export const sub_02037a2c = 0x02037a2c as const;
/**
 * ARM9 函数 @ 0x02037a88
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const state_teardown_clear_pair = 0x02037a88 as const;
/**
 * ARM9 函数 @ 0x02037ae0
 * @category prologue
 * @confidence high
 */
export const sub_02037ae0 = 0x02037ae0 as const;
/**
 * ARM9 函数 @ 0x02037b54
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const state_table_lookup_store = 0x02037b54 as const;
/**
 * ARM9 函数 @ 0x02037b9c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const state_teardown_clear_pair_b = 0x02037b9c as const;
/**
 * ARM9 函数 @ 0x02037c0c
 * @category prologue
 * @confidence high
 */
export const sub_02037c0c = 0x02037c0c as const;
/**
 * ARM9 函数 @ 0x02037d70
 * @category prologue
 * @confidence high
 */
export const sub_02037d70 = 0x02037d70 as const;
/**
 * ARM9 函数 @ 0x02037df0
 * @category prologue
 * @confidence high
 */
export const sub_02037df0 = 0x02037df0 as const;
/**
 * ARM9 函数 @ 0x02037ef0
 * @category prologue
 * @confidence high
 */
export const sub_02037ef0 = 0x02037ef0 as const;
/**
 * ARM9 函数 @ 0x02037f90
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x027e0000 = 0x02037f90 as const;
/**
 * ARM9 函数 @ 0x02037fc4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const io_flag_guarded_global_swap = 0x02037fc4 as const;
/**
 * ARM9 函数 @ 0x02037ff8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const global_flags_andnot_clear_irq_safe_c = 0x02037ff8 as const;
/**
 * ARM9 函数 @ 0x02038040
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 7
 */
export const global_flags_or_set_irq_safe_b = 0x02038040 as const;
/**
 * ARM9 函数 @ 0x02038078
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 4
 */
export const global_word_store_irq_safe = 0x02038078 as const;
/**
 * ARM9 函数 @ 0x020380ac
 * @category prologue
 * @confidence high
 */
export const sub_020380ac = 0x020380ac as const;
/**
 * ARM9 函数 @ 0x020380f8
 * @category prologue
 * @confidence high
 */
export const sub_020380f8 = 0x020380f8 as const;
/**
 * ARM9 函数 @ 0x02038144
 * @category prologue
 * @confidence high
 */
export const sub_02038144 = 0x02038144 as const;
/**
 * ARM9 函数 @ 0x020381d4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const struct_clear_2field = 0x020381d4 as const;
/**
 * ARM9 函数 @ 0x020381ec
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_indirect_thunk_0x02034310_n1 = 0x020381ec as const;
/**
 * ARM9 函数 @ 0x020381f8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const clz_scan_first_nonzero = 0x020381f8 as const;
/**
 * ARM9 函数 @ 0x02038250
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const struct_field_0x4_halfword_get = 0x02038250 as const;
/**
 * ARM9 函数 @ 0x02038288
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_2038298 = 0x02038288 as const;
/**
 * ARM9 函数 @ 0x020382a4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_20382b4 = 0x020382a4 as const;
/**
 * ARM9 函数 @ 0x020382f0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_indirect_3const_to_02034330 = 0x020382f0 as const;
/**
 * ARM9 函数 @ 0x02038310
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const tail_call_020343c0_r3_1 = 0x02038310 as const;
/**
 * ARM9 函数 @ 0x02038330
 * @category prologue
 * @confidence high
 */
export const sub_02038330 = 0x02038330 as const;
/**
 * ARM9 函数 @ 0x020383b0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const tail_call_020343c0_r3_0 = 0x020383b0 as const;
/**
 * ARM9 函数 @ 0x020383c0
 * @category prologue
 * @confidence high
 */
export const sub_020383c0 = 0x020383c0 as const;
/**
 * ARM9 函数 @ 0x02038450
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_indirect_to_02034460 = 0x02038450 as const;
/**
 * ARM9 函数 @ 0x02038460
 * @category prologue
 * @confidence high
 */
export const sub_02038460 = 0x02038460 as const;
/**
 * ARM9 函数 @ 0x020384b4
 * @category prologue
 * @confidence high
 */
export const sub_020384b4 = 0x020384b4 as const;
/**
 * ARM9 函数 @ 0x020385a4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const struct_field_0xb4_set = 0x020385a4 as const;
/**
 * ARM9 函数 @ 0x020385ac
 * @category prologue
 * @confidence high
 */
export const sub_020385ac = 0x020385ac as const;
/**
 * ARM9 函数 @ 0x020385e4
 * @category prologue
 * @confidence high
 */
export const sub_020385e4 = 0x020385e4 as const;
/**
 * ARM9 函数 @ 0x02038630
 * @category prologue
 * @confidence high
 */
export const sub_02038630 = 0x02038630 as const;
/**
 * ARM9 函数 @ 0x02038664
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const field_0x70_get = 0x02038664 as const;
/**
 * ARM9 函数 @ 0x0203866c
 * @category prologue
 * @confidence high
 */
export const sub_0203866c = 0x0203866c as const;
/**
 * ARM9 函数 @ 0x02038720
 * @category prologue
 * @confidence high
 */
export const sub_02038720 = 0x02038720 as const;
/**
 * ARM9 函数 @ 0x0203880c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const list_find_node_field64_eq_1 = 0x0203880c as const;
/**
 * ARM9 函数 @ 0x02038838
 * @category prologue
 * @confidence high
 */
export const sub_02038838 = 0x02038838 as const;
/**
 * ARM9 函数 @ 0x0203886c
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_0203886c = 0x0203886c as const;
/**
 * ARM9 函数 @ 0x020388ec
 * @category prologue
 * @confidence high
 */
export const sub_020388ec = 0x020388ec as const;
/**
 * ARM9 函数 @ 0x02038940
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const obj_field64_is_2 = 0x02038940 as const;
/**
 * ARM9 函数 @ 0x02038954
 * @category prologue
 * @confidence high
 */
export const sub_02038954 = 0x02038954 as const;
/**
 * ARM9 函数 @ 0x02038990
 * @category prologue
 * @confidence high
 */
export const sub_02038990 = 0x02038990 as const;
/**
 * ARM9 函数 @ 0x020389f0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x021bf4c0 = 0x020389f0 as const;
/**
 * ARM9 函数 @ 0x02038a34
 * @category prologue
 * @confidence high
 */
export const sub_02038a34 = 0x02038a34 as const;
/**
 * ARM9 函数 @ 0x02038aa4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const call_08a34_global4_zero = 0x02038aa4 as const;
/**
 * ARM9 函数 @ 0x02038ad0
 * @category prologue
 * @confidence high
 */
export const sub_02038ad0 = 0x02038ad0 as const;
/**
 * ARM9 函数 @ 0x02038bd8
 * @category prologue
 * @confidence high
 */
export const sub_02038bd8 = 0x02038bd8 as const;
/**
 * ARM9 函数 @ 0x02038d34
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x021bf4c8 = 0x02038d34 as const;
/**
 * ARM9 函数 @ 0x02038d7c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const list_find_first_ge_0x70 = 0x02038d7c as const;
/**
 * ARM9 函数 @ 0x02038de4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_list_unlink_next_off0x10 = 0x02038de4 as const;
/**
 * ARM9 函数 @ 0x02038e14
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const intrusive_list_unlink = 0x02038e14 as const;
/**
 * ARM9 函数 @ 0x02038e68
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_list_unlink_next_off0x80 = 0x02038e68 as const;
/**
 * ARM9 函数 @ 0x02038e9c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const intrusive_list_sorted_insert = 0x02038e9c as const;
/**
 * ARM9 函数 @ 0x02038f14
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x021bf4b8_1 = 0x02038f14 as const;
/**
 * ARM9 函数 @ 0x02038f2c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const queue_ctl_init = 0x02038f2c as const;
/**
 * ARM9 函数 @ 0x02038f90
 * @category prologue
 * @confidence high
 */
export const sub_02038f90 = 0x02038f90 as const;
/**
 * ARM9 函数 @ 0x02038fdc
 * @category prologue
 * @confidence high
 */
export const sub_02038fdc = 0x02038fdc as const;
/**
 * ARM9 函数 @ 0x02039020
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const two_global_halfword_state_check = 0x02039020 as const;
/**
 * ARM9 函数 @ 0x02039054
 * @category prologue
 * @confidence high
 */
export const sub_02039054 = 0x02039054 as const;
/**
 * ARM9 函数 @ 0x02039128
 * @category prologue
 * @confidence high
 */
export const sub_02039128 = 0x02039128 as const;
/**
 * ARM9 函数 @ 0x020391a0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const const_zero_return_a = 0x020391a0 as const;
/**
 * ARM9 函数 @ 0x020391a8
 * @category prologue
 * @confidence high
 */
export const sub_020391a8 = 0x020391a8 as const;
/**
 * ARM9 函数 @ 0x0203925c
 * @category prologue
 * @confidence high
 */
export const sub_0203925c = 0x0203925c as const;
/**
 * ARM9 函数 @ 0x02039308
 * @category prologue
 * @confidence high
 */
export const sub_02039308 = 0x02039308 as const;
/**
 * ARM9 函数 @ 0x020393b0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const node_ptr_pair_init = 0x020393b0 as const;
/**
 * ARM9 函数 @ 0x020393e0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_list_relink_off0x10_0x14 = 0x020393e0 as const;
/**
 * ARM9 函数 @ 0x02039404
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const linked_list_push_tail_8c = 0x02039404 as const;
/**
 * ARM9 函数 @ 0x02039428
 * @category prologue
 * @confidence high
 */
export const sub_02039428 = 0x02039428 as const;
/**
 * ARM9 函数 @ 0x02039470
 * @category prologue
 * @confidence high
 */
export const sub_02039470 = 0x02039470 as const;
/**
 * ARM9 函数 @ 0x020394e0
 * @category prologue
 * @confidence high
 */
export const sub_020394e0 = 0x020394e0 as const;
/**
 * ARM9 函数 @ 0x0203956c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const struct_clear_4_fields = 0x0203956c as const;
/**
 * ARM9 函数 @ 0x02039588
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 11
 */
export const dcache_invalidate_all = 0x02039588 as const;
/**
 * ARM9 函数 @ 0x020395bc
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 41
 */
export const vec3_neg = 0x020395bc as const;
/**
 * ARM9 函数 @ 0x020395d8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 24
 */
export const dcache_clean_range = 0x020395d8 as const;
/**
 * ARM9 函数 @ 0x020395f4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 24
 */
export const dcache_clean_invalidate_range = 0x020395f4 as const;
/**
 * ARM9 函数 @ 0x02039618
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const dcache_clean_range_v2 = 0x02039618 as const;
/**
 * ARM9 函数 @ 0x02039624
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const dcache_invalidate_range = 0x02039624 as const;
/**
 * ARM9 函数 @ 0x02039640
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_multi_bl_init_15bl_0x2039a04_0x203bc90_0x20384b4_0x2039984_0x20381d4_0x2037f90_0x2039ce4_0x203aa44_0x2039eb4_0x203a1a4_0x2038bd8_0x203a014_0x204bacc_0x20429a0_0x203f0bc = 0x02039640 as const;
/**
 * ARM9 函数 @ 0x02039690
 * @category prologue
 * @confidence high
 */
export const sub_02039690 = 0x02039690 as const;
/**
 * ARM9 函数 @ 0x02039718
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 8
 */
export const shared_mem_da0_indexed_set = 0x02039718 as const;
/**
 * ARM9 函数 @ 0x0203972c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 7
 */
export const shared_mem_dc4_indexed_set = 0x0203972c as const;
/**
 * ARM9 函数 @ 0x02039740
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 6
 */
export const switch_dispatch_7way = 0x02039740 as const;
/**
 * ARM9 函数 @ 0x0203982c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 6
 */
export const switch_dispatch_7way_b = 0x0203982c as const;
/**
 * ARM9 函数 @ 0x020398f6
 * @category prologue
 * @confidence high
 */
export const sub_020398f6 = 0x020398f6 as const;
/**
 * ARM9 函数 @ 0x0203995c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const table_word_get_0x27ffda0 = 0x0203995c as const;
/**
 * ARM9 函数 @ 0x02039970
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const table_word_get_0x27ffdc4 = 0x02039970 as const;
/**
 * ARM9 函数 @ 0x02039984
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x021bf724 = 0x02039984 as const;
/**
 * ARM9 函数 @ 0x02039a04
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x021bf720 = 0x02039a04 as const;
/**
 * ARM9 函数 @ 0x02039b1c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_dcache_c1_c0_0_a = 0x02039b1c as const;
/**
 * ARM9 函数 @ 0x02039b30
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_dcache_c1_c0_0_b = 0x02039b30 as const;
/**
 * ARM9 函数 @ 0x02039b40
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_dcache_c1_c0_0_c = 0x02039b40 as const;
/**
 * ARM9 函数 @ 0x02039b50
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_dcache_c6_c1_0 = 0x02039b50 as const;
/**
 * ARM9 函数 @ 0x02039b58
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_dcache_c6_c2_0 = 0x02039b58 as const;
/**
 * ARM9 函数 @ 0x02039bd4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const state_snapshot_2step_save = 0x02039bd4 as const;
/**
 * ARM9 函数 @ 0x02039be8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x021bf734_14 = 0x02039be8 as const;
/**
 * ARM9 函数 @ 0x02039c78
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x021bf728 = 0x02039c78 as const;
/**
 * ARM9 函数 @ 0x02039ce4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x027ffd9c = 0x02039ce4 as const;
/**
 * ARM9 函数 @ 0x02039d74
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021bf7b4 = 0x02039d74 as const;
/**
 * ARM9 函数 @ 0x02039e18
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021bf7b8 = 0x02039e18 as const;
/**
 * ARM9 函数 @ 0x02039eb4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021bf7c8 = 0x02039eb4 as const;
/**
 * ARM9 函数 @ 0x02039f24
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const cpsr_bit_0x80_clear = 0x02039f24 as const;
/**
 * ARM9 函数 @ 0x02039f38
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 118
 */
export const vec3_normalize = 0x02039f38 as const;
/**
 * ARM9 函数 @ 0x02039f4c
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 154
 */
export const vec3_dot_product = 0x02039f4c as const;
/**
 * ARM9 函数 @ 0x02039f64
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const cpsr_bits_0xc0_set = 0x02039f64 as const;
/**
 * ARM9 函数 @ 0x02039f78
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const cpsr_bits_0xc0_set_from_r0 = 0x02039f78 as const;
/**
 * ARM9 函数 @ 0x02039f90
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_mode_getter_apsr = 0x02039f90 as const;
/**
 * ARM9 函数 @ 0x02039f9c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 6
 */
export const mod4_loop = 0x02039f9c as const;
/**
 * ARM9 函数 @ 0x02039fa8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const wrapper_call_2_funcs_c = 0x02039fa8 as const;
/**
 * ARM9 函数 @ 0x0203a014
 * @category prologue
 * @confidence high
 */
export const sub_0203a014 = 0x0203a014 as const;
/**
 * ARM9 函数 @ 0x0203a07c
 * @category prologue
 * @confidence high
 */
export const sub_0203a07c = 0x0203a07c as const;
/**
 * ARM9 函数 @ 0x0203a0f8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 5
 */
export const call_indirect_const_6_to_02036880 = 0x0203a0f8 as const;
/**
 * ARM9 函数 @ 0x0203a114
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const clz_count_leading_zeros = 0x0203a114 as const;
/**
 * ARM9 函数 @ 0x0203a11c
 * @category prologue
 * @confidence high
 */
export const sub_0203a11c = 0x0203a11c as const;
/**
 * ARM9 函数 @ 0x0203a1a4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_dcache_c7_c0_4 = 0x0203a1a4 as const;
/**
 * ARM9 函数 @ 0x0203a1d8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const dcache_clean_invalidate_v2 = 0x0203a1d8 as const;
/**
 * ARM9 函数 @ 0x0203a1e4
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 48
 */
export const vec3_add_scaled = 0x0203a1e4 as const;
/**
 * ARM9 函数 @ 0x0203a1f8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const io_register_byte_setter = 0x0203a1f8 as const;
/**
 * ARM9 函数 @ 0x0203a208
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const guarded_call_opt = 0x0203a208 as const;
/**
 * ARM9 函数 @ 0x0203a278
 * @category prologue
 * @confidence high
 */
export const sub_0203a278 = 0x0203a278 as const;
/**
 * ARM9 函数 @ 0x0203a32c
 * @category prologue
 * @confidence high
 */
export const sub_0203a32c = 0x0203a32c as const;
/**
 * ARM9 函数 @ 0x0203a3b0
 * @category prologue
 * @confidence high
 */
export const sub_0203a3b0 = 0x0203a3b0 as const;
/**
 * ARM9 函数 @ 0x0203a420
 * @category prologue
 * @confidence high
 */
export const sub_0203a420 = 0x0203a420 as const;
/**
 * ARM9 函数 @ 0x0203a4c8
 * @category prologue
 * @confidence high
 */
export const sub_0203a4c8 = 0x0203a4c8 as const;
/**
 * ARM9 函数 @ 0x0203a5a0
 * @category prologue
 * @confidence high
 */
export const sub_0203a5a0 = 0x0203a5a0 as const;
/**
 * ARM9 函数 @ 0x0203a618
 * @category prologue
 * @confidence high
 */
export const sub_0203a618 = 0x0203a618 as const;
/**
 * ARM9 函数 @ 0x0203a694
 * @category prologue
 * @confidence high
 */
export const sub_0203a694 = 0x0203a694 as const;
/**
 * ARM9 函数 @ 0x0203a724
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 10
 */
export const memset_halfword_chunks = 0x0203a724 as const;
/**
 * ARM9 函数 @ 0x0203a73c
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 27
 */
export const vec3_scale = 0x0203a73c as const;
/**
 * ARM9 函数 @ 0x0203a758
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 18
 */
export const memset_4byte_chunks = 0x0203a758 as const;
/**
 * ARM9 函数 @ 0x0203a76c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 19
 */
export const memcpy_4byte_chunks = 0x0203a76c as const;
/**
 * ARM9 函数 @ 0x0203a784
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 16
 */
export const mem_fill_32b_chunked = 0x0203a784 as const;
/**
 * ARM9 函数 @ 0x0203a7ec
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 37
 */
export const vec3_length = 0x0203a7ec as const;
/**
 * ARM9 函数 @ 0x0203a880
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 38
 */
export const vec3_sub = 0x0203a880 as const;
/**
 * ARM9 函数 @ 0x0203a9b0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const swp_word_at_r1 = 0x0203a9b0 as const;
/**
 * ARM9 函数 @ 0x0203a9b8
 * @category prologue
 * @confidence high
 */
export const sub_0203a9b8 = 0x0203a9b8 as const;
/**
 * ARM9 函数 @ 0x0203aa44
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const call_seq_a1f8_a32c = 0x0203aa44 as const;
/**
 * ARM9 函数 @ 0x0203aa68
 * @category prologue
 * @confidence high
 */
export const sub_0203aa68 = 0x0203aa68 as const;
/**
 * ARM9 函数 @ 0x0203aaf4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_const_call_0x19_to_0x203aa68 = 0x0203aaf4 as const;
/**
 * ARM9 函数 @ 0x0203ab28
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const service_call_0x20 = 0x0203ab28 as const;
/**
 * ARM9 函数 @ 0x0203ab2e
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_0203ab2e = 0x0203ab2e as const;
/**
 * ARM9 函数 @ 0x0203ab54
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_const_call_0x1f_to_0x203aa68 = 0x0203ab54 as const;
/**
 * ARM9 函数 @ 0x0203ab80
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_const_call_0x1e_to_0x203aa68 = 0x0203ab80 as const;
/**
 * ARM9 函数 @ 0x0203abac
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const service_call_0x14 = 0x0203abac as const;
/**
 * ARM9 函数 @ 0x0203abe0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const call_03aa68_0x1b_constargs = 0x0203abe0 as const;
/**
 * ARM9 函数 @ 0x0203ac0c
 * @category prologue
 * @confidence high
 */
export const sub_0203ac0c = 0x0203ac0c as const;
/**
 * ARM9 函数 @ 0x0203ac7c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const wrapper_call_4args_0xc = 0x0203ac7c as const;
/**
 * ARM9 函数 @ 0x0203acb0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_const_call_9_to_0x203aa68 = 0x0203acb0 as const;
/**
 * ARM9 函数 @ 0x0203ace4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_indirect_thunk_0x02036ac0_n3 = 0x0203ace4 as const;
/**
 * ARM9 函数 @ 0x0203acfc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_indirect_6_2_to_02036ac0 = 0x0203acfc as const;
/**
 * ARM9 函数 @ 0x0203ad14
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_const_call_3_to_0x203aa68 = 0x0203ad14 as const;
/**
 * ARM9 函数 @ 0x0203ad40
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_const_call_2_to_0x203aa68 = 0x0203ad40 as const;
/**
 * ARM9 函数 @ 0x0203ad74
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_const_call_1_to_0x203aa68 = 0x0203ad74 as const;
/**
 * ARM9 函数 @ 0x0203ada0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 6
 */
export const tail_call_02035470 = 0x0203ada0 as const;
/**
 * ARM9 函数 @ 0x0203adb4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const tail_call_020354e0 = 0x0203adb4 as const;
/**
 * ARM9 函数 @ 0x0203adc8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x021bf7fc = 0x0203adc8 as const;
/**
 * ARM9 函数 @ 0x0203ae14
 * @category prologue
 * @confidence high
 */
export const sub_0203ae14 = 0x0203ae14 as const;
/**
 * ARM9 函数 @ 0x0203ae5c
 * @category prologue
 * @confidence high
 */
export const sub_0203ae5c = 0x0203ae5c as const;
/**
 * ARM9 函数 @ 0x0203aeb4
 * @category prologue
 * @confidence high
 */
export const sub_0203aeb4 = 0x0203aeb4 as const;
/**
 * ARM9 函数 @ 0x0203aee8
 * @category prologue
 * @confidence high
 */
export const sub_0203aee8 = 0x0203aee8 as const;
/**
 * ARM9 函数 @ 0x0203af54
 * @category prologue
 * @confidence high
 */
export const sub_0203af54 = 0x0203af54 as const;
/**
 * ARM9 函数 @ 0x0203af84
 * @category prologue
 * @confidence high
 */
export const sub_0203af84 = 0x0203af84 as const;
/**
 * ARM9 函数 @ 0x0203afa4
 * @category prologue
 * @confidence high
 */
export const sub_0203afa4 = 0x0203afa4 as const;
/**
 * ARM9 函数 @ 0x0203afe4
 * @category prologue
 * @confidence high
 */
export const sub_0203afe4 = 0x0203afe4 as const;
/**
 * ARM9 函数 @ 0x0203b024
 * @category prologue
 * @confidence high
 */
export const sub_0203b024 = 0x0203b024 as const;
/**
 * ARM9 函数 @ 0x0203b078
 * @category prologue
 * @confidence high
 */
export const sub_0203b078 = 0x0203b078 as const;
/**
 * ARM9 函数 @ 0x0203b0b8
 * @category prologue
 * @confidence high
 */
export const sub_0203b0b8 = 0x0203b0b8 as const;
/**
 * ARM9 函数 @ 0x0203b148
 * @category prologue
 * @confidence high
 */
export const sub_0203b148 = 0x0203b148 as const;
/**
 * ARM9 函数 @ 0x0203b308
 * @category prologue
 * @confidence high
 */
export const sub_0203b308 = 0x0203b308 as const;
/**
 * ARM9 函数 @ 0x0203b350
 * @category prologue
 * @confidence high
 */
export const sub_0203b350 = 0x0203b350 as const;
/**
 * ARM9 函数 @ 0x0203b3ec
 * @category prologue
 * @confidence high
 */
export const sub_0203b3ec = 0x0203b3ec as const;
/**
 * ARM9 函数 @ 0x0203b520
 * @category prologue
 * @confidence high
 */
export const sub_0203b520 = 0x0203b520 as const;
/**
 * ARM9 函数 @ 0x0203b638
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x021c12e0 = 0x0203b638 as const;
/**
 * ARM9 函数 @ 0x0203b698
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021c12e0_1 = 0x0203b698 as const;
/**
 * ARM9 函数 @ 0x0203b6b8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const array8_struct_clear_0xc_stride = 0x0203b6b8 as const;
/**
 * ARM9 函数 @ 0x0203b6e8
 * @category prologue
 * @confidence high
 */
export const sub_0203b6e8 = 0x0203b6e8 as const;
/**
 * ARM9 函数 @ 0x0203b768
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const global_field_get_call_r1_4 = 0x0203b768 as const;
/**
 * ARM9 函数 @ 0x0203b79c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x021c1340_4 = 0x0203b79c as const;
/**
 * ARM9 函数 @ 0x0203b7d4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0xfffffd2d = 0x0203b7d4 as const;
/**
 * ARM9 函数 @ 0x0203b848
 * @category prologue
 * @confidence high
 */
export const sub_0203b848 = 0x0203b848 as const;
/**
 * ARM9 函数 @ 0x0203b890
 * @category prologue
 * @confidence high
 */
export const sub_0203b890 = 0x0203b890 as const;
/**
 * ARM9 函数 @ 0x0203b8c8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const obj_field38_get = 0x0203b8c8 as const;
/**
 * ARM9 函数 @ 0x0203b8d0
 * @category prologue
 * @confidence high
 */
export const sub_0203b8d0 = 0x0203b8d0 as const;
/**
 * ARM9 函数 @ 0x0203baa8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const word_pair_clear = 0x0203baa8 as const;
/**
 * ARM9 函数 @ 0x0203bac8
 * @category prologue
 * @confidence high
 */
export const sub_0203bac8 = 0x0203bac8 as const;
/**
 * ARM9 函数 @ 0x0203bb14
 * @category prologue
 * @confidence high
 */
export const sub_0203bb14 = 0x0203bb14 as const;
/**
 * ARM9 函数 @ 0x0203bbb4
 * @category prologue
 * @confidence high
 */
export const sub_0203bbb4 = 0x0203bbb4 as const;
/**
 * ARM9 函数 @ 0x0203bc90
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 8
 */
export const tail_call_02037f08 = 0x0203bc90 as const;
/**
 * ARM9 函数 @ 0x0203bc9c
 * @category prologue
 * @confidence high
 */
export const sub_0203bc9c = 0x0203bc9c as const;
/**
 * ARM9 函数 @ 0x0203bdc0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 15
 */
export const dcache_build_mva_register = 0x0203bdc0 as const;
/**
 * ARM9 函数 @ 0x0203be74
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 11
 */
export const bitfield_test_in_global_group = 0x0203be74 as const;
/**
 * ARM9 函数 @ 0x0203be9c
 * @category prologue
 * @confidence high
 */
export const sub_0203be9c = 0x0203be9c as const;
/**
 * ARM9 函数 @ 0x0203bf08
 * @category prologue
 * @confidence high
 */
export const sub_0203bf08 = 0x0203bf08 as const;
/**
 * ARM9 函数 @ 0x0203c014
 * @category prologue
 * @confidence high
 */
export const sub_0203c014 = 0x0203c014 as const;
/**
 * ARM9 函数 @ 0x0203c190
 * @category prologue
 * @confidence high
 */
export const sub_0203c190 = 0x0203c190 as const;
/**
 * ARM9 函数 @ 0x0203c224
 * @category prologue
 * @confidence high
 */
export const sub_0203c224 = 0x0203c224 as const;
/**
 * ARM9 函数 @ 0x0203c2a0
 * @category prologue
 * @confidence high
 */
export const sub_0203c2a0 = 0x0203c2a0 as const;
/**
 * ARM9 函数 @ 0x0203c660
 * @category prologue
 * @confidence high
 */
export const sub_0203c660 = 0x0203c660 as const;
/**
 * ARM9 函数 @ 0x0203c87c
 * @category prologue
 * @confidence high
 */
export const sub_0203c87c = 0x0203c87c as const;
/**
 * ARM9 函数 @ 0x0203c962
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_0203c962 = 0x0203c962 as const;
/**
 * ARM9 函数 @ 0x0203c98c
 * @category prologue
 * @confidence high
 */
export const sub_0203c98c = 0x0203c98c as const;
/**
 * ARM9 函数 @ 0x0203ca6e
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_0203ca6e = 0x0203ca6e as const;
/**
 * ARM9 函数 @ 0x0203ca94
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 6
 */
export const struct_state_init_flags = 0x0203ca94 as const;
/**
 * ARM9 函数 @ 0x0203cac8
 * @category prologue
 * @confidence high
 */
export const sub_0203cac8 = 0x0203cac8 as const;
/**
 * ARM9 函数 @ 0x0203cb6c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const strncasecmp_ascii = 0x0203cb6c as const;
/**
 * ARM9 函数 @ 0x0203cbd0
 * @category prologue
 * @confidence high
 */
export const sub_0203cbd0 = 0x0203cbd0 as const;
/**
 * ARM9 函数 @ 0x0203cc50
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const pair_store_0x54_null_safe = 0x0203cc50 as const;
/**
 * ARM9 函数 @ 0x0203cc70
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const params_fields_0x28_fill = 0x0203cc70 as const;
/**
 * ARM9 函数 @ 0x0203cce8
 * @category prologue
 * @confidence high
 */
export const sub_0203cce8 = 0x0203cce8 as const;
/**
 * ARM9 函数 @ 0x0203cda8
 * @category prologue
 * @confidence high
 */
export const sub_0203cda8 = 0x0203cda8 as const;
/**
 * ARM9 函数 @ 0x0203cdf8
 * @category prologue
 * @confidence high
 */
export const sub_0203cdf8 = 0x0203cdf8 as const;
/**
 * ARM9 函数 @ 0x0203ce30
 * @category prologue
 * @confidence high
 */
export const sub_0203ce30 = 0x0203ce30 as const;
/**
 * ARM9 函数 @ 0x0203cfec
 * @category prologue
 * @confidence high
 */
export const sub_0203cfec = 0x0203cfec as const;
/**
 * ARM9 函数 @ 0x0203d034
 * @category prologue
 * @confidence high
 */
export const sub_0203d034 = 0x0203d034 as const;
/**
 * ARM9 函数 @ 0x0203d0d8
 * @category prologue
 * @confidence high
 */
export const sub_0203d0d8 = 0x0203d0d8 as const;
/**
 * ARM9 函数 @ 0x0203d324
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const str_to_lower_loop = 0x0203d324 as const;
/**
 * ARM9 函数 @ 0x0203d388
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 10
 */
export const struct_field_switch_add = 0x0203d388 as const;
/**
 * ARM9 函数 @ 0x0203d3f4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 14
 */
export const tail_call_to_global_arg2_zero = 0x0203d3f4 as const;
/**
 * ARM9 函数 @ 0x0203d404
 * @category prologue
 * @confidence high
 */
export const sub_0203d404 = 0x0203d404 as const;
/**
 * ARM9 函数 @ 0x0203d450
 * @category prologue
 * @confidence high
 */
export const sub_0203d450 = 0x0203d450 as const;
/**
 * ARM9 函数 @ 0x0203d520
 * @category prologue
 * @confidence high
 */
export const sub_0203d520 = 0x0203d520 as const;
/**
 * ARM9 函数 @ 0x0203d568
 * @category prologue
 * @confidence high
 */
export const sub_0203d568 = 0x0203d568 as const;
/**
 * ARM9 函数 @ 0x0203d5b8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const obj_fields_store_call_0x203ce30 = 0x0203d5b8 as const;
/**
 * ARM9 函数 @ 0x0203d5bc
 * @category prologue
 * @confidence high
 */
export const sub_0203d5bc = 0x0203d5bc as const;
/**
 * ARM9 函数 @ 0x0203d634
 * @category prologue
 * @confidence high
 */
export const sub_0203d634 = 0x0203d634 as const;
/**
 * ARM9 函数 @ 0x0203d68c
 * @category prologue
 * @confidence high
 */
export const sub_0203d68c = 0x0203d68c as const;
/**
 * ARM9 函数 @ 0x0203d6d0
 * @category prologue
 * @confidence high
 */
export const sub_0203d6d0 = 0x0203d6d0 as const;
/**
 * ARM9 函数 @ 0x0203d758
 * @category prologue
 * @confidence high
 */
export const sub_0203d758 = 0x0203d758 as const;
/**
 * ARM9 函数 @ 0x0203d8b8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 10
 */
export const struct_init_0x1c_fields = 0x0203d8b8 as const;
/**
 * ARM9 函数 @ 0x0203d924
 * @category prologue
 * @confidence high
 */
export const sub_0203d924 = 0x0203d924 as const;
/**
 * ARM9 函数 @ 0x0203dbc8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04000290 = 0x0203dbc8 as const;
/**
 * ARM9 函数 @ 0x0203dc34
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04000290_2 = 0x0203dc34 as const;
/**
 * ARM9 函数 @ 0x0203dca8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const spin_wait_halfword_mask_clear = 0x0203dca8 as const;
/**
 * ARM9 函数 @ 0x0203dcc0
 * @category prologue
 * @confidence high
 */
export const sub_0203dcc0 = 0x0203dcc0 as const;
/**
 * ARM9 函数 @ 0x0203dcf8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const coord_scale_interp_pair_store = 0x0203dcf8 as const;
/**
 * ARM9 函数 @ 0x0203dd24
 * @category prologue
 * @confidence high
 */
export const sub_0203dd24 = 0x0203dd24 as const;
/**
 * ARM9 函数 @ 0x0203de54
 * @category prologue
 * @confidence high
 */
export const sub_0203de54 = 0x0203de54 as const;
/**
 * ARM9 函数 @ 0x0203e0c4
 * @category prologue
 * @confidence high
 */
export const sub_0203e0c4 = 0x0203e0c4 as const;
/**
 * ARM9 函数 @ 0x0203e11c
 * @category prologue
 * @confidence high
 */
export const sub_0203e11c = 0x0203e11c as const;
/**
 * ARM9 函数 @ 0x0203e1bc
 * @category prologue
 * @confidence high
 */
export const sub_0203e1bc = 0x0203e1bc as const;
/**
 * ARM9 函数 @ 0x0203e304
 * @category prologue
 * @confidence high
 */
export const sub_0203e304 = 0x0203e304 as const;
/**
 * ARM9 函数 @ 0x0203e3b0
 * @category prologue
 * @confidence high
 */
export const sub_0203e3b0 = 0x0203e3b0 as const;
/**
 * ARM9 函数 @ 0x0203e440
 * @category prologue
 * @confidence high
 */
export const sub_0203e440 = 0x0203e440 as const;
/**
 * ARM9 函数 @ 0x0203e700
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_203e710 = 0x0203e700 as const;
/**
 * ARM9 函数 @ 0x0203e718
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_203e728 = 0x0203e718 as const;
/**
 * ARM9 函数 @ 0x0203e730
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_0x0203a7dc_global_0x21c14a0 = 0x0203e730 as const;
/**
 * ARM9 函数 @ 0x0203e748
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_0x0203a824_global_0x21c1498 = 0x0203e748 as const;
/**
 * ARM9 函数 @ 0x0203e760
 * @category prologue
 * @confidence high
 */
export const sub_0203e760 = 0x0203e760 as const;
/**
 * ARM9 函数 @ 0x0203e838
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x04000304 = 0x0203e838 as const;
/**
 * ARM9 函数 @ 0x0203e854
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const mode_1_global_diff_check = 0x0203e854 as const;
/**
 * ARM9 函数 @ 0x0203e944
 * @category prologue
 * @confidence high
 */
export const sub_0203e944 = 0x0203e944 as const;
/**
 * ARM9 函数 @ 0x0203eb84
 * @category prologue
 * @confidence high
 */
export const sub_0203eb84 = 0x0203eb84 as const;
/**
 * ARM9 函数 @ 0x0203ebb4
 * @category prologue
 * @confidence high
 */
export const sub_0203ebb4 = 0x0203ebb4 as const;
/**
 * ARM9 函数 @ 0x0203ec2c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const table_lookup_or_init_0x203f1dc = 0x0203ec2c as const;
/**
 * ARM9 函数 @ 0x0203ec68
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_indirect_thunk_0x0203aea4_n3 = 0x0203ec68 as const;
/**
 * ARM9 函数 @ 0x0203ec80
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_2bl_0x203ecbc_0x203f1dc = 0x0203ec80 as const;
/**
 * ARM9 函数 @ 0x0203ecbc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const two_input_classifier = 0x0203ecbc as const;
/**
 * ARM9 函数 @ 0x0203ed4c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const wrapper_guard_spin_wait = 0x0203ed4c as const;
/**
 * ARM9 函数 @ 0x0203ed88
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const switch_dispatch_3way_alt = 0x0203ed88 as const;
/**
 * ARM9 函数 @ 0x0203edf0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const call_03ee2c_fallback_03f1dc = 0x0203edf0 as const;
/**
 * ARM9 函数 @ 0x0203ee2c
 * @category prologue
 * @confidence high
 */
export const sub_0203ee2c = 0x0203ee2c as const;
/**
 * ARM9 函数 @ 0x0203eea4
 * @category prologue
 * @confidence high
 */
export const sub_0203eea4 = 0x0203eea4 as const;
/**
 * ARM9 函数 @ 0x0203ef18
 * @category prologue
 * @confidence high
 */
export const sub_0203ef18 = 0x0203ef18 as const;
/**
 * ARM9 函数 @ 0x0203f0bc
 * @category prologue
 * @confidence high
 */
export const sub_0203f0bc = 0x0203f0bc as const;
/**
 * ARM9 函数 @ 0x0203f180
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_pair_clear_guarded = 0x0203f180 as const;
/**
 * ARM9 函数 @ 0x0203f1dc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const spin_wait_global_zero = 0x0203f1dc as const;
/**
 * ARM9 函数 @ 0x0203f1f4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const wrapper_guard_double_call = 0x0203f1f4 as const;
/**
 * ARM9 函数 @ 0x0203f244
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const spin_wait_global_not_1 = 0x0203f244 as const;
/**
 * ARM9 函数 @ 0x0203f26c
 * @category prologue
 * @confidence high
 */
export const sub_0203f26c = 0x0203f26c as const;
/**
 * ARM9 函数 @ 0x0203f2f0
 * @category prologue
 * @confidence high
 */
export const sub_0203f2f0 = 0x0203f2f0 as const;
/**
 * ARM9 函数 @ 0x0203f870
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_field_0x20_call_ret = 0x0203f870 as const;
/**
 * ARM9 函数 @ 0x0203f8b4
 * @category prologue
 * @confidence high
 */
export const sub_0203f8b4 = 0x0203f8b4 as const;
/**
 * ARM9 函数 @ 0x0203f930
 * @category prologue
 * @confidence high
 */
export const sub_0203f930 = 0x0203f930 as const;
/**
 * ARM9 函数 @ 0x0203f9ec
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 4
 */
export const call_indirect_const_0x27_to_0203b9b8 = 0x0203f9ec as const;
/**
 * ARM9 函数 @ 0x0203f9fc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const tail_call_03b9b8_const_0x12 = 0x0203f9fc as const;
/**
 * ARM9 函数 @ 0x0203fa0c
 * @category prologue
 * @confidence high
 */
export const sub_0203fa0c = 0x0203fa0c as const;
/**
 * ARM9 函数 @ 0x0203fae4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const list_insert_sorted_field_4 = 0x0203fae4 as const;
/**
 * ARM9 函数 @ 0x0203fb58
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const nullable_3field_init = 0x0203fb58 as const;
/**
 * ARM9 函数 @ 0x0203fb94
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const global_flag_once_set_1 = 0x0203fb94 as const;
/**
 * ARM9 函数 @ 0x0203fbcc
 * @category prologue
 * @confidence high
 */
export const sub_0203fbcc = 0x0203fbcc as const;
/**
 * ARM9 函数 @ 0x0203fff4
 * @category prologue
 * @confidence high
 */
export const sub_0203fff4 = 0x0203fff4 as const;
/**
 * ARM9 函数 @ 0x02040526
 * @category prologue
 * @confidence high
 */
export const sub_02040526 = 0x02040526 as const;
/**
 * ARM9 函数 @ 0x0204053c
 * @category prologue
 * @confidence high
 */
export const sub_0204053c = 0x0204053c as const;
/**
 * ARM9 函数 @ 0x020405e8
 * @category prologue
 * @confidence high
 */
export const sub_020405e8 = 0x020405e8 as const;
/**
 * ARM9 函数 @ 0x02040708
 * @category prologue
 * @confidence high
 */
export const sub_02040708 = 0x02040708 as const;
/**
 * ARM9 函数 @ 0x0204078c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const grid_index_rowstride_0x38_addr = 0x0204078c as const;
/**
 * ARM9 函数 @ 0x020407c0
 * @category prologue
 * @confidence high
 */
export const sub_020407c0 = 0x020407c0 as const;
/**
 * ARM9 函数 @ 0x02040888
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const tail_call_03bbb0 = 0x02040888 as const;
/**
 * ARM9 函数 @ 0x02040894
 * @category prologue
 * @confidence high
 */
export const sub_02040894 = 0x02040894 as const;
/**
 * ARM9 函数 @ 0x02040934
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const tail_call_03c5b8 = 0x02040934 as const;
/**
 * ARM9 函数 @ 0x02040940
 * @category prologue
 * @confidence high
 */
export const sub_02040940 = 0x02040940 as const;
/**
 * ARM9 函数 @ 0x02040a18
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_2bl_0x20407c0_0x204078c = 0x02040a18 as const;
/**
 * ARM9 函数 @ 0x02040a64
 * @category prologue
 * @confidence high
 */
export const sub_02040a64 = 0x02040a64 as const;
/**
 * ARM9 函数 @ 0x02040a8a
 * @category prologue
 * @confidence high
 */
export const sub_02040a8a = 0x02040a8a as const;
/**
 * ARM9 函数 @ 0x02040bd4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const matrix_fill_loop_2d = 0x02040bd4 as const;
/**
 * ARM9 函数 @ 0x02040e40
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const fixed_point_normalize_store = 0x02040e40 as const;
/**
 * ARM9 函数 @ 0x020412b0
 * @category prologue
 * @confidence high
 */
export const sub_020412b0 = 0x020412b0 as const;
/**
 * ARM9 函数 @ 0x0204144e
 * @category prologue
 * @confidence high
 */
export const sub_0204144e = 0x0204144e as const;
/**
 * ARM9 函数 @ 0x02041520
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const grid_bufsize_calc_max_field30 = 0x02041520 as const;
/**
 * ARM9 函数 @ 0x02041550
 * @category prologue
 * @confidence high
 */
export const sub_02041550 = 0x02041550 as const;
/**
 * ARM9 函数 @ 0x02041856
 * @category prologue
 * @confidence high
 */
export const sub_02041856 = 0x02041856 as const;
/**
 * ARM9 函数 @ 0x020419b4
 * @category prologue
 * @confidence high
 */
export const sub_020419b4 = 0x020419b4 as const;
/**
 * ARM9 函数 @ 0x02041cb0
 * @category prologue
 * @confidence high
 */
export const sub_02041cb0 = 0x02041cb0 as const;
/**
 * ARM9 函数 @ 0x02041e68
 * @category prologue
 * @confidence high
 */
export const sub_02041e68 = 0x02041e68 as const;
/**
 * ARM9 函数 @ 0x02041e8e
 * @category prologue
 * @confidence high
 */
export const sub_02041e8e = 0x02041e8e as const;
/**
 * ARM9 函数 @ 0x02041f00
 * @category prologue
 * @confidence high
 */
export const sub_02041f00 = 0x02041f00 as const;
/**
 * ARM9 函数 @ 0x02041f1a
 * @category prologue
 * @confidence high
 */
export const sub_02041f1a = 0x02041f1a as const;
/**
 * ARM9 函数 @ 0x02041f6e
 * @category prologue
 * @confidence high
 */
export const sub_02041f6e = 0x02041f6e as const;
/**
 * ARM9 函数 @ 0x02041fcc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 4
 */
export const call_indirect_const_2_to_0203e204 = 0x02041fcc as const;
/**
 * ARM9 函数 @ 0x02041fdc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 4
 */
export const call_indirect_const_2_to_0203e2a8 = 0x02041fdc as const;
/**
 * ARM9 函数 @ 0x02041fec
 * @category prologue
 * @confidence high
 */
export const sub_02041fec = 0x02041fec as const;
/**
 * ARM9 函数 @ 0x0204200c
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_state_getter_204203c = 0x0204200c as const;
/**
 * ARM9 函数 @ 0x0204202c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 3
 */
export const global_deref_deref_get = 0x0204202c as const;
/**
 * ARM9 函数 @ 0x02042040
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const struct_field_0x114_flag_get = 0x02042040 as const;
/**
 * ARM9 函数 @ 0x0204205c
 * @category prologue
 * @confidence high
 */
export const sub_0204205c = 0x0204205c as const;
/**
 * ARM9 函数 @ 0x020420b8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const main_ram_field_dxc1520_setter = 0x020420b8 as const;
/**
 * ARM9 函数 @ 0x020420c8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_null_then_call_0x203a1e4 = 0x020420c8 as const;
/**
 * ARM9 函数 @ 0x020420f4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const main_ram_field_dxc1520_getter = 0x020420f4 as const;
/**
 * ARM9 函数 @ 0x02042104
 * @category prologue
 * @confidence high
 */
export const sub_02042104 = 0x02042104 as const;
/**
 * ARM9 函数 @ 0x02042204
 * @category prologue
 * @confidence high
 */
export const sub_02042204 = 0x02042204 as const;
/**
 * ARM9 函数 @ 0x020422a8
 * @category prologue
 * @confidence high
 */
export const sub_020422a8 = 0x020422a8 as const;
/**
 * ARM9 函数 @ 0x0204231c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const node_counter_inc_finalize_call_39f4c = 0x0204231c as const;
/**
 * ARM9 函数 @ 0x02042344
 * @category prologue
 * @confidence high
 */
export const sub_02042344 = 0x02042344 as const;
/**
 * ARM9 函数 @ 0x0204238c
 * @category prologue
 * @confidence high
 */
export const sub_0204238c = 0x0204238c as const;
/**
 * ARM9 函数 @ 0x0204257c
 * @category prologue
 * @confidence high
 */
export const sub_0204257c = 0x0204257c as const;
/**
 * ARM9 函数 @ 0x020426c4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 6
 */
export const global_ptr_field4_get_b = 0x020426c4 as const;
/**
 * ARM9 函数 @ 0x020426d8
 * @category prologue
 * @confidence high
 */
export const sub_020426d8 = 0x020426d8 as const;
/**
 * ARM9 函数 @ 0x020427cc
 * @category prologue
 * @confidence high
 */
export const sub_020427cc = 0x020427cc as const;
/**
 * ARM9 函数 @ 0x02042988
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_204299c = 0x02042988 as const;
/**
 * ARM9 函数 @ 0x02042994
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_204299c_2 = 0x02042994 as const;
/**
 * ARM9 函数 @ 0x020429a0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const struct_field_0x114_flag_set_init = 0x020429a0 as const;
/**
 * ARM9 函数 @ 0x02042a24
 * @category prologue
 * @confidence high
 */
export const sub_02042a24 = 0x02042a24 as const;
/**
 * ARM9 函数 @ 0x02042b4c
 * @category prologue
 * @confidence high
 */
export const sub_02042b4c = 0x02042b4c as const;
/**
 * ARM9 函数 @ 0x02042bf8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_0x40001a4_wram_setup = 0x02042bf8 as const;
/**
 * ARM9 函数 @ 0x02042c5c
 * @category prologue
 * @confidence high
 */
export const sub_02042c5c = 0x02042c5c as const;
/**
 * ARM9 函数 @ 0x02042d5c
 * @category prologue
 * @confidence high
 */
export const sub_02042d5c = 0x02042d5c as const;
/**
 * ARM9 函数 @ 0x02042eb8
 * @category prologue
 * @confidence high
 */
export const sub_02042eb8 = 0x02042eb8 as const;
/**
 * ARM9 函数 @ 0x02042f98
 * @category prologue
 * @confidence high
 */
export const sub_02042f98 = 0x02042f98 as const;
/**
 * ARM9 函数 @ 0x02042ff0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const io_reg_spin_wait_byte_write = 0x02042ff0 as const;
/**
 * ARM9 函数 @ 0x02043090
 * @category prologue
 * @confidence high
 */
export const sub_02043090 = 0x02043090 as const;
/**
 * ARM9 函数 @ 0x02043128
 * @category prologue
 * @confidence high
 */
export const sub_02043128 = 0x02043128 as const;
/**
 * ARM9 函数 @ 0x0204327c
 * @category prologue
 * @confidence high
 */
export const sub_0204327c = 0x0204327c as const;
/**
 * ARM9 函数 @ 0x02043328
 * @category prologue
 * @confidence high
 */
export const sub_02043328 = 0x02043328 as const;
/**
 * ARM9 函数 @ 0x0204338c
 * @category prologue
 * @confidence high
 */
export const sub_0204338c = 0x0204338c as const;
/**
 * ARM9 函数 @ 0x020433fc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x027fffa8 = 0x020433fc as const;
/**
 * ARM9 函数 @ 0x0204343c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x021c1e04 = 0x0204343c as const;
/**
 * ARM9 函数 @ 0x020434a8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const call_seq_bc90_be9c_e_clear_global = 0x020434a8 as const;
/**
 * ARM9 函数 @ 0x020434e0
 * @category prologue
 * @confidence high
 */
export const sub_020434e0 = 0x020434e0 as const;
/**
 * ARM9 函数 @ 0x02043534
 * @category prologue
 * @confidence high
 */
export const sub_02043534 = 0x02043534 as const;
/**
 * ARM9 函数 @ 0x02043568
 * @category prologue
 * @confidence high
 */
export const sub_02043568 = 0x02043568 as const;
/**
 * ARM9 函数 @ 0x0204359c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 3
 */
export const halfword_bit0_clear = 0x0204359c as const;
/**
 * ARM9 函数 @ 0x020435b8
 * @category prologue
 * @confidence high
 */
export const sub_020435b8 = 0x020435b8 as const;
/**
 * ARM9 函数 @ 0x0204399c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 20
 */
export const frame_setup_with_cache_check = 0x0204399c as const;
/**
 * ARM9 函数 @ 0x02043a44
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const wrapper_guard_global_call = 0x02043a44 as const;
/**
 * ARM9 函数 @ 0x02043aa0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 8
 */
export const halfword_flag_to_state = 0x02043aa0 as const;
/**
 * ARM9 函数 @ 0x02043abc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 16
 */
export const global_dword_get_c = 0x02043abc as const;
/**
 * ARM9 函数 @ 0x02043acc
 * @category prologue
 * @confidence high
 */
export const sub_02043acc = 0x02043acc as const;
/**
 * ARM9 函数 @ 0x02043b44
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 15
 */
export const alloc_or_init_with_4args = 0x02043b44 as const;
/**
 * ARM9 函数 @ 0x02043b48
 * @category prologue
 * @confidence high
 */
export const sub_02043b48 = 0x02043b48 as const;
/**
 * ARM9 函数 @ 0x02043bfc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_lookup_resolve_2 = 0x02043bfc as const;
/**
 * ARM9 函数 @ 0x02043c70
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 18
 */
export const global_array_set_field_0x18 = 0x02043c70 as const;
/**
 * ARM9 函数 @ 0x02043c88
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021c1e0c = 0x02043c88 as const;
/**
 * ARM9 函数 @ 0x02043cfc
 * @category prologue
 * @confidence high
 */
export const sub_02043cfc = 0x02043cfc as const;
/**
 * ARM9 函数 @ 0x02043ef0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_1bl_0x2043cfc = 0x02043ef0 as const;
/**
 * ARM9 函数 @ 0x02043f24
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x020fbeb8_1 = 0x02043f24 as const;
/**
 * ARM9 函数 @ 0x02043f9c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x027ffc3c_1 = 0x02043f9c as const;
/**
 * ARM9 函数 @ 0x02044040
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x027ffc3c_1_2 = 0x02044040 as const;
/**
 * ARM9 函数 @ 0x020440e4
 * @category prologue
 * @confidence high
 */
export const sub_020440e4 = 0x020440e4 as const;
/**
 * ARM9 函数 @ 0x0204418c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 3
 */
export const wrapper_cond_read_halfword = 0x0204418c as const;
/**
 * ARM9 函数 @ 0x020441b8
 * @category prologue
 * @confidence high
 */
export const sub_020441b8 = 0x020441b8 as const;
/**
 * ARM9 函数 @ 0x020442bc
 * @category prologue
 * @confidence high
 */
export const sub_020442bc = 0x020442bc as const;
/**
 * ARM9 函数 @ 0x020443a4
 * @category prologue
 * @confidence high
 */
export const sub_020443a4 = 0x020443a4 as const;
/**
 * ARM9 函数 @ 0x0204441c
 * @category prologue
 * @confidence high
 */
export const sub_0204441c = 0x0204441c as const;
/**
 * ARM9 函数 @ 0x020444fc
 * @category prologue
 * @confidence high
 */
export const sub_020444fc = 0x020444fc as const;
/**
 * ARM9 函数 @ 0x02044548
 * @category prologue
 * @confidence high
 */
export const sub_02044548 = 0x02044548 as const;
/**
 * ARM9 函数 @ 0x02044650
 * @category prologue
 * @confidence high
 */
export const sub_02044650 = 0x02044650 as const;
/**
 * ARM9 函数 @ 0x0204472c
 * @category prologue
 * @confidence high
 */
export const sub_0204472c = 0x0204472c as const;
/**
 * ARM9 函数 @ 0x02044774
 * @category prologue
 * @confidence high
 */
export const sub_02044774 = 0x02044774 as const;
/**
 * ARM9 函数 @ 0x02044874
 * @category prologue
 * @confidence high
 */
export const sub_02044874 = 0x02044874 as const;
/**
 * ARM9 函数 @ 0x020448bc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const tail_call_0408cc_r1_1 = 0x020448bc as const;
/**
 * ARM9 函数 @ 0x020448cc
 * @category prologue
 * @confidence high
 */
export const sub_020448cc = 0x020448cc as const;
/**
 * ARM9 函数 @ 0x0204493c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const struct_field_range_validator = 0x0204493c as const;
/**
 * ARM9 函数 @ 0x0204498c
 * @category prologue
 * @confidence high
 */
export const sub_0204498c = 0x0204498c as const;
/**
 * ARM9 函数 @ 0x02044a94
 * @category prologue
 * @confidence high
 */
export const sub_02044a94 = 0x02044a94 as const;
/**
 * ARM9 函数 @ 0x02044adc
 * @category prologue
 * @confidence high
 */
export const sub_02044adc = 0x02044adc as const;
/**
 * ARM9 函数 @ 0x02044b1c
 * @category prologue
 * @confidence high
 */
export const sub_02044b1c = 0x02044b1c as const;
/**
 * ARM9 函数 @ 0x02044b84
 * @category prologue
 * @confidence high
 */
export const sub_02044b84 = 0x02044b84 as const;
/**
 * ARM9 函数 @ 0x02044c10
 * @category prologue
 * @confidence high
 */
export const sub_02044c10 = 0x02044c10 as const;
/**
 * ARM9 函数 @ 0x02044d8c
 * @category prologue
 * @confidence high
 */
export const sub_02044d8c = 0x02044d8c as const;
/**
 * ARM9 函数 @ 0x02044df8
 * @category prologue
 * @confidence high
 */
export const sub_02044df8 = 0x02044df8 as const;
/**
 * ARM9 函数 @ 0x02044e9c
 * @category prologue
 * @confidence high
 */
export const sub_02044e9c = 0x02044e9c as const;
/**
 * ARM9 函数 @ 0x02045020
 * @category prologue
 * @confidence high
 */
export const sub_02045020 = 0x02045020 as const;
/**
 * ARM9 函数 @ 0x0204505c
 * @category prologue
 * @confidence high
 */
export const sub_0204505c = 0x0204505c as const;
/**
 * ARM9 函数 @ 0x020450c8
 * @category prologue
 * @confidence high
 */
export const sub_020450c8 = 0x020450c8 as const;
/**
 * ARM9 函数 @ 0x0204523c
 * @category prologue
 * @confidence high
 */
export const sub_0204523c = 0x0204523c as const;
/**
 * ARM9 函数 @ 0x02045340
 * @category prologue
 * @confidence high
 */
export const sub_02045340 = 0x02045340 as const;
/**
 * ARM9 函数 @ 0x02045480
 * @category prologue
 * @confidence high
 */
export const sub_02045480 = 0x02045480 as const;
/**
 * ARM9 函数 @ 0x020455ec
 * @category prologue
 * @confidence high
 */
export const sub_020455ec = 0x020455ec as const;
/**
 * ARM9 函数 @ 0x02045700
 * @category prologue
 * @confidence high
 */
export const sub_02045700 = 0x02045700 as const;
/**
 * ARM9 函数 @ 0x02045a80
 * @category prologue
 * @confidence high
 */
export const sub_02045a80 = 0x02045a80 as const;
/**
 * ARM9 函数 @ 0x02045af4
 * @category prologue
 * @confidence high
 */
export const sub_02045af4 = 0x02045af4 as const;
/**
 * ARM9 函数 @ 0x02045d70
 * @category prologue
 * @confidence high
 */
export const sub_02045d70 = 0x02045d70 as const;
/**
 * ARM9 函数 @ 0x02045e38
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_indirect_to_02041a80 = 0x02045e38 as const;
/**
 * ARM9 函数 @ 0x02045e44
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_0x2045af4_const_0xffff = 0x02045e44 as const;
/**
 * ARM9 函数 @ 0x02045e70
 * @category prologue
 * @confidence high
 */
export const sub_02045e70 = 0x02045e70 as const;
/**
 * ARM9 函数 @ 0x02045ed0
 * @category prologue
 * @confidence high
 */
export const sub_02045ed0 = 0x02045ed0 as const;
/**
 * ARM9 函数 @ 0x02045f50
 * @category prologue
 * @confidence high
 */
export const sub_02045f50 = 0x02045f50 as const;
/**
 * ARM9 函数 @ 0x02045fbc
 * @category prologue
 * @confidence high
 */
export const sub_02045fbc = 0x02045fbc as const;
/**
 * ARM9 函数 @ 0x0204602c
 * @category prologue
 * @confidence high
 */
export const sub_0204602c = 0x0204602c as const;
/**
 * ARM9 函数 @ 0x020460f4
 * @category prologue
 * @confidence high
 */
export const sub_020460f4 = 0x020460f4 as const;
/**
 * ARM9 函数 @ 0x02046178
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const service_call_halfword_0xd = 0x02046178 as const;
/**
 * ARM9 函数 @ 0x0204619c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const const_zero_return_b = 0x0204619c as const;
/**
 * ARM9 函数 @ 0x020461b8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_minmax_cmp1 = 0x020461b8 as const;
/**
 * ARM9 函数 @ 0x020461c8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021c2920_1000 = 0x020461c8 as const;
/**
 * ARM9 函数 @ 0x0204624c
 * @category prologue
 * @confidence high
 */
export const sub_0204624c = 0x0204624c as const;
/**
 * ARM9 函数 @ 0x020463d8
 * @category prologue
 * @confidence high
 */
export const sub_020463d8 = 0x020463d8 as const;
/**
 * ARM9 函数 @ 0x020463dc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const state_byte_1524_check_ret_0x15 = 0x020463dc as const;
/**
 * ARM9 函数 @ 0x0204669c
 * @category prologue
 * @confidence high
 */
export const sub_0204669c = 0x0204669c as const;
/**
 * ARM9 函数 @ 0x02046738
 * @category prologue
 * @confidence high
 */
export const sub_02046738 = 0x02046738 as const;
/**
 * ARM9 函数 @ 0x020468e8
 * @category prologue
 * @confidence high
 */
export const sub_020468e8 = 0x020468e8 as const;
/**
 * ARM9 函数 @ 0x0204692c
 * @category prologue
 * @confidence high
 */
export const sub_0204692c = 0x0204692c as const;
/**
 * ARM9 函数 @ 0x020469e4
 * @category prologue
 * @confidence high
 */
export const sub_020469e4 = 0x020469e4 as const;
/**
 * ARM9 函数 @ 0x02046ef4
 * @category prologue
 * @confidence high
 */
export const sub_02046ef4 = 0x02046ef4 as const;
/**
 * ARM9 函数 @ 0x020473bc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_ptr_field_0x4e4_call = 0x020473bc as const;
/**
 * ARM9 函数 @ 0x020473f8
 * @category prologue
 * @confidence high
 */
export const sub_020473f8 = 0x020473f8 as const;
/**
 * ARM9 函数 @ 0x02047448
 * @category prologue
 * @confidence high
 */
export const sub_02047448 = 0x02047448 as const;
/**
 * ARM9 函数 @ 0x02047544
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_02047544 = 0x02047544 as const;
/**
 * ARM9 函数 @ 0x020475a0
 * @category prologue
 * @confidence high
 */
export const sub_020475a0 = 0x020475a0 as const;
/**
 * ARM9 函数 @ 0x0204763c
 * @category prologue
 * @confidence high
 */
export const sub_0204763c = 0x0204763c as const;
/**
 * ARM9 函数 @ 0x02047668
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_2way_02047668 = 0x02047668 as const;
/**
 * ARM9 函数 @ 0x0204777c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_2way_0204777c = 0x0204777c as const;
/**
 * ARM9 函数 @ 0x0204782c
 * @category prologue
 * @confidence high
 */
export const sub_0204782c = 0x0204782c as const;
/**
 * ARM9 函数 @ 0x02047842
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02047842 = 0x02047842 as const;
/**
 * ARM9 函数 @ 0x02047900
 * @category prologue
 * @confidence high
 */
export const sub_02047900 = 0x02047900 as const;
/**
 * ARM9 函数 @ 0x020479dc
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_3way_020479dc = 0x020479dc as const;
/**
 * ARM9 函数 @ 0x02047b94
 * @category prologue
 * @confidence high
 */
export const sub_02047b94 = 0x02047b94 as const;
/**
 * ARM9 函数 @ 0x02047c18
 * @category prologue
 * @confidence high
 */
export const sub_02047c18 = 0x02047c18 as const;
/**
 * ARM9 函数 @ 0x02047ef0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const range_clamp_intersect = 0x02047ef0 as const;
/**
 * ARM9 函数 @ 0x02047f84
 * @category prologue
 * @confidence high
 */
export const sub_02047f84 = 0x02047f84 as const;
/**
 * ARM9 函数 @ 0x020483f0
 * @category prologue
 * @confidence high
 */
export const sub_020483f0 = 0x020483f0 as const;
/**
 * ARM9 函数 @ 0x02048474
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const checksum_16_fold = 0x02048474 as const;
/**
 * ARM9 函数 @ 0x020484bc
 * @category prologue
 * @confidence high
 */
export const sub_020484bc = 0x020484bc as const;
/**
 * ARM9 函数 @ 0x020484f8
 * @category prologue
 * @confidence high
 */
export const sub_020484f8 = 0x020484f8 as const;
/**
 * ARM9 函数 @ 0x020486d8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021c2930_400 = 0x020486d8 as const;
/**
 * ARM9 函数 @ 0x0204879c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_flags_fields_setup = 0x0204879c as const;
/**
 * ARM9 函数 @ 0x020487cc
 * @category prologue
 * @confidence high
 */
export const sub_020487cc = 0x020487cc as const;
/**
 * ARM9 函数 @ 0x02048944
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021c2930 = 0x02048944 as const;
/**
 * ARM9 函数 @ 0x02048990
 * @category prologue
 * @confidence high
 */
export const sub_02048990 = 0x02048990 as const;
/**
 * ARM9 函数 @ 0x02048a3c
 * @category prologue
 * @confidence high
 */
export const sub_02048a3c = 0x02048a3c as const;
/**
 * ARM9 函数 @ 0x02048a54
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_1way_02048a54 = 0x02048a54 as const;
/**
 * ARM9 函数 @ 0x02048ae4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021c2930_2 = 0x02048ae4 as const;
/**
 * ARM9 函数 @ 0x02048b08
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021c2930_3 = 0x02048b08 as const;
/**
 * ARM9 函数 @ 0x02048b3c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_2way_02048b3c = 0x02048b3c as const;
/**
 * ARM9 函数 @ 0x02048b80
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const count_halfword_array_until_zero = 0x02048b80 as const;
/**
 * ARM9 函数 @ 0x02048ba8
 * @category prologue
 * @confidence high
 */
export const sub_02048ba8 = 0x02048ba8 as const;
/**
 * ARM9 函数 @ 0x02048c2c
 * @category prologue
 * @confidence high
 */
export const sub_02048c2c = 0x02048c2c as const;
/**
 * ARM9 函数 @ 0x02048ce0
 * @category prologue
 * @confidence high
 */
export const sub_02048ce0 = 0x02048ce0 as const;
/**
 * ARM9 函数 @ 0x02048ddc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 16
 */
export const early_return_if_arg1_eq_2 = 0x02048ddc as const;
/**
 * ARM9 函数 @ 0x02048e34
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x021c29d8 = 0x02048e34 as const;
/**
 * ARM9 函数 @ 0x02048e54
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x021c29d8_2 = 0x02048e54 as const;
/**
 * ARM9 函数 @ 0x02048eb4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_ptr_halfword_0xc_get = 0x02048eb4 as const;
/**
 * ARM9 函数 @ 0x02048ec8
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_ptr_field_0x8_get = 0x02048ec8 as const;
/**
 * ARM9 函数 @ 0x02048edc
 * @category prologue
 * @confidence high
 */
export const sub_02048edc = 0x02048edc as const;
/**
 * ARM9 函数 @ 0x02048fe0
 * @category prologue
 * @confidence high
 */
export const sub_02048fe0 = 0x02048fe0 as const;
/**
 * ARM9 函数 @ 0x02049030
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const global_halfword_6_store = 0x02049030 as const;
/**
 * ARM9 函数 @ 0x02049040
 * @category prologue
 * @confidence high
 */
export const sub_02049040 = 0x02049040 as const;
/**
 * ARM9 函数 @ 0x020491ec
 * @category prologue
 * @confidence high
 */
export const sub_020491ec = 0x020491ec as const;
/**
 * ARM9 函数 @ 0x0204922c
 * @category prologue
 * @confidence high
 */
export const sub_0204922c = 0x0204922c as const;
/**
 * ARM9 函数 @ 0x020492c0
 * @category prologue
 * @confidence high
 */
export const sub_020492c0 = 0x020492c0 as const;
/**
 * ARM9 函数 @ 0x020492fc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const tail_call_045320_set_global_1320_1 = 0x020492fc as const;
/**
 * ARM9 函数 @ 0x02049320
 * @category prologue
 * @confidence high
 */
export const sub_02049320 = 0x02049320 as const;
/**
 * ARM9 函数 @ 0x02049534
 * @category prologue
 * @confidence high
 */
export const sub_02049534 = 0x02049534 as const;
/**
 * ARM9 函数 @ 0x02049634
 * @category prologue
 * @confidence high
 */
export const sub_02049634 = 0x02049634 as const;
/**
 * ARM9 函数 @ 0x020496d8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const const_zero_return_c = 0x020496d8 as const;
/**
 * ARM9 函数 @ 0x02049748
 * @category prologue
 * @confidence high
 */
export const sub_02049748 = 0x02049748 as const;
/**
 * ARM9 函数 @ 0x02049930
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x027ffc3c_1_3 = 0x02049930 as const;
/**
 * ARM9 函数 @ 0x020499a8
 * @category prologue
 * @confidence high
 */
export const sub_020499a8 = 0x020499a8 as const;
/**
 * ARM9 函数 @ 0x0204a31c
 * @category prologue
 * @confidence high
 */
export const sub_0204a31c = 0x0204a31c as const;
/**
 * ARM9 函数 @ 0x0204ab94
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const init_seq_0x80_4halfwords = 0x0204ab94 as const;
/**
 * ARM9 函数 @ 0x0204ac08
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const state_0x500_0x50c_check = 0x0204ac08 as const;
/**
 * ARM9 函数 @ 0x0204ac70
 * @category prologue
 * @confidence high
 */
export const sub_0204ac70 = 0x0204ac70 as const;
/**
 * ARM9 函数 @ 0x0204acec
 * @category prologue
 * @confidence high
 */
export const sub_0204acec = 0x0204acec as const;
/**
 * ARM9 函数 @ 0x0204ad90
 * @category prologue
 * @confidence high
 */
export const sub_0204ad90 = 0x0204ad90 as const;
/**
 * ARM9 函数 @ 0x0204ae04
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const tail_call_0367ec_zero_0x70 = 0x0204ae04 as const;
/**
 * ARM9 函数 @ 0x0204ae18
 * @category prologue
 * @confidence high
 */
export const sub_0204ae18 = 0x0204ae18 as const;
/**
 * ARM9 函数 @ 0x0204ae6c
 * @category prologue
 * @confidence high
 */
export const sub_0204ae6c = 0x0204ae6c as const;
/**
 * ARM9 函数 @ 0x0204aebc
 * @category prologue
 * @confidence high
 */
export const sub_0204aebc = 0x0204aebc as const;
/**
 * ARM9 函数 @ 0x0204affc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_204b024 = 0x0204affc as const;
/**
 * ARM9 函数 @ 0x0204b014
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_0x020367ec_zero_0x20 = 0x0204b014 as const;
/**
 * ARM9 函数 @ 0x0204b028
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 4
 */
export const global_bool_flag_get = 0x0204b028 as const;
/**
 * ARM9 函数 @ 0x0204b044
 * @category prologue
 * @confidence high
 */
export const sub_0204b044 = 0x0204b044 as const;
/**
 * ARM9 函数 @ 0x0204b0ac
 * @category prologue
 * @confidence high
 */
export const sub_0204b0ac = 0x0204b0ac as const;
/**
 * ARM9 函数 @ 0x0204b0cc
 * @category prologue
 * @confidence high
 */
export const sub_0204b0cc = 0x0204b0cc as const;
/**
 * ARM9 函数 @ 0x0204b0fc
 * @category prologue
 * @confidence high
 */
export const sub_0204b0fc = 0x0204b0fc as const;
/**
 * ARM9 函数 @ 0x0204b104
 * @category prologue
 * @confidence high
 */
export const sub_0204b104 = 0x0204b104 as const;
/**
 * ARM9 函数 @ 0x0204b130
 * @category prologue
 * @confidence high
 */
export const sub_0204b130 = 0x0204b130 as const;
/**
 * ARM9 函数 @ 0x0204b160
 * @category prologue
 * @confidence high
 */
export const sub_0204b160 = 0x0204b160 as const;
/**
 * ARM9 函数 @ 0x0204b19c
 * @category prologue
 * @confidence high
 */
export const sub_0204b19c = 0x0204b19c as const;
/**
 * ARM9 函数 @ 0x0204b1e4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const table_bitset_bit_test = 0x0204b1e4 as const;
/**
 * ARM9 函数 @ 0x0204b244
 * @category prologue
 * @confidence high
 */
export const sub_0204b244 = 0x0204b244 as const;
/**
 * ARM9 函数 @ 0x0204b2f4
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_0204b2f4 = 0x0204b2f4 as const;
/**
 * ARM9 函数 @ 0x0204b430
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const byte_dispatch_6way = 0x0204b430 as const;
/**
 * ARM9 函数 @ 0x0204b4b8
 * @category prologue
 * @confidence high
 */
export const sub_0204b4b8 = 0x0204b4b8 as const;
/**
 * ARM9 函数 @ 0x0204b504
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x021c2a04 = 0x0204b504 as const;
/**
 * ARM9 函数 @ 0x0204b524
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const call_04df9c_const_0x1e_store_globals = 0x0204b524 as const;
/**
 * ARM9 函数 @ 0x0204b560
 * @category prologue
 * @confidence high
 */
export const sub_0204b560 = 0x0204b560 as const;
/**
 * ARM9 函数 @ 0x0204b5c4
 * @category prologue
 * @confidence high
 */
export const sub_0204b5c4 = 0x0204b5c4 as const;
/**
 * ARM9 函数 @ 0x0204b5ec
 * @category prologue
 * @confidence high
 */
export const sub_0204b5ec = 0x0204b5ec as const;
/**
 * ARM9 函数 @ 0x0204b66c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_0x4000204_bitfield_set = 0x0204b66c as const;
/**
 * ARM9 函数 @ 0x0204b6a0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_0x4000204_bits_read_set = 0x0204b6a0 as const;
/**
 * ARM9 函数 @ 0x0204b6e8
 * @category prologue
 * @confidence high
 */
export const sub_0204b6e8 = 0x0204b6e8 as const;
/**
 * ARM9 函数 @ 0x0204b804
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x021c2a14 = 0x0204b804 as const;
/**
 * ARM9 函数 @ 0x0204b844
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x021c2a20 = 0x0204b844 as const;
/**
 * ARM9 函数 @ 0x0204b900
 * @category prologue
 * @confidence high
 */
export const sub_0204b900 = 0x0204b900 as const;
/**
 * ARM9 函数 @ 0x0204bacc
 * @category prologue
 * @confidence high
 */
export const sub_0204bacc = 0x0204bacc as const;
/**
 * ARM9 函数 @ 0x0204bb68
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const bit_count_32 = 0x0204bb68 as const;
/**
 * ARM9 函数 @ 0x0204bbac
 * @category prologue
 * @confidence high
 */
export const sub_0204bbac = 0x0204bbac as const;
/**
 * ARM9 函数 @ 0x0204bc58
 * @category prologue
 * @confidence high
 */
export const sub_0204bc58 = 0x0204bc58 as const;
/**
 * ARM9 函数 @ 0x0204bdda
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_0204bdda = 0x0204bdda as const;
/**
 * ARM9 函数 @ 0x0204bf70
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const sfloat_add_align = 0x0204bf70 as const;
/**
 * ARM9 函数 @ 0x0204c074
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 19
 */
export const float32_compare_abs = 0x0204c074 as const;
/**
 * ARM9 函数 @ 0x0204c0c0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const float64_from_uint32 = 0x0204c0c0 as const;
/**
 * ARM9 函数 @ 0x0204c13c
 * @category prologue
 * @confidence high
 * @heuristic sfloat (V0.10 ADR-010)
 */
export const sfloat_0204c13c = 0x0204c13c as const;
/**
 * ARM9 函数 @ 0x0204c4b8
 * @category prologue
 * @confidence high
 * @heuristic sfloat (V0.10 ADR-010)
 */
export const sfloat_0204c4b8 = 0x0204c4b8 as const;
/**
 * ARM9 函数 @ 0x0204c4ca
 * @category bx_lr
 * @confidence medium
 * @heuristic sfloat (V0.10 ADR-010)
 * @callers 1
 */
export const sfloat_0204c4ca = 0x0204c4ca as const;
/**
 * ARM9 函数 @ 0x0204c86c
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 29
 */
export const __aeabi_fdiv = 0x0204c86c as const;
/**
 * ARM9 函数 @ 0x0204cbc8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const float32_lt = 0x0204cbc8 as const;
/**
 * ARM9 函数 @ 0x0204cc04
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const sfloat_compare_le = 0x0204cc04 as const;
/**
 * ARM9 函数 @ 0x0204cc84
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const float32_gt = 0x0204cc84 as const;
/**
 * ARM9 函数 @ 0x0204ccc0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const float32_compare_ge = 0x0204ccc0 as const;
/**
 * ARM9 函数 @ 0x0204cfd8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const float64_compare_setflags = 0x0204cfd8 as const;
/**
 * ARM9 函数 @ 0x0204d27e
 * @category bx_lr
 * @confidence medium
 * @heuristic sfloat (V0.10 ADR-010)
 * @callers 1
 */
export const sfloat_0204d27e = 0x0204d27e as const;
/**
 * ARM9 函数 @ 0x0204d430
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 33
 */
export const __aeabi_fsub = 0x0204d430 as const;
/**
 * ARM9 函数 @ 0x0204d54c
 * @category prologue
 * @confidence high
 * @heuristic sfloat (V0.10 ADR-010)
 */
export const sfloat_0204d54c = 0x0204d54c as const;
/**
 * ARM9 函数 @ 0x0204d7e8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 23
 */
export const float32_unpack_bits = 0x0204d7e8 as const;
/**
 * ARM9 函数 @ 0x0204d86c
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 23
 */
export const __aeabi_fcmp = 0x0204d86c as const;
/**
 * ARM9 函数 @ 0x0204d8e8
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 136
 */
export const __aeabi_fabs = 0x0204d8e8 as const;
/**
 * ARM9 函数 @ 0x0204d930
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 23
 */
export const __aeabi_fclassify = 0x0204d930 as const;
/**
 * ARM9 函数 @ 0x0204db1c
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 38
 */
export const __aeabi_fadd = 0x0204db1c as const;
/**
 * ARM9 函数 @ 0x0204dd94
 * @category prologue
 * @confidence high
 * @heuristic sfloat (V0.10 ADR-010)
 */
export const sfloat_0204dd94 = 0x0204dd94 as const;
/**
 * ARM9 函数 @ 0x0204dda0
 * @category prologue
 * @confidence high
 * @heuristic sfloat (V0.10 ADR-010)
 */
export const sfloat_0204dda0 = 0x0204dda0 as const;
/**
 * ARM9 函数 @ 0x0204dddc
 * @category prologue
 * @confidence high
 * @heuristic sfloat (V0.10 ADR-010)
 */
export const sfloat_0204dddc = 0x0204dddc as const;
/**
 * ARM9 函数 @ 0x0204ddec
 * @category prologue
 * @confidence high
 * @heuristic sfloat (V0.10 ADR-010)
 */
export const sfloat_0204ddec = 0x0204ddec as const;
/**
 * ARM9 函数 @ 0x0204df9c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 9
 */
export const s32_divmod = 0x0204df9c as const;
/**
 * ARM9 函数 @ 0x0204e1a8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const udiv_normalize_loop = 0x0204e1a8 as const;
/**
 * ARM9 函数 @ 0x0204e1b0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const shift_normalize_left_binsearch = 0x0204e1b0 as const;
/**
 * ARM9 函数 @ 0x0204e3a4
 * @category prologue
 * @confidence high
 */
export const sub_0204e3a4 = 0x0204e3a4 as const;
/**
 * ARM9 函数 @ 0x0204e544
 * @category prologue
 * @confidence high
 */
export const sub_0204e544 = 0x0204e544 as const;
/**
 * ARM9 函数 @ 0x0204e8fc
 * @category prologue
 * @confidence high
 */
export const sub_0204e8fc = 0x0204e8fc as const;
/**
 * ARM9 函数 @ 0x0204ea6a
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0204ea6a = 0x0204ea6a as const;
/**
 * ARM9 函数 @ 0x0204f3f6
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0204f3f6 = 0x0204f3f6 as const;
/**
 * ARM9 函数 @ 0x0204f568
 * @category prologue
 * @confidence high
 */
export const sub_0204f568 = 0x0204f568 as const;
/**
 * ARM9 函数 @ 0x020512e4
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020512e4 = 0x020512e4 as const;
/**
 * ARM9 函数 @ 0x02053888
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_02053888 = 0x02053888 as const;
/**
 * ARM9 函数 @ 0x02053e62
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02053e62 = 0x02053e62 as const;
/**
 * ARM9 函数 @ 0x02053e68
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02053e68 = 0x02053e68 as const;
/**
 * ARM9 函数 @ 0x02053eb2
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_02053eb2 = 0x02053eb2 as const;
/**
 * ARM9 函数 @ 0x020542de
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020542de = 0x020542de as const;
/**
 * ARM9 函数 @ 0x02054314
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_02054314 = 0x02054314 as const;
/**
 * ARM9 函数 @ 0x02054832
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02054832 = 0x02054832 as const;
/**
 * ARM9 函数 @ 0x02054952
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02054952 = 0x02054952 as const;
/**
 * ARM9 函数 @ 0x02054b1e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02054b1e = 0x02054b1e as const;
/**
 * ARM9 函数 @ 0x02054b2e
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_02054b2e = 0x02054b2e as const;
/**
 * ARM9 函数 @ 0x02054b3e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02054b3e = 0x02054b3e as const;
/**
 * ARM9 函数 @ 0x0205510c
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0205510c = 0x0205510c as const;
/**
 * ARM9 函数 @ 0x020551f8
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020551f8 = 0x020551f8 as const;
/**
 * ARM9 函数 @ 0x020558a6
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020558a6 = 0x020558a6 as const;
/**
 * ARM9 函数 @ 0x02055cc6
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_02055cc6 = 0x02055cc6 as const;
/**
 * ARM9 函数 @ 0x0205633c
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205633c = 0x0205633c as const;
/**
 * ARM9 函数 @ 0x020564be
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020564be = 0x020564be as const;
/**
 * ARM9 函数 @ 0x020564ce
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020564ce = 0x020564ce as const;
/**
 * ARM9 函数 @ 0x02056512
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02056512 = 0x02056512 as const;
/**
 * ARM9 函数 @ 0x02056530
 * @category prologue
 * @confidence high
 */
export const sub_02056530 = 0x02056530 as const;
/**
 * ARM9 函数 @ 0x02056676
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_02056676 = 0x02056676 as const;
/**
 * ARM9 函数 @ 0x020566ae
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020566ae = 0x020566ae as const;
/**
 * ARM9 函数 @ 0x02056856
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02056856 = 0x02056856 as const;
/**
 * ARM9 函数 @ 0x02056e1c
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02056e1c = 0x02056e1c as const;
/**
 * ARM9 函数 @ 0x02056ff8
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02056ff8 = 0x02056ff8 as const;
/**
 * ARM9 函数 @ 0x0205700e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205700e = 0x0205700e as const;
/**
 * ARM9 函数 @ 0x0205772e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205772e = 0x0205772e as const;
/**
 * ARM9 函数 @ 0x02057ae6
 * @category prologue
 * @confidence high
 */
export const sub_02057ae6 = 0x02057ae6 as const;
/**
 * ARM9 函数 @ 0x02058512
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02058512 = 0x02058512 as const;
/**
 * ARM9 函数 @ 0x02058544
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02058544 = 0x02058544 as const;
/**
 * ARM9 函数 @ 0x0205867e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205867e = 0x0205867e as const;
/**
 * ARM9 函数 @ 0x020586e4
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020586e4 = 0x020586e4 as const;
/**
 * ARM9 函数 @ 0x020586f8
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020586f8 = 0x020586f8 as const;
/**
 * ARM9 函数 @ 0x02058938
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_02058938 = 0x02058938 as const;
/**
 * ARM9 函数 @ 0x02058a66
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_02058a66 = 0x02058a66 as const;
/**
 * ARM9 函数 @ 0x02058c9c
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_02058c9c = 0x02058c9c as const;
/**
 * ARM9 函数 @ 0x02058fb0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02058fb0 = 0x02058fb0 as const;
/**
 * ARM9 函数 @ 0x020594ba
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020594ba = 0x020594ba as const;
/**
 * ARM9 函数 @ 0x02059504
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02059504 = 0x02059504 as const;
/**
 * ARM9 函数 @ 0x0205981e
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0205981e = 0x0205981e as const;
/**
 * ARM9 函数 @ 0x0205a090
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205a090 = 0x0205a090 as const;
/**
 * ARM9 函数 @ 0x0205a0f0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205a0f0 = 0x0205a0f0 as const;
/**
 * ARM9 函数 @ 0x0205a29e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205a29e = 0x0205a29e as const;
/**
 * ARM9 函数 @ 0x0205a3de
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_0205a3de = 0x0205a3de as const;
/**
 * ARM9 函数 @ 0x0205a3ea
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205a3ea = 0x0205a3ea as const;
/**
 * ARM9 函数 @ 0x0205ab32
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_0205ab32 = 0x0205ab32 as const;
/**
 * ARM9 函数 @ 0x0205abdc
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_0205abdc = 0x0205abdc as const;
/**
 * ARM9 函数 @ 0x0205acb8
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205acb8 = 0x0205acb8 as const;
/**
 * ARM9 函数 @ 0x0205af62
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0205af62 = 0x0205af62 as const;
/**
 * ARM9 函数 @ 0x0205b13e
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0205b13e = 0x0205b13e as const;
/**
 * ARM9 函数 @ 0x0205b194
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0205b194 = 0x0205b194 as const;
/**
 * ARM9 函数 @ 0x0205b29c
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0205b29c = 0x0205b29c as const;
/**
 * ARM9 函数 @ 0x0205b45e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205b45e = 0x0205b45e as const;
/**
 * ARM9 函数 @ 0x0205b65e
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_0205b65e = 0x0205b65e as const;
/**
 * ARM9 函数 @ 0x0205b754
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_0205b754 = 0x0205b754 as const;
/**
 * ARM9 函数 @ 0x0205ba14
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205ba14 = 0x0205ba14 as const;
/**
 * ARM9 函数 @ 0x0205ba7e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205ba7e = 0x0205ba7e as const;
/**
 * ARM9 函数 @ 0x0205c104
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0205c104 = 0x0205c104 as const;
/**
 * ARM9 函数 @ 0x0205c340
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0205c340 = 0x0205c340 as const;
/**
 * ARM9 函数 @ 0x0205c352
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0205c352 = 0x0205c352 as const;
/**
 * ARM9 函数 @ 0x0205c39c
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0205c39c = 0x0205c39c as const;
/**
 * ARM9 函数 @ 0x0205c3ca
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0205c3ca = 0x0205c3ca as const;
/**
 * ARM9 函数 @ 0x0205c45a
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0205c45a = 0x0205c45a as const;
/**
 * ARM9 函数 @ 0x0205c758
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205c758 = 0x0205c758 as const;
/**
 * ARM9 函数 @ 0x0205c7e6
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_0205c7e6 = 0x0205c7e6 as const;
/**
 * ARM9 函数 @ 0x0205c924
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205c924 = 0x0205c924 as const;
/**
 * ARM9 函数 @ 0x0205ca88
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205ca88 = 0x0205ca88 as const;
/**
 * ARM9 函数 @ 0x0205cb02
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_0205cb02 = 0x0205cb02 as const;
/**
 * ARM9 函数 @ 0x0205cb0c
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205cb0c = 0x0205cb0c as const;
/**
 * ARM9 函数 @ 0x0205cb18
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205cb18 = 0x0205cb18 as const;
/**
 * ARM9 函数 @ 0x0205ce6c
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0205ce6c = 0x0205ce6c as const;
/**
 * ARM9 函数 @ 0x0205ce7c
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0205ce7c = 0x0205ce7c as const;
/**
 * ARM9 函数 @ 0x0205d8e6
 * @category prologue
 * @confidence high
 */
export const sub_0205d8e6 = 0x0205d8e6 as const;
/**
 * ARM9 函数 @ 0x0205d9bc
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205d9bc = 0x0205d9bc as const;
/**
 * ARM9 函数 @ 0x0205e4e0
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0205e4e0 = 0x0205e4e0 as const;
/**
 * ARM9 函数 @ 0x0205f8f4
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205f8f4 = 0x0205f8f4 as const;
/**
 * ARM9 函数 @ 0x0205fadc
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0205fadc = 0x0205fadc as const;
/**
 * ARM9 函数 @ 0x0206057a
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0206057a = 0x0206057a as const;
/**
 * ARM9 函数 @ 0x02060a86
 * @category prologue
 * @confidence high
 */
export const sub_02060a86 = 0x02060a86 as const;
/**
 * ARM9 函数 @ 0x02064a62
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02064a62 = 0x02064a62 as const;
/**
 * ARM9 函数 @ 0x02064ff8
 * @category prologue
 * @confidence high
 */
export const sub_02064ff8 = 0x02064ff8 as const;
/**
 * ARM9 函数 @ 0x02065008
 * @category prologue
 * @confidence high
 */
export const sub_02065008 = 0x02065008 as const;
/**
 * ARM9 函数 @ 0x0206690e
 * @category prologue
 * @confidence high
 */
export const sub_0206690e = 0x0206690e as const;
/**
 * ARM9 函数 @ 0x0206696a
 * @category prologue
 * @confidence high
 */
export const sub_0206696a = 0x0206696a as const;
/**
 * ARM9 函数 @ 0x02066a44
 * @category prologue
 * @confidence high
 */
export const sub_02066a44 = 0x02066a44 as const;
/**
 * ARM9 函数 @ 0x02066a46
 * @category prologue
 * @confidence high
 */
export const sub_02066a46 = 0x02066a46 as const;
/**
 * ARM9 函数 @ 0x02066a4c
 * @category prologue
 * @confidence high
 */
export const sub_02066a4c = 0x02066a4c as const;
/**
 * ARM9 函数 @ 0x02066a4e
 * @category prologue
 * @confidence high
 */
export const sub_02066a4e = 0x02066a4e as const;
/**
 * ARM9 函数 @ 0x02066a64
 * @category prologue
 * @confidence high
 */
export const sub_02066a64 = 0x02066a64 as const;
/**
 * ARM9 函数 @ 0x02066a6c
 * @category prologue
 * @confidence high
 */
export const sub_02066a6c = 0x02066a6c as const;
/**
 * ARM9 函数 @ 0x02066b76
 * @category prologue
 * @confidence high
 */
export const sub_02066b76 = 0x02066b76 as const;
/**
 * ARM9 函数 @ 0x02066b92
 * @category prologue
 * @confidence high
 */
export const sub_02066b92 = 0x02066b92 as const;
/**
 * ARM9 函数 @ 0x02066ed8
 * @category prologue
 * @confidence high
 */
export const sub_02066ed8 = 0x02066ed8 as const;
/**
 * ARM9 函数 @ 0x02066fcc
 * @category prologue
 * @confidence high
 */
export const sub_02066fcc = 0x02066fcc as const;
/**
 * ARM9 函数 @ 0x02066fce
 * @category prologue
 * @confidence high
 */
export const sub_02066fce = 0x02066fce as const;
/**
 * ARM9 函数 @ 0x02066fec
 * @category prologue
 * @confidence high
 */
export const sub_02066fec = 0x02066fec as const;
/**
 * ARM9 函数 @ 0x02067154
 * @category prologue
 * @confidence high
 */
export const sub_02067154 = 0x02067154 as const;
/**
 * ARM9 函数 @ 0x02067156
 * @category prologue
 * @confidence high
 */
export const sub_02067156 = 0x02067156 as const;
/**
 * ARM9 函数 @ 0x02067174
 * @category prologue
 * @confidence high
 */
export const sub_02067174 = 0x02067174 as const;
/**
 * ARM9 函数 @ 0x020673c0
 * @category prologue
 * @confidence high
 */
export const sub_020673c0 = 0x020673c0 as const;
/**
 * ARM9 函数 @ 0x02067514
 * @category prologue
 * @confidence high
 */
export const sub_02067514 = 0x02067514 as const;
/**
 * ARM9 函数 @ 0x02067516
 * @category prologue
 * @confidence high
 */
export const sub_02067516 = 0x02067516 as const;
/**
 * ARM9 函数 @ 0x0206751c
 * @category prologue
 * @confidence high
 */
export const sub_0206751c = 0x0206751c as const;
/**
 * ARM9 函数 @ 0x0206751e
 * @category prologue
 * @confidence high
 */
export const sub_0206751e = 0x0206751e as const;
/**
 * ARM9 函数 @ 0x02067534
 * @category prologue
 * @confidence high
 */
export const sub_02067534 = 0x02067534 as const;
/**
 * ARM9 函数 @ 0x0206753c
 * @category prologue
 * @confidence high
 */
export const sub_0206753c = 0x0206753c as const;
/**
 * ARM9 函数 @ 0x02067648
 * @category prologue
 * @confidence high
 */
export const sub_02067648 = 0x02067648 as const;
/**
 * ARM9 函数 @ 0x0206766c
 * @category prologue
 * @confidence high
 */
export const sub_0206766c = 0x0206766c as const;
/**
 * ARM9 函数 @ 0x0206772c
 * @category prologue
 * @confidence high
 */
export const sub_0206772c = 0x0206772c as const;
/**
 * ARM9 函数 @ 0x02068c02
 * @category prologue
 * @confidence high
 */
export const sub_02068c02 = 0x02068c02 as const;
/**
 * ARM9 函数 @ 0x02068c40
 * @category prologue
 * @confidence high
 */
export const sub_02068c40 = 0x02068c40 as const;
/**
 * ARM9 函数 @ 0x02068fac
 * @category prologue
 * @confidence high
 */
export const sub_02068fac = 0x02068fac as const;
/**
 * ARM9 函数 @ 0x02069218
 * @category prologue
 * @confidence high
 */
export const sub_02069218 = 0x02069218 as const;
/**
 * ARM9 函数 @ 0x020692ba
 * @category prologue
 * @confidence high
 */
export const sub_020692ba = 0x020692ba as const;
/**
 * ARM9 函数 @ 0x020695e4
 * @category prologue
 * @confidence high
 */
export const sub_020695e4 = 0x020695e4 as const;
/**
 * ARM9 函数 @ 0x02069754
 * @category prologue
 * @confidence high
 */
export const sub_02069754 = 0x02069754 as const;
/**
 * ARM9 函数 @ 0x020699ea
 * @category prologue
 * @confidence high
 */
export const sub_020699ea = 0x020699ea as const;
/**
 * ARM9 函数 @ 0x02069a4a
 * @category prologue
 * @confidence high
 */
export const sub_02069a4a = 0x02069a4a as const;
/**
 * ARM9 函数 @ 0x02069d76
 * @category prologue
 * @confidence high
 */
export const sub_02069d76 = 0x02069d76 as const;
/**
 * ARM9 函数 @ 0x02069dce
 * @category prologue
 * @confidence high
 */
export const sub_02069dce = 0x02069dce as const;
/**
 * ARM9 函数 @ 0x0206b534
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0206b534 = 0x0206b534 as const;
/**
 * ARM9 函数 @ 0x0206ddf4
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0206ddf4 = 0x0206ddf4 as const;
/**
 * ARM9 函数 @ 0x0206f542
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0206f542 = 0x0206f542 as const;
/**
 * ARM9 函数 @ 0x02070430
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02070430 = 0x02070430 as const;
/**
 * ARM9 函数 @ 0x02071a5e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02071a5e = 0x02071a5e as const;
/**
 * ARM9 函数 @ 0x020741c2
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020741c2 = 0x020741c2 as const;
/**
 * ARM9 函数 @ 0x02074694
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02074694 = 0x02074694 as const;
/**
 * ARM9 函数 @ 0x02074bec
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_02074bec = 0x02074bec as const;
/**
 * ARM9 函数 @ 0x02076af2
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02076af2 = 0x02076af2 as const;
/**
 * ARM9 函数 @ 0x0207727c
 * @category prologue
 * @confidence high
 */
export const sub_0207727c = 0x0207727c as const;
/**
 * ARM9 函数 @ 0x02078628
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02078628 = 0x02078628 as const;
/**
 * ARM9 函数 @ 0x020793a4
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020793a4 = 0x020793a4 as const;
/**
 * ARM9 函数 @ 0x0207a888
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207a888 = 0x0207a888 as const;
/**
 * ARM9 函数 @ 0x0207a9e2
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207a9e2 = 0x0207a9e2 as const;
/**
 * ARM9 函数 @ 0x0207ab14
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207ab14 = 0x0207ab14 as const;
/**
 * ARM9 函数 @ 0x0207c3a8
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207c3a8 = 0x0207c3a8 as const;
/**
 * ARM9 函数 @ 0x0207c7a0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207c7a0 = 0x0207c7a0 as const;
/**
 * ARM9 函数 @ 0x0207ca04
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207ca04 = 0x0207ca04 as const;
/**
 * ARM9 函数 @ 0x0207ca20
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207ca20 = 0x0207ca20 as const;
/**
 * ARM9 函数 @ 0x0207ca84
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207ca84 = 0x0207ca84 as const;
/**
 * ARM9 函数 @ 0x0207cc0e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207cc0e = 0x0207cc0e as const;
/**
 * ARM9 函数 @ 0x0207db2c
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207db2c = 0x0207db2c as const;
/**
 * ARM9 函数 @ 0x0207db48
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_0207db48 = 0x0207db48 as const;
/**
 * ARM9 函数 @ 0x0207e1d8
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207e1d8 = 0x0207e1d8 as const;
/**
 * ARM9 函数 @ 0x0207e2b8
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207e2b8 = 0x0207e2b8 as const;
/**
 * ARM9 函数 @ 0x0207e922
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207e922 = 0x0207e922 as const;
/**
 * ARM9 函数 @ 0x0207eb60
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207eb60 = 0x0207eb60 as const;
/**
 * ARM9 函数 @ 0x0207efaa
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207efaa = 0x0207efaa as const;
/**
 * ARM9 函数 @ 0x0207f36c
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207f36c = 0x0207f36c as const;
/**
 * ARM9 函数 @ 0x0207f43c
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207f43c = 0x0207f43c as const;
/**
 * ARM9 函数 @ 0x0207f48c
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207f48c = 0x0207f48c as const;
/**
 * ARM9 函数 @ 0x0207f69c
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_0207f69c = 0x0207f69c as const;
/**
 * ARM9 函数 @ 0x0207fa44
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207fa44 = 0x0207fa44 as const;
/**
 * ARM9 函数 @ 0x0207fb44
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0207fb44 = 0x0207fb44 as const;
/**
 * ARM9 函数 @ 0x020802cc
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020802cc = 0x020802cc as const;
/**
 * ARM9 函数 @ 0x02080330
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02080330 = 0x02080330 as const;
/**
 * ARM9 函数 @ 0x0208040c
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0208040c = 0x0208040c as const;
/**
 * ARM9 函数 @ 0x0208047e
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0208047e = 0x0208047e as const;
/**
 * ARM9 函数 @ 0x020809c0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020809c0 = 0x020809c0 as const;
/**
 * ARM9 函数 @ 0x02080a5a
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02080a5a = 0x02080a5a as const;
/**
 * ARM9 函数 @ 0x02080abc
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02080abc = 0x02080abc as const;
/**
 * ARM9 函数 @ 0x02080b54
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02080b54 = 0x02080b54 as const;
/**
 * ARM9 函数 @ 0x02080ba4
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02080ba4 = 0x02080ba4 as const;
/**
 * ARM9 函数 @ 0x02080c80
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02080c80 = 0x02080c80 as const;
/**
 * ARM9 函数 @ 0x02081224
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02081224 = 0x02081224 as const;
/**
 * ARM9 函数 @ 0x02081a88
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02081a88 = 0x02081a88 as const;
/**
 * ARM9 函数 @ 0x02082378
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02082378 = 0x02082378 as const;
/**
 * ARM9 函数 @ 0x02082b5c
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02082b5c = 0x02082b5c as const;
/**
 * ARM9 函数 @ 0x0208324a
 * @category prologue
 * @confidence high
 */
export const sub_0208324a = 0x0208324a as const;
/**
 * ARM9 函数 @ 0x0208338c
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0208338c = 0x0208338c as const;
/**
 * ARM9 函数 @ 0x02083f1c
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02083f1c = 0x02083f1c as const;
/**
 * ARM9 函数 @ 0x02085210
 * @category prologue
 * @confidence high
 */
export const sub_02085210 = 0x02085210 as const;
/**
 * ARM9 函数 @ 0x020852e8
 * @category prologue
 * @confidence high
 */
export const sub_020852e8 = 0x020852e8 as const;
/**
 * ARM9 函数 @ 0x020854ea
 * @category prologue
 * @confidence high
 */
export const sub_020854ea = 0x020854ea as const;
/**
 * ARM9 函数 @ 0x02085886
 * @category prologue
 * @confidence high
 */
export const sub_02085886 = 0x02085886 as const;
/**
 * ARM9 函数 @ 0x020859ea
 * @category prologue
 * @confidence high
 */
export const sub_020859ea = 0x020859ea as const;
/**
 * ARM9 函数 @ 0x02085e34
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02085e34 = 0x02085e34 as const;
/**
 * ARM9 函数 @ 0x02087858
 * @category prologue
 * @confidence high
 */
export const sub_02087858 = 0x02087858 as const;
/**
 * ARM9 函数 @ 0x02087892
 * @category prologue
 * @confidence high
 */
export const sub_02087892 = 0x02087892 as const;
/**
 * ARM9 函数 @ 0x02089030
 * @category prologue
 * @confidence high
 */
export const sub_02089030 = 0x02089030 as const;
/**
 * ARM9 函数 @ 0x0208905c
 * @category prologue
 * @confidence high
 */
export const sub_0208905c = 0x0208905c as const;
/**
 * ARM9 函数 @ 0x02089176
 * @category prologue
 * @confidence high
 */
export const sub_02089176 = 0x02089176 as const;
/**
 * ARM9 函数 @ 0x020891e6
 * @category prologue
 * @confidence high
 */
export const sub_020891e6 = 0x020891e6 as const;
/**
 * ARM9 函数 @ 0x02089220
 * @category prologue
 * @confidence high
 */
export const sub_02089220 = 0x02089220 as const;
/**
 * ARM9 函数 @ 0x0208945a
 * @category prologue
 * @confidence high
 */
export const sub_0208945a = 0x0208945a as const;
/**
 * ARM9 函数 @ 0x020895e8
 * @category prologue
 * @confidence high
 */
export const sub_020895e8 = 0x020895e8 as const;
/**
 * ARM9 函数 @ 0x020896c0
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020896c0 = 0x020896c0 as const;
/**
 * ARM9 函数 @ 0x02089910
 * @category prologue
 * @confidence high
 */
export const sub_02089910 = 0x02089910 as const;
/**
 * ARM9 函数 @ 0x0208a554
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0208a554 = 0x0208a554 as const;
/**
 * ARM9 函数 @ 0x0208b9f6
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0208b9f6 = 0x0208b9f6 as const;
/**
 * ARM9 函数 @ 0x0208bb44
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0208bb44 = 0x0208bb44 as const;
/**
 * ARM9 函数 @ 0x0208c63e
 * @category prologue
 * @confidence high
 */
export const sub_0208c63e = 0x0208c63e as const;
/**
 * ARM9 函数 @ 0x0208cb80
 * @category prologue
 * @confidence high
 */
export const sub_0208cb80 = 0x0208cb80 as const;
/**
 * ARM9 函数 @ 0x0208cdc0
 * @category prologue
 * @confidence high
 */
export const sub_0208cdc0 = 0x0208cdc0 as const;
/**
 * ARM9 函数 @ 0x0208cefc
 * @category prologue
 * @confidence high
 */
export const sub_0208cefc = 0x0208cefc as const;
/**
 * ARM9 函数 @ 0x0208cf2a
 * @category prologue
 * @confidence high
 */
export const sub_0208cf2a = 0x0208cf2a as const;
/**
 * ARM9 函数 @ 0x0208cfae
 * @category prologue
 * @confidence high
 */
export const sub_0208cfae = 0x0208cfae as const;
/**
 * ARM9 函数 @ 0x0208d0a8
 * @category prologue
 * @confidence high
 */
export const sub_0208d0a8 = 0x0208d0a8 as const;
/**
 * ARM9 函数 @ 0x0208d230
 * @category prologue
 * @confidence high
 */
export const sub_0208d230 = 0x0208d230 as const;
/**
 * ARM9 函数 @ 0x0208d644
 * @category prologue
 * @confidence high
 */
export const sub_0208d644 = 0x0208d644 as const;
/**
 * ARM9 函数 @ 0x0208dd76
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_0208dd76 = 0x0208dd76 as const;
/**
 * ARM9 函数 @ 0x0208e2d2
 * @category prologue
 * @confidence high
 */
export const sub_0208e2d2 = 0x0208e2d2 as const;
/**
 * ARM9 函数 @ 0x0208fa56
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0208fa56 = 0x0208fa56 as const;
/**
 * ARM9 函数 @ 0x02090780
 * @category prologue
 * @confidence high
 */
export const sub_02090780 = 0x02090780 as const;
/**
 * ARM9 函数 @ 0x02091100
 * @category prologue
 * @confidence high
 */
export const sub_02091100 = 0x02091100 as const;
/**
 * ARM9 函数 @ 0x02092226
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02092226 = 0x02092226 as const;
/**
 * ARM9 函数 @ 0x02093460
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_02093460 = 0x02093460 as const;
/**
 * ARM9 函数 @ 0x020965d0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020965d0 = 0x020965d0 as const;
/**
 * ARM9 函数 @ 0x0209835c
 * @category prologue
 * @confidence high
 */
export const sub_0209835c = 0x0209835c as const;
/**
 * ARM9 函数 @ 0x0209839c
 * @category prologue
 * @confidence high
 */
export const sub_0209839c = 0x0209839c as const;
/**
 * ARM9 函数 @ 0x0209a9fc
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0209a9fc = 0x0209a9fc as const;
/**
 * ARM9 函数 @ 0x0209b0b0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0209b0b0 = 0x0209b0b0 as const;
/**
 * ARM9 函数 @ 0x0209bc58
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0209bc58 = 0x0209bc58 as const;
/**
 * ARM9 函数 @ 0x0209c464
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0209c464 = 0x0209c464 as const;
/**
 * ARM9 函数 @ 0x0209d6dc
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0209d6dc = 0x0209d6dc as const;
/**
 * ARM9 函数 @ 0x0209ddfe
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_0209ddfe = 0x0209ddfe as const;
/**
 * ARM9 函数 @ 0x020a0a52
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020a0a52 = 0x020a0a52 as const;
/**
 * ARM9 函数 @ 0x020a21ba
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020a21ba = 0x020a21ba as const;
/**
 * ARM9 函数 @ 0x020a24e4
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020a24e4 = 0x020a24e4 as const;
/**
 * ARM9 函数 @ 0x020a34bc
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020a34bc = 0x020a34bc as const;
/**
 * ARM9 函数 @ 0x020a4386
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020a4386 = 0x020a4386 as const;
/**
 * ARM9 函数 @ 0x020a4588
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020a4588 = 0x020a4588 as const;
/**
 * ARM9 函数 @ 0x020a4640
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020a4640 = 0x020a4640 as const;
/**
 * ARM9 函数 @ 0x020a47c0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020a47c0 = 0x020a47c0 as const;
/**
 * ARM9 函数 @ 0x020a4de4
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020a4de4 = 0x020a4de4 as const;
/**
 * ARM9 函数 @ 0x020aa10c
 * @category prologue
 * @confidence high
 */
export const sub_020aa10c = 0x020aa10c as const;
/**
 * ARM9 函数 @ 0x020aa30a
 * @category prologue
 * @confidence high
 */
export const sub_020aa30a = 0x020aa30a as const;
/**
 * ARM9 函数 @ 0x020aa5d0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020aa5d0 = 0x020aa5d0 as const;
/**
 * ARM9 函数 @ 0x020ac4e6
 * @category prologue
 * @confidence high
 */
export const sub_020ac4e6 = 0x020ac4e6 as const;
/**
 * ARM9 函数 @ 0x020ac500
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020ac500 = 0x020ac500 as const;
/**
 * ARM9 函数 @ 0x020ae0b2
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020ae0b2 = 0x020ae0b2 as const;
/**
 * ARM9 函数 @ 0x020b2a04
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020b2a04 = 0x020b2a04 as const;
/**
 * ARM9 函数 @ 0x020b2a4e
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020b2a4e = 0x020b2a4e as const;
/**
 * ARM9 函数 @ 0x020b9434
 * @category prologue
 * @confidence high
 */
export const sub_020b9434 = 0x020b9434 as const;
/**
 * ARM9 函数 @ 0x020badee
 * @category prologue
 * @confidence high
 */
export const sub_020badee = 0x020badee as const;
/**
 * ARM9 函数 @ 0x020bb5c8
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020bb5c8 = 0x020bb5c8 as const;
/**
 * ARM9 函数 @ 0x020bb770
 * @category prologue
 * @confidence high
 */
export const sub_020bb770 = 0x020bb770 as const;
/**
 * ARM9 函数 @ 0x020bbd8e
 * @category prologue
 * @confidence high
 */
export const sub_020bbd8e = 0x020bbd8e as const;
/**
 * ARM9 函数 @ 0x020bc312
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020bc312 = 0x020bc312 as const;
/**
 * ARM9 函数 @ 0x020bd51e
 * @category prologue
 * @confidence high
 */
export const sub_020bd51e = 0x020bd51e as const;
/**
 * ARM9 函数 @ 0x020bd58c
 * @category prologue
 * @confidence high
 */
export const sub_020bd58c = 0x020bd58c as const;
/**
 * ARM9 函数 @ 0x020bdd10
 * @category ldm_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020bdd10 = 0x020bdd10 as const;
/**
 * ARM9 函数 @ 0x020be028
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020be028 = 0x020be028 as const;
/**
 * ARM9 函数 @ 0x020be090
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020be090 = 0x020be090 as const;
/**
 * ARM9 函数 @ 0x020bf526
 * @category prologue
 * @confidence high
 */
export const sub_020bf526 = 0x020bf526 as const;
/**
 * ARM9 函数 @ 0x020cf524
 * @category prologue
 * @confidence high
 */
export const sub_020cf524 = 0x020cf524 as const;
/**
 * ARM9 函数 @ 0x020d087e
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020d087e = 0x020d087e as const;
/**
 * ARM9 函数 @ 0x020d12bc
 * @category prologue
 * @confidence high
 */
export const sub_020d12bc = 0x020d12bc as const;
/**
 * ARM9 函数 @ 0x020d1774
 * @category prologue
 * @confidence high
 */
export const sub_020d1774 = 0x020d1774 as const;
/**
 * ARM9 函数 @ 0x020d1984
 * @category prologue
 * @confidence high
 */
export const sub_020d1984 = 0x020d1984 as const;
/**
 * ARM9 函数 @ 0x020d3a20
 * @category prologue
 * @confidence high
 */
export const sub_020d3a20 = 0x020d3a20 as const;
/**
 * ARM9 函数 @ 0x020d3d62
 * @category prologue
 * @confidence high
 */
export const sub_020d3d62 = 0x020d3d62 as const;
/**
 * ARM9 函数 @ 0x020d4052
 * @category prologue
 * @confidence high
 */
export const sub_020d4052 = 0x020d4052 as const;
/**
 * ARM9 函数 @ 0x020d9656
 * @category prologue
 * @confidence high
 */
export const sub_020d9656 = 0x020d9656 as const;
/**
 * ARM9 函数 @ 0x020d9a0c
 * @category prologue
 * @confidence high
 */
export const sub_020d9a0c = 0x020d9a0c as const;
/**
 * ARM9 函数 @ 0x020d9a4a
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020d9a4a = 0x020d9a4a as const;
/**
 * ARM9 函数 @ 0x020d9eec
 * @category prologue
 * @confidence high
 */
export const sub_020d9eec = 0x020d9eec as const;
/**
 * ARM9 函数 @ 0x020da620
 * @category prologue
 * @confidence high
 */
export const sub_020da620 = 0x020da620 as const;
/**
 * ARM9 函数 @ 0x020da77a
 * @category prologue
 * @confidence high
 */
export const sub_020da77a = 0x020da77a as const;
/**
 * ARM9 函数 @ 0x020dbe62
 * @category prologue
 * @confidence high
 */
export const sub_020dbe62 = 0x020dbe62 as const;
/**
 * ARM9 函数 @ 0x020dc74c
 * @category prologue
 * @confidence high
 */
export const sub_020dc74c = 0x020dc74c as const;
/**
 * ARM9 函数 @ 0x020dda04
 * @category prologue
 * @confidence high
 */
export const sub_020dda04 = 0x020dda04 as const;
/**
 * ARM9 函数 @ 0x020dddce
 * @category prologue
 * @confidence high
 */
export const sub_020dddce = 0x020dddce as const;
/**
 * ARM9 函数 @ 0x020dde7e
 * @category prologue
 * @confidence high
 */
export const sub_020dde7e = 0x020dde7e as const;
/**
 * ARM9 函数 @ 0x020de114
 * @category prologue
 * @confidence high
 */
export const sub_020de114 = 0x020de114 as const;
/**
 * ARM9 函数 @ 0x020de3f0
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020de3f0 = 0x020de3f0 as const;
/**
 * ARM9 函数 @ 0x020dfdea
 * @category prologue
 * @confidence high
 */
export const sub_020dfdea = 0x020dfdea as const;
/**
 * ARM9 函数 @ 0x020e03fc
 * @category prologue
 * @confidence high
 */
export const sub_020e03fc = 0x020e03fc as const;
/**
 * ARM9 函数 @ 0x020e0884
 * @category prologue
 * @confidence high
 */
export const sub_020e0884 = 0x020e0884 as const;
/**
 * ARM9 函数 @ 0x020e1c0a
 * @category prologue
 * @confidence high
 */
export const sub_020e1c0a = 0x020e1c0a as const;
/**
 * ARM9 函数 @ 0x020e1eba
 * @category prologue
 * @confidence high
 */
export const sub_020e1eba = 0x020e1eba as const;
/**
 * ARM9 函数 @ 0x020e2096
 * @category prologue
 * @confidence high
 */
export const sub_020e2096 = 0x020e2096 as const;
/**
 * ARM9 函数 @ 0x020e21fa
 * @category prologue
 * @confidence high
 */
export const sub_020e21fa = 0x020e21fa as const;
/**
 * ARM9 函数 @ 0x020e23bc
 * @category prologue
 * @confidence high
 */
export const sub_020e23bc = 0x020e23bc as const;
/**
 * ARM9 函数 @ 0x020e34cc
 * @category prologue
 * @confidence high
 */
export const sub_020e34cc = 0x020e34cc as const;
/**
 * ARM9 函数 @ 0x020e35b8
 * @category prologue
 * @confidence high
 */
export const sub_020e35b8 = 0x020e35b8 as const;
/**
 * ARM9 函数 @ 0x020e38aa
 * @category prologue
 * @confidence high
 */
export const sub_020e38aa = 0x020e38aa as const;
/**
 * ARM9 函数 @ 0x020e3dc8
 * @category prologue
 * @confidence high
 */
export const sub_020e3dc8 = 0x020e3dc8 as const;
/**
 * ARM9 函数 @ 0x020e454e
 * @category prologue
 * @confidence high
 */
export const sub_020e454e = 0x020e454e as const;
/**
 * ARM9 函数 @ 0x020e4bfc
 * @category prologue
 * @confidence high
 */
export const sub_020e4bfc = 0x020e4bfc as const;
/**
 * ARM9 函数 @ 0x020e5b44
 * @category prologue
 * @confidence high
 */
export const sub_020e5b44 = 0x020e5b44 as const;
/**
 * ARM9 函数 @ 0x020e5b78
 * @category prologue
 * @confidence high
 */
export const sub_020e5b78 = 0x020e5b78 as const;
/**
 * ARM9 函数 @ 0x020e5cf6
 * @category prologue
 * @confidence high
 */
export const sub_020e5cf6 = 0x020e5cf6 as const;
/**
 * ARM9 函数 @ 0x020e99d4
 * @category prologue
 * @confidence high
 */
export const sub_020e99d4 = 0x020e99d4 as const;
/**
 * ARM9 函数 @ 0x020ea548
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020ea548 = 0x020ea548 as const;
/**
 * ARM9 函数 @ 0x020ea874
 * @category prologue
 * @confidence high
 */
export const sub_020ea874 = 0x020ea874 as const;
/**
 * ARM9 函数 @ 0x020ea8b2
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020ea8b2 = 0x020ea8b2 as const;
/**
 * ARM9 函数 @ 0x020ead1e
 * @category prologue
 * @confidence high
 */
export const sub_020ead1e = 0x020ead1e as const;
/**
 * ARM9 函数 @ 0x020ebbec
 * @category prologue
 * @confidence high
 */
export const sub_020ebbec = 0x020ebbec as const;
/**
 * ARM9 函数 @ 0x020ebc6c
 * @category prologue
 * @confidence high
 */
export const sub_020ebc6c = 0x020ebc6c as const;
/**
 * ARM9 函数 @ 0x020ebdd4
 * @category prologue
 * @confidence high
 */
export const sub_020ebdd4 = 0x020ebdd4 as const;
/**
 * ARM9 函数 @ 0x020eea46
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020eea46 = 0x020eea46 as const;
/**
 * ARM9 函数 @ 0x020f20d4
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020f20d4 = 0x020f20d4 as const;
/**
 * ARM9 函数 @ 0x020f20dc
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020f20dc = 0x020f20dc as const;
/**
 * ARM9 函数 @ 0x020f20e4
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020f20e4 = 0x020f20e4 as const;
/**
 * ARM9 函数 @ 0x020f20ee
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020f20ee = 0x020f20ee as const;
/**
 * ARM9 函数 @ 0x020f20f6
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020f20f6 = 0x020f20f6 as const;
/**
 * ARM9 函数 @ 0x020f20fe
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020f20fe = 0x020f20fe as const;
/**
 * ARM9 函数 @ 0x020f2108
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020f2108 = 0x020f2108 as const;
/**
 * ARM9 函数 @ 0x020f2110
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020f2110 = 0x020f2110 as const;
/**
 * ARM9 函数 @ 0x020f2118
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020f2118 = 0x020f2118 as const;
/**
 * ARM9 函数 @ 0x020f2120
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020f2120 = 0x020f2120 as const;
/**
 * ARM9 函数 @ 0x020f212a
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020f212a = 0x020f212a as const;
/**
 * ARM9 函数 @ 0x020f308e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f308e = 0x020f308e as const;
/**
 * ARM9 函数 @ 0x020f3098
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f3098 = 0x020f3098 as const;
/**
 * ARM9 函数 @ 0x020f309e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f309e = 0x020f309e as const;
/**
 * ARM9 函数 @ 0x020f30a0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f30a0 = 0x020f30a0 as const;
/**
 * ARM9 函数 @ 0x020f30a8
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f30a8 = 0x020f30a8 as const;
/**
 * ARM9 函数 @ 0x020f30b0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f30b0 = 0x020f30b0 as const;
/**
 * ARM9 函数 @ 0x020f30b2
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f30b2 = 0x020f30b2 as const;
/**
 * ARM9 函数 @ 0x020f30ba
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f30ba = 0x020f30ba as const;
/**
 * ARM9 函数 @ 0x020f30c0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f30c0 = 0x020f30c0 as const;
/**
 * ARM9 函数 @ 0x020f30c2
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f30c2 = 0x020f30c2 as const;
/**
 * ARM9 函数 @ 0x020f30cc
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f30cc = 0x020f30cc as const;
/**
 * ARM9 函数 @ 0x020f30d0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f30d0 = 0x020f30d0 as const;
/**
 * ARM9 函数 @ 0x020f30e2
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f30e2 = 0x020f30e2 as const;
/**
 * ARM9 函数 @ 0x020f30f2
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f30f2 = 0x020f30f2 as const;
/**
 * ARM9 函数 @ 0x020f3102
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f3102 = 0x020f3102 as const;
/**
 * ARM9 函数 @ 0x020f3112
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f3112 = 0x020f3112 as const;
/**
 * ARM9 函数 @ 0x020f3124
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f3124 = 0x020f3124 as const;
/**
 * ARM9 函数 @ 0x020f401a
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f401a = 0x020f401a as const;
/**
 * ARM9 函数 @ 0x020f402a
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f402a = 0x020f402a as const;
/**
 * ARM9 函数 @ 0x020f403c
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020f403c = 0x020f403c as const;
/**
 * ARM9 函数 @ 0x020f404c
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f404c = 0x020f404c as const;
/**
 * ARM9 函数 @ 0x020f405c
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020f405c = 0x020f405c as const;
/**
 * ARM9 函数 @ 0x020f406e
 * @category multi_caller
 * @confidence medium
 * @callers 2
 */
export const sub_020f406e = 0x020f406e as const;
/**
 * ARM9 函数 @ 0x020f4076
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020f4076 = 0x020f4076 as const;
/**
 * ARM9 函数 @ 0x020f407e
 * @category multi_caller
 * @confidence medium
 * @callers 2
 */
export const sub_020f407e = 0x020f407e as const;
/**
 * ARM9 函数 @ 0x020f4086
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f4086 = 0x020f4086 as const;
/**
 * ARM9 函数 @ 0x020f4090
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f4090 = 0x020f4090 as const;
/**
 * ARM9 函数 @ 0x020f4fc8
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f4fc8 = 0x020f4fc8 as const;
/**
 * ARM9 函数 @ 0x020f4fd8
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f4fd8 = 0x020f4fd8 as const;
/**
 * ARM9 函数 @ 0x020f4fe8
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f4fe8 = 0x020f4fe8 as const;
/**
 * ARM9 函数 @ 0x020f4ffa
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f4ffa = 0x020f4ffa as const;
/**
 * ARM9 函数 @ 0x020f500a
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f500a = 0x020f500a as const;
/**
 * ARM9 函数 @ 0x020f504a
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f504a = 0x020f504a as const;
/**
 * ARM9 函数 @ 0x020f5054
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f5054 = 0x020f5054 as const;
/**
 * ARM9 函数 @ 0x020f505c
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f505c = 0x020f505c as const;
/**
 * ARM9 函数 @ 0x020f5064
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f5064 = 0x020f5064 as const;
/**
 * ARM9 函数 @ 0x020f52e2
 * @category prologue
 * @confidence high
 */
export const sub_020f52e2 = 0x020f52e2 as const;
/**
 * ARM9 函数 @ 0x020f52ee
 * @category prologue
 * @confidence high
 */
export const sub_020f52ee = 0x020f52ee as const;
/**
 * ARM9 函数 @ 0x020f5f86
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f5f86 = 0x020f5f86 as const;
/**
 * ARM9 函数 @ 0x020f5f96
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f5f96 = 0x020f5f96 as const;
/**
 * ARM9 函数 @ 0x020f5fa6
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f5fa6 = 0x020f5fa6 as const;
/**
 * ARM9 函数 @ 0x020f5fb8
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f5fb8 = 0x020f5fb8 as const;
/**
 * ARM9 函数 @ 0x020f6028
 * @category single_caller_real
 * @confidence low
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_memset_word_r3__r7__fp__pc = 0x020f6028 as const;
/**
 * ARM9 函数 @ 0x020f6032
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f6032 = 0x020f6032 as const;
/**
 * ARM9 函数 @ 0x020f603a
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f603a = 0x020f603a as const;
/**
 * ARM9 函数 @ 0x020f6042
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f6042 = 0x020f6042 as const;
/**
 * ARM9 函数 @ 0x020f6cea
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f6cea = 0x020f6cea as const;
/**
 * ARM9 函数 @ 0x020f6f44
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f6f44 = 0x020f6f44 as const;
/**
 * ARM9 函数 @ 0x020f6f54
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f6f54 = 0x020f6f54 as const;
/**
 * ARM9 函数 @ 0x020f6f64
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f6f64 = 0x020f6f64 as const;
/**
 * ARM9 函数 @ 0x020f6f74
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f6f74 = 0x020f6f74 as const;
/**
 * ARM9 函数 @ 0x020f700e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f700e = 0x020f700e as const;
/**
 * ARM9 函数 @ 0x020f7018
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f7018 = 0x020f7018 as const;
/**
 * ARM9 函数 @ 0x020f7020
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f7020 = 0x020f7020 as const;
/**
 * ARM9 函数 @ 0x020f7f12
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020f7f12 = 0x020f7f12 as const;
/**
 * ARM9 函数 @ 0x020f7f22
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020f7f22 = 0x020f7f22 as const;
/**
 * ARM9 函数 @ 0x020f7f32
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020f7f32 = 0x020f7f32 as const;
/**
 * ARM9 函数 @ 0x020f7ff6
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020f7ff6 = 0x020f7ff6 as const;
/**
 * ARM9 函数 @ 0x020f7ffe
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020f7ffe = 0x020f7ffe as const;
/**
 * ARM9 函数 @ 0x020f8006
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020f8006 = 0x020f8006 as const;
/**
 * ARM9 函数 @ 0x020f81ae
 * @category prologue
 * @confidence high
 */
export const sub_020f81ae = 0x020f81ae as const;
/**
 * ARM9 函数 @ 0x020f8ee0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f8ee0 = 0x020f8ee0 as const;
/**
 * ARM9 函数 @ 0x020f8ef0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f8ef0 = 0x020f8ef0 as const;
/**
 * ARM9 函数 @ 0x020f8f00
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f8f00 = 0x020f8f00 as const;
/**
 * ARM9 函数 @ 0x020f8fdc
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f8fdc = 0x020f8fdc as const;
/**
 * ARM9 函数 @ 0x020f8fe4
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f8fe4 = 0x020f8fe4 as const;
/**
 * ARM9 函数 @ 0x020f8fec
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f8fec = 0x020f8fec as const;
/**
 * ARM9 函数 @ 0x020f9686
 * @category prologue
 * @confidence high
 */
export const sub_020f9686 = 0x020f9686 as const;
/**
 * ARM9 函数 @ 0x020f9692
 * @category prologue
 * @confidence high
 */
export const sub_020f9692 = 0x020f9692 as const;
/**
 * ARM9 函数 @ 0x020f9eae
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f9eae = 0x020f9eae as const;
/**
 * ARM9 函数 @ 0x020f9ebe
 * @category data_target
 * @confidence excluded
 * @callers 1
 */
export const sub_020f9ebe = 0x020f9ebe as const;
/**
 * ARM9 函数 @ 0x020f9ed0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f9ed0 = 0x020f9ed0 as const;
/**
 * ARM9 函数 @ 0x020f9fc2
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f9fc2 = 0x020f9fc2 as const;
/**
 * ARM9 函数 @ 0x020f9fca
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f9fca = 0x020f9fca as const;
/**
 * ARM9 函数 @ 0x020f9fd4
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020f9fd4 = 0x020f9fd4 as const;
/**
 * ARM9 函数 @ 0x020fae7c
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fae7c = 0x020fae7c as const;
/**
 * ARM9 函数 @ 0x020fae8e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fae8e = 0x020fae8e as const;
/**
 * ARM9 函数 @ 0x020fae9e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fae9e = 0x020fae9e as const;
/**
 * ARM9 函数 @ 0x020fafb0
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fafb0 = 0x020fafb0 as const;
/**
 * ARM9 函数 @ 0x020fafba
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fafba = 0x020fafba as const;
/**
 * ARM9 函数 @ 0x020fbe5c
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020fbe5c = 0x020fbe5c as const;
/**
 * ARM9 函数 @ 0x020fbe6c
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020fbe6c = 0x020fbe6c as const;
/**
 * ARM9 函数 @ 0x020fbfa0
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020fbfa0 = 0x020fbfa0 as const;
/**
 * ARM9 函数 @ 0x020fbfa8
 * @category pop_pc
 * @confidence medium
 * @callers 1
 */
export const sub_020fbfa8 = 0x020fbfa8 as const;
/**
 * ARM9 函数 @ 0x020fc152
 * @category prologue
 * @confidence high
 */
export const sub_020fc152 = 0x020fc152 as const;
/**
 * ARM9 函数 @ 0x020fc21e
 * @category prologue
 * @confidence high
 */
export const sub_020fc21e = 0x020fc21e as const;
/**
 * ARM9 函数 @ 0x020fc43c
 * @category prologue
 * @confidence high
 */
export const sub_020fc43c = 0x020fc43c as const;
/**
 * ARM9 函数 @ 0x020fce3a
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fce3a = 0x020fce3a as const;
/**
 * ARM9 函数 @ 0x020fce4a
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fce4a = 0x020fce4a as const;
/**
 * ARM9 函数 @ 0x020fcf8e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fcf8e = 0x020fcf8e as const;
/**
 * ARM9 函数 @ 0x020fcf98
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fcf98 = 0x020fcf98 as const;
/**
 * ARM9 函数 @ 0x020fde1a
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fde1a = 0x020fde1a as const;
/**
 * ARM9 函数 @ 0x020fde2a
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fde2a = 0x020fde2a as const;
/**
 * ARM9 函数 @ 0x020fdf7e
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fdf7e = 0x020fdf7e as const;
/**
 * ARM9 函数 @ 0x020fdf86
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fdf86 = 0x020fdf86 as const;
/**
 * ARM9 函数 @ 0x020fedf8
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fedf8 = 0x020fedf8 as const;
/**
 * ARM9 函数 @ 0x020fee08
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fee08 = 0x020fee08 as const;
/**
 * ARM9 函数 @ 0x020fef6c
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fef6c = 0x020fef6c as const;
/**
 * ARM9 函数 @ 0x020fef76
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_020fef76 = 0x020fef76 as const;
/**
 * ARM9 函数 @ 0x020ff908
 * @category prologue
 * @confidence high
 */
export const sub_020ff908 = 0x020ff908 as const;
/**
 * ARM9 函数 @ 0x020ff90c
 * @category prologue
 * @confidence high
 */
export const sub_020ff90c = 0x020ff90c as const;
/**
 * ARM9 函数 @ 0x020ff914
 * @category prologue
 * @confidence high
 */
export const sub_020ff914 = 0x020ff914 as const;
/**
 * ARM9 函数 @ 0x020ff92c
 * @category prologue
 * @confidence high
 */
export const sub_020ff92c = 0x020ff92c as const;
/**
 * ARM9 函数 @ 0x020ff934
 * @category prologue
 * @confidence high
 */
export const sub_020ff934 = 0x020ff934 as const;
/**
 * ARM9 函数 @ 0x020ff960
 * @category prologue
 * @confidence high
 */
export const sub_020ff960 = 0x020ff960 as const;
/**
 * ARM9 函数 @ 0x020ff96c
 * @category prologue
 * @confidence high
 */
export const sub_020ff96c = 0x020ff96c as const;
/**
 * ARM9 函数 @ 0x020ff990
 * @category prologue
 * @confidence high
 */
export const sub_020ff990 = 0x020ff990 as const;
/**
 * ARM9 函数 @ 0x020ffdd8
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_020ffdd8 = 0x020ffdd8 as const;
/**
 * ARM9 函数 @ 0x020ffde8
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_020ffde8 = 0x020ffde8 as const;
/**
 * ARM9 函数 @ 0x020fff5c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const intrusive_list_walk_clear_fields = 0x020fff5c as const;
/**
 * ARM9 函数 @ 0x020fff64
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x027e0000 = 0x020fff64 as const;
/**
 * ARM9 函数 @ 0x021000b4
 * @category prologue
 * @confidence high
 */
export const sub_021000b4 = 0x021000b4 as const;
/**
 * ARM9 函数 @ 0x0210014c
 * @category prologue
 * @confidence high
 */
export const sub_0210014c = 0x0210014c as const;
/**
 * ARM9 函数 @ 0x021001c0
 * @category prologue
 * @confidence high
 */
export const sub_021001c0 = 0x021001c0 as const;
/**
 * ARM9 函数 @ 0x02100500
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x02380198 = 0x02100500 as const;
/**
 * ARM9 函数 @ 0x0210055c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x027ffffa_1 = 0x0210055c as const;
/**
 * ARM9 函数 @ 0x021005dc
 * @category prologue
 * @confidence high
 */
export const sub_021005dc = 0x021005dc as const;
/**
 * ARM9 函数 @ 0x02100768
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const call_indirect_thumb_038042e1 = 0x02100768 as const;
/**
 * ARM9 函数 @ 0x02100774
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_byte_eq_0x80_flag = 0x02100774 as const;
/**
 * ARM9 函数 @ 0x02100798
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const query_flag_0x1d_0x40_cond = 0x02100798 as const;
/**
 * ARM9 函数 @ 0x021007d8
 * @category prologue
 * @confidence high
 */
export const sub_021007d8 = 0x021007d8 as const;
/**
 * ARM9 函数 @ 0x02100960
 * @category prologue
 * @confidence high
 */
export const sub_02100960 = 0x02100960 as const;
/**
 * ARM9 函数 @ 0x02100a18
 * @category prologue
 * @confidence high
 */
export const sub_02100a18 = 0x02100a18 as const;
/**
 * ARM9 函数 @ 0x02100adc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const thunk_bx_038042af = 0x02100adc as const;
/**
 * ARM9 函数 @ 0x02100ae8
 * @category prologue
 * @confidence high
 */
export const sub_02100ae8 = 0x02100ae8 as const;
/**
 * ARM9 函数 @ 0x02100ba8
 * @category prologue
 * @confidence high
 */
export const sub_02100ba8 = 0x02100ba8 as const;
/**
 * ARM9 函数 @ 0x02100c68
 * @category prologue
 * @confidence high
 */
export const sub_02100c68 = 0x02100c68 as const;
/**
 * ARM9 函数 @ 0x02100d24
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const guard_call_seq_2_0xb = 0x02100d24 as const;
/**
 * ARM9 函数 @ 0x02100d64
 * @category prologue
 * @confidence high
 */
export const sub_02100d64 = 0x02100d64 as const;
/**
 * ARM9 函数 @ 0x02100db6
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02100db6 = 0x02100db6 as const;
/**
 * ARM9 函数 @ 0x02100dc6
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02100dc6 = 0x02100dc6 as const;
/**
 * ARM9 函数 @ 0x02100ddc
 * @category prologue
 * @confidence high
 */
export const sub_02100ddc = 0x02100ddc as const;
/**
 * ARM9 函数 @ 0x02100ec0
 * @category prologue
 * @confidence high
 */
export const sub_02100ec0 = 0x02100ec0 as const;
/**
 * ARM9 函数 @ 0x02100f4a
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02100f4a = 0x02100f4a as const;
/**
 * ARM9 函数 @ 0x02100f54
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const tail_epilogue_after_node_init = 0x02100f54 as const;
/**
 * ARM9 函数 @ 0x02100f68
 * @category prologue
 * @confidence high
 */
export const sub_02100f68 = 0x02100f68 as const;
/**
 * ARM9 函数 @ 0x02100fec
 * @category prologue
 * @confidence high
 */
export const sub_02100fec = 0x02100fec as const;
/**
 * ARM9 函数 @ 0x02101060
 * @category prologue
 * @confidence high
 */
export const sub_02101060 = 0x02101060 as const;
/**
 * ARM9 函数 @ 0x021010fc
 * @category prologue
 * @confidence high
 */
export const sub_021010fc = 0x021010fc as const;
/**
 * ARM9 函数 @ 0x02101414
 * @category prologue
 * @confidence high
 */
export const sub_02101414 = 0x02101414 as const;
/**
 * ARM9 函数 @ 0x021014a4
 * @category prologue
 * @confidence high
 */
export const sub_021014a4 = 0x021014a4 as const;
/**
 * ARM9 函数 @ 0x02101960
 * @category prologue
 * @confidence high
 */
export const sub_02101960 = 0x02101960 as const;
/**
 * ARM9 函数 @ 0x02101a18
 * @category prologue
 * @confidence high
 */
export const sub_02101a18 = 0x02101a18 as const;
/**
 * ARM9 函数 @ 0x02101ab4
 * @category prologue
 * @confidence high
 */
export const sub_02101ab4 = 0x02101ab4 as const;
/**
 * ARM9 函数 @ 0x02101b98
 * @category prologue
 * @confidence high
 */
export const sub_02101b98 = 0x02101b98 as const;
/**
 * ARM9 函数 @ 0x02101c24
 * @category prologue
 * @confidence high
 */
export const sub_02101c24 = 0x02101c24 as const;
/**
 * ARM9 函数 @ 0x02101d96
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02101d96 = 0x02101d96 as const;
/**
 * ARM9 函数 @ 0x02101da6
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02101da6 = 0x02101da6 as const;
/**
 * ARM9 函数 @ 0x02101f20
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0380fff4_344 = 0x02101f20 as const;
/**
 * ARM9 函数 @ 0x02101f3a
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02101f3a = 0x02101f3a as const;
/**
 * ARM9 函数 @ 0x02101f42
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02101f42 = 0x02101f42 as const;
/**
 * ARM9 函数 @ 0x02101f9c
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0000ffff = 0x02101f9c as const;
/**
 * ARM9 函数 @ 0x02101fd8
 * @category prologue
 * @confidence high
 */
export const sub_02101fd8 = 0x02101fd8 as const;
/**
 * ARM9 函数 @ 0x02102104
 * @category prologue
 * @confidence high
 */
export const sub_02102104 = 0x02102104 as const;
/**
 * ARM9 函数 @ 0x021022c8
 * @category prologue
 * @confidence high
 */
export const sub_021022c8 = 0x021022c8 as const;
/**
 * ARM9 函数 @ 0x02102538
 * @category prologue
 * @confidence high
 */
export const sub_02102538 = 0x02102538 as const;
/**
 * ARM9 函数 @ 0x021029c8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const global_halfword_write_0x1000_check = 0x021029c8 as const;
/**
 * ARM9 函数 @ 0x02102ad8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0380fff4_600 = 0x02102ad8 as const;
/**
 * ARM9 函数 @ 0x02102b94
 * @category prologue
 * @confidence high
 */
export const sub_02102b94 = 0x02102b94 as const;
/**
 * ARM9 函数 @ 0x02102d74
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x0480819c = 0x02102d74 as const;
/**
 * ARM9 函数 @ 0x02102d84
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04808244 = 0x02102d84 as const;
/**
 * ARM9 函数 @ 0x02102e08
 * @category prologue
 * @confidence high
 */
export const sub_02102e08 = 0x02102e08 as const;
/**
 * ARM9 函数 @ 0x02102edc
 * @category prologue
 * @confidence high
 */
export const sub_02102edc = 0x02102edc as const;
/**
 * ARM9 函数 @ 0x02102f28
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_bl2_wrap_0x21029c8_0x21041fc = 0x02102f28 as const;
/**
 * ARM9 函数 @ 0x02102f32
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02102f32 = 0x02102f32 as const;
/**
 * ARM9 函数 @ 0x02102f48
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 13
 */
export const global_0x300_field_range_sub = 0x02102f48 as const;
/**
 * ARM9 函数 @ 0x02102f70
 * @category prologue
 * @confidence high
 */
export const sub_02102f70 = 0x02102f70 as const;
/**
 * ARM9 函数 @ 0x02103010
 * @category prologue
 * @confidence high
 */
export const sub_02103010 = 0x02103010 as const;
/**
 * ARM9 函数 @ 0x02103218
 * @category prologue
 * @confidence high
 */
export const sub_02103218 = 0x02103218 as const;
/**
 * ARM9 函数 @ 0x021035f0
 * @category prologue
 * @confidence high
 */
export const sub_021035f0 = 0x021035f0 as const;
/**
 * ARM9 函数 @ 0x021036dc
 * @category prologue
 * @confidence high
 */
export const sub_021036dc = 0x021036dc as const;
/**
 * ARM9 函数 @ 0x021037a0
 * @category prologue
 * @confidence high
 */
export const sub_021037a0 = 0x021037a0 as const;
/**
 * ARM9 函数 @ 0x02103814
 * @category prologue
 * @confidence high
 */
export const sub_02103814 = 0x02103814 as const;
/**
 * ARM9 函数 @ 0x02103bc0
 * @category prologue
 * @confidence high
 */
export const sub_02103bc0 = 0x02103bc0 as const;
/**
 * ARM9 函数 @ 0x02103d34
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x0480819c_2 = 0x02103d34 as const;
/**
 * ARM9 函数 @ 0x02103d54
 * @category near
 * @confidence high
 * @callers 1
 */
export const sub_02103d54 = 0x02103d54 as const;
/**
 * ARM9 函数 @ 0x02103d60
 * @category prologue
 * @confidence high
 */
export const sub_02103d60 = 0x02103d60 as const;
/**
 * ARM9 函数 @ 0x02103d64
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_array_mix_access_0x000082ea_idx = 0x02103d64 as const;
/**
 * ARM9 函数 @ 0x02103f20
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x03808234_1 = 0x02103f20 as const;
/**
 * ARM9 函数 @ 0x021040f4
 * @category prologue
 * @confidence high
 */
export const sub_021040f4 = 0x021040f4 as const;
/**
 * ARM9 函数 @ 0x0210418c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const io_flag_guarded_global_swap_b = 0x0210418c as const;
/**
 * ARM9 函数 @ 0x021041c0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 14
 */
export const global_flags_andnot_clear_irq_safe = 0x021041c0 as const;
/**
 * ARM9 函数 @ 0x021041fc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 15
 */
export const global_flags_or_set_irq_safe = 0x021041fc as const;
/**
 * ARM9 函数 @ 0x02104234
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04000208 = 0x02104234 as const;
/**
 * ARM9 函数 @ 0x02104268
 * @category prologue
 * @confidence high
 */
export const sub_02104268 = 0x02104268 as const;
/**
 * ARM9 函数 @ 0x021042b4
 * @category prologue
 * @confidence high
 */
export const sub_021042b4 = 0x021042b4 as const;
/**
 * ARM9 函数 @ 0x0210435c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x03808234_1 = 0x0210435c as const;
/**
 * ARM9 函数 @ 0x021044c4
 * @category prologue
 * @confidence high
 */
export const sub_021044c4 = 0x021044c4 as const;
/**
 * ARM9 函数 @ 0x02104548
 * @category prologue
 * @confidence high
 */
export const sub_02104548 = 0x02104548 as const;
/**
 * ARM9 函数 @ 0x021045d4
 * @category prologue
 * @confidence high
 */
export const sub_021045d4 = 0x021045d4 as const;
/**
 * ARM9 函数 @ 0x0210461c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 3
 */
export const call_indirect_thumb_03804295 = 0x0210461c as const;
/**
 * ARM9 函数 @ 0x02104628
 * @category prologue
 * @confidence high
 */
export const sub_02104628 = 0x02104628 as const;
/**
 * ARM9 函数 @ 0x021046b0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_field_access_setter_off0x98 = 0x021046b0 as const;
/**
 * ARM9 函数 @ 0x021046b8
 * @category prologue
 * @confidence high
 */
export const sub_021046b8 = 0x021046b8 as const;
/**
 * ARM9 函数 @ 0x021046f0
 * @category prologue
 * @confidence high
 */
export const sub_021046f0 = 0x021046f0 as const;
/**
 * ARM9 函数 @ 0x02104728
 * @category prologue
 * @confidence high
 */
export const sub_02104728 = 0x02104728 as const;
/**
 * ARM9 函数 @ 0x0210477c
 * @category prologue
 * @confidence high
 */
export const sub_0210477c = 0x0210477c as const;
/**
 * ARM9 函数 @ 0x02104820
 * @category prologue
 * @confidence high
 */
export const sub_02104820 = 0x02104820 as const;
/**
 * ARM9 函数 @ 0x021048d0
 * @category prologue
 * @confidence high
 */
export const sub_021048d0 = 0x021048d0 as const;
/**
 * ARM9 函数 @ 0x021049b0
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x038082c4 = 0x021049b0 as const;
/**
 * ARM9 函数 @ 0x021049dc
 * @category prologue
 * @confidence high
 */
export const sub_021049dc = 0x021049dc as const;
/**
 * ARM9 函数 @ 0x02104a10
 * @category prologue
 * @confidence high
 */
export const sub_02104a10 = 0x02104a10 as const;
/**
 * ARM9 函数 @ 0x02104a8c
 * @category prologue
 * @confidence high
 */
export const sub_02104a8c = 0x02104a8c as const;
/**
 * ARM9 函数 @ 0x02104ae0
 * @category prologue
 * @confidence high
 */
export const sub_02104ae0 = 0x02104ae0 as const;
/**
 * ARM9 函数 @ 0x02104b40
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x038082bc = 0x02104b40 as const;
/**
 * ARM9 函数 @ 0x02104b88
 * @category prologue
 * @confidence high
 */
export const sub_02104b88 = 0x02104b88 as const;
/**
 * ARM9 函数 @ 0x02104c1c
 * @category prologue
 * @confidence high
 */
export const sub_02104c1c = 0x02104c1c as const;
/**
 * ARM9 函数 @ 0x02104d2c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const init_once_guard_fields = 0x02104d2c as const;
/**
 * ARM9 函数 @ 0x02104d42
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02104d42 = 0x02104d42 as const;
/**
 * ARM9 函数 @ 0x02104e34
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x038082c4_2 = 0x02104e34 as const;
/**
 * ARM9 函数 @ 0x02104e7c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const list_find_first_ge_0x54 = 0x02104e7c as const;
/**
 * ARM9 函数 @ 0x02104ee4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_list_unlink_next_off0x10_2 = 0x02104ee4 as const;
/**
 * ARM9 函数 @ 0x02104f10
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const intrusive_list_unlink_alt = 0x02104f10 as const;
/**
 * ARM9 函数 @ 0x02104f14
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02104f14 = 0x02104f14 as const;
/**
 * ARM9 函数 @ 0x02104f18
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02104f18 = 0x02104f18 as const;
/**
 * ARM9 函数 @ 0x02104f74
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const intrusive_list_pop_front = 0x02104f74 as const;
/**
 * ARM9 函数 @ 0x02104fa8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const intrusive_list_sorted_insert_alt = 0x02104fa8 as const;
/**
 * ARM9 函数 @ 0x02105020
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x038082b4_1 = 0x02105020 as const;
/**
 * ARM9 函数 @ 0x02105038
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const queue_ctl_init_b = 0x02105038 as const;
/**
 * ARM9 函数 @ 0x0210509c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const arm_exception_ctx_save = 0x0210509c as const;
/**
 * ARM9 函数 @ 0x021050d0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const arm_exception_ctx_restore = 0x021050d0 as const;
/**
 * ARM9 函数 @ 0x021050fc
 * @category prologue
 * @confidence high
 */
export const sub_021050fc = 0x021050fc as const;
/**
 * ARM9 函数 @ 0x02105174
 * @category prologue
 * @confidence high
 */
export const sub_02105174 = 0x02105174 as const;
/**
 * ARM9 函数 @ 0x02105214
 * @category prologue
 * @confidence high
 */
export const sub_02105214 = 0x02105214 as const;
/**
 * ARM9 函数 @ 0x021052a8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const intrusive_list_head_init = 0x021052a8 as const;
/**
 * ARM9 函数 @ 0x021052d8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_list_relink_off0x10_0x14_2 = 0x021052d8 as const;
/**
 * ARM9 函数 @ 0x021052fc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const intrusive_list_push_back = 0x021052fc as const;
/**
 * ARM9 函数 @ 0x02105320
 * @category prologue
 * @confidence high
 */
export const sub_02105320 = 0x02105320 as const;
/**
 * ARM9 函数 @ 0x0210535c
 * @category prologue
 * @confidence high
 */
export const sub_0210535c = 0x0210535c as const;
/**
 * ARM9 函数 @ 0x021053cc
 * @category prologue
 * @confidence high
 */
export const sub_021053cc = 0x021053cc as const;
/**
 * ARM9 函数 @ 0x02105474
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_multi_bl_init_9bl_0x21055d4_0x2106e5c_0x2104628_0x210435c_0x2105d90_0x2106204_0x2104d2c_0x2106a94_0x210f9f4 = 0x02105474 as const;
/**
 * ARM9 函数 @ 0x021054ac
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const shared_mem_da0_indexed_set_v2 = 0x021054ac as const;
/**
 * ARM9 函数 @ 0x021054c0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const shared_mem_dc4_indexed_set_v2 = 0x021054c0 as const;
/**
 * ARM9 函数 @ 0x021054d4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const state_select_clamp = 0x021054d4 as const;
/**
 * ARM9 函数 @ 0x0210552c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const state_select_const = 0x0210552c as const;
/**
 * ARM9 函数 @ 0x021055ac
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const table_word_get_0x27ffda0_b = 0x021055ac as const;
/**
 * ARM9 函数 @ 0x021055c0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const shared_mem_dc4_indexed_get = 0x021055c0 as const;
/**
 * ARM9 函数 @ 0x021055d4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0380841c = 0x021055d4 as const;
/**
 * ARM9 函数 @ 0x02105678
 * @category prologue
 * @confidence high
 */
export const sub_02105678 = 0x02105678 as const;
/**
 * ARM9 函数 @ 0x0210581c
 * @category prologue
 * @confidence high
 */
export const sub_0210581c = 0x0210581c as const;
/**
 * ARM9 函数 @ 0x021058c4
 * @category prologue
 * @confidence high
 */
export const sub_021058c4 = 0x021058c4 as const;
/**
 * ARM9 函数 @ 0x0210596c
 * @category prologue
 * @confidence high
 */
export const sub_0210596c = 0x0210596c as const;
/**
 * ARM9 函数 @ 0x021059a8
 * @category prologue
 * @confidence high
 */
export const sub_021059a8 = 0x021059a8 as const;
/**
 * ARM9 函数 @ 0x021059d2
 * @category prologue
 * @confidence high
 */
export const sub_021059d2 = 0x021059d2 as const;
/**
 * ARM9 函数 @ 0x02105a1c
 * @category prologue
 * @confidence high
 */
export const sub_02105a1c = 0x02105a1c as const;
/**
 * ARM9 函数 @ 0x02105a5a
 * @category prologue
 * @confidence high
 */
export const sub_02105a5a = 0x02105a5a as const;
/**
 * ARM9 函数 @ 0x02105b34
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const heap_freelist_coalesce_insert = 0x02105b34 as const;
/**
 * ARM9 函数 @ 0x02105be8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const dllist_node_unlink = 0x02105be8 as const;
/**
 * ARM9 函数 @ 0x02105c10
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const heap_freelist_push_front = 0x02105c10 as const;
/**
 * ARM9 函数 @ 0x02105c2c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_halfword_bit_set = 0x02105c2c as const;
/**
 * ARM9 函数 @ 0x02105c48
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 6
 */
export const global_compute_write = 0x02105c48 as const;
/**
 * ARM9 函数 @ 0x02105d22
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02105d22 = 0x02105d22 as const;
/**
 * ARM9 函数 @ 0x02105d32
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02105d32 = 0x02105d32 as const;
/**
 * ARM9 函数 @ 0x02105d80
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_halfword_getter_2105d8c = 0x02105d80 as const;
/**
 * ARM9 函数 @ 0x02105d90
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x03808448 = 0x02105d90 as const;
/**
 * ARM9 函数 @ 0x02105e34
 * @category prologue
 * @confidence high
 */
export const sub_02105e34 = 0x02105e34 as const;
/**
 * ARM9 函数 @ 0x02105efe
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02105efe = 0x02105efe as const;
/**
 * ARM9 函数 @ 0x02105f06
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02105f06 = 0x02105f06 as const;
/**
 * ARM9 函数 @ 0x02105f34
 * @category prologue
 * @confidence high
 */
export const sub_02105f34 = 0x02105f34 as const;
/**
 * ARM9 函数 @ 0x02105fc4
 * @category prologue
 * @confidence high
 */
export const sub_02105fc4 = 0x02105fc4 as const;
/**
 * ARM9 函数 @ 0x02106040
 * @category prologue
 * @confidence high
 */
export const sub_02106040 = 0x02106040 as const;
/**
 * ARM9 函数 @ 0x021060b4
 * @category prologue
 * @confidence high
 */
export const sub_021060b4 = 0x021060b4 as const;
/**
 * ARM9 函数 @ 0x021061e4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const struct_clear_2_fields = 0x021061e4 as const;
/**
 * ARM9 函数 @ 0x021061f4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_halfword_getter_2106200 = 0x021061f4 as const;
/**
 * ARM9 函数 @ 0x02106204
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x03808458 = 0x02106204 as const;
/**
 * ARM9 函数 @ 0x02106254
 * @category prologue
 * @confidence high
 */
export const sub_02106254 = 0x02106254 as const;
/**
 * ARM9 函数 @ 0x0210629a
 * @category prologue
 * @confidence high
 */
export const sub_0210629a = 0x0210629a as const;
/**
 * ARM9 函数 @ 0x021062f0
 * @category prologue
 * @confidence high
 */
export const sub_021062f0 = 0x021062f0 as const;
/**
 * ARM9 函数 @ 0x0210630a
 * @category prologue
 * @confidence high
 */
export const sub_0210630a = 0x0210630a as const;
/**
 * ARM9 函数 @ 0x0210630e
 * @category prologue
 * @confidence high
 */
export const sub_0210630e = 0x0210630e as const;
/**
 * ARM9 函数 @ 0x02106316
 * @category prologue
 * @confidence high
 */
export const sub_02106316 = 0x02106316 as const;
/**
 * ARM9 函数 @ 0x0210633c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const signed_coord_delta_bounds_check = 0x0210633c as const;
/**
 * ARM9 函数 @ 0x0210636e
 * @category prologue
 * @confidence high
 */
export const sub_0210636e = 0x0210636e as const;
/**
 * ARM9 函数 @ 0x0210638c
 * @category prologue
 * @confidence high
 */
export const sub_0210638c = 0x0210638c as const;
/**
 * ARM9 函数 @ 0x02106514
 * @category prologue
 * @confidence high
 */
export const sub_02106514 = 0x02106514 as const;
/**
 * ARM9 函数 @ 0x02106590
 * @category prologue
 * @confidence high
 */
export const sub_02106590 = 0x02106590 as const;
/**
 * ARM9 函数 @ 0x021065e4
 * @category prologue
 * @confidence high
 */
export const sub_021065e4 = 0x021065e4 as const;
/**
 * ARM9 函数 @ 0x02106610
 * @category prologue
 * @confidence high
 */
export const sub_02106610 = 0x02106610 as const;
/**
 * ARM9 函数 @ 0x0210666c
 * @category prologue
 * @confidence high
 */
export const sub_0210666c = 0x0210666c as const;
/**
 * ARM9 函数 @ 0x02106704
 * @category prologue
 * @confidence high
 */
export const sub_02106704 = 0x02106704 as const;
/**
 * ARM9 函数 @ 0x021067b0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const dllist_unlink_node = 0x021067b0 as const;
/**
 * ARM9 函数 @ 0x021067e8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const dllist_insert_head = 0x021067e8 as const;
/**
 * ARM9 函数 @ 0x0210682c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const list_insert_sorted_multi_key = 0x0210682c as const;
/**
 * ARM9 函数 @ 0x0210692c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_cpsr_flip_clear = 0x0210692c as const;
/**
 * ARM9 函数 @ 0x02106940
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 41
 */
export const pool_alloc_32 = 0x02106940 as const;
/**
 * ARM9 函数 @ 0x02106954
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 50
 */
export const pool_alloc_64 = 0x02106954 as const;
/**
 * ARM9 函数 @ 0x0210696c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const cpsr_bits_0xc0_set_b = 0x0210696c as const;
/**
 * ARM9 函数 @ 0x02106980
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const cpsr_bits_0xc0_set_from_r0_b = 0x02106980 as const;
/**
 * ARM9 函数 @ 0x02106998
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_mode_getter_apsr_2 = 0x02106998 as const;
/**
 * ARM9 函数 @ 0x021069a4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const wrapper_call_2_funcs_d = 0x021069a4 as const;
/**
 * ARM9 函数 @ 0x021069c4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_multi_bl_init_9bl_0x2106af0_0x2106af0_0x2106af0_0x2106af0_0x2104234_0x210418c_0x21073a4_0x2106a18_0x2110300 = 0x021069c4 as const;
/**
 * ARM9 函数 @ 0x02106a18
 * @category prologue
 * @confidence high
 */
export const sub_02106a18 = 0x02106a18 as const;
/**
 * ARM9 函数 @ 0x02106a84
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_halfword_getter_2106a90 = 0x02106a84 as const;
/**
 * ARM9 函数 @ 0x02106a94
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x03808478 = 0x02106a94 as const;
/**
 * ARM9 函数 @ 0x02106ad4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 10
 */
export const poll_loop_3_calls = 0x02106ad4 as const;
/**
 * ARM9 函数 @ 0x02106af0
 * @category prologue
 * @confidence high
 */
export const sub_02106af0 = 0x02106af0 as const;
/**
 * ARM9 函数 @ 0x02106b74
 * @category prologue
 * @confidence high
 */
export const sub_02106b74 = 0x02106b74 as const;
/**
 * ARM9 函数 @ 0x02106c18
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 6
 */
export const memcpy_word_loop = 0x02106c18 as const;
/**
 * ARM9 函数 @ 0x02106c2c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_memcpy_word_02106c2c = 0x02106c2c as const;
/**
 * ARM9 函数 @ 0x02106c90
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const unaligned_byte_memset = 0x02106c90 as const;
/**
 * ARM9 函数 @ 0x02106d00
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const unaligned_halfword_memcpy = 0x02106d00 as const;
/**
 * ARM9 函数 @ 0x02106d12
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02106d12 = 0x02106d12 as const;
/**
 * ARM9 函数 @ 0x02106d24
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const unaligned_byte_memcpy = 0x02106d24 as const;
/**
 * ARM9 函数 @ 0x02106e54
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_2106e64 = 0x02106e54 as const;
/**
 * ARM9 函数 @ 0x02106e5c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const thunk_bx_037feb10 = 0x02106e5c as const;
/**
 * ARM9 函数 @ 0x02106e68
 * @category prologue
 * @confidence high
 */
export const sub_02106e68 = 0x02106e68 as const;
/**
 * ARM9 函数 @ 0x02106ef6
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02106ef6 = 0x02106ef6 as const;
/**
 * ARM9 函数 @ 0x02106f88
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04000184 = 0x02106f88 as const;
/**
 * ARM9 函数 @ 0x02107054
 * @category prologue
 * @confidence high
 */
export const sub_02107054 = 0x02107054 as const;
/**
 * ARM9 函数 @ 0x021070c0
 * @category prologue
 * @confidence high
 */
export const sub_021070c0 = 0x021070c0 as const;
/**
 * ARM9 函数 @ 0x0210719c
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_21071b4 = 0x0210719c as const;
/**
 * ARM9 函数 @ 0x021071d8
 * @category prologue
 * @confidence high
 */
export const sub_021071d8 = 0x021071d8 as const;
/**
 * ARM9 函数 @ 0x02107218
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x03808504 = 0x02107218 as const;
/**
 * ARM9 函数 @ 0x021072b8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_byte_setter_21072fc = 0x021072b8 as const;
/**
 * ARM9 函数 @ 0x021072f0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_byte_setter_21072fc_2 = 0x021072f0 as const;
/**
 * ARM9 函数 @ 0x02107348
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_2107350 = 0x02107348 as const;
/**
 * ARM9 函数 @ 0x02107398
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_21073a0 = 0x02107398 as const;
/**
 * ARM9 函数 @ 0x021073a4
 * @category prologue
 * @confidence high
 */
export const sub_021073a4 = 0x021073a4 as const;
/**
 * ARM9 函数 @ 0x021073f8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_byte_bit_0x80_clear = 0x021073f8 as const;
/**
 * ARM9 函数 @ 0x02107410
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_byte_bit_0x80_set = 0x02107410 as const;
/**
 * ARM9 函数 @ 0x02107428
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 6
 */
export const multiply_guard_0x18_formula = 0x02107428 as const;
/**
 * ARM9 函数 @ 0x02107494
 * @category prologue
 * @confidence high
 */
export const sub_02107494 = 0x02107494 as const;
/**
 * ARM9 函数 @ 0x02107588
 * @category prologue
 * @confidence high
 */
export const sub_02107588 = 0x02107588 as const;
/**
 * ARM9 函数 @ 0x0210761c
 * @category prologue
 * @confidence high
 */
export const sub_0210761c = 0x0210761c as const;
/**
 * ARM9 函数 @ 0x021076a0
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x04000400_4000000 = 0x021076a0 as const;
/**
 * ARM9 函数 @ 0x021076cc
 * @category prologue
 * @confidence high
 */
export const sub_021076cc = 0x021076cc as const;
/**
 * ARM9 函数 @ 0x0210777c
 * @category prologue
 * @confidence high
 */
export const sub_0210777c = 0x0210777c as const;
/**
 * ARM9 函数 @ 0x02107834
 * @category prologue
 * @confidence high
 */
export const sub_02107834 = 0x02107834 as const;
/**
 * ARM9 函数 @ 0x02107904
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0380818c = 0x02107904 as const;
/**
 * ARM9 函数 @ 0x0210793e
 * @category prologue
 * @confidence high
 */
export const sub_0210793e = 0x0210793e as const;
/**
 * ARM9 函数 @ 0x02107952
 * @category prologue
 * @confidence high
 */
export const sub_02107952 = 0x02107952 as const;
/**
 * ARM9 函数 @ 0x021079a4
 * @category prologue
 * @confidence high
 */
export const sub_021079a4 = 0x021079a4 as const;
/**
 * ARM9 函数 @ 0x02107a1c
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_2107a24 = 0x02107a1c as const;
/**
 * ARM9 函数 @ 0x02107a28
 * @category prologue
 * @confidence high
 */
export const sub_02107a28 = 0x02107a28 as const;
/**
 * ARM9 函数 @ 0x02107b50
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_2107b58 = 0x02107b50 as const;
/**
 * ARM9 函数 @ 0x02107b5c
 * @category prologue
 * @confidence high
 */
export const sub_02107b5c = 0x02107b5c as const;
/**
 * ARM9 函数 @ 0x02107c1c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_2107c58 = 0x02107c1c as const;
/**
 * ARM9 函数 @ 0x02107c5c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_2bl_0x2105c48_0x2105fc4 = 0x02107c5c as const;
/**
 * ARM9 函数 @ 0x02107cb4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_2bl_0x21052a8_0x21061e4 = 0x02107cb4 as const;
/**
 * ARM9 函数 @ 0x02107cec
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const const_400_wrap_call_0x2104c1c = 0x02107cec as const;
/**
 * ARM9 函数 @ 0x02107cf0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_2bl_0x2104c1c_0x21049dc = 0x02107cf0 as const;
/**
 * ARM9 函数 @ 0x02107d34
 * @category prologue
 * @confidence high
 */
export const sub_02107d34 = 0x02107d34 as const;
/**
 * ARM9 函数 @ 0x02107d84
 * @category prologue
 * @confidence high
 */
export const sub_02107d84 = 0x02107d84 as const;
/**
 * ARM9 函数 @ 0x02107ddc
 * @category prologue
 * @confidence high
 */
export const sub_02107ddc = 0x02107ddc as const;
/**
 * ARM9 函数 @ 0x02107e78
 * @category prologue
 * @confidence high
 */
export const sub_02107e78 = 0x02107e78 as const;
/**
 * ARM9 函数 @ 0x02107ee4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x03807bfc = 0x02107ee4 as const;
/**
 * ARM9 函数 @ 0x02107eee
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02107eee = 0x02107eee as const;
/**
 * ARM9 函数 @ 0x02107f48
 * @category prologue
 * @confidence high
 */
export const sub_02107f48 = 0x02107f48 as const;
/**
 * ARM9 函数 @ 0x02107f94
 * @category prologue
 * @confidence high
 */
export const sub_02107f94 = 0x02107f94 as const;
