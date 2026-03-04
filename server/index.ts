import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initDB } from './db.js';
import bookingRoutes from './routes/bookings.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// ── Middlewares ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS permisivo en desarrollo
if (process.env.NODE_ENV !== 'production') {
  app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
}

// ── Rutas API ────────────────────────────────────────────────────────────────
app.use('/api/bookings', bookingRoutes);

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

// ── Servir frontend (solo producción) ───────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  // dist/ está un nivel arriba del directorio server/
  const distPath = path.resolve(__dirname, '../dist');
  app.use(express.static(distPath));
  // SPA fallback
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// ── Arrancar ─────────────────────────────────────────────────────────────────
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      if (process.env.NODE_ENV !== 'production') {
        console.log('   API:      http://localhost:' + PORT + '/api');
        console.log('   Frontend: http://localhost:3000 (Vite dev server)');
      }
    });
  })
  .catch((err) => {
    console.error('Error al inicializar la BD:', err);
    process.exit(1);
  });
