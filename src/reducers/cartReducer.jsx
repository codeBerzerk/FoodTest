
(()=>{
  if(!localStorage.getItem("cart")){
    localStorage.setItem("cart",JSON.stringify({products:[],sorted:false}))
  }
})()


const updateStorage = (state) => {
  localStorage.setItem("cart",JSON.stringify(state));
  return(state);
}

export const cart = (state = JSON.parse(localStorage.getItem("cart")),action) => {
        switch (action.type) {
          case "ADD_PRODUCT":{
            return updateStorage({...state,products:[...state.products,action.payload]})
          }
          case "REMOVE_PRODUCT":{
            return updateStorage({...state,products:state.products.filter(product => product.label !== action.payload.label)})
          }
          case "CHANGE_SORT":{
            return updateStorage({...state,sorted:action.payload})
          }

          default:
            return state
        }
}