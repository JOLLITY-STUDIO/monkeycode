# 天使之翼2 (Captain Tsubasa 2) H5 转写项目计划与任务跟踪（WBS）

> 按 PRG Bank 细分，每个 Bank = Service（业务逻辑）+ Data（数据模型）。
> 状态：⬜待办 / 🔄进行 / ✅完成
> 配套文档：开发日志见 `DEVLOG.md`，已知 BUG 见 `BUGS.md`（随任务推进维护）。

## 总览

| 阶段 | 内容 | 状态 |
|---|---|---|
| P0 | 核心框架（DataStore/GameLoop/OamManager/Tsubasa2/boot 路由） | ✅ |
| P1 | Bank 逐块翻译（下表 A-G 各 Bank） | 🔄 |
| P2 | 场景链路打通（STORY/PASSWORD/RESULT） | ⬜ |
| P3 | CHR→PNG 资源化 + 差分验证全量 | ⬜ |
| P4 | 优化重构（UI/架构） | ⬜ |

## A. 框架与入口

| ID | 任务 | 状态 | 备注 |
|---|---|---|---|
| A1 | DataStore（KV 内存替代，ZP/ram 分区） | ✅ | `data/DataStore.ts` |
| A2 | GameLoop / OamManager / Tsubasa2 即插即用入口 | ✅ | `core/` |
| A3 | boot 场景路由（BOOT→TITLE→MEETING→MATCH） | ✅ | `game/boot.ts` |
| A4 | 场景路由扩展（STORY/PASSWORD/RESULT 接入） | ⬜ | boot.ts 中 TODO |

## B. 开场 / 标题 / 脚本（Bank 00, 03-05）

| ID | 任务 | 状态 | 备注 |
|---|---|---|---|
| B1 | Bank00 核心服务 + script-vm/opcodes/data-loader | ✅ | `service/bank00/` |
| B2 | 开场控制器 OpeningSceneController | 🔄 | 当前 TECMO 字母占位，真开场数据待提取 |
| B3 | 标题控制器 TitleSceneController | ✅ | |
| B4 | 文本脚本数据 bank03/04/05 | ✅ | `scene/textscript/` |
| B5 | 标题菜单背景 Cut 0x17 nametable | ✅ | `ppu/nametable/cut/` |

## C. 选项屏 / 场景 / 数据（Bank 01, 02, 06, 07）

| ID | 任务 | 状态 | 备注 |
|---|---|---|---|
| C1 | Bank01 DataQueryService（选项屏幕） | ✅ | |
| C2 | Bank02 SceneService | 🔄 | PASSWORD entryC 密码逻辑 TODO |
| C3 | Bank06/07 数据 | ✅ | `data/bank06-data.ts` `bank07-data.ts` |

## D. 比赛核心（Bank 11, 16, 24, 26, 27, 28, 29）

| ID | 任务 | 状态 | 备注 |
|---|---|---|---|
| D1 | Bank11 MatchTurnService（回合/滚动/精灵组） | ✅ | 差分验证 10064/0 |
| D2 | Bank16 SkillsService（技能） | ✅ | |
| D3 | Bank24 HudService（HUD） | ✅ | |
| D4 | Bank26 MatchEngineService（比赛主循环） | ✅ | |
| D5 | Bank27 场景/精灵数据加载 + 动画帧 | ✅ | 差分验证 7274/0 |
| D6 | Bank28 对阵/阵型/等级/OAM | ✅ | |
| D7 | Bank29 RosterService（球员名单） | ✅ | `data/team/roster.ts` |

## E. 待翻译 Bank（当前重点）

| ID | 任务 | 状态 | 备注 |
|---|---|---|---|
| E1 | **Bank19 AuxiliaryService 翻译** | ✅ | 完整翻译 (数据流精灵/控制码/调色板/场景重置) |
| E1.1 | $9000-$9163 / $91A9-$922A / $9238-$9243 / $92A8-$930F / $9335-$944D 五段入口翻译 | ✅ | `bank19_auxiliary.service.ts` |
| E1.2 | 内部函数 $B043 $B127 $B15A $B160 $B2A6 $B406 | ✅ | 窗口映射修正 ($90xx 相对偏移) |
| E1.3 | JMP 目标 $B02D $B0AF $B20F $B2F7 $B339 $B3CB $B3FA | ✅ | 多帧状态机 H5 化 (_sceneTick) |
| E2 | **Bank20 MatchAuxService 翻译** | ✅ | 4 路入口全部完成 (2026-08-19) |
| E2.1 | dispatch 4 路：$84DC / $83D9 / $8624 / $8796 | ✅ | |
| E2.2 | 15 个 code 段（$8003-$88A7） | ✅ | 含 $8438 九路 + $857A 五路分派 |
| E2.3 | 16 个内部函数（$8084...$881D） | ✅ | |
| E3 | Bank19/20 差分验证 | ✅ | Bank20 ✅ `_verify_bank20.cjs` PASS=17014/FAIL=0; Bank19 ✅ `_verify_bank19.cjs` PASS=5600/FAIL=0 |
| E4 | Bank19/20 接入 boot 路由（STORY/比赛辅助） | ✅ | BootService: STORY→Bank19.start/update; MATCH→Bank26.mainLoop+Bank20.frameTick; MEETING(START)→STORY; CONTINUE→STORY; Tsubasa2 构造注入 Bank19/20 |

## F. 音频（Bank 12 + audio ROM）

| ID | 任务 | 状态 | 备注 |
|---|---|---|---|
| F1 | Bank12 AudioEngine + Service | ✅ | |
| F2 | 43 首 BGM + SE 数据（SID 化） | ✅ | |
| F3 | 9-bank audio ROM 清理 | ✅ | B1/3/7 stub，B0 保守保留（引用链） |
| F4 | 音频时序对齐（timing_data 恢复） | ✅ | |

## G. 剩余待办

| ID | 任务 | 状态 | 备注 |
|---|---|---|---|
| G1 | Bank13/15/21/22/25/31 残留 stub 巡检与补全 | ⬜ | 确认是否全量翻译 |
| G2 | PASSWORD 场景（Bank02 entryC 密码逻辑） | ⬜ | |
| G3 | STORY 剧情场景（Bank18/19） | 🔄 | Bank19 渲染库 ✅ (差分 5600/0); Bank18 主控制器骨架 ✅ 接入 STORY 路由 (enterChapter→Bank19.start/update, smoke 5/0); 待补全 Bank18 章节指针表数据建模 |
| G4 | RESULT 赛果场景 | ✅ | ResultController 骨架接入 boot RESULT 路由 (A→TITLE); MATCH 帧守卫 → RESULT; 玩链路集成测试 PASS=6/0 |
| G4 | RESULT 赛果场景 | ⬜ | |
| G5 | CHR→PNG 全部图形资源化 | ⬜ | |
| G6 | 各 Bank 全量差分验证 | ⬜ | |
| G7 | 版本推进 + Tag 里程碑 | 🔄 | 当前 0.2.0 |

## 里程碑

| 版本 | 内容 | 状态 |
|---|---|---|
| v0.1.0 | 框架 + Bank00/01/02 基础链路 | ✅ |
| v0.2.0 | Bank11 完整翻译 + 差分验证 | ✅ |
| v0.3.0 | Bank19/20 翻译完成 + STORY/PASSWORD/RESULT 场景接入 | ⬜ |
| v1.0.0 | CHR 资源化 + 全量差分验证 + 优化重构 | ⬜ |
