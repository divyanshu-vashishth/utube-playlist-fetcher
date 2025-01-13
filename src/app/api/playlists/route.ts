import { youtubeService } from '@/lib/googleAuth';

export async function GET() {
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

  return new Response(JSON.stringify(playlistItems));
}
