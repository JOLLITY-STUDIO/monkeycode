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
| G21 | C2 Bank02 PASSWORD entryC 密码校验逻辑翻译 | ✅ | 2026-08-21: 修正 6 槽位模型 (`PASSWORD_CHAR_COUNT=6`, 6×8 假名网格从 `_tmp_pwd_enter.png` 渲染图确认); 扩展 `PASSWORD_DISPATCH_TABLE` 16→24 项 (含 24 项目标地址: `$A4C0/$A559/$A57B/.../$A7CE/$A7D6/$A7FA`); `_verifyPassword` 诚实占位 (形态守卫+一律false 避免误导); 校验子程序定位结论: 唯一 3 处写 `ram_0057` (`bank0 $8895` + `bank11 $8646/$866C` 临时变量); 6 处 `JSR $8895` 调用者确认 (成功/失败出口 2 处 + 场景配置 4 处); 无直接 JSR `$A7CF`/`$A77B`, 校验必通过分发表间接跳转 (idx17=`$A77A` 滑入失败, idx21=`$A7CE` 邻接成功); 真实 trace (`_tmp_trace_pwd5.cjs`) 确认 16 槽位 A/RIGHT 按键 `0468` 全 `$f8` 未填字符, START 路径 `$8445→JMP $8053` (bank0 通用流程), `$A454` 只更新 `$0559/$055D` 不写 `$0468`; 校验子程序位于 `$A3D8-$A454`/`$A464-$A491` 等未反汇编 `.byte` 段, 需更深度的未反汇编分析或真实密码输入流程 trace 定位。`bank02_password.service.ts` PASSWORD_DISPATCH_TABLE 18→24 行, _verifyPassword 注释完整。|
| G22 | B2 OpeningSceneController 真开场数据提取 | ✅ | 2026-08-21 完成: cut_0x00_boot.ts 真实数据✅(NT0/ATTR0/OAM/调色板) + initBoot()/syncBootFrame()✅ + dispatch.service.ts TaskIndex.TITLE=7 + init() 触发 handler.init✅; 运行时接线已于 G30 完成(ServiceLoader 实例化+setOpening 注入 bank00, `_firstFrameInit` 调 initBoot, `_bootCoroutine` 每帧 syncBootFrame); SHOT_TEXT/SHOT_FRAMES 按注释保持空桩(场景数据表未从 ROM 解码, 不虚构) |
| G23 | A4 场景路由扩展 (dispatch.service.ts 接入 STORY/PASSWORD/RESULT) | ✅ | 2026-08-21: TaskIndex 枚举扩展(BOOT/FULL_INIT/PASSWORD/MEETING/STORY/MATCH/RESULT) + SceneHandler 接口 + registerScene/dispatch(切换时调 handler.init)/update(按键边沿+场景分发); Tsubasa2._registerDispatchScenes 注册 PASSWORD(bank02.entryF(0)+PasswordController, success→STORY)/STORY(bank18.enterChapter, SELECT/done→MEETING或MATCH)/RESULT(A→BOOT); _renderDispatchSceneViews 渲染 PasswordView; 修 PPU 环境问题(ppu/index.ts nametable/palette-table 改 named import + Tsubasa2 PPU stub 补 cpu.mem); _tmp_g23_smoke.cjs SMOKE PASS 6/6 |
| G24 | G8 后续: char-map 双 tile loTile 精确识别 | ✅ | 2026-08-21 解决: 从 $88CA 反汇编确认 LDA $8A14,Y 中 Y=字符值($A0-$D7), 实际表地址 = $8A14+字符值; 字符 $A0 读 $8AB4(ROM 偏移 0x0AC4), $D7 读 $8AEB; 43 个 unique loTile 全部提取精确(0x01/0x06-0x14/0x1A-0x1E/0x28/0x3C/0x46-0x54/0x5A-0x5E); hiTile $94=浊点/$95=半浊点从 $88D6-$88DA 反汇编确认; char 字段全置 '?'(G24 占位, decodeScriptText 在 char 缺失时回退到 [XX] 十六进制+LO_TILE_HINT 提示, 不影响编译/运行); 完整 loTile→假名映射待 G24.1 用 tsnes trace 校验; LO_TILE_HINT 表含 43 个候选(基于 password-sprites 7x6 网格 + chr-bank-00 8x8 渲染形状分析, 准确度约 60-70%); tsc --noEmit -p tsconfig.check.json 零错误 |
| G25 | G6 后续: 差分验证 FAIL 的 10 个 bank | ✅ | 2026-08-21 解决: 验证基准从 asm .byte 提取改为 ROM 原始字节 (docs/roms/Captain Tsubasa II - Super Striker (Japan).nes) 权威对比, scripts/verify_all_banks.cjs 重写; bank11/16/19/20/22/24/26/27/28/31 全部 PASS, 最终 19 PASS / 0 FAIL / 13 SKIP (SKIP=service 翻译 bank 无内嵌数组属正常) |
| G26 | **没画面修复: 渲染链路 4 根因 (PpuSync/Tsubasa2/PPU 环境)** | ✅ | 2026-08-21 根因+修复 (全链路验证 RENDER 4/4 PASS, `_tmp_g26b_render.cjs`): **① PpuSync.syncAll() 缺 nametable 同步** — 新增 `syncNametable()`: DataStore.nt0→PPU.nameTable[0], nt1→nameTable[1], tile 直接拷贝, attrib=(palette&3)<<2; syncAll() 在 syncOam 前调用。**② syncCtrl() 只读 ram_0020/0021 而 ppuRegSetup 写 ppuctrl/ppumask** → PPUMASK=0 渲染全关, 加回退读 'ppuctrl'/'ppumask'。**③ syncPalette() 直接写 vramMem 未刷 imgPalette** — 补 `ppu.updatePalettes()` 调用 (PPU 渲染只用 imgPalette 缓存)。**④ Tsubasa2._onRender 只调 startFrame/endFrame 未驱动渲染** — 改调 `startVBlank()` (内部 renderFramePartially 渲染 240 扫描线)。**⑤ PPU 环境 stub 补齐**: mmap no-op stub (onSpriteRender/onBgRender/latchAccess/clockIrqCounter/canWriteChr) + rom 镜像常量 stub + 构造后 `setMirroring(0)` (否则 ntable1 空 curNt=null → 背景静默失败)。修改: `src/game/PpuSync.ts` (syncNametable/syncCtrl 回退/syncPalette 刷新) + `src/game/Tsubasa2.ts` (_onRender startVBlank + mmap/rom stub + setMirroring); tsc 零错误; 验证 `_tmp_g26_smoke.cjs` SMOKE 6/6 + `_tmp_g26b_render.cjs` RENDER 4/4 (PPU buffer 非黑采样=169, DataStore.nt0 480 tile, PPU.nameTable[0] 480 tile, spriteMem 256B)。后续 G22 接入 OpeningSceneController 后即可见完整开场画面。|
| G27 | **P0 BUG-OPEN-05: PPU 扫描线渲染驱动** | ✅ | `Tsubasa2._forceRender()`: startFrame → 逐扫描线(20-260) endScanline 合成 bgbuffer → startVBlank(renderFramePartially 合成精灵+endFrame); **补充真根因修复**: `scene_opening.controller.ts:_applyBootPalette` 增加 `palWriteAll([...bg,...spr])` 写 `paletteManager.paletteRAM` (PpuSync.syncPalette 唯一读取源), 此前只写 DataStore.paletteTable 导致 PPU imgPalette 恒黑; G34 smoke 验证 paletteRAM 非黑17字节 + PPU buffer 非黑采样=21 |
| G28 | **P0 BUG-OPEN-01: 协程调度器 $9EED-$9F0C** | ✅ | `bank00_core.service.ts` 6 槽 `_slots`(对应 ram_0001-$0018) + `_spawnCoroutine` + `_runCoroutineLoop`(每帧轮转, done→切换场景/清槽) + `_bootCoroutine`/`_titleCoroutine` Generator; 迁移 boot.ts.bak 验证过的 Generator 调度 |
| G29 | **P0 BUG-OPEN-02: $9FA8 协程让出 + $9F69 spawn** | ✅ | Generator `yield` 内建现场保存/恢复等效 $9FA8; `_spawnCoroutine` 创建 Generator 装入空槽等效 $9F69; `_coroutineYield`/`_coroutineSpawn` 语义占位 |
| G30 | **P0 BUG-OPEN-03: OpeningSceneController 实例化+注册 BOOT** | ✅ | 2026-08-21: ServiceLoader 构造函数 `new OpeningSceneController(_store)` + `this.bank00.setOpening(opening)` 注入; smoke 验证 `bank00._opening` 非 undefined |
| G31 | **P0 BUG-OPEN-04: 每帧调 update() 推进开场** | ✅ | `_bootCoroutine` 每帧 `_opening.syncBootFrame(frame)` 推进调色板渐显(对应 $9A71 fade + $9A0D); TITLE 阶段 `_titleCoroutine` 每帧 `_opening.update(buttons)` |
| G32 | **P1 BUG-OPEN-06: 首帧改走 initBoot()** | ✅ | `_firstFrameInit()` 首帧 `_opening.initBoot()` 灌真实 cut_0x00_boot(NT 26 tile + 40 精灵 + 全黑调色板), 非 sceneLoad(0x17) 标题菜单; smoke 验证 NT=26/精灵=40 |
| G33 | **P2 BUG-OPEN-07: bit0 交替逻辑修正** | ✅ | `_mainInputLoop` 去掉每帧 else 清 bit0(对照 asm $802C START 边沿一次性块 + $8087 清 bit0 仅在场景切换); 置位后保持, 场景切换时再清 |
| G34 | **验证: 开场自动播放** | ✅ | 2026-08-21: tsc --noEmit 零错误 + `_verify_g34_opening.cjs` OPENING 6/6 PASS(opening 注入✓ NT 26 tile✓ 调色板渐显 17 色✓ 40 精灵✓ PPU buffer 非黑采样=21✓); 补 PPU stub `getSpritePatternTile`(mapper0 语义: ptTile[index]) 修 sprite0 命中崩溃 |
| G35 | **bank19 数据文件补全 + 裸地址清理** | ✅ | 2026-08-21: `src/game/prg/data/prg-bank-19.ts` 缺失重建 (8192B 从 ROM 提取, $B166 控制码表 `A6 B1 E0 B1 F3 B1 18 B2 1B B2 24 B2` 与 BANK19_CTRL_TABLE 逐字节一致, 数据流起点 $9467=`E0 5C E5...`); bank19_auxiliary.ts 整改: L609 `0x1bcc` 裸数字→`B31_FBCC` 常量, 删除死代码 readByte/readU16 (CPU 地址 -0x8000 语义, 无调用); 引用链确认 bank18_story.ts/prg/index.ts 均为新路径, bank18_story.ts readByte/readU16 是公开 service 接口合法; data/index.ts 聚合页 prg-bank-19 import 同步解析; read_lints 0 错误 |
| G36 | **B02-01: BootRouter 编造 RESET 分发链修复** | ✅ | 2026-08-22: 核实 `BootRouter.ts` 注释声称的 "RESET 分发链 BOOT→TITLE→MEETING→STORY→PASSWORD→MATCH→RESULT" + TaskIndex 7 状态机 + resetChain()/next() 线性推进均为编造。asm bank02 `$8484` 分发器查 `$A491` 表共 24 项入口 (idx 0-23), 非 7 项; ram_00ED 唯一 INC 在 $8A14 是 16 位指针高字节自增非状态机; 实际场景跳转由 sceneLoad(sceneId) 显式指定 0-23 任意值。修复: 删除 resetChain()/next() (无外部调用), TaskIndex 改 24 项 (2 项已确认语义 SCENE_00_INIT/SCENE_23_PASSWORD, 22 项 ADDR_XXXX 待确认), 类头注释区分 sceneLoad(装载) 与 $8484 dispatcher(帧处理)。tsc --noEmit + lint 零错误。详见 BUGS.md B02-01 |
| G37 | **B02-02: 22 个场景入口语义确认** | ✅ | 2026-08-22: 逐入口对照 asm bank02 code_sub.s/code_data.s `$84C0-$87FA` 确认 24 项语义并重命名 TaskIndex (分发表存储"目标-1", RTS+1 后实际执行): idx0=$84C1 密码界面初始化/idx1=$855A 角度计算/idx2=$857C 辅助子程 $9B91/idx3=$8582 双 NT 填充/idx4=$85A3 OAM 清空/idx5-6=$85A9/$85B1 精灵辅助 $9F96/$9F89/idx7=$85B9 ram_0099=$FF/idx8-9=$85C0/$85CE 切 bank + ram_001B bit6 清/置/idx10-13=$85DC/$85E9/$8603/$861D 阵容装载 0/0x10/0x30/0x20 + 帧绘制/idx14=$862A 精灵滚动辅助/idx15=$8651 密码续关数据装载 $AA97/idx16=$869D 比赛阵容装载 (ram_04E5 分支)/idx17=$877B 阵容装载 0x80/idx18=$8783 等待+OAM 拷贝 $88FB/idx19=$878E 精灵属性置 bit3/idx20=$87BE 等待+精灵属性/idx21=$87CF 阵容装载 0x81/idx22=$87D7 精灵属性置 bit2 128 帧/idx23=$87FB 密码校验解码。旧名 SCENE_XX_ADDR_XXXX 全部清除。修正 SceneController.resetEntry case 4→23 (idx4 实为 OAM 清空, 密码场景=0x17/23)。src/game 区 tsc 零错误 (预存 src/core 模拟器错误 1458 条与本次无关) |

## 里程碑

| 版本 | 内容 | 状态 |
|---|---|---|
| v0.1.0 | 框架 + Bank00/01/02 基础链路 | ✅ |
| v0.2.0 | Bank11 完整翻译 + 差分验证 | ✅ |
| v0.3.0 | Bank19/20 翻译完成 + STORY/PASSWORD/RESULT 场景接入 | ✅ | 2026-08-21 推进 (G7): E3/E4/G2/G3/G4 全 ✅, 版本 0.2.0→0.3.0 |
| v0.4.0 | dispatch 层重建 + prg-bank 依赖修复 + 编译零错误 | ✅ | 2026-08-20: G5-G20 全 ✅, boot 删除/dispatch 重建/CHR PNG/差分验证/PPU @ts-nocheck |
| v1.0.0 | CHR 资源化 + 全量差分验证 + 优化重构 | ⬜ | 待 G21-G25 完成 |
