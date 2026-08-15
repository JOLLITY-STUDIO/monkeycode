p = r'd:\studio\github\monkeycode\src\nds\picpic\disasm\mode-init-analysis.txt'
txt = open(p, 'r', encoding='utf-8').read()
for i, line in enumerate(txt.splitlines()):
    if '0x02055BC8' in line:
        print(i, line)
