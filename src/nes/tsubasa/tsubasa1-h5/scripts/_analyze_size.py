"""分析项目大小"""
import os

base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 只看真正的游戏源码（排除临时文件、脚本、测试）
cat_sizes = {
    'chr_ts_data': 0,      # src/data/chr/*.ts
    'sprites_png': 0,       # public/sprites/*.png
    'game_logic_ts': 0,     # src/engine, src/core, src/renderer, etc
    'pages_etc': 0,         # pages/, app.*, etc
    'other_ts': 0,
    'json_config': 0,
    'notes_docs': 0,
}

for root, dirs, files in os.walk(base):
    # 跳过不需要的目录
    skip = False
    for skip_dir in ['.git', '_tmp_disasm_out', 'scripts', 'tests', '.codebuddy', '__pycache__', 'node_modules']:
        if skip_dir in root.replace('\\', '/').split('/'):
            skip = True
            break
    if skip:
        continue

    for f in files:
        fp = os.path.join(root, f)
        size = os.path.getsize(fp)
        rel = os.path.relpath(fp, base).replace('\\', '/')

        if 'src/data/chr' in rel and f.endswith('.ts'):
            cat_sizes['chr_ts_data'] += size
        elif f.endswith('.png'):
            cat_sizes['sprites_png'] += size
        elif f.endswith('.ts') and ('engine' in rel or 'core' in rel or 'renderer' in rel or 'cache' in rel or 'model' in rel or 'view' in rel or 'input' in rel or 'utils' in rel or 'platform' in rel):
            cat_sizes['game_logic_ts'] += size
        elif f.endswith('.ts'):
            cat_sizes['other_ts'] += size
        elif f.endswith('.json') or f.endswith('.wxss') or f.endswith('.wxml'):
            cat_sizes['json_config'] += size
        elif f.endswith('.md') or f.endswith('.txt'):
            cat_sizes['notes_docs'] += size

total = sum(cat_sizes.values())
print(f'=== 游戏源码大小分析（排除 _tmp_disasm_out / scripts / tests）===')
print(f'总大小: {total/1024:.1f} KB ({total/1024/1024:.2f} MB)')
print()
for k, v in sorted(cat_sizes.items(), key=lambda x: -x[1]):
    pct = v / total * 100 if total > 0 else 0
    print(f'  {k:20s}: {v/1024:8.1f} KB  ({pct:5.1f}%)')

# 详细看 chr 数据
print('\n=== CHR 数据文件详情 ===')
chr_dir = os.path.join(base, 'src', 'data', 'chr')
if os.path.isdir(chr_dir):
    for f in sorted(os.listdir(chr_dir)):
        fp = os.path.join(chr_dir, f)
        sz = os.path.getsize(fp)
        print(f'  {f:35s}: {sz/1024:6.1f} KB  ({sz} bytes)')
