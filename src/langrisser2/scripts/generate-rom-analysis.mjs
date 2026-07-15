import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', '20260713');
const ROM_FILE = path.join(BASE, 'Langrisser II (Japan).md');
const GHIDRA_FILE = path.join(__dirname, '..', 'monkeycode-tmp-files', '.monkeycode-tmp-files', '1b73ae22-Langrisser II (Japan).md-1.c');
const OUTPUT_DIR = path.join(BASE, 'analysis');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'rom-analysis-report.md');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const rom = new Uint8Array(fs.readFileSync(ROM_FILE));

const readWord = (addr) => (rom[addr] << 8) | rom[addr + 1];
const readLong = (addr) => (rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3];
const readStr = (addr, len) => {
  let s = '';
  for (let i = 0; i < len; i++) {
    const b = rom[addr + i];
    if (b >= 0x20 && b <= 0x7E) s += String.fromCharCode(b);
    else s += '.';
  }
  return s;
};

const reportLines = [];
const addLine = (s) => reportLines.push(s);

addLine('# Langrisser II ROM 分析报告');
addLine('');
addLine('> 基于 ROM dump 和 Ghidra 反编译结果，为 TypeScript 实现提供完整参考');
addLine('');
addLine(`**生成时间**: ${new Date().toISOString()}`);
addLine(`**ROM 文件**: ${path.basename(ROM_FILE)}`);
addLine(`**ROM 大小**: ${rom.length} 字节 (${(rom.length / 1024 / 1024).toFixed(2)} MB)`);
addLine('');
addLine('---');
addLine('');
addLine('## 一、ROM 头部与向量表');
addLine('');
addLine('### 1.1 初始向量表 (ROM 0x0000-0x00FF)');
addLine('');
addLine('| 偏移 | 向量 | 值 | 目标地址 | 说明 |');
addLine('|------|------|-----|---------|------|');

const vectors = [
  { offset: 0x00, name: 'SSP', desc: '初始栈指针' },
  { offset: 0x04, name: 'Reset', desc: '复位入口' },
  { offset: 0x08, name: 'BusErr', desc: '总线错误' },
  { offset: 0x0C, name: 'AdrErr', desc: '地址错误' },
  { offset: 0x10, name: 'InvOpCode', desc: '无效指令' },
  { offset: 0x14, name: 'DivBy0', desc: '除零错误' },
  { offset: 0x70, name: 'HBLANK', desc: '行扫描中断' },
  { offset: 0x78, name: 'VBLANK', desc: '场扫描中断(主心跳)' },
];

vectors.forEach(v => {
  const value = readLong(v.offset);
  const targetAddr = value & 0xFFFFFF;
  addLine(`| \\$${v.offset.toString(16).padStart(4, '0')} | ${v.name} | \\$${value.toString(16).toUpperCase().padStart(8, '0')} | \\$${targetAddr.toString(16).toUpperCase().padStart(8, '0')} | ${v.desc} |`);
});

addLine('');
addLine('### 1.2 ROM 信息头 (ROM 0x0100-0x0200)');
addLine('');
addLine('| 偏移 | 字段 | 值 |');
addLine('|------|------|-----|');
addLine(`| \\$0100 | SEGA标志 | "${readStr(0x100, 4)}" |`);
addLine(`| \\$0110 | 厂商/版权 | "${readStr(0x110, 16)}" |`);
addLine(`| \\$0120 | 游戏名(日) | "${readStr(0x120, 48)}" |`);
addLine(`| \\$0150 | 游戏名(美) | "${readStr(0x150, 48)}" |`);
addLine(`| \\$0180 | 产品编号 | "${readStr(0x180, 14)}" |`);
addLine(`| \\$01A0 | ROM范围 | \\$${readLong(0x1A0).toString(16).toUpperCase()} |`);
addLine(`| \\$01A8 | RAM范围 | \\$${readLong(0x1A8).toString(16).toUpperCase()} |`);
addLine(`| \\$01B4 | SRAM范围 | \\$${readLong(0x1B4).toString(16).toUpperCase()} |`);
addLine(`| \\$01F0 | 国别码 | "${readStr(0x1F0, 1)}" |`);

addLine('');
addLine('---');
addLine('');
addLine('## 二、核心函数清单');
addLine('');
addLine('从 Ghidra 反编译结果提取的关键函数:');
addLine('');

