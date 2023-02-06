import { useState } from "react"

export default function DishSearch(){
    const [inputValue,updateInput] = useState("");
    
    return <section>
        <input type="text" value={inputValue} onInput={(e)=>{updateInput(e.target.value)}} />
    </section>
}