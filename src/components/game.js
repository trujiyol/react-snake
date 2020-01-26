import React from "react"
import GridSquare from "./gridsquare"
import MessageBox from "./messagebox";
import Snake from "./snake";
import GameLogic from "./gamelogic";
import ScoreCounter from "./scorecounter";
import Token from "./token";
import SwipeGrid from "./swipegrid";
import PauseButton from "./pausebutton";
import '../css/grid.css'
import Logo from "../logo.svg";

export default class Game extends React.Component{
    state = {
        gamelogic: new GameLogic(this.props.rows,this.props.cols)
    }

    constructor(props) {
        super(props);

        this.state.gamelogic.onUpdate = this.updateReactState.bind(this);
      }

    updateReactState(){
        this.setState({gamelogic: this.state.gamelogic});
    }


    renderGrid(){
        var gridSquares = [];
        var num = this.state.gamelogic.grid.length * this.state.gamelogic.grid[0].length;

        for(let i = 0, index = 0; i < this.state.gamelogic.grid.length; i++){
            for(var j = 0; j < this.state.gamelogic.grid[i].length; j++, index++){
                var val = this.state.gamelogic.grid[i][j];

                    gridSquares.push(<GridSquare key={index} index={index}/>);
                
                
            }
        }

        return gridSquares;
    }

    render(){

        var gameSize = {
            'width':this.props.width,
            'height':this.props.height
        }

        var gridSize = {
            'gridTemplateColumns':'repeat('+this.props.cols+', 1fr)',
            'gridTemplateRows':'repeat('+this.props.rows+', 1fr)'
        }

        return(
            <div>
                <div id="gameContainer" style={gameSize}>
                    <div id="hud">
                        <div id="hud-left">
                            <img src={Logo} style={{width:'30%'}}/><b>React Snake</b>
                            
                        </div>
                        <div id="hud-middle">
                            <ScoreCounter score={this.state.gamelogic.score}/>
                        </div>
                        <div id="hud-right">
                         <PauseButton onclick={this.state.gamelogic.toggleGame.bind(this.state.gamelogic)}/>
                         </div>
                    </div>
                    <div id="topWall">
                        <div className="wallEnd"></div>
                        <div className="wallSideTop"></div>
                    </div>
                    <div id="leftWall"></div>
                    <div id="center">
                    
                        <div className="grid" style={gridSize}>
                            {this.renderGrid()}
                            <Snake gamelogic={this.state.gamelogic}/>
                            <Token gamelogic={this.state.gamelogic}/>
                            <MessageBox gamelogic={this.state.gamelogic}/>
                            <SwipeGrid/>
                        </div>
                    </div>
                    <div id="rightWall"></div>
                    <div id="bottomWall">
                        <div className="wallSideBottom"></div>
                        <div className="wallEnd"></div>
                    </div>
                </div>
            </div>
        )
    }
}
