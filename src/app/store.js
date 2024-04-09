import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { shopApi } from "./services/shop";
import { authApi } from "./services/auth";
import { profileApi } from "./services/profile";
import { ordersApi } from "./services/orders";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      shopApi.middleware,
      profileApi.middleware,
      authApi.middleware,
      ordersApi.middleware
    ),
});

setupListeners(store.dispatch);
