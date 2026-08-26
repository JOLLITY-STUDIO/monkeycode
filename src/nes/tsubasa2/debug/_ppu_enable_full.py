import re

with open(r'docs/roms/opening-all/opening-all.log', 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

# 找包含 STA $2000/STA $2001 的前后行，确认写入值
print('=== STA $2000 with context ===')
for i, ln in enumerate(lines):
    if 'STA' in ln and '$2000' in ln and 'STA $2000' in ln:
        # 找前 5 行查 A register loading
        ctx = ''.join(lines[max(0,i-15):i+1])
        # extract last A=X value
        m_a = re.findall(r'A:([0-9A-Fa-f]{2})', ctx)
        m_fr = re.match(r'^[^\d]*f?(\d+)', ln)
        fr = m_fr.group(1) if m_fr else '?'
        last_a = m_a[-1] if m_a else '?'
        print(f'  frame={fr} PC=bank+$2000 A_reg_before={last_a}')

print()
print('=== STA $2001 with A reg ===')
for i, ln in enumerate(lines):
    if 'STA $2001' in ln:
        ctx = ''.join(lines[max(0,i-15):i+1])
        m_a = re.findall(r'A:([0-9A-Fa-f]{2})', ctx)
        m_fr = re.match(r'^[^\d]*f?(\d+)', ln)
        fr = m_fr.group(1) if m_fr else '?'
        last_a = m_a[-1] if m_a else '?'
        print(f'  frame={fr} A={last_a}')
