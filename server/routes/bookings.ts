import { Router, Request, Response } from 'express';
import { pool } from '../db.js';

const router = Router();

// POST /api/bookings — crear reserva
router.post('/', async (req: Request, res: Response) => {
  const { name, email, phone, day, hour, teacher, level } = req.body;

  if (!name || !email || !phone || !day || !hour || !teacher || !level) {
    res.status(400).json({ error: 'Datos incompletos' });
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO bookings (name, email, phone, day, hour, teacher, level)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, created_at`,
      [name, email, phone, day, hour, teacher, level],
    );
    res.status(201).json({ ok: true, booking: result.rows[0] });
  } catch (err) {
    console.error('[bookings] Error al guardar:', err);
    res.status(500).json({ error: 'Error interno al guardar la reserva' });
  }
});

// GET /api/bookings — listar todas (uso interno/admin)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM bookings ORDER BY created_at DESC',
    );
    res.json(result.rows);
  } catch (err) {
    console.error('[bookings] Error al listar:', err);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
});

export default router;
