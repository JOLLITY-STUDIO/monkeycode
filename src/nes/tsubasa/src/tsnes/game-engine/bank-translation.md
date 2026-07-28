# Bank Translation Plan — 天使之翼2 6502 → TypeScript 翻譯進度

## 總體狀態：全部翻譯完成 ✅

| Bank | 檔案 | 大小 | 功能 | 狀態 |
|------|------|------|------|------|
| 00 | bank-00.ts | 80KB | 場景分派引擎 + 字節碼解釋器 + 精靈動畫 | ✅ 完成 |
| 01 | bank-01.ts | 30KB | 比賽跳躍/物理引擎 + 標題畫面渲染 | ✅ 完成 |
| 02 | bank-02.ts | 22KB | NMI 渲染器 + PPU 更新 + 手柄輸入 | ✅ 完成 |
| 06 | bank-06.ts | 1.6KB | 調色板/場景數據（純數據） | ✅ 完成 |
| 12 | bank-12.ts | 62KB | 音訊引擎 MML 解析器 + APU 寫入 | ✅ 完成 |
| 15 | bank-15.ts | 1.7KB | 音樂序列數據（純數據） | ✅ 完成 |
| 30 | bank-30.ts | 142KB | 系統庫（37 CODE 塊） | ✅ 完成 |
| 31 | bank-31.ts | 43KB | 啟動向量 + 賽場主循環 + 球員邏輯 | ✅ 完成 |

---

## Bank 間關係圖

```
MMC3 初始映射:
  $8000-$9FFF: Bank 00 (場景引擎)
  $A000-$BFFF: Bank 01 (比賽跳轉表)
  $C000-$DFFF: Bank 30 (系統庫 — 固定)
  $E000-$FFFF: Bank 31 (啟動向量 — 固定)

調用關係:
  bank-31 (啟動+主循環)
    ├─→ bank-30 (系統服務: 乘法/除法/坐標/Palette/CHR)
    ├─→ bank-00 (場景分派: 字節碼/對話/過場)
    └─→ bank-01 (比賽跳躍/物理)

  bank-00 (場景引擎)
    ├─→ bank-02 (NMI 渲染 + 場景數據加載)
    ├─→ bank-01 (比賽入口/輔助)
    └─→ bank-30 (跨 bank 調用/軟復位)

  bank-02 (NMI 渲染器)
    └─→ bank-30 (被調用入口)

  bank-12 (音訊引擎)
    └─→ bank-15 (音樂序列數據)

  bank-01 (比賽引擎)
    └─→ bank-30 (數據查表)
```

---

## 整合驗證清單

- [ ] 跨 bank import/export 對齊
- [ ] mock 依賴清理（bank00 引用了 mocks.ts）
- [ ] event-bus 對齊
- [ ] npm run test:engine 全部通過
- [ ] 建立 BUG 文檔 → bugs.md

---

## 階段

1. ✅ 各 bank 獨立翻譯完成
2. 🔄 跨 bank 整合驗證 + 清理 mock
3. ⏳ 完整測試 → 建立 BUG 文檔
4. ⏳ 逐一修復 → 逐次提交
