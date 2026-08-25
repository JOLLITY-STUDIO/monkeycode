# BANK00 (PRG bank 0) 完整分析 v1

> **基于**:
> - 直接反汇编 PRG bank 0 (`$8000-$9FFF`, 8192 字节, MMC3 R6 可切)
> - 拆分子文件 `src/asm/bank00/{bank00.s, code_main.s, code_scene.s, code_render.s, code_util.s, data_tail.s, _full.s}` (合计 ~3700 行)
> - 已经存在的 `docs/BANK02_ANALYSIS.md` (格式参考)
> - 已经存在的 `docs/H5_ASM_REVERSE_ANCHOR.md` (已锚点表)
> - 已经存在的 `docs/rom-data-locations.md` (ROM 数据表)
> - 字节验证脚本 `src/asm/verify_bank00.py` (100% 字节对齐)
> - H5 翻译产物 `src/game/prg/code/system/*Service` / `scene/SceneXController.ts`
> - debug dump 脚本 `_dump_bank0.cjs` / `_dump_all_helpers.cjs` / `_disasm_b0*.cjs`

---

## 1. Bank00 整体架构

### 1.1 PRG bank 映射 (MMC3 mapper 4)

| CPU 地址 | PRG bank | 备注 |
|---|---|---|
| `$6000-$7FFF` | PRG-RAM (8 KB SRAM) | game save / 工作 RAM |
| **`$8000-$9FFF`** | **bank 0 (R6 可切)** | **★本文档对象★: 主 dispatcher / scene data / render / util / scheduler tail** |
| `$A000-$BFFF` | bank 2 (R7=2) | Scene0/Scene1+ handlers |
| `$C000-$DFFF` | bank 14 (固定) | NMI handler + 6-slot timer dispatcher |
| `$E000-$FFFF` | bank 15 (固定) | reset vector + RST handler |

**关键说明**:
- MMC3 R6 切到 bank 0 是**默认/上电状态** (mapper 初始化时 R6=0)
- 因此 `$8000-$9FFF` 在 boot / 多数菜单/配置期**常驻可见**
- bank2 / bank14 通过切 R6=2 / R6=14 临时切换出去 — 是为什么大多数游戏逻辑 dispatch 都在 bank2 而**不是 bank0**

### 1.2 5 个 sub-file 划分 (从 .org $8000 起步)

| Sub-file | 范围 | 行数 | 字节数 | 大致功能 |
|---|---|---|---|---|
| `bank00.s` | (header only) | 27 | — | `.segment "PRG_BANK00"`, `.org $8000`, 5 个 `.include` |
| `code_main.s` | `$8000-$8AB2` | 1126 | ~2739 | **Main loop, input, menu logic, dispatcher tables** |
| `code_scene.s` | `$8AB3-$8EEF` | 539 | ~1085 | **Scene handler loader, scene stream parser, NT copy** |
| `code_render.s` | `$8EF0-$968F` | 945 | ~1920 | **Tile render, sprite setup, OAM, PPU address calc** |
| `code_util.s` | `$9691-$9EA0` | 1030 | ~2067 | **Jump tables, PPU transfer, I/O, audio, math, NT base pattern** |
| `data_tail.s` | `$9EEF-$9FFF` | 142 | ~273 | **Scheduler tail (6-slot dispatcher done entry), stack save/restore** |
| **总用** | `$8000-$9FFF` | 3770 | **~8084 字节** | (8192 bytes 含 padding) |

**百分比分布** (按字节):
- code_main.s ~33.8% — **最大段, 主循环+菜单逻辑**
- code_util.s ~25.6% — jump tables + 数学+PPU transfer
- code_render.s ~23.7% — tile 渲染/精灵设置
- code_scene.s ~13.4% — scene handler + 流解析
- data_tail.s ~3.4% — scheduler 尾巴+stack

### 1.3 子文件功能细分

| Sub-file | 关键 routine 集群 |
|---|---|
| **code_main.s** | `$8000` dispatcher table jump / `$8019-$8282` main loop / `$8285` audio req / `$8297` wait/spin / `$82B5` clear input / `$82ED` NT-stream loader / `$83A8-$845E` data tables / `$8464` PPU transfer cfg / `$84CB-$88FF` main render logic / `$8901` palette xor / `$890C` accumulator / `$8920` OAM dump / `$8A14` ASCII tile / `$8A91` tile constructor |
| **code_scene.s** | `$8AB3` tile range data / `$8AF7` scene handler loader (CHRPATH) / `$8B99-$8BAB` CHR bank / `$8BB0` scene stream parser / `$8D1F-$8DFC` scene 状态机 / `$8E15-$8EEF` NT copy/tile decoder |
| **code_render.s** | `$8EF0` inner render / `$9071-$9076` PPUADDR helper / `$9085` scheduler tail entry / `$9145-$968F` sprite/OAM 主装配器 |
| **code_util.s** | `$96A1` palette update / `$97AB`-`$97B6` PPU buffer write / `$9819`-`$9889` PPUMASK/CTRL setup / `$98A0` NT clear / `$98EC`-`$9965` PPU bulk transfer / `$99F0-$9A30` fade in/out helpers / `$9A71-$9AA1` NT 16+16 cell writer / `$9AB8-$9B05` pointer resolution / `$9B11` clear all / `$9B2C`-`$9B5D` NT 4-byte entry writer / `$9BA0` scheduler reset / `$9BA9/$9BCA` physics adders / `$9C71`-`$9D24` player move logic / `$9D27`-`$9D72` scene data writer / `$9DEE` multiplier helper / `$9E0C-$9E36` divide / `$9E4F-$9EA0` BCD converter (BCD→2 byte)/ `$9EA2` 16-byte NT base pattern |
| **data_tail.s** | `$9EEF` 6-slot scheduler tail body / `$9F4F` stack restore / `$9F69` scheduler slot alloc / `$9F7E` clear sl / `$9F89-$9F95` slot reset / `$9FA8` main "push state + JMP scheduler" trampoline |

---

## 2. Routine 反汇编清单

### 2.1 code_main.s ($8000-$8AB2) — 主循环+菜单

#### `$8000`: **6-byte dispatcher table jump** (主入口 trampoline)

```asm
$8000: A5 27        LDA $0027       ; A = scene status code
$8002: 0A           ASL             ; multiply by 2 (index into table)
$8003: AA           TAX             ; X = table offset
$8004: BD 0E 80     LDA $800E,X     ; A = low byte of handler
$8007: 48           PHA             ; push to stack (then handler addr)
$8008: BD 0D 80     LDA $800D,X     ; A = high byte
$800B: 48           PHA
$800C: 60           RTS             ; RTS = JMP to (handler addr)
```

**Anchor**: 这就是 **`$C821` 6-slot timer dispatcher 调 JMP 触发的真入口**! ROM 在 bank2/14 时切回 R6=0, 走 `$8000` 根据 `$0027` (scene status byte) 跳到对应 handler.

#### `$800D-$8014`: dispatcher table (5 entries × 2 byte)

```asm
$800D: 65 81 8A 81 AD 81 B4 81 DA 81   ; 5 个 low bytes
$8014: A2 02                          ; high byte 全部 = $A2
```

5 个 handler: `$8165 / $818A / $81AD / $81B4 / $81DA` (全在 bank0 `$A2xx`, **实际地址 `$A265 / $A28A / $A2AD / $A2B4 / $A2DA`** — 这是银行切换后的实际地址, 因 `$8000-$9FFF` 在大多数时候常驻)

**关键发现**: 此 dispatcher **不是 bank-local**, 跨 bank 跳转

#### `$8019`: main game loop entry (boot 后的常态化入口)

```asm
$8019: 20 B9 C4     JSR $C4B9       ; bank select via R6/R7 switch helper
$801C: 4C 03 A2     JMP $A203       ; 跳到 bank2 $A203 (真 main loop body)
```

**Anchor**: `HardwareInitService.boot()` ↔ `BootRouter.schedulerInit`

#### `$801F`: scheduler reset + Start button spin loop

```asm
$801F: 20 A0 9B     JSR $9BA0       ; scheduler reset
$8022: A9 00
$8024: 20 64 84     JSR $8464       ; PPU transfer cfg(0)
$8027: A9 01
$8029: 20 A8 9F     JSR $9FA8       ; wait 1 frame
$802C: AD 1E 00     LDA $001E       ; read input (joypad)
$802E: 29 10        AND #$10        ; bit4 (Start button)
$8030: F0 F5        BEQ $8027       ; loop until Start pressed
$8032-…: STA $0005..$005B ; clear all state RAM
$8048: A9 01 / STA $0700 ; scheduler start marker
```

**Anchor**: `Scene0Controller.onEnter()` boot init sequence — 这就是**"标题画面 → 按 Start 键 → 进入游戏"**的按钮 spin loop

#### `$8053-$8090`: boot logo load sequence

```asm
$8053: 20 11 9B     JSR $9B11       ; clear all sprite/tile state
$8056: A9 02
$8058: 20 A8 9F     JSR $9FA8       ; wait 2 frames
$805B: 20 7F 9B     JSR $9B7F       ; hideOam (DMA $0200 ← #$F8)
$805E: 20 A0 98     JSR $98A0       ; clear NT ($2000/$2001 write + bulk $2000 32 col)
$8061: A9 0D
$8063: 20 97 82     JSR $8297       ; wait 13 frames (scheduler spin)
$8066: A9 00 / STA $007B
$806A: A9 17
$806C: 20 F7 8A     JSR $8AF7       ; CHR load 0x17 (CFG[0x17])
$806F: A9 30
$8071: 20 0C 89     JSR $890C       ; OAM Y += #$30 (raise all sprites 48 px)
$8074: 20 FB 88     JSR $88FB       ; palette xor (every OAM attr ^= #$20)
$8077: 20 35 9A     JSR $9A35       ; load BG palette group 0 + fade
$807A-$808A: clear scroll ptrs $0090/$0091=2; clear $001B bit0
$808D: A9 0A / STA $00ED
$8091: A5 ED / STA $00E6 ; $E6=$ED=0x0A
$8093: A9 22 / STA $00E7 ; $E7=0x22
$8099: A0 01 / A2 01 / A9 7F
$809F: 20 EA 98     JSR $98EA (PPU buffer write at $0A22, 127 bytes)
```

**Anchor**: `Scene0Controller.onEnter()` boot init phase — 完全匹配 H5 `Scene0Controller.onEnter()` boot 装载序列.

#### `$80A2-$80D4`: input polling + flash sprite attr

```asm
$80A2: A9 01
$80A4: 20 A8 9F    ; wait 1 frame
$80A7: AD 1E 00    ; LDA $001E (joypad)
$80A9: 29 3C       ; AND #$3C (select+start+a+b bits)
$80AB: F0 F5       ; BEQ $80A2 loop
$80AD-$80B0: ASL×2 + BMI (test bit7=$20): $80BC = "EOR #40"
$80B1-$80B2: ASL + BMI (test bit6=$10): $80D4 = "LDA $001C AND $C0 CMP #$C0"
$80B4-$80B9: 2 ASLs; AND #$40; ORA #$0A; JMP $80C0
```

**Anchor**: `InputService.readControllers()` flash/sprite toggle. 3 个按键分支决定亮灯/灭灯/blink.

#### `$80BC`: palette flash helper — XOR #$40

```asm
$80BC: A5 ED       LDA $00ED       ; read flash state
$80BE: 49 40       EOR #$40        ; toggle bit 6
$80C0: 85 ED       STA $00ED       ; save back
$80C2-C8: set $E6=$0A $E7=$22
$80CA-$80CE: LDY #$03 LDX #$01 JSR $98E8 (PPU buffer write)
$80D1: JMP $8091   ; loop
```

**Anchor**: `Scene0Controller.bootFlash()` (idle 时 sprite 一闪一闪)

#### `$80D4`: select+start 同时按 → 跳出主循环

```asm
$80D4: AD 1C 00  LDA $001C
$80D6: 29 C0     AND #$C0
$80D8: C9 C0     CMP #$C0      ; Select+Start 同时按
$80DA: D0 03     BNE $80DF
$80DD: 4C 09 A2  JMP $A209     ; 跳转 to bank2 $A209 (game-start 入口)
```

#### `$80E6`: PPU 启动链路 (game enter)

```asm
$80E6: 20 A0 9B  JSR $9BA0  ; scheduler reset
$80E9: A9 01
$80EB: 20 64 84  JSR $8464  ; PPU transfer cfg(1)
$80EE: 20 B5 82  JSR $82B5  ; clear input state
$80F1: A9 C0 / 85 E0       ; $E0=$C0 (cmd flag)
$80F5: A2 02 / 20 B9 C4    ; LDX #$02 / JSR $C4B9 (bank select)
$80FA: 20 0F A2            ; JSR $A20F (load scene 0 字节装载)
$80FE: A9 00 / STA $0028=$29=$27=0
$810A: LDX #$02 / JSR $C4B9
$810F: JSR $A20C           ; 进一步装载
$8112: A9 00 / 20 20 89    ; JSR $8920 (PPU transfer 0=clear)
$8117: LDX #$01 / JSR $C4B9
$811C: JSR $A006            ; 调 bank2 $A006 routine
$811F: JSR $C572
$8122: LDX #$55
$8124: LDA $0026            ; read stage select
$8126: C9 20 / BCC $812C    ; if < 0x20: LDX #$4C
$812C: 8E 00 07             ; STX $0700 (scheduler init)
```

