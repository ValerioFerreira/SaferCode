import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM conteudos ORDER BY published_at DESC');
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    const token = req.headers.authorization?.split(' ')[1];
    if (token !== process.env.ADMIN_PASSWORD) {
       return res.status(401).json({ error: 'Unauthorized' });
    }

    const { type, category, title, content, cover_url } = req.body;

    try {
      const { rows } = await pool.query(
        'INSERT INTO conteudos (type, category, title, content, cover_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [type, category, title, content, cover_url]
      );
      return res.status(201).json(rows[0]);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
