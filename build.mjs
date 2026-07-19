// 简易 TS→JS 转换: 剥离类型注解，浏览器可直接运行
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SRC = join(__dirname, 'src/nes/tsubasa');
const OUT = join(__dirname, 'src/nes/tsubasa_js');

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function transform(code) {
  // 1. 去掉多行 interface
  code = code.replace(/export\s+interface\s+\w+\s*\{[\s\S]*?\n\}/g, '');
  // 2. 单行 interface
  code = code.replace(/export\s+interface\s+\w+\s*\{[^}]*\}/g, '');
  // 3. 去掉函数返回类型: ) : Type { 或 ) : Type =>
  code = code.replace(/\)\s*:\s*\w+(\[\])?\s*(\{|=>)/g, ')$2');
  // 4. 去掉行首 let/const/var 变量类型: let x : Type [= ...]
  code = code.replace(/^(\s*\b(?:let|const|var)\s+\w+\s*)\s*:\s*\w+(\[\])?(\s*[=;])/gm, '$1$3');
  // 5. 去掉函数参数类型: (a : Type, b : Type) 但只在函数签名行
  code = code.replace(/(\b(?:function|export\s+function)\s+\w+\s*\([^)]*)\)\s*:\s*\w+(\[\])?/g, (match) => {
    return match.replace(/\)\s*:\s*\w+(\[\])?\s*$/, ')');
  });
  // 6. 去掉函数参数里的类型 (仅作用于函数签名行)
  code = code.replace(/^(\s*(?:export\s+)?(?:async\s+)?function\s+\w+\s*)\(([^)]+)\)/gm, (full, prefix, params) => {
    const cleaned = params.replace(/([,\\(]|^)\s*(\w+)\s*:\s*\w+(\[\])?(\s*=\s*[^,)]+)?(\s*[,\)]|$)/g, '$1$2$5');
    return prefix + '(' + cleaned + ')';
  });
  // 7. 去掉 as 类型断言
  code = code.replace(/\bas\s+const\b/g, '');
  code = code.replace(/\bas\s+\w+(\[\])?\b/g, '');
  // 8. .ts → .js
  code = code.replace(/from\s+['"]([^'"]+)\.ts['"]/g, "from '$1.js'");
  // 9. 去掉泛型
  code = code.replace(/<[A-Z]\w*(\s+extends\s+\w+)?>/g, '');
  // 10. import type → import
  code = code.replace(/\bimport\s+type\s+/g, 'import ');
  return code;
}

function processDir(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const srcPath = join(dir, e.name);
    const rel = relative(SRC, srcPath);
    const outPath = join(OUT, rel);

    if (e.isDirectory()) {
      ensureDir(outPath);
      processDir(srcPath);
    } else if (e.name.endsWith('.ts') && !e.name.endsWith('.d.ts')) {
      const tsCode = readFileSync(srcPath, 'utf8');
      const jsCode = transform(tsCode);
      const jsPath = outPath.replace(/\.ts$/, '.js');
      writeFileSync(jsPath, jsCode);
      console.log(`  TS→JS: ${rel.replace(/\\/g, '/')} → ${relative(OUT, jsPath).replace(/\\/g, '/')}`);
    } else if (!e.name.endsWith('.ts')) {
      ensureDir(dirname(outPath));
      writeFileSync(outPath, readFileSync(srcPath));
    }
  }
}

ensureDir(OUT);
processDir(SRC);
console.log('[build] Done.');
