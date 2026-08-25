const fs=require('fs');
const lines=fs.readFileSync('docs/roms/opening-all/openning-4097清屏-到循环重新4343出现tecmo又.log','utf8').split('\n');

// 搜 "STA $2006 = #$3F" 模式（PPUADDR → palette 区域）
// 格式: "$xx:xxxx: ... STA $2006 = #$3F"
const paletteSetups = [];
for (let i = 0; i < lines.length; i++) {
  const ln = lines[i];
  if (/STA .\$2006.*= #\$3f/i.test(ln) || /STA .\$2006.*= #\$3F/i.test(ln)) {
    paletteSetups.push([i+1, ln]);
  } else if (/2006\s*=\s*#\$3f/i.test(ln)) {
    paletteSetups.push([i+1, ln]);
  }
}
console.log('"STA $2006 = #$3F" 出现次数:', paletteSetups.length);
paletteSetups.slice(0,10).forEach(([n,l])=>console.log(`  L${n}: ${l.trim().slice(0,160)}`));

// 看每个 PPUADDRESS 设置 $3F 后,接下来 32+ 次 $2007 写
console.log('\n----- 找 "PPUADDR → $3Fxx → block $2007 write" 模式 -----');
let cur = 0;
const blockWrite = [];
let lastPPUaddrAt3F = -1;
let next2007Count = 0;
for (let i = 0; i < lines.length; i++) {
  const ln = lines[i];
  const fm = ln.match(/^f(\d+)\s/);
  if (fm) cur = +fm[1];
  // 两字节写 $2006
  if (/LD[A]\s+#\$3[Ff]\b.*\$2006|STA\s+\$2006\s*=\s*#\$3[Ff]\b/.test(ln)) {
    lastPPUaddrAt3F = i;
    next2007Count = 0;
  } else if (lastPPUaddrAt3F >= 0 && /STA\b.*\$2007\b/.test(ln)) {
    next2007Count++;
    if (next2007Count >= 5) {
      blockWrite.push({line:i+1, frame:cur, count:next2007Count, after2006At: lastPPUaddrAt3F});
      lastPPUaddrAt3F = -1;
    }
  }
}
console.log('检测到 $3F PPUADDR 之后连续 STA $2007 >= 5 的块写:', blockWrite.length);
blockWrite.slice(0,20).forEach(b=>console.log(`  L${b.line} f${b.frame} 写了 ${b.count} 次 $2007`));

// 看每个 $4014 的 frame (OAM DMA)
console.log('\n----- 所有 $4014 (OAM DMA) 帧 -----');
cur=0;
const oamFrames = [];
for (const ln of lines) {
  const fm = ln.match(/^f(\d+)\s/);
  if (fm) cur = +fm[1];
  if (/STA\b.*\$4014\b/.test(ln)) oamFrames.push(cur);
}
console.log('OAM DMA 总次数:',oamFrames.length);
console.log('前 20 个 OAM DMA 帧:',oamFrames.slice(0,20).join(', '));
console.log('去重后唯一帧数:',new Set(oamFrames).size);
