import { defineConfig } from 'vite';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { resolve } from 'path';

const OUTPUT_DIR = 'output';

function savePlugin() {
  return {
    name: 'save-assets',
    configureServer(server) {
      server.middlewares.use('/api/save-png', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
        let body = '';
        req.on('data', (chunk) => body += chunk);
        req.on('end', async () => {
          try {
            const { name, data } = JSON.parse(body);
            const buf = Buffer.from(data, 'base64');
            await mkdir(join(process.cwd(), OUTPUT_DIR), { recursive: true });
            const filepath = join(process.cwd(), OUTPUT_DIR, name);
            await writeFile(filepath, buf);
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true, path: filepath }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ ok: false, error: e.message }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [savePlugin()],
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        l2: resolve(__dirname, 'src/langrisser2/index.html'),
      },
    },
  },
  server: {
    allowedHosts: ['.monkeycode-ai.online'],
  },
});
