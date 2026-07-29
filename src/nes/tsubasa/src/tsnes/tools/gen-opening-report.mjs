import { readFileSync, writeFileSync } from 'fs';

const d = readFileSync(
  'trace/Captain Tsubasa II - Super Striker (Japan)-openning2.log',
  'utf8'
);
const lines = d.split('\n');
const out = [];

// ================================================================
// 開場動畫 Trace 分析 + 代碼映射報告
// ================================================================

out.push('='.repeat(72));
out.push('  《天使之翼 II》開場動畫 — Trace Log 執行路徑分析報告');
out.push('='.repeat(72));
out.push('');
out.push(`Trace 文件: trace/Captain Tsubasa II - Super Striker (Japan)-openning2.log`);
out.push(`總行數: ${lines.length.toLocaleString()}`);
out.push('');

// === 1. 幀統計 ===
const frames = new Set();
lines.forEach(l => { const f = l.match(/^f(\d+)/); if (f) frames.add(parseInt(f[1])); });
const sortedFrames = [...frames].sort((a, b) => a - b);
out.push(`幀範圍: f${sortedFrames[0]} ~ f${sortedFrames[sortedFrames.length - 1]}`);
out.push(`總幀數: ${sortedFrames.length} (約 ${Math.round(sortedFrames.length / 60)} 秒 @ 60fps)`);
out.push('');

// === 2. Bank 使用分析 ===
const bankAddrs = new Map(); // bank -> {code: Set, data: Set}
lines.forEach(l => {
  const m = l.match(/\$([0-9A-Fa-f]+):([0-9A-Fa-f]{4})/);
  if (!m) return;
  const bank = parseInt(m[1], 16);
  const addr = parseInt(m[2], 16);
  if (!bankAddrs.has(bank)) bankAddrs.set(bank, new Set());
  bankAddrs.get(bank).add(addr);
});

out.push('=== 使用的 MM3 Bank 及其角色 ===');
out.push('');

const bankInfo = [
  { phys: 0x00, file: 'bank-00', hex2asm: 'prg_bank_00_dispatch_scene_engine.ts', role: '場景調度 / 主循環' },
  { phys: 0x01, file: 'bank-01', hex2asm: 'prg_bank_01_match_jump.ts', role: '比賽跳轉 / 標題畫面 / NMI PPU 設置' },
  { phys: 0x06, file: 'bank-12', hex2asm: 'prg_bank_12_audio.ts', role: '音頻引擎 / 精靈動畫管理 (MML 解析)' },
  { phys: 0x02, file: 'bank-02', hex2asm: 'prg_bank_02_nmi_renderer.ts', role: 'NMI 渲染器 (未在 trace 中執行?)' },
  { phys: 0x0F, file: 'bank-30', hex2asm: 'prg_bank_30_system_lib.ts', role: '固定 Bank (系統庫 / NMI 向量)' },
];

bankInfo.forEach(b => {
  const addrs = bankAddrs.get(b.phys);
  if (addrs) {
    out.push(`### Bank $${b.phys.toString(16).padStart(2, '0')} → ${b.file}.ts`);
    out.push(`    角色: ${b.role}`);
    out.push(`    執行唯一地址: ${addrs.size}`);
    out.push(`    地址範圍: $${Math.min(...addrs).toString(16).toUpperCase()} - $${Math.max(...addrs).toString(16).toUpperCase()}`);
    out.push('');
  } else {
    out.push(`### Bank $${b.phys.toString(16).padStart(2, '0')} → ${b.file}.ts`);
    out.push(`    角色: ${b.role}`);
    out.push(`    狀態: 未在 trace 中出現`);
    out.push('');
  }
});

// === 3. PPU 寫入分析 ===
const ppuStats = new Map();
lines.forEach(l => {
  for (let r = 0; r <= 7; r++) {
    const reg = `$200${r}`;
    if (l.includes(reg)) ppuStats.set(reg, (ppuStats.get(reg) || 0) + 1);
  }
});

