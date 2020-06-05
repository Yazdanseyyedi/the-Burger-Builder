import React ,{Component} from 'react' 
import classes from './Order.module.css'

class Order extends Component{

    render(){

        const ingredients=[]

        for(let ig in this.props.ingredients){
            ingredients.push(
               {
                   name:ig,
                   amount:this.props.ingredients[ig]
               } 
            )
        }


        const output=ingredients.map(ig=>{
        return(<span key={ig.name} className={classes.Output}> {ig.name} {ig.amount} </span>)
        })


        return(
            <div className={classes.Order}>
                <p>ingredients: {output}</p>
                <p>Price: <strong>USD {this.props.price}</strong></p>
            </div>
        )
    }
}

export default Order