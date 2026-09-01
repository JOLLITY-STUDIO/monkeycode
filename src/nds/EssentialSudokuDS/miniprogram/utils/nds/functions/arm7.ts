/**
 * @file arm7.ts — ARM7 subset (667 entries)
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
 * ARM7 函数 @ 0x023802a0
 * @category prologue
 * @confidence high
 */
export const sub_023802a0 = 0x023802a0 as const;
/**
 * ARM7 函数 @ 0x023804ec
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const slot_table_acquire = 0x023804ec as const;
/**
 * ARM7 函数 @ 0x02380530
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_table_indexed_threshold = 0x02380530 as const;
/**
 * ARM7 函数 @ 0x02380574
 * @category prologue
 * @confidence high
 */
export const sub_02380574 = 0x02380574 as const;
/**
 * ARM7 函数 @ 0x023805f4
 * @category prologue
 * @confidence high
 */
export const sub_023805f4 = 0x023805f4 as const;
/**
 * ARM7 函数 @ 0x02380642
 * @category prologue
 * @confidence high
 */
export const sub_02380642 = 0x02380642 as const;
/**
 * ARM7 函数 @ 0x02380fa8
 * @category prologue
 * @confidence high
 */
export const sub_02380fa8 = 0x02380fa8 as const;
/**
 * ARM7 函数 @ 0x023811b4
 * @category prologue
 * @confidence high
 */
export const sub_023811b4 = 0x023811b4 as const;
/**
 * ARM7 函数 @ 0x023811f8
 * @category prologue
 * @confidence high
 */
export const sub_023811f8 = 0x023811f8 as const;
/**
 * ARM7 函数 @ 0x02381358
 * @category prologue
 * @confidence high
 */
export const sub_02381358 = 0x02381358 as const;
/**
 * ARM7 函数 @ 0x023813c0
 * @category prologue
 * @confidence high
 */
export const sub_023813c0 = 0x023813c0 as const;
/**
 * ARM7 函数 @ 0x02381400
 * @category prologue
 * @confidence high
 */
export const sub_02381400 = 0x02381400 as const;
/**
 * ARM7 函数 @ 0x02381454
 * @category prologue
 * @confidence high
 */
export const sub_02381454 = 0x02381454 as const;
/**
 * ARM7 函数 @ 0x02381474
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 10
 */
export const arm7_clamped_lookup_field_8 = 0x02381474 as const;
/**
 * ARM7 函数 @ 0x023814a0
 * @category prologue
 * @confidence high
 */
export const sub_023814a0 = 0x023814a0 as const;
/**
 * ARM7 函数 @ 0x02381560
 * @category prologue
 * @confidence high
 */
export const sub_02381560 = 0x02381560 as const;
/**
 * ARM7 函数 @ 0x0238159c
 * @category prologue
 * @confidence high
 */
export const sub_0238159c = 0x0238159c as const;
/**
 * ARM7 函数 @ 0x0238160c
 * @category prologue
 * @confidence high
 */
export const sub_0238160c = 0x0238160c as const;
/**
 * ARM7 函数 @ 0x023816bc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const range_fields_0x24_set = 0x023816bc as const;
/**
 * ARM7 函数 @ 0x023816d0
 * @category prologue
 * @confidence high
 */
export const sub_023816d0 = 0x023816d0 as const;
/**
 * ARM7 函数 @ 0x023817c4
 * @category prologue
 * @confidence high
 */
export const sub_023817c4 = 0x023817c4 as const;
/**
 * ARM7 函数 @ 0x0238188c
 * @category prologue
 * @confidence high
 */
export const sub_0238188c = 0x0238188c as const;
/**
 * ARM7 函数 @ 0x023818cc
 * @category prologue
 * @confidence high
 */
export const sub_023818cc = 0x023818cc as const;
/**
 * ARM7 函数 @ 0x0238192c
 * @category prologue
 * @confidence high
 */
export const sub_0238192c = 0x0238192c as const;
/**
 * ARM7 函数 @ 0x0238197c
 * @category prologue
 * @confidence high
 */
export const sub_0238197c = 0x0238197c as const;
/**
 * ARM7 函数 @ 0x023819cc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_aligned_block_store = 0x023819cc as const;
/**
 * ARM7 函数 @ 0x02381a08
 * @category prologue
 * @confidence high
 */
export const sub_02381a08 = 0x02381a08 as const;
/**
 * ARM7 函数 @ 0x02381aac
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_switch_2way_02381aac = 0x02381aac as const;
/**
 * ARM7 函数 @ 0x02381af8
 * @category prologue
 * @confidence high
 */
export const sub_02381af8 = 0x02381af8 as const;
/**
 * ARM7 函数 @ 0x02381b58
 * @category prologue
 * @confidence high
 */
export const sub_02381b58 = 0x02381b58 as const;
/**
 * ARM7 函数 @ 0x02381bf4
 * @category prologue
 * @confidence high
 */
export const sub_02381bf4 = 0x02381bf4 as const;
/**
 * ARM7 函数 @ 0x02381c6c
 * @category prologue
 * @confidence high
 */
export const sub_02381c6c = 0x02381c6c as const;
/**
 * ARM7 函数 @ 0x02381d08
 * @category prologue
 * @confidence high
 */
export const sub_02381d08 = 0x02381d08 as const;
/**
 * ARM7 函数 @ 0x02381dd4
 * @category prologue
 * @confidence high
 */
export const sub_02381dd4 = 0x02381dd4 as const;
/**
 * ARM7 函数 @ 0x02381e58
 * @category prologue
 * @confidence high
 */
export const sub_02381e58 = 0x02381e58 as const;
/**
 * ARM7 函数 @ 0x02381eb4
 * @category prologue
 * @confidence high
 */
export const sub_02381eb4 = 0x02381eb4 as const;
/**
 * ARM7 函数 @ 0x02381ed0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const table_0x24_byte_bit1_set = 0x02381ed0 as const;
/**
 * ARM7 函数 @ 0x02381ef0
 * @category prologue
 * @confidence high
 */
export const sub_02381ef0 = 0x02381ef0 as const;
/**
 * ARM7 函数 @ 0x02382044
 * @category prologue
 * @confidence high
 */
export const sub_02382044 = 0x02382044 as const;
/**
 * ARM7 函数 @ 0x02382150
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const arm7_array_8stride_gate_lookup = 0x02382150 as const;
/**
 * ARM7 函数 @ 0x02382190
 * @category prologue
 * @confidence high
 */
export const sub_02382190 = 0x02382190 as const;
/**
 * ARM7 函数 @ 0x023822b8
 * @category prologue
 * @confidence high
 */
export const sub_023822b8 = 0x023822b8 as const;
/**
 * ARM7 函数 @ 0x02382300
 * @category prologue
 * @confidence high
 */
export const sub_02382300 = 0x02382300 as const;
/**
 * ARM7 函数 @ 0x02382484
 * @category prologue
 * @confidence high
 */
export const sub_02382484 = 0x02382484 as const;
/**
 * ARM7 函数 @ 0x02382524
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const arm7_global_halfword_0x260_store = 0x02382524 as const;
/**
 * ARM7 函数 @ 0x02382540
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const arm7_struct_stride36_halfword_0x20_store = 0x02382540 as const;
/**
 * ARM7 函数 @ 0x02382560
 * @category prologue
 * @confidence high
 */
export const sub_02382560 = 0x02382560 as const;
/**
 * ARM7 函数 @ 0x02382590
 * @category prologue
 * @confidence high
 */
export const sub_02382590 = 0x02382590 as const;
/**
 * ARM7 函数 @ 0x023825d0
 * @category prologue
 * @confidence high
 */
export const sub_023825d0 = 0x023825d0 as const;
/**
 * ARM7 函数 @ 0x02382698
 * @category prologue
 * @confidence high
 */
export const sub_02382698 = 0x02382698 as const;
/**
 * ARM7 函数 @ 0x02382720
 * @category prologue
 * @confidence high
 */
export const sub_02382720 = 0x02382720 as const;
/**
 * ARM7 函数 @ 0x0238278c
 * @category prologue
 * @confidence high
 */
export const sub_0238278c = 0x0238278c as const;
/**
 * ARM7 函数 @ 0x02382850
 * @category prologue
 * @confidence high
 */
export const sub_02382850 = 0x02382850 as const;
/**
 * ARM7 函数 @ 0x02382944
 * @category prologue
 * @confidence high
 */
export const sub_02382944 = 0x02382944 as const;
/**
 * ARM7 函数 @ 0x0238298c
 * @category prologue
 * @confidence high
 */
export const sub_0238298c = 0x0238298c as const;
/**
 * ARM7 函数 @ 0x023829e4
 * @category prologue
 * @confidence high
 */
export const sub_023829e4 = 0x023829e4 as const;
/**
 * ARM7 函数 @ 0x02382a2c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const isr_call_target_0x37feaa4 = 0x02382a2c as const;
/**
 * ARM7 函数 @ 0x02382a44
 * @category prologue
 * @confidence high
 */
export const sub_02382a44 = 0x02382a44 as const;
/**
 * ARM7 函数 @ 0x02382a98
 * @category prologue
 * @confidence high
 */
export const sub_02382a98 = 0x02382a98 as const;
/**
 * ARM7 函数 @ 0x02382f5c
 * @category prologue
 * @confidence high
 */
export const sub_02382f5c = 0x02382f5c as const;
/**
 * ARM7 函数 @ 0x02382fa4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const arm7_wram_field_0x3809c54_setter = 0x02382fa4 as const;
/**
 * ARM7 函数 @ 0x02382fb4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x03809c60 = 0x02382fb4 as const;
/**
 * ARM7 函数 @ 0x02383064
 * @category prologue
 * @confidence high
 */
export const sub_02383064 = 0x02383064 as const;
/**
 * ARM7 函数 @ 0x02383100
 * @category prologue
 * @confidence high
 */
export const sub_02383100 = 0x02383100 as const;
/**
 * ARM7 函数 @ 0x02383158
 * @category prologue
 * @confidence high
 */
export const sub_02383158 = 0x02383158 as const;
/**
 * ARM7 函数 @ 0x02383200
 * @category prologue
 * @confidence high
 */
export const sub_02383200 = 0x02383200 as const;
/**
 * ARM7 函数 @ 0x023832c8
 * @category prologue
 * @confidence high
 */
export const sub_023832c8 = 0x023832c8 as const;
/**
 * ARM7 函数 @ 0x02383390
 * @category prologue
 * @confidence high
 */
export const sub_02383390 = 0x02383390 as const;
/**
 * ARM7 函数 @ 0x02383400
 * @category prologue
 * @confidence high
 */
export const sub_02383400 = 0x02383400 as const;
/**
 * ARM7 函数 @ 0x023834ac
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const arm7_state_switch_1_2_3 = 0x023834ac as const;
/**
 * ARM7 函数 @ 0x02383558
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const arm7_wrapper_call_3_calls = 0x02383558 as const;
/**
 * ARM7 函数 @ 0x02383694
 * @category prologue
 * @confidence high
 */
export const sub_02383694 = 0x02383694 as const;
/**
 * ARM7 函数 @ 0x02383724
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 6
 */
export const arm7_state_fixup = 0x02383724 as const;
/**
 * ARM7 函数 @ 0x02383768
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_3way_02383768 = 0x02383768 as const;
/**
 * ARM7 函数 @ 0x023837ec
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 9
 */
export const arm7_global_state_set_a = 0x023837ec as const;
/**
 * ARM7 函数 @ 0x023837fc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const init_seq_2_calls_0x2383694 = 0x023837fc as const;
/**
 * ARM7 函数 @ 0x02383868
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x03809c60 = 0x02383868 as const;
/**
 * ARM7 函数 @ 0x023838f0
 * @category prologue
 * @confidence high
 */
export const sub_023838f0 = 0x023838f0 as const;
/**
 * ARM7 函数 @ 0x023839b8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_0x40001a4_wram_setup_b = 0x023839b8 as const;
/**
 * ARM7 函数 @ 0x02383a20
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x040001a4 = 0x02383a20 as const;
/**
 * ARM7 函数 @ 0x02383ac0
 * @category prologue
 * @confidence high
 */
export const sub_02383ac0 = 0x02383ac0 as const;
/**
 * ARM7 函数 @ 0x02383d88
 * @category prologue
 * @confidence high
 */
