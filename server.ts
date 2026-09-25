import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Body parser for JSON payloads up to 50MB (to allow base64 images / presets)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  const DATA_DIR = path.join(__dirname, 'data');
  const DATA_FILE = path.join(DATA_DIR, 'store.json');

  // Ensure data directory exists on disk
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // GET /api/data - Load saved database from disk
  app.get('/api/data', (_req, res) => {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        if (fileContent.trim()) {
          const parsed = JSON.parse(fileContent);
          return res.json(parsed);
        }
      }
      return res.json(null);
    } catch (err) {
      console.error('[Kinetivo Server] Error reading data/store.json:', err);
      return res.status(500).json({ error: 'Failed to read data file' });
    }
  });

  // POST /api/data - Save database to disk (persists across terminal & browser restarts)
  app.post('/api/data', (req, res) => {
    try {
      const payload = req.body;
      if (!payload || typeof payload !== 'object') {
        return res.status(400).json({ error: 'Invalid payload' });
      }

      // Write atomically to data/store.json
      fs.writeFileSync(DATA_FILE, JSON.stringify(payload, null, 2), 'utf-8');
      return res.json({
        success: true,
        message: 'Data successfully saved to disk',
        savedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('[Kinetivo Server] Error saving to data/store.json:', err);
      return res.status(500).json({ error: 'Failed to write data file to disk' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      time: new Date().toISOString(),
      storageFileExists: fs.existsSync(DATA_FILE)
    });
  });

  // In production, serve dist folder
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    // In dev mode, mount Vite middleware into Express
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Kinetivo Lab] Server running on http://localhost:${PORT}`);
  });
}

startServer();
