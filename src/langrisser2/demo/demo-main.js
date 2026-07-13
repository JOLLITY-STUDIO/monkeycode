/**
 * Demo 入口 - 浏览器端
 *
 * 演示纯 TS VDP 渲染 + 真实 ROM 资源
 * 标题画面场景
 */

import { GameEngine } from '../dist/game/core/GameEngine.js';
import { TitleScreen } from '../dist/game/scenes/TitleScreen.js';
import { ArrayBufferRomReader, decompressType2, dispatchByType } from '../dist/game/hw/resource.js';

const canvas = document.getElementById('game');
const btnTest = document.getElementById('btnTest');
const btnTitle = document.getElementById('btnTitle');
const btnStop = document.getElementById('btnStop');
const fileInput = document.getElementById('romFile');
const info = document.getElementById('info');

const engine = new GameEngine();
console.log('[Demo] VDP 初始化完成');
console.log('[Demo] 显示模式:', engine.vdp.width, 'x', engine.vdp.height);
console.log('[Demo] Plane A 基址:', '0x' + engine.vdp.planeABaseAddr.toString(16).toUpperCase());
console.log('[Demo] Plane B 基址:', '0x' + engine.vdp.planeBBaseAddr.toString(16).toUpperCase());
console.log('[Demo] Sprite 表基址:', '0x' + engine.vdp.spriteTableAddr.toString(16).toUpperCase());

let running = false;
let romReader = null;
let titleScreen = null;

// ============================================================
// 测试画面 (旧的测试图案)
// ============================================================
btnTest.addEventListener('click', () => {
  if (running) {
    engine.stop();
    running = false;
  }

  // 清空 VRAM
  for (let i = 0; i < 0x10000; i++) {
    engine.vdp.writeVRAM(i, 0);
  }

  // 设置简单的测试调色板
  const colors = [0x0000, 0x0EEE, 0x0E00, 0x00E0, 0x000E, 0x0EE0, 0x0E0E, 0x00EE];
  for (let i = 0; i < 8; i++) {
    engine.vdp.writeCRAM(i, colors[i]);
  }

  // 创建一些简单的 tile
  // tile 1: 白框
  const tileData = new Uint8Array(32);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const isEdge = y === 0 || y === 7 || x === 0 || x === 7;
      if (isEdge) {
        for (let plane = 0; plane < 4; plane++) {
          if (1 & (1 << plane)) {
            tileData[y * 4 + plane] |= (1 << (7 - x));
          }
        }
      }
    }
  }
  for (let i = 0; i < 32; i++) {
    engine.vdp.writeVRAM(32 + i, tileData[i]);
  }

  // 用 tile 1 填充 Plane A
  const planeABase = engine.vdp.planeABaseAddr;
  for (let y = 0; y < 28; y++) {
    for (let x = 0; x < 40; x++) {
      const addr = planeABase + (y * 64 + x) * 2;
      const word = 1; // tile 1, palette 0
      engine.vdp.writeVRAM(addr, (word >> 8) & 0xff);
      engine.vdp.writeVRAM(addr + 1, word & 0xff);
    }
  }

  engine.vdp.displayEnabled = true;

  engine.start((eng) => {}, canvas);
  running = true;

  info.innerHTML = '<p>当前显示: 测试画面 (验证 VDP 基本功能)</p>';
});

// ============================================================
// 标题画面 (真实 ROM 资源)
// ============================================================
btnTitle.addEventListener('click', async () => {
  if (!romReader) {
    alert('请先选择 ROM 文件');
    return;
  }

  if (running) {
    engine.stop();
    running = false;
  }

  info.innerHTML = '<p>正在加载标题画面资源...</p>';
  console.log('[Demo] 开始加载标题画面...');

  try {
    titleScreen = new TitleScreen(engine.vdp, romReader);
    await titleScreen.init();

    engine.start((eng) => {
      if (titleScreen) {
        titleScreen.update();
      }
    }, canvas);
    running = true;

    info.innerHTML =
      '<p>当前显示: 标题画面 (真实 ROM tile 资源)</p>' +
      '<p>资源 ID: 0x8001 (entry 0)</p>' +
      '<p>说明: Tile 数据来自 ROM，调色板为占位值，nametable 显示为 tile sheet</p>';

    console.log('[Demo] 标题画面加载完成');
  } catch (err) {
    console.error('[Demo] 标题画面加载失败:', err);
    info.innerHTML = '<p style="color: red;">加载失败: ' + err.message + '</p>';
  }
});

