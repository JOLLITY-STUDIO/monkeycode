# PRG bank-08 字节流解码分析（2026-08-27 严肃反汇编）

## 结论先行

**bank-08 字节流 = NT 原始 tile 索引**，不包含 "F0+ 控制码"。

prg-bank-08.ts 注释里写的 "F0=清标志 F1=跳转 F2=跳转2 ..." **是错的** —— 那些 F0+
handler 属于 PRG bank00 `$92A0-$92E4` 的 **OAM sprite 流**，与 bank-08 NT 流无关。

bank-08 内容物：30 个片头序列屏，每屏 16 字节/行 × 30 行 = 480 字节 NT 布局，
直接通过 `LDA ($00EA),Y` 写到 NT 缓冲 `$05E8+X`，无控制码转换。

## ★ 关键反汇编入口

| PC           | 文件                              | 用途                                  |
|--------------|-----------------------------------|--------------------------------------|
| `$8EF0-$8FD0` | `src/asm/bank00/code_render.s` | 32 行 = 1 屏的 NT 写入主循环 (bank00) |
| `$8FD1-$9070` | `src/asm/bank00/code_render.s` | Y-row attribute writer (2 路分派)     |
| `$9049-$9070` | `src/asm/bank00/code_render.s` | `($0067,$0068)` → PPU NT 地址计算     |
| `$9071-$9085` | `src/asm/bank00/code_render.s` | CHR request 入口 (TG)                |
| `$9085-$9F98` | `src/asm/bank00/code_render.s` | bank00 main loop dispatcher (mode0-4)  |
| `$92A0-$92E4` | `src/asm/bank00/code_sub.s`    | **F0+ byte dispatcher (sprite 流)**   |
| `$92E5-$92F5` | `src/asm/bank00/code_sub.s`    | 16 项跳转表 (`$F0-$FF` handler 入口) |

★ **`$8EF0` (bank00) 是 bank-08 NT 字节流"消费者"**——但 bank-08 是 bank00 PRG bank
固定区间的 " 数据"，$8EF0 调用方负责设定 `$00EA/$00EB` 指针 + bank map + screen id 索引。

## 1. `$8EF0` NT 流处理器（32 行 = 1 屏）

完整反汇编 (bank00/code_render.s):

