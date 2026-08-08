/**
 * 扫描所有 SID 数据，识别哪些是完整 BGM（有多个 section/JUMP/LOOP）
 */

const fs = require('fs');
const path = require('path');

const sidDir = path.resolve(__dirname, '..', 'pages', 'mini-audio-page', 'sid-data');

// 读取 index.ts 获取 SID ID 列表
const indexContent = fs.readFileSync(path.join(sidDir, 'index.ts'), 'utf8');
const ids = [];
const idRe = /import sid_(\w+) from '\.\/sid-(\w+)'/g;
let m;
while ((m = idRe.exec(indexContent)) !== null) {
  ids.push({ id: m[1], hex: m[2] });
}

// 分析每个 SID 文件的 track 结构
console.log('=== SID 完整 BGM 分析 ===\n');

for (const { id, hex } of ids) {
  const filePath = path.join(sidDir, `sid-${hex}.ts`);
  const content = fs.readFileSync(filePath, 'utf8');
  const fileSize = fs.statSync(filePath).size;
  
  // 提取 trackBytes 数组
  const bytesMatches = [];
  const bytesRe = /trackBytes:\s*\[([\s\S]*?)\]/g;
  while ((m = bytesRe.exec(content)) !== null) {
    bytesMatches.push(m[1]);
  }
  
  // 统计 track 结构
  let totalBytes = 0;
  let sectionCount = 0;
  let jumpCount = 0;
  let loopCount = 0;
  let callCount = 0;
  let retCount = 0;
  let noteCount = 0;
  let eeeCount = 0; // $EE = end channel
  let channelsActive = 0;
  
  for (const bytesStr of bytesMatches) {
    // 提取所有字节
    const byteNums = [];
    const byteRe = /0x([0-9A-Fa-f]{2})|(\d+)/g;
    while ((m = byteRe.exec(bytesStr)) !== null) {
      byteNums.push(parseInt(m[0], 16));
    }
    totalBytes += byteNums.length;
    
    // 检查 channel 是否有实际数据
    const hasData = byteNums.length > 0 && byteNums.some(b => b < 0xE0);
    if (hasData) channelsActive++;
    
    // 统计指令
    let i = 0;
    while (i < byteNums.length) {
      const b = byteNums[i];
      if (b >= 0xE0) {
        const cmd = b & 0x1F;
        if (cmd === 0x00) { // E0: section start
          sectionCount++;
        } else if (cmd === 0x08) { // E8: JUMP
          jumpCount++;
        } else if (cmd === 0x09) { // E9: CALL
          callCount++;
        } else if (cmd === 0x0A) { // EA: RET
          retCount++;
        } else if (cmd === 0x0B) { // EB: LOOP START
          loopCount++;
        } else if (cmd === 0x0E) { // EE: END
          eeeCount++;
        }
        
        // 需要跳过参数的指令
        if (cmd === 0x08 || cmd === 0x09) { // JUMP/CALL 跳过 2 字节
          i += 3;
          continue;
        }
        if ([0x02, 0x03, 0x04, 0x05, 0x06, 0x0B, 0x0D].includes(cmd)) { // 1 字节参数
          i += 2;
          continue;
        }
        i++;
      } else if (b < 0x80) {
        noteCount++;
        i++;
      } else {
        i++;
      }
    }
  }
  
  // 判断类型
  const hasSections = sectionCount > 2;
  const hasJumps = jumpCount > 0;
  const hasLoops = loopCount > 0;
  const hasCalls = callCount > 0;
  const isFullBGM = hasSections && (hasJumps || hasCalls || hasLoops) && channelsActive >= 2;
  const isSFX = sectionCount <= 1 && jumpCount <= 1 && !hasLoops && noteCount < 30;
  
  let type = '?';
  if (isFullBGM) type = 'BGM';
  else if (isSFX) type = 'SFX';
  else if (sectionCount >= 2) type = 'JINGLE';
  else type = 'SHORT';
  
  console.log(
    `SID ${hex} | ${type.padEnd(6)} | ` +
    `${String(totalBytes).padStart(5)} bytes | ` +
    `ch=${channelsActive} ` +
    `notes=${String(noteCount).padStart(4)} ` +
    `sections=${String(sectionCount).padStart(2)} ` +
    `JUMP=${String(jumpCount).padStart(2)} ` +
    `CALL=${String(callCount).padStart(2)} ` +
    `LOOP=${String(loopCount).padStart(2)} ` +
    `END=${String(eeeCount).padStart(2)}`
  );
}
