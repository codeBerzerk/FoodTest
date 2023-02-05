import Autocomplete from '@mui/joy/Autocomplete';
import { useState } from "react";
import { productDB } from './HandleProductDB';

export default function CartAutocomplete({cart,addProduct}){
    const [inputValue,updateValue] = useState('');

    return <Autocomplete
    className="cart__input"
    options={productDB}
    sx={{width:300}}
    placeholder="Select product" 
    onInput={(event)=>updateValue(event.target.value)}
    inputValue={inputValue}
    onChange={(event,newValue)=>{
        if(newValue !== null && newValue.label){
            if(!cart.products?.find(product=>product.label === newValue.label)){
                addProduct(newValue);
                updateValue('');
            }else{
                alert("You alredy have this product");
            }
        }
    }}
    />
}