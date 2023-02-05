import { configureStore } from "@reduxjs/toolkit";
import { combinedReducer } from "./reducers/combinedReducer";
import Cart from "./components/Cart/Cart";
import { Provider } from "react-redux";
import DishesList from "./components/DishList/DishesList";

const store = configureStore({reducer:combinedReducer})

export default function App(){
    return(
        <Provider store={store}>
            <Cart/>
            <DishesList/>
        </Provider>
    )
}