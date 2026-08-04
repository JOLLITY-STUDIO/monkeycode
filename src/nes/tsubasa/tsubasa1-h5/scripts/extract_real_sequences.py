"""
提取 Bank 1 $A000 区域的真实音乐序列数据 (2字节对格式: 音高,时长)
"""
rom = open('_tmp_disasm_out/Captain Tsubasa (Japan).nes', 'rb').read()
bank1_start = 0x4010

def read_seq_at(rom_off):
    """读取一个以 FF 结尾的 (pitch, dur) 序列"""
    data = []
    i = rom_off
    while i < len(rom):
        pitch = rom[i]
        dur = rom[i+1]
        if pitch == 0xFF:
            break
        data.append((pitch, dur))
        i += 2
        if i - rom_off > 200:
            break
    return data

# 分析 $A000 区域找到的序列边界
# 从扫描结果看，序列起始于 ROM $A021 (CPU $A011)
seq_start = 0x6011  # ROM offset of $A011 data start
candidates = []

i = seq_start
while i < 0x6200:
    # 寻找明显的序列开始: 不是 $00 和 $FF，且后面跟着小 duration
    if i + 1 < len(rom):
        p = rom[i]
        d = rom[i+1]
        if p not in (0x00, 0xFF) and 1 <= d <= 20:
            # 可能是序列开始
            seq = read_seq_at(i)
            if len(seq) >= 8:
                cpu_addr = 0x8000 + (i - bank1_start)
                preview = ' '.join(f'{p:02X}:{d:02X}' for p, d in seq[:10])
                candidates.append((i, cpu_addr, len(seq), preview))
                i += len(seq) * 2  # 跳过整个序列
                continue
    i += 1

print(f"Found {len(candidates)} sequences in $A000 area\n")
for rom_off, cpu_addr, length, preview in candidates:
    print(f"ROM ${rom_off:05X} CPU ${cpu_addr:04X} len={length}: {preview}")

# 也抽取几个完整序列用于 TS 导出
print("\n\n=== Full Sequences for Export ===")
export_seqs = []
for rom_off, cpu_addr, length, _ in candidates[:8]:
    seq = read_seq_at(rom_off)
    export_seqs.append((cpu_addr, seq))
    pitches = ','.join(f'0x{p:02X}' for p, _ in seq[:20])
    durs = ','.join(f'{d}' for _, d in seq[:20])
    print(f"// ${cpu_addr:04X} ({len(seq)} notes)")
    print(f"// pitches: [{pitches}]")
    print(f"// durations: [{durs}]")
    print(f"export const SEQ_{cpu_addr:04X}: [number, number][] = [")
    for p, d in seq[:15]:
        print(f"  [0x{p:02X}, {d}],")
    if len(seq) > 15:
        print(f"  // ... {len(seq)-15} more notes")
    print("];")
    print()
