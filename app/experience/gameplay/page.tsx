import type { Metadata } from 'next';
import { ExperiencePage } from '@/components/experience-page';

export const metadata: Metadata = {
  title: 'Combat Experience · VISTRX AI',
  description: 'Explore live 3D gameplay concepts for dodging, flanking and gesture-driven attacks.',
};

export default function GameplayExperiencePage() {
  return <ExperiencePage kind="gameplay" />;
}
