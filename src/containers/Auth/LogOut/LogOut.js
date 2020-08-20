import React , {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as actions from '../../../store/actions/auth'

class LogOut extends Component {

    componentDidMount=()=>{
        this.props.onlogout()
    }

    render(){

        return(
            <Redirect to='/'/>
        )
    }
}

const mapDispatchToProps= dispacth=>{
    return{
        onlogout:()=>dispacth(actions.logout())
    }
}

export default connect(null,mapDispatchToProps)(LogOut)