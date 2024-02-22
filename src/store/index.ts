import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery, setupListeners } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit/react";
import { GET_PRODUCTS } from "~/api/routes";
import type { Product } from "~/types";

const storeApi = createApi({
	reducerPath: "products",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
	endpoints: (builder) => ({
		getProducts: builder.query<Product[], void>({
			query: () => GET_PRODUCTS || [],
		}),
		getProduct: builder.query<Product, string | number>({
			query: (id) => GET_PRODUCTS + `/${id}`,
		}),
	}),
});

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [] as Product[],
	},
	reducers: {
		addToCart: (state, action) => {
			state.products.push(action.payload);
		},
		removeFromCart: (state, action) => {
			state.products = state.products.filter((p) => p.id !== action.payload.id);
		},
	},
	selectors: {
		getCartProducts: (state) => state.products,
	},
});

export const store = configureStore({
	reducer: {
		[storeApi.reducerPath]: storeApi.reducer,
		[cartSlice.reducerPath]: cartSlice.reducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storeApi.middleware),
});

setupListeners(store.dispatch);

export const { useGetProductsQuery, useGetProductQuery } = storeApi;
export const { addToCart, removeFromCart } = cartSlice.actions;
export const { getCartProducts } = cartSlice.selectors;
