import { Autocomplete } from "@mui/joy";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export default function DishSearch(){
    const dispatch = useDispatch();
    const [inputValue,updateInput] = useState("");
    const [dishList,updateList] = useState([]);
    const [searchQuery,updateQuery] = useState("a");

    useEffect(()=>{
        (async ()=>{    
            const arr = [];
            const {meals} = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchQuery}`)).json();
            meals.forEach(element=>{
                arr.push({label:element.strMeal,meal:element})
            })
            updateList([...arr])
            })()
    },[searchQuery]);

    const addDish = (meal) => {
        dispatch({type:"UPDATE_DISH",payload:meal})
    }

    const openModal = (state) => {
        dispatch({type:"CHANGE_OPEN",payload:state})
    }
    
    return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <Typography
                className="cart__welcome welcome"
                sx={{
                    userSelect:'none',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '64px',
                    lineHeight: '86px',
                    color: '#E28C09',
                }}
            >Welcome</Typography>
            <div className="separator">

            </div>
            <Autocomplete  
                placeholder="Назва страви"
                options={dishList}
                className="search"
                sx={{
                    margin: '30px',
                    minWidth:"400px",
                    border: "none",
                    fontFamily: "'Montserrat', sans-serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "20px",
                    color: "rgba(63, 43, 12, 0.7)",
                    height: "55px",
                    background: "#FFEDD1",
                    boxShadow: "0 11px 15px rgba(235, 169, 70, 0.64)",
                    borderRadius: "26px"
                }}
                inputValue={inputValue}
                onInput={e=>{
                    updateInput(e.target.value);
                    if(e.target.value[0] !== searchQuery){
                        updateQuery(e.target.value[0]);
                    }
                }}
                onChange={(event,newValue)=>{
                    addDish(newValue.meal);
                    openModal(true);
                }}/>

        </div>
}