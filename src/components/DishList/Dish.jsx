import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { dishHandler } from "./DishHandlers";

export default function Dish({dish}) {
    const dispatch = useDispatch();

    const addDish = (meal) => {
        dispatch({type:"UPDATE_DISH",payload:meal})
    }

    const openModal = (state) => {
        dispatch({type:"CHANGE_OPEN",payload:state})
    }
    const shortCut = dishHandler.getIngridients(dish);
    shortCut.length = 3;
    return(
        <div className="dish__meal">
            <div className="dish__meal--img" style={{backgroundImage:`url(${dish.strMealThumb})`}}/>
            <div className="dish__meal--description">
                <Typography style={{marginTop: '20px'}} className="dish__meal--title" variant="h5" onClick={()=>{addDish(dish);openModal(true)}}>{dish.strMeal}</Typography>
                <ul className="dish__meal--products" style={{listStyleType: 'disc', width: 'max-content', marginTop: 'auto', marginBottom: 'auto'}}>
                    {shortCut.map(ingr=>{
                        return <li key={ingr}>{ingr}</li>
                    })}
                </ul>
            </div>

        </div>)
}