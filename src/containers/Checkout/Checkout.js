import React,{Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route , Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'

class Checkout extends Component{



    CheckoutSummaryCancelledHandler=()=>{
        this.props.history.goBack()
    }

    CheckoutSummaryConfirmedHandler=()=>{
        console.log(this.props)
        this.props.history.push('/checkout/contact-data')
    }


    render(){
        let summary=<Redirect to='/'/>
         
        if( this.props.ings){
            const if_purchased= this.props.purchase ? <Redirect to='/'/>:null;
            summary=<div>
                    {if_purchased}
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    CheckoutSummaryCancelled={this.CheckoutSummaryCancelledHandler}
                    CheckoutSummaryConfirmed={this.CheckoutSummaryConfirmedHandler}/>
                    <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
                    </div>
        }
        return summary
            
    }
}


const mapStatesToProps= state=>{
    return{
        ings: state.burgerbuilder.ingredients,
        purchase: state.order.purchased
    }
}

export default connect(mapStatesToProps)(Checkout)