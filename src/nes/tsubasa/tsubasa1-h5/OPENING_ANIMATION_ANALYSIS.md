# 开场动画 CHR Bank 切换 & 文字逐Tile打印分析

> 创建: 2026-08-05 | 更新: 2026-08-05 | 基于 ROM 反汇编分析

---

## 1. 概述

开场动画共有 **6 个分镜场景**，每个场景对应不同的 CHR Bank 配置。
由于 MMC1 支持两个 4KB CHR Bank 同时映射（CHR Bank 0 和 CHR Bank 1），
一帧内可能同时使用两个不同的 CHR Bank（背景和精灵各用一个）。

### 1.1 核心概念：一切皆 Tile

> **重要**：开场动画中的所有内容——包括背景图和文字——都是 tiles。
> CHR Bank 中的每个 8×8 像素块既可以是背景图案的组成部分，也可以是文字 glyph。
> 文字不是现代意义上的"字体渲染"，而是把文字 tile 逐个写入 nametable 形成「打字机效果」。

### 1.2 文字打印机制

- 文本数据存储在 Bank 7 的 `$E306-$F968` 区域（74 段 tile 编码文本）
- 每段文本是由 tile 索引号组成的字节序列
- 通过 Bank 1 的 `$81E6-$8212` 函数逐帧将 tile 索引写入 nametable
- 一帧可能写 1 个 tile，实现逐字出现的视觉效果
- 文本 tile 来自 CHR Bank 09（日文字体）

---

## 2. 文字 Tile 打印机制详解

### 2.1 PPU 队列逐帧写入 (Bank 1 `$81E6-$8212`)

每个分镜的文字不是一次性绘制完成的。ROM 通过 PPU 写入队列 `$033A-$03FF` 
在 NMI/vblank 期间逐帧写入 nametable：

```asm
; 设置 PPU 地址 → nametable 0 的特定位置
01:81BE: LDA #$21          ; 高位 ($2000区域)
01:81C0: STA $2006
01:81C3: LDA #$E0          ; 低位 (具体位置)
01:81C5: STA $2006

; 然后逐 byte 写入 $2007 (PPU_DATA)
; 每帧通过 PPU 队列写入有限个 tile
```

### 2.2 文本数据格式 (Bank 7 `$E306-$F968`)

文本段以 tile 索引的字节序列存储。控制码：

| 字节 | 含义 |
|------|------|
| `$00` | 文本段结束 |
| `$E0` + N | 命令前缀：后面的 N 字节是 PPU 控制参数 |
| `$80-$9F` | RLE 计数 (bit4-0 个重复值) |
| `$20-$7F` | 普通文字 tile 索引 (来自 CHR Bank 09) |
| `$FF` | 特殊控制 |

### 2.3 分镜中文字出现的时序

```
分镜 N 开始
  ├─ 帧 1-10:  加载背景 tiles (RLE → nametable)
  ├─ 帧 11-15: 文字行1 tile[0]
  ├─ 帧 16-20: 文字行1 tile[1]
  ├─ ...
  ├─ 帧 N-N+5: 文字行1 tile[last]
  ├─ 帧 N+6:   等待/翻页
  └─ 过渡 → 分镜 N+1
```

每个文字 tile 的写入间隔由 `$79` 帧计数器控制，
在 Bank 1 `$C0A7` (子状态 2) 中递减。

---

## 3. Bank 切换核心机制

### 3.1 核心函数 `$84D2` (Bank 0)

```asm
00:84D2: PHA              ; 保存 A
00:84D3: LSR A            ; 移位4次获取高4位
00:84D4: LSR A
00:84D5: LSR A
00:84D6: LSR A
00:84D7: JSR $83C5        ; → 写入 PRG Bank (MMC1 $E000)
00:84DA: PLA              ; 恢复 A
00:84DB: AND #$0F         ; 低4位 = CHR 配置索引
00:84DD: STA $05FC        ; 存储 CHR 配置索引
00:84E0: ASL A            ; A = idx * 2
00:84E1: ADC $05FC        ; A = idx * 3
00:84E4: STA $05FB        ; 跳转向量低字节
00:84E7: LDA #$C0
00:84E9: STA $05FC        ; 跳转向量高字节 = $C0
00:84EC: JMP ($05FB)      ; 跳转到新 PRG Bank 的 $C0xx
```

