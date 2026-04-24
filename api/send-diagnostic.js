import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { nome, email, telefone, descricao } = req.body;

  if (!nome?.trim() || !email?.trim() || !telefone?.trim() || !descricao?.trim()) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
      <h2 style="color: #0d47a1; border-bottom: 2px solid #eee; padding-bottom: 12px;">
        📋 Nova Solicitação de Diagnóstico Presencial
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 8px; font-weight: bold; width: 160px; color: #555;">Nome / Empresa</td>
          <td style="padding: 8px;">${nome.trim()}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold; color: #555;">E-mail</td>
          <td style="padding: 8px;"><a href="mailto:${email.trim()}" style="color: #0d47a1;">${email.trim()}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #555;">Telefone / WhatsApp</td>
          <td style="padding: 8px;">${telefone.trim()}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold; color: #555; vertical-align: top;">Descrição</td>
          <td style="padding: 8px; white-space: pre-wrap;">${descricao.trim()}</td>
        </tr>
      </table>
      <p style="margin-top: 24px; font-size: 12px; color: #888;">
        Enviado automaticamente pela plataforma SaferCode · ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Recife' })}
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"SaferCode - Diagnóstico" <${process.env.SMTP_USER}>`,
      to: 'contato@safercode.com.br',
      replyTo: email.trim(),
      subject: `Solicitação de Diagnóstico Presencial - ${nome.trim()}`,
      html,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Falha ao enviar e-mail. Tente novamente.' });
  }
}
