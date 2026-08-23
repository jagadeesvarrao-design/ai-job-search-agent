import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Job Search Agent - Aneevarp Solutions',
    short_name: 'AI Job Agent',
    description: 'Autonomous AI multi-agent suite for discovering jobs, tailoring resumes, and mock interview coaching.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
