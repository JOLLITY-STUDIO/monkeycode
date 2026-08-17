/**
 * 最终修正版：正确的地址映射 + 完整的 $8895/$8920 管线 + Bank 07 metatile
 * 
 * 关键发现：
 * - $8893 入口: LDA $AA47,X → STA $0408,Y → INX → 循环10次
 * - $8895 入口: TAX → 第一次写A值本身, 后面9次读$AA47[X++]
 * - $AA47 在 $A000-$BFFF 窗口: offset = $AA47 - $A000 = $0A47
 */
const fs = require('fs');
const path = require('path');

function parsePrgBank(filePath) {
    const c = fs.readFileSync(filePath, 'utf8');
    const m = c.match(/const\s+\w+\s*:\s*readonly\s+number\[\]\s*=\s*\[([\s\S]*?)\];/);
    return m[1].split(',').map(s => {
        const n = s.trim().match(/0x([\da-fA-F]+)/);
        return n ? parseInt(n[1], 16) : 0;
    });
}

const BANK02 = parsePrgBank(path.join(__dirname, '..', 'rom-data', 'prg-bank-02.ts'));
const BANK07 = parsePrgBank(path.join(__dirname, '..', 'rom-data', 'prg-bank-07.ts'));

// PRG Bank 正确映射:
// Bank 02 可映射到 $8000-$9FFF 或 $A000-$BFFF
// $AA47 在 MMC3 中通过 Reg6 映射到 $A000-$BFFF
function b2a(addr) { return addr - 0xA000; }  // $A000-$BFFF window
function b2(addr)  { return addr - 0x8000; }   // $8000-$9FFF window
function b7(addr)  { return addr - 0xC000; }   // Bank 07 fixed

console.log('Bank 02 size:', BANK02.length);
console.log('Bank 07 size:', BANK07.length);

// $AA47 表：offsets 0xA47-0xAE6 (160 bytes = 16 metatile × 10 tiles)
const AA47_START = b2a(0xAA47);
console.log(`AA47 table at Bank02[${AA47_START}] (0x${AA47_START.toString(16)})`);

// Dump AA47 表
console.log('\n=== $AA47 Metatile Tile Index Table (16 types × 10 tiles) ===');
for (let type = 0; type < 16; type++) {
    const base = AA47_START + type * 10;
    const tiles = BANK02.slice(base, base + 10);
    console.log(`  type $${type.toString(16).padStart(2,'0')}: [${tiles.map(t=>'$'+t.toString(16).padStart(2,'0')).join(' ')}]`);
}

// ============================================================
// 实现 $8895 子程序（正确版）
// ============================================================
function sub8895(aParam, workArea) {
    /**
     * $8895: TAX               ; X = A ($80或$81)
     * $8896: STA $0408,Y       ; 写 A 值本身(第一次)
     * $8899: INX               ; X++
     * $889A: TYA → ADC #4 → TAY; Y+=4
     * $88A1: BCC $8893         ; 回 $8893
     * $8893: LDA $AA47,X       ; 从表读
     * $8896: STA $0408,Y       ; 写
     * ...循环到Y>=40
     */
    let x = aParam;  // X = 原始A参数 (80, 81, 00, 10, 20, 30)
    let y = 0;
    const metatiles = [];
    
    for (let i = 0; i < 10; i++) {
        let tileIdx;
        if (i === 0) {
            // 第一次：TAX后A没变, STA $0408,Y 写入A值本身
            tileIdx = aParam;
        } else {
            // 第2-10次：INX后从AA47[X]读
            tileIdx = BANK02[AA47_START + x];  // LDA $AA47,X
        }
        
        workArea[y] = tileIdx;
        metatiles.push({ slot: i, x: x, tile: tileIdx });
        
        x++;        // INX
        y += 4;     // TYA + ADC #4 + TAY
    }
    return { metatiles, finalX: x };
}

// 测试 $8895 的各种参数
console.log('\n=== $8895 expansion results ===');
for (const param of [0x00, 0x10, 0x20, 0x30, 0x80, 0x81]) {
    const wa = new Array(40).fill(0);
    const r = sub8895(param, wa);
    console.log(`  param=$${param.toString(16)}: [${r.metatiles.map(m=>'$'+m.tile.toString(16).padStart(2,'0')).join(' ')}]`);
}

// ============================================================
// 模拟 A72C（正确地址映射）
// ============================================================
class Ram {
    constructor() {
        this.m = {};
    }
    r(addr) { return this.m[addr] || 0; }
    w(addr, val) { this.m[addr] = val & 0xFF; }
}

function a72c(ram, a, x_count, y_start, deltaX, deltaY, mask, flags) {
    ram.w(0xE9, a);
    let y = y_start;
    let records = [];
    
    for (let i = 0; i < x_count; i++) {
        // ADC $04E4 + $ED
        ram.w(0xE4, (ram.r(0xE4) + deltaX) & 0xFF);
        // ADC $04E7 + $EC  
        ram.w(0xE7, (ram.r(0xE7) + deltaY) & 0xFF);
        
        if ((ram.r(0xE7) & mask) === 0) {
            ram.w(0x468 + y, ram.r(0xE4));   // NT_lo
            ram.w(0x469 + y, a);               // param
            ram.w(0x46A + y, flags);            // flags
            ram.w(0x46B + y, ram.r(0xE7));     // NT_hi
            records.push({
                addr: 0x468 + y,
                ntLo: ram.r(0xE4),
                param: a,
                flags: flags,
                ntHi: ram.r(0xE7),
            });
            y += 4;
        }
    }
    return { records, finalY: y };
}

// ============================================================
// 完整模拟两条分支
// ============================================================
console.log('\n========================================');
console.log('  BRANCH A: $04E5 != $FF (Calls 1&2)');
console.log('========================================');

