'use client'
import React, { useEffect, useState } from 'react';
import PlaylistList from '@/components/PlaylistList';

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await fetch('/api/playlists');
      const data = await res.json();
      setPlaylists(data);
    };

    fetchPlaylists();
  }, []);

  return (
    <div>
      <h1>Your YouTube Playlists</h1>
      <PlaylistList playlists={playlists} />
    </div>
  );
};

export default PlaylistsPage;
