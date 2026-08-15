# -*- coding: utf-8 -*-
"""Probe: find mode-table refs + SJIS mode names."""
import os, re

BASE = os.path.dirname(os.path.abspath(__file__))
DIS = os.path.join(BASE, 'arm9-full.dis.txt')
BIN = r'd:\studio\github\monkeycode\src\nds\picpic\roms\extracted\_system\arm9.bin'
OUT = os.path.join(BASE, '_mode_report5.txt')

lines = open(DIS, encoding='utf-8', errors='replace').read().splitlines()
out = []
keys = ['2034b88', '2034de4', '34b88', '34de4', '34d8c', '34ba0', '34bc0', '34be0', '34c00',
        '34c20', '34c40', '34c60', '34c80', '34ca0', '34cc0', '34ce0', '34d00', '34d20',
        '34d40', '34d60', '34d80', '34da0', '34dc0', '34de0']
for i, ln in enumerate(lines):
    low = ln.lower()
    for k in keys:
        if k in low:
            out.append((i + 1, ln))
            break

# SJIS mode names
data = open(BIN, 'rb').read()
text = data.decode('cp932', errors='ignore')
kat = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポァィゥェォッャュョー'
hira = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん'
patt = re.compile('[' + re.escape(kat + hira) + 'ー・ぁぃぅぇぉゎっゃゅょ]{2,}')
seen = set()
with open(OUT, 'w', encoding='utf-8') as f:
    f.write('==== DISASM REFS ====\n')
    for n, t in out:
        f.write(f'{n}\t{t}\n')
    f.write('==== SJIS STRINGS ====\n')
    for m in patt.finditer(text):
        t = m.group()
        if t in seen or len(t) < 2:
            continue
        seen.add(t)
        f.write(f'{hex(m.start())}\t{t}\n')
print('done', len(out))
