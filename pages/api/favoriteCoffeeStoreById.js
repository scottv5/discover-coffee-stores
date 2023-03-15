import table, { getMapedArr, getCoffeeStore } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  const { id } = req.query;

  if (req.method !== "PUT")
    return res.status(405).json({ message: "only PUT requests are allowed" });

  if (!id) return res.status(400).json({ message: "Did not recieve 'id'" });

  try {
    const coffeeStore = await getCoffeeStore(id);
    const currVoteCount = coffeeStore[0].fields.voteCount;
    const recordId = getMapedArr(coffeeStore, "id")[0];

    if (coffeeStore) {
      const updatedCoffeeStore = await table.update([
        {
          id: recordId,
          fields: {
            voteCount: parseInt(currVoteCount) + 1,
          },
        },
      ]);

      const updatedCoffeeStoreFields = getMapedArr(
        updatedCoffeeStore,
        "fields"
      );
      return res.json(updatedCoffeeStoreFields);
    }

    if (!coffeeStore) {
      return res.json("failed to find coffee store by id. Id may be invalid");
    }
  } catch (e) {
    console.error(e);
    console.log("Error finding coffee store or updating coffee store");
    return res.status(500).json({
      message: "Error finding coffee store or updating coffee store",
      error: e,
    });
  }

  return res.status(400).json({ message: "failed to find matching params" });
};

export default createCoffeeStore;
