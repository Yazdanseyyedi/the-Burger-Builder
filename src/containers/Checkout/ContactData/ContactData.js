import React ,{Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderBurger from '../../../store/actions/order'

class ContactData extends Component{

    state={
        formValidation: false,
        Form:{
            
            name:{
                elementtype:'input',
                elementconfig:{
                    type:'text',
                    placeholder:"Your Name"
                },
                value:'',
                rules:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementtype:'input',
                elementconfig:{
                    type:'text',
                    placeholder:"Street"
                },
                value:'',
                rules:{
                    required:true
                },
                valid:false,
                touched:false
                
            },
            zipcode:{
                elementtype:'input',
                elementconfig:{
                    type:'text',
                    placeholder:"Your Zip Code"
                },
                value:'',
                rules:{
                    required:true,
                    MaxLength:5,
                    MinLength:5
                },
                valid:false,
                touched:false
                
            },
            country:{
                elementtype:'input',
                elementconfig:{
                    type:'text',
                    placeholder:"Your Country"
                },
                value:'',
                rules:{
                    required:true
                },
                valid:false,
                touched:false
                
            },
        
            EMail:{
                elementtype:'input',
                elementconfig:{
                    type:'email',
                    placeholder:"Your Mail"
                },
                value:'',
                rules:{
                    required:true
                },
                valid:false,
                touched:false
                
            },

            deliverymethod:{
                elementtype:'select',
                elementconfig:{
                    options:[
                        {value:'fast' , valuedisplay:'Fast'},
                        {value:'fastest' , valuedisplay:'Fastest'}
                    ]
                },
                rules:{
                    
                },
                valid:true,
                touched:false
                
            }
        },
        
    
        
        

    }


    OrderHandler=(event)=>{
        event.preventDefault()
        
        const formData={}
        for(let element in this.state.Form){
            formData[element]=this.state.Form[element].value
        }
        const order={
            ingredients:this.props.ings,
            price: (+this.props.price).toFixed(2),
            orderdata: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token)

        
        
        

    }


    validationHandler=(value,rules)=>{
        
        let valid=false
        
        if(rules.required){
            valid=value.trim() !==''
        }

        else{
            valid=true
        }

        if(rules.MaxLength){
            valid=value.length <=rules.MaxLength
        }

        return valid
    }


    changedHandler=(event,inputIdentifier)=>{
        let updatedForm={...this.state.Form}
        let updatedFormElement={...updatedForm[inputIdentifier]}
        updatedFormElement.value=event.target.value
        updatedFormElement.touched=true
        updatedForm[inputIdentifier]=updatedFormElement
        updatedFormElement.valid=this.validationHandler(updatedFormElement.value,updatedFormElement.rules)

        let formValid=true

        for(let inputIdentifier in updatedForm){
            formValid = updatedForm[inputIdentifier].valid && formValid
        }

        this.setState({Form:updatedForm, formValidation:formValid})
    }

    render(){
        const inputarray=[]

        for( let key in this.state.Form){
            inputarray.push(
                {
                    id:key,
                    config:this.state.Form[key]
                }
            )
        }

        let order=(<form onSubmit={this.OrderHandler}>
            {inputarray.map(input=>
                <Input
                key={input.id} 
                elementtype={input.config.elementtype}
                elementconfig={input.config.elementconfig}
                value={input.config.value} 
                invalid={!input.config.valid}
                required={input.config.rules.required}
                touched={input.config.touched}
                formValid={input.formValidation}
                changed={(event)=>this.changedHandler(event,input.id)}/>)}
            
            <Button btnType='Success' disabled={!this.state.formValidation}>Order</Button>
        </form>)
        if(this.props.loading){
            order=<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h1>please fill the form</h1>
                {order}
            </div>
        )
    }
}

const mapStatesToProps= state=>{
    return{
        ings: state.burgerbuilder.ingredients,
        price: state.burgerbuilder.totalprice,
        loading: state.order.loading,
        token: state.auth.token,
        userId:state.auth.userId
    }
}

const mapDisapatchToProps= dispatch=>{
    return{
        onOrderBurger: (order,token)=>dispatch(orderBurger.purchaseburger(order,token)),
    }
}

export default connect(mapStatesToProps,mapDisapatchToProps)(withErrorHandler(ContactData,axios))