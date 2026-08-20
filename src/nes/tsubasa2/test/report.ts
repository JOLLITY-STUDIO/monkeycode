// @ts-nocheck
/**
 * 测试报告生成器
 *
 * 汇总所有测试结果，按套件分组，统计通过率，
 * 并列出已知 bug（含代码审查发现的问题）。
 */

import { getResults, type TestResult } from './test-suite';
import { getShots } from './utils';
import { log } from './utils';

export interface KnownBug {
  id: string;
  severity: 'Critical' | 'Major' | 'Minor';
  title: string;
  file: string;
  line?: string;
  description: string;
  expected: string;
  actual: string;
  reproducible: string;
}

/**
 * 已知 bug 清单（来自代码审查 + 测试发现）
 * 这些 bug 在测试前通过代码静态分析已确认，测试运行进一步验证。
 */
export const KNOWN_BUGS: KnownBug[] = [
  {
    id: 'BUG-001',
    severity: 'Critical',
    title: 'Tsubasa2.ts 跨目录引用外部 rom-data，违反"独立无外部依赖"原则',
    file: 'src/core/Tsubasa2.ts',
    line: '39-58',
    description:
      'tsubasa2-h5-src 被设计为独立、无外部依赖的 src，但 Tsubasa2.ts 第 39-58 行 ' +
      'import 了 ../../../rom-data/chr-bank-00~15 与 ../../../rom-data/prg-bank-15/12，' +
      '路径跳出 tsubasa2-h5-src 目录，引用了上级 tsnes/rom-data。' +
      '其中 CHR Bank 数据在内部 src/data/tile/chr/chr-bank-00~15.ts 已有完全等价的副本（同样导出 CHR_BANK_XX: readonly number[]），' +
      '内部 src/data/audio/bgm/ 也已有完整 43 条 SID 轨道（Bank 12-15）。',
    expected: '所有 import 路径限定在 tsubasa2-h5-src/src 内部，不依赖外部目录',
    actual: 'CHR Bank + PRG Bank 15/12 共 18 个 import 指向 ../../../rom-data/',
    reproducible: '将 tsubasa2-h5-src 单独复制到其他位置，无法编译/运行（找不到 ../../../rom-data/）',
  },
  {
    id: 'BUG-002',
    severity: 'Critical',
    title: '[已修复] OamManager.writeSlot/writeByte 越界索引导致 TypeError 崩溃',
    file: 'src/data/OamManager.ts',
    line: 'writeSlot 100-107, writeByte 110-119, setPos 163-168, setBank 171-174, _ensure 199-223',
    description:
      'OamManager._ensure 对越界索引 (index<0 或 index>=64) 仅打印 console.warn 后直接 return，' +
      '但 writeSlot/writeByte/setPos/setBank 在 _ensure 返回后继续执行 this._shadow[index] / this._entries[index]，' +
      '对越界 index 返回 undefined，随后赋值抛出 "Cannot set properties of undefined" TypeError。' +
      '修复方案: _ensure 改为返回 boolean, 4 个写入方法检查返回值后 early return。' +
      '注：palette 范围已正确处理 (slot.attr & 0x03)。',
    expected: '越界写入应安全忽略 (_ensure 返回 false 时 early return)',
    actual: '已修复 — _ensure 返回 boolean, writeSlot/writeByte/setPos/setBank 检查后 early return',
    reproducible: '修复后: new OamManager().writeSlot(128, 0, 0, 0) 安全忽略，console.warn 提示',
  },
  {
    id: 'BUG-003',
    severity: 'Major',
    title: 'scene_opening.controller 中字符串拼接存在潜在 NaN',
    file: 'src/game/scene_opening.controller.ts',
    line: '显示状态计算',
    description:
      '开场控制器在计算显示文本时，若某些数值字段为 undefined，字符串拼接会产生 "undefined" 字样，' +
      '而非预期的数字。属于数据初始化时序问题。',
    expected: '所有数值字段在拼接前有默认值 0',
    actual: '部分字段可能为 undefined，拼接出 "undefined"',
    reproducible: '在 BOOT 阶段极早期帧观察显示状态',
  },
  {
    id: 'BUG-004',
    severity: 'Minor',
    title: 'tsconfig.check.json include 范围超出 tsubasa2-h5-src',
    file: 'tsconfig.check.json',
    line: 'include',
    description:
      'tsconfig.check.json 的 include 包含 "../rom-data/**/*.ts"，使类型检查依赖外部目录，' +
      '与"独立无外部依赖"原则不符，且会拖慢编译。',
    expected: 'include 仅包含 src/**/*.ts',
    actual: 'include 含 ../rom-data/**/*.ts',
    reproducible: '查看 tsconfig.check.json',
  },
  {
    id: 'BUG-005',
    severity: 'Major',
    title: '10+ 个 Bank 服务文件跨目录引用外部 rom-data/prg-bank-XX',
    file: 'src/game/bank16_skills.service.ts, bank11_match-turn.service.ts, bank22_hybrid.service.ts, bank20_match-aux.service.ts, bank19_auxiliary.service.ts, src/data/bank25-data.ts, bank24-tables.ts, bank28-tables.ts, bank26-tables.ts',
    line: 'import 语句',
    description:
      '除 Tsubasa2.ts 外，还有至少 8 个 Bank 服务/数据文件通过 "../../../rom-data/prg-bank-XX" 引用外部 PRG Bank 原始字节。' +
      '这是系统性的外部依赖问题，涉及 bank11/16/19/20/22/24/25/26/28/31 共 10 个 PRG Bank。' +
      'rom-data 目录下还同时存在 .ts 和 .js 同名文件，.js 文件缺少 export default 导致模块解析歧义。',
    expected: '所有 PRG Bank 数据应内联到 tsubasa2-h5-src/src/data/ 内部',
    actual: '10 个文件引用 ../../../rom-data/prg-bank-XX',
    reproducible: 'grep -rn "rom-data/prg" src/ 可见全部引用点',
  },
  {
    id: 'BUG-006',
    severity: 'Minor',
    title: 'DataStore.write 静默截断为 8 位，API 语义不直观',
    file: 'src/data/DataStore.ts',
    line: '209-211',
    description:
      'DataStore.write(key, value) 会执行 value & 0xFF 截断为 8 位（NES 硬件兼容），' +
      '但方法签名声明 value: number 无范围约束，开发者易误传入 >255 的值导致静默数据丢失。' +
      'read(key) 不存在的键返回 0（非 undefined），缺少 remove 方法。',
    expected: 'write 应有文档说明 8 位截断行为，或提供 write8/write16 明确语义',
    actual: 'write 静默截断，read 返回 0，无 remove',
    reproducible: 'store.write("k", 12345); store.read("k") 返回 57 而非 12345',
  },
];

