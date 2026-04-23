export default function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body;
    // Uses Vercel standard environment variable validation
    if (password && password === process.env.ADMIN_PASSWORD) {
       // Using the password string itself as the simplified token for MVP
       return res.status(200).json({ token: process.env.ADMIN_PASSWORD });
    }
    return res.status(401).json({ error: 'Senha incorreta ou acesso negado' });
  }
  
  res.setHeader('Allow', ['POST']);
  res.status(405).end('Method Not Allowed');
}
