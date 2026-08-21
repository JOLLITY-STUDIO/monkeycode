# 开发日志 (DEVLOG)

## 2026-08-21
- **G30-G34 WBS 完成 (开场自动播放 — OPENING 6/6 PASS, 没画面问题打通)**:
  - **G30 BUG-OPEN-03**: ServiceLoader 构造函数 `new OpeningSceneController(_store)` + `this.bank00.setOpening(opening)` 注入; 之前 `_opening` 恒 undefined 导致 `_firstFrameInit` 的 `initBoot()` 静默跳过 (开场内容不进场景)
  - **G31 BUG-OPEN-04**: `_bootCoroutine` 每帧 `_opening.syncBootFrame(frame)` 推进调色板渐显 (对应 bank0 $9A71 fade + $9A0D); TITLE 阶段 `_titleCoroutine` 每帧 `_opening.update(buttons)`
  - **G32 BUG-OPEN-06**: `_firstFrameInit()` 首帧改走 `initBoot()` (真实 cut_0x00_boot: NT 26 tile + 40 精灵 + 全黑调色板), 非 sceneLoad(0x17) 标题菜单
  - **G33 BUG-OPEN-07**: `_mainInputLoop` 去掉每帧 else 清 ram_001B bit0 — 原实现每 2 帧交替置位/清除 → 开场每 2 帧重灌全黑调色板 → 卡死黑屏; 对照 asm $802C (START 边沿一次性块) + $8087 (仅场景切换清 bit0) 修正为置位后保持
  - **G27 渲染驱动**: `_forceRender()` 逐扫描线(20-260) endScanline 合成 bgbuffer → startVBlank 合成 (原 G26 只调 startVBlank 一次)
  - **G34 验证**: tsc --noEmit 零错误; `_verify_g34_opening.cjs` OPENING 6/6 — opening 注入✓ NT 26 tile✓ 调色板渐显 17 色✓ 40 精灵✓ PPU buffer 非黑采样=21✓
  - **额外修复**: Tsubasa2 PPU stub 补 `getSpritePatternTile` (mapper0 语义: `ptTile[index]`) — PPU 精灵 0 命中检测调用缺失导致渲染崩溃
  - 修改文件: `src/game/ServiceLoader.ts` (opening 实例化+注入), `src/game/service/bank00/bank00_core.service.ts` (bit0 一次性初始化), `src/game/Tsubasa2.ts` (getSpritePatternTile stub)
  - 验证脚本: `_verify_g34_opening.cjs` (OPENING 6/6), `_diag_step_stack.cjs` (堆栈诊断, 可删)

