import fs from 'node:fs';
import { GameContext } from './src/disasm/_context';
import { allBanks } from './src/disasm/banks/index';
import type { RomReader, BankRomSlice } from './src/disasm/banks/_bank_types';
import { ROM_DATA } from './src/disasm/banks/_romdata';

const OUT = 'src/nes/tsubasa/_t3_out.txt';
const b: string[] = [];

const H8 = (v: number) => (v & 0xFF).toString(16).toUpperCase().padStart(2, '0');
function L(...a: unknown[]) { b.push(a.map(String).join(' ')); }

const PRG_BANK_SIZE = 0x2000;
const TOTAL_BANKS = ROM_DATA.length;
let bank8000 = 0, bankA000 = 1;

function bankSlice(n: number): BankRomSlice {
  const d = new Uint8Array(PRG_BANK_SIZE);
  for (let i = 0; i < PRG_BANK_SIZE; i++) d[i] = ROM_DATA[n]?.[i] ?? 0;
  return { u8(o: number) { return d[o] ?? 0; }, u16le(o: number) { return (this.u8(o)) | (this.u8(o + 1) << 8); }, data: d, romBase: n * PRG_BANK_SIZE };
}

const rom: RomReader = {
  bank(a: number) { const ca = a & 0xFFFF; let bn: number; if (ca >= 0xE000) bn = TOTAL_BANKS - 1; else if (ca >= 0xC000) bn = TOTAL_BANKS - 2; else if (ca >= 0xA000) bn = bankA000; else bn = bank8000; return bankSlice(bn); },
  u8(a: number) { return this.bank(a).u8(a & 0x1FFF); },
  u16le(a: number) { return this.bank(a).u16le(a & 0x1FFF); },
};

const ctx = new GameContext();
const origSet = ctx.ram.setU8.bind(ctx.ram);
ctx.ram.setU8 = (a: number, v: number) => {
  origSet(a, v);
  if (a === 0x8001) { const s = ctx.ram.u8(0x8000) & 0x07; if (s === 6) bank8000 = v; if (s === 7) bankA000 = v; }
};
ctx.ram.setU8(0x24, 0);
ctx.ram.setU8(0x25, 1);

try {
  // RESET
  allBanks[31]?.fns?.['$FFF0']?.(ctx, rom) ?? allBanks[31]?.dispatch?.(ctx, rom);
  L('RESET done. scene=' + H8(ctx.ram.u8(0x26)) + ' sStat=' + H8(ctx.ram.u8(0x4C)));

  // Dispatch loop
  for (let f = 0; f < 20; f++) {
    if (bank8000 === 0) {
      ctx.ram.setU8(0x27, 0);
      allBanks[0]?.dispatch(ctx, rom);
    }
    L('F' + f + ': scene=' + H8(ctx.ram.u8(0x26)) + ' sStat=' + H8(ctx.ram.u8(0x4C)) + ' b8=' + H8(bank8000) + ' bA=' + H8(bankA000));
  }

  L('DONE - no errors');
} catch (e: any) {
  L('CRASH: ' + e.message);
  L(e.stack?.split('\n').slice(0, 8).join('|') || '');
}

fs.writeFileSync(OUT, b.join('\n'));
