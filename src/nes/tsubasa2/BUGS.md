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

### B02-02 (已修复) — 22 个场景入口语义确认 + resetEntry case 4 误映射
- **现象**: TaskIndex 22 项 ADDR_XXXX 占位; SceneController.resetEntry 硬编码 `case 4: PASSWORD`, 但分发表 idx 4 实为 OAM 清空 ($85A3 JSR $9B7F), 密码场景 = idx 23 (0x17)。
- **核实** (对照 asm/bank02/code_sub.s + code_data.s $84C0-$87FA):
  - 分发表 (PASSWORD_DISPATCH_TABLE, asm $A491) 存储"目标-1" (PHA/PHA/RTS 跳转, RTS 弹出后 +1), 实际执行 = 表值+1。
  - 24 项语义全部确认 (详见 WBS G37): idx0=$84C1 密码界面初始化 (清屏+48 假名网格+sceneLoad 0x17)/idx1=$855A 角度计算 (ram_00EC>>2→0060/61, bit7 取补)/idx2=$857C JSR $9B91/idx3=$8582 双 NT 填充 $98EA/idx4=$85A3 JSR $9B7F OAM 清空/idx5-6=$85A9/$85B1 精灵辅助 LDX #$09 JSR $9F96/$9F89/idx7=$85B9 ram_0099=$FF/idx8-9=$85C0/$85CE MMC3 切 bank0/1 + ram_001B bit6 清/置/idx10-13=$85DC/$85E9/$8603/$861D 阵容装载 0/0x10/0x30/0x20 + 帧绘制 5/6/8/7/idx14=$862A 精灵滚动辅助/idx15=$8651 密码续关数据装载 $AA97/idx16=$869D 比赛阵容装载 (ram_04E5≠$FF 分支)/idx17=$877B 阵容装载 0x80/idx18=$8783 等待+OAM 拷贝 $88FB/idx19=$878E 精灵属性置 bit3+转续关装载/idx20=$87BE 等待+精灵属性 $A82F/idx21=$87CF 阵容装载 0x81/idx22=$87D7 精灵属性置 bit2 128 帧/idx23=$87FB 密码校验解码 (A5 28 20 7C 9E...)。
  - 顺带修复 `src/game/prg/code/index.ts` 预存错误: `PASSWORD_DISPATCH_TABLE` 从 PasswordSceneController 误导入 (该常量在 bank02-tables.ts, 现名 NMI_CALLBACK_TABLE)。
- **修复**:
  - TaskIndex 24 项全部改为确认语义名 (SCENE_00_PASSWORD_INIT / SCENE_01_ANGLE_CALC / SCENE_02_AUX_9B91 / SCENE_03_NT_FILL / SCENE_04_OAM_CLEAR / SCENE_05_SPRITE_9F96 / SCENE_06_SPRITE_9F89 / SCENE_07_FLAG_0099 / SCENE_08_BIT6_CLEAR / SCENE_09_BIT6_SET / SCENE_10_ROSTER_LOAD0 / SCENE_11_ROSTER_LOAD10 / SCENE_12_ROSTER_LOAD30 / SCENE_13_ROSTER_LOAD20 / SCENE_14_SPRITE_SCROLL / SCENE_15_CONTINUE_LOAD / SCENE_16_MATCH_ROSTER / SCENE_17_ROSTER_LOAD80 / SCENE_18_WAIT_OAM_COPY / SCENE_19_SPRITE_ATTR_BIT3 / SCENE_20_SPRITE_ATTR / SCENE_21_ROSTER_LOAD81 / SCENE_22_SPRITE_ATTR_BIT2 / SCENE_23_PASSWORD_CHECK)
  - SceneController.resetEntry: case 4 → case TaskIndex.SCENE_23_PASSWORD_CHECK (0x17 密码校验/续关解码), case 0 注释更正为 SCENE_00_PASSWORD_INIT
  - BootRouter 枚举注释统一标注"表值→实际执行 (RTS+1)"
- **验证**: 2026-08-22 src/game 区 tsc 零错误 (src/core 模拟器核心预存 1458 错误与本次无关), TaskIndex 旧名全清除, `_g37_verify.cjs` 全 PASS。详见 WBS G37。
