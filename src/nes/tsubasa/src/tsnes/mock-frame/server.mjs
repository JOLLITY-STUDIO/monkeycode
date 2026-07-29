/**
 * 簡易靜態伺服器 — Mock Frame Viewer
 * 用法: node mock-frame/server.mjs
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const MIME = {
  '.html':'text/html; charset=utf-8',
  '.css':'text/css; charset=utf-8',
  '.js':'application/javascript; charset=utf-8',
  '.mjs':'application/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8',
  '.bmp':'image/bmp',
  '.bin':'application/octet-stream',
};

const PORT = 3001;

createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = resolve(__dirname, urlPath.replace(/^\//, ''));

  // 防止路徑遍歷
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  if (!existsSync(filePath)) {
    res.writeHead(404);
    return res.end('Not found: ' + urlPath);
  }

  const ext = extname(filePath).toLowerCase();
  const data = readFileSync(filePath);
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
  });
  res.end(data);
}).listen(PORT, () => {
  console.log(`\n  🖼️  Mock Frame Viewer  →  http://localhost:${PORT}\n`);
  console.log('  拖放 .bmp 檔案到畫布上即可查看幀緩存。\n');
});
