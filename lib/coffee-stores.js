import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_unsplash_access_key,
});

const getUrl = (query, latLong, limit) => {
  const newLatLong = latLong.replace(",", "%2C");
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${newLatLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async (
  latLong = "40.71867137372016,-74.0025816586648",
  limit = 6
) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_four_square_api_key,
    },
  };
  const res = await fetch(getUrl("coffee", latLong, limit), options);

  const coffeeStoreData = await res.json();

  const photosData = await unsplash.search.getPhotos({
    query: "coffee shop",
    perPage: 30,
    orientation: "squarish",
  });

  const photosDataArr = photosData.response.results.map((entry) => entry.urls);

  return coffeeStoreData.results.map((coffeeShop, i) => {
    const image = photosDataArr[i].regular;
    const {
      fsq_id,
      name,
      location: { address, locality },
    } = coffeeShop;
    return {
      id: fsq_id,
      image,
      name,
      address,
      locality,
    };
  });
};
