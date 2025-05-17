async function fetchData(dataType: string) {
  const response = await fetch(`https://whatwherewhen.lakesoffire.org/${dataType}.json`);
  const data = await response.json();
  return data.coalesce.coalesce;
}
export async function GET(request: Request) {
  const [
    events,
    camps,
    locations,
    departments,
  ] = await Promise.all([
    fetchData('events'),
    fetchData('camps'),
    fetchData('locations'),
    fetchData('departments'),
  ]);

  return Response.json({
    events,
    art: [],
    camps,
    radios: [],
    vehicles: [],
    locations,
    departments,
  });
}
