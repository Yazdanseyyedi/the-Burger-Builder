import React from 'react'
import classes from './Input.module.css'

const input=(props)=>{

    let inputtype=null

    const validclasses=[classes.InputElement]

    if(props.invalid && props.required && props.touched){
        validclasses.push(classes.Invalid)
    }

    switch (props.elementtype) {
        case ("input"):
            inputtype=<input 
            className={validclasses.join(' ')} 
            {...props.elementconfig} 
            value={props.value}
            onChange={props.changed}/>
            break;

        case ("textarea"):
            inputtype=<textarea 
            className={validclasses.join(' ')} 
            {...props.elementconfig} 
            value={props.value}
            onChange={props.changed}/>
            break;
    
        case ("select"):
            inputtype=<select 
            className={validclasses.join(' ')}  
            value={props.value}
            onChange={props.changed}>
                {props.elementconfig.options.map(option=>
                <option
                key={option.value} 
                value={option.value} >
                    {option.valuedisplay}
                </option>)}

            </select>
            break;


        default:
            inputtype=<input 
            className={validclasses.join(' ')} 
            {...props.elementconfig} 
            value={props.value}
            onChange={props.changed}/>
            break;
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputtype}
        </div>
    )

}

export default input