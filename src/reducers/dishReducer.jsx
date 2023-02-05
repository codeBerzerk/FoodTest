const defaultState = {
    isOpen:false,
    meal:{}
} 

export const dish = (state = defaultState,action) => {
          switch (action.type) {
            case "UPDATE_DISH":{
                return {...state,meal:action.payload};
            }
            case "CHANGE_OPEN":{
                return {...state,isOpen:action.payload};
            }
  
            default:
              return state
          }
  }