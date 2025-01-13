import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { youtubeService, setAuthToken } from '@/lib/googleAuth';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');

  if (!accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    setAuthToken(accessToken.value);
    
    const response = await youtubeService.playlists.list({
      part: ['snippet', 'contentDetails'],
      mine: true,
      maxResults: 50
    });

    const playlists = await Promise.all(
      response.data.items?.map(async (playlist: any) => {
        const items = await youtubeService.playlistItems.list({
          part: ['snippet'],
          playlistId: playlist.id,
          maxResults: 50
        });

        return {
          playlist,
          items: items.data.items
        };
      }) || []
    );

    return NextResponse.json(playlists);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json({ error: 'Failed to fetch playlists' }, { status: 500 });
  }
}