import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = {
  name?: string;
  email?: string;
  message?: string;
  _hp?: string;
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

  if (body._hp && body._hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!body.name || !isValidEmail(body.email) || !body.message) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
  }

  const { RESEND_API_KEY, RESEND_FROM, LEAD_NOTIFY_TO } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM || !LEAD_NOTIFY_TO) {
    return NextResponse.json({ error: 'Mail transport not configured' }, { status: 500 });
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: RESEND_FROM,
      to: [LEAD_NOTIFY_TO],
      replyTo: body.email,
      subject: `[Contact] ${body.name}`,
      text: `From: ${body.name} <${body.email}>\n\n${body.message}`,
    });
    if (error) throw error;
  } catch (e) {
    console.error('[api/contact] send failed', e);
    return NextResponse.json({ error: 'Send failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
