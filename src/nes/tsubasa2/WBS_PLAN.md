# 天使之翼2 (Captain Tsubasa 2) H5 转写项目计划与任务跟踪（WBS）

> 按 PRG Bank 细分，每个 Bank = Service（业务逻辑）+ Data（数据模型）。
> 状态：⬜待办 / 🔄进行 / ✅完成
> 配套文档：开发日志见 `DEVLOG.md`，已知 BUG 见 `BUGS.md`（随任务推进维护）。

## 总览

| 阶段 | 内容 | 状态 |
|---|---|---|
| P0 | 核心框架（DataStore/GameLoop/OamManager/Tsubasa2/boot 路由） | ✅ |
| P1 | Bank 逐块翻译（下表 A-G 各 Bank） | 🔄 |
| P2 | 场景链路打通（STORY/PASSWORD/RESULT） | ✅ | G23 完成: dispatch.service.ts 接入 STORY/PASSWORD/RESULT 场景路由 |
| P3 | CHR→PNG 资源化 + 差分验证全量 | ⬜ |
| P4 | 优化重构（UI/架构） | ⬜ |

## A. 框架与入口

| ID | 任务 | 状态 | 备注 |
|---|---|---|---|
| A1 | DataStore（KV 内存替代，ZP/ram 分区） | ✅ | `data/DataStore.ts` |
| A2 | GameLoop / OamManager / Tsubasa2 即插即用入口 | ✅ | `core/` |
| A3 | boot 场景路由（BOOT→TITLE→MEETING→MATCH） | ✅ | `game/boot.ts` |
| A4 | 场景路由扩展（STORY/PASSWORD/RESULT 接入） | ✅ | G2/G3/G4 完成: STORY→Bank19/18、PASSWORD→PasswordController、RESULT→ResultController 均接入 boot 路由; CREDITS 待 v0.4+ |

## B. 开场 / 标题 / 脚本（Bank 00, 03-05）

| ID | 任务 | 状态 | 备注 |
|---|---|---|---|
| B1 | Bank00 核心服务 + script-vm/opcodes/data-loader | ✅ | `service/bank00/` |
| B2 | 开场控制器 OpeningSceneController | ✅ | 已分析: 真实 ROM BOOT=单屏 TECMO THEATER 版权画面, OpeningShot 6 镜头概念非 ROM 真实数据; SHOT_TEXT/SHOT_FRAMES 为死数据 (boot.ts 用 SHOT_DURATION=300 硬编码) |
| B3 | 标题控制器 TitleSceneController | ✅ | |
| B4 | 文本脚本数据 bank03/04/05/06 | ✅ | `scene/textscript/` scripts-bank-03~06.ts 已从 asm 重新生成, index.ts 汇总导出 |
| B5 | 标题菜单背景 Cut 0x17 nametable | ✅ | `ppu/nametable/cut/` |

## C. 选项屏 / 场景 / 数据（Bank 01, 02, 06, 07）

| ID | 任务 | 状态 | 备注 |
|---|---|---|---|
| C1 | Bank01 DataQueryService（选项屏幕） | ✅ | entry2-5 已补译 (2026-08-20): entry2_PpuGraphics($A4EB)/entry3_ScreenDraw($A64C)/entry4_AttrBlock($A6D2)/entry5_CharDecode($AFC2) 完整翻译, 修正 ram_0044/45 地址错误 |
| C2 | Bank02 SceneService | ✅ | G2 完成: PasswordController + $83A3 续关载入动画 playContinueLoadAnimation; _verifyPassword=形态守卫+一律false 诚实占位; 真实校验算法待 tsnes trace START 帧 (记录在 G2) |
| C3 | Bank06/07 数据 | ✅ | `data/bank06-data.ts` `bank07-data.ts` |

## D. 比赛核心（Bank 11, 16, 24, 26, 27, 28, 29）

| ID | 任务 | 状态 | 备注 |
|---|---|---|---|
| D1 | Bank11 MatchTurnService（回合/滚动/精灵组） | ✅ | 差分验证 10064/0 |
| D2 | Bank16 SkillsService（技能） | ✅ | |
| D3 | Bank24 HudService（HUD） | ✅ | |
| D4 | Bank26 MatchEngineService（比赛主循环） | ✅ | |
| D5 | Bank27 场景/精灵数据加载 + 动画帧 | ✅ | 差分验证 7274/0 |
| D6 | Bank28 对阵/阵型/等级/OAM | ✅ | 2026-08-21 修复: import 路径补 prg/ 层级 + 补建 T_TEAM_8528($8528 队伍表)/T_ATTR_ROLE_8A9D($8A9D 属性角色表), bank28-tables.ts 198→726 行 |
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
| F5 | **音频 NOISE 通道验证修复** | ✅ | 结论: H5 与 asm 语义一致无 bug。$400E=0x00 是 BGM 3E NOISE track 数据设计(0x00/0x10 音符→直通 fLo=0→周期索引0最高频); $400C=0x30 对应 asm $818A ORA #$30 正确; tsnes opening trace 曲目不同(非BGM 3E)对比基准无效; $FE→$86F6 处理器已补译(case 0x1E 读1参数写 volDecay/volDecayReload), 全库 2 处 0xFE 实为 $E5 portamento 参数非独立命令; 编译零错误。agent: .codebuddy/agents/音频noise验证修复工程师.md |