```asm
        TAX                        ; $8EF0   X = screen_id (调用方传入)
        LDA $005C                  ; $8EF1
        STA $0067                  ; $8EF3   Y-row addr pointer lo
        LDA $005D                  ; $8EF5
        STA $0068                  ; $8EF7   ...                    hi
        LDA $005B                  ; $8EF9
        AND #$01                   ; $8EFB
        TAY                        ; $8EFD   Y = bit0 (page flag)
        STA $00EB                  ; $8EFE
        TXA                        ; $8F00
        STA $00EA                  ; $8F01   $00EA = screen_id
        ASL                        ; $8F03
        ROL $00EB                  ; $8F04   *16 (4 ASL = *16, $00EA += screen_id*16, $00EB += carry)
        ASL                        ; $8F06
        ROL $00EB
        ASL                        ; $8F09
        ROL $00EB
        ASL                        ; $8F0C
        ROL $00EB                  ; $8F0D
        CLC                        ; $8F0F
        ADC $00EA                  ; $8F10   += low byte (X*16 + X*16 = X*32)
        STA $00EA                  ; $8F12
        TYA                        ; $8F14
        ADC $00EB                  ; $8F15   +carry from Y bit0
        STA $00EB                  ; $8F17
        LDA $00EA                  ; $8F19
        CLC                        ; $8F1B
        ADC #$00                   ; $8F1C   (page 0)
        STA $00EA                  ; $8F1E
        LDA $00EB                  ; $8F20
        ADC #$A0                   ; $8F22   PRG page = $A0 + (bit0<<8)
        STA $00EB                  ; $8F24   → 最终指针 = $A000/[$A100][screen_id*32 + bit0*256]
        LDX #$08                   ; $8F26
        JSR $C4B9                  ; $8F28   bank switch (若 bit0=1 map bank01)
        LDY #$00                   ; $8F2B
        LDA ($00EA),Y              ; $8F2D   ★ 读 1 byte 存到 $00E7 (current byte)
        STA $00E7                  ; $8F2F
        JSR $8FD1                  ; $8F31   ★ attribute 分派 (基于 $0067 高位)
        INC $00EA                  ; $8F34
        BNE $8F3A                  ; $8F36
        INC $00EB                  ; $8F38
        LDA #$04                   ; $8F3A
        STA $00E8                  ; $8F3C   $00E8 = 4 (4 bytes/row)
$LDA_67_A4_LD_68_40_JSR_9B28:            ; ($8F3E)
        LDX $0068                  ; $8F40
        LDA #$04                   ; $8F42
        JSR $9B28                  ; $8F44   bank00 收尾: 调 palette helper
        LDY #$00                   ; $8F47
$8F49:
        LDA ($00EA),Y              ; $8F49   ★ 内层循环: 读 4 bytes raw to NT buff $05E8+X
        STA $05E8,X                ; $8F4B
        INX                        ; $8F4E
        INY                        ; $8F4F
        CPY #$04                   ; $8F50   (CPY #4)
        BNE $8F49                  ; $8F52
        JSR $9B5E                  ; $8F54
        DEC $00E8                  ; $8F57
        BEQ $8FCB                  ; $8F59   全部 4 row × 4 byte = NT 4 行写完
        LDA $00EA                  ; $8F5B
        CLC                        ; $8F5D
        ADC #$04                   ; $8F5E   data pointer += 4 (下 4 byte)
        STA $00EA                  ; $8F60
        LDA $00EB                  ; $8F62
        ADC #$00                   ; $8F64
        STA $00EB                  ; $8F66
        LDA $0067                  ; $8F68   NT row pointer += 0x20 (PPU row stride)
        CLC                        ; $8F6A
        ADC #$20                   ; $8F6B
        STA $0067                  ; $8F6D
        LDA $0068                  ; $8F6F
        ADC #$00                   ; $8F71
        STA $0068                  ; $8F73
        AND #$03                   ; $8F75   page-wrap: 若 NT addr hi bits = $03/$03 → wrap to $20
        CMP #$03                   ; $8F77
        BNE $8F3E                  ; $8F79
        LDA $0067                  ; $8F7B
        CMP #$C0                   ; $8F7D
        BCC $8F3E                  ; $8F7F
        LDA $0067                  ; $8F81
        SEC                        ; $8F83
        SBC #$C0                   ; $8F84   wrap: $00-$1F (sub-page)
        STA $0067                  ; $8F86
        LDA $0068                  ; $8F88
        SBC #$03                   ; $8F8A
        STA $0068                  ; $8F8C
        JSR $9049                  ; $8F8E   attribute writer entry
        LDA #$01                   ; $8F91
        JSR $9B28                  ; $8F93   attribute helper
        LDA $0067                  ; $8F96
        LSR                        ; $8F98
        LSR                        ; $8F99
        AND #$07                   ; $8F9A   attribute Y = ($67 >> 2) & 0x07
        TAY                        ; $8F9C
        LDA $0062                  ; $8F9D
        AND #$C0                   ; $8F9F   bit 6/7 = palette source
        CMP #$40                   ; $8FA1
        BEQ $8FB8                  ; $8FA3
        LDA $00E7                  ; $8FA5
        LSR                        ; $8FA7
        LSR                        ; $8FA8
        LSR                        ; $8FA9
        LSR                        ; $8FAA   attr = ($00E7 >> 4) (低 4 bit 是 tile index, 高 4 bit 是 attr)
        STA $05E8,X                ; $8FAB
        STA $064A,Y                ; $8FAE
        INX                        ; $8FB1
        JSR $9B5E                  ; $8FB2
        JMP $8F3E                  ; $8FB5
        LDA $00E7                  ; $8FB8
        LSR                        ; $8FBA
        LSR                        ; $8FBB
        LSR                        ; $8FBC
        LSR                        ; $8FBD
        ORA $064A,Y                ; $8FBE
        STA $05E8,X                ; $8FC1
        INX                        ; $8FC4
        JSR $9B5E                  ; $8FC5
        JMP $8F3E                  ; $8FC8
        LDX #$07                   ; $8FCB
        JSR $C4B9                  ; $8FCD   8FCB end: 切回 bank0
        RTS                        ; $8FD0
```

### 行为语义翻译:
1. `X = screen_id` (调用方传入, 通过 `_0094,_0095`)
2. `$00EA/$00EB = $A0[bit0*0x100] + screen_id*32` — **bank-08 数据指针**
3. 循环 8 row × 4 byte = 32 cell 一次写 (一页 nametable 的 1 列)
4. 每 4 row 之后 attribute writer (`$8FD1`/`$9049`) 处理 attribute byte
5. `screen_id` 范围由调用方控制 — 详见 bank-08 数据布局 (8704/8704 字节 ≈ 30 屏)

★ **callers** (找 caller 时还需进一步分析):
- `bank00/code_main.s` 中 `$8903` 和 `$88DC` 等可能是调用 `JSR $8EF0` 的入口
- 每个 Scene0 frame state 可能通过调用 `JSR $8EF0` 推送 nametable

## 2. ★ $92A0 F0+ dispatcher (重要: **这是 OAM 流，不是 bank-08 NT 流**)

