import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  createTheme,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "../../services/orderApi";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function OrderConfirmation() {
  let { id } = useParams();
  let navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderDetails(id),
  });

  const options = { year: "numeric", month: "long", day: "numeric" };
  const themeC = createTheme({
    palette: {
      primary: {
        main: "#4b2a19",
      },
    },
  });
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  let totalBeforeDiscount = 0;
  let discountAmount = 0;
  function calculateSubtotal() {
    //the actual price of price
    let subtotal = data.data.orderItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    //adding shipping
    totalBeforeDiscount = subtotal + 50;
    //if there is a discount so it will return > 0
    discountAmount = totalBeforeDiscount - data.data.totalPrice;
    let discountPercentage =
      totalBeforeDiscount > 0
        ? Math.round((discountAmount / totalBeforeDiscount) * 100)
        : 0;
    return discountPercentage;
  }
  let percentage = calculateSubtotal();
  return (
    <>
      <Stack
        minHeight={"90vh"}
        px={{ xs: 4, md: 10 }}
        pt={4}
        gap={3}
        width={{ xs: "100%", md: "75%" }}
        mx={"auto"}
        sx={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        <Typography
          variant="h4"
          fontSize={{ xs: "1.5rem", md: "2rem" }}
          sx={{ color: "var(--gold)" }}
        >
          Order Confirmation
        </Typography>
        <Stack gap={1} bgcolor={"var(--light-bg)"} p={3} borderRadius={2}>
          <Typography
            variant="h6"
            fontSize={{ xs: "1.1rem", md: "1.5rem" }}
            mb={1}
            color="success"
          >
            Your Order is placed successfully
          </Typography>
          <Typography variant="p" sx={{ color: "var(--main-text)" }}>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              Payment Status:{" "}
            </Typography>
            {data.data.orderStatus}
          </Typography>
          <Typography variant="p" sx={{ color: "var(--main-text)" }}>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              Date:{" "}
            </Typography>
            {new Date(data.data.createdAt).toLocaleDateString("en-US", options)}
          </Typography>
          <Typography variant="p" sx={{ color: "var(--main-text)" }}>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              Payment Method:{" "}
            </Typography>
            {data.data.paymentMethod === "online"
              ? "Online Payment"
              : "Cash on Delivery"}
          </Typography>
        </Stack>
        <Stack gap={1} bgcolor={"var(--light-bg)"} p={3} borderRadius={2}>
          <Typography variant="h6" mb={1} sx={{ color: "var(--primary)" }}>
            Shipping Address
          </Typography>
          <Typography variant="p" sx={{ color: "var(--main-text)" }}>
            {data.data.shippingAddress}
          </Typography>
        </Stack>
        <Box p={2} bgcolor={"var(--light-bg)"} borderRadius={2} sx={{ p: 3 }}>
          <Typography variant="h6" mb={2} sx={{ color: "var(--primary)" }}>
            Your Order ({data.data.orderItems?.length} items)
          </Typography>
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 2,
              paddingBottom: 1,
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ccc",
                borderRadius: "10px",
              },
            }}
          >
            {data.data.orderItems.map((item) => (
              <Card
                key={item.id}
                sx={{
                  minWidth: 180,
                  flex: "0 0 auto",
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={item.product.thumbnail}
                  alt={item.product.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="subtitle1" my={1} fontWeight="bold">
                    {item.product.title}
                  </Typography>
                  <Typography mb={1} variant="body2">
                    EGP{item.product.price.toLocaleString()} × {item.quantity}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    EGP{item.product.price * item.quantity}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
        <Stack gap={1.5} bgcolor={"var(--light-bg)"} p={3} borderRadius={2}>
          <hr></hr>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Typography sx={{ display: "inline" }}>Subtotal: </Typography>
            <Typography variant="p" sx={{ color: "var(--main-text)" }}>
              EGP{totalBeforeDiscount}
            </Typography>
          </Stack>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Typography sx={{ display: "inline" }}>Shipping: </Typography>
            <Typography variant="p" sx={{ color: "var(--main-text)" }}>
              EGP50.00
            </Typography>
          </Stack>
          {percentage > 0 && (
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Typography sx={{ display: "inline" }} color={"success"}>
                Discount ({percentage}%):
              </Typography>
              <Typography variant="p" color={"success"}>
                - EGP{discountAmount}
              </Typography>
            </Stack>
          )}

          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Typography sx={{ display: "inline", fontWeight: "bold" }}>
              Total:{" "}
            </Typography>
            <Typography variant="p">EGP {data.data.totalPrice}</Typography>
          </Stack>
        </Stack>
        <ThemeProvider theme={themeC}>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              width: "fit-content",
              alignSelf: "center",
              padding: "10px",
            }}
            onClick={() => navigate("/menu-items")}
          >
            Continue Shopping
          </Button>
        </ThemeProvider>
      </Stack>
    </>
  );
}
