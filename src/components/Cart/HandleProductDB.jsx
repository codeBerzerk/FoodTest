const arr = [];

(async ()=>{    
    const {meals} = await (await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")).json();
    meals.forEach(product=>{
        productDB.push({label:product.strIngredient,category:(product.strType !== null ? product.strType : "Unclassified products")})
    })
})()

export const productDB = Array.from(new Set(arr));