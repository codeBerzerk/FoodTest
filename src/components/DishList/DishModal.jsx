import { Stack, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { dishHandler } from './DishHandlers';
import ModalChip from './ModalChip';

const style = {
    background: 'linear-gradient(180deg,  #f1a533 0%, rgba(226, 140, 9, 0.7) 100%)',
    borderRadius: '38px',
    position: 'absolute',
    top: '50%',
    left: '70%',
    transform: 'translate(-55%, -50%)',
    width: '62%',
    height: 'auto',
    padding: '14px',
}

const receiptStyles = {
    outline:"none",
    maxHeight: "50vh",
    marginTop: "26px",
    padding: "20px 40px 40px 40px",
    overflowY:"scroll",
    background: '#FFEDD1',
    boxShadow: '0 11px 15px rgba(235, 169, 70, 0.64)',
    borderRadius: '33.5px',
    fontFamily: ' "Montserrat", sans-serif ',
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
                <Box className="modalContainer" sx={style}>
                    <Box className="modalTitleContainer">
                        <Box className="modalImg" sx={{backgroundImage:`url(${dish.meal.strMealThumb})`}}/>
                            <Box className="modalDescriptionContainer">
                                <Typography className="modalTitle">{dish.meal.strMeal}</Typography>
                                <Stack direction="row" spacing={1} sx={{maxWidth:"100%",flexWrap:"wrap",alignItems:'center',}}>
                                    {ingredients.map(ingr=>{
                                        return <ModalChip key={ingr} ingr={ingr}/>
                                    })}
                                </Stack>
                                <Typography className="modalBadge" style={{right:"20px"}}>{dish.meal.strCategory}</Typography>
                                <Typography className="modalBadge" style={{left:"20px"}}>{dish.meal.strArea}</Typography>
                            </Box>
                    </Box>
                    <Box sx={receiptStyles}>
                    <Typography sx={{fontSize:"28px",marginBottom:"10px"}}>Recipe</Typography>
                    <Typography className="modalReceipt" variant='subtitle1'>{dish.meal.strInstructions}</Typography>
                    <Typography sx={{fontSize:"28px",margin:"10px 0"}}>Ingredients & Measure</Typography>
                    <Stack direction={"column"}>
                        {ingredients.map((ingr,ind)=>{
                            return <Typography sx={{fontStyle:"italic"}}>{ingr} - {dish.meal["strMeasure"+(ind+1)]};</Typography>
                        })}
                    </Stack>
                    <Typography sx={{fontSize:"28px",margin:"10px 0"}}>Links</Typography>
                    <Typography sx={{fontStyle:"italic"}}> <a href={dish.meal.strSource} target="_blank">BBC Article</a></Typography>
                    <Typography sx={{fontStyle:"italic",marginTop:"5px"}}> <a href={dish.meal.strYoutube} target="_blank">YouTube Video Tutorial</a></Typography>
                    </Box>
                </Box>
            </Modal>)
}