**Anchor**: `GameSystemService.startGame()` + `BootRouter.sceneChainSelect()`

#### `$82B5-$82EC`: clear input state

```asm
$82B5: 20 A8 9F   ; JSR $9FA8 (push state)
$82BA-BC: LDA $4D/ORA $4E  ; check video busy flag
$82C0-C4: BNE loop (wait for DMA done?)
$82C6-E2: STA $5/$6/$9/$A/$11/$12/$D/$E/$4C=0
$82DA-E2: LDA #$01 STA $0700 / JSR $9BA0 (scheduler reset)
$82E2-EA: STA $44/$45/$7A/$7B=0
$82EC: RTS
```

**Anchor**: `InputService.resetState()` + `RenderingPrimitivesService.clearSprites()`

#### `$82ED-$83A2`: NT stream loader (主 scene 数据装载)

```asm
$82ED: 20 8A 83   ; JSR $838A (load scene bank)
$82F0: A5 4C      ; LDA $004C
$82F2: 10 F9      ; BPL $82ED
$82F4: 0A         ; ASL
$82F5: AA         ; TAX
$82F6-$82FF: LDA $B800,X / STA $EC ; LDA $B801,X / STA $ED ; (load ptr to bank24 stream)
$8300-$831A: Y=0; LDA ($EC),Y; BMI $8355 (single tile path) / STA $E9 ; ... stream parser
```

**Anchor**: `NtStreamLoaderService.loadSceneStream()` — 从 bank24 ($B800-$BFFF) 装载 16 tile per call.

#### `$838A`: scene bank select helper

```asm
$838A: A2 02 / 20 B9 C4 ; LDX #$02 JSR $C4B9 (bank24 select)
$838F: 20 15 A2        ; JSR $A215
$8392: A2 06 / 20 B9 C4 ; LDX #$06 JSR $C4B9 (bank6 select)
$8397: RTS
```

#### `$8398-$8462`: 数据表 (8 × 32 字节) — 详见 §5

#### `$8464`: **PPU transfer cfg loader** — 重要 multi-bank 装载器入口

```asm
$8464: A0 00     LDY #$00
$8466: C8 / C8   INY / INY
$8468: D9 EE 8A  CMP $8AEE,Y      ; find scene cfg id in table
$846B: B0 F9     BCS $8466          ; loop
$846D: 38        SEC
$846E: E5 EC 8A  SBC $8AEC,Y       ; calc offset
$8471: AE ED 8A  LDX $8AED,Y       ; load hi byte of cfg address
$8474: 0A        ASL
$8475: 69 00     ADC #$00
$8477: 85 4D     STA $4D
$8479: A9 00 / 69 A0 / 85 4E      ; $4E=$A0 (high byte)
$847F: 86 56     STX $56
$8481: A5 25     LDA $0025         ; current NT row
$8483: 85 ED     STA $ED
$8485: 20 B9 C4  JSR $C4B9          ; bank select
$8488-$84A2: load 2-byte ptr from PTR ($4D) → $4D:$4E; Y=$50 / A=$00 JSR $9F69 (sprite alloc)
$84A5-B2: STA $D=$E=0 (work), $652=0
$84B0-B6: $E6=$E0 $E7=$23 (PPU buffer addr)
$84B8-BE: Y=1 X=$20 A=$55 JSR $98EA (PPU buffer write at $E023)
$84C1-C3: LDX $ED / JMP $C4B9
```

**Anchor**: `PpuTransferService.loadCfgBlock()` (multi-bank loader — 不同 cfg 给不同 bank)

#### `$84C6`: stage chain dispatcher (主游戏循环 dispatcher)

```asm
$84C6: A6 56      LDX $0056    ; load previous bank #
$84C8: 20 B9 C4   JSR $C4B9    ; bank select
$84CB-$84CD: STA $55 = #$08 (chunk size counter)
$84CF-$84D5: STA $4F = #$49 / $50 = #$22 (PPU start addr)
$84D7: A5 4F     ; STA $51 = $4F (mirror for sub-iteration)
$84DD: $54 = $51 AND $1F (col)
$84DF-$84E5: $52 = $50, $53 = $51 (PPU dest mirror)
$84E7: A0 00 / B1 4D ; LDY #0 / LDA ($4D),Y
$84EB-$84ED: CMP #$D8 / BCS $8504
$84EF-$84F3: LDX $52 LDY $53 JSR $88CA (render tile)
```

**这正是 H5 `InterruptService.applyChrFrom009e()` 的对应物 — 字节流驱动每帧的主渲染循环**

#### `$8464-$8879`: 字节码执行引擎 (op-code interpreter)

$853C 处的 jump table (32 个 indirect entry × 2 byte = 64 字节) 在 `$8545-$8584` 列出 32 个 op-code handler 的地址:
```
8574: 74 85 7F 85 8C 85 C3 85 D1 85 EB 85 03 86 17 86 
       2B 86 49 86 77 86 81 86 B7 86 B7 87 CA 87 D8 87 
       F7 87 13 88 1A 88 30 88 36 88 54 88 61 88 6F 88
```
每个 op-code 调 `$84E7`/`$8879` 等继续执行 — **这正是本文档 `MainRouterService` 候选的对应物**

#### `$88CA`: tile constructor (single tile)

```asm
$88CA: 48           PHA
$88CB: A9 82        LDA #$82
$88CD: 20 28 9B     JSR $9B28     ; sprite alloc (get next slot)
$88D0: 68           PLA
$88D1: C9 A0        CMP #$A0
$88D3: 90 18        BCC $88ED     ; if < $A0 (ascii tile): 4-byte NT entry path
$88D5: 48           PHA           ; else if >= $A0
$88D6: C9 C8        CMP #$C8
$88D8: A9 94        LDA #$94
$88DA: 69 00        ADC #$00
$88DC: 9D E8 05     STA $05E8,X   ; tile byte 1
$88DF: E8 / 68      INX / PLA     ; Y ptr
$88E1: A8 / B9 14 8A ; TAY / LDA $8A14,Y ; look up tile char
$88E5: 9D E8 05     STA $05E8,X   ; tile byte 2
$88E8: E8 / 20 5E 9B ; INX / JSR $9B5E (commit)
$88EC: RTS
$88ED: 9D E9 05     STA $05E9,X   ; < $A0: NT lo byte path
$88F0: A9 00        LDA #$00
$88F2: 9D E8 05     STA $05E8,X   ; NT hi byte = 0
$88F5-F7: INX INX / JSR $9B5E / RTS
```

**Anchor**: `TileBuilderService.build()` — 主要场景 tile 构造 (2 路径: ASCII char → table lookup / 直接 NT address)

#### `$88FB`: paletteXor (sprite attr flip)

```asm
$88FB: A2 00       LDX #$00
$88FD: BD 6A 04    LDA $046A,X  ; sprite attr (every 4 byte starting @ oam[2])
$8900: 49 20       EOR #$20     ; flip bit5 (palette swap)
$8902: 9D 6A 04    STA $046A,X
$8905-08: INX INX INX INX
$8909: D0 F2       BNE $88FD    ; loop 64 sprites
$890B: RTS
```

**Anchor**: `RenderingPrimitivesService.flipAllSpritePalettes()` — 用于 "boot idle 时 sprite 闪烁"

#### `$890C`: accumulator (累加器 — add value to all sprite Y)

```asm
$890C: 85 ED       STA $00ED    ; save accumulator
$890E: A2 00       LDX #$00
$8910: BD 68 04    LDA $0468,X  ; sprite Y coord
$8913: 18          CLC
$8914: 65 ED       ADC $00ED    ; +accumulator
$8916: 9D 68 04    STA $0468,X
$8919-$891C: INX×4
$891D: D0 F1       BNE $8910
$891F: RTS
```

**Anchor**: `SpriteService.shiftAll()` — 整组 sprite Y 平移

#### `$8920`: OAM/PPU dump (sprite OAM → PPU transfer)

```asm
$8920: A2 13       LDX #$13
$8922: 20 EE 9D    JSR $9DEE    ; multiply helper
$8925-$8930: add #$BF to $EC/$ED (PPU buffer offset tweak)
$8932-$893D: STA $EA / LDX #$06 JSR $C4B9 / LDA $78 / BNE $893B (busy spin)
$893F-$895C: Y=0; LDA ($EC),Y / STA $79 ; LDA $00 / STA $7A ; loop 19 bytes
$895C: RTS
```

#### `$89A3`: 主 loop 内层 (类似 input spin)

```asm
$89A3: A0 FC       LDY #$FC
$89A5: B9 D2 88    LDA $88D2,Y  ; default sprite template
$89A8: 99 68 04    STA $0468,Y
$89AB: C8 / D0 F8  INY / BNE $89A5
$89AE: LDX #$F8
$89B0: LDY #$00 / LDA #$01 / JSR $9FA8 (push state)
$89B7-BE: LDA $001E / BMI $89CA / INY / CPY #$28 / BEQ $89A3 / CPY #$18
$89C2-$89CB: ...
```

#### `$89D2`: scene 数据 ptr parser

```asm
$89D2: A8          TAY
$89D3: A2 06       LDX #$06
$89D5: 20 B9 C4    JSR $C4B9
$89D8: A8 / 0A / AA  TAY / ASL / TAX
$89DB-$89EE: LDA $BD00,X / STA $654 / STA $655 / STA $652 = #$80 / STA $653 = #$01
$89F1-$89FB: $90=0 $91=2 / LDX $56 / JSR $C4B9 / RTS
```

**Anchor**: `SceneStateMachine.loadSceneStream()` — 装配 scene 流状态

#### `$89FF`: scene 数据 fetch per-frame

```asm
$89FF: A5 52       LDA $0652 (stream state flag)
$8A02: 30 03       BMI $8A07
$8A04: 4C 90 8A    JMP $8A90 (return if not active)
$8A07: C6 53       DEC $0653 (counter--)
$8A0A: F0 03       BEQ $8A0F (if 0, load next)
$8A0C: 4C 90 8A    JMP $8A90
$8A0F: A2 06 / 20 B9 C4 ; LDX #$06 JSR $C4B9
$8A13: AD 54 06    LDA $0654
$8A17: 85 E6       STA $00E6
$8A19-$8A35: addr setup + read 1 byte from ($E6),Y
$8A35-8A39: CMP #$FF → $8A86 / CMP #$FE → $8A7B
$8A3D-$8A6F: parse 4 entries × JSR $8A91 (tile construct)
$8A86-$8A8C: cleanup / RTS
```

**Anchor**: `SceneStateMachine.tickStream()` — 每帧 fetch 4-byte NT entries

#### `$8A91`: **4-byte tile constructor**

```asm
$8A91: A9 84       LDA #$84
$8A93: 20 28 9B    JSR $9B28  ; sprite alloc
$8A96: A0 00       LDY #$00
$8A98: B1 E8       LDA ($E8),Y ; load byte from ptr
$8A9A: 9D E8 05    STA $05E8,X
$8A9D-$8AA2: INX / INY / CPY #$04 / BNE $8A98 (4 bytes)
$8AA3: 20 5E 9B    JSR $9B5E (commit)
$8AA6-$8AB1: $E8 += 4 (advance ptr)
$8AB3: RTS
```

**Anchor**: `TileBuilderService.buildTile4()` — 4-byte NT entry builder (用于 sprite 双帧双 tile)

---

### 2.2 code_scene.s ($8AB3-$8EEF) — Scene handlers + NT copy

#### `$8AB3`: **scene data tables (tile ranges)** — 60 字节

```asm
.byte $06,$07,$08,$09,$0A,$0B,$0C,$0D,$0E,$0F,$10,$11,$12,$13,$14,$1A  ; tile range low [0..15]
.byte $1B,$1C,$1D,$1E,$46,$47,$48,$49,$4A,$4B,$4C,$4D,$4E,$4F,$50,$51  ; tile range low [16..31]
.byte $52,$53,$54,$5A,$5B,$5C,$5D,$5E,$1A,$1B,$1C,$1D,$1E,$5A,$5B,$5C  ; tile range high [0..15]
.byte $5D,$5E,$01,$0A,$14,$28,$3C,$50,$78,$F0,$00,$03,$10,$04,$20,$05  ; tile range high [16..31]
.byte $60,$06,$FF                                            ; trailing: 60/06/FF
```

(60 字节数据表 — 用作 scene tile palette 索引范围 / channel 计数)

#### `$8AF7`: **scene handler loader (CHRPATH setup)** ★

```asm
$8AF7: 85 ED       STA $00ED    ; cfg idx
$8AF9-$8B09: clear $9/$A/$D/$E=0 ; AND $5B &= #$7F ; $77 = $25
$8B0D-$8B27: LDX #$07 JSR $C4B9 (bank select); STA $552.. 8-byte Y loop clear
$8B1C-$8B2D: ASL $ED / TAX; LDA #$00 ROL → TAY / TXA CLC ADC #$00 / STA $63 (lo) / TYA ADC #$A0 STA $64 (hi)
$8B2F-$8B3F: Y=0; LDA ($63),Y; TAX / INY / LDA ($63),Y / STA $64 / STX $63 (load ptr)
$8B3B-$8B47: LDA ($63),Y → $75 / $76 (2-byte cnt)
$8B49-$8B57: LDA ($63),Y → $48 / ROL $5B / $E / $5F
$8B59-$8B7F: more bytes for $5C/$5D (PPU buffer offset)
$8B81-$8B91: AND $5D #$0C / BNE / $7B ASL×2 EOR $5B / AND $04 / ORA $5D STA $5D (tile per-row config)
$8B93-$8BAE: compare $5E #$09 / BCC $8B9F / JSR $9071 / JMP $8BAB / etc.
```

