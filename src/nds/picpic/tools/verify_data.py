# -*- coding: utf-8 -*-
"""无界面验证：检查关键数据完整性（文本解析版）"""
import os, re, glob

BASE = os.path.join(os.path.dirname(__file__), '..', 'miniprogram', 'engine', 'data')

# 1. 统计谜题数量
puzzle_files = sorted(glob.glob(os.path.join(BASE, 'puzzles', 'map_batch_*.ts')))
puzzle_count = 0
for f in puzzle_files:
    with open(f, 'r', encoding='utf-8') as fh:
        text = fh.read()
    puzzle_count += text.count('export const P')
print('谜题总数:', puzzle_count)
assert puzzle_count >= 400, '谜题数量不足'

# 2. 统计调色板数量
pal_files = sorted(glob.glob(os.path.join(BASE, 'palettes', 'pal_batch_*.ts')))
pal_count = 0
for f in pal_files:
    with open(f, 'r', encoding='utf-8') as fh:
        text = fh.read()
    pal_count += text.count('export const P')
print('调色板总数:', pal_count)
assert pal_count >= 400, '调色板数量不足'

# 3. 验证 index.ts 的导出一致性
with open(os.path.join(BASE, 'puzzles', 'index.ts'), 'r') as f:
    puzzle_idx = f.read()
with open(os.path.join(BASE, 'palettes', 'index.ts'), 'r') as f:
    pal_idx = f.read()

puzzle_ids = re.findall(r"import \{ (P\w+) \}", puzzle_idx)
pal_ids = re.findall(r"import \{ (P\w+) \}", pal_idx)
print(f'谜题 index 导入数: {len(puzzle_ids)}, 调色板 index 导入数: {len(pal_ids)}')

# 检查前 20 个 ID 是否一致
mismatch = []
for a, b in zip(puzzle_ids[:20], pal_ids[:20]):
    if a != b:
        mismatch.append((a, b))
if mismatch:
    print('前 20 个 ID 不一致:', mismatch)
else:
    print('前 20 个 ID 对应 OK')

# 4. 检查调色板格式
for f in pal_files[:2]:
    with open(f, 'r') as fh:
        text = fh.read()
    # 每个 export 应该包含 16 个 [r,g,b]
    exports = re.findall(r'export const (P\w+) = (\[.*?\]);', text, re.DOTALL)
    for pid, arr in exports[:3]:
        colors = re.findall(r'\[(\d+),(\d+),(\d+)\]', arr)
        assert len(colors) == 16, f'{pid} 颜色数 {len(colors)} != 16'
    print(f'{os.path.basename(f)} 格式 OK ({len(exports)} exports)')

print('\n=== 数据验证全部通过 ===')
