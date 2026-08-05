# 天使之翼1 (Captain Tsubasa Vol. I) — ROM 结构完整分析报告

> **ROM**: `Captain Tsubasa (Japan).nes` | **大小**: 256KB PRG + 128KB CHR  
> **Mapper**: MMC1 (Mapper 1) | **Mirroring**: 水平镜像  
> **PRG Banks**: 8 个 × 16KB = 128KB PRG | **CHR Banks**: 16 个 × 8KB = 128KB CHR  
> **生成日期**: 2026-08-05 | **基于**: CDL + ASM反汇编 + Trace日志交叉验证

---

## 1. ROM Header 解析

| 字段 | 偏移 | 值 | 含义 |
|------|------|-----|------|
| NES 标识 | $0000-$0003 | `4E 45 53 1A` | "NES␚" |
| PRG ROM 大小 | $0004 | `08` | 8 × 16KB = 128KB |
| CHR ROM 大小 | $0005 | `10` | 16 × 8KB = 128KB |
| Mapper (低) | $0006 | `10` | MMC1 (bit4=1, mapper bits=0001) |
| Mapper (高) | $0007 | `00` | — |
| PRG RAM 大小 | $0008 | `00` | 无电池备份RAM |

**MMC1 配置**:
- PRG Mode 2: `$8000-$BFFF` 可切换 (Bank 0-6), `$C000-$FFFF` 固定 (Bank 7)
- CHR Mode 1: 双 4KB Bank 可切换
- 镜像: 水平镜像 (由 MMC1 控制寄存器 bit0-1 决定)

---

## 2. Bank 布局总览

```
Bank 0 ($00010-$03FFF) → CPU $8000-$BFFF [Switchable]  核心引擎
Bank 1 ($04010-$07FFF) → CPU $8000-$BFFF [Switchable]  开场动画+故事板
Bank 2 ($08010-$0BFFF) → CPU $8000-$BFFF [Switchable]  NMI辅助+指针表
Bank 3 ($0C010-$0FFFF) → CPU $8000-$BFFF [Switchable]  球员/球队数据
Bank 4 ($10010-$13FFF) → CPU $8000-$BFFF [Switchable]  比赛引擎
Bank 5 ($14010-$17FFF) → CPU $8000-$BFFF [Switchable]  标题+音频数据
Bank 6 ($18010-$1BFFF) → CPU $8000-$BFFF [Switchable]  菜单/事件/结果
Bank 7 ($1C010-$1FFFF) → CPU $C000-$FFFF [FIXED]      向量表+事件脚本
```

---

## 3. Bank 详细分析

### 3.1 Bank 0 — 核心引擎 (Switchable)

**ROM**: `$00010-$03FFF` | **CPU**: `$8000-$BFFF` | **大小**: ~490KB ASM

**核心职责**: 游戏启动、NMI处理、主循环、状态调度、PPU更新、手柄输入、数学运算

**对外API跳转表** ($8000-$8098, ~27个API):
| API | 地址 | 功能 |
|-----|------|------|
| NMI Entry | $8002 | NMI中断入口 |
| WaitNmi | $8005 | 等待下一个NMI帧 |
| EnableNmi | $800B | 开启NMI中断 |
| DisableNmi | $8011 | 关闭NMI |
| EnableScreen | $8014 | 开启屏幕渲染 |
| JumpViaTable | $8017 | 间接跳转分发器 (A×2查表JMP) |
| ClearOam | $801D | 清除OAM精灵数据 |
| ClearNametable | $8020 | 清空nametable |
| QueuePpuUpdate | $8023 | PPU更新队列 |
| WriteMmcRegister | $8026 | 写入MMC1寄存器 |
| ProcessPpuQueue | $8032 | 处理PPU更新队列 |
| LoadPalette | $803B | 加载调色板 |
| CheckInputEdge | $803E | 检测按键边沿 |
| Divide16 | $8041 | 16位除法 |
| Multiply16 | $8044 | 16位乘法 |
| GetPlayerPointer | $8047 | 获取球员数据指针 |
| QueueSoundEffect | $8059 | 音效队列 |
| BankAwareStore | $8071 | Bank安全写入 |

