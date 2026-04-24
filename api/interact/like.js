import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { post_id, fingerprint } = req.body;
  if (!post_id || !fingerprint) return res.status(400).json({ error: 'Missing fields' });

  try {
    // Check if already liked
    const existing = await pool.query(
      'SELECT id FROM likes_publicacoes WHERE post_id = $1 AND ip_fingerprint = $2',
      [post_id, fingerprint]
    );

    let liked;
    if (existing.rows.length > 0) {
      // Unlike
      await pool.query('DELETE FROM likes_publicacoes WHERE post_id = $1 AND ip_fingerprint = $2', [post_id, fingerprint]);
      liked = false;
    } else {
      // Like
      await pool.query('INSERT INTO likes_publicacoes (post_id, ip_fingerprint) VALUES ($1, $2)', [post_id, fingerprint]);
      liked = true;
    }

    const countResult = await pool.query('SELECT COUNT(*) FROM likes_publicacoes WHERE post_id = $1', [post_id]);
    return res.status(200).json({ liked, total_likes: parseInt(countResult.rows[0].count, 10) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
