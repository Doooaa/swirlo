import { useCallback, useEffect, useState } from "react";
import PaginationComponent from "../../components/Pagination/PaginationComp";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useNavigate } from "react-router";
import { Box, Container, Typography } from "@mui/material";
import favoritesServices from "../../services/favorites";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useProductsContext } from "../../context/ProductsContext";
import FilterationSideNav from "../../components/FilterationSideNav/FilterationSideNav";
import { filterProducts } from "../../services/productsApi";
import { useCart } from "../../context/CartContext";

export default function Products() {
  const { products, isLoading, isError, error, page, setPage } =
    useProductsContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToCart } = useCart();

  const handleProductClick = (id) => {
    navigate(`/menu-items/${id}`);
  };

  // check user is logged ?
  const user = localStorage.getItem("user");
  // add to cart
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add items to cart");
      return;
    }
    toast.success("item added to cart successfully");
    addToCart(prd._id);
  };

  // Handle Favourites
  const {
    data: { favorites = [] } = {},
    isFetched,
    error: favError,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favoritesServices.fetchAllFavorites(),
  });

  const [favArr, setFavArr] = useState([]);

  useEffect(() => {
    if (isFetched) {
      setFavArr([...favorites.map((item) => item._id)]);
    }
  }, [isFetched, favorites]);

  const { mutateAsync: removeFromFavorites, isPending: isRemoving } =
    useMutation({
      mutationFn: (id) => favoritesServices.removeFromFavorites(id),
      onSuccess: (data) => {
        setFavArr([...data.favorites]);
        queryClient.invalidateQueries(["favorites"]);
        toast.success("Item removed from favorites!");
      },
      onError: (error) => {
        toast.error(`Failed to remove: ${error.message}`);
      },
    });
  const { mutateAsync: addToFavorites, isPending: isAdding } = useMutation({
    mutationFn: (id) => favoritesServices.addToFavorites(id),
    onSuccess: (data) => {
      setFavArr([...data.favorites]);
      queryClient.invalidateQueries(["favorites"]);
      toast.success("Item Added To Your favorites!");
    },
    onError: (error) => {
      toast.error(`Failed to add: ${error.message}`);
    },
  });

  const toggleWishlist = (id) => {
    if (favArr.includes(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  function handlePagination(value) {
    setPage(value);
  }

  // *filteration

  const [filters, setFilters] = useState({
    title: "",
    price: 200,
  });

  const {
    data: {
      data: filteredProducts = [],
      totalPages = 1,
      currentPage: serverCurrentPage = 1,
    } = {},
    isLoading: isFilterLoading,
    isError: isFilterError,
    error: filterError,
  } = useQuery({
    queryKey: ["filterProducts", filters, page],
    queryFn: () => filterProducts(filters, page),
    keepPreviousData: true,
  });

  const handleFilterChange = useCallback((newFilters) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Determine which products to display
  const displayProducts =
    filters.title || filters.price !== 200
      ? filteredProducts
      : products?.data || [];
  const displayTotalPages =
    filters.title || filters.price !== 200
      ? totalPages
      : products?.totalPages || 1;

  if (isError || isFilterError) {
    toast.error(error.response?.data?.message || "Failed to fetch products");
    return (
      <Container fixed>
        <FilterationSideNav onFilterChange={handleFilterChange} />
        {isLoading || isFilterLoading ? (
          <LoadingSpinner />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              textAlign: "center",
              paddingLeft: { md: "290px" },
            }}
          >
            <Typography variant="h6" component="p">
              Error loading products. Please try again.
            </Typography>
          </Box>
        )}
      </Container>
    );
  }

  return (
    <div>
      <FilterationSideNav onFilterChange={handleFilterChange} />
      {isLoading || isFilterLoading ? (
        <LoadingSpinner />
      ) : displayProducts.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            textAlign: "center",
            paddingLeft: { md: "290px" },
          }}
        >
          <Typography variant="h6" component="p">
            No products found matching your criteria.
          </Typography>
        </Box>
      ) : (
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
            {displayProducts?.map((prd) => (
              <ProductCard
                key={prd._id}
                product={{
                  thumbnail: prd.thumbnail,
                  title: prd.title,
                  avgRating: prd.avgRating,
                  price: prd.price,
                  label: prd.label || "no label",
                  _id: prd._id,
                }}
                onAddToCart={handleAddToCart}
                onToggleFavorite={(id) => toggleWishlist(id)}
                onProductClick={handleProductClick}
                sx={{ width: "290px", aspectRatio: "2/3", height: "66%" }}
              />
            ))}
          </Box>
          <PaginationComponent
            currentPage={products.currentPage}
            handlePagination={handlePagination}
            totalPages={displayTotalPages}
          />
        </Box>
      )}
    </div>
  );
}
