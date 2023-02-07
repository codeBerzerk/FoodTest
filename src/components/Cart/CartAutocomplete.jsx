import Autocomplete from '@mui/joy/Autocomplete';
import { useState } from "react";
import { productDB } from './HandleProductDB';

export default function CartAutocomplete({cart,addProduct}){
    const [inputValue,updateValue] = useState('');

    return <Autocomplete
    sx={{
        marginTop: '30px',
        marginBottom: '30px',
        marginLeft: "auto",
        marginRight: "auto",
        border: "none",
        fontFamily: "'Montserrat', sans-serif",
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "20px",
        color: "rgba(63, 43, 12, 0.7)",
        width: "482px",
        height: "55px",
        background: "#FFEDD1",
        boxShadow: "0 11px 15px rgba(235, 169, 70, 0.64)",
        borderRadius: "26px"
    }}
    className="cart__input"
    options={productDB}
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