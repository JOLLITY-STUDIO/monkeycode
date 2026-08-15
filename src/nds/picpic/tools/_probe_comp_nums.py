# -*- coding: utf-8 -*-
"""探针2：列出 lap_comp/fap_comp/map_comp 中实际存在的 *NNN* 编号集合。"""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from ndsrom import NdsRom

rom = NdsRom()
dirs, tables, names = rom.fnt_parse()

def find_dir_id(dname):
    for did, n in names.items():
        if n.lower() == dname.lower():
            return did
    return None

for d in ['lap_comp', 'fap_comp', 'map_comp']:
    did = find_dir_id(d)
    files, _ = tables[did]
    nums = {}
    for _, name in files:
        m = re.match(r'([a-z])(\d{3})', name)
        if m:
            nums.setdefault(m.group(2), set()).add(m.group(1))
    n = sorted(nums.keys())
    print('=== %s: files=%d unique nums=%d range=%s..%s' % (d, len(files), len(n), n[0] if n else '-', n[-1] if n else '-'))
    # 缺失编号
    if n:
        full = set('%03d' % i for i in range(1, int(n[-1]) + 1))
        missing = sorted(full - set(n))
        print('   missing nums:', missing if missing else 'NONE')
    # pc.NCLR 数量
    nclr = [x for x in files if x[1].endswith('_pc.NCLR')]
    print('   _pc.NCLR count:', len(nclr))
    # 前 3 个文件
    print('   first files:', [x[1] for x in files[:6]])
