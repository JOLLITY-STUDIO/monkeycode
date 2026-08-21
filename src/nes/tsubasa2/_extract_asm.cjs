// 提取 asm 文件指定地址段（行尾 ; $XXXX 标注）
const fs = require('fs');
const path = require('path');

const files = {
  bank30: ['asm/bank30/code_main.s', 'asm/bank30/code_sub.s'],
  bank31: ['asm/bank31/code_main.s', 'asm/bank31/data_sprites.s'],
  bank00: ['asm/bank00/code_sub.s', 'asm/bank00/code_main.s', 'asm/bank00/code_scene.s'],
  bank02: ['asm/bank02/code_main.s', 'asm/bank02/code_sub.s'],
};

// 地址 → (文件, 起始行) 映射，扫一遍全文件
const ranges = {
  // HardwareInitService (bank30)
  C64E: [0xC64E, 0xC700],   // RESET 主初始化链
  CE00: [0xCE00, 0xCF40],   // $CEFE 场景重置 + $CF1F 精灵清理
  C400: [0xC400, 0xC520],   // bootScene + NMI $C500
  CB00: [0xCB00, 0xCBC0],   // $CB35 清名称表 / $CB8B OAM
  CA00: [0xCA00, 0xCA80],   // $CA22 控制器/精灵初始化
  // InterruptService (bank31 + bank30 NMI)
  C76E: [0xC76E, 0xC830],   // NMI 处理主程
  C8FB: [0xC8FB, 0xC9C0],   // VRAM 缓冲回放
  C982: [0xC982, 0xC9E9],   // 控制器读取
  C503: [0xC503, 0xC540],   // RESET 中转
};

function parseAddr(line) {
  const m = line.match(/;\s*\$([0-9A-Fa-f]{4})\s*$/);
  return m ? parseInt(m[1], 16) : null;
}

for (const [tag, addrs] of Object.entries(ranges)) {
  const [start, end] = addrs;
  console.log(`\n${'='.repeat(70)}\n### ${tag}  ($${start.toString(16)}-$${end.toString(16)})\n${'='.repeat(70)}`);
  let found = false;
  for (const rel of files[tag] || []) {
    const p = path.join(__dirname, rel);
    if (!fs.existsSync(p)) continue;
    const lines = fs.readFileSync(p, 'utf8').split('\n');
    let collecting = false;
    for (const line of lines) {
      const a = parseAddr(line);
      if (a !== null && a >= start && a <= end) {
        found = true;
        collecting = true;
        console.log(`[${rel}] ${line}`);
        continue;
      }
      if (collecting && a !== null && a > end) break;
      if (collecting) console.log(`[${rel}] ${line}`);
    }
  }
  if (!found) console.log('  (未找到地址段)');
}
