# Bug 记录 — 天使之翼2 NES 逆向工程

## Bug #1: MMC3 $A000-$BFFF Bank 映射错误 (Roster 读取到全 0xFF)

**发现日期**: 2026-07-18  
**严重程度**: 🔴 Critical (数据层)  
**状态**: ✅ 已修复

### 现象

HTML 球员数据查看器 (`data/_dump_player_data.html`) 显示所有球队阵容数据为空（player ID 均为 0xFF），导致整个球员数据提取链路无效。

### 根因

`$01:8893 LDA $AA47,X` 指令从 CPU 地址 `$AA47` 读取 roster 数据，该地址在 `$A000-$BFFF` 窗口。

MMC3 mapper 将 `$A000-$BFFF` 映射到独立的 **bank 寄存器 7**（不同于 `$8000-$9FFF` 使用的 bank 寄存器 6）。当代码执行 `$01:8893` 时，**`$A000-$BFFF` 窗口映射的是 Bank 3 而非 Bank 1**。

之前使用简单线性映射 `bankOffset(1, 0xAA47)` 读取了 Bank 1 的数据段，该位置全是 `0xFF`（未使用/填充空间）。

### 修复

**受影响文件**:

| 文件 | 修复内容 |
|------|----------|
| `data/_dump_player_data.html` | `bankOff(1, 0xAA47)` → `bankOff(3, 0xAA47)` |
| `data/_x_dump_players.cjs` | `bankOffset(1, 0xAA47)` → `bankOffset(3, 0xAA47)` |

**验证方法**:
```js
// Bank 3, offset 0xA47 (ROM 位置: HEADER_SIZE + 3 * 16384 + (0xAA47 - 0x8000))
// 预期：包含 {243, 0, 225, ...} 的 11+11 球员ID数组
// 不再全是 0xFF
```

### 影响范围

- Roster 数据提取（球队阵容、阵型、控制字节等）
- 所有基于 roster 的下游数据（球员属性关联）

### 教训

- **MMC3 的 `$8000-$9FFF` 和 `$A000-$BFFF` 使用不同 bank 寄存器**，不能假设同一个 bank 号覆盖两个区域
- 从反汇编代码中确定数据位置时，必须追踪运行时 MMC3 的 bank 寄存器写入指令，确认实际映射关系
- 建议建立 MMC3 bank trace 表，记录每个函数入口点的 bank 寄存器状态

---

## 已知问题 (待解决)

### Issue #1: 球员属性值编码格式未完全破解

- `prg.txt` line 19455-19463 的 RLE 解码代码已实现，但解码出的单字节值与游戏内实际数值的映射关系尚未完全确定
- Bank $03 的 6-byte records（按 classType 索引）包含基础能力值，但数值编码格式待确认
- **影响**: HTML 显示的是 hex/dec raw 数值，不是游戏内实际属性值

### Issue #2: 球员名称表未定位

- 名称很可能在 CHR ROM 中（tile-based 日文），或 PRG ROM 的某个 data bank 中
- 需要通过代码追踪 `$2007` 写入来定位名称 tile 的 ROM 来源

### Issue #3: prg.txt 不含 Data 段定义

- `prg.txt` 是 da65 反汇编输出，仅包含代码反汇编，不包含数据表（`.byte` 定义）
- 所有 data 表需要直接从 `.nes` ROM 文件或 CDL 标注的 data 段读取
- 这使得 `prg.txt` 行号查找数据表不可行；需要通过 `bankOff()` 直接定位 ROM offset

---

## 版本记录

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.1 | 2026-07-18 | 修复 MMC3 Bank 3 roster 映射 + 添加 RLE decoder + HTML 数据伴侣增强 |
| 1.0.0 | - | 初始版本 |
