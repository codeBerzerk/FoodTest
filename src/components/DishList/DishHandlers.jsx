export const dishHandler = {
    getIngridients:  (dish) => {
            const ingridients = [];
            for(let value in dish){
                if(value.includes("strIngredient") && dish[value]){
                    ingridients.push(dish[value]);
                }
            }
            return Array.from(new Set(ingridients));
        }  
}
