"""
Convert NES .pal (save-state palette) to JSON.
.pal format: 64 colors × 3 bytes (R, G, B), each byte 0-255.
Usually sourced from emulator save states (e.g., FCEUX).
"""
import json
import os
import sys

def pal_to_json(pal_path: str, output_path: str):
    with open(pal_path, 'rb') as f:
        data = f.read()
    
    count = len(data) // 3
    colors = []
    hex_colors = []
    
    for i in range(count):
        r = data[i * 3]
        g = data[i * 3 + 1]
        b = data[i * 3 + 2]
        colors.append([r, g, b])
        hex_colors.append(f"#{r:02X}{g:02X}{b:02X}")
    
    output = {
        "description": "NES master palette (64 colors) converted from tsubasanes.pal (FCEUX save-state palette)",
        "size": count,
        "colors_rgb": colors,
        "colors_hex": hex_colors
    }
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2)
    
    print(f"Converted {count} colors → {output_path}")

if __name__ == '__main__':
    pal_path = r"D:\studio\github\monkeycode\src\nes\tsubasa\src\legacy\romdata\tsubasanes.pal"
    output_path = r"d:\studio\github\monkeycode\src\nes\tsubasa\tsubasa1-h5\public\nes_palette.json"
    
    if len(sys.argv) >= 3:
        pal_path = sys.argv[1]
        output_path = sys.argv[2]
    
    pal_to_json(pal_path, output_path)
