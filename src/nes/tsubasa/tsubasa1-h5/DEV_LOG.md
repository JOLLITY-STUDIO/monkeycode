# 天使之翼1 H5 — 开发日志

> **项目**: 天使之翼1 (Captain Tsubasa Vol. I) NES → H5微信小程序  
> **开始日期**: 2026-08-05  
> **主平台**: 微信小程序 | **副平台**: HTML5 浏览器

---

## 2026-08-06 (Day 2) — 深夜续: Bank 7 数据提取 + 比赛引擎

### 完成工作

| 任务 | 说明 |
|------|------|
| ✅ T3.1 | Bank 7 球员数据提取 — 23名球员 × 18字节，提取自 Bank 7 RAM镜像 |
| ✅ T3.2 | Bank 7 文本数据提取 — 107段文本，含 Bank 2 $D0F3 指针表 |
| ✅ T3.3 | 关键发现: 球员数据API ($AB6F/$AB7C/$AB94) 实际在 Bank 0 内 |
| ✅ T3.4 | MatchEngine — 完整比赛引擎 (Bank 4 转写) |
| ✅ T3.5 | Bank0Core v2 — 使用 MatchEngine 替代占位逻辑 |
| ✅ T3.6 | PlayerTable 修复 — 添加 teamId 字段 |

### 架构发现

**Bank 0 $AD38 指针表**: 23 条目 (每个 2字节)，指向 RAM $03F7-$0583 的球员数据。
每个球员 18 字节，从 Bank 7 ROM 加载到 RAM 后由 Bank 0 代码访问。
代码 $AB6F (GetPlayerPointer) → 查表 $AD38 → 存指针到 ($5D,$5E)
代码 $AB7C (PlayerDataOps) → 切换到 Bank 7 → 使用指针访问数据

### 球员数据结构 (18 字节)

```
[0-1]  名称指针 (Bank 7 CPU地址 $E0xx 或 RAM地址 $02xx)
[2]    球队/阵营ID
[3]    位置角色
[4-5]  能力值组1
[6-7]  能力值组2
[8-9]  能力值组3
[10-13] 能力值组4
[14-15] 能力值组5
[16-17] 能力值组6
```

### 比赛引擎 (MatchEngine)

- State 3: 5步骤初始化 (清RAM → 加载球队 → 设置场地 → 参数 → 完成)
- State 4: 比赛主循环 (开球 → 上半场 → 中场 → 下半场 → 加时 → 结束)
- State 5: 状态转换 (进球/中场/终场 → 事件/结果画面)
- AI: 随机事件驱动 (进球概率8%, 每5秒)
- 时间: 简化版 45分钟 = 2700帧 @60fps

| 文件 | 修改内容 |
|------|---------|
| `src/game/match/MatchEngine.ts` | [新] 完整比赛引擎 |
| `src/game/match/index.ts` | [新] Barrel 导出 |
| `src/game/Bank0Core.ts` | [重写] 使用 MatchEngine |
| `src/data/tables/PlayerTable.ts` | [修正] 添加 teamId 字段 |
| `scripts/extract_bank7_data.mjs` | [新] Bank 7 数据提取脚本 |
| `src/data/tables/bank7_players.json` | [新] 23 名球员原始数据 |
| `src/data/tables/bank7_texts.json` | [新] 107 段文本数据 |
| `src/data/tables/bank7_player_data.ts` | [新] TS 格式球员数据 |

### 游戏流程 (当前)

```
State 0: OpeningScene → 6个分镜展示 → auto exit
State 1: TitleScene → 显示标题 + 等待START → auto/manual exit  
State 2: MenuScene → 菜单选择 → auto exit
State 3: Bank0Core.matchInit → MatchEngine 5步初始化
State 4: Bank0Core.matchLoop → MatchEngine.update() 比赛循环
State 5: Bank0Core.transitionManager → 状态转换
State 6: MenuScene (Sub 3) → 事件画面
State 7: MenuScene (Sub 1) → 结果画面
```

