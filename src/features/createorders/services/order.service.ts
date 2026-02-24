import axios from "axios";

export const calculateGarment = async (
  garmentType: string,
  quantity: number
) => {
  const res = await axios.post("/api/calculate-garment", {
    garmentType,
    quantity,
  });

  return res.data;
};
