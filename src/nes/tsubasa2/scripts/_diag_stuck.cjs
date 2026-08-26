// 临时诊断: 磁盘空间 + 进程 CPU + 输出目录大小 (用完删除)
const fs = require('fs');
const { execSync } = require('child_process');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';

try {
  const disk = execSync('wmic logicaldisk where drivetype=3 get caption,freespace,size /format:list', { encoding: 'utf8', windowsHide: true });
  console.log('[disk]\n' + disk.trim());
} catch (e) { console.log('[disk] err:', e.message); }

try {
  const t = execSync('tasklist /FI "IMAGENAME eq node.exe" /FO CSV', { encoding: 'utf8', windowsHide: true });
  console.log('[node processes]\n' + t.trim());
} catch (e) { console.log('[tasklist] err:', e.message); }

// 输出目录大小
function dirSize(p) {
  let total = 0;
  try {
    for (const d of fs.readdirSync(p)) {
      const fp = p + '/' + d;
      const st = fs.statSync(fp);
      if (st.isDirectory()) total += dirSize(fp); else total += st.size;
    }
  } catch (e) {}
  return total;
}
const out = root + '/output/emu-full';
console.log('[size] output/emu-full:', (dirSize(out) / 1073741824).toFixed(2), 'GB');
for (const f of ['emu-full.log', 'emu-full-all.log']) {
  const fp = out + '/' + f;
  if (fs.existsSync(fp)) console.log('[size] ' + f + ':', (fs.statSync(fp).size / 1048576).toFixed(1), 'MB');
}
