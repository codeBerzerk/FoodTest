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
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    p: 4,


    // Scrollbar
    "&::-webkit-scrollbar": {
        width: "10px",
    },

    /* Track */
    "&::-webkit-scrollbar-track": {
        background: "#8C8C8C",
        width: "2px",
        border: "3px solid white",
        borderRadius: "10px",
    },

    /* Handle */
    "&::-webkit-scrollbar-thumb": {
        background: "#373F41",
        height: "100px",
        borderRadius: "10px",
    },

    /* Handle on hover */
    "&::-webkit-scrollbar-thumb:hover": {
        background: "black",
    },
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
                    <Stack direction="row" spacing={1} sx={{maxWidth:"80%",flexWrap:"wrap"}}>
                        {ingredients.map(ingr=>{
                            return <ModalChip key={ingr} ingr={ingr}/>
                        })}
                    </Stack>
                    <Typography variant='subtitle1' sx={{maxHeight:"450px",overflowY:"scroll"}}>{dish.meal.strInstructions}</Typography>
                </Box>
            </Modal>)
}