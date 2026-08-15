"""查找 Bank 27 入口 $8104/$81EE 的调用点"""
import os, glob

ASM_DIR = '_tmp_bzk_out'
targets = ['$8104', '$81EE']

for f in sorted(glob.glob(os.path.join(ASM_DIR, 'bank_*.asm'))):
    with open(f, 'r', encoding='utf-8', errors='replace', newline='') as fh:
        raw = fh.read()
    lines = [l.replace('\n', ' ').strip() for l in raw.split('\r')]
    hits = []
    for i, line in enumerate(lines):
        for t in targets:
            if ('JSR' in line or 'JMP' in line) and t in line:
                hits.append((i, line))
    if hits:
        name = os.path.basename(f)
        print('=== %s ===' % name)
        for ln, l in hits[:10]:
            print('  %d: %s' % (ln, l[:110]))
