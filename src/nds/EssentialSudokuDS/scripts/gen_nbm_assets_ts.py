"""
V0.17.1 — 从 nbm-png-manifest.json 生成 miniprogram/utils/sudoku/nbmAssets.ts.

索引所有 miniprogram/assets/nbm/*.nbm.png, 按功能分组 + 常量 URL.
"""
import os
import json
import re

from PIL import Image

WORKSPACE = r'D:\studio\github\monkeycode\src\nds\EssentialSudokuDS'
MANIFEST = os.path.join(WORKSPACE, 'rom-data', 'extracted', 'nbm-png-manifest.json')
OUT_PATH = os.path.join(WORKSPACE, 'miniprogram', 'utils', 'sudoku', 'nbmAssets.ts')

ROOT_PREFIX = '/assets/nbm/'

# select3.nbm 是选项页 sprite sheet: 同一文件内包含多个按钮标签的普通/选中态.
# 这里裁剪出普通态子图, 供 UI 直接引用 (避免 wxss background-position 兼容问题).
SELECT3_SLICES = {
    'select3_clear_normal': (6, 6, 95, 31),
    'select3_rate_normal': (102, 6, 191, 31),
    'select3_se_volume_normal': (6, 70, 127, 95),
    'select3_credits_normal': (6, 134, 95, 159),
    'select3_bgm_volume_normal': (6, 198, 127, 223),
}

# select1.nbm 是数独/图画谜题通用按钮 sprite sheet.
# 数字 0-9 分普通态(light blue)与选中态(dark blue pressed); 右侧还有 Start/Already/User/Cleared/Return 等.
SELECT1_SLICES = {
    # 数字普通态 (light blue)
    'select1_n_0_normal': (134, 6, 158, 30),
    'select1_n_1_normal': (166, 6, 190, 30),
    'select1_n_2_normal': (198, 6, 222, 30),
    'select1_n_3_normal': (230, 6, 254, 30),
    'select1_n_4_normal': (134, 70, 158, 94),
    'select1_n_5_normal': (166, 70, 190, 94),
    'select1_n_6_normal': (198, 70, 222, 94),
    'select1_n_7_normal': (230, 70, 254, 94),
    'select1_n_8_normal': (198, 134, 222, 158),
    'select1_n_9_normal': (230, 134, 254, 158),

    # 数字选中态 (dark blue pressed)
    'select1_n_0_selected': (132, 36, 158, 62),
    'select1_n_1_selected': (164, 36, 190, 62),
    'select1_n_2_selected': (196, 36, 222, 62),
    'select1_n_3_selected': (228, 36, 254, 62),
    'select1_n_4_selected': (132, 100, 158, 126),
    'select1_n_5_selected': (164, 100, 190, 126),
    'select1_n_6_selected': (196, 100, 222, 126),
    'select1_n_7_selected': (228, 100, 254, 126),
    'select1_n_8_selected': (196, 164, 222, 190),
    'select1_n_9_selected': (228, 164, 254, 190),

    # 动作按钮普通态
    'select1_start_normal': (6, 6, 62, 30),
    'select1_cleared_normal': (6, 134, 94, 158),
    'select1_return_normal': (102, 134, 190, 158),

    # 动作按钮选中态
    'select1_start_selected': (4, 36, 62, 62),
    'select1_cleared_selected': (4, 164, 94, 190),
    'select1_return_selected': (100, 164, 190, 190),
}

# select4.nbm 是主菜单模式选择按钮 sheet (128x256).
# 4 行: Number Puzzle(亮蓝底) / Picture Puzzle(深蓝底) × 2 帧动画.
# 帧 A = row0/row1, 帧 B = row2/row3 (按钮内图标/文字有微动画).
SELECT4_SLICES = {
    'select4_number_a': (0, 12, 128, 61),
    'select4_picture_a': (0, 72, 128, 125),
    'select4_number_b': (0, 140, 128, 189),
    'select4_picture_b': (0, 200, 128, 253),
}


def generate_select3_slices() -> list[tuple[str, str]]:
    """Crop select3.nbm into per-button-label PNGs. Returns [(name, relative_path), ...]."""
    src = os.path.join(WORKSPACE, 'miniprogram', 'assets', 'nbm', 'select3.nbm.png')
    if not os.path.exists(src):
        return []
    im = Image.open(src).convert('RGBA')
    generated: list[tuple[str, str]] = []
    for name, (l, t, r, b) in SELECT3_SLICES.items():
        out_name = f'{name}.png'
        out_path = os.path.join(WORKSPACE, 'miniprogram', 'assets', 'nbm', out_name)
        crop = im.crop((l, t, r, b))
        crop.save(out_path)
        generated.append((name, out_name))
    return generated


