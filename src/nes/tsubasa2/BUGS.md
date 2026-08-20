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
