import fs from 'fs';
const ram = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan)_68K-ram-in-title-page.ram');
const rom = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');

// Try to find Shift-JIS "エルウィン" (Elwin) in RAM and ROM
// Shift-JIS: エ=83 47, ル=83 8B, ウ=83 45, ィ=83 42, ン=83 93
// But wait, the name in image is エルウィン (eruwin) = エ ル ウ ィ ン
// Let's also try other common names like ヘル (Heru), レディン (Redin), リアナ (Riana), ラーナ (Lana)
const names = [
  ['エルウィン', [0x83, 0x47, 0x83, 0x8B, 0x83, 0x45, 0x83, 0x42, 0x83, 0x93]],
  ['ヘル', [0x83, 0x7A, 0x83, 0x8B]],
  ['レディン', [0x83, 0x8C, 0x83, 0x66, 0x83, 0x42, 0x83, 0x93]],
  ['リアナ', [0x83, 0x8A, 0x83, 0x42, 0x83, 0x69, 0x83, 0x93]],
  ['ラーナ', [0x83, 0x89, 0x83, 0x42, 0x83, 0x6A, 0x83, 0x93]],
  ['シェルファニール', [0x83, 0x56, 0x83, 0x46, 0x83, 0x8B, 0x83, 0x74, 0x83, 0x42, 0x83, 0x6E, 0x83, 0x43, 0x83, 0x8B]],
  ['ジェシカ', [0x83, 0x57, 0x83, 0x46, 0x83, 0x58, 0x83, 0x4A]],
  ['レオン', [0x83, 0x8C, 0x83, 0x49, 0x83, 0x93]],
];

function search(buf, bufName, baseAddr = 0) {
  console.log(`\n=== Searching in ${bufName} (size ${buf.length}) ===`);
  for (const [name, bytes] of names) {
    const needle = Buffer.from(bytes);
    let pos = -1;
    let found = 0;
    while ((pos = buf.indexOf(needle, pos + 1)) !== -1 && found < 3) {
      const abs = baseAddr + pos;
      console.log(`  Found "${name}" at ${bufName} offset $${abs.toString(16).padStart(6, '0')} (file offset $${pos.toString(16)})`);
      const context = buf.slice(Math.max(0, pos - 16), pos + needle.length + 32);
      const hex = Array.from(context).map(b => b.toString(16).padStart(2, '0')).join(' ');
      console.log(`    context: ${hex}`);
      found++;
    }
  }
}

search(ram, 'RAM', 0xFF0000);
search(rom, 'ROM', 0);
