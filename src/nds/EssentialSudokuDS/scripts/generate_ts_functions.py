#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""V0.10 — TypeScript function-name bridge generator (helper naming upgraded).

从 V0.8 `rom-data/function-table.json` 生成 TypeScript 端常量定义, 给 TS service 层提供
稳定的 addr → name 引用.

V0.10 改进 (ADR-010):
  - 加 4-tier heuristic naming: is_known > sfloat_ > util_ > helper_ > sub_XXXXXXXX
  - 加 `is_heuristic` + `heuristic_kind` 到 FunctionRecord type
  - 给 callers ≥ 10 funcs 加语义前缀 (util_/helper_), SOFTFLOAT region 自动 sfloat_
  - 2691 个 sub_XXX 中应有 ~50 个变成 sfloat_*, ~13 个 util_*, ~28 helper_*

V0.12.2 改进 (ADR-012): 加 curated naming batch 1-4 (86 entries)
V0.13 改进 (ADR-013): 加 pattern detector suggestions (51 entries)
V0.14 改进 (ADR-014): target_global_ptr extraction + cluster dedup
V0.14.1 改进: per-kind target extraction (100% coverage)
V0.14.2 改进: cluster_aliases 命名消化 + batch 5 curated (collision 对齐 业务 readable 名)

产物:
  - miniprogram/utils/nds/functions.ts       — 所有 2181 functions (单文件 array)
  - miniprogram/utils/nds/functions/arm9.ts   — ARM9 subset
  - miniprogram/utils/nds/functions/arm7.ts   — ARM7 subset
  - miniprogram/utils/nds/functions/known.ts  — 仅 V0.4 已命名 (28 个)
  - miniprogram/utils/nds/addresses.ts        — 公共地址常量 (entry points / bank 边界 / IRQ vector)
  - miniprogram/utils/nds/index.ts            — barrel re-export
  - miniprogram/utils/nds/types.ts            — 类型定义

每个 const 提供:
  - 名称 (V0.4 known / curated / pattern / sfloat_/util_/helper_/sub_XXXXXXXX)
  - 16 进制地址 (string union, 便于调试 trace)
  - confidence (high / medium / low / excluded)
  - category (real / near / bx_lr / pop_pc / ...)
  - is_heuristic (V0.10+) + heuristic_kind (sfloat/util/helper)
  - cluster_aliases (V0.14.2+): 给 shared target ptr 集群的命名 alias 表

