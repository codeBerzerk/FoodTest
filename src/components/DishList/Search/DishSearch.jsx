import { Autocomplete } from "@mui/joy";
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
    
    return <section>    
        
            <Autocomplete  
                placeholder="Filter by main ingredient"
                options={dishList}
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

        </section>
}