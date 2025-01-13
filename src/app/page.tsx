'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await fetch('/api/auth/check');
        const data = await res.json();
        setAuthenticated(data.authenticated);
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to My YouTube App</h1>
      <p className="mb-6">Fetch and display your YouTube playlists and their contents.</p>

      <div className="flex space-x-4">
        {!authenticated && (
          <div className='flex flex-wrap gap-4'>
          <Link href="/api/auth">
            <Button variant="default">Authenticate with Google</Button>
          </Link>
          <Link href="/channel-playlists">
          <Button variant="secondary">Browse Channel Playlists</Button>
        </Link>
        </div>
        )}
        {authenticated && (
          <Link href="/playlists">
            <Button variant="secondary">View Playlists</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;