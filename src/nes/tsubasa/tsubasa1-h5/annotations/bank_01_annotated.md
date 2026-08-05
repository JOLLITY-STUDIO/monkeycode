# Bank 01 — 开场动画 / 故事板引擎 / 音频调度

> **源文件**: `_tmp_disasm_out/banks/bank_01_code.asm`
> **类型**: Code Bank (Switchable)
> **CPU地址**: $8000-$BFFF | **ROM偏移**: $04010-$07FFF | **大小**: ~760KB
> **CDL标记**: Code + Data | **分析日期**: 2026-08-05
> **Trace验证**: ✅ 33,759 行 trace (40.8%), 1,076 帧

---

## 1. 概述

Bank 01 是游戏启动后第一个活跃的 Code Bank，承载两个核心功能：

| 功能 | 对应State | 入口点 | 说明 |
|------|-----------|--------|------|
| **开场动画故事板引擎** | State 0, Sub 0 | `$84D2(A=$10)` → Bank 1 Sub 0 | 分镜幻灯片 + 逐 tile 文字打印 + CHR Bank 切换 |
| **NMI 音频调度** | 每帧 NMI | `$DB00` (由 NMI JSR 调用) | 音频引擎 tick、音乐/音效更新 |

---

## 2. 调用入口

### 2.1 开场动画入口 (来自 State 0 Dispatcher)

```
Bank 0 $81F7: LDA ram_03CA    → gameState = 0
Bank 0 $81FA: JSR $834D       → 查跳转表
Bank 0 $81FD: .dw $82A1       → State 0 handler
Bank 0 $82A1: LDA #$10
Bank 0 $82A3: JSR $84D2       → 调度到 Bank 1, Sub 0
```

### 2.2 NMI 音频回调

```
Bank 0 $8113: JSR $DB00       → 每帧 NMI 中调用 (在 bne Bank切换之后)
```

因此 `$DB00` 是 Bank 01 中最频繁被调用的入口（每帧一次）。

---

## 3. 段结构 (按地址)

### 3.1 $8000-$8105 — 开场动画调度器 (Dispatcher)

**功能**: 开场动画 6 个分镜的顶层调度器，通过 `ram_007A` 控制子状态递增。

| 地址 | 功能 | CDL |
|------|------|-----|
| `$804B` | 调度器入口 | C |
| `$804B-$80FF` | 子状态 0-4: 分镜页加载 + CHR Bank 配置 + RLE 解码触发 | C |
| `$8100-$8105` | 子状态 5-7: CHR Bank 0E+0F (立绘)、00+0D (收尾)、退出 | C |

**关键子状态** (rom `ram_007A`):
```
0→1→2→3→4: 分镜 0-4 (Nametable 页加载 + 文字逐 tile 打印)
5: CHR Bank 0E+0F (立绘/图片)
6: CHR Bank 00+0D (收尾画面)
7: 退出 → transitionTo(1)
```

**CHR Bank 配置表** (分镜 → CHR 0/CHR 1):
- 分镜 0: CHR 0=04, CHR 1=06  
- 分镜 1: CHR 0=08, CHR 1=06
- 分镜 2: CHR 0=0A, CHR 1=06
- 分镜 3: CHR 0=0C, CHR 1=06
- 分镜 4: CHR 0=0C, CHR 1=19

### 3.2 $8106-$81E5 — PPU 队列文字打印

**功能**: 通过 PPU 队列 `$033A-$03FF` 将文字 tile 逐帧写入 nametable。

```
01:81BE: LDA #$21          ; PPU addr = $21XX (Nametable 0 区域)
01:81C0: STA $2006
```

文本数据来自 Bank 7 `$E306-$F968` (74 段 tile 编码文本)，每帧写入若干 tile 实现「打字机效果」。

### 3.3 $81E6-$8212 — 逐 Tile 文字写入函数

**功能**: 从文本数据流读取 tile 索引，通过 PPU vblank 队列逐帧写入。

### 3.4 $C000-$CFFF — 故事板引擎 (Storyboard Engine)

这是 trace 中执行频率最高的 Bank 01 区域。

#### $C3CE (69 次调用 across 69 帧)

故事板辅助函数，可能处理分镜之间的过渡效果。

#### $DBA1 (10 次调用)

故事板初始化/重置。

#### $DB8D (9 次调用)

故事板滚动/动画辅助。

#### $DB1D-$DB51 — 主故事板循环

```
$DB1D: LDA $0738         ; 读取位移标志
$DB20: LSR               ; 右移 1 位
$DB21: BCC $DB25         ; C=0 → 跳过 ORA
$DB23: ORA #$80          ; 置高位
$DB25: STA $0738         ; 保存
$DB28: BCC $DB41         ; C=0 → 跳过
$DB2A: LDX $F2           ; X = 基地址
$DB2C: DEC $0739,X       ; 递减子计数器
$DB2F: BNE $DB34
$DB34: LDX $F2
$DB36: DEC $073B,X       ; 递减主计数器
$DB39: BNE $DB3E
$DB3E: JSR $DC20         ; ★ 计数器到 0 → 进入状态机
```

