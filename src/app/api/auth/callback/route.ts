import { NextResponse } from 'next/server';
import { getTokens } from '@/lib/googleAuth';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

  const tokens = await getTokens(code);
  return NextResponse.json({ tokens });
}
