/**
 * 在 Node.js 中运行 Genesis.js 模拟器，自动提取标题画面数据
 *
 * 思路:
 * 1. Mock 浏览器环境 (window, document, canvas 等)
 * 2. 加载 Genesis.js
 * 3. 加载 ROM
 * 4. 运行 N 帧 (直到标题画面)
 * 5. 保存 state，提取 VRAM/CRAM/VSRAM
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const genesisJsPath = path.resolve(root, 'Genesis.js');

console.log('=== 标题画面数据自动提取 (Node.js 版) ===\n');

// ============================================================
// 1. Mock 浏览器环境
// ============================================================
console.log('1. Mock 浏览器环境...');

// 创建 mock 的 window/document
global.window = global;
global.document = {
  currentScript: null,
  createElement: (tag) => {
    if (tag === 'canvas') {
      return {
        getContext: () => ({
          createImageData: () => ({ data: new Uint8ClampedArray(640 * 480 * 4) }),
          putImageData: () => {},
          drawImage: () => {},
          fillRect: () => {},
          fillStyle: '',
          imageSmoothingEnabled: false,
        }),
        width: 640,
        height: 480,
      };
    }
    return {
      appendChild: () => {},
      style: {},
      addEventListener: () => {},
      setAttribute: () => {},
      getContext: () => ({}),
      width: 640,
      height: 480,
    };
  },
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  createEvent: () => ({ initEvent: () => {} }),
  addEventListener: () => {},
  body: {
    appendChild: () => {},
    addEventListener: () => {},
  },
  location: {
    href: 'http://localhost/',
    origin: 'http://localhost',
  },
};

global.location = global.document.location;
global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);
global.AudioContext = class AudioContext {
  constructor() {}
  createGain() { return { gain: { value: 0 }, connect: () => ({ connect: () => {} }) }; }
  createScriptProcessor() {
    return { connect: () => {}, onaudioprocess: null };
  }
  destination = {};
  resume() {}
  close() {}
};
global.XMLHttpRequest = class XMLHttpRequest {
  constructor() {}
  open() {}
  send() {}
  responseType = '';
  onload = null;
  response = null;
};
global.Worker = class Worker {
  constructor() {}
  postMessage() {}
  terminate() {}
  onmessage = null;
};

// ============================================================
// 2. 加载 Genesis.js
// ============================================================
console.log('2. 加载 Genesis.js...');

try {
  // Genesis.js 是 IIFE，直接 eval
  const genesisCode = fs.readFileSync(genesisJsPath, 'utf8');
  eval(genesisCode);
  console.log('   Genesis.js 加载完成');
} catch (e) {
  console.log(`   加载失败: ${e.message}`);
  console.log(`   堆栈: ${e.stack}`);
  process.exit(1);
}

// ============================================================
// 3. 等待模拟器初始化
// ============================================================
console.log('\n3. 等待模拟器初始化...');

function waitForReady() {
  return new Promise((resolve, reject) => {
    const check = () => {
      if (global.GENESIS_PICO_INIT && global.GENESIS_PICO_LOAD_ROM) {
        resolve();
      } else {
        setTimeout(check, 100);
      }
    };
    check();

    // 超时
    setTimeout(() => reject(new Error('模拟器初始化超时')), 10000);
  });
}

try {
  await waitForReady();
  console.log('   模拟器初始化完成');
} catch (e) {
  console.log(`   失败: ${e.message}`);

  // 看看 Module 状态
  if (global.Module) {
    console.log(`   Module 存在`);
    console.log(`   Module.cwrap: ${typeof global.Module.cwrap}`);
    console.log(`   Module.ready: ${global.Module.ready}`);
  }
  process.exit(1);
}

// ============================================================
// 4. 初始化模拟器并加载 ROM
// ============================================================
console.log('\n4. 初始化模拟器并加载 ROM...');

try {
  // 初始化
  const initResult = global.GENESIS_PICO_INIT();
  console.log(`   pico_init 返回: ${initResult}`);

  // 把 ROM 数据复制到模拟器内存
  const romData = fs.readFileSync(romPath);
  console.log(`   ROM 大小: ${romData.length} 字节`);

  // 获取 ROM 缓冲区指针
  const romBufPtr = global.GENESIS_PICO_GET_ROM_BUFFER(romData.length);
  console.log(`   ROM 缓冲区指针: 0x${romBufPtr.toString(16)}`);

  // 复制 ROM 数据
  const romBuf = new Uint8Array(global.Module.HEAPU8.buffer, romBufPtr, romData.length);
  romBuf.set(new Uint8Array(romData));

  // 加载 ROM
  const loadResult = global.GENESIS_PICO_LOAD_ROM(romData.length);
  console.log(`   pico_load_rom 返回: ${loadResult}`);

  // 重置
  global.GENESIS_PICO_RESET();
  console.log('   模拟器已重置');
} catch (e) {
  console.log(`   失败: ${e.message}`);
  console.log(e.stack);
  process.exit(1);
}

// ============================================================
// 5. 运行到标题画面
// ============================================================
console.log('\n5. 运行模拟器到标题画面...');

const TOTAL_FRAMES = 600; // 10 秒 (60fps)，应该足够到标题画面了

for (let i = 0; i < TOTAL_FRAMES; i++) {
  global.GENESIS_PICO_RUN_FRAME();

  if (i % 100 === 0) {
    console.log(`   已运行 ${i} 帧...`);
  }
}

console.log(`   共运行 ${TOTAL_FRAMES} 帧`);

// ============================================================
// 6. 保存 state 并提取数据
// ============================================================
console.log('\n6. 保存 state 并提取数据...');

try {
  const saveOk = global.GENESIS_PICO_STATE_SAVE();
  console.log(`   state save 返回: ${saveOk}`);

  if (!saveOk) {
    throw new Error('state 保存失败');
  }

  const statePtr = global.GENESIS_PICO_GET_STATE_BUFFER();
  const stateSize = global.GENESIS_PICO_GET_STATE_SIZE();
  console.log(`   state 指针: 0x${statePtr.toString(16)}`);
  console.log(`   state 大小: ${stateSize} 字节`);

  const stateData = new Uint8Array(global.Module.HEAPU8.buffer, statePtr, stateSize);

  // ============================================================
  // 7. 分析 state 结构，找出 VRAM/CRAM/VSRAM
  // ============================================================
  console.log('\n7. 分析 state 结构...');

  // 策略: 扫描 state buffer，找可能的 VRAM 位置
  // VRAM = 64KB，其中 0xC000 开始是 Plane A nametable (4KB)
  // 标题画面的 nametable 应该有非零数据

  function findVRAM() {
    const candidates = [];

    // 尝试各种对齐的偏移
    for (let off = 0; off + 0x10000 <= stateSize; off += 0x100) {
      // 检查 0xC000 处 (Plane A nametable)
      const planeAOff = off + 0xC000;

      // 统计非零 word 的比例
      let nonZero = 0;
      let total = 0;
      for (let i = 0; i < 0x1000; i += 2) {
        const val = stateData[planeAOff + i] * 256 + stateData[planeAOff + i + 1];
        if (val !== 0) nonZero++;
        total++;
      }

      const ratio = nonZero / total;

      // 标题画面的 nametable 非零率大概在 10%-60% 之间
      if (ratio > 0.05 && ratio < 0.8) {
        // 再检查 0xE000 处 (Plane B nametable)
        const planeBOff = off + 0xE000;
        let nonZeroB = 0;
        for (let i = 0; i < 0x1000; i += 2) {
          const val = stateData[planeBOff + i] * 256 + stateData[planeBOff + i + 1];
          if (val !== 0) nonZeroB++;
        }
        const ratioB = nonZeroB / total;

        // 也看看 0x0000 处 (tile 数据) - 应该有非零数据
        let tileNonZero = 0;
        for (let i = 0; i < 0x8000; i++) {
          if (stateData[off + i] !== 0) {
            tileNonZero++;
            if (tileNonZero > 100) break;
          }
        }

        const score = ratio + ratioB * 0.5 + (tileNonZero > 50 ? 0.3 : 0);
        candidates.push({
          offset: off,
          planeARatio: ratio,
          planeBRatio: ratioB,
          tileHasData: tileNonZero > 50,
          score,
        });
      }
    }

    // 按得分排序
    candidates.sort((a, b) => b.score - a.score);

    return candidates;
  }

  const candidates = findVRAM();
  console.log(`   找到 ${candidates.length} 个候选位置`);

  if (candidates.length === 0) {
    console.log('   未找到 VRAM，输出完整 state 供分析');
    const outPath = path.resolve(root, 'title-state-full.bin');
    fs.writeFileSync(outPath, Buffer.from(stateData));
    console.log(`   完整 state 已保存到: ${outPath}`);
    process.exit(0);
  }

  // 输出前 5 个候选
  console.log('\n   前 5 个候选:');
  for (let i = 0; i < Math.min(5, candidates.length); i++) {
    const c = candidates[i];
    console.log(`     ${i + 1}. 偏移 0x${c.offset.toString(16)}: ` +
      `PlaneA=${(c.planeARatio * 100).toFixed(1)}%, ` +
      `PlaneB=${(c.planeBRatio * 100).toFixed(1)}%, ` +
      `tileData=${c.tileHasData ? '有' : '无'}, ` +
      `score=${c.score.toFixed(2)}`);
  }

  // 选第一个候选
  const vramOffset = candidates[0].offset;
  console.log(`\n   选择 VRAM 偏移: 0x${vramOffset.toString(16)}`);

  // 提取 VRAM
  const vram = new Uint8Array(stateData.buffer, stateData.byteOffset + vramOffset, 0x10000);

  // 找 CRAM
  // CRAM 通常在 VRAM 之后，128 字节
  // 特征: 每个颜色 2 字节，高字节 bit7-bit4 通常是 0 或 E
  let cramOffset = -1;
  for (let off = vramOffset + 0x10000; off < stateSize - 128; off += 16) {
    let valid = true;
    let nonZero = 0;
    for (let i = 0; i < 128; i += 2) {
      const high = stateData[off + i];
      // Genesis VDP 颜色: 9 位，格式 0B GR
      // 高字节 bit7=0, bit6-4=B (3位)
      // 所以高字节应该是 0000BBBB 或类似
      if ((high & 0x80) !== 0) {
        valid = false;
        break;
      }
      if (stateData[off + i] !== 0 || stateData[off + i + 1] !== 0) nonZero++;
    }
    if (valid && nonZero > 10 && nonZero < 60) {
      cramOffset = off;
      break;
    }
  }

  if (cramOffset < 0) {
    // 找不到的话，假设在 VRAM 之后
    cramOffset = vramOffset + 0x10000;
    console.log('   未找到 CRAM，假设在 VRAM 之后');
  } else {
    console.log(`   CRAM 偏移: 0x${cramOffset.toString(16)}`);
  }

  const cram = new Uint8Array(stateData.buffer, stateData.byteOffset + cramOffset, 128);

  // 找 VSRAM (通常在 CRAM 之后，80 字节)
  let vsramOffset = cramOffset + 128;
  console.log(`   VSRAM 偏移: 0x${vsramOffset.toString(16)} (假设)`);

  const vsram = new Uint8Array(stateData.buffer, stateData.byteOffset + vsramOffset, 80);

  // ============================================================
  // 8. 保存提取的数据
  // ============================================================
  console.log('\n8. 保存提取的数据...');

  const outData = {
    frameCount: TOTAL_FRAMES,
    stateSize: stateSize,
    vramOffset: vramOffset,
    cramOffset: cramOffset,
    vsramOffset: vsramOffset,
    vram: Array.from(vram),
    cram: Array.from(cram),
    vsram: Array.from(vsram),
  };

  const jsonPath = path.resolve(root, 'title-screen-data.json');
  fs.writeFileSync(jsonPath, JSON.stringify(outData));
  console.log(`   JSON 数据已保存: ${jsonPath}`);

  // 也保存原始二进制
  const vramPath = path.resolve(root, 'title-vram.bin');
  fs.writeFileSync(vramPath, Buffer.from(vram));
  console.log(`   VRAM 二进制: ${vramPath}`);

  const cramPath = path.resolve(root, 'title-cram.bin');
  fs.writeFileSync(cramPath, Buffer.from(cram));
  console.log(`   CRAM 二进制: ${cramPath}`);

  // ============================================================
  // 9. 简单验证
  // ============================================================
  console.log('\n9. 数据验证...');

  // 打印调色板 0 前 8 色
  console.log('   调色板 0 前 8 色:');
  for (let i = 0; i < 8; i++) {
    const color = (cram[i * 2] << 8) | cram[i * 2 + 1];
    const r = color & 0xE;
    const g = (color >> 4) & 0xE;
    const b = (color >> 8) & 0xE;
    console.log(`     [${i}] 0x${color.toString(16).padStart(4, '0')} = RGB(${r>>1},${g>>1},${b>>1})`);
  }

  // 统计 Plane A nametable 非零数量
  let planeANonZero = 0;
  for (let i = 0; i < 0x1000; i += 2) {
    const val = vram[0xC000 + i] * 256 + vram[0xC000 + i + 1];
    if (val !== 0) planeANonZero++;
  }
  console.log(`   Plane A nametable 非零: ${planeANonZero} / 2048 (${(planeANonZero / 2048 * 100).toFixed(1)}%)`);

  console.log('\n=== 提取完成 ===');

} catch (e) {
  console.log(`   失败: ${e.message}`);
  console.log(e.stack);
  process.exit(1);
}
