# Langrisser II ROM 分析报告

> 基于 ROM dump 和 Ghidra 反编译结果，为 TypeScript 实现提供完整参考

**生成时间**: 2026-07-15T08:48:23.078Z (初始)
**最后更新**: 2026-07-15 (字节序修复 + 渲染器修复, 详见 §九)
**ROM 文件**: Langrisser II (Japan).md
**ROM 大小**: 2097152 字节 (2.00 MB)

---

## 一、ROM 头部与向量表

### 1.1 初始向量表 (ROM 0x0000-0x00FF)

| 偏移 | 向量 | 值 | 目标地址 | 说明 |
|------|------|-----|---------|------|
| \$0000 | SSP | \$00FFFF00 | \$00FFFF00 | 初始栈指针 |
| \$0004 | Reset | \$0000800A | \$0000800A | 复位入口 |
| \$0008 | BusErr | \$00008000 | \$00008000 | 总线错误 |
| \$000c | AdrErr | \$00008000 | \$00008000 | 地址错误 |
| \$0010 | InvOpCode | \$00008000 | \$00008000 | 无效指令 |
| \$0014 | DivBy0 | \$00008000 | \$00008000 | 除零错误 |
| \$0070 | HBLANK | \$000084B8 | \$000084B8 | 行扫描中断 |
| \$0078 | VBLANK | \$000082B4 | \$000082B4 | 场扫描中断(主心跳) |

### 1.2 ROM 信息头 (ROM 0x0100-0x0200)

| 偏移 | 字段 | 值 |
|------|------|-----|
| \$0100 | SEGA标志 | "SEGA" |
| \$0110 | 厂商/版权 | "(C)T-25 1994.JUN" |
| \$0120 | 游戏名(日) | ".....O...b.T.[.Q                                " |
| \$0150 | 游戏名(美) | "                                                " |
| \$0180 | 产品编号 | "GM T-025143-00" |
| \$01A0 | ROM范围 | \$0 |
| \$01A8 | RAM范围 | \$FF0000 |
| \$01B4 | SRAM范围 | \$200001 |
| \$01F0 | 国别码 | "J" |

---

## 二、核心函数清单

从 Ghidra 反编译结果提取的关键函数:

### 2.1 入口与核心系统函数

| 地址 | 函数名 | 用途 |
|------|--------|------|
| \$0000800A | Reset | 系统复位入口 - TMSS解锁/VDP初始化/Z80初始化/校验和验证 |
| \$000082B4 | VBLANK | 场扫描中断 - 60Hz主心跳，任务调度核心 |
| \$000084B8 | HBLANK | 行扫描中断 |
| \$00008294 | FUN_00008294 | 任务队列清空 |
| \$000085EE | FUN_000085ee | 控制器读取 |
| \$0000866C | FUN_0000866c | 控制器初始化 |
| \$000086B4 | FUN_000086b4 | DMA子系统初始化 |
| \$00008A6C | FUN_00008a6c | 显示队列/VDP命令队列处理 |
| \$00008ABA | FUN_00008aba | DMA拷贝主入口 |
| \$00009020 | FUN_00009020 | 输入状态初始化 |
| \$00009074 | FUN_00009074 | VDP VRAM DMA传输(双缓冲) |
| \$00009172 | FUN_00009172 | 显示列表初始化 |
| \$0000942A | FUN_0000942a | 任务调度器初始化 |
| \$000097DC | FUN_000097dc | 通用DMA传输函数 |
| \$000099B2 | FUN_000099b2 | 资源加载(通用加载+DMA) |
| \$00009A0E | FUN_00009a0e | 资源指针表查找 |
| \$000099FA | FUN_000099fa | 资源类型分发(RLE/LZSS/位平面) |
| \$0000A052 | FUN_0000a052 | 精灵数据加载 |
| \$0000C80C | FUN_0000c80c | 游戏主初始化 |
| \$0000C92C | FUN_0000c92c | 默认任务处理函数 |
| \$0000C936 | FUN_0000c936 | 场景初始化 |
| \$0000FB5A | FUN_0000fb5a | Z80音频命令(静音控制) |
| \$0000FC1A | FUN_0000fc1a | YM2612音频播放 |
| \$0000FFF8 | FUN_0000fff8 | Nibble RLE解压(类型1) |
| \$000100A0 | FUN_000100a0 | LZSS解压(类型3) |
| \$00010A94 | FUN_00010a94 | 角色能力表加载 |
| \$00011F88 | FUN_00011f88 | SRAM读取/存档初始化 |
| \$0001DDC8 | FUN_0001ddc8 | 系统底层初始化 |

