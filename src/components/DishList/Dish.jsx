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
            <div className="dish__meal--description" onClick={()=>{addDish(dish);openModal(true)}}>
                <Typography style={{marginTop: '20px'}} className="dish__meal--title" variant="h5">{dish.strMeal}</Typography>
                <ul className="dish__meal--products">
                    {shortCut.map(ingr=>{
                        return <li key={ingr}>{ingr}</li>
                    })}
                </ul>
            </div>

        </div>)
}