import React,{Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
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
        return(<div>
            <CheckoutSummary 
            ingredients={this.props.ings}
            CheckoutSummaryCancelled={this.CheckoutSummaryCancelledHandler}
            CheckoutSummaryConfirmed={this.CheckoutSummaryConfirmedHandler}/>
            <Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
            </div>
        )
    }
}


const mapStatesToProps= state=>{
    return{
        ings: state.ingredients,
    }
}

export default connect(mapStatesToProps)(Checkout)