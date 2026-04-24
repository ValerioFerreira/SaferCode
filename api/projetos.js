import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  const queryId = req.query?.id;

  if (req.method === 'GET') {
    try {
      if (queryId) {
        const { rows } = await pool.query('SELECT * FROM projetos WHERE id = $1', [queryId]);
        if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
        return res.status(200).json(rows[0]);
      }
      const { rows } = await pool.query('SELECT * FROM projetos ORDER BY created_at DESC');
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (token !== process.env.ADMIN_PASSWORD) {
     return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { cover, sector, client, title, problem, solution, tags } = req.body;
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

  if (req.method === 'PUT') {
    const { id, cover, sector, client, title, problem, solution, tags } = req.body;
    const tagsArray = Array.isArray(tags) ? tags : String(tags).split(',').map(s => s.trim()).filter(Boolean);

    try {
      const { rows } = await pool.query(
        'UPDATE projetos SET cover=$1, sector=$2, client=$3, title=$4, problem=$5, solution=$6, tags=$7 WHERE id=$8 RETURNING *',
        [cover, sector, client, title, problem, solution, tagsArray, id]
      );
      return res.status(200).json(rows[0]);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM projetos WHERE id=$1', [queryId]);
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
