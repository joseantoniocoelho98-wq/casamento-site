import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const giftId = body.giftId;
  const buyerName = typeof body.buyerName === 'string' ? body.buyerName.trim().slice(0, 80) : '';

  if (typeof giftId !== 'string' || buyerName.length < 2) {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // O valor vem sempre do banco, nunca do navegador
  const { data: gift } = await admin.from('gifts').select('*').eq('id', giftId).single();
  if (!gift) {
    return NextResponse.json({ error: 'Presente não encontrado.' }, { status: 404 });
  }
  if (gift.gifted) {
    return NextResponse.json({ error: 'Este presente já foi dado.' }, { status: 409 });
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL!;

  const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      items: [
        {
          id: gift.id,
          title: `Presente: ${gift.name}`,
          quantity: 1,
          unit_price: Number(gift.price),
          currency_id: 'BRL',
        },
      ],
      external_reference: gift.id,
      metadata: { buyer_name: buyerName },
      payment_methods: { installments: 12 },
      back_urls: {
        success: `${site}/?presente=ok#presentes`,
        pending: `${site}/?presente=pendente#presentes`,
        failure: `${site}/#presentes`,
      },
      auto_return: 'approved',
      notification_url: `${site}/api/gifts/webhook`,
      statement_descriptor: 'CASAMENTO',
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.init_point) {
    return NextResponse.json({ error: 'Não foi possível iniciar o pagamento.' }, { status: 500 });
  }

  return NextResponse.json({ url: data.init_point });
}