## 2026-08-21
- **G26 WBS 完成 (没画面修复 — 渲染链路 4 根因全链路验证 RENDER 4/4 PASS)**:
  - **① 缺 nametable 同步**: `PpuSync.syncAll()` 只同步 ctrl/oam/palette/scroll, 从未把 `DataStore.nt0/nt1` 同步进 PPU 内部 `nameTable`; 而 PPU 渲染 (renderBgScanline) 只读内部 `nameTable[this.curNt].tile/attrib` → 全空 = 黑屏。修复: `PpuSync.syncNametable()` (DataStore.nt0→PPU.nameTable[0], nt1→nameTable[1], tile 直接拷贝, attrib=(palette&3)<<2), syncAll() 在 syncOam 前调用
  - **② PPUMASK 渲染全关**: `Bank00RenderView.ppuRegSetup()` 写 'ppuctrl'/'ppumask' 语义键, 而 `syncCtrl()` 只读 ram_0020/0021 → PPUMASK=0 → f_bgVisibility/f_spVisibility 全关。修复: syncCtrl 加回退读 'ppuctrl'/'ppumask'
  - **③ imgPalette 不刷新**: `syncPalette()` 直接写 `ppu.vramMem[0x3F00]`, 但 PPU 渲染只用 `imgPalette` 缓存 (仅在 writeMem($3F00) 路径 updatePalettes 刷新)。修复: 写完后显式调 `ppu.updatePalettes()`
  - **④ 渲染扫描线从未驱动**: `Tsubasa2._onRender` 只调 `startFrame()/endFrame()`, 而 PPU 的扫描线渲染 (renderFramePartially) 只在 `startVBlank()` 内被驱动 (模拟器 dots 循环路径) → buffer 恒为背景色。修复: _onRender 改调 `startVBlank()`
  - **⑤ PPU 环境 stub 缺失**: mmap=null → renderFramePartially 内 `this.nes.mmap.onSpriteRender()` 抛错中断; rom=null → setMirroring 无法初始化 ntable1 (curNt 恒 null → 背景静默失败)。修复: Tsubasa2 补 mmap no-op stub (onSpriteRender/onBgRender/latchAccess/clockIrqCounter/canWriteChr/bgTileOverride/getBgTileData) + rom 镜像常量 stub (HORIZONTAL=0/VERTICAL=1/SINGLE=2/SINGLE2=3/FOUR=4) + 构造后 `setMirroring(0)`
  - 修改文件: `src/game/PpuSync.ts` (syncNametable 新增 + syncCtrl 回退 + syncPalette 刷新), `src/game/Tsubasa2.ts` (_onRender startVBlank + mmap/rom stub + setMirroring)
  - 验证: tsc --noEmit 零错误; `_tmp_g26_smoke.cjs` SMOKE 6/6; `_tmp_g26b_render.cjs` RENDER 4/4 — PPU buffer 非黑采样=169, DataStore.nt0 480 tile, PPU.nameTable[0] 480 tile (syncNametable 生效), spriteMem 256B
  - 佐证: FrameCompositor.ts 已不存在 (bank00 重译移除), 渲染链 = Tsubasa2._onRender → PPU.startVBlank → putImageData, PPU 内部 nameTable 是唯一渲染源
  - 后续: G22 接入 OpeningSceneController 后即可见完整开场画面

