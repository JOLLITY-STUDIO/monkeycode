# 天使之翼2 H5 转写 — 迭代方案（WBS）
The real boot flow is now clear: Reset($C64E) → $CEFE(场景0) → $C400 → JMP $A200(场景初始化, bank2)

> 项目根：`d:/studio/github/monkeycode/src/nes/tsubasa2`
> 输入：`src/asm`（32 个 PRG bank 还原汇编）+ `src/core`（tsnes 模拟器，PPU/APU/控制器复用）
> 输出：`src/game`（Java 风格 TS，MVC：`code/`=Service 业务逻辑、`data/`=Table 数据模型）
> 原则：**不编造**。数据从 asm 提取为声明式 TS 表；逻辑逐指令对照 asm 翻译为高级语言；
> 不出现地址、不出现 6502 指令、不出现 MMC3 bank 切换；渲染/音频/界面流转全部是原始游戏真实行为。

## 翻译本质（行为语义，不是操作模拟）

- **翻译的是行为，不是要一样的操作**。6502 指令序列只是"怎么做"，我们只保留"做了什么"。
- bank 切换（`JSR $C4B9`/`STA $8000`）的行为语义 = **执行另一个模块的某个功能 / 读取该模块的数据**。
  高级语言里就是 `import` + 直接函数调用、直接查表，**根本不存在"整个 bank 加载/切换"概念**。
- 禁止为模拟 bank 而写 `bankSwitch/mmc3Map/readMem/setPrgBank` 之类的"硬件窗口"机制；
  翻译产物只有：Service 方法调用（行为）+ Table 具名查询（数据）+ DataStore 运行时 KV（状态）。
- CHR 图形数据是唯一保留"图片资源/表"粒度的数据，与 bank 机制无关。

## 命名规范（v2，已生效）

- 文件名 = 类名，PascalCase 语义化，禁止 `bankXX` 前缀。
- `code/system/*Service`（原 bank30/00/02/31）、`code/scene/*SceneController`、
  `code/story/Script*`、`code/player|team|match|skill|sprite|audio/*Service`、
  `data/store/DataStore`、`data/tables/*Table`。
- 外部只能通过 `src/game/index.ts` 出口契约访问，禁止裸地址读内存。

## 数据访问规则

1. PRG 数据全部从 asm `.byte` 提取为声明式 TS 表（具名字段），禁止 `PRG_BANK_XX[addr-0xC000]`。
2. Service 只通过本域 Table 具名查询（`PlayerTable.findById` 等）。
3. 运行时数据统一走 `DataStore`（Redis 风格 KV：`store.read('ram_0601')` / `store.write(...)`）。
4. 跨 bank 共享 RAM 地址（球员 `ram_0601+`、状态 `ram_0606+`、位置 `ram_060B+`、战术 `ram_0610+X`、
   HUD `ram_046F+`、经验 `ram_0454+idx*2`）与消费方一致，禁止自创。
5. MMC3 寄存器写（`STA $8000/$8001`、`JSR $C4B9`）翻译后直接省略，改为对应 Service 方法调用。

---

## 迭代版本规划（每个版本可运行、可演示、可提交）

### V0.1 — 骨架启动（本次交付）
- 全量 Service/Scene stub 编译通过（`npx tsc --noEmit` 零错误）。
- `DataStore`（KV RAM）+ RAM 初始化表（bank30 Reset 真实值）。
- Boot 链路真实翻译：`Reset($C64E) → scene dispatch($CEFE/$C400) → Bank02 场景入口($A200)`。
- NMI 真实语义：OAM DMA、$05E8 渲染缓冲、调色板、滚动、CHR bank 配置。
- 页面：微信小程序 `pages/index` + HTML 测试台 `index.html` + `test/main.ts`。
- 验收：编译 0 错误；boot 后 RAM 状态与 asm 一致；画面可渲染真实调色板/开场。

### V0.2 — 数据层（内容移植）
- 从 asm 提取全部数据表：调色板、字符集(CharMap)、脚本(TextScript)、球员表、队伍表、
  技能表、比赛配置表、升级表、SE/BGM 指针表、地图/NT 数据。
