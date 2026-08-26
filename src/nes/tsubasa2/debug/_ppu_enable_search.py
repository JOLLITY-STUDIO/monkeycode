import re

with open(r'docs/roms/opening-all/opening-all.log', 'r', encoding='utf-8', errors='replace') as f:
    data = f.read()

# STA $2000 全部命中
p2000 = [(int(m.group(1)), m.group(0)[:120]) for m in re.finditer(r'^f(\d+)\s.*STA\s\$2000', data, re.M)]
p2001 = [(int(m.group(1)), m.group(0)[:120]) for m in re.finditer(r'^f(\d+)\s.*STA\s\$2001', data, re.M)]

print('=== STA $2000 count:', len(p2000))
for fr, ln in p2000:
    print(f'F{fr}: {ln}')
print()
print('=== STA $2001 count:', len(p2001))
for fr, ln in p2001:
    print(f'F{fr}: {ln}')
print()
# 顺便查 NMI 相关: PPU 状态寄存器读
nmi = re.findall(r'^f(\d+)\s.*BIT\s\$2002', data, re.M)
print('=== BIT $2002 count:', len(nmi))
print('first/last:', nmi[:5], '...', nmi[-5:])
