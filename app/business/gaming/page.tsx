import type { Metadata } from 'next';
import { BusinessPage } from '@/components/business-page';

export const metadata: Metadata = {
  title: 'Open-Air Holographic Gaming · VISTRX AI',
  description: 'Explore VISTRX AI’s mission to build medium-free, wearable-free holographic games for direct interaction in open air.',
};

export default function GamingBusinessPage() {
  return <BusinessPage kind="gaming" />;
}
