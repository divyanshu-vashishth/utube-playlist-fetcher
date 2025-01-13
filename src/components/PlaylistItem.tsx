import React from 'react';

const PlaylistItem = ({ item }: { item: any }) => (
  <div>
    <h3>{item.snippet.title}</h3>
    <p>{item.snippet.description}</p>
  </div>
);

export default PlaylistItem;
