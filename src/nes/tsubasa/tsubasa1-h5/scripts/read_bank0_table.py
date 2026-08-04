"""完整分析 Bank 0 的跳转表"""
rom_path = "_tmp_disasm_out/Captain Tsubasa (Japan).nes"

with open(rom_path, "rb") as f:
    # Bank 0: ROM 0x10 - 0x4010
    f.seek(0x10)
    data = f.read(64)
    
    print("=== Bank 0 跳转表 ($8000-$803F) ===")
    print("(这是MMC1 Bank 0的入口跳转表，Bank 0映射到$8000-$BFFF)")
    print()
    
    i = 0
    while i < 64 and i < len(data):
        cpu = 0x8000 + i
        b = data[i]
        
        if b == 0x4C:  # JMP abs
            addr = data[i+1] | (data[i+2] << 8)
            # 检查是不是 NMI/IRQ 入口
            label = ""
            if cpu == 0x8002: label = "  ← NMI向量指向这里"
            elif cpu == 0x8005: label = "  (主循环等待?)"
            elif cpu == 0x8008: label = "  (IRQ/其他?)"
            print(f"  ${cpu:04X}: 4C {data[i+1]:02X} {data[i+2]:02X}  JMP ${addr:04X}{label}")
            i += 3
        elif b == 0x60:  # RTS
            print(f"  ${cpu:04X}: 60        RTS")
            i += 1
            break
        elif b in (0xEA, 0xFF, 0x00):
            print(f"  ${cpu:04X}: {b:02X}        (填充)")
            i += 1
        else:
            # 可能是数据
            if cpu == 0x8000:
                ptr = data[i] | (data[i+1] << 8)
                print(f"  ${cpu:04X}: {data[i]:02X} {data[i+1]:02X}     .word ${ptr:04X}  ← JMP ($8000) 跳转目标")
                i += 2
            else:
                print(f"  ${cpu:04X}: {b:02X}        ???")
                i += 1

print(f"""
=== 完整 NES Header 总结 ===
┌────────────────────────────────────────────────┐
│ 文件头 (16 bytes)                               │
│   Magic:    4E 45 53 1A  (NES␚)                │
│   PRG-ROM:  8 × 16KB  = 128KB                 │
│   CHR-ROM: 16 × 8KB   = 128KB                 │
│   Flags 6:  0x10 (Horizontal mirror, MMC1)     │
│   Flags 7:  0x08 (NES 2.0 header)              │
│   Mapper:   1 (MMC1)                           │
│   PRG-RAM:  0 (未使用)                          │
│   TV:       NTSC                               │
├────────────────────────────────────────────────┤
│ 中断向量 ($FFFA-$FFFF, Bank 7 固定)              │
│   NMI:   $8002 → JMP $80E0 (NMI处理)           │
│   RESET: $FFC0 (MMC1初始化 → JMP $8000 → $809B)│
│   IRQ:   $8002 (同NMI, 未使用)                  │
├────────────────────────────────────────────────┤
│ ROM 布局                                        │
│   Bank 0: 0x00010-0x0400F  ($8000 switchable)  │
│   Bank 1: 0x04010-0x0800F  ($8000 switchable)  │
│   Bank 2: 0x08010-0x0C00F  ($8000 switchable)  │
│   Bank 3: 0x0C010-0x1000F  ($8000 switchable)  │
│   Bank 4: 0x10010-0x1400F  ($8000 switchable)  │
│   Bank 5: 0x14010-0x1800F  ($8000 switchable)  │
│   Bank 6: 0x18010-0x1C00F  ($8000 switchable)  │
│   Bank 7: 0x1C010-0x2000F  ($C000 fixed)       │
│   CHR:    0x20010-0x4000F  (16 banks × 8KB)    │
└────────────────────────────────────────────────┘
""")
