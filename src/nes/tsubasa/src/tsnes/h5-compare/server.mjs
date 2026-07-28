/**
 * 简易 Node.js 开发服务器 — 双引擎对比
 * 用法: node server.mjs
 * 自动将 .ts 请求转为 .js (通过 esbuild transform)
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const MIME = {
  '.html':'text/html; charset=utf-8',
  '.css':'text/css; charset=utf-8',
  '.js':'application/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8',
  '.png':'image/png',
  '.jpg':'image/jpeg',
  '.svg':'image/svg+xml',
};

// 懒加载 esbuild
let esbuildTransform = null;
async function getEsbuild() {
  if (!esbuildTransform) {
    esbuildTransform = (await import('esbuild')).transform;
  }
  return esbuildTransform;
}

const PORT = 3000;

createServer(async (req, res) => {
  let urlPath = req.url.split('?')[0];
  // / 和 /h5-compare 都 302 跳到 /h5-compare/，保证浏览器相对路径正确
  if (urlPath === '/' || urlPath === '/h5-compare') {
    res.writeHead(302, { Location: '/h5-compare/' });
    return res.end();
  }
  if (urlPath === '/h5-compare/') urlPath = '/h5-compare/index.html';

  const ext = extname(urlPath).toLowerCase();
  const filePath = resolve(ROOT, urlPath.replace(/^\//, ''));

  // 安全检查: 不越出项目根
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  // TS → JS: 请求 /foo/bar.js → 读取 /foo/bar.ts 并转译
  if (ext === '.ts' || (ext === '.js' && !existsSync(filePath)) || (ext === '' && existsSync(filePath + '.ts'))) {
    const tsPath = existsSync(filePath.replace(/\.js$/, '.ts'))
      ? filePath.replace(/\.js$/, '.ts')
      : (ext === '' ? filePath + '.ts' : filePath);
    if (!tsPath.endsWith('.ts') || !existsSync(tsPath)) {
      res.writeHead(404);
      return res.end('Not found');
    }
    try {
      const src = readFileSync(tsPath, 'utf-8');
      const { transform } = await getEsbuild();
      const result = await transform(src, {
        loader: 'ts',
        target: 'es2020',
        format: 'esm',
        sourcefile: urlPath,
      });
      res.writeHead(200, { 'Content-Type': MIME['.js'] });
      return res.end(result.code);
    } catch (e) {
      console.error('TS transform error on:', urlPath, e.message);
      res.writeHead(500);
      return res.end('Transform error: ' + e.message);
    }
  }

  // 静态文件 (含原生 .js 文件如 node_modules)
  if (!existsSync(filePath)) {
    res.writeHead(404);
    return res.end('Not found');
  }

  const data = readFileSync(filePath);
  const mime = MIME[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': mime });
  res.end(data);
}).listen(PORT, () => {
  console.log(`\n  🎮 Tsubasa 双引擎对比  →  http://localhost:${PORT}\n`);
});