def generate_select1_slices() -> list[tuple[str, str]]:
    """Crop select1.nbm into digit/action button PNGs. Returns [(name, relative_path), ...]."""
    src = os.path.join(WORKSPACE, 'miniprogram', 'assets', 'nbm', 'select1.nbm.png')
    if not os.path.exists(src):
        return []
    im = Image.open(src).convert('RGBA')
    generated: list[tuple[str, str]] = []
    for name, (l, t, r, b) in SELECT1_SLICES.items():
        out_name = f'{name}.png'
        out_path = os.path.join(WORKSPACE, 'miniprogram', 'assets', 'nbm', out_name)
        crop = im.crop((l, t, r, b))
        crop.save(out_path)
        generated.append((name, out_name))
    return generated


def generate_select4_slices() -> list[tuple[str, str]]:
    """Crop select4.nbm into Number/Picture mode button PNGs. Returns [(name, relative_path), ...]."""
    src = os.path.join(WORKSPACE, 'miniprogram', 'assets', 'nbm', 'select4.nbm.png')
    if not os.path.exists(src):
        return []
    im = Image.open(src).convert('RGBA')
    generated: list[tuple[str, str]] = []
    for name, (l, t, r, b) in SELECT4_SLICES.items():
        out_name = f'{name}.png'
        out_path = os.path.join(WORKSPACE, 'miniprogram', 'assets', 'nbm', out_name)
        crop = im.crop((l, t, r, b))
        crop.save(out_path)
        generated.append((name, out_name))
    return generated


def sanitize(name: str) -> str:
    # strip trailing '.nbm' so constants read like NBM_NUMCLO_WAKU
    base = re.sub(r'\.nbm$', '', name)
    s = re.sub(r'[^a-zA-Z0-9_]', '_', base)
    if re.match(r'^[0-9]', s):
        s = '_' + s
    return s