```asm
        CMP #$E0                   ; $9268   E0-EF 子分派
        BCS $92A0                  ; $926A
        ...                        ; (处理 E0 子范围)
        CMP #$F0                   ; $92A0
        BCS $92D7                  ; $92A2   (if byte ≥ F0 → 跳到 F0+ dispatcher)
        TAX                        ; $92A4   (if byte < F0 → E0..EF 处理)
        LDY #$13                   ; $92A5
        ...

$92D7:
        SEC                        ; $92D7
        SBC #$F0                    ; $92D8   index = byte - $F0
        ASL                         ; $92DA   *2
        TAX                         ; $92DB
        LDA $92E6,X                 ; $92DC   lo byte
        PHA                         ; $92DF
        LDA $92E5,X                 ; $92E0   hi byte
        PHA                         ; $92E3
        RTS                         ; $92E4   → 跳到 handler

; F0+ jump table @ $92E5 (each entry = 2 bytes lo,hi):
$92E5: 04 93 38 93 4F 93 5D 93 6B 93 8C 93 99 93 A6 93
$92F5: 29 94 34 94 41 94 8E 94 8E 94 8E 94 91 94 BB 94
```

### 完整 F0+ handler 表:

| Byte | Handler | Handler PC | 角色 (推测) |
|------|---------|------------|-------------|
| $F0  | $9304 | loop toggle | decrement counter at $0094+0x13, dispatch based on remaining |
| $F1  | $9338 | 2-byte write | write 2 indirect bytes from $0092→$0094 offsets 4,6 (NAMTBL PPU addr lo,hi) |
| $F2  | $934F | 2-byte helper | inline `JSR $9338`-like |
| $F3  | $935D | OAM setup | pattern dependent, JMP $94AE return |
| $F4  | $936B | pattern run | page-crossing, complex inline dispatcher |
| $F5  | $938C | flag setter  | `ORA #$40` flag at $0094+0, JMP $94AE |
| $F6  | $9399 | flag clear  | `AND #$BF` clear bit 6 at $0094+0, JMP $94AE |
| $F7  | $93A6 | pos setter  | reads byte from $0092+1, LSR*5, splits high/low into $0094+9/10 (sprite Y,X) |
| $F8  | $9429 | (handler)   | page-crossing inline handler |
| $F9  | $9434 | (handler)   | more complex multi-byte |
| $FA  | $9441 | (handler)   | page-crossing |
| $FB  | $948E | default     | (默认/未使用) |
| $FC  | $948E | default     | (== FB)      |
| $FD  | $948E | default     | (== FB)      |
| $FE  | $9491 | (handler)   | page-crossing |
| $FF  | $94BB | (handler)   | page-crossing |

★ $F0-$FF 全部是 PRG bank00 $92A0 F0+ dispatcher 入口。
★ bank-08 NT 流不进入这个 dispatcher (前面确认 bank-08 流没有控制码)。

## 3. 跨参考表：哪些实际数据流使用了 F0+ ?

| Stream | File        | 入口 |
|--------|------------|------|
| **OAM sprite**  | bank19 (sprite frames) | 通过 `$8A34`-like 主循环 (待 V0.7 详查) |
| **NT bank-08** | bank00/code_render.s `$8EF0` | **无 F0+ 中转，原样 4 字节 raw 写 NT** |

## 4. 数据流结论

- **bank-08** = 32+ NT screens (8KB raw) 每屏 32 列 × 30 行 = 960 byte NT layout
  - 屏幕间标记 = `0xAA` (block header) / `0xFF` (row terminator) / `0xFA` (block fin)
  - 这些 byte 不是"控制码" — 是 PRG raw tile data，**不可当作 SceneVM 解释**
- **F0+ 控制码** 在 OAM sprite 流（bank19/related），与 bank-08 无关
- prg-bank-08.ts 头注释 "F0=清标志 F1=跳转" **错误**，需更正为 "N/A (raw NT tile data)"

## 5. H5 重构进展

| 项 | 状态 | 文件 |
|----|------|------|
| bank-08 raw tile 字节流 | ✅ 提取完整 (8704 bytes) | `rom-data/rom-data/prg-bank-08.ts` |
| $8EF0 NT writer 反汇编 | ✅ 反汇编 | `src/asm/bank00/code_render.s:6-160` |
| $92A0 F0+ dispatcher 反汇编 | ✅ 反汇编 + 跳转表 | `src/asm/bank00/code_sub.s:246-289` |
| F0+ 16 handler 详细语义 | ⚠️ 大致归纳 (router 框架)，具体每 handler 业务逻辑待 V0.7 | `code_sub.s:290-410` |
| 每屏 owner (callers of $8EF0) | ❌ 未完成 | bank00/code_main.s 待扫 |
| 屏/帧 number-table 对应 | ❌ 未完成 | 待 frame-level trace |
| BANK6 palette 真实 meeting 调色板 | ❌ 反汇编未深 | bank6 (data bank, mostly tables) |