const ghidraCode = fs.readFileSync(GHIDRA_FILE, 'utf8');
const funcRegex = /^void\s+(FUN_[0-9A-Fa-f]{8}|[A-Za-z_][A-Za-z0-9_]*)\s*\(\s*void\s*\)/gm;
const funcs = [];
let match;
while ((match = funcRegex.exec(ghidraCode)) !== null) {
  const name = match[1];
  const addrMatch = name.match(/FUN_([0-9A-Fa-f]{8})/);
  const addr = addrMatch ? parseInt(addrMatch[1], 16) : null;
  funcs.push({ name, addr });
}

funcs.sort((a, b) => {
  if (a.addr === null) return 1;
  if (b.addr === null) return -1;
  return a.addr - b.addr;
});

const knownFuncs = [
  { addr: 0x00800A, name: 'Reset', purpose: '系统复位入口 - TMSS解锁/VDP初始化/Z80初始化/校验和验证' },
  { addr: 0x0082B4, name: 'VBLANK', purpose: '场扫描中断 - 60Hz主心跳，任务调度核心' },
  { addr: 0x0084B8, name: 'HBLANK', purpose: '行扫描中断' },
  { addr: 0x008294, name: 'FUN_00008294', purpose: '任务队列清空' },
  { addr: 0x0085EE, name: 'FUN_000085ee', purpose: '控制器读取' },
  { addr: 0x00866C, name: 'FUN_0000866c', purpose: '控制器初始化' },
  { addr: 0x0086B4, name: 'FUN_000086b4', purpose: 'DMA子系统初始化' },
  { addr: 0x008A6C, name: 'FUN_00008a6c', purpose: '显示队列/VDP命令队列处理' },
  { addr: 0x008ABA, name: 'FUN_00008aba', purpose: 'DMA拷贝主入口' },
  { addr: 0x009020, name: 'FUN_00009020', purpose: '输入状态初始化' },
  { addr: 0x009074, name: 'FUN_00009074', purpose: 'VDP VRAM DMA传输(双缓冲)' },
  { addr: 0x009172, name: 'FUN_00009172', purpose: '显示列表初始化' },
  { addr: 0x00942A, name: 'FUN_0000942a', purpose: '任务调度器初始化' },
  { addr: 0x0097DC, name: 'FUN_000097dc', purpose: '通用DMA传输函数' },
  { addr: 0x0099B2, name: 'FUN_000099b2', purpose: '资源加载(通用加载+DMA)' },
  { addr: 0x009A0E, name: 'FUN_00009a0e', purpose: '资源指针表查找' },
  { addr: 0x0099FA, name: 'FUN_000099fa', purpose: '资源类型分发(RLE/LZSS/位平面)' },
  { addr: 0x00A052, name: 'FUN_0000a052', purpose: '精灵数据加载' },
  { addr: 0x00C80C, name: 'FUN_0000c80c', purpose: '游戏主初始化' },
  { addr: 0x00C92C, name: 'FUN_0000c92c', purpose: '默认任务处理函数' },
  { addr: 0x00C936, name: 'FUN_0000c936', purpose: '场景初始化' },
  { addr: 0x00FB5A, name: 'FUN_0000fb5a', purpose: 'Z80音频命令(静音控制)' },
  { addr: 0x00FC1A, name: 'FUN_0000fc1a', purpose: 'YM2612音频播放' },
  { addr: 0x00FFF8, name: 'FUN_0000fff8', purpose: 'Nibble RLE解压(类型1)' },
  { addr: 0x0100A0, name: 'FUN_000100a0', purpose: 'LZSS解压(类型3)' },
  { addr: 0x010A94, name: 'FUN_00010a94', purpose: '角色能力表加载' },
  { addr: 0x011F88, name: 'FUN_00011f88', purpose: 'SRAM读取/存档初始化' },
  { addr: 0x01DDC8, name: 'FUN_0001ddc8', purpose: '系统底层初始化' },
];

addLine('### 2.1 入口与核心系统函数');
addLine('');
addLine('| 地址 | 函数名 | 用途 |');
addLine('|------|--------|------|');
knownFuncs.forEach(f => {
  addLine(`| \\$${f.addr.toString(16).toUpperCase().padStart(8, '0')} | ${f.name} | ${f.purpose} |`);
});

