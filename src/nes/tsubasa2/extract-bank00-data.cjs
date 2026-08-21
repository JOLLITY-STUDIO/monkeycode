// Extract bank00 data tables from the NES ROM into TS arrays.
// Bank 0 maps to CPU $8000-$9FFF, ROM offset = 16 + bankIndex*0x4000.
const fs = require('fs');
const path = require('path');

const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const bank = 0;
const base = 16 + bank * 0x4000;

// CPU addr -> ROM offset
function romOff(cpu) { return base + (cpu - 0x8000); }
function read(cpu) { return rom[romOff(cpu)]; }

function dump(label, start, len) {
  const arr = [];
  for (let i = 0; i < len; i++) arr.push(read(start + i));
  console.log(label + ' @ ' + start.toString(16).toUpperCase() + ' len=' + len + ':');
  console.log(JSON.stringify(arr));
  console.log('');
}

// $8AE6 wait frame table (opcodes $D8-$DF, 8 entries)
dump('WAIT_FRAME', 0x8AE6, 8);

// $8AEC script ID table
dump('SCRIPT_ID (8AEC) 16 bytes', 0x8AEC, 16);

// $8A14 double tile table
dump('DOUBLE_TILE (8A14)', 0x8A14, 0x50);

// $8545 long opcode table
dump('LONG_OPCODE (8545)', 0x8545, 48);

// $9EA2 palette helper table (referenced at $9AA3)
dump('PAL_HELPER (9EA2)', 0x9EA2, 0x40);

// $9EE2 frame wait table (referenced at $9CBA/$9CEA)
dump('FRAME_WAIT (9EE2)', 0x9EE2, 0x1D);

// $87B3/$87B4 small tables
dump('TAB_87B3', 0x87B3, 8);

// $88D2 sprite data (referenced at $8736/$89A5)
dump('SPRITE_88D2', 0x88D2, 8);

// $8398 jump table
dump('TAB_8398', 0x8398, 0x20);

// $83BA
dump('TAB_83BA', 0x83BA, 0x20);

// $83DC
dump('TAB_83DC', 0x83DC, 0x20);

// $83FE
dump('TAB_83FE', 0x83FE, 0x20);

// $8420
dump('TAB_8420', 0x8420, 0x20);

// $8442
dump('TAB_8442', 0x8442, 0x20);

// $978B (referenced at $90E6)
dump('TAB_978B', 0x978B, 0x20);
