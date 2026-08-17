const fs = require('fs');
const path = require('path');

const ASM_PATH = path.join(__dirname, '..', '_tmp_bzk_out', 'bank_02.asm');
const STATS_PATH = path.join(__dirname, '..', '_tmp_bzk_out', '_stats.txt');
const OUT_PATH = path.join(__dirname, '..', 'pages', 'bankpage', 'bank-detail', 'bank02_analysis.ts');

const lines = fs.readFileSync(ASM_PATH, 'utf-8').split(/\r?\n/);

const LINE_RE = /^(C|D|-)\s+([CD\-])\s+([\d\-])\s+([\d\-])\s+([\d\-])\s+([\d\-])\s+0x([0-9A-F]{6})\s+([0-9A-F]{2}):([0-9A-F]{4}):\s*(.*)$/;

const records = [];
const refs = [];

function parseAddr(addrHex) {
  return parseInt(addrHex, 16);
}

function bankAddrToPrg(bankAddrHex) {
  return parseInt(bankAddrHex, 16) - 0x8000 + 0x4000; // Bank 02 PRG offset
}

lines.forEach((raw, idx) => {
  const m = raw.match(LINE_RE);
  if (!m) return;
  const flags1 = m[1]; // C=code, -=not code
  const flags2 = m[2]; // D=data
  const addr = parseAddr(m[7]);
  const bankAddr = m[9];
  const text = m[10];

  const type = flags1 === 'C' ? 'code' : (flags2 === 'D' ? 'data' : 'unaccessed');

  records.push({
    line: idx + 1,
    type,
    addr,
    bankAddr,
    text,
  });

  const jsrJmp = text.match(/(?:JSR|JMP)\s+\$([0-9A-F]{4})/);
  if (jsrJmp) {
    const target = parseInt(jsrJmp[1], 16);
    refs.push({ from: addr, fromBankAddr: bankAddr, to: target, op: text.includes('JMP') ? 'JMP' : 'JSR', line: idx + 1 });
  }
  const ldaAbs = text.match(/LDA\s+\$([0-9A-F]{4})/);
  if (ldaAbs) {
    const target = parseInt(ldaAbs[1], 16);
    if (target >= 0xA000 && target <= 0xBFFF) {
      refs.push({ from: addr, fromBankAddr: bankAddr, to: target, op: 'LDA', line: idx + 1, kind: 'data' });
    }
  }
});

// 合并连续同类型块
const blocks = [];
let cur = null;
for (const r of records) {
  if (!cur || r.type !== cur.type) {
    if (cur) blocks.push(cur);
    cur = { type: r.type, startAddr: r.addr, endAddr: r.addr, startLine: r.line, endLine: r.line, length: 1 };
  } else {
    cur.endAddr = r.addr;
    cur.endLine = r.line;
    cur.length++;
  }
}
if (cur) blocks.push(cur);

// 子程序检测：以 RTS/RTI/JMP 结束的连续 code 块
// 限制：只取最长的连续 code 段，避免 RTS 重复切分
const subroutines = [];
let codeStart = null;
for (let i = 0; i < records.length; i++) {
  const rec = records[i];
  if (rec.type === 'code') {
    if (codeStart === null) codeStart = i;
  } else {
    if (codeStart !== null) {
      const startRec = records[codeStart];
      const endRec = records[i - 1];
      subroutines.push({
        startLine: startRec.line,
        endLine: endRec.line,
        startAddr: startRec.addr,
        endAddr: endRec.addr,
        startBankAddr: startRec.bankAddr,
        endBankAddr: endRec.bankAddr,
        length: i - codeStart,
        name: `sub_${startRec.bankAddr}`,
      });
      codeStart = null;
    }
  }
}
if (codeStart !== null) {
  const startRec = records[codeStart];
  const endRec = records[records.length - 1];
  subroutines.push({
    startLine: startRec.line,
    endLine: endRec.line,
    startAddr: startRec.addr,
    endAddr: endRec.addr,
    startBankAddr: startRec.bankAddr,
    endBankAddr: endRec.bankAddr,
    length: records.length - codeStart,
    name: `sub_${startRec.bankAddr}`,
  });
}

// 数据表：合并连续 data/unaccessed 块中长度>=8的
const dataTables = [];
for (const b of blocks) {
  if (b.type !== 'code' && b.length >= 8) {
    const startRec = records[b.startLine - 1] || records[records.length - 1];
    const endRec = records[b.endLine - 1] || records[records.length - 1];
    dataTables.push({
      startLine: b.startLine,
      endLine: b.endLine,
      startAddr: b.startAddr,
      endAddr: b.endAddr,
      startBankAddr: startRec.bankAddr,
      endBankAddr: endRec.bankAddr,
      length: b.length,
    });
  }
}

