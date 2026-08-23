# 开发日志（DEVLOG）

> 记录卡点、问题修复、翻译进度。格式：`- [日期] 任务ID：内容 | 修改文件 | 编译结果`

## 2026-08-23

- [A1] 迭代方案落地：WBS_PLAN.md 编写完成（V0.1-V0.7 版本规划 + A-G 任务表）。
- [A2] 开始构建 `src/game/prg` 全量骨架（新命名规范 v2，Java/Spring 风格）。
  - 发现：`src/game/index.ts`、`prg/code/index.ts` 引用了大量不存在的 Service（旧命名 Bank00Service 等），
    以及 `src/core/nes-ram`、`src/game/rom.ts` 缺失 → 全部需要重建。
  - 决定：按 v2 命名规范重建（`GameSystemService`/`BootRouter`/`HardwareInitService`/`InterruptService` 等）。
- [A4] Boot 链路分析（bank30/bank02/bank00 asm）：
  - Reset `$C64E`：PPU/APU 初始化、RAM $0000-$07FF 清零、ram_0020=$08/ram_0021=$06、
    `JSR $CB35`（清 NT0/NT1）、`JSR $CB8B`（OAM 全 $F8 隐藏）、`LDA #$00; JMP $CEFE`。
  - `$CEFE`：关 IRQ、隐藏 OAM、清 NT、关 NMI → `JMP $C400` → 设置 PPU + 切 bank → `JMP $A200`（bank2 场景入口）。
  - NMI `$C76E`：`ram_001B` bit6 决定走主 NMI（$C775：OAM DMA、$0498 渲染缓冲、调色板、滚动、CHR bank）或
    游戏逻辑 NMI（$C421：切 bank 调用帧更新）。
  - Bank02 `$8000`：NMI 渲染子程（$05E8 缓冲格式：`count|0x80, addrHi, addrLo, tile...`，0 终止），
    滚动（ram_0079/007A/007B/0044）、手柄读取（$4016/$4017 → ram_001B~001E）。
- [A5] 页面创建计划：小程序 `pages/index`（canvas 渲染 + touch 输入）、HTML 测试台 `index.html` + `test/main.ts`。
- [A2/A3 落地] V0.1 骨架完成（新命名规范 v2）：
  - `src/game/prg/`：`code/`（system/scene/story/player/team/match/skill/sprite/audio 全部 Service stub）
    + `data/`（store/DataStore、tables/ 全表 stub）+ `index.ts` 出口契约重写。
  - `src/game/index.ts`：Tsubasa2 组合根（DataStore → InputService → BootRouter + 各场景注册 → InterruptService）。
  - `src/game/runtime/`：`GameRuntime.ts`（PpuRenderTarget/FrameTarget 结构契约）+ `HeadlessRuntime.ts`
    （无头 PPU 运行平台：core PPU + Mapper4 初始 CHR 装载 + 控制器，不跑 CPU）。
- [A3 关键修复] 无头渲染链路：
  - `HeadlessRuntime` 补 `setMirroring(HORIZONTAL_MIRRORING)`（此前未调用 → `ntable1` 未初始化 → `renderBgScanline` 崩溃）。
  - `Tsubasa2.frame()` 从 `NES` 类改为结构化 `FrameTarget` 契约（controllers + ppu），外部即插即用。
  - core PPU 数据成员（buffer/spriteMem/reg*）在构造器内赋值，不在类类型中 → 以 `PpuRenderTarget` 结构性类型 + cast 适配。
- [A5 落地] 页面创建：
  - 小程序 `pages/tsubasa2/tsubasa2.{ts,wxml,wxss,json}`：256×240 type=2d Canvas + 虚拟手柄（触摸 → setButton）。
  - HTML 测试台 `test/main.ts`：键盘/鼠标手柄、冒烟/集成/输入/性能/边界测试、截图、报告导出。
  - `typings/wx.d.ts`：小程序全局类型最小集（Page/App/wx）。
- [A6 验证] boot 冒烟（esbuild 打包 + node 无头运行）：
  - `BOOT_SMOKE scene=0 ctrl=8 mask=1e oam0=f8 f5_nmi=1 bufNonZero=53760` →
    Reset 链路 / 场景调度(Opening) / NMI 标志 / CHR+镜像渲染全部工作（全屏深灰 = NTSC 调色板索引 0 正常行为）。
  - `npx tsc --noEmit` 零错误。

## 已知问题 / BUG

- 无遗留问题（进行中任务见 WBS_PLAN.md）。

