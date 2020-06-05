import React ,{Component} from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

class CheckoutSummary extends Component{

    render(){
        return(
            <div className={classes.CheckoutSummary}>
                <h1>We hope you enjoy it!</h1>
                <div style={{width:'100%', height:'300px', margin:'auto'}}><Burger
                ingredients={this.props.ingredients}/>
                
                

                <Button btnType='Danger' clicked={this.props.CheckoutSummaryCancelled}>Cancel</Button>
                <Button btnType='Success' clicked={this.props.CheckoutSummaryConfirmed}>Confirm</Button>
                </div>

            </div>
        )
    }
}

export default CheckoutSummary