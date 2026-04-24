import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function buildTree(comments) {
  const map = {};
  const roots = [];

  comments.forEach(c => {
    map[c.id] = { ...c, replies: [] };
  });

  comments.forEach(c => {
    if (c.parent_id && map[c.parent_id]) {
      map[c.parent_id].replies.push(map[c.id]);
    } else {
      roots.push(map[c.id]);
    }
  });

  return roots;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).end('Method Not Allowed');

  const { post_id, fingerprint } = req.query;
  if (!post_id) return res.status(400).json({ error: 'post_id is required' });

  try {
    // Likes count
    const likesResult = await pool.query(
      'SELECT COUNT(*) FROM likes_publicacoes WHERE post_id = $1',
      [post_id]
    );
    const total_likes = parseInt(likesResult.rows[0].count, 10);

    // Did current user like?
    let user_liked = false;
    if (fingerprint) {
      const userLike = await pool.query(
        'SELECT id FROM likes_publicacoes WHERE post_id = $1 AND ip_fingerprint = $2',
        [post_id, fingerprint]
      );
      user_liked = userLike.rows.length > 0;
    }

    // Comments (flat, sorted oldest first)
    const commentsResult = await pool.query(
      `SELECT c.id, c.post_id, c.parent_id, c.autor_nome, c.texto, c.created_at,
              COUNT(lc.id)::int AS likes_count
       FROM comentarios c
       LEFT JOIN likes_comentarios lc ON lc.comentario_id = c.id
       WHERE c.post_id = $1
       GROUP BY c.id
       ORDER BY c.created_at ASC`,
      [post_id]
    );

    // Attach user_liked for comments
    let commentLikedSet = new Set();
    if (fingerprint) {
      const cLiked = await pool.query(
        `SELECT lc.comentario_id FROM likes_comentarios lc
         JOIN comentarios c ON c.id = lc.comentario_id
         WHERE c.post_id = $1 AND lc.ip_fingerprint = $2`,
        [post_id, fingerprint]
      );
      cLiked.rows.forEach(r => commentLikedSet.add(r.comentario_id));
    }

    const commentsWithLike = commentsResult.rows.map(c => ({
      ...c,
      user_liked: commentLikedSet.has(c.id),
    }));

    const comments = buildTree(commentsWithLike);

    return res.status(200).json({ total_likes, user_liked, comments });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