- 提取脚本（node `.cjs`）一次性使用，输出 `data/tables/*.ts`；差分验证 0 差异后删除脚本。
- 验收：每张表 vs asm 字节 0 差异；编译 0 错误。

### V0.3 — 开场/标题链路
- `OpeningSceneController`：开场动画真实渲染（NT 数据 + 调色板渐显 + OAM 精灵）。
- `TitleSceneController`：标题画面 + 菜单交互（新游戏/继续/密码）。
- 输入映射：Controller → ram_001B~001E 状态位（真实按键语义）。
- 验收：进入开场 → 标题，按键流转与原始一致。

### V0.4 — 剧情脚本引擎
- `ScriptEngine`/`ScriptOpcodes`/`ScriptLoader`/`CharMap` 完整 opcode 执行。
- 剧情文本逐段播放（打字、等待、选项），与 bank03-10/18/19 脚本数据一致。
- 验收：指定剧情段播放输出与模拟器双跑 0 差异。

### V0.5 — 比赛引擎
- `MatchEngineService`/`MatchTurnService`/`MatchHudService`/`MatchConfigService`/`MatchAuxService`：
  阵容 → 开球 → 回合 → 传球/射门/必杀 → 进球 → 终场。
- `SkillService`（必杀技）、`SpriteService`/`SpriteAnimationService`（精灵渲染）。
- 验收：完整比赛流程可玩，HUD/比分/球员状态真实。

### V0.6 — 音频引擎
- `AudioService`：$0700 音频请求队列 → APU 寄存器写，BGM/SE 真实播放。
- 验收：开场 BGM、标题 SE、比赛音效与原始一致。
- 状态：✅ 请求队列消费 + startBgm(指针表+通道初始化) + bgmTick(音符推进+APU写) + channelOutput(音高→频率) + ApuPcmRenderer(Pulse/Triangle/Noise 合成) + 翻译版 WAV 渲染已出声；⚠️ 频率计算需修正(波形单一值) + BGM 命令流($84DA 32命令) + SE启动($8349) + vibrato/arpeggio + 包络 待完善。

### V0.6.1 — 音频引擎完善
- F2: BGM 命令流解析（$83CB/$84DA 跳转表 32 命令：音符/音量/速度/包络/跳转/循环）
- F3: SE 启动逻辑（$8349：SE 指针表 + 通道分配 + 数据流解析）
- F4: 音符频率表索引修正（pitch → $8754 表正确偏移，当前波形单一值）
- F5: 包络/衰减（$07CF-$07DE 通道包络递推）
- F6: Vibrato（$8269 跳转表 10 模式）+ Arpeggio（$82E4 跳转表 8 模式）
- F7: DPCM 采样回放（$8698/$86B7/$86D6 三组采样）
- F8: 渲染 105 首 WAV 到 output/ 与模拟器版对比差分
- 验收：翻译版 WAV 与模拟器版 WAV 听感一致，频率/节奏/音色匹配

### V0.7 — 全链路 + 优化
- 全链路串通（boot→开场→标题→剧情→比赛→终场→密码选关）。
- 性能优化、包体积、小程序真机适配。
- 验收：完整游戏可玩。

---

## WBS 任务表

