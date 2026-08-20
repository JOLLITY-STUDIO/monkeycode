// 扫描所有 .write()/.read() 键名，找出非 ram_XXXX(4位大写十六进制) 格式的语义键
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'src', 'game');
const SKIP_DIRS = new Set(['node_modules', 'output']);

const RAM_RE = /^ram_[0-9A-F]{4}$/;

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      if (!SKIP_DIRS.has(ent.name)) walk(path.join(dir, ent.name), out);
    } else if (ent.name.endsWith('.ts')) {
      out.push(path.join(dir, ent.name));
    }
  }
  return out;
}

const files = walk(ROOT);
const stats = new Map(); // key -> {count, files:Set}
const formatStats = new Map(); // 格式类别统计

for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  // 捕获 write/read 的字符串参数（含模板串常量部分）
  const re = /\.(?:write|read)\(\s*`([^`]*\$\{[^`]*\}[^`]*)`\s*,/g;
  const re2 = /\.(?:write|read)\(\s*'([^']+)'\s*,/g;
  const re3 = /\.(?:write|read)\(\s*"([^"]+)"\s*,/g;
  const seen = new Set();
  let m;
  while ((m = re.exec(src))) add(m[1], f, true, seen);
  while ((m = re2.exec(src))) add(m[1], f, false, seen);
  while ((m = re3.exec(src))) add(m[1], f, false, seen);
}

function add(key, file, isTemplate, seen) {
  // 去掉模板字符串里的 ${...} 看纯字面量
  const literal = key.replace(/\$\{[^}]*\}/g, '#');
  const sig = file + '::' + key;
  if (seen.has(sig)) return;
  seen.add(sig);
  if (stats.has(key)) stats.get(key).files.add(path.relative(ROOT, file));
  else stats.set(key, { count: 0, files: new Set([path.relative(ROOT, file)]) });
  stats.get(key).count++;
  // 格式分类
  let cat;
  if (RAM_RE.test(literal)) cat = 'OK:ram_XXXX';
  else if (/^ram_[0-9A-Fa-f]+$/.test(literal)) cat = 'LOWERCASE-NO-PAD:ram_xx';
  else if (literal.includes('#')) cat = 'TEMPLATE:' + literal;
  else cat = 'SEMANTIC:' + literal;
  if (!formatStats.has(cat)) formatStats.set(cat, 0);
  formatStats.set(cat, formatStats.get(cat) + 1);
}

console.log('=== 键名格式类别统计 ===');
for (const [cat, n] of [...formatStats.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`${String(n).padStart(4)}  ${cat}`);
}

console.log('\n=== 非标准格式键（含使用文件）===');
for (const [key, st] of [...stats.entries()].sort()) {
  const literal = key.replace(/\$\{[^}]*\}/g, '#');
  if (RAM_RE.test(literal)) continue;
  console.log(`\n[${st.count}] ${key}`);
  for (const f of st.files) console.log(`    ${f}`);
}