const ramA = new Ram();
ramA.w(0xE4, 0);
ramA.w(0xE7, 0);

// Call 1: F7 with mask=$07, 47 iter
let r1 = a72c(ramA, 0xF7, 0x2F, 0x80, 0xFF, 0xFE, 0x07, 0x00);
console.log(`Call 1 (F7): ${r1.records.length} records, Y→$${r1.finalY.toString(16)}`);

// Call 2: FC with mask=$00, 48 iter (continuation)
ramA.w(0xE4, 0);
ramA.w(0xE7, 0);
let r2 = a72c(ramA, 0xFC, 0x30, r1.finalY, 0x01, 0xFF, 0x00, 0x00);
console.log(`Call 2 (FC): ${r2.records.length} records, Y→$${r2.finalY.toString(16)}`);
const recordsA = [...r1.records, ...r2.records];
console.log(`Branch A total: ${recordsA.length} records`);

console.log('\n========================================');
console.log('  BRANCH B: $04E5 == $FF (Calls 3-5)  ');
console.log('========================================');

const ramB = new Ram();
ramB.w(0xE4, 0);
ramB.w(0xE7, 0);

// Call 3: F7 with mask=$07, flags=$02, 47 iter
let r3 = a72c(ramB, 0xF7, 0x2F, 0x80, 0xFF, 0xFE, 0x07, 0x02);
console.log(`Call 3 (F7): ${r3.records.length} records, Y→$${r3.finalY.toString(16)}`);

// Call 4: FE with X=$08, 不加mask(?)
ramB.w(0xE4, 0);
ramB.w(0xE7, 0);
let r4 = a72c(ramB, 0xFE, 0x08, r3.finalY, 0x01, 0xFF, 0x07, 0x02);
console.log(`Call 4 (FE): ${r4.records.length} records, Y→$${r4.finalY.toString(16)}`);

// Call 5: F6 with mask=$03, 28 iter
ramB.w(0xE4, 0);
ramB.w(0xE7, 0);
let r5 = a72c(ramB, 0xF6, 0x1C, 0xB8, 0x02, 0xFF, 0x03, 0x00);
console.log(`Call 5 (F6): ${r5.records.length} records, Y→$${r5.finalY.toString(16)}`);
const recordsB = [...r3.records, ...r4.records, ...r5.records];
console.log(`Branch B total: ${recordsB.length} records`);

// 合并所有记录进行分析
const allRecords = [...recordsA, ...recordsB];
console.log(`\nCombined records: ${allRecords.length}`);

// ============================================================
// 文本化球场地图
// ============================================================

// 统计 param 分布
const paramCount = {};
for (const r of allRecords) {
    const key = r.param.toString(16);
    paramCount[key] = (paramCount[key] || 0) + 1;
}
console.log('\nParam distribution:', paramCount);

// 按 NT 坐标绘制到网格
const GRID_W = 64; // 2个NT屏宽
const GRID_H = 30;
const grid = Array(GRID_H).fill(null).map(() => Array(GRID_W).fill('··'));

function getChar(param) {
    switch (param & 0xFF) {
        case 0xF7: return '██';
        case 0xFC: return '▓▓';
        case 0xF6: return '▒▒';
        case 0xFE: return '░░';
        default: return '??';
    }
}

for (const r of allRecords) {
    const col = ((r.ntLo >> 3) + ((r.ntHi & 1) ? 32 : 0)) % GRID_W;
    const row = (r.ntHi >> 4) & 0x1F;
    if (row < GRID_H && col < GRID_W) {
        grid[row][col] = getChar(r.param);
    }
}

console.log('\n========================================');
console.log('    TEXT FIELD MAP (Branch A+B merged)');
console.log('    ██=F7  ▓▓=FC  ▒▒=F6  ░░=FE');
console.log('========================================');
const filledRows = [];
for (let row = 0; row < GRID_H; row++) {
    const line = grid[row].join('');
    filledRows.push(line);
}

// 只显示有内容的行
let hasContent = false;
for (let row = 0; row < GRID_H; row++) {
    const r = filledRows[row];
    if (r.replace(/··/g, '').length > 0) {
        hasContent = true;
        const label = row.toString().padStart(2, '0');
        // 截断显示
        const col0_32 = grid[row].slice(0, 32).join('');
        const col32_64 = grid[row].slice(32, 64).join('');
        console.log(`  ${label}: ${col0_32} | ${col32_64}`);
    }
}

// 统计覆盖率
const filled = allRecords.length;
console.log(`\n  Total records placed: ${filled}`);
console.log('========================================');

// ============================================================
// Bank 07 metatile 定义分析
// ============================================================
console.log('\n=== Bank 07: Metatile Pointer Table at $C000 ===');
// Bank 07 $C000-$C12C: 75个 metatile 指针 (每项2字节 → Bank 07 内部偏移)
for (let i = 0; i < 30 && i < 75; i++) {
    const ptr_lo = BANK07[b7(0xC000 + i * 2)];
    const ptr_hi = BANK07[b7(0xC000 + i * 2 + 1)];
    const ptr = (ptr_hi << 8) | ptr_lo;
    console.log(`  MT[${i}]: ptr=$${ptr.toString(16)} (Bank07 offset $${
        b7(ptr).toString(16)})`);
}

// 查看第一个 metatile 的实际 tile 数据
const MT0_ADDR = 0xA0D4; // 从 Bank 07 表读取 (little-endian)
const mt0_off = b7(MT0_ADDR);
console.log(`\n  Metatile[0] at Bank07 offset $${mt0_off.toString(16)}:`,
    BANK07.slice(mt0_off, mt0_off + 8).map(b => '$' + b.toString(16)).join(' '));