out.push('=== PPU 寄存器寫入統計 ===');
out.push('');
out.push('| 寄存器 | 功能 | 寫入次數 |');
out.push('|:--|:--|--:|');
[...ppuStats.entries()]
  .sort((a, b) => b[1] - a[1])
  .forEach(([reg, cnt]) => {
    const names = {
      '$2000': 'PPU_CTRL — NMI/VRAM/NameTable 控制',
      '$2001': 'PPU_MASK — 顯示/精靈/背景開關',
      '$2005': 'PPU_SCROLL — 畫面滾動位置',
      '$2006': 'PPU_ADDRESS — VRAM 地址指針',
      '$2007': 'PPU_DATA — VRAM 數據寫入',
    };
    out.push(`| ${reg} | ${names[reg] || '—'} | ${cnt} |`);
  });
out.push('');

// === 4. 關鍵幀: f282 (VRAM 清零 + 精靈 DMA) ===
out.push('='.repeat(72));
out.push('  關鍵幀分析 #1: f282 — VRAM 清零 + 精靈 DMA 設置');
out.push('='.repeat(72));
out.push('');
out.push('執行路徑 (516 行, 代碼映射):');
out.push('');
out.push('```');
out.push('$00:9950 → bank-00.ts:ppuClearArea()');
out.push('  │ 循環: STA $2007 = 0x00 (清 VARM)');
out.push('  │ DEY / BNE $9950');
out.push('  │');
out.push('  ├─ $00:9956: LDA $E6 → 計算下一個 VRAM 行');
out.push('  │  ADC #$20, STA $E6');
out.push('  │  LDA $E7, ADC #$00, STA $E7');
out.push('  │  DEC $E8, BNE $9942 → 繼續下一行');
out.push('  │');
out.push('  └─ $00:9967: 恢復 PPU 狀態');
out.push('     STA $2001 (PPU_MASK = $1E)');
out.push('     STA $2000 (PPU_CTRL = $88, 開 NMI)');
out.push('     RTS → 返回調用者 $85A2');
out.push('');
out.push('$00:85A2 → bank-00.ts:ppuClearInit()');
out.push('  │ LDA #$00, STA $E6');
out.push('  │ LDA #$24, STA $E7  (VRAM 起始 $2400)');
out.push('  │ LDY #$20, LDX #$20');
out.push('  │ JSR $98E8 → ppuClearArea()');
out.push('  │');
out.push('  └─ 切換到 bank-01 $A8D5:');
out.push('');
out.push('$01:A8D5 → bank-01.ts:oamDmaSetup()');
out.push('  │ 循環: 讀 $0468+Y → OAM buffer $0200+Y');
out.push('  │ 寫入 4 bytes per sprite: Y, tile, attr, X');
out.push('  │ INY x4; 若 Y != 0 繼續 → 直到填滿 256 OAM bytes');
out.push('```');
out.push('');

// === 5. 關鍵幀: f2645 (音頻/精靈引擎) ===
out.push('='.repeat(72));
out.push('  關鍵幀分析 #2: f2645 — 音頻引擎 + 精靈動畫更新');
out.push('='.repeat(72));
out.push('');
out.push('執行路徑 (157 行, 代碼映射):');
out.push('');
out.push('```');
out.push('$06:84A6 → bank-12.ts:音頻通道處理 (MML 音符解析)');
out.push('  │ LDX $F3 → DEX → LDA #0');
out.push('  │ STA $07F4,X (清除通道筆記標記)');
out.push('  │ LDA $07EA,X (檢查通道活躍)');
out.push('  │ BNE $84C0 → 跳到屬性更新');
out.push('  │');
out.push('  ├─ 音符開始: LDX $F2, LDA #1');
out.push('  │  STA $0709,X (重置 duration counter)');
out.push('  │  LDA #0, LDY #4, STA ($F0),Y');
out.push('  │');
out.push('  ├─ $06:80E1 → bank-12.ts:音頻通道更新');
out.push('  │  DEC $0709,X → 檢查 duration');
out.push('  │  BNE $8109 → 還有剩餘，跳到屬性處理');
out.push('  │  LDA ($F0),Y (讀下一個 MML 字節)');
out.push('  │  PHA → ADC #2 → STA ($F0),Y (更新指針)');
out.push('  │  PLA → TAY → LDA ($F6),Y (讀頻率數據)');
out.push('  │  STA $0709,X (設新 duration)');
out.push('  │');
out.push('  └─ $06:81DB → bank-12.ts:精靈屬性處理');
out.push('     LDA ($F0),Y → TAX → AND #$F0 (擷取屬性)');
out.push('     AND #$20 → BEQ (vol=0 → 靜音)');
out.push('     STA ($F0),Y (寫回 PPU 精靈屬性)');
out.push('');
out.push('$01:A175 → bank-01.ts:NMI PPU 寄存器設置');
out.push('  │ STY $2006 (PPU_ADDR hi)');
out.push('  │ STA $2006 (PPU_ADDR lo) → 設 PPU VRAM 地址');
out.push('  │ STA $2000 (PPU_CTRL = $88/$89)');
out.push('  │ STA $2005 (PPU_SCROLL = 0)');
out.push('  │ STA $2005 (PPU_SCROLL = 0)');
out.push('```');
out.push('');

