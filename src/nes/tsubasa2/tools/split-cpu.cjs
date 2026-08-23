// 机械拆分 cpu.ts: emulate() 拆出 _execCore, 新增 execOpcode 供 TS 翻译层直调
// 用法: node tools/split-cpu.cjs
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'core', 'cpu.ts');
let src = fs.readFileSync(file, 'utf8');
const isCRLF = src.includes('\r\n');
src = src.replace(/\r\n/g, '\n');

// 1. 类字段: _trOperands (翻译模式操作数缓冲)
src = src.replace(
  '  emulate(): number {',
  '  /** 翻译模式操作数缓冲 (execOpcode 传入, _execCore 读取) */\n  _trOperands: number[] = [];\n\n  emulate(): number {'
);

// 2. emulate() 里 cycleCount/cycleAdd/addrMode 移入 _execCore (保留 opinfo)
src = src.replace(
  `    let opinfo = OPCODE_TABLE[opcode] ?? INVALID_OPCODE;
    let cycleCount = opinfo.cycles;
    let cycleAdd = 0;
    let addrMode = opinfo.mode;
`,
  `    let opinfo = OPCODE_TABLE[opcode] ?? INVALID_OPCODE;
`
);

// 3. 取指后: 收集 operands -> 调 _execCore; 追加 execOpcode/_opnd8/_opnd16/_execCore 签名
src = src.replace(
  `    let opaddr = this.REG_PC;
    this.REG_PC = (this.REG_PC + opinfo.size) & 0xffff;

    let addr = 0;`,
  `    let opaddr = this.REG_PC;

    // 收集操作数字节 (模拟模式: 从 ROM 取; 翻译模式: execOpcode 直接传 operands)
    this._trOperands.length = 0;
    for (let bi = 1; bi < opinfo.size; bi++) {
      this._trOperands.push(this.loadFromCartridge(opaddr + bi));
    }
    return this._execCore(opcode, opinfo, opaddr);
  }

  /**
   * 直译模式 (去掉 6502 取指/fetch-decode): 给定 opcode 与操作数字节,
   * 执行一条完整指令。由 TS 翻译层直接调用, 寄存器/标志/内存/PPU 时序与 emulate() 一致。
   * @param opcode 指令编码 (OPCODE_TABLE 键)
   * @param operands 操作数字节 (长度 = size-1)
   * @param opaddr 指令地址 (REG_PC 语义同 emulate: 执行后 REG_PC = opaddr+size-1)
   */
  execOpcode(opcode: number, operands: number[], opaddr: number): number {
    const opinfo = OPCODE_TABLE[opcode] ?? INVALID_OPCODE;
    this._trOperands = operands.slice();
    return this._execCore(opcode, opinfo, opaddr);
  }

  /** 翻译模式操作数读取: 第 i 个操作数字节 */
  _opnd8(i: number): number {
    return this._trOperands[i] ?? 0;
  }

  /** 翻译模式操作数读取: 第 i 字节起小端 16 位 */
  _opnd16(i: number): number {
    return (this._trOperands[i] ?? 0) | ((this._trOperands[i + 1] ?? 0) << 8);
  }

  /** 指令核心执行体: 寻址 + 执行 + PPU 步进 + NMI (emulate 与 execOpcode 共用) */
  _execCore(opcode: number, opinfo: OpInfo, opaddr: number): number {
    let temp: number;
    let add: number;
    let baseHigh = 0;
    let interruptCycles = 0;
    let cycleCount = opinfo.cycles;
    let cycleAdd = 0;
    let addrMode = opinfo.mode;
    this.REG_PC = (opaddr + opinfo.size) & 0xffff;
    let addr = 0;`
);

// 4. 寻址 case: 内存读操作数 -> 翻译模式操作数缓冲 (先具体后宽泛)
src = src.replace(/let zpBase6 = this\.loadDirect\(opaddr \+ 2\);/g, 'let zpBase6 = this._opnd8(0);');
src = src.replace(/let zpBase7 = this\.loadDirect\(opaddr \+ 2\);/g, 'let zpBase7 = this._opnd8(0);');
src = src.replace(/let zpPtr10 = this\.loadDirect\(opaddr \+ 2\);/g, 'let zpPtr10 = this._opnd8(0);');
src = src.replace(/let zpAddr = this\.loadDirect\(opaddr \+ 2\);/g, 'let zpAddr = this._opnd8(0);');
src = src.replace(/addr = this\.loadDirect\(opaddr \+ 2\);/g, 'addr = this._opnd8(0);');
src = src.replace(/addr = this\.load16bit\(opaddr \+ 2\);/g, 'addr = this._opnd16(0);');
src = src.replace(/this\.loadDirect\(opaddr \+ 2\);/g, '// (无操作数)');

fs.writeFileSync(file, src.replace(/\n/g, isCRLF ? '\r\n' : '\n'));
console.log('split-cpu done (CRLF=' + isCRLF + ')');
