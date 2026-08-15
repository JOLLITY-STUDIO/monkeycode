p = r'd:\studio\github\monkeycode\src\nds\picpic\disasm\mode-init-analysis.txt'
lines = open(p, 'r', encoding='utf-8').readlines()
for i, line in enumerate(lines):
    if '0x02053BF4' in line or '0x0205418C' in line or '0x02055BC8' in line or '0x0205113C' in line:
        start = max(0, i - 20)
        end = min(len(lines), i + 80)
        print('---', line.strip(), '---')
        for l in lines[start:end]:
            print(l, end='')
        print()