**Anchor**: `SceneStateMachine.loadSceneHandler()` — 装载 scene 流配置 (类似 `SceneTable.apply()`)

#### `$8BB0-$8D1D`: **scene stream parser** ★★

```asm
$8BB0: A9 01 / 20 A8 9F ; LDA #$01 JSR $9FA8 (push state, wait 1 frame)
$8BB3-BE: $63 +=6 / $64 +=carry (advance ptr)
$8BC0-C4: $5E=$5F JSR $9DEE (multiply helper)
$8BC7-D2: $70 = $63 + $EC; $71 = $64 + $ED ; (data ptr → current entry ptr)
$8BD4-EB: $60=0 / Y=1 / LDA ($70),Y / AND #$E0 STA $62 / LDA ($70),Y AND #$1F
$8BE5-EE: TAX / LSR / ROR $60 / LSR / ROR $60 / STA $61 / TXA BEQ $8BF3 / INY / LDA ($70),Y STA $72
$8BF5-...: parse 1 entry → decide which PPU target
$8BFB: CMP #$40 BEQ $8C15 (PPU buffer write slow path)
$8BFF: CMP #$80 BEQ $8C0C (palette xor path)
$8C03-40: else 4 paths:
  - LDA #$04 LDX #$01 LDY $5F JMP $8C59 (skip + ret)
  - LDA $5E LDX $5F JSR $9DEE ; $EC -= 1 ; adjust ptr
  - LDA $5F ; $63 += $5F-1 ; (advance ptr to end)
  - LDA #$FC LDX #$FF LDY $5F (default)
$8C59-$8C87: STA $6D / STX $6E / STY $6F ; $5E-=7 if ≥7 / Y=7 LDX $5F JSR $8E15 / $7B=1 / LDX #$09 LDY $78 LDA #$00 JSR $9F69 ; scheduler alloc
$8C89-CA5: LDY $5E LDX $5F JSR $8E15 (NT copy); $72 BEQ $8CA5 ; scheduler alloc another
$8CA5-8CB7: STA $8E / STA $8F / clear $44/$45/$7A / LDX $77 / JMP $C4B9 (bank switch)
$8CBA-$8D1D: secondary parse loop (6-byte chunks): LDX #$07 JSR $C4B9 ; $69=$6A=0 ; BIT $62 BMI ; ... ; physics add JSR $9BA9 / JSR $9BCA ; SCC
```

**Anchor**: `NtStreamLoaderService.parseSceneStream()` — 主 scene 流解析器 (parse 6-byte chunks)

#### `$8D22-$8DFC`: **scene 状态机 inner loop** ★

```asm
$8D22-$8D40: LDX #$07 JSR $C4B9 ; LDX #$02 LDY #$00 LDA ($70),Y ; BEQ $8D3A (end)
$8D30-$8D3B: ASL / BCC / TAX / LDA #$FE / JSR $9FA8 / INX / INX / TXA / JSR $9FA8 (special byte path)
$8D3E-$8D5B: STA $69/$6A=0 ; BIT $62 / BMI $8D55 / 2's complement / BIT BVC $8D88 / LDA #$01 JSR $9FA8
$8D5E-$8D7F: physics add via $9BA9 ; TXA BPL/EOR/CLC/SBC $6A / BNE $8D88 / SBC #$20
$8D81-$8D85: DEC $72 / BNE / JMP $8DC8
$8D88-$8DC7: alternate tick (positive physics instead of $9BA9)
$8DC8-$8DFC: clean up + LDA $7A SEC SBC $6A STA $7A / LDA $7B SBC #$00 STA $7B / LDA $47 SBC $6A STA $47 / ... / JMP $9F7E (scheduler clean)
```

**Anchor**: `SceneStateMachine.tickPhysics()` — scene 物理 tick (counter BCD-arith via carry)

#### `$8DFF-$8E13`: key/entry 调度

```asm
$8DFF: A5 5B / 09 80 / 85 5B ; ORA #$80 set bit7 of $5B
$8E05-$8E09: Y=1 LDX $5F JSR $8E15 (NT copy)
$8E0C-$8E12: $5B &= #$7F / JMP $9F7E
```

#### `$8E15-$8EEF`: **NT copy / tile decoder** ★★

```asm
$8E15: 84 6C       STY $006C
$8E17: 86 6B       STX $006B
$8E1B-$8E1F: $65=$63; $66=$64 ; $ED=$6B; $73=$5C; $74=$5D
$8E2D-$8E31: Y=0 LDA ($63),Y JSR $8EF0 (render inner)
$8E34-$8E41: X=$5C; CLC ADC $6D; STA $5C; TXA EOR $5C AND #$20 BEQ $8E58
$8E43-$8E50: $6D ASL×3 EOR #$FF CLC ADC #$01 CLC ADC $5C STA $5C (PPU row wrap)
$8E52-$8E56: $5D EOR #$04 STA $5D
$8E58-$8E72: PLA $6E; CLC ADC $63 STA $63; PLA BMI $8E6A; $64 ADC #$00 JMP $8E6E; LDA $64 SBC #$00
$8E70-$8E72: $ED DEC; BNE $8E2D (loop)
$8E74-$8E88: same for $6F (alt outer)
$8E8C-$8EBF: $62 AND #$C0 CMP #$40 / BNE $8EE8 (decide column wrap)
$8EC2-$8EE6: alt path (back subtract)
$8EEC: JMP $8E19 (loop)
$8EEF: RTS
```

**Anchor**: `NtStreamLoaderService.decodeAndCopyNT()` — NT 4-byte entries 解码+复制 (核心 sprite descriptor → NT cell flow)

---

### 2.3 code_render.s ($8EF0-$968F) — Tile render/sprite setup

#### `$8EF0`: **inner render loop entry** ★★

```asm
$8EF0: AA           TAX
$8EF1: A5 5C        LDA $005C   ; PPU row counter
$8EF3: 85 67        STA $0067
$8EF5: A5 5D        LDA $005D
$8EF7: 85 68        STA $0068
$8EF9-$8EFD: $5B AND #$01 → Y (bank mode flag)
$8EFE-900: $EB = A ; $EA = X
$8F03-$8F0D: 4×ASL (×16) + ROL $EB (multiplier to 16)
$8F0F-$8F12: $EA += $EA (ptr arithmetic)
$8F14-$8F17: Y + $EB → $EB
$8F19-$8F1F: $EA += 0 ; $EB += #$A0 (bank wrap)
$8F26-$8F31: LDX #$08 JSR $C4B9 (bank select); Y=0; LDA ($EA),Y STA $E7 (load entry); JSR $8FD1 (sub-render)
...
$8F42-$8F81: tile write inner loop (4 bytes → $5E8,X) with row advance ($67 += #$20)
$8F8E-$8FA3: $9E8 ptr setup, attr TblSR lookup
$8FA5-$8FB7: $5E8,X = (E7>>4) / $64A,Y (palette attr merge)
...
```

**Anchor**: `RenderingPrimitivesService.renderTileFromPtr()` — sprite descriptor → PPU buffer 完整 4-byte 写入

#### `$8FD1`: **PPU row attr calc** (sub-render helper)

```asm
$8FD1: 20 49 90     JSR $9049    ; calc Y,X for attr Tbl
$8FD4-$8FE7: BIT $67; BVC $903A; LDA $67; LSR×2; AND #$07 → Y (attr tbl idx)
$8FE8-$8FF1: $62 AND #$C0; CMP #$40; BNE $900B / BNE path (no merge); 
$8FF2-$901F: merge path: $E7×16 → STA $5E8,X / INX / $E7>>4 ORA $064A,Y STA $00E6 / PLA STA $064A,Y / JSR $9B5E
$9021-$9048: alt path
```

#### `$9049`: row/col → PPU addr converter

```asm
$9049: A5 67 / 29 9C / LSR×2 / STA $E6 ; (sparse row mask)
$9051-$9059: AND #$20 / LSR×2 / ORA $E6 / AND #$0F STA $E6 (col nibble)
$905B-$906F: ASL $68×4 / AND #$30 / CLC ADC #$C0 / ORA $E6 → TAY ; A = $68 AND #$FC ADC #$03 → TAX ; RTS
```

**Anchor**: `RenderingPrimitivesService.calcPpuAttrIndex()` — 计算 PPU attribute table idx + X

#### `$9071-$9076`: PPUADDR setup helper

```asm
$9071: A9 20 / 4C 78 90 ; LDA #$20 JMP $9078
$9076: A9 24              LDA #$24
$9078: 85 E7              STA $00E7 (hi)
$907A-$9082: $E6=0 / Y=$10 / X=$20 / JMP $98E8 (PPU bulk fill at $2400 with 16 bytes)
```

**Anchor**: `RenderingPrimitivesService.fillAttrTbl()` — 填 $23C0 attr 表 32 字节

#### `$9085`: **scheduler dispatch entry** (重要! 每帧中断后调)

```asm
$9085: A9 00        LDA #$00
$9087: A0 01        LDY #$01
$9089: 99 67 04     STA $0467,Y  ; clear $467..$00 (Y loop to 0)
$908C: C8 / D0 FB   INY / BNE $9089 (256 bytes)
$908F: 99 97 00 / 00 97 ; $0097=0 (work)
$9093-$90AC: Y=1 LDA ($4D),Y STA $EC ; $4D += 2 / $94=$68 $95=$05 (ptr setup)
$90B0: STX $ED
$90B2-$90BB: LDY #$00 LDA ($4D),Y → Y / CMP #$6D BCC
$90BD-$90C9: SBC #$6D → TAY / INX / JSR $C4B9 (multi-call helper)
...
$90E6-$90EE: LDA $978B,Y STA ($94),Y (copy base 32 bytes)
$90F0-$90F9: LDA $25 SEC SBC #$09 / ORA ($94),Y STA ($94),Y (modify 1st byte)
$90FB-$9110: load byte from ($92),Y → $49 / $92+=1 / $94+=2 (write lo/hi ptr)
$9117-$912C: $94 += $20 ; $EC-- (loop)
$9131-$9142: cleanup
```

**Anchor**: `SchedulerService.dispatchTick()` ★★ 调 NMI handler 自这

#### `$9145`: **每帧 NMI 中断处理 (player/sprite update)** ★★

```asm
$9145: A9 01 / 20 A8 9F ; push state
$9148-$9152: $94=$68 $95=$05 $96=$04 (4-entry frame)
$9156-$918F: LDA ($94),Y / BMI $915D / JMP $94C1 ; spawn new actor path
$915D-$91A6: parse 4/6 bytes → player lookup
$91A6-$91B2: alt path: $E6 = 0-$46 ; $E8 = 0-$47
$91B4-$91F1: apply dpx/dpy to OAM:
  - $91B4: Y=$10 LDA ($94),Y → TAX / INY LDA ($94),Y / LSR×2 → TAY
  - $91BF-$91CF: $E6 + $0468,X = $0468,X (sprite X += δX)
  - $91D1-$91E8: $046A,X ^= #$08 (sprite attr h-flip if sign changed)
  - $91D5-$91EB: $E8 + $046B,X = $046B,X (sprite Y += δY)
  - $91E3-$91E8: $046A,X ^= #$04 (v-flip)
  - $91EB-$91F1: TXA CLC ADC #$04 TAX / DEY BNE $91BF
$91F3-$9241: sub-entry: $94+1 = ($94+1)-1 → ($94+1) / JMP $94C1
$9201-$9268: alt-load: $94 + (1+($94) AND 2 → bank select)
$9268-$92A0: sub-cmd branches
$92A0-$92E4: dispatch via jump table at $92E5
$92E5-(JMP TBL): 32-byte table of 16 op-codes
$9305-$93C7: 一组 sprite-add/remove ops (将 sprite add/remove from extra attrs)
... (其他 optable ops)
$9429-(JMP TBL JMP): another 16 entries
$94D8-$9586: 全套 sprite descriptor → $0468-X layout (write 4 bytes per sprite)
$9589-$968F: 5 个 sprite descriptor 类型 (A0/A8/C0/C8/D0)
```

**Anchor**: `InterruptService.nmi()` — H5 `InterruptService.nmi()` 是这部分的真对应

#### `$9691-...`: jump table at $9693 (`$92E6 + 8 entries`)

```asm
$9691: 38 / E9 F8 / 0A / AA / BD 93 96 / 48 / BD 92 96 / 48 / 60
       ; dispatcher: A -= #$F8 / ×2 / X = A / PHA ($96,93) / PLA ($96,92) / RTS
```

(此 dispatcher 在 `$9684` 调 — sprite descriptor 类型 $D0 处理跳转)

---

### 2.4 code_util.s ($9691-$9EA0) — utility + jump tables

#### `$96A1`: **palette update entry** ★★ (已锚)