/** 生成报告 HTML 并写入报告面板 */
export function generateReport(): void {
  const results = getResults();
  const shots = getShots();

  const suites = new Map<string, TestResult[]>();
  for (const r of results) {
    if (!suites.has(r.suite)) suites.set(r.suite, []);
    suites.get(r.suite)!.push(r);
  }

  const totalPass = results.filter((r) => r.pass).length;
  const totalFail = results.filter((r) => !r.pass).length;
  const total = results.length;
  const passRate = total > 0 ? ((totalPass / total) * 100).toFixed(1) : '0.0';

  const ts = new Date().toLocaleString('zh-CN');

  let html = `
<h2>天使之翼2 H5 引擎 — 测试报告</h2>
<p style="color:#8b949e">生成时间: ${ts}</p>

<h3>一、测试摘要</h3>
<table>
<tr><th>指标</th><th>值</th></tr>
<tr><td>测试用例总数</td><td>${total}</td></tr>
<tr><td>通过</td><td class="sev-Pass">${totalPass}</td></tr>
<tr><td>失败</td><td class="sev-Critical">${totalFail}</td></tr>
<tr><td>通过率</td><td><b>${passRate}%</b></td></tr>
<tr><td>截图数量</td><td>${shots.length}</td></tr>
<tr><td>已知 Bug</td><td>${KNOWN_BUGS.length} (${KNOWN_BUGS.filter(b => b.severity === 'Critical').length} Critical)</td></tr>
</table>
`;

  // 套件明细
  html += '<h3>二、测试套件明细</h3>';
  for (const [suite, items] of suites) {
    const sp = items.filter((r) => r.pass).length;
    const sf = items.length - sp;
    html += `<h3 style="color:#d29922">${suite} (${sp} 通过 / ${sf} 失败)</h3>`;
    html += '<table><tr><th>结果</th><th>用例</th><th>详情</th></tr>';
    for (const r of items) {
      html += `<tr><td class="sev-${r.pass ? 'Pass' : 'Critical'}">${r.pass ? 'PASS' : 'FAIL'}</td><td>${r.name}</td><td>${r.detail || ''}</td></tr>`;
    }
    html += '</table>';
  }

  // 已知 Bug
  html += '<h3>三、已知 Bug（代码审查 + 测试发现）</h3>';
  html += '<table><tr><th>ID</th><th>严重等级</th><th>标题</th><th>文件</th><th>描述</th></tr>';
  for (const b of KNOWN_BUGS) {
    html += `<tr>
      <td>${b.id}</td>
      <td class="sev-${b.severity}">${b.severity}</td>
      <td>${b.title}</td>
      <td>${b.file}${b.line ? ':' + b.line : ''}</td>
      <td>${b.description}</td>
    </tr>`;
  }
  html += '</table>';

  // Bug 详情
  html += '<h3>四、Bug 详情与复现步骤</h3>';
  for (const b of KNOWN_BUGS) {
    html += `<h3 class="sev-${b.severity}">${b.id} [${b.severity}] ${b.title}</h3>`;
    html += `<table>
      <tr><th>文件</th><td>${b.file}${b.line ? ' #L' + b.line : ''}</td></tr>
      <tr><th>描述</th><td>${b.description}</td></tr>
      <tr><th>期望行为</th><td>${b.expected}</td></tr>
      <tr><th>实际行为</th><td>${b.actual}</td></tr>
      <tr><th>复现方式</th><td>${b.reproducible}</td></tr>
    </table>`;
  }

  // 截图清单
  html += '<h3>五、截图证据</h3>';
  if (shots.length === 0) {
    html += '<p style="color:#8b949e">无截图</p>';
  } else {
    html += '<table><tr><th>#</th><th>名称</th><th>时间</th></tr>';
    shots.forEach((s, i) => {
      html += `<tr><td>${i + 1}</td><td>${s.name}</td><td>${s.ts}</td></tr>`;
    });
    html += '</table>';
  }

  const pane = document.getElementById('reportPane');
  if (pane) pane.innerHTML = html;
  log(`报告已生成: ${total} 用例, 通过率 ${passRate}%, ${KNOWN_BUGS.length} 已知Bug`, 'step');
}

