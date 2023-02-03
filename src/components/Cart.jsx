import * as React from 'react';

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Switch from '@mui/material/Switch';
import Autocomplete from '@mui/joy/Autocomplete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const list = [
            {label:"milk",group:"diary"},
            {label:"onion",group:"vegetables"},
            {label:"carrot",group:"vegetables"},
            {label:"apple",group:"fruit"},
            {label:"banana",group:"fruit"},
            {label:"rice",group:"groat"},
            {label:"salt",group:"seasoning"}]

export default function Cart() {
    const dsipatch = useDispatch();
    const cart = useSelector(state=>state.cart.products);
    const [inputValue,updateValue] = useState('');
    const [coincide,updateCoincide] = useState([...list])

    const addProduct = (product) => {
        dsipatch({type:"ADD_PRODUCT",payload:product})
    }
    
    const removeProduct = (product) => {
        dsipatch({type:"REMOVE_PRODUCT",payload:product})
    }

    return(
    <>
    <Stack direction="row" spacing={1}>
        {cart.map((product,index)=>{
            return <Chip key={index} variant="outlined" label={product} onDelete={()=>removeProduct(product)}/>
            })}  
    </Stack>
        <Autocomplete
            options={coincide}
            sx={{width:300}}
            placeholder="Select product" 
            freeSolo
            onInput={(event)=>updateValue(event.target.value)}

            onChange={(event,newValue)=>{
                if(newValue !== null && newValue){
                    if(!cart.includes(newValue.label)){
                        addProduct(newValue.label);
                        updateValue('');
                    }else{
                        alert("You alredy have this product");
                    }
                }
            }}
            />
    <Switch label="label" onChange={()=>{}}/>

    </>)
}