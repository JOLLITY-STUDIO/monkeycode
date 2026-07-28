# BUG 追蹤文檔 — game-engine 初始整合版

## 版本資訊
- 版本: v1.0.0-integration
- 日期: 2026-07-29
- 狀態: 全部 bank 翻譯完成，21/21 整合測試通過

---

## 已知問題清單

### BUG-001: ~~bank-00 仍依賴 tsubasa-hex2asm 舊模組~~ ✅ 非問題
- **嚴重度**: 低 → 已關閉
- **檔案**: `game-engine/data/rom-data.ts`
- **實際情況**: tsubasa-hex2asm 是 ROM 數據層（32 個 PRG bank 原始數據），由 data/rom-data.ts 統一加載，供 MMC3 bank 映射讀取。這是正確架構，非 bug。

### BUG-002: ~~scene/ 目錄為舊版 placeholder~~ ✅ 已清理
- **嚴重度**: 低 → 已關閉
- **檔案**: `game-engine/scene/*.ts`, `game-engine/index.ts`
- **修復**: index.ts 移除 scene/ exports (已由 bank-00.ts 替代); scene/ 文件保留僅作參考; index.ts 文件頭更新為全部 bank 完成狀態

### BUG-003: ~~index.ts 中 bank-30 的 re-export 仍經由 mocks~~ ✅ 已修復
- **嚴重度**: 中 → 已關閉
- **檔案**: `game-engine/index.ts` (第 109-116 行), `game-engine/banks/bank-30.ts`
- **修復**: index.ts 改為直接從 `./banks/bank-30` 導入並 re-export；bank-30.ts 新增 `bank30_initSystem`, `bank30_initScene`, `bank30_getCharData`, `bank30_multiply`, `bank30_divide`, `bank30_spriteDma`, `bank30_memFill`, `bank30_bankSwitch` 公共 API 函數

### BUG-004: ~~event-bus.ts 未對齊~~ ✅ 已修復
- **嚴重度**: 低 → 已關閉
- **檔案**: `game-engine/banks/bank-31.ts`
- **修復**: bank-31.ts 移除內聯 `_emitBus` stub，改用 `emitBus` import from event-bus.ts

### BUG-005: bank-12 音訊引擎 APU 寫入未經過硬件層
- **嚴重度**: 中
- **檔案**: `game-engine/banks/bank-12.ts`
- **描述**: `writeAPU()` 直接操作 `sys.mem`，不經過 PAPU 硬件層，實際音訊輸出需要額外接線
- **修復方向**: 接線到 core/papu 或 adapters 層的音訊適配器

### BUG-006: bank-02 NMI handler 中 PPU scroll/屬性寫入依賴 sys.ppu
- **嚴重度**: 中
- **檔案**: `game-engine/banks/bank-02.ts`
- **描述**: NMI handler 中寫入 PPU 寄存器依賴 MockPPU（測試用），實際需要對接真實 PPU 模擬器
- **修復方向**: 確保測試或運行時使用真實 PPU 實例

### BUG-007: 純數據 bank (03-05, 07-14, 16-29) 未建立模組
- **嚴重度**: 中
- **檔案**: 缺失 `bank-03.ts` 至 `bank-29.ts`（除已建立的 00,01,02,06,12,15,30,31）
- **描述**: 許多 bank 是純數據 bank，目前通過 `tsubasa-hex2asm/` 自動加載，但缺少獨立的 bank-xx-data.ts 和 bank-xx.ts 模組
- **修復方向**: 為每個缺失的數據 bank 建立 `bank-xx-data.ts`（數據）和 `bank-xx.ts`（註冊+存取）

### BUG-008: bank-00 場景狀態機尚未端到端驗證
- **嚴重度**: 高
- **檔案**: `game-engine/banks/bank-00.ts`
- **描述**: 雖然函數都存在且型別正確，但場景狀態機(0→1→2→3→4→5)的完整端到端路徑未在實際 ROM 數據上驗證
- **修復方向**: 建立 E2E 測試，用實際 ROM 數據和正確的 MMC3 映射執行完整啟動流程

---

## 修復優先級

| 優先級 | BUG | 狀態 |
|--------|-----|------|
| P0 | BUG-008 | 場景引擎 E2E 驗證 |
| P1 | BUG-007 | 缺失數據 bank 模組 |
| P2 | BUG-005 | 音訊未對接硬件層 |
| P2 | BUG-004 | event-bus 重複實現 |
| P3 | BUG-006 | PPU mock 需對接真實實例 |
| ~~P3~~ | ~~BUG-001~~ | ~~✅ 非問題~~ |
| ~~P2~~ | ~~BUG-002~~ | ~~✅ 已清理~~ |
| ~~P1~~ | ~~BUG-003~~ | ~~✅ 已修復~~ |