```asm
$96A1: BD 96 96 / 48 / BD 96 96 / 48 / 60  ; jump table
```

(这是 `$9693` 的 palette-update jump table, 包含以下 entry)

#### `$96A3`: palette load route A

```asm
$96A3: (RTS trampoline — indirect $96,96 已 PHA)
```

#### `$96A5`: **palette update body**

```asm
$96A5: A0 13        LDY #$13   ; offset in record
$96A7: B1 94        LDA ($94),Y
$96A9: C9 04        CMP #$04
$96AB: B0 02        BCS $96AF
$96AD: AA / 18 / 69 01 / 91 94 / 8A / 0A / 18 / 69 18 / A8
       ; alloc slot; X += 1 → ($94),Y; X ×2 + #$18 = Y (lo);
       ; $E6 += 3 → ($94),Y (slot 2 bytes); $E7 += carry → ($94),Y++
$96C7: A0 01 / B1 E6 / AA / C8 / B1 E6 / 85 E7 / 86 E6 / 4C 15 95
       ; read 2 bytes from data stream → set new ptr → JMP $9515 (recurse)
```

**Anchor**: `PpuTransferService.allocPalette()` — 已锚 palette 装载

#### `$96D6`: palette update body 2

```asm
$96D6: Y=$13 LDA ($94),Y / BEQ / SEC SBC #$01 STA ($94),Y ; DEC counter
       ; ASL / CLC ADC #$18 / TAY (Y advance)
       ; LDA ($94),Y / STA $E6 / INY LDA ($94),Y / STA $E7 (load ptr)
       ; JMP $9515 (recurse to sprite layout writer)
```

#### `$96F2`: NT grow path (sprite auto-add)

```asm
$96F2: A0 00 / B1 94 / 29 08 / D0 03 / 11 94 (b1 94: ORA #$08 = add bit) / 4C 27 97
       ; if bit3 clear: set it → JMP $9727
$9703-$9724: bit3 was set, check overflow
$9725: A5 98 / AA / LDY $10 / SEC SBC ($94),Y / INY STA ($94),Y / STX $97 / RTS
       ; save ptr
```

**Anchor**: `SpriteService.addSprite()` — `SpriteService` 的 sprite 增加

#### `$9735`: 16-bit slot pointer advance

```asm
$9735: AA / A9 00 / 91 94 / INY / 8A / 91 94 / 0A / 99 95 00 / A9 00 / 69 00 / 99 96 00 / RTS
```

#### `$974A`: 16-bit shift left

```asm
$974A: B1 94 / 0A / C8 / B1 94 / 2A (ROL) / 99 95 / A9 00 / 2A / 99 96 / RTS
```

#### `$975B`: 16-bit signed add

```asm
$975B: 86 ED / B1 94 / 2A 2A / 29 01 / 49 FF / 18 / 69 01 / AA / B1 94 / 88 88 / 18 / 71 94 / 91 94 / 85 EC / C8 / 8A / 71 94 / 91 94 / AA / A4 ED / A5 EC / 18 / 71 94 / 91 94 / 8A / C8 / 71 94 / 91 94 / RTS
       ; 16-bit signed addition
```

**Anchor**: Sprite movement 16-bit signed add (multi-component)

#### **`$978B`**: **16-byte "fade table" or palette shape base** ★

```asm
$978B: $80,$01,$00,$00, $00,$30,$00,$40, $00,$00,$00,$00, $00,$00,$00,$00
       ; 16-byte constant
```

(8 字节 entry, 4 个 entry — sprite descriptor 基础模板)

#### `$97AB`: **PPU buffer write entry** (background NT transfer)

```asm
$97AB: A9 00 / 85 E9 / A9 01 / 85 EB / 4C C4 97 (jmp $97C4)
       ; setup
```

#### `$97B6`: PPU buffer write body ★ (已锚)

```asm
$97B6: A9 00 / 85 E9 / A5 4A / 05 4B / F0 61 / A9 00 / 85 EB ; setup
       ; A = $E9 ; X = $E7
$97C8: A0 01 / B1 E6 / 18 / 65 E9 / 85 E8 / C8 / A9 00 / 2C E9 / 10 02 / A9 FF / 71 E6 / AA
       ; LDY #1 LDA ($E6),Y / ADC $E9 → $E8 ; +carry advance
$97DF: A0 00 / B1 E6 / A4 E8 / 85 E8 / 29 BF / 20 28 9B ; JSR $9B28 (sprite alloc)
$97EA: A5 E8 / 29 3F / A0 03 / 48 (PHA, save count)
$97F1-$9808: tile write loop (A0=count, write $5E8,X 4-byte): LDA ($E6),Y → $5E8,X ; INY / INX / DEC A / BNE loop
       ; Y += $E6 → $E6 ; ADC → $E7
$980A: 20 5E 9B     JSR $9B5E (commit)
$980D-F18: LDA $EB / BEQ / JSR $9FA8 (push state if flag) / BIT $E8 BVC $97C8
$9819: $20 / AND #$7F / STA $2000 (reg $20 = $20&7F)
$981D: STA $0020 / LDA $21 AND #$E7 / STA $2001 / STA $21
$982B: STY $E6 STX $E7
$9831: A0 01 / LDA ($E6),Y / CLC ADC $E9 → TAX / INY / LDA $00 / BIT $E9 / BPL / LDA $FF / ADC ($E6),Y → STA $2006 / STX $2006 (PPU addr set)
$984D-FCB: LDX 0 LDY 0 ; LDA ($E6),Y BPL $9852 / LDX #$04 ; STX $2000
$9855-$9864: PHA / AND #$3F → TAX / LDY #$03 / LDA ($E6),Y / STA $2007 / INY / DEX / BNE loop / PLA
$9865-$9876: ASL / BMI $9877 / TYA CLC ADC $E6 STA $E6 ; JMP $982F
$9877-$9889: ORA #$18 → $2001/$21; ORA #$80 → $20/$2000; RTS
```

**Anchor**: `PpuTransferService.writePpuBuffer()` — 已锚 PPU buffer 装载 (核心 sprite $5E8 → $2007)

#### `$988A`: PPU direct write wrapper

#### `$9897`: PPU bulk wrapper

#### **`$98A0`: clear NT ($2000)+($2001)+($23C0) (32 col)** ★★

```asm
$98A0: LDA $0020 AND #$7F STA $2000 STA $0020
$98A9: LDA $0021 AND #$E7 STA $2001 STA $0021 (disable PPU显示)
$98B2: LDA #$20 STA $2006 LDA #$00 STA $2006 (PPU addr = $2000)
$98BC: LDY #$08 LDA #$00 TAX
       ; loop 256 bytes: STA $2007 INX BNE $98C1 DEY BNE $98C1
$98CA-$98D9: ORA $0021 → $2001 ; ORA $0020 → $2000 (re-enable 显示)
$98DC: RTS
```

**Anchor**: `RenderingPrimitivesService.clearNt()` — 清 NT + PPU 复位

#### `$98E8`: PPU buffer write entry 2 (PPU_DATA 流变种)

#### `$98EC`: **PPU bulk buffer fill (write 16+ rows)** ★★ (已锚)

```asm
$98EC: A5 4A / ORA $4B / BEQ $992C ; if $4A|$4B==0: skip
$98F2-$98F8: STY $E8 / STX $E9 ; $E9 = $E9 / $E8
$98FA: A5 E9 (LDY $E6 LDX $E7) → JSR $9B28 (sprite alloc)
$9903-$9908: STA $5E8,X / INX / DEY / BNE $9903 (Y = height)
$990A: 20 5E 9B   JSR $9B5E (commit)
$990D-$992B: A5 E8 / BPL $9916 ; JSR $9FA8 (push if sign bit) ; $E6 += #$20 ; $E7 += carry ; $E8-- ; AND #$7F ; BNE $98F6
$992C-$9979: PPUMASK disable → set PPUADDR=$E7:$E6 → write $EB × $E8 bytes → re-enable
       ; (full PPU write loop)
```

**Anchor**: `PpuTransferService.bulkPpuWrite()` — 大量 PPU 写 (NT 16 rows)

#### `$997A`: **fade in/out entry (counter-based)** ★★

```asm
$997A: 85 48         STA $0048   ; fade start value (3 high bits = $4A increment counter)
$997C: 86 49         STX $0049
$997E: 20 07 9B     JSR $9B07   ; load current CHR bank
$9981: 20 B8 9A     JSR $9AB8   ; resolve NT ptr
$9984: 20 DA 9A     JSR $9ADA   ; resolve sprite ptr
$9987-$9989: LDX $E9 / JSR $C4B9 (bank select)
$998C-$999A: INC $4A / INC $4B (per-frame fade increment counter)
$999C: 20 71 9A     JSR $9A71   ; re-write NT
$999F-A0A9: JSR $9FA8 (push state) / INC loop / CMP #$1E / BCC
$99AB-$99AD: RTS
```

**Anchor**: `Scene0Controller.fadeIn()` / `fadeOut()` — 已锚 fade in/out

#### `$99D1`: fade inner inc (single-counter version)

```asm
$99D1-$99EF: same but no $4A path, only $4B
```

#### `$99F0`: **fade-out both BG+SPR** (already Dec instead of Inc) ★★

```asm
$99F0: A5 4A / ORA $4B / BEQ $9A0C / TAX / BEQ / DEC $4A
$99F9-9A06: DEC $4B / JSR $9A71 / JSR $9FA8 / JMP $99F0
$9A0C: RTS
```

#### `$9A0D-$9A1E`: 单独 BG fade-in

#### `$9A1F-$9A30`: 单独 SPR fade-in

#### **`$9A35`: scene 调色板装载 entry (BG + SPR full bright + set window)** ★★

```asm
$9A35: 85 48 / 86 49 ; $48 = A ; $49 = X
$9A38-$9A40: JSR $9B07 / JSR $9AB8 / JSR $9ADA / LDX $E9 / JSR $C4B9
$9A43-$9A49: LDA #$0F / STA $4A / STA $4B / JMP $9A71 (force max bright)
```

**Anchor**: `Scene0Controller.loadBgPalette0()` — 已锚 (高 4-bit palette 全亮)

#### `$9A4C-$9A5D`: 同 $9A35 but 只 BG ($49 = X)

#### `$9A60-$9A6F`: 同 $9A35 but 只 SPR

#### **`$9A71`: NT 写入 (16+16 cells)** ★★

```asm
$9A71: A9 20 / LDY #0 / LDX #$3F / JSR $9B28 (sprite alloc, 64 entries)
$9A7E-$9A8B: LDY #0 / LDA $062A,Y / AND #$30 / CLC ADC $4A / JSR $9AA2 / CPY #$10 / BNE $9A7E
       ; 16-iter loop (BG)
$9A8D-$9A9A: LDA $062A,Y / AND #$30 / CLC ADC $4B / JSR $9AA2 / CPY #$20 / BNE $9A8D
       ; 16-iter loop (SPR)
$9A9C: LDX $E7 / JSR $9B5E / RTS
```

**Anchor**: `Scene0Controller.write16x16NT()` — BG+SPR 32 cells 装载

#### **`$9AA2`: 单 cell 写入** ★★ (已锚)

```asm
$9AA2: AA / BD A2 9E / 85 E6 / B9 2A 06 / 29 0F / 05 E6 / A6 E7 / 9D E8 05 / E6 E7 / C8 / RTS
       ; X = A; A = $9EA2,X (base pattern); STA $E6
       ; A = $062A,Y (palette data); AND #$0F; ORA $E6
       ; X = $E7; STA $5E8,X; INC $E7; INY; RTS
```

**Anchor**: `Scene0Controller.queueScene0LogoNt` inner loop — 已锚

#### `$9AB8-$9B05`: pointer resolver (2 functions)
- `$9AB8`: $E6:$E7 = `$0048 * 16 + $B000` (BG tile lookup table)
- `$9ADA`: $E6:$E7 = `$0049 * 16 + $B300` (SPR tile lookup table)

#### `$9B07`: CHR bank helper

```asm
$9B07: A5 25 / 85 E9 / A2 06 / 20 B9 C4 / RTS
```

#### **`$9B11`: full state clear (CFG + palette + NT)** ★

```asm
$9B11-$9B27: STA $48/$49/$4A/$4B=0 / LDA #$0F / LDY #$E0 / STA $054A,Y (loop 32 bytes to black) / JMP $9A71
```

**Anchor**: `Scene0Controller.resetPalettes()` — 全黑 fade 装载

#### **`$9B2C`: 4-byte NT entry writer (advanced)** ★

```asm
$9B28: 48 / BIT $629 / BVC $9B37 / LDA #1 / JSR $9FA8 / PLA / JMP $9B28
       ; header (alternative version from $88CA call)... 
```

实际 note: `$9B2C` 字节是 `48 30 08 09 A0 05 23 3C 50 F8 00 03 10 04 20 05` —— 是 16 字节的 **NT cell sprite descriptor format**!

#### `$9B60`: NT commit (finalize)

```asm
$9B5F: A9 00 / 9D E8 05 / E0 28 06 / STA $0629 ; ?? (上述 bytes)
```

实际: `$9B5E` = commit — STA $05E8,X = 0 / STA $0631,X = 0 / etc.

#### **`$9B7F`: hideOam (DMA $0200 ← #$F8)** ★★ (已锚)