export const sub_02383d88 = 0x02383d88 as const;
/**
 * ARM7 函数 @ 0x02383dd0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0380a4c0_a = 0x02383dd0 as const;
/**
 * ARM7 函数 @ 0x02383ed0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_getter_0x04000214 = 0x02383ed0 as const;
/**
 * ARM7 函数 @ 0x02383efc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x027ffc10 = 0x02383efc as const;
/**
 * ARM7 函数 @ 0x02383f64
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x0380a4c8 = 0x02383f64 as const;
/**
 * ARM7 函数 @ 0x02383fe0
 * @category prologue
 * @confidence high
 */
export const sub_02383fe0 = 0x02383fe0 as const;
/**
 * ARM7 函数 @ 0x02384170
 * @category prologue
 * @confidence high
 */
export const sub_02384170 = 0x02384170 as const;
/**
 * ARM7 函数 @ 0x023841dc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_1bl_0x237c8fc = 0x023841dc as const;
/**
 * ARM7 函数 @ 0x02384204
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 15
 */
export const arm7_slot_table_24b_lookup = 0x02384204 as const;
/**
 * ARM7 函数 @ 0x02384208
 * @category prologue
 * @confidence high
 */
export const sub_02384208 = 0x02384208 as const;
/**
 * ARM7 函数 @ 0x023842d8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_state_guard_change_5 = 0x023842d8 as const;
/**
 * ARM7 函数 @ 0x0238431c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 4
 */
export const arm7_global_pair_store = 0x0238431c as const;
/**
 * ARM7 函数 @ 0x02384334
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 4
 */
export const arm7_global_bool_flag_get = 0x02384334 as const;
/**
 * ARM7 函数 @ 0x02384350
 * @category prologue
 * @confidence high
 * @known V0.4 named
 */
export const touch_sample_xy = 0x02384350 as const;
/**
 * ARM7 函数 @ 0x02384490
 * @category prologue
 * @confidence high
 */
export const sub_02384490 = 0x02384490 as const;
/**
 * ARM7 函数 @ 0x023844f4
 * @category prologue
 * @confidence high
 */
export const sub_023844f4 = 0x023844f4 as const;
/**
 * ARM7 函数 @ 0x02384610
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0380a974 = 0x02384610 as const;
/**
 * ARM7 函数 @ 0x02384658
 * @category prologue
 * @confidence high
 */
export const sub_02384658 = 0x02384658 as const;
/**
 * ARM7 函数 @ 0x023846d0
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_3way_023846d0 = 0x023846d0 as const;
/**
 * ARM7 函数 @ 0x02384904
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0380a970_1 = 0x02384904 as const;
/**
 * ARM7 函数 @ 0x0238497e
 * @category prologue
 * @confidence high
 */
export const sub_0238497e = 0x0238497e as const;
/**
 * ARM7 函数 @ 0x023849f8
 * @category prologue
 * @confidence high
 */
export const sub_023849f8 = 0x023849f8 as const;
/**
 * ARM7 函数 @ 0x02384bb8
 * @category prologue
 * @confidence high
 */
export const sub_02384bb8 = 0x02384bb8 as const;
/**
 * ARM7 函数 @ 0x02384cc8
 * @category prologue
 * @confidence high
 */
export const sub_02384cc8 = 0x02384cc8 as const;
/**
 * ARM7 函数 @ 0x02384f18
 * @category prologue
 * @confidence high
 */
export const sub_02384f18 = 0x02384f18 as const;
/**
 * ARM7 函数 @ 0x02385110
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_poll_write_seq = 0x02385110 as const;
/**
 * ARM7 函数 @ 0x0238526c
 * @category prologue
 * @confidence high
 */
export const sub_0238526c = 0x0238526c as const;
/**
 * ARM7 函数 @ 0x023853f4
 * @category prologue
 * @confidence high
 */
export const sub_023853f4 = 0x023853f4 as const;
/**
 * ARM7 函数 @ 0x023855c8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_238562c = 0x023855c8 as const;
/**
 * ARM7 函数 @ 0x02385604
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_238562c_2 = 0x02385604 as const;
/**
 * ARM7 函数 @ 0x02385630
 * @category prologue
 * @confidence high
 */
export const sub_02385630 = 0x02385630 as const;
/**
 * ARM7 函数 @ 0x02385660
 * @category prologue
 * @confidence high
 */
export const sub_02385660 = 0x02385660 as const;
/**
 * ARM7 函数 @ 0x0238568c
 * @category prologue
 * @confidence high
 */
export const sub_0238568c = 0x0238568c as const;
/**
 * ARM7 函数 @ 0x023856b0
 * @category prologue
 * @confidence high
 */
export const sub_023856b0 = 0x023856b0 as const;
/**
 * ARM7 函数 @ 0x02385740
 * @category prologue
 * @confidence high
 */
export const sub_02385740 = 0x02385740 as const;
/**
 * ARM7 函数 @ 0x023857b0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 4
 */
export const arm7_halfword_shift_or_store = 0x023857b0 as const;
/**
 * ARM7 函数 @ 0x023857cc
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_3way_023857cc = 0x023857cc as const;
/**
 * ARM7 函数 @ 0x02385834
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_switch_dispatch_15way = 0x02385834 as const;
/**
 * ARM7 函数 @ 0x02385968
 * @category prologue
 * @confidence high
 */
export const sub_02385968 = 0x02385968 as const;
/**
 * ARM7 函数 @ 0x02385b34
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const wram_entity_slot_getter_a = 0x02385b34 as const;
/**
 * ARM7 函数 @ 0x02385b40
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const wram_entity_slot_getter_b = 0x02385b40 as const;
/**
 * ARM7 函数 @ 0x02385b50
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 7
 */
export const arm7_store_pair_le_0xf = 0x02385b50 as const;
/**
 * ARM7 函数 @ 0x02385b74
 * @category prologue
 * @confidence high
 */
export const sub_02385b74 = 0x02385b74 as const;
/**
 * ARM7 函数 @ 0x02385c9c
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_02385c9c = 0x02385c9c as const;
/**
 * ARM7 函数 @ 0x02385d40
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_bit1_clear_2call = 0x02385d40 as const;
/**
 * ARM7 函数 @ 0x02385d78
 * @category prologue
 * @confidence high
 */
export const sub_02385d78 = 0x02385d78 as const;
/**
 * ARM7 函数 @ 0x02385dcc
 * @category prologue
 * @confidence high
 */
export const sub_02385dcc = 0x02385dcc as const;
/**
 * ARM7 函数 @ 0x02385f70
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_3way_02385f70 = 0x02385f70 as const;
/**
 * ARM7 函数 @ 0x023861cc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const period_complement_0x10000 = 0x023861cc as const;
/**
 * ARM7 函数 @ 0x02386270
 * @category prologue
 * @confidence high
 */
export const sub_02386270 = 0x02386270 as const;
/**
 * ARM7 函数 @ 0x02386544
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0380b9fc_1 = 0x02386544 as const;
/**
 * ARM7 函数 @ 0x02386584
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_poll_write_seq_0xe4 = 0x02386584 as const;
/**
 * ARM7 函数 @ 0x0238664c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_poll_write_seq_0xec = 0x0238664c as const;
/**
 * ARM7 函数 @ 0x02386898
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0380fffc = 0x02386898 as const;
/**
 * ARM7 函数 @ 0x023868e4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0380fffc_2 = 0x023868e4 as const;
/**
 * ARM7 函数 @ 0x02386950
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const bits_to_table_25_store = 0x02386950 as const;
/**
 * ARM7 函数 @ 0x02386978
 * @category prologue
 * @confidence high
 */
export const sub_02386978 = 0x02386978 as const;
/**
 * ARM7 函数 @ 0x023869c0
 * @category prologue
 * @confidence high
 */
export const sub_023869c0 = 0x023869c0 as const;
/**
 * ARM7 函数 @ 0x023869e8
 * @category prologue
 * @confidence high
 */
export const sub_023869e8 = 0x023869e8 as const;
/**
 * ARM7 函数 @ 0x02386a58
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04000204 = 0x02386a58 as const;
/**
 * ARM7 函数 @ 0x02386a8c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04000204_2 = 0x02386a8c as const;
/**
 * ARM7 函数 @ 0x02386ad4
 * @category prologue
 * @confidence high
 */
export const sub_02386ad4 = 0x02386ad4 as const;
/**
 * ARM7 函数 @ 0x02386be0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x027ffc30 = 0x02386be0 as const;
/**
 * ARM7 函数 @ 0x02386c38
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_2386c80 = 0x02386c38 as const;
/**
 * ARM7 函数 @ 0x02386c78
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_2386c80_2 = 0x02386c78 as const;
/**
 * ARM7 函数 @ 0x02386c84
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_4bl_0x2386e88_0x237eb54_0x2385d40_0x237e2d4 = 0x02386c84 as const;
/**
 * ARM7 函数 @ 0x02386cac
 * @category prologue
 * @confidence high
 */
export const sub_02386cac = 0x02386cac as const;
/**
 * ARM7 函数 @ 0x02386dc0
 * @category prologue
 * @confidence high
 */
export const sub_02386dc0 = 0x02386dc0 as const;
/**
 * ARM7 函数 @ 0x02386e6c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 4
 */
export const arm7_wram_halfword_setter = 0x02386e6c as const;
/**
 * ARM7 函数 @ 0x02386e88
 * @category prologue
 * @confidence high
 */
export const sub_02386e88 = 0x02386e88 as const;
/**
 * ARM7 函数 @ 0x0238710c
 * @category prologue
 * @confidence high
 */
export const sub_0238710c = 0x0238710c as const;
/**
 * ARM7 函数 @ 0x02387290
 * @category prologue
 * @confidence high
 */
export const sub_02387290 = 0x02387290 as const;
/**
 * ARM7 函数 @ 0x0238729c
 * @category prologue
 * @confidence high
 */
export const sub_0238729c = 0x0238729c as const;
/**
 * ARM7 函数 @ 0x023872d8
 * @category prologue
 * @confidence high
 */
export const sub_023872d8 = 0x023872d8 as const;
/**
 * ARM7 函数 @ 0x023872e8
 * @category prologue
 * @confidence high
 */
export const sub_023872e8 = 0x023872e8 as const;
/**
 * ARM7 函数 @ 0x02387498
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const arm7_signed_divmod_abs = 0x02387498 as const;
/**
 * ARM7 函数 @ 0x023876a4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_udiv_normalize_loop = 0x023876a4 as const;
/**
 * ARM7 函数 @ 0x023876ac
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const shift_normalize_left_binsearch_2 = 0x023876ac as const;
/**
 * ARM7 函数 @ 0x02387c64
 * @category prologue
 * @confidence high
 */
export const sub_02387c64 = 0x02387c64 as const;
/**
 * ARM7 函数 @ 0x02387d90
 * @category prologue
 * @confidence high
 */
export const sub_02387d90 = 0x02387d90 as const;
/**
 * ARM7 函数 @ 0x02387dec
 * @category prologue
 * @confidence high
 */
export const sub_02387dec = 0x02387dec as const;
/**
 * ARM7 函数 @ 0x02387fe4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const reg_field_0x32_update_2 = 0x02387fe4 as const;
/**
 * ARM7 函数 @ 0x02388014
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x027f92a4_100 = 0x02388014 as const;
/**
 * ARM7 函数 @ 0x02388044
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const reg_field_0x36_update_2 = 0x02388044 as const;
/**
 * ARM7 函数 @ 0x02388094
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const reg_field_0x30_update_4 = 0x02388094 as const;
/**
 * ARM7 函数 @ 0x023880e4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 4
 */
export const arm7_halfword_block_clear_8 = 0x023880e4 as const;
/**
 * ARM7 函数 @ 0x02388118
 * @category prologue
 * @confidence high
 */
export const sub_02388118 = 0x02388118 as const;
/**
 * ARM7 函数 @ 0x02388188
 * @category prologue
 * @confidence high
 */
export const sub_02388188 = 0x02388188 as const;
/**
 * ARM7 函数 @ 0x023881bc
 * @category prologue
 * @confidence high
 */
export const sub_023881bc = 0x023881bc as const;
/**
 * ARM7 函数 @ 0x0238821c
 * @category prologue
 * @confidence high
 */
export const sub_0238821c = 0x0238821c as const;
/**
 * ARM7 函数 @ 0x0238827c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_range_map_4buckets = 0x0238827c as const;
/**
 * ARM7 函数 @ 0x023882a4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const byte_avg_32_tail_call = 0x023882a4 as const;
/**
 * ARM7 函数 @ 0x023882e0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x027f82a4_1000 = 0x023882e0 as const;
/**
 * ARM7 函数 @ 0x02388318
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const ring_buf_write_crc16 = 0x02388318 as const;
/**
 * ARM7 函数 @ 0x0238835c
 * @category prologue
 * @confidence high
 */
