import { getMapedArr, getCoffeeStore } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  if (!id) return res.status(400).json({ message: "id value is missing" });

  try {
    const coffeeStore = await getCoffeeStore(id);

    if (!coffeeStore) {
      return res
        .status(400)
        .json({ message: "id did not return an existing coffee store" });
    }

    const coffeeStoreFields = getMapedArr(coffeeStore, "fields")[0];

    res.status(200).json(coffeeStoreFields);
  } catch (e) {
    console.log({ e });
    res.status(500).json({ message: "something went wrong" });
  }
};

export default getCoffeeStoreById;