// === 6. Bank 切換時間線 ===
out.push('=== Bank 切換事件 (STA $8000/$8001) ===');
out.push('');
const switches = [];
lines.forEach((l, i) => {
  if (l.includes('STA $8000') || l.includes('STA $8001')) {
    const f = l.match(/^f(\d+)/);
    const a = l.match(/A:(\$?[0-9A-Fa-f]+)/);
    const reg = l.includes('$8000') ? '8000' : '8001';
    switches.push({ i, fn: f ? parseInt(f[1]) : 0, reg, a: a ? a[1] : '?' });
  }
});
switches.forEach(s => {
  out.push(`  f${s.fn}: STA $${s.reg} = ${s.a} (換 Bank)`);
});
out.push('');

// === 7. 完整數據流 ===
out.push('='.repeat(72));
out.push('  Tiles / Palette / Nametable 數據流向');
out.push('='.repeat(72));
out.push('');
out.push('### 數據來源');
out.push('');
out.push('| 數據類型 | ROM Bank | hex2asm 文件 | game-engine 文件 |');
out.push('|:--|:--|:--|:--|');
out.push('| 角色精靈 CHR | bank-07 | prg_bank_07_sprite_data.ts | bank-07.ts (skeleton) |');
out.push('| 調色板數據 | bank-06 | prg_bank_06_palette_data.ts | bank-06.ts (skeleton) |');
out.push('| 背景/標題 tile | bank-11 | prg_bank_11_background.ts | bank-11.ts (skeleton) |');
out.push('| 屬性表 | bank-28 | prg_bank_28_attributes.ts | bank-28.ts (skeleton) |');
out.push('| 球員數據表 | bank-01 | prg_bank_01_match_jump.ts | bank-01.ts + bank-01-tables.ts |');
out.push('| 比賽數據 | bank-02 | prg_bank_02_nmi_renderer.ts | bank-02.ts |');
out.push('');
out.push('### 渲染流程');
out.push('');
out.push('```');
out.push('1. NMI 觸發 (每幀開始)');
out.push('   │');
out.push('   ├─ bank-30 (固定 Bank $0F): NMI 向量');
out.push('   │   JSR 到 bank-02 NMI handler');
out.push('   │');
out.push('   └─ bank-02.ts: bank02_nmiHandler()');
out.push('       │');
out.push('       ├─ 檢查 $0628 (PPU 數據就緒)');
out.push('       ├─ 關 PPU 顯示 ($2001 = 0)');
out.push('       ├─ 處理 PPU 數據隊列 ($05E8-$0627)');
out.push('       │   → 寫 palette/nametable 到 VRAM');
out.push('       ├─ 重置 PPU addr latch → $3F00');
out.push('       └─ 恢復 PPU_MASK + PPU 狀態');
out.push('');
out.push('2. VBLANK 後 → 主循環 (bank-00)');
out.push('   │');
out.push('   ├─ bank-00.ts: 場景狀態機');
out.push('   │   ├─ 標題畫面狀態 → 讀 bank-01 數據表');
out.push('   │   ├─ 開場動畫狀態 → 控制精靈序列');
out.push('   │   └─ 比賽準備狀態 → 載入球員陣容');
out.push('   │');
out.push('   ├─ bank-12.ts (bank $06): 每幀執行');
out.push('   │   ├─ MML 音頻解析 → 控制 APU 通道');
out.push('   │   └─ 精靈 slot 管理 → 位置/屬性更新');
out.push('   │');
out.push('   └─ bank-01.ts: PPU 寫入輔助');
out.push('       └─ 寫 tile/palette 數據到 PPU');
out.push('');
out.push('3. PPU 硬體渲染 (每幀結束後)');
out.push('   │');
out.push('   ├─ VRAM (nametable) → 背景渲染');
out.push('   ├─ OAM ($0200-$02FF) → 精靈渲染');
out.push('   └─ Palette RAM → 顏色查找表');
out.push('```');
out.push('');

