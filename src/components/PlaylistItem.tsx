import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const PlaylistItem = ({ item }: { item: any }) => (
    <Card className="mb-4">
    <CardHeader>
      <h3 className="text-sm font-semibold">{item.snippet.title}</h3>
    </CardHeader>
    <CardContent>
      <p>{item.snippet.description}</p>
    </CardContent>
  </Card>
);

export default PlaylistItem;