def main():
    with open(MANIFEST, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    lines: list[str] = []
    lines.append('// AUTO-GENERATED by scripts/gen_nbm_assets_ts.py — DO NOT EDIT')
    lines.append('// NBM decoded resources → miniprogram/assets/nbm PNG URLs')
    lines.append('')

    # individual constants
    entries = manifest.get('entries', [])
    const_by_name: dict[str, str] = {}
    for e in entries:
        const = sanitize(e['name']).upper()
        const_by_name[e['name']] = const
        url = ROOT_PREFIX + e['png']
        lines.append(f"export const NBM_{const} = '{url}';")

    # derived sprites from select3.nbm (options page button labels)
    select3_slices = generate_select3_slices()
    select3_const_by_name: dict[str, str] = {}
    if select3_slices:
        for name, png in select3_slices:
            const = sanitize(name).upper()
            select3_const_by_name[name] = const
            const_by_name[name] = const

    # derived sprites from select1.nbm (sudoku number pad + action buttons)
    select1_slices = generate_select1_slices()
    select1_const_by_name: dict[str, str] = {}
    if select1_slices:
        for name, png in select1_slices:
            const = sanitize(name).upper()
            select1_const_by_name[name] = const
            const_by_name[name] = const

    # derived sprites from select4.nbm (main menu mode buttons)
    select4_slices = generate_select4_slices()
    select4_const_by_name: dict[str, str] = {}
    if select4_slices:
        for name, png in select4_slices:
            const = sanitize(name).upper()
            select4_const_by_name[name] = const
            const_by_name[name] = const

    lines.append('')
    lines.append('/** Full flat list of all 42 NBM assets. */')
    lines.append('export const NBM_ALL = [')
    for e in entries:
        const = const_by_name[e['name']]
        lines.append(f'  NBM_{const},')
    lines.append('];')

    if select3_slices:
        lines.append('')
        lines.append('/** select3.nbm 切片: 选项页按钮标签普通态. */')
        for name, _png in select3_slices:
            const = select3_const_by_name[name]
            url = ROOT_PREFIX + name + '.png'
            lines.append(f"export const NBM_{const} = '{url}';")

    if select1_slices:
        lines.append('')
        lines.append('/** select1.nbm 切片: 数独数字键盘普通态/选中态 + 动作按钮. */')
        for name, _png in select1_slices:
            const = select1_const_by_name[name]
            url = ROOT_PREFIX + name + '.png'
            lines.append(f"export const NBM_{const} = '{url}';")

    if select4_slices:
        lines.append('')
        lines.append('/** select4.nbm 切片: 主菜单模式按钮 (Number/Picture × 2 帧动画). */')
        for name, _png in select4_slices:
            const = select4_const_by_name[name]
            url = ROOT_PREFIX + name + '.png'
            lines.append(f"export const NBM_{const} = '{url}';")

    # functional groups — 按玩法模式区分 (numclo/pazl = picture puzzle, 数独界面禁用)
    groups: dict[str, list[str]] = {}
    for e in entries:
        name = e['name']
        const = const_by_name[name]
        if 'numclo' in name or 'pazl' in name:
            groups.setdefault('PICTURE_PUZZLE', []).append(f'NBM_{const}')
        elif 'select' in name:
            groups.setdefault('MENU_SELECT', []).append(f'NBM_{const}')
        elif 'wireless' in name:
            groups.setdefault('WIRELESS', []).append(f'NBM_{const}')
        elif 'staff' in name:
            groups.setdefault('STAFF', []).append(f'NBM_{const}')
        elif name in ('title.nbm', 'title2.nbm'):
            groups.setdefault('TITLE', []).append(f'NBM_{const}')
        elif name in ('download.nbm', 'dwlogo.nbm', 'license.nbm', 'tutorial_00.nbm', 'usa.nbm', 'setu03.nbm', 'menu_csol.nbm'):
            groups.setdefault('MISC', []).append(f'NBM_{const}')
        else:
            groups.setdefault('OTHER', []).append(f'NBM_{const}')

    # add derived select3 slices to their own group
    for name in select3_const_by_name:
        const = select3_const_by_name[name]
        groups.setdefault('OPTIONS_SLICE', []).append(f'NBM_{const}')

    # add derived select1 slices to menu select group
    for name in select1_const_by_name:
        const = select1_const_by_name[name]
        groups.setdefault('MENU_SELECT', []).append(f'NBM_{const}')

    # add derived select4 slices to menu select group
    for name in select4_const_by_name:
        const = select4_const_by_name[name]
        groups.setdefault('MENU_SELECT', []).append(f'NBM_{const}')

    lines.append('')
    lines.append('/**')
    lines.append(' * 模式资源归属（重要）:')
    lines.append(' *  - Essential Sudoku DS = 数独 number puzzle, 题目数据来自 numple0-9.data.')
    lines.append(' *  - numclo 系 / pazl 系 NBM 是图画谜题 picture puzzle 模式的资源（另一种玩法,')
    lines.append(' *    1:1 还原目标下必须接入, 不是弃用资源; V0.15.2 "wrong format" 标注已修正）.')
    lines.append(' *  - 数独界面禁止引用 PICTURE_PUZZLE 组资源; 该组资源专供 picture puzzle 玩法界面.')
    lines.append(' */')
    lines.append('')
    lines.append('/** 数独模式通用 UI 资源 (菜单/设置/教程/下载/许可/地区). */')
    for gname in ('MISC', 'PICTURE_PUZZLE', 'MENU_SELECT', 'OPTIONS_SLICE', 'STAFF', 'TITLE', 'WIRELESS', 'OTHER'):
        consts = groups.get(gname)
        if not consts:
            continue
        if gname == 'PICTURE_PUZZLE':
            lines.append('/** 图画谜题 (picture puzzle) 模式资源 — 数独界面禁用. */')
        elif gname == 'MENU_SELECT':
            lines.append('/** 数独模式选择界面按钮 (select1/3/4/6). */')
        lines.append(f"export const NBM_GROUP_{gname} = [")
        for c in consts:
            lines.append(f'  {c},')
        lines.append('];')
        lines.append('')

    # helpers
    lines.append('')
    lines.append('/** Resolve an NBM asset URL by its decoded name (without .nbm.bmp/.nbm.png extension). */')
    lines.append('export function nbmUrl(name: string): string | undefined {')
    lines.append('  const constName = `NBM_${name.replace(/[^a-zA-Z0-9_]/g, "_").replace(/\\.nbm$/i, "").toUpperCase()}`;')
    lines.append('  const map: Record<string, string> = {')
    for e in entries:
        const = const_by_name[e['name']]
        lines.append(f"    '{const}': NBM_{const},")
    for name, const in select3_const_by_name.items():
        lines.append(f"    '{const}': NBM_{const},")
    for name, const in select1_const_by_name.items():
        lines.append(f"    '{const}': NBM_{const},")
    for name, const in select4_const_by_name.items():
        lines.append(f"    '{const}': NBM_{const},")
    lines.append('  };')
    lines.append('  return map[constName];')
    lines.append('}')
    lines.append('')

    # summary metadata
    lines.append('/** Summary (total PNG bytes ≈ {0} KB). */'.format(manifest.get('totalKb', '??')))
    lines.append(f"export const NBM_MANIFEST = {{ total: {len(entries)}, totalBytes: {manifest.get('totalBytes', 0)} }};")
    lines.append('')

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    extra = len(select3_slices) + len(select1_slices) + len(select4_slices)
    print(f'Wrote {OUT_PATH} ({len(entries)} entries + {extra} derived slices)')


if __name__ == '__main__':
    main()
