"""扫描 Bank 1 寻找实际的音乐序列数据（非指针表）"""
rom = open('_tmp_disasm_out/Captain Tsubasa (Japan).nes', 'rb').read()
bank1_start = 0x4010
bank1_end = 0x8010

# 音乐序列特征: 连续的 note($00-$7F)/rest($80-$AF)/ctrl($B0-$DF)/special($E0-$FF)
# 以 $FE/$FF 结束
def is_music_byte(b):
    return (0x00 <= b <= 0xAF) or (0xB0 <= b <= 0xFF)

def find_sequences(rom, start, end, min_len=16, max_gap=3):
    """查找以 0xFF 或 0xFE 结尾，且主要由音符组成的连续序列"""
    candidates = []
    i = start
    while i < end - min_len:
        # 找 0xFF 或 0xFE 作为序列结束标志
        if rom[i] in (0xFE, 0xFF):
            # 回退找序列起点
            j = i - 1
            note_count = 0
            other_count = 0
            gap = 0
            while j >= start and (i - j) < 200:
                b = rom[j]
                if 0x00 <= b <= 0x7F:
                    note_count += 1
                    gap = 0
                elif 0x80 <= b <= 0xAF:
                    other_count += 1
                    gap = 0
                elif 0xB0 <= b <= 0xDF:
                    other_count += 1
                    gap = 0
                elif 0xE0 <= b <= 0xFF:
                    other_count += 1
                    gap = 0
                else:
                    gap += 1
                    if gap > max_gap:
                        break
                j -= 1
            
            seq_len = i - j
            if seq_len >= min_len and note_count >= seq_len * 0.3:
                cpu_addr = 0x8000 + (j + 1 - bank1_start)
                rom_off = j + 1
                preview = ' '.join(f'{rom[x]:02X}' for x in range(rom_off, min(rom_off + 20, i + 1)))
                candidates.append((rom_off, cpu_addr, seq_len, note_count, preview))
        i += 1
    
    candidates.sort(key=lambda x: -x[3])  # sort by note count
    return candidates

print("=== 扫描 Bank 1 音乐序列 (以 FF/FE 结尾) ===")
seqs = find_sequences(rom, bank1_start, bank1_end)
print(f"Found {len(seqs)} sequences\n")

for rom_off, cpu_addr, length, notes, preview in seqs[:20]:
    print(f"ROM ${rom_off:05X} CPU ${cpu_addr:04X} len={length} notes={notes}")
    print(f"  {preview}")

# 也检查 $9700-9900 区域
print("\n=== $9700-$9900 原始数据 ===")
for addr in [0x9716, 0x9740, 0x9780, 0x97C0]:
    rom_off = bank1_start + (addr - 0x8000)
    data = rom[rom_off:rom_off+32]
    print(f"CPU ${addr:04X}: {' '.join(f'{b:02X}' for b in data)}")