**输入格式**: `[PRG_Bank:4][CHR_Config:4]`
- 高4位 → PRG Bank 编号 (0-7)
- 低4位 → CHR 配置索引，用于查表跳转到 `$C000 + idx*3`

### 3.2 MMC1 CHR 寄存器写入

两个 CHR 写入函数 (Bank 0):

| 函数 | MMC1 寄存器 | CHR 映射 |
|------|-----------|---------|
| `$83CF` | $C000-$DFFF | CHR Bank 1 (高4KB: $1000-$1FFF) |
| `$83D7` | $A000-$BFFF | CHR Bank 0 (低4KB: $0000-$0FFF) |

由于 MMC1 配置为两个 4KB bank 模式，背景和精灵可以各自使用不同的 CHR Bank。

---

## 4. 开场动画状态机 (Bank 1)

### 4.1 状态变量 `ram_03CB`

状态跳转表位于 Bank 1 `$C04B`:

| State | 入口地址 | 分镜 | 描述 | 估计 CHR Bank(s) |
|-------|---------|------|------|-----------------|
| **0** | `$C05B` | — | 初始化: 设置 Bank 5/CHR D | Bank 0D (头像 tiles) |
| **1** | `$C070` | 分镜1 | 标题 Logo 淡入动画 | Bank 00 (标题图形) + Bank 09 (字体) |
| **2** | `$C0A7` | 分镜2 | 等待/显示画面 | Bank 00 + Bank 09 |
| **3** | `$C0BE` | 分镜3 | 转场过渡 | Bank 00/0D |
| **4** | `$C0ED` | 分镜4 | 角色肖像特写 | Bank 0D + Bank 0E (大空翼立绘) |
| **5** | `$C106` | 分镜5 | 动画继续 | Bank 0D/0E/0F |
| **6** | `$C181` | 分镜6 | 结束动画 | Bank 00/0D |
| **7** | `$C213` | — | 动画结束 → 标题画面 | 切换到 State 01 |

### 4.2 6 个分镜的特殊处理

Bank 1 `$8015-$8033`:
```asm
01:8015: LDA $03CB        ; 读取动画状态
01:8018: BEQ $8036         ; state=0 → 跳过
01:801A: LDA #$10
01:801C: JSR $803E        ; 检查标志位
01:801F: BEQ $8036
01:8021: LDA $03CB
01:8024: CMP #$06          ; state < 6 ?
01:8026: BCS $8036         ; state >= 6 → 跳过
01:8028: JSR $8020         ; 特殊处理：CHR Bank 切换
01:802B: JSR $801D         ; PPU 更新
01:802E: JSR $8014         ; 精灵更新
01:8031: LDA #$05
01:8033: STA $03CB         ; 强制 state=5
```

**关键**: `CMP #$06` 判断说明 State 0-5（共6个）在特定条件下会切换到 State 5，
这6个就是用户提到的 6 个分镜。

---

## 5. CHR Bank 使用推测

基于 ROM 结构和代码分析：

| CHR Bank | ROM 偏移 | 内容推测 | 对应分镜 |
|----------|---------|---------|---------|
| **0x00** | $20000 | 标题/菜单图形 (Tecmo Logo 等) | 分镜1-2 |
| **0x01** | $22000 | 球员精灵 tiles | (比赛用) |
| **0x02** | $24000 | 球场背景 tiles | (比赛用) |
| **0x09** | $32000 | 字体/文字 tiles (日文) | 分镜1-2 |
| **0x0D** | $3A000 | 角色头像/剧情特写 (上) | 分镜4-5 |
| **0x0E** | $3C000 | 角色立绘 (翼等主角) | 分镜4-5 |
| **0x0F** | $3E000 | 角色头像/背景 (下) | 分镜5-6 |

### 5.1 每帧可能的双 Bank 配置

由于 MMC1 支持两个 4KB CHR Bank:
- **CHR Bank 0** ($0000-$0FFF): 通常用于背景 tiles
- **CHR Bank 1** ($1000-$1FFF): 通常用于精灵 tiles

