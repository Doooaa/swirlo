import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../services/cartApi";
import PaginationComponent from "../../components/Pagination/PaginationComp";
export default function Cart() {
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cartItems", page],
    queryFn: () => getCartItems(page),
  });

  function handlePagination(value) {
    setPage(value);
  }
  const handleDecrease = () => {
    // if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    // setQuantity(quantity + 1);
  };
  return (
    <>
      <Stack minHeight={"90vh"} p={{ xs: 1, md: 10 }} gap={2}>
        <Typography variant="h4" sx={{ color: "var(--gold)" }}>
          Shopping Cart
        </Typography>
        {/*Handle cart item with checkout*/}
        <Stack flexDirection={{ xs: "column", lg: "row" }} position={"relative"} top={0}>
          <>
            {isLoading ? (
              <Box sx={{ width: 500 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            ) : (
              <>
                {data?.data.length > 0 ? (
                  <>
                    <Stack gap={2} flexDirection={"column"} flex={1}>
                      <Button variant="outlined" sx={{ textTransform: "none", width: "fit-content", alignSelf: "end" }} color="error">
                        Remove Cart
                      </Button>
                      {data?.data?.map((item) => {
                        return (
                          <Stack>
                            <Stack
                              flexDirection={"row"}
                              key={item?._id}
                              sx={{ borderColor: "rgb(175, 169, 135)" }}
                              maxWidth={"100%"}
                              p={2}
                              borderRadius={2}
                              border={2}
                            >
                              <Stack component="img" borderRadius={2} width={"20%"} src={item?.productId.thumbnail} flex={0.2}></Stack>
                              <Stack pl={2} justifyContent={"center"} flex={1}>
                                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      fontSize: { xs: "1.1rem", sm: "1.3rem" },
                                    }}
                                  >
                                    {item?.productId.title}
                                  </Typography>
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                    border={1}
                                    borderColor={"var(--gold)"}
                                    p={{ xs: 0.5, md: 1 }}
                                    borderRadius={2}
                                  >
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      sx={{
                                        minWidth: 24,
                                        fontSize: "0.75rem",
                                        lineHeight: 1,
                                      }}
                                      onClick={handleDecrease}
                                    >
                                      -
                                    </Button>
                                    <Box minWidth={24} textAlign="center">
                                      {item?.quantity}
                                    </Box>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      sx={{
                                        minWidth: 24,
                                        padding: "2px",
                                        fontSize: "0.75rem",
                                        lineHeight: 1,
                                      }}
                                      onClick={handleIncrease}
                                    >
                                      +
                                    </Button>
                                  </Box>
                                </Stack>
                                <Box
                                  sx={{
                                    background: "var(--custom-gradient)",
                                    height: "3px",
                                    width: { xs: "40%", md: "14rem" },
                                    mb: 2,
                                  }}
                                />
                                <Typography variant="p" mb={1.2} sx={{ color: "var(--primary)" }} fontWeight={"bold"}>
                                  EGP {item?.productId.price}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Stack>
                        );
                      })}
                      <PaginationComponent totalPages={data?.totalPages} currentPage={page} handlePagination={handlePagination}></PaginationComponent>
                    </Stack>
                    <Stack flex={1} position={"sticky"} top={0} borderRadius={2}>
                      <Typography variant="p" fontWeight={"bold"}>
                        Checkout
                      </Typography>
                    </Stack>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        </Stack>
      </Stack>
    </>
  );
}
