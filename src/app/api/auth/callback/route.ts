import { NextResponse } from 'next/server';
import { getTokens } from '@/lib/googleAuth';

import { cookies } from 'next/headers'
import { saveTokensToDB } from '@/utils/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  
  if (!code) {
    const baseUrl = new URL(req.url).origin;
    return NextResponse.redirect(`${baseUrl}/?error=No+code+provided`);
  }

  try {
    const tokens = await getTokens(code);
    await saveTokensToDB(tokens);
    
    const baseUrl = new URL(req.url).origin;
    const response = NextResponse.redirect(`${baseUrl}/playlists`);
    if (tokens.access_token) {
      // Set cookies with proper configuration
      response.cookies.set('access_token', tokens.access_token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 3600 // 1 hour
      });
    }
    
    return NextResponse.redirect(new URL(req.url).origin);
  } catch (error) {
    console.error('Error:', error);
    const baseUrl = new URL(req.url).origin;
    return NextResponse.redirect(`${baseUrl}/?error=Authentication+failed`);
  }
}