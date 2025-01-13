import React from 'react';
import PlaylistItem from './PlaylistItem';

const PlaylistList = ({ playlists }: { playlists: any[] }) => {
  return (
    <div>
      {playlists.map((p) => (
        <div key={p.playlist.id}>
          <h2>{p.playlist.snippet.title}</h2>
          {p.items.map((item: any) => (
            <PlaylistItem key={item.id} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;
