import { Chip } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {CiCirclePlus} from "react-icons/ci";
import { cartHandlers } from "../Cart/CartHandlers";

export default function ModalChip({ingr}){
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart);
    const [isAdded,updateAdded] = useState(cart.products?.find(product=>product.label === ingr));

    return (<Chip label={ingr} variant={isAdded? "outlined":"filled"} deleteIcon={isAdded?"":<CiCirclePlus/>} onDelete={()=>{
        if(isAdded){
            dispatch({type:"REMOVE_PRODUCT",payload:cartHandlers[2](ingr)})
        }else{
            dispatch({type:"ADD_PRODUCT",payload:cartHandlers[2](ingr)})
        }
        updateAdded(!isAdded);            
    }}/>)
}