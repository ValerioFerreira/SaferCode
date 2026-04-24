import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { comentario_id, fingerprint } = req.body;
  if (!comentario_id || !fingerprint) return res.status(400).json({ error: 'Missing fields' });

  try {
    const existing = await pool.query(
      'SELECT id FROM likes_comentarios WHERE comentario_id = $1 AND ip_fingerprint = $2',
      [comentario_id, fingerprint]
    );

    let liked;
    if (existing.rows.length > 0) {
      await pool.query('DELETE FROM likes_comentarios WHERE comentario_id = $1 AND ip_fingerprint = $2', [comentario_id, fingerprint]);
      liked = false;
    } else {
      await pool.query('INSERT INTO likes_comentarios (comentario_id, ip_fingerprint) VALUES ($1, $2)', [comentario_id, fingerprint]);
      liked = true;
    }

    const countResult = await pool.query('SELECT COUNT(*) FROM likes_comentarios WHERE comentario_id = $1', [comentario_id]);
    return res.status(200).json({ liked, total: parseInt(countResult.rows[0].count, 10) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
