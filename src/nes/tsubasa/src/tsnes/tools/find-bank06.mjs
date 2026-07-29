import { readFileSync } from 'fs';

const hexDir = 'tsubasa-hex2asm/prg_banks/';
const files = [
  'prg_bank_00_dispatch_scene_engine.ts',
  'prg_bank_01_match_jump.ts',
  'prg_bank_02_nmi_renderer.ts',
  'prg_bank_03_data.ts',
  'prg_bank_04_data.ts',
  'prg_bank_05_data.ts',
  'prg_bank_06_palette_data.ts',
  'prg_bank_07_sprite_data.ts',
  'prg_bank_08_data.ts',
  'prg_bank_09_data.ts',
  'prg_bank_10_data.ts',
  'prg_bank_11_background.ts',
  'prg_bank_12_audio.ts',
  'prg_bank_13_data.ts',
  'prg_bank_14_data.ts',
  'prg_bank_15_data.ts',
  'prg_bank_16_scene_logic.ts',
  'prg_bank_17_data.ts',
  'prg_bank_18_data.ts',
  'prg_bank_19_lookup_tables.ts',
  'prg_bank_20_team_data.ts',
  'prg_bank_21_data.ts',
  'prg_bank_22_sprite_engine.ts',
  'prg_bank_23_data.ts',
  'prg_bank_24_cutscene.ts',
  'prg_bank_25_data.ts',
  'prg_bank_26_match_core.ts',
  'prg_bank_27_player_data.ts',
  'prg_bank_28_attributes.ts',
  'prg_bank_29_data.ts',
  'prg_bank_30_system_lib.ts',
  'prg_bank_31_boot_vectors.ts',
];

function parseHexArray(filePath) {
  const src = readFileSync(filePath, 'utf8');
  
  // Find all DATA_$XXXX_$YYYY arrays or similar
  const arrays = [];
  const re = /const\s+\w+\s*[:=]\s*readonly\s+number\[\]\s*=\s*\[([\s\S]*?)\n\];/g;
  
  // Try multiple patterns
  let allBytes = new Array(8192).fill(0);
  let totalFound = 0;
  
  // More robust: find all hex values in the file
  // Look for hex arrays: patterns like [0x00, 0x01, ...] or ...0x00, 0x01...
  const hexPattern = /0x([0-9A-Fa-f]{2})/g;
  let match;
  let allHex = [];
  while ((match = hexPattern.exec(src)) !== null) {
    allHex.push(parseInt(match[1], 16));
  }
  
  return allHex;
}

// From trace, bank $06 at $84A6 executes: A6 F3 (LDX $F3)
// Let's find which bank file has this pattern
const searchPattern = [0xA6, 0xF3]; // LDX $F3
// Or broader: find code-like patterns around $84A0-$84B0

console.log('=== Searching for trace pattern A6 F3 (LDX $F3) in all banks ===');
files.forEach(f => {
  const filePath = hexDir + f;
  try {
    const bytes = parseHexArray(filePath);
    if (bytes.length < 2) return;
    
    // Search for A6 F3
    for (let i = 0; i < bytes.length - 1; i++) {
      if (bytes[i] === 0xA6 && bytes[i + 1] === 0xF3) {
        const addr = 0x8000 + i;
        console.log(`  FOUND in ${f} at offset 0x${i.toString(16).toUpperCase()} (addr $${addr.toString(16).toUpperCase()})`);
        // Show surrounding bytes
        const start = Math.max(0, i - 4);
        const bs = [];
        for (let j = start; j < Math.min(bytes.length, start + 16); j++) {
          bs.push('$' + bytes[j].toString(16).padStart(2,'0').toUpperCase());
        }
        console.log(`    surrounding: ${bs.join(' ')}`);
      }
    }
    
    // Also search for the exact byte sequence at trace addr $8179 (assume 0x48=PHA)
    // Actually let's look for the pattern from trace lines 299-302:
    // A6 F3, CA, A9 00, 9D F4 07
    const codeSeq = [0xA6, 0xF3, 0xCA, 0xA9, 0x00, 0x9D, 0xF4, 0x07];
    for (let i = 0; i < bytes.length - codeSeq.length; i++) {
      let match = true;
      for (let j = 0; j < codeSeq.length; j++) {
        if (bytes[i + j] !== codeSeq[j]) { match = false; break; }
      }
      if (match) {
        const addr = 0x8000 + i;
        console.log(`  CODE SEQ FOUND in ${f} at $${addr.toString(16).toUpperCase()}!`);
        console.log(`    bytes: ${codeSeq.map(b=>'$'+b.toString(16).padStart(2,'0')).join(' ')}`);
      }
    }
  } catch (err) {
    // skip
  }
});
