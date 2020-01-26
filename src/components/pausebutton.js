import React from "react"
import "../css/pausebutton.css"

export default class PauseButton extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(<div className="pausebutton" onClick={this.props.onclick}>||</div>);
    }
}