### 下一步

1. **Bank 4 比赛AI完善** — 基于原 Bank 4 代码实现真实AI决策
2. **Bank 7 文本字体** — 从 CHR Bank 提取日文字体映射
3. **比赛画面渲染** — 场地背景 + 球员精灵 + 比分UI
4. **完整通关测试** — AI 自动挂机跑通整场

---

### 完成工作

| 任务 | 说明 |
|------|------|
| ✅ T2.1 | TitleScene — 替换 SkeletonBank5，从Bank 2 $B24F提取标题调色板 |
| ✅ T2.2 | MenuScene — 替换 SkeletonBank6，实现菜单/结果/事件三个Sub |
| ✅ T2.3 | 标题调色板提取脚本 — `extract_title_data.mjs` |
| ✅ T2.4 | Bank 3 数据分析继续 — 确认Bank 3为代码+数据混合Bank |
| ✅ T2.5 | Tsubasa.ts注册更新 — OpeningScene + TitleScene + MenuScene |

### 标题调色板 (Bank 2 $B24F)

```
BG0: 0F 33 0F 1A  (黑/浅蓝/黑/绿)
BG1: 30 36 0F 30  (白/深灰/黑/白)
BG2: 0F 25 0F 0F  (黑/粉/黑/黑)
BG3: 0F 36 30 21  (黑/深灰/白/蓝)
SPR0-3: [36 11 0F 36] [30 21 36 30] [0F 0F 0F 21] [31 30 1A 30]
```

### Bank 5 分析

Bank 5 开头跳转表:
- $C4FC (Sub 0), $CB0D (Sub 1), $CB9B (Sub 2), $CE3B (Sub 3)
- $CEAA (Sub 4), $CEDE (Sub 5), $D0F5 (Sub 6), $D149 (Sub 7)
- State 1 调度 `LDA #$5D` → Bank 5 Sub D (13) — 超出8个Sub范围，可能二级分发

### Bank 3 数据分析 (发现)

- Bank 3 使用间接寻址模式 (LDA (indirect),Y) 访问数据，静态追踪困难
- $3D60-$3DBF: 48字节指针表 (24个16-bit指针 → $FDxx)
- $3DC0-$3DEF: 变长记录数据 (被指针表引用)
- $3DF0-$3E1F: 16-bit数据数组 (可能是XP阈值或球员参数)
- $3F50-$3FBF: 等级相关数据表
- Bank 3 API ($AB6F/$AB7C/$AB94): 包含精灵/阵型数据，非纯球员数据
- **结论**: 球员数据在Bank 3中以间接指针+变长记录格式存储，需更深入的ASM代码分析才能精确提取。当前使用测试数据作为占位。

| 文件 | 修改内容 |
|------|---------|
| `src/core/Tsubasa.ts` | TitleScene/MenuScene 替换 SkeletonBank5/6 |
| `src/game/title/TitleScene.ts` | [新] 标题画面 (调色板+nametable) |
| `src/game/menu/MenuScene.ts` | [新] 菜单/结果/事件画面 |
| `scripts/extract_title_data.mjs` | [新] Bank 2 标题数据提取 |

### 游戏流程 (当前)

```
State 0: OpeningScene → 6个分镜展示 → auto exit
State 1: TitleScene → 显示标题 + 等待START → auto/manual exit  
State 2: MenuScene → 菜单选择 → auto exit
State 3: Bank0Core.matchInit → 比赛初始化 (placeholder)
State 4: Bank0Core.matchLoop → 比赛主循环 (placeholder)
State 5: Bank0Core.transitionManager → 状态转换
State 6: MenuScene (Sub 3) → 事件画面
State 7: MenuScene (Sub 1) → 结果画面
```

### 下一步

1. **Bank 3 球员数据精确提取** — 从代码段分析数据访问模式
2. **Bank 7 文本数据** — 构建TextTable
3. **比赛引擎实现** — Bank 4 替换 placeholder

