import React,{Component} from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

class Layout extends Component{

    state={
        ShowSideDrawer: false
    }

    ShowSideDrawerHandler=()=>{
        this.setState({ShowSideDrawer:false})
    }

    sideDrawerToggleHandler=(prevState)=>{
        this.setState({ShowSideDrawer:!prevState.ShowSideDrawer})
    }

    render(){
        return(
        <Auxiliary>
            <Toolbar 
            drawerToggleClicked={this.sideDrawerToggleHandler}
            isAuth={this.props.isAuth}></Toolbar>
            <SideDrawer 
            open={this.state.ShowSideDrawer} 
            closed={this.ShowSideDrawerHandler}
            isAuth={this.props.isAuth}></SideDrawer>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Auxiliary>
        )
    }


}

const mapStatesToProps= state=>{
    return{
        isAuth:state.auth.token !== null
    }
}

export default connect(mapStatesToProps)(Layout);