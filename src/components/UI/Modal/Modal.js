import React,{Component} from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
class Modal extends Component{

    componentDidUpdate=()=>{
        console.log('[Modal.js] DidUpdate')
    }

    shouldComponentUpdate=(nextProps,nextState)=>{
        return nextProps.show !==this.props.show || this.props.children !==nextProps.children
    }

    render(){

        return(
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}></Backdrop>
                <div 
                className={classes.Modal}
                style={{
                    transform:this.props.show ? 'translateY(0)':'translateY(-100vh)',
                    opacity:this.props.show ? '0.9':'0'
                }}>
                    {this.props.children}
                </div>
            </Auxiliary>
        )
    }
}

export default Modal