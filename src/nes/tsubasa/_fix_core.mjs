import { readFileSync, writeFileSync } from 'fs';

const root = 'd:/studio/github/monkeycode/src/nes/tsubasa';
const src = root + '/tools/6502-to-js-test/_prg_output/core.cjs';
const dst = root + '/pages/tsubasaFromCore/core.js';

let c = readFileSync(src, 'utf8');

// 1. 强制 Web 环境 (ENVIRONMENT_IS_NODE=false 走不到 Node block)
c = c.replace(
  'var ENVIRONMENT_IS_WEB=!!globalThis.window;var ENVIRONMENT_IS_WORKER=!!globalThis.WorkerGlobalScope;var ENVIRONMENT_IS_NODE=globalThis.process?.versions?.node&&globalThis.process?.type!="renderer";',
  'var ENVIRONMENT_IS_WEB=true;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;'
);

// 2. 去掉 require("node:fs") — 小程序的静态分析器看到就拒绝
c = c.replace('var fs=require("node:fs");', 'var fs=null;');

// 3. 尾部挂 Module
c = c.replace(/[\r\n]+$/, '');
c += '\nglobalThis.__coreModule=Module;\n';

// 4. 断长行
const lines = c.split(/\r?\n/);
const idx4 = lines.findIndex(l => l.length > 10000);
if (idx4 >= 0) {
  lines[idx4] = lines[idx4].replace(/:case /g, ':\ncase ');
  lines[idx4] = lines[idx4].replace(/;(?=[a-zA-Z{])/g, ';\n');
}

writeFileSync(dst, lines.join('\n'));

const final = readFileSync(dst, 'utf8').split('\n');
const lens = final.map(l => l.length);
console.log('Lines:', final.length, 'Max:', Math.max(...lens), 'Avg:', Math.round(lens.reduce((a,b)=>a+b,0)/final.length));
const re = final.join('\n').match(/require\(/g);
console.log('require() calls:', re ? re.length : 0);

// 验证前几行
console.log('First 200:', final.join('\n').slice(0,200));
