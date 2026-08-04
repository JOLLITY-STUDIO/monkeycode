"""读取Bank 7末尾的Reset代码和中断向量区"""
rom_path = "_tmp_disasm_out/Captain Tsubasa (Japan).nes"

with open(rom_path, "rb") as f:
    # Bank 7: ROM 0x1C010 - 0x2000F
    # $FFC0: 0x1FFD0
    f.seek(0x1FFD0)
    reset = f.read(32)  # 多读一些
    
    print("=== Reset 代码 ($FFC0-) ===")
    i = 0
    while i < len(reset):
        cpu = 0xFFC0 + i
        b = reset[i]
        if b == 0x78: print(f"  ${cpu:04X}: 78        SEI"); i += 1
        elif b == 0xD8: print(f"  ${cpu:04X}: D8        CLD"); i += 1
        elif b == 0xA9: print(f"  ${cpu:04X}: A9 {reset[i+1]:02X}     LDA #${reset[i+1]:02X}"); i += 2
        elif b == 0xA2: print(f"  ${cpu:04X}: A2 {reset[i+1]:02X}     LDX #${reset[i+1]:02X}"); i += 2
        elif b == 0x8D:
            addr = reset[i+1] | (reset[i+2] << 8)
            print(f"  ${cpu:04X}: 8D {reset[i+1]:02X} {reset[i+2]:02X}  STA ${addr:04X}"); i += 3
        elif b == 0x4A: print(f"  ${cpu:04X}: 4A        LSR A"); i += 1
        elif b == 0xCA: print(f"  ${cpu:04X}: CA        DEX"); i += 1
        elif b == 0xD0:
            target = cpu + 2 + (reset[i+1] if reset[i+1] < 0x80 else reset[i+1] - 0x100)
            print(f"  ${cpu:04X}: D0 {reset[i+1]:02X}     BNE ${target:04X}"); i += 2
        elif b == 0x6C:
            addr = reset[i+1] | (reset[i+2] << 8)
            print(f"  ${cpu:04X}: 6C {reset[i+1]:02X} {reset[i+2]:02X}  JMP (${addr:04X})"); i += 3
            break  # JMP后面就是填充了，停止
        else:
            print(f"  ${cpu:04X}: {b:02X}        ???"); i += 1

    # 中断向量: $FFFA-$FFFF 在 ROM 0x2000A-0x2000F (CHR起始0x20010减6)
    f.seek(0x20010 - 6)
    vec = f.read(6)
    print("\n=== 中断向量 ($FFFA-$FFFF) ===")
    names = {0: "NMI   ", 2: "RESET ", 4: "IRQ/BRK"}
    for i in range(0, 6, 2):
        cpu = 0xFFFA + i
        lo, hi = vec[i], vec[i+1]
        target = lo | (hi << 8)
        print(f"  ${cpu:04X}: {lo:02X} {hi:02X}  ->  ${target:04X}  ({names.get(i, '?')})")

# ======== Bank 0 开头 ========
with open(rom_path, "rb") as f:
    f.seek(0x10)  # Bank 0 ROM偏移
    print(f"\n=== Bank 0 开头 ($8000-$800B) ===")
    data = f.read(12)
    for i, b in enumerate(data):
        print(f"  ${0x8000 + i:04X}: {b:02X}")
    
    # $8000-$8001 是 JMP ($8000) 的间接地址
    ind_addr = data[0] | (data[1] << 8)
    print(f"\n  JMP ($8000) 间接跳转: 读取 ${ind_addr:04X} 的内容作为目标")
    
    # 读取那个地址 (Bank 0 内)
    if 0x8000 <= ind_addr <= 0xBFFF:
        offset = 0x10 + (ind_addr - 0x8000)
        f.seek(offset)
        target = f.read(2)
        t = target[0] | (target[1] << 8)
        print(f"  {ind_addr:04X} -> {target[0]:02X} {target[1]:02X} = ${t:04X}")
    else:
        print(f"  地址 ${ind_addr:04X} 不在 Bank 0 范围内")

# ======== MMC1 重映射说明 ========
print(f"""
=== MMC1 映射总结 ===
┌─────────────────────────────────────────────────┐
│ CPU $8000-$BFFF: Switchable PRG Bank (Bank 0-6) │
│ CPU $C000-$FFFF: Fixed PRG Bank     (Bank 7)    │
│ PPU $0000-$0FFF: Switchable CHR Bank 0          │
│ PPU $1000-$1FFF: Switchable CHR Bank 1          │
└─────────────────────────────────────────────────┘

启动流程:
  RESET → $FFC0 (Bank 7, 固定)
    ↓ 初始化 MMC1 (写入 $1A 到 $8000 串行)
    ↓ JMP ($8000) → 跳到 Bank 0 的启动代码
    ↓ Bank 0 的启动代码初始化 RAM/PPU
    ↓ 进入主循环
""")