---

## 2026-08-06 (Day 2) — 晚间: 接线 OpeningScene + PRG数据加载

### 完成工作

| 任务 | 说明 |
|------|------|
| ✅ T1.1 | OpeningScene 替换 SkeletonBank1 — Tsubasa.ts 中使用 OpeningScene |
| ✅ T1.2 | PRG Bank 数据加载 — 从 prg_bulk.json 生成 prg_bank_data.ts，游戏页加载8个PRG Bank |
| ✅ T1.3 | RLE 偏移修复 — 确认RLE数据在 Bank 1 offset 0x1068 (跳过16字节指针表) |
| ✅ T1.4 | CHR Bank 切换修复 — 设置 `currentChrBank0/1` (非 `chrBank0/1`) |
| ✅ T1.5 | 开场调色板 — 加载 NES 默认 4 组 BG + 4 组 SPR 调色板 |
| ✅ T1.6 | RLE解码验证 — 成功解码960 tiles, 17种不同tile |

### RLE数据结构确认

```
Bank 1 offset 0x1058: 8-entry pointer table (16 bytes)
  [0] 0x614D [1] 0x3B00 [2] 0x0053 [3] 0xD068
  [4] 0xD07F [5] 0xD093 [6] 0xD0A5 [7] 0xD0CE

Bank 1 offset 0x1068: Main RLE nametable data
  First tile: 0xA7 (背景色块)
  960 tiles decoded (full nametable)
  17 unique tiles
```

### Bank 3 数据分析 (发现)

- Bank 3 使用间接寻址模式 (LDA (indirect),Y) 访问数据，静态追踪困难
- $3D60-$3DBF: 48字节指针表 (24个16-bit指针 → $FDxx)
- $3DC0-$3DEF: 变长记录数据 (被指针表引用)
- $3DF0-$3E1F: 16-bit数据数组 (可能是XP阈值或球员参数)
- $3F50-$3FBF: 等级相关数据表
- Bank 3 API ($AB6F/$AB7C/$AB94): 包含精灵/阵型数据，非纯球员数据
- **结论**: 球员数据在Bank 3中以间接指针+变长记录格式存储，需更深入的ASM代码分析才能精确提取。当前使用测试数据作为占位。

| 文件 | 修改内容 |
|------|---------|
| `src/core/Tsubasa.ts` | OpeningScene 替换 SkeletonBank1 |
| `src/game/opening/OpeningScene.ts` | RLE偏移修正 + 调色板 + CHR Bank修复 |
| `pages/game/game.ts` | 加载所有8个PRG Bank |
| `src/data/raw/prg_bank_data.ts` | [新] PRG Bank base64数据 (TS模块) |
| `scripts/generate_prg_data.mjs` | [新] prg_bulk.json→prg_bank_data.ts 转换脚本 |

### 架构确认

```
数据流:
  prg_bulk.json (171KB)
    → generate_prg_data.mjs
    → prg_bank_data.ts (0.17MB)
    → game.ts: loadAllPrgBanks()
    → Tsubasa.loadPrgBank(bankId, data)
    → RomReader.loadBank(bankId, data)
    → OpeningScene.getRomReader().getBankData(1)
    → RleDecoder.decode(bank1, 0x1068, 960)
    → DataStore.nametable0 (960 tiles)
    → Renderer.render() → Canvas

CHR流:
  chr_data.ts (769KB)
    → game.ts: initChrBanks() + loadChrBank()
    → Renderer._chrBanks Map
    → OpeningScene._setChrBanks(4, 6)
    → Renderer._activeChr0/1
    → 渲染时按 tile 索引查 CHR 图案
```

---

## 2026-08-06 (Day 2) — 晚间: RomDatabase 架构重构 + 数据库页面修复

### 核心修正

