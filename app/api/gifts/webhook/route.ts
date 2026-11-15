import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const url = new URL(req.url);
  const body = await req.json().catch(() => ({}));

  const type = body?.type ?? url.searchParams.get('type') ?? url.searchParams.get('topic');
  const paymentId = body?.data?.id ?? url.searchParams.get('data.id') ?? url.searchParams.get('id');

  if (type !== 'payment' || !paymentId) {
    return NextResponse.json({ ok: true });
  }

  // Confirma o pagamento direto no Mercado Pago (não confia no aviso recebido)
  const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
  });
  if (!res.ok) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  const payment = await res.json();

  if (payment.status === 'approved' && payment.external_reference) {
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    await admin
      .from('gifts')
      .update({
        gifted: true,
        gifted_by: payment.metadata?.buyer_name ?? null,
        gifted_at: new Date().toISOString(),
        payment_id: String(payment.id),
      })
      .eq('id', payment.external_reference)
      .eq('gifted', false);
  }

  return NextResponse.json({ ok: true });
}