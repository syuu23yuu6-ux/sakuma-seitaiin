async function run() {
  const serviceId = 'en9nxdldc0';
  const apiKey = '3IFnM98Y9zf3aZGG6dIAGACrReaPuaJHi53e';

  const url = `https://${serviceId}.microcms-management.io/api/v1/custom-fields`;

  const response = await fetch(url, {
    headers: {
      'X-MICROCMS-API-KEY': apiKey
    }
  });

  if (!response.ok) {
    console.error('Failed to fetch:', response.status, await response.text());
    return;
  }

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

run();
