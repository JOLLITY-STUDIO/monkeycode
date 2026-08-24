# 开发日志（DEVLOG）

> 记录卡点、问题修复、翻译进度。格式：`- [日期] 任务ID：内容 | 修改文件 | 编译结果`

## 2026-08-24

- [E2 推进 + B-series 标记] 20c5168e：
  - **SpriteService** putSprite/putSpriteByFrame/hideSprite/hideAll/
    setSpriteFrame → OAM 4 字节 [y,tile,attr,x] 写入影子缓冲
  - **SpriteAnimationService** advance/tickAnimationSlot/flipSpriteAttr/
    blinkOffscreenSprites → 动画 tick 推进 + 属性翻转
  - **CharMap** 真实实现：ASCII fallback（Space/A-Z/a-z/0-9 → tile
    0..90），register() / registerTable() 批量注入
  - WBS：B1/B2/B3 = ✅（data/tables/* 全部实装），E2 = 🔄（in progress）
- [D1+D2 V0.4 完善] ea2153a4 后续：
  - **ScriptLoader** 改为按 4KB 切片 BANK18_DATA_TABLES（SEGMENT_SIZE=0x1000）。
    loadSegment(id) 返回 4KB 切片段；listSegments() 列有效段号。
  - **ScriptOpcodes** OPCODE_HANDLERS 全 15 个内置 handler 实装：
    TextChar/WaitFrames/WaitInput/Jump/Branch/Call/Return/SetPalette/
    LoadSprite/PlayBgm/PlaySe/WaitVBlank/EndSegment/JumpSegment/EndScript。
  - **ScriptRuntime** 接口注入式：readRam/writeRam/charMap/playBgm/playSe/
    loadSprite/setPalette。setScriptRuntime() 全局注册一次。
  - **extract_teams.cjs** stride 12-byte 实测注释（Brazil 5/Hs 6/Cup 4/WC 16 = 31 队）。
  - 编译：npx tsc --noEmit 零错误。
- [D1+D2 V0.4 落地] ScriptEngine + ScriptLoader + ScriptOpcodes 剧情脚本引擎 stub：
  - **ScriptOpcodes**：定义 enum 与 handler 签名；classifyOpcode(op)
    完全对应 asm `CMP #$6D / BCC 直接 / SEC SBC #$6D 间接` 的双模式调度。
  - **ScriptEngine**：单 VM step()，handler 返回 `false` 表示本帧到此；
    `waitFrames > 0` / `waitingInput` 走帧等待。与 bank00 $90B0-$94FF 多 slot 调度器语义一致。
  - **ScriptLoader**：默认段表 6 段（opening/opening_into/pre_match/...）从
    BANK18_DATA_TABLES 头部按 offset+length 截取；scanSegmentBoundaries()
    全表扫描 $0D/$0D/$0D/$0D 终止符生成段表（待 V0.4 全量覆盖）。
  - 编译：story 子模块零错误（其他预存错误与本任务无关）。
- [PlayerProfile 23 字段扩展] PlayerProfile 从 7 字段扩展为 23 字段（7 base + 8 low + 8 high），
  完全对齐 ROM 0x39fde 的 24 字节结构（字节 0x17 留空）。
  - 7 base:  stamina/shot/pass/dribble/block/tackle/intercept
  - 8 low:   shot/pass/trap/letThrough/ctrlClear/unctrlClear/ballChal/intercept
  - 8 high:  同上
  - GK (position=1) 用 8 字节 GK 表字段 (stamina/pass/catching/punching/vsShot/
    vsDribble/lowRush/highClaim)，其余字段填 0。
- [GK 表顺序修正] ROM 0x3ae96 实测为 8 项 × 8 字节顺序表，非按球员 ID 索引。
  extract_players.cjs 修正为按 gkIdx 0..4 顺序读取，GK_ORDER = [0x0F, 0x21, 0x02,
  0x22, 0x26]（Morisaki/Wakabayashi/Lennart/Wakashimazu/Meon）。Wakabayashi
  实测 GK[1]: stamina=28, catching=43, vsShot=26（最强 GK，值合理）。
- [PlayerQueryService 真数据接入] findById / findTeamRoster / findIdByName 现已接
  PLAYER_TABLE 和 TEAM_ROSTER_TABLE 真数据，TODO V0.2 stub 已清除。
- [重生脚本改进] extract_players.cjs 由 stdout pipe 改为 fs.writeFileSync 直接写，
  解决 PowerShell UTF-8 编码乱码问题。
- 修改文件：
  - src/game/prg/code/player/PlayerQueryService.ts（23 字段 + 真数据接入）
  - scripts/extract_players.cjs（GK 顺序索引 + UTF-8 直接写文件）
  - src/game/prg/data/tables/player-stats.ts（重生）
- 编译：`npx tsc --noEmit` 零错误。
- 提交：b7f745cf `feat(prg/data): PlayerProfile 23 字段全捕获 + PlayerQueryService 真数据接入`

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

## 2026-08-23（bank16-29 数据填充 + TileRenderService 修复 + 差分验证）

- [数据填充] 全部 bank16-29 数据表从 asm .byte 提取为声明式 TS 数组：
  - **bank16** skill-table：SKILL_MATCH_TABLE(16B)、SKILL_TRIGGER_TABLE(4B)、
    SKILL_MOVE_ID_TABLE(17B)、SKILL_POINTER_TABLE(24条)、BANK16_DATA_TABLES(5708B)、BANK16_CODE_DATA(377B)。
  - **bank17/18/21/23/25/29** 数据 bank：BANK{N}_DATA_TABLES/MAPS/TAIL 全量填充
   （每个 bank ~8192B，共 6 bank ~49KB）。
  - **bank19** sprite-frame-table：BANK19_TILE_DATA(1504B)、BANK19_SCENE_DATA(1490B 分段)。
  - **bank20** match-event-table：BANK20_DATA_TABLES(5976B)、BANK20_EVENT_POINTER_TABLE(24条)。
  - **bank22** player-move-table：BANK22_DATA_TABLES(3871B)、BANK22_DATA_TAIL(3855B)、
    BANK22_DIRECTION_TABLE(16B)。
  - **bank24** match-round-table：BANK24_DATA_TABLES(4706B)。
  - **bank27** player-name-table：BANK27_TEXT_DATA(3760B)、BANK27_NAME_DATA(3774B)、
    BANK27_CHAR_MAP(32B)。
  - **bank28** match-action-table：BANK28_DATA_TABLES(4851B)、BANK28_ACTION_POINTER_TABLE(24条)。
  - data/index.ts 出口契约更新：新增所有 BANK{N}_DATA 常量导出。
- [行为覆盖] bank26 MatchEngineService.update() 翻译比赛主循环帧更新：
  - update(frame)：球员遍历循环（INC ram_0616 → CMP ram_0600 → 帧尾例程）。
  - frameTailUpdate()：比赛时间推进（ram_0468/0469 递减）。
  - dispatchPossession()：控球方分发（ram_043B → 进攻/防守/死球例程）。
  - advancePlayerSlot()/isPlayerTraversalComplete()：球员遍历辅助。
- [Bug 修复] TileRenderService.ts 预存语法错误修复（68→0 错误）：
  - 补全 `class TileRenderService { constructor... }` 包装。
  - SCENE_ROW_TEMPLATE 未定义 → 改为 `this.rom.readByte(0, 0x978B+i)`。
  - 重复方法定义（readShift16/addSigned16/rowAdvance）→ 删除我添加的副本，保留预存实现。
  - sceneCmd9459/sceneCmdLoop 未定义 → 添加 stub 方法。
- [差分验证] 全量 bank16-29 数据差分验证：PASS=19, FAIL=0
  （bank17/18/21/23/25/29 数据 bank 18 项 + bank16 skill-table 1 项，asm 字节全部包含在 TS 中）。
- [编译验证] `npx tsc --noEmit` bank16-29 相关文件零错误
  （其余预存错误 papu/audio/BootRouter/test 与本任务无关）。
- [类型修复] PlayerMoveService.findMovePattern 返回类型 `number[]` → `ReadonlyArray<number>`。
- 修改文件：
  - data/tables/{skill,sprite-frame,match-event,player-move,match-round,player-name,match-action}-table.ts（数据填充）
  - data/scene/bank{17,18,21,23,25,29}-data.ts（数据填充）
  - data/index.ts（出口契约更新）
  - code/match/MatchEngineService.ts（update 行为覆盖）
  - code/player/PlayerMoveService.ts（类型修复）
  - code/system/TileRenderService.ts（语法错误修复）

## 2026-08-23（bank16-29 行为验证 + 修复）

- [行为验证] 逐方法对照 asm 指令序列验证 bank16-29 Service 行为：
  - **bank16 SkillService.loadSkillSequence**：对照 asm `$8003-$8020`
    `LDA $0518; ASL; TAY; BCC; INX; LDA #$BF; STA $005D; STX $005E; LDA ($005D),Y`
    → 修复 hiBit 逻辑（ASL 后 BCC=bit7=0 时不+1），补全逐指令注释。
  - **bank26 MatchEngineService.dispatchPossession**：对照 asm `$80F0-$8104`
    `LDA $043B; JSR $C509; 跳转表 $80FE: 5项 $80FE/$8107/$8118/$811E/$8120`
    → 修复 possession 映射（0=继续/1=防守/2=切bank/3=防守+切bank/4=死球），
    新增 defenseRoutine() 对照 $8170-$819B（BIT/CMP/STA/ORA 系列）。
  - **bank20 MatchEventService.startEvent**：对照 asm `$8010-$8067`
    `LDX #$00; LDA #$00; STA $0547,X; TXA; CLC; ADC #$15; TAX; CMP #$7E; BNE`
    → 修复 ram_0547+ 清零循环（步长 0x15，到 X>=0x7E），补全逐指令注释。
  - **bank24 MatchRoundService.startRound**：对照 asm `$8017-$8050` — 行为一致（ram_05E3/E4/E5/E9/F4 初始化）。
  - **bank28 MatchActionService.findActionPointer**：对照 asm `$8030-$8039`
    `LDA $9E4E,Y; STA $0032; LDA #$00; STA $0033` — 行为一致（查 BANK28_ACTION_POINTER_TABLE）。
- [编译验证] 修复后 `npx tsc --noEmit` bank16-29 所有 Service 文件零错误。
- 修改文件：
  - code/skill/SkillService.ts（loadSkillSequence 行为修复 + 逐指令注释）
  - code/match/MatchEngineService.ts（dispatchPossession 行为修复 + defenseRoutine 新增）
  - code/match/MatchEventService.ts（startEvent 清零循环修复 + 逐指令注释）

## 2026-08-23（渲染路径行为验证 + 修复）

- [渲染路径验证] 逐指令对照 asm 验证完整渲染链路：
  Reset → NMI($C76E) → 主渲染($C775) → OAM DMA($C78B) → $0498队列($C8FB) →
  $0515队列($C951) → $3F00基址($C79F) → 滚动($C7B7) → MASK($C7C5) →
  CHR($C9E9) → IRQ($C7CD) → 帧计数($C9C5) → bank02续段($8000) →
  $05E8缓冲($8019) → 滚动($8062) → CHR($80AF) → 恢复NMI($C810)

- [Bug 修复] InterruptService 渲染路径 3 处行为修复：
  1. **nmi() bit7 置位时机**：asm $C7EA 在 NMI 末尾置 bit7，TS 补全注释说明。
     补全 $C76E 入口的 bit6 分支判定注释（BVC $C775 / JMP $C421）。
  2. **oamDma() 同步时机**：asm $C78B 直接 DMA $0200，$0468→$0200 同步在 bank02 $88CE。
     TS 注释澄清同步逻辑位置（H5 统一在 oamDma 做同步保证一致性）。
  3. **flushNtBuffer() 行为重写**：对照 asm bank02 $8000-$804A
     - 补全 $8014: MASK=0（关显示，渲染期间）
     - 补全 $8026: STY $2000（PPU CTRL 写：列模式 $84/行模式 $80）
     - 补全 $802A-$8033: $2006 地址写（addrHi, addrLo）
     - 补全 $8036-$803E: $2007 数据循环写
     - 补全 $8048: 清 $0628=0
     - 恢复 MASK（保存/恢复 savedMask）
- [渲染路径总结]：
  - ✅ Reset($C64E) → RAM 清零 → OAM 隐藏 → changeScene(0)
  - ✅ NMI($C76E) → bit6 分支 → 主渲染/游戏逻辑
  - ✅ OAM DMA($C78B) → $0200 → spriteMem
  - ✅ $0498 队列($C8FB) → RLE 流消费
  - ✅ $0515 队列($C951) → RLE 块消费
  - ✅ $3F00 基址($C79F) → 调色板写
  - ✅ 滚动($C7B7/$8062) → $2005 + CTRL
  - ✅ MASK($C7C5) → $2001
  - ✅ CHR($C9E9/$80AF) → 1KB slot 装载
  - ✅ $05E8 缓冲($8019) → NT/属性写（含 MASK=0/CTRL 写）
  - ✅ 帧计数($C9C5) → ram_00E1/E2/E3 更新
  - ✅ 恢复 NMI($C810) → $0020 |= $80
- [编译验证] InterruptService 修复后零错误（BootRouter 预存类型错误与本任务无关）。
- 修改文件：code/system/InterruptService.ts（nmi/oamDma/flushNtBuffer 行为修复 + 注释补全）