```asm
$9B7F: A2 00 / LDA #$F8 / STA $0468,X (loop) / INX / BNE $9B83
       ; clear 256 bytes OAM with $F8 (Y=248 = off-screen)
       ; then LDA $F8 / STA $0200,X loop (clear primary OAM shadow buffer)
       ; LDA #0 STA $0568, $0588, $05A8, $05C8 (clear 4 extra OAM)
       ; RTS
```

**Anchor**: `RenderingPrimitivesService.hideOam()` — 已锚 (f9 hideOam call)

#### `$9BA9`: **physics add (sprite X += dX signed)** ★

```asm
$9BA9: STA $0046 / TAY / BMI $9BBC / CLC ADC $0044 / CMP #$F0 / BCC $9BB9 / ADC #$0F / INC $0045 / STA $0044 / RTS
       ; unsigned path
$9BBC: CLC ADC $0044 / CMP #$F0 / BCC $9BC7 / SBC #$10 / DEC $0045 / STA $0044 / RTS
       ; signed negative path (2's complement)
```

**Anchor**: `PlayerMoveService.applyVelocity()` — 物理位移

#### `$9BCA`: **physics add Y (sprite Y += dY signed)** ★

```asm
$9BCA: STA $47 / PHA / CLC ADC $7A / STA $7A / PLA / BMI / LDA $7B ADC / SBC
       ; ($7A=$7B=16-bit Y accumulator)
```

#### `$9BE3`: **player wait + move (按 A 加速)** ★

```asm
$9BE3: 86 E7 / 84 E6 / A8 / A9 01 / 20 A8 9F (push state)
$9BED-F2: LDA $001E / JSR $9CE7 (button decode) / LDA $001E AND #$90 / BPL $9BE8
$9BF8: LDA $0468,Y / TAX / SEC SBC $00E7 / LSR×3 / STA $00E7 (move → / 8)
$9C04: LDA #$F8 / STA $0468,Y (hide if off-screen)
$9C09: A5 E7 / CLC / RTS
```

#### **`$9C0D`: player wait 2** (alternate wait)

#### `$9C3A`: **sprite loader complex** (8-byte sequence to $0468+)

```asm
$9C3A-$9C70: read 8 bytes from ($E6),Y, write 8 to $0468,X with offset; CMP $E9 BNE $9C53 / CLC ADC #$10 STA $0468,X
       ; 复杂 sprite 装载序列
```

#### `$9C71-$9CC8`: **scene 内 sprite 调度器 (主循环 sport controller)** ★★

```asm
$9C71: A9 10 / 85 E8 ; timer = $10
$9C75: LDA $001C (input register? user-input?)
$9C77: JSR $9CE7 (button decode)
$9C7A: BCC $9CC8 (no key) / LDX $E9 / CPX #$FF / BEQ $9C89
$9C82-$9C86: CMP $E9 BEQ $9C75 (cool down) / JMP $9CB3
$9C89-$8D0: CMP $EB BEQ $9C75 (idem)
$9C8D: LDA $055C / CMP #$B8 / BCC $9C97 / SBC #$10 / TAY / LDX $055F JSR $9D08
$9C9E-$9CB1: verify collision with $0451-$0453 (3 checkpoints)
$9CB3: JSR $9FA8 (push state) / LDX $001C / LDA $9EE2,X (lookup table)
$9CBD: BEQ / DEC $E8 / BNE $9CB3 (loop) / LDA #8 / JMP $9C73
```

**Anchor**: `SceneController.inputCooldown()` — 球/玩家输入冷却

#### `$9CE7-$9D07`: **物理比对 (min/collision check)** ★

```asm
$9CE7: 29 0F / AA / LDA $9EE2,X (lookup table) ; BEQ $9D06
       ; CLC ADC $468,Y / CMP $E7 / BCS $9CF9 / LDA $E6 / CMP $E6 / ...
       ; 最终 STA $468,Y / SEC / RTS
```

#### `$9D08`: **input quantization** ★

```asm
$9D08: 8A / BMI $9D1A / TYA / EOR $FF / SEC / SBC #$28 / LSR×4 / STA $ED / JMP $C50C
       ; signed shift for input quantization
```

#### `$9D27-$9D72`: **scene data bulk writer** (NT cell array fill)

```asm
$9D27: 84 E6 / 86 E7 (ptr setup)
$9D2D-$9D36: read 1 byte $00E8=$E9 → save ptr + counter
$9D38: JSR $9D58 / TAX / INC $EB / LDA $EB CLC ADC $E6 → $E6 / SBC $E7 / CPX #$FF / BNE $9D2B (loop)
```

#### `$9D58`: **scene data tile builder** (commit phase)

```asm
$9D58: 84 E6 / 86 E7 ; LDA #$FF / STA $EB / INC $EB / LDY $EB
       ; LDA ($E6),Y / CMP #$FC / BCS $9D72 (escape)
       ; LDY $E8 LDX $E9 JSR $88CA (tile construct at $E8,$E9)
       ; INC $E8 / BNE $9D6F / INC $E9 / JMP $9D58
       ; fallthrough = RTS
```

#### `$9D73`: **PPU buffer write direct** (5-byte header + bytes)

```asm
$9D73: STA $E8 / JSR $9B28 / LDA $E8 AND #$3F STA $E8 / Y=0 LDA ($E6),Y STA $5E8,X / INY INX / DEC $E8 BNE / JMP $9B5E
```

**Anchor**: `PpuTransferService.bulkCopyTiles()`

#### `$9D8E`: **hex/numeric tile builder** (单 tile → 2 tiles via #$33 base)

```asm
$9D8E: STA $EC / LDA #2 / JSR $9B28 / LDA $EC / LSR×4 / BNE / LDA #$CD / CLC ADC #$33 STA $5E8,X / INX / LDA $EC AND #$0F / CLC ADC #$33 / STA $5E8,X / INX / JSR $9B5E / RTS
       ; 把 1 byte (低 4 bit + 高 4 bit) 转换为两个 tile #$33+hi + #$33+lo
```

**Anchor**: `LevelUpUiService.displayNumber()` — 数字 (0-99) 显示 helper

#### `$9DB5`: **4-digit number → 2 tile pairs** (16-bit → 4 tiles)

```asm
$9DB5: LDA #4 / JSR $9B28 / LDA #0 STA $E7 / LDA $ED JSR $9DDA / LDA $ED JSR $9DDE / LDA $EC JSR $9DDA / LDA #$33 STA $E7 / LDA $EC JSR $9DDE / JSR $9B5E / RTS
```

#### `$9DDA`: **digit → tile byte** (helpers: shift + add #$33)

```asm
$9DDA: LSR×4 / AND #$0F / BEQ $9DE6 / LDY #$33 / STY $E7 / CLC ADC $E7 / STA $5E8,X / INX / RTS
```

**Anchor**: same as above — convert digit (0-9) to tile #$33+N

#### `$9DEE`: **multiplier helper** (16-bit × 8 → 16-bit, A=high X=low)

```asm
$9DEE: STA $ED / LDA #0 / STA $EC / LDY #8 / ASL $EC ROL $ED / BCC $9E08
       ; if carry set: TXA CLC ADC $EC STA $EC LDA $ED ADC #0 STA $ED
       ; DEY BNE
       ; finally RTS
```

**Anchor**: `PlayerMoveService.applyMultiplier()` — 坐标×8 multiplier

#### `$9E0C-$9E35`: **16-bit division** ($EC/$ED ÷ $EA/$EB)

```asm
$9E0C: LDA #0 STA $E8=$E9 / LDX #$10 ; 16 iterations
$9E14: ASL $EC ROL $ED ROL $E8 ROL $E9 ; left shift dividend
       ; LDA $E8 SEC SBC $EA → TAY / LDA $E9 SBC $EB
       ; BCC $9E32 (no subtract) / STA $E9 STY $E8 (yes subtract)
       ; INC $EC (if remainder subtract worked) / DEX BNE $9E14
       ; RTS
```

#### `$9E36-$9E4E`: **8-bit division** ($ED ÷ $EC)

```asm
$9E36: LDA #0 STA $EA / LDX #8
       ; ASL $ED ROL $EA / LDA $EA SEC SBC $EC / BCC $9E4B / STA $EA / INC $ED
       ; DEX BNE
       ; RTS
```

#### **`$9E4F-$9E7B`: BCD divider (3-byte BCD → 2-byte)** ★

```asm
$9E4F: STA $EA=A=10 / LDA #0 STA $EB / LDA #3 STA $E6 ; 3 BCD digits
$9E5B: JSR $9E0C (16-bit div) / LDA $E8 STA $E7 / JSR $9E0C ; divide by 10^3 first
       ; DEC $E6
       ; final: PLA STA $EA / ... → converts BCD to integer
```

#### **`$9E7C-$9EA0`: BCD converter (16-bit integer → 4 BCD digits in $EB:$EC:$ED)** ★

```asm
$9E7C: STA $ED / LDA #10 STA $EC / JSR $9E36 (div 10) / LDA $EA STA $EB
       ; JSR $9E36 / LDA $EA×$10 ORA $EB STA $EB (advance digit)
       ; final 4 digits
```

**Anchor**: `LevelUpUiService.formatScore()` — BCD 数字格式化为 tile

#### `$9EA2`: **16-byte NT base pattern** ★★ (已锚)

```asm
$9EA2: $0F,$00,$00,$00, $00,$00,$00,$00, $00,$00,$00,$00, $00,$00,$00,$00
       ; 16-byte constant — tile base pattern (BG palette high-nibble lookup)
$9EB2: $0F,$00,$00,$00, $00,$00,$10,$10, $20,$20,$30,$30, $20,$20,$10,$10
       ; 16-byte — fade-table base
$9EC2: $0F,$00,$00,$00, $10,$10,$10,$20, $20,$20,$30,$30, $30,$20,$20,$20
       ; 16-byte — fade-table intermediate
$9ED2: $0F,$00,$10,$10, $10,$20,$20,$30, $30,$30,$30,$30, $30,$30,$30,$30
       ; 16-byte — fade-table full
$9EE2: $00,$00,$00,$00, $10,$00,$00,$00, $F0,$00,$00,$A2,$01
       ; 13-byte — input decode table
```

(总共 4 × 16 + 13 = **77 字节**数据表锚定在 bank0 末尾)

---

### 2.5 data_tail.s ($9EEF-$9FFF) — scheduler tail

#### **`$9EEF`: scheduler tail entry** ★★

```asm
$9EEF: BD 00 00 / BEQ $9EFB / CMP #$FF / BEQ $9F52
       ; LDA $0000,X
       ; - if A==0: $9EFB (process)
       ; - if A==#$FF: $9F52 (init)
       ; - else: DEC $0000,X / BEQ $9F0F (如果 dec 后 =0, 转到 init)
$9EFB: 8A / 18 / 69 04 / AA / E0 19 / D0 EF / A5 1B / 10 04 / 29 7F / 85 1B / 4C ED 9E
       ; 主 loop: X += 4 / 若 X != $19 回到 $9EEF ; 否则 $1B 处理 bit7 + 回 $9EED
$9F0F-$9F1F: 定时器到 0 → LDX #$07 / ORA $22 / STA $23 / STA $8000 (MMC3 R3 select=$07)
              ; LDA $0003,X / STA $25 / STA $8001 (R3 写入)
$9F21-$9F2E: LDX #06 / ORA $22 → STA $23 / STA $8000 (R2 select=$06)
              ; LDA $0002,X / STA $24 / STA $8001 (R2 写入)
$9F31-$9F51: stack restore → $24/$25 → PLAs 9 → $E6/$E7/$E8/$E9/$EA/$EB/$EC/$ED → TAY → TAX → RTS
              ; 标准 save-state 恢复
$9F52: STX $0000 / LDA #06 / ORA $22 / STA $23 / STA $8000 / LDA $0002,X STA $24 STA $8001 (R2)
       ; LDA $0001,X / TAX / TXS / RTS
       ; 这是 init 子程序 (入口 $FF = 不存在槽, init it)
```

**★ ★ 重要**: 这就是 **`$C500` boot init `$C500 JMP $C76E` 触发的 6-slot timer dispatcher tail**!

- `$C500-$FFFF` 是 bank14 (固定)
- `$9EEF-$9F51` 是 bank0 dispatcher slot tail body
- bank14 dispatcher 调用 bank0 这部分通过 `$9FA8` push-state 接口

#### **`$9F69`: scheduler slot allocate** ★★

```asm
$9F69: 95 02        STA $0002,X  ; ($E6 ptr lo) → $2,X
$9F6B: 88 / 88      DEY / DEY    ; Y -= 2 (next slot)
$9F6D: B5 00        LDA $0000,X  ; sprite idx
$9F6F: 99 01 01     STA $0101,Y  ; save at top of stack area
$9F72: B5 01        LDA $0001,X
$9F74: 99 02 01     STA $0102,Y
$9F77: 84 01        STY $0001,X  ; update ptr
$9F79: A9 FF / 95 00 STA $0000,X ; mark slot busy
$9F7D: RTS
```

**Anchor**: `SchedulerService.allocateSlot()` — 已锚 6-slot 调度槽分配

#### `$9F7E`: clear slot

