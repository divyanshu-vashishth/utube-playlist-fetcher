import { youtubeService } from '@/lib/googleAuth';
import { savePlaylistsToDB } from '@/utils/db';

export async function GET() {
  try{
  const playlists = await youtubeService.playlists.list({
    part: ['snippet'],
    mine: true,
  });

  const playlistItems = await Promise.all(
    playlists.data.items?.map(async (playlist) => {
      const items = await youtubeService.playlistItems.list({
        part: ['snippet'],
        playlistId: playlist.id!,
      });
      return { playlist, items: items.data.items };
    }) || []
  );
  await savePlaylistsToDB(playlistItems);
  return new Response(JSON.stringify(playlistItems));
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch channel playlists' }, 
      { status: 500 }
    );
  }
}
