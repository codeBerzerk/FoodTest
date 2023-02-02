import Autocomplete from "@mui/joy/Autocomplete";
import * as React from 'react';
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const list = [{label:"milk"},{label:"onion"},{label:"carrot"},{label:"apple"},{label:"banana"},{label:"rice"},{label:"salt"}]

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
    <ul>
        {cart.map((product,index)=>{
            return <li key={index} onClick={()=>{
                removeProduct(product);
            }}>{product}</li>
        })}  
    </ul>
        <Autocomplete options={coincide} sx={{width:300}} placeholder="Select product" 
            onInput={(event)=>{
                updateValue(event.target.value)
                updateCoincide([...list.filter(product=>{
                return {label:product.label.includes(event.target.value)}
            })])
            }}
            inputValue={inputValue}
            onChange={(event,newValue)=>{
                if(newValue !== null && newValue){
                    updateValue("");
                    !cart.includes(newValue.label)?
                    addProduct(newValue.label):
                    alert("You alredy have this product");
                }
            }}
            />
    </>)
}