import Dish from "./Dish";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useEffect, useState } from "react"
import DishModal from "./DishModal";
import DishSearch from "./Search/DishSearch";

export default function DishesList() {
    const [mealDB,updateDB] = useState([]);
    const [mealCount,updateCount] = useState(9);
    useEffect(()=>{
        let arr = [];
        if(mealDB.length!==0){
           arr = mealDB; 
        }
        (async ()=>{    
            while(arr.length < mealCount){
                const {meals} = await (await fetch("https://www.themealdb.com/api/json/v1/1/random.php")).json();
                    if(meals){
                        if(!arr.find(meal=>meal.idMeal === meals[0].idMeal)){
                            arr.push(meals[0]);
                        }
                    }
                }
                updateDB([...arr]);
            })()
    },[mealCount]);

    if(!mealDB.length){
        return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!mealDB.length}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    }
    return(<section style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"70%"}}>
        <DishSearch/>
        <section className="dish">
            <DishModal/>
            {mealDB.map(meal=>{
                return <Dish key={meal.idMeal} dish={meal}/>
            })}
            <button onClick={()=>{
                updateCount((prevState)=>prevState+9);
            }}>Load more</button>
        </section>
    </section>)
}