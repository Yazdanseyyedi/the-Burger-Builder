import React , {Component} from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Layout from './containers/Layout/Layout';
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'

import {Route, Switch, Redirect} from 'react-router-dom'
import LogOut from './containers/Auth/LogOut/LogOut';
import * as authactions from './store/actions/auth'
import {connect} from 'react-redux'


class App extends Component {

  componentDidMount=()=>{
    this.props.onAutoLogin()
  }

  render(){

  let routes=(<Switch>
      <Route path='/' exact component={BurgerBuilder}/>
      <Route path='/Auth' exact component={Auth}/>
      <Redirect to='/'></Redirect>
  </Switch>)

  if (this.props.isAuthenticated){
    routes=(<Switch>
      <Route path='/checkout' component={Checkout}/>
      <Route path='/orders' component={Orders}/>
      <Route path='/Auth' exact component={Auth}/>
      <Route path='/' exact component={BurgerBuilder}/>
      <Route path='/LogOut' exact component={LogOut}/>
      <Redirect to='/'></Redirect>
      </Switch>)
  }
  return (
    <div >
      
      <Layout>
      
      {routes}

      </Layout>
    </div>
  );
}}


const mapStateToProps= state=>{
  return{
    isAuthenticated:state.auth.token !== null
  }
}

const mapDispatchToProps= dispatch=>{
  return{
    onAutoLogin:()=>dispatch(authactions.autologin())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
