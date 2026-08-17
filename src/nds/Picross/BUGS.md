# BUG 记录

> 记录逆向/转写过程中发现的差异与缺陷。状态：🔄待修 / ✅已修 / ⬜待确认

| ID | 描述 | 状态 | 说明 |
|---|---|---|---|
| BUG-001 | extract_puzzles.py 硬编码偏移 0x232A28 触发断言崩溃 | ✅ | 该偏移并非 (5,5) 记录头，实际维度标记在 0x232A2C 起的提示序列中；改为扫描式工具 + stub 输出 |
| BUG-002 | 引擎 checkSolved 要求所有格均为 filled | ✅ | 正确解法只要求"所有解法格已填 + 无误填格"；已改为 filledCount==totalFilled 且无错误填充 |
| BUG-003 | FNT 标准解析溢出 | ✅ | Picross DS 使用自定义 FNT 格式，按 `[0x80|len][name][dirID][0xF0]` 特征解析 |
| BUG-004 | capstone 数据误识别为指令 | ✅ | 启用 skipdata=True，ARM9 指令数 63 → 131,946 |
| BUG-005 | 终端/Node ESM import 缺少扩展名 | ✅ | test-build 使用 `--experimental-specifier-resolution=node` 运行无界面测试 |
| BUG-006 | file_94 解法位图字段位置 | ✅ | 解法区定案：`0x10c0000` 起 256B/块（16×16 每格1字节），空=0/1/2、填充=3-9；256 块全部提取为真实拼图（v0.4） |
| BUG-008 | 记录区提示与解法区映射未确认 | ⬜ | `_b1_d1` 验证：0xb2fd00 记录区 801 hint list 与解法块提示匹配率仅 3/32，且记录0-2提示相同解法不同 → 顺序映射不成立；提示由引擎从解法自动推导（hints.ts），不影响玩法 |
| BUG-007 | 失误达到 maxMistakes 未触发游戏结束 | ⬜ | 原版 5 次失误结束；当前仅计数不判负，待 E2 结算实现 |
