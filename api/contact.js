const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, project, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  if (name.length > 100 || message.length > 5000) {
    return res.status(400).json({ error: 'Input exceeds allowed length.' });
  }

  try {
    await resend.emails.send({
      from: 'contact@solsticeillumina.com',
      to: 'celinavetsch15@outlook.com',
      replyTo: email,
      subject: `New message from ${escHtml(name)}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
          <h2 style="color:#6b3fa0">New message from ${escHtml(name)}</h2>
          <p><strong>Email:</strong> <a href="mailto:${escHtml(email)}">${escHtml(email)}</a></p>
          <p><strong>Project type:</strong> ${escHtml(project) || '—'}</p>
          <hr style="border:none;border-top:1px solid #e0d6ff;margin:1rem 0">
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${escHtml(message)}</p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
};
