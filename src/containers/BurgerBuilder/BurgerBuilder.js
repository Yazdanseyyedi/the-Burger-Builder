import React,{Component} from 'react'

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions'
import {connect} from 'react-redux'


class BurgerBuilder extends Component{

    state={
        purchasable:false,
        purchasing: false,
        loading:false,
        error:false
    }


    updatePurchase=(ingredients)=>{
        const sum = Object.keys(ingredients)
        .map((igKey)=>{
            return ingredients[igKey]
        }).reduce((sum,el)=>{return sum + el}, 0)
        return sum>0
    }

    componentDidMount=()=>{
        // axios.get('https://react-my-burger-f9a86.firebaseio.com/ingredients.json')
        //     .then(response=>{this.setState({ingredients:response.data})})
        //     .catch(error=>this.setState({error:error}))
    }


   

    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }

    

    ContinueHandler=()=>{

        this.props.history.push('/checkout')
        // alert('You Continued')

    }



    render(){

        const disabledIngredients={
            ...this.props.ings
        }

        for( let key in disabledIngredients){
            disabledIngredients[key]= disabledIngredients[key] <= 0;
        }

        

        let burger=this.state.error ?<p style={{textAlign:'center'}}>there's an error</p> :<Spinner/>
        let orderSummary=null
        

        if(this.props.ings){
                
            burger=<Auxiliary>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                ingredientsAdd={this.props.Addings}
                ingredientsRemove={this.props.Removeings}
                disableInfo={disabledIngredients}
                price={this.props.totalprice}
                purchasable={this.updatePurchase(this.props.ings)}
                purchasing={this.purchaseHandler}/>
                </Auxiliary>


            orderSummary=<OrderSummary ingredients={this.props.ings}
            cancelledPurchase={this.purchaseCancelHandler}
            continuePurchase={this.ContinueHandler}
            price={this.props.totalprice}/>
        }

        if(this.state.loading){
            orderSummary=<div><Spinner/><p style={{textAlign:'center'}}>loading...</p></div>

        }


        return(
            <Auxiliary>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                
            </Modal>
            {burger}
            </Auxiliary>


        )
    }

}

const mapStatesToProps= state=>{
    return{
        ings: state.ingredients,
        totalprice: state.totalprice
    };
    
}

const mapDispatchToProps= dispatch=>{
    return{
        Addings : (ingsname)=>dispatch({type:actionTypes.Addingredients ,ingredientName:ingsname}),
        Removeings : (ingsname)=>dispatch({type:actionTypes.Removeingredients,ingredientName:ingsname})
    }
    
}


export default connect(mapStatesToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));