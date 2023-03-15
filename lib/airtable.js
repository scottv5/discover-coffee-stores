import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.airtable_secret_token,
});

const base = Airtable.base("app5ddObCXA8hSMdm");

const table = base("coffee-stores");

export const getMapedArr = (arr, str) => arr.map((obj) => obj[str]);

export const getCoffeeStore = async (id) => {
  if (!id) return console.error("no id passed in");
  const findCoffeeStore = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();
  if (!findCoffeeStore.length) return null;
  return findCoffeeStore;
};

export default table;
