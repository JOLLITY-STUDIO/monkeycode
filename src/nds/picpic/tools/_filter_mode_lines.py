import re
p = r'd:\studio\github\monkeycode\src\nds\picpic\disasm\mode-init-analysis.txt'
txt = open(p, 'r', encoding='utf-8').read()
for line in txt.splitlines():
    if '>>> LOADS' in line or '>>> JUMP' in line or '=== ' in line or 'cmp' in line or 'bne' in line or 'beq' in line:
        print(line)