export const sub_0238835c = 0x0238835c as const;
/**
 * ARM7 函数 @ 0x023884a8
 * @category prologue
 * @confidence high
 */
export const sub_023884a8 = 0x023884a8 as const;
/**
 * ARM7 函数 @ 0x02388548
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_1bl_0x33a6758 = 0x02388548 as const;
/**
 * ARM7 函数 @ 0x02388558
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x027f92a4_e0 = 0x02388558 as const;
/**
 * ARM7 函数 @ 0x023885d4
 * @category prologue
 * @confidence high
 */
export const sub_023885d4 = 0x023885d4 as const;
/**
 * ARM7 函数 @ 0x0238863c
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 26
 */
export const key_sample = 0x0238863c as const;
/**
 * ARM7 函数 @ 0x023886bc
 * @category prologue
 * @confidence high
 */
export const sub_023886bc = 0x023886bc as const;
/**
 * ARM7 函数 @ 0x02388888
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_2bl_0x33a5c18_0x33a5c18 = 0x02388888 as const;
/**
 * ARM7 函数 @ 0x023888b4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_2bl_0x33affc4_0x33b0020 = 0x023888b4 as const;
/**
 * ARM7 函数 @ 0x023888e8
 * @category prologue
 * @confidence high
 */
export const sub_023888e8 = 0x023888e8 as const;
/**
 * ARM7 函数 @ 0x02388b9c
 * @category prologue
 * @confidence high
 */
export const sub_02388b9c = 0x02388b9c as const;
/**
 * ARM7 函数 @ 0x02388d24
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_2bl_0x33affc4_0x33b0020_2 = 0x02388d24 as const;
/**
 * ARM7 函数 @ 0x02388d58
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_2bl_0x33affc4_0x33b0020_3 = 0x02388d58 as const;
/**
 * ARM7 函数 @ 0x02388d8c
 * @category prologue
 * @confidence high
 */
export const sub_02388d8c = 0x02388d8c as const;
/**
 * ARM7 函数 @ 0x02388ec4
 * @category prologue
 * @confidence high
 */
export const sub_02388ec4 = 0x02388ec4 as const;
/**
 * ARM7 函数 @ 0x02388fbc
 * @category prologue
 * @confidence high
 */
export const sub_02388fbc = 0x02388fbc as const;
/**
 * ARM7 函数 @ 0x02389058
 * @category prologue
 * @confidence high
 */
export const sub_02389058 = 0x02389058 as const;
/**
 * ARM7 函数 @ 0x023892c8
 * @category prologue
 * @confidence high
 */
export const sub_023892c8 = 0x023892c8 as const;
/**
 * ARM7 函数 @ 0x02389368
 * @category prologue
 * @confidence high
 */
export const sub_02389368 = 0x02389368 as const;
/**
 * ARM7 函数 @ 0x023896ac
 * @category prologue
 * @confidence high
 */
export const sub_023896ac = 0x023896ac as const;
/**
 * ARM7 函数 @ 0x0238972c
 * @category prologue
 * @confidence high
 */
export const sub_0238972c = 0x0238972c as const;
/**
 * ARM7 函数 @ 0x023897c8
 * @category prologue
 * @confidence high
 */
export const sub_023897c8 = 0x023897c8 as const;
/**
 * ARM7 函数 @ 0x02389848
 * @category prologue
 * @confidence high
 */
export const sub_02389848 = 0x02389848 as const;
/**
 * ARM7 函数 @ 0x02389bb0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x027f92a4 = 0x02389bb0 as const;
/**
 * ARM7 函数 @ 0x02389bfc
 * @category prologue
 * @confidence high
 */
export const sub_02389bfc = 0x02389bfc as const;
/**
 * ARM7 函数 @ 0x02389d60
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x027f92a4_2 = 0x02389d60 as const;
/**
 * ARM7 函数 @ 0x02389dac
 * @category near
 * @confidence high
 * @callers 1
 */
export const sub_02389dac = 0x02389dac as const;
/**
 * ARM7 函数 @ 0x02389db0
 * @category prologue
 * @confidence high
 */
export const sub_02389db0 = 0x02389db0 as const;
/**
 * ARM7 函数 @ 0x02389df0
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_02389df0 = 0x02389df0 as const;
/**
 * ARM7 函数 @ 0x02389f3c
 * @category prologue
 * @confidence high
 */
export const sub_02389f3c = 0x02389f3c as const;
/**
 * ARM7 函数 @ 0x02389fdc
 * @category prologue
 * @confidence high
 */
export const sub_02389fdc = 0x02389fdc as const;
/**
 * ARM7 函数 @ 0x0238a088
 * @category prologue
 * @confidence high
 */
export const sub_0238a088 = 0x0238a088 as const;
/**
 * ARM7 函数 @ 0x0238a0d8
 * @category prologue
 * @confidence high
 */
export const sub_0238a0d8 = 0x0238a0d8 as const;
/**
 * ARM7 函数 @ 0x0238a14c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const arm7_call_indirect_027e20a4 = 0x0238a14c as const;
/**
 * ARM7 函数 @ 0x0238a160
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const isr_call_target_0x306 = 0x0238a160 as const;
/**
 * ARM7 函数 @ 0x0238a178
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const isr_call_target_0x305 = 0x0238a178 as const;
/**
 * ARM7 函数 @ 0x0238a190
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const arm7_audio_mixer_call_a = 0x0238a190 as const;
/**
 * ARM7 函数 @ 0x0238a1a8
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_238a1b8 = 0x0238a1a8 as const;
/**
 * ARM7 函数 @ 0x0238a1bc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const isr_call_target_0x302 = 0x0238a1bc as const;
/**
 * ARM7 函数 @ 0x0238a1d4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 7
 */
export const isr_call_target_0x301 = 0x0238a1d4 as const;
/**
 * ARM7 函数 @ 0x0238a1ec
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const arm7_audio_mixer_call_b = 0x0238a1ec as const;
/**
 * ARM7 函数 @ 0x0238a204
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_238a214 = 0x0238a204 as const;
/**
 * ARM7 函数 @ 0x0238a218
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const isr_call_target_0x281 = 0x0238a218 as const;
/**
 * ARM7 函数 @ 0x0238a230
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const arm7_audio_mixer_call_c = 0x0238a230 as const;
/**
 * ARM7 函数 @ 0x0238a248
 * @category prologue
 * @confidence high
 */
export const sub_0238a248 = 0x0238a248 as const;
/**
 * ARM7 函数 @ 0x0238a2d8
 * @category prologue
 * @confidence high
 */
export const sub_0238a2d8 = 0x0238a2d8 as const;
/**
 * ARM7 函数 @ 0x0238a338
 * @category prologue
 * @confidence high
 */
export const sub_0238a338 = 0x0238a338 as const;
/**
 * ARM7 函数 @ 0x0238a398
 * @category prologue
 * @confidence high
 */
export const sub_0238a398 = 0x0238a398 as const;
/**
 * ARM7 函数 @ 0x0238a3f8
 * @category prologue
 * @confidence high
 */
export const sub_0238a3f8 = 0x0238a3f8 as const;
/**
 * ARM7 函数 @ 0x0238a458
 * @category prologue
 * @confidence high
 */
export const sub_0238a458 = 0x0238a458 as const;
/**
 * ARM7 函数 @ 0x0238a4c4
 * @category prologue
 * @confidence high
 */
export const sub_0238a4c4 = 0x0238a4c4 as const;
/**
 * ARM7 函数 @ 0x0238a524
 * @category prologue
 * @confidence high
 */
export const sub_0238a524 = 0x0238a524 as const;
/**
 * ARM7 函数 @ 0x0238a5a4
 * @category prologue
 * @confidence high
 */
export const sub_0238a5a4 = 0x0238a5a4 as const;
/**
 * ARM7 函数 @ 0x0238a604
 * @category prologue
 * @confidence high
 */
export const sub_0238a604 = 0x0238a604 as const;
/**
 * ARM7 函数 @ 0x0238a664
 * @category prologue
 * @confidence high
 */
export const sub_0238a664 = 0x0238a664 as const;
/**
 * ARM7 函数 @ 0x0238a6c0
 * @category prologue
 * @confidence high
 */
export const sub_0238a6c0 = 0x0238a6c0 as const;
/**
 * ARM7 函数 @ 0x0238a71c
 * @category prologue
 * @confidence high
 */
export const sub_0238a71c = 0x0238a71c as const;
/**
 * ARM7 函数 @ 0x0238a7b8
 * @category prologue
 * @confidence high
 */
export const sub_0238a7b8 = 0x0238a7b8 as const;
/**
 * ARM7 函数 @ 0x0238a824
 * @category prologue
 * @confidence high
 */
export const sub_0238a824 = 0x0238a824 as const;
/**
 * ARM7 函数 @ 0x0238a8dc
 * @category prologue
 * @confidence high
 */
export const sub_0238a8dc = 0x0238a8dc as const;
/**
 * ARM7 函数 @ 0x0238a968
 * @category prologue
 * @confidence high
 */
export const sub_0238a968 = 0x0238a968 as const;
/**
 * ARM7 函数 @ 0x0238aa0a
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_0238aa0a = 0x0238aa0a as const;
/**
 * ARM7 函数 @ 0x0238aa3c
 * @category prologue
 * @confidence high
 */
export const sub_0238aa3c = 0x0238aa3c as const;
/**
 * ARM7 函数 @ 0x0238aabc
 * @category prologue
 * @confidence high
 */
export const sub_0238aabc = 0x0238aabc as const;
/**
 * ARM7 函数 @ 0x0238ab40
 * @category prologue
 * @confidence high
 */
export const sub_0238ab40 = 0x0238ab40 as const;
/**
 * ARM7 函数 @ 0x0238abc4
 * @category prologue
 * @confidence high
 */
export const sub_0238abc4 = 0x0238abc4 as const;
/**
 * ARM7 函数 @ 0x0238ac48
 * @category prologue
 * @confidence high
 */
export const sub_0238ac48 = 0x0238ac48 as const;
/**
 * ARM7 函数 @ 0x0238ad04
 * @category prologue
 * @confidence high
 */
export const sub_0238ad04 = 0x0238ad04 as const;
/**
 * ARM7 函数 @ 0x0238ad68
 * @category prologue
 * @confidence high
 */
export const sub_0238ad68 = 0x0238ad68 as const;
/**
 * ARM7 函数 @ 0x0238adc0
 * @category prologue
 * @confidence high
 */
export const sub_0238adc0 = 0x0238adc0 as const;
/**
 * ARM7 函数 @ 0x0238ae70
 * @category prologue
 * @confidence high
 */
export const sub_0238ae70 = 0x0238ae70 as const;
/**
 * ARM7 函数 @ 0x0238aea8
 * @category prologue
 * @confidence high
 */
export const sub_0238aea8 = 0x0238aea8 as const;
/**
 * ARM7 函数 @ 0x0238b29c
 * @category prologue
 * @confidence high
 */
export const sub_0238b29c = 0x0238b29c as const;
/**
 * ARM7 函数 @ 0x0238b2d8
 * @category prologue
 * @confidence high
 */
export const sub_0238b2d8 = 0x0238b2d8 as const;
/**
 * ARM7 函数 @ 0x0238b370
 * @category prologue
 * @confidence high
 */
export const sub_0238b370 = 0x0238b370 as const;
/**
 * ARM7 函数 @ 0x0238b3ac
 * @category prologue
 * @confidence high
 */
export const sub_0238b3ac = 0x0238b3ac as const;
/**
 * ARM7 函数 @ 0x0238b454
 * @category prologue
 * @confidence high
 */
export const sub_0238b454 = 0x0238b454 as const;
/**
 * ARM7 函数 @ 0x0238b498
 * @category prologue
 * @confidence high
 */
export const sub_0238b498 = 0x0238b498 as const;
/**
 * ARM7 函数 @ 0x0238b71c
 * @category prologue
 * @confidence high
 */
export const sub_0238b71c = 0x0238b71c as const;
/**
 * ARM7 函数 @ 0x0238b758
 * @category prologue
 * @confidence high
 */
