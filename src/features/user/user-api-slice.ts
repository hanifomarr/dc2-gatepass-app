import { apiSlice } from "../../app/apiSlice";
import { ENDPOINTS } from "../../constants/api";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: ENDPOINTS.users,
      }),
      keepUnusedDataFor: 5,
    }),
    getUserById: builder.query({
      query: (id: string) => ({
        url: `${ENDPOINTS.users}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery } = userApiSlice;
