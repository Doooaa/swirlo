// src/services/ordersService.js
import api from "../utils/apiUrl";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const SHIPPING_PRICE = 50;

export const getShippingPrice = () => SHIPPING_PRICE;

export const getCartItems = () => api.get("/cart/checkout");

export const createOrder = (orderData) => api.post("/orders", orderData);

export const checkout = async (sessionId) => {
  const stripe = await stripePromise;
  if (stripe) {
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      console.error("👉🎇🎇 Stripe Checkout error:", error.message);
    }
  }
};
