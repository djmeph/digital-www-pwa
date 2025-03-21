export async function GET(request: Request) {
  const eventsResponse = await fetch(
    'https://2024.lakesoffire.org/events.json',
  );
  const eventsData = await eventsResponse.json();
  const wwwResponse = await fetch(
    'https://2024.lakesoffire.org/digital-www.json',
  );
  const wwwData = await wwwResponse.json();

  return Response.json({
    events: eventsData.coalesce,
    art: wwwData.art,
    camps: wwwData.camps,
    radios: wwwData.radio,
    vehicles: wwwData.vehicles,
    locations: {},
  });
}
