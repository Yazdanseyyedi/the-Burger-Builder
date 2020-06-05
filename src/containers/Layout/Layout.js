import React,{Component} from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer'

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
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}></Toolbar>
            <SideDrawer open={this.state.ShowSideDrawer} closed={this.ShowSideDrawerHandler}></SideDrawer>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Auxiliary>
        )
    }


}

export default Layout;