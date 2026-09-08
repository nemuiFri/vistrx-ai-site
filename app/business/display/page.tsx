import type { Metadata } from 'next';
import { BusinessPage } from '@/components/business-page';

export const metadata: Metadata = {
  title: 'Holographic Display Solutions · VISTRX AI',
  description: 'Transform existing glass gates and transparent surfaces into dynamic holographic media with minimal retrofit.',
};

export default function DisplayBusinessPage() {
  return <BusinessPage kind="display" />;
}
