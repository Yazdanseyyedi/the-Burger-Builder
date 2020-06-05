import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Meat',type:'meat'},
    {label:'Cheese',type:'cheese'}
]


const buildControls=(props)=>(
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(<BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={()=>props.ingredientsAdd(ctrl.type)}
        removed={()=>props.ingredientsRemove(ctrl.type)}
        disable={props.disableInfo[ctrl.type]}/>))}
        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.purchasing}>Order Now</button>
    </div>
)

export default buildControls