import * as React from 'react';

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SortCart from './SortCart';
import {Button} from "@mui/material";
import CartModal from './CartModal';
import {IoMdAdd} from "react-icons/io";



export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart);
    
    const [isCategoryVisible,setCategoryState] = useState(cart.sorted);
    const [isOpen,updateOpen] = useState(false);

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
            <div className="cart__wrapper">
            <CartModal 
                isOpen={isOpen} updateOpen={updateOpen}
                addProduct={addProduct} cart={cart}
                removeProduct={removeProduct} isCategoryVisible={isCategoryVisible}/>
            <Typography
                className="cart__welcome"
                sx={{
                    userSelect:'none',
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
            justifyContent:'space-between',
            alignItems:'center',
        }}
        >
        <Typography
                className="cart__sortBy"
                sx={{
                    whiteSpace:"nowrap",
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
            position:"relative",
            alignItems: 'center',
            top: '10px',            
            paddingBottom: '26px',
            width: '99%',
            background: 'rgba(255, 237, 209, 0.77)',
            borderRadius: '24px',
        }}
        >
            <SortCart cart={cart} removeProduct={removeProduct} isCategoryVisible={isCategoryVisible}/>
            <Button
                className='cart__button'
                sx={{
                    marginTop: '30px',
                    borderRadius: '50%',
                    background: '#FFF1DC',
                    boxShadow: '0 11px 15px rgba(235, 169, 70, 0.64)',
                    fontWeight: 500,
                    fontSize: '25px',
                    height:"64px",
                    color: 'rgba(171, 39, 63, 0.7)',
                }}
                onClick={()=>updateOpen(true)}>
                    <IoMdAdd/>
            </Button>
        </Stack>
        </div>
        </section>)
}