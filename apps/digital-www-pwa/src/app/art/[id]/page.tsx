'use client';

import { ArtItemPage } from '@digital-www-pwa/pages';

export default function Page({ params }: { params: { id: string } }) {
  return <ArtItemPage id={params.id}></ArtItemPage>;
}
