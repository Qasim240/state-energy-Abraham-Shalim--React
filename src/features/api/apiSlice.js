// src/features/slices/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({


    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://192.168.100.131/state-energy/public/api/v1',
        baseUrl: 'http://localhost:3000',

        prepareHeaders: (headers, { getState }) => {

            headers.set('Accept', 'application/json');
            const user = getState().user.user;
            const token = user ? user.token : null;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
                console.log('Token is inside apiSlice.js', token);
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
                // url: '/categories',
                url: '/data',
                method: 'GET',
                body,
            }),
        }),


    }),


});

export const { useLoginMutation, useGetAppointmentsQuery, useChangePasswordMutation, useGetCategoriesQuery } = apiSlice;