// 读取 _stats.txt 中的权威统计（如果存在）
let officialStats = null;
if (fs.existsSync(STATS_PATH)) {
  const statsText = fs.readFileSync(STATS_PATH, 'utf-8');
  const line = statsText.split(/\r?\n/).find(l => l.includes('Bank 02'));
  if (line) {
    const codeM = line.match(/code=(\d+)/);
    const dataM = line.match(/data=\s*(\d+)/);
    const unaccM = line.match(/unacc=(\d+)/);
    if (codeM && dataM && unaccM) {
      officialStats = {
        codeBytes: parseInt(codeM[1], 10),
        dataBytes: parseInt(dataM[1], 10),
        unaccessedBytes: parseInt(unaccM[1], 10),
      };
    }
  }
}

// 统计
const stats = {
  totalLines: records.length,
  codeBytes: officialStats ? officialStats.codeBytes : records.filter(r => r.type === 'code').length,
  dataBytes: officialStats ? officialStats.dataBytes : records.filter(r => r.type === 'data').length,
  unaccessedBytes: officialStats ? officialStats.unaccessedBytes : records.filter(r => r.type === 'unaccessed').length,
  subroutineCount: subroutines.length,
  dataTableCount: dataTables.length,
  jsrCount: refs.filter(r => r.op === 'JSR').length,
  jmpCount: refs.filter(r => r.op === 'JMP').length,
  ldaDataCount: refs.filter(r => r.op === 'LDA' && r.kind === 'data').length,
  note: officialStats ? 'stats from _stats.txt' : 'stats from asm line markers',
};

// 关键子程序命名（基于地址）
const knownSubs = {
  '8107': 'NMI 结束 / 帧同步',
  '8160': 'IRQ 处理 / MMC3 scanline',
  '81A8': 'MMC3 bank 切换 (A1A8)',
  '81CB': 'MMC3 切换 CHR (A1CB)',
  '821B': '场景入口 A: 初始化',
  '8203': '场景入口 B: 密码/选择',
  '8206': '场景入口 C',
  '820C': '场景入口 D',
  '82AF': '场景子程序',
  '82E8': '场景选择 / 密码逻辑',
  '8484': '跳转表分发',
  '84C1': '绘制/初始化大段',
  '85DC': '场地生成主流程',
  '8655': '场地块填充 (A655)',
  '869D': '场地生成入口 (A69D)',
  '872C': 'A72C: NT 坐标生成',
  '8767': 'A767: 重置计数器',
  '87BE': '球门绘制 (A7BE)',
  '8895': '8895: metatile 展开',
  '8920': '8920: PPU 数据写入',
  '8976': '8976: 行列填充',
  '8AF7': '8AF7: 属性/颜色',
  '8B7C': '8B7C: 场地小功能',
  '8C9A': '8C9A: 场地小功能',
  '8A06': '8A06: AA06 调色板/CHR（跳转入口）',
  '882F': '882F: AA47 读取与 OAM 缓冲写入',
  '8855': '8855: 场地区域判定 + metatile 展开',
  '88CE': '88CE: OAM 数据复制到 $0200',
  '877B': '877B: 场地生成辅助',
};

for (const sub of subroutines) {
  const key = sub.startBankAddr;
  if (knownSubs[key]) sub.displayName = `${knownSubs[key]} ($${sub.startBankAddr})`;
  else sub.displayName = `sub_$${sub.startBankAddr}`;
}

// Bank 02 PRG 起始偏移 = 0x4010（见 asm 文件头）
// bank window addr = 0x8000 + (PRG - 0x4010)  =>  PRG = bankAddr - 0x3FF0
const BANK02_PRG_BASE = 0x4010;
function bankToPrg(bankAddr) { return bankAddr - 0x8000 + BANK02_PRG_BASE; }

