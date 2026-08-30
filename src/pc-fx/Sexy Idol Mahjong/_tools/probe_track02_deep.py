import os, struct
BASE = r'd:\studio\github\monkeycode\src\pc-fx\Sexy Idol Mahjong\_tools\extracted\track_data\track_02'
ud_path = os.path.join(BASE, 'user_data.bin')

with open(ud_path, 'rb') as f:
    ud = f.read()
print('user_data size:', len(ud))

# 1) 找所有大块 ASCII 日文 (Shift-JIS) 文本段 — 剧本对话区
def find_text_runs(data, min_len=64):
    out = []
    i = 0
    n = len(data)
    while i < n:
        if data[i] == 0:
            i += 1
            continue
        # shift-jis lead byte range 0x81-0xFC, trail 0x40-0xFC
        run_start = i
        while i < n:
            b = data[i]
            if 0x81 <= b <= 0xFC:
                if i+1 < n and 0x40 <= data[i+1] <= 0xFC and data[i+1] != 0:
                    i += 2
                    continue
            if b == 0x00:
                break
            if b < 0x20 and b not in (0x0A, 0x0D, 0x09):
                break
            i += 1
        if i - run_start >= min_len:
            out.append((run_start, i - run_start))
        i += 1
    return out

runs = find_text_runs(ud, 256)
print(f'\ntext runs (>=256 byte): {len(runs)}')
for off, ln in runs[:30]:
    sample = ud[off:off+min(80, ln)].replace(b'\x00', b'.')
    print(f'  0x{off:08X} +{ln:6d}: {sample!r}')

# 2) 找魔数
print('\n=== 字节签名扫描 ===')
sigs = {
    'ADP\0': b'ADP\x00',
    'ADP\x01': b'ADP\x01',
    'ADP2': b'ADP2',
    'ARC\0': b'ARC\x00',
    'ARCD': b'ARCD',
    'HUD1': b'HUD1',
    'HUD\0': b'HUD\x00',
    'PI\x00': b'PI\x00',
    'PEA ': b'PEA ',
    'PMF ': b'PMF ',  # Sega/PS video
    'MPEG': b'\x00\x00\x01\xB0',  # MPEG video
    'BM': b'BM',
    'PNG': b'\x89PNG',
    'JFIF': b'\xFF\xD8\xFF',
    'XING': b'Xing',
    'RIFF': b'RIFF',
    'RIFX': b'RIFX',
    'BIG': b'\x01BIG',  # Hudson big
    'GPC': b'GPC',
    'CPI': b'CPI',
    'DAT': b'DAT',
    'IDX': b'IDX',
    'PCM ': b'PCM ',
    'WAVE': b'WAVE',
    'ADPCM': b'ADPCM',
}
for name, sig in sigs.items():
    pos = 0
    cnt = 0
    while True:
        p = ud.find(sig, pos)
        if p < 0:
            break
        cnt += 1
        if cnt <= 3:
            try:
                ctx = ud[max(0,p-4):p+24].hex(' ')
                print(f'  {name} @ 0x{p:08X} ctx: {ctx}')
            except Exception as e:
                print(f'  {name} @ 0x{p:08X}')
        pos = p + 1
        if cnt > 100:
            print(f'  {name}: too many (>100)')
            break
    if cnt:
        print(f'  {name}: total {cnt} occurrences')

# 3) 4-byte 重复魔数扫
print('\n=== 3-byte ngrams (>=20 reps) ===')
from collections import Counter
ctr = Counter()
for i in range(0, len(ud)-2):
    a, b, c = ud[i], ud[i+1], ud[i+2]
    if a < 0x20 and b < 0x20 and c < 0x20:
        continue
    ctr[ud[i:i+3]] += 1
for ng, ct in ctr.most_common(20):
    if ct >= 20:
        print(f'  {ng.hex():8s}  ct={ct}  ascii={ng!r}')
