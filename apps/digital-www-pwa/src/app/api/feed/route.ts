import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { ART, RADIO, VEHICLES } from './www-data';

async function fetchData(dataType: string) {
  const response = await fetch(
    `https://whatwherewhen.lakesoffire.org/${dataType}.json`,
    { next: { revalidate: 3600 } }
  );
  const data = await response.json();
  return data.coalesce.coalesce;
}
export async function GET(): Promise<Response> {
  const [events, camps, locations, departments] = await Promise.all([
    fetchData('events'),
    fetchData('camps'),
    fetchData('locations'),
    fetchData('departments'),
  ]);

  return NextResponse.json({
    events,
    art: ART,
    camps,
    radios: RADIO,
    vehicles: VEHICLES,
    locations,
    departments,
  });
}
