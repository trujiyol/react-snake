import React from "react"
import Game from "./components/game"

export default class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {date: new Date()};
      }

    render(){
        return(
            <div>
                
                <Game rows="19" cols="19" height="400px" width="400px"/>
                
            </div>
        )
    }
}
