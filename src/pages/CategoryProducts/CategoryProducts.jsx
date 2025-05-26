import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getProductByCategory } from "../../services/productsApi";

const CategoryProducts = () => {
  const { categoryName } = useParams();

  // 2) Fire off React-Query fetch using that param
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ["productsByCategory", categoryName],
    () => getProductByCategory(categoryName, /* page= */ 1, /* limit= */ 10),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 2,
    }
  );

  if (isLoading) return <p>Loading products for “{categoryName}”…</p>;
  if (isError) return <p>Couldn’t load “{categoryName}” products.</p>;

  return (
    <div>
      <h2>Category: “{categoryName}”</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id} style={{ marginBottom: "1rem" }}>
            <img
              src={p.thumbnail}
              alt={p.title}
              style={{ width: 100, height: 100 }}
            />
            <div>
              <strong>{p.title}</strong>
              <p>{p.description}</p>
              <small>Price: {p.price} EGP</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default CategoryProducts;
