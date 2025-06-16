import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { combineReducers } from 'redux'
import { apiSlice } from "../features/slices/apiSlice";
import persistReducer from "redux-persist/es/persistReducer";
import counterReducer from "../features/slices/counterSlice";
import { authApi } from "../features/api/authApiSlice";
import userReducer from '../features/slices/userSlice.js'
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['counter', 'user'],
}


const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    counter: counterReducer,
    user: userReducer,
})



const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiSlice.middleware, authApi.middleware),
})

setupListeners(store.dispatch)



export const persistor = persistStore(store)
