import { NextResponse } from 'next/server';
import { getTokens } from '@/lib/googleAuth';
import { saveTokensToDB, savePlaylistsToDB } from '@/utils/db';
import { cookies } from 'next/headers'

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cookieStore = await cookies()
  const code = url.searchParams.get('code');
  if (!code) {
    return NextResponse.redirect('/?error=No+code+provided');
  }

  try {
    const tokens = await getTokens(code);
    await saveTokensToDB(tokens);
    if(tokens.access_token){
        cookieStore.set('access_token', tokens.access_token, { path: '/' });
    }


    return NextResponse.redirect(new URL('/playlists',req.url))
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.redirect('/?error=Authentication+failed');
  }
}