#### $DC20 — 核心状态机 (418 次调用 / 365 帧)

**Trace 验证**: 最频繁调用的 Bank 01 函数，控制每个故事板分镜的播放逻辑。

```
$DC20: LDY #$05
$DC22: LDA ($F0),Y       ; 读取控制字节 (偏移+5)
$DC24: TAX
$DC25: AND #$F0          ; 高 4 位 → $F6 (控制标志)
$DC27: STA $F6
$DC29: AND #$20          ; bit5 = 特殊模式?
$DC2B: BEQ $DC33
$DC33: TXA
$DC34: AND #$0F          ; 低 4 位 → $F7 (参数)
$DC36: STA $F7
$DC38: LDX $F2
$DC3A: LDA $073C,X       ; 读取当前值
$DC3D: CLC
$DC3E: SBC $F7           ; 减去参数
$DC40: BPL $DC44
$DC42: LDA #$00          ; 钳位到 0
$DC44: ORA $F6           ; 合并控制标志
$DC46: LDY #$06
$DC48: STA ($F0),Y       ; 写回 (偏移+6)
$DC4A: LDX $F3           ; 剩余项目数
$DC4C: DEX
$DC4D: LDA $07D9,X       ; 检查是否结束
$DC50: BNE $DC53
$DC52: RTS
```

**数据结构** (基于 `$F0/F1` 指向的 16 字节条目):
```
Offset 0-1:  指针/数据
Offset 2:    基地址 MSB
Offset 3:    项目计数 ($F3 = count)
Offset 4:    ? 未知
Offset 5:    控制字节 (高 4 = flags, 低 4 = delta)
Offset 6:    当前值
Offset 7-15: 其他字段
```

**操作数域** ($07XX 区域):
- `$0738`: 全局位旋转标志
- `$0739+X`: 子帧计数器
- `$073B+X`: 主帧计数器 (触发 `$DC20` 的阈值)
- `$073C+X`: 当前操作值
- `$07D9+X`: 结束标志

#### $DCCA (89 次调用 / 88 帧)

故事板辅助函数，可能与属性表更新或 CHR Bank 切换相关。

#### $DD5E (26 次调用 / 26 帧)

故事板结束/清理函数。

#### $DE1C (9 次调用 / 9 帧)

故事板初始化函数。

### 3.5 $D000-$DFFF — 开场 RLE 数据区

**ROM 偏移 $05000-$05FFF** — 开场动画 4 页 nametable RLE 压缩数据。

| 指针 | ROM偏移 | 内容 |
|------|---------|------|
| `$D068` | `$05068` | Page 0: 820 tiles |
| `$D07F` | `$0507F` | Page 1: 834 tiles |
| `$D093` | `$05093` | Page 2: 870 tiles |
| `$D0A5` | `$050A5` | Page 3: 889 tiles |

RLE 格式: `[count_hi+0x80|data_byte]` 或 `[count_lo|data_byte]`

### 3.6 $DB00-$DB1C — NMI 音频回调入口

```
每帧 NMI: Bank 0 $8113 → JSR $DB00 → 音频引擎 tick
```

可能进一步调用 Bank 5 的音频数据。

---

## 4. 子程序调用图

```
State 0 Dispatcher ($82A1, Bank 0)
  └→ JSR $84D2(A=$10) → Bank 1 Sub 0
       └→ 开场动画调度器 ($804B)
            ├→ Sub 0-4 → RLE 解码 + CHR 切换
            │    └→ PPU 队列文字打印 ($8106)
            │         └→ Bank 7 文本数据 ($E306-$F968)
            ├→ Sub 5-6 → CHR Bank 立绘/收尾
            └→ Sub 7 → transitionTo(1)

NMI ($80E0, Bank 0)
  └→ JSR $DB00 (每帧)
       └→ 音频状态更新

主故事板循环 ($DB1D)
  ├→ DEC 计数器 ($0739+X)
  └→ DEC 主计数器 ($073B+X)
       └→ BEQ → JSR $DC20 (418x)
            ├→ 控制字节解码 (偏移+5)
            ├→ 数据更新 (偏移+6)
            └→ 检查结束标志 ($07D9+X)

$DC20 内调链:
  ├→ (内部: 逐字段处理 16 字节条目)
  └→ (无进一步 JSR)
```

---

## 5. 内存使用 (Bank 01 相关)

