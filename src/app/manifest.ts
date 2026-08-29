import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ZenScout AI - Aneevarp Solutions',
    short_name: 'ZenScout AI',
    description: 'Autonomous AI multi-agent suite for discovering jobs, tailoring resumes, and mock interview coaching by Aneevarp Solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FCFAF5',
    theme_color: '#476550',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