export const sub_0238b758 = 0x0238b758 as const;
/**
 * ARM7 函数 @ 0x0238b90c
 * @category prologue
 * @confidence high
 */
export const sub_0238b90c = 0x0238b90c as const;
/**
 * ARM7 函数 @ 0x0238b958
 * @category prologue
 * @confidence high
 */
export const sub_0238b958 = 0x0238b958 as const;
/**
 * ARM7 函数 @ 0x0238b97c
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_0238b97c = 0x0238b97c as const;
/**
 * ARM7 函数 @ 0x0238b9c8
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_0238b9c8 = 0x0238b9c8 as const;
/**
 * ARM7 函数 @ 0x0238bf00
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_3way_0238bf00 = 0x0238bf00 as const;
/**
 * ARM7 函数 @ 0x0238c29c
 * @category prologue
 * @confidence high
 */
export const sub_0238c29c = 0x0238c29c as const;
/**
 * ARM7 函数 @ 0x0238c2d8
 * @category prologue
 * @confidence high
 */
export const sub_0238c2d8 = 0x0238c2d8 as const;
/**
 * ARM7 函数 @ 0x0238c3ac
 * @category prologue
 * @confidence high
 */
export const sub_0238c3ac = 0x0238c3ac as const;
/**
 * ARM7 函数 @ 0x0238c3e8
 * @category prologue
 * @confidence high
 */
export const sub_0238c3e8 = 0x0238c3e8 as const;
/**
 * ARM7 函数 @ 0x0238c9e8
 * @category prologue
 * @confidence high
 */
export const sub_0238c9e8 = 0x0238c9e8 as const;
/**
 * ARM7 函数 @ 0x0238ca34
 * @category prologue
 * @confidence high
 */
export const sub_0238ca34 = 0x0238ca34 as const;
/**
 * ARM7 函数 @ 0x0238ca80
 * @category prologue
 * @confidence high
 */
export const sub_0238ca80 = 0x0238ca80 as const;
/**
 * ARM7 函数 @ 0x0238cb4c
 * @category prologue
 * @confidence high
 */
export const sub_0238cb4c = 0x0238cb4c as const;
/**
 * ARM7 函数 @ 0x0238d130
 * @category prologue
 * @confidence high
 */
export const sub_0238d130 = 0x0238d130 as const;
/**
 * ARM7 函数 @ 0x0238d188
 * @category prologue
 * @confidence high
 */
export const sub_0238d188 = 0x0238d188 as const;
/**
 * ARM7 函数 @ 0x0238d44c
 * @category prologue
 * @confidence high
 */
export const sub_0238d44c = 0x0238d44c as const;
/**
 * ARM7 函数 @ 0x0238d594
 * @category prologue
 * @confidence high
 */
export const sub_0238d594 = 0x0238d594 as const;
/**
 * ARM7 函数 @ 0x0238d5d0
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_0238d5d0 = 0x0238d5d0 as const;
/**
 * ARM7 函数 @ 0x0238d6f0
 * @category prologue
 * @confidence high
 */
export const sub_0238d6f0 = 0x0238d6f0 as const;
/**
 * ARM7 函数 @ 0x0238d77c
 * @category prologue
 * @confidence high
 */
export const sub_0238d77c = 0x0238d77c as const;
/**
 * ARM7 函数 @ 0x0238d874
 * @category prologue
 * @confidence high
 */
export const sub_0238d874 = 0x0238d874 as const;
/**
 * ARM7 函数 @ 0x0238d8b0
 * @category prologue
 * @confidence high
 */
export const sub_0238d8b0 = 0x0238d8b0 as const;
/**
 * ARM7 函数 @ 0x0238d950
 * @category prologue
 * @confidence high
 */
export const sub_0238d950 = 0x0238d950 as const;
/**
 * ARM7 函数 @ 0x0238d98c
 * @category prologue
 * @confidence high
 */
export const sub_0238d98c = 0x0238d98c as const;
/**
 * ARM7 函数 @ 0x0238dae4
 * @category prologue
 * @confidence high
 */
export const sub_0238dae4 = 0x0238dae4 as const;
/**
 * ARM7 函数 @ 0x0238dbd8
 * @category prologue
 * @confidence high
 */
export const sub_0238dbd8 = 0x0238dbd8 as const;
/**
 * ARM7 函数 @ 0x0238dccc
 * @category prologue
 * @confidence high
 */
export const sub_0238dccc = 0x0238dccc as const;
/**
 * ARM7 函数 @ 0x0238dd08
 * @category prologue
 * @confidence high
 */
export const sub_0238dd08 = 0x0238dd08 as const;
/**
 * ARM7 函数 @ 0x0238de28
 * @category prologue
 * @confidence high
 */
export const sub_0238de28 = 0x0238de28 as const;
/**
 * ARM7 函数 @ 0x0238de64
 * @category prologue
 * @confidence high
 */
export const sub_0238de64 = 0x0238de64 as const;
/**
 * ARM7 函数 @ 0x0238e018
 * @category prologue
 * @confidence high
 */
export const sub_0238e018 = 0x0238e018 as const;
/**
 * ARM7 函数 @ 0x0238e0a4
 * @category prologue
 * @confidence high
 */
export const sub_0238e0a4 = 0x0238e0a4 as const;
/**
 * ARM7 函数 @ 0x0238e0e0
 * @category prologue
 * @confidence high
 */
export const sub_0238e0e0 = 0x0238e0e0 as const;
/**
 * ARM7 函数 @ 0x0238e14c
 * @category prologue
 * @confidence high
 */
export const sub_0238e14c = 0x0238e14c as const;
/**
 * ARM7 函数 @ 0x0238e248
 * @category prologue
 * @confidence high
 */
export const sub_0238e248 = 0x0238e248 as const;
/**
 * ARM7 函数 @ 0x0238e2b4
 * @category prologue
 * @confidence high
 */
export const sub_0238e2b4 = 0x0238e2b4 as const;
/**
 * ARM7 函数 @ 0x0238e3bc
 * @category prologue
 * @confidence high
 */
export const sub_0238e3bc = 0x0238e3bc as const;
/**
 * ARM7 函数 @ 0x0238e3fc
 * @category prologue
 * @confidence high
 */
export const sub_0238e3fc = 0x0238e3fc as const;
/**
 * ARM7 函数 @ 0x0238e47c
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x027f92a4_7f = 0x0238e47c as const;
/**
 * ARM7 函数 @ 0x0238e510
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x027f92a4_d0 = 0x0238e510 as const;
/**
 * ARM7 函数 @ 0x0238e610
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04000006 = 0x0238e610 as const;
/**
 * ARM7 函数 @ 0x0238e668
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 8
 */
export const arm7_wrapper_call = 0x0238e668 as const;
/**
 * ARM7 函数 @ 0x0238e6a0
 * @category prologue
 * @confidence high
 */
export const sub_0238e6a0 = 0x0238e6a0 as const;
/**
 * ARM7 函数 @ 0x0238e730
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const isr3_timer_dispatch_a = 0x0238e730 as const;
/**
 * ARM7 函数 @ 0x0238e744
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const isr3_timer_dispatch_b = 0x0238e744 as const;
/**
 * ARM7 函数 @ 0x0238e800
 * @category prologue
 * @confidence high
 */
export const sub_0238e800 = 0x0238e800 as const;
/**
 * ARM7 函数 @ 0x0238e99c
 * @category prologue
 * @confidence high
 */
export const sub_0238e99c = 0x0238e99c as const;
/**
 * ARM7 函数 @ 0x0238ea50
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const audio_ctx_field_0x3e_check = 0x0238ea50 as const;
/**
 * ARM7 函数 @ 0x0238ea54
 * @category prologue
 * @confidence high
 */
export const sub_0238ea54 = 0x0238ea54 as const;
/**
 * ARM7 函数 @ 0x0238ecec
 * @category prologue
 * @confidence high
 */
export const sub_0238ecec = 0x0238ecec as const;
/**
 * ARM7 函数 @ 0x0238eefc
 * @category prologue
 * @confidence high
 */
export const sub_0238eefc = 0x0238eefc as const;
/**
 * ARM7 函数 @ 0x0238f240
 * @category prologue
 * @confidence high
 */
export const sub_0238f240 = 0x0238f240 as const;
/**
 * ARM7 函数 @ 0x0238f39c
 * @category prologue
 * @confidence high
 */
export const sub_0238f39c = 0x0238f39c as const;
/**
 * ARM7 函数 @ 0x0238f3d2
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_0238f3d2 = 0x0238f3d2 as const;
/**
 * ARM7 函数 @ 0x0238f8d8
 * @category prologue
 * @confidence high
 */
export const sub_0238f8d8 = 0x0238f8d8 as const;
/**
 * ARM7 函数 @ 0x0238f9dc
 * @category prologue
 * @confidence high
 */
export const sub_0238f9dc = 0x0238f9dc as const;
/**
 * ARM7 函数 @ 0x0238fbdc
 * @category prologue
 * @confidence high
 */
export const sub_0238fbdc = 0x0238fbdc as const;
/**
 * ARM7 函数 @ 0x0238fcac
 * @category prologue
 * @confidence high
 */
export const sub_0238fcac = 0x0238fcac as const;
/**
 * ARM7 函数 @ 0x0238fd6c
 * @category prologue
 * @confidence high
 */
export const sub_0238fd6c = 0x0238fd6c as const;
/**
 * ARM7 函数 @ 0x0238fe00
 * @category prologue
 * @confidence high
 */
export const sub_0238fe00 = 0x0238fe00 as const;
/**
 * ARM7 函数 @ 0x0238feb0
 * @category prologue
 * @confidence high
 */
export const sub_0238feb0 = 0x0238feb0 as const;
/**
 * ARM7 函数 @ 0x0238fff8
 * @category prologue
 * @confidence high
 */
export const sub_0238fff8 = 0x0238fff8 as const;
/**
 * ARM7 函数 @ 0x02390058
 * @category prologue
 * @confidence high
 */
export const sub_02390058 = 0x02390058 as const;
/**
 * ARM7 函数 @ 0x023900c0
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04808124 = 0x023900c0 as const;
/**
 * ARM7 函数 @ 0x023900f8
 * @category prologue
 * @confidence high
 */
export const sub_023900f8 = 0x023900f8 as const;
/**
 * ARM7 函数 @ 0x023902e8
 * @category prologue
 * @confidence high
 */
export const sub_023902e8 = 0x023902e8 as const;
/**
 * ARM7 函数 @ 0x02390390
 * @category prologue
 * @confidence high
 */
export const sub_02390390 = 0x02390390 as const;
/**
 * ARM7 函数 @ 0x02390440
 * @category prologue
 * @confidence high
 */
export const sub_02390440 = 0x02390440 as const;
/**
 * ARM7 函数 @ 0x0239074c
 * @category prologue
 * @confidence high
 */
export const sub_0239074c = 0x0239074c as const;
/**
 * ARM7 函数 @ 0x023907a8
 * @category prologue
 * @confidence high
 */
export const sub_023907a8 = 0x023907a8 as const;
/**
 * ARM7 函数 @ 0x02390858
 * @category prologue
 * @confidence high
 */
export const sub_02390858 = 0x02390858 as const;
/**
 * ARM7 函数 @ 0x02390a34
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_ptr_field_0x18_get = 0x02390a34 as const;
/**
 * ARM7 函数 @ 0x02390a48
 * @category prologue
 * @confidence high
 */
export const sub_02390a48 = 0x02390a48 as const;
/**
 * ARM7 函数 @ 0x02390c24
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x0380fff4_300 = 0x02390c24 as const;
/**
 * ARM7 函数 @ 0x02390c78
 * @category prologue
 * @confidence high
 */
export const sub_02390c78 = 0x02390c78 as const;
/**
 * ARM7 函数 @ 0x02390d04
 * @category prologue
 * @confidence high
 */
export const sub_02390d04 = 0x02390d04 as const;
/**
 * ARM7 函数 @ 0x02390d58
 * @category prologue
 * @confidence high
 */
export const sub_02390d58 = 0x02390d58 as const;
/**
 * ARM7 函数 @ 0x02390db4
 * @category prologue
 * @confidence high
 */
export const sub_02390db4 = 0x02390db4 as const;
/**
 * ARM7 函数 @ 0x02390e98
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 11
 */
export const arm7_struct_init_3field = 0x02390e98 as const;
/**
 * ARM7 函数 @ 0x02390eb4
 * @category prologue
 * @confidence high
 */
