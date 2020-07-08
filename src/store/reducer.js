import * as actionTypes from './actions'

const initialState={
    ingredients:{
        cheese:0,
        salad:0,
        meat:0,
        bacon:0

    },
    totalprice:2
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