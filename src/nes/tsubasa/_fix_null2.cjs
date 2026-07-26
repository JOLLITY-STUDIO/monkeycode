var fs = require('fs');
var path = require('path');

var FILEPATH = path.join(__dirname, 'src', 'tsnes', 'tsubasa-hex2asm', 'prg_banks', 'prg_bank_00_dispatch_scene_engine.ts');
var ROM_FILE = path.join(__dirname, 'rom.nes');

var curr = fs.readFileSync(FILEPATH, 'utf8');
var lines = curr.split(/\r?\n/);

// Check which lines have 'null'
console.log('Null lines:');
var nullLines = [];
for (var i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'null') {
    nullLines.push(i);
    console.log('  Line ' + (i+1) + ': null');
  }
}

// Read ROM
var rom = Array.from(fs.readFileSync(ROM_FILE).slice(16, 16 + 8192));
var H2 = function(n) { return n.toString(16).toUpperCase().padStart(2, '0'); };
var H4 = function(n) { return n.toString(16).toUpperCase().padStart(4, '0'); };

// We know from previous analysis:
// Line 681: BNE target=$E9CF (opcode $D0), in buildbytecodeHandlers ($8840-$8EED)
// Line 823: BPL target=$EAF6 (opcode $10), in buildbytecodeHandlers
// Line 3545: BPL target=$EEF8 (opcode $10), in buildpadding ($8FF6-$9FFF)
// Line 3547: BMI target=$EF0D (opcode $30), in buildpadding

// Strategy: search ROM for unique patterns around each null line
// Use the surrounding assembly context to find exact ROM positions

// Context for line 681: @E9CA: STX $0564 / RTS / null / .byte $03
// STX ABS $0564 = 8E 64 05, RTS = 60, null = D0 XX, .byte = 03
// Search for: 8E 64 05 60 D0 ?? 03
for (var i = 0; i < rom.length - 7; i++) {
  if (rom[i]===0x8E && rom[i+1]===0x64 && rom[i+2]===0x05 && rom[i+3]===0x60 && rom[i+4]===0xD0 && rom[i+7]===0x03) {
    console.log('\nLine 681 context at ROM offset $' + i.toString(16) + ' (addr $' + H4(0x8000+i) + ')');
    var addr = 0x8840 + i; var bneTarget = addr + 2 + (rom[i+5] < 128 ? rom[i+5] : rom[i+5] - 256);
    console.log('  ROM bytes: ' + rom.slice(i, i+8).map(function(b){return H2(b);}).join(' '));
    console.log('  BNE bytes: $' + H2(rom[i+4]) + ' $' + H2(rom[i+5]) + ' target=$' + H4(bneTarget));
    var fix = '    .byte $' + H2(0xD0) + ', $' + H2(rom[i+5]) + '  ; BNE $' + H4(bneTarget) + ' (external cross-function)';
    if (nullLines[0] !== undefined) {
      console.log('  Fix: ' + fix);
      lines[nullLines[0]] = fix;
    }
  }
}

// Context for line 823: .byte $03 / null / JSR $6005 / ASL $FF
// $03 / D0 XX / 20 05 60 / 06 FF
for (var i = 0; i < rom.length - 8; i++) {
  if (rom[i]===0x03 && (rom[i+1]===0x10||rom[i+1]===0xD0||rom[i+1]===0x30||rom[i+1]===0xF0) && rom[i+3]===0x20 && rom[i+4]===0x05 && rom[i+5]===0x60 && rom[i+6]===0x06 && rom[i+7]===0xFF) {
    console.log('\nLine 823 context at ROM offset $' + i.toString(16) + ' (addr $' + H4(0x8000+i) + ')');
    var addr = 0x8840 + i + 1; var rel = rom[i+2]; var bplTarget = addr + 2 + (rel < 128 ? rel : rel - 256);
    console.log('  ROM bytes: ' + rom.slice(i, i+8).map(function(b){return H2(b);}).join(' '));
    console.log('  BPL bytes: $' + H2(rom[i+1]) + ' $' + H2(rom[i+2]) + ' target=$' + H4(bplTarget));
    var fix = '    .byte $' + H2(rom[i+1]) + ', $' + H2(rom[i+2]) + '  ; BPL $' + H4(bplTarget) + ' (external cross-function)';
    if (nullLines[1] !== undefined) {
      console.log('  Fix: ' + fix);
      lines[nullLines[1]] = fix;
    }
  }
}

// Context for line 3545 (in buildpadding, base $8FF6): BPL @EEE6 / null / @EED8: JSR $3030
// BPL @EEE6 = 10 XX, then null = 10 XX, then @EED8: = no bytes, JSR $3030 = 20 30 30
// Search for: 10 ?? 10 ?? 20 30 30
for (var i = 0; i < rom.length - 6; i++) {
  if ((rom[i]===0x10||rom[i]===0x30) && rom[i+2]===0x10 && rom[i+4]===0x20 && rom[i+5]===0x30 && rom[i+6]===0x30) {
    console.log('\nLine 3545 context at ROM offset $' + i.toString(16) + ' (addr $' + H4(0x8000+i) + ')');
    var addr = 0x8FF6 + i + 2; var rel = rom[i+3]; var target = addr + 2 + (rel < 128 ? rel : rel - 256);
    console.log('  ROM bytes: ' + rom.slice(i, i+7).map(function(b){return H2(b);}).join(' '));
    console.log('  BPL bytes at offset $' + (i+2).toString(16) + ': $' + H2(rom[i+2]) + ' $' + H2(rom[i+3]) + ' target=$' + H4(target));
    
    // Also check the BMI after JSR $3030
    var addr2 = 0x8FF6 + i + 7;
    if (i+7 < rom.length && (rom[i+7]===0x30||rom[i+7]===0x10)) {
      var rel2 = rom[i+8]; var target2 = addr2 + 2 + (rel2 < 128 ? rel2 : rel2 - 256);
      console.log('  BMI bytes at offset $' + (i+7).toString(16) + ': $' + H2(rom[i+7]) + ' $' + H2(rom[i+8]) + ' target=$' + H4(target2));
    }
    
    // Fix line 3545 (nullLines[2])
    if (nullLines.length > 2) {
      var fix1 = '    .byte $' + H2(rom[i+2]) + ', $' + H2(rom[i+3]) + '  ; BPL $' + H4(target) + ' (external cross-function)';
      console.log('  Fix line 3545: ' + fix1);
      lines[nullLines[2]] = fix1;
    }
    
    // Fix line 3547 (nullLines[3]) - the BMI after JSR $3030
    if (nullLines.length > 3 && i+7 < rom.length) {
      var addr3 = 0x8FF6 + i + 7;
      var rel3 = rom[i+8]; var target3 = addr3 + 2 + (rel3 < 128 ? rel3 : rel3 - 256);
      var fix2 = '    .byte $' + H2(rom[i+7]) + ', $' + H2(rom[i+8]) + '  ; BMI $' + H4(target3) + ' (external cross-function)';
      console.log('  Fix line 3547: ' + fix2);
      lines[nullLines[3]] = fix2;
    }
  }
}

fs.writeFileSync(FILEPATH, lines.join('\n'), 'utf8');
console.log('\nDone!');