/** 导出报告为 Markdown 文本文件下载 */
export function exportReportMarkdown(): void {
  const results = getResults();
  const shots = getShots();
  const totalPass = results.filter((r) => r.pass).length;
  const totalFail = results.filter((r) => !r.pass).length;
  const total = results.length;
  const passRate = total > 0 ? ((totalPass / total) * 100).toFixed(1) : '0.0';
  const ts = new Date().toLocaleString('zh-CN');

  let md = `# 天使之翼2 H5 引擎 — 测试报告\n\n`;
  md += `生成时间: ${ts}\n\n`;
  md += `## 一、测试摘要\n\n`;
  md += `| 指标 | 值 |\n|---|---|\n`;
  md += `| 测试用例总数 | ${total} |\n| 通过 | ${totalPass} |\n| 失败 | ${totalFail} |\n| 通过率 | ${passRate}% |\n`;
  md += `| 截图数量 | ${shots.length} |\n| 已知 Bug | ${KNOWN_BUGS.length} |\n\n`;

  md += `## 二、测试用例明细\n\n`;
  const suites = new Map<string, TestResult[]>();
  for (const r of results) {
    if (!suites.has(r.suite)) suites.set(r.suite, []);
    suites.get(r.suite)!.push(r);
  }
  for (const [suite, items] of suites) {
    md += `### ${suite}\n\n| 结果 | 用例 | 详情 |\n|---|---|---|\n`;
    for (const r of items) {
      md += `| ${r.pass ? 'PASS' : 'FAIL'} | ${r.name} | ${r.detail || ''} |\n`;
    }
    md += '\n';
  }

  md += `## 三、已知 Bug\n\n`;
  for (const b of KNOWN_BUGS) {
    md += `### ${b.id} [${b.severity}] ${b.title}\n\n`;
    md += `- **文件**: ${b.file}${b.line ? '#L' + b.line : ''}\n`;
    md += `- **描述**: ${b.description}\n`;
    md += `- **期望**: ${b.expected}\n`;
    md += `- **实际**: ${b.actual}\n`;
    md += `- **复现**: ${b.reproducible}\n\n`;
  }

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tsubasa2-h5-test-report-${Date.now()}.md`;
  a.click();
  URL.revokeObjectURL(url);
  log('报告已导出为 Markdown 文件', 'pass');
}