```asm
$9F7E: A9 00 / AE 00 00 / 95 00 / 95 01 / 4C FB 9E
       ; 清空 slot
```

#### `$9F89-$9F95`: slot set/unset

```asm
$9F89: B5 01 / F0 F9 / B5 00 / D0 03 / A9 01 / 95 00 / RTS
       ; if ($1)==0 and ($0)==0: $0=1 (idle → trigger)
```

#### `$9F96`: slot reset

```asm
$9F96: B5 00 / C9 FF / D0 05 / A9 01 / 20 A8 9F / A9 00 / 95 00 / RTS
```

#### **`$9FA8`: STATE PUSH + JMP scheduler trampoline** ★★ (主入口!)

```asm
$9FA8: 85 19        STA $0019
$9FAA-FC5: TXA/PHA / TYA/PHA / $ED/PHA / $EC/PHA / $EB/PHA / $EA/PHA / $E9/PHA / $E8/PHA / $E7/PHA / $E6/PHA
       ; 9 个寄存器全 push
$9FC6: TSX / TXA / LDX $0000 / STA $0001,X (save SP at slot+1)
$9FCC-FD: LDA $0024 / STA $0002,X ; LDA $0025 / STA $0003,X (save R2/R3)
$9FD6: LDA $0019 / BEQ $9FDE / CMP #$FF / BNE $9FE0 / LDA #$FE ; set flag byte
$9FE0: STA $0000,X (mark as $FE = wait, $00 = ready)
$9FE2: JMP $9EFB (jmp scheduler)
```

**★ 这是核心 entry!** 任何 `JSR $9FA8` 都会:
1. Push 9 个 6502 寄存器
2. Save 当前 SP + R2 ($24) + R3 ($25) 到 slot
3. Mark as $FE (wait state)
4. **JMP $9EEF** (scheduler tail in bank0)
5. **最终在 tail 处理完后 RTS** 到 caller

**Anchor**: `SchedulerService.dispatch()` — H5 `Scene0Controller.onUpdate()` 通常无 return, 但 bank0 通过 `JSR $9FA8` 进入 scheduler 等待下一帧时, RTS 会继续原 caller.

---

## 3. 关键 Routine 详细分析 (重点 6 条)

| $PC | 6 字节反汇编 | 伪代码 | H5 Service 锚 |
|---|---|---|---|
| **`$96A1`** | (jump table 入口 via $96,93+$96,96 间接跳转) | **palette update dispatcher** (16 字节 fade table base → palette 装载) | `Scene0Controller.loadPalette(fadeStep)` |
| **`$97B6`** | `A9 00 85 E9 A5 4A` | **PPU buffer write body** — setup $E9=0, $EB=$4A, byte stream → $5E8,X (OAM shadow) | `RenderingPrimitivesService.writeSpriteToBuffer()` |
| **`$97E7`** | `20 28 9B 97 EA A5` | **JSR $9B28 sprite alloc + tile commit** — 4-byte 装载到 OAM shadow 缓冲 | `RenderingPrimitivesService.commitSprite4()` |
| **`$980A`** | `20 5E 9B A5 EB` | **JSR $9B5E final commit + EB flag check** — finalize buffer write | `RenderingPrimitivesService.finalizeBufferWrite()` |
| **`$8A91`** | `A9 84 20 28 9B A0` | **tile constructor (4-byte)** — `LDA #$84 / JSR $9B28 / LDY #0` → 装配 4-byte NT entry | `TileBuilderService.buildTile4()` |
| **`$8A14`** | (16 字节表) | **ASCII-to-tile lookup table** ($14 chars: `0-9` + `A-Z` 范围) | `LevelUpUiService.asciiTileTable` / `PlayerNameService.lookup` |

### 已知 6-slot dispatcher 入口:

