"""验证 $E1A8 指针格式: 偏移量 vs 绝对地址"""
rom = open('_tmp_disasm_out/Captain Tsubasa (Japan).nes', 'rb').read()

ptr_table_rom = 0xA1B8

# 读取 16 个 2 字节条目
entries = []
for k in range(16):
    lo = rom[ptr_table_rom + k*2]
    hi = rom[ptr_table_rom + k*2 + 1]
    val = lo | (hi << 8)
    entries.append(val)

print("=== 作为偏移量 (相对于 $8000) ===")
for k in range(16):
    off = entries[k]
    cpu_addr = 0x8000 + off
    rom_off = 0x4010 + off
    if 0x8000 <= cpu_addr <= 0xBFFF and rom_off + 4 < len(rom):
        data = rom[rom_off:rom_off+16]
        # 检查数据尾部
        has_end = any(b in (0xFE, 0xFF) for b in data)
        preview = ' '.join(f'{b:02X}' for b in data)
        status = "★MUSIC" if has_end else "       "
        print(f"  [{k:2d}] off=${off:04X} → CPU ${cpu_addr:04X} {status}: {preview}")

print("\n=== 作为绝对地址 ===")
for k in range(16):
    val = entries[k]
    if 0x8000 <= val <= 0xBFFF:
        rom_off = 0x10 + 0x4000 + (val - 0x8000)
        if rom_off + 4 < len(rom):
            data = rom[rom_off:rom_off+16]
            preview = ' '.join(f'{b:02X}' for b in data)
            print(f"  [{k:2d}] CPU ${val:04X} → {preview}")

print("\n=== 单个字节作为通道索引 ===")
for k in range(16):
    b = rom[ptr_table_rom + k]
    print(f"  [{k:2d}]: ${b:02X} (byte), channel?={8-b if b<8 else 'N/A'}")
