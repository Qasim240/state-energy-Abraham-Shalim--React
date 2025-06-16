import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    lastName: 'lastName',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, name, email, lastName, token } = action.payload;
            state.user = { id, name, email, lastName, token };
            state.isLoggedIn = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
    },
});


export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;