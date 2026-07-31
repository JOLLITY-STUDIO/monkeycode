/**
 * 从 bank-26-code.ts 提取所有内联数据数组，
 * 并生成完整的 import + 引用替换方案
 */
const fs = require('fs');
const path = require('path');

const codePath = path.resolve(__dirname, 'game-engine/native-game/tsubasa/banks/prg/bank-26-code.ts');
const dataPath = path.resolve(__dirname, 'game-engine/native-game/tsubasa/banks/prg/bank-26-data.ts');

const codeContent = fs.readFileSync(codePath, 'utf8');
const codeLines = codeContent.split('\n');

// 提取所有 LUT_/TABLE_/DATA_ 内联数组
function extractArrays(lines) {
  const arrays = [];
  let i = 0;
  while (i < lines.length) {
    const match = lines[i].match(/(?:const|let|var)\s+(LUT_\w+|TABLE_\w+|DATA_\w+)\s*(?::\s*(?:readonly\s+)?number\[\])?\s*=\s*\[/);
    if (match) {
      const name = match[1];
      const start = i;
      let bracketDepth = 0;
      let j = i;
      let content = '';
      for (; j < lines.length; j++) {
        const line = lines[j];
        content += line + '\n';
        for (const ch of line) {
          if (ch === '[') bracketDepth++;
          if (ch === ']') bracketDepth--;
        }
        if (bracketDepth === 0) break;
      }
      arrays.push({
        name,
        lineStart: start + 1, // 1-based
        lineEnd: j + 1,
        content: content.trim(),
        rawLines: lines.slice(start, j + 1)
      });
      i = j + 1;
    } else {
      i++;
    }
  }
  return arrays;
}

// 解析数组内容为纯值列表
function parseArrayValues(content) {
  // Extract all hex/decimal numbers from the array definition
  const numMatch = content.match(/\[([\s\S]*?)\]/);
  if (!numMatch) return [];
  const inner = numMatch[1];
  const values = [];
  const hexRegex = /0x[0-9a-fA-F]+/g;
  let m;
  while ((m = hexRegex.exec(inner)) !== null) {
    values.push(m[0]);
  }
  return values;
}

// 查找数组中每个数组的引用位置
function findReferences(lines, arrayName) {
  const refs = [];
  lines.forEach((line, idx) => {
    // 跳过自身定义行
    const pattern = new RegExp('\\b' + arrayName + '\\b');
    if (pattern.test(line) && !line.match(/(?:const|let|var)\s+/ + arrayName.replace('$', '\\$'))) {
      refs.push({ line: idx + 1, content: line.trim() });
    }
  });
  return refs;
}

const arrays = extractArrays(codeLines);

console.log('找到的内联数据数组:');
console.log('================');
let totalBytes = 0;
for (const arr of arrays) {
  const values = parseArrayValues(arr.content);
  totalBytes += values.length;
  console.log(`  ${arr.name}: ${arr.lineStart}-${arr.lineEnd} (${values.length} bytes)`);
  const refs = findReferences(codeLines, arr.name);
  console.log(`    引用: ${refs.length} 处`);
  if (refs.length > 0) {
    refs.forEach(r => console.log(`      L${r.line}: ${r.content.substring(0, 80)}`));
  }
}
console.log(`\n总计: ${arrays.length} 个数组, ${totalBytes} bytes`);

// 检查重复名称
const nameCount = {};
for (const arr of arrays) {
  nameCount[arr.name] = (nameCount[arr.name] || 0) + 1;
}
const dupes = Object.entries(nameCount).filter(([,c]) => c > 1);
if (dupes.length > 0) {
  console.log('\n重复名称:');
  dupes.forEach(([n, c]) => console.log(`  ${n}: ${c} 次`));
}

// 生成 data 文件新增内容
console.log('\n\n需要在 bank-26-data.ts 中新增的导出:');
console.log('==================================');
for (const arr of arrays) {
  console.log(`\n/** ${arr.name} — ${parseArrayValues(arr.content).length} bytes */`);
  console.log(`export const ${arr.name}: readonly number[] = ${parseArrayValues(arr.content).join(', ')};`);
  console.log('//');
}
