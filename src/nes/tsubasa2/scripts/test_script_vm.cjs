/**
 * ScriptVM 测试脚本 — 验证脚本虚拟机能正确执行脚本 0x00
 *
 * 用法: node scripts/test_script_vm.cjs
 */
'use strict';

const fs = require('fs');
const path = require('path');

// 由于 ScriptVM 是 TypeScript 模块, 我们需要手动加载脚本数据并模拟 VM 逻辑
// 这里直接使用 scripts-bank-03.ts 中的数据测试

// 加载 bank 3 脚本数据
const bank03Path = path.resolve(__dirname, '../src/data/tile/textscript/scripts-bank-03.ts');
const src = fs.readFileSync(bank03Path, 'utf-8');

// 提取第一个脚本 (ID 0x00) 的 JSON 数据
const match = src.match(/export const SCRIPTS_BANK_03[\s\S]*?=\s*\[([\s\S]*?)\];/);
if (!match) {
  console.error('无法解析 scripts-bank-03.ts');
  process.exit(1);
}

// 解析数组 (每行一个 JSON 对象)
const lines = match[1].trim().split('\n').map(l => l.trim().replace(/,$/, ''));
const scripts = [];
for (const line of lines) {
  if (line.startsWith('{')) {
    try {
      scripts.push(JSON.parse(line));
    } catch (e) {
      // 跳过解析错误的行
    }
  }
}

console.log(`加载了 ${scripts.length} 个脚本`);

// 获取脚本 0x00
const script00 = scripts.find(s => s.id === 0);
if (!script00) {
  console.error('找不到脚本 0x00');
  process.exit(1);
}

console.log(`\n=== 脚本 0x00 ===`);
console.log(`ID: ${script00.idHex}`);
console.log(`Bank: ${script00.bank}`);
console.log(`入口地址: ${script00.entryAddr}`);
console.log(`块数: ${script00.blocks.length}`);

// 模拟 ScriptVM 执行
let blockIndex = 0;
let instrIndex = 0;
let waitFrames = 0;
let textLines = [];
let currentLine = '';
let sceneDataId = 0;
let spriteIds = [];
let objectQueue = [];
let mode = 0;
let complete = false;
let isLooping = false;
const visitedBlocks = new Set();
let loopCount = 0;
const maxLoops = 3; // 最多循环 3 次用于测试

console.log('\n=== 开始执行 ===\n');

let totalFrames = 0;
const maxFrames = 5000; // 最多模拟 5000 帧

while (!complete && totalFrames < maxFrames) {
  if (waitFrames > 0) {
    waitFrames--;
    totalFrames++;
    continue;
  }

  // 执行指令
  let count = 0;
  while (waitFrames === 0 && !complete && count < 200) {
    const block = script00.blocks[blockIndex];
    if (!block || instrIndex >= block.instructions.length) {
      blockIndex++;
      instrIndex = 0;
      if (blockIndex >= script00.blocks.length) {
        complete = true;
      }
      break;
    }

    const instr = block.instructions[instrIndex];
    instrIndex++;
    count++;

    switch (instr.type) {
    case 'TEXT':
      currentLine += instr.text || '';
      break;
    case 'TEXT_CTRL':
      if (instr.opcode === 0xE0 || instr.opcode === 0xE1) {
        if (currentLine.length > 0) {
          textLines.push(currentLine);
          currentLine = '';
        }
      }
      break;
    case 'WAIT':
      waitFrames = instr.frames || 0;
      if (currentLine.length > 0) {
        textLines.push(currentLine);
        currentLine = '';
      }
      break;
    case 'LONG_INSTR':
      switch (instr.opcode) {
      case 0xE8: // LOAD_SCENE_DATA
        sceneDataId = instr.params?.[0] ?? 0;
        console.log(`[帧${totalFrames}] LOAD_SCENE_DATA $${sceneDataId.toString(16).padStart(2,'0').toUpperCase()}`);
        break;
      case 0xEA: // CLEAR_RESET
        textLines = [];
        currentLine = '';
        spriteIds = [];
        objectQueue = [];
        break;
      case 0xEC: // COND_SET
        break;
      case 0xED: // QUEUE_OBJ
        if (instr.params?.length > 0) {
          objectQueue.push(instr.params[0]);
          console.log(`[帧${totalFrames}] QUEUE_OBJ $${instr.params[0].toString(16).padStart(2,'0').toUpperCase()}`);
        }
        break;
      case 0xEE: // CLEAR_WINDOW
        textLines = [];
        currentLine = '';
        break;
      case 0xF1: // LOAD_SPRITE
        if (instr.params?.length > 0) {
          spriteIds.push(instr.params[0]);
          console.log(`[帧${totalFrames}] LOAD_SPRITE $${instr.params[0].toString(16).padStart(2,'0').toUpperCase()}`);
        }
        break;
      case 0xF2: // SET_MODE
        mode = instr.params?.[0] ?? 0;
        console.log(`[帧${totalFrames}] SET_MODE $${mode.toString(16).padStart(2,'0').toUpperCase()}`);
        break;
      case 0xFC: // ADVANCE_PTR
        if (currentLine.length > 0) {
          textLines.push(currentLine);
          currentLine = '';
        }
        break;
      case 0xFE: // SET_PTR (跳转)
        if (instr.params?.length >= 2) {
          const targetAddr = (instr.params[1] << 8) | instr.params[0];
          const targetKey = targetAddr.toString(16).toUpperCase();
          if (visitedBlocks.has(targetKey)) {
            isLooping = true;
            loopCount++;
            console.log(`[帧${totalFrames}] SET_PTR $${targetAddr.toString(16).padStart(4,'0').toUpperCase()} (循环 #${loopCount})`);
            if (loopCount >= maxLoops) {
              complete = true;
            }
          }
          visitedBlocks.add(targetKey);

          // 查找目标块
          const addrStr = '$' + targetAddr.toString(16).padStart(4, '0').toUpperCase();
          for (let i = 0; i < script00.blocks.length; i++) {
            if (script00.blocks[i].startAddr === addrStr) {
              blockIndex = i;
              instrIndex = 0;
              break;
            }
          }
        }
        break;
      case 0xFF: // END
        complete = true;
        break;
      }
      break;
    }
  }

  totalFrames++;
}

// 输出结果
console.log('\n=== 执行结果 ===');
console.log(`总帧数: ${totalFrames}`);
console.log(`是否完成: ${complete}`);
console.log(`是否循环: ${isLooping} (循环 ${loopCount} 次)`);
console.log(`场景数据 ID: $${sceneDataId.toString(16).padStart(2,'0').toUpperCase()}`);
console.log(`精灵 ID 列表: [${spriteIds.map(id => '$' + id.toString(16).padStart(2,'0').toUpperCase()).join(', ')}]`);
console.log(`对象队列: [${objectQueue.map(id => '$' + id.toString(16).padStart(2,'0').toUpperCase()).join(', ')}]`);
console.log(`显示模式: $${mode.toString(16).padStart(2,'0').toUpperCase()}`);
console.log(`\n文本行数: ${textLines.length}`);
console.log('\n=== 文本内容 ===');
for (let i = 0; i < textLines.length; i++) {
  console.log(`  [${i}] ${textLines[i]}`);
}