| 地址 | 变量 | 说明 |
|------|------|------|
| `$007A` | openingSub | 开场动画子状态 (0-7) |
| `$0079` | frameCounter | 帧计数器 (控制文字 tile 间隔) |
| `$03CB` | subState | Bank 内子状态 |
| `$033A-$03FF` | ppuVramBuffer | PPU vram buffer (文字写入) |
| `$0738` | rotFlag | 全局位旋转标志 |
| `$0739-$075F` | subCounter | 子帧计数器 (每个 $DC20 条目) |
| `$0761-$077F` | mainCounter | 主帧计数器 |
| `$07D9-$07FF` | endFlag | 结束标志 |

---

## 6. Trace 统计 (关键函数调用频率)

| 函数 | 调用次数 | 帧数 | 说明 |
|------|---------|------|------|
| `JSR $DC20` | 418 | 365 | 核心状态机，最频繁 |
| `JSR $DCCA` | 89 | 88 | 辅助功能 |
| `JSR $C3CE` | 69 | 69 | 过渡/辅助 |
| `JSR $DD5E` | 26 | 26 | 结束/清理 |
| `JSR $DBA1` | 10 | 10 | 初始化 |
| `JSR $DB8D` | 9 | 9 | 辅助 |
| `JSR $DE1C` | 9 | 9 | 初始化 |

---

## 7. 已知 BUG 关联

| BUG | 相关 |
|-----|------|
| **BUG-028** | 开场动画分镜内容：原使用 hardcode duration 替代 `$DC20` 状态机 |
| **BUG-029** | RLE 数据 Bank 映射错误：指针 `$D068` 在 Bank 1 `$C000-$DFFF` 而不是 Bank 7 |

---

## 8. 待确认/疑问点

- [ ] `$DC20` 状态机完整字段定义（offset 0-15 的 16 字节条目结构）
- [ ] `$DCCA` 和 `$C3CE` 的确切功能
- [ ] 故事板滚动/过渡效果的触发条件
- [ ] `$DD5E` 结束函数的具体清理内容

---

*分析日期: 2026-08-05*
*依据: Trace log + DE_LOG + OPENING_ANIMATION_ANALYSIS + BUG_TRACKER + ASM*
开场56个精灵在 ASM 中的位置
1. 精灵构建函数
bank_01_code.asm ROM 偏移 0x4269 → CPU $8259-$82BE

code
01:8259: CLC
01:825A: JSR $C3BA      ← 加载精灵数据指针到 (ram_0000)
01:825D: LDA #$00
01:825F: TAY             ← Y=0 (数据索引)
01:8260: STA ram_0007    ← 精灵槽号=0
01:8264: LDA #$40
01:8266: STA ram_0005    ← 基准 X=$40 (64)
01:826A: LDA #$30
01:826C: STA ram_0004    ← 基准 Y=$30 (48)

; --- 主循环 ---
01:826C: LDA (ram_0000),Y ; 读数据字节
01:826E: AND #$0F         ; 低4位 = 该行精灵个数
01:8270: BNE $827F         ; 有精灵 → 构建
01:8272: INY              ; 跳过该行(下一行)
01:8273-01:827C: Y+=8     ; 下一行坐标
01:827C: BCC $8268         ; 继续

; --- 构建精灵 ---
01:8281: LDA (ram_0000),Y ; 同字节高4位 = X偏移
01:8285: LSR
01:8287: ADC ram_0004     ; 更新基准X
01:828E: ASL;ASL           ; 槽号*4→X寄存器
01:8290: TAX
01:8296: STA $0204,X      ; 写 OAM Y
01:829B: STA $0207,X      ; 写 OAM X
01:829E: LDA (ram_0000),Y ; 读 tile 编号
01:82A0: STA $0205,X      ; 写 OAM Tile
01:82A4: LDA (ram_0000),Y ; 读属性
01:82A6: AND #$C3         ; 保留 flip + palette
01:82A8: STA $0206,X      ; 写 OAM Attr
01:82B7: INC ram_0007     ; 下一槽号
01:82BA: DEC ram_0008     ; 计数器-1
01:82BC: BNE $828C         ; 该行还有精灵
2. 精灵数据表
数据在 bank_07 (fixed bank) — CPU $C3A2-$C420+（ROM 偏移 0x1C3B2），格式为 nibble 压缩编码：

code
格式: [count|Xoff] [tile] [attr] ...
       byte[0]     byte[1] byte[2]
       bit3-0=数量  bit7-4=X偏移
没有直接的 4 字节 OAM 静态表 —— 所有精灵坐标由基准值 (Y=0x30, X=0x40) + 数据表中的偏移量动态计算得出。

3. DMA 触发
bank_00_code.asm ROM 偏移 0x00F2 → CPU $80F2:

asm
LDA #$00 → STA $2003   ; OAMADDR=0
LDA #$02 → STA $4014   ; DMA $0200→OAM（256字节）
这与标准 NES 做法完全一致。