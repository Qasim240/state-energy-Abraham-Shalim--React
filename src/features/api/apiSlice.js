// src/features/slices/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.100.131/state-energy/public/api/v1',
        prepareHeaders: (headers, { getState }) => {
            headers.set('Accept', 'application/json');
            const user = getState().user.user;
            const token = user ? user.token : null;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
                // console.log('Token is inside apiSlice.js', token);
            }
            return headers;
        },
    }),

    endpoints: (builder) => ({
        // Login Mutation
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // Get Appointments Query
        getAppointments: builder.query({
            query: () => ({
                url: '/user/get-appointment',
                method: 'GET',
            }),
        }),

        changePassword: builder.mutation({
            query: (body) => ({
                url: '/user/change-password',
                method: 'POST',
                body,
            }),
        }),

        getCategories: builder.query({
            query: (body) => ({
                url: '/categories',
                method: 'GET',
                body,
            }),
        }),

        // Add to Cart Mutation (correctly placed at the root level)
        addToCart: builder.mutation({
            query: (cartData) => ({
                url: '/cart',
                method: 'POST',
                body: cartData,
            }),
        }),

        getCart: builder.query({
            query: () => ({
                url: '/cart',
                method: 'GET',
            }),
            providesTags: ['Cart'],
            refetchOnMountOrArgChange: true,
            keepUnusedDataFor: 0,
        }),



        deleteCartItem: builder.mutation({
            query: (cartId) => ({
                url: `/cart/${cartId}`,
                method: 'DELETE',
            }),
        }),

        clearCartApi: builder.mutation({
            query: () => ({
                url: `/userCart/clear-cart`,
                method: 'GET',
            }),
        }),

        editCartItem: builder.mutation({
            query: ({ cartId, updatedData }) => ({
                url: `/cart/${cartId}`,
                method: 'PUT',
                body: updatedData,
            }),
        }),

        getCrmContact: builder.query({
            query: (contactId) => ({
                url: `/user/get-crm-contact`,
                method: 'GET',
                params: { contact_id: contactId },
            }),
        }),

        createOrder: builder.mutation({
            query: (body) => ({
                url: '/order',
                method: 'POST',
                body

            }),
        }),
        getOrders: builder.query({
            query: () => ({
                url: '/order',
                method: 'GET',
            }),
        }),


        updateUserProfile: builder.mutation({
            query: ({ userId, body }) => ({
                url: `/users/${userId}`,
                method: 'PUT',
                body,
            }),
        }),




    }),
});

export const {
    useLoginMutation,
    useGetAppointmentsQuery,
    useChangePasswordMutation,
    useGetCategoriesQuery,
    useAddToCartMutation,
    useGetCartQuery,
    useDeleteCartItemMutation,
    useClearCartApiMutation,
    useEditCartItemMutation,
    useGetCrmContactQuery,
    useCreateOrderMutation,
    useGetOrdersQuery,
    useUpdateUserProfileMutation
} = apiSlice;