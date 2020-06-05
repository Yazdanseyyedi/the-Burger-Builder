import React,{Component} from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Auxiliary from '../Auxiliary/Auxiliary'

const withErrorHandler=(WrappedComponent, axios)=>{

    return class extends Component{

        state={
            error:false
        }

        componentWillMount=()=>{
            this.reqInterceptors=axios.interceptors.request.use(req=>{
                this.setState({error:false})
                return req}
             
            )

            this.resInterceptors=axios.interceptors.response.use(res=>res,err=>{
                this.setState({error:err})
            })
        }


        componentWillUnmount=()=>{
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.response.eject(this.reqInterceptors)

        }

        confirmedErrorHandler=()=>{
            this.setState({error:false})
        }

        render(){
            return(
                <Auxiliary>
                    <Modal show={this.state.error} modalClosed={this.confirmedErrorHandler} >
                        {this.state.error ? this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}></WrappedComponent>
                </Auxiliary>
            )

        }
        
    }


}

export default withErrorHandler