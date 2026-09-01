# Working In Progress — 当前进度快照

> 频繁更新。每次 push 前核对。**不要放私密信息或大段代码。**

---

## 上次 update: 2026-08-31 (V0.16)

### 完成
- ✅ V0.0-V0.15: ROM 逆向 (header/FNT/banner/ARM9+ARM7 反汇编/函数表 98.58%/命名 7.04%)
- ✅ NBM 42/42 解码 + numclo/numple 题库解码 (1000 题)
- ✅ SudokuBoard / Solver (MRV) / GameService / NumpleCatalog 数据层
- ✅ V0.16: pages/index 数独玩法 UI (grid/键盘/清除/提示/计时/完成检测/4 难度+每日)

### 进行中
- ⏳ (无 — 等待下一版本)

### 待办 (下一版 V0.17)
- undo/redo 栈 (game_service placeholder)
- 数字备注 (candidates, NDS 原版支持)
- NBM 图形资源接入 (icon/cursor/button/number_tiles)
- 真机/开发者工具验证 V0.16 UI

### 当前 git 状态
- HEAD = (V0.16 待 commit)
- branch = master (嵌套仓库, 无 remote; 通过父仓库 monkeycode push)
- 改文件: miniprogram/pages/index/{index.ts,wxml,wxss} + CHANGELOG.md + .codebuddy/*

---
