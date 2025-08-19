'use client';

import { CampsItemPage } from '@digital-www-pwa/pages';

export default function Page({ params }: { params: { id: string } }) {
  return <CampsItemPage id={params.id} />;
}
