import * as React from 'react';

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CartAutocomplete from './CartAutocomplete';
import SortCart from './SortCart';



export default function Cart() {
    const dsipatch = useDispatch();
    const cart = useSelector(state=>state.cart);
    
    const [isCategoryVisible,setCategoryState] = useState(cart.sorted);

    const addProduct = (product) => {
        dsipatch({type:"ADD_PRODUCT",payload:product})
    }
    
    const removeProduct = (product) => {
        dsipatch({type:"REMOVE_PRODUCT",payload:product})
    }
    const channgeSortState = (state) => {
        dsipatch({type:"CHANGE_SORT",payload:state})
    }

    return(<section className="cart"> 
            <CartAutocomplete addProduct={addProduct} cart={cart}/>

            <Stack direction="row">
                <Typography variant="h6">Enebale sort by categories</Typography>
                <Switch label="label" checked={isCategoryVisible} onChange={()=>{setCategoryState(!isCategoryVisible);channgeSortState(!isCategoryVisible)}}/>
            </Stack>

            <SortCart cart={cart} removeProduct={removeProduct} isCategoryVisible={isCategoryVisible}/>
        </section>)
}