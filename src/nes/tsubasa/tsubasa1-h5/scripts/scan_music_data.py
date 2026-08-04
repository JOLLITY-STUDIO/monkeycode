"""
scan_music_data.py - 扫描 Bank 1 寻找音乐序列数据

NES 音乐数据格式 (基于 Bank 1 音频引擎分析):
  $00-$7F: 音符 (bit6=音长组, bit5-0=音高索引)
  $80-$AF: 休止符 (bit3-0=持续时间)
  $B0-$BF: 控制命令 (音量/包络/速度)
  $E0-$FF: 特殊命令
    $E0/closed loop: 循环返回
    $FB: 设置循环点
    $FE: 无限循环
    $FF: 通道结束

有效的音乐序列特征:
1. 由 音符/休止符/命令 字节组成
2. 以 $FE 或 $FF 结束
3. 有合理的字节分布 (不是全0或全FF)
4. 连续的 $00-$7F 或 $80-$AF 字节表示旋律

指针表位置: Bank 1 $E1A8 (ROM offset $A1B8, 含iNES header)

用法: python scan_music_data.py <rom_path>
"""

import sys
import os
import struct

INES_HEADER = 0x10
PRG_BANK_SIZE = 0x4000
BANK1_ROM_START = INES_HEADER + 1 * PRG_BANK_SIZE  # 0x4010
BANK1_ROM_END = BANK1_ROM_START + PRG_BANK_SIZE     # 0x8010


def is_note(b):
    return 0x00 <= b <= 0x7F

def is_rest(b):
    return 0x80 <= b <= 0xAF

def is_control(b):
    return 0xB0 <= b <= 0xDF

def is_special(b):
    return 0xE0 <= b <= 0xFF

def is_music_byte(b):
    return is_note(b) or is_rest(b) or is_control(b) or is_special(b)

def is_end_byte(b):
    """通道结束/循环标记"""
    return b in (0xFE, 0xFF)

def is_loop_set(b):
    return b == 0xFB


def scan_sequences(rom, start, end, min_len=8):
    """
    扫描 ROM 区域寻找可能的音乐序列
    返回: [(offset, cpu_addr, length, score, bytes_preview)]
    """
    candidates = []
    
    i = start
    while i < end:
        # 跳过全0和全FF区域
        if rom[i] in (0x00, 0xFF):
            # 检查是否可能是序列开头 (跳过几个FF后遇到音符)
            scan_i = i
            while scan_i < end and rom[scan_i] in (0x00, 0xFF):
                scan_i += 1
            if scan_i < end and is_note(rom[scan_i]):
                # 可能是序列开始
                seq_start = scan_i
            else:
                i = scan_i + 1
                continue
        elif is_note(rom[i]) or is_rest(rom[i]) or is_control(rom[i]):
            seq_start = i
        else:
            i += 1
            continue
        
        # 从 seq_start 开始扫描序列
        seq_len = 0
        note_count = 0
        rest_count = 0
        ctrl_count = 0
        special_count = 0
        j = seq_start
        
        while j < end and seq_len < 512:
            b = rom[j]
            if is_note(b):
                note_count += 1
                j += 1
            elif is_rest(b):
                rest_count += 1
                j += 1
            elif is_control(b):
                ctrl_count += 1
                j += 1
            elif is_special(b):
                special_count += 1
                j += 1
                if b == 0xFF:
                    break  # 序列结束
                if b == 0xFE:
                    j += 1
                    if j < end and is_special(rom[j]) and rom[j] != 0xFF:
                        pass
                    else:
                        break  # 可能序列结束
            else:
                break  # 非音乐字节
            seq_len += 1
        
        # 评估序列质量
        total = note_count + rest_count + ctrl_count + special_count
        if total >= min_len and note_count > 0:
            score = note_count * 3 + rest_count * 1 + ctrl_count * 2 + special_count * 1
            # 只有以特殊命令结束的才认为是完整序列
            if is_special(rom[j - 1]) or j >= end:
                cpu_addr = 0x8000 + (seq_start - BANK1_ROM_START)
                preview = ' '.join(f'{rom[x]:02X}' for x in range(seq_start, min(seq_start + 16, j)))
                candidates.append((seq_start, cpu_addr, total, score, preview))
        
        i = j  # 继续扫描
    
    # 按评分排序
    candidates.sort(key=lambda x: -x[3])
    return candidates


