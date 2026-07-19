// 静态服务器 + TS 即时编译 (esbuild)
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { transformSync } from 'esbuild';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = 5173;

createServer(async (req, res) => {
  let path = req.url.split('?')[0];
  if (path === '/') path = '/src/nes/tsubasa/disasm/banks/bank_runner.html';

  let resolvedFile = join(__dirname, path);
  let resolvedExt = extname(resolvedFile).toLowerCase();

  // Resolve extensionless imports → append .ts (even if a same-named dir exists)
  if (!resolvedExt) {
    const tsFile = resolvedFile + '.ts';
    if (existsSync(tsFile)) {
      resolvedFile = tsFile;
      resolvedExt = '.ts';
    }
  }

  // Reject directories (only if not already resolved to .ts)
  if (resolvedExt !== '.ts') {
    const stat = existsSync(resolvedFile) ? statSync(resolvedFile) : null;
    if (!stat || stat.isDirectory()) { res.writeHead(404); res.end('404'); return; }
  }

  try {
    // Handle .ts → transpile to JS on the fly
    if (resolvedExt === '.ts') {
      const code = await readFile(resolvedFile, 'utf-8');
      // Skip sourcemap for huge files (>512KB) to avoid OOM
      const huge = code.length > 512 * 1024;
      const result = transformSync(code, { loader: 'ts', format: 'esm', sourcemap: huge ? false : 'inline' });
      res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
      res.end(result.code);
      return;
    }
    const data = readFileSync(resolvedFile);
    const contentType = {
      '.html': 'text/html; charset=utf-8',
      '.js':   'application/javascript; charset=utf-8',
      '.mjs':  'application/javascript; charset=utf-8',
      '.css':  'text/css; charset=utf-8',
      '.png':  'image/png',
      '.jpg':  'image/jpeg',
      '.nes':  'application/octet-stream',
      '.json': 'application/json',
      '.txt':  'text/plain',
    }[resolvedExt] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
    res.end(data);
  } catch (e) { console.error(path, e.message); res.writeHead(500); res.end('500'); }
}).listen(PORT, () => {
  console.log('[serve] http://localhost:' + PORT + '/src/nes/tsubasa/disasm/banks/bank_runner.html');
});
