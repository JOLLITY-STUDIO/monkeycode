#!/usr/bin/env python3
"""
M5: Bank 7 深度数据结构分析
- 指针表语义分析
- 对话文本提取
- 角色头像映射
- 脚本字节码模式识别
"""
import os
import re
import struct
import json

ROM_PATH = os.path.join(os.path.dirname(__file__), '..', '_tmp_disasm_out', 'Captain Tsubasa (Japan).nes')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'temp', 'm5_output')

def read_bank7():
    with open(ROM_PATH, 'rb') as f:
        rom = f.read()
    prg_start = 0x0010 + 0x4000 * 7
    return rom[prg_start:prg_start + 0x4000]

def cpu_addr(offset):
    return 0xC000 + offset

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    bank7 = read_bank7()
    print("=" * 70)
    print("  M5: Bank 7 深度数据结构分析")
    print("=" * 70)

    # =====================================================
    # 1. 指针表分析 ($C000-$C02B)
    # =====================================================
    print("\n[1] 指针表 $C000-$C02B (22 entries)")
    print("-" * 50)
    
    ptrs = []
    for i in range(0, 44, 2):
        lo = bank7[i]; hi = bank7[i+1]
        addr = lo | (hi << 8)
        if 0xC000 <= addr <= 0xFFBF:
            ptrs.append((i//2, addr, addr - 0xC000))
        else:
            break
    
    # 为每个指针分类
    for idx, addr, offset in ptrs:
        # 尝试判断数据类型
        b = bank7[offset]
        desc = classify_entry(bank7, offset)
        print(f"  [{idx:2d}] ${addr:04X} (off={offset:04X}) → {desc}")

    # =====================================================
    # 2. 角色头像映射表 $C02C-$C08D
    # =====================================================
    print("\n[2] 角色头像映射表 $C02C-$C08D")
    print("-" * 50)
    
    # 格式: 每2字节一个条目 (lo, hi) → CHR bank + tile 索引
    # 也可能是 (portrait_id, chr_bank*0x40 + tile)
    portrait_entries = []
    for i in range(0x2C, min(0x8E, len(bank7)), 2):
        lo = bank7[i]; hi = bank7[i+1]
        if lo == 0 and hi == 0:
            portrait_entries.append(None)
            continue
        addr = lo | (hi << 8)
        # 判断: 如果是 $41xx 或 $42xx，可能是 Bank 1 CHR tile 指针
        if 0x4100 <= addr <= 0x4300:
            # CHR tile in Bank 1 range: ($C02C=$41B8, etc.)
            # 这些可能是精灵定义地址
            portrait_entries.append(((i - 0x2C) // 2, addr, "CHR_TILE"))
    
    # 只显示前30个非空条目
    shown = 0
    for e in portrait_entries:
        if e is not None and shown < 30:
            idx, addr, typ = e
            print(f"  [{idx:2d}] ${addr:04X} → {typ}")
            shown += 1

    # =====================================================
    # 3. 大规模数据区域 $C08A-$DF01
    # =====================================================
    print("\n[3] 大规模数据区域分析")
    print("-" * 50)
    
    # $C08A-$C15D: 指针/索引表
    # 分析格式: 可能是3字节条目 (bank, addr_lo, addr_hi) 或类似结构
    data_p2 = bank7[0x8A:0x15E]
    entries_3byte = []
    for i in range(0, len(data_p2), 3):
        if i + 2 < len(data_p2):
            b0, b1, b2 = data_p2[i], data_p2[i+1], data_p2[i+2]
            entries_3byte.append((b0, b1, b2))
    
    print(f"  $C08A-$C15D: {len(entries_3byte)} 组3字节条目")
    unique_b0 = sorted(set(e[0] for e in entries_3byte))
    print(f"  第一字节值: {[f'${x:02X}' for x in unique_b0[:20]]}")
    
    # $C15E-$C289: 可能是文本指针表
    data_p3 = bank7[0x15E:0x28A]
    word_entries = []
    for i in range(0, len(data_p3), 2):
        if i + 1 < len(data_p3):
            lo = data_p3[i]; hi = data_p3[i+1]
            addr = lo | (hi << 8)
            word_entries.append(addr)
    
    print(f"\n  $C15E-$C289: {len(word_entries)} 组2字节条目")
    valid = [(i, a) for i, a in enumerate(word_entries) if 0xC000 <= a <= 0xFFBF]
    print(f"  有效Bank7地址: {len(valid)} 个")
    for i, a in valid[:20]:
        off = a - 0xC000
        preview = bank7[off:off+20]
        text_preview = ''.join(chr(b) if 0x20 <= b < 0x7f else f'[{b:02X}]' for b in preview[:10])
        print(f"    [{i:2d}] ${a:04X} → {text_preview}")

    # =====================================================
    # 4. 大文本数据区域 $E306-$F968
    # =====================================================
    print("\n[4] 大文本数据区域 $E306-$F968 (5731 bytes)")
    print("-" * 50)
    
    data_text = bank7[0xE306-0xC000:0xF969-0xC000]
    
    # 提取文本字符串 (连续ASCII可打印字符)
    strings = []
    i = 0
    while i < len(data_text):
        if 0x20 <= data_text[i] < 0x80:
            start = i
            while i < len(data_text) and 0x20 <= data_text[i] < 0x80:
                i += 1
            length = i - start
            if length >= 4:  # 最小4字符
                text = ''.join(chr(b) for b in data_text[start:i])
                addr = 0xE306 + start
                strings.append((addr, length, text))
            continue
        i += 1
    
    print(f"  找到 {len(strings)} 段文本")
    # 分类
    japanese = []
    other = []
    for addr, length, text in strings:
        # 检查是否包含日文/特殊字符 (0x80+)
        has_special = any(ord(c) > 0x7f for c in text)
        if any(c < ' ' for c in text):
            continue
        if len(text) > 20:
            japanese.append((addr, length, text))
        else:
            other.append((addr, length, text))
    
    print(f"  长文本 (>20字符): {len(japanese)} 段")
    for addr, length, text in japanese[:15]:
        print(f"    ${addr:04X} ({length}): {text[:60]}")
    
    print(f"\n  短文本 (4-20字符): {len(other)} 段")
    for addr, length, text in other[:20]:
        print(f"    ${addr:04X} ({length}): {text}")

    # =====================================================
    # 5. 脚本字节码区域 $C500-$E000
    # =====================================================
    print("\n[5] 脚本字节码分析 $C500-$E000")
    print("-" * 50)
    
    bytecode = bank7[0x500:0x2000]  # $C500-$E000
    
    # 统计操作码
    op_freq = {}
    for b in bytecode:
        if b < 0x20 or b >= 0x80:
            op_freq[b] = op_freq.get(b, 0) + 1
    
    top_ops = sorted(op_freq.items(), key=lambda x: -x[1])[:30]
    print("  高频控制码 (非ASCII):")
    for op, freq in top_ops:
        print(f"    ${op:02X}: {freq:5d} 次")
    
    # 寻找脚本边界 ($FF 是终止符)
    ff_positions = [i for i, b in enumerate(bytecode) if b == 0xFF]
    print(f"\n  $FF 终止符出现 {len(ff_positions)} 次")
    print(f"  间隔(可能的脚本长度):")
    gaps = [ff_positions[i+1] - ff_positions[i] for i in range(min(19, len(ff_positions)-1))]
    for i, gap in enumerate(gaps[:20]):
        addr = 0xC500 + ff_positions[i]
        print(f"    ${addr:04X}: {gap} bytes")

    # 输出结构化JSON
    output = {
        "pointer_table": [{"index": idx, "address": f"${addr:04X}", "offset": offset,
                          "description": classify_entry(bank7, offset)}
                         for idx, addr, offset in ptrs],
        "portrait_table_entries": len([e for e in portrait_entries if e is not None]),
        "text_strings_count": len(strings),
        "long_texts": [{"addr": f"${addr:04X}", "length": length, "text": text[:80]}
                       for addr, length, text in japanese],
        "script_opcodes": {f"${op:02X}": freq for op, freq in top_ops[:15]},
        "ff_separators": len(ff_positions),
        "average_script_size": sum(gaps) / len(gaps) if gaps else 0,
    }
    
    json_path = os.path.join(OUTPUT_DIR, 'bank7_analysis.json')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"\n  [OK] 分析结果已保存: {json_path}")


def classify_entry(bank7, offset):
    """尝试分类Bank7中的一个条目"""
    b = bank7[offset]
    
    # 检查是否是文本
    if 0x20 <= b < 0x80:
        end = offset
        while end < len(bank7) and 0x20 <= bank7[end] < 0x80:
            end += 1
        text = ''.join(chr(bank7[i]) for i in range(offset, min(end, offset+20)))
        return f'TEXT: "{text}"'
    
    # 检查是否是脚本字节码
    if b in (0x01, 0x02, 0x04, 0x08):
        # 读取后续字节作为预览
        preview = [f'{bank7[offset+i]:02X}' for i in range(min(8, len(bank7)-offset))]
        return f'SCRIPT: {" ".join(preview)}'
    
    # 检查是否是表格数据
    if b in (0xE0, 0xCD):
        return f'CONTROL: ${b:02X}'
    
    return f'DATA: ${b:02X}'


if __name__ == '__main__':
    main()
