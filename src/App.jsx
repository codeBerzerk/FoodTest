import { configureStore } from "@reduxjs/toolkit";
import { combinedReducer } from "./reducers/combinedReducer";
import Cart from "./components/Cart";
import { Provider } from "react-redux";

const store = configureStore({reducer:combinedReducer})

export default function App(){
    return(
        <Provider store={store}>
            <Cart />
        </Provider>
    )
}