addLine('');
addLine(`### 2.2 函数总数统计`);
addLine('');
addLine(`- **Ghidra识别函数**: ${funcs.length} 个`);

const funcWithAddr = funcs.filter(f => f.addr !== null);
addLine(`- **带地址函数**: ${funcWithAddr.length} 个`);

const regionStats = [
  { name: '启动/初始化', start: 0x00000, end: 0x01000 },
  { name: 'VDP/硬件IO', start: 0x01000, end: 0x02000 },
  { name: '主循环/任务调度', start: 0x08000, end: 0x0A000 },
  { name: '场景管理', start: 0x0A000, end: 0x0C000 },
  { name: 'UI/菜单渲染', start: 0x0C000, end: 0x10000 },
  { name: '地图/战斗系统', start: 0x10000, end: 0x20000 },
  { name: '角色/单位系统', start: 0x20000, end: 0x30000 },
  { name: '魔法/道具系统', start: 0x30000, end: 0x40000 },
  { name: 'AI系统', start: 0x40000, end: 0x50000 },
  { name: '存档系统', start: 0x50000, end: 0x60000 },
];

addLine('');
addLine('### 2.3 函数区域分布');
addLine('');
addLine('| 地址范围 | 区域 | 函数数 |');
addLine('|---------|------|--------|');
let totalFuncs = 0;
regionStats.forEach(r => {
  const count = funcWithAddr.filter(f => f.addr >= r.start && f.addr < r.end).length;
  totalFuncs += count;
  addLine(`| \\$${r.start.toString(16).padStart(5, '0')}-\\$${r.end.toString(16).padStart(5, '0')} | ${r.name} | ${count} |`);
});

addLine('');
addLine('---');
addLine('');
addLine('## 三、ROM 内存映射与数据区域');
addLine('');
addLine('### 3.1 完整内存映射');
addLine('');
addLine('| 地址范围 | 大小 | 类型 | 用途 |');
addLine('|---------|------|------|------|');
addLine('| \\$000000-\\$0000FF | 256B | 向量表 | 中断向量 + 系统向量 |');
addLine('| \\$000100-\\$0001FF | 256B | ROM头 | SEGA标志/游戏信息 |');
addLine('| \\$000200-\\$007FFF | 31.5KB | 代码 | 启动代码/VDP初始化/校验和 |');
addLine('| \\$008000-\\$00FFFF | 56KB | 代码 | 核心系统(VBLANK/DMA/输入) |');
addLine('| \\$010000-\\$05DFFF | 312KB | 代码 | 游戏逻辑(场景/战斗/单位) |');
addLine('| \\$05E000-\\$06FFFF | 88KB | 数据 | 角色能力表/对话脚本/文本 |');
addLine('| \\$070000-\\$08FFFF | 128KB | 数据 | 地图数据/场景配置 |');
addLine('| \\$090000-\\$0AFFFF | 128KB | 数据 | 单位配置/音乐指针表 |');
addLine('| \\$0B0000-\\$0B7FFF | 32KB | 数据 | **资源指针表** |');
addLine('| \\$0B8000-\\$1DBFFF | 16.5MB | 数据 | 压缩图形/精灵/地图资源 |');
addLine('| \\$1DC000-\\$1FFFFF | 256KB | 数据 | **Z80音乐数据** |');

addLine('');
addLine('### 3.2 关键数据区域详解');
addLine('');

const dataRegions = [
  { addr: 0x05E64A, size: 240, desc: '10角色能力表(每角色24B)', tsFile: 'game/data/character.ts' },
  { addr: 0x061AC5, size: -1, desc: '场景名称模板(0xFF结束)', tsFile: 'game/data/scenario.ts' },
  { addr: 0x061CB0, size: -1, desc: '地图指针表', tsFile: 'game/data/map.ts' },
  { addr: 0x097404, size: -1, desc: '单位组配置数据', tsFile: 'game/data/troops.ts' },
  { addr: 0x0B0000, size: 32768, desc: '资源指针表(2字节偏移+基址)', tsFile: 'game/hw/resource.ts' },
  { addr: 0x096C74, size: -1, desc: '音乐指针表(2字节偏移+0x090000)', tsFile: 'game/data/music/' },
];

