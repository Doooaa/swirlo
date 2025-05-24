import api from "../utils/apiUrl";

export async function getOrderDetails(id) {
  const response = await api.get(`/orders/${id}`);
  return response.data;
}
