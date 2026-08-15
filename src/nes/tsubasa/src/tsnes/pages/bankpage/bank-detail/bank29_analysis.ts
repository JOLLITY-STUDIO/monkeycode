// Bank 29 — 球队战术/阵容数据 (Team Tactics & CPU Roster Data)
// 基于 bank_29.asm 反汇编 + ROM 二进制分析（8192 字节，100% 纯 .byte 数据）
//
// 加载方式（MMC3 切换 bank 29 → CPU $A000-$BFFF 窗口）:
//   - Bank 30: LDA #$1D → STA ram_0025 → JSR $CE2D（切换 + 长跳转）
//   - Bank 26: LDA #$1D → JSR $C54E（PRG Bank 切换 API）
//   - Bank 31: LDA #$1D → STA ram_0025（同 Bank 30 模式）
//
// 数据结构总览:
//   [0x0000 - 0x1AB1]  球队战术/阵型属性块（241 个块，每块以 00 00 分隔，多数 22 字节）
//   [0x1AB2 - 0x1AF5]  指针表（34 项 × 2 字节 LE，指向 $BAF6-$BCE0 阵容区）
//   [0x1AF6 - 0x1AF7]  00 00 表尾标记
//   [0x1AF8 - 0x1CFE]  CPU 球队阵容区（每条: GFX 4B + 队标 3B + [位置码,球员ID]×N + $0F 终止）
//   [0x1D00 - 0x1FFF]  0xFF 填充（未使用 768B）
//
// CPU 地址 = $A000 + offset，因此:
//   offset 0x1AB2-0x1AF5 → CPU $BAB2-$BAF5（指针表）
//   offset 0x1AF8-0x1CFE → CPU $BAF8-$BCFE（阵容区）
//
// 消费方（引用 $BAxx-$BExx 的 code bank）:
//   Bank 01 (30 处): $BA1C/$BA4C/$BB2E/$BC48/$BD64 ... — 主要消费者
//   Bank 00 (4 处):  $BB40/$BD00 ...
//   Bank 20 (2 处):  $BA87/$BA88 ...
//   Bank 28 (2 处):  $BAB2/$BAB3 ...
const data = {
  bankId: 29,
  baseAddr: 0x3A000,     // PRG offset (Bank 0x1D * 0x2000)
  bankAddrBase: 0xA000,  // CPU 映射窗口（$A000-$BFFF）
  mappedVia: 'MMC3 R6/R7 窗口: bank 0x1D 切到 $A000-$BFFF',

  stats: {
    totalBytes: 8192,
    codeBytes: 0,        // 纯数据 bank
    dataBytes: 4635,     // CDL 标记为数据
    unaccessedBytes: 3557,
    subroutineCount: 0,
    dataTableCount: 3,
    note: "Bank 29 是纯数据 bank（8200 行全部 .byte，无代码/标签/JSR/JMP）。包含 241 个 22 字节球队战术块、34 项指针表、CPU 球队阵容区。由 Bank 30/26/31 加载到 $A000 窗口，被 Bank 01 主消费。",
  },

  // ── 数据块结构 ──
  structure: {
    blockCount: 241,
    blockSize: 22,       // 多数块为 22 字节（以 00 00 分隔）
    blockRange: { start: 0x0000, end: 0x1AB1 },
    pointerTable: {
      offset: 0x1AB2,
      count: 34,
      entrySize: 2,      // LE 16-bit
      targetRange: { start: 0xBAF6, end: 0xBCE0 },
      endMark: 0x1AF6,
    },
    rosterArea: {
      offset: 0x1AF8,
      end: 0x1CFE,
      format: 'GFX 4B + 队标 3B + [位置码, 球员ID]×N + $0F 终止',
    },
    ffFill: { offset: 0x1D00, length: 768 },
  },

  // ── 指针表 (34 项, 指向阵容区各球队数据) ──
  // 每项: 2 字节 LE → CPU 地址 $BAF6-$BCE0
  rosterPointers: [
    0xBAF6, 0xBB00, 0xBB0E, 0xBB1C, 0xBB2A, 0xBB38, 0xBB48, 0xBB56,
    0xBB64, 0xBB72, 0xBB7C, 0xBB88, 0xBB9A, 0xBBA6, 0xBBB4, 0xBBC6,
    0xBBE6, 0xBBF0, 0xBBFE, 0xBC08, 0xBC12, 0xBC1C, 0xBC2A, 0xBC34,
    0xBC42, 0xBC50, 0xBC5E, 0xBC6C, 0xBC78, 0xBC86, 0xBC94, 0xBCA8,
    0xBCC0, 0xBCE0,
  ],

  // ── 已知消费方 (code bank 引用 $BAxx-$BExx) ──
  consumers: [
    { bank: 1, count: 30, addresses: ['$BA1C', '$BA4C', '$BB2E', '$BC48', '$BD64', '...'], desc: '球队/球员数据查询 — 花名册指针表($BA1C)、队伍GFX基址($BA4C)、姓名搜索($BB2E)、球员图形($BC48)' },
    { bank: 0, count: 4,  addresses: ['$BB40', '$BD00', '...'], desc: '系统服务 — 少量数据读取' },
    { bank: 20, count: 2, addresses: ['$BA87', '$BA88'], desc: '比赛辅助逻辑 — 战术数据' },
    { bank: 28, count: 2, addresses: ['$BAB2', '$BAB3'], desc: '辅助逻辑 — 战术数据' },
  ],

  // ── 加载方 (切换 bank 0x1D 的 code bank) ──
  loaders: [
    { bank: 30, pattern: 'LDA #$1D / STA ram_0025 / JSR $CE2D', desc: '主加载方 — 切换 + 长跳转' },
    { bank: 26, pattern: 'LDA #$1D / JSR $C54E', desc: '比赛引擎 — PRG Bank 切换 API' },
    { bank: 31, pattern: 'LDA #$1D / STA ram_0025', desc: '中断服务 — 同 Bank 30 模式' },
  ],

  // ── 数据表清单 ──
  dataTables: [
    { name: '战术/阵型属性块', bankAddr: '$8000-$9AB1', length: '~6834B', desc: '241 个 22 字节块，以 00 00 分隔。每块含 20 字节有效数据：队伍战术倾向、球员位置配置等（消费方 Bank 01/20/28）' },
    { name: '阵容指针表', bankAddr: '$BAB2-$BAF5', length: '68B', desc: '34 项 2 字节 LE 指针，指向 $BAF6-$BCE0 各球队阵容数据' },
    { name: 'CPU 球队阵容区', bankAddr: '$BAF8-$BCFE', length: '~519B', desc: '每球队: GFX 4B + 队标 3B + [位置码, 球员ID] 对 + $0F 终止符。球员ID 指向球员属性表' },
  ],
};

export default data;