// === 8. 代碼映射表 ===
out.push('='.repeat(72));
out.push('  Trace 地址 → TypeScript 代碼映射');
out.push('='.repeat(72));
out.push('');
out.push('| Trace 地址 | Bank | hex2asm Label | game-engine 函數 |');
out.push('|:--|:--|:--|:--|');
const map = [
  ['$00:9950', '00', 'CODE_$9916_$99AD', 'bank-00.ts: ppuClearArea() — VRAM 清零循環'],
  ['$00:98E8', '00', 'CODE_$98E8_$9915', 'bank-00.ts: ppuClearInit() — VRAM 清除入口'],
  ['$00:85A2', '00', 'CODE_$8575_$86C7', 'bank-00.ts: 場景初始化 — 調用 ppuClear'],
  ['$01:A175', '01', '(NMI PPU 設置)', 'bank-01.ts: NMI 中斷 PPU 寄存器寫入'],
  ['$01:A8D5', '01', '(OAM DMA)', 'bank-01.ts: oamDmaSetup() — 精靈 DMA 填充'],
  ['$06:84A6', '06(12)', 'CODE_$83F4_$84E9', 'bank-12.ts: audioChannelProcess() — MML 音符解析'],
  ['$06:80E1', '06(12)', 'CODE_$80E1_$xxxx', 'bank-12.ts: audioChannelUpdate() — 音頻通道更新'],
  ['$06:81DB', '06(12)', 'CODE_$81DB_$xxxx', 'bank-12.ts: spriteAttrProcess() — 精靈屬性處理'],
  ['$06:83CB', '06(12)', '(音頻主入口)', 'bank-12.ts: audioEngineMain() — 音頻引擎主循環'],
];
map.forEach(([addr, bank, hex, ts]) => {
  out.push(`| ${addr} | ${bank} | ${hex} | ${ts} |`);
});
out.push('');

// === 9. fceux 調試工具 ===
out.push('='.repeat(72));
out.push('  FCEUX 2.6.6 Debug 工具對照');
out.push('='.repeat(72));
out.push('');
out.push('tools/fceux-2.6.6/ 中的調試工具可輔助驗證開場動畫:');
out.push('');
out.push('| 工具 | 源碼位置 | 用途 |');
out.push('|:--|:--|:--|');
out.push('| 6502 Debugger | src/debug.cpp | 單步追蹤 + 斷點測試 |');
out.push('| NameTable Viewer | src/ntview.cpp | 查看背景 nametable tiles |');
out.push('| Sprite Viewer | src/ppuview.cpp | 查看 OAM 精靈數據 |');
out.push('| Trace Logger | src/tracer.cpp | 生成 trace log (本次數據源) |');
out.push('| PPU Viewer | src/ppu.cpp | 查看 PPU 內部狀態 |');
out.push('| Hex Editor | src/memview.cpp | 查看 ROM/WRAM 內存 |');
out.push('');

out.push('='.repeat(72));
out.push('  報告結束');
out.push('='.repeat(72));

writeFileSync('trace/opening-trace-report.txt', out.join('\n'), 'utf8');
console.log(out.join('\n'));
