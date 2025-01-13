'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const HomePage = () => {


  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Welcome to My YouTube App</h1>
    <p className="mb-6">Fetch and display your YouTube playlists and their contents.</p>

    <div className="flex space-x-4">
      <Link href="/api/auth" >
        <Button variant="default">Authenticate with Google</Button>
      </Link>
      {/* <Link href="/playlists" >
        <Button variant="secondary">View Playlists</Button>
      </Link> */}
    </div>
  </div>
  );
};

export default HomePage;
