import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'


export const addingredients=(ingsname)=>{
    return{
        type:actionTypes.Addingredients ,
        ingredientName:ingsname
    }
}

export const removeingredients=(ingsname)=>{
    return{
        type:actionTypes.Removeingredients,
        ingredientName:ingsname
    }
}

export const setingerdients=(ingredients)=>{
    return{
        type:actionTypes.Setingredients,
        ingredients:ingredients
    }
    
}

export const fetchingredientsfailed=()=>{
    return{
        type:actionTypes.Fetch_ingredients_failed
    }
    
}

export const initingredients=()=>{
    return dispatch =>{
        axios.get('https://react-my-burger-f9a86.firebaseio.com/ingredients.json')
            .then(response=>{dispatch(setingerdients(response.data))})
                
            .catch(error=>{dispatch(fetchingredientsfailed())}
                )
    }
    
}