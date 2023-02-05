import * as React from 'react';

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CartAutocomplete from './CartAutocomplete';
import SortCart from './SortCart';



export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart);
    
    const [isCategoryVisible,setCategoryState] = useState(cart.sorted);

    const addProduct = (product) => {
        dispatch({type:"ADD_PRODUCT",payload:product})
    }
    
    const removeProduct = (product) => {
        dispatch({type:"REMOVE_PRODUCT",payload:product})
    }
    const changeSortState = (state) => {
        dispatch({type:"CHANGE_SORT",payload:state})
    }

    return(<section className="cart">
            <Typography
                className="cart__welcome"
                sx={{
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '64px',
                    lineHeight: '86px',
                    color: '#E28C09',
                }}
            >Welcome</Typography>
            <Typography
                className="cart__myProducts"
                sx={{
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '32px',
                    lineHeight: '39px',
                    color: '#3F2B0C',
                }}
            >Мої продукти</Typography>
        <Stack
        sx={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
        }}
        >
        <Typography
                className="cart__sortBy"
                sx={{
                    fontStyle: 'italic',
                    fontWeight:300,
                    fontSize: '16px',
                    lineHeight: '20px',
                    color: '#3F2B0C',
                }}
            >Сортувати за категоріями</Typography>
            <Switch
                className='cart__switch'
                label="label"
                checked={isCategoryVisible}
                onChange={()=>{setCategoryState(!isCategoryVisible);
                changeSortState(!isCategoryVisible)}}/>
        </Stack>
        <Stack
        sx={{
            width: '99%',
            background: 'rgba(255, 237, 209, 0.77)',
            borderRadius: '24px',
        }}
        >
            <CartAutocomplete addProduct={addProduct} cart={cart}/>
            <SortCart cart={cart} removeProduct={removeProduct} isCategoryVisible={isCategoryVisible}/>
        </Stack>

        </section>)
}