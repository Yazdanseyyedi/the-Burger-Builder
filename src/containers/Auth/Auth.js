import React , {Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/auth'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'


class Auth extends Component{

    state={
        controls:{
            email:{
                elementtype:'input',
                elementconfig:{
                    type:'email',
                    placeholder:"Mail Adrress"
                },
                value:'',
                rules:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementtype:'input',
                elementconfig:{
                    type:'password',
                    placeholder:"password"
                },
                value:'',
                rules:{
                    required:true,
                    MinLength:5
                },
                valid:false,
                touched:false
            }
        },
        signup:false
    }

    componentDidMount=()=>{
        if(!this.props.BurgerBuilding && this.props.AuthRedirectPath !=='/'){
            this.props.onAuthRedirectPath('/')
        }
        if(this.props.BurgerBuilding){
            this.props.onAuthRedirectPath('/checkout')
        }
    }

    validationHandler=(value,rules)=>{
        
        let valid=true
        
        if(rules.required){
            valid=value.trim() !=='' && valid
        }

        if(rules.MinLength){
            valid=value.length >=rules.MinLength && valid
        }

        if(rules.isEmail){
            const pattern=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            valid=pattern.test(value) && valid
        }

        return valid
    }


    changedHandler=(event,inputIdentifier)=>{
        let updatedControls={...this.state.controls}
        let updatedControlsElement={...updatedControls[inputIdentifier]}
        updatedControlsElement.value=event.target.value
        updatedControlsElement.touched=true
        updatedControls[inputIdentifier]=updatedControlsElement
        updatedControlsElement.valid=this.validationHandler(updatedControlsElement.value,updatedControlsElement.rules)

        let formValid=true

        for(let inputIdentifier in updatedControls){
            formValid = updatedControls[inputIdentifier].valid && formValid
        }

        this.setState({controls:updatedControls, formValidation:formValid})
    }

    OrderHandler=(event)=>{
        event.preventDefault()
        this.props.auth(this.state.controls.email.value,this.state.controls.password.value,this.state.signup)
    }

    onSignchnageHandler=()=>{
        this.setState(preveState=>{return {signup:!preveState.signup}})
    }


    render(){

        const inputarray=[]

        for( let key in this.state.controls){
            inputarray.push(
                {
                    id:key,
                    config:this.state.controls[key]
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

                <Button btnType='Success' disabled={!this.state.formValidation}>SUBMIT</Button>
            </form>)
        
        if (this.props.loading){
            order=<Spinner></Spinner>
        }

        let errormessage=null

        if(this.props.error){
            errormessage=<div>{this.props.error.message}</div>
        }

        let RedirectIfIsAuth=null
        if (this.props.isAuthenticated){
            RedirectIfIsAuth=<Redirect to={this.props.AuthRedirectPath}/>
        }

        return(
            <div className={classes.Auth}>
                {RedirectIfIsAuth}
                {errormessage}
                <h1>please fill the form</h1>
                {order}
                <Button btnType='Danger' clicked={this.onSignchnageHandler}>SWITCH TO {this.state.signup ? 'SIGN UP': 'SIGN IN'}</Button>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !== null,
        AuthRedirectPath:state.auth.AuthRedirectPath,
        BurgerBuilding:state.burgerbuilder.Building
    }
}


const mapDispatchToProps=dispatch=>{
    return{
        auth: (email,password,isSignedUp)=>dispatch(actions.auth(email,password,isSignedUp)),
        onAuthRedirectPath:(path)=> dispatch(actions.setauthredirectpath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)