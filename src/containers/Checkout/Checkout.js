import React,{Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component{


    state={
        ingredients:{
            salad:0,
            meat:0,
            bacon:0,
            cheese:0
        },
        totalprice:0
    }


    componentDidMount=()=>{
        const query=new URLSearchParams(this.props.location.search)

        const ingredients={}

        let price=null
        for(let params of query.entries()){
            if(params[0]==="price"){
                price= params[1]
            }
            else{
                ingredients[params[0]]=+params[1]
            }
            
        }

        // console.log(ingredients)

        this.setState({ingredients:ingredients , totalprice:price})

        
    }


    CheckoutSummaryCancelledHandler=()=>{
        this.props.history.goBack()
    }

    CheckoutSummaryConfirmedHandler=()=>{
        console.log(this.props)
        this.props.history.push('/checkout/contact-data')
    }


    render(){
        return(<div>
            <CheckoutSummary 
            ingredients={this.state.ingredients}
            CheckoutSummaryCancelled={this.CheckoutSummaryCancelledHandler}
            CheckoutSummaryConfirmed={this.CheckoutSummaryConfirmedHandler}/>
            <Route path={this.props.match.path+'/contact-data'} 
            render={(props)=><ContactData ingredients={this.state.ingredients} price={this.state.totalprice} {...props}/>}/>
            </div>
        )
    }
}

export default Checkout