export const sub_02390eb4 = 0x02390eb4 as const;
/**
 * ARM7 函数 @ 0x02390fac
 * @category prologue
 * @confidence high
 */
export const sub_02390fac = 0x02390fac as const;
/**
 * ARM7 函数 @ 0x02391034
 * @category prologue
 * @confidence high
 */
export const sub_02391034 = 0x02391034 as const;
/**
 * ARM7 函数 @ 0x02391078
 * @category prologue
 * @confidence high
 */
export const sub_02391078 = 0x02391078 as const;
/**
 * ARM7 函数 @ 0x02391180
 * @category prologue
 * @confidence high
 */
export const sub_02391180 = 0x02391180 as const;
/**
 * ARM7 函数 @ 0x023911cc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_halfword_scan_until_0_9 = 0x023911cc as const;
/**
 * ARM7 函数 @ 0x02391210
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 6
 */
export const arm7_header_magic_check = 0x02391210 as const;
/**
 * ARM7 函数 @ 0x023912a4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const nibble_mix_table_xor = 0x023912a4 as const;
/**
 * ARM7 函数 @ 0x0239131c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_accumulate_mla_halfword = 0x0239131c as const;
/**
 * ARM7 函数 @ 0x0239134c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_halfword_0x5f4_store = 0x0239134c as const;
/**
 * ARM7 函数 @ 0x02391364
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0380fff4_5 = 0x02391364 as const;
/**
 * ARM7 函数 @ 0x02391398
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 77
 */
export const ipc_fifo_peek_byte = 0x02391398 as const;
/**
 * ARM7 函数 @ 0x023913b8
 * @category near
 * @confidence high
 * @known V0.4 named
 * @callers 92
 */
export const ipc_fifo_recv_handler = 0x023913b8 as const;
/**
 * ARM7 函数 @ 0x023913e4
 * @category prologue
 * @confidence high
 */
export const sub_023913e4 = 0x023913e4 as const;
/**
 * ARM7 函数 @ 0x02391420
 * @category prologue
 * @confidence high
 */
export const sub_02391420 = 0x02391420 as const;
/**
 * ARM7 函数 @ 0x0239145c
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 9
 */
export const arm7_indirect_dispatch = 0x0239145c as const;
/**
 * ARM7 函数 @ 0x02391470
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 4
 */
export const arm7_arg_swap_thunk_to_037fe64c = 0x02391470 as const;
/**
 * ARM7 函数 @ 0x0239148c
 * @category prologue
 * @confidence high
 */
export const sub_0239148c = 0x0239148c as const;
/**
 * ARM7 函数 @ 0x02391510
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 8
 */
export const isr2_vblank_dispatch_a = 0x02391510 as const;
/**
 * ARM7 函数 @ 0x02391534
 * @category prologue
 * @confidence high
 */
export const sub_02391534 = 0x02391534 as const;
/**
 * ARM7 函数 @ 0x023915c4
 * @category prologue
 * @confidence high
 */
export const sub_023915c4 = 0x023915c4 as const;
/**
 * ARM7 函数 @ 0x0239163c
 * @category prologue
 * @confidence high
 */
export const sub_0239163c = 0x0239163c as const;
/**
 * ARM7 函数 @ 0x023916bc
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 1
 */
export const isr2_vblank_dispatch_b = 0x023916bc as const;
/**
 * ARM7 函数 @ 0x023916e0
 * @category prologue
 * @confidence high
 */
export const sub_023916e0 = 0x023916e0 as const;
/**
 * ARM7 函数 @ 0x02391770
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 3
 */
export const isr_call_target_0x37b7b0 = 0x02391770 as const;
/**
 * ARM7 函数 @ 0x02391784
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_indirect_x1000_to_027e978c = 0x02391784 as const;
/**
 * ARM7 函数 @ 0x023917a8
 * @category prologue
 * @confidence high
 */
export const sub_023917a8 = 0x023917a8 as const;
/**
 * ARM7 函数 @ 0x02391804
 * @category prologue
 * @confidence high
 */
export const sub_02391804 = 0x02391804 as const;
/**
 * ARM7 函数 @ 0x02391994
 * @category prologue
 * @confidence high
 */
export const sub_02391994 = 0x02391994 as const;
/**
 * ARM7 函数 @ 0x02391a04
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_table_25_halfword_setup = 0x02391a04 as const;
/**
 * ARM7 函数 @ 0x02391a3c
 * @category prologue
 * @confidence high
 */
export const sub_02391a3c = 0x02391a3c as const;
/**
 * ARM7 函数 @ 0x02391ab0
 * @category prologue
 * @confidence high
 */
export const sub_02391ab0 = 0x02391ab0 as const;
/**
 * ARM7 函数 @ 0x02391b20
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 7
 */
export const isr_call_target_0x378c0 = 0x02391b20 as const;
/**
 * ARM7 函数 @ 0x02391b48
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 22
 */
export const arm7_ipc_fifo_send_low = 0x02391b48 as const;
/**
 * ARM7 函数 @ 0x02391b88
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 17
 */
export const arm7_ipc_fifo_send_high = 0x02391b88 as const;
/**
 * ARM7 函数 @ 0x02391bbc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const arm7_state_switch_0_1_cond = 0x02391bbc as const;
/**
 * ARM7 函数 @ 0x02391c08
 * @category prologue
 * @confidence high
 */
export const sub_02391c08 = 0x02391c08 as const;
/**
 * ARM7 函数 @ 0x02391cc4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const arm7_flag_bit_test = 0x02391cc4 as const;
/**
 * ARM7 函数 @ 0x02391ce4
 * @category near
 * @confidence high
 * @known V0.4 named
 * @callers 21
 */
export const mic_sample = 0x02391ce4 as const;
/**
 * ARM7 函数 @ 0x02391d20
 * @category prologue
 * @confidence high
 */
export const sub_02391d20 = 0x02391d20 as const;
/**
 * ARM7 函数 @ 0x02391df0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const arm7_acc_field_0x50 = 0x02391df0 as const;
/**
 * ARM7 函数 @ 0x02391ff4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_0x53c_memzero_0xb4 = 0x02391ff4 as const;
/**
 * ARM7 函数 @ 0x02392030
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const arm7_halfword_copy_6 = 0x02392030 as const;
/**
 * ARM7 函数 @ 0x023920b0
 * @category bx_lr
 * @confidence medium
 * @known V0.4 named
 * @callers 35
 */
export const lid_close_handler = 0x023920b0 as const;
/**
 * ARM7 函数 @ 0x023920cc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04808094 = 0x023920cc as const;
/**
 * ARM7 函数 @ 0x02392108
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_state_getter_2392128 = 0x02392108 as const;
/**
 * ARM7 函数 @ 0x0239212c
 * @category prologue
 * @confidence high
 */
export const sub_0239212c = 0x0239212c as const;
/**
 * ARM7 函数 @ 0x02392194
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_0x480802a_halfword_set_cond = 0x02392194 as const;
/**
 * ARM7 函数 @ 0x023921d8
 * @category prologue
 * @confidence high
 */
export const sub_023921d8 = 0x023921d8 as const;
/**
 * ARM7 函数 @ 0x02392284
 * @category prologue
 * @confidence high
 */
export const sub_02392284 = 0x02392284 as const;
/**
 * ARM7 函数 @ 0x023922d0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0380fff4_300 = 0x023922d0 as const;
/**
 * ARM7 函数 @ 0x02392300
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0380fff4_300_2 = 0x02392300 as const;
/**
 * ARM7 函数 @ 0x02392354
 * @category prologue
 * @confidence high
 */
export const sub_02392354 = 0x02392354 as const;
/**
 * ARM7 函数 @ 0x023923bc
 * @category prologue
 * @confidence high
 */
export const sub_023923bc = 0x023923bc as const;
/**
 * ARM7 函数 @ 0x02392450
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_state_cond_double_call = 0x02392450 as const;
/**
 * ARM7 函数 @ 0x023924c4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 7
 */
export const const_zero_return_d = 0x023924c4 as const;
/**
 * ARM7 函数 @ 0x023924d8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const arm7_halfword_shift_set = 0x023924d8 as const;
/**
 * ARM7 函数 @ 0x02392504
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_0x4808006_flag_0x40_cond_set = 0x02392504 as const;
/**
 * ARM7 函数 @ 0x02392578
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_service_call_0x58 = 0x02392578 as const;
/**
 * ARM7 函数 @ 0x0239260c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_halfword_copy_to_state = 0x0239260c as const;
/**
 * ARM7 函数 @ 0x02392654
 * @category prologue
 * @confidence high
 */
export const sub_02392654 = 0x02392654 as const;
/**
 * ARM7 函数 @ 0x023928f0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const reg_read_pair_0x36_0x3c = 0x023928f0 as const;
/**
 * ARM7 函数 @ 0x02392a40
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const const_five_return_a = 0x02392a40 as const;
/**
 * ARM7 函数 @ 0x02392a74
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const const_five_return_b = 0x02392a74 as const;
/**
 * ARM7 函数 @ 0x02392ac0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const arm7_range_check_write = 0x02392ac0 as const;
/**
 * ARM7 函数 @ 0x02392b20
 * @category prologue
 * @confidence high
 */
export const sub_02392b20 = 0x02392b20 as const;
/**
 * ARM7 函数 @ 0x02392c3c
 * @category prologue
 * @confidence high
 */
export const sub_02392c3c = 0x02392c3c as const;
/**
 * ARM7 函数 @ 0x02392ca4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const reg_field_0x3a_bit7_set = 0x02392ca4 as const;
/**
 * ARM7 函数 @ 0x02392d00
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const reg_field_0x3a_bit6_set = 0x02392d00 as const;
/**
 * ARM7 函数 @ 0x02392d40
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const const_five_return_c = 0x02392d40 as const;
/**
 * ARM7 函数 @ 0x02392e1c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const reg_field_0x3a_bit3_set = 0x02392e1c as const;
/**
 * ARM7 函数 @ 0x02392e84
 * @category prologue
 * @confidence high
 */
export const sub_02392e84 = 0x02392e84 as const;
/**
 * ARM7 函数 @ 0x02392ecc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const reg_field_0x32_halfword_store = 0x02392ecc as const;
/**
 * ARM7 函数 @ 0x02392ef0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const arm7_state_flag_bic = 0x02392ef0 as const;
/**
 * ARM7 函数 @ 0x02392fb0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const halfword_copy_16_to_0x384 = 0x02392fb0 as const;
/**
 * ARM7 函数 @ 0x02392fe0
 * @category prologue
 * @confidence high
 */
export const sub_02392fe0 = 0x02392fe0 as const;
/**
 * ARM7 函数 @ 0x023930a0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const reg_fields_0xc2_0xc4_set = 0x023930a0 as const;
/**
 * ARM7 函数 @ 0x023930d8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const reg_field_0x3a_bit1_set = 0x023930d8 as const;
/**
 * ARM7 函数 @ 0x02393110
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_state_flag_bit0_set = 0x02393110 as const;
/**
 * ARM7 函数 @ 0x02393148
 * @category prologue
 * @confidence high
 */
export const sub_02393148 = 0x02393148 as const;
/**
 * ARM7 函数 @ 0x023931ac
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const reg_field_0x36_halfword_store = 0x023931ac as const;
/**
 * ARM7 函数 @ 0x023931d0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const reg_field_0x34_set_clear_flags = 0x023931d0 as const;
/**
 * ARM7 函数 @ 0x02393284
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const reg_field_0x30_set_call_0x2392578 = 0x02393284 as const;
/**
 * ARM7 函数 @ 0x023932c0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_state_halfword_dual_store = 0x023932c0 as const;
/**
 * ARM7 函数 @ 0x02393348
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_state_guard_orr4 = 0x02393348 as const;
/**
 * ARM7 函数 @ 0x02393388
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_0x480802c_halfword_set = 0x02393388 as const;
/**
 * ARM7 函数 @ 0x023933bc
 * @category prologue
 * @confidence high
 */
export const sub_023933bc = 0x023933bc as const;
/**
 * ARM7 函数 @ 0x0239341c
 * @category prologue
 * @confidence high
 */
export const sub_0239341c = 0x0239341c as const;
/**
 * ARM7 函数 @ 0x0239349c
 * @category prologue
 * @confidence high
 */
export const sub_0239349c = 0x0239349c as const;
/**
 * ARM7 函数 @ 0x02393794
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x04804000_1 = 0x02393794 as const;
/**
 * ARM7 函数 @ 0x02393918
 * @category prologue
 * @confidence high
 */
