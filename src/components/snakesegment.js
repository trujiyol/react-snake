
import React from "react"
import "../css/snake.css"

export default class SnakeSegment extends React.Component{
    constructor(props){
        super(props);
    }


    render(){

        var placementStyle ={
            position: 'absolute',
            height: this.props.size,
            width: this.props.size,
            top: this.props.y,
            left: this.props.x,
            zIndex: this.props.zindex
        }

        return(<div className="snakesegment" style={placementStyle}></div>);
    }
}