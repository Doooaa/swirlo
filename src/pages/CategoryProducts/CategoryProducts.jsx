import React from "react";
import { useProductsContext } from "../../context/ProductsContext";
import { useParams } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";

const CategoryProducts = () => {
 const { category } = useParams();
  const { getProductCategry, setPage, page, limit } = useProductsContext();
  
  const { 
    data: productsCategory, 
    isError, 
    error, 
    isLoading 
  } = getProductCategry(category, page, limit);
  
  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    toast.error(`Error: ${error.message}`);
    return null;
  }

  return (
    <div>
      <Box sx={{ paddingLeft: { md: "290px" } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
            marginY: 4,
          }}
        >
          {productsCategory?.data?.map((product) => (
            <ProductCard
              key={product._id}
              product={{
                thumbnail: product.thumbnail,
                title: product.title,
                avgRating: product.avgRating,
                price: product.price,
                label: product.label || "no label",
                _id: product._id,
              }}
              onAddToCart={() =>console.log("dd")}
              onToggleFavorite={() => console.log("dd")}
              onProductClick={() => console.log("dd")}
              sx={{ width: "290px", aspectRatio: "2/3", height: "66%" }}
            />
          ))}
        </Box>
        <PaginationComponent
          currentPage={page}
          handlePagination={setPage}
          totalPages={productsCategory?.totalPages || 1}
        />
      </Box>
    </div>
  );
};

export default CategoryProducts;