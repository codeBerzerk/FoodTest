import { Chip, Stack, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { dishHandler } from './DishHandlers';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: '#ffffff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function DishModal(){
    const dispatch = useDispatch();
    const dish = useSelector(state=>state.dish);
    const ingridients = Array.from(new Set(dishHandler.getIngridients(dish.meal))); 
    const openMopdal = (state) => {
        dispatch({type:"CHANGE_OPEN",payload:state})
    }

    return (<Modal
                open={dish.isOpen}
                onClose={()=>openMopdal(false)}>
                <Box sx={style}>
                    <Typography variant='h4'>{dish.meal.strMeal}</Typography>
                    <Stack direction="row" spacing={1} sx={{maxWidth:"80%",flexWrap:"wrap"}}>
                        {ingridients.map(ingr=>{
                            return <Chip key={ingr} label={ingr} variant='outlined'/>
                        })}
                    </Stack>
                    <Typography variant='subtitle1' sx={{maxHeight:"450px",overflowY:"scroll"}}>{dish.meal.strInstructions}</Typography>
                </Box>
            </Modal>)
}