export const sub_02393918 = 0x02393918 as const;
/**
 * ARM7 函数 @ 0x02393ac4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_2bl_0x33a3bf4_0x33a3ce8 = 0x02393ac4 as const;
/**
 * ARM7 函数 @ 0x02393aec
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x037f9504 = 0x02393aec as const;
/**
 * ARM7 函数 @ 0x02393c00
 * @category prologue
 * @confidence high
 */
export const sub_02393c00 = 0x02393c00 as const;
/**
 * ARM7 函数 @ 0x02393cd4
 * @category prologue
 * @confidence high
 */
export const sub_02393cd4 = 0x02393cd4 as const;
/**
 * ARM7 函数 @ 0x02393d60
 * @category prologue
 * @confidence high
 */
export const sub_02393d60 = 0x02393d60 as const;
/**
 * ARM7 函数 @ 0x02393e08
 * @category prologue
 * @confidence high
 */
export const sub_02393e08 = 0x02393e08 as const;
/**
 * ARM7 函数 @ 0x02393e50
 * @category prologue
 * @confidence high
 */
export const sub_02393e50 = 0x02393e50 as const;
/**
 * ARM7 函数 @ 0x02394028
 * @category prologue
 * @confidence high
 */
export const sub_02394028 = 0x02394028 as const;
/**
 * ARM7 函数 @ 0x023940d4
 * @category prologue
 * @confidence high
 */
export const sub_023940d4 = 0x023940d4 as const;
/**
 * ARM7 函数 @ 0x02394194
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 17
 */
export const arm7_table_0x31c_get_ptr = 0x02394194 as const;
/**
 * ARM7 函数 @ 0x023941b0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_field_get_0x16 = 0x023941b0 as const;
/**
 * ARM7 函数 @ 0x023941cc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 7
 */
export const arm7_struct_field_2_get = 0x023941cc as const;
/**
 * ARM7 函数 @ 0x023941e8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_1bl_0x2394194 = 0x023941e8 as const;
/**
 * ARM7 函数 @ 0x02394210
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_field_get_0x14 = 0x02394210 as const;
/**
 * ARM7 函数 @ 0x0239422c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_field_get_0xe = 0x0239422c as const;
/**
 * ARM7 函数 @ 0x02394248
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_0x2394194_plus_4 = 0x02394248 as const;
/**
 * ARM7 函数 @ 0x02394264
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_field_bit_test_0x2e = 0x02394264 as const;
/**
 * ARM7 函数 @ 0x02394284
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_getter_0x0380fff4_500 = 0x02394284 as const;
/**
 * ARM7 函数 @ 0x023942a4
 * @category near
 * @confidence high
 * @known V0.4 named
 * @callers 25
 */
export const rtc_read = 0x023942a4 as const;
/**
 * ARM7 函数 @ 0x023942c0
 * @category prologue
 * @confidence high
 */
export const sub_023942c0 = 0x023942c0 as const;
/**
 * ARM7 函数 @ 0x02394334
 * @category prologue
 * @confidence high
 */
export const sub_02394334 = 0x02394334 as const;
/**
 * ARM7 函数 @ 0x023943e4
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 5
 */
export const arm7_slot_0x31c_copy = 0x023943e4 as const;
/**
 * ARM7 函数 @ 0x02394408
 * @category prologue
 * @confidence high
 */
export const sub_02394408 = 0x02394408 as const;
/**
 * ARM7 函数 @ 0x02394420
 * @category prologue
 * @confidence high
 */
export const sub_02394420 = 0x02394420 as const;
/**
 * ARM7 函数 @ 0x02394438
 * @category prologue
 * @confidence high
 */
export const sub_02394438 = 0x02394438 as const;
/**
 * ARM7 函数 @ 0x02394450
 * @category prologue
 * @confidence high
 */
export const sub_02394450 = 0x02394450 as const;
/**
 * ARM7 函数 @ 0x02394468
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 4
 */
export const arm7_halfword_bit_set = 0x02394468 as const;
/**
 * ARM7 函数 @ 0x0239448c
 * @category prologue
 * @confidence high
 */
export const sub_0239448c = 0x0239448c as const;
/**
 * ARM7 函数 @ 0x023944cc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const arm7_bits_rmw = 0x023944cc as const;
/**
 * ARM7 函数 @ 0x02394530
 * @category prologue
 * @confidence high
 */
export const sub_02394530 = 0x02394530 as const;
/**
 * ARM7 函数 @ 0x02394548
 * @category prologue
 * @confidence high
 */
export const sub_02394548 = 0x02394548 as const;
/**
 * ARM7 函数 @ 0x02394614
 * @category prologue
 * @confidence high
 */
export const sub_02394614 = 0x02394614 as const;
/**
 * ARM7 函数 @ 0x02394680
 * @category prologue
 * @confidence high
 */
export const sub_02394680 = 0x02394680 as const;
/**
 * ARM7 函数 @ 0x02394710
 * @category prologue
 * @confidence high
 */
export const sub_02394710 = 0x02394710 as const;
/**
 * ARM7 函数 @ 0x02394774
 * @category prologue
 * @confidence high
 */
export const sub_02394774 = 0x02394774 as const;
/**
 * ARM7 函数 @ 0x023948bc
 * @category prologue
 * @confidence high
 */
export const sub_023948bc = 0x023948bc as const;
/**
 * ARM7 函数 @ 0x02394964
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const global_halfword_0x428_clear = 0x02394964 as const;
/**
 * ARM7 函数 @ 0x02394980
 * @category prologue
 * @confidence high
 */
export const sub_02394980 = 0x02394980 as const;
/**
 * ARM7 函数 @ 0x023949f0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const isr_call_target_0x37fe634 = 0x023949f0 as const;
/**
 * ARM7 函数 @ 0x02394a1c
 * @category prologue
 * @confidence high
 */
export const sub_02394a1c = 0x02394a1c as const;
/**
 * ARM7 函数 @ 0x02394bb0
 * @category prologue
 * @confidence high
 */
export const sub_02394bb0 = 0x02394bb0 as const;
/**
 * ARM7 函数 @ 0x02394c2c
 * @category prologue
 * @confidence high
 */
export const sub_02394c2c = 0x02394c2c as const;
/**
 * ARM7 函数 @ 0x02394ca8
 * @category prologue
 * @confidence high
 */
export const sub_02394ca8 = 0x02394ca8 as const;
/**
 * ARM7 函数 @ 0x02394d98
 * @category prologue
 * @confidence high
 */
export const sub_02394d98 = 0x02394d98 as const;
/**
 * ARM7 函数 @ 0x02394e94
 * @category prologue
 * @confidence high
 */
export const sub_02394e94 = 0x02394e94 as const;
/**
 * ARM7 函数 @ 0x02394f10
 * @category prologue
 * @confidence high
 */
export const sub_02394f10 = 0x02394f10 as const;
/**
 * ARM7 函数 @ 0x02394f8c
 * @category prologue
 * @confidence high
 */
export const sub_02394f8c = 0x02394f8c as const;
/**
 * ARM7 函数 @ 0x02395034
 * @category prologue
 * @confidence high
 */
export const sub_02395034 = 0x02395034 as const;
/**
 * ARM7 函数 @ 0x023950c6
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_023950c6 = 0x023950c6 as const;
/**
 * ARM7 函数 @ 0x02395300
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_02395300 = 0x02395300 as const;
/**
 * ARM7 函数 @ 0x02395400
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_02395400 = 0x02395400 as const;
/**
 * ARM7 函数 @ 0x02395508
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_02395508 = 0x02395508 as const;
/**
 * ARM7 函数 @ 0x0239562c
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_0239562c = 0x0239562c as const;
/**
 * ARM7 函数 @ 0x02395738
 * @category prologue
 * @confidence high
 */
export const sub_02395738 = 0x02395738 as const;
/**
 * ARM7 函数 @ 0x02395934
 * @category prologue
 * @confidence high
 */
export const sub_02395934 = 0x02395934 as const;
/**
 * ARM7 函数 @ 0x02395a1c
 * @category prologue
 * @confidence high
 */
export const sub_02395a1c = 0x02395a1c as const;
/**
 * ARM7 函数 @ 0x02395bc0
 * @category prologue
 * @confidence high
 */
export const sub_02395bc0 = 0x02395bc0 as const;
/**
 * ARM7 函数 @ 0x02395da4
 * @category prologue
 * @confidence high
 */
export const sub_02395da4 = 0x02395da4 as const;
/**
 * ARM7 函数 @ 0x02395e8c
 * @category prologue
 * @confidence high
 */
export const sub_02395e8c = 0x02395e8c as const;
/**
 * ARM7 函数 @ 0x02395fc8
 * @category prologue
 * @confidence high
 */
export const sub_02395fc8 = 0x02395fc8 as const;
/**
 * ARM7 函数 @ 0x023960a4
 * @category prologue
 * @confidence high
 */
export const sub_023960a4 = 0x023960a4 as const;
/**
 * ARM7 函数 @ 0x02396264
 * @category prologue
 * @confidence high
 */
export const sub_02396264 = 0x02396264 as const;
/**
 * ARM7 函数 @ 0x023963b0
 * @category prologue
 * @confidence high
 */
export const sub_023963b0 = 0x023963b0 as const;
/**
 * ARM7 函数 @ 0x0239645c
 * @category prologue
 * @confidence high
 */
export const sub_0239645c = 0x0239645c as const;
/**
 * ARM7 函数 @ 0x0239649c
 * @category prologue
 * @confidence high
 */
export const sub_0239649c = 0x0239649c as const;
/**
 * ARM7 函数 @ 0x023967bc
 * @category prologue
 * @confidence high
 */
export const sub_023967bc = 0x023967bc as const;
/**
 * ARM7 函数 @ 0x023968fc
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const const_zero_return_e = 0x023968fc as const;
/**
 * ARM7 函数 @ 0x02396a78
 * @category prologue
 * @confidence high
 */
export const sub_02396a78 = 0x02396a78 as const;
/**
 * ARM7 函数 @ 0x02396bb0
 * @category prologue
 * @confidence high
 */
export const sub_02396bb0 = 0x02396bb0 as const;
/**
 * ARM7 函数 @ 0x02396ea4
 * @category prologue
 * @confidence high
 */
export const sub_02396ea4 = 0x02396ea4 as const;
/**
 * ARM7 函数 @ 0x02396fb0
 * @category prologue
 * @confidence high
 */
export const sub_02396fb0 = 0x02396fb0 as const;
/**
 * ARM7 函数 @ 0x02396fbc
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_2397018 = 0x02396fbc as const;
/**
 * ARM7 函数 @ 0x02397244
 * @category prologue
 * @confidence high
 */
export const sub_02397244 = 0x02397244 as const;
/**
 * ARM7 函数 @ 0x02397338
 * @category prologue
 * @confidence high
 */
export const sub_02397338 = 0x02397338 as const;
/**
 * ARM7 函数 @ 0x02397490
 * @category prologue
 * @confidence high
 */
export const sub_02397490 = 0x02397490 as const;
/**
 * ARM7 函数 @ 0x023975d8
 * @category prologue
 * @confidence high
 */
export const sub_023975d8 = 0x023975d8 as const;
/**
 * ARM7 函数 @ 0x02397874
 * @category prologue
 * @confidence high
 */
export const sub_02397874 = 0x02397874 as const;
/**
 * ARM7 函数 @ 0x023978d4
 * @category prologue
 * @confidence high
 */
export const sub_023978d4 = 0x023978d4 as const;
/**
 * ARM7 函数 @ 0x02397b10
 * @category near
 * @confidence high
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_tail_call_2397b4c = 0x02397b10 as const;
/**
 * ARM7 函数 @ 0x02397b18
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 5
 */
export const arm7_node_init_copy = 0x02397b18 as const;
/**
 * ARM7 函数 @ 0x02397b50
 * @category prologue
 * @confidence high
 */
export const sub_02397b50 = 0x02397b50 as const;
/**
 * ARM7 函数 @ 0x02397b9c
 * @category prologue
 * @confidence high
 */
export const sub_02397b9c = 0x02397b9c as const;
/**
 * ARM7 函数 @ 0x02397c00
 * @category prologue
 * @confidence high
 */
export const sub_02397c00 = 0x02397c00 as const;
/**
 * ARM7 函数 @ 0x023980f8
 * @category prologue
 * @confidence high
 */
