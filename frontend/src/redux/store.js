import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import authApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice';
import productsApi from './features/products/productsApi';
import {reviewsApi} from './features/reviews/reviewsApi';
import resetPasswordApi from './features/auth/resetPasswordApi';
import orderApi from './features/orders/orderApi';
import cartApi from './features/cart/cartApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]:authApi.reducer,
    auth:authReducer,
    [productsApi.reducerPath]:productsApi.reducer,
    [reviewsApi.reducerPath]:reviewsApi.reducer,
    [resetPasswordApi.reducerPath]:resetPasswordApi.reducer,
    [orderApi.reducerPath]:orderApi.reducer,
    [cartApi.reducerPath]:cartApi.reducer,
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,productsApi.middleware,reviewsApi.middleware,resetPasswordApi.middleware,orderApi.middleware, cartApi.middleware),
});




