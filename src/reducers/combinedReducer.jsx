import { combineReducers } from "@reduxjs/toolkit";
import { cart } from "./cartReducer";

export const combinedReducer = combineReducers({
    cart:cart,
})