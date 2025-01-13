'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Alert } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ChannelPlaylistsPage() {
  const [channelId, setChannelId] = useState('');
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelId) {
      setError('Please enter a Channel ID');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/channel-playlists?channelId=${channelId}`);
      if (!res.ok) throw new Error('Failed to fetch playlists');
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setPlaylists(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching playlists');
    } finally {
      setLoading(false);
    }
  };

  const getThumbnailUrl = (thumbnails: any) => {
    if (!thumbnails) return '/api/placeholder/640/360';
    return thumbnails.high?.url || 
           thumbnails.medium?.url || 
           thumbnails.default?.url || 
           '/api/placeholder/640/360';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Channel Playlists</h1>
      
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Enter YouTube Channel ID"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Playlists'}
          </Button>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mt-2">
            {error}
          </Alert>
        )}
      </form>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <Skeleton className="w-full h-48" />
              <CardContent>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <Card key={playlist.playlist.id}>
              <CardHeader className="max-w-sm">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={getThumbnailUrl(playlist.playlist?.snippet?.thumbnails)}
                    alt={playlist.playlist?.snippet?.title || 'Playlist thumbnail'}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                <h2 className="text-lg font-semibold mt-2">
                  {playlist.playlist?.snippet?.title || 'Untitled Playlist'}
                </h2>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                {playlist.items?.map((item: any) => (
                  <div key={item.id} className="mb-4 w-full">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={getThumbnailUrl(item?.snippet?.thumbnails)}
                        alt={item?.snippet?.title || 'Video thumbnail'}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <h3 className="text-sm font-medium mt-2">
                      {item?.snippet?.title || 'Untitled Video'}
                    </h3>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Button variant="outline" onClick={() => router.push('/')}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}