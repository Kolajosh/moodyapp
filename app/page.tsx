import { Home } from '@components/views/Homepage/Homepage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moodboard',
  description: 'Mood',
};


export default function HomePage() {
  return <Home />;
}
