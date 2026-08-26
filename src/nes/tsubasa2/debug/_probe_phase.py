#!/usr/bin/env python
import re
NAMES = {
    'aftertecmo/tsubasa-when-showfirsttextscript-820-1047-第一次介绍大空翼结束.log': (820, 1047),
    'aftertecmo/tsubasa-when-showfirsttextscript-820-tsubasa-tx.log': (820, 1500),
    'aftertecmo/tsubasa-when-show380-逐帧.log': (1, 410),
    'aftertecmo/tsubasa-when-show274-275.log': (200, 380),
    'aftertecmo/tsubasa1045.log': (1, 1045),
    'opening-all/opening-all.log': (1, 5000),
    'rixiang/rixiang-1492-end.log': (1400, 5000),
    'rixiang/rixiang-1492-1725end.log': (1400, 1725),
    'tecmo/13.log': (1, 30),
}

import os
for path, (lo, hi) in NAMES.items():
    full = os.path.join('docs/roms', path)
    if not os.path.exists(full):
        print(f'>>> {path}: MISSING')
        continue
    seen = set()
    banks = set()
    samples = {}
    with open(full, 'r', encoding='utf-8', errors='replace') as f:
        ln_count = 0
        for ln in f:
            ln_count += 1
            m = re.match(r'^f(\d+)\s', ln)
            if not m: continue
            fr = int(m.group(1))
            mb = re.search(r'\$([0-9A-Fa-f]{2}):[0-9A-Fa-f]', ln)
            bank = mb.group(1).upper() if mb else '??'
            banks.add(bank)
            if fr not in seen:
                seen.add(fr)
                samples[fr] = (bank, ln.rstrip()[:220])
    keys = sorted(samples.keys())
    print(f'\n>>> {path}')
    print(f'    lines={ln_count}  frames={min(seen)}..{max(seen)}  banks={sorted(banks)}')
    for k in keys:
        if k in (keys[0], keys[-1], (keys[0]+keys[-1])//2):
            b, l = samples[k]
            print(f'    f{k:5d} bank{b}: {l[:180]}')
