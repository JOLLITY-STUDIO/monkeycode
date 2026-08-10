// 追踪调色板初始化完整流程
const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data/prg-bank-00.ts', 'utf8');
const bytes = c.match(/0x[0-9A-Fa-f]{2}/g).map(s => parseInt(s, 16));

console.log('╔══════════════════════════════════════════════════════╗');
console.log('║  追踪 $8297 → $9085 调色板初始化完整流程            ║');
console.log('╚══════════════════════════════════════════════════════╝');

console.log('\n─── $8297: 调色板初始化包装函数 ───');
console.log('  8297: STA $E7      ; ram_00E7 = A (参数, 调用时 A=0x0D)');
console.log('  8299: LDA #$01');
console.log('  829B: STA $E6      ; ram_00E6 = 1 (子包数量)');
console.log('  829D: LDA #$E5');
console.log('  829F: STA $4D      ; $4D = $E5');
console.log('  82A1: LDA #$00');
console.log('  82A3: STA $4E      ; $4E = $00');
console.log('  82A5: JSR $9085    ; ($4D) 指向 RAM $00E5 的描述符');
console.log('  82A8: RTS');
console.log('  → 结论: $8297 在 RAM $00E5-$00E7 构建了一个"描述符"');
console.log('    之后调用通用 PPU Buffer 打包器 $9085 处理');

console.log('\n─── $978B-$97AA: 32 字节 PPU Buffer 模板 ───');
const base = 0x178B;
let hexRow = '';
for (let i = 0; i < 32; i++) {
  const v = bytes[base + i];
  hexRow += v.toString(16).padStart(2, '0') + ' ';
  if ((i + 1) % 8 === 0) { console.log('  ' + hexRow); hexRow = ''; }
}
console.log('\n  解读 (PPU Buffer 数据包头部格式):');
const vals = bytes.slice(base, base + 32);
console.log('  [0] = 0x' + vals[0].toString(16) + '  ← 控制标志字节 (bit7=激活)');
console.log('  [1] = 0x' + vals[1].toString(16) + '  ← PPU 地址 hi (将被程序覆盖)');
console.log('  [2] = 0x' + vals[2].toString(16) + '  ← PPU 地址 lo (将被程序覆盖)');
console.log('  [3] = 0x' + vals[3].toString(16) + '  ← 数据长度 (将被程序覆盖)');
console.log('  [4-7]           ← 数据源指针 (将被程序覆盖)');
console.log('  [8-31]          ← 填充/保留字节');
console.log('  → 结论: $978B 是模板/骨架，不是调色板颜色值！');
console.log('    实际颜色数据由 Bank 09 指针表动态加载');

console.log('\n─── $9085: 通用 PPU Buffer 打包构造器 ───');
console.log('  9085: LDA #$00');
console.log('  9087: LDY #$01');
console.log('  9089: STA $0467,Y  ; 清零 $0468-$0567 (255B)');
console.log('  9091: STA $97      ; ram_0097 = 0');
console.log('  9093: LDY #$01');
console.log('  9095: LDA ($4D),Y  ; 读 RAM $00E6 = $01 → EC (子包数)');
console.log('  9099-90A4: $4D += 2 ; 指针前进到 $00E7');
console.log('  90A6: $94=$68, $95=$05  ; 目标缓冲 = $0568');
console.log('  90AE: LDX $25; STX $ED   ; 保存场景上下文');
console.log('');
console.log('  ── 循环(子包数 = EC = 1 次): ──');
console.log('  90B4: LDA ($4D),Y  ; 读 $00E7 = 0x0D (数据索引)');
console.log('  90B7: LDX #$09     ; 基础 Bank = 09');
console.log('  90B9: CMP #$6D     ; 索引 < $6D → Bank 09');
console.log('                      ; 索引 ≥ $6D → Bank 0A');
console.log('  90C2: JSR $C4B9    ; 切换到 Bank 09 (X=9)');
console.log('  90C5-90D1: Y=索引<<1 = 0x1A');
console.log('            $92/$93 = $A000 + 0x1A = $A01A');
console.log('            从 Bank 09 $A01A 读取实际数据指针 → $92/$93');
console.log('');
console.log('  90E4-90EE: 复制 $978B 32B 模板 → $0568');
console.log('  90F0-90F9: 用场景参数修改控制字节');
console.log('  90FB-9102: 从数据源读长度字节 → ram_0049');
console.log('            将数据源指针存入 buffer[2-3]');
console.log('');
console.log('  9112-9114: JSR $C4B9 (恢复 Bank 切换)');
console.log('  9117-9119: $4D++ (下一个描述符)');
console.log('  911D-9128: $94 += $20 (下一个包位置)');
console.log('  912A-912E: DEC EC → 若未零则循环');
console.log('');
console.log('  ── 循环结束: ──');
console.log('  9131: LDX #$11');
console.log('  9133-9139: ram_0011/12 = $9147 (回调地址)');
console.log('  913B-913F: Y=$C8, A=$00, JSR $9F69 (终结处理)');
console.log('  9142: RTS');

console.log('\n═══ 结论 ═══');
console.log('1. $9085 = 通用 PPU Buffer 打包器 (不限于调色板)');
console.log('2. $978B = 32B PPU Buffer 头部模板 (骨架，非颜色数据)');
console.log('3. 实际颜色数据来自: Bank 09 指针表 → 外部 bank 数据');
console.log('4. 数据在 NMI 中由 Bank 01 handler 消费写入 PPU');
console.log('5. bank00_analysis.ts 中 dataTables[9] "$9085 内的表" 是错误的');
console.log('   → 应改为 "$978B PPU Buffer 头部模板" 或删除该条目');
