import type { Metadata } from 'next';
import { ExperiencePage } from '@/components/experience-page';

export const metadata: Metadata = {
  title: 'System Experience · VISTRX AI',
  description: 'Explore live 3D concepts for sensing, identity, spatial content generation and viewpoint tracking.',
};

export default function SystemExperiencePage() {
  return <ExperiencePage kind="system" />;
}
