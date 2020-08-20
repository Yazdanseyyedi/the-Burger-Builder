import * as actionTypes from '../actions/actionTypes'


const initialstate={
    token:null,
    userId: null,
    error:null,
    loading:false,
    AuthRedirectPath: '/'
}

const reducer=(state=initialstate,action)=>{

    switch(action.type){
        case(actionTypes.AUTH_START):
            return{
                ...state,
                loading:true
            }
        case(actionTypes.AUTH_SUCCESS):
            return{
                ...state,
                userId:action.idToken,
                token:action.userId,
                loading:false
            }
        case(actionTypes.AUTH_FAIL):
            return{
                ...state,
                error:action.error,
                loading:false
            }
        case(actionTypes.LOG_OUT):
            return{
                ...state,
                token:null,
                userId:null
            }
        case(actionTypes.AUTH_REDIRECT_PATH):
            return{
                ...state,
                AuthRedirectPath:action.path
            }
        default:
            return state    
    }


}

export default reducer