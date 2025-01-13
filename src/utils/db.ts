import { prisma} from './prisma';

export async function saveTokensToDB(tokens: any) {
  await prisma.authToken.upsert({
    where: { id: 1 },
    update: {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiryDate: new Date(tokens.expiry_date),
    },
    create: {
      id: 1,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiryDate: new Date(tokens.expiry_date),
    },
  });
}

export async function savePlaylistsToDB(playlists: any) {
  for (const playlist of playlists) {
    await prisma.playlist.upsert({
      where: { id: playlist.playlist.id },
      update: {
        title: playlist.playlist.snippet.title,
        description: playlist.playlist.snippet.description,
        thumbnail: playlist.playlist.snippet.thumbnails.high.url,
        channelId: playlist.playlist.snippet.channelId,
        channelTitle: playlist.playlist.snippet.channelTitle,
      },
      create: {
        id: playlist.playlist.id,
        title: playlist.playlist.snippet.title,
        description: playlist.playlist.snippet.description,
        thumbnail: playlist.playlist.snippet.thumbnails.high.url,
        channelId: playlist.playlist.snippet.channelId,
        channelTitle: playlist.playlist.snippet.channelTitle,
      },
    });

    for (const item of playlist.items) {
      await prisma.playlistItem.upsert({
        where: { id: item.id },
        update: {
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high.url,
          videoId: item.snippet.resourceId.videoId,
        },
        create: {
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high.url,
          videoId: item.snippet.resourceId.videoId,
          playlistId: playlist.playlist.id,
        },
      });
    }
  }
}