// ============================================================
// Type 2 资源浏览 (位平面压缩)
// ============================================================
const btnType2 = document.createElement('button');
btnType2.textContent = 'Type2 资源';
btnType2.addEventListener('click', () => {
  if (!romReader) {
    alert('请先选择 ROM 文件');
    return;
  }

  if (running) {
    engine.stop();
    running = false;
  }

  // 清空 VRAM
  for (let i = 0; i < 0x10000; i++) {
    engine.vdp.writeVRAM(i, 0);
  }

  // 查找所有 Type 2 资源, 取第一个
  const ptrTableBase = 0x000B0000;
  let firstType2Entry = -1;
  let firstType2Ptr = 0;
  for (let entry = 0; entry < 256; entry++) {
    const ptr = romReader.readLong(ptrTableBase + entry * 4);
    if (ptr === 0 || ptr >= 0x100000) continue;
    const typeCode = romReader.readByte(ptr);
    if (typeCode === 2) {
      firstType2Entry = entry;
      firstType2Ptr = ptr;
      break;
    }
  }

  if (firstType2Entry < 0) {
    info.innerHTML = '<p style="color:red;">未找到 Type 2 资源</p>';
    return;
  }

  console.log('[Demo] Type 2 Entry', firstType2Entry, '@ 0x' + firstType2Ptr.toString(16));
  const result = decompressType2(romReader, firstType2Ptr);
  console.log('[Demo] 解压结果:', result.size, '字节 =', result.size / 32, 'tiles');

  // 设置简单调色板 (灰阶)
  for (let i = 0; i < 16; i++) {
    const v = i * 0x111;
    engine.vdp.writeCRAM(i, v & 0x0EEE);
  }

  // 将 tile 数据写入 VRAM (从 tile 1 开始, 保留 tile 0 为空)
  for (let i = 0; i < result.data.length; i++) {
    engine.vdp.writeVRAM(32 + i, result.data[i]);
  }

  const numTiles = Math.floor(result.data.length / 32);
  const cols = 20;
  const rows = Math.ceil(numTiles / cols);
  const planeABase = engine.vdp.planeABaseAddr;

  // 填充 Plane A nametable
  for (let t = 0; t < numTiles; t++) {
    const tx = t % cols;
    const ty = Math.floor(t / cols);
    if (ty >= 28) break;
    const offsetX = 10;
    const offsetY = 2;
    const addr = planeABase + ((ty + offsetY) * 64 + (tx + offsetX)) * 2;
    const word = (t + 1) & 0x07FF; // tile 索引 (从 1 开始)
    engine.vdp.writeVRAM(addr, (word >> 8) & 0xff);
    engine.vdp.writeVRAM(addr + 1, word & 0xff);
  }

  engine.vdp.displayEnabled = true;
  engine.start((eng) => {}, canvas);
  running = true;

  info.innerHTML =
    '<p>当前显示: Type 2 资源 Entry ' + firstType2Entry + ' (位平面压缩解压)</p>' +
    '<p>解压大小: ' + result.size + ' 字节 = ' + numTiles + ' tiles</p>' +
    '<p>ROM 地址: 0x' + firstType2Ptr.toString(16).toUpperCase() + '</p>';
});

// 在控制区添加按钮
document.getElementById('controls').appendChild(btnType2);

// ============================================================
// 停止
// ============================================================
btnStop.addEventListener('click', () => {
  engine.stop();
  running = false;
  console.log('[Demo] 游戏循环已停止');
});

// ============================================================
// ROM 文件加载
// ============================================================
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    const buf = new Uint8Array(ev.target.result);
    romReader = new ArrayBufferRomReader(buf);
    console.log('[Demo] ROM 已加载, 大小:', buf.length, '字节');
    info.innerHTML =
      '<p>ROM 已加载: ' + file.name + ' (' + (buf.length / 1024 / 1024).toFixed(2) + ' MB)</p>' +
      '<p>点击"标题画面"按钮查看基于真实 ROM 资源的渲染</p>';
  };
  reader.readAsArrayBuffer(file);
});
