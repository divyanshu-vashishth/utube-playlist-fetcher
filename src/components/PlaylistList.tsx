import React from 'react';
import PlaylistItem from './PlaylistItem';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PlaylistList = ({ playlists }: { playlists: any[] }) => {
  return (
    <div className="space-y-4">
    {playlists.map((p) => (
      <Card key={p.playlist.id} className="bg-white shadow-md">
        <CardHeader>
          <h2 className="text-lg font-semibold">{p.playlist.snippet.title}</h2>
        </CardHeader>
        <CardContent>
          {p.items.map((item: any) => (
            <PlaylistItem key={item.id} item={item} />
          ))}
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            View More
          </Button>
        </CardFooter>
      </Card>
    ))}
  </div>
  );
};

export default PlaylistList;
