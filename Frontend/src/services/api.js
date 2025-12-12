const BASE_URL = "https://hotelbediax-orcd.onrender.com/api";

export async function getDestinations({ page = 1, limit = 10, q = "", country = "", city = "" } = {}) {
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);

  if (q) params.append("q", q);
  if (country) params.append("country", country);
  if (city) params.append("city", city);

  const res = await fetch(`${BASE_URL}/destinations?${params.toString()}`);
  return res.json();
}

export async function createDestination(data) {
  const res = await fetch(`${BASE_URL}/destinations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
export async function deleteDestination(id) {
  const res = await fetch(`${BASE_URL}/destinations/${id}`, {
    method: "DELETE"
  });
  return res.json();
}

export async function updateDestination(id, data) {
  const res = await fetch(`${BASE_URL}/destinations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}