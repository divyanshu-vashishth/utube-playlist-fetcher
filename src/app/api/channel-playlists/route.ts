import { getChannelPlaylists } from "@/lib/youtubeChannel";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const channelId = searchParams.get('channelId');
  
    if (!channelId) {
      return NextResponse.json({ error: 'Channel ID is required' }, { status: 400 });
    }
  
    try {
      const playlists = await getChannelPlaylists(channelId);
      return NextResponse.json(playlists);
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to fetch channel playlists' }, 
        { status: 500 }
      );
    }
  }