import React from "react"
import '../css/messagebox.css'

export default class MessageBox
 extends React.Component{
    constructor(props) {
        super(props);

        this.message = '';
        this.visible = true;
      }

      componentDidMount() {

      }
    
      componentWillUnmount() {

      }

      renderMessageBox(){
        switch(this.props.gamelogic.gameState){
            case this.props.gamelogic.STATE.PAUSED:
                this.message = "Game Paused";
                this.visible = true;
                break;
            case this.props.gamelogic.STATE.GAMEOVER:
                this.message = "Game Over";
                this.visible = true;
                break;
            case this.props.gamelogic.STATE.INITIAL:
                this.message = "Press Enter to Play";
                this.visible = true;
                break;
            default:
                this.message = null;
                this.visible = false;
                break;
        } 
    }

    render(){

        this.renderMessageBox();

        if(this.visible)
            return(
                <div className="container seen">
                    <div className="messagebox">
                        {this.message}
                    </div>
                </div>)
        else{


            return(
                <div className="container  hidden">
                    <div className="messagebox">
                        {this.message}
                    </div>
                </div>)
                }
    }
}
