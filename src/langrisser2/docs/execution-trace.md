# Langrisser II MD 执行流程追踪文档

> 从68K Reset向量开始，逐层追踪游戏启动到运行的完整调用链。
> 数据来源: `ghidra-decompile.c` (39,255行, 794个函数) + ROM dump

## ROM 头部验证

```
ROM偏移 0x000: SSP    = 0x00FFFF00  (初始堆栈指针→RAM顶端)
ROM偏移 0x004: Reset  = 0x0000800A  (→ ROM偏移0x800A, Reset函数)
ROM偏移 0x070: HBLANK = 0x000084B8  (→ FUN_000084b8, 行扫描中断)
ROM偏移 0x078: VBLANK = 0x000082B4  (→ FUN_000082b4, 主循环60Hz)

ROM偏移 0x100: "SEGA" 标志
ROM偏移 0x110: "(C)T-25 1994.JUN" (厂商)
ROM偏移 0x180: "GM T-025143-00" (产品编号)
ROM偏移 0x1F0: "J" (日本国别)
ROM偏移 0x1A0: ROM 0x000000-0x1FFFFF (2MB)
ROM偏移 0x1A8: RAM 0xFF0000-0xFFFFFF (64KB)
ROM偏移 0x1B4: SRAM 0x200001-0x203FFF (16KB 存档)
```

---

## 阶段1: 硬件初始化 — `Reset()` 函数

**位置**: [ghidra-decompile.c:828-1022](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L828-L1022)
**ROM地址**: 0x800A (Reset向量指向)

### 1.1 TMSS商标解锁 (L848-862)

```c
uVar1 = Ram00a10008;        // 读Z80总线寄存器
if (iVar2 == 0) {           // 若为0表示原装机
  wVar6 = IO_EXT_CTRL;      // 读扩展控制
  if (wVar6 == 0) {
    bVar3 = IO_PCBVER._1_1_;
    if ((bVar3 & 0xf) != 0) {
      IO_TMSS = 0x53454741;  // 写入"SEGA"解锁TMSS
    }
  }
}
```

**作用**: Genesis TMSS (TradeMark Security System) 解锁，必须向 `0xA14000` 写入"SEGA"才能访问ROM。

### 1.2 VDP初始化 (L863-918)

```c
// 从ROM 0x80B2 复制24字节VDP寄存器配置
puVar11 = &DAT_000080b2;
do {
  VDP_CTRL = *(byte*)puVar13 | 0x8000;  // 寄存器号|0x8000
  VDP_DATA = 0;                          // 写入配置值
  sVar4--;
} while (sVar4 != -1);
```

**作用**: 配置VDP (Video Display Processor) 的24个寄存器，设置显示模式、分辨率、DMA等。

### 1.3 Z80初始化与PSG重置 (L876-919)

```c
IO_Z80BUS = 0x100;    // 请求Z80总线
IO_Z80RES = 0x100;    // 复位Z80
// 等待Z80释放总线
do { bVar3 = IO_Z80BUS; } while (bVar3 & 1);
// 从ROM复制Z80程序 (0x25字节)
*puVar8 = *puVar13;
// 重置Z80, 写PSG静音
IO_Z80RES = 0; IO_Z80BUS = 0; IO_Z80RES = 0x100;
// PSG静音 (4通道)
VDP_PSG = *pbVar14;  // 0x9F, 0xBF, 0xDF, 0xFF
```

**作用**: 初始化Z80副CPU (负责音频), 写入PSG静音命令。

### 1.4 ROM校验和验证 (L921-960)

```c
// 等待VDP空闲
do { wVar6 = VDP_CTRL; } while (wVar6 & 2);
// 检查是否已通过TMSS
if (DAT_ffffff00 != 0x53454741) {
  // 计算 ROM 0x200-0x7FF0 校验和 (16个块×257 word = 0x1010 word)
  psVar9 = &LAB_00000200;
  do {
    wVar6 = *psVar9 + wVar6;  // 累加每个word
    sVar7--;
  } while (sVar7 != -1);
  if (wVar6 != 0xd79f) {  // 期望校验和
    // 校验失败: 红色屏幕死循环
    VDP_DATA = 0xe;  // 红色背景
    while(1);
  }
  DAT_ffffff00 = 0x53454741;  // 标记已通过
}
```

**作用**: Genesis BIOS要求ROM校验和正确，否则卡红色画面。

### 1.5 RAM清零与系统初始化 (L961-1003)

```c
// 1) 整个64KB RAM清零 (0xFF0000-0xFFFFFF)
sVar7 = 0x3fbf;
puVar11 = &DAT_00ff0000;
do { *puVar11 = 0; } while (sVar7 != -1);

// 2) 调用FUN_0001ddc8 (系统底层初始化)
FUN_0001ddc8();

// 3) 初始化DMA队列指针
DAT_ffff81c4 = &DAT_ffff81cc;
FUN_000086b4();  // DMA子系统初始化
FUN_0000866c();  // 控制器初始化
FUN_00009172();  // 显示列表初始化

// 4) 清零DMA缓冲区 (0x9F+1 = 0xA0 个dword)
puVar11 = &DAT_ffff8dcc;
do { *puVar11 = 0; } while (sVar7 != -1);

// 5) 控制器端口配置
IO_CT1_CTRL._1_1_ = 0x40;  // 控制器1
IO_CT2_CTRL._1_1_ = 0x40;  // 控制器2
IO_EXT_CTRL._1_1_ = 0x40;  // 扩展端口

// 6) 初始化首个DMA命令
*DAT_ffff81c4 = 0xfffc;  // DMA终止标记
DAT_ffff81c4[1] = 0;
DAT_ffff81c4[2] = 0;
DAT_ffff81c4[3] = 0xffff;
DAT_ffff81c4 = DAT_ffff81c4 + 5;
*puVar12 = 1;

// 7) 子系统初始化
FUN_00009020();  // 输入状态初始化
FUN_00008a6c();  // 显示队列初始化
FUN_0000942a();  // 任务调度器初始化

// 8) 设置主状态指针
DAT_ffff8000 = &DAT_ffff8108;  // 任务队列头
DAT_ffff8004 = &UNK_0000c92c;  // 默认任务处理函数
FUN_000085ee();                // 控制器读取
```

### 1.6 游戏主初始化 (L1004-1005)

```c
_DAT_ffff816a = 0;
FUN_00008294();   // 清空任务队列(0x13个dword)
FUN_0000c80c();   // ★ 游戏主初始化(见阶段2)
```

### 1.7 主循环 (L1006-1021)

```c
do {
  // 等待任务队列非空
  do { } while (DAT_ffff810c == (code *)0x0);
  // 执行队头任务
  (*DAT_ffff810c)();
  // 任务队列前移 (10个dword)
  sVar7 = 9;
  puVar11 = &DAT_ffff8134;
  puVar15 = &DAT_ffff810c;
  do {
    *puVar15 = *puVar11;
    sVar7--;
  } while (sVar7 != -1);
  DAT_ffff8134 = 0;
  DAT_ffff8108 = DAT_ffff8108 - 0x28;  // 队列长度-0x28
} while( true );
```

**作用**: 主线程任务调度循环。从队列`DAT_ffff810c`取出函数指针执行，然后队列前移。任务由VBLANK中断填入。

---

## 阶段2: 游戏主初始化 — `FUN_0000c80c()`

**位置**: [ghidra-decompile.c:5858-5933](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L5858-L5933)
**ROM地址**: 0x00C80C

### 2.1 子系统初始化

```c
FUN_0000fb5a();  // [L5872] Z80音频命令 (0xFE=静音)
FUN_00011f88();  // [L5873] SRAM读取/存档初始化
```

### 2.2 游戏状态变量初始化 (L5874-5892)

```c
_DAT_00ff78fa = 0xffff;     // 全局标志
DAT_ffffa49c = 1;           // ★ 场景索引(=1, 用于地图指针表0x061CB0)
DAT_ffffa49e = 0;           // 场景子索引
DAT_ffffa4a0 = 1;           // 状态标志
DAT_ffffa4a2 = 1;           // 状态标志
DAT_ffffa4a4 = 0x600;       // 视口X
DAT_ffffa95c._2_2_ = 0x600; // 视口X备份
DAT_ffffa4a6 = 7;           // 显示参数
DAT_ffffa4a7 = 6;           // 显示参数
DAT_ffffa4a8 = 4;           // 显示参数
DAT_ffffa4a9 = 5;           // 显示参数

// 清零 DAT_ffffa4aa - DAT_ffffa4b7 (7个word)
sVar2 = 7;
puVar3 = &DAT_ffffa4aa;
do { *puVar3 = 0; sVar2--; } while (sVar2 != -1);

DAT_ffffa4ca = 0;           // 状态标志
```

### 2.3 角色能力表加载 (L5893) ★关键

```c
FUN_00010a94();  // ★ 从ROM 0x05E64A 加载10角色能力表 → RAM 0xFFFFA4CC
```

