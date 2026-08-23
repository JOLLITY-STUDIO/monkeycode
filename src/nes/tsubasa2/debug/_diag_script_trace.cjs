const path = require('path');
const fs = require('fs');
const ts = require(path.resolve(__dirname, '../_tmp_out/game/index.js'));
const core = require(path.resolve(__dirname, '../_tmp_out/core/index.js'));
const NES = core.NES;
const nes = new NES();
nes.loadTsROM({ header: ts.HEADER, prg: ts.PRG, chr: ts.NES_CHR_ROM });
const game = new ts.default(nes);
game.boot();
const ppu = nes.ppu;
const store = game.store;

const log = [];
log.push('scriptStream_3 len=' + (store.get('scriptStream_3') || []).length);
log.push('scriptStream_3[0..150]=' + (store.get('scriptStream_3') || []).slice(0, 150).map(b => b.toString(16).padStart(2, '0')).join(' '));

// 跟踪每帧脚本状态
const OPS = {
  0xe8: 'tableLoad', 0xe9: 'fadeIn', 0xea: 'fadeOutClear', 0xeb: 'animSeq',
  0xec: 'textSeq', 0xed: 'findSlot', 0xee: 'clearText', 0xef: 'spriteFlip',
  0xf0: 'textPos', 0xf1: 'textPtr', 0xf2: 'lineLen', 0xf3: 'palette',
  0xf4: 'subDispatch', 0xf5: 'setPtr', 0xf6: 'waitAnim', 0xf7: 'toggle',
  0xf8: 'external', 0xf9: 'flagBit', 0xfa: 'sceneLoad', 0xfb: 'clearBuf',
  0xfc: 'vramAdvance', 0xfd: 'fillWait', 0xfe: 'jump', 0xff: 'end',
};
let prevPtr = -1;
for (let i = 0; i < 90; i++) {
  try { game.frame(nes); } catch (e) { log.push('CRASH frame ' + (i + 1) + ': ' + e.message); break; }
  const ptr = store.read('ram_004D') | (store.read('ram_004E') << 8);
  if (ptr !== prevPtr) {
    const stream = store.get('scriptStream_3') || [];
    const op = stream[ptr];
    const opName = OPS[op] || (op < 0xd8 ? 'char' : 'wait' + (op - 0xd8));
    const ed = store.read('ram_00ED');
    log.push(`f${i + 1} ptr=${ptr} op=${op ? op.toString(16) : '?'}(${opName}) ed=${ed} 0051=${store.read('ram_0051')} 0052=${store.read('ram_0052')} 0053=${store.read('ram_0053')} 0628=${store.read('ram_0628')} buf05E8=${store.read('ram_05E8').toString(16)}`);
    prevPtr = ptr;
  }
}
log.push('final ptr=' + (store.read('ram_004D') | (store.read('ram_004E') << 8)) + ' ed=' + store.read('ram_00ED'));

fs.writeFileSync(path.resolve(__dirname, '_diag_script_trace.txt'), log.join('\n') + '\n');
console.log(log.join('\n'));