**游戏状态机** (gameState = `ram_03CA`, 0-7):
| State | 目标 | 功能 |
|-------|------|------|
| 0 | $82A1 → Bank 1, Sub 0 | 开场动画 |
| 1 | $82A7 → Bank 5, Sub D | 标题画面 |
| 2 | $8276 → Bank 6, Sub 0 | 菜单选择 |
| 3 | $85CD (内部) | 比赛初始化 |
| 4 | $87B9 (内部) | 比赛主循环 |
| 5 | $820D (内部) | 状态转换(进球/半场) |
| 6 | $8264 → Bank 6, Sub 3 | 事件处理 |
| 7 | $8270 → Bank 6, Sub 1 | 比赛结果 |

**主循环流程**:
```
$81EE: while(true) {
    WaitNmi();           // $8314 - 等待ram_0300非零
    gameStateDispatch(); // $81F7 - 根据ram_03CA分发
}
```

### 3.2 Bank 1 — 开场动画+故事板 (Switchable)

**ROM**: `$04010-$07FFF` | **CPU**: `$8000-$BFFF`

**职责**: 开场动画6个分镜、RLE解压、逐tile文字打印、NMI音频回调

**CHR Bank 配置表** (分镜→CHR):
| 分镜 | CHR Bank 0 | CHR Bank 1 |
|------|-----------|-----------|
| 0 | $04 | $06 |
| 1 | $08 | $06 |
| 2 | $0A | $06 |
| 3 | $0C | $06 |
| 4 | $0C | $19 |

**RLE数据指针**:
| 页 | ROM偏移 | Tiles |
|----|---------|-------|
| Page 0 | $05068 | 820 |
| Page 1 | $0507F | 834 |
| Page 2 | $05093 | 870 |
| Page 3 | $050A5 | 889 |

**RLE格式**: `[count_hi+0x80|data_byte]` 或 `[count_lo|data_byte]`

**核心函数**:
- `$DC20` (418次trace调用): 核心状态机 — 控制每个故事板分镜播放
- `$C3CE`: 过渡效果辅助
- `$DB00`: 每帧NMI音频回调入口

### 3.3 Bank 2 — NMI辅助+指针表 (Switchable)

**ROM**: `$08010-$0BFFF` | **CPU**: `$8000-$BFFF`

**职责**: 数据指针表存储、NMI辅助处理、可读Bank 7事件脚本

**关键数据表**:
- `$D05E`: 开场动画RLE指针表 (8条目)
- `$D0F3`: 综合数据指针表 (32条目，10条指向Bank 7)
- `$B24F`: 标题画面调色板 (32字节)

**CDL标记**: 含有 `D 2` 标记，证明Bank 2/3代码可读取Bank 7 scripts

### 3.4 Bank 3 — 球员/球队数据 (Switchable)

**ROM**: `$0C010-$0FFFF` | **CPU**: `$8000-$BFFF`

**职责**: 所有球员能力值、必杀技、球队阵容数据

**球员数据结构** (推断, 32-64字节/人):
| 偏移 | 大小 | 字段 |
|------|------|------|
| 0-1 | 2B | 球员ID |
| 2-3 | 2B | 名称指针 (→Bank 7) |
| 4 | 1B | 位置 (FW/MF/DF/GK) |
| 5-9 | 5B | 能力值 (射/传/盘/抢/速) |
| 10 | 1B | 体力 |
| 11-15 | 5B | 必杀技ID列表 |
| 16+ | — | 其他属性 |

### 3.5 Bank 4 — 比赛引擎 (Switchable)

**ROM**: `$10010-$13FFF` | **CPU**: `$8000-$BFFF`

**职责**: 比赛核心逻辑 — AI、物理、碰撞、判罚

**16个比赛API** (通过Bank 0间接调用):
`$B240, $B402, $AD66, $AD9A, $B4A8, $B4B1, $A4CC, $B934, $A3E3, $8BBB, $88F9, $86D0, $ADEC, $B458, $910F, $A53C`

**关键内存变量**:
| 地址 | 变量 | 说明 |
|------|------|------|
| `$05E0` | scoreA | 比分A |
| `$05E1` | scoreB | 比分B |
| `$05EF` | matchFlags | 比赛标记 |
| `$064F` | matchPhase | 比赛阶段 |

