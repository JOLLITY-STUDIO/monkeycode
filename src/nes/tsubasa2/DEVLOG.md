# 开发日志 (DEVLOG)

## 2026-08-21
- G23 WBS 完成（A4 场景路由扩展）：dispatch.service.ts TaskIndex 枚举扩展（BOOT/FULL_INIT/PASSWORD/MEETING/STORY/MATCH/RESULT）+ SceneHandler 接口 + registerScene/dispatch（切换场景调 handler.init）/update（按键边沿检测 + 场景分发）；Tsubasa2._registerDispatchScenes 注册 PASSWORD（PasswordController + bank02.entryF(0)，success→STORY）/STORY（bank18.enterChapter(0)，SELECT 或数据流结束→MEETING/MATCH）/RESULT（A 确认→BOOT）；_renderDispatchSceneViews 渲染 PasswordView（接入 _onRender）。修复 PPU 环境问题：src/core/ppu/index.ts nametable/palette-table 改 named import（原 default import 在 CommonJS 下 undefined）+ Tsubasa2 PPU stub 补 cpu.mem（_updateNmiOutput 读 $2002）。_tmp_g23_smoke.cjs SMOKE PASS 6/6，tsc 零错误。
- bank27/bank28 修复完成：bank27.service.ts import 路径补 prg/ 层级（`../data/prg/bank27-data`）；bank28_match.service.ts import 路径补 prg/ 层级（`../data/prg/bank28-tables`）+ 从 asm/bank28 提取真实数据补建 `T_TEAM_8528`（$8528 队伍表）/`T_ATTR_ROLE_8A9D`（$8A9D 属性角色表），bank28-tables.ts 198→726 行。tsc 零错误。已 push (80a6e980)。

## 2026-08-20
- G12 WBS 完成：bank0 共享渲染原语 1:1 补齐（$9D27/$9C3A/$9BE8/$997A/$97AB/$9B6F/$9B74 → bank00_core.service.ts），$A721 归属更正（实为 bank01 $8721）并翻译 _screenPatchA721（bank01_data-query.service.ts）。tsc 零错误。
- G1 WBS 完成：bank21/25 纯数据已全量（prg-bank-21/25.ts 8192B 逐字节一致），bank22 恢复 prg-bank-22.ts + bank22-data.ts + import 修复，bank13/15 音频已校准，bank31 service+数据已存在。tsc 零错误。
- bank01 entry2-5 补译完成：entry2_PpuGraphics($A4EB)/entry3_ScreenDraw($A64C)/entry4_AttrBlock($A6D2)/entry5_CharDecode($AFC2) 完整翻译（bank01_data-query.service.ts），修正 ram_0044/45 地址错误。tsc 零错误。
