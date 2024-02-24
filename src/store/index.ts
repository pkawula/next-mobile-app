import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery, setupListeners } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit/react";
import { GET_PRODUCTS } from "~/api/routes";
import type { Product } from "~/types";

const storeApi = createApi({
	reducerPath: "products",
	baseQuery: fetchBaseQuery({ baseUrl: "/" }),
	endpoints: (builder) => ({
		getProducts: builder.query<Product[], void>({
			query: () => GET_PRODUCTS + ".json",
		}),
		getProduct: builder.query<Product | null, string | number>({
			query: () => GET_PRODUCTS + `.json`,
			transformResponse: (response: Product[], _, id) => {
				return response.find((product) => product.id.toString() === id) || null;
			},
		}),
	}),
});

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [] as (Product & { quantity: number })[],
	},
	reducers: {
		addToCart: (state, action: { payload: Product }) => {
			const existingProductIndex = state.products.findIndex(
				(product) => product.id === action.payload.id,
			);

			if (existingProductIndex > -1) {
				const product = state.products[existingProductIndex];
				state.products.splice(existingProductIndex, 1, {
					...product,
					quantity: product.quantity + 1,
				});
			} else {
				state.products.push({ ...action.payload, quantity: 1 });
			}
		},
		removeFromCart: (state, action: { payload: Product & { quantity: number } }) => {
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