| $PC | 6 字节 | 角色 |
|---|---|---|
| `$9EEF` | `BD 00 00 F0 03 C9` | **scheduler tail body** — iterate 6 slots, decrement timer, dispatch when timer=0 |
| `$9F4F` | (PLA×9 → `TAX` → `RTS`) | **stack restore** — 调度完成后还原 6502 state |
| `$9FA8` | `85 19 AA 48 A8 48` | **state push trampoline** — 任何 caller 通过 `JSR $9FA8` 进入 scheduler |
| `$9B11` | `A9 00 85 48 85 49` | **full state clear** — 清 palette/NT/OAM (用 #0F fade-to-black then reset) |
| `$98A0` | `A5 20 29 7F 8D 00` | **clear NT** — disable 显示 + 32x8 byte fill $2000 + re-enable |

### 关键 NT cell writer:

| $PC | 6 字节 | 角色 |
|---|---|---|
| `$9A89` | (NT 16-cell inner loop, 已锚) | `CPY #$10 / BNE $9A7E` — 16 cells BG (f12 trace) |
| `$9B7F` | `A2 00 A9 F8 9D 68` | **hideOam DMA** (f9 trace) |
| `$97B6` | `A9 00 85 E9 A5 4A` | **PPU buffer write (multi-byte, for SF setup)** |

---

## 4. RAM / State 真实锚点 (基于反汇编)

| RAM 地址 | 用途 | 谁写 | 谁读 |
|---|---|---|---|
| **`$0000-$0005`** | scheduler slot pointers (6 × 1 byte ptr) — `$9F69` 写入 | `$9F69` alloc, scheduler init | `$9EEF-$9F10` tail loop |
| **`$0019`** | Scheduler dispatch flag (0/$FE/$FF) | `$9FA8`/`$9F52` 写入 | scheduler tail |
| **`$001B`** | Frame counter + flags. bit0 = scroll enabled; bit6 = scheduler trigger; bit7 = fade out done | `$9F0A` scheduler reset ; scene init | `$8000` dispatcher, `$8051` |
| **`$001C-$001F`** | Controller port (joystick registers) | `$A0ED-$A0FA` (bank2 init) | `$80BC-$80D4` button detect ; `$9C71-$9D24` scene input |
| **`$0020-$0021`** | PPU shadow ($2000/$2001) — `PPUCTRL/PPUMASK` cached values | `$981D-$9889` | `$97AB-$997E` |
| **`$0022-$0025`** | MMC3 mirror (R0/$23 = R0 select, $24/$25 = current bank #) | `$9F15-$9F2E` bank select helpers | `$9F89-$9FA8` |
| **`$0027`** | Scene status code (dispatcher index) | `$8000` table jump input | `$8000-$800B` |
| **`$0028-$0029`** | Scene counter (cur/scene_max) | `$8178-$8188` set ; `$82F0-$8381` increment | 1+ scene handler |
| **`$0044-$0045`** | Sprite Y accumulator (16-bit) | `$9BAB-$9BCA` physics add | `$89A3-$89CD` |
| **`$0048-$0049`** | Palette high nibble (BG/SPR) | scene init (`$9AB8`/`$9ADA`) | `$997A-$9A30` fade |
| **`$004A-$004B`** | Palette low nibble (BG/SPR fade counter) | `$997A-$9A30` INC/DEC | `$9A71` NT cell writer |
| **`$005B`** | Mode flags. bit0=CHRPATH bank flag, bit2=tilemap setup, bit6=fade init, bit7=$8DFF trigger | `$8B03-$8DFF` scene handler; `$9B11` clear | `$88FB`/scene handler read |
| **`$005C-$005D`** | PPU buffer cursor (16-bit row/major) | `$8B59-$8D1D` scene parser | scene parser write |
| **`$005E-$005F`** | Secondary PPU state (cursor/byte) | scene parser | scene parser |
| **`$0060-$0062`** | Secondary stream state | `$8BDB-$8BEB` scene parser | `$8D88-$8DBF` collision |
| **`$0063-$0064`** | Stream ptr (16-bit) | `$8B1C-$8B91` scene handler | scene parser |
| **`$0065-$0066`** | Stream save ptr (16-bit) | `$8E15-$8E88` NT copy | `$8D22-$8DFC` |
| **`$0067-$0068`** | PPU row/col (16-bit) | `$8EF0-$901F` render | `$8FD1-$9049` attr |
| **`$007A-$007B`** | Player Y coord (16-bit) | `$9BCA-$9BFF` Y physics | render / motion / sprite |
| **`$008E-$008F`** | Stream record pointer 2 | scene load `$8CA7` | render |
| **`$0090-$0091`** | Scroll pointer (16-bit) | scene handler init | `$8081-$8087` boot |
| **`$0097-$009A`** | Player X position (16-bit each, 2 player) | `$9735-$977F` 16-bit add | physics / sprite |
| **`$009C-$009D`** | Player Y position | player physics | similar |
| **`$009E-$009F`** | Spr descriptor (lo/hi ptr to sprite info) | `$9B6F` set ; scene init `$94D8` | render / dispatcher |
| **`$00A0-$00A1`** | Spr descriptor (alt ptr) | `$9B74-$9B7E` set | render |
| **`$00E6-$00ED`** | Work ptrs (9 bytes, **save-state trampoline**) — entire state preserved through `JSR $9FA8` | ALL routines write | `$9FA8` push, `$9F4F` pop |
| **`$00E9`** | Sprite slot ptr (used by scene handler) | scene init `$9B7E` | scene parser |
| **`$00EC-$00ED`** | Same work ptr pair | scene init / scheduler | scheduler / scene handler |
| **`$0200-$02FF`** | OAM shadow buffer (256 bytes) — sprite descriptors [Y][tile][attr][X] × 64 sprites | `$9B7F` hideOam ; scene handler | `$4014` DMA (PPU write) |
| **`$0467-$0567`** | OAM extended buffer (256 bytes — boot logo sprites) | `$9085-$908D` clear ; scene handler | scene init |
| **`$0468-$0567`** | Extended OAM (256 bytes — extra sprite area) | sprite allocator | sprite out |
| **`$054A-$056A`** | Palette shadow buffer (32 bytes for fade) | `$9B1D-$9B23` clear ; fade | `$9A71` NT writer |
| **`$0552-$0553`** | Sprite/fade ptr register | scheduler / scene init | scene parser |
| **`$055C-$0563`** | Sprite X accumulator (16-bit each, 2 sprite) | `$9C8D-$9CB1` input | `$9D08` quantize |
| **`$05E8-$0688`** | **NT cell buffer** (256 bytes — sprite descriptor → NT) | `$88CA-$8AB2` tile builder; `$9A78-$9A95` NT writer | `$2007` PPU write loop |
| **`$0628`** | NT buffer fill pointer (`$9B63`) | tile alloc | `$9B29-$9B5C` |
| **`$0629`** | NT mode flags (bit6=extend?) | NT alloc | tile builder |
| **`$062A-$0649`** | **NT cell stream source** (32 bytes — page-aligned, 16 cells BG + 16 cells SPR, used by `$9A78-$9A95`) | scene stream init | `$9AA2` inner |
| **`$064A-$0651`** | **Palette shadow table 2** (8 bytes — palette attr for tile rendering) | `$9AFA-$901F` render | `$8FAE-$9022` palette merge |
| **`$0652-$0655`** | Scene stream state (4-byte: header/counter/lo/hi) | `$89D2-$89EE` parser | `$89FF-$8A0C` per-frame tick |
| **`$0700`** | Scheduler boot marker (start cmd) | `$804A-$8107` boot | scheduler detect |

---

## 5. 数据表索引 (从 .byte 段识别)

### 5.1 主入口 + 调度表

| 地址 | 字节数 | 内容 | 注释 |
|---|---|---|---|
| **`$800D-$8014`** | 6 bytes (5 entries × 2 + 1 trailer) | dispatcher jump table (5 entries → bank2 $A265/$A28A/$A2AD/$A2B4/$A2DA) | 主入口 `JSR ($800E,X)` 间接跳 |
| **`$853C-$8584`** | 73 bytes (32 entries × 2 + 9 trailer) | **stream op-code 调度表** (32 op-code → handler addr) | 每条 entry 2-byte target lo/hi |
| **`$86C6-$86DC`** | 22 bytes (10 entries × 2 + 2) | 子 dispatcher (`$86B9 JMP ($86C7,X)`) | 用于 sprite descriptor 触发 |
| **`$92E5-$9304`** | 32 bytes (16 entries × 2) | sprite descriptor 16-op 调度表 | 用于 `$92DC SEC SBC #$F0 ASL TAX` 后查表 |
| **`$9684`-`$9691`** | 14 bytes (8 entries × 2 - 2 trailer) | sprite descriptor 8-op 调度表 (D0+) | `$9684 SEC SBC #$F8 ASL TAX LDA $9693,X PHA LDA $9692,X PHA RTS` |
| **`$8AE6-$8AED`** | 8 bytes | 8 个特殊入口 (D8-E0 range handler) | `$84F0 SBC #$D8 TAX LDA $8AE6,X` |
| **`$96A3`-... (jump table)** | 16 bytes (7 entries × 2 + 2) | `$96A1 BD 96 96 / 48 / BD 96 96 / 48 / 60` (jump) | palette 调度器入口 |

### 5.2 子文件数据表

| 地址 | 字节数 | 内容 | 注释 |
|---|---|---|---|
| **`$8398`** | 32 字节 | **`$00,$00,$02,$02,$04,$04,$06,$06,$08,$08,$0A,$0A,$0C,$0C,$0E,$0E,$10,$10,$12,$12,$14,$14,$16,$17,$17,$19,$19,$1B,$1B,$1D,$1D,$1F`** | scene index → CHR bank 索引映射 (32 entries) |
| **`$83BA`** | 32 字节 | scene code → display cmd 映射 | |
| **`$83DC`** | 32 字节 | scene 不同事件触发器 | |
| **`$8464-$849E`** | 58 bytes (`$8AEC-$8AEE` referenced) | **scene cfg id table** (`CMP $8AEE,Y` lookup) | 装载 cfg 索引 → (lo, hi) 指针 |
| **`$8546`-...** | 73 bytes (1 entry 测试跳) | sprite stream handler |  |
| **`$86C6`** | 22 bytes (见上) | 子 dispatcher |  |
| **`$88D2`** | 256 bytes | **OAM default template** (256 byte init pattern for all 64 sprites — `$F8`+$00+$00+$F8 per sprite) | `$89A3-$89AC LDA $88D2,Y STA $0468,Y` (sprite default Y=248) |
| **`$8A14`** | 16 bytes | **ASCII → tile lookup** | `$8A14 Y = LDD` for first 16 char codes |
| **`$8AEC`** | 32 bytes | **scene cfg lookup table** (32 字节), 跟 $83DC 区别: 这是 cfg idx 排序 |  |
| **`$8AE6`** | 8 bytes | D8-DF range handler (8 entries) | `$850C LDA $8AE6,X` |
| **`$8AB3`** | 60 bytes | scene data tiles (4 × 15) |  |
| **`$8AEB`** | 1 byte (`$06`) | scene end marker | trailer at $8AEB+$AEC boundary |
| **`$978B`** | 16 bytes (`$80,$01,$00,$00, $00,$30,$00,$40, $00,$00,$00,$00, $00,$00,$00,$00`) | PPU base pattern / NT clear pattern | `$90E6 LDA $978B,Y STA ($94),Y` |
| **`$9EA2`** | 16 字节 (`$0F,$00,$00,$00, $00,$00,$00,$00, $00,$00,$00,$00, $00,$00,$00,$00`) | **NT base pattern** (fade bg/spr 用, BG tile hi-nibble) — 已锚 |
| **`$9EB2`** | 16 bytes (palette fade table) | **fade set 2** | 已锚 |
| **`$9EC2`** | 16 bytes (palette fade table) | **fade set 3** | 已锚 |
| **`$9ED2`** | 16 bytes (palette fade table) | **fade set 4 (max bright)** | 已锚 |
| **`$9EE2`** | 13 bytes (`$00,$00,$00,$00, $10,$00,$00,$00, $F0,$00,$00,$A2,$01`) | **input decode table** (13 byte lookup for `$9CE7`) | `$9CE7 AND #$0F / TAX / LDA $9EE2,X` (返回 NONE/$10/$F0/etc.) |
| **`$9FE3`-`$9FFF`** | 29 bytes (29 × `$FF`) | **padding** | bank 末 `$FF` 填 |

---

## 6. H5 ↔ asm 反推锚点表

### 6.1 Scene0 阶段 (frame 0-13) — 已确认锚点

| H5 Service call | PRG 字节 | 状态 |
|---|---|---|
| `loadChrConfig(0x17)` | `$00:8AF7: STA $ED, ASL ...` (full impl at $8AF7-$8BAE) | ✅ |
| `loadScene0Palettes()` | `$00:9A35: STA $48 / STA $49 / ... LDA #$0F / STA $4A / STA $4B` | ✅ |
| `prim.hideOam()` | `$00:9B7F: LDX #0 / LDA #$F8 loop 256` | ✅ |
| `loadSceneData(1)` | `$00:8AF7` (handler loader) + chain `$00:$8464` cfg(1) | ✅ |
| `loadChrConfig(0x17)` secondary | `$00:$8AF7-$8BAE` 完整 routine | ✅ |
| `prim.queueScene0LogoNt(step=0)` | `$00:9A89 CPY #$10` + `$9A8B BNE $9A7E` + `$9A86 JSR $9AA2` | ✅ |
| `prim.queueScene0LogoNt(step=1)` | 同上（25 cells） | ✅ |
| `loadScene0Oam` (f11 sprite 装载) | `$00:8A91-8AB2 tile constructor` | ✅ |
| fadeInStep (fade=0→1) | `$00:9A7E-: JSR fadeLookup` + `$00:8C81: STA $062A+Y` | ✅ |
| fadeOut (BG+SPR) | `$00:99F0-$9A0C` | ✅ |
| hideOam (OAM clear DMA) | `$01:A8E2: STA $0200,Y #$F8` (bank2 entry, but same effect as bank0 $9B7F) | ✅ |

### 6.2 Boot/Idle 锚点

| 反推项 | PRG 字节 | 状态 |
|---|---|---|
| Boot text input spin | `$00:8027-: LDA $001E / AND #$10 / BEQ loop` | ✅ |
| Logo flash (idle blink) | `$00:80A7-$80D1 XOR/EOR #40` | ✅ |
| Palette flash | `$00:80BC: LDA $ED / EOR #$40` | ✅ |
| OAM dump | `$00:8920-$895C` | ✅ |
| All OAM attr flip | `$00:88FB: LDA $46A,X EOR #$20` (loop) | ✅ |

### 6.3 Scheduler 锚点

| 反推项 | PRG 字节 | 状态 |
|---|---|---|
| 6-slot dispatcher tail | `$00:9EEF-$9F10 scheduler body` | ✅ |
| State push trampoline | `$00:9FA8: STA $19 / 9×PHA / JMP $9EFB` | ✅ |
| Stack restore | `$00:9F4F: 9×PLA / TAX / RTS` | ✅ |
| Slot allocate | `$00:9F69: STA ($0,X) / Y -= 2 / ...` | ✅ |
| Bank select via R6/R7 | `$00:$C4B9 (bank14 helper)` | ✅ |
| RAM clear | `$00:$9085: STA $467,Y loop 256` | ✅ |
| Scene record ptr resolution | `$00:9AB8-$9AF7 (2 functions)` | ✅ |

### 6.4 ⬜ 待反推锚点 (Phase 2)

| 反推项 | 路径 | 计划 |
|---|---|---|
| Scene1-23 entry from dispatcher | `$00:8000` → table → bank2 handlers | 跑 emu frame > 270 完整 trace |
| fadeStep N→M 实际 trace | `$00:9AB8-$9AF7` (pointer resolution) | 跑 f12-f13 trace 验证 16 cells 装载 |
| Audio request during boot | bank14 + bank2 (NOT in bank0) | 验证 |
| Match mode entry | bank2 dispatchers (NOT in bank0) | 验证 |
| `Scene16-23` 内特殊操作 | bank2 | 待 |

---

## 7. Routine vs H5 Service 覆盖矩阵

| 入口 | 语义 | H5 Service method | 状态 |
|---|---|---|---|
| `$8000` | dispatcher table jump | `Scene0Controller.onEnter()` (BootRouter) | ✅ |
| `$8019` | main game loop | `BootRouter.routeMainLoop()` | ✅ |
| `$801F` | scheduler reset wait | `BootRouter.initScheduler()` | ✅ |
| `$8027` | Start button spin loop | `Scene0Controller.onEnter().bootInputWait` | ✅ |
| `$8053` | boot logo load sequence | `Scene0Controller.onEnter()` boot chain | ✅ |
| `$80BC` | palette flash helper | `Scene0Controller.flashSpritePalette()` | ✅ |
| `$80E6` | game-enter PPU 启动 | `GameSystemService.startGame()` | ⬜ |
| `$8285` | audio request 准备 | (Audio external) | ⬜ |
| **`$8297`** | wait/spin via `$9085` | `SchedulerService.waitFrame()` | ✅ |
| **`$82A9`** | wait/spin via `$9085`+check | `SchedulerService.waitNoVideo()` | ✅ |
| **`$82B5`** | clear input state | `InputService.reset()` + `prim.clearSprites()` | ✅ |
| **`$82ED`** | NT stream loader | `NtStreamLoaderService.loadSceneStream()` | ✅ |
| **`$838A`** | scene bank select helper | (sub-helper, ⬜) | ⬜ |
| **`$8464`** | PPU transfer cfg loader | `InterruptService.applyChrFrom009e()` | ⬜ |
| **`$84C6`** | main render dispatcher | `RenderingPrimitivesService.streamDriver()` | ✅ partial |
| **`$86C6`** | sprite descriptor sub-dispatcher | `SpriteService.applySpriteDescriptor()` | ⬜ |
| **`$873F`** | OAM loop init | `SpriteService.resetOamBuffer()` | ⬜ |
| **`$88CA`** | tile constructor (char) | `TileBuilderService.buildTileChar()` | ✅ |
| **`$88FB`** | palette xor (sprite attr flip) | `prim.flipAllSpritePalettes()` | ✅ |
| **`$890C`** | accumulator (sprite Y) | `SpriteService.shiftAllSpriteY()` | ✅ |
| **`$8920`** | OAM/PPU dump | `prim.commitOam()` | ✅ |
| **`$89A3`** | main loop inner | `prim.frameLoopInner()` | ⬜ |
| **`$89D2`** | scene stream parser | `SceneStateMachine.loadStream()` | ⬜ |
| **`$89FF`** | scene stream tick | `SceneStateMachine.tickStream()` | ⬜ |
| **`$8A14`** | ASCII tile lookup table | (data table) | ✅ |
| **`$8A91`** | 4-byte tile constructor | `TileBuilderService.buildTile4()` | ✅ |
| **`$8AF7`** | scene handler loader | `SceneStateMachine.loadHandler()` | ⬜ |
| **`$8B99`** | CHR bank loader | `SceneStateMachine.loadChr()` | ⬜ |
| **`$8BB0`** | scene stream parser (main) | `NtStreamLoaderService.parseSceneStream()` | ⬜ |
| **`$8D1F`** | scene state machine main | `SceneStateMachine.tick()` | ⬜ |
| **`$8DFF`** | key/entry helper | `SceneStateMachine.dispatchKey()` | ⬜ |
| **`$8E15`** | NT copy/tile decoder | `NtStreamLoaderService.decodeAndCopyNT()` | ⬜ |
| **`$8EF0`** | inner render loop | `prim.renderTileFromPtr()` | ⬜ |
| **`$9071`** | PPUADDR setup helper | `prim.fillAttrTbl()` | ⬜ |
| **`$9076`** | PPUADDR setup (alt) | `prim.fillAttrTblAlt()` | ⬜ |
| **`$9085`** | scheduler tick entry | `SchedulerService.dispatchTick()` | ✅ |
| **`$9145`** | frame NMI handler | `InterruptService.nmi()` | ✅ partial |
| **`$96A1`** | palette update dispatcher | `PpuTransferService.allocPalette()` | ✅ |
| **`$97B6`** | PPU buffer write | `PpuTransferService.writePpuBuffer()` | ✅ |
| **`$97E7`** | sprite commit + alloc | `prim.commitSpriteAlloc()` | ✅ |
| **`$980A`** | finalize buffer write | `prim.finalizeBufferWrite()` | ✅ |
| **`$988A`** | PPU direct write wrapper | `prim.ppuDirectWrite()` | ⬜ |
| **`$9897`** | PPU bulk wrapper | `prim.ppuBulkFill()` | ⬜ |
| **`$98A0`** | clear NT + disable display | `prim.clearNt()` | ✅ |
| **`$98E8`** | PPU buffer write v2 | `prim.ppuBufferWriteV2()` | ⬜ |
| **`$98EC`** | PPU bulk fill | `prim.ppuBulkFill16Rows()` | ✅ |
| **`$997A`** | fade in/out entry | `Scene0Controller.fadeIn()`/`fadeOut()` | ✅ |
| **`$99D1`** | single fade counter | `prim.fadeInSingle()` | ⬜ |
| **`$99F0`** | fade-out BG+SPR | `Scene0Controller.fadeOutAll()` | ✅ |
| **`$9A35`** | BG palette + full bright | `Scene0Controller.loadBgPalette0()` | ✅ |
| **`$9A4C`** | BG palette only | `prim.loadBgPalette()` | ⬜ |
| **`$9A60`** | SPR palette only | `prim.loadSprPalette()` | ⬜ |
| **`$9A71`** | NT 16+16 cells write | `Scene0Controller.write16x16NT()` | ✅ |
| **`$9AA2`** | single cell NT write | `Scene0Controller.queueCell()` | ✅ |
| **`$9AB8`** | BG ptr resolver | `prim.resolveBgPtr()` | ⬜ |
| **`$9ADA`** | SPR ptr resolver | `prim.resolveSprPtr()` | ⬜ |
| **`$9B07`** | CHR bank helper | `prim.saveChrBank()` | ⬜ |
| **`$9B11`** | full state clear | `Scene0Controller.resetAll()` | ✅ |
| **`$9B28`** | NT 4-byte alloc | `prim.tileAlloc()` | ⬜ |
| **`$9B5E`** | commit | `prim.tileCommit()` | ⬜ |
| **`$9B7F`** | hideOam DMA | `prim.hideOam()` | ✅ |
| **`$9BA0`** | scheduler reset | `SchedulerService.reset()` | ✅ |
| **`$9BA9`** | X physics add | `PlayerMoveService.applyVelocityX()` | ⬜ |
| **`$9BCA`** | Y physics add | `PlayerMoveService.applyVelocityY()` | ⬜ |
| **`$9BE3`** | player wait input | `PlayerMoveService.waitInput()` | ⬜ |
| **`$9C3A`** | sprite loader (8-byte) | `SpriteService.loadSpriteBlock()` | ⬜ |
| **`$9C71`** | scene input controller | `SceneController.inputCooldown()` | ⬜ |
| **`$9CE7`** | physics compare | `SpriteService.physicsCompare()` | ⬜ |
| **`$9D08`** | input quantization | `InputService.quantizeDpad()` | ⬜ |
| **`$9D27`** | scene data bulk writer | `SceneStateMachine.bulkWrite()` | ⬜ |
| **`$9D58`** | scene data tile builder | `SceneStateMachine.tileBuilder()` | ⬜ |
| **`$9D73`** | PPU buffer write direct | `prim.bulkCopyTiles()` | ⬜ |
| **`$9D8E`** | hex digit tile builder | `LevelUpUiService.displayNumber()` | ⬜ |
| **`$9DB5`** | 4-digit BCD→tile | `LevelUpUiService.formatNumber()` | ⬜ |
| **`$9DDA`** | digit tile builder inner | `LevelUpUiService.singleDigit()` | ⬜ |
| **`$9DEE`** | multiplier helper | (math helper) | ✅ |
| **`$9E0C`** | 16-bit divide | (math helper) | ✅ |
| **`$9E36`** | 8-bit divide | (math helper) | ✅ |
| **`$9E4F`** | BCD divider | `LevelUpUiService.bcdToInt()` | ⬜ |
| **`$9E7C`** | BCD converter int→4-digit | `LevelUpUiService.formatScore()` | ⬜ |
| **`$9EA2`** | NT base pattern (data) | (data table) | ✅ |
| **`$9EEF`** | scheduler tail body | `SchedulerService.dispatchTail()` | ✅ |
| **`$9F4F`** | stack restore | (scheduler trampoline) | ✅ |
| **`$9F69`** | slot allocate | `SchedulerService.allocateSlot()` | ✅ |
| **`$9F7E`** | clear slot | `SchedulerService.clearSlot()` | ⬜ |
| **`$9F89`** | slot set/unset | `SchedulerService.slotSet()` | ⬜ |
| **`$9F96`** | slot reset | `SchedulerService.slotReset()` | ⬜ |
| **`$9FA8`** | state push trampoline | `SchedulerService.dispatch()` | ✅ |

汇总: **已锚 ✅ = 26** | **🔄 部分 = 4** | **⬜ 未锚 = 47** | **总 = 77 routine**

---

## 8. 未翻译 Routine 清单 (按优先级)

### 优先级

- **P0 = boot 必须**: dispatcher 必须 OK 才能开机
- **P1 = 菜单必须**: boot + 标题画面 → 进入游戏
- **P2 = 开场必须**: Scene0-3 (Tecmo logo + 标题)
- **P3 = 比赛必须**: Scene4-23 (实际比赛)
- **P4 = 其他**: 数据恢复等

### P0 — boot 必须 (5 项, 高优)

| 入口 | 描述 | 状态 | 难度 |
|---|---|---|---|
| `$8000` | dispatcher table jump | ✅ 已锚 | 低 |
| `$9EEF` | scheduler tail | ✅ 已锚 | 中 |
| `$9FA8` | state push trampoline | ✅ 已锚 | 中 |
| **`$9085`** | scheduler tick entry | ✅ 已锚 | **高 (核心)** |
| **`$8464`** | PPU transfer cfg loader | ⬜ 未锚 | **高 (核心)** |

### P1 — 菜单必须 (3 项)

| 入口 | 描述 | 状态 | 难度 |
|---|---|---|---|
| `$8027` | Start button spin | ✅ | 低 |
| `$80BC` | palette flash | ✅ | 低 |
| **`$80E6`** | game-enter PPU 启动 | ⬜ | **高 (game boot)** |

### P2 — 开场必须 (10 项)

| 入口 | 描述 | 状态 | 难度 |
|---|---|---|---|
| `$8053` | boot logo load | ✅ | 中 |
| `$8AF7` | scene handler loader (CHRPATH) | ⬜ | **高 (核心)** |
| **`$8BB0`** | scene stream parser | ⬜ | **高 (核心)** |
| `$8D1F` | scene state machine main | ⬜ | 高 |
| `$8DFF` | key/entry helper | ⬜ | 中 |
| **`$8E15`** | NT copy/tile decoder | ⬜ | **高 (核心)** |
| `$8EF0` | inner render loop | ⬜ | 中 |
| `$9A35` | BG palette + full bright | ✅ | 低 |
| `$9A71` | NT 16+16 cells write | ✅ | 中 |
| `$9B7F` | hideOam | ✅ | 低 |

### P3 — 比赛必须 (35 项, 大头)

主要都在 P3 (常规比赛逻辑):

| 入口 | 描述 |
|---|---|
| `$856E-$8879` | 32-byte op-code handlers (大块需逐一分析) |
| `$9145-$968F` | frame NMI handlers + sprite descriptor (大块) |
| `$C4B9` (in bank14) | 但 bank0 多次 JSR |
| `$96A1-$97AB` | palette update (单独 routine 已分析) |
| `$8BAE-$8BAB` | scene handler + helper |
| `$9BA9-$9D24` | **全部 physics / sprite / scene logic** |
| `$9D27-$9D72` | scene data 写入 |
| `$9E4F-$9EA0` | BCD/分数格式化 |
| `$9C71-$9D07` | scene input control |
| `$9BE3-$9C28` | player move logic |

### P4 — 其他 (helper functions)

- `$8464-$8545` 数据表
- 全部字节流 op-code handlers (32 个, 多数复用现有 translation)

---

## 9. 建议: bank00 完整翻译产物

### 9.1 当前 H5 翻译状态

| 文件 | 状态 |
|---|---|
| `prg/code/system/BootRouter.ts` | ✅ 有 — 但 dispatcher 模型还需要 6-slot timer 重构 |
| `prg/code/system/HardwareInitService.ts` | ✅ 有 |
| `prg/code/system/InterruptService.ts` | ✅ 有 — 但 nmi() handler 还没接入 bank0 $9145-$968F 完整模型 |
| `prg/code/system/InputService.ts` | ✅ 有 — 但 `$9C71-$9D24` 场景化输入未实现 |
| `prg/code/system/GameSystemService.ts` | ✅ 有 |
| `prg/code/system/RenderingPrimitivesService.ts` | ✅ 有 — 但 `$8464-$8879` 大段 byte stream 待实现 |
| `prg/code/scene/Scene0Controller.ts` | ✅ 有 — boot 装载已部分翻译 |
| `prg/code/scene/Scene1-23Controller.ts` | ⚠️ stub — 没接 bank0 调度 |
| `prg/code/player/PlayerMoveService.ts` | ⚠️ 部分 — `$9BE3-$9D24` 未实现 |
| `prg/code/player/PlayerQueryService.ts` | ✅ 有 |
| `prg/code/player/PlayerTileService.ts` | ✅ 有 |
| `prg/code/player/PlayerNameService.ts` | ✅ 有 |

### 9.2 应该落地的 class 划分

1. **`MainRouterService`** ($8000-$8282 主 dispatcher / `$84C6-$8879` byte stream driver)
   - 持有 `dispatcherTable[5]`, `currentScene`, `cmdFlag`
   - 提供 `onFrame()`, `dispatch(cmdCode)`, `routeToScene()`
   - **映射入口**: `$8000` (table jump)
   - **关键方法**:
     - `schedule(cmdCode, params)` — 调到对应 scene handler
     - `routeStream(bytecode)` — `$86C6` 子 dispatcher 路由

2. **`NtStreamLoaderService`** ($82ED-$8381 NT stream parser + `$8464-$8879` byte stream)
   - 持有 `streamPtr`, `cursor`, `palette`, `cfgId`
   - 提供 `parseSceneStream(ptr)`, `decodeNT4Entry()`, `commitOAM()`
   - **关键方法**:
     - `loadSceneStream(bankId)` — `$838A` bank select
     - `parseEntry(ptr)` — `$82F0-$8381` 16-iter NT cell loader
     - `parseCfBlock(cfgId)` — `$8464` PPU transfer cfg loader

3. **`PpuTransferService`** ($96A1-$97FE palette + $97B6-$980A PPU buffer)
   - 持有 `paletteBg`, `paletteSpr`, `ppuAddress`, `ppuMask`
   - 提供 `loadPalette(step)`, `writePpuBuffer()`, `writePpuDirect()`
   - **关键方法**:
     - `allocPalette()` — `$96A5` jump table base
     - `writePpuBuffer()` — `$97B6` 4-byte OAM 装载
     - `clearNt()` — `$98A0` 显示重置
     - `bulkFill16Rows()` — `$98EC` PPU 大块 fill

4. **`TileBuilderService`** ($88CA-$88FA + $8A91-$8AB2 tile construct)
   - 持有 `tileTable[256]`, `currentNT`, `targetSlot`
   - 提供 `buildTileChar()`, `buildTile4()`, `lookupAscii()`
   - **关键方法**:
     - `buildTileChar(charCode)` — `$88CA` ASCII tile builder
     - `buildTile4(byte)` — `$8A91` 4-byte NT entry
     - `resolvePtr(idx)` — `$9AB8-$9AF7` 16-byte lookup

5. **`SchedulerService`** ($9EEF-$9F7F timer dispatcher)
   - 持有 `slots[6]`, `frameCounter`, `r0`, `r1`, `r2`, `r3`
   - 提供 `dispatchTick()`, `allocateSlot()`, `pushState()`, `popState()`
   - **关键方法**:
     - `dispatchTick()` — `$9085` 主调度
     - `dispatchTail()` — `$9EEF` 6-slot 处理 loop
     - `statePush(reg9)` — `$9FA8` 9 个寄存器保存
     - `statePop()` — `$9F4F` 9 个寄存器恢复
     - `allocateSlot()` — `$9F69` 槽分配
     - `resetSlot()` — `$9F7E` 槽清空

6. **`SceneStateMachine`** ($8AB3-$8EEF scene handler)
   - 持有 `sceneId`, `streamPtr`, `tileBuf[256]`
   - 提供 `loadScene()`, `tick()`, `processKey()`, `decodeNT()`
   - **关键方法**:
     - `loadHandler(sceneId)` — `$8AF7` 装载 handler config
     - `parseStream(ptr)` — `$8BB0` 主 parse loop
     - `tickStream()` — `$89FF` per-frame tick
     - `decodeNT4()` — `$8E15` NT copy + tile decoder
     - `bulkWriteNT()` — `$9D27` 大块 NT 写

### 9.3 推荐落地顺序

1. **第 1 周**: 把 `Scene0Controller.onEnter()` 的 boot 装载 (`$8027/$8053/$8AF7`) 完整翻译到 `BootRouter` (整合 `$8000` + `$9FA8` + `$9085`)
2. **第 2 周**: `NtStreamLoaderService.parseStream()` + `PpuTransferService.writePpuBuffer()` (核心 byte-stream decode)
3. **第 3 周**: `SceneStateMachine` (loader + parser + state machine)
4. **第 4 周**: `SchedulerService` 6-slot 重构 + 接 bank14 dispatcher
5. **第 5 周**: 比赛模式 (inputCooldown, physics, scene input)
6. **第 6+ 周**: 修 BUG + 性能优化 + scene16-23 接入

---

## 附录 A: 字节验证

`docs/verify_bank00.py` 跑出来:
- bank0 size = **8192 bytes** (符合 PRG bank 8 KB 标准)
- 已确认 `bank00 assembly: OK` (100% 字节对齐)

---

## 附录 B: 参考资料

| 来源 | 用途 |
|---|---|
| `docs/BANK02_ANALYSIS.md` | 文档格式 + v-section 章节结构 |
| `docs/H5_ASM_REVERSE_ANCHOR.md` | 已确认 H5↔asm 锚点表 |
| `docs/rom-data-locations.md` | ROM 数据 (角色/GK/队/Sprite 索引) |
| `docs/roms/opening-all/opening-all.log` | boot trace 99771 行 |
| `_tmp_bzk_out/bank_00/bank_00_partMM.asm` | 原始反汇编源 |
| `debug/_dump_bank0.cjs` | bank0 局部 dump |
| `debug/_disasm_b0*.cjs` | bank0 各段 disasm (10 个 helper) |
| `debug/_dump_all_helpers.cjs` | 全 helper 列表 |

---

> **总结**: bank00 是 captain-tsubasa-2 的 **主 dispatcher + utility + scheduler tail bank**. 装机后 R6=0, 因此常驻. 它包含 6-slot timer dispatcher 的关键 tail (`$9EEF-$9FA8`)、scene 数据装载 (`$8AF7-$8EEF`)、NT stream parser (`$8464-$8879`)、PPU transfer (`$96A1-$9979`)、tile / sprite 渲染 (`$88CA-$968F`)、数学 helpers (`$9DEE-$9EA0`) 和大量数据表 (`$8000-$9EA0` 区间内 13 个). H5 已 anchor 大约 26 个 routine, 还有 47 个待 anchor. 优先落地 `SchedulerService` + `NtStreamLoaderService` + `PpuTransferService` 是 boot 路径的硬要求.
