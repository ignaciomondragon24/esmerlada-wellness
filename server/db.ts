import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});

export async function initDB(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(255)  NOT NULL,
      email       VARCHAR(255)  NOT NULL,
      phone       VARCHAR(100)  NOT NULL,
      day         VARCHAR(50)   NOT NULL,
      hour        VARCHAR(10)   NOT NULL,
      teacher     VARCHAR(100)  NOT NULL,
      level       VARCHAR(10)   NOT NULL,
      created_at  TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log('✓ Base de datos inicializada');
}
