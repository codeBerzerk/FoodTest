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
export const cartHandlers = [getCategories,getProductsByCategory];
