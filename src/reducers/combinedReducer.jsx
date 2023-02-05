import { combineReducers } from "@reduxjs/toolkit";
import { cart } from "./cartReducer";
import { dish } from "./dishReducer";

export const combinedReducer = combineReducers({
    cart:cart,
    dish:dish,
})