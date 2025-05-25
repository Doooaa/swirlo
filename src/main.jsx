// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// ^ react query imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ^ routing imports
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import { lazy, Suspense } from "react";
const AboutComponent = lazy(() => import("../src/pages/About/About.jsx"));
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
const ContactsComponent = lazy(() =>
  import("../src/pages/Contact/Contact.jsx")
);
const ProfileComponent = lazy(() => import("../src/pages/Profile/Profile.jsx"));
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import DashboardHome from "./pages/DashboardHome/DashboardHome";
import DashboardCategories from "./pages/DashboardCategories/DashboardCategories";
import DashboardOrders from "./pages/DashboardOrders/DashboardOrders";
import DashboardProducts from "./pages/DashboardProducts/DashboardProducts";
import DashboardCoupons from "./pages/DashboardCoupons/DashboardCoupons";
import DashboardAdmins from "./pages/DashboardAdmins/DashboardAdmins";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CategoriesContextProvider from "./context/CategoriesContext.jsx";
import { Toaster } from "react-hot-toast";
import Favorites from "./pages/Favorites/Favorites.jsx";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./utils/theme.js"; // import your custom theme
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Search from "./pages/Search/Search.jsx";
import ProductsContextProvider from "./context/ProductsContext.jsx";
import ArrowUp from '../src/components/ArrowUp/ArrowUp.jsx'
import {OrdersContextProvider} from '../src/context/OrdersContext.jsx'
// ^ routing setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // ^ main site
      { index: true, element: <Home></Home> },
      { path: "home", element: <Home></Home> },
      {
        path: "about",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AboutComponent />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ContactsComponent />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProfileComponent />
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Products />
          </Suspense>
        ),
      },
      { path: "login", element: <Login></Login> },
      { path: "register", element: <Register></Register> },
      { path: "favorites", element: <Favorites></Favorites> },
      { path: "search", element: <Search></Search> },
      { path: "cart", element: <Cart></Cart> },
      { path: "checkout", element: <Checkout></Checkout> },
      {
        path: "order-confirmation",
        element: <OrderConfirmation></OrderConfirmation>,
      },
      { path: "menu-items", element: <Products></Products> },
      { path: "menu-items/:id", element: <ProductDetails></ProductDetails> },

      // ^ dashboard
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          {
            index: true,
            element: <DashboardHome></DashboardHome>,
          },
          {
            path: "categories",
            element: <DashboardCategories></DashboardCategories>,
          },
          {
            path: "menu-items",
            element: <DashboardProducts></DashboardProducts>,
          },
          { path: "coupons", element: <DashboardCoupons></DashboardCoupons> },
          { path: "orders", element: <DashboardOrders></DashboardOrders> },
          { path: "admins", element: <DashboardAdmins></DashboardAdmins> },
        ],
      },
      { path: "*", element: <NotFound></NotFound> },
    ],
  },
]);

// ^ react query setup
const queryClient = new QueryClient();
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          {/* <FavoritesContextProvider> */}
          <OrdersContextProvider>
          <CategoriesContextProvider>
              <ProductsContextProvider>
                <ToastContainer />
                <ArrowUp />
                {/* <Toaster position="top-right" reverseOrder={false} /> */}
                <RouterProvider router={router} />
            </ProductsContextProvider>
          </CategoriesContextProvider>
          </OrdersContextProvider>
          {/* </FavoritesContextProvider> */}
        </AuthContextProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </ThemeProvider>
  /* </StrictMode> */
);