分镜4 (角色特写) 可能的配置:
- CHR Bank 0 = 0x0D (头像上部分)
- CHR Bank 1 = 0x0E (大空翼立绘)

---

## 6. 实现要点

### 6.1 TypeScript 侧需要实现的

1. **CHR Bank Manager**: 管理多个CHR Bank的PNG资源加载和切换
2. **Scene Manager**: 6个分镜的状态管理
3. **Tile-by-Tile Text Printer**: 逐帧将文字 tile 写入 VRAM 的队列系统
4. **Dual Bank Rendering**: 支持一帧内用两个CHR Bank渲染
5. **转场效果**: 淡入淡出、scroll 过渡等

### 6.2 Canvas 实现方案

由于 Canvas 渲染而非 PPU 硬件:
- **VRAM 模拟**: 维护一个本地 `nametableBuffer: Uint8Array[960]`，模拟 NES nametable
- **逐Tile文字**: 每帧从文本队列中取出 1 个 tile 索引写入 nametableBuffer，再整体渲染
- **双Bank渲染**: 前景 tiles 从 chrBank1.png 读取，背景从 chrBank0.png 读取
- **CHR Bank 切换**: 对应不同的 PNG sprite sheet，切换 tile 查找的源数据

### 6.3 核心数据结构

```typescript
/** 分镜场景定义 */
interface OpeningScene {
  id: number;              // 0-5 (6 scenes)
  chrBank0: number;        // CHR Bank 0 (背景图案)
  chrBank1: number;        // CHR Bank 1 (文字 tile + 精灵)
  textSegments: TextSegment[];  // 该分镜的文字段
  duration: number;        // 帧数
}

/** 文字段: 定义一段文字的 tile-by-tile 打印序列 */
interface TextSegment {
  nametableAddr: number;   // 写入目标地址 ($2000-$23BF)
  tileIndices: number[];   // tile 索引序列 (来自 CHR Bank 09)
  delayPerTile: number;    // 每 tile 的帧间隔
}

/** 文字打印队列: 逐帧消费 */
interface TextPrintQueue {
  segments: TextSegment[];
  currentSegment: number;
  currentTileIdx: number;
  frameCounter: number;    // 递减，归零时打印下一个 tile
}
```

### 6.4 Canvas 渲染文字 Tile 的流程

```
每帧:
  1. 检查 textPrintQueue.frameCounter
     ├─ > 0: 递减，跳过
     └─ = 0: 
         2. 从 textPrintQueue 取出下一个 tile 索引
         3. nametableBuffer[targetAddr] = tileIndex
         4. frameCounter = delayPerTile
  3. Canvas 渲染：
     for (y = 0; y < 30; y++)
       for (x = 0; x < 32; x++)
         tileIdx = nametableBuffer[y * 32 + x]
         从 chrBank1.png (文字) 或 chrBank0.png (背景) 
         读取 (tileIdx % 16) * 8, floor(tileIdx / 16) * 8 处的 8×8 像素
         ctx.drawImage(...)
```

> ⚠️ 各分镜的实际文本数据需要从 ROM Bank 7 的 `$E306-$F968` 提取。
> 通过运行 NES 原版并使用 FCEUX 的 PPU/Name Table Viewer 来精确验证。

---

## 7. 验证方法

1. 在 FCEUX 中运行原版 ROM
2. 使用 Debug → PPU Viewer 观察每个分镜的 CHR 布局
3. 使用 Debug → Name Table Viewer 查看背景布局
4. 记录每个分镜的:
   - CHR Bank 0 和 Bank 1 的编号
   - 名称表内容
   - 调色板配置
   - 持续时间(帧数)

---

## 8. 相关文件

| 文件 | 描述 |
|------|------|
| `_tmp_disasm_out/banks/bank_00_code.asm` | Bank 切换核心函数 ($84D2, $83C5, $83CF, $83D7) |
| `_tmp_disasm_out/banks/bank_01_code.asm` | 开场动画状态机 ($8015-$8105) |
| `public/sprites/chr_bank_*.png` | 16个CHR Bank的PNG导出 |
| `ROM_STRUCTURE_REPORT.md` | ROM 整体结构分析 |
