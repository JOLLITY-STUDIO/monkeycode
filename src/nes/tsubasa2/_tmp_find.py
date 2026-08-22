import glob

files = ['asm/bank30/_full.s']
targets = ['CD3C', 'CE08', 'CF72', 'F30F']

for f in files:
    lines = open(f, encoding='utf-8', errors='ignore').readlines()
    for i, l in enumerate(lines):
        for t in targets:
            # 查找 ; $XXXX 注释 (地址标签或跳转目标)
            if ('; $' + t) in l:
                print(f, i + 1, repr(l.rstrip('\n')))
