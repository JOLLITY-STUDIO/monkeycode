#!/usr/bin/env python3
"""
将 nes_palette.json (FCEUX真实调色板) 转换为 TypeScript 常量 NES_PALETTE
用法:
    python scripts/convert_palette.py
"""
import json
import os
from pathlib import Path

def main():
    script_dir = Path(__file__).parent
    project_dir = script_dir.parent
    
    palette_json_path = project_dir / 'public' / 'nes_palette.json'
    types_ts_path = project_dir / 'src' / 'core' / 'types.ts'
    
    # 读取 JSON 调色板
    with open(palette_json_path, 'r', encoding='utf-8') as f:
        palette_data = json.load(f)
    
    colors_hex = palette_data['colors_hex']
    
    # 转换 "#RRGGBB" → "0xRRGGBB"
    hex_values = []
    for h in colors_hex:
        # h is like "#757575"
        h_stripped = h.lstrip('#')
        hex_values.append(f'0x{h_stripped}')
    
    # 生成 4 行 × 16 列的格式化数组
    lines = []
    for row_start in range(0, 64, 16):
        row_items = hex_values[row_start:row_start + 16]
        lines.append('  ' + ', '.join(row_items) + ',')
    
    palette_array_text = '\n'.join(lines)
    
    print("=== 生成的 NES_PALETTE 数组 ===")
    print(f'export const NES_PALETTE: number[] = [')
    print(palette_array_text)
    print(f'];')
    print(f"\n共 {len(hex_values)} 个颜色")
    
    # 对比差异
    print("\n=== 与当前 types.ts 的差异 ===")
    # 读取当前 types.ts
    with open(types_ts_path, 'r', encoding='utf-8') as f:
        current_types = f.read()
    
    # 提取当前的 NES_PALETTE
    import re
    match = re.search(r'export const NES_PALETTE: number\[\] = \[(.*?)\];', current_types, re.DOTALL)
    if match:
        current_hex_str = match.group(1)
        current_hexes = re.findall(r'0x([0-9A-Fa-f]{6})', current_hex_str)
        
        diff_count = 0
        for i in range(min(64, len(current_hexes))):
            cur = f"0x{current_hexes[i].upper()}"
            new = hex_values[i].upper()
            if cur != new:
                print(f"  [{i:02d}] 当前={cur}  实际={new}")
                diff_count += 1
        
        if diff_count == 0:
            print("  完全相同，无需更新")
        else:
            print(f"\n  共 {diff_count}/64 个颜色有差异")
    
    return hex_values

if __name__ == '__main__':
    main()
