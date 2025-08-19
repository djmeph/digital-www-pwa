'use client';

import { RadioItemPage } from '@digital-www-pwa/pages';

export default function Page({ params }: { params: { id: string } }) {
  return <RadioItemPage id={params.id} />;
}