### 3.6 Bank 5 — 标题+音频数据 (Switchable)

**ROM**: `$14010-$17FFF` | **CPU**: `$8000-$BFFF`

**职责**: 标题画面逻辑(Bank 5, Sub D=13)、音乐/音效数据、比赛脚本

**调度**: State 1 → `$84D2(A=$5D)` → Bank 5, Sub 13

### 3.7 Bank 6 — 菜单/事件/结果 (Switchable)

**ROM**: `$18010-$1BFFF` | **CPU**: `$8000-$BFFF`

**内部Sub跳转表** ($8000):
| Sub | 入口 | 功能 |
|-----|------|------|
| Sub 0 | `$C00C` | 菜单选择画面 |
| Sub 1 | `$CF97` | 比赛结果画面 |
| Sub 2 | `$CDFC` | 辅助入口 |
| Sub 3 | `$D27F` | 进球/半场事件 |

**数据表**:
- `$CE4A-$CE5E`: 结果画面参数表 (5×3B)
- `$CE5F-$CEDA`: 阶段查表数据 (124B)
- `$06FF-$0716`: 4×6 排名数据组

### 3.8 Bank 7 — 固定Bank (FIXED)

**ROM**: `$1C010-$1FFFF` | **CPU**: `$C000-$FFFF`

**布局**:
| 地址 | 大小 | 内容 |
|------|------|------|
| `$C000-$C02B` | 44B | 22条目内部指针表 |
| `$C02C-$C063` | 56B | 指针表续 ($41xx偏移量) |
| `$C064-$E28D` | ~8KB | 事件脚本/剧情文本 |
| `$E28E-$FFBF` | ~7KB | 预留区 |
| `$FFC0-$FFD5` | 代码 | RESET: MMC1初始化 |
| `$FFD7-$FFD9` | 代码 | `JMP ($8000)` → Bank 0 |
| `$FFFA-$FFFF` | 6B | 中断向量表 |

**中断向量**:
| 向量 | 地址 | 目标 |
|------|------|------|
| NMI | `$FFFA` | `$8002` |
| RESET | `$FFFC` | `$FFC0` |
| IRQ | `$FFFE` | `$8002` |

**启动流程**:
```
CPU上电 → $FFC0 (Bank 7)
  → MMC1初始化 (控制寄存器=$1A)
  → JMP ($8000) → $809B (Bank 0)
  → RAM清零 $0000-$07FF
  → PPU初始化
  → 主循环 $81EE
```

---

## 4. 内存布局 (CPU RAM $0000-$07FF)

| 地址范围 | 用途 |
|----------|------|
| `$0000-$000F` | 零页临时变量/指针 |
| `$0010-$001F` | PPU寄存器镜像 (scrollX/Y, mask, ctrl) |
| `$0020-$007F` | 通用工作变量 |
| `$0080-$00FF` | 堆栈区 (SP初始=$FF) |
| `$0100-$01FF` | 堆栈 (实际使用) |
| `$0200-$02FF` | OAM DMA缓冲区 (256B) |
| `$0300-$03FF` | 系统变量区 |
| `$0400-$05FF` | 游戏逻辑变量区 |
| `$0600-$07FF` | Bank 6 专属变量区 |

**关键系统变量**:
| 地址 | 变量 | 说明 |
|------|------|------|
| `$0016-$0017` | scrollX/Y | PPU滚动 |
| `$0018` | ppuMask | $2001镜像 |
| `$0019` | ppuCtrl | $2000镜像 |
| `$0093` | bankLock | Bank切换锁 |
| `$0300` | frameCounter | 帧计数器 |
| `$0301-$0302` | joy1/joy2 | 当前手柄状态 |
| `$0303-$0304` | joy1/joy2_prev | 前一帧手柄 |
| `$0305` | ppuQueueCount | PPU队列条目数 |
| `$0306-$0338` | ppuQueue | PPU队列数据 |
| `$0339-$03FF` | ppuVramBuffer | 静态VRAM缓冲区 |
| `$03CA` | gameState | 游戏状态 (0-7) |
| `$05E0-$05E1` | scoreA/B | 比分 |
| `$064F` | matchPhase | 比赛阶段 |

