import { cartHandlers } from "./CartHandlers"

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function SortCart({cart,isCategoryVisible,removeProduct}){
    return (
        <Stack direction="column" sx={{flexWrap:"wrap"}}>
             {!isCategoryVisible ? 
                     cart.products?.map((product,index)=>{
                         return <Chip 
                                     key={index} 
                                     variant="outlined" 
                                     label={product.label} 
                                     onDelete={()=>removeProduct(product)}/> 
                                 }): 
                     cartHandlers[0](cart.products).map((category,ind)=>{ 
                         return <section key={ind}> 
                                     <Typography variant='h5'>{category}</Typography> 
                                     <Stack sx={{flexWrap:"wrap"}} direction="row"> 
                                     {cartHandlers[1](cart.products,category).map((product,index)=>{ 
                                             return <Chip 
                                                         key={index} 
                                                         variant="outlined" 
                                                         label={product.label} 
                                                         onDelete={()=>removeProduct(product)}/> 
                                                     })} 
                                     </Stack> 
                                 </section> 
                 })}
        </Stack>)
}