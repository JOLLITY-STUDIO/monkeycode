#!/usr/bin/env python
import os, re
os.chdir(r'd:\studio\github\monkeycode\src\nes\tsubasa2')
LOG = r'docs/roms/openging-skip-to-title/press-start-to-title.log'
with open(LOG, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

# Find critical events
events = {
    'joypad_read': [],
    'ppu_ctrl_write': [],
    'ppu_mask_write': [],
    'cfg_load_8464': [],
    'scene_id_write_0026': [],
    'sta_0026': [],
    'sta_0027': [],
    'rts_in_bank00_during_processing': [],
    'bank_window_switch': [],
}

for i, ln in enumerate(lines):
    s = ln
    # 1. Joypad: LDA $4016 / LDA $4017
    if re.search(r'LDA \$4016', s) or re.search(r'LDA \$4017', s):
        m = re.match(r'^f(\d+)\s', s)
        fr = int(m.group(1)) if m else -1
        events['joypad_read'].append((i, fr, s.rstrip()[:180]))
    # 2. PPU $2000 write (with detail)
    if re.search(r'\$[0-9A-F]+:2000(?:[^0-9A-F]|$)', s):
        m = re.match(r'^f(\d+)\s', s)
        fr = int(m.group(1)) if m else -1
        events['ppu_ctrl_write'].append((i, fr, s.rstrip()[:180]))
    # 3. PPU $2001 write
    if re.search(r'\$[0-9A-F]+:2001(?:[^0-9A-F]|$)', s):
        m = re.match(r'^f(\d+)\s', s)
        fr = int(m.group(1)) if m else -1
        events['ppu_mask_write'].append((i, fr, s.rstrip()[:180]))
    # 4. CFG load
    if 'JSR $8464' in s:
        m = re.match(r'^f(\d+)\s', s)
        fr = int(m.group(1)) if m else -1
        events['cfg_load_8464'].append((i, fr, s.rstrip()[:180]))
    # 5. Scene id write to $0026 (any access)
    if 'STA $0026' in s or 'LDA $0026' in s or 'INC $0026' in s or 'CMP $0026' in s:
        m = re.match(r'^f(\d+)\s', s)
        fr = int(m.group(1)) if m else -1
        events['scene_id_write_0026'].append((i, fr, s.rstrip()[:180]))
    # 6. STA $0027 (scheduler mode)
    if 'STA $0027' in s or 'LDA $0027' in s:
        m = re.match(r'^f(\d+)\s', s)
        fr = int(m.group(1)) if m else -1
        events['sta_0027'].append((i, fr, s.rstrip()[:180]))
    # 7. Bank window switch via STA $8000/$8001
    if re.search(r'\$\d\d:800[01]\s', s):
        m = re.match(r'^f(\d+)\s', s)
        fr = int(m.group(1)) if m else -1
        events['bank_window_switch'].append((i, fr, s.rstrip()[:180]))

for k, lst in events.items():
    print(f'\n=== {k} (count={len(lst)}) ===')
    for i, fr, s in lst[:25]:
        print(f'  L{i} F{fr}: {s}')
