/**
 * PicoDrive state 文件分析器
 *
 * 分析 state 文件结构，找出 VRAM/CRAM/VSRAM 的精确偏移
 *
 * PicoDrive state 结构 (大致):
 *   - 4 bytes: version
 *   - PicoCPU (约 0x4D8 字节)
 *   - PicoVideo
 *     - VDP 寄存器 (约 0x5C 字节)
 *     - VRAM (64KB = 0x10000)
 *     - CRAM (128 字节)
 *     - VSRAM (80 字节)
 *     - ...
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

// 检查是否有 state 文件
const stateFiles = fs.readdirSync(root).filter(f => f.includes('state') && f.endsWith('.bin'));

console.log('=== PicoDrive State 分析器 ===\n');

if (stateFiles.length === 0) {
  console.log('未找到 state 文件 (.bin)');
  console.log('请先用 vram-extract.html 在浏览器中提取 state 文件');
  console.log('或使用 Genesis.htm + Ctrl+1 保存 state');
  console.log('\n将 state 文件放在 src/langrisser2/ 目录下，命名为 l2-title-state.bin');
  process.exit(0);
}

console.log(`找到 ${stateFiles.length} 个 state 文件:`);
for (const f of stateFiles) {
  console.log(`  - ${f}`);
}
console.log('');

// 分析第一个 state 文件
const statePath = path.resolve(root, stateFiles[0]);
const stateData = new Uint8Array(fs.readFileSync(statePath));

console.log(`分析文件: ${stateFiles[0]}`);
console.log(`State 大小: ${stateData.length} 字节 (0x${stateData.length.toString(16)})`);
console.log('');

// 读取前 16 字节 (version 等)
console.log('前 64 字节:');
let hex = '';
for (let i = 0; i < 64; i++) {
  hex += stateData[i].toString(16).padStart(2, '0').toUpperCase() + ' ';
  if ((i + 1) % 16 === 0) {
    console.log(`  0x${i.toString(16).padStart(4, '0')}: ${hex}`);
    hex = '';
  }
}
console.log('');

// 搜索 VRAM 的特征
// 特征 1: 找一段 64KB 的区域，开头部分有一定的非零数据 (tile 数据)
// 特征 2: 在 64KB 之后，有 128 字节的 CRAM (调色板)
//         Genesis CRAM 颜色格式: 9-bit, 0B GR
//         每个颜色 2 字节，高字节 bit7=0

function findCRAM() {
  const candidates = [];

  // CRAM 特征:
  // - 128 字节 (64 colors × 2 bytes)
  // - 每个颜色的高字节 bit7 = 0
  // - 颜色值不会全是 0 (至少有几种颜色)
  // - 在 VRAM (64KB) 之后

  for (let off = 0x200; off + 128 < stateData.length; off += 16) {
    let valid = true;
    let nonZero = 0;

    for (let i = 0; i < 128; i += 2) {
      const high = stateData[off + i];
      // 高字节 bit7 应该是 0
      if ((high & 0x80) !== 0) {
        valid = false;
        break;
      }
      if (stateData[off + i] !== 0 || stateData[off + i + 1] !== 0) {
        nonZero++;
      }
    }

    if (valid && nonZero > 10 && nonZero < 60) {
      // 再检查: 前 16 个颜色 (调色板 0) 中，颜色 0 应该是 0 (透明色)
      const color0 = (stateData[off] << 8) | stateData[off + 1];
      if (color0 === 0) {
        candidates.push({
          offset: off,
          nonZero,
        });
      }
    }
  }

  return candidates;
}

console.log('搜索 CRAM (调色板) 位置...');
const cramCandidates = findCRAM();
console.log(`找到 ${cramCandidates.length} 个候选位置\n`);

if (cramCandidates.length > 0) {
  console.log('前 5 个候选:');
  for (let i = 0; i < Math.min(5, cramCandidates.length); i++) {
    const c = cramCandidates[i];
    console.log(`  ${i + 1}. 偏移 0x${c.offset.toString(16).padStart(6, '0')} (非零颜色: ${c.nonZero})`);

    // 打印前 16 个颜色
    console.log('     调色板 0:');
    for (let j = 0; j < 16; j++) {
      const color = (stateData[c.offset + j * 2] << 8) | stateData[c.offset + j * 2 + 1];
      const r = (color >> 1) & 0xE;
      const g = (color >> 5) & 0xE;
      const b = (color >> 9) & 0xE;
      console.log(`       [${j.toString().padStart(2)}] 0x${color.toString(16).padStart(4, '0')} = RGB(${r>>1},${g>>1},${b>>1})`);
    }
  }
  console.log('');

  // 选最可能的 CRAM 位置
  const cramOffset = cramCandidates[0].offset;
  console.log(`假设 CRAM 在 0x${cramOffset.toString(16)}`);

  // VRAM 在 CRAM 之前，64KB
  const vramOffset = cramOffset - 0x10000;
  console.log(`推测 VRAM 在 0x${vramOffset.toString(16)} (CRAM - 0x10000)`);

  if (vramOffset > 0) {
    // 验证 VRAM: 检查 0xC000 处 (Plane A nametable) 是否有非零数据
    const planeAOff = vramOffset + 0xC000;
    let planeANonZero = 0;
    for (let i = 0; i < 0x1000; i += 2) {
      const val = (stateData[planeAOff + i] << 8) | stateData[planeAOff + i + 1];
      if (val !== 0) planeANonZero++;
    }
    console.log(`Plane A nametable (0xC000) 非零: ${planeANonZero} / 2048`);

    // 检查 Plane B nametable
    const planeBOff = vramOffset + 0xE000;
    let planeBNonZero = 0;
    for (let i = 0; i < 0x1000; i += 2) {
      const val = (stateData[planeBOff + i] << 8) | stateData[planeBOff + i + 1];
      if (val !== 0) planeBNonZero++;
    }
    console.log(`Plane B nametable (0xE000) 非零: ${planeBNonZero} / 2048`);

    // VSRAM 在 CRAM 之后，80 字节 (40 words)
    const vsramOffset = cramOffset + 128;
    console.log(`推测 VSRAM 在 0x${vsramOffset.toString(16)} (CRAM + 128)`);

    // 打印 VSRAM 前 20 个 word
    console.log('VSRAM 前 20 个 word:');
    for (let i = 0; i < 20; i++) {
      const val = (stateData[vsramOffset + i * 2] << 8) | stateData[vsramOffset + i * 2 + 1];
      console.log(`  [${i}] 0x${val.toString(16).padStart(4, '0')} = ${val}`);
    }

    // 导出数据结构
    const outData = {
      stateFile: stateFiles[0],
      stateSize: stateData.length,
      vramOffset: vramOffset,
      cramOffset: cramOffset,
      vsramOffset: vsramOffset,
      vram: Array.from(stateData.slice(vramOffset, vramOffset + 0x10000)),
      cram: Array.from(stateData.slice(cramOffset, cramOffset + 128)),
      vsram: Array.from(stateData.slice(vsramOffset, vsramOffset + 80)),
    };

    const outPath = path.resolve(root, 'title-screen-data.json');
    fs.writeFileSync(outPath, JSON.stringify(outData));
    console.log(`\n数据已导出到: ${outPath}`);

    // 也导出原始二进制文件
    fs.writeFileSync(path.resolve(root, 'title-vram.bin'),
      Buffer.from(stateData.slice(vramOffset, vramOffset + 0x10000)));
    fs.writeFileSync(path.resolve(root, 'title-cram.bin'),
      Buffer.from(stateData.slice(cramOffset, cramOffset + 128)));
    fs.writeFileSync(path.resolve(root, 'title-vsram.bin'),
      Buffer.from(stateData.slice(vsramOffset, vsramOffset + 80)));
    console.log('二进制文件: title-vram.bin, title-cram.bin, title-vsram.bin');
  }
}

console.log('\n=== 分析完成 ===');
