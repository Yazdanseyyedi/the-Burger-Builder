import * as actionTypes from '../actions/actionTypes'

const initialState={
    order:[],
    loading:false,
    purchased:false,

}


const reducer=(state=initialState,action)=>{
    switch(action.type){
        case(actionTypes.Purchase_burger_success):
            const newOrder={
                ...action.orderData,
                id:action.orderId,
                
            }

            return(
                {
                ...state,
                loading:false,
                purchased:true,
                order:state.order.concat(newOrder)
            })
            
        case(actionTypes.Purchase_burger_start):
            return{
                ...state,
                loading:true
            
        }

        case(actionTypes.Purchased_init):{
            return{
                ...state,
                purchased:false
            }
        }
        
        case(actionTypes.Purchase_burger_failed):
            return{
                ...state,
                loading:true
            }

        case(actionTypes.Fetch_order_start):
            return{
                ...state,
                loading: true
            }

        case(actionTypes.Fetch_order_success):
            return{
                ...state,
                loading: false,
                order:action.order
            }

        case(actionTypes.Fetch_order_fail):
            return{
                ...state,
                loading: false,
                
            }

        default:
            return state    
    }
}

export default reducer