'use client';

import { ShiftPage } from '@digital-www-pwa/pages';

export default function Page({ params }: { params: { id: string } }) {
  return <ShiftPage id={params.id} />;
}