def find_pointer_table(rom):
    """尝试找到指针表"""
    # 查找 Bank 1 中可能的指针表
    # 指针表特征: 连续的 2 字节地址 (在 $8000-$BFFF 范围内)
    ptr_start = BANK1_ROM_START
    ptr_end = BANK1_ROM_END
    
    tables = []
    i = ptr_start
    while i < ptr_end - 4:
        # 检查连续4个可能的指针 (2字节×2)
        w1 = rom[i] | (rom[i+1] << 8)
        w2 = rom[i+2] | (rom[i+3] << 8)
        
        if (0x8000 <= w1 <= 0xBFFF and 0x8000 <= w2 <= 0xBFFF):
            # 可能是指针表
            table_addr = 0x8000 + (i - BANK1_ROM_START)
            # 统计多少个连续有效指针
            count = 0
            j = i
            while j < ptr_end - 1:
                ptr = rom[j] | (rom[j+1] << 8)
                if 0x8000 <= ptr <= 0xBFFF:
                    count += 1
                    j += 2
                else:
                    break
            if count >= 4:
                tables.append((i, table_addr, count))
            i = j
        else:
            i += 1
    
    return tables


def main():
    if len(sys.argv) < 2:
        # 默认 ROM 路径
        rom_path = '_tmp_disasm_out/Captain Tsubasa (Japan).nes'
    else:
        rom_path = sys.argv[1]
    
    if not os.path.exists(rom_path):
        print(f"Error: ROM not found: {rom_path}")
        sys.exit(1)
    
    with open(rom_path, 'rb') as f:
        rom = f.read()
    
    print(f"ROM size: {len(rom)} bytes")
    print(f"Bank 1: ROM ${BANK1_ROM_START:05X} - ${BANK1_ROM_END:05X}")
    
    # 1. 查找指针表
    print("\n=== 指针表扫描 ===")
    tables = find_pointer_table(rom)
    for offset, cpu_addr, count in tables:
        print(f"  ROM ${offset:05X} / CPU ${cpu_addr:04X}: {count} entries")
        for k in range(min(count, 12)):
            ptr = rom[offset + k*2] | (rom[offset + k*2 + 1] << 8)
            print(f"    [{k}]: CPU ${ptr:04X}")
    
    # 2. 扫描音乐序列
    print("\n=== 音乐序列扫描 ===")
    candidates = scan_sequences(rom, BANK1_ROM_START, BANK1_ROM_END, min_len=8)
    
    print(f"\nFound {len(candidates)} potential sequences (top 30):")
    for i, (offset, cpu_addr, length, score, preview) in enumerate(candidates[:30]):
        print(f"  [{i}] ROM ${offset:05X} CPU ${cpu_addr:04X} len={length} score={score}")
        print(f"       {preview}")
    
    # 3. 关键: 检查 $E1A8 区域的指针表
    print("\n=== $E1A8 指针表分析 ===")
    ptr_table_rom = BANK1_ROM_START + 0x61A8  # $E1A8 → ROM offset
    print(f"ROM offset: ${ptr_table_rom:05X}")
    
    # 以不同方式解读
    print("  Raw bytes (64 bytes):")
    for row in range(4):
        offset = ptr_table_rom + row * 16
        hex_str = ' '.join(f'{rom[offset+i]:02X}' for i in range(16))
        print(f"    ${offset:05X}: {hex_str}")
    
    # 尝试以 2 字节指针解读
    print("\n  As 16-bit pointers (little-endian, 0-15):")
    for k in range(32):
        ptr = rom[ptr_table_rom + k*2] | (rom[ptr_table_rom + k*2 + 1] << 8)
        in_range = "✓" if 0x8000 <= ptr <= 0xBFFF else " "
        print(f"    [{k:2d}]: CPU ${ptr:04X} {in_range}")
    
    # 尝试以 2 字节指针解读 但交换高低位
    print("\n  As 16-bit pointers (big-endian interpretation):")
    for k in range(32):
        ptr = (rom[ptr_table_rom + k*2] << 8) | rom[ptr_table_rom + k*2 + 1]
        in_range = "✓" if 0x8000 <= ptr <= 0xBFFF else " "
        print(f"    [{k:2d}]: CPU ${ptr:04X} {in_range}")
    
    # 4. 展示 $E1A8 指针附近指向的数据
    print("\n=== 指针目标数据分析 ===")
    # 以 little-endian 解读
    for k in range(16):
        ptr = rom[ptr_table_rom + k*2] | (rom[ptr_table_rom + k*2 + 1] << 8)
        if 0x8000 <= ptr <= 0xBFFF:
            data_rom = BANK1_ROM_START + (ptr - 0x8000)
            if data_rom < len(rom):
                preview = ' '.join(f'{rom[data_rom + i]:02X}' for i in range(min(24, len(rom) - data_rom)))
                print(f"  [{k}] ${ptr:04X} → ROM ${data_rom:05X}: {preview}")


if __name__ == '__main__':
    main()
