import React from "react"
import SnakeSegment from "./snakesegment";
import '../css/snake.css'



export default class Snake extends React.Component{

    generateSnakeSegments(){
        var snakeSegments = [];
        var segmentIndex = 0;
        this.props.gamelogic.snake.positions.forEach(position => {
            segmentIndex++;
            var y = (position[0] / this.props.gamelogic._rows * 100) + "%";
            var x = (position[1] / this.props.gamelogic._cols *100) + "%";
            var size = (1/this.props.gamelogic._rows * 100) + "%";
            var zindex = position[0];

            snakeSegments.push( (<SnakeSegment key={segmentIndex} x={x} y={y} size={size} zindex={zindex}/>))
        });
        return snakeSegments;
    }

    render(){ 
        return(
            <div className="snakecontainer">
               {this.generateSnakeSegments()}
            </div>
        )
    }
    
}
