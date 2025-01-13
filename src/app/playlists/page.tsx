'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { usePathname, useRouter } from 'next/navigation';
import { Alert } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import Image from 'next/image';


export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
        const checkAuthAndFetchPlaylists = async () => {
          try {
            setLoading(true);
            // First check authentication
            const authCheck = await fetch('/api/auth/check');
            const authData = await authCheck.json();
    
            if (!authData.authenticated) {
              router.push('/');
              return;
            }
    
            // Then fetch playlists
            const res = await fetch('/api/playlists');
            if (!res.ok) throw new Error('Failed to fetch playlists');
            
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            
            setPlaylists(data);
          } catch (err: any) {
            setError(err.message || 'An error occurred while fetching playlists');
            if (err.message.includes('Not authenticated')) {
              router.push('/');
            }
          } finally {
            setLoading(false);
          }
        };
    
        checkAuthAndFetchPlaylists();
  }, [router]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your YouTube Playlists</h1>
      {error && <Alert variant="destructive">{error}</Alert>}
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
              <CardHeader >
                <AspectRatio ratio={16 / 9}>
                  <img
                  
                    src={playlist.playlist.snippet.thumbnails.high.url}
                    alt={playlist.playlist.snippet.title}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                <h2 className="text-lg font-semibold mt-2">{playlist.playlist.snippet.title}</h2>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {playlist.items.map((item: any) => (
                  <div key={item.id} className="mb-4">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={item.snippet.thumbnails.high.url}
                        alt={item.snippet.title}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <h3 className="text-sm font-medium mt-2">{item.snippet.title}</h3>
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
