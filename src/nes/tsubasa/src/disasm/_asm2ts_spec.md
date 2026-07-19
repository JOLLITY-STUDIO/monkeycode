# ASM2TS 逐指令翻譯規範 v2.0

## 目標
將 `_tmp_bzk_out/bank_NN.asm` 中的**每一條 6502 指令**，
原原本本翻譯成 TypeScript 邏輯代碼，操作 `GameContext`。

## 翻譯原則

### 1. 狀態對應
| 6502 概念 | TypeScript 對應 |
|-----------|----------------|
| accumulator A | `ctx.cpu.A` 或臨時變數 |
| index X, Y | `ctx.cpu.X`, `ctx.cpu.Y` 或局部變數 |
| stack operations (PHA/PLA) | 模擬: `ctx.stackPush(ctx.cpu.A)` |
| JSR / RTS | 函數調用 / return |
| JMP | `ctx.cpu.PC = address` 或 while loop |
| RAM read (LDA $NNNN) | `ctx.ram.u8(ADDR)` |
| RAM write (STA $NNNN) | `ctx.ram.setU8(ADDR, val)` |
| branch (BNE/BEQ/BCC etc.) | `if (condition) { ... }` |
| indirect (LDA ($NN),Y) | `ctx.ram.u8(ctx.ram.u16le(ptrAddr) + Y)` |
| ROM data read | `rom.u8(cpuAddr)` / `rom.u16le(cpuAddr)` |

### 2. 跨 bank 調用 (JSR/JMP to other banks)
- 標記 `noteCrossBank(ctx, "$ADDR")` 表示需要其他 bank 的實現
- 在完整實現中，經由 `RomReader` 分派到對應 bank 的函數
- 資料表 (Lookup table): 直接寫在 TS 檔案中 (Uint8Array)

### 3. 代碼組織
每個 `bank_NN.ts` 導出 `BankModule`:
```typescript
export const bankNN: BankModule = {
  rom: null!,           // 系統初始化時設定
  dispatch,             // 主分派函數
  fns: {                // CPU address → function mapping
    '$NNNN': someFunc,
  },
};
```

### 4. 類型導出
- `bank-types.ts`: `BankModule`, `BankFn`, `RomReader`, `BankRomSlice`
- 每個 bank 的函數簽名: `(ctx: GameContext, rom: RomReader, ...params) => void`

### 5. 轉換規則速查表

| 6502 | TS |
|------|-----|
| `LDA #$NN` | `let A = NN` |
| `LDA $NNNN` | `let A = ctx.ram.u8(ADDR)` |
| `LDA $NN,X` | `let A = ctx.ram.u8(ADDR + ctx.X)` |
| `LDA ($NN),Y` | `let A = ctx.ram.u8(ctx.ram.u16le(ptrAddr) + ctx.Y)` |
| `STA $NNNN` | `ctx.ram.setU8(ADDR, A)` |
| `LDX #$NN` | `ctx.X = NN` → 或 `let X = NN` |
| `TAX` | `ctx.X = ctx.A` |
| `TXA` | `ctx.A = ctx.X` |
| `PHA` | `ctx.stackPush(A)` |
| `PLA` | `A = ctx.stackPop()` |
| `JSR $ADDR` | `callFnByAddr(ctx, rom, ADDR)` |
| `RTS` | `return` |
| `JMP $ADDR` | `ctx.cpu.PC = ADDR; return` |
| `BEQ $ADDR` | `if (A === 0) { ... }` |
| `BNE $ADDR` | `if (A !== 0) { ... }` |
| `BCC $ADDR` | `if (carry === false) { ... }` |
| `BCS $ADDR` | `if (carry === true) { ... }` |
| `BPL $ADDR` | `if (A < 128) { ... }` |
| `BMI $ADDR` | `if (A >= 128) { ... }` |
| `CLC` | `carry = false` |
| `SEC` | `carry = true` |
| `ADC #$NN` | `let A = A + NN + carry` |
| `SBC #$NN` | `let A = A - NN - (1 - carry)` |
| `CMP #$NN` | `compare = A - NN` (Z flag = A===NN) |
| `ASL A` | `A = (A << 1) & 0xFF; carry = (orig & 0x80) ? 1 : 0` |
| `LSR A` | `A = A >> 1; carry = (orig & 1) ? 1 : 0` |
| `AND #$NN` | `A = A & NN` |
| `ORA #$NN` | `A = A | NN` |
| `EOR #$NN` | `A = A ^ NN` |
| `INC $ADDR` | `ctx.ram.setU8(ADDR, u8(ctx.ram.u8(ADDR) + 1))` |
| `DEC $ADDR` | `ctx.ram.setU8(ADDR, u8(ctx.ram.u8(ADDR) - 1))` |
| `INX` / `DEX` | `ctx.X = u8(ctx.X + 1)` |
| `INY` / `DEY` | `ctx.Y = u8(ctx.Y + 1)` |
| `TXS` | `ctx.SP = ctx.X` |
| `TSX` | `ctx.X = ctx.SP` |
| `.byte $NN` (data table) | `Uint8Array` 常量或 `rom.u8(addr)` |

### 6. 覆蓋率計算
已翻譯 bank / 總含 code bank 數 × 100%

## 文件結構
```
disasm/
├── _asm2ts_spec.md          ← 本規範
├── _coverage.md             ← 覆蓋率追蹤
├── _constants.ts            ← 記憶體位址常量
├── _types.ts                ← 型別定義
├── _context.ts              ← GameContext 執行引擎
├── _ram.ts                  ← 原始 RAM 佈局
│
├── banks/
│   ├── _bank_types.ts       ← BankModule, RomReader 等型別
│   ├── index.ts             ← 統一導出
│   ├── bank_00.ts ~ bank_47.ts ← 逐 bank 翻譯
```

## 運行方式
```typescript
import { GameContext } from './_context';
import { loadRom } from './rom_loader'; // TBD
import { allBanks } from './banks/index';

// 初始化
const romData = loadRom('tsubasa2.nes');
const ctx = new GameContext();

// 模擬 RESET
const reader = createRomReader(romData);
allBanks.bank31.dispatch(ctx, reader);

// 執行主循環
while (true) {
  allBanks.bank02.fns['$8000'](ctx, reader); // NMI handler
  engineStep(ctx, reader, allBanks);
}
```
