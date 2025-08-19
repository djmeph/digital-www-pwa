'use client';

import { EventsItemPage } from '@digital-www-pwa/pages';

export default function Page({ params }: { params: { id: string } }) {
  return <EventsItemPage id={params.id} />;
}
