import { Stack, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { dishHandler } from './DishHandlers';
import ModalChip from './ModalChip';

const style = {
    background: 'linear-gradient(180deg, #E28C09 0%, rgba(226, 140, 9, 0.7) 100%)',
    backdropFilter: 'blur(12.5px)',
    borderRadius: '38px',
    position: 'absolute',
    top: '50%',
    left: '70%',
    transform: 'translate(-55%, -50%)',
    width: '62%',
    height: 'auto',
    p: 4,
}

const receiptStyles = {
    height:"auto",
    maxHeight: "50vh",
    marginTop: "26px",
    padding: "60px",
    overflowY:"scroll",
    background: '#FFEDD1',
    boxShadow: '0 11px 15px rgba(235, 169, 70, 0.64)',
    borderRadius: '33.5px',
    fontFamily: ' "Montserrat", sans-serif ',
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
    color: '#000000',
  };

export default function DishModal(){
    const dispatch = useDispatch();
    const dish = useSelector(state=>state.dish);
    const ingredients = Array.from(new Set(dishHandler.getIngridients(dish.meal)));
    const openModal = (state) => {
        dispatch({type:"CHANGE_OPEN",payload:state})
    }

    return (<Modal
                open={dish.isOpen}
                onClose={()=>openModal(false)}>
                <Box sx={style}>
                    <Typography variant='h4'>{dish.meal.strMeal}</Typography>
                    <Stack direction="row" spacing={1} sx={{maxWidth:"100%",flexWrap:"wrap",alignItems:'center',}}>
                        {ingredients.map(ingr=>{
                            return <ModalChip key={ingr} ingr={ingr}/>
                        })}
                    </Stack>
                    <Typography className="modalReceipt" variant='subtitle1' sx={receiptStyles}>{dish.meal.strInstructions}</Typography>
                </Box>
            </Modal>)
}