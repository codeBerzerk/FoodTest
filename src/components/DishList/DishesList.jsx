import Dish from "./Dish";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useEffect, useState } from "react"
import DishModal from "./DishModal";
import DishSearch from "./Search/DishSearch";
import {Button} from "@mui/material";

export default function DishesList() {
    const [mealDB,updateDB] = useState([]);
    const [mealCount,updateCount] = useState(12);
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
    return(<section style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        width:"70%",
        background:
            "linear-gradient(120.12deg, rgba(255, 247, 236, 0.75) -0.11%, rgba(255, 247, 236, 0) 99.44%)"
    }}>
        <DishSearch/>
        <section className="dish">
            <DishModal/>
            {mealDB.map(meal=>{
                return <Dish key={meal.idMeal} dish={meal}/>
            })}
        </section>
            <Button
                style={{
                    fontFamily: ' "Montserrat", sans-serif ',
                    border: "none",
                    marginTop: '60px',
                    marginBottom: '60px',
                    width: '30%',
                    height: '66px',
                    background: '#FFF1DC',
                    boxShadow: '0 11px 15px rgba(235, 169, 70, 0.64)',
                    borderRadius: '33.5px',
                    fontStyle: 'normal',
                    textDecoration: 'underline',
                    fontWeight: 500,
                    fontSize: '1.5625vw',
                    lineHeight: '29px',
                    color: 'rgba(171, 39, 63, 0.7)',
                }}
                onClick={()=>{
                updateCount((prevState)=>prevState+12);
            }}>Load more</Button>

    </section>)
}