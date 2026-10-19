import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Lead-magnet gated download. Caller posts { email, asset }, gets back
 * a signed URL to a PDF under /public/downloads. Phase 0: unsigned —
 * returns the public path directly. Harden with signed URLs when
 * conversion volume warrants it.
 */

type Body = {
  email?: string;
  name?: string;
  company?: string;
  asset?: string; // slug of the downloadable, e.g. "iso-11930-cheatsheet"
  _hp?: string;
};

const ASSETS: Record<string, { filename: string; label: string }> = {
  // 'iso-11930-cheatsheet': { filename: 'iso-11930-cheatsheet.pdf', label: 'ISO 11930 cheatsheet' },
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

  if (!isValidEmail(body.email) || !body.asset) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
  }

  const asset = ASSETS[body.asset];
  if (!asset) {
    return NextResponse.json({ error: 'Unknown asset' }, { status: 404 });
  }

  const { RESEND_API_KEY, RESEND_FROM, LEAD_NOTIFY_TO } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM || !LEAD_NOTIFY_TO) {
    return NextResponse.json({ error: 'Mail transport not configured' }, { status: 500 });
  }

  const resend = new Resend(RESEND_API_KEY);

  // notify internally
  try {
    await resend.emails.send({
      from: RESEND_FROM,
      to: [LEAD_NOTIFY_TO],
      subject: `[Lead magnet] ${asset.label} → ${body.email}`,
      text: `New download:\n\nAsset: ${asset.label}\nEmail: ${body.email}\nName: ${body.name ?? '(none)'}\nCompany: ${body.company ?? '(none)'}`,
    });
  } catch (e) {
    console.error('[api/lead-magnet] internal notify failed', e);
  }

  return NextResponse.json({
    ok: true,
    downloadUrl: `/downloads/${asset.filename}`,
  });
}
