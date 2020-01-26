import React from "react"
import "../css/scorecounter.css"

export default class ScoreCounter extends React.Component{
    constructor(props){
        super(props);

        this._previousScore = this.props.score;
        this._counter = 0;
    }

    render(){
        
        if(this._previousScore != this.props.score)
            {
                this._counter++;
                this._previousScore = this.props.score;
            }
            
        
        if(this._counter  % 2)
            return(<div className="scorecounter pulsea">
                {this.props.score}
                </div>);
        else
            return(<div className="scorecounter pulseb">
            {this.props.score}
            </div>);
    }
}