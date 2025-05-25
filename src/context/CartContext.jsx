import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";
import { editQuantity, getCartItems, removeCart } from "../services/cartApi";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cartItems", page],
    queryFn: () => getCartItems(page),
  });
  const mutation = useMutation({
    mutationFn: removeCart,
    onSuccess: () => {
      refetch();
    },
  });
  const handleCartRemoval = (id) => {
    mutation.mutate(id);
  };
  const mutationQuantity = useMutation({
    mutationFn: editQuantity,
    onSuccess: () => {
      refetch();
    },
  });
  const handleQuantity = (id, quantity) => {
    if (quantity === 0) {
      mutation.mutate(id);
    } else {
      mutationQuantity.mutate({ id, quantity });
    }
  };
  return (
    <CartContext.Provider
      value={{
        data,
        isLoading,
        refetch,
        handleCartRemoval,
        page,
        setPage,
        handleQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
