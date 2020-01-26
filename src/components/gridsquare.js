import React from "react"
import '../css/gridsquare.css'



export default class GridSquare extends React.Component{
    render(){
        if(this.props.index % 2 == 0)
            return(<div className="gridsquare colorA"></div>);
        else
            return(<div className="gridsquare colorB"></div>);
    }
    
}