// 用已知关键地址进一步切分大数据表
// Bank 02 的 Bank Window 地址（$8xxx 范围），使用 bankToPrg 映射到 PRG 偏移
const knownTableAddrs = [
  { addr: bankToPrg(0x806A), name: '806A code→data 隔离区', len: 13 },
  { addr: bankToPrg(0x813C), name: '813C 帧同步后数据', len: 40 },
  { addr: bankToPrg(0x81E8), name: '81E8 IRQ后数据', len: 28 },
  { addr: bankToPrg(0x83DC), name: '83DC 跳转表/调试数据（大段）', len: 172 },
  { addr: bankToPrg(0x84A9), name: '84A9 跳转表辅助数据', len: 18 },
  { addr: bankToPrg(0x8586), name: '8586 初始化后数据', len: 39 },
  { addr: bankToPrg(0x85BD), name: '85BD 场地前数据', len: 35 },
  { addr: bankToPrg(0x8777), name: '8777 场地后小数据', len: 8 },
  { addr: bankToPrg(0x8792), name: '8792 球门/场地相关数据', len: 48 },
  { addr: bankToPrg(0x87FF), name: '87FF 球门/边界相关数据', len: 52 },
  { addr: bankToPrg(0x8902), name: '8902 场地大段数据（含 AA47 前导）', len: 213 },
  { addr: bankToPrg(0x8A24), name: '8A24 AA47 前导段', len: 39 },
  { addr: bankToPrg(0x8A47), name: 'AA47 metatile→tile 展开表', len: 79 },
  { addr: bankToPrg(0x8A9B), name: '8A9B AA97 场地参数/镜头表', len: 82 },
  { addr: bankToPrg(0x8AF3), name: '8AF3 滚动参数表', len: 10 },
  { addr: bankToPrg(0x8B03), name: '8B03 边界表 v1', len: 10 },
  { addr: bankToPrg(0x8B13), name: '8B13 边界表 v2', len: 10 },
  { addr: bankToPrg(0x8B33), name: '8B33 未完全解码数据区', len: 0 },
];

function bankAddrToPrgOffset(bankAddr) {
  return parseInt(bankAddr, 16) - 0x8000 + 0x4000;
}

function findRecordByAddr(addr) {
  return records.find(r => r.addr === addr);
}

const refinedTables = [];
for (const t of dataTables) {
  const cuts = knownTableAddrs.filter(k => k.addr >= t.startAddr && k.addr <= t.endAddr).sort((a, b) => a.addr - b.addr);
  if (cuts.length === 0) {
    refinedTables.push(t);
    continue;
  }
  let cursor = t.startAddr;
  for (const cut of cuts) {
    if (cut.addr > cursor) {
      const startRec = findRecordByAddr(cursor);
      const endRec = findRecordByAddr(cut.addr - 1) || records[records.length - 1];
      refinedTables.push({
        startLine: startRec.line,
        endLine: endRec.line,
        startAddr: cursor,
        endAddr: cut.addr - 1,
        startBankAddr: startRec.bankAddr,
        endBankAddr: endRec.bankAddr,
        length: cut.addr - cursor,
      });
    }
    const cutEnd = cut.len > 0 ? Math.min(cut.addr + cut.len - 1, t.endAddr) : t.endAddr;
    const startRec = findRecordByAddr(cut.addr);
    const endRec = findRecordByAddr(cutEnd) || records[records.length - 1];
    refinedTables.push({
      startLine: startRec.line,
      endLine: endRec.line,
      startAddr: cut.addr,
      endAddr: cutEnd,
      startBankAddr: startRec.bankAddr,
      endBankAddr: endRec.bankAddr,
      length: cutEnd - cut.addr + 1,
      knownName: cut.name,
    });
    cursor = cutEnd + 1;
  }
  if (cursor <= t.endAddr) {
    const startRec = findRecordByAddr(cursor) || records[records.length - 1];
    const endRec = findRecordByAddr(t.endAddr) || records[records.length - 1];
    refinedTables.push({
      startLine: startRec.line,
      endLine: endRec.line,
      startAddr: cursor,
      endAddr: t.endAddr,
      startBankAddr: startRec.bankAddr,
      endBankAddr: endRec.bankAddr,
      length: t.endAddr - cursor + 1,
    });
  }
}
dataTables.length = 0;
dataTables.push(...refinedTables);

// 关键数据表命名
for (const t of dataTables) {
  const key = t.startBankAddr;
  if (t.knownName) t.displayName = `${t.knownName} [$${t.startBankAddr}-$${t.endBankAddr}, ${t.length}B]`;
  else if (knownSubs[key]) t.displayName = `${knownSubs[key]} [$${t.startBankAddr}-$${t.endBankAddr}, ${t.length}B]`;
  else t.displayName = `data_$${t.startBankAddr} [$${t.startBankAddr}-$${t.endBankAddr}, ${t.length}B]`;
}

const result = {
  bankId: 2,
  baseAddr: 0x8000,
  prgOffset: 0x4000,
  stats,
  subroutines,
  dataTables,
  refs: refs.slice(0, 400),
  blocks,
};

const tsContent = '// Auto-generated by analyze_bank02.cjs\n// DO NOT EDIT manually\nconst data = ' + JSON.stringify(result, null, 2) + ';\nexport default data;\n';
fs.writeFileSync(OUT_PATH, tsContent, 'utf8');
console.log('Bank 02 analysis written to', OUT_PATH);

console.log(JSON.stringify(stats, null, 2));
