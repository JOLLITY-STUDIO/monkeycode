# 开发日志 (DEVLOG)

## 2026-08-20
- G12 WBS 完成：bank0 共享渲染原语 1:1 补齐（$9D27/$9C3A/$9BE8/$997A/$97AB/$9B6F/$9B74 → bank00_core.service.ts），$A721 归属更正（实为 bank01 $8721）并翻译 _screenPatchA721（bank01_data-query.service.ts）。tsc 零错误。
- G1 WBS 完成：bank21/25 纯数据已全量（prg-bank-21/25.ts 8192B 逐字节一致），bank22 恢复 prg-bank-22.ts + bank22-data.ts + import 修复，bank13/15 音频已校准，bank31 service+数据已存在。tsc 零错误。
- bank01 entry2-5 补译完成：entry2_PpuGraphics($A4EB)/entry3_ScreenDraw($A64C)/entry4_AttrBlock($A6D2)/entry5_CharDecode($AFC2) 完整翻译（bank01_data-query.service.ts），修正 ram_0044/45 地址错误。tsc 零错误。
