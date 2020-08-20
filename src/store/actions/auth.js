import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authstart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authsuccess=(idToken,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:idToken,
        userId:userId
    }
}

export const authfail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}


export const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationdate')
    localStorage.removeItem('userid')
    return{
        type:actionTypes.LOG_OUT
    }
}

export const iftimeout=(expiration)=>{
    return dispatch=> {
        setTimeout(() => {
            dispatch(logout())
        }, expiration*1000);
    }
}

export const auth=(email,password,isSignedUp)=>{

    const Data={
        email:email,
        password:password,
        returnSecureToken: true

    }

    console.log(isSignedUp)
    let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwLXesIP4upFXipwGqKg8tmguHexlKY0o'

    if (isSignedUp){
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwLXesIP4upFXipwGqKg8tmguHexlKY0o'
    }

    return dispatch=>{
        dispatch(authstart())
        axios.post(url, Data)
        .then(response=>{
            console.log(response)
            const expirationdate= new Date(new Date().getTime()+ response.data.expiresIn *1000)
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('expirationdate',expirationdate )
            localStorage.setItem('userid',response.data.localId)
            dispatch(authsuccess(response.data.localId,response.data.idToken))
            dispatch(iftimeout(response.data.expiresIn))})
        .catch(err=>{
            console.log(err)
            dispatch(authfail(err.response.data.error))})
    }
}

export const setauthredirectpath=(path)=>{
    return{
        type:actionTypes.AUTH_REDIRECT_PATH,
        path:path
    }
}

export const autologin=()=>{
    return dispatch=>{
        const token = localStorage.getItem('token')
        const expirationdate = new Date(localStorage.getItem('expirationdate'))
        const userid = new Date(localStorage.getItem('userid'))
        if(!token){
            dispatch(logout())
        }
        else{
            if (expirationdate > new Date()){
                dispatch(authsuccess(userid,token))
                dispatch(iftimeout((expirationdate.getTime() - new Date().getTime())/1000))
            }
            else{
                dispatch(logout())
            }
        }
    }
}