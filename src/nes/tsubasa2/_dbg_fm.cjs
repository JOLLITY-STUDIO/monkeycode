const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '.codebuddy', 'agents', 'bank30翻译工程师.md');
const txt = fs.readFileSync(p, 'utf8');
console.log('file exists:', fs.existsSync(p));
console.log('length:', txt.length);
console.log('first 200 chars JSON:', JSON.stringify(txt.slice(0, 200)));
const fmMatch = txt.match(/^---\n([\s\S]*?)\n---/);
console.log('fmMatch:', JSON.stringify(fmMatch ? fmMatch[1] : null));
