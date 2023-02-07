import Dish from "./Dish";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useEffect, useState } from "react"
import DishModal from "./DishModal";
import DishSearch from "./Search/DishSearch";
import {Button, Modal} from "@mui/material";
import {AiOutlineShoppingCart} from "react-icons/ai"
import { Box } from "@mui/system";
import CartMenu from "../Cart/CartMenu";

export default function DishesList() {
    const [mealDB,updateDB] = useState([]);
    const [mealCount,updateCount] = useState(12);
    const [isModalOpen,setModalOpen] = useState(false);

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
        sx={{ color: '#EBA944', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!mealDB.length}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    }

    
    return(<section className="dish__container">
        <div className="openMenu" onClick={()=>{setModalOpen(true)}}><AiOutlineShoppingCart/></div>
        <Modal
            open={isModalOpen}
            onClose={()=>setModalOpen(false)}>
            <Box className="cartModalContainer">
                <CartMenu close={setModalOpen}/>
            </Box>
        </Modal>
        
        <DishSearch/>
        <section className="dish">
            <DishModal/>
            {mealDB.map(meal=>{
                return <Dish key={meal.idMeal} dish={meal}/>
            })}
        </section>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Button
                style={{
                    fontFamily: ' "Montserrat", sans-serif ',
                    border: "none",
                    marginTop: '60px',
                    marginBottom: '60px',
                    background: '#FFF1DC',
                    boxShadow: '0 11px 15px rgba(235, 169, 70, 0.64)',
                    fontStyle: 'normal',
                    borderRadius:"30px",
                    textDecoration: 'underline',
                    fontWeight: 500,
                    padding:"10px 50px",
                    color: 'rgba(171, 39, 63, 0.7)',
                }}
                onClick={()=>{
                updateCount((prevState)=>prevState+12);
            }}>Load more</Button>
        </div>
    </section>)
}