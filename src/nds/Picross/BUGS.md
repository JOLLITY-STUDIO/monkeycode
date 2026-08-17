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
| BUG-008 | 记录区提示与解法区映射未确认 | ✅ | G4 全量匹配定案：`tools/_g4_match.py` 对 90 条记录 hint lists × 256 解法提示全量比对 → 223/256 无匹配、33/256 多匹配（命中 24 条提示稀疏记录）→ **记录区与解法区无提示映射**；保持引擎从解法推导提示（hints.ts），正确性自动保证，不接入 ROM 记录区 |
| BUG-007 | 失误达到 maxMistakes 未触发游戏结束 | ✅ | G5：引擎实现 5 次失误判负（failed + 停表），页面失败结算（GAME OVER 面板/重试）；`test_headless` 增加失败流用例 |
| BUG-009 | file_94 解法区 33 块全零（空拼图） | ✅ | 全 0 解法块无填充、不可玩（开局即 solved）；`extract_puzzles.py` 过滤（保留原 ROM id），256→223 题；`pages/index` 改为按 id 定位（数组索引与 id 不再一致） |