注意: 产物文件全部由该脚本生成. 再次跑脚本会覆盖.
"""
import json
import os
import re
import sys

# V0.10 ADR-010: SOFTFLOAT region bounds (ADR-005)
SOFTFLOAT_BASE = 0x0204c000
SOFTFLOAT_END = 0x0204e000
HEURISTIC_UTIL_THRESHOLD = 20  # callers >= 20 → util_
HEURISTIC_HELPER_THRESHOLD = 10  # callers >= 10 → helper_

ROM_DIR = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\rom-data'
NDS_DIR = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS\miniprogram\utils\nds'
FUNC_TABLE_JSON = os.path.join(ROM_DIR, 'function-table.json')
CURATED_JSON = os.path.join(ROM_DIR, 'v012-curated.json')
CURATED_JSON_BATCH2 = os.path.join(ROM_DIR, 'v0121-curated-batch2.json')
CURATED_JSON_BATCH3 = os.path.join(ROM_DIR, 'v0122-curated-batch3.json')
CURATED_JSON_BATCH4 = os.path.join(ROM_DIR, 'v0122-curated-batch4.json')
CURATED_JSON_BATCH5 = os.path.join(ROM_DIR, 'v0142-curated-batch5.json')
CURATED_JSON_BATCH6 = os.path.join(ROM_DIR, 'v016-curated-batch6.json')
CURATED_JSON_BATCH7 = os.path.join(ROM_DIR, 'v017-curated-batch7.json')
CURATED_JSON_BATCH8 = os.path.join(ROM_DIR, 'v017-curated-batch8.json')
CURATED_JSON_BATCH9 = os.path.join(ROM_DIR, 'v017-curated-batch9.json')
CURATED_JSON_BATCH10 = os.path.join(ROM_DIR, 'v017-curated-batch10.json')
CURATED_JSON_BATCH11 = os.path.join(ROM_DIR, 'v017-curated-batch11.json')
CURATED_JSON_BATCH12 = os.path.join(ROM_DIR, 'v017-curated-batch12.json')
CURATED_JSON_BATCH13 = os.path.join(ROM_DIR, 'v017-curated-batch13.json')
CURATED_JSON_BATCH14 = os.path.join(ROM_DIR, 'v017-curated-batch14.json')
CURATED_JSON_BATCH15 = os.path.join(ROM_DIR, 'v017-curated-batch15.json')
CURATED_JSON_BATCH16 = os.path.join(ROM_DIR, 'v017-curated-batch16.json')
CURATED_JSON_BATCH17 = os.path.join(ROM_DIR, 'v017-curated-batch17.json')
CURATED_JSON_BATCH18 = os.path.join(ROM_DIR, 'v017-curated-batch18.json')
CURATED_JSON_BATCH19 = os.path.join(ROM_DIR, 'v017-curated-batch19.json')
CURATED_JSON_BATCH20 = os.path.join(ROM_DIR, 'v017-curated-batch20.json')
PATTERN_SUGGESTIONS_JSON = os.path.join(ROM_DIR, 'v014-pattern-suggestions.json')


def sanitize_name(name: str) -> str:
    """Convert sub_XXXXXXXXX or known name to TS-friendly identifier."""
    # known names have mixed case + underscores, that's fine
    # For name with hyphens (none currently but possible), replace with underscore
    cleaned = name.replace('-', '_').replace(' ', '_')
    if not re.match(r'^[A-Za-z_][A-Za-z0-9_]*$', cleaned):
        # Fallback: sub_XXXXXXXXX format
        return f'sub_{abs(hash(name)) % 0xFFFFFFFF:08x}'
    # Reserved keywords
    reserved = {'class', 'enum', 'export', 'import', 'const', 'let', 'var',
                'function', 'if', 'else', 'for', 'while', 'do', 'switch', 'case',
                'break', 'continue', 'return', 'throw', 'try', 'catch', 'finally',
                'this', 'new', 'delete', 'typeof', 'instanceof', 'void',
                'true', 'false', 'null', 'undefined'}
    if cleaned in reserved:
        return f'_fn_{cleaned}'
    return cleaned


def to_hex_addr(addr_int: int) -> str:
    """Format address as TypeScript hex literal type string."""
    return f'0x{addr_int:08x}'


def format_ts_camel_case(name: str) -> str:
    """Convert SNARROW_NAME to camelCase."""
    parts = name.split('_')
    if not parts:
        return name
    return parts[0] + ''.join(p.title() for p in parts[1:])


def suggest_v010_name(f: dict) -> tuple:
    """V0.10 helper-naming heuristic (ADR-010).

    4-tier priority:
      1. V0.4 known names (is_known=true) — pass through, never rename.
      2. sfloat_<addr> — in SOFTFLOAT region 0x0204C000..0x0204DFFF (ADR-005).
      3. util_<addr> — callers >= 20 + not SOFTFLOAT.
      4. helper_<addr> — callers >= 10 + not SOFTFLOAT.
      5. None — keep sub_XXXXXXXX (init / 0 caller / low confidence).

    Naming format uses full 32-bit addr to avoid collision risk across all funcs.
    Returns (name, heuristic_kind) or (None, None).
    """
    if f.get('is_known'):
        return (None, None)  # known names win
    if f.get('confidence') == 'excluded':
        return (None, None)  # data_target, never rename

    try:
        addr_int = int(f['addr'], 16)
    except (ValueError, TypeError):
        return (None, None)

    short = f'{addr_int:08x}'
    callers_n = f.get('callers_n') or 0

    # Tier 2: SOFTFLOAT region (ADR-005 __aeabi_* zone)
    if SOFTFLOAT_BASE <= addr_int < SOFTFLOAT_END:
        return (f'sfloat_{short}', 'sfloat')

    # Tier 3: High-utility (callers >= 20)
    if callers_n >= HEURISTIC_UTIL_THRESHOLD:
        return (f'util_{short}', 'util')

    # Tier 4: Medium helper (callers >= 10)
    if callers_n >= HEURISTIC_HELPER_THRESHOLD:
        return (f'helper_{short}', 'helper')

    return (None, None)


def load_curated_names(*curated_paths: str) -> dict:
    """Load V0.12 curated names from one or more JSON files. Returns dict {addr_hex: name}.

    Later files override earlier ones (allows iterative batch additions).
    """
    out = {}
    for path in curated_paths:
        if not os.path.exists(path):
            continue
        data = json.load(open(path, encoding='utf-8'))
        for entry in data.get('names', []):
            addr = entry['addr']
            name = entry['name']
            out[addr] = name
    return out


def emit_header(filename: str, description: str) -> str:
    return f'''/**
 * @file {filename} — {description}
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

'''


def emit_arm9_chunk(functions: list) -> str:
    """Emit ARM9 subset TypeScript constants."""
    lines = []
    for f in functions:
        if f['cpu'] != 'arm9':
            continue
        # V0.10: prefer f['_ts_name'] (post-collision-suffix) over sanitize_name(f['name'])
        name = f.get('_ts_name') or sanitize_name(f['name'])
        addr_hex = to_hex_addr(int(f['addr'], 16))
        # Build JSDoc
        conf = f['confidence']
        cat = f.get('category', 'unknown')
        known = f.get('is_known', False)
        n_callers = f.get('callers_n', 0) or 0
        is_heuristic = f.get('_is_heuristic', False)
        is_curated = f.get('_is_curated', False)
        is_pattern = f.get('_is_pattern', False)
        heuristic_kind_name = None
        if is_heuristic and name.startswith(('sfloat_', 'util_', 'helper_')):
            heuristic_kind_name = name.split('_', 1)[0]

        jsdoc = f'''/**
 * ARM9 函数 @ 0x{int(f["addr"], 16):08x}
 * @category {cat}
 * @confidence {conf}
'''
        if known:
            jsdoc += f' * @known V0.4 named\n'
        if is_curated:
            jsdoc += f' * @curated V0.12 manually named\n'
        if is_pattern:
            jsdoc += f' * @pattern V0.13 auto-detected\n'
        if heuristic_kind_name:
            jsdoc += f' * @heuristic {heuristic_kind_name} (V0.10 ADR-010)\n'
        if n_callers > 0:
            jsdoc += f' * @callers {n_callers}\n'
        jsdoc += ' */\n'
        lines.append(jsdoc + f'export const {name} = 0x{int(f["addr"], 16):08x} as const;\n')
    return ''.join(lines)


def main():
    print('== V0.10 TypeScript function-name bridge generator (helper naming upgraded) ==', file=sys.stderr)

    if not os.path.exists(FUNC_TABLE_JSON):
        print(f'ERROR: {FUNC_TABLE_JSON} not found. Run V0.8 detect_functions.py first.',
              file=sys.stderr)
        sys.exit(1)

    print(f'  loading {FUNC_TABLE_JSON}...', file=sys.stderr)
    ft = json.load(open(FUNC_TABLE_JSON, 'r', encoding='utf-8'))
    funcs = ft['functions']
    print(f'  loaded {len(funcs)} functions', file=sys.stderr)

    os.makedirs(NDS_DIR, exist_ok=True)
    os.makedirs(os.path.join(NDS_DIR, 'functions'), exist_ok=True)

    # Track used TS names to avoid collisions
    used_names = {}
    output_funcs = []
    heuristic_kinds = {'sfloat': 0, 'util': 0, 'helper': 0, 'none': 0, 'known': 0, 'excluded': 0, 'curated': 0, 'pattern': 0}
    curated_names = load_curated_names(CURATED_JSON, CURATED_JSON_BATCH2, CURATED_JSON_BATCH3, CURATED_JSON_BATCH4, CURATED_JSON_BATCH5, CURATED_JSON_BATCH6, CURATED_JSON_BATCH7, CURATED_JSON_BATCH8, CURATED_JSON_BATCH9, CURATED_JSON_BATCH10, CURATED_JSON_BATCH11, CURATED_JSON_BATCH12, CURATED_JSON_BATCH13, CURATED_JSON_BATCH14, CURATED_JSON_BATCH15, CURATED_JSON_BATCH16, CURATED_JSON_BATCH17, CURATED_JSON_BATCH18, CURATED_JSON_BATCH19, CURATED_JSON_BATCH20)
    if curated_names:
        print(f'  Loaded curated names: {len(curated_names)} (V0.12 + V0.12.1 batch 2 + V0.12.2 batch 3 + V0.12.2 batch 4 + V0.14.2 batch 5 + V0.16 batch 6 + V0.17 batch 7-20)', file=sys.stderr)

    # V0.13 pattern suggestions (ADR-013)
    pattern_names = {}
    if os.path.exists(PATTERN_SUGGESTIONS_JSON):
        pdata = json.load(open(PATTERN_SUGGESTIONS_JSON, encoding='utf-8'))
        for s in pdata.get('names', []):
            pattern_names[s['addr']] = s['name']
        print(f'  Loaded pattern suggestions: {len(pattern_names)} (V0.13 ADR-013)', file=sys.stderr)
    for f in funcs:
        # V0.12: Apply curated names first (highest priority after V0.4 known)
        if f.get('is_known'):
            raw_name = f['name']
            f['_is_heuristic'] = False
            f['_is_curated'] = False
            f['_is_pattern'] = False
            heuristic_kinds['known'] += 1
        elif f.get('confidence') == 'excluded':
            raw_name = f['name']
            f['_is_heuristic'] = False
            f['_is_curated'] = False
            f['_is_pattern'] = False
            heuristic_kinds['excluded'] += 1
        elif f.get('addr') in curated_names:
            # V0.12 curated override (manual disasm reading)
            raw_name = curated_names[f['addr']]
            f['_is_heuristic'] = False
            f['_is_curated'] = True
            f['_is_pattern'] = False
            heuristic_kinds['curated'] += 1
        elif f.get('addr') in pattern_names:
            # V0.13 pattern suggestion (regex match disasm, lower than curated)
            raw_name = pattern_names[f['addr']]
            f['_is_heuristic'] = False
            f['_is_curated'] = False
            f['_is_pattern'] = True
            heuristic_kinds['pattern'] += 1
        else:
            # V0.10: Apply helper-naming heuristic (ADR-010)
            heuristic_name, _ = suggest_v010_name(f)
            if heuristic_name is not None:
                raw_name = heuristic_name
                f['_is_heuristic'] = True
                f['_is_curated'] = False
                f['_is_pattern'] = False
                tier = heuristic_name.split('_', 1)[0]
                heuristic_kinds[tier] += 1
            else:
                raw_name = f['name']
                f['_is_heuristic'] = False
                f['_is_curated'] = False
                f['_is_pattern'] = False
                heuristic_kinds['none'] += 1
        name = sanitize_name(raw_name)
        # Handle collisions
        if name in used_names:
            used_names[name] += 1
            name = f'{name}_{used_names[name]}'
        else:
            used_names[name] = 1
        f['_ts_name'] = name
        output_funcs.append(f)

    # V0.10 + V0.12 summary
    print(f'  V0.10+V0.12 helper/curated naming:', file=sys.stderr)
    for kind, n in heuristic_kinds.items():
        print(f'    {kind:10s}: {n}', file=sys.stderr)

    # 1. functions.ts (main barrel + per-CPU split)
    print(f'  emitting TS files...', file=sys.stderr)

    # 1a. functions/arm9.ts
    arm9_path = os.path.join(NDS_DIR, 'functions', 'arm9.ts')
    with open(arm9_path, 'w', encoding='utf-8') as g:
        g.write(emit_header('arm9.ts', f'ARM9 subset ({sum(1 for f in output_funcs if f["cpu"]=="arm9")} entries)'))
        g.write(emit_arm9_chunk(output_funcs))
    print(f'  wrote {arm9_path}', file=sys.stderr)

    # 1b. functions/arm7.ts
    arm7_path = os.path.join(NDS_DIR, 'functions', 'arm7.ts')
    with open(arm7_path, 'w', encoding='utf-8') as g:
        g.write(emit_header('arm7.ts', f'ARM7 subset ({sum(1 for f in output_funcs if f["cpu"]=="arm7")} entries)'))
        # ARM7 emit (reuse structure, just filter)
        lines = []
        for f in output_funcs:
            if f['cpu'] != 'arm7':
                continue
            name = f['_ts_name']
            cat = f.get('category', 'unknown')
            conf = f['confidence']
            known = f.get('is_known', False)
            n_callers = f.get('callers_n', 0) or 0
            is_heuristic = f.get('_is_heuristic', False)
            is_curated = f.get('_is_curated', False)
            is_pattern = f.get('_is_pattern', False)
            heuristic_kind_name = None
            if is_heuristic and name.startswith(('sfloat_', 'util_', 'helper_')):
                heuristic_kind_name = name.split('_', 1)[0]
            jsdoc = f'''/**
 * ARM7 函数 @ 0x{int(f["addr"], 16):08x}
 * @category {cat}
 * @confidence {conf}
'''
            if known:
                jsdoc += f' * @known V0.4 named\n'
            if is_curated:
                jsdoc += f' * @curated V0.12 manually named\n'
            if is_pattern:
                jsdoc += f' * @pattern V0.13 auto-detected\n'
            if heuristic_kind_name:
                jsdoc += f' * @heuristic {heuristic_kind_name} (V0.10 ADR-010)\n'
            if n_callers > 0:
                jsdoc += f' * @callers {n_callers}\n'
            jsdoc += ' */\n'
            lines.append(jsdoc + f'export const {name} = 0x{int(f["addr"], 16):08x} as const;\n')
        g.write(''.join(lines))
    print(f'  wrote {arm7_path}', file=sys.stderr)

    # 1c. functions/known.ts (V0.4 already-named functions only)
    known_path = os.path.join(NDS_DIR, 'functions', 'known.ts')
    with open(known_path, 'w', encoding='utf-8') as g:
        known_funcs = [f for f in output_funcs if f.get('is_known', False)]
        g.write(emit_header('known.ts', f'V0.4 known names only ({len(known_funcs)} entries)'))
        lines = []
        for f in known_funcs:
            name = f['_ts_name']
            addr = int(f['addr'], 16)
            jsdoc = f'''/**
 * Known V0.4 named function @ 0x{addr:08x}
 * @cpu {f.get("cpu", "?")}
 * @category {f.get("category", "?")}
 */
'''
            lines.append(jsdoc + f'export const {name} = 0x{addr:08x} as const;\n')
        g.write(''.join(lines))
    print(f'  wrote {known_path}', file=sys.stderr)

    # 2. addresses.ts (公共固定地址常量)
    address_path = os.path.join(NDS_DIR, 'addresses.ts')
    with open(address_path, 'w', encoding='utf-8') as g:
        g.write(emit_header('addresses.ts', '公共固定地址常量 (entry points / bank boundaries / IRQ vectors)'))
        g.write('''/**
 * NDS ROM 二进制加载地址 + 大小常量
 */
export const ROM_BASE = 0x00000000;
export const ROM_SIZE = 8 * 1024 * 1024;  // 8 MiB (small NDS ROM)

/**
 * ARM9 binary (1 MiB) — V0.3 提取的 main game logic
 */
export const ARM9_LOAD = 0x02000000 as const;
export const ARM9_DST  = 0x02008000 as const;  // BIOS 默认 load + 跳转地址
export const ARM9_SIZE = 0x00100000 as const;  // 1 MiB

/**
 * ARM7 binary (256 KiB) — V0.7 推断为 stub-only
 */
export const ARM7_LOAD = 0x02380000 as const;
export const ARM7_DST  = 0x02380000 as const;
export const ARM7_SIZE = 0x00040000 as const;  // 256 KiB

/**
 * Cart Header — 16 KB at ROM start
 */
export const CART_HEADER_SIZE = 0x4000 as const;
export const CART_GAME_TITLE  = 'ESUDOKUDS';
export const CART_GAME_CODE   = 'AZIP';
export const CART_MAKER_CODE  = 'G9';

/**
 * Bank 范围 — PRG 16 KB per bank
 */
export const PRG_BANK_SIZE  = 0x00004000 as const;  // 16 KiB
export const CHR_BANK_SIZE  = 0x00002000 as const;  // 8 KiB (NDS no CHR, 仅供 reference)
export const PRG_ROM_BANKS  = 0x100000 / PRG_BANK_SIZE;  // ARM9 / 16 KB = 64 banks
export const ARM9_BANKS     = 0x100000 / PRG_BANK_SIZE;
export const ARM7_BANKS     = 0x40000 / PRG_BANK_SIZE;

/**
 * 软浮点 lib region (V0.4 ADR-005)
 */
export const SOFTFLOAT_BASE = 0x0204c000 as const;
export const SOFTFLOAT_END  = 0x0204e000 as const;

/**
 * Stack / IRQ / Bus 约定
 */
export const ARM9_STACK_TOP = 0x023ff000 as const;  // BIOS 默认 stack
export const ARM9_STACK_SIZE = 0x00020000 as const;
export const IRQ_VBLANK_BIT = 0x00000001 as const;
export const IRQ_HBLANK_BIT = 0x00000002 as const;
export const IRQ_VCOUNT_BIT = 0x00000004 as const;
export const IRQ_TIMER0_BIT = 0x00000008 as const;
export const IRQ_KEYPAD_BIT = 0x00000010 as const;
export const IRQ_IPC_SYNC_BIT = 0x00010000 as const;

/**
 * Memory-mapped IO registers (32-bit aligned)
 */
export const IO_REG_BASE       = 0x04000000 as const;
export const IO_DISPCNT        = 0x04000000 as const;
export const IO_VCOUNT         = 0x04000006 as const;
export const IO_KEYINPUT       = 0x04000130 as const;
export const IO_IPC_FIFO_SEND  = 0x04000188 as const;
export const IO_IPC_FIFO_RECV  = 0x0400018c as const;
export const IRQ_ENABLE        = 0x04000208 as const;
export const IRQ_REQUEST       = 0x04000210 as const;
export const IPC_FIFO_CR       = 0x04000184 as const;

/**
 * VRAM / OAM regions
 */
export const VRAM_BASE       = 0x06800000 as const;
export const VRAM_SIZE       = 0x00400000 as const;  // 4 MiB
export const OAM_BASE        = 0x07000000 as const;
export const OAM_SIZE        = 0x00001000 as const;  // 4 KiB
export const PALETTE_BASE    = 0x05000000 as const;
export const PALETTE_SIZE    = 0x00000800 as const;  // 2 KiB
''')
    print(f'  wrote {address_path}', file=sys.stderr)

    # 3. types.ts
    types_path = os.path.join(NDS_DIR, 'types.ts')
    with open(types_path, 'w', encoding='utf-8') as g:
        g.write(emit_header('types.ts', 'TypeScript 类型定义 (CPU / 函数 confidence / category / heuristic 枚举)'))
        g.write('''/**
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
''')
    print(f'  wrote {types_path}', file=sys.stderr)

    # 4. data.json (raw records for runtime iteration)
    data_json_path = os.path.join(NDS_DIR, 'function-records.json')
    with open(data_json_path, 'w', encoding='utf-8') as g:
        records = []
        for f in output_funcs:
            record = {
                'addr': int(f['addr'], 16),
                'name': f['_ts_name'],
                'cpu': f['cpu'],
                'mode': f.get('mode', 'arm'),
                'is_known': f.get('is_known', False),
                'is_curated': f.get('_is_curated', False),
                'is_heuristic': f.get('_is_heuristic', False),
                'category': f.get('category', 'unknown'),
                'confidence': f['confidence'],
                'callers_n': f.get('callers_n'),
            }
            # include heuristic_kind only when is_heuristic=true
            if record['is_heuristic']:
                ts_name = f['_ts_name']
                if ts_name.startswith(('sfloat_', 'util_', 'helper_')):
                    record['heuristic_kind'] = ts_name.split('_', 1)[0]
            records.append(record)
        json.dump(records, g, indent=2)
    print(f'  wrote {data_json_path}', file=sys.stderr)

    # 5. index.ts (barrel re-export)
    index_path = os.path.join(NDS_DIR, 'index.ts')
    with open(index_path, 'w', encoding='utf-8') as g:
        g.write(emit_header('index.ts', 'barrel re-export (主入口)'))
        g.write('''export * as ARM9 from './functions/arm9';
export * as ARM7 from './functions/arm7';
export * as Known from './functions/known';
export * as Addr from './addresses';
export * from './types';
''')
    print(f'  wrote {index_path}', file=sys.stderr)

    # 6. README.md in utils/nds/
    readme_path = os.path.join(NDS_DIR, 'README.md')
    with open(readme_path, 'w', encoding='utf-8') as g:
        g.write(f'''# NDS TypeScript 桥接 (V0.9)

TypeScript 端桥接 — 把 V0.8 逆向工程的 NDS 函数表 + 地址常量 翻译为 stable TS 引用.

## 文件结构

```
utils/nds/
├── addresses.ts              # 公共固定地址常量 (entry / bank / IO register)
├── functions/
│   ├── arm9.ts             # ARM9 subset ({sum(1 for f in output_funcs if f["cpu"]=="arm9")} entries)
│   ├── arm7.ts             # ARM7 subset ({sum(1 for f in output_funcs if f["cpu"]=="arm7")} entries)
│   └── known.ts            # V0.4 already-named ({sum(1 for f in output_funcs if f.get("is_known"))} entries)
├── types.ts                  # 共用类型定义 (Cpu / Confidence / FuncCategory / FunctionRecord)
├── index.ts                  # barrel re-export
├── function-records.json     # 2181 records (runtime iteration 用)
└── README.md
```

## 用法

### 直接引用 (preferred)

```typescript
import {{ ARM9 }} from './utils/nds';

// 在业务代码中直接用名称 (V0.4 known)
ARM9.vec2_set_inline    // 0x02028434
ARM9.vec3_dot_product   // 0x02039f4c

// auto-generated
ARM9.sub_02039f38       // 0x02039f38 (vec3_normalize)
```

### Type safe signature

```typescript
import {{ arm9_addr }} from './utils/nds/functions/arm9';
// 自动推导的 union type: 0x02028434 | 0x02039f4c | 0x02039f38 | ...
// 用于函数签名: 接受已知 addr literal, 拒绝随机 integer
function myWrapper(addr: typeof arm9_addr): void {{ ... }}
```

### 运行时查找

```typescript
import records from './utils/nds/function-records.json';

const fn = records.find(r => r.addr === 0x02039f4c);
if (fn?.confidence === 'high') {{
  console.log(`High confidence function: ${{fn.name}}`);
}}
```

### 排除 data_target

```typescript
import {{ ARM9, Confidence }} from './utils/nds';

// ARM9 包含 data_target — caller 应该过滤
const safeFn = (name: keyof typeof ARM9) => {{
  // 由 import 等价于 known function table, 可在 type 系统辅助下排除 excluded
}};
```

## 何时重新生成

```bash
# 1. 重跑 V0.8 检测
python scripts/detect_functions.py

# 2. 重生成 TS bridge
python scripts/generate_ts_functions.py

# 3. 验证 TS 编译
npx tsc --noEmit
```
''')
    print(f'  wrote {readme_path}', file=sys.stderr)

    # 7. src/types files: 将公共 enum / const 抽成 src/types/ files for cross-import
    print(f'\n== V0.10 done ==', file=sys.stderr)
    print(f'  generated {len(output_funcs)} function entries', file=sys.stderr)
    print(f'  output dir: {NDS_DIR}', file=sys.stderr)


if __name__ == '__main__':
    main()
