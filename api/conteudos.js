import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  const queryId = req.query?.id;

  if (req.method === 'GET') {
    try {
      if (queryId) {
        const { rows } = await pool.query('SELECT * FROM conteudos WHERE id = $1', [queryId]);
        if (rows.length === 0) return res.status(404).json({ error: 'Post não encontrado' });
        return res.status(200).json(rows[0]);
      }
      const { rows } = await pool.query('SELECT * FROM conteudos ORDER BY published_at DESC');
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Auth check for mutation
  const token = req.headers.authorization?.split(' ')[1];
  if (token !== process.env.ADMIN_PASSWORD) {
     return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
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

  if (req.method === 'PUT') {
    const { id, type, category, title, content, cover_url } = req.body;
    try {
      const { rows } = await pool.query(
        'UPDATE conteudos SET type=$1, category=$2, title=$3, content=$4, cover_url=$5 WHERE id=$6 RETURNING *',
        [type, category, title, content, cover_url, id]
      );
      return res.status(200).json(rows[0]);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM conteudos WHERE id=$1', [queryId]);
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
