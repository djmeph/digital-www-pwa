export async function GET(request: Request) {
  const response = await fetch('https://2024.lakesoffire.org/events.json');
  const data = await response.json();
  return Response.json({
    events: data.coalesce,
    art: [],
    camps: [],
    radios: [],
    vehicles: [],
    locations: {},
  });
}
