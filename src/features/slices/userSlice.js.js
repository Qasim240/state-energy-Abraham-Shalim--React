// src/features/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedIn: false,
    selectedAppointment: null,
    selectedRange: 50,
    utilityBill: 2000,
    insuranceBill: 2000,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { token, user } = action.payload;

            state.user = {
                token,
                ...user,
                full_name: `${user.first_name} ${user.last_name}`,
            };

            state.isLoggedIn = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.selectedAppointment = null;
        },
        setSelectedAppointment: (state, action) => {
            state.selectedAppointment = action.payload;
        },
        setUtilityBill: (state, action) => {
            state.utilityBill = action.payload;
        },
        setInsuranceBill: (state, action) => {
            state.insuranceBill = action.payload;
        },
    },
});

export const {
    setUser,
    clearUser,
    setSelectedAppointment,
    setUtilityBill,
    setInsuranceBill
} = userSlice.actions;

export default userSlice.reducer;
