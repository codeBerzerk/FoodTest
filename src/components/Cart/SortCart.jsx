import { cartHandlers } from "./CartHandlers"

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function SortCart({cart,isCategoryVisible,removeProduct}){
    return (
        <Stack
               sx={{
                   flexWrap:"wrap",
                   display: 'flex',
                    }}>
             {!isCategoryVisible ? 
                     cart.products?.map((product,index)=>{
                         return <Chip
                             sx={{
                                 fontFamily: "'Montserrat', sans-serif",
                                 fontStyle: 'italic',
                                 fontWeight: '500',
                                 fontSize: '16px',
                                 lineHeight: '20px',
                                 color: '#3F2B0C',
                                 background: '#FFF1DC',
                                 boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                 borderRadius: '20px',
                                 margin: '4px',
                             }}
                                     key={index} 

                                     label={product.label} 
                                     onDelete={()=>removeProduct(product)}/> 
                                 }): 
                     cartHandlers[0](cart.products).map((category,ind)=>{ 
                         return <section key={ind}> 
                                     <Typography variant='h5'>{category}</Typography> 
                                     <Stack sx={{flexWrap:"wrap"}} direction="row"> 
                                     {cartHandlers[1](cart.products,category).map((product,index)=>{ 
                                             return <Chip
                                                         sx={{
                                                             fontFamily: "'Montserrat', sans-serif",
                                                             fontStyle: 'italic',
                                                             fontWeight: '500',
                                                             fontSize: '16px',
                                                             lineHeight: '20px',
                                                             color: '#3F2B0C',
                                                             background: '#FFF1DC',
                                                             boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                                             borderRadius: '20px',
                                                             margin: '4px',
                                                         }}
                                                         key={index}
                                                         label={product.label} 
                                                         onDelete={()=>removeProduct(product)}/> 
                                                     })} 
                                     </Stack> 
                                 </section> 
                 })}
        </Stack>)
}