## 下一步

- V0.2：bank01 球员数据表 + PlayerQueryService 真实翻译；bank30 清 NT（$CB35）/OAM 隐藏（$CB8B）对照实现。
- V0.3-C3：场景 15（$A651 NT 缓冲写入长场景）/16（精灵放置）/19/22/23 逐一翻译，覆盖 SceneTable 的 stub。
- V0.4：Story 场景 + ScriptEngine 脚本 VM 翻译（bank18/19 剧情数据提取）。

## 2026-08-23（V0.3-C2 场景表重构）

- [C2 落地] 按用户要求重构：**场景按 ID 组织，不按业务语义命名**（删除 opening/title/password/result/story 语义命名）：
  - 新建 `code/scene/SceneTable.ts`：24 项场景条目（jumpAddr/entryAddr/behavior），行为全部逐指令对照
    `bank02/code_sub.s` + `code_data.s` 确认，不臆测语义。关键确认：
    - 场景 1（$A55A）是数学工具（$00EC>>2 取补 → 返回 3），**不是标题**。
    - 场景 2（$A57C）JSR $9B91 清精灵扩展表 → 返回 2；场景 3（$A582）清 NT0/NT1 → 返回 2；
      场景 4（$A5A3）JSR $9B7F 隐藏 OAM → 返回 2；场景 5/6 为 $0009 延迟/标志工具；场景 7-13 为
      单指令/装载工具（$99=$FF、ram_001B bit6、$8895 CHR + $8920 场景数据）；场景 14 为 NT 属性+调色板+精灵；
      场景 15（$A651）为 NT 缓冲写入长场景（$AA97 表 → $05E8）；场景 16（$A69D）精灵放置；
      场景 17/21 为 $8895 CHR 装载；场景 18/19/20/22 为精灵等待/闪烁/装载；场景 23 数值显示。
  - `OpeningSceneController` → `Scene0Controller`（按 ID 命名，实现保留）；删除 Title/Password/Result/Story 四个
    语义命名 stub（其行为已被场景表确认覆盖）。
  - `BootRouter` 改为场景表驱动：注册场景 0 真实控制器，其余 1-23 自动走默认 stub（留在当前场景），
    待逐个覆盖。
  - `code/index.ts` / `game/index.ts` 导出与组装同步更新。
  - 验证：`npx tsc --noEmit` 零错误；无头运行 900 帧 scene 0→2 流转正常（frame≈480），
    ram_001B bit0 置位/清除时序正确。

## 2026-08-23（V0.3-C1）

- [C1 落地] OpeningSceneController 开场场景 0 真实翻译（对照 bank02/code_sub.s $84C1-$8559）：
  - `SceneController.onUpdate` 契约改为返回 `number | undefined`（对应原版场景末尾 `LDA #next; RTS` 的下一个场景号）。
  - `BootRouter`：SceneId 补齐 24 项跳转表（$A491：$A4C0/$A559/$A57B/$A581/.../$A7FA）；changeScene 补 $CEFE/$C400 前置
    （关 IRQ / 隐藏 OAM / 清 NT / PPU CTRL=$08 / MASK=$1E）；update 处理 onUpdate 返回值自动换场景。
  - `RenderingPrimitivesService` 补齐原语：`fadeBgStep`($9A0D)、`fadeOutStep`($99F0)、`loadPalettesAndFade`($9A35)、
    `loadSceneData`($8920)、`loadChrConfig`($8AF7 配置副作用)、`queueScene3NametableRows`（场景 3 背景 24×32 tiles 逐行写 $05E8）。
  - OpeningSceneController 状态机：渐显 → 等 16 帧 → 0x30 次 OAM 下漂 → 场景 3 NT 装载 → 等 4 帧 → 调色板+精灵翻转 →
    滚动循环（INC $79; DEC $7C×2; $44-=2 until <3）→ ram_001B bit0 置位 → 等 240+60 帧 → 清 bit0 → 渐隐 →
    隐藏 OAM → 清 NT → $23C0 填 $55 → 场景 1 数据 → `LDA #$02; RTS`。
  - 无头验证（900 帧）：scene 0→2 于 frame≈480 流转完成；ram_001B bit0 时序正确（$81 于等待期→$80 清除）；
    ram_0044 $68→$02（滚动结束）；ram_0048=$01（$8AF7 装载）；画面有渲染像素。
