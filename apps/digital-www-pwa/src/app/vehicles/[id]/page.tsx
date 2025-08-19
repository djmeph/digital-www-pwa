'use client';

import { VehiclesItemPage } from '@digital-www-pwa/pages';

export default function Page({ params }: { params: { id: string } }) {
  return <VehiclesItemPage id={params.id} />;
}
