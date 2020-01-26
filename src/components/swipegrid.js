import React from "react"


export default class SwipeGrid extends React.Component{

    constructor(props){
        super(props);

        this.detectSwipe = this.detectSwipe.bind(this);
        this.startSwipe = this.startSwipe.bind(this);
        this.onTap = this.onTap.bind(this);
    }

    currentFingerPosition = [];
    lastFingerPosition = [];
    isFingerDown = false;

    onTap(){
        console.log("tapped");
        let event = new Event("tapGrid");
        document.dispatchEvent(event);
    }

    startSwipe(e){
        this.lastFingerPosition = [e.clientX, e.clientY];
        this.isFingerDown = true;
    }

    detectSwipe(e){

        if(this.isFingerDown){
            this.currentFingerPosition = [e.clientX, e.clientY];

            var difX = (this.currentFingerPosition[0] - this.lastFingerPosition[0]) / window.screen.width;
            var difY = (this.currentFingerPosition[1] - this.lastFingerPosition[1]) / window.screen.width;
            

            if(difX > 0.05){
                this.isFingerDown = false;
                let event = new Event("swipeRight");
                document.dispatchEvent(event);
            }
            else if(difX < -0.05){
                let event = new Event("swipeLeft");
                document.dispatchEvent(event);
                this.isFingerDown = false;
            }
            else if(difY > 0.05){
                let event = new Event("swipeDown");
                document.dispatchEvent(event);
                this.isFingerDown = false;
            }
            else if(difY < -0.05){
                let event = new Event("swipeUp");
                document.dispatchEvent(event);
                this.isFingerDown = false;
            }
        }
    }


    render(){
        let style = {
            position: 'absolute',
            height: '100%',
            width: '100%'
        }
        return(<div style={style} onMouseDown={this.startSwipe} onMouseMove={this.detectSwipe} onClick={this.onTap}></div>)
    }
    
}