- 修改文件：src/game/prg/code/scene/{SceneController,OpeningSceneController,Title,Password,Result,Story}*.ts、
  src/game/prg/code/system/{BootRouter,RenderingPrimitivesService}.ts、src/game/index.ts、WBS_PLAN.md。
- 编译：`npx tsc --noEmit` 零错误；lint 零错误。

## 2026-08-23（bank16-29 翻译）

- [H1-H14] bank16-29 全量 stub + 行为翻译（去 CPU 化）：
  - **bank16**（Code）：SkillService 覆盖 — 必杀技/技能判定（loadSkillSequence/parseSkillSegment/checkSkillTrigger/findSkillActionId）+ skill-table 覆盖（SKILL_POINTER_TABLE/SKILL_MOVE_ID_TABLE/SKILL_TRIGGER_TABLE）。
  - **bank17/18/21/23/25/29**（Data）：纯数据 bank stub — data/scene/bank{17,18,21,23,25,29}-data.ts
    （BANK17_DATA_TABLES/MAPS/TAIL 声明式数组契约，待逐段 .byte 提取）。
  - **bank19**（Code）：SpriteFrameService 新建 — 精灵帧/比赛场景数据（loadSpriteFrame/parseSpriteSegment/loadSceneTiles）
    + sprite-frame-table（BANK19_SPRITE_FRAMES/TILE_DATA/SCENE_DATA）。
  - **bank20**（Code）：MatchEventService 新建 — 比赛事件（startEvent/updateEvent/parseEventSegment/resolveEventFlag）
    + match-event-table（BANK20_EVENT_TABLE/POINTER_TABLE）。
  - **bank22**（Code）：PlayerMoveService 新建 — 球员移动/AI（computeMove/parseMoveSegment/processDirection/findMovePattern）
    + player-move-table（BANK22_MOVE_TABLE/DIRECTION_TABLE）。
  - **bank24**（Code）：MatchRoundService 新建 — 比赛回合/战术（startRound/updateRound/parseRoundSegment/resolveRoundFlag）
    + match-round-table（BANK24_ROUND_TABLE/POINTER_TABLE）。
  - **bank26**（Code）：MatchEngineService 覆盖 — 比赛主引擎（startMatch/loadPlayerSlots/getPlayerSlot/loadPlayerData/swapPlayers）
    + match-config-table 覆盖（MATCH_CONFIG_TABLE/durationMinutes）。
  - **bank27**（Code）：PlayerNameService 新建 — 球员名字/文本（getPlayerName/parseNameSegment/loadNameAddress/getTextSegment）
    + player-name-table（BANK27_NAME_TABLE/TEXT_TABLE/CHAR_MAP/NAME_ADDR_TABLE）。
  - **bank28**（Code）：MatchActionService 新建 — 比赛动作/指令（executeAction/findActionPointer/parseActionParam/computeActionAddr/resolveActionType）
    + match-action-table（BANK28_ACTION_TABLE/POINTER_TABLE）。
  - code/index.ts 出口契约更新：新增 7 个 Service 导出 + 类型导出。
  - data/index.ts 出口契约更新：新增 7 套数据表 + 6 个数据 bank 导出。
- 翻译原则遵守：
  - bank 切换语义 = import + 直接调用，无 bankSwitch/mmc3Map/readMem/setPrgBank。
  - 数据从 asm .byte 提取为声明式 TS 表（具名字段），禁止 PRG_BANK_XX[addr] 索引。
  - RAM 访问统一走 DataStore（KV 风格 store.read/write）。
  - 先 stub 保留 TODO，再逐段覆盖（避免一次性写入卡死）。
- 编译验证：`npx tsc --noEmit` 仅 `TileRenderService.ts` 预存语法错误（与本任务无关），
  bank16-29 新增文件零错误。
- 修改文件：
  - code/skill/SkillService.ts（覆盖）
  - code/sprite/SpriteFrameService.ts（新建）
  - code/match/MatchEventService.ts, MatchRoundService.ts, MatchActionService.ts（新建）
  - code/match/MatchEngineService.ts（覆盖）
  - code/player/PlayerMoveService.ts, PlayerNameService.ts（新建）
  - data/tables/skill-table.ts（覆盖）, match-config-table.ts（覆盖）
  - data/tables/{sprite-frame,match-event,player-move,match-round,player-name,match-action}-table.ts（新建）
  - data/scene/bank{17,18,21,23,25,29}-data.ts（新建）
  - code/index.ts, data/index.ts（出口契约更新）
  - WBS_PLAN.md（新增 bank16-29 任务表）

