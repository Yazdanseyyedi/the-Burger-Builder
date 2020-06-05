import React from 'react'
import logo from '../../assets/Images/burger_logo.png'
import classes from './Logo.module.css'

const Logo =(props)=>{
    return(
        <div className={classes.Logo}>
            <img src={logo} alt="My burger" />
        </div>
    )

}

export default Logo