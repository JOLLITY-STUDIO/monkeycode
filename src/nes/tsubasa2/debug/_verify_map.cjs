const fs = require('fs');
const prg = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes').slice(16);
function rt(runtimeAddr) { return runtimeAddr - 0xa000 + 0x4000; }
function dump(label, runtimeAddr, len) {
  const off = rt(runtimeAddr);
  const b = [];
  for (let i = 0; i < len; i++) b.push(prg[off + i]);
  console.log(label + ' @' + runtimeAddr.toString(16) + ' (prgIdx 0x' + off.toString(16) + '): ' + b.map((x) => x.toString(16).padStart(2, '0')).join(' '));
}
// $A491 vector table: first entry should be C0 A4 (scene0 target $A4C1 → target-1 = $A4C0)
dump('A491 vec0', 0xa491, 8);
// $A484 dispatcher: LDA $ED; ASL; TAX; LDA $A492,X; PHA; LDA $A491,X; PHA; RTS = A5 ED 0A AA BD 92 A4 48 BD 91 A4 48 60
dump('A484 dispatcher', 0xa484, 13);
// $A77B scene17: LDA #$80; JSR $8895; LDA #$02; RTS = A9 80 20 95 88 A9 02 60
dump('A77B scene17', 0xa77b, 8);
// $A55A scene1: LDA #$00; STA $60; LDA $EC; LSR; ROR $60; LSR; ROR $60; STA $61; BIT $62; BMI ...
dump('A55A scene1', 0xa55a, 20);
