import table, { getMapedArr, getCoffeeStore } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  const { id, name, address, voteCount, locality, imageUrl } = req.body;

  if (req.method !== "POST")
    return res.status(405).json({ message: "only POST requests are allowed" });

  if (!id)
    return res.status(400).json({ message: "Did not recieve 'id' field" });

  try {
    const coffeeStore = await getCoffeeStore(id);

    if (coffeeStore) {
      const coffeeStoreFields = getMapedArr(coffeeStore, "fields");
      return res.json(coffeeStoreFields);
    }

    if (!name)
      return res.status(400).json({ message: "Did not recieve 'name' field" });

    if (!coffeeStore) {
      const createdCoffeeStore = await table.create([
        {
          fields: {
            id,
            name,
            address: address || "",
            locality: locality || "",
            voteCount,
            imageUrl,
          },
        },
      ]);
      const coffeeStoreFields = getMapedArr(createdCoffeeStore, "fields");
      return res.json(coffeeStoreFields);
    }
  } catch (e) {
    console.error(e);
    console.log("Error creating or finding coffee store");
    return res
      .status(500)
      .json({ message: "Error creating or finding coffee store", error: e });
  }

  return res.status(400).json({ message: "failed to find matching params" });
};

export default createCoffeeStore;