export const sub_023980f8 = 0x023980f8 as const;
/**
 * ARM7 函数 @ 0x0239829c
 * @category prologue
 * @confidence high
 */
export const sub_0239829c = 0x0239829c as const;
/**
 * ARM7 函数 @ 0x02398480
 * @category prologue
 * @confidence high
 */
export const sub_02398480 = 0x02398480 as const;
/**
 * ARM7 函数 @ 0x023985a4
 * @category prologue
 * @confidence high
 */
export const sub_023985a4 = 0x023985a4 as const;
/**
 * ARM7 函数 @ 0x023985ec
 * @category prologue
 * @confidence high
 */
export const sub_023985ec = 0x023985ec as const;
/**
 * ARM7 函数 @ 0x023986a4
 * @category prologue
 * @confidence high
 */
export const sub_023986a4 = 0x023986a4 as const;
/**
 * ARM7 函数 @ 0x02398718
 * @category prologue
 * @confidence high
 */
export const sub_02398718 = 0x02398718 as const;
/**
 * ARM7 函数 @ 0x0239878c
 * @category prologue
 * @confidence high
 */
export const sub_0239878c = 0x0239878c as const;
/**
 * ARM7 函数 @ 0x023987e0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_draw_state_init = 0x023987e0 as const;
/**
 * ARM7 函数 @ 0x02398834
 * @category prologue
 * @confidence high
 */
export const sub_02398834 = 0x02398834 as const;
/**
 * ARM7 函数 @ 0x023988b8
 * @category prologue
 * @confidence high
 */
export const sub_023988b8 = 0x023988b8 as const;
/**
 * ARM7 函数 @ 0x0239896c
 * @category prologue
 * @confidence high
 */
export const sub_0239896c = 0x0239896c as const;
/**
 * ARM7 函数 @ 0x02398a3c
 * @category prologue
 * @confidence high
 */
export const sub_02398a3c = 0x02398a3c as const;
/**
 * ARM7 函数 @ 0x02398acc
 * @category prologue
 * @confidence high
 */
export const sub_02398acc = 0x02398acc as const;
/**
 * ARM7 函数 @ 0x02398c38
 * @category prologue
 * @confidence high
 */
export const sub_02398c38 = 0x02398c38 as const;
/**
 * ARM7 函数 @ 0x02398db0
 * @category prologue
 * @confidence high
 */
export const sub_02398db0 = 0x02398db0 as const;
/**
 * ARM7 函数 @ 0x02398e68
 * @category prologue
 * @confidence high
 */
export const sub_02398e68 = 0x02398e68 as const;
/**
 * ARM7 函数 @ 0x02398f14
 * @category prologue
 * @confidence high
 */
export const sub_02398f14 = 0x02398f14 as const;
/**
 * ARM7 函数 @ 0x02398f98
 * @category prologue
 * @confidence high
 */
export const sub_02398f98 = 0x02398f98 as const;
/**
 * ARM7 函数 @ 0x023990a4
 * @category prologue
 * @confidence high
 */
export const sub_023990a4 = 0x023990a4 as const;
/**
 * ARM7 函数 @ 0x02399484
 * @category prologue
 * @confidence high
 */
export const sub_02399484 = 0x02399484 as const;
/**
 * ARM7 函数 @ 0x02399520
 * @category prologue
 * @confidence high
 */
export const sub_02399520 = 0x02399520 as const;
/**
 * ARM7 函数 @ 0x02399594
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 21
 */
export const arm7_audio_init_chain = 0x02399594 as const;
/**
 * ARM7 函数 @ 0x023995b4
 * @category prologue
 * @confidence high
 */
export const sub_023995b4 = 0x023995b4 as const;
/**
 * ARM7 函数 @ 0x0239964c
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_0239964c = 0x0239964c as const;
/**
 * ARM7 函数 @ 0x0239973c
 * @category prologue
 * @confidence high
 */
export const sub_0239973c = 0x0239973c as const;
/**
 * ARM7 函数 @ 0x023997e0
 * @category prologue
 * @confidence high
 */
export const sub_023997e0 = 0x023997e0 as const;
/**
 * ARM7 函数 @ 0x023998f0
 * @category prologue
 * @confidence high
 */
export const sub_023998f0 = 0x023998f0 as const;
/**
 * ARM7 函数 @ 0x02399988
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const arm7_array_0x14_lookup = 0x02399988 as const;
/**
 * ARM7 函数 @ 0x02399a00
 * @category prologue
 * @confidence high
 */
export const sub_02399a00 = 0x02399a00 as const;
/**
 * ARM7 函数 @ 0x02399ab8
 * @category prologue
 * @confidence high
 */
export const sub_02399ab8 = 0x02399ab8 as const;
/**
 * ARM7 函数 @ 0x02399b18
 * @category prologue
 * @confidence high
 */
export const sub_02399b18 = 0x02399b18 as const;
/**
 * ARM7 函数 @ 0x02399b98
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x0380fff4_1 = 0x02399b98 as const;
/**
 * ARM7 函数 @ 0x02399bec
 * @category prologue
 * @confidence high
 */
export const sub_02399bec = 0x02399bec as const;
/**
 * ARM7 函数 @ 0x02399d80
 * @category prologue
 * @confidence high
 */
export const sub_02399d80 = 0x02399d80 as const;
/**
 * ARM7 函数 @ 0x0239a270
 * @category prologue
 * @confidence high
 */
export const sub_0239a270 = 0x0239a270 as const;
/**
 * ARM7 函数 @ 0x0239a408
 * @category prologue
 * @confidence high
 */
export const sub_0239a408 = 0x0239a408 as const;
/**
 * ARM7 函数 @ 0x0239a574
 * @category prologue
 * @confidence high
 */
export const sub_0239a574 = 0x0239a574 as const;
/**
 * ARM7 函数 @ 0x0239a7c4
 * @category prologue
 * @confidence high
 */
export const sub_0239a7c4 = 0x0239a7c4 as const;
/**
 * ARM7 函数 @ 0x0239a83c
 * @category prologue
 * @confidence high
 */
export const sub_0239a83c = 0x0239a83c as const;
/**
 * ARM7 函数 @ 0x0239aa7c
 * @category prologue
 * @confidence high
 */
export const sub_0239aa7c = 0x0239aa7c as const;
/**
 * ARM7 函数 @ 0x0239accc
 * @category prologue
 * @confidence high
 */
export const sub_0239accc = 0x0239accc as const;
/**
 * ARM7 函数 @ 0x0239ade8
 * @category prologue
 * @confidence high
 */
export const sub_0239ade8 = 0x0239ade8 as const;
/**
 * ARM7 函数 @ 0x0239ae70
 * @category prologue
 * @confidence high
 */
export const sub_0239ae70 = 0x0239ae70 as const;
/**
 * ARM7 函数 @ 0x0239aee4
 * @category prologue
 * @confidence high
 */
export const sub_0239aee4 = 0x0239aee4 as const;
/**
 * ARM7 函数 @ 0x0239b230
 * @category prologue
 * @confidence high
 */
export const sub_0239b230 = 0x0239b230 as const;
/**
 * ARM7 函数 @ 0x0239b570
 * @category near
 * @confidence high
 * @callers 1
 */
export const sub_0239b570 = 0x0239b570 as const;
/**
 * ARM7 函数 @ 0x0239b574
 * @category prologue
 * @confidence high
 */
export const sub_0239b574 = 0x0239b574 as const;
/**
 * ARM7 函数 @ 0x0239b5dc
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_0239b5dc = 0x0239b5dc as const;
/**
 * ARM7 函数 @ 0x0239b698
 * @category prologue
 * @confidence high
 */
export const sub_0239b698 = 0x0239b698 as const;
/**
 * ARM7 函数 @ 0x0239bbc8
 * @category prologue
 * @confidence high
 */
export const sub_0239bbc8 = 0x0239bbc8 as const;
/**
 * ARM7 函数 @ 0x0239bfb8
 * @category prologue
 * @confidence high
 */
export const sub_0239bfb8 = 0x0239bfb8 as const;
/**
 * ARM7 函数 @ 0x0239c06c
 * @category prologue
 * @confidence high
 */
export const sub_0239c06c = 0x0239c06c as const;
/**
 * ARM7 函数 @ 0x0239c1a0
 * @category prologue
 * @confidence high
 */
export const sub_0239c1a0 = 0x0239c1a0 as const;
/**
 * ARM7 函数 @ 0x0239c334
 * @category prologue
 * @confidence high
 */
export const sub_0239c334 = 0x0239c334 as const;
/**
 * ARM7 函数 @ 0x0239c460
 * @category prologue
 * @confidence high
 */
export const sub_0239c460 = 0x0239c460 as const;
/**
 * ARM7 函数 @ 0x0239c624
 * @category prologue
 * @confidence high
 * @pattern V0.13 auto-detected
 */
export const auto_switch_2way_0239c624 = 0x0239c624 as const;
/**
 * ARM7 函数 @ 0x0239c714
 * @category prologue
 * @confidence high
 */
export const sub_0239c714 = 0x0239c714 as const;
/**
 * ARM7 函数 @ 0x0239cdd4
 * @category prologue
 * @confidence high
 */
export const sub_0239cdd4 = 0x0239cdd4 as const;
/**
 * ARM7 函数 @ 0x0239ceb8
 * @category prologue
 * @confidence high
 */
export const sub_0239ceb8 = 0x0239ceb8 as const;
/**
 * ARM7 函数 @ 0x0239d0b0
 * @category prologue
 * @confidence high
 */
export const sub_0239d0b0 = 0x0239d0b0 as const;
/**
 * ARM7 函数 @ 0x0239d244
 * @category prologue
 * @confidence high
 */
export const sub_0239d244 = 0x0239d244 as const;
/**
 * ARM7 函数 @ 0x0239d5c4
 * @category prologue
 * @confidence high
 */
export const sub_0239d5c4 = 0x0239d5c4 as const;
/**
 * ARM7 函数 @ 0x0239d718
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_w_access_0x0380fff4_2 = 0x0239d718 as const;
/**
 * ARM7 函数 @ 0x0239d80c
 * @category prologue
 * @confidence high
 */
export const sub_0239d80c = 0x0239d80c as const;
/**
 * ARM7 函数 @ 0x0239d85c
 * @category prologue
 * @confidence high
 */
export const sub_0239d85c = 0x0239d85c as const;
/**
 * ARM7 函数 @ 0x0239d8bc
 * @category prologue
 * @confidence high
 */
export const sub_0239d8bc = 0x0239d8bc as const;
/**
 * ARM7 函数 @ 0x0239d8fc
 * @category prologue
 * @confidence high
 */
export const sub_0239d8fc = 0x0239d8fc as const;
/**
 * ARM7 函数 @ 0x0239d9a8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 5
 */
export const arm7_flags_bit_decode = 0x0239d9a8 as const;
/**
 * ARM7 函数 @ 0x0239d9e0
 * @category near
 * @confidence high
 * @curated V0.12 manually named
 * @callers 2
 */
export const call_0x239e68c_bit0_not = 0x0239d9e0 as const;
/**
 * ARM7 函数 @ 0x0239da0c
 * @category prologue
 * @confidence high
 */
export const sub_0239da0c = 0x0239da0c as const;
/**
 * ARM7 函数 @ 0x0239dce8
 * @category prologue
 * @confidence high
 */
export const sub_0239dce8 = 0x0239dce8 as const;
/**
 * ARM7 函数 @ 0x0239deb4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const io_poll_write_seq_0x1c0 = 0x0239deb4 as const;
/**
 * ARM7 函数 @ 0x0239def4
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x040001c0 = 0x0239def4 as const;
/**
 * ARM7 函数 @ 0x0239df90
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x040001c0_2 = 0x0239df90 as const;
/**
 * ARM7 函数 @ 0x0239dfd0
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x040001c0_3 = 0x0239dfd0 as const;
/**
 * ARM7 函数 @ 0x0239e010
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x040001c0_4 = 0x0239e010 as const;
/**
 * ARM7 函数 @ 0x0239e050
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x040001c0_5 = 0x0239e050 as const;
/**
 * ARM7 函数 @ 0x0239e114
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x040001c0_6 = 0x0239e114 as const;
/**
 * ARM7 函数 @ 0x0239e1d8
 * @category prologue
 * @confidence high
 */
export const sub_0239e1d8 = 0x0239e1d8 as const;
/**
 * ARM7 函数 @ 0x0239e304
 * @category prologue
 * @confidence high
 */
