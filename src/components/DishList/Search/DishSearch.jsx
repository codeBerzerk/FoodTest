import { Autocomplete } from "@mui/joy";
import { useState } from "react"

export default function DishSearch(){
    const [inputValue,updateInput] = useState("");
    
    return <section>    
        
            <Autocomplete  
                options={["Asdasd"]}
                placeholder="Filter by main ingredient"/>
        </section>
}