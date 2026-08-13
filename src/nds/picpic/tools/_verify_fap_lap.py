# -*- coding: utf-8 -*-
"""验证 .fap / .lap 文件格式是否与 .map 一致"""
import sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ndsrom import NdsRom

rom = NdsRom()
dirs, tables, names = rom.fnt_parse()

def check(dir_id, ext):
    files, _ = tables[dir_id]
    ok, bad = 0, 0
    samples = []
    badlist = []
    for idx, (pos, n) in enumerate(files):
        if not n.lower().endswith(ext):
            continue
        fid = dirs[dir_id]['first_file'] + idx
        data = rom.read_file(fid)
        if len(data) < 6:
            bad += 1
            badlist.append((n, 'tiny', len(data)))
            continue
        h, w = data[0], data[1]
        body = data[6:]
        expect = math.ceil(h * w / 2)
        if len(body) == expect:
            ok += 1
            if len(samples) < 3:
                samples.append((n, h, w, len(data)))
        else:
            bad += 1
            if len(badlist) < 5:
                badlist.append((n, h, w, len(body), expect, len(data)))
    print('=== dir %d %s: %s files ok=%d bad=%d ===' % (dir_id, names.get(dir_id), ext, ok, bad))
    for s in samples:
        print('  sample:', s)
    for b in badlist:
        print('  BAD:', b)

check(19, '.map')
check(5, '.fap')
for i in (10, 11, 12, 13, 14):
    check(i, '.lap')

# 汇总 lap 总数
total_lap = 0
for i in (10, 11, 12, 13, 14):
    files, _ = tables[i]
    total_lap += sum(1 for _, n in files if n.lower().endswith('.lap'))
print('LAP 总数:', total_lap)
