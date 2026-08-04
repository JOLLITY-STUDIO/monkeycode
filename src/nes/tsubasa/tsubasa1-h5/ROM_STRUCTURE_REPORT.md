# ROM 结构分析报告 - 天使之翼 (Captain Tsubasa)

> 版本: 1.0 | 日期: 2026-08-04

---

## 1. NES ROM 基本信息

| 属性 | 值 |
|------|-----|
| **游戏名称** | 天使之翼 (Captain Tsubasa) |
| **区域** | Japan (NTSC) |
| **Mapper** | MMC1 (Mapper #1) |
| **PRG-ROM** | 128KB (8 × 16KB banks) |
| **CHR-ROM** | 128KB (16 × 8KB banks) |
| **Mirroring** | Horizontal |
| **Battery RAM** | No |
| **Trainer** | No |

---

## 2. 中断向量

| 向量 | 地址 | 值 | 跳转目标 |
|------|------|-----|---------|
| **NMI** | $FFFA-$FFFB | $8002 | `JMP $80E0` (NMI 处理器) |
| **RESET** | $FFFC-$FFFD | $FFC0 | MMC1初始化 → `JMP ($8000)` → `$809B` |
| **IRQ** | $FFFE-$FFFF | $8002 | 同NMI (未使用) |

---

## 3. PRG Bank 布局

| Bank | CPU 地址 | ROM 偏移 | 类型 | 描述 |
|------|---------|---------|------|------|
| **00** | $8000-$BFFF | $00000 | Switchable | 核心引擎：RESET、NMI、主循环、状态调度、输入、PPU更新 |
| **01** | $8000-$BFFF | $04000 | Switchable | 代码/数据 Bank 1 |
| **02** | $8000-$BFFF | $08000 | Switchable | NMI辅助/比赛图形处理 |
| **03** | $8000-$BFFF | $0C000 | Switchable | 数据 Bank 3 |
| **04** | $8000-$BFFF | $10000 | Switchable | 代码 Bank 4 |
| **05** | $8000-$BFFF | $14000 | Switchable | 数据 Bank 5 |
| **06** | $8000-$BFFF | $18000 | Switchable | 代码 Bank 6 |
| **07** | $C000-$FFFF | $1C000 | Fixed | 固定 Bank: 事件脚本数据、向量表 |

---

## 4. CHR Bank 布局 (图形数据)

共16个CHR Bank，每个8KB：

| CHR Bank | ROM 偏移 | 描述 |
|----------|---------|------|
| 00 | $20000 | 标题/菜单图形 |
| 01 | $22000 | 角色/球员精灵 |
| 02 | $24000 | 球场/背景 |
| 03 | $26000 | UI元素 |
| 04 | $28000 | 动画帧 |
| 05 | $2A000 | 特效 |
| 06 | $2C000 | 过场/剧情 |
| 07 | $2E000 | 备用图形 |
| 08 | $30000 | 备用图形 |
| 09 | $32000 | 字体/文字 |
| 0A | $34000 | 备用图形 |
| 0B | $36000 | 备用图形 |
| 0C | $38000 | 备用图形 |
| 0D | $3A000 | 角色头像/剧情特写 (上) |
| 0E | $3C000 | **角色头像/剧情特写** — 大空翼等主角立绘 |
| 0F | $3E000 | 角色头像/剧情特写 (下) / 备用 |

---

## 5. MMC1 映射配置

MMC1 寄存器分配 (5位串行写入):

| 寄存器 | 地址 | 功能 |
|--------|------|------|
| **Control** | $8000-$9FFF | PRG/CHR模式、镜像 |
| **CHR Bank 0** | $A000-$BFFF | CHR低页交换 |
| **CHR Bank 1** | $C000-$DFFF | CHR高页交换 |
| **PRG Bank** | $E000-$FFFF | PRG Bank选择 |

**初始配置** (RESET时写入 `$1A`):
- PRG模式: 16KB fixed ($C000-$FFFF) + 16KB switchable ($8000-$BFFF)
- CHR模式: 两个4KB bank
- Mirror: Horizontal

---

## 6. 核心执行流程

### 6.1 RESET 启动流程

```
$FFC0: SEI, CLD                   ; 关中断，清十进制模式
$FFC2: LDA #$10, STA $2000        ; PPU CTRL 初始化
$FFC7: LDA #$80, STA $8000        ; MMC1 Reset
$FFCC: 写 $1A 到 MMC1 (5次移位)   ; MMC1配置
$FFD7: JMP ($8000)                ; → $809B (Bank 0 启动代码)

--- Bank 0 ($809B) ---
$809B: SEI, CLD                   ; 再次关中断
$809D: 等待 VBlank (两次)         ; 等PPU稳定
$80A7: LDX #$FF, TXS              ; 初始化堆栈指针
$80AA: LDA #$06, STA $2001        ; PPU MASK = $06
$80AF: 清零 RAM $0000-$07FF       ; 初始化全部RAM
$80C3: STA $16/$17                ; 滚动 = 0
$80C9: STA $19 = $10              ; PPU CTRL 镜像
$80CD: STA $18 = $06              ; PPU MASK 镜像
$80D1: JSR $82CC                  ; 初始化PPU缓冲区
$80D4: JSR $8371                  ; Bank切换
$80D7: JSR $838F                  ; PPU 名称表清空
$80DA: JSR $82F5                  ; 开启NMI
$80DD: JMP $81EE                  ; → 主循环
```

### 6.2 NMI 中断处理流程 ($80E0)

```
1. PHA / 关NMI / 写PPU MASK
2. 保存 X, Y 寄存器
3. OAM DMA ($0200→$2004)
4. JSR $812F: 处理PPU更新队列 (写入VRAM)
5. JSR $81B9: 读取手柄输入
6. JSR $82AD: 更新帧计数器
7. 如果 $93==0: Bank切换 → JSR $DB00 (游戏逻辑调用)
8. INC $0300: 帧计数+1
9. 恢复寄存器 / 开NMI / RTI
```

### 6.3 主循环 ($81EE)

```
loop:
  JSR $8314     ; 等待NMI (等待 $0300 非零)
  JSR $81F7     ; 游戏状态分发器
  JMP loop      ; 无限循环
```

### 6.4 游戏状态分发器 ($81F7)

基于 `$03CA` (gameState) 的值通过跳转表分发：

| State | 地址 | 功能 |
|-------|------|------|
| 0 | `$82A1` | 初始化/标题画面 |
| 1 | `$82A7` | 标题画面等待 |
| 2 | `$8276` | 菜单选择 |
| 3 | `$8264` | 队员选择/阵型 (固定南葛队) |
| 4 | `$826A` | 比赛主循环 |
| 5 | `$8270` | 比赛事件处理 |
| 6 | `$8264` | 过渡动画 |
| 7 | `$82A7` | 结果画面 |
| ... | ... | 更多状态 |

---

## 7. RAM 内存映射分析

### 7.1 零页 ($0000-$00FF) - 核心变量

| 地址 | 变量 | 描述 |
|------|------|------|
| $00-$01 | temp/ptr | 临时指针 |
| $12-$13 | ppuPtr | PPU写入指针 |
| $16 | ppuScrollX | PPU 滚动 X |
| $17 | ppuScrollY | PPU 滚动 Y |
| $18 | ppuMask | PPU MASK 镜像 ($2001) |
| $19 | ppuCtrl | PPU CTRL 镜像 ($2000) |
| $1A-$1C | mmcBankReg | MMC1 Bank寄存器镜像 |
| $3A | tempA | 临时A寄存器 |
| $3C-$3D | nmiState | NMI状态/计数器 |
| $93 | bankLock | Bank切换锁 |

### 7.2 关键内存区域

| 地址范围 | 用途 |
|---------|------|
| $0200-$02FF | OAM 精灵数据 (Sprite DMA) |
| $0300-$03FF | 帧计数、输入、PPU更新队列 |
| $0400-$05FF | 游戏状态数据 |
| $0600-$06FF | 比赛数据(球员位置、分数等) |
| $0700-$07FF | 栈区域 |

---

## 8. 关键系统子系统

### 8.1 输入系统 ($81B9-$81ED)
- 读取两个手柄 ($4016/$4017)
- 数据存储在 $0301-$0304
- 每个手柄读取8次，构建按键位图

### 8.2 PPU 更新系统 ($812F-$81B8)
- 双缓冲机制：$0305 队列状态 + $0306 起始地址
- 支持批量VRAM写入
- 支持 $0339 静态缓冲写入

### 8.3 随机数发生器 ($82AD-$82CB)
- 使用 $05BA/$05BB 作为种子
- 通过移位和进位的伪随机算法

### 8.4 MMC1 Bank 切换 ($83C0-$83EF)
- $83C7: 写寄存器0 (Control)
- $83CF: 写寄存器1 (CHR 0)
- $83D7: 写寄存器2 (CHR 1)
- $83DF: 写寄存器3 (PRG Bank)

---

## 9. 数据段分析

Bank 7 ($C000-$FFFF) 的 CDL分析显示：
- $C000-$C2AF: 数据区（主要是跳转表和事件脚本指针）
- $C2B0-$FFBF: 大量数据脚本和资源定义
- $FFC0-$FFF7: RESET代码
- $FFF8-$FFFF: 中断向量表

---

## 10. 转写策略

### 10.1 内存 → 缓存中心 (Cache)
- 零页变量 → 类属性/Map
- OAM → SpriteRenderer数组
- PPU队列 → 渲染命令队列
- RAM → 结构化DataStore (key-value)

### 10.2 Bank → 模块
- Bank 0 → CoreEngine (RESET/NMI/MainLoop)
- Bank 1 → 游戏逻辑模块1
- Bank 2 → Renderer/图形处理
- Bank 3 → 数据定义模块
- Bank 4 → 游戏逻辑模块2
- Bank 5 → 数据定义模块
- Bank 6 → 游戏逻辑模块3
- Bank 7 → EventScript/场景数据

### 10.3 CHR → PNG 资源
- 16个CHR bank → 16张PNG精灵表
- 运行时通过canvas绘制
