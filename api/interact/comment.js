import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { post_id, parent_id, autor_nome, texto } = req.body;
  if (!post_id || !autor_nome?.trim() || !texto?.trim()) {
    return res.status(400).json({ error: 'Missing required fields: post_id, autor_nome, texto' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO comentarios (post_id, parent_id, autor_nome, texto)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [post_id, parent_id || null, autor_nome.trim(), texto.trim()]
    );
    return res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