export const sub_0239e304 = 0x0239e304 as const;
/**
 * ARM7 函数 @ 0x0239e430
 * @category prologue
 * @confidence high
 */
export const sub_0239e430 = 0x0239e430 as const;
/**
 * ARM7 函数 @ 0x0239e56c
 * @category prologue
 * @confidence high
 */
export const sub_0239e56c = 0x0239e56c as const;
/**
 * ARM7 函数 @ 0x0239e68c
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 4
 */
export const arm7_io_flag_poll_store = 0x0239e68c as const;
/**
 * ARM7 函数 @ 0x0239e700
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x040001c0_7 = 0x0239e700 as const;
/**
 * ARM7 函数 @ 0x0239e740
 * @category bx_lr
 * @confidence medium
 * @pattern V0.13 auto-detected
 * @callers 1
 */
export const auto_gptr_mix_access_0x040001c0_8 = 0x0239e740 as const;
/**
 * ARM7 函数 @ 0x0239e780
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 3
 */
export const arm7_nibble_scan_valid = 0x0239e780 as const;
/**
 * ARM7 函数 @ 0x0239e7f8
 * @category prologue
 * @confidence high
 */
export const sub_0239e7f8 = 0x0239e7f8 as const;
/**
 * ARM7 函数 @ 0x0239e874
 * @category prologue
 * @confidence high
 */
export const sub_0239e874 = 0x0239e874 as const;
/**
 * ARM7 函数 @ 0x0239e9a8
 * @category prologue
 * @confidence high
 */
export const sub_0239e9a8 = 0x0239e9a8 as const;
/**
 * ARM7 函数 @ 0x0239ea38
 * @category prologue
 * @confidence high
 */
export const sub_0239ea38 = 0x0239ea38 as const;
/**
 * ARM7 函数 @ 0x0239eef4
 * @category prologue
 * @confidence high
 */
export const sub_0239eef4 = 0x0239eef4 as const;
/**
 * ARM7 函数 @ 0x0239ef34
 * @category prologue
 * @confidence high
 */
export const sub_0239ef34 = 0x0239ef34 as const;
/**
 * ARM7 函数 @ 0x0239f070
 * @category prologue
 * @confidence high
 */
export const sub_0239f070 = 0x0239f070 as const;
/**
 * ARM7 函数 @ 0x0239f164
 * @category prologue
 * @confidence high
 */
export const sub_0239f164 = 0x0239f164 as const;
/**
 * ARM7 函数 @ 0x0239f1c8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const switch_dispatch_36way = 0x0239f1c8 as const;
/**
 * ARM7 函数 @ 0x0239f2e0
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 2
 */
export const switch_dispatch_36way_b = 0x0239f2e0 as const;
/**
 * ARM7 函数 @ 0x0239f408
 * @category prologue
 * @confidence high
 */
export const sub_0239f408 = 0x0239f408 as const;
/**
 * ARM7 函数 @ 0x0239f434
 * @category prologue
 * @confidence high
 */
export const sub_0239f434 = 0x0239f434 as const;
/**
 * ARM7 函数 @ 0x0239f460
 * @category prologue
 * @confidence high
 */
export const sub_0239f460 = 0x0239f460 as const;
/**
 * ARM7 函数 @ 0x0239f48c
 * @category prologue
 * @confidence high
 */
export const sub_0239f48c = 0x0239f48c as const;
/**
 * ARM7 函数 @ 0x0239f4b8
 * @category prologue
 * @confidence high
 */
export const sub_0239f4b8 = 0x0239f4b8 as const;
/**
 * ARM7 函数 @ 0x0239f4e4
 * @category prologue
 * @confidence high
 */
export const sub_0239f4e4 = 0x0239f4e4 as const;
/**
 * ARM7 函数 @ 0x0239f510
 * @category prologue
 * @confidence high
 */
export const sub_0239f510 = 0x0239f510 as const;
/**
 * ARM7 函数 @ 0x0239f53c
 * @category prologue
 * @confidence high
 */
export const sub_0239f53c = 0x0239f53c as const;
/**
 * ARM7 函数 @ 0x0239f568
 * @category prologue
 * @confidence high
 */
export const sub_0239f568 = 0x0239f568 as const;
/**
 * ARM7 函数 @ 0x0239f5b4
 * @category prologue
 * @confidence high
 */
export const sub_0239f5b4 = 0x0239f5b4 as const;
/**
 * ARM7 函数 @ 0x0239f600
 * @category prologue
 * @confidence high
 */
export const sub_0239f600 = 0x0239f600 as const;
/**
 * ARM7 函数 @ 0x0239f650
 * @category prologue
 * @confidence high
 */
export const sub_0239f650 = 0x0239f650 as const;
/**
 * ARM7 函数 @ 0x0239f6a0
 * @category prologue
 * @confidence high
 */
export const sub_0239f6a0 = 0x0239f6a0 as const;
/**
 * ARM7 函数 @ 0x0239f6f4
 * @category prologue
 * @confidence high
 */
export const sub_0239f6f4 = 0x0239f6f4 as const;
/**
 * ARM7 函数 @ 0x0239f748
 * @category prologue
 * @confidence high
 */
export const sub_0239f748 = 0x0239f748 as const;
/**
 * ARM7 函数 @ 0x0239f774
 * @category prologue
 * @confidence high
 */
export const sub_0239f774 = 0x0239f774 as const;
/**
 * ARM7 函数 @ 0x0239f798
 * @category near
 * @confidence high
 * @callers 1
 */
export const sub_0239f798 = 0x0239f798 as const;
/**
 * ARM7 函数 @ 0x0239f7a0
 * @category prologue
 * @confidence high
 */
export const sub_0239f7a0 = 0x0239f7a0 as const;
/**
 * ARM7 函数 @ 0x0239f7cc
 * @category prologue
 * @confidence high
 */
export const sub_0239f7cc = 0x0239f7cc as const;
/**
 * ARM7 函数 @ 0x0239f7f8
 * @category prologue
 * @confidence high
 */
export const sub_0239f7f8 = 0x0239f7f8 as const;
/**
 * ARM7 函数 @ 0x0239f824
 * @category prologue
 * @confidence high
 */
export const sub_0239f824 = 0x0239f824 as const;
/**
 * ARM7 函数 @ 0x0239f924
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_wrap_2bl_0x33a6bd0_0x239f164 = 0x0239f924 as const;
/**
 * ARM7 函数 @ 0x0239f964
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_io_4000138_bic0x77_orr0x72 = 0x0239f964 as const;
/**
 * ARM7 函数 @ 0x0239f9a4
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_io_4000138_bic4_orr0 = 0x0239f9a4 as const;
/**
 * ARM7 函数 @ 0x0239f9d8
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_io_4000138_bic0x77_orr0x74 = 0x0239f9d8 as const;
/**
 * ARM7 函数 @ 0x0239fa48
 * @category bx_lr
 * @confidence medium
 * @curated V0.12 manually named
 * @callers 1
 */
export const auto_io_4000138_bic0x77_orr0x74_2 = 0x0239fa48 as const;
/**
 * ARM7 函数 @ 0x0239fad8
 * @category bx_lr
 * @confidence medium
 * @callers 1
 */
export const sub_0239fad8 = 0x0239fad8 as const;
/**
 * ARM7 函数 @ 0x023a2c24
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_023a2c24 = 0x023a2c24 as const;
/**
 * ARM7 函数 @ 0x023a3832
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_023a3832 = 0x023a3832 as const;
/**
 * ARM7 函数 @ 0x023a4af6
 * @category prologue
 * @confidence high
 */
export const sub_023a4af6 = 0x023a4af6 as const;
/**
 * ARM7 函数 @ 0x023a551a
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_023a551a = 0x023a551a as const;
/**
 * ARM7 函数 @ 0x023a675a
 * @category prologue
 * @confidence high
 */
export const sub_023a675a = 0x023a675a as const;
/**
 * ARM7 函数 @ 0x023a6972
 * @category prologue
 * @confidence high
 */
export const sub_023a6972 = 0x023a6972 as const;
/**
 * ARM7 函数 @ 0x023a8b58
 * @category prologue
 * @confidence high
 */
export const sub_023a8b58 = 0x023a8b58 as const;
/**
 * ARM7 函数 @ 0x023a91e8
 * @category prologue
 * @confidence high
 */
export const sub_023a91e8 = 0x023a91e8 as const;
/**
 * ARM7 函数 @ 0x023a91f2
 * @category prologue
 * @confidence high
 */
export const sub_023a91f2 = 0x023a91f2 as const;
/**
 * ARM7 函数 @ 0x023a9df6
 * @category prologue
 * @confidence high
 */
export const sub_023a9df6 = 0x023a9df6 as const;
/**
 * ARM7 函数 @ 0x023aa6c8
 * @category prologue
 * @confidence high
 */
export const sub_023aa6c8 = 0x023aa6c8 as const;
/**
 * ARM7 函数 @ 0x023aaae2
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_023aaae2 = 0x023aaae2 as const;
/**
 * ARM7 函数 @ 0x023ac52e
 * @category prologue
 * @confidence high
 */
export const sub_023ac52e = 0x023ac52e as const;
/**
 * ARM7 函数 @ 0x023acb9a
 * @category prologue
 * @confidence high
 */
export const sub_023acb9a = 0x023acb9a as const;
/**
 * ARM7 函数 @ 0x023acc48
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_023acc48 = 0x023acc48 as const;
/**
 * ARM7 函数 @ 0x023ad83a
 * @category prologue
 * @confidence high
 */
export const sub_023ad83a = 0x023ad83a as const;
/**
 * ARM7 函数 @ 0x023ad844
 * @category prologue
 * @confidence high
 */
export const sub_023ad844 = 0x023ad844 as const;
/**
 * ARM7 函数 @ 0x023ad84e
 * @category prologue
 * @confidence high
 */
export const sub_023ad84e = 0x023ad84e as const;
/**
 * ARM7 函数 @ 0x023addc2
 * @category prologue
 * @confidence high
 */
export const sub_023addc2 = 0x023addc2 as const;
/**
 * ARM7 函数 @ 0x023b131e
 * @category prologue
 * @confidence high
 */
export const sub_023b131e = 0x023b131e as const;
/**
 * ARM7 函数 @ 0x023b1328
 * @category prologue
 * @confidence high
 */
export const sub_023b1328 = 0x023b1328 as const;
/**
 * ARM7 函数 @ 0x023b3118
 * @category prologue
 * @confidence high
 */
export const sub_023b3118 = 0x023b3118 as const;
/**
 * ARM7 函数 @ 0x023b3854
 * @category prologue
 * @confidence high
 */
export const sub_023b3854 = 0x023b3854 as const;
/**
 * ARM7 函数 @ 0x023b3c2a
 * @category prologue
 * @confidence high
 */
export const sub_023b3c2a = 0x023b3c2a as const;
/**
 * ARM7 函数 @ 0x023b4c68
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_023b4c68 = 0x023b4c68 as const;
/**
 * ARM7 函数 @ 0x023b4dae
 * @category prologue
 * @confidence high
 */
export const sub_023b4dae = 0x023b4dae as const;
/**
 * ARM7 函数 @ 0x023b531e
 * @category prologue
 * @confidence high
 */
export const sub_023b531e = 0x023b531e as const;
/**
 * ARM7 函数 @ 0x023b5328
 * @category prologue
 * @confidence high
 */
export const sub_023b5328 = 0x023b5328 as const;
/**
 * ARM7 函数 @ 0x023b68a6
 * @category prologue
 * @confidence high
 */
export const sub_023b68a6 = 0x023b68a6 as const;
/**
 * ARM7 函数 @ 0x023b7a06
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_023b7a06 = 0x023b7a06 as const;
/**
 * ARM7 函数 @ 0x023b8472
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_023b8472 = 0x023b8472 as const;
/**
 * ARM7 函数 @ 0x023ba110
 * @category prologue
 * @confidence high
 */
export const sub_023ba110 = 0x023ba110 as const;
/**
 * ARM7 函数 @ 0x023ba150
 * @category prologue
 * @confidence high
 */
export const sub_023ba150 = 0x023ba150 as const;
/**
 * ARM7 函数 @ 0x023bcd9a
 * @category prologue
 * @confidence high
 */
export const sub_023bcd9a = 0x023bcd9a as const;
/**
 * ARM7 函数 @ 0x023bfd78
 * @category single_caller_real
 * @confidence low
 * @callers 1
 */
export const sub_023bfd78 = 0x023bfd78 as const;
