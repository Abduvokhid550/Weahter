import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./reducer";

export const store = configureStore({
    reducer: mainSlice
})
