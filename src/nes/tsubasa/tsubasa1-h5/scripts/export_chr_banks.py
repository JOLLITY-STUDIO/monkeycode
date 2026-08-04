"""
从NES ROM提取CHR数据，按MMC1 4KB粒度拆分为32个Bank

MMC1 CHR切换粒度为4KB (0x1000 bytes)，因此原始16个8KB bank需拆分为32个4KB sub-bank。
sub-bank 2N = 原bank N的低4KB (offset 0x0000-0x0FFF)
sub-bank 2N+1 = 原bank N的高4KB (offset 0x1000-0x1FFF)

输出: src/data/chr/chr-bank-00.ts ~ chr-bank-31.ts
每个文件:
  export const CHR_BANK_00: number[] = [0x00, 0x01, ...];  // 4096 bytes
"""
import struct
import os
import sys

# ROM路径
ROM_PATH = os.path.join(os.path.dirname(__file__), "..", "_tmp_disasm_out", "Captain Tsubasa (Japan).nes")
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data", "chr")

# MMC1 CHR sub-bank 大小
SUB_BANK_SIZE = 0x1000   # 4KB

def bytes_to_hex_array(data: bytes) -> str:
    """将bytes转换为格式化hex数组字符串，每行16个"""
    lines = []
    for row_start in range(0, len(data), 16):
        row = data[row_start:row_start + 16]
        hex_row = ", ".join(f"0x{b:02X}" for b in row)
        lines.append(f"    {hex_row}")
    return ",\n".join(lines)

def main():
    with open(ROM_PATH, "rb") as f:
        header = f.read(16)

    assert header[0:4] == b'NES\x1a', f"Not a valid NES ROM: {header[0:4]}"
    
    prg_count = header[4]
    chr_count = header[5]   # 8KB units

    print(f"ROM: {ROM_PATH}")
    print(f"PRG: {prg_count} × 16KB = {prg_count * 16}KB")
    print(f"CHR: {chr_count} × 8KB = {chr_count * 8}KB")

    header_size = 16
    if header[6] & 0x04:
        header_size += 512
        print("(Trainer present)")

    prg_size = prg_count * 0x4000
    chr_size = chr_count * 0x2000
    chr_offset = header_size + prg_size
    print(f"CHR offset: 0x{chr_offset:05X}")

    with open(ROM_PATH, "rb") as f:
        f.seek(chr_offset)
        chr_data = f.read(chr_size)

    print(f"Read {len(chr_data)} bytes of CHR data")

    # 计算4KB sub-bank总数
    total_sub_banks = chr_count * 2  # 16 → 32
    print(f"Output: {total_sub_banks} sub-banks × {SUB_BANK_SIZE} bytes (MMC1 4KB granularity)")

    os.makedirs(OUT_DIR, exist_ok=True)

    # 生成每个 sub-bank 文件
    for sub_idx in range(total_sub_banks):
        # sub-bank 2N: 原bank N的低4KB
        # sub-bank 2N+1: 原bank N的高4KB
        parent_bank = sub_idx // 2
        is_high = sub_idx % 2  # 0=low, 1=high

        sub_offset = parent_bank * 0x2000 + is_high * SUB_BANK_SIZE
        sub_bytes = chr_data[sub_offset:sub_offset + SUB_BANK_SIZE]
        assert len(sub_bytes) == SUB_BANK_SIZE, f"Sub-bank {sub_idx} size mismatch: {len(sub_bytes)}"

        hex_str = bytes_to_hex_array(sub_bytes)
        var_name = f"CHR_BANK_{sub_idx:02d}"
        out_path = os.path.join(OUT_DIR, f"chr-bank-{sub_idx:02d}.ts")

        lo_hi = "高" if is_high else "低"
        ts_content = f"""/**
 * CHR Sub-Bank {sub_idx:02d} - 图形数据
 * MMC1 4KB粒度: 原Bank {parent_bank:02d} 的{lo_hi}4KB (offset 0x{sub_offset:05X})
 * 大小: 0x{SUB_BANK_SIZE:04X} ({SUB_BANK_SIZE}) bytes
 * 来源: NES ROM CHR-ROM offset 0x{chr_offset + sub_offset:05X}
 * 
 * 自动生成，请勿手动编辑
 */

export const {var_name}: number[] = [
{hex_str}
];
"""
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(ts_content)

    print(f"\n写完 {total_sub_banks} 个 sub-bank 文件")

    # 生成索引
    index_lines = []
    for sub_idx in range(total_sub_banks):
        var = f"CHR_BANK_{sub_idx:02d}"
        index_lines.append(f"export {{ {var} }} from './chr-bank-{sub_idx:02d}';")

    index_path = os.path.join(OUT_DIR, "index.ts")
    with open(index_path, "w", encoding="utf-8") as f:
        f.write("// CHR Sub-Bank 数据索引 (MMC1 4KB粒度, 32个)\n")
        f.write("\n".join(index_lines))
        f.write("\n")

    print(f"  -> {index_path}")
    print(f"\nDone! 共 {total_sub_banks} 个 CHR Sub-Bank (MMC1 4KB粒度) 导出完成。")

    # 清理旧的16-bank文件
    for old_idx in range(16, 32):
        old_path = os.path.join(OUT_DIR, f"chr-bank-{old_idx:02d}.ts")
        # 新文件已覆盖0-31，不需要额外操作
    # 实际上0-15会被覆盖，16-31是新增

if __name__ == "__main__":
    main()
