import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'


export const purchaseburgersuccess=(id,orderData)=>{
    return({
        type:actionTypes.Purchase_burger_success,
        orderData:orderData,
        orderId:id,
        error:false
    })
    
}

export const purchaseburgererror=(error)=>{
    return({
        type:actionTypes.Purchase_burger_failed,
        error:error
    })
    
}

export const purchaseinit=()=>{
    return{
        type:actionTypes.Purchased_init
    }
}

export const purchaseburgerstart=()=>{
    return{
        type:actionTypes.Purchase_burger_start
    }
}

export const purchaseburger=(orderData)=>{
    return dispatch =>{
        purchaseburgerstart()
        axios.post('/orders.json',orderData)
            .then(response=>{
                console.log(response.data.name)
                dispatch(purchaseburgersuccess(response.data.name,orderData))
                })
                
            .catch(error=>dispatch(purchaseburgererror(error)))
    }
}

export const fetchordersuccess=(fetchedOrder)=>{
    return{
        type:actionTypes.Fetch_order_success,
        order:fetchedOrder
    }
}

export const fetchorderfail=(err)=>{
    return{
        type:actionTypes.Fetch_order_fail,
        error:err
    }
}

export const fetchorderstart =()=>{
    return{
        type:actionTypes.Fetch_order_start
    }
}

export const fetchorder=()=>{
    return dispatch=>{
        dispatch(fetchorderstart())
        axios.get('/orders.json')
        .then(res=>{
            const fetchedOrders=[]
            for( let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            dispatch(fetchordersuccess(fetchedOrders))
            }
            )
        .catch(err=>dispatch(fetchorderfail(err)))
    }
    
}