**问题**: 所有的"数据库"页面 (chr-all, nametable-all, sprite-all, palette-all, audio-all, data-api) 之前都在读取游戏运行时的 DataStore — 这是错误的架构。DataStore 是"RAM"（运行时状态），不是"数据库"（ROM静态资源）。

**修正**: 创建了 **RomDatabase** 单例 — ROM静态资源数据库，明确区分两个数据层:

| 层 | 类 | 性质 | 类比 |
|----|-----|------|------|
| 资源数据库 | `RomDatabase` | ROM静态数据，永不改变 | MySQL/游戏安装目录 |
| 运行时状态 | `DataStore` | 游戏RAM，每帧变化 | Redis/游戏存档 |

### 新增文件

| 文件 | 说明 |
|------|------|
| `src/data/RomDatabase.ts` | ROM静态资源数据库 (单例、只读、类SQL查询) |

### Bank 3 数据分析 (发现)

- Bank 3 使用间接寻址模式 (LDA (indirect),Y) 访问数据，静态追踪困难
- $3D60-$3DBF: 48字节指针表 (24个16-bit指针 → $FDxx)
- $3DC0-$3DEF: 变长记录数据 (被指针表引用)
- $3DF0-$3E1F: 16-bit数据数组 (可能是XP阈值或球员参数)
- $3F50-$3FBF: 等级相关数据表
- Bank 3 API ($AB6F/$AB7C/$AB94): 包含精灵/阵型数据，非纯球员数据
- **结论**: 球员数据在Bank 3中以间接指针+变长记录格式存储，需更深入的ASM代码分析才能精确提取。当前使用测试数据作为占位。

| 文件 | 修改内容 |
|------|---------|
| `app.ts` | v0.3.1: 启动时初始化 RomDatabase |
| `pages/database/chr-all/chr-all.ts` | 改用 RomDatabase + Bank描述 |
| `pages/database/pattern-table-all/pattern-table-all.ts` | 改用 RomDatabase |
| `pages/database/palette-all/palette-all.ts` | 完全重写: 读 RomDatabase 静态调色板，不再碰 DataStore |
| `pages/database/palette-all/palette-all.wxml` | 场景调色板视图 |
| `pages/database/nametable-all/nametable-all.ts` | 完全重写: 读 RomDatabase 静态NT模板，不再碰 DataStore |
| `pages/database/nametable-all/nametable-all.wxml` | 模板列表+选中可视化 |
| `pages/database/sprite-all/sprite-all.ts` | 完全重写: 读 RomDatabase 静态精灵定义，不再碰 OAM |
| `pages/database/sprite-all/sprite-all.wxml` | 精灵定义列表 |
| `pages/database/audio-all/audio-all.ts` | 读 RomDatabase 音频条目 |
| `pages/database/audio-all/audio-all.wxml` | BGM/SFX列表 |
| `pages/database/data-api/data-api.ts` | 动态从 RomDatabase.getSummary() 生成端点状态 |

### RomDatabase 数据表结构

```
RomDatabase
├── chrBanks[]          # 32个CHR Bank (各4096B) — ✅ 全部加载
├── prgBanks[]          # 8个PRG Bank (各16384B) — ✅ 全部加载  
├── systemPalette[]     # NES 64色调色板 — ✅ 硬件定义
├── paletteTables[]     # 场景调色板表 — ✅ 标题画面 (Bank2) + 默认
├── nametableTemplates[] # NT模板 — 🔲 4个RLE模板 (待Bank1解压)
├── spriteDefinitions[]  # 精灵定义 — 🔲 待Bank3/4提取
├── audioEntries[]       # 音频条目 — 🔲 待Bank5提取
├── players[]            # 球员数据 — 🔲 待Bank3提取
└── teams[]              # 球队数据 — 🔲 待Bank3提取
```

### 不变的页面

`pages/database/render-viewer/` — 这个页面**专门**用于观察游戏运行时的渲染状态，所以它读取 DataStore 是正确的，保持不变。

---

## 2026-08-06 (Day 2) — 晚间: 渲染管线滚动/精灵优先级修复