addLine('| ROM地址 | 大小 | 描述 | 对应TS文件 |');
addLine('|---------|------|------|------------|');
dataRegions.forEach(d => {
  const sizeStr = d.size === -1 ? '变长' : `${d.size}B`;
  addLine(`| \\$${d.addr.toString(16).toUpperCase().padStart(6, '0')} | ${sizeStr} | ${d.desc} | ${d.tsFile} |`);
});

addLine('');
addLine('---');
addLine('');
addLine('## 四、资源加载系统');
addLine('');
addLine('### 4.1 资源类型');
addLine('');
addLine('| 类型码 | 算法 | 用途 |');
addLine('|--------|------|------|');
addLine('| 0x01 | Nibble RLE | 4bpp tile图案数据 |');
addLine('| 0x02 | 位平面压缩 | 2/4/6-plane tile |');
addLine('| 0x03 | LZSS | 通用数据(含tile) |');

addLine('');
addLine('### 4.2 资源加载流程');
addLine('');
addLine('```');
addLine('游戏逻辑设置资源ID');
addLine('  → FUN_000099b2 (通用加载+DMA)');
addLine('    → FUN_00009a0e (资源指针表查找: ROM 0x0B0000)');
addLine('    → FUN_000099fa (类型分发: RLE/LZSS/位平面解压)');
addLine('    → 解压到 RAM 0xFF1000 缓冲区');
addLine('    → DMA (0xFFF9命令) → VRAM目标地址');
addLine('```');

addLine('');
addLine('### 4.3 资源ID格式');
addLine('');
addLine('- **高8位**: 资源组/类型');
addLine('- **低8位**: 资源编号');
addLine('- **0x8000-0xFFFF**: DMA延迟加载标记');
addLine('- **资源ID 0x8001**: 字体资源(首个资源)');

addLine('');
addLine('---');
addLine('');
addLine('## 五、VDP 显示系统');
addLine('');
addLine('### 5.1 VDP 内存布局');
addLine('');
addLine('| VRAM地址 | 大小 | 用途 | VDP寄存器配置 |');
addLine('|---------|------|------|---------------|');
addLine('| \\$0000-\\$BFFF | 49KB | Tile图案数据(BG+Sprite共享) | R6=0x00 |');
addLine('| \\$C000-\\$CFFF | 4KB | Plane A Nametable | R2=0x30 |');
addLine('| \\$D800-\\$DBFF | 1KB | Sprite Attribute Table(80精灵×8B) | R5=0x6C |');
addLine('| \\$E000-\\$EFFF | 4KB | Plane B Nametable | R4=0x07 |');
addLine('| \\$F000-\\$FFFF | 4KB | Window Nametable | R3=0x3C |');

addLine('');
addLine('### 5.2 DMA 命令码');
addLine('');
addLine('| 命令码 | 功能 | 用途 |');
addLine('|--------|------|------|');
addLine('| 0xFFF5 | VRAM填充 | 清空VRAM区域 |');
addLine('| 0xFFF9 | DMA传输(标准) | **主要传输方式** |');
addLine('| 0xFFFA | DMA→VRAM | CRAM/VRAM传输 |');
addLine('| 0xFFFB | DMA→VSRAM | VSRAM传输 |');
addLine('| 0xFFFC | 单word写VRAM | 寄存器设置 |');
addLine('| 0xFFFF | VDP数据写 | 单值写入 |');

addLine('');
addLine('---');
addLine('');
addLine('## 六、TS 实现映射表');
addLine('');
addLine('### 6.1 已提取的数据文件');
addLine('');

const tsDataFiles = [
  { file: 'TitleScreenData.ts', source: 'ROM解压', desc: '标题画面tile/调色板/nametable' },
  { file: 'OpeningAnimationData.ts', source: 'ROM解压', desc: '开场动画数据' },
  { file: 'FontData8001.ts', source: '资源0x8001', desc: '字体tile数据' },
  { file: 'TilesetData.ts', source: 'ROM解压', desc: '通用tileset' },
  { file: 'MusicIndex.ts', source: 'ROM 0x096C74', desc: '音乐索引表' },
  { file: 'character.ts', source: 'ROM 0x05E64A', desc: '角色定义' },
  { file: 'classes.ts', source: 'ROM分析', desc: '职业定义' },
  { file: 'map.ts', source: 'ROM分析', desc: '地图数据' },
  { file: 'scenario.ts', source: 'ROM分析', desc: '关卡配置' },
  { file: 'units.ts', source: 'ROM分析', desc: '单位数据' },
  { file: 'troops.ts', source: 'ROM 0x097404', desc: '部队配置' },
];

