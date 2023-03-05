const getUrl = (query, latLong, limit) => {
  const newLatLong = latLong.replace(" ", "%2C");
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${newLatLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.four_square_api_key,
    },
  };
  const res = await fetch(
    getUrl("coffee", "36.14488642100172 -115.30504998033449", 6),
    options
  );
  const data = await res.json();
  return data.results;
};
