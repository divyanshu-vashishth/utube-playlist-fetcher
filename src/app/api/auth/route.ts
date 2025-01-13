import { NextResponse } from 'next/server';
import { getAuthUrl } from '@/lib/googleAuth';

export async function GET() {
  const authUrl = getAuthUrl();
  // console.log('auth url', authUrl);
  return NextResponse.redirect(authUrl);
}