### 2.2 函数总数统计

- **Ghidra识别函数**: 485 个
- **带地址函数**: 342 个

### 2.3 函数区域分布

| 地址范围 | 区域 | 函数数 |
|---------|------|--------|
| \$00000-\$01000 | 启动/初始化 | 6 |
| \$01000-\$02000 | VDP/硬件IO | 0 |
| \$08000-\$0a000 | 主循环/任务调度 | 33 |
| \$0a000-\$0c000 | 场景管理 | 15 |
| \$0c000-\$10000 | UI/菜单渲染 | 12 |
| \$10000-\$20000 | 地图/战斗系统 | 55 |
| \$20000-\$30000 | 角色/单位系统 | 73 |
| \$30000-\$40000 | 魔法/道具系统 | 2 |
| \$40000-\$50000 | AI系统 | 0 |
| \$50000-\$60000 | 存档系统 | 0 |

---

## 三、ROM 内存映射与数据区域

### 3.1 完整内存映射

| 地址范围 | 大小 | 类型 | 用途 |
|---------|------|------|------|
| \$000000-\$0000FF | 256B | 向量表 | 中断向量 + 系统向量 |
| \$000100-\$0001FF | 256B | ROM头 | SEGA标志/游戏信息 |
| \$000200-\$007FFF | 31.5KB | 代码 | 启动代码/VDP初始化/校验和 |
| \$008000-\$00FFFF | 56KB | 代码 | 核心系统(VBLANK/DMA/输入) |
| \$010000-\$05DFFF | 312KB | 代码 | 游戏逻辑(场景/战斗/单位) |
| \$05E000-\$06FFFF | 88KB | 数据 | 角色能力表/对话脚本/文本 |
| \$070000-\$08FFFF | 128KB | 数据 | 地图数据/场景配置 |
| \$090000-\$0AFFFF | 128KB | 数据 | 单位配置/音乐指针表 |
| \$0B0000-\$0B7FFF | 32KB | 数据 | **资源指针表** |
| \$0B8000-\$1DBFFF | 16.5MB | 数据 | 压缩图形/精灵/地图资源 |
| \$1DC000-\$1FFFFF | 256KB | 数据 | **Z80音乐数据** |

### 3.2 关键数据区域详解

| ROM地址 | 大小 | 描述 | 对应TS文件 |
|---------|------|------|------------|
| \$05E64A | 240B | 10角色能力表(每角色24B) | game/data/character.ts |
| \$061AC5 | 变长 | 场景名称模板(0xFF结束) | game/data/scenario.ts |
| \$061CB0 | 变长 | 地图指针表 | game/data/map.ts |
| \$097404 | 变长 | 单位组配置数据 | game/data/troops.ts |
| \$0B0000 | 32768B | 资源指针表(2字节偏移+基址) | game/hw/resource.ts |
| \$096C74 | 变长 | 音乐指针表(2字节偏移+0x090000) | game/data/music/ |

---

## 四、资源加载系统

### 4.1 资源类型

| 类型码 | 算法 | 用途 |
|--------|------|------|
| 0x01 | Nibble RLE | 4bpp tile图案数据 |
| 0x02 | 位平面压缩 | 2/4/6-plane tile |
| 0x03 | LZSS | 通用数据(含tile) |

### 4.2 资源加载流程

```
游戏逻辑设置资源ID
  → FUN_000099b2 (通用加载+DMA)
    → FUN_00009a0e (资源指针表查找: ROM 0x0B0000)
    → FUN_000099fa (类型分发: RLE/LZSS/位平面解压)
    → 解压到 RAM 0xFF1000 缓冲区
    → DMA (0xFFF9命令) → VRAM目标地址
```

### 4.3 资源ID格式

- **高8位**: 资源组/类型
- **低8位**: 资源编号
- **0x8000-0xFFFF**: DMA延迟加载标记
- **资源ID 0x8001**: 字体资源(首个资源)

---

## 五、VDP 显示系统

### 5.1 VDP 内存布局

