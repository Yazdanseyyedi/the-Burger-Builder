import * as actionTypes from '../actions/actionTypes'

const initialState={
    ingredients:null,
    totalprice:2,
    error:false
}

const INGRIDIENT_PRICE={
    meat:2,
    cheese:0.5,
    salad:0.6,
    bacon:1
}

const reducer=(state=initialState,action)=>{

    switch(action.type){
        case(actionTypes.Addingredients):
            return({
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalprice:state.totalprice+ INGRIDIENT_PRICE[action.ingredientName]
                
            })

        case(actionTypes.Setingredients):
            return({
                ...state,
                ingredients:action.ingredients,
                error: false,
                totalprice:2
            })

        case(actionTypes.Fetch_ingredients_failed):
            return({
                ...state,
                error: true
            })
        case(actionTypes.Removeingredients):
            return({
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalprice:state.totalprice- INGRIDIENT_PRICE[action.ingredientName]
                
            })
        default:
            return state
    }
}

export default reducer