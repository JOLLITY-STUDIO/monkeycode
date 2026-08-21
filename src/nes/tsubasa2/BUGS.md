# BUG 记录

## Bank 29 核对发现

### B29-01 (已修复) — bank29_analysis.ts 战术块计数不一致
- **现象**: `pages/bankpage/bank-detail/bank29_analysis.ts` 的 `stats.blockCount` 与注释、`structure.blockCount`、`dataTables` 描述均写 "241 个战术块"。
- **实际**: 数据层 `src/game/data/prg/team/roster.ts` 的 `TACTICAL_BLOCKS` 按 "00 00 分隔 + 段长 ≥4" 实际解析为 **183 块**（与 roster.ts 头部注释 "×183" 一致）。块长度分布: 22 字节为主(128 块)，其余 4~145 字节不等。
- **修复**: 将 analysis 中所有 241 → 183，并更新相关注释，与数据层保持一致。
- **验证**: `npx tsc -p tsconfig.json --noEmit` 零错误。

### B29-02 (核对通过, 无需修复) — PRG_BANK_29 与 _full.s 字节一致
- **核对**: `asm/bank29/_full.s` 的 `.byte` 共 8192 字节，与 `roster.ts` 的 `PRG_BANK_29` 前 8192 字节逐字节比对 **DIFF=0**，ASM 数据完整。
- **补充确认**: 指针表 34 项 (0x1AB2-0x1AF5) 与 ASM 一致；CPU 阵容区 34 队 (0x1AF8-0x1D00) 解析正确，末队地址 0xBCE0 与指针表末项吻合。

### B02-01 (已修复) — BootRouter 编造 RESET 分发链 + TaskIndex 虚假状态机
- **现象**: `src/game/prg/code/system/BootRouter.ts` 注释声称存在 "RESET 分发链 BOOT→TITLE→MEETING→STORY→PASSWORD→MATCH→RESULT", TaskIndex enum 列 7 个状态 (0-6), resetChain()/next() 方法实现"线性 +1 推进"状态机。
- **核实**:
  1. asm bank02 `$8484` 分发器查 `$A491` 表共 **24 项**入口地址 (idx 0-23), 不是 7 项。
  2. asm 中 ram_00ED 唯一的 `INC` 在 `$8A14`, 是 16 位指针 `$00EC/$00ED` 高字节自增 (写 NT 指针推进), 不是场景状态机推进。
  3. 实际场景加载通过 `GameSystemService.sceneLoad(sceneId)` (bank0 $8AF7) 显式指定 sceneId (0-23 任意值), 由脚本 `OpSceneLoad (0xFA)` 触发, 可任意跳转 (如 PasswordSceneController 加载 0x17=23, HardwareInitService 初始化加载 0)。
  4. 不存在"BOOT→TITLE→...→RESULT 顺序自动推进"的链路。
- **修复**:
  - 删除 resetChain() / next() 两个编造方法 (无外部调用, 安全删除)
  - TaskIndex enum 改为 24 项, 已确认语义 2 项 (SCENE_00_INIT / SCENE_23_PASSWORD), 其余 22 项用 ADDR_XXXX 命名标注"待逐个对照 asm 确认"
  - 类头注释改为"$8484 场景分发器", 区分 sceneLoad (装载) 与 $8484 dispatcher (帧处理) 两个概念
- **验证**: `npx tsc --noEmit` 零错误, lint 零错误。
- **遗留**: 22 个场景入口的精确语义 (标题/会议/剧情/比赛/结果等) 待逐个对照 asm bank02 $84C0-$87FA 代码段确认。
