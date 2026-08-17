# 开发日志进度跟踪表

> 记录卡点、问题修复、攻关过程与计划外工作内容。

## v0.1.0（骨架 + 引擎 + 渲染 + 页面）

### 阶段 1：ROM 结构
- [x] NTR Header 解析：游戏码 `AXPE`，ARM9 入口 `0x2000800`，ARM7 入口 `0x2380000`，FNT=0x171800 / FAT=0x171C00
- [x] FAT/FNT 文件系统解包：98 个文件 → `extracted/` + `manifest.json` + `fnt_parsed.json`
  - 卡点：FNT 为非标准格式，目录项为 `[0x80|len][name][dirID][0xF0]`，文件按目录分组、`00` 终止；初版按标准格式解析导致计数溢出，改为经验格式扫描修复
- [x] ARM9/ARM7 反汇编（capstone, skipdata=True）：ARM9=131,946 条指令，ARM7=41,584 条指令

### 阶段 2：数据格式逆向
- [x] file_86 识别为 UTF-16LE 消息索引表（头 6B + 372×u32 嵌套偏移），可解码出 "Congratulations!" 等字符串
- [ ] file_94 拼图记录格式（进行中）：
  - 维度标记扫描工具 `scan_dims` 已就绪（05/0A/0F 尺寸标记位置列表）
  - 0x232A00 附近疑似教程区：`8字节零 + cnt:u16 + nhints:u16 + 提示序列`
  - 解法位图字段位置待 ARM9 代码确认（B1）
- [ ] messageList_*.dat 文本编码（B3，自定义编码）
- [ ] PR.sdat 音频（B4，非标准 SDAT）

### 阶段 3：游戏内核 + 渲染 + 页面（本日完成）
- [x] `src/core/types.ts` / `hints.ts` / `engine.ts` / `puzzle-loader.ts`
- [x] `src/render/renderer.ts`（平台无关 Canvas 渲染）
- [x] `src/data/puzzles.ts`（stub 数据，TODO(B1) 待真实解析替换）
- [x] 小程序页面 `pages/index`（type=2d Canvas + 触摸涂黑/画叉/循环 + 拖动绘制 + 进度/计时/完成遮罩）
- [x] HTML5 测试环境 `test/`（`build_web.cjs` 用 tsc 编译 TS → ES 模块，`index.html` 直接可玩）
- [x] 无界面测试 `tools/test_headless.mjs`：14 项断言全部通过

### 工具类开发
- `tools/parse_ntr_header.py`、`tools/extract_rom.py`、`tools/disasm.py`、`tools/sniff_files.py`、`tools/extract_puzzles.py`、`tools/build_web.cjs`、`tools/test_headless.mjs`

## 卡点与攻关记录
1. **FNT 解析溢出**：标准 NDS FNT 布局不适用 Picross DS → 按二进制特征自定义解析。
2. **capstone 提前停止**：数据字节被当指令 → `skipdata=True` 后指令数从 63 提升至 131,946。
3. **Node ESM 扩展名**：tsc 产物 import 无 `.js` 后缀 → 无界面测试用 `--experimental-specifier-resolution=node`。
4. **引擎完成检测 bug**：`checkSolved` 曾要求全格 filled（永远无法完成）→ 改为"filledCount==totalFilled 且无误填格"（见 BUGS.md）。

## 下一步
- [ ] B1：从 ARM9 反汇编确认 file_94 记录格式 → 替换 stub 数据
- [ ] B3：messageList 文本编码 → E4 多语言
- [ ] E1/E2：拼图选择界面 + 结算动画
- [ ] E3：存档
- [ ] F1/F2：UI 与架构优化