---

## 5. PPU更新系统

**双缓冲架构**:
1. **动态队列** (`$0306-$0338`): 每帧处理，格式 `[ptr_L][ptr_H]` 指向数据
2. **静态缓冲区** (`$033A-$03FF`): 格式 `[count][addrH][addrL][data...][0=end]`

**处理流程** (每帧NMI):
```
ProcessPpuQueue ($812F)
  → 处理动态队列条目
  → 处理静态缓冲区
  → 设置Scroll寄存器 ($833A)
```

---

## 6. CHR Bank 分配

共16个4KB CHR Bank (编号 $00-$0F 各 × 2):

| 场景 | CHR Bank 0 | CHR Bank 1 | 说明 |
|------|-----------|-----------|------|
| 开场分镜0 | $04 | $06 | 开场动画 |
| 开场分镜1 | $08 | $06 | — |
| 开场分镜2 | $0A | $06 | — |
| 开场分镜3 | $0C | $06 | — |
| 开场分镜4 | $0C | $19 | 最后分镜 |
| 开场立绘 | $0E | $0F | 立绘 |
| 比赛 | (动态) | (动态) | 根据场景切换 |

---

## 7. 游戏完整流程

```
CPU上电
  → Bank 7: MMC1初始化
  → Bank 0: RAM清零, PPU初始化
  → 主循环 $81EE:
       State 0: 开场动画 (Bank 1, ~6分镜)
         → State 1: 标题画面 (Bank 5)
         → State 2: 菜单选择 (Bank 6)
           → 选择"新游戏"
         → State 3: 比赛初始化 (Bank 4)
         → State 4: 比赛主循环 (Bank 4)
           → [进球/半场] → State 5
         → State 5: 状态转换
           → State 6: 进球/半场事件 (Bank 6)
           → State 7: 结果画面 (Bank 6)
         → [继续比赛] → State 3
       → [全赛程完成] → 结局
```

---

## 8. 比赛赛程

根据攻略，完整赛程为:
1. 南葛 vs 錦丘
2. 南葛 vs 南宇和
3. 南葛 vs 東一中
4. 南葛 vs 花輪
5. 南葛 vs 明和東
6. 南葛 vs 比良戶
7. 南葛 vs 佛拉諾 (松山 光)
8. 南葛 vs 東邦學園 (日向 小次郎)
9. 全日本 vs 東邦高中 (友谊赛)
10. 欧洲预赛循环赛 (10国中4国)
11. 决赛 (法国/西德等)
12. 世界冠军

---

## 9. 数据访问层设计

基于ROM结构，设计以下数据表:

### 9.1 球员表 (Player)
| 字段 | 类型 | 来源 | 说明 |
|------|------|------|------|
| id | number | Bank 3 | 球员ID |
| name | string | Bank 7 | 名称 (日文) |
| position | enum | Bank 3 | FW/MF/DF/GK |
| shoot | number | Bank 3 | 射门能力 |
| pass | number | Bank 3 | 传球能力 |
| dribble | number | Bank 3 | 盘带能力 |
| tackle | number | Bank 3 | 拦截能力 |
| speed | number | Bank 3 | 速度能力 |
| stamina | number | Bank 3 | 体力值 |
| specialMoves | number[] | Bank 3 | 必杀技ID列表 |

### 9.2 球队表 (Team)
| 字段 | 类型 | 来源 | 说明 |
|------|------|------|------|
| id | number | Bank 3 | 球队ID |
| name | string | Bank 7 | 球队名称 |
| playerIds | number[] | Bank 3 | 球员ID列表 |
| formation | number | Bank 3 | 阵型ID |

### 9.3 事件脚本表 (EventScript)
| 字段 | 类型 | 来源 | 说明 |
|------|------|------|------|
| id | number | Bank 7 | 脚本ID |
| data | number[] | Bank 7 | 脚本字节码 |

### 9.4 文本表 (Text)
| 字段 | 类型 | 来源 | 说明 |
|------|------|------|------|
| id | number | Bank 7 | 文本ID |
| tiles | number[] | Bank 7 | tile索引序列 |

---

*报告完成日期: 2026-08-05*
*下一步: 架构设计文档 + 项目代码框架搭建*
