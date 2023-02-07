import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import CartAutocomplete from "./CartAutocomplete";
import SortCart from "./SortCart";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    minHeight:"600px",
    transform: 'translate(-50%, -50%)',
    width: 800,
    borderRadius:"25px",
    bgcolor: '#FFE4BC',
    boxShadow: 24,
    p: 4,
  };

export default function CartModal({isOpen,updateOpen,cart,addProduct,removeProduct,isCategoryVisible}){
    return (
        <Modal 
            open={isOpen}
            onClose={()=>{updateOpen(false)}}>
            <Box sx={style} className="cartModal">
                <CartAutocomplete addProduct={addProduct} cart={cart}/>
                <SortCart cart={cart} removeProduct={removeProduct} isCategoryVisible={isCategoryVisible}/>
                <div className="cartModalClose" onClick={()=>{updateOpen(false)}}>Close</div>
            </Box>
        </Modal>
    )
}