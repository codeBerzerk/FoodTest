import { Typography } from "@mui/material";

export default function Dish({dish}) {
    const ingridients = [];
    for(let value in dish){
        if(value.includes("strIngredient") && dish[value]){
            ingridients.push(dish[value]);
        }
    }
    const shortCut = ingridients;
    shortCut.length = 3;
    return(
        <div className="dish__meal">
            <div className="dish__meal--img" style={{backgroundImage:`url(${dish.strMealThumb})`}}/>
            <div className="dish__meal--description">
                <Typography variant="h5">{dish.strMeal}</Typography>
                <div className="dish__meal--products">
                    {shortCut.map(ingr=>{
                        return <div key={ingr}>{ingr}</div>
                    })}
                </div>
            </div>

        </div>)
}