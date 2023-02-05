import { productDB } from "./HandleProductDB";

const getCategories = (list) => {
    const categories = [];
    list?.forEach(product => {
        if(!categories.includes(product.category))categories.push(product.category);
    });
    return categories;
}

const getProductsByCategory = (list,category) => {
    const products = [];
    list.forEach(product=>{
        product.category === category && products.push(product);
    })
    return products;
}
const getProductFromDB = (myProduct) =>{
    let res;
    productDB.find(product=>{
        if(product.label === myProduct){
            res = product;
        }
        return product.label === myProduct;
    });
    return res;
}

export const cartHandlers = [getCategories,getProductsByCategory,getProductFromDB];
