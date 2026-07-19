import { readFileSync, writeFileSync } from 'fs';

const romPath = 'game/roms/Langrisser_II_(Japan).dat';
const outPath = 'game/roms/romData.ts';
const CHUNK_SIZE = 4096; // 每段 4KB 字符串，避免编译器栈溢出

const rom = readFileSync(romPath);
const b64 = rom.toString('base64');

const chunks = [];
for (let i = 0; i < b64.length; i += CHUNK_SIZE) {
  chunks.push(b64.slice(i, i + CHUNK_SIZE));
}

const content = `// ROM base64 encoded (auto-generated)
// Size: ${rom.length} bytes → ${b64.length} chars base64, split into ${chunks.length} chunks
export const ROM_BASE64_CHUNKS = [
${chunks.map(c => `  '${c}'`).join(',\n')}
];

// 运行时拼接为完整 base64 字符串
export const ROM_BASE64 = ROM_BASE64_CHUNKS.join('');
`;

writeFileSync(outPath, content);
console.log(`Generated: ${outPath}`);
console.log(`  ROM: ${rom.length} bytes`);
console.log(`  Base64: ${b64.length} chars`);
console.log(`  Chunks: ${chunks.length} × ${CHUNK_SIZE} chars`);
