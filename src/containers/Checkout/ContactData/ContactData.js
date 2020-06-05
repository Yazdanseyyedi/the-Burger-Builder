import React ,{Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

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
        
    
        
        loading:false

    }


    OrderHandler=(event)=>{
        event.preventDefault()
        
        this.setState({loading:true})
        const formData={}
        for(let element in this.state.Form){
            formData[element]=this.state.Form[element].value
        }
        const order={
            ingredients:this.props.ingredients,
            price: (+this.props.price).toFixed(2),
            orderdata: formData
        }
        
        axios.post('/orders.json',order)
            .then(response=>{
                this.setState({loading:false})
                this.props.history.push('/')})
            .catch(this.setState({loading:false}))
        
        
        

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
        console.log(formValid)

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
        if(this.state.loading){
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

export default ContactData