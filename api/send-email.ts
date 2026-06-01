import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, service, message } = req.body;

    // Basic validation
    if (!name || (!phone && !email) || !message) {
      return res.status(400).json({
        error: 'Missing required fields. Please provide name, phone or email, and message.',
      });
    }

    // Build the email body
    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0a1628; padding: 24px 32px;">
          <h1 style="color: #c9a84c; margin: 0; font-size: 20px; letter-spacing: 0.04em;">
            Texas AC Plus — New Contact Form Submission
          </h1>
        </div>
        <div style="padding: 32px; background: #f8f8f6; border: 1px solid #e5e5e5;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: 700; color: #0a1628; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #333;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: 700; color: #0a1628; vertical-align: top;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #333;">${phone ? escapeHtml(phone) : '<em style="color:#999;">Not provided</em>'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: 700; color: #0a1628; vertical-align: top;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #333;">${email ? `<a href="mailto:${escapeHtml(email)}" style="color: #b71c1c;">${escapeHtml(email)}</a>` : '<em style="color:#999;">Not provided</em>'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: 700; color: #0a1628; vertical-align: top;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #333;">${service ? escapeHtml(service) : '<em style="color:#999;">Not specified</em>'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: 700; color: #0a1628; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #333; white-space: pre-wrap;">${escapeHtml(message)}</td>
            </tr>
          </table>
        </div>
        <div style="padding: 16px 32px; background: #0a1628; text-align: center;">
          <p style="color: #666; font-size: 12px; margin: 0;">
            Sent from the Texas AC Plus website contact form
          </p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Texas AC Plus <hello@texasacplus.com>',
      to: ['arnold@texasacplus.com'],
      replyTo: email || undefined,
      subject: `New Contact: ${escapeHtml(name)} — ${service || 'General Inquiry'}`,
      html: htmlBody,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

/** Prevent XSS in email HTML */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
