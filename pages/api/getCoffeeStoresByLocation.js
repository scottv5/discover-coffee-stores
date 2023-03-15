import { fetchCoffeeStores } from "../../lib/coffee-stores.js";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;

    const data = await fetchCoffeeStores(latLong, limit);

    res.status(200).json(data);
  } catch (e) {
    console.log("there is an error", e);
    res.status(500).json({ message: "there wan an err", err });
  }
};

export default getCoffeeStoresByLocation;