### 修复内容 (Renderer.ts v2.0)

| 问题 | 严重度 | 描述 |
|------|--------|------|
| 🔴 4屏滚动 | P0 | 原代码只从单个Nametable渲染, 滚动到边界时画面错误 |
| 🔴 精灵behindBg | P0 | `behindBg`属性被解析但从未使用, 后景精灵优先级完全失效 |
| 🟡 _bgColorIndex | P1 | 背景色索引始终为0, 未从paletteRam[0]更新 |
| 🟡 MMC1镜像 | P1 | 未处理水平/垂直镜像模式, NT选择错误 |

### 修复方案

**像素缓冲架构** (替代原putImageData直接写Canvas):
```
渲染流程:
  1. _clearBuffer()   → 填充背景色 + mask=4 (isBg=1, colorIdx=0)
  2. _renderBackground() → 逐tile解码写入缓冲 (4屏滚动)
  3. _renderSprites()  → 前景精灵覆盖 + 后景精灵仅覆盖bg-color0
  4. _flushBuffer()    → 转换Uint32Array→ImageData→Canvas
```

**4屏滚动** (`_renderBackground`):
- 世界坐标空间: 2×2 NT网格, 512×480像素
- 视口: (scrollX, scrollY) → (scrollX+256, scrollY+240)
- 逐tile计算所属NT, 通过`_resolveNametable`处理镜像

**精灵优先级** (`_drawSpriteToBuffer`):
- 前景精灵 (behindBg=false): 直接覆盖缓冲
- 后景精灵 (behindBg=true): 检查`colorMask` — 仅当(isBg && colorIdx===0)时绘制
- 精灵索引顺序: 63→0 (低索引高优先级, 后绘制)

### 新增文件

| 文件 | 说明 |
|------|------|
| `pages/debug/render-debug/*` | 渲染管线调试页面 (4种视图模式) |
| `render-debug.ts` | 渲染输出/色彩标记/NT映射/精灵分布 |
| `render-debug.wxml` | 视图切换 + 叠加层 |
| `render-debug.wxss` | 暗色主题样式 |

### Bank 3 数据分析 (发现)

- Bank 3 使用间接寻址模式 (LDA (indirect),Y) 访问数据，静态追踪困难
- $3D60-$3DBF: 48字节指针表 (24个16-bit指针 → $FDxx)
- $3DC0-$3DEF: 变长记录数据 (被指针表引用)
- $3DF0-$3E1F: 16-bit数据数组 (可能是XP阈值或球员参数)
- $3F50-$3FBF: 等级相关数据表
- Bank 3 API ($AB6F/$AB7C/$AB94): 包含精灵/阵型数据，非纯球员数据
- **结论**: 球员数据在Bank 3中以间接指针+变长记录格式存储，需更深入的ASM代码分析才能精确提取。当前使用测试数据作为占位。

| 文件 | 修改内容 |
|------|---------|
| `src/render/Renderer.ts` | 完全重写 → 像素缓冲 + 4屏滚动 + 精灵优先级 |
| `app.json` | 添加 render-debug 页面路由 |
| `pages/game/game.wxml` | 添加调试页面导航链接 |
| `pages/game/game.wxss` | 添加 debug-links 样式 |
| `pages/debug/nametable-all/nametable-all.ts` | 添加scrollX/scrollY视口叠加 |
| `pages/debug/nametable-all/nametable-all.wxml` | 显示滚动偏移 |
| `pages/debug/sprite-all/sprite-all.ts` | 添加behindBg统计和scroll信息 |
| `pages/debug/sprite-all/sprite-all.wxml` | 显示活跃/后景精灵数量 |
| `pages/debug/sprite-all/sprite-all.wxss` | 添加 stats-bar 样式 |

### render-debug 视图模式

