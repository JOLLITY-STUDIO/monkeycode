"use strict";
// Bank 10 — Scene Map & Location (纯数据 Bank)
// 基于 bank_10.asm 反汇编 + ROM 二进制完整追踪分析
// CPU 映射: $8000-$9FFF (MMC3 R6 select, 由 Bank 30 或其他 bank 映射)
// PRG offset: 0x014010-0x01600F
// CDL stats: code=0 data=7039 unacc=1153 (unchanged 2026-08-08)
// ⚠ 纯数据 bank,无可执行代码
Object.defineProperty(exports, "__esModule", { value: true });
const data = {
    bankId: 10,
    baseAddr: 0x14010, // PRG-ROM offset (Bank 0x0A * 0x2000)
    bankAddrBase: 0x8000, // CPU 映射窗口
    stats: {
        totalLines: 8200,
        codeBytes: 0, // 无代码!
        dataBytes: 7039,
        unaccessedBytes: 1153,
        subroutineCount: 0,
        dataTableCount: 6, // 识别的数据段
        note: "Bank 10 是纯数据 bank,包含场景描述/地图定位/对象布局数据。所有 CDL 标记为 'D' (数据),无可执行代码。数据可被 Bank 00/Bank 02 通过 Bank 切换后引用。",
        note2: "⚠ 虽然描述为 'Scene Map & Location',Bank 00 并不直接切换到此 bank。场景布局数据可能由 Bank 01/02 引用,或通过 Bank 30 跳转表间接访问。需要进一步验证实际调用方。",
    },
    // ── 数据段结构 ──
    dataSections: [
        {
            bankAddr: "$8000-$80BE",
            offset: "0x014010-0x0140CE",
            lines: "5-195",
            length: "190B (95 entries × 2B)",
            name: "场景指针表",
            desc: "Little-endian 16-bit 指针表。每 2 字节构成一个 Bank 10 内部指针(lo/hi)。被调用方(Bank 00 $8AF7 或 Bank 02)通过 index×2 索引读取,获得具体场景数据的偏移地址。",
            format: "index N → pointer[N] = ($80 + N*2) 的 lo/hi 字节 → 实际数据位于 Bank 10 内 $A0xx-$F5xx 区域",
            sample: [
                { index: 0, lo: "$BE", hi: "$A0", target: "$A0BE" },
                { index: 1, lo: "$C6", hi: "$A0", target: "$A0C6" },
                { index: 2, lo: "$F0", hi: "$A0", target: "$A0F0" },
                { index: 3, lo: "$1A", hi: "$A1", target: "$A11A" },
                { index: 4, lo: "$26", hi: "$A1", target: "$A126" },
            ],
            note: "CDL: 大部分 'D 1'(已引用),少量指针 '---'(未引用)。最后一个有效指针: $80BE → $F53D。",
        },
        {
            bankAddr: "$80BF-$87B6",
            offset: "0x0140CF-0x0147C6",
            lines: "196-1978",
            length: "~1782B",
            name: "场景数据块 A (已引用)",
            desc: "场景对象/布局描述数据,使用命令流格式。CDL 标记为 'D 1',被正常代码路径引用。",
            format: "命令流格式: $F0/$F1/$F5/$F7 操作码 + 变长参数 + $FF 终止符",
            opcodes: [
                { code: "$F0", desc: "可能的场景/记录开始标记" },
                { code: "$F1", desc: "坐标/位置命令(后跟参数如 $1E $xx)" },
                { code: "$F5", desc: "结构分隔符" },
                { code: "$F7 $00 $00 $00", desc: "零填充终结模式" },
                { code: "$FF", desc: "记录终止符" },
            ],
            dataTypes: [
                { range: "$80-$9F", desc: "Tile 索引(tile ID)" },
                { range: "$30,$3C,$3E", desc: "坐标/属性值" },
                { range: "$00", desc: "填充/占位" },
            ],
        },
        {
            bankAddr: "$878E-$8791",
            offset: "0x01479E-0x0147A1",
            length: "4B",
            name: "场景块 A-B 分隔",
            desc: "CDL 边界标记",
        },
        {
            bankAddr: "$87B7-$9385",
            offset: "0x0147C7-0x015395",
            lines: "1979-5002",
            length: "~3023B",
            name: "场景数据块 B (CDL未引用)",
            desc: "⚠ CDL 标记为 '---'(未被追踪到引用)。但数据格式与块 A 完全相同(同样的 $F0/$F1/$F5/$F7 命令流)。可能原因: CDL 未追踪所有代码路径,或为调试/未使用场景数据。",
            verify: "需要进一步在游戏代码中搜索引用此区域的路径,确认是否为 CDL 遗漏。",
        },
        {
            bankAddr: "$93AB-$9CA0",
            offset: "0x0153BB-0x015CB0",
            lines: "5040-7333",
            length: "~2293B",
            name: "场景数据块 C (已引用)",
            desc: "CDL 标记为 'D 1' 的场景数据块。格式可能是固定长度实体记录(~13B/条),包含对象坐标、方向等属性。",
        },
        {
            bankAddr: "$9CA7-$9FFF",
            offset: "0x015CB7-0x015FFF",
            lines: "7340-8196",
            length: "~857B",
            name: "Bank 结尾填充",
            desc: "全 $FF 字节填充,未使用 ROM 空间。Bank 10 实际数据范围: $8000-$9CA6 (7287B usable)。",
        },
    ],
    // ── 数据格式详解 ──
    dataFormat: {
        pointerTable: {
            desc: "$8000 开始的指针表索引 Bank 10 内所有场景数据块位置",
            entrySize: "2 bytes (little-endian)",
            totalEntries: "~95",
            addressing: "指针值 = Bank 10 内偏移,范围 $A0BE-$F53D",
        },
        commandStream: {
            desc: "场景布局的命令流格式, $F0/$F1/$F5/$F7 为操作码驱动的位置/对象/属性数据",
            sample: `
Line 196: $80BF: F5          ; 标记
Line 197: $80C0: F1 1E       ; 命令+参数(坐标?)
Line 199: $80C2: 36 88       ; tile数据
Line 201: $80C4: 37 FF       ; tile + 终止符
Line 203: $80C6: 00          ; 填充
      `,
        },
        entityRecord: {
            desc: "固定长度实体记录(可能为运动员/对象位置数据)",
            fields: [
                { offset: 0, size: 1, name: "Record ID / Type" },
                { offset: 1, size: 2, name: "X 坐标" },
                { offset: 3, size: 2, name: "Y 坐标" },
                { offset: 5, size: 1, name: "方向/属性" },
                { offset: 6, size: 1, name: "动画帧 / 状态" },
            ],
        },
    },
    // ── Bank 间关系 ──
    bankRelations: {
        summary: "Bank 10 是纯数据 bank,被上层业务 bank 通过 Bank 切换读取。需要验证实际调用方。",
        knownCallers: [
            { bank: "Bank 00 $8AF7", status: "❌ 不引用 Bank 10", desc: "$8AF7 从 Bank 02 $A0xx 读场景指针表,非 Bank 10" },
            { bank: "Bank 01", status: "❓ 待验证", desc: "可能通过 Bank 30 跳转表间接引用 Bank 10 数据" },
            { bank: "Bank 02", status: "❓ 待验证", desc: "场景控制器可能在某些路径下引用 Bank 10 场景数据" },
            { bank: "Bank 11/12", status: "❓ 待验证", desc: "比赛逻辑可能读取场景地图数据" },
        ],
        note: "⚠ PRG_RELATIONS 中 Bank 10 的 usedBy=[] 表明当前 CDL 分析未发现任何 bank 引用 Bank 10。这可能是 CDL 追踪覆盖不全,或 Bank 10 确实未被使用(可能是开发残留/调试数据)。需要扫描所有其他 bank 中 JSR $9FA8(A=0x0A) 和 JSR $C4B9(X=0x0A) 的调用。",
    },
    // ── 数据质量标记 ──
    quality: {
        cdlCoverage: "7039B accessed / 1153B unaccessed = 85.9% CDL 覆盖率",
        paddingStart: "$9CA7 (line 7340), 857B of $FF padding",
        issues: [
            "~3023B 数据标记为 CDL 未引用(块 B),但格式与已引用数据相同,可能为 CDL 遗漏",
            "无注释/标签 — 完全原始反汇编输出",
            "Bank 间引用关系需要进一步验证",
        ],
    },
};
exports.default = data;
