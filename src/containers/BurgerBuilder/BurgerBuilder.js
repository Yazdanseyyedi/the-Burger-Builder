import React,{Component} from 'react'

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGRIDIENT_PRICE={
    meat:2,
    cheese:0.5,
    salad:0.6,
    bacon:1
}


class BurgerBuilder extends Component{

    state={
        ingredients:null,
        totalprice:2,
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
        this.setState({purchasable: sum>0})
    }

    componentDidMount=()=>{
        axios.get('https://react-my-burger-f9a86.firebaseio.com/ingredients.json')
            .then(response=>{this.setState({ingredients:response.data})})
            .catch(error=>this.setState({error:error}))
    }


    addIngredientHandler=(type)=>{
        const updatedCount = this.state.ingredients[type]+1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const updatedPrice = INGRIDIENT_PRICE[type]+this.state.totalprice
        this.setState({totalprice:updatedPrice , ingredients:updatedIngredients})
        this.updatePurchase(updatedIngredients)
    }

    removeIngredientHandler=(type)=>{
        const updatedCount = this.state.ingredients[type]-1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const updatedPrice = this.state.totalprice-INGRIDIENT_PRICE[type]
        this.setState({totalprice:updatedPrice , ingredients:updatedIngredients})
        this.updatePurchase(updatedIngredients)
    }

    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }

    

    ContinueHandler=()=>{

        const query=[]
        for(let i in this.state.ingredients){
            query.push(i+'='+this.state.ingredients[i])
        }
        query.push("price="+this.state.totalprice)
        const joinedquery=query.join('&')

        // console.log("joinedquery="+joinedquery)

        this.props.history.push({
            pathname:'/checkout',
            search:'?'+joinedquery
        }
        )
        // alert('You Continued')

    }



    render(){

        const disabledIngredients={
            ...this.state.ingredients
        }

        for( let key in disabledIngredients){
            disabledIngredients[key]= disabledIngredients[key] <= 0;
        }

        

        let burger=this.state.error ?<p style={{textAlign:'center'}}>there's an error</p> :<Spinner/>
        let orderSummary=null
        

        if(this.state.ingredients){
                
            burger=<Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientsAdd={this.addIngredientHandler}
                ingredientsRemove={this.removeIngredientHandler}
                disableInfo={disabledIngredients}
                price={this.state.totalprice}
                purchasable={this.state.purchasable}
                purchasing={this.purchaseHandler}/>
                </Auxiliary>


            orderSummary=<OrderSummary ingredients={this.state.ingredients}
            cancelledPurchase={this.purchaseCancelHandler}
            continuePurchase={this.ContinueHandler}
            price={this.state.totalprice}/>
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

export default withErrorHandler(BurgerBuilder,axios);