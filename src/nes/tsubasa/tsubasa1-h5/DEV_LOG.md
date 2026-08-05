# 天使之翼1 H5 — 开发日志

> **项目**: 天使之翼1 (Captain Tsubasa Vol. I) NES → H5微信小程序  
> **开始日期**: 2026-08-05  
> **主平台**: 微信小程序 | **副平台**: HTML5 浏览器

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

### 修改文件

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

### 修改文件

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
