var fs = require('fs');
var path = require('path');

var FILE = path.join(__dirname, 'src', 'tsnes', 'tsubasa-hex2asm', 'prg_banks', 'prg_bank_00_dispatch_scene_engine.ts');
var ROM = path.join(__dirname, 'rom.nes');

var content = fs.readFileSync(FILE, 'utf8');
var lines = content.split(/\r?\n/);
var rom = Array.from(fs.readFileSync(ROM).slice(16, 16 + 8192));

var H2 = function(n) { return n.toString(16).toUpperCase().padStart(2, '0'); };
var H4 = function(n) { return n.toString(16).toUpperCase().padStart(4, '0'); };

// Find the undefined labels in the current converted file
var undefinedLabels = [];
for (var i = 0; i < lines.length; i++) {
  var l = lines[i].trim();
  if (l === 'BNE @E9CF' || l === 'BPL @EAF6' || l === 'BPL @EEF8' || l === 'BMI @EF0D') {
    undefinedLabels.push({ line: i, text: l });
    console.log('Found: line ' + (i+1) + ': ' + l);
  }
}

if (undefinedLabels.length === 0) {
  console.log('No undefined labels found! Checking for null values...');
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].trim() === 'null' || lines[i].indexOf('null') === 0) {
      console.log('NULL at line ' + (i+1));
    }
  }
  // The file might already be clean!
  process.exit(0);
}

// Map to patch: { search, opcode, target }
var patches = {
  'BNE @E9CF': { pc: 0xD0, target: 0xE9CF },
  'BPL @EAF6': { pc: 0x10, target: 0xEAF6 },
  'BPL @EEF8': { pc: 0x10, target: 0xEEF8 },
  'BMI @EF0D': { pc: 0x30, target: 0xEF0D }
};

// Find the correct bytes by looking at the ROM
// For each, we know the target, and we need the 2 bytes (opcode + rel offset)
// We can find them by scanning the ROM for the unique surrounding context

// Context 1: STX $0564, RTS, BNE, .byte $03
// 8E 64 05 60 D0 ?? 03
for (var i = 0; i < rom.length - 7; i++) {
  if (rom[i]===0x8E && rom[i+1]===0x64 && rom[i+2]===0x05 && rom[i+3]===0x60 && rom[i+7]===0x03) {
    var opc = rom[i+4];
    var rel = rom[i+5];
    if (patches['BNE @E9CF']) {
      var addr = 0x8840 + i + 4;
      var target = addr + 2 + (rel < 128 ? rel : rel - 256);
      var replacement = '    .byte $' + H2(opc) + ', $' + H2(rel) + '  ; BNE $' + H4(target) + ' (cross-function)';
      console.log('BNE fix: ' + replacement);
      patches['BNE @E9CF'].replace = replacement;
    }
  }
}

// Context 2: $03, BPL, JSR $6005, ASL $FF
// 03 10 ?? 20 05 60 06 FF
for (var i = 0; i < rom.length - 8; i++) {
  if (rom[i]===0x03 && rom[i+3]===0x20 && rom[i+4]===0x05 && rom[i+5]===0x60 && rom[i+6]===0x06 && rom[i+7]===0xFF) {
    var opc = rom[i+1];
    var rel = rom[i+2];
    if (patches['BPL @EAF6']) {
      var addr = 0x8840 + i + 1;
      var target = addr + 2 + (rel < 128 ? rel : rel - 256);
      var replacement = '    .byte $' + H2(opc) + ', $' + H2(rel) + '  ; BPL $' + H4(target) + ' (cross-function)';
      console.log('BPL fix 1: ' + replacement);
      patches['BPL @EAF6'].replace = replacement;
    }
  }
}

// Context 3: 10 ?? 10 ?? 20 30 30 (BPL, BPL, JSR $3030)
for (var i = 0; i < rom.length - 6; i++) {
  if (rom[i+4]===0x20 && rom[i+5]===0x30 && rom[i+6]===0x30) {
    var opc1 = rom[i];
    var opc2 = rom[i+2];
    // First BPL (for @EEF8)
    if (patches['BPL @EEF8'] && opc2 === 0x10) {
      var rel = rom[i+3];
      var addr = 0x8FF6 + i + 2;
      var target = addr + 2 + (rel < 128 ? rel : rel - 256);
      var replacement = '    .byte $' + H2(opc2) + ', $' + H2(rel) + '  ; BPL $' + H4(target) + ' (cross-function)';
      console.log('BPL fix 2: ' + replacement + ' (expected target=$EEF8)');
      patches['BPL @EEF8'].replace = replacement;
    }
    // Second look for BMI after JSR
    if (patches['BMI @EF0D'] && i+8 < rom.length) {
      var opc3 = rom[i+7];
      var rel3 = rom[i+8];
      var addr3 = 0x8FF6 + i + 7;
      var target3 = addr3 + 2 + (rel3 < 128 ? rel3 : rel3 - 256);
      var replacement3 = '    .byte $' + H2(opc3) + ', $' + H2(rel3) + '  ; BMI $' + H4(target3) + ' (cross-function)';
      console.log('BMI fix: ' + replacement3 + ' (expected target=$EF0D)');
      patches['BMI @EF0D'].replace = replacement3;
    }
  }
}

// Apply replacements
for (var j = 0; j < undefinedLabels.length; j++) {
  var item = undefinedLabels[j];
  var patch = patches[item.text];
  if (patch && patch.replace) {
    console.log('Replacing line ' + (item.line+1) + ': ' + item.text + ' -> ' + patch.replace.trim());
    lines[item.line] = patch.replace;
  } else {
    console.log('WARNING: No patch for line ' + (item.line+1) + ': ' + item.text);
  }
}

fs.writeFileSync(FILE, lines.join('\n'), 'utf8');
console.log('\nDone!');