addLine('| 文件 | 数据来源 | 描述 |');
addLine('|------|---------|------|');
tsDataFiles.forEach(f => {
  addLine(`| [${f.file}](file:///d:/studio/github/monkeycode/src/langrisser2/game/data/${f.file}) | ${f.source} | ${f.desc} |`);
});

addLine('');
addLine('### 6.2 音乐数据文件 (38首)');
addLine('');
addLine('位于 `game/data/music/` 目录，从 ROM 0x096C74 音乐指针表提取');

addLine('');
addLine('### 6.3 关卡数据文件 (31关)');
addLine('');
addLine('位于 `game/data/` 目录，命名格式: Stage{N}Data.ts');

addLine('');
addLine('---');
addLine('');
addLine('## 七、启动流程与调用链');
addLine('');
addLine('### 7.1 Reset 启动流程');
addLine('');
addLine('```');
addLine('0x00800A Reset()');
addLine('  ├─ TMSS商标解锁 (0x53454741)');
addLine('  ├─ VDP寄存器初始化 (ROM 0x80B2)');
addLine('  ├─ Z80初始化 + PSG静音');
addLine('  ├─ ROM校验和验证 (0xD79F)');
addLine('  ├─ RAM清零 (64KB)');
addLine('  ├─ FUN_0001ddc8() - 系统底层初始化');
addLine('  ├─ FUN_000086b4() - DMA子系统初始化');
addLine('  ├─ FUN_0000866c() - 控制器初始化');
addLine('  ├─ FUN_00009172() - 显示列表初始化');
addLine('  ├─ FUN_00009020() - 输入状态初始化');
addLine('  ├─ FUN_00008a6c() - 显示队列初始化');
addLine('  ├─ FUN_0000942a() - 任务调度器初始化');
addLine('  └─ FUN_0000c80c() - ★游戏主初始化');
addLine('       ├─ FUN_0000fb5a() - Z80音频静音');
addLine('       ├─ FUN_00011f88() - SRAM初始化');
addLine('       ├─ FUN_00010a94() - 角色能力表加载');
addLine('       └─ 场景索引设置 = 1');
addLine('');
addLine('主循环: do { 等待任务队列 → 执行任务 → 队列前移 } while(true)');
addLine('```');

addLine('');
addLine('### 7.2 VBLANK 60Hz循环');
addLine('');
addLine('```');
addLine('0x0082B4 VBLANK()');
addLine('  ├─ 清除VDP中断标志');
addLine('  ├─ 帧计数递增');
addLine('  ├─ 输入扫描(控制器状态更新)');
addLine('  ├─ 任务队列填充');
addLine('  ├─ DMA命令处理');
addLine('  └─ 显示列表刷新');
addLine('```');

addLine('');
addLine('---');
addLine('');
addLine('## 八、下一步工作建议');
addLine('');
addLine('### 8.1 数据提取待完成');
addLine('');
addLine('- [ ] 对话脚本完整提取 (ROM 0x05E000-0x06FFFF)');
addLine('- [ ] 魔法数据提取 (ROM 0x070000附近)');
addLine('- [ ] 道具数据提取');
addLine('- [ ] 完整角色精灵图提取');
addLine('- [ ] 地图tileset完整提取');

addLine('');
addLine('### 8.2 系统实现待完成');
addLine('');
addLine('- [ ] 资源加载系统(三种解压算法)');
addLine('- [ ] VDP显示系统(双缓冲/DMA)');
addLine('- [ ] 战斗系统(伤害计算/兵种相克)');
addLine('- [ ] 魔法系统');
addLine('- [ ] 存档系统');

addLine('');
addLine('---');
addLine('');
addLine('**报告生成完毕**');

fs.writeFileSync(OUTPUT_FILE, reportLines.join('\n'));
console.log(`ROM分析报告已生成: ${OUTPUT_FILE}`);
console.log(`共 ${reportLines.length} 行`);