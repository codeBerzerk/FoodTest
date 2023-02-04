import * as React from 'react';

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Switch from '@mui/material/Switch';
import Autocomplete from '@mui/joy/Autocomplete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const list = [
            {label:"milk",category:"diary"},
            {label:"onion",category:"vegetables"},
            {label:"carrot",category:"vegetables"},
            {label:"apple",category:"fruit"},
            {label:"banana",category:"fruit"},
            {label:"rice",category:"groat"},
            {label:"salt",category:"seasoning"}]

const getCategories = (list) => {
    const categories = [];
    list.forEach(product => {
        if(!categories.includes(product.category))categories.push(product.category);
    });
    return categories;
}

const getProductsByCategory = (list,category) => {
    const products = [];
    list.forEach(product=>{
        product.category === category && products.push(product);
    })
    return products;
}

export default function Cart() {
    const dsipatch = useDispatch();
    const cart = useSelector(state=>state.cart.products);
    const [inputValue,updateValue] = useState('');
    const addProduct = (product) => {
        dsipatch({type:"ADD_PRODUCT",payload:product})
    }
    const [isCategoryVisible,setCategoryState] = useState(false);
    
    const removeProduct = (product) => {
        dsipatch({type:"REMOVE_PRODUCT",payload:product})
    }

    return(
    <>
    <Stack direction="row" spacing={1} style={{display:!isCategoryVisible?"block":"none"}}>
        {cart.map((product,index)=>{
            return <Chip key={index} variant="outlined" label={product.label} onDelete={()=>removeProduct(product)}/>
            })}  
    </Stack>
        <Autocomplete
            options={list}
            sx={{width:300}}
            placeholder="Select product" 
            freeSolo
            onInput={(event)=>updateValue(event.target.value)}
            inputValue={inputValue}
            onChange={(event,newValue)=>{
                
                if(newValue !== null && newValue.label){
                    const {category} = newValue,{label} = newValue;
                    if(!cart.includes(label)){
                        addProduct({label:label,category:category});
                        updateValue('');
                    }else{
                        alert("You alredy have this product");
                    }
                }
            }}
            />
        <Switch label="label" onChange={()=>{setCategoryState(!isCategoryVisible)}}/>
        {getCategories(cart).map((category,ind)=>{
            category[0].toUpperCase();
            return <section key={ind} style={{display:isCategoryVisible?"block":"none"}}>
                <Typography variant='h3'>{category}</Typography>
                <Stack sx={{width:300}}  direction="row">
                    {getProductsByCategory(cart,category).map((product,index)=>{
                        return <Chip key={index} variant="outlined" label={product.label} onDelete={()=>removeProduct(product)}/>
                        })}
                </Stack>
            </section>
            
        })}
    </>)
}