| VRAM地址 | 大小 | 用途 | VDP寄存器配置 |
|---------|------|------|---------------|
| \$0000-\$BFFF | 49KB | Tile图案数据(BG+Sprite共享) | R6=0x00 |
| \$C000-\$CFFF | 4KB | Plane A Nametable | R2=0x30 |
| \$D800-\$DBFF | 1KB | Sprite Attribute Table(80精灵×8B) | R5=0x6C |
| \$E000-\$EFFF | 4KB | Plane B Nametable | R4=0x07 |
| \$F000-\$FFFF | 4KB | Window Nametable | R3=0x3C |

### 5.2 DMA 命令码

| 命令码 | 功能 | 用途 |
|--------|------|------|
| 0xFFF5 | VRAM填充 | 清空VRAM区域 |
| 0xFFF9 | DMA传输(标准) | **主要传输方式** |
| 0xFFFA | DMA→VRAM | CRAM/VRAM传输 |
| 0xFFFB | DMA→VSRAM | VSRAM传输 |
| 0xFFFC | 单word写VRAM | 寄存器设置 |
| 0xFFFF | VDP数据写 | 单值写入 |

---

## 六、TS 实现映射表

### 6.1 已提取的数据文件

| 文件 | 数据来源 | 描述 |
|------|---------|------|
| [TitleScreenData.ts](file:///d:/studio/github/monkeycode/src/langrisser2/game/data/TitleScreenData.ts) | ROM解压 | 标题画面tile/调色板/nametable |
| [OpeningAnimationData.ts](file:///d:/studio/github/monkeycode/src/langrisser2/game/data/OpeningAnimationData.ts) | ROM解压 | 开场动画数据 |
| [FontData8001.ts](file:///d:/studio/github/monkeycode/src/langrisser2/game/data/FontData8001.ts) | 资源0x8001 | 字体tile数据 |
| [TilesetData.ts](file:///d:/studio/github/monkeycode/src/langrisser2/game/data/TilesetData.ts) | ROM解压 | 通用tileset |
| [MusicIndex.ts](file:///d:/studio/github/monkeycode/src/langrisser2/game/data/MusicIndex.ts) | ROM 0x096C74 | 音乐索引表 |
| [character.ts](file:///d:/studio/github/monkeycode/src/langrisser2/game/data/character.ts) | ROM 0x05E64A | 角色定义 |
| [classes.ts](file:///d:/studio/github/monkeycode/src/langrisser2/game/data/classes.ts) | ROM分析 | 职业定义 |
| [map.ts](file:///d:/studio/github/monkeycode/src/langrisser2/game/data/map.ts) | ROM分析 | 地图数据 |
| [scenario.ts](file:///d:/studio/github/monkeycode/src/langrisser2/game/data/scenario.ts) | ROM分析 | 关卡配置 |
| [units.ts](file:///d:/studio/github/monkeycode/src/langrisser2/game/data/units.ts) | ROM分析 | 单位数据 |
| [troops.ts](file:///d:/studio/github/monkeycode/src/langrisser2/game/data/troops.ts) | ROM 0x097404 | 部队配置 |

### 6.2 音乐数据文件 (38首)

位于 `game/data/music/` 目录，从 ROM 0x096C74 音乐指针表提取

### 6.3 关卡数据文件 (31关)

位于 `game/data/` 目录，命名格式: Stage{N}Data.ts

---

## 七、启动流程与调用链

### 7.1 Reset 启动流程

```
0x00800A Reset()
  ├─ TMSS商标解锁 (0x53454741)
  ├─ VDP寄存器初始化 (ROM 0x80B2)
  ├─ Z80初始化 + PSG静音
  ├─ ROM校验和验证 (0xD79F)
  ├─ RAM清零 (64KB)
  ├─ FUN_0001ddc8() - 系统底层初始化
  ├─ FUN_000086b4() - DMA子系统初始化
  ├─ FUN_0000866c() - 控制器初始化
  ├─ FUN_00009172() - 显示列表初始化
  ├─ FUN_00009020() - 输入状态初始化
  ├─ FUN_00008a6c() - 显示队列初始化
  ├─ FUN_0000942a() - 任务调度器初始化
  └─ FUN_0000c80c() - ★游戏主初始化
       ├─ FUN_0000fb5a() - Z80音频静音
       ├─ FUN_00011f88() - SRAM初始化
       ├─ FUN_00010a94() - 角色能力表加载
       └─ 场景索引设置 = 1

主循环: do { 等待任务队列 → 执行任务 → 队列前移 } while(true)
```

### 7.2 VBLANK 60Hz循环

```
0x0082B4 VBLANK()
  ├─ 清除VDP中断标志
  ├─ 帧计数递增
  ├─ 输入扫描(控制器状态更新)
  ├─ 任务队列填充
  ├─ DMA命令处理
  └─ 显示列表刷新
```

---

## 八、下一步工作建议

### 8.1 数据提取待完成

- [ ] 对话脚本完整提取 (ROM 0x05E000-0x06FFFF)
- [ ] 魔法数据提取 (ROM 0x070000附近)
- [ ] 道具数据提取
- [ ] 完整角色精灵图提取
- [ ] 地图tileset完整提取

### 8.2 系统实现待完成

- [ ] 资源加载系统(三种解压算法)
- [ ] VDP显示系统(双缓冲/DMA)
- [ ] 战斗系统(伤害计算/兵种相克)
- [ ] 魔法系统
- [ ] 存档系统

---

## 九、VRAM 字节序深度分析与渲染 Bug 修复 (2026-07-15)

### 9.1 核心发现: 数据链路三层 Bug 导致渲染全错

开场动画画面渲染结果完全不对的根因是以下三个层面各存在一个独立的严重 bug，所有 bug 会叠乘放大:

| 层面 | 文件 | Bug | 影响 |
|------|------|-----|------|
| **提取层** | `scripts/extract-full-opening-data.mjs` | VRAM dump 大端序 → TS VDP 小端序转换错误 | nametable tile 索引全错, tile 数据从错误地址提取 |
| **渲染层 A** | `game/hw/vdp/sprite.ts` | 精灵 X 坐标缺少 −128 偏移 | 所有精灵向右偏移 128px (可能全跑出屏幕) |
| **渲染层 B** | `game/hw/vdp/plane.ts` | tile index 0 被当作透明跳过 | tile 0 是有效 tile 但被丢弃 |

### 9.2 字节序问题详解

#### 9.2.1 Genesis VDP VRAM 存储 (大端序)

Genesis 是 68000 架构 (大端序)。VDP VRAM 通过 16-bit 数据端口写入时:
- 先写高字节 (bits 15-8) 到地址 N
- 再写低字节 (bits 7-0) 到地址 N+1
- 结果: `vram[N] = 高字节, vram[N+1] = 低字节`

Emulator VRAM dump (`.ram` 文件) 保持此大端序。

对于 Plane A/B pattern name (16-bit word):
```
bits 15-11: [priority=1][palette=2][vflip=1][hflip=1]
bits 10-0:  tile_index

大端序存储:
  vram[addr+0] = [p][c1][c0][vf][hf][t10][t9][t8]  ← 高字节
  vram[addr+1] = [t7][t6][t5][t4][t3][t2][t1][t0]  ← 低字节

正确解析: word = (vram[addr+0] << 8) | vram[addr+1]
  tile_index = word & 0x07FF  ← 正确
```

#### 9.2.2 TS VDP 存储 (小端序)

TS VDP (`writeVRAMWord`) 存储为小端序:
```ts
this.vram[addr] = value & 0xFF;           // 低字节在低地址
this.vram[(addr + 1)] = (value >> 8) & 0xFF; // 高字节在高地址
```

渲染器 (`parseNameTableEntry`) 用小端序读取:
```ts
const lo = vram[addr];    // 低字节
const hi = vram[addr+1];  // 高字节
const word = (hi << 8) | lo;
tileIndex = word & 0x07FF;
```

这在小端序输入的条件下是正确的。

#### 9.2.3 旧提取脚本的错误 (已修复)

旧脚本 `extractFrameCompact()` 用 `(vram[addr+1] << 8) | vram[addr]` 解析大端序 dump:
```javascript
const lo = vram[addr];      // ← 实际上是大端序的高字节!
const hi = vram[addr + 1];  // ← 大端序的低字节!
const oldTileIdx = ((hi << 8) | lo) & 0x07FF;
// 等价于: (lower_byte << 8 | higher_byte) & 0x07FF ← 字节交换, 全错!
```

**错误影响链:**
1. `oldTileIdx` 读到了字节交换后的虚假值 → `usedTiles` 集合错误
2. `tileMap` 映射表基于虚假索引构建 → 提取的 tile 数据来自错误 VRAM 位置
3. nametable 重映射将错误的新 tile index 嵌入到 nametable → TS 渲染器读取时 tile 索引指向错误 tile
4. 输出到 TS VDP 的 nametable 字节序也是乱的 (大端序原样输出, TS 用大端序读也得字节交换)

**修复:**
```javascript
// 正确的大端序读取:
const word = (vram[addr] << 8) | vram[addr + 1];
const tileIndex = word & 0x07FF;    // ← 真实的 tile 索引
const flags = word & 0xF800;        // priority + palette + flip flags

// 小端序输出给 TS VDP:
const newWord = flags | newTileIdx;
nametable[i * 2]     = newWord & 0xFF;        // lo byte
nametable[i * 2 + 1] = (newWord >> 8) & 0xFF; // hi byte
```

**修复效果验证:**
- 修复前: 帧 0 提取到 44 tiles (大量虚假 tile), 帧 1 39 tiles, 帧 2 42 tiles
- 修复后: 帧 0 提取到 26 tiles (真实使用), 帧 1 24 tiles, 帧 2 36 tiles
- 这说明旧脚本从错误的 VRAM 地址提取了 65-70% 的虚假 tile 数据

### 9.3 精灵 X 坐标偏移 Bug (已修复)

Genesis VDP 精灵 X 坐标使用 0x80 偏移: `X = 0x80` 表示屏幕左边缘 (即像素 0)。

旧代码:
```ts
const sx0 = Math.max(0, spr.x);  // ← 没有减 128!
```

修复:
```ts
// parseSprites() 中:
const x = (((xHi << 8) | xLo) & 0x3FF) - 128;
```

### 9.4 Tile 索引 0 跳过 Bug (已修复)

Genesis VDP 中 tile index 0 是合法 tile。透明由像素值 0 (color index 0) 决定, 非 tile index。

旧代码:
```ts
if (entry.tileIndex === 0) continue;  // ← 错误!
```

修复: 删除此行。开场动画帧中 plane A 确实使用 tile index 0 作为可见背景 tile。

### 9.5 精灵表字节序

| 字段 | 偏移 | 大端序 dump 格式 | TS 小端序输出 | 说明 |
|------|------|-----------------|-------------|------|
| Y 坐标 | +0,+1 | 打包字段 (byte0=Y[7:0], byte1 bit0=Y[8]) | 逐字节一致 | 不是 16-bit word, 无需字节序转换 |
| Size/Link | +2,+3 | 单字节字段 | 逐字节一致 | 无字节序问题 |
| Tile attr | +4,+5 | 大端序 16-bit word | **小端序 swap** | pattern name word, 必须字节序转换 |
| X 坐标 | +6,+7 | 大端序 16-bit word | **小端序 swap** | X 坐标, 必须字节序转换 |

### 9.6 完整数据流

```
Genesis ROM (大端序 VRAM dump)
  ↓ extractFrameCompact() — 大端序读取, 小端序输出
  ↓ 重映射 tile indices (old → new compact indices)
  ↓ Base64 编码
OpeningAnimationData.ts (小端序字节)
  ↓ atob → Uint8Array
  ↓ writeVRAM 逐字节写入 TS VDP
TS VDP RAM (小端序)
  ↓ parseNameTableEntry — lo = vram[addr], hi = vram[addr+1]
  ↓ word = (hi << 8) | lo — 小端序重建 ✓
  ↓ tileIndex = word & 0x07FF — 正确 ✓
renderFrame() — 正确渲染 ✓
```

### 9.7 验证清单

- [x] `extract-full-opening-data.mjs`: 大端序解析 → 小端序输出 (重写 `extractFrameCompact`)
- [x] `sprite.ts` line 104: X 坐标 −128 偏移
- [x] `plane.ts` line 126: 移除 `tileIndex === 0` 跳过
- [x] `OpeningAnimationData.ts`: 重新生成 (tile 数量修正)
- [x] `main.ts` / `miniMain.ts`: 之前修复的双重调用 bug 保持一致

---

**报告更新完毕**