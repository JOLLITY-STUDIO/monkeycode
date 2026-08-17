# BUG 记录

> 记录逆向/转写过程中发现的差异与缺陷。状态：🔄待修 / ✅已修 / ⬜待确认

| ID | 描述 | 状态 | 说明 |
|---|---|---|---|
| BUG-001 | extract_puzzles.py 硬编码偏移 0x232A28 触发断言崩溃 | ✅ | 该偏移并非 (5,5) 记录头，实际维度标记在 0x232A2C 起的提示序列中；改为扫描式工具 + stub 输出 |
| BUG-002 | 引擎 checkSolved 要求所有格均为 filled | ✅ | 正确解法只要求"所有解法格已填 + 无误填格"；已改为 filledCount==totalFilled 且无错误填充 |
| BUG-003 | FNT 标准解析溢出 | ✅ | Picross DS 使用自定义 FNT 格式，按 `[0x80|len][name][dirID][0xF0]` 特征解析 |
| BUG-004 | capstone 数据误识别为指令 | ✅ | 启用 skipdata=True，ARM9 指令数 63 → 131,946 |
| BUG-005 | 终端/Node ESM import 缺少扩展名 | ✅ | test-build 使用 `--experimental-specifier-resolution=node` 运行无界面测试 |
| BUG-006 | file_94 解法位图字段位置 | ⬜ | 待 ARM9 代码确认记录格式后更新（关联 B1） |
| BUG-007 | 失误达到 maxMistakes 未触发游戏结束 | ⬜ | 原版 5 次失误结束；当前仅计数不判负，待 E2 结算实现 |
