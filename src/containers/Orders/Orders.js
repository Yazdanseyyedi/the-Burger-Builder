import React,{Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as orderaction from '../../store/actions/order'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'


class Orders extends Component{

    state={
        orders:[],
        loading:false

    }
    
    componentDidMount=()=>{
        this.props.fetchstart()
    }
    
    render(){
        let Orders=<Spinner/>
        if(!this.props.loading){
            Orders=this.props.orders.map(ig=>{
                return(
                    // console.log(this.state.orders))
                <Order key={ig.id} price={ig.price} ingredients={ig.ingredients}/>)
                
            })
        }
       

        return(
            <div>
                {Orders}
            </div>
        )
    }
}

const mapStatesToProps= state=>{
    return{
        orders:state.order.order,
        loading:state.order.loading
    }
}

const mapDispatchToProps= dispatch=>{
    return{
        fetchstart: ()=>dispatch(orderaction.fetchorder())
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(withErrorHandler(Orders,axios))