## 2026-08-21
- **G21 WBS 完成**: C2 Bank02 PASSWORD entryC 密码校验逻辑翻译 (诚实占位+6 槽位模型+24 项分发表)
  - 修正 `PASSWORD_CHAR_COUNT=6` (从 `_tmp_pwd_enter.png` 渲染图确认 6 个下划线占位)
  - 修正 `PASSWORD_COLS=8` (6×8 假名网格: 6 行 8 列)
  - 扩展 `PASSWORD_DISPATCH_TABLE` 16→24 项 (24 项目标地址从 `_full.s:454-455` 字节提取: `$A4C0/$A559/$A57B/.../$A7CE/$A7D6/$A7FA`)
  - `_verifyPassword` 形态守卫+一律 false 诚实占位 (避免假密码通过)
  - **校验子程序定位结论 (不编造)**:
    - 唯一 3 处写 `ram_0057`: `bank0 $8895` (JSR $8895 内部) + `bank11 $8646/$866C` (地图绘制临时变量, 非密码标记)
    - 6 处 `JSR $8895` 调用者: `bank2 $877B` (LDA #$80 失败出口) / `$87CF` (LDA #$81 成功出口) / `$8607` (LDA #$30 场景 0x30) / `$861D` (LDA #$20 场景 0x20) + 2 处同类
    - 无任何代码 JSR/JMP `$A7CF`/`$A77B` (成功/失败出口), 校验必通过分发表间接跳转 (idx17=`$A77A` 滑入失败, idx21=`$A7CE`=前一字节 RTS 邻接成功)
    - 真实输入 trace (`_tmp_trace_pwd5.cjs`): 16 槽位 A/RIGHT 按键 `0468` 全 `$f8` 未填字符, `0700` 仍 `$00`, START 路径 `$8445→JMP $8053` (bank0 通用场景流程)
    - `$A454` (光标移动) 只更新 `$0559/$055D` (位置), 不写 `$0468`
    - `$0468` 是 OAM 假名网格位置数据 (不写字符), `$0700` 承载当前选中字符
  - 校验子程序位于 `$A3D8-$A454`/`$A464-$A491` 等未反汇编 `.byte` 段, 需更深度的未反汇编分析或真实密码输入流程 trace 定位
  - 修改文件: `src/game/service/bank02_password.service.ts` (PASSWORD_DISPATCH_TABLE 18→24 行, _verifyPassword 注释完整, PASSWORD_CHAR_COUNT 6)
  - tsc --noEmit -p tsconfig.json 零错误

## 2026-08-21
- G22 推进（进行中，部分阻塞）：OpeningSceneController 数据侧完成（cut_0x00_boot.ts 真实 NT0/ATTR0/OAM/调色板 + initBoot()/syncBootFrame() 渐显），dispatch.service.ts 增加 TaskIndex.TITLE=7 + init() 末尾触发 handler.init()。运行时接线被并行 bank00 重译阻塞：bank00 agent 重写 Tsubasa2.ts 为 bank00 主循环驱动薄壳（移除 dispatch 场景注册、_onFrame 场景路由、_onRender view 渲染），bank00 sceneLoad(0x17) 简化版仅写 scene header（SCENE_ID/ram_0048/ram_0049）未接 OpeningSceneController；其 update() 注释称"场景流转由 BootService 场景路由器接管"但 BootService 不存在。已提交非冲突部分（dispatch.service.ts + index.ts），Tsubasa2.ts/scene_opening.controller.ts 为并行改动不动。tsc 零错误。
- G23 WBS 完成（A4 场景路由扩展）：dispatch.service.ts TaskIndex 枚举扩展（BOOT/FULL_INIT/PASSWORD/MEETING/STORY/MATCH/RESULT）+ SceneHandler 接口 + registerScene/dispatch（切换场景调 handler.init）/update（按键边沿检测 + 场景分发）；Tsubasa2._registerDispatchScenes 注册 PASSWORD（PasswordController + bank02.entryF(0)，success→STORY）/STORY（bank18.enterChapter(0)，SELECT 或数据流结束→MEETING/MATCH）/RESULT（A 确认→BOOT）；_renderDispatchSceneViews 渲染 PasswordView（接入 _onRender）。修复 PPU 环境问题：src/core/ppu/index.ts nametable/palette-table 改 named import（原 default import 在 CommonJS 下 undefined）+ Tsubasa2 PPU stub 补 cpu.mem（_updateNmiOutput 读 $2002）。_tmp_g23_smoke.cjs SMOKE PASS 6/6，tsc 零错误。
- bank27/bank28 修复完成：bank27.service.ts import 路径补 prg/ 层级（`../data/prg/bank27-data`）；bank28_match.service.ts import 路径补 prg/ 层级（`../data/prg/bank28-tables`）+ 从 asm/bank28 提取真实数据补建 `T_TEAM_8528`（$8528 队伍表）/`T_ATTR_ROLE_8A9D`（$8A9D 属性角色表），bank28-tables.ts 198→726 行。tsc 零错误。已 push (80a6e980)。

## 2026-08-20
- G12 WBS 完成：bank0 共享渲染原语 1:1 补齐（$9D27/$9C3A/$9BE8/$997A/$97AB/$9B6F/$9B74 → bank00_core.service.ts），$A721 归属更正（实为 bank01 $8721）并翻译 _screenPatchA721（bank01_data-query.service.ts）。tsc 零错误。
- G1 WBS 完成：bank21/25 纯数据已全量（prg-bank-21/25.ts 8192B 逐字节一致），bank22 恢复 prg-bank-22.ts + bank22-data.ts + import 修复，bank13/15 音频已校准，bank31 service+数据已存在。tsc 零错误。
- bank01 entry2-5 补译完成：entry2_PpuGraphics($A4EB)/entry3_ScreenDraw($A64C)/entry4_AttrBlock($A6D2)/entry5_CharDecode($AFC2) 完整翻译（bank01_data-query.service.ts），修正 ram_0044/45 地址错误。tsc 零错误。
