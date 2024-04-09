import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rembeauty-abcac-default-rtdb.firebaseio.com/",
  }),
  endpoints: (builder) => ({
    getProductsByCategory: builder.query({
      query: (category) =>
        `/products.json?orderBy="category"&equalTo="${category}"`,
      transformResponse: (response) => {
        const data = Object.values(response);
        return data;
      },
    }),
    getCategories: builder.query({
      query: () => "/categories.json",
    }),
    getProductDetail: builder.query({
      query: (id) => `/products/${id}.json`,
    }),
    getImages: builder.query({
      query: () => "/images.json",
      transformResponse: (response) => {
        if (typeof response === "object" && response !== null) {
          return Object.values(response);
        }
        return response;
      },
    }),
  }),
});

export const {
  useGetProductDetailQuery,
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
  useGetImagesQuery,
} = shopApi;
