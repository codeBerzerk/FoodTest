import Dish from "./Dish";


import { useEffect, useState } from "react"
import DishModal from "./DishModal";

export default function DishesList() {
    const [mealDB,updateDB] = useState([]);
    useEffect(()=>{
        const arr = [];
            (async ()=>{    
                while(arr.length < 9){
                const {meals} = await (await fetch("https://www.themealdb.com/api/json/v1/1/random.php")).json();
                    if(meals){
                        if(!arr.find(meal=>meal.idMeal === meals[0].idMeal)){
                            arr.push(meals[0]);
                        }
                    }
                }
                updateDB(arr);
            })()
    },[])
    if(!mealDB.length){
        return "loading..."
    }
    return(<section className="dish">
        <DishModal/>
        {mealDB.map(meal=>{
            return <Dish key={meal.idMeal} dish={meal}/>
        })}
        </section>)
}