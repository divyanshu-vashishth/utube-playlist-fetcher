# YouTube Playlist Manager

A Next.js application that allows users to manage their YouTube playlists and browse public channel playlists. Built with Next.js 15,Shadn,Supabase, Prisma TypeScript, and Tailwind CSS.

## Features

- **Personal Playlists**: View and manage your YouTube playlists
- **Channel Playlists**: Browse playlists from any YouTube channel using Channel ID
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS


## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/                    # API routes
│   │   │   ├── auth/              # Authentication endpoints
│   │   │   └── playlists/         # Playlist endpoints
│   │   ├── channel-playlists/     # Channel playlists page
│   │   ├── playlists/            # User playlists page
│   │   └── page.tsx              # Home page
│   ├── components/               # UI components
│   ├── lib/                     # Utility functions
│   │   ├── googleAuth.ts        # Google OAuth setup
│   │   └── youtubePublicApi.ts  # YouTube API functions
│   └── utils/                   # Helper functions
└── middleware.ts                # NextJS middleware
```

update .env file with .env.example values

## Features


```bash
pnpm install
pnpm db:generate
pnpm db:push
pnpm run dev
```