| 模式 | 功能 |
|------|------|
| 🎬 渲染输出 | 复制游戏像素缓冲, 显示完整256×240画面 |
| 🔥 色彩标记 | 热力图: 蓝=背景, 红=精灵, 暗=空 |
| 🗺️ NT映射 | 4个NT缩略图 + 视口指示框 |
| 👻 精灵分布 | 精灵位置框 + 前景/后景色标 |

---

## 2026-08-06 (Day 2) — 下午

---

## 2026-08-06 (Day 2) — 下午

### 完成工作

| 时间 | 任务 | 产出 |
|------|------|------|
| ✅ | 调试页面-nametable-all | 完整实现 (TS+WXML+WXSS+JSON) |
| ✅ | 调试页面-sprite-all | 完整实现 (64精灵可视化) |
| ✅ | 调试页面-palette-all | 完整实现 (系统64色+8组调色板) |
| ✅ | 调试页面-pattern-table-all | 完整实现 (双PT+CHR切换) |
| ✅ | 调试页面-audio-all | 占位实现 (架构就绪) |
| ✅ | 调试页面-data-api | Swagger风格数据API调试页 |
| ✅ | app.ts 全局实例暴露 | 调试页面可通过 getApp() 访问游戏 |
| ✅ | PlayerTable | 球员数据表 (类型+仓库+测试数据) |
| ✅ | TeamTable | 球队数据表 (类型+仓库+测试数据) |
| ✅ | tables/index.ts | 数据访问层统一导出 |
| ✅ | Bank 3 数据结构调查 | extract_players_v2.mjs 分析脚本 |
| ✅ | 项目验证 | verify_project.cjs 更新至 359项 |
| ✅ | DEV_LOG更新 | 当前文档 |

### 修复

| 问题 | 文件 | 说明 |
|------|------|------|
| 🐛 rgba函数调用错误 | sprite-all.ts | `rgba(...)` → `'rgba(...)'` 字符串 |
| 🧹 清理临时脚本 | extract_players.mjs, test_core.mjs | 移除v1/无效脚本 |

### 当前状态

- **Phase 1**: ✅ 完成 (ROM分析)
- **Phase 2**: ✅ 完成 (架构设计与框架搭建)
- **Phase 3**: ✅ 框架 (Bank 0 核心引擎框架全，逻辑占位)
- **Phase 4**: ✅ 完成 (渲染系统 + 全部7个调试页面)
- **Phase 5**: 🚧 进行中 (PlayerTable/TeamTable创建，Bank 3数据待深入解析)

### 下一步任务

1. **Bank 1 开场动画** — 实现RLE解码器和分镜引擎 (P0)
2. **PRG数据运行时加载** — 在game.ts中接入prg_bulk.json
3. **Bank 3 精确数据格式** — 需配合ASM分析确定球员数据结构偏移
4. **Bank 7 文本数据提取** — 构建TextTable/EventScriptTable

---

## 2026-08-06 (Day 2) — 上午

---

## 2026-08-06 (Day 2) — 上午

### 架构决策

**双平台策略确认**: 微信小程序为主发布目标，HTML(`src/index.html`)保留作为开发调试和独立部署环境。共享 `src/` 下所有纯 TS 逻辑，仅页面层不同。

### 完成工作

| 时间 | 任务 | 产出 |
|------|------|------|
| ✅ | 双平台架构确认 | ARCHITECTURE.md v1.1.0 |
| ✅ | WBS状态更新 | WBS.md Phase 2 全部完成 |
| ✅ | DEV_LOG更新 | 当前文档 |

### 当前状态

- **Phase 1**: ✅ 完成 (ROM分析)
- **Phase 2**: ✅ 完成 (架构设计与框架搭建，含小程序+HTML双平台)
- **Phase 3**: 🚧 进行中 (Bank 0 核心引擎 — 框架完成，Bank0Core占位逻辑待完善)

### 下一步任务

1. **完善 Bank0Core** — 将占位逻辑替换为真实的Bank 0/3/4比赛数据
2. **CHR→PNG导出** — 生成可用的PNG图集资源
3. **Bank 1 开场动画** — 实现RLE解码器和故事板引擎
4. **调试页面完善** — chr-all / nametable-all / sprite-all 等调试页

---

## 2026-08-05 (Day 1)

### 完成工作

| 时间 | 任务 | 产出 |
|------|------|------|
| ✅ | ROM结构分析报告 | `ROM_STRUCTURE_REPORT.md` |
| ✅ | 架构设计文档 | `ARCHITECTURE.md` |
| ✅ | WBS任务分解 | `WBS.md` |
| ✅ | 核心类型定义 | `src/core/types.ts` |
| ✅ | 数据中心 (DataStore) | `src/data/DataStore.ts` |
| ✅ | 手柄输入管理 | `src/engine/InputManager.ts` |
| ✅ | PPU更新队列 | `src/engine/PpuQueue.ts` |
| ✅ | Bank调度器 | `src/core/BankDispatcher.ts` |
| ✅ | 状态机 | `src/core/StateMachine.ts` |
| ✅ | NMI处理器 | `src/core/NmiHandler.ts` |
| ✅ | 游戏主循环 | `src/core/GameLoop.ts` |
| ✅ | Canvas渲染器 | `src/render/Renderer.ts` |
| ✅ | 主入口类 | `src/core/Tsubasa.ts` |
| ✅ | 微信小程序页面 | `pages/game/game.*` |
| ✅ | HTML测试环境 | `src/index.html` |
| ✅ | 小程序配置 | `app.ts/json/wxss`, `project.config.json` |

### 架构决策

1. **非模拟器方案**: 完全抛弃6502指令模拟，用TypeScript直接表达游戏逻辑
2. **MVC分层**: View(Canvas渲染) → Controller(核心引擎) → Model(DataStore+数据表)
3. **Key-Value数据中心**: DataStore替代RAM/OAM/VRAM，类型安全的内存映射
4. **Bank调度**: BankDispatcher模拟MMC1的Bank切换，每个Bank实现BankModule接口
5. **渲染解耦**: Renderer独立于游戏逻辑，通过DataStore获取渲染数据

### 当前状态

- **Phase 1**: ✅ 完成 (ROM分析)
- **Phase 2**: 🚧 进行中 (架构设计与框架搭建 80%)
  - 核心框架代码已完成
  - 待注册Bank模块 (游戏逻辑)
  - 待加载CHR/PRG数据

### 下一步任务

1. **提取CHR数据** → PNG图集 → 加载到Renderer
2. **提取PRG Bank数据** → TS结构化数据
3. **实现Bank 0内部逻辑** (状态3/4/5的内联代码)
4. **实现Bank 1** (开场动画)
5. **注册Bank模块到BankDispatcher**

### 阻塞点

- ⚠️ CHR数据尚未提取为PNG (需要tools/extract_chr.ts)
- ⚠️ PRG Bank原始数据尚未生成为TS (需要tools/generate_data.ts)
- ⚠️ Bank 0内部代码(State 3/4/5)尚未深入分析

### 技术债务

- [ ] OffscreenCanvas在微信小程序可能不支持，需要回退方案
- [ ] 键盘事件在移动端不可用，需要完善的触摸控制
- [ ] Tile缓存可能导致内存增长，需要LRU淘汰策略
- [ ] 音频系统尚未实现

---

## 版本记录

| 版本 | 日期 | 说明 |
|------|------|------|
| v0.3.1 | 2026-08-06 | RomDatabase架构重构: 数据库页面改为读ROM静态数据，不碰DataStore |
| v0.3.0 | 2026-08-06 | 渲染管线修复 (4屏滚动+精灵优先级) + render-debug页面 |
| v0.2.0 | 2026-08-06 | 双平台策略确认 (小程序为主, HTML为辅); Phase 2 完成 |
| v0.1.0 | 2026-08-05 | 核心框架搭建完成，ROM分析完成 |

---

*持续更新中...*
