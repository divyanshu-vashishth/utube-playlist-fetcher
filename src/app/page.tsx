import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to My YouTube App</h1>
      <p className="mb-6">Fetch and display your YouTube playlists and their contents.</p>
      <div className="flex space-x-4">
        <Link href="/api/auth">
            Authenticate with Google
        </Link>
        <Link href="/playlists" >
            View Playlists
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
