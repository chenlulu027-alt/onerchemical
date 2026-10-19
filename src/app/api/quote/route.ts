import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = {
  name?: string;
  company?: string;
  email?: string;
  country?: string;
  message?: string;
  productSlug?: string;
  topic?: string;
  _hp?: string; // honeypot
};

function isValidEmail(s: unknown): s is string {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot: silent 200
  if (body._hp && body._hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!body.name || !body.company || !isValidEmail(body.email) || !body.country || !body.message) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
  }

  const { RESEND_API_KEY, RESEND_FROM, LEAD_NOTIFY_TO } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM || !LEAD_NOTIFY_TO) {
    console.error('[api/quote] Resend env not configured');
    return NextResponse.json(
      { error: 'Mail transport not configured' },
      { status: 500 },
    );
  }

  const resend = new Resend(RESEND_API_KEY);

  const subject = `[Quote] ${body.company} — ${body.productSlug ?? body.topic ?? 'general'}`;
  const text = [
    `New quote request`,
    ``,
    `Name:     ${body.name}`,
    `Company:  ${body.company}`,
    `Email:    ${body.email}`,
    `Country:  ${body.country}`,
    `Product:  ${body.productSlug ?? '(none)'}`,
    `Topic:    ${body.topic ?? '(none)'}`,
    ``,
    `Message:`,
    body.message,
  ].join('\n');

  try {
    const { error } = await resend.emails.send({
      from: RESEND_FROM,
      to: [LEAD_NOTIFY_TO],
      replyTo: body.email,
      subject,
      text,
    });
    if (error) throw error;
  } catch (e) {
    console.error('[api/quote] send failed', e);
    return NextResponse.json({ error: 'Send failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