| ID | 版本 | 任务 | 产出 | 状态 |
|----|------|------|------|------|
| A1 | V0.1 | 迭代方案文档 | WBS_PLAN.md / DEVLOG.md | ⬜ |
| A2 | V0.1 | src/game/prg 骨架（全量 stub） | prg/code/*, prg/data/* | ⬜ |
| A3 | V0.1 | DataStore + RAM 初始化表 | data/store/DataStore.ts, tables/ram-init-table.ts | ⬜ |
| A4 | V0.1 | Reset→场景调度→NMI 链路翻译 | system/HardwareInitService, BootRouter, InterruptService | ⬜ |
| A5 | V0.1 | 页面创建（小程序+HTML） | pages/index, test/main.ts | ⬜ |
| A6 | V0.1 | 编译验收 + git 提交 | tsc 0 错误 | ⬜ |
| B1 | V0.2 | 调色板/字符集/文本脚本表 | data/tables/* | ✅ |
| B2 | V0.2 | 球员/队伍/技能/比赛配置表 | data/tables/* | ✅ |
| B3 | V0.2 | SE/BGM 指针表 + 地图 NT 数据 | data/tables/*, data/scene/* | ✅ |
| C1 | V0.3 | 场景 0 真实渲染（按 ID 组织） | code/scene/Scene0Controller.ts | ✅ |
| C2 | V0.3 | 场景表 24 项行为确认 + 按 ID 分发 | code/scene/SceneTable.ts, system/BootRouter.ts | ✅ |
| C3 | V0.3 | 场景 15+ 长场景翻译（NT 缓冲/精灵） | code/scene/Scene15Controller.ts 等 | ✅ |
| D1 | V0.4 | ScriptEngine opcode 全集 | code/story/ScriptEngine.ts | ✅ |
| D2 | V0.4 | 剧情数据装载与播放 | code/story/ScriptLoader.ts | ✅ |
| E1 | V0.5 | 比赛引擎核心 | code/match/* | 🔄 |
| E2 | V0.5 | 必杀技 + 精灵渲染 | code/skill, code/sprite | 🔄 |
| F1 | V0.6 | 音频请求队列 → APU | code/audio/AudioService.ts | ✅ |
| F2 | V0.6.1 | BGM 命令流解析（$84DA 32命令） | code/audio/AudioService.ts | ⬜ |
| F3 | V0.6.1 | SE 启动逻辑（$8349） | code/audio/AudioService.ts | ⬜ |
| F4 | V0.6.1 | 音符频率表索引修正 | code/audio/AudioService.ts | ⬜ |
| F5 | V0.6.1 | 包络/衰减递推 | code/audio/AudioService.ts | ⬜ |
| F6 | V0.6.1 | Vibrato + Arpeggio | code/audio/AudioService.ts | ⬜ |
| F7 | V0.6.1 | DPCM 采样回放 | code/audio/ApuPcmRenderer.ts | ⬜ |
| F8 | V0.6.1 | 渲染 105 首 WAV 差分验证 | output/*.wav | ⬜ |
| G1 | V0.7 | 全链路 + 优化 + 真机 | — | ⬜ |

---

## 第二阶段 V1.0+ — UI 具象化（消费已翻译数据）

> 目标：将已提取的数据表（LEVEL_UP_TABLE/PLAYER_TABLE/TEAM_TABLE/MATCH_CONFIG_TABLE 等）
> 具象化为 UI Service + 页面渲染组件，外部页面可直接调用具名 API。
>
> 原则：
>   - 禁止再写 `BANK_XX[addr-0xC000]` 索引；只通过 `data/tables/*` 访问
>   - UI Service 只读 DataStore + 具名 Table 查询；不改 RAM（除非模拟按键交互）
>   - 每个 Service 提供 drawXxx() 文本输出接口（NT 缓冲）+ 状态机 onEnter/onUpdate/onExit

|| ID | 版本 | 任务 | 产出 | 状态 |
|----|------|------|------|------|
| U1 | V1.0 | LevelUp 界面（赛后能力展示） | code/ui/LevelUpUiService.ts | ✅ |
| U2 | V1.0 | MatchResult 界面（终场比分/XP） | code/ui/MatchResultUiService.ts | ⬜ |
| U3 | V1.0 | Title 主菜单 | code/ui/TitleMenuUiService.ts | ⬜ |
| U4 | V1.0 | TeamSelect 队伍选择 | code/ui/TeamSelectUiService.ts | ⬜ |
| U5 | V1.0 | PlayerProfile 球员信息卡 | code/ui/PlayerProfileUiService.ts | ⬜ |
| U6 | V1.0 | StaminaBar 体力条组件 | code/ui/StaminaBarComponent.ts | ⬜ |
| U7 | V1.0 | PasswordMenu 密码选关 | code/ui/PasswordMenuUiService.ts | ⬜ |
| U8 | V1.0 | TournamentBracket 赛程图 | code/ui/TournamentBracketUiService.ts | ⬜ |
| U9 | V1.0 | StoryScene 剧情对话面板 | code/ui/StoryPanelUiService.ts | ⬜ |
| U10 | V1.0 | SkillHelp 必杀技说明面板 | code/ui/SkillHelpUiService.ts | ⬜ |
| U11 | V1.1 | Savedata 存档读写界面 | code/ui/SaveDataUiService.ts | ⬜ |
| U12 | V1.1 | Settings 设置面板 | code/ui/SettingsUiService.ts | ⬜ |

---

## bank16-29 翻译任务表（行为语义去 CPU 化）

> 任务范围：bank16-29，按 asm `_full.s` 逐 bank 翻译为 Service（行为）+ Table（数据）。
> 原则：bank 切换 = import + 直接调用；禁止 `bankSwitch/mmc3Map/readMem/setPrgBank`。
> 分类：**Code bank**（含 code_main.s：16/19/20/22/24/26/27/28）→ Service + 数据表；
> **Data bank**（仅 data_tables/maps/tail.s：17/18/21/23/25/29）→ 声明式数据表。

| ID | Bank | 类型 | 任务 | 产出 | 状态 |
|----|------|------|------|------|------|
| H1 | 16 | Code | 必杀技/技能判定 Service + 技能数据表 | code/skill/SkillService.ts(覆盖), data/tables/skill-table.ts | ⬜ |
| H2 | 17 | Data | 脚本段/NT 数据表（data_maps+tables+tail） | data/scene/bank17-data.ts | ⬜ |
| H3 | 18 | Data | NT 地图数据表 | data/scene/bank18-data.ts | ⬜ |
| H4 | 19 | Code | 精灵/比赛场景数据 Service + 精灵帧表 | code/sprite/SpriteFrameService.ts, data/tables/sprite-frame-table.ts | ⬜ |
| H5 | 20 | Code | 比赛事件 Service（射门/传球/必杀动画）+ 事件数据表 | code/match/MatchEventService.ts, data/tables/match-event-table.ts | ⬜ |
| H6 | 21 | Data | NT 地图数据表 | data/scene/bank21-data.ts | ⬜ |
| H7 | 22 | Code | 球员移动/AI Service + 移动数据表 | code/player/PlayerMoveService.ts, data/tables/player-move-table.ts | ⬜ |
| H8 | 23 | Data | NT 地图数据表 | data/scene/bank23-data.ts | ⬜ |
| H9 | 24 | Code | 比赛回合/战术 Service + 回合数据表 | code/match/MatchRoundService.ts, data/tables/match-round-table.ts | ⬜ |
| H10 | 25 | Data | NT 地图数据表 | data/scene/bank25-data.ts | ⬜ |
| H11 | 26 | Code | 比赛主引擎 Service（核心状态机）+ 比赛配置表 | code/match/MatchEngineService.ts(覆盖), data/tables/match-config-table.ts(覆盖) | ⬜ |
| H12 | 27 | Code | 球员名字/文本 Service + 名字数据表 | code/player/PlayerNameService.ts, data/tables/player-name-table.ts | ⬜ |
| H13 | 28 | Code | 比赛动作/指令 Service + 动作数据表 | code/match/MatchActionService.ts, data/tables/match-action-table.ts | ⬜ |
| H14 | 29 | Data | NT 地图数据表 | data/scene/bank29-data.ts | ⬜ |

---

## 开发纪律

1. 先写 stub（类声明 + 方法签名 + TODO），保留导出契约，再逐个覆盖实现。
2. 每批 `npx tsc -p tsconfig.json --noEmit` 零错误。
3. 复杂扫描写临时 `.cjs` 用 `node` 执行，用完删除；不用 PowerShell 写脚本。
4. 只动自己负责的业务域。
5. 提交：`git add . && git commit -m "..." && git push`。
6. 卡点/已知 BUG 记录到 `DEVLOG.md`，不遗留。
