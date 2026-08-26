import re

with open(r'docs/roms/opening-all/opening-all.log', 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

# 看每个 $2001=0x00 写入的上下文 (前 5 行)
target_frames = [8, 272, 473, 638, 685, 741, 881, 1524, 1544, 1756, 2003, 2017, 2053,
                 2396, 2428, 2453, 2455, 2695, 2865, 2883, 4337]

for tf in target_frames:
    for i, ln in enumerate(lines):
        m_fr = re.match(r'^f(\d+)\s', ln)
        if m_fr and int(m_fr.group(1)) == tf and 'STA $2001' in ln:
            # print 8 lines around
            lo = max(0, i-3)
            hi = min(len(lines), i+3)
            print(f'--- F{tf} ---')
            for j in range(lo, hi):
                print(f'  L{j}: {lines[j].rstrip()[:140]}')
            print()
            break
