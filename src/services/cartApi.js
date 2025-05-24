import api from "../utils/apiUrl";

export const getCartItems = async (page) => {
  const response = await api.get(`/cart?page=${page}`);
  return response.data;
};