**详细见**: [阶段3: 角色能力表加载](#阶段3-角色能力表加载--fun_00010a94)

### 2.4 其他数据初始化 (L5894-5931)

```c
// 清零 DAT_ffffa5bc - DAT_ffffa5c6 (11字节)
sVar2 = 0xb;
puVar4 = &DAT_ffffa5bc;
do { *puVar4 = 0; sVar2--; } while (sVar2 != -1);

_DAT_ffffa5c8 = 0;

// 从 ROM 0x061AC5 复制字符串到 RAM 0xFFFFA5CC (直到 0xFF)
// (可能是场景名称模板)
pcVar5 = &DAT_00061ac5;
pcVar8 = &DAT_ffffa5cc;
do {
  cVar1 = *pcVar5;
  *pcVar8 = cVar1;
  pcVar5++;
  pcVar8++;
} while (cVar1 != -1);

// 从 ROM 0x097404 复制word数组到 RAM 0xFFFFA5DE (直到 0xFFFF)
// (单位组配置数据)
psVar6 = &DAT_00097404;
psVar9 = &DAT_ffffa5de;
do {
  sVar2 = *psVar6;
  *psVar9 = sVar2;
  psVar6++;
  psVar9++;
} while (sVar2 != -1);

// SRAM相关
_DAT_ffffbd6e = 0x32;

// 存档槽初始化 (20个槽, 每个0xFFFFFFFF=空)
sVar2 = 0x13;
puVar7 = &DAT_ffffc7f2;
do { *puVar7 = 0xffffffff; sVar2--; } while (sVar2 != -1);

// 显示/状态标志清零
_DAT_ffff816e = 0;
DAT_ffff8170 = 0;
DAT_ffff8172 = 0;
DAT_ffffae92 = 0;
DAT_ffffae94 = 0;
_DAT_ffffa6dc = 0;
```

---

## 阶段3: 角色能力表加载 — `FUN_00010a94()`

**位置**: 需查找
**ROM地址**: 0x010A94
**功能**: 从 ROM 0x05E64A 加载10角色能力表 → RAM 0xFFFFA4CC

**数据流** (见 worklog-2026-07-12.md):
```
ROM 0x05E64A (10角色×14B有效数据)
  ↓ FUN_00010a94: 每角色复制14B + 补10B零 = 24B
RAM 0xFFFFA4CC (DAT_ffffa4cc, 10角色×24B运行时表)
  offset +0x10 = DAT_ffffa4dc = 初始 CLASS_ID
```

---

## 阶段4: VBLANK主循环 — `VBLANK()` 函数

**位置**: [ghidra-decompile.c:1048-1139](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L1048-L1139)
**ROM地址**: 0x0082B4 (向量表0x78)
**触发**: 每1/60秒由Genesis VDP自动触发

### 4.1 帧计数与VDP状态更新 (L1058-1075)

```c
wVar1 = VDP_CTRL;  // 清除VDP中断标志
wVar1 = VDP_CTRL;

// 特殊: 若DAT_ffff8178==-0x10, 写入"PADR"后BusErr(异常调试?)
if (DAT_ffff8178 == -0x10) {
  DAT_ffffff04 = 0x50414452;  // "PADR"
  return BusErr();
}

// 帧计数
DAT_ffff815c++;                  // 帧计数器
DAT_ffff8164._0_2_ += 5;         // 随机数种子更新

// VDP寄存器0/1配置
if (_DAT_ffff8160 == 0) {
  VDP_CTRL = 0x8004;             // REG0: HBLANK禁用
} else {
  DAT_ffff815e = 0;
  VDP_CTRL = 0x8014;             // REG1: HBLANK启用
}
DAT_ffff81a9 |= 0x40;
VDP_CTRL = CONCAT31(0x81, DAT_ffff81a9);  // 设置VDP状态
```

### 4.2 任务调度核心 (L1076-1136) ★关键

```c
// 条件: 控制器已初始化 且 未在DMA传输
if ((DAT_ffff8170 != 0) && (DAT_ffffae92 == 0)) {
  FUN_00008f4e();  // 控制器状态采样
}

// 主帧处理 (仅当帧未处理时)
if (_DAT_ffff816a == 0) {
  if (_DAT_ffff816e != 0) {
    FUN_0002dd0c();  // 特殊模式处理
  }

  FUN_0000870a();   // 上一帧状态保存
  FUN_00009074();   // 输入处理

  // 若场景已激活 (DAT_ffff95ae==1)
  uVar4 = DAT_ffff95ae == 1;
  if ((bool)uVar4) {
    FUN_00009400();  // ★ 场景逻辑更新
  }

  FUN_00000270();   // DMA队列提交
  FUN_00008a6c();   // 显示列表更新
  FUN_00008a20();   // 渲染更新

  // 双缓冲切换
  if ((bool)uVar4) {
    _DAT_ffff8174 ^= 1;  // 缓冲切换标志
  }

  if (_DAT_ffff8174 == 0) {
    FUN_00008a20();      // 第二次渲染更新

    if (_DAT_ffff8176 != 0) {
      // HBLANK处理
      DAT_ffff8179 &= 0xbf;
      if ((bVar2 & 0x40) == 0) {
        _DAT_ffff816a = 0;
        return;
      }
    }
  }

  // 字节码执行阶段
  DAT_ffffa6c6 = 0;
  _DAT_ffff816a = 1;

  if (DAT_ffffae94 != 1) {
    FUN_000003ae();   // DMA传输启动
  }

  FUN_00009498();            // ★ 字节码解释器(主)
  (*DAT_ffff8004)();         // 任务函数指针调用
  FUN_00009498();            // ★ 字节码解释器
  FUN_00009498();            // ★ 字节码解释器
  FUN_00009498();            // ★ 字节码解释器
  FUN_00009498();            // ★ 字节码解释器(共5次)

  FUN_00000426();   // DMA传输完成检查
  FUN_00008a20();   // 渲染更新

  // 特殊任务处理
  if (uVar4) {
    _DAT_ffffa6dc = 1;
    DAT_ffffa6da = 0x65;
    DAT_ffffa6db = 0;
    FUN_0000fc1a();  // Z80命令发送(0x65)
  }
  FUN_00008a20();
  if (uVar4) {
    _DAT_ffffa6dc = 2;
    DAT_ffffa6da = 0x5c;
    DAT_ffffa6db = 0;
    FUN_0000fc1a();  // Z80命令发送(0x5c)
  }

  _DAT_ffff816a = 0;  // 标记帧处理完成
}
```

### 4.3 VBLANK调用关系图

```
VBLANK (每帧60Hz)
├── FUN_00008f4e      控制器采样
├── FUN_0002dd0c      特殊模式 (可选)
├── FUN_0000870a      状态保存
├── FUN_00009074      输入处理
├── FUN_00009400      ★场景逻辑更新 (仅游戏内)
├── FUN_00000270      DMA队列提交
├── FUN_00008a6c      显示列表更新
├── FUN_00008a20      渲染更新 (×3)
├── FUN_000003ae      DMA传输启动
├── FUN_00009498      ★字节码解释器 (×5)
├── (*DAT_ffff8004)() 任务函数调用
├── FUN_00000426      DMA完成检查
└── FUN_0000fc1a      Z80音频命令 (×2, 可选)
```

---

## 阶段5: 字节码解释器 — `FUN_00009498()`

**位置**: 需查找
**ROM地址**: 0x009498
**功能**: 场景脚本字节码解释器, 根据跳转表执行脚本指令

**调用频率**: 每帧5次

---

## RAM 关键地址速查

| 地址 | 名称 | 说明 |
|------|------|------|
| `0xFFFF8000` | taskQueueHead | 任务队列头指针 |
| `0xFFFF8004` | taskFuncPtr | 当前任务函数指针 |
| `0xFFFF8108` | taskQueueBase | 任务队列基址 |
| `0xFFFF810C` | taskQueueFront | 队列首项 (函数指针) |
| `0xFFFF8134` | taskQueueNext | 队列第二项 |
| `0xFFFF815C` | frameCounter | 帧计数器 |
| `0xFFFF8160` | hblankFlag | HBLANK启用标志 |
| `0xFFFF8164` | randSeed | 随机数种子 |
| `0xFFFF816A` | frameProcessing | 帧处理中标志 |
| `0xFFFF8170` | controllerInit | 控制器初始化标志 |
| `0xFFFF8174` | bufferSwapFlag | 双缓冲切换标志 |
| `0xFFFF8178` | inputState | 输入状态 |
| `0xFFFF81A9` | vdpRegState | VDP寄存器状态 |
| `0xFFFF81C4` | dmaQueuePtr | DMA队列当前指针 |
| `0xFFFF8DCC` | dmaBuffer | DMA缓冲区基址 |
| `0xFFFF904C` | dmaCmdList | DMA命令列表 |
| `0xFFFF9F26-9F33` | scrollState | 滚动状态 (X/Y/模式) |
| `0xFFFF95AE` | scenarioActive | 场景激活标志 (1=游戏内) |
| `0xFFFFA000` | scenarioScript | 场景脚本指针 |
| `0xFFFFA49C` | scenarioIndex | 场景索引 (1-based) |
| `0xFFFFA4CC` | charAbilityTable | 角色能力表 (10×24B) |
| `0xFFFFA4DC` | charClassId | 初始职业ID (10个) |
| `0xFFFFA5CC` | scenarioNameBuf | 场景名称缓冲 |
| `0xFFFFA5DE` | unitGroupBuf | 单位组配置缓冲 |
| `0xFFFFA6DA` | z80CmdData | Z80命令数据 |
| `0xFFFFA6DC` | z80CmdType | Z80命令类型 |
| `0xFFFFAE92` | dmaBusyFlag | DMA忙标志 |
| `0xFFFFAE94` | specialMode | 特殊模式标志 |
| `0xFFFFBD6E` | sramFlag | SRAM标志 |
| `0xFFFFC7F2` | saveSlots | 存档槽 (20个) |
| `0xFFFFFF00` | tmssUnlock | TMSS解锁标志 ("SEGA") |
| `0xFFFFFF04` | padrFlag | PADR调试标志 |

---

## ROM 关键地址速查

| 偏移 | 大小 | 内容 |
|------|------|------|
| `0x000000` | 0x200 | 68K异常向量表 |
| `0x000100` | 0x100 | Genesis ROM头 |
| `0x000200` | 0x600 | 校验和数据区 |
| `0x000800` | 0x10 | Reset入口前导 |
| `0x00080A` | - | `Reset()` 函数 |
| `0x00080B2` | 0x18 | VDP寄存器初始配置 |
| `0x00082B4` | - | `VBLANK()` 函数 |
| `0x00084B8` | - | `HBLANK()` 函数 |
| `0x000C92C` | - | 默认任务处理函数 |
| `0x000C80C` | - | `FUN_0000c80c()` 游戏主初始化 |
| `0x0010A94` | - | `FUN_00010a94()` 角色能力表加载 |
| `0x009498`  | - | `FUN_00009498()` 字节码解释器 |
| `0x009400`  | - | `FUN_00009400()` 场景逻辑更新 |
| `0x05E5D8`  | 0x40 | 角色RAM槽位指针表 (10角色×4B) |
| `0x05E64A`  | 0xF0 | 角色能力初始表 (10×14B有效) |
| `0x05E958`  | ~1KB | 职业名表 (FF分隔) |
| `0x05EDDC`  | ~4KB | 职业数据表 (28B/条) |
| `0x060000`  | 0x200 | (非转职表, 待确认) |
| `0x060200`  | 0x100 | 兵种克制矩阵 (8×8) |
| `0x060404`  | ~0x130 | 道具名表 (FF分隔) |
| `0x060530`  | 0x130 | 道具数据表 (8B/条) |
| `0x060600`  | 0x60 | 关卡Boss配置 |
| `0x0618E8`  | 0x1D0 | 名称指针表 (80条) |
| `0x061AC5`  | - | 场景名称模板 (FF终止) |
| `0x061CB0`  | 0x7C | 地图指针表 (31关) |
| `0x061D2C`  | 0xF8 | Tile属性(底层)指针 |
| `0x061D30`  | 0xF8 | Tile属性(高层)指针 |
| `0x061E24`  | 0xF8 | Tile重映射(底层)指针 |
| `0x061E28`  | 0xF8 | Tile重映射(高层)指针 |
| `0x061F1C`  | ~0x8F0C | 地图数据区 |
| `0x065000`  | ~0x17000 | 图形数据 (tile/RLE) |
| `0x080CBC`  | ~0x960 | VDP精灵表 |
| `0x08203E`  | ~0x200 | AI魔法数据 |
| `0x0821BE`  | 0x1F4 | 场景配置指针表 (31关×4B) |
| `0x082A59`  | 0x3C | 角色AT/DF修正表 (10角色×6B) |
| `0x097404`  | - | 单位组配置数据 (FFFF终止) |
| `0x0975F4`  | - | 基础单位组 (滑动窗口) |

---

## 待追踪函数清单

### 高优先级 (核心系统)
- [ ] `FUN_00010a94` — 角色能力表加载详细流程
- [ ] `FUN_00009498` — 字节码解释器指令集
- [ ] `FUN_00009400` — 场景逻辑更新
- [ ] `FUN_00009074` — 输入处理
- [ ] `FUN_0000870a` — 状态保存
- [ ] `FUN_00008a20` — 渲染更新
- [ ] `FUN_00008a6c` — 显示列表更新

### 中优先级 (游戏逻辑)
- [ ] `FUN_00011f88` — SRAM/存档初始化
- [ ] `FUN_0001ddc8` — 系统底层初始化
- [ ] `FUN_0000942a` — 任务调度器初始化
- [ ] `FUN_00009020` — 输入状态初始化
- [ ] `FUN_00009172` — 显示列表初始化

### 低优先级 (硬件层)
- [x] `FUN_000086b4` — DMA子系统初始化
- [x] `FUN_0000866c` — 控制器初始化
- [x] `FUN_000085ee` — 控制器读取
- [x] `FUN_00008f4e` — 控制器状态采样
- [x] `FUN_00000270` — DMA队列提交

---

# 第一部分附录: VDP 硬件结构与初始配置

> 用于纯 TS 实现渲染层时参考。数据来源: ROM 0x80B2 (Reset函数复制24字节VDP寄存器配置) + Genesis硬件手册。

## VDP 内存映射

| 区域 | 大小 | 说明 |
|------|------|------|
| VRAM | 64KB | 图案数据 + nametable + sprite表 |
| CRAM | 128B (64色×2B) | 调色板, 4组×16色 |
| VSRAM | 80B (40×2B) | 垂直滚动值 |
| 寄存器 | 24个 (8位) | R0-R23 |

## VDP 寄存器初始值 (ROM 0x80B2, Reset 复制)

```
R0  = 0x04  模式第0组:      bit2=1 视频输出禁用 (复位后)
R1  = 0x14  模式第1组:      bit2=1 DMA可用, bit4=1 显示输出未启用 (复位后)
R2  = 0x30  Plane A nametable 基址: VRAM 0xC000 (0x30 << 10 = 0xC000)
R3  = 0x3C  Window nametable 基址:  VRAM 0xF000 (0x3C << 10 = 0xF000)
R4  = 0x07  Plane B nametable 基址: VRAM 0xE000 (0x07 << 13 = 0xE000)
R5  = 0x6C  Sprite attribute table:  VRAM 0xD800 (0x6C << 9 = 0xD800)
R6  = 0x00  Sprite tile 基址:        VRAM 0x0000 (0x00 << 13 = 0x0000)
R7  = 0x00  背景色: 调色板0 索引0
R10 = 0xFF  H中断计数: 每帧 255 行
R11 = 0x00  模式第2组: HSync=0, VScroll=全屏滚动
R12 = 0x81  模式第3组: bit0=1 H32(32列), bit7=1 隔行模式? (待确认)
R13 = 0x37  DMA控制: bit1=1 DMA填充, bit2=1 DMA复制, bit4-5=01 (VRAM→VRAM)
R15 = 0x01  (保留, 复位值)
R16 = 0x01  (保留, 复位值)
R19 = 0xFF  (保留, 复位值)
R20 = 0xFF  (保留, 复位值)
R23 = 0x80  (保留, 复位值)
```

## VRAM 布局 (基于寄存器初始值推算)

```
0x0000 - 0xBFFF  图案数据区 (Tile patterns, 49KB)
0xC000 - 0xCFFF  Plane A nametable (4KB, 64×32 tiles)
0xD800 - 0xDBFF  Sprite attribute table (1KB, 80个精灵)
0xE000 - 0xEFFF  Plane B nametable (4KB, 64×32 tiles)
0xF000 - 0xFFFF  Window nametable (4KB)
```

## Nametable 条目格式 (每条目 2 字节, big-endian)

```
bit15    = 优先级 (1=高优先级)
bit14-13 = 调色板索引 (0-3)
bit12    = H翻转
bit11    = V翻转
bit10-0  = Tile 索引 (0-2047)
```

## Sprite 属性表格式 (每精灵 8 字节)

```
偏移 0-1: Y位置 (实际位置 = 值 + 1, 0 = 屏幕外)
偏移 2:   尺寸 (高4位=宽, 低4位=高, 单位tile)
偏移 3:   链接/next_sprite (0xFF=最后一个)
偏移 4-5: Tile起始索引
偏移 6-7: X位置 (bit9=水平翻转?, bit0-8=X)
```

## CRAM 调色板格式 (每色 2 字节, big-endian)

```
bit15-13 = 保留 (应为0)
bit12-9  = Blue (0-15)
bit8-5   = Green (0-15)
bit4-1   = Red (0-15)
bit0     = 保留
```

## 像素输出 (RGB565, 参考 Genesis.js renderFrame)

```javascript
// 16位像素 → RGBA
var r = ((pixel >> 11) & 0x1f) << 3;  // 5位红
var g = ((pixel >> 5) & 0x3f) << 2;   // 6位绿
var b = (pixel & 0x1f) << 3;          // 5位蓝
```

## Tile 图案格式 (4bpp, 32 字节/tile)

```
每个 tile = 8×8 像素, 每像素 4 位 (16色)
32 字节 = 8 行 × 4 字节/行 (行优先)

行 y 的 4 字节位于 tile_addr + y*4:
  byte 0 (plane 0): bit7=x0 ... bit0=x7  (pixel bit0)
  byte 1 (plane 1): bit7=x0 ... bit0=x7  (pixel bit1)
  byte 2 (plane 2): bit7=x0 ... bit0=x7  (pixel bit2)
  byte 3 (plane 3): bit7=x0 ... bit0=x7  (pixel bit3)

pixel(x,y) = (plane0_bit << 0) | (plane1_bit << 1) | (plane2_bit << 2) | (plane3_bit << 3)
  其中 planeN_bit = (byte[N] >> (7-x)) & 1

tile 地址 = tile_index * 32 (nametable bit10-0 为索引)
```

## 标题画面数据加载机制 (待完成)

> 分析来源: ghidra-decompile.c FUN_000003ae / FUN_00000426 / FUN_00008a6c
> RAM dump: Langrisser II (Japan)_68K-gens-ram-dump.ram

### 加载流程

标题画面的图形数据**不是一次性 DMA** 从 ROM 到 VRAM, 而是**渐进式加载**:

1. **资源加载队列** (FUN_000003ae, 在 VBlank 中断里调用):
   - 每帧从 ROM 读取一小段数据到 RAM `0xFFFF8DCC`
   - 设置 DMA 命令: `FFF9` + VRAM目标 `0xF000` + 源 `0xFFFF8DCC` + 长度 `0x140` (320 word)
   - 由 DMA 处理器 (FUN_00008a6c) 执行传输

2. **DMA 命令格式** (5 word = 10 字节):
   ```
   word[0]: 命令码 (0xFFF5-0xFFFF)
   word[1]: VDP 目标地址 (低14位) + 类型 (高2位: 00=VRAM, 01=CRAM, 10=VSRAM)
   dword[2]: 32位源地址 (大端)
   word[4]: 长度 (word 数)
   ```

3. **DMA 命令码**:
   | 码 | 说明 |
   |-----|------|
   | 0xFFF5 | VRAM 填充 |
   | 0xFFF6 | VRAM DMA (带源指针) |
   | 0xFFF7 | VRAM 读到 RAM |
   | 0xFFF8 | VRAM DMA (内联源) |
   | 0xFFF9 | VRAM DMA (标准, 源=RAM 0xFFFF8DCC) |
   | 0xFFFA | CRAM DMA |
   | 0xFFFB | VSRAM DMA |
   | 0xFFFC | 单 word 写入 |
   | 0xFFFD | VSRAM 写入 |
   | 0xFFFE | VDP 寄存器写入 |
   | 0xFFFF | VDP 数据写入 |

### 待分析

- [ ] FUN_000003ae 里的 ROM 指针 `&DAT_01380302` 超出 2MB ROM 范围, 需要确认地址映射
- [ ] 资源加载队列的完整流程 (从哪读, 解压算法?)
- [ ] 标题画面 tile/nametable/palette 的 ROM 存储位置

### 深度分析 (2026-07-13)

#### 1. 标题画面任务函数调用链

```
FUN_0000c93a (标题画面主任务):
  ├─ JSR 0x00942a (任务调度)
  ├─ JSR 0x00c7ec (VDP R17 设置: 0x9194, 0x929e)
  ├─ JSR 0x02cfc0 (初始化 sprite 缓冲区 0xFFFFD288)
  ├─ JSR 0x00942a (再次调度)
  ├─ JSR 0x02cfc0 (再次初始化)
  ├─ LEA 0x05DF40 → DAT_ffff95a2 (标题画面参数指针)
  ├─ MOVE.L #0x0002, DAT_ffff95a6
  ├─ MOVE.L #0x000F, DAT_ffff95a8
  ├─ MOVE.L #0x00C9A0, DAT_ffff8004 (切换到下一任务: 部署界面)
  └─ JMP 0x0085ee (帧同步)
```

#### 2. FUN_0000c80c (游戏主初始化) 调用链

```
FUN_0000c80c:
  ├─ FUN_0000fb5a (Z80 音乐初始化)
  ├─ FUN_00011f88 (从 ROM 0x11FA8 复制 32B 配置到 RAM 0xFFFFA95C)
  ├─ 初始化 RAM 变量 (DAT_ffffa49c-a4ca)
  ├─ FUN_00010a94 (角色能力表加载: ROM 0x05E64A → RAM 0xFFFFA4CC)
  ├─ 复制 ROM 0x061AC5 → RAM 0xFFFFA5CC (字符串, FF 终止)
  ├─ 复制 ROM 0x097404 → RAM 0xFFFFA5DE (word 数组, FFFF 终止)
  └─ FUN_000099b2 (通用 DMA 提交: RAM 0xFF1000 → VRAM)
```

#### 3. DMA 缓冲区布局

| RAM 地址 | 用途 | 说明 |
|----------|------|------|
| 0xFFFF81CC | DMA 命令队列 | 每命令 10 字节 (5 word) |
| 0xFFFF8DCC | DMA 数据缓冲区 | 320 word = 640 字节 |
| 0xFFFF904C | Sprite 队列写入指针 | 每项 8 字节 |
| 0xFFFF904E | Sprite ID 计数器 | 递增 |
| 0xFF1000 | 图形数据缓冲区 | DMA 到 VRAM |

#### 4. FUN_000003ae (Sprite 队列构建) 数据结构

```
RAM 0xFFFF8DCC 起, 每项 8 字节 (2 dword):
  dword[0]: 资源描述符 (如 0x01380302, 不是 ROM 地址!)
  dword[1]: 标志 (0x80000000 / 0x80000001)

已知资源描述符:
  0x01380302, 0x01380303 (第1组)
  0x01580004, 0x01580005 (第2组)

注: 这些描述符的编码方式未知
    0x0138/0x0158 可能是资源类型或 bank 号
    0x0302/0x0303/0x0004/0x0005 可能是子索引
```

#### 5. 标题画面图形数据加载 (未完成)

**结论**: 标题画面的 tile/nametable/palette 数据加载链尚未完全理清

已知:
- 数据不是直接从 ROM DMA 到 VRAM
- 经过 RAM 中转 (0xFFFF8DCC 或 0xFF1000)
- 涉及资源描述符解码 (0x01380302 等)
- 可能存在压缩/解压步骤

待完成:
- [x] 找到 ROM 里的压缩图形数据位置 → ROM 0x000B0000 资源指针表
- [x] 逆向资源描述符 (0x01380302) 的编码方式 → 见"资源加载系统完整分析"
- [x] 实现解压算法 → Type 3 = LZSS, Type 1 = Nibble RLE
- [x] 发现 FUN_0000c914: 加载资源 ID 0x8001 到 VRAM 地址 0
- [ ] 模拟加载队列, 还原标题画面 VRAM/CRAM 内容

### 新发现: FUN_0000c914 (ROM 0xC914)

**位置**: ROM 0xC914
**调用者**:
- 0xC9C2 (标题→部署切换任务内)
- 0x1C7E6 (场景切换)

**功能**: 加载资源 ID 0x8001 到 VRAM 地址 0

**机器码**:
```
0xC914: 48E7 8040    MOVEM.L D0/A0, -(A7)   ; 保存寄存器
0xC918: 303C 8001    MOVE.W #$8001, D0      ; D0 = 资源ID 0x8001 (DMA标志=1)
0xC91C: 327C 0000    MOVE.W #$0000, D1      ; D1 = VDP目标地址 0x0000
0xC920: 4EB9 000099B2  JSR FUN_000099b2     ; 调用通用资源加载
0xC926: 4CDF 0201    MOVEM.L (A7)+, D0/A0   ; 恢复寄存器
0xC92A: 4E75         RTS
```

资源 ID 0x8001 → 资源指针表 entry 0 → ROM 0x000B06B4 → Type 3 (LZSS) → 解压大小 1568 字节 = 49 个 tile (7×7 tile 阵列)

**注意**: 这可能只是标题画面/部署界面的第一个资源（可能是小头像或 logo 一部分），完整标题画面应该还有更多资源待逆向。

---

# 资源加载系统完整分析 (2026-07-13 深度逆向)

> 通过机器码逐字节解码，修正了 Ghidra C 反编译的多处错误。
> 数据来源: ROM dump + ghidra-decompile.c + 机器码手工验证

## 1. 资源指针表 (ROM 0x000B0000)

**位置**: ROM 0x000B0000
**格式**: 32位大端指针数组，每条目4字节

```
0x0B0000: 00 0B 06 B4 → 0x000B06B4  (entry 0, type=3 LZSS, 解压大小=1568B)
0x0B0004: 00 0B 0A 84 → 0x000B0A84  (entry 1)
0x0B0008: 00 0B 1B 32 → 0x000B1B32  (entry 2)
0x0B000C: 00 0B 1D BC → 0x000B1DBC  (entry 3)
0x0B0010: 00 0B 35 50 → 0x000B3550  (entry 4)
0x0B0014: 00 0B 49 12 → 0x000B4912  (entry 5)
0x0B0018: 00 0B 5E B0 → 0x000B5EB0  (entry 6)
0x0B001C: 00 0B 72 68 → 0x000B7268  (entry 7)
...
```

每个 entry 指向一个资源数据块，首字节为类型码。

## 2. FUN_00009a0e — 资源指针表查找 (C反编译错误!)

**位置**: [ghidra-decompile.c:2691](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L2691)
**ROM地址**: 0x009A0E

### C 反编译 (错误!)
```c
undefined2 FUN_00009a0e(void) {
  return in_D0w;  // ← Ghidra 认为是 no-op，完全错误!
}
```

### 实际机器码 (ROM 0x9A0E-0x9A1F)
```
0x9A0E: 3F00           MOVE.W D0, -(A7)        ; push D0.W (保存资源ID)
0x9A10: 207C 000B 0000 MOVEA.L #$000B0000, A0  ; A0 = 资源指针表基址
0x9A16: E548           ASR.W D2, D0            ; D0.W = D0.W >> (D2.W mod 64)
0x9A18: 2070 0000      MOVEA.L (0, A0, D0.W), A0 ; A0 = *(long)(A0 + D0.W)
0x9A1C: 301F           MOVE.W (A7)+, D0        ; pop D0.W (恢复资源ID)
0x9A1E: 4E75           RTS
```

### 功能
1. 保存 D0.W (资源ID) 到栈
2. A0 = 0x000B0000 (资源指针表基址)
3. D0.W = ASR.W D2, D0 (用 D2 作为移位计数，对 D0 算术右移)
4. A0 = *(long)(A0 + D0.W) (读取32位指针)
5. 恢复 D0.W

### 资源 ID 编码逻辑

当 FUN_000099b2 调用时:
- D0 = 资源ID | DMA标志 (如 0x8001)
- D2 = D0 (原始值)
- D0.W &= 0x7FFF (清除DMA标志)

ASR.W D2, D0:
- 移位计数 = D2.W & 0x3F (低 6 位，68K 动态移位取 Dx 低 6 位)
- 对于 D2.W = 0x8001: 移位 = 0x01 = 1
- D0.W = 0x0001 >> 1 = 0 → 读取 entry 0

**编码方式**:
资源 ID 的低 6 位是**移位量**，高位部分是指针表索引左移移位量后的值。
解码时: `index = (resourceId & 0x7FFF) >> (resourceId & 0x3F)`

示例:
| 资源 ID | 低 6 位 (移位) | 高位 >> 移位 | entry |
|---------|---------------|-------------|-------|
| 0x8001  | 1             | 0x0001 >> 1 = 0 | 0 |
| 0x8002  | 2             | 0x0002 >> 2 = 0 | 0 |
| 0x8040  | 0             | 0x0040 >> 0 = 0x40 | 0x40 |
| 0x8041  | 1             | 0x0041 >> 1 = 0x20 | 0x20 |

注: 指针表每条目 4 字节，A0 = 0x000B0000 + D0.W (索引×4 由硬件寻址模式处理)

## 3. FUN_000099fa — 类型分发跳转

**位置**: [ghidra-decompile.c:2680](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L2680)
**ROM地址**: 0x0099FA

### 机器码 (ROM 0x99FA-0x9A0C)
```
0x99FA: 2F08     MOVE.L A0, D7           ; D7 = A0 (保存资源指针)
0x99FC: 7000     MOVEQ #0, D0            ; D0 = 0
0x99FE: 1018     MOVE.B (A0)+, D0        ; D0 = 类型码 (A0++)
0x9A00: D040     ADD.W D0, D0            ; D0.W = 类型码 × 2 (表索引)
0x9A02: 303B 00EC MOVE.W (PC+D0.W), D0   ; D0 = 跳转表[类型码] (偏移值)
0x9A06: 4EBB 00E8 JSR (PC+D0.W)          ; 调用 handler (0x99F0 + D0.W)
0x9A0A: 205F     MOVE.L D7, A0           ; A0 = D7 (恢复资源指针!)
0x9A0C: 4E75     RTS
```

### 跳转表 (ROM 0x99F0, 5个已知条目)
```
0x99F0: 0x0030 → handler at 0x9A20 (type 0)
0x99F2: 0x0048 → handler at 0x9A38 (type 1, Nibble RLE)
0x99F4: 0x0220 → handler at 0x9C10 (type 2)
0x99F6: 0x040E → handler at 0x9DFE (type 3, LZSS)
0x99F8: 0x00BA → handler at 0x9AAA (type 4)
```

### 关键发现
- A0 在 JSR 前被递增 (跳过类型字节)
- A0 在 RTS 前从 D7 恢复 (handler 内 A0 指向类型字节之后)
- handler 返回时 D0.W = 解压后数据大小

## 4. FUN_000099b2 — 通用资源加载+DMA提交

**位置**: [ghidra-decompile.c:2656](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L2656)
**ROM地址**: 0x0099B2

### 机器码 (ROM 0x99B2-0x99F0)
```
0x99B2: 48E7 E0C0  MOVEM.L D0-D2/A0-A1, -(SP) ; 保存寄存器
0x99B6: 3400        MOVE.W D0, D2              ; D2 = D0 (保存原始值, 含DMA标志)
0x99B8: 6A08        BPL.S +8                   ; D0>=0? 跳过DMA设置
0x99BA: 2209        MOVE.L A1, D1              ; D1 = A1 (VDP目标地址)
0x99BC: 43F9 00FF1000 LEA $00FF1000, A1        ; A1 = 解压缓冲区
0x99C2: 0240 7FFF  ANDI.W #$7FFF, D0           ; D0.W &= 0x7FFF (清除DMA标志)
0x99C6: 6146        BSR.S FUN_00009a0e         ; A0 = 资源指针
0x99C8: 6130        BSR.S FUN_000099fa         ; 解压到 0xFF1000, D0.W = 大小
0x99CA: 4A42        TST.W D2                   ; D2 < 0? (DMA标志)
0x99CC: 6A1C        BPL.S +0x1C                ; >=0 跳过DMA
0x99CE: 2278 81C4   MOVEA.L (0xFFFF81C4).L, A1 ; A1 = DMA队列指针
0x99D2: 32FC FFF9   MOVE.W #$FFF9, (A1)+       ; DMA命令码
0x99D6: 32C1        MOVE.W D1, (A1)+           ; VDP目标地址
0x99D8: 22FC 00FF1000 MOVE.L #$00FF1000, (A1)+ ; 源地址
0x99DE: E248        ASR.W #1, D0               ; D0.W = 字节数/2 (word数)
0x99E0: 32C0        MOVE.W D0, (A1)+           ; 传输长度
0x99E2: 21C9 81C4   MOVE.L A1, (0xFFFF81C4).L  ; 更新队列指针
0x99E8: 6100F084   BSR.W FUN_00008a6c          ; 执行DMA
0x99EC: 4CDF 0307   MOVEM.L (SP)+, D0-D2/A0-A1 ; 恢复
0x99F0: 4E75        RTS
```

### 调用约定
- **输入**: D0 = 资源ID | 0x8000 (DMA标志), A1 = VDP目标地址
- **输出**: 数据解压到 0xFF1000, 若DMA标志置位则提交DMA传输
- D1 保存了原 A1 值作为 VDP 地址

## 5. Type 3: LZSS 解压器 (FUN_00009dfe)

**位置**: [ghidra-decompile.c:3319](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L3319)
**ROM地址**: 0x009DFE

### 算法: LZSS 滑动窗口

**窗口参数**:
- 窗口大小: 4KB (0x1000)
- 窗口初始化: 全 0x20 (空格)
- 窗口位置: RAM 0xFF0000-0xFF0FFF
- 偏移编码: 12-bit (0x000-0xFFF)
- 长度编码: 4-bit + 2 = 2-17 字节

### 资源数据格式
```
byte[0]:    类型码 (0x03)
byte[1-2]:  解压后大小 (16-bit big-endian)
byte[3+]:   压缩数据 (LZSS bit-packed)
```

### 解压算法 (C 伪代码)
```c
// 1. 读取头
sVar2 = *(short*)A0;       // 解压大小 (bytes 1-2)
psVar13 = A0 + 2;          // 压缩数据起始 (byte 3+)

// 2. 初始化滑动窗口 (4KB, 填充0x20)
memset(0xFF0000, 0x20, 0x1000);

// 3. 初始化变量
uVar11 = 0x0FEE;           // 窗口写入位置
uVar7 = 0;                 // 前一字节 (用于word打包)
bVar3 = false;             // byte/word toggle
sVar10 = sVar2;            // 剩余输出字节数

// 4. 主循环
while (sVar10 > 0) {
  flagByte = *psVar13++;   // 读取flag字节
  for (bit = 0; bit < 8; bit++) {
    if (flagByte & (1 << bit)) {
      // bit=1: 字面量
      byte = *psVar13++;
      window[uVar11] = byte;
      outputByte(byte);
      uVar11 = (uVar11 + 1) & 0xFFF;
      sVar10--;
    } else {
      // bit=0: LZ77匹配
      b1 = *psVar13++;
      b2 = *psVar13++;
      offset = b1 | ((b2 & 0xF0) << 4);   // 12-bit offset
      length = (b2 & 0x0F) + 2;            // 4-17 bytes
      for (i = 0; i < length; i++) {
        byte = window[offset];
        window[uVar11] = byte;
        outputByte(byte);
        offset = (offset + 1) & 0xFFF;
        uVar11 = (uVar11 + 1) & 0xFFF;
        sVar10--;
        if (sVar10 == 0) break;
      }
    }
    if (sVar10 == 0) break;
  }
}
```

### 输出打包
输出字节按2字节一组打包成16-bit word写入目标缓冲区(0xFF1000):
- 第1字节 → 高8位
- 第2字节 → 低8位

### 验证: entry 0 (0x000B06B4)
```
03 06 20 F9 00 EE FF 00 0F 00 01 11 ...
│  │  │  └── 压缩数据起始
│  │  └── flag byte = 0xF9 = 11111001 (LSB first)
│  └── 解压大小 = 0x0620 = 1568 字节
└── 类型码 = 3 (LZSS)
```

flag 0xF9 = 11111001 (bit0先读):
- bit0=1: 字面量 → 输出 0x00
- bit1=0: 匹配 → offset=0xFEE, length=17 (从初始化的0x20窗口复制)
- bit2=0: 匹配 → offset=0x000, length=17
- bit3=1: 字面量 → 输出 0x0F
- bit4-7=1: 4个字面量

## 6. Type 1: Nibble RLE 解压器 (FUN_00009a38)

**位置**: [ghidra-decompile.c:2701](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L2701-L2779)
**ROM地址**: 0x009A38
**类型码**: 0x01

### 6.1 算法概述

基于 4-bit nibble 的 RLE (行程长度编码) 压缩，适用于 tile 图案数据等 4bpp 图形数据。

核心设计:
- 输入: nibble 流 (每字节两个 nibble，先高后低交替读取)
- 输出: nibble 流，每 4 个 nibble 打包成一个 16-bit word (big-endian)
- RLE 标记: 当前 nibble == 上一个 nibble 时触发
- RLE 计数: 紧跟的下一个 nibble (0-15)，表示额外重复次数
- 总重复数: count + 2 (1个已输出 + 1个标记 + count个额外 = count+2)
- 初始哨兵: bVar7 = 0x7F (大于 nibble 最大值 0x0F，确保第一个 nibble 不触发 RLE)

### 6.2 资源数据格式

```
byte[0]:    类型码 (0x01)
byte[1-2]:  解压后总字节数 (16-bit big-endian)
byte[3+]:   压缩 nibble 数据
```

### 6.3 解压流程详解

**寄存器映射**:
| 68K 寄存器 | 用途 |
|-----------|------|
| in_A0     | 资源数据起始指针 (ushort*) |
| in_A1     | 输出缓冲区指针 (short*) |
| D5        | 当前 word 打包寄存器 (unaff_D5w) |
| bVar3     | nibble 切换标志 (false=待读高 nibble) |
| bVar7     | 上一个 nibble 值 (RLE 比较基准，初始 0x7F) |
| sVar6     | nibble 计数 (3→-1，每 4 个输出一个 word) |
| uVar10    | 已输出字节数 |
| uVar5     | 目标总字节数 (= *in_A0) |

**Nibble 读取规则**:
- 每次读取前: `bVar2 = bVar3 ^ 1`
- bVar2 = true: 读当前字节**高** nibble，指针不变
- bVar2 = false: 读当前字节**低** nibble，指针前进 1 字节
- 读取后: `bVar3 = bVar2` (翻转标志)

**RLE 计数读取规则** (与普通 nibble 不同):
- 用 `bVar3` 判断方向 (不是 bVar2，RLE 不翻转 bVar3)
- bVar3 = true: 读 puVar11 指向字节的**高** nibble，指针不变
- bVar3 = false: 读 puVar11 指向字节的**低** nibble，指针前进 1 字节
- RLE 分支**不更新** bVar3 和 bVar7

**Word 打包规则**:
- D5 = (D5 << 4) | nibble (左移 4 位，低 4 位填入新 nibble)
- sVar6 从 3 递减到 -1，共 4 个 nibble 组成一个 word
- sVar6 == -1 时: 输出 D5 到缓冲区，sVar6 重置为 3，outputBytes += 2

### 6.4 算法示例

输入 nibble 序列: `[F, F, 2, 0, 1, 2, 3]` (压缩表示)
字节序列: `0xFF 0x20 0x12 0x30`

解压过程:
1. nibble=F (普通), 输出 F, bVar7=F, sVar6=2
2. nibble=F (==bVar7), 触发 RLE
3. count=2 (高 nibble, 因 bVar3=true)
4. RLE 循环 3 次 (count+1): 输出 F, F, F
   → 第 4 个 F 时 sVar6=-1，输出 word 0 = 0xFFFF
5. nibble=0 (低 nibble, 因 bVar3=true → bVar2=false), 普通, sVar6=2
6. nibble=1 (高 nibble), 普通, sVar6=1
7. nibble=2 (低 nibble), 普通, sVar6=0
8. nibble=3 (高 nibble), 普通, sVar6=-1
   → 输出 word 1 = 0x0123

输出: `0xFF 0xFF 0x01 0x23` (4 字节)

### 6.5 关键特性

1. **RLE 标记的巧妙设计**: 用"当前 nibble == 上一个 nibble"作为标记，不需要保留特殊值。
   要输出 0x7F 不需要转义 (因为 nibble 只有 4 位，0x7F 不可能出现)。
   初始 bVar7=0x7F 只是哨兵，确保第一个 nibble 不触发 RLE。

2. **RLE 效率**: 连续 3 个相同 nibble 时压缩比 1:1 (3 个 → 3 个存储)，
   连续 4 个以上才有收益。4 个相同 nibble 压缩为 3 个 (标记+计数)。

3. **16 位无符号计数**: uVar8 是 unsigned short，递减到 0 后再减变为 0xFFFF 退出循环。
   因此 count = 0 时输出 1 个额外重复 (总共 2 个相同)，
   count = 15 时输出 16 个额外重复 (总共 17 个相同)。

4. **D5 初始值无关**: 因为 4 个 nibble (16 位) 后初始值完全被移出，不影响输出。

### 6.6 TS 实现

对应函数: `decompressNibbleRLE()` in [resource.ts](file:///d:/studio/github/monkeycode/src/langrisser2/game/hw/resource.ts)

## 7. Type 2: 位平面压缩解压器 (FUN_00009c10 + FUN_00009cfc)

**位置**: [ghidra-decompile.c:3015](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L3015)
**ROM地址**: 0x009C10 (主入口), 0x009CFC (压缩分支)

### 机器码验证 (FUN_00009c10 入口)

```
0x9C10: 48 E7 7F FE          MOVEM.L D0-D7/A0-A6, -(A7)
0x9C14: 2C 49                MOVEA.L A1, A6
0x9C16: 47 F9 00 FF 00 00    LEA $00FF0000, A3
0x9C1C: 70 00                MOVEQ #0, D0
0x9C1E: 10 18                MOVE.B (A0)+, D0        ; D0 = byte[1], A0 → byte[2]
0x9C20: 40 E7                ...
0x9C22: 02 40 00 7F          AND.W #$007F, D0        ; D0 = planes = byte[1] & 0x7F (无 +1)
0x9C26: 38 00                MOVE.W D0, D4           ; D4 = planes
0x9C28: 53 44                SUBQ.W #1, D4           ; D4 = planes - 1
0x9C2A: 44 DF                ...
0x9C2C: 6A 08                BPL.S $9C36             ; bit7=0 → 未压缩分支
0x9C2E: 61 00 00 CC          BSR.W $9CFC             ; 调用 FUN_00009cfc (压缩分支)
```

**关键发现**: `10 18` = `MOVE.B (A0)+, D0` — A0 在 FUN_00009c10 中递增, 读取 byte[1] 后 A0 指向 byte[2]。
所以 FUN_00009cfc 的 in_A0 指向 **byte[2]** (不是 byte[1])。

### 资源数据格式 (压缩分支, byte[1] bit7 = 1)

```
byte[0]:      类型码 (0x02)
byte[1]:      bit7 = 压缩标志 (1=压缩, 调用 FUN_00009cfc)
              bit6-0 = planes 参数 (直接值, 无 -1 或 +1)
byte[2..9]:   查找表 (8 字节, 拆分成 16 个 nibble, 存到 RAM 0xFF0FF0-0xFF0FFF)
byte[10..11]: size (16-bit big-endian, 控制码区大小)
byte[12..12+size-1]:       控制码区 (RLE 控制位, 每字节 8 bit)
byte[12+size..]:           像素数据区 (bit=1 时从这里复制 planes 字节)
```

### 资源数据格式 (未压缩分支, byte[1] bit7 = 0)

```
byte[0]:    类型码 (0x02)
byte[1]:    bit7 = 0, bit6-0 = planes 参数
byte[2-3]:  size (16-bit big-endian)
byte[4..4+size-1]: 数据区 (RLE 控制码 + 像素数据)
```

### 压缩分支 (FUN_00009cfc) 算法

1. **读取查找表** (byte[2..9] → 16 nibbles):
   - 机器码 0x9CFC: `LEA $00FF0FF0, A5; MOVE.W #7, D5; 循环 8 次`
   - 每次: 读取 *A0, 拆分高/低 nibble, A0++
   - 循环结束后 A0 指向 byte[10]

2. **读取 size** (byte[10..11]):
   - Ghidra: `sVar9 = *(short*)((int)psVar14 + 1)` where psVar14 = byte[9] (最后一次迭代)
   - 即 sVar9 = *(short*)byte[10..11]

3. **planeCount 变换**:
   - Ghidra: `if (in_D0w != 2) in_D0w = in_D0w ^ 5`
   - planes=1 → planeCount=4 (1^5=4)
   - planes=2 → planeCount=2 (不变换)
   - planes=3 → planeCount=6 (3^5=6)

4. **RLE 解压** (每 tile):
   - 外层 planeCount 次, 每次读 1 控制字节 (共 planeCount 字节)
   - 每控制字节 8 bit, MSB first
   - bit=1: 从像素数据区复制 planes 字节
   - bit=0: 填零 planes 字节
   - 工作缓冲区总大小: planeCount × 8 × planes 字节/tile

5. **位平面重组** (每 tile → 32 字节):
   - 工作缓冲区作为 16 个 short (32 字节)
   - 位平面 0: short[0..3]  (byte offset 0-7)
   - 位平面 1: short[4..7]  (byte offset 8-15)
   - 位平面 2: short[8..11] (byte offset 16-23)
   - 位平面 3: short[12..15] (byte offset 24-31)
   - 外层 4 次 (psVar14 += 1, 2 字节), 内层 4 次 (输出 1 short)
   - 每次内层: 4 像素 (4 × 4-bit 索引), 打包成 1 short
   - **索引位顺序**: `bit3=plane3, bit1=plane1, bit2=plane2, bit0=plane0`
     (plane1 和 plane2 顺序交换, 查找表用于重映射)

6. **返回值**: `sVar9 * 8 = size * planes * 8`

### 验证结果 (Entry 112 @ 0xE4EAC)

```
byte[1] = 0x81 → planes=1, compressed=true
byte[10-11] = 0x006C = 108
planeCount = 4 (1^5=4)
预期输出 = 108 × 1 × 8 = 864 字节 = 27 tiles
实际输出 = 864 字节 ✓
非零率 = 77.1%
```

### planes 参数

- planes=1: 4 个位平面 (planeCount = 1^5 = 4), 即标准 4bpp
- planes=2: 2 个位平面 (planeCount = 2, 不变换)
- planes=3: 6 个位平面 (planeCount = 3^5 = 6)

### 已知 Type 2 资源 (已验证解压)

| Entry | ROM地址 | planes | size | 输出大小 | tiles | 非零率 |
|-------|---------|--------|------|----------|-------|--------|
| 29 | 0xCC856 | 2 | 236 | 3776B | 118 | 100% |
| 38 | 0xD02C6 | 2 | 226 | 3616B | 113 | 100% |
| 46 | 0xD34D8 | 1 | 976 | 7808B | 244 | 44.9% |
| 54 | 0xD641C | 1 | 292 | 2336B | 73 | 69.3% |
| 63 | 0xD89F4 | 2 | 54 | 864B | 27 | 57.8% |
| 112 | 0xE4EAC | 1 | 108 | 864B | 27 | 77.1% |

## 8. 资源描述符编码 (DMA缓冲区)

FUN_000003ae 中写入 DMA 缓冲区的描述符:
```
0x01380302, 0x01380303 (第1组)
0x01580004, 0x01580005 (第2组)
```

### 编码格式
```
byte[0]: 类型码 (0x01 = Nibble RLE)
byte[1-3]: 资源标识 (24-bit)
```

这些描述符**不是**通过 FUN_000099b2 加载的，而是由另一个调度器处理
(可能是 DMA 命令队列中的内联数据)。

## 9. 完整资源加载路径

### 路径A: 直接调用 (task 0xCA68 等)
```
task 0xCA68:
  D0 = 0x8001 (资源ID=1, DMA标志=1)
  A1 = VDP目标地址
  → JSR FUN_000099b2
    → FUN_00009a0e: A0 = 指针表[0] = 0x000B06B4
    → FUN_000099fa: 类型=3 → LZSS解压 → 0xFF1000
    → DMA: 0xFF1000 → VDP
```

### 路径B: DMA队列 (FUN_000003ae)
```
FUN_000003ae (VBlank中调用):
  写入描述符对到 0xFFFF8DCC:
    (0x01380302, 0x80000001)
    (0x01380303, 0x80000000)
    (0x01580004, 0x80000001)
    (0x01580005, 0x80000000)
  → 由 DMA 处理器 (FUN_00008a6c) 解释执行
```


---

# 第二部分: 核心函数逐行分析

## 函数1: FUN_00009498 — 任务调度器 (非字节码解释器)

**位置**: [ghidra-decompile.c:2231-2251](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L2231-L2251)
**ROM地址**: 0x009498

### 重大修正
之前worklog将此函数标记为"字节码解释器"，实际是**任务列表调度器**。

### 代码逐行分析

```c
void FUN_00009498(void)
{
  short in_D0w;        // D0: 任务列表偏移(字节)
  short in_D1w;        // D1: 传递给任务的参数
  short unaff_D2w;     // D2: 任务执行次数

  // 计算任务列表入口地址
  psVar1 = (short *)((int)&DAT_ffff95b8 + (int)in_D0w);
  DAT_ffff95b4 = in_D1w;       // 保存参数到全局(任务函数可读)
  DAT_ffff95b6 = unaff_D2w;   // 保存次数到全局

  do {
    DAT_ffff95b0 = psVar1;              // 当前任务指针(全局,任务函数可读)
    if (*psVar1 != 0) {                 // 任务函数指针非0?
      (*(code *)(int)*psVar1)();        // ★ 调用任务函数
    }
    // 计算下一个任务: 基址 + 步长(DAT_ffff95b4可被任务函数修改)
    psVar1 = (short *)((int)DAT_ffff95b4 + (int)DAT_ffff95b0);
    DAT_ffff95b6--;                     // 次数-1
  } while (DAT_ffff95b6 != 0);
}
```

### 任务列表结构

```
DAT_ffff95b8: 任务列表基址 (256项 × 42字节)
  每项结构:
    offset 0x00: 函数指针 (word, 低16位)
    offset 0x02-0x29: 任务参数 (40字节)
```

### 5个任务列表 (由FUN_0000942a初始化)

| 基址 | 项数 | 步长 | 用途 |
|------|------|------|------|
| `0xFFFF95B8` | 256 | 0x15(42B) | 主任务列表 |
| `0xFFFF95E2` | 64 | 0x0B(22B) | 子任务列表A |
| `0xFFFF9B62` | 16 | 0x0B(22B) | 子任务列表B |
| `0xFFFF9CC2` | 256 | 0x17(46B) | 大任务列表 |
| `0xFFFF9CF0` | 16 | 0x11(34B) | 子任务列表C |

### VBLANK中的调用方式

```c
// VBLANK每帧调用5次FUN_00009498, 通过D0/D1/D2寄存器传参
// Ghidra未还原寄存器赋值, 实际参数由调用约定决定
FUN_00009498();  // 调度主任务列表(可能D0=0, D2=256)
(*DAT_ffff8004)(); // 直接调用任务函数
FUN_00009498();  // 调度另一个列表
FUN_00009498();
FUN_00009498();
FUN_00009498();
```

---

## 函数2: FUN_00009400 — 场景帧结束/DMA提交 (非场景逻辑更新)

**位置**: [ghidra-decompile.c:2171-2181](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L2171-L2181)
**ROM地址**: 0x009400

### 重大修正
之前标记为"场景逻辑更新"，实际是**场景帧结束提交**函数。

### 代码分析

```c
void FUN_00009400(void)
{
  // 写DMA命令: 0xFFFA = 某种DMA提交/刷新
  *DAT_ffff81c4 = 0xfffa;
  DAT_ffff81c4[1] = 0;                    // 参数=0
  *(undefined2 **)(DAT_ffff81c4 + 2) = &DAT_ffff9422;  // 源地址=显示列表
  DAT_ffff81c4[4] = 0x40;                 // 传输长度=64项
  DAT_ffff81c4 = DAT_ffff81c4 + 5;        // DMA队列指针前移

  DAT_ffff95ae = 0;  // ★ 清除场景激活标志
}
```

### 帧同步机制

```
FUN_00009172/9192/91b6 (设置DAT_ffff95ae=1)
  ↓ 下一帧VBLANK
VBLANK检测 DAT_ffff95ae==1
  ↓
FUN_00009400 (提交DMA + 设置DAT_ffff95ae=0)
  ↓
本帧结束, 等待下一次激活
```

---

## 函数3: FUN_00010a94 — 角色能力表加载

**位置**: [ghidra-decompile.c:7414-7449](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L7414-L7449)
**ROM地址**: 0x010A94

### 代码逐行分析

```c
undefined4 FUN_00010a94(void)
{
  puVar3 = &DAT_0005e64a;  // ROM源: 0x05E64A
  puVar5 = &DAT_ffffa4cc;  // RAM目标: 0xFFFFA4CC
  sVar1 = 9;                // 外循环: 10角色 (0-9)

  do {
    // 1) 复制14字节有效数据 (0xD+1=14)
    sVar2 = 0xd;
    puVar4 = puVar3;
    do {
      puVar3 = puVar4 + 1;
      puVar6 = puVar5 + 1;
      *puVar5 = *puVar4;    // 复制1字节
      sVar2--;
      puVar4 = puVar3;
      puVar5 = puVar6;
    } while (sVar2 != -1);  // 14次

    // 2) 补零10字节 (9+1=10)
    sVar2 = 9;
    do {
      puVar5 = puVar6 + 1;
      *puVar6 = 0;           // 写零
      sVar2--;
      puVar6 = puVar5;
    } while (sVar2 != -1);  // 10次

    sVar1--;
  } while (sVar1 != -1);    // 10角色

  return in_D0;
}
```

### 数据流验证

```
ROM 0x05E64A (源)
  角色0: 14B数据
  角色1: 14B数据
  ...
  角色9: 14B数据
  总计: 10×14 = 140字节

      ↓ FUN_00010a94

RAM 0xFFFFA4CC (目标)
  角色0: 14B数据 + 10B零 = 24B (0x18)
  角色1: 14B数据 + 10B零 = 24B
  ...
  角色9: 14B数据 + 10B零 = 24B
  总计: 10×24 = 240字节 (0xF0)

  offset +0x0D = CLASS_ID (角色初始职业, 14B有效数据最后一字节)
  offset +0x0E-0x17 = 补零10字节
```

### 字段映射修正 (2026-07-13)
之前文档记录"offset +0x10 = CLASS_ID"是错误的。
经RAM dump字节级验证:
- 14B有效数据: offset 0x00-0x0D
- CLASS_ID位于offset 0x0D (14B最后一字节)
- 补零区域: offset 0x0E-0x17 (10字节)

### RAM dump验证
两份RAM dump(标题画面+游戏界面)中0xFFFFA4CC区域**0差异**，证明此加载是静态确定性的。

---

## 函数4: FUN_00010aec — 角色RAM槽位初始化

**位置**: [ghidra-decompile.c:7479-7530](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L7479-L7530)
**ROM地址**: 0x010AEC

### 代码分析

```c
// 1) 清零 0xFF4000-0xFF43FF (1KB, 0x3FF+1 dword)
puVar2 = &DAT_00ff4000;
do { *puVar2 = 0; } while (sVar1 != -1);

// 2) 填充 0xFF5000-0xFF53FF 为 0xFFFFFFFF (1KB)
puVar2 = &DAT_00ff5000;
do { *puVar2 = 0xffffffff; } while (sVar1 != -1);

// 3) 初始化20个角色槽×8个佣兵子槽
puVar4 = &DAT_00ff603c;  // 角色槽基址
sVar1 = 0;                // 槽号 0-0x13(20)
do {
  sVar2 = 0;              // 子槽号 0-7
  do {
    // 清零8字节
    *puVar5 = 0; *(puVar5+1) = 0;
    // 设置标记
    *(byte*)puVar5 = 0xFF;        // 空槽标记
    *(byte*)(puVar5+3) = 10;      // HP=10?
    *(char*)(puVar5+1) = sVar1;   // 槽号
    *(char*)(puVar5+5) = sVar2;   // 子槽号
    sVar2++;
  } while (sVar2 != 8);  // 8个子槽
  sVar1++;
} while (sVar1 != 0x14);  // 20个槽

// 4) 从ROM 0x18005E[scenario-1] 读取场景初始数据
DAT_ffffa610 = **(undefined2**)(&DAT_0018005e + (DAT_ffffa49c-1)*4);
DAT_ffffa611 = (*(undefined2**)(&DAT_0018005e + (DAT_ffffa49c-1)*4))[1];

// 5) 调用FUN_00010d04 后续处理
FUN_00010d04();
```

### 角色槽结构

```
0xFF603C: 20个角色槽 × 96B(0x60) = 1920B
  每槽含8个佣兵子槽 × 12B = 96B
    子槽结构:
      byte[0]: 0xFF=空 / 其他=占用
      byte[1]: 槽号 (0-19)
      byte[3]: HP (初始10)
      byte[5]: 子槽号 (0-7)
```

### 新发现ROM地址
| 偏移 | 内容 |
|------|------|
| `0x18005E` | 场景初始数据指针表 (31关×4B) |

---

## 函数5: FUN_00009074 — VDP滚动更新

**位置**: [ghidra-decompile.c:1857-1891](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L1857-L1891)
**ROM地址**: 0x009074

### 代码分析

```c
undefined4 FUN_00009074(void)
{
  if (DAT_ffff9058 == 1) {
    // 模式1: 逐行滚动 (使用滚动表)
    Ram00c00004 = 0x74000003;  // VDP: HScroll表地址
    sVar1 = 0xb7;               // 184次 (0xB7+1)
    piVar2 = &DAT_ffff905c;     // 逐行滚动表
    do {
      // 写入: 表数据 - (滚动X, 滚动Y)
      Ram00c00000 = *piVar2 + CONCAT22(-DAT_ffff9050, -DAT_ffff9054);
      sVar1--;
    } while (sVar1 != -1);
    if (DAT_ffff905a == 0) DAT_ffff9058 = 0;  // 切换模式
  }
  else {
    // 模式0: 整屏滚动 (统一偏移)
    Ram00c00004 = 0x74000003;
    sVar1 = 0xb7;
    do {
      Ram00c00000 = CONCAT22(-DAT_ffff9050, -DAT_ffff9054);
      sVar1--;
    } while (sVar1 != -1);
    if (DAT_ffff905a == 1) DAT_ffff9058 = 1;  // 切换模式
  }
  // VSRAM垂直滚动
  Ram00c00004 = 0x40000010;
  Ram00c00000 = CONCAT22(DAT_ffff9052, DAT_ffff9056);
}
```

### 滚动状态变量

| 地址 | 说明 |
|------|------|
| `0xFFFF9050` | 滚动X (视口X) |
| `0xFFFF9052` | VSRAM X |
| `0xFFFF9054` | 滚动Y (视口Y) |
| `0xFFFF9056` | VSRAM Y |
| `0xFFFF9058` | 滚动模式 (0=整屏, 1=逐行) |
| `0xFFFF905A` | 模式切换请求 |
| `0xFFFF905C` | 逐行滚动表 (184项) |

---

## 函数6: FUN_00009fc2 — 场景初始化

**位置**: [ghidra-decompile.c:3491-3499](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L3491-L3499)
**ROM地址**: 0x009FC2

### 调用链

```c
void FUN_00009fc2(void)
{
  FUN_000099b2();  // 初始化1 (×2)
  FUN_000099b2();
  FUN_00009ffe();  // 场景脚本加载
  FUN_0000a0ac();  // 渲染参数设置
}
```

---

## 函数7: FUN_00009ffe — 场景脚本加载

**位置**: [ghidra-decompile.c:3503-3523](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L3503-L3523)
**ROM地址**: 0x009FFE

### 代码分析

```c
undefined4 FUN_00009ffe(void)
{
  // 根据场景索引选择脚本指针
  if (DAT_ffffa49c == 0xb) {         // 场景11
    in_A0 = &PTR_DAT_00080674;       // ROM 0x080674
    DAT_ffffa000 = 1;                 // 脚本类型=1
  }
  else if ((DAT_ffffa49c == 0xc) || (DAT_ffffa49c == 0x17)) {
    // 场景12或23
    in_A0 = &PTR_DAT_00080328;       // ROM 0x080328
    DAT_ffffa000 = 0;                 // 脚本类型=0
  }
  else {
    // 其他场景: 无特殊脚本
    DAT_ffffa000 = 0xff;              // 脚本类型=无
  }
  DAT_ffff9ffc = in_A0;              // 保存脚本指针
  FUN_0000a052();                     // 精灵DMA加载
}
```

### 特殊场景脚本

| 场景 | ROM地址 | 类型 |
|------|---------|------|
| 11 | 0x080674 | 1 |
| 12, 23 | 0x080328 | 0 |
| 其他 | 无 | 0xFF |

---

## 函数8: FUN_0000a052 — 精灵DMA数据加载

**位置**: [ghidra-decompile.c:3527-3553](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L3527-L3553)
**ROM地址**: 0x00A052

### 代码分析

```c
undefined4 FUN_0000a052(void)
{
  if (DAT_ffffa000 != 0xff) {
    uVar2 = (ushort)DAT_ffffa000;  // 脚本类型
    psVar3 = *(short **)(DAT_ffff9ffc + in_D1w*4 + 4);  // 读取精灵指针
    while (true) {
      sVar1 = *psVar3;
      if (sVar1 == -1) break;  // 0xFFFF=结束

      // 构造DMA命令
      *DAT_ffff81c4 = 0xfff9;           // DMA标记
      DAT_ffff81c4[1] = (uVar2*0x100 + sVar1) * 0x20 + 0x2000;  // VRAM地址
      *(short **)(DAT_ffff81c4 + 2) = psVar3 + 1;  // 源数据指针
      DAT_ffff81c4 = DAT_ffff81c4 + 5;
      *puVar4 = 0x10;                    // 传输长度=16
      psVar3 = psVar3 + 0x11;           // 下一条目 (步长0x11=17 word=34字节)
    }
  }
}
```

### 精灵条目结构 (34字节/条)

```
word[0]: 精灵ID (0xFFFF=结束)
word[1-16]: 精灵数据 (32字节, DMA源)
```

---

## 函数9: FUN_0000a122 — 场景单位配置拷贝

**位置**: [ghidra-decompile.c:3593-3613](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L3593-L3613)
**ROM地址**: 0x00A122

### 代码分析

```c
undefined4 FUN_0000a122(void)
{
  sVar1 = 0x1f;  // 32个dword (128字节)
  puVar2 = &DAT_ffff9f62;  // RAM目标: 0xFFFF9F62

  // 从ROM 0x0821BE[scenario-1] 读取指针
  puVar3 = *(undefined4 **)(&DAT_000821be + (DAT_ffffa49c - 1) * 4);

  // 复制32个dword (128字节)
  do {
    *puVar2 = *puVar3;
    sVar1--;
  } while (sVar1 != -1);

  FUN_000091b6();  // 显示列表更新 (×2)
  FUN_000091b6();
}
```

### 场景配置指针表

```
ROM 0x0821BE: 31个4字节指针
  [0] → 关卡1配置 (128字节)
  [1] → 关卡2配置
  ...
  [30] → 关卡31配置

每配置128字节 = 32 dword, 含4段×8 dword:
  段0 (dword 0-7):   玩家阵营配置
  段1 (dword 8-15):  AI特殊配置
  段2 (dword 16-23): NPC配置
  段3 (dword 24-31): 敌方配置
```

---

## 函数10: FUN_0000a16a — 角色槽位初始化

**位置**: [ghidra-decompile.c:3617-3640](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L3617-L3640)
**ROM地址**: 0x00A16A

### 代码分析

```c
undefined4 FUN_0000a16a(void)
{
  FUN_0000955c();  // 清除任务(×2, 清空指定ID的任务)
  FUN_0000955c();
  FUN_000094dc();  // 检查任务列表是否完成

  // 创建任务项
  *extraout_A0 = 0x588;              // 任务函数指针 = FUN_00000588
  extraout_A0[1] = 0;                // 参数=0
  *(extraout_A0 + 2) = &DAT_ffff9f62;  // 场景配置指针
  *(extraout_A0 + 4) = &DAT_ffff9f62;
  extraout_A0[6] = DAT_ffff9fe4;     // 当前角色索引

  // 从ROM 0x05E5D8 读角色RAM地址
  iVar1 = *(int *)(&PTR_DAT_0005e5d8 + DAT_ffff9fe4 * 4);

  // 根据byte[0x20]调整指针 (决定渲染/逻辑分支)
  if (*(char *)(iVar1 + 0x20) != 1) {
    *(extraout_A0 + 2) += 0x20;  // 跳过段0
    if (*(char *)(iVar1 + 0x20) != 3) {
      *(extraout_A0 + 2) += 0x20;  // 跳过段1
    }
  }
  *(extraout_A0 + 2) += 0x20;  // 再跳一段

  DAT_ffff9fea = 1;  // 标记初始化完成
}
```

### 角色RAM槽位指针表

```
ROM 0x05E5D8: 10个4字节指针 → RAM角色槽
  [0] → 0xFF603C (角色0)
  [1] → 0xFF609C (角色1, +0x60)
  ...
  [9] → 0xFF65DC (角色9)

byte[0x20] = 阵营类型:
  1 = 玩家 → 使用段0 (配置dword 0-7)
  3 = NPC  → 使用段2 (配置dword 16-23)
  其他 = 敌方 → 使用段3 (配置dword 24-31)
```

---

## 函数11: FUN_0000fc4a — 任务系统初始化

**位置**: [ghidra-decompile.c:6605-6630](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L6605-L6630)
**ROM地址**: 0x00FC4A

### 代码分析

```c
undefined4 FUN_0000fc4a(void)
{
  // 清零主任务列表 (256项×42B)
  puVar2 = &DAT_ffff95b8;
  sVar1 = 0;  // 0→-1 = 256次
  do {
    *puVar2 = 0;
    puVar2 += 0x15;  // 步长42字节
  } while (sVar1 != -1);

  FUN_000094d2();  // 返回0 (空操作?)

  // 设置初始任务
  DAT_ffffa6f2 = extraout_A0;  // 任务对象指针
  *extraout_A0 = 0xec2;         // 任务函数 = FUN_00000EC2
  extraout_A0[0xf] = 0x1c;      // 参数
  extraout_A0[0x11] = 0x1c;
  extraout_A0[0x13] = 1;
  extraout_A0[0x14] = 1;
  *(undefined **)(extraout_A0 + 1) = &DAT_0000fe0c;  // 数据指针

  FUN_0000fce6();  // 任务注册
}
```

---

## 函数12: FUN_00009172 — 场景激活

**位置**: [ghidra-decompile.c:1915-1930](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L1915-L1930)
**ROM地址**: 0x009172

### 代码分析

```c
void FUN_00009172(void)
{
  // 清零显示列表 (32个dword = 128字节)
  sVar1 = 0x1f;
  puVar2 = &DAT_ffff9422;
  do {
    *puVar2 = 0;
  } while (sVar1 != -1);

  DAT_ffff95ae = 1;  // ★ 激活场景处理
}
```

### 场景激活/停止配对

| 函数 | 操作 | DAT_ffff95ae |
|------|------|--------------|
| `FUN_00009172` | 清空显示列表+激活 | →1 |
| `FUN_00009192` | 复制32B到列表+激活 | →1 |
| `FUN_000091b6` | 复制32B+激活 | →1 |
| `FUN_00009400` | 提交DMA+停止 | →0 |

---

## 函数13: FUN_0000942a — 任务列表初始化

**位置**: [ghidra-decompile.c:2185-2227](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L2185-L2227)
**ROM地址**: 0x00942A

### 代码分析

清零5个任务列表:
```c
// 列表1: 0xFFFF95B8, 256项×42B
// 列表2: 0xFFFF95E2, 64项×22B
// 列表3: 0xFFFF9B62, 16项×22B
// 列表4: 0xFFFF9CC2, 256项×46B
// 列表5: 0xFFFF9CF0, 16项×34B
```

---

## 场景加载完整调用链 (修正版)

```
某处触发场景切换 (设置DAT_ffffa49c = 场景索引)
  ↓
FUN_00009ec4 (地图加载)
  ├── 从 0x061CB0 读地图指针
  ├── 从 0x061D2C/0x061D30 读Tile属性
  └── 从 0x061E24/0x061E28 读Tile重映射

FUN_00009fc2 (场景初始化)
  ├── FUN_000099b2 ×2 (显示初始化)
  ├── FUN_00009ffe (场景脚本加载)
  │     ├── 场景11: PTR_DAT_00080674
  │     ├── 场景12/23: PTR_DAT_00080328
  │     └── FUN_0000a052 (精灵DMA加载, 34B/条目)
  └── FUN_0000a0ac (渲染参数设置)

FUN_0000a122 (场景单位配置)
  ├── 从 0x0821BE[scenario-1] 读指针
  ├── 复制128B到 0xFFFF9F62
  └── FUN_000091b6 ×2 (显示列表更新)

FUN_0000a16a (角色槽位初始化)
  ├── FUN_0000955c ×2 (清除旧任务)
  ├── 从 0x05E5D8 读角色RAM地址
  ├── 根据byte[0x20]选择阵营配置段
  └── 创建任务 (函数=0x588)

FUN_00010aec (角色槽清零)
  ├── 清零 0xFF4000-0xFF43FF
  ├── 填充 0xFF5000-0xFF53FF = 0xFFFFFFFF
  ├── 初始化20槽×8子槽 (0xFF603C)
  ├── 从 0x18005E[scenario-1] 读场景数据
  └── FUN_00010d04 (后续处理)

VBLANK主循环 (每帧)
  ├── FUN_00009074 (VDP滚动更新)
  ├── if(DAT_ffff95ae==1) FUN_00009400 (场景帧提交)
  ├── FUN_00009498 ×5 (任务调度器)
  └── (*DAT_ffff8004)() (任务函数调用)
```

---

## 验证来源记录

### 数据源
| 文件 | 路径 | 用途 |
|------|------|------|
| ROM dump | `20260713/Langrisser II (Japan).md` | 2MB Genesis ROM, 用于验证ROM地址数据 |
| RAM dump (标题画面) | `20260713/Langrisser II (Japan)_68K-gens-ram-dump.ram` | Gens模拟器dump, 64KB, 验证ROM→RAM复制 |
| RAM dump (游戏界面) | `monkeycode-tmp-files/.monkeycode-tmp-files/17e953fa-Langrisser II (Japan)_68K-1.ram` | 旧dump, 验证运行时状态 |
| Ghidra C代码 | `ghidra-decompile.c` | 39,255行, 794函数, 反编译参考 |
| Ghidra C代码(原始) | `monkeycode-tmp-files/.monkeycode-tmp-files/1b73ae22-Langrisser II (Japan).md-1.c` | MD5与上面一致 |

### 验证工具
| 工具 | 路径 | 说明 |
|------|------|------|
| 执行流程测试 | [test/execution-trace.test.js](file:///d:/studio/github/monkeycode/src/langrisser2/test/execution-trace.test.js) | 111个字节级测试用例, 覆盖10个测试组 |

### 验证方法
1. **ROM头部验证**: 读取68K向量表(大端), 对比Ghidra函数地址
2. **ROM→RAM复制验证**: 逐字节对比ROM源数据和RAM目标数据
3. **指针表验证**: 读取指针值, 检查是否在合法地址范围
4. **字段偏移验证**: 读取特定ROM/RAM位置, 对比预期值
5. **结构完整性验证**: 检查补零区域/数据非零等

### 验证覆盖的函数
| 函数 | 测试数 | 验证内容 |
|------|--------|----------|
| Reset/VBLANK | 4 | 向量表入口地址 |
| FUN_00010a94 | 21 | 10角色×14B复制 + 10B补零 + CLASS_ID |
| FUN_0000a16a | 10 | 角色指针表(0xFF603C+i×0x60) |
| FUN_0000a122 | 32 | 31场景配置指针 + 数据非零 |
| FUN_00010aec | 31 | 31场景初始数据指针 |
| FUN_00009ffe | 2 | 场景11/12/23脚本指针 |
| FUN_0000a052 | 2 | 精灵DMA条目结构 |
| 职业数据表 | 6 | MV/AT/DF字段偏移 |
| AT/DF修正表 | 1 | 60B数据非零 |
| RAM区域 | 2 | 角色能力表/角色槽数据 |

### 测试运行
```bash
cd src/langrisser2
node test/execution-trace.test.js
# 结果: 111 passed, 0 failed
```

---

## 修正记录

### 2026-07-13 修正

1. **FUN_00009498**: 之前标记为"字节码解释器"，实际是**任务列表调度器**
2. **FUN_00009400**: 之前标记为"场景逻辑更新"，实际是**场景帧结束/DMA提交**
3. **FUN_0000942a**: 任务列表初始化(5个列表)，非"任务调度器初始化"
4. **FUN_00009172**: 场景激活函数(设置DAT_ffff95ae=1)，非"显示列表初始化"

### 新发现ROM地址

| 偏移 | 内容 |
|------|------|
| `0x080328` | 场景12/23脚本指针 |
| `0x080674` | 场景11脚本指针 |
| `0x0FE0C` | 初始任务数据 |
| `0x18005E` | 场景初始数据指针表 (31关×4B) |

### 新发现RAM地址

| 地址 | 说明 |
|------|------|
| `0xFFFF9050/9054` | 滚动X/Y (视口位置) |
| `0xFFFF9052/9056` | VSRAM垂直滚动 |
| `0xFFFF9058` | 滚动模式 (0=整屏,1=逐行) |
| `0xFFFF905C` | 逐行滚动表 (184项) |
| `0xFFFF9422` | 显示列表 (128B) |
| `0xFFFF9F62` | 场景单位配置 (128B) |
| `0xFFFF9FE4` | 当前角色索引 |
| `0xFFFF9FEA` | 角色初始化完成标志 |
| `0xFFFF9FFC` | 场景脚本指针 |
| `0xFFFFA6F2` | 当前任务对象指针 |
| `0xFF4000` | 辅助数据区1 (1KB) |
| `0xFF5000` | 辅助数据区2 (1KB) |
| `0xFF603C` | 角色槽 (20×96B=1920B) |

---

## 函数14: FUN_00009ec4 — 地图加载

**位置**: [ghidra-decompile.c:3420-3487](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L3420-L3487)
**ROM地址**: 0x009EC4

### 代码逐行分析

```c
undefined4 FUN_00009ec4(void)
{
  // 1) 读取地图指针 (ROM 0x061CB0[scenario-1])
  psVar10 = *(short **)(&PTR_DAT_00061cb0 + (DAT_ffffa49c - 1) * 4);

  // 2) 读取地图尺寸
  DAT_ffff9f2c = *psVar10;       // 地图宽
  DAT_ffff9f2e = psVar10[1];     // 地图高

  // 3) 复制地图数据到 RAM 0xFF3000 (若_DAT_00ff78fa非0)
  if (_DAT_00ff78fa != 0) {
    puVar6 = &DAT_00ff3000;
    unaff_D2w = DAT_ffff9f2c * DAT_ffff9f2e - 1;  // 总tile数-1
    psVar10 = psVar10 + 2;  // 跳过尺寸字段(4字节)
    do {
      // 复制1字节, 同时写入puVar6和puVar6+1(双份?)
      *puVar6 = *psVar10;
      *(puVar6+1) = *psVar10;  // 注: 这是byte复制
      psVar10++;
    } while (sVar5 != -1);
  }

  // 4) 读取Tile属性表和重映射表
  sVar5 = (DAT_ffffa49c - 1) * 8;  // 场景索引×8
  iVar1 = *(int *)(&PTR_DAT_00061e24 + sVar5);  // Tile重映射(底层)
  iVar2 = *(PTR_DAT_00061e28 + sVar5);          // Tile重映射(高层)
  DAT_ffff9f4c = *(&PTR_DAT_00061d2c + sVar5);  // Tile属性(底层)
  DAT_ffff9f50 = *(&PTR_DAT_00061d30 + sVar5);  // Tile属性(高层)

  // 5) 读取场景特殊配置 (ROM 0x082142)
  _DAT_ffff9ff6 = *(&DAT_00082142 + (DAT_ffffa49c - 1) * 4);
  DAT_ffff9f54 = iVar1;  // 保存重映射指针
  DAT_ffff9f58 = iVar2;

  // 6) Tile重映射处理 (若_DAT_00ff78fa非0)
  if (_DAT_00ff78fa != 0) {
    puVar8 = &DAT_00ff3000;
    do {
      uVar3 = *puVar8;
      if (CARRY2(uVar3, uVar3)) {
        // 高位=1: 使用高层重映射表
        *puVar8 = *(iVar2 + (uVar3 * 2 & 0xff));
      } else {
        // 高位=0: 使用底层重映射表
        *puVar8 = *(iVar1 + (uVar3 * 2 & 0xff));
      }
      puVar8++;
    } while (unaff_D2w != -1);
  }

  // 7) 重置滚动和清零辅助区
  DAT_ffff9f24 = 0;  // 滚动X
  DAT_ffff9f26 = 0;  // 滚动Y
  FUN_0000c7ae();     // 其他初始化

  // 8) 清零 0xFF4000-0xFF43FF (1KB)
  sVar5 = 0x3ff;
  puVar9 = &DAT_00ff4000;
  do { *puVar9 = 0; } while (sVar5 != -1);
}
```

### 地图数据结构

```
ROM 0x061CB0: 31个4字节指针 (地图指针表)
  [0] → 关卡1地图数据
  [1] → 关卡2地图数据
  ...

每地图数据:
  word[0]: 地图宽 (tiles)
  word[1]: 地图高 (tiles)
  byte[2..]: tile索引数据 (宽×高字节)

Tile重映射:
  0x061E24[scenario×8]: 底层重映射指针
  0x061E28[scenario×8]: 高层重映射指针
  0x061D2C[scenario×8]: 底层属性指针
  0x061D30[scenario×8]: 高层属性指针

重映射逻辑:
  tile索引高位=0 → 查底层表
  tile索引高位=1 → 查高层表
```

### 新发现ROM地址

| 偏移 | 内容 |
|------|------|
| `0x082142` | 场景特殊配置表 (31关×4B) |

### 新发现RAM地址

| 地址 | 说明 |
|------|------|
| `0xFF3000` | 地图tile数据缓冲 (宽×高字节) |
| `0xFFFF9F2C` | 地图宽 |
| `0xFFFF9F2E` | 地图高 |
| `0xFFFF9F4C` | 底层Tile属性指针 |
| `0xFFFF9F50` | 高层Tile属性指针 |
| `0xFFFF9F54` | 底层重映射指针 |
| `0xFFFF9F58` | 高层重映射指针 |
| `0xFFFF9FF6` | 场景特殊配置 |

---

## 函数15: FUN_00008a6c — DMA命令处理器 (渲染核心)

**位置**: [ghidra-decompile.c:1535-1777](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L1535-L1777)
**ROM地址**: 0x008A6C

### 功能概述
处理DMA命令队列(`DAT_ffff81cc`到`DAT_ffff8dcc`)，执行各种VDP操作。

### 命令队列处理流程

```c
// 1) 请求Z80总线 (避免DMA冲突)
IO_Z80BUS = 0x100;
do { wVar2 = IO_Z80BUS; } while (wVar2 & 0x100);

// 2) 遍历DMA队列
puVar6 = &DAT_ffff81cc;  // 队列起始
while (puVar6 < puVar3) {  // puVar3 = 队列结束
  uVar1 = *puVar6;  // 读取命令码
  switch(uVar1) {
    case 0xFFF5: ... // VRAM填充
    case 0xFFF6: ... // DMA传输(带长度)
    case 0xFFF7: ... // VRAM读取
    case 0xFFF8: ... // DMA传输(简化)
    case 0xFFF9: ... // DMA传输(标准)
    case 0xFFFA: ... // DMA传输(VRAM)
    case 0xFFFB: ... // DMA传输(VSRAM)
    case 0xFFFC: ... // 单word写入
    case 0xFFFD: ... // VSRAM写入
    case 0xFFFE: ... // VDP寄存器写入
    case 0xFFFF: ... // VDP数据写入
    default:    ... // 普通VRAM写入
  }
}

// 3) 重置队列指针
DAT_ffff81c4 = &DAT_ffff81cc;
IO_Z80BUS = 0;  // 释放Z80总线
```

### DMA命令格式 (每条10字节 = 5 word)

| 命令码 | 功能 | 格式 |
|--------|------|------|
| `0xFFF5` | VRAM填充 | cmd, len, src, dest |
| `0xFFF6` | DMA传输(长) | cmd, dest, srcPtr, len |
| `0xFFF7` | VRAM读取 | cmd, dest, srcPtr, len |
| `0xFFF8` | DMA传输(简) | cmd, dest, src |
| `0xFFF9` | DMA传输(标准) | cmd, dest, srcPtr, len |
| `0xFFFA` | DMA→VRAM | cmd, dest, srcPtr, len |
| `0xFFFB` | DMA→VSRAM | cmd, dest, srcPtr, len |
| `0xFFFC` | 单word写VRAM | cmd, data, dest |
| `0xFFFD` | VSRAM写入 | cmd, data, dest |
| `0xFFFE` | VDP寄存器写 | cmd, value |
| `0xFFFF` | VDP数据写 | cmd, value |
| 其他 | 普通VRAM写 | addr, data |

### VDP寄存器操作

DMA命令中常见的VDP寄存器设置:
```
REG 0x8F: DMA长度低字节
REG 0x93: DMA源地址低字节
REG 0x94: DMA源地址中字节
REG 0x95: DMA源地址高字节
REG 0x96: DMA源地址最高字节
REG 0x97: DMA控制 (0x80=VRAM, 0xC0=VSRAM)
```

### 与VBLANK的关系

```
VBLANK每帧:
  FUN_00000270()  → 提交DMA队列
  FUN_00008a6c()  → 执行DMA命令(实际VDP传输)
  FUN_00008a20()  → 状态比较(辅助)
```

---

## 函数16: FUN_00008a20 — 字节序列比较

**位置**: [ghidra-decompile.c:1510-1531](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L1510-L1531)
**ROM地址**: 0x008A20

### 修正
之前标记为"渲染更新"，实际是**字节序列比较函数**。

### 代码分析

```c
undefined4 FUN_00008a20(void)
{
  sVar1 = *in_A0 - 1;        // 比较长度-1 (A0指向长度)
  psVar2 = in_A0 + 1;        // 数据源1
  pcVar3 = &DAT_ffff8188 + (0x20 - *in_A0);  // 数据源2

  do {
    if (*pcVar3 != *(char *)psVar2) {
      return in_D0;  // 不匹配, 返回
    }
    sVar1--;
    psVar2++;
    pcVar3++;
  } while (sVar1 != -1);

  return in_D0;  // 全部匹配
}
```

### 用途推测
比较A0指向的数据与RAM 0xFFFF8188+某偏移的数据，可能用于:
- 控制器输入序列检测
- 字符串/名称匹配
- 调试命令识别

---

## 游戏开始流程: 标题画面 → 角色部署界面

### 完整流程图

```
Reset() [ROM 0x800A]
  └→ FUN_0000c80c() [ROM 0xC80C]  游戏主初始化
      ├→ FUN_00010a94()  角色能力表加载 (ROM→RAM)
      ├→ 设置 DAT_ffffa49c = 1 (默认场景1)
      └→ 设置默认任务 = 0xC92C

任务 0xC92C  标题画面初始化
  ├→ FUN_0000fb5a()  Z80静音
  └→ 设置下一任务 = 0xC93A

任务 0xC93A  标题画面设置
  ├→ FUN_0000942a()  任务列表初始化
  ├→ FUN_0000c7ec()  显示初始化
  ├→ FUN_0002cfc0()  (未知)
  ├→ 检查 DAT_ffffa49c == 1 (是否新游戏)
  ├→ 设置显示参数 (0x05DF40→DAT_ffff95a2)
  └→ 设置下一任务 = 0xC9A0

任务 0xC9A0  ★标题→部署界面切换 (关键!)
  ├→ 检查 $00FF78FA (跳过标题标志)
  ├→ FUN_00009ec4()  地图加载 ★
  ├→ FUN_0000c914()  场景加载辅助
  ├→ FUN_00010abe()  玩家角色初始化 ★
  ├→ FUN_00010fde()  角色初始化
  ├→ FUN_0001105c()  角色初始化
  ├→ FUN_000110a8()  角色初始化
  ├→ 设置 DAT_ffffa61c = 5 (游戏状态=部署阶段) ★
  └→ 设置下一任务 = 0xCA00

任务 0xCA00  部署界面主循环
  ├→ FUN_00011c44()  检查部署完成?
  ├→ FUN_00011812()  部署界面更新
  ├→ FUN_0000a78c()  (未知)
  ├→ FUN_00009ec4()  地图重新加载
  ├→ FUN_00011e3a()  (未知)
  ├→ FUN_00014d5e()  (未知)
  └→ 设置下一任务 = 0xD49E (战斗阶段?)
```

### 任务链切换机制

游戏使用**任务链**驱动: 每个任务函数执行完毕后, 通过 `MOVE.L #nextAddr, DAT_ffff8004` 设置下一个要执行的任务。

```
DAT_ffff8004 = 当前任务函数指针
每帧由 FUN_00009498 (任务调度器) 调用 *DAT_ffff8004
任务函数内部设置 DAT_ffff8004 = 下一任务地址
```

### 标题画面→部署界面的关键切换 (0xC9A0)

**ROM 0xC9A0** 的反汇编:
```asm
; 0xC9A0: 标题画面主任务
JSR FUN_0000c7ec           ; 显示初始化
CLR.L DAT_ffffa6dc         ; 清零
CLR.L DAT_fffff350         ; 清零
TST.L $00FF78FA            ; 检查跳过标题标志
BNE.W skip_title           ; 非零则跳过标题画面
JSR FUN_00009ec4           ; ★地图加载
JSR FUN_0000c914           ; 场景加载辅助
JSR FUN_00010abe           ; ★玩家角色初始化
JSR FUN_00010fde           ; 角色初始化
JSR FUN_0001105c           ; 角色初始化
JSR FUN_000110a8           ; 角色初始化
BSR.W $CC1E                ; 部署界面初始化
MOVE.W #5, DAT_ffffa61c    ; ★设置游戏状态=5(部署阶段)
MOVE.L #0xCA00, DAT_ffff8004 ; 下一任务=部署界面主循环
JMP FUN_000085ee           ; 控制器读取
```

### 场景切换核心 (ROM 0x1CFF2)

关卡间的场景切换代码:
```asm
; 0x1CFF0: JSR FUN_00009ec4 的结尾 (9E C4)
; 0x1CFF2: 场景切换核心开始
MOVE.W DAT_ffffae90, D0    ; 读取下一场景号 ★
ADDI.W #0x20, D0           ; 加阵营选择字节(高16位)
MOVE.W D0, ($A49C).W       ; ★设置新场景索引 ($FFFFA49C)
JSR FUN_00010aec           ; ★角色槽初始化(用新场景)
MOVE.W (A7)+, DAT_ffffa49c ; 恢复场景索引(从栈)
JSR FUN_00009172           ; ★场景激活
JSR FUN_00009020           ; 滚动更新
JSR FUN_0000c7ae           ; 初始化
```

### 场景切换函数 FUN_0001d1c0

**ROM 0x1D1C0** 的反汇编:
```asm
; 0x1D1C0: 场景切换函数
MOVE.W DAT_ffffae90, D0    ; 读取下一场景号
ADD.W D0, D0               ; D0 = 场景号 × 2 (查表用)
MOVE.L #0x1D1EA, DAT_ffff8004 ; 下一任务=菜单处理
MOVEM.L D0/A0, -(A7)       ; 保存寄存器
MOVE.L #0x2A626, D0        ; 参数
JSR FUN_000085ee           ; 控制器读取
MOVEM.L (A7)+, D0/A0       ; 恢复寄存器
JMP FUN_0002a626           ; 跳转到菜单处理

; 后续: 检查场景号15的特殊处理
MOVE.W #0x450, D0
JSR FUN_0000955c
MOVE.B #0, DAT_ffff9fea
MOVE.W #3, DAT_ffff95a6
CMPI.L #0x0F, DAT_ffffae90 ; 场景号==15?
BNE.S skip_special
MOVE.B #0xFD, DAT_ffffa6da ; 特殊处理
CLR.B DAT_ffffa6db
JSR FUN_0000fc1a
skip_special:
MOVE.W #5, DAT_ffff95a6
MOVE.L #0x5DF40, DAT_ffff95a2
MOVE.W #0x0F, DAT_ffff95a8
MOVE.L #0x1D244, DAT_ffff8004 ; 下一任务
JMP FUN_000085ee
```

### 关键变量

| 变量 | 说明 | 值 |
|------|------|-----|
| `DAT_ffffa49c` | 场景索引 (低16位=场景号, 高16位=阵营) | 1-31 |
| `DAT_ffffa61c` | 游戏状态 | 5=部署, 10=战斗 |
| `DAT_ffffae90` | 下一场景号 (场景切换时使用) | 1-31 |
| `DAT_ffffa6d4` | 标题画面标志 | 0=标题画面 |
| `$00FF78FA` | 跳过标题标志 | 0=显示标题, 非0=跳过 |
| `DAT_ffff8004` | 当前任务函数指针 | 任务链驱动 |

### 关键任务地址

| 地址 | 功能 |
|------|------|
| `0xC92C` | 标题画面初始化 |
| `0xC93A` | 标题画面设置 |
| `0xC9A0` | ★标题→部署界面切换 |
| `0xCA00` | 部署界面主循环 |
| `0xD49E` | 战斗阶段(推测) |
| `0x1D1B0` | 场景切换前置 |
| `0x1D1C0` | ★场景切换函数 |
| `0x1D1EA` | 菜单处理 |
| `0x1D244` | 菜单后处理 |

### 关键函数

| 函数 | ROM地址 | 功能 |
|------|---------|------|
| `FUN_0000c80c` | 0xC80C | 游戏主初始化 |
| `FUN_00009ec4` | 0x9EC4 | 地图加载 |
| `FUN_00010abe` | 0x10ABE | 玩家角色初始化 |
| `FUN_00010aec` | 0x10AEC | 角色槽初始化 |
| `FUN_00009172` | 0x9172 | 场景激活 |
| `FUN_000085ee` | 0x85EE | 控制器读取 |
| `FUN_0002a626` | 0x2A626 | 菜单处理 |

### 游戏状态值

| 值 | 含义 | 设置位置 |
|----|------|----------|
| 5 | 部署阶段 | ROM 0xC9E4, 0xF17C, 0xF206 |
| 10 (0xA) | 战斗阶段 | ROM 0xCE22, 0xCF1C, 0xCFE4, 0xFB86 |

---

## 菜单系统分析

### 部署界面主循环 (ROM 0xCA00)

**位置**: ROM 0xCA00

```asm
; 0xCA00: 部署界面主循环
MOVEQ #1, D0                    ; D0=1 (查找玩家角色)
JSR FUN_00011c44                ; 查角色槽(D0=角色ID)
BEQ.W no_character              ; 无角色则跳过
MOVE.L D0, DAT_ffffa8d0         ; 保存角色指针
JSR FUN_00011812                ; 部署界面更新
BEQ.W no_update                 ; 无更新则跳过
MOVEA.L D0, A0                  ; A0=角色指针
MOVEQ #0, D4
MOVE.B 6(A0), D4                ; D4=角色X坐标
MOVEQ #0, D5
MOVE.B 7(A0), D5                ; D5=角色Y坐标
JSR FUN_0000a78c                ; 地图滚动到角色位置
BRA.W deploy_end

no_character:
MOVE.L #0x010001, DAT_ffffa6de  ; 设置光标X=1, Y=1
JSR FUN_00009ec4                ; 地图重新加载
JSR FUN_00011e3a                ; 部署辅助
JSR FUN_00014d5e                ; 清零菜单缓冲
JSR FUN_0000c7ae                ; 初始化

deploy_end:
MOVE.L #0xCA68, DAT_ffff8004    ; 下一任务
RTS
```

### 菜单任务链 (ROM 0xCA68起)

部署界面后续任务链:
```
0xCA00 (部署主循环)
  → 0xCA68 (部署子任务1)
    → 0xCA8A (部署子任务2)
      → ...
```

### 场景分发表 (ROM 0x1D270)

**位置**: [ROM 0x1D270](file:///d:/studio/github/monkeycode/src/langrisser2/docs/execution-trace.md)

```asm
; 0x1D270: 场景分发表入口
MOVE.W DAT_ffffae90, D0         ; 读取场景号
ADD.W D0, D0                    ; D0 = 场景号 × 2 (索引)
JMP ([2,PC], D0.W)              ; 按场景号跳转 (JMP在0x1D27A)

; 0x1D27E: 跳转表 (16个BRA.W, 每个对应一个场景)
; 场景0: BRA.W → 场景0处理代码
; 场景1: BRA.W → 场景1处理代码
; ...
```

每个场景有自己的处理代码，处理该场景的:
- 角色部署位置
- 剧情触发
- 胜利条件

### 菜单核心函数

#### FUN_00011c44 — 查找角色槽
**位置**: [ghidra:8505](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L8505)

```c
undefined1 * FUN_00011c44(void) {
  puVar2 = &DAT_00ff603c;     // 角色槽起始
  sVar1 = 0x13;               // 20个槽位
  do {
    if (in_D0 == puVar2[1]) { // 比较角色ID
      return puVar2;          // 返回角色槽指针
    }
    puVar2 = puVar2 + 0x60;   // 下一槽位 (96B/槽)
    sVar1--;
  } while (sVar1 != -1);
  return in_D0;               // 未找到
}
```

**被调用位置**: 55处 (部署/战斗/AI大量使用)

#### FUN_00011812 — 部署界面更新
**位置**: [ghidra:8431](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L8431)

```c
void FUN_00011812(void) {
  // 检查角色指针有效性
  if ((*DAT_ffffa8d0 != -1) &&
      ((DAT_ffffa8d0[2] & 0x80U) == 0) &&  // 未死亡
      ((DAT_ffffa8d0[8] & 0x80U) == 0)) {  // 未行动
    return;
  }
}
```

#### FUN_00014d5e — 清零菜单缓冲
**位置**: [ghidra:10424](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L10424)

```c
undefined4 FUN_00014d5e(void) {
  // 清零菜单数据缓冲 (0xFFFFA5F2, 30字节)
  puVar2 = &DAT_ffffa5f2;
  sVar1 = 0x1d;  // 30项
  do { *puVar2 = 0; } while (sVar1 != -1);

  DAT_ffffaa10 = 0;            // 清零菜单激活标志
  DAT_ffffae4c = &DAT_ffffae50; // 重置菜单指针

  // 清零菜单选项列表 (0xFFFFAE50, 6项×2字节)
  puVar3 = &DAT_ffffae50;
  sVar1 = 5;
  do { *puVar3 = 0xffff; } while (sVar1 != -1);
}
```

#### FUN_00014566 — 等待菜单完成
**位置**: [ghidra:10176](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L10176)

```c
void FUN_00014566(void) {
  DAT_ffffa9ee = 1;            // 设置菜单显示标志
  do {
    // 等待DAT_ffffaa10变为非0(菜单完成)
  } while (DAT_ffffaa10 == '\0');
}
```

#### FUN_0000a78c — 地图滚动到坐标
**位置**: [ghidra:4051](file:///d:/studio/github/monkeycode/src/langrisser2/ghidra-decompile.c#L4051)

```c
undefined4 FUN_0000a78c(void) {
  // D4=X坐标, D5=Y坐标
  // 计算滚动偏移使角色居中
  if (D4 < 6) sVar1 = 0;
  else {
    sVar1 = D4 - 6;
    if (DAT_ffff9f2c - 14 < sVar1) sVar1 = DAT_ffff9f2c - 14;
  }
  if (D5 < 4) sVar2 = 0;
  else {
    sVar2 = D5 - 4;
    if (DAT_ffff9f2e - 8 < sVar2) sVar2 = DAT_ffff9f2e - 8;
  }
  DAT_ffff9f24 = sVar1;  // 滚动X
  DAT_ffff9f26 = sVar2;  // 滚动Y
  FUN_0000fc9e();         // 更新显示
}
```

### 菜单系统关键变量

| 变量 | 说明 |
|------|------|
| `DAT_ffffa8d0` | 当前选中角色指针 |
| `DAT_ffffa8d4` | 菜单计数器 |
| `DAT_ffffaa10` | 菜单完成标志 (0=等待, 非0=完成) |
| `DAT_ffffa9ee` | 菜单显示标志 |
| `DAT_ffffa97c` | 菜单状态位 (bit0=AI回合, bit1=禁用菜单, bit2=?) |
| `DAT_ffffa984` | 菜单光标位置 (word[0]=X, word[1]=Y) |
| `DAT_ffffa5f2` | 菜单数据缓冲 (30字节) |
| `DAT_ffffae50` | 菜单选项列表 (6项×2字节, 0xFFFF=空) |
| `DAT_ffffae4c` | 菜单选项指针 |
| `DAT_ffffa628` | 当前菜单对象指针 |
| `DAT_ffffa62c` | 菜单对象备份 |
| `DAT_ffffa6de` | 地图光标X |
| `DAT_ffffa6e0` | 地图光标Y |
| `DAT_ffffa6e6` | 菜单光标位置(word) |
| `DAT_ffffa6ee` | 菜单目标位置(word) |

### 菜单选项列表结构

```
DAT_ffffae50: 6个菜单选项 (每个2字节)
  [0] = 选项0的命令ID (0xFFFF=空)
  [1] = 选项1的命令ID
  ...
  [5] = 选项5的命令ID

菜单命令ID (推测):
  1  = 移动
  2  = 攻击
  3  = 待机
  4  = 转职
  5  = 部署
  8  = 装备
  0xFFFF = 无选项
```

### 菜单状态位 (DAT_ffffa97c)

| 位 | 含义 |
|----|------|
| bit0 | AI回合 (1=AI控制) |
| bit1 | 禁用菜单 (1=菜单不可用) |
| bit2 | 未知 |

### 菜单显示标志 (DAT_ffffa984)

```
word[0] = 当前光标位置:
  1 = 移动范围显示
  5 = 攻击范围显示
  8 = 装备/角色信息
  0xFFFF = 无显示

word[1] = 辅助光标位置
```

### 角色槽结构 (DAT_00ff603c, 96字节/槽)

| 偏移 | 类型 | 说明 |
|------|------|------|
| 0x00 | byte | 角色ID |
| 0x01 | byte | 角色编号 (1=玩家, 2+=AI/NPC) |
| 0x02 | byte | 状态位 (bit7=死亡) |
| 0x06 | byte | X坐标 |
| 0x07 | byte | Y坐标 |
| 0x08 | byte | 行动状态 (bit7=已行动) |
| 0x0E | byte | 佣兵状态位 (bit7=死亡, bit6=?) |
| 0x17 | byte | 能力位 (bit1=?) |
| 0x20 | byte | 阵营 (1=玩家) |
| 0x21 | byte | 指挥官ID |
| 0x28 | byte | 经验值 |
| 0x2E | word | HP |
| 0x38 | byte | MP |
| 0x39 | byte | MP备份 |
| 0x3A | word | HP备份 |
| 0x45-46 | word | 未知 |
| 0x46 | byte | CLASS_ID备份 |
| 0x47 | byte | 职业等级 |
| 0x50 | dword | 技能/魔法 |
| 0x5C | byte | 未知 |
| 0x5E | byte | 未知 |
| 0x5F | byte | 未知 |

### 菜单处理流程

```
1. 玩家按A键选中角色
   → FUN_00011c44(D0=1) 查找玩家角色槽
   → 返回角色指针存入 DAT_ffffa8d0

2. 显示角色菜单
   → FUN_00014d5e() 清零菜单缓冲
   → 填充 DAT_ffffae50 菜单选项列表
   → FUN_00014566() 等待玩家选择

3. 玩家选择菜单项
   → DAT_ffffaa10 = 非0 (菜单完成)
   → 读取 DAT_ffffa984 获取选择结果

4. 执行对应命令
   → 1: 显示移动范围 (FUN_00013d1c)
   → 5: 显示攻击范围
   → 8: 显示角色信息
   → 0xFFFF: 取消
```

---

## 附录A: 资源指针表完整枚举 (ROM 0x0B0000)

共 256 个资源入口，类型分布:
- Type 2 (位平面压缩, FUN_00009c10): 适合 4bpp tile 图案数据
- Type 3 (LZSS, FUN_00009dfe): 通用 LZSS 压缩

已知已验证解压的资源:
| Entry | ROM地址 | Type | planes | 输出 | tiles |
|-------|---------|------|--------|------|-------|
| 0 | 0x0B06B4 | 3 | - | 1568B | 49 |
| 112 | 0xE4EAC | 2 | 1 | 864B | 27 |

## 附录B: 标题画面 tile 定位方案

### 已知流程
```
标题画面任务链:
  C93A (标题画面设置)
    → FUN_0000c7ec()  显示初始化
    → FUN_00009ec4()  地图加载 (资源加载核心)
  C9A0 (标题→部署切换)
    → FUN_0000c914()  加载资源 0x8001 → VRAM
```

### 关键调用链
```
FUN_0000c914 (ROM 0xC914)
  → D0=0x8001 (资源ID=1, DMA标志=1), A1=VRAM 0x0000
  → JSR FUN_000099b2 (ROM 0x99B2)
    → 解压到 0xFF1000
    → 写 DMA 命令 (0xFFF9) 到队列
    → JSR FUN_00008a6c (ROM 0x8A6C) 执行 DMA
```

### VDP DMA 地址来源
DMA Source 在 Gens 中显示为 `0x003FC6E6` 等：
- 68K 地址空间映射: ROM (0x000000-0x1FFFFF) 也映射到 0x200000-0x3FFFFF
- 但本地 ROM 仅 2MB (`0x200000`), 且 DMA 传输的是 RAM 0xFF1000 (解压缓冲区)
- `0x003FC6E6` 可能是 ROM → VDP 的直接 DMA (非 LZSS 压缩资源), 或模拟器地址变换
- **实际关注点**: 数据最终来源 = 资源指针表 → ROM 压缩块 → 解压到 0xFF1000 → DMA 到 VDP

### 下一步建议
1. **批量解压所有 256 个资源**, 生成 tile 目录 (每个解压块按 32B/tile 切分)
2. **从 VRAM dump 取标题画面 copyright tile 的 32 字节指纹**, 在解压目录中搜索
3. **从 CRAM dump 提取调色板**, 已确认 ROM 0xA4582 处有匹配的 BE 顺序调色板
4. 或者直接在 Gens 中**断点 FUN_000099b2 (ROM 0x99B2)** `bs 99B2`, 每次调用时记录 D0 (资源ID) 和 A1 (VDP目标地址), 抓取标题画面期间所有被加载的资源ID列表

---

## 阶段X: 标题画面 → 名称输入画面

> 在标题画面按 START → 「New Game」→ 进入名称输入画面「名前を決めて下さい」
> 
> 名称输入画面特征: 蓝色对话框 + "名前を決めて下さい" + 默认名"エルウィン" + 假名输入面板(5列×多行片假名)

### 分流判断: 新游戏 vs 继续

**位置**: ROM 0xC9A0 (task 链), 关键判断在 **0xC9B2**

```asm
; 0xC9A0 (task 入口, 由 0xC964 调度到 $FFFF8004 后触发)
jsr     ($00C7EC).l       ; 场景检查
clr.w   ($FFFFA6DC).l     ; 清除标志
clr.b   ($FFFFF350).l     ; 清除标志
; 0xC9B2 ★ 关键判断
tst.w   ($FF78FA).l       ; 检查「新游戏」标志
bne.w   loc_00CA32         ; !=0 → 新游戏, 进入名称输入路径(CA32)
; ==0 → 继续游戏路径
jsr     ($009EC4).l       ; → task=0xCA00 (部署画面)
jsr     ($00C914).l       ; 加载资源0x8001
jsr     ($010ABE).l
; ... (继续游戏初始化链)
```

**$FF78FA 标志**:
- `0xFFFF` = 新游戏 (由 `loc_00C80C` 初始化时设置)
- `0x0000` = 继续游戏 / 已有存档

### 5.1 名称输入初始化链

```
任务链 (通过 $FFFF8004 任务分派器):
  loc_00CA32 → loc_00CA68 → loc_00CA8A → loc_00CA9E → loc_00CCB0 (循环)

loc_00CA32 (ROM 0xCA32): 初始化
  ├→ move.l #$10001 → $A6DE   ; 设标志
  ├→ jsr 0x009EC4             ; 场景???
  ├→ jsr 0x011E3A             ; 场景检查
  ├→ bsr 0x010AEC             ; 角色数据初始化 (清除 $FF4000/$FF5000 区)
  ├→ jsr 0x014D5E             ; 场景/UI 缓冲初始化
  ├→ bsr 0x009172             ; 绘图
  ├→ bsr 0x009020             ; 绘图
  ├→ jsr 0x00C7AE             ; VDP 设置
  └→ set next task = 0xCA68, rts (直接返回, 无过渡, 调度器调用 CA68)

loc_00CA68 (ROM 0xCA68):
  → 加载资源 0x8001 到 VRAM 0 (名称输入 UI 字体/背景)
  → 设置 next task = 0xCA8A, d0=$25E4C → jmp 0x85EE (过渡效果)

loc_00CA8A (ROM 0xCA8A):
  → 设置 next task = 0xCA9E, d0=$FB82 → jmp 0x85EE
  → 0xFB82 = 淡入淡出过渡包装函数 (内部 set $A61C=0xA, call 0xF67E)

loc_00CA9E (ROM 0xCA9E): ★ 名称输入画面核心 ★
  ├→ jsr 0x011D7A    角色/对话框 UI 初始化
  ├→ set $A5F0 = 1
  ├→ bsr 0x00CC4E    名称输入画面绘制
  │   ├→ set $9F36=1, $9F37=1, $A6F8/F9=0
  │   ├→ jsr 0x9172, jsr 0x9020  (清屏/绘图)
  │   ├→ jsr 0xC7AE           (VDP 设置)
  │   ├→ load resource 0x8001 → VRAM 0
  │   ├→ jsr 0x9FC2           (nametable 数据加载?)
  │   └→ jsr 0xFC4A           (VDP 调色板/数据加载?)
  ├→ lea $FF603C, a0    ; 角色槽表
  ├→ moveq #19, d0      ; 20个角色
  ├→ loop 0x00CAB8:
  │   move.l a0 → $A8D0
  │   bsr 0x011812       ; 检查角色是否活跃 (查 $FF(a0) != 0, bit7位)
  │   如果活跃 (玩家/Elwin) → 提取 d4=X, d5=Y → jsr 0xA78C (地图定位)
  │   否则 adda #$60, a0 (下一槽, 96字节)
  └→ jsr 0xC1D2          ; 名称输入框绘制 ← 假名网格绘制(VDP)
  ├→ lea $FFFF94A2, a1   ; RAM 目标缓冲区
  ├→ lea ($082114), a2   ; ROM 源数据 (假名/字体 tile 映射表)
  ├→ bsr 0x9208          ; memcpy: ROM → RAM
  ├→ lea $FFFF94A2, a2   ; 重指向缓冲区
  ├→ jsr 0xA122          ; 解析假名选择列表
  → set $A614 = 1
  → bsr 0xFBAE           ; 角色/对话框调色板加载
  → tst.w ($FF78FA)      ; 再次检查新游戏标志
  → 若新游戏: set $A7F8=1, $A6F6=1, 循环重置20个角色槽数据
```

### 5.2 名称输入主循环 (假名选择)

**入口**: `loc_00CCB0` (ROM 0xCCB0)
**选择索引**: `$FFFFA612` (0-31, 对应假名面板的 32 个字符位置)
**行列逻辑**: 索引 ≤ 27 (0x1B) 为上半区, > 27 为下半区

```
loc_00CC94 (名称输入状态检查):
  cmpi.b #$10, ($00007F).w   ; 检查是否在名称输入场景
  bne → 跳过 (不在名称输入)

loc_00CCB0 (光标移动循环):
  set next task = 0xCD70     ; 提前注册下一步任务

  btst #0, ($FFFF8179).w     ; 方向键上?
  → $A612 -= 1 (若 <=0 则回绕到 31)

  btst #1, ($FFFF8179).w     ; 方向键下?
  → $A612 += 1 (若 >=32 则回绕到 1)

loc_00CD14 (渲染当前选择):
  d1 = $A612                 ; 选择索引
  若 d1 > 27: d1 -= 27       ; 下半区映射
  d2=2, d4=1
  jsr 0x10620                ; 渲染光标高亮

loc_00CD70 (确认/取消):
  move.b ($FFFF8179).w, d0   ; 读控制器
  btst #4, d0                ; C 按钮?
  bne → loc_00CDAE:
      clr.b ($FFFFAA10).w
      move.l #$0000D738 → ($FFFF8004).w  ; 取消→回退/删除字符
      rts

  andi.b #$A0, d0            ; A ($80) 或 B ($20)?
  beq → loc_00CCB0           ; 无按键, 继续光标循环

  ; ★ A/B 确认选择 ★
  move.b #0, $9F36, $9F37, $9FEA  ; 清除 UI 活动标志
  move.w #$0450, d0          ; 音效参数
  bsr loc_00955C             ; 播放确认音效
  move.w ($FFFFA612), d0     ; 取当前假名索引
  move.w d0, ($FFFFA49C)     ; 保存到结果区
  bra   loc_00CFB8           ; → 进入名称确认/下一字符

loc_00CFB8 (确认后过渡):
  bsr loc_00FB6E
  → 设 VDP 参数 ($5DF40, $5DF46=1, $5DF48=0xF)
  → next task = 0xCFE4, transition 0x9334

loc_00CFE4 (等待过渡完成):
  → $A61C = 0xA, next = 0xD000, fade $F67E

loc_00D000 (确认后清理 → 下一字符):
  → 清除 UI 标志
  → jsr $942A, $8294 (清屏)
  → check $AA10: 若为负 → 0xD034 (名称确认完毕)
  → 否则 next = 0xC92C (回到标题→名称分流, 准备下一字符)
```

### 5.2B 光标渲染 (loc_00CD14)

```
; CD14: 当前假名位置光标高亮
d1 = $A612                 ; 取选择索引
若 d1 > 27 ($1B): d1 -= 27  ; 下半区映射(索引 28-31→1-4)
d2 = 2, d4 = 1
jsr 0x10620                ; 渲染光标精灵/高亮
```
```

### 5.3 $FF78FA 标志状态机

| 值 | 含义 | 设置位置 |
|---|---|---|
| $FFFF | 新游戏 | `loc_00C80C` 初始化时 |
| $0000 | 继续/已加载 | 进入名称输入后某阶段清零 |

### 5.4 假名字体数据来源

- **字体 tile**: 来自资源 0x8001 加载到 VRAM
- **假名字符集数据**: ROM $082114 区域 → 复制到 RAM $FFFF94A2
- **字体编码**: 不是 Shift-JIS! 是**自定义 tile 索引编码**——每个假名字符对应一个 VRAM tile 编号
- **名称字符串** "エルウィン" 在 ROM 里以**自定义字节序列**存储（待确认具体地址和编码）

### 5.5 关键 RAM 地址

| 地址 | 说明 |
|------|------|
| $FF78FA | 新游戏/继续标志 |
| $FFFFA612 | 假名选择索引 (0-31) |
| $FFFFA49C | 确认后的假名字符值 |
| $FFFF8179 | 控制器输入 |
| $FFFF94A2 | 假名字符表 (从 $082114 拷贝) |
| $FFFF9F36/$9F37 | 名称输入 UI 活动标志 |
| $FF603C | 角色数据槽 (20个 × 96字节, Elwin在slot 0) |
| $FFFF8004 | 任务分派器: 下一任务地址 |
| $FFFF8000 | 任务栈指针 |
