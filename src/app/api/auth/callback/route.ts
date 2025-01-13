import { NextResponse } from 'next/server';
import { getTokens } from '@/lib/googleAuth';
import { saveTokensToDB, savePlaylistsToDB } from '@/utils/db';


export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  if (!code) {
    return NextResponse.redirect('/?error=No+code+provided');
  }

  try {
    const tokens = await getTokens(code);
    await saveTokensToDB(tokens);



    return NextResponse.redirect(new URL('/playlists',req.url))
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.redirect('/?error=Authentication+failed');
  }
}
