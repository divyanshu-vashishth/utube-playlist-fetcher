import { google } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

export const getChannelPlaylists = async (channelId: string) => {
  try {
    const response = await youtube.playlists.list({
      part: ['snippet', 'contentDetails'],
      channelId: channelId,
      maxResults: 50
    });

    const playlists = await Promise.all(
      response.data.items?.map(async (playlist: any) => {
        const items = await youtube.playlistItems.list({
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

    return playlists;
  } catch (error) {
    console.error('Error fetching channel playlists:', error);
    throw error;
  }
};