import React,{Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


class Orders extends Component{

    state={
        orders:[],
        loading:false

    }
    
    componentDidMount=()=>{
        axios.get('/orders.json')
        .then(res=>{
            const fetchedOrders=[]
            for( let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            this.setState({orders:fetchedOrders,loading:false})}
            )
        .catch(error=>this.setState({loading:false}))
    }
    
    render(){

        const Orders=this.state.orders.map(ig=>{
            return(
                // console.log(this.state.orders))
            <Order key={ig.id} price={ig.price} ingredients={ig.ingredients}/>)
            
        })

        return(
            <div>
                {Orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders,axios)