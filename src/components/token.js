import React from "react"
import '../css/token.css'



export default class Token extends React.Component{

    render(){ 
            var position = this.props.gamelogic.token;
            var y = (position[0] / this.props.gamelogic._rows * 100) + "%";
            var x = (position[1] / this.props.gamelogic._cols *100) + "%";
            var size = (1/this.props.gamelogic._rows * 100) + "%";

        var placementStyle ={
            position: 'absolute',
            height: size,
            width: size,
            top: y,
            left: x,
        }
        return(
            <div className="tokencontainer">
               <div className="token" style={placementStyle}></div>
            </div>
        )
    }
    
}
