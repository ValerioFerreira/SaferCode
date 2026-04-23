import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM projetos ORDER BY created_at DESC');
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

    const { cover, sector, client, title, problem, solution, tags } = req.body;
    
    // tags can be an array of strings or comma separated. let's ensure it's an array for Postgres TEXT[]
    const tagsArray = Array.isArray(tags) ? tags : String(tags).split(',').map(s => s.trim()).filter(Boolean);

    try {
      const { rows } = await pool.query(
        'INSERT INTO projetos (cover, sector, client, title, problem, solution, tags) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [cover, sector, client, title, problem, solution, tagsArray]
      );
      return res.status(201).json(rows[0]);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
