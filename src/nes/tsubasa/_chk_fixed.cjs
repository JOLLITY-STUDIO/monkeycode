var fs = require('fs');
var s = fs.readFileSync('src/tsnes/tsubasa-hex2asm/prg_banks/prg_bank_00_dispatch_scene_engine.ts','utf8');
var lines = s.split(/\r?\n/);
console.log('Total lines: ' + lines.length);

// Check for any remaining @E9CF / @EAF6 / @EEF8 / @EF0D / @E??
for (var i = 0; i < lines.length; i++) {
  var l = lines[i].trim();
  if (l.indexOf('@E9CF') >= 0 || l.indexOf('@EAF6') >= 0 || l.indexOf('@EEF8') >= 0 || l.indexOf('@EF0D') >= 0) {
    console.log('Line ' + (i+1) + ': ' + l);
  }
}

// Also check for BNE/BPL/BMI near the undefined label areas
var checking = false;
for (var i = 0; i < lines.length; i++) {
  if (lines[i].includes('RTS') || lines[i].includes('@E9CA')) checking = true;
  if (checking && i < lines.length - 1) {
    var l = lines[i].trim();
    if (l && (l.startsWith('BNE') || l.startsWith('BPL') || l.startsWith('BMI') || l.startsWith('.byte'))) {
      console.log('Line ' + (i+1) + ': ' + l);
    }
    if (i > 0 && lines[i-1].includes('RTS') && i < lines.length - 5) {}
  }
  if (checking && i > 200 && i < 400) checking = false; // arbitrary limit
}

// Check by searching for known lines around the issue areas
var bbhStart = lines.findIndex(function(l) { return l.indexOf('function buildbytecodeHandlers') >= 0; });
console.log('buildbytecodeHandlers starts at line ' + (bbhStart + 1));

// Lines around 681
console.log('\nLines 679-683:');
for (var i = 678; i < 683; i++) console.log('  ' + (i+1) + ': ' + (lines[i]||'').trim());
console.log('\nLines 821-825:');
for (var i = 820; i < 825; i++) console.log('  ' + (i+1) + ': ' + (lines[i]||'').trim());