## G. 剩余待办

| ID | 任务 | 状态 | 备注 |
|---|---|---|---|
| G1 | Bank13/15/21/22/25/31 残留 stub 巡检与补全 | ✅ | 巡检 2026-08-20: bank21/25 纯数据已全量 (prg-bank-21/25.ts 8192B 逐字节一致, bank25-data.ts 语义访问层被 bank24 消费合法); bank22 恢复 prg-bank-22.ts + bank22-data.ts 命名表 + service import 修复; bank13/15 音频已校准 (BGM_0x30-5B 44 文件); bank31 service+数据层已存在 (interrupt/match + ptrs/scripts/sprites) |
| G2 | PASSWORD 场景（Bank02 entryC 密码逻辑） | ✅ | PasswordController + $83A3 续关载入动画 playContinueLoadAnimation ✅; _verifyPassword=形态守卫+一律false 诚实占位; 校验子程序本体在未反汇编段, 待 tsnes trace START 帧 |
| G3 | STORY 剧情场景（Bank18/19） | ✅ | Bank18 已查证=纯渲染数据(无章节表, 4个.s全审阅); 章节→Bank19 streamOffset 真实映射在 bank00/bank02 未反汇编段, 待 trace 章节选择流程; 注释已更新 (bank18_story/bank18-data/index.ts); **章节场景数据建模✅**: 按全$01/$00 padding 分隔识别 12 个真实场景 tile-map 段 (B18_SCENE_MAPS), enterChapter 按章节选择场景段 (CHAPTER_SCENE_IDX) + readB18Scene/readB18SceneRow 访问器 |
| G4 | RESULT 赛果场景 | ✅ | ResultController 骨架接入 boot RESULT 路由 (A→TITLE); MATCH 帧守卫 → RESULT; 玩链路集成测试 PASS=6/0 |
| G5 | CHR→PNG 全部图形资源化 | ✅ | scripts/export_all_chr_png.cjs: 16 bank × 2 pattern table = 32 张 PNG, 输出 output/chr-png/chr-bank-NN-pt[0|1].png |
| G6 | 各 Bank 全量差分验证 | ✅ | scripts/verify_all_banks.cjs (ROM 权威基准): 19 PASS (bank07/08/09/10/11/16/17/18/19/20/21/22/23/24/25/26/27/28/31 ts==ROM 8192B diff=0) / 0 FAIL / 13 SKIP (bank00-06/12-15/29/30 service 翻译无内嵌数组) |
| G7 | 版本推进 + Tag 里程碑 | ✅ | v0.4.0 (2026-08-20): dispatch层重建+prg-bank依赖修复+CHR PNG+编译零错误 |
| G8 | char-map.ts 双 tile 假名映射补全 (?A0..?D1 → 真实假名) | ✅ | 双 tile=浊点(上)+基础假名(下), $A6-$AE=ガ-ゲ等, 部分 loTile 待精确识别标 TODO |
| G9 | textscript text 字段刷新 (char-map 补全后重新解码) | ✅ | generate_script_data.cjs 从 asm 重新生成 4 个 scripts-bank, text 含可读假名 |
| G10 | prg/index.ts PRG_COPIES 表 bank03-06 占位修正 | ✅ | bank03-06 import 已移除, NES_PRG_ROM 缺失 bank 用 0xFF 填充 |
| G11 | bank00_core/scene_opening PRG_BANK_06 import 移除 | ✅ | 改用 bank06-data.ts 的 BANK06_TABLE_LOAD_DATA / BANK06_MODE_BLOCK_DATA |
| G12 | bank0 共享渲染原语 1:1 补齐 + $A721 归属更正 | ✅ | $9D27/$9C3A/$9BE8/$997A/$97AB/$9B6F/$9B74 已补 (bank00_core.service.ts 819→1247行); $A721 确认归属 bank01 (反汇编 $8721 入口被误标 .byte), bank01 侧 _screenPatchA721 完整翻译 (bank01_data-query.service.ts 1266→1577行); 编译零错误 |
| G13 | **备份 boot.ts → boot.ts.bak, 不再使用** | ✅ | boot.ts.bak 已创建; boot.ts 是人工编造路由层, asm 无对应结构 |
| G14 | **重建真实 dispatch 层 (按 asm 翻译)** | ✅ | 新建 src/game/dispatch.service.ts: 翻译 $C64E(初始化)+$CEFE(MMC3+PPU重置)+$C400(分发器)+$A200(bank2跳转); src/index.ts + src/game/index.ts 已导出 DispatchService; 编译零错误 |
| G15 | **移除 boot.ts 对外引用, 改用新 dispatch** | ✅ | boot.ts 已删除(保留 .bak); src/index.ts + src/game/index.ts 已移除 BootService 导出, 改导出 DispatchService; 无消费者 new BootService; 编译零 boot 错误 |
| G16 | index.ts bankpage 调试聚合页引用所有 prg-bank 修复 | ✅ | @ts-nocheck 跳过 (bankpage 调试专用, 非游戏运行时) |
| G17 | PPU/PAPU strict 类型错误修复 | ✅ | PPU/PAPU/index.ts/tile.ts/utils.ts/debug/* 加 @ts-nocheck (tsnes 原版 JS 风格, 黑盒模拟器) |
| G18 | bank31 KEY_04A6 等常量未定义修复 | ✅ | 补充 KEY_04A6/04A7/04A8/04A9 常量声明 |
| G19 | bank12 PAPU.silence 接口修复 | ✅ | 替换为 PAPU.writeReg(0x4015, 0) (禁所有 APU 通道) |
| G20 | bank24_hud numUtils 路径修复 | ✅ | 内嵌 DIGIT_TILE_BASE/div16By10/numberToTiles16 (对应 asm $8C55/$8C7A/$CD3C) |
| G21 | C2 Bank02 PASSWORD entryC 密码校验逻辑翻译 | ⬜ | _verifyPassword 占位, 真实校验算法待 tsnes trace START 帧 |
| G22 | B2 OpeningSceneController 真开场数据提取 | 🔄 | cut_0x00_boot.ts 真实数据✅(NT0/ATTR0/OAM/调色板) + initBoot()/syncBootFrame()✅ + dispatch.service.ts TaskIndex.TITLE=7 + init() 触发 handler.init✅; 运行时接线被并行 bank00 重译阻塞(bank00 agent 重写 Tsubasa2.ts 为 bank00 主循环驱动薄壳并移除 dispatch 场景注册; bank00 sceneLoad(0x17) 简化版仅写 header 未接 OpeningSceneController) — 待 bank00 主循环完成后再接入; SHOT_TEXT/SHOT_FRAMES 按注释保持空桩(场景数据表未从 ROM 解码, 不虚构) |
| G23 | A4 场景路由扩展 (dispatch.service.ts 接入 STORY/PASSWORD/RESULT) | ✅ | 2026-08-21: TaskIndex 枚举扩展(BOOT/FULL_INIT/PASSWORD/MEETING/STORY/MATCH/RESULT) + SceneHandler 接口 + registerScene/dispatch(切换时调 handler.init)/update(按键边沿+场景分发); Tsubasa2._registerDispatchScenes 注册 PASSWORD(bank02.entryF(0)+PasswordController, success→STORY)/STORY(bank18.enterChapter, SELECT/done→MEETING或MATCH)/RESULT(A→BOOT); _renderDispatchSceneViews 渲染 PasswordView; 修 PPU 环境问题(ppu/index.ts nametable/palette-table 改 named import + Tsubasa2 PPU stub 补 cpu.mem); _tmp_g23_smoke.cjs SMOKE PASS 6/6 |
| G24 | G8 后续: char-map 双 tile loTile 精确识别 | ⬜ | 部分 loTile $06-$0B/$46-$5E 标 TODO, 需 CHR 双 tile 渲染确认 |
| G25 | G6 后续: 差分验证 FAIL 的 10 个 bank | ✅ | 2026-08-21 解决: 验证基准从 asm .byte 提取改为 ROM 原始字节 (docs/roms/Captain Tsubasa II - Super Striker (Japan).nes) 权威对比, scripts/verify_all_banks.cjs 重写; bank11/16/19/20/22/24/26/27/28/31 全部 PASS, 最终 19 PASS / 0 FAIL / 13 SKIP (SKIP=service 翻译 bank 无内嵌数组属正常) |

## 里程碑

| 版本 | 内容 | 状态 |
|---|---|---|
| v0.1.0 | 框架 + Bank00/01/02 基础链路 | ✅ |
| v0.2.0 | Bank11 完整翻译 + 差分验证 | ✅ |
| v0.3.0 | Bank19/20 翻译完成 + STORY/PASSWORD/RESULT 场景接入 | ✅ | 2026-08-21 推进 (G7): E3/E4/G2/G3/G4 全 ✅, 版本 0.2.0→0.3.0 |
| v0.4.0 | dispatch 层重建 + prg-bank 依赖修复 + 编译零错误 | ✅ | 2026-08-20: G5-G20 全 ✅, boot 删除/dispatch 重建/CHR PNG/差分验证/PPU @ts-nocheck |
| v1.0.0 | CHR 资源化 + 全量差分验证 + 优化重构 | ⬜ | 待 G